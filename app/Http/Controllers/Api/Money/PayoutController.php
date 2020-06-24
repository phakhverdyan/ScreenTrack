<?php

namespace App\Http\Controllers\Api\Money;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\User\UserTransaction;
use App\Models\Money\Payout;

class PayoutController extends Controller
{
    public function create(Request $request)
    {
        if (!auth()->user()->default_payout_method) {
            return response()->error('No default payout method set');
        }

    	$user_transaction_query = UserTransaction::query();
    	$user_transaction_query->selectRaw('SUM(amount - processing_fee) AS available_amount');
        $user_transaction_query->where('user_id', auth()->user()->id);

        $user_transaction_query->where(function ($where) {
            $where->orWhere(function ($where) {
                $where->where('amount', '>', 0);
                $where->where('state', 'SUCCESS');
            });

            $where->orWhere(function ($where) {
                $where->where('amount', '<', 0);
                $where->whereIn('state', ['PENDING', 'SUCCESS']);
            });
        });

        $user_transaction_query->where(function ($where) {
            $where->orWhere('frozen_till', null);
            $where->orWhere('frozen_till', '<=', date(\DateTime::ATOM, floor(time() / 86400) * 86400));
        });

    	$available_amount = floor(($user_transaction_query->first()->available_amount ?: 0.0) * 100) / 100;
    	
    	validator()->make($request->all(), [
    		'payout.original_amount' => 'required|numeric|min:0.0|max:' . $available_amount,
    	])->validate();

    	DB::beginTransaction();

    	try {
	    	$payout = new Payout;
	    	$payout->user_id = auth()->user()->id;
	    	$payout->type = auth()->user()->default_payout_method->type;
	    	$payout->identifier = auth()->user()->default_payout_method->identifier;
	    	$payout->fill($request->input('payout'));
	    	$payout->save();

	    	$user_transaction = new UserTransaction;
	    	$user_transaction->user_id = auth()->user()->id;
	    	$user_transaction->amount = -$payout->original_amount;
	    	$user_transaction->action_type = 'Payout';
	    	$user_transaction->action_id = $payout->id;
	    	$user_transaction->save();
	    } catch (\Exception $exception) {
	    	DB::rollback();
	    	throw $exception;
	    }

	    DB::commit();

    	return response()->resource($payout);
    }

    public function update(Request $request, $payout_id)
    {
        $payout = Payout::findOrFail($payout_id);
        auth()->user()->canChangePayoutStateOrForbidden($payout);

        validator()->make($request->all(), [
            'payout' => 'required|array',
            'payout.state' => 'string|nullable|in:' . implode(',', Payout::$states),
            'payout.item_id' => 'string|nullable',
        ])->validate();

        DB::beginTransaction();

        try {
            if ($request->input('payout.state') && $payout->state == Payout::STATE_PENDING) {
                $payout->state = $request->input('payout.state');

                if ($payout->state == Payout::STATE_SUCCESS) {
                    $user_transaction_query = UserTransaction::query();
                    $user_transaction_query->where('action_type', 'Payout');
                    $user_transaction_query->where('action_id', $payout->id);

                    $user_transaction_query->update([
                        'state' => UserTransaction::STATE_SUCCESS,
                    ]);
                } elseif ($payout->state != Payout::STATE_PENDING) {
                    $user_transaction_query = UserTransaction::query();
                    $user_transaction_query->where('action_type', 'Payout');
                    $user_transaction_query->where('action_id', $payout->id);

                    $user_transaction_query->update([
                        'state' => UserTransaction::STATE_FAILED,
                    ]);
                }
            }

            if ($request->input('payout.item_id')) {
                $payout->item_id = $request->input('payout.item_id');
            }

            $payout->save();
        } catch (\Exception $exception) {
            DB::rollback();
            throw $exception;
        }

        DB::commit();

        return response()->resource($payout);
    }
}
