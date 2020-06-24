<?php

namespace App\Http\Controllers\Dashboard;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Project\Project;
use App\Models\Tracking\TrackingDay;
use App\Models\Tracking\TrackingSegment;
use App\Models\User\UserTransaction;

class ReportsController extends Controller
{
    public function overview(Request $request)
    {
        // $project_query = Project::select('projects.*');
        // $project_query->join('project_members', 'project_members.project_id', '=', 'projects.id');

        // $project_query->join('contracts', function ($join) {
        //     $join->on('contracts.employer_user_id', '=', 'projects.owner_user_id');
        //     $join->on('contracts.employee_user_id', '=', 'project_members.user_id');
        // });

        // $project_query->where('project_members.user_id', auth()->user()->id);
        // $projects = $project_query->get();



        $project_query = Project::select('projects.*');
        $project_query->with('contract');
        $project_query->selectRaw('contracts.id AS contract_id');
        $project_query->selectRaw('contracts.closed_at AS contract_closed_at');
        // $project_query->selectRaw('contracts.hourly_rate AS contract_hourly_rate');
        // $project_query->selectRaw('contracts.finished_at AS contract_finished_at');
        $project_query->join('project_members', 'project_members.project_id', '=', 'projects.id');

        // $project_query->selectRaw('(' . collect([
        //     'SELECT COUNT(*)',
        //     'FROM contracts',
        //     'WHERE employer_user_id = projects.owner_user_id',
        //     'AND employee_user_id = project_members.user_id',
        //     'AND started_at IS NOT NULL',
        //     'AND finished_at IS NULL',
        // ])->join(' ') . ') AS count_of_contracts');

        $project_query->selectRaw('(' . collect([
            'SELECT COUNT(*)',
            'FROM tracking_segments',
            'JOIN tracking_sessions ON tracking_sessions.id = tracking_segments.session_id',
            'WHERE tracking_sessions.contract_id = contracts.id',
            'AND tracking_segments.created_at >= ?',
            'AND tracking_segments.created_at < ?',
        ])->join(' ') . ') AS count_of_segments', [
            date(\DateTime::ATOM, floor(time() / 86400) * 86400 - 10 * 86400),
            date(\DateTime::ATOM, floor(time() / 86400) * 86400 + 86400),
        ]);

        $project_query->join('contracts', function ($join) {
            $join->on('contracts.employer_user_id', '=', 'projects.owner_user_id');
            $join->on('contracts.employee_user_id', '=', 'project_members.user_id');
        });

        $project_query->havingRaw('contract_closed_at IS NOT NULL OR count_of_segments > 0');
        $project_query->where('project_members.user_id', auth()->user()->id);
        $project_query->orderBy('project_members.last_tracked_at', 'desc');
        $projects = $project_query->get();

        // ---------------------------------------------------------------------- //

        $tracking_segment_query = TrackingSegment::select('tracking_segments.*');
        $tracking_segment_query->selectRaw('COUNT(*) AS count_of_subsegments');
        $tracking_segment_query->selectRaw('tracking_sessions.project_id AS project_id');
        $tracking_segment_query->selectRaw('FLOOR(UNIX_TIMESTAMP(tracking_segments.created_at) / 86400) AS number');
        $tracking_segment_query->selectRaw('contracts.hourly_rate AS hourly_rate');
        $tracking_segment_query->selectRaw('contracts.id AS contract_id');
        $tracking_segment_query->selectRaw('COUNT(*) * contracts.hourly_rate / 60 AS earned_amount');
        $tracking_segment_query->join('tracking_sessions', 'tracking_sessions.id', '=', 'tracking_segments.session_id');
        $tracking_segment_query->join('contracts', 'contracts.id', '=', 'tracking_sessions.contract_id');
        $tracking_segment_query->where('tracking_sessions.user_id', auth()->user()->id);
        $tracking_segment_query->whereIn('tracking_sessions.project_id', $projects->pluck('id'));
        $tracking_segment_query->whereIn('tracking_sessions.contract_id', $projects->pluck('contract_id'));
        $tracking_segment_query->where('tracking_segments.created_at', '>=', date(\DateTime::ATOM, floor(time() / 86400) * 86400 - 10 * 86400));
        $tracking_segment_query->where('tracking_segments.created_at', '<', date(\DateTime::ATOM, floor(time() / 86400) * 86400 + 86400));
        $tracking_segment_query->groupBy('number', 'tracking_sessions.project_id', 'tracking_sessions.contract_id');
        $tracking_segments = $tracking_segment_query->get();

        // ---------------------------------------------------------------------- //

        foreach ($projects as $current_project) {
            $current_project->setRelation('tracking_segments', collect());
            $project_tracking_segments = $tracking_segments->where('project_id', $current_project->id);
            $project_tracking_segments = $project_tracking_segments->where('contract_id', $current_project->contract_id);

            for ($day_index = 0; $day_index <= 10; ++$day_index) {
                $current_project->tracking_segments->push($project_tracking_segments->filter(function ($tracking_segment) use ($day_index) {
                    return floor($tracking_segment->created_at->getTimestamp() / 86400) == floor(time() / 86400) - $day_index;
                })->first());
            }
        }

        $total = collect();

        for ($day_index = 0; $day_index <= 10; ++$day_index) {
            $total->push((object) [
                'count_of_subsegments' => $tracking_segments->filter(function ($tracking_segment) use ($day_index) {
                    return floor($tracking_segment->created_at->getTimestamp() / 86400) == floor(time() / 86400) - $day_index;
                })->sum('count_of_subsegments'),

                'earned_amount' => $tracking_segments->filter(function ($tracking_segment) use ($day_index) {
                    return floor($tracking_segment->created_at->getTimestamp() / 86400) == floor(time() / 86400) - $day_index;
                })->sum('earned_amount'),
            ]);
        }

        // $tracking_day_query = TrackingDay::query();
        // $tracking_day_query->selectRaw('SUM(contracts.hourly_rate) / 60 AS available_amount');
        // $tracking_day_query->join('tracking_segments', 'tracking_segments.day_id', '=', 'tracking_days.id');
        // $tracking_day_query->join('tracking_sessions', 'tracking_sessions.id', '=', 'tracking_segments.session_id');
        // $tracking_day_query->join('contracts', 'contracts.id', '=', 'tracking_sessions.contract_id');
        // $tracking_day_query->where('tracking_days.created_at', '<', date(\DateTime::ATOM, floor(time() / 86400) * 86400 + 1 * 86400));
        // // need to set -10 instead of 0 when tested);
        // $tracking_day_query->where('tracking_days.user_id', auth()->user()->id);
        // $tracking_day_query->where('tracking_days.payment_id', '!=', null);
        // $tracking_day_query->where('tracking_days.payout_id', null);
        // $available_amount = ($tracking_day_query->first()->available_amount ?: 0.0);

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

    	return view('dashboard.reports.overview', [
            'projects' => $projects,
            'total' => $total,
            'available_amount' => $available_amount,
        ]);
    }

