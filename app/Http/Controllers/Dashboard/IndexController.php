<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Contract;
use App\Models\Project\Project;
use App\Models\Project\ProjectMember;
use App\Models\Tracking\TrackingSegment;

class IndexController extends Controller
{
    public function index()
    {
    	$project_query = Project::query();
    	$project_query->select('projects.*');
    	$project_query->join('project_members', 'project_members.project_id', '=', 'projects.id');
    	$project_query->where('project_members.user_id', auth()->user()->id);
    	$project_query->orderBy('project_members.last_viewed_at', 'desc');
    	$last_worked_project = $project_query->first();

        return redirect()->route('dashboard.project', [$last_worked_project->id]);
    }

    public function overview()
    {
        $contract_query = Contract::select('contracts.*');

        // $contract_query->selectRaw('(' . collect([
        //     'SELECT COUNT(*)',
        //     'FROM tracking_segments',
        //     'JOIN tracking_sessions ON tracking_sessions.id = tracking_segments.session_id',
        //     'WHERE tracking_sessions.contract_id = contract.id',
        //     'AND tracking_segments.created_at >= ?',
        //     'ADN tracking_segments.created_at < ?',
        // ])->join(' ') . ') AS count_of_segments');

        $contract_query->with([
            'employee_user',
            'employee_user.image',

            'segments' => function ($query) {
                $query->select('tracking_segments.*');
                $query->selectRaw('FLOOR(UNIX_TIMESTAMP(tracking_segments.created_at) / 60 / 60) AS hour_index');
                $query->selectRaw('COUNT(tracking_segments.id) AS count_of_subsegments');
                $query->selectRaw('SUM(count_of_keyboard_clicks) AS count_of_keyboard_clicks');
                $query->selectRaw('SUM(count_of_mouse_clicks) AS count_of_mouse_clicks');
                $query->where('tracking_segments.created_at', '>=', date(\DateTime::ATOM, floor(time() / 86400) * 86400));
                $query->where('tracking_segments.created_at', '<', date(\DateTime::ATOM, floor(time() / 86400) * 86400 + 86400));
                $query->groupBy('contract_id', 'hour_index');
                // $query->limit(10);
            },
        ]);

        $contract_query->where('employer_user_id', auth()->user()->id);
        $contract_query->where('closed_at', null);
        $contracts = $contract_query->get();

        foreach ($contracts as $contract) {
            $contract->count_of_segments = $contract->segments->sum('count_of_subsegments');
        }

        $contracts = $contracts->sortByDesc('count_of_segments')->values();

        // print_r($contracts->toArray());
        // return 1;

        // $tracking_day_query = TrackingSegment::select('tracking_segments.*');
        // $tracking_day_query->selectRaw('SUM()');
        // $tracking_day_query->join('tracking_sessions', 'tracking_sessions.id', '=', 'tracking_segments.session_id');
        // $tracking_day_query->join('contracts', 'contracts.id', '=', 'tracking_sessions.contract_id');
        // $tracking_day_query->where('contracts.employer_user_id', auth()->user()->id);
        // $tracking_day_query->where('tracking_segments.created_at', '>=', date(\DateTime::ATOM, floor(time() / 86400) * 86400));
        // $tracking_day_query->where('tracking_segments.created_at', '<', date(\DateTime::ATOM, floor(time() / 86400) * 86400 + 86400));
        // $tracking_days = $tracking_day_query->get();

        return view('dashboard.overview.main', [
            'contracts' => $contracts,
        ]);
    }
}
