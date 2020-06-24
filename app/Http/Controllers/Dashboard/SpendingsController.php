<?php

namespace App\Http\Controllers\Dashboard;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Tracking\TrackingDay;
use App\Models\User\UserTransaction;
use App\Models\Money\Payout;
use App\Models\Milestone;

class SpendingsController extends Controller
{
	public function progress(Request $request)
	{
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



        // // Apply filter for project name
		// if($strProjectName = $request->get('project')) {
        //     $tracking_day_query->where('projects.name', $strProjectName);
        // }
		// // Apply filter for full name
        // if( $strFreelancerFullName = $request->get('full_name') ) {
        //     $arrFullName = explode(' ', $strFreelancerFullName );
        //     $tracking_day_query->where('users.first_name', $arrFullName[0]);
        //     $tracking_day_query->where('users.last_name', $arrFullName[1]);
        // }
		//
        // // Apply filter for date rage
        // if( $strDateRange = $request->get('date_range') ) {
        //     // Spliting date range
        //     if( strpos( $strDateRange, ' - ' ) ) {
        //         $arrDateRange = explode(' - ', $strDateRange);
        //         $strFirstDate = $arrDateRange[0];
        //         $strSecondDate = $arrDateRange[1];
        //         $tracking_day_query->where('tracking_days.created_at', '>=', date(\DateTime::ATOM, strtotime($strFirstDate)));
        //         $tracking_day_query->where('tracking_days.created_at', '<', date(\DateTime::ATOM, strtotime($strSecondDate) +  86400));
        //     }
        // }
        // else {
        //     $tracking_day_query->where('tracking_days.created_at', '>=', date(\DateTime::ATOM, floor(time() / 86400) * 86400));
        //     $tracking_day_query->where('tracking_days.created_at', '<', date(\DateTime::ATOM, floor(time() / 86400) * 86400 + 86400));
        // }

		$tracking_day_query->orderBy('tracking_days.created_at', 'desc');
		$tracking_day_query->orderBy('count_of_segments', 'desc');
		$tracking_days = $tracking_day_query->get();

		// Groupping full names and project names
		// $arrFullNames = [''];
		// $arrProjects = [''];
		// $objSpendings = TrackingDay::select('tracking_days.*');
		//
        // $objSpendings->with([
        //     'project',
        //     'user']);
		//
		// foreach($objSpendings->get() as $tracking_day)
        // {
        //     if(!in_array( $tracking_day->user->title, $arrFullNames ))
        //     {
        //         $arrFullNames[] = $tracking_day->user->title;
        //     }
		//
        //     if(!in_array( $tracking_day->project->name, $arrProjects ))
        //     {
        //         $arrProjects[] = $tracking_day->project->name;
        //     }
        // }

		return view('dashboard.spendings.progress', [
			'tracking_days' => $tracking_days,
            // 'arrProjects' => $arrProjects,
            // 'arrFullNames' => $arrFullNames,
		]);
	}

	public function review()
	{
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
		$tracking_day_query->where('projects.owner_user_id', auth()->user()->id);
		$tracking_day_query->where('tracking_days.created_at', '>=', date(\DateTime::ATOM, floor(time() / 86400) * 86400 - 86400 * 5));
		$tracking_day_query->where('tracking_days.created_at', '<', date(\DateTime::ATOM, floor(time() / 86400) * 86400));
		$tracking_day_query->orderBy('tracking_days.created_at', 'desc');
		$tracking_day_query->orderBy('count_of_segments', 'desc');
		$tracking_days = $tracking_day_query->get();

		return view('dashboard.spendings.review', [
			'tracking_days' => $tracking_days,
		]);
	}

	public function escrow()
	{
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
			'SELECT SUM(contracts.hourly_rate) / COUNT(contracts.hourly_ra
			te)',
			'FROM tracking_segments',
			'JOIN tracking_sessions ON tracking_sessions.id = tracking_segments.session_id',
			'JOIN contracts ON contracts.id = tracking_sessions.contract_id',
			'WHERE tracking_segments.day_id = tracking_days.id',
		])->join(' ') . ') AS average_hourly_rate');

		$tracking_day_query->join('projects', 'projects.id', '=', 'tracking_days.project_id');
		$tracking_day_query->where('projects.owner_user_id', auth()->user()->id);
		$tracking_day_query->where('tracking_days.created_at', '>=', date(\DateTime::ATOM, floor(time() / 86400) * 86400 - 86400 * 10));
		$tracking_day_query->where('tracking_days.created_at', '<', date(\DateTime::ATOM, floor(time() / 86400) * 86400 - 86400 * 5));
		$tracking_day_query->orderBy('tracking_days.created_at', 'desc');
		$tracking_day_query->orderBy('count_of_segments', 'desc');
		$tracking_days = $tracking_day_query->get();

		$milestone_query = Milestone::query();

		$milestone_query->with([
			'contract',
			'contract.employee_user',
			'contract.employee_user.image',
			'project',
		]);

        $milestone_query->join('contracts', 'contracts.id', '=', 'milestones.contract_id');
        $milestone_query->where('contracts.employer_user_id', auth()->user()->id);
        $milestone_query->where('milestones.released_at', '!=', null);
        $milestone_query->where('milestones.released_at', '>=', date(\DateTime::ATOM, time() - 86400 * 5));
        $milestones = $milestone_query->get();

		return view('dashboard.spendings.escrow', [
			'tracking_days' => $tracking_days,
			'milestones' => $milestones,
		]);
	}

	public function paid()
	{
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

		$tracking_day_query->join('projects', 'projects.id', '=', 'tracking_days.project_id');
		$tracking_day_query->where('projects.owner_user_id', auth()->user()->id);
		// $tracking_day_query->where('tracking_days.created_at', '>=', date(\DateTime::ATOM, floor(time() / 86400) * 86400 - 86400 * 10));
		$tracking_day_query->where('tracking_days.created_at', '<', date(\DateTime::ATOM, floor(time() / 86400) * 86400 - 86400 * 10));
		$tracking_day_query->orderBy('tracking_days.created_at', 'desc');
		$tracking_day_query->orderBy('count_of_segments', 'desc');
		$tracking_days = $tracking_day_query->get();

		return view('dashboard.spendings.paid', [
			'tracking_days' => $tracking_days,
		]);
	}
}
