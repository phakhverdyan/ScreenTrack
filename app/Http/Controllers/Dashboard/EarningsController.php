<?php

namespace App\Http\Controllers\Dashboard;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User\UserTransaction;
use App\Models\Money\Payout;
use App\Models\Tracking\TrackingDay;
use App\Models\Milestone;

class EarningsController extends Controller
{
    public function progress()
    {
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
    	$tracking_day_query->where('tracking_days.created_at', '>=', date(\DateTime::ATOM, floor(time() / 86400) * 86400));
        $tracking_day_query->where('tracking_days.created_at', '<', date(\DateTime::ATOM, floor(time() / 86400) * 86400 + 86400));
        $tracking_day_query->orderBy('tracking_days.created_at', 'desc');
        $tracking_day_query->orderBy('count_of_segments', 'desc');
    	$tracking_days = $tracking_day_query->get();

    	return view('dashboard.earnings.progress', [
    		'tracking_days' => $tracking_days,
    	]);
    }

    public function review()
    {
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
    	$tracking_day_query->where('tracking_days.created_at', '>=', date(\DateTime::ATOM, floor(time() / 86400) * 86400 - 86400 * 5));
        $tracking_day_query->where('tracking_days.created_at', '<', date(\DateTime::ATOM, floor(time() / 86400) * 86400));
        $tracking_day_query->orderBy('tracking_days.created_at', 'desc');
        $tracking_day_query->orderBy('count_of_segments', 'desc');
    	$tracking_days = $tracking_day_query->get();

    	return view('dashboard.earnings.review', [
    		'tracking_days' => $tracking_days,
    	]);
    }

    public function escrow()
    {
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

    	$tracking_day_query->where(
    	    'tracking_days.created_at',
            '>=',
            date(\DateTime::ATOM, floor(time() / 86400) * 86400 - 86400 * 10)
        );

        $tracking_day_query->where(
            'tracking_days.created_at',
            '<',
            date(\DateTime::ATOM, floor(time() / 86400) * 86400 - 86400 * 5)
        );

        $tracking_day_query->orderBy('tracking_days.created_at', 'desc');
        $tracking_day_query->orderBy('count_of_segments', 'desc');
    	$tracking_days = $tracking_day_query->get();

        $milestone_query = Milestone::query();

        $milestone_query->with([
            'contract',
            'contract.employer_user',
            'contract.employer_user.image',
            'project',
        ]);

        $milestone_query->join('contracts', 'contracts.id', '=', 'milestones.contract_id');
        $milestone_query->where('contracts.employee_user_id', auth()->user()->id);
        $milestone_query->where('milestones.released_at', '!=', null);
        $milestone_query->where('milestones.released_at', '>=', date(\DateTime::ATOM, time() - 86400 * 5));
        $milestones = $milestone_query->get();

    	return view('dashboard.earnings.escrow', [
    		'tracking_days' => $tracking_days,
            'milestones' => $milestones,
    	]);
    }

    public function available()
    {
    	return view('dashboard.earnings.available');
    }

    public function paid()
    {
    	$payout_query = Payout::query();
    	$payout_query->where('user_id', auth()->user()->id);
    	$payouts = $payout_query->get();

    	return view('dashboard.earnings.paid', [
    		'payouts' => $payouts,
    	]);
    }
}
