<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Milestone;
use App\Models\User\UserTransaction;
use App\Models\Money\Payment;
use App\Models\Money\Deposit;
use App\Models\Referral\ReferralConnection;

class MilestoneController extends Controller
{
    public function update(Request $request, $milestone_id)
    {
    	$milestone = Milestone::findOrFail($milestone_id);
    	auth()->user()->canEditMilestoneOrForbidden($milestone);

    	validator()->make($request->all(), [
            'milestone' => 'required|array',
            'milestone.title' => 'required|string',
            'milestone.amount' => 'nullable|numeric|min:5',

            'milestone.project_id' => [
                'nullable',
                'integer',
                'exists_in_case:project_by_id_joined_project_members_where_role_is_owner_of_user,' . auth()->user()->id,
            ],
        ])->validate();

    	DB::beginTransaction();

        try {
            $milestone->title = $request->input('milestone.title');

            if (!$milestone->payment_id && $request->has('milestone.amount')) {
            	$milestone->amount = $request->input('milestone.amount');
            }

            if (!$milestone->payment_id && $request->has('milestone.project_id')) {
                $milestone->project_id = (int) $request->input('milestone.project_id');
            }

            $milestone->save();

            if (!$milestone->payment_id && $request->input('milestone.activate')) {
                $milestone->activate();
            }
        } catch (\Stripe\Error\Card $exception) {
			$exception_body = $exception->getJsonBody();
			$exception_error = $exception_body['error'];
			DB::rollback();

			return response()->error('PAYMENT_FAILED_CODE_' . $exception_error['code']);
		} catch (\Exception $exception) {
            DB::rollback();
            throw $exception;
        }

        DB::commit();

        $milestone->load([
            'project',
        ]);

    	return response()->resource($milestone);
    }

    public function activate($milestone_id)
    {
    	$milestone = Milestone::findOrFail($milestone_id);
    	auth()->user()->canActivateMilestoneOrForbidden($milestone);

    	if ($milestone->payment_id) {
    		return response()->error('MILESTONE_IS_ALREADY_ACTIVATED');
    	}

    	$milestone->activate();

        $milestone->load([
            'project',
        ]);

    	return response()->resource($milestone);
    }

    public function release($milestone_id)
    {
    	$milestone = Milestone::findOrFail($milestone_id);
    	auth()->user()->canReleaseMilestoneOrForbidden($milestone);

    	if (!$milestone->payment_id) {
    		return response()->error('MILESTONE_IS_NOT_ACTIVATED');
    	}

    	if ($milestone->released_at) {
    		return response()->error('MILESTONE_IS_ALREADY_RELEASED');
    	}

    	$milestone->release();

        $milestone->load([
            'project',
        ]);

    	return response()->resource($milestone);
    }
}
