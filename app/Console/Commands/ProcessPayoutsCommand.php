<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Models\User\UserTransaction;
use App\Models\Money\Payout;

class ProcessPayoutsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'process_payouts';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Process Payouts';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $paypal_api_context = new \PayPal\Rest\ApiContext(new \PayPal\Auth\OAuthTokenCredential(
            config('paypal.client_id'),
            config('paypal.secret')
        ));

        $paypal_api_context->setConfig(config('paypal.settings'));

        // ---------------------------------------------------------------------- //
        // 
        // - Creating Requests to PayPal for payouts that has no paypal_item_id
        // 
        // ---------------------------------------------------------------------- //

        $payout_query = Payout::query();
        $payout_query->where('type', Payout::TYPE_PAYPAL);
        $payout_query->where('item_id', null);
        $payout_query->take(25);
        $payouts = $payout_query->get();

        if ($payouts->count() > 0) {
            $paypal_payout = new \PayPal\Api\Payout;
            $paypal_sender_batch_header = new \PayPal\Api\PayoutSenderBatchHeader;
            $paypal_sender_batch_header->setSenderBatchId(uniqid())->setEmailSubject('You have a Payout!');
            $paypal_payout->setSenderBatchHeader($paypal_sender_batch_header);
            DB::beginTransaction();

            try {
                foreach ($payouts as $current_payout) {
                    $paypal_sender_item = new \PayPal\Api\PayoutItem;
                    $paypal_sender_item->setRecipientType('Email');
                    $paypal_sender_item->setNote('Thanks for your patronage!');
                    $paypal_sender_item->setReceiver($current_payout->identifier);
                    $paypal_sender_item->setSenderItemId($current_payout->id);
                    
                    $paypal_sender_item->setAmount(new \PayPal\Api\Currency(json_encode([
                        'value' => $current_payout->original_amount,
                        'currency' => 'USD',
                    ])));

                    $paypal_payout->addItem($paypal_sender_item);
                }

                $paypal_output = $paypal_payout->create(null, $paypal_api_context);
                $paypal_payout_batch = \PayPal\Api\Payout::get($paypal_output->getBatchHeader()->getPayoutBatchId(), $paypal_api_context);

                foreach ($paypal_payout_batch->items as $paypal_payout_item) {
                    $found_payout = $payouts->where('id', $paypal_payout_item->payout_item->sender_item_id)->first();
                    $found_payout->item_id = $paypal_payout_item->payout_item_id;
                    $found_payout->data = ['batch_id' => $paypal_payout_item->payout_batch_id];
                    $found_payout->save();
                }

                DB::commit();
            } catch (Exception $exception) {
                DB::rollback();
                echo 'Payouts creation in PayPal failed. [ERROR]' . "\n";

                try {
                    print_r($exception->getData());
                } catch (Exception $e) {
                    print_r($exception);
                }

                return;
            }

            echo 'Payouts created in PayPal. [OK]' . "\n";
        } else {
            echo 'No Payouts to create in PayPal. [OK]' . "\n";
        }

        // ---------------------------------------------------------------------- //
        // 
        // - Cancel Unclaimed PayPal Payouts
        // 
        // ---------------------------------------------------------------------- //

        $payout_query = Payout::query();
        $payout_query->where('type', Payout::TYPE_PAYPAL);
        $payout_query->where('state', 'UNCLAIMED');
        $payout_query->take(10);
        $payouts = $payout_query->get();

        if ($payouts->count() > 0) {
            foreach ($payouts as $current_payout) {
                \PayPal\Api\PayoutItem::cancel($current_payout->item_id, $paypal_api_context);
            }

            echo 'Processed Unclaimed Payouts. [OK]' . "\n";
        } else {
            echo 'No Unclaimed Payouts to process. [OK]' . "\n";
        }

        // ---------------------------------------------------------------------- //
        // 
        // - Refresh Payout states from PayPal
        // 
        // ---------------------------------------------------------------------- //

        $payout_query = Payout::query();
        $payout_query->where('type', Payout::TYPE_PAYPAL);

        $payout_query->whereNotIn('state', [
            'SUCCESS',
            'DENIED',
            'FAILED',
            'RETURNED',
            'BLOCKED',
            'REFUNDED',
            'REVERSED',
        ]);

        $payout_query->take(10);
        $payouts = $payout_query->get();

        if ($payouts->count() > 0) {
            foreach ($payouts as $current_payout) {
                DB::beginTransaction();

                try {
                    $paypal_payout_item = \PayPal\Api\PayoutItem::get($current_payout->item_id, $paypal_api_context);

                    if ($paypal_payout_item->payout_item_fee) {
                        $current_payout->payment_system_fee = (float) $paypal_payout_item->payout_item_fee->value;
                    } else {
                        $current_payout->payment_system_fee = 0.0;
                    }

                    $current_payout->calculateFinalAmount();
                    $current_payout->state = $paypal_payout_item->transaction_status;
                    $current_payout->error = (array) $paypal_payout_item->errors;
                    $current_payout->save();

                    $user_transaction_query = UserTransaction::query();
                    $user_transaction_query->where('action_type', 'Payout');
                    $user_transaction_query->where('action_id', $current_payout->id);
                    
                    if ($user_transaction = $user_transaction_query->first()) {
                        if ($current_payout->state == 'SUCCESS') {
                            $user_transaction->state = 'SUCCESS';
                        } elseif (in_array($current_payout->state, ['DENIED', 'FAILED', 'RETURNED', 'BLOCKED', 'REFUNDED', 'REVERSED'])) {
                            $user_transaction->state = 'FAILED';
                        } else {
                            $user_transaction->state = 'PENDING';
                        }

                        $user_transaction->save();
                    }

                    if ($current_payout->state == 'SUCCESS') {
                        // EVENT: THAT PAYOUT WAS SUCCEDED
                        // EMAIL: TO USER THAT PAYOUT WAS SUCCEDED
                        // EMAIL: TO ADMINS THAT PAYOUT WAS SUCCEDED
                    }

                    DB::commit();
                } catch (Exception $exception) {
                    print_r($exception);
                    DB::rollback();
                }
            }

            echo 'Processed Payouts. [OK]' . "\n";
        } else {
            echo 'No Payouts to process. [OK]' . "\n";
        }
    }
}