    public function progress(Request $request)
    {
        $tracking_day_query = TrackingDay::query();
        $tracking_day_query->where('user_id', auth()->user()->id);

        // $tracking_segment_query = TrackingSegment::select('tracking_segments.*');
        // $tracking_segment_query->selectRaw('COUNT(*) AS count_of_subsegments');
        // $tracking_segment_query->selectRaw('tracking_sessions.project_id AS project_id');
        // $tracking_segment_query->selectRaw('FLOOR(UNIX_TIMESTAMP(tracking_segments.created_at) / 86400) AS number');
        // $tracking_segment_query->selectRaw('contracts.hourly_rate AS hourly_rate');
        // $tracking_segment_query->selectRaw('contracts.id AS contract_id');
        // $tracking_segment_query->selectRaw('COUNT(*) * contracts.hourly_rate / 60 AS earned_amount');
        // $tracking_segment_query->join('tracking_sessions', 'tracking_sessions.id', '=', 'tracking_segments.session_id');
        // $tracking_segment_query->join('contracts', 'contracts.id', '=', 'tracking_sessions.contract_id');
        // $tracking_segment_query->where('tracking_sessions.user_id', auth()->user()->id);
        // $tracking_segment_query->whereIn('tracking_sessions.project_id', $projects->pluck('id'));
        // $tracking_segment_query->whereIn('tracking_sessions.contract_id', $projects->pluck('contract_id'));
        // $tracking_segment_query->where('tracking_segments.created_at', '>=', date(\DateTime::ATOM, floor(time() / 86400) * 86400 - 10 * 86400));
        // $tracking_segment_query->where('tracking_segments.created_at', '<', date(\DateTime::ATOM, floor(time() / 86400) * 86400 + 86400));
        // $tracking_segment_query->groupBy('number', 'tracking_sessions.project_id', 'tracking_sessions.contract_id');
        // $tracking_segments = $tracking_segment_query->get();

        return view('dashboard.reports.progress', [
            'available_amount' => 0.0,
        ]);
    }

