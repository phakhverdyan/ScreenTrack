<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Contract;

class ContractController extends Controller
{
    public function list()
    {
        $contract_query = Contract::select('contracts.*');

        $contract_query->selectRaw('(' . collect([
			'SELECT COUNT(*)',
			'FROM tracking_segments',
			'JOIN tracking_sessions ON tracking_sessions.id = tracking_segments.session_id',
			'WHERE tracking_sessions.contract_id = contracts.id',
		])->join(' ') . ') AS count_of_segments');

        $contract_query->selectRaw('(' . collect([
            'SELECT COUNT(*)',
            'FROM tracking_segments',
            'JOIN tracking_sessions ON tracking_sessions.id = tracking_segments.session_id',
            'JOIN tracking_days ON tracking_days.id = tracking_segments.day_id',
            'WHERE tracking_sessions.contract_id = contracts.id',
            'AND tracking_days.created_at >= ?',
            'AND tracking_days.created_at < ?',
        ])->join(' ') . ') AS count_of_progress_segments', [
            date(\DateTime::ATOM, floor(time() / 86400) * 86400),
            date(\DateTime::ATOM, floor(time() / 86400) * 86400 + 86400),
        ]);

        $contract_query->selectRaw('(' . collect([
            'SELECT COUNT(*)',
            'FROM tracking_segments',
            'JOIN tracking_sessions ON tracking_sessions.id = tracking_segments.session_id',
            'JOIN tracking_days ON tracking_days.id = tracking_segments.day_id',
            'WHERE tracking_sessions.contract_id = contracts.id',
            'AND tracking_days.created_at >= ?',
            'AND tracking_days.created_at < ?',
        ])->join(' ') . ') AS count_of_review_segments', [
            date(\DateTime::ATOM, floor(time() / 86400) * 86400 - 86400 * 5),
            date(\DateTime::ATOM, floor(time() / 86400) * 86400),
        ]);

        $contract_query->selectRaw('(' . collect([
            'SELECT COUNT(*)',
            'FROM tracking_segments',
            'JOIN tracking_sessions ON tracking_sessions.id = tracking_segments.session_id',
            'JOIN tracking_days ON tracking_days.id = tracking_segments.day_id',
            'WHERE tracking_sessions.contract_id = contracts.id',
            'AND tracking_days.created_at >= ?',
            'AND tracking_days.created_at < ?',
        ])->join(' ') . ') AS count_of_escrow_segments', [
            date(\DateTime::ATOM, floor(time() / 86400) * 86400 - 86400 * 10),
            date(\DateTime::ATOM, floor(time() / 86400) * 86400 - 86400 * 5),
        ]);

        $contract_query->selectRaw('(' . collect([
            'SELECT COUNT(*)',
            'FROM tracking_segments',
            'JOIN tracking_sessions ON tracking_sessions.id = tracking_segments.session_id',
            'JOIN tracking_days ON tracking_days.id = tracking_segments.day_id',
            'WHERE tracking_sessions.contract_id = contracts.id',
            'AND tracking_days.created_at < ?',
        ])->join(' ') . ') AS count_of_paid_segments', [
            date(\DateTime::ATOM, floor(time() / 86400) * 86400 - 86400 * 10),
        ]);

        $contract_query->selectRaw('(' . collect([
            'SELECT SUM(milestones.amount)',
            'FROM milestones',
            'WHERE milestones.contract_id = contracts.id',
        ])->join(' ') . ') AS total_amount');

		$contract_query->selectRaw('(' . collect([
			'SELECT SUM(milestones.amount)',
			'FROM milestones',
			'WHERE milestones.contract_id = contracts.id',
            'AND milestones.released_at IS NOT NULL',
		])->join(' ') . ') AS total_spent');

		$contract_query->selectRaw('(' . collect([
			'SELECT COALESCE(SUM(milestones.amount), 0.0)',
			'FROM milestones',
			'WHERE milestones.contract_id = contracts.id',
			'AND milestones.released_at IS NULL',
		])->join(' ') . ') AS remaining_amount');

        $contract_query->selectRaw('(' . collect([
            'SELECT COALESCE(SUM(milestones.amount), 0.0)',
            'FROM milestones',
            'WHERE milestones.contract_id = contracts.id',
            'AND milestones.released_at IS NOT NULL',
            'AND milestones.released_at >= ?',
        ])->join(' ') . ') AS escrow_amount', [
            date(\DateTime::ATOM, time() - 5 * 86400),
        ]);

        $contract_query->selectRaw('(' . collect([
            'SELECT COALESCE(SUM(milestones.amount), 0.0)',
            'FROM milestones',
            'WHERE milestones.contract_id = contracts.id',
            'AND milestones.released_at IS NOT NULL',
            'AND milestones.released_at < ?',
        ])->join(' ') . ') AS paid_amount', [
            date(\DateTime::ATOM, time() - 5 * 86400),
        ]);

        $contract_query->with([
        	'employer_user',
			'employer_user.image',
			'employee_user',
			'employee_user.image',
		]);

        $contract_query->where(function ($where) {
        	$where->orWhere('contracts.employer_user_id', auth()->user()->id);
        	$where->orWhere('contracts.employee_user_id', auth()->user()->id);
        });

        $contract_query->orderBy('contracts.id', 'desc');
        $contracts = $contract_query->paginate(5);

        foreach ($contracts as $contract) {
			$contract->makeVisible('hourly_rate');
		}

        return view('dashboard.contracts.list', [
        	'contracts' => $contracts,
        ]);
    }

    public function index($contract_id)
    {
    	$contract = Contract::findOrFail($contract_id);
    	auth()->user()->canAccessContractOrForbidden($contract);

        $contract->load([
            'employer_user',
            'employer_user.image',
            'employee_user',
            'employee_user.image',
        ]);

        if ($contract->type == Contract::TYPE_FIXED_PRICE) {
            $contract->load([
                'milestones' => function ($query) {
                    $query->orderBy('id', 'asc');
                },

                'milestones.project',
            ]);

            // $remaining_amount = $contract->milestones->where('released_at', null)->sum('amount');

            // $escrow_amount = $contract->milestones->filter(function ($milestone) {
            //     if (!$milestone->released_at) {
            //         return false;
            //     }

            //     return time() - $milestone->released_at->getTimestamp() <= 5 * 86400;
            // })->sum('amount');

            // $paid_amount = $contract->milestones->filter(function ($milestone) {
            //     if (!$milestone->released_at) {
            //         return false;
            //     }

            //     return time() - $milestone->released_at->getTimestamp() > 5 * 86400;
            // })->sum('amount');

            // $budget_amount = $contract->milestones->sum('amount');
            
        	return view('dashboard.contracts.index', [
        		'contract' => $contract,
                // 'remaining_amount' => $remaining_amount,
                // 'escrow_amount' => $escrow_amount,
                // 'paid_amount' => $paid_amount,
                // 'budget_amount' => $budget_amount,
        	]);
        }

        if ($contract->type == Contract::TYPE_HOURLY) {
            return view('dashboard.contracts.index', [
                'contract' => $contract,
                // 'remaining_amount' => $remaining_amount,
                // 'escrow_amount' => $escrow_amount,
                // 'paid_amount' => $paid_amount,
                // 'budget_amount' => $budget_amount,
                // 'current_milestone' => $current_milestone,
            ]);
        }

        throw new \Exception('Unknown contract type: ' . $contract->type);
    }
}
