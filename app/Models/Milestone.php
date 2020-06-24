<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\Models\Contract;
use App\Models\Milestone;
use App\Models\User\UserTransaction;
use App\Models\Money\Payment;
use App\Models\Money\Deposit;
use App\Models\Project\Project;
use App\Models\Referral\ReferralConnection;

/**
 * App\Models\Milestone
 *
 * @property int $id
 * @property int $contract_id
 * @property string $title
 * @property string|null $description
 * @property float $amount
 * @property int $project_id
 * @property int|null $payment_id
 * @property \Illuminate\Support\Carbon|null $released_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Contract $contract
 * @property-read mixed $escrow_time
 * @property-read mixed $is_in_escrow
 * @property-read \App\Models\Project\Project $project
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Milestone newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Milestone newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Milestone query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Milestone whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Milestone whereContractId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Milestone whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Milestone whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Milestone whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Milestone wherePaymentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Milestone whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Milestone whereReleasedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Milestone whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Milestone whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Milestone extends Model
{
    public $attributes = [
        'payment_id' => null,
    ];

	public $appends = [
    	'is_in_escrow',
        'escrow_time',
    ];

    public $casts = [
    	'released_at' => 'datetime',
        'amount' => 'float',
    ];

    public function getIsInEscrowAttribute()
    {
        if (!$this->released_at) {
            return false;
        }

        return time() - $this->released_at->getTimestamp() < 5 * 86400;
    }

    public function getEscrowTimeAttribute()
    {
        if (!$this->released_at) {
            return null;
        }

        $escrow_time = 5 * 86400 - (time() - $this->released_at->getTimestamp());

        return ($escrow_time < 0 ? 0 : $escrow_time);
    }

    // ---------------------------------------------------------------------- //

    public function contract()
    {
        return $this->belongsTo(Contract::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    // ---------------------------------------------------------------------- //

    public function activate()
    {
        if ($this->payment_id) {
            return $this;
        }

        try {
            $employer_user = $this->contract->employer_user;

            $payment = new Payment;
            $payment->user_id = $employer_user->id;
            $payment->original_amount = $this->amount;
            $payment->objective_type = 'Milestone';
            $payment->objective_id = $this->id;
            $payment->calculateAmounts();
            $payment->save();

            $deposit = new Deposit;
            $deposit->user_id = $employer_user->id;
            $deposit->original_amount = $payment->final_amount;
            $deposit->calculateAmounts();
            $deposit->stripe_source_id = $employer_user->default_credit_card->stripe_id;
            $deposit->save();

            $user_transaction = new UserTransaction;
            $user_transaction->user_id = $employer_user->id;
            $user_transaction->amount = +$deposit->original_amount;
            $user_transaction->action_type = 'Deposit';
            $user_transaction->action_id = $deposit->id;
            $user_transaction->state = UserTransaction::STATE_SUCCESS;
            $user_transaction->save();

            $user_transaction = new UserTransaction;
            $user_transaction->user_id = $employer_user->id;
            $user_transaction->amount = -$payment->original_amount;
            $user_transaction->action_type = 'Payment';
            $user_transaction->action_id = $payment->id;
            $user_transaction->processing_fee = $payment->processing_fee;
            $user_transaction->state = UserTransaction::STATE_SUCCESS;
            $user_transaction->save();

            $employer_user->releaseReferrersRemuneration(
                $user_transaction->processing_fee,
                ReferralConnection::INVITED_USER_TYPE_EMPLOYER
            );

            $this->payment_id = $payment->id;
            $this->save();

            if ($employer_user->administrator) {
                $deposit->stripe_charge_id = 'SCREENTRACK_BUSINESS_EXPENSE';
                $deposit->save();
            } else {
                $stripe_charge = \Stripe\Charge::create([
                    'amount' => round($deposit->final_amount * 100.0),
                    'currency' => 'usd',
                    'description' => $payment->description,
                    'customer' => $employer_user->stripe_customer_id,
                    'source' => $employer_user->default_credit_card->stripe_id,
                ]);

                if (!$stripe_charge->paid) {
                    DB::rollback();
                    throw new \Exception('PAYMENT_FAILED');
                }

                $deposit->stripe_charge_id = $stripe_charge->id;
                $deposit->save();
            }
        } catch (\Exception $exception) {
            DB::rollback();
            throw $exception;
        }

        return $this;
    }

    public function release()
    {
        if ($this->released_at) {
            return $this;
        }

        DB::beginTransaction();

        try {
            $employee_user = $this->contract->employee_user;

            $this->released_at = now();
            $this->save();

            $user_transaction = new UserTransaction;
            $user_transaction->user_id = $employee_user->id;
            $user_transaction->amount = +$this->amount;

            $user_transaction->processing_fee = (
                ceil(($this->amount / 100.0 * config('fees.processing.percentage')) / 2 * 100) * 2 / 100
                +
                config('fees.processing.fixed')
            ) / 2;

            $user_transaction->action_type = 'Payment';
            $user_transaction->action_id = $this->payment_id;
            $user_transaction->state = UserTransaction::STATE_SUCCESS;

            $user_transaction->frozen_till = (new \DateTime)->setTimestamp(
                $this->released_at->getTimestamp() + 5 * 86400
            );

            $user_transaction->save();

            $employee_user->recalculateBalance();
            $employee_user->save();

            $employee_user->releaseReferrersRemuneration(
                $user_transaction->processing_fee,
                ReferralConnection::INVITED_USER_TYPE_FREELANCER
            );
        } catch (\Exception $exception) {
            DB::rollback();
            throw $exception;
        }

        DB::commit();

        return $this;
    }
}