    public function review(Request $request)
    {
        return view('dashboard.reports.progress', [
            'available_amount' => 0.0,
        ]);
    }

    public function escrow(Request $request)
    {
        return view('dashboard.reports.progress', [
            'available_amount' => 0.0,
        ]);
    }

    public function available(Request $request)
    {
        return view('dashboard.reports.progress', [
            'available_amount' => 0.0,
        ]);
    }

    public function paid(Request $request)
    {
        return view('dashboard.reports.progress', [
            'available_amount' => 0.0,
        ]);
    }

    /**
     * Invoices default page - spendings
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function invoices(Request $request)
    {
        //Collecting data from tracking_days table
        $tracking_day_query = TrackingDay::select('tracking_days.*');

        $tracking_day_query->with([
            'project',
            'user',
            'user.image',
        ]);

        $tracking_day_query->selectRaw('(' . collect([
                'SELECT COUNT(*)',
                'FROM tracking_segments',
                'WHERE tracking_segments.day_id = tracking_days.id',
            ])->join(' ') . ') AS count_of_segments');

        $tracking_day_query->selectRaw('(' . collect([
                'SELECT SUM(contracts.hourly_rate) / 60',
                'FROM tracking_segments',
                'JOIN tracking_sessions ON tracking_sessions.id = tracking_segments.session_id',
                'JOIN contracts ON contracts.id = tracking_sessions.contract_id',
                'WHERE tracking_segments.day_id = tracking_days.id',
            ])->join(' ') . ') AS total_amount');

        $tracking_day_query->selectRaw('(' . collect([
                'SELECT SUM(contracts.hourly_rate) / COUNT(contracts.hourly_rate)',
                'FROM tracking_segments',
                'JOIN tracking_sessions ON tracking_sessions.id = tracking_segments.session_id',
                'JOIN contracts ON contracts.id = tracking_sessions.contract_id',
                'WHERE tracking_segments.day_id = tracking_days.id',
            ])->join(' ') . ') AS average_hourly_rate');

        $tracking_day_query->join('projects', 'projects.id', '=', 'tracking_days.project_id');
        $tracking_day_query->join('users', 'users.id', '=', 'tracking_days.user_id');
        $tracking_day_query->where('projects.owner_user_id', auth()->user()->id);

        // Apply filter for project name
        if($strProjectName = $request->get('project')) {
            $tracking_day_query->where('projects.name', $strProjectName);
        }
        // Apply filter for full name
        if( $strFreelancerFullName = $request->get('full_name') ) {
            $arrFullName = explode(' ', $strFreelancerFullName );
            $tracking_day_query->where('users.first_name', $arrFullName[0]);
            $tracking_day_query->where('users.last_name', $arrFullName[1]);
        }

        // Apply filter for date rage
        if( $strDateRange = $request->get('date_range') ) {
            // Spliting date range
            if( strpos( $strDateRange, ' - ' ) ) {
                $arrDateRange = explode(' - ', $strDateRange);
                $strFirstDate = $arrDateRange[0];
                $strSecondDate = $arrDateRange[1];
                $tracking_day_query->where('tracking_days.created_at', '>=', date(\DateTime::ATOM, strtotime($strFirstDate)));
                $tracking_day_query->where('tracking_days.created_at', '<', date(\DateTime::ATOM, strtotime($strSecondDate) +  86400));
            }
        }
        else{
            $tracking_day_query->where('tracking_days.created_at', '>=', date(\DateTime::ATOM, floor(time() / 86400) * 86400));
            $tracking_day_query->where('tracking_days.created_at', '<', date(\DateTime::ATOM, floor(time() / 86400) * 86400 + 86400));

        }

        // Apply filter for status
        if($strStatus = $request->get('status'))
        {
            switch ($strStatus)
            {
                case('progress'):
                    $tracking_day_query->where('tracking_days.created_at', '>=', date(\DateTime::ATOM, floor(time() / 86400) * 86400));
                    $tracking_day_query->where('tracking_days.created_at', '<', date(\DateTime::ATOM, floor(time() / 86400) * 86400 + 86400));
                    break;
                case('review'):
                    $tracking_day_query->where('tracking_days.created_at', '>=', date(\DateTime::ATOM, floor(time() / 86400) * 86400 - 86400 * 5));
                    $tracking_day_query->where('tracking_days.created_at', '<', date(\DateTime::ATOM, floor(time() / 86400) * 86400));
                    break;
                case('escrow'):
                    $tracking_day_query->where('tracking_days.created_at', '>=', date(\DateTime::ATOM, floor(time() / 86400) * 86400 - 86400 * 10));
                    $tracking_day_query->where('tracking_days.created_at', '<', date(\DateTime::ATOM, floor(time() / 86400) * 86400 - 86400 * 5));
                    break;
                case('paid'):
                    $tracking_day_query->where('tracking_days.created_at', '<', date(\DateTime::ATOM, floor(time() / 86400) * 86400 - 86400 * 10));
                    break;
            }
        }


        $tracking_day_query->orderBy('tracking_days.created_at', 'desc');
        $tracking_day_query->orderBy('count_of_segments', 'desc');
        $tracking_days = $tracking_day_query->get();

        // Groupping full names and project names
        $arrFullNames = ['All' => ''];
        $arrProjects = ['All' => ''];
        $objSpendings = TrackingDay::select('tracking_days.*');

        $objSpendings->with([
            'project',
            'user']);

        foreach($objSpendings->get() as $tracking_day)
        {
            if(!in_array( $tracking_day->user->title, $arrFullNames ))
            {
                $arrFullNames[$tracking_day->user->title] = $tracking_day->user->title;
            }

            if(!in_array( $tracking_day->project->name, $arrProjects ))
            {
                $arrProjects[$tracking_day->project->name] = $tracking_day->project->name;
            }
        }

        return view('temp.dashboard.reports.invoices', [
            'available_amount' => 0.0,
            'allRecords'=> $tracking_days,
            'arrProjects' => $arrProjects,
            'arrFullNames' => $arrFullNames,
        ]);
    }

    public function earnings(Request $request)
    {
        //Getting Data from tracking days table
        $tracking_day_query = TrackingDay::select('tracking_days.*');

        $tracking_day_query->with([
            'project',
            'project.owner_user',
            'project.owner_user.image',
        ]);

        $tracking_day_query->selectRaw('(' . collect([
                'SELECT COUNT(*)',
                'FROM tracking_segments',
                'WHERE tracking_segments.day_id = tracking_days.id',
            ])->join(' ') . ') AS count_of_segments');

        $tracking_day_query->selectRaw('(' . collect([
                'SELECT SUM(contracts.hourly_rate) / 60',
                'FROM tracking_segments',
                'JOIN tracking_sessions ON tracking_sessions.id = tracking_segments.session_id',
                'JOIN contracts ON contracts.id = tracking_sessions.contract_id',
                'WHERE tracking_segments.day_id = tracking_days.id',
            ])->join(' ') . ') AS total_amount');

        $tracking_day_query->selectRaw('(' . collect([
                'SELECT SUM(contracts.hourly_rate) / COUNT(contracts.hourly_rate)',
                'FROM tracking_segments',
                'JOIN tracking_sessions ON tracking_sessions.id = tracking_segments.session_id',
                'JOIN contracts ON contracts.id = tracking_sessions.contract_id',
                'WHERE tracking_segments.day_id = tracking_days.id',
            ])->join(' ') . ') AS average_hourly_rate');

        $tracking_day_query->where('tracking_days.user_id', auth()->user()->id);
        $tracking_day_query->join('projects', 'projects.id', '=', 'tracking_days.project_id');
        $tracking_day_query->join('users', 'projects.owner_user_id', '=', 'users.id');

        // Apply filter for date rage
        if( $strDateRange = $request->get('date_range') ) {
            // Spliting date range
            if( strpos( $strDateRange, ' - ' ) ) {
                $arrDateRange = explode(' - ', $strDateRange);
                $strFirstDate = $arrDateRange[0];
                $strSecondDate = $arrDateRange[1];
                $tracking_day_query->where('tracking_days.created_at', '>=', date(\DateTime::ATOM, strtotime($strFirstDate)));
                $tracking_day_query->where('tracking_days.created_at', '<', date(\DateTime::ATOM, strtotime($strSecondDate) +  86400));
            }
        }
        else{
            //Default get todays records
            $tracking_day_query->where('tracking_days.created_at', '>=', date(\DateTime::ATOM, floor(time() / 86400) * 86400 - 86400 * 10));
            $tracking_day_query->where('tracking_days.created_at', '<', date(\DateTime::ATOM, floor(time() / 86400) * 86400 + 86400));

        }

        // Apply filter for project name
        if($strProjectName = $request->get('project')) {
            $tracking_day_query->where('projects.name', $strProjectName);
        }
        // Apply filter for client full name
        if( $strClientFullName = $request->get('client_name') ) {
            $arrFullName = explode(' ', $strClientFullName );
            $tracking_day_query->where('users.first_name', $arrFullName[0]);
            $tracking_day_query->where('users.last_name', $arrFullName[1]);
        }

        // Apply filter for status
        if($strStatus = $request->get('status'))
        {
            switch ($strStatus)
            {
                case('progress'):
                    $tracking_day_query->where('tracking_days.created_at', '>=', date(\DateTime::ATOM, floor(time() / 86400) * 86400));
                    $tracking_day_query->where('tracking_days.created_at', '<', date(\DateTime::ATOM, floor(time() / 86400) * 86400 + 86400));
                    break;
                case('review'):
                    $tracking_day_query->where('tracking_days.created_at', '>=', date(\DateTime::ATOM, floor(time() / 86400) * 86400 - 86400 * 5));
                    $tracking_day_query->where('tracking_days.created_at', '<', date(\DateTime::ATOM, floor(time() / 86400) * 86400));
                    break;
                case('escrow'):
                    $tracking_day_query->where('tracking_days.created_at', '>=', date(\DateTime::ATOM, floor(time() / 86400) * 86400 - 86400 * 10));
                    $tracking_day_query->where('tracking_days.created_at', '<', date(\DateTime::ATOM, floor(time() / 86400) * 86400 - 86400 * 5));
                    break;
                case('paid'):
                    $tracking_day_query->where('tracking_days.created_at', '<', date(\DateTime::ATOM, floor(time() / 86400) * 86400 - 86400 * 10));
                    break;
            }
        }




        $tracking_day_query->orderBy('tracking_days.created_at', 'desc');
        $tracking_day_query->orderBy('count_of_segments', 'desc');
        $tracking_days = $tracking_day_query->get();

        // Groupping full names and project names
        $arrClients = ['All' => ''];
        $arrProjects = ['All' => ''];
        $objSpendings = TrackingDay::select('tracking_days.*')->where('user_id', auth()->user()->id);

        $objSpendings->with([
            'project',
            'user']);

        foreach($objSpendings->get() as $tracking_day)
        {
            if(!in_array( $tracking_day->project->owner_user->title, $arrClients ))
            {
                $arrClients[$tracking_day->project->owner_user->title] = $tracking_day->project->owner_user->title;
            }

            if(!in_array( $tracking_day->project->name, $arrProjects ))
            {
                $arrProjects[$tracking_day->project->name] = $tracking_day->project->name;
            }
        }

        return view('temp.dashboard.reports.earnings', [
            'available_amount' => 0.0,
            'allRecords'=> $tracking_days,
            'arrProjects' => $arrProjects,
            'arrClients' => $arrClients,
        ]);


    }

    /**
     * Function to get status based on created at date
     * @table tracking_days
     * @param $created_at
     * @return string
     */
    public static function getStatus($created_at){
        $today = date('Y-m-d');
        $today_time = strtotime($today);
        $created_at_time = strtotime($created_at);
        if($created_at_time >= $today_time
            && $created_at_time < $today_time + 86400)
        {
            return 'progress';
        }
        elseif ($created_at_time < $today_time
                 && $created_at_time > $today_time - 86400 * 5)
        {
            return 'review';
        }
        elseif ($created_at_time < $today_time - 86400 * 5
                    && $created_at_time > $today_time - 86400 * 10)
        {
            return 'escrow';
        }
        elseif ($created_at_time < $today_time - 86400 * 10)
        {
            return 'paid';
        }

    }

    public function index(Request $request)
    {
        return view('dashboard.reports.progress', [
            'available_amount' => 0.0,
        ]);
    }
}
