<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Events\ContractClosedEvent;
use App\Http\Controllers\Controller;
use App\Models\Contract;
use App\Models\Milestone;
use App\Models\User\UserTransaction;
use App\Models\Money\Payment;
use App\Models\Money\Deposit;
use App\Models\Project\ProjectMember;
use App\Models\Project\ProjectTaskMember;
use App\Models\Referral\ReferralConnection;

class ContractController extends Controller
{
    public function close(Request $request, $contract_id) {
        $contract = Contract::findOrFail($contract_id);
        auth()->user()->canCloseContractOrForbidden($contract);
        $contract->closed_at = now();
        $contract->save();

        if (auth()->user()->id == $contract->employer_user_id && $request->input('remove_user_from_all_my_projects')) {
        	$project_task_member_query = ProjectTaskMember::query();
            $project_task_member_query->join('project_tasks', 'project_tasks.id', '=', 'project_task_members.task_id');
            $project_task_member_query->join('projects', 'projects.id', '=', 'project_tasks.project_id');
            $project_task_member_query->where('projects.owner_user_id', $contract->employer_user_id);
            $project_task_member_query->where('project_task_members.user_id', $contract->employee_user_id);
            $project_task_member_query->delete();

            $project_member_query = ProjectMember::query();
            $project_member_query->join('projects', 'projects.id', '=', 'project_members.project_id');
            $project_member_query->where('projects.owner_user_id', $contract->employer_user_id);
            $project_member_query->where('project_members.user_id', $contract->employee_user_id);
            $project_member_query->delete();
        }

        // EVENT: contract was closed

        $contract->load([
        	'employer_user',
        	'employer_user.image',
        	'employee_user',
        	'employee_user.image',
        ]);

        return response()->resource($contract);
    }

    public function update(Request $request, $contract_id)
    {
    	$contract_query = Contract::select('contracts.*');

    	$contract_query->selectRaw('(' . collect([
			'SELECT COUNT(*)',
			'FROM tracking_segments',
			'JOIN tracking_sessions ON tracking_sessions.id = tracking_segments.session_id',
			'WHERE tracking_sessions.contract_id = contracts.id',
		])->join(' ') . ') AS count_of_segments');

    	$contract = $contract_query->findOrFail($contract_id);
        auth()->user()->canEditContractOrForbidden($contract);

        validator()->make($request->all(), [
        	'contract' => 'required|array',
        	'contract.hourly_rate' => 'required|integer|min:1|max:999',
        	'contract.title' => 'required|string',
        ])->validate();

        $input_contract_hourly_rate = (float) $request->input('contract.hourly_rate');

        if ($contract->hourly_rate != $input_contract_hourly_rate) {
        	return response()->error('Hourly Rate should not be changed');
        }

    	$contract->fill($request->input('contract'));
    	$contract->save();
    	$contract->makeVisible(['hourly_rate']);

    	$contract->load([
        	'employer_user',
        	'employer_user.image',
        	'employee_user',
        	'employee_user.image',
        ]);

    	return response()->resource($contract);
    }

    public function create_milestone(Request $request, $contract_id)
    {
        $contract = Contract::findOrFail($contract_id);
        auth()->user()->canEditContractOrForbidden($contract);

        if ($contract->type != Contract::TYPE_FIXED_PRICE) {
            return response()->error('CONTRACT_TYPE_IS_NOT_FIXED_PRICE');
        }

        $employer_user = $contract->employer_user()->with([
            'default_credit_card',
        ])->first();

        validator()->make($request->all(), [
            'milestone' => 'required|array',
            'milestone.title' => 'required|string',
            'milestone.amount' => 'required|numeric|min:5',

            'milestone.project_id' => [
                'required',
                'integer',
                'exists_in_case:project_by_id_joined_project_members_where_role_is_owner_of_user,' . auth()->user()->id,
            ],
        ])->validate();

        if (!$employer_user) {
            return response()->error('EMPLOYEE_USER_NOT_FOUND');
        }

        if ($request->input('milestone.activate') && !$employer_user->default_credit_card) {
            return response()->error('NO_CREDIT_CARD');
        }

        DB::beginTransaction();

        try {
            $milestone = new Milestone;
            $milestone->contract_id = $contract->id;
            $milestone->title = $request->input('milestone.title');
            $milestone->amount = $request->input('milestone.amount');
            $milestone->project_id = (int) $request->input('milestone.project_id');
            $milestone->save();

            if ($request->input('milestone.activate')) {
                $payment = new Payment;
                $payment->user_id = $employer_user->id;
                $payment->original_amount = $milestone->amount;
                $payment->objective_type = 'Milestone';
                $payment->objective_id = $milestone->id;
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

                $milestone->payment_id = $payment->id;
                $milestone->save();
            }
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
}
