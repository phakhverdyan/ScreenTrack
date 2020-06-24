<?php

namespace App\Providers;

use App\Models\Language;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;
use App\Models\Tip;
use App\Models\User\UserTransaction;
use App\Models\Project\Project;
use App\Models\Referral\ReferralConnection;
use App\Models\Tracking\TrackingDay;
use App\Models\Tracking\TrackingSegment;
use App\Models\Milestone;
use App\Models\Contract;

class ViewServiceProvider extends ServiceProvider
{
	/**
	 * Register services.
	 *
	 * @return void
	 */
	public function register()
	{
		//
	}

	/**
	 * Bootstrap services.
	 *
	 * @return void
	 */
	public function boot()
	{
		View::addExtension('blade.ejs', 'blade');

		// ---------------------------------------------------------------------- //

		Blade::directive('modal', function($modal_name) {
			return '<?php ' .
				'echo $__env->make(\'modal\', [' .
					'\'name\' => ' . $modal_name . ',' .
				'], \Illuminate\Support\Arr::except(get_defined_vars(), [\'__data\', \'__path\']))->render(); ' .
			'?>';
		});

		Blade::directive('popover', function($popover_name) {
			return '<?php ' .
				'echo $__env->make(\'popover\', [' .
					'\'name\' => ' . $popover_name . ',' .
				'], \Illuminate\Support\Arr::except(get_defined_vars(), [\'__data\', \'__path\']))->render(); ' .
			'?>';
		});

		Blade::directive('slideup', function($slideup_name) {
			return '<?php ' .
				'echo $__env->make(\'slideup\', [' .
					'\'name\' => ' . $slideup_name . ',' .
				'], \Illuminate\Support\Arr::except(get_defined_vars(), [\'__data\', \'__path\']))->render(); ' .
			'?>';
		});

		Blade::directive('ejs_template', function($ejs_template_name) {
			return '<?php ' .
				'echo $__env->make(\'ejs_template\', [' .
					'\'name\' => ' . $ejs_template_name . ',' .
				'], \Illuminate\Support\Arr::except(get_defined_vars(), [\'__data\', \'__path\']))->render(); ' .
			'?>';
		});

		// ---------------------------------------------------------------------- //

		View::composer([
			'dashboard.layout',
			'dashboard.referrals.direct',
			'dashboard.referrals.indirect',
			'dashboard.referrals.tier_3',
			'dashboard.components.navbar',
		], function ($view) {
			$referral_connection_query = ReferralConnection::query();
			$referral_connection_query->where('referrer_user_id', auth()->user()->id);
			$referral_connection_query->where('tier', ReferralConnection::TIER_1);

			$count_of_tier1_referral_connections = (object) [
				'completed' => (clone $referral_connection_query)->where('progress', 1.0)->count(),
				'total' => (clone $referral_connection_query)->count(),
			];

			$view->with('count_of_tier1_referral_connections', $count_of_tier1_referral_connections);

			// ------------------------------------------------------------------ //

			$referral_connection_query = ReferralConnection::query();
			$referral_connection_query->where('referrer_user_id', auth()->user()->id);
			$referral_connection_query->where('tier', ReferralConnection::TIER_2);

			$count_of_tier2_referral_connections = (object) [
				'completed' => (clone $referral_connection_query)->where('progress', 1.0)->count(),
				'total' => (clone $referral_connection_query)->count(),
			];

			$view->with('count_of_tier2_referral_connections', $count_of_tier2_referral_connections);

			// ------------------------------------------------------------------ //

			$referral_connection_query = ReferralConnection::query();
			$referral_connection_query->where('referrer_user_id', auth()->user()->id);
			$referral_connection_query->where('tier', ReferralConnection::TIER_3);

			$count_of_tier3_referral_connections = (object) [
				'completed' => (clone $referral_connection_query)->where('progress', 1.0)->count(),
				'total' => (clone $referral_connection_query)->count(),
			];

			$view->with('count_of_tier3_referral_connections', $count_of_tier3_referral_connections);

			// ------------------------------------------------------------------ //

			$count_of_referral_connections = (object) [
				'completed' => (
					$count_of_tier1_referral_connections->completed
					+
					$count_of_tier2_referral_connections->completed
					+
					$count_of_tier3_referral_connections->completed
				),

				'total' => (
					$count_of_tier1_referral_connections->total
					+
					$count_of_tier2_referral_connections->total
					+
					$count_of_tier3_referral_connections->total
				),
			];

			$view->with('count_of_referral_connections', $count_of_referral_connections);
		});

		View::composer('layouts.main_layout', function ($view) {
			$view->with('referrer_user_id', request()->referrer_user_id);
			$view->with('ad_campaign_id', request()->ad_campaign_id);
		});

        View::composer('dashboard.layout', function ($view) {
        	$tip_query = Tip::select('tips.*');
        	$tip_query->selectRaw('user__tip.user_id IS NOT NULL AS is_viewed');

        	$tip_query->leftJoin('user__tip', function ($join) {
                $join->on('user__tip.tip_id', '=', 'tips.id');
                $join->where('user__tip.user_id', auth()->user()->id);
            });
        	
            $tip_query->orderBy('tips.step', 'ASC');
            $tips = $tip_query->get();
            
            $tips = $tips->filter(function ($tip) {
                return request()->route()->named($tip->route);
            })->values();

        	$view->with('tips', $tips);
        });

		View::composer('dashboard.layout', function ($view) {
			$view->with('counts_for_project_navbar', request()->counts_for_project_navbar);
		});

		View::composer([
			'dashboard.layout',
			'dashboard.projects.boards.main',
		], function ($view) {
			$view->with('selected_project', request()->selected_project);
		});

		View::composer('components.footer.main', function ($view) {
			$available_locales = config('app.available_locales');
			$languages = Language::whereIn('code', $available_locales)->get();

			$footer_languages = [];

			foreach ($available_locales as $locale) {
				$language = $languages->where('code', $locale)->first();

				if ($language) {
					$footer_languages[$locale]['language'] = $language;

					$segments = request()->segments();
					$segments[0] = $locale;
					$footer_languages[$locale]['url'] = '/' . implode('/', $segments);
				}
			}

			$view->with(compact('footer_languages'));
		});

		View::composer('components.livechat', function ($view) {
			$view->with('visitor', auth()->check() ? [
				'name' => auth()->user()->full_name,
				'email' => auth()->user()->email,
			] : []);

			$view->with('params', auth()->check() ? [
				['ID' => auth()->user()->ID],
			] : []);
		});

		View::composer([
			'dashboard.layout',
		], function ($view) {
			$contract_query = Contract::query();

			$contract_query->where(function ($where) {
				$where->orWhere('employer_user_id', auth()->user()->id);
				$where->orWhere('employee_user_id', auth()->user()->id);
			});

			$count_of_contracts = $contract_query->count();
			$count_of_companies = auth()->user()->companies()->count();

			$view->with('count_of_contracts', $count_of_contracts);
			$view->with('count_of_companies', $count_of_companies);
		});

		View::composer([
			'dashboard.components.navbar',
			'dashboard.earnings.progress',
			'dashboard.earnings.review',
			'dashboard.earnings.escrow',
			'dashboard.earnings.available',
			'dashboard.earnings.paid',
		], function ($view) {
			$tracking_segment_query = TrackingSegment::selectRaw('SUM(contracts.hourly_rate) / 60 AS total_amount');
			$tracking_segment_query->join('tracking_days', 'tracking_days.id', '=', 'tracking_segments.day_id');
			$tracking_segment_query->join('tracking_sessions', 'tracking_sessions.id', '=', 'tracking_segments.session_id');
			$tracking_segment_query->join('contracts', 'contracts.id', '=', 'tracking_sessions.contract_id');
			$tracking_segment_query->whereRaw('tracking_segments.day_id = tracking_days.id');
			$tracking_segment_query->where('tracking_days.user_id', auth()->user()->id);
			$tracking_segment_query->where('tracking_days.created_at', '>=', date(\DateTime::ATOM, floor(time() / 86400) * 86400));
			$tracking_segment_query->where('tracking_days.created_at', '<', date(\DateTime::ATOM, floor(time() / 86400) * 86400 + 86400));
			$progress_amount = floor(($tracking_segment_query->first()->total_amount ?? 0.0) * 100.0) / 100.0;

			// ---------------------------------------------------------------------- //

			$tracking_segment_query = TrackingSegment::selectRaw('SUM(contracts.hourly_rate) / 60 AS total_amount');
			$tracking_segment_query->join('tracking_days', 'tracking_days.id', '=', 'tracking_segments.day_id');
			$tracking_segment_query->join('tracking_sessions', 'tracking_sessions.id', '=', 'tracking_segments.session_id');
			$tracking_segment_query->join('contracts', 'contracts.id', '=', 'tracking_sessions.contract_id');
			$tracking_segment_query->whereRaw('tracking_segments.day_id = tracking_days.id');
			$tracking_segment_query->where('tracking_days.user_id', auth()->user()->id);
			$tracking_segment_query->where('tracking_days.created_at', '>=', date(\DateTime::ATOM, floor(time() / 86400) * 86400 - 5 * 86400));
			$tracking_segment_query->where('tracking_days.created_at', '<', date(\DateTime::ATOM, floor(time() / 86400) * 86400));
			$review_amount = floor(($tracking_segment_query->first()->total_amount ?? 0.0) * 100.0) / 100.0;

			// ---------------------------------------------------------------------- //

			$tracking_segment_query = TrackingSegment::selectRaw('SUM(contracts.hourly_rate) / 60 AS total_amount');
			$tracking_segment_query->join('tracking_days', 'tracking_days.id', '=', 'tracking_segments.day_id');
			$tracking_segment_query->join('tracking_sessions', 'tracking_sessions.id', '=', 'tracking_segments.session_id');
			$tracking_segment_query->join('contracts', 'contracts.id', '=', 'tracking_sessions.contract_id');
			$tracking_segment_query->whereRaw('tracking_segments.day_id = tracking_days.id');
			$tracking_segment_query->where('tracking_days.user_id', auth()->user()->id);
			$tracking_segment_query->where('tracking_days.created_at', '>=', date(\DateTime::ATOM, floor(time() / 86400) * 86400 - 10 * 86400));
			$tracking_segment_query->where('tracking_days.created_at', '<', date(\DateTime::ATOM, floor(time() / 86400) * 86400 - 5 * 86400));

			$milestone_query = Milestone::selectRaw('SUM(milestones.amount) AS total_amount');
			$milestone_query->join('contracts', 'contracts.id', '=', 'milestones.contract_id');
			$milestone_query->where('contracts.employee_user_id', auth()->user()->id);
			$milestone_query->where('milestones.released_at', '!=', null);
        	$milestone_query->where('milestones.released_at', '>=', date(\DateTime::ATOM, time() - 86400 * 5));

			$escrow_amount = floor(array_sum([
				$tracking_segment_query->first()->total_amount ?? 0.0,
				$milestone_query->first()->total_amount ?? 0.0,
			]) * 100.0) / 100.0;

			// ---------------------------------------------------------------------- //

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

			// ---------------------------------------------------------------------- //

			$view->with('earning_amounts', (object) [
				'progress' => $progress_amount,
				'review' => $review_amount,
				'escrow' => $escrow_amount,
				'available' => $available_amount,
			]);
		});

		View::composer([
			'dashboard.layout',
			'dashboard.spendings.progress',
			'dashboard.spendings.review',
			'dashboard.spendings.escrow',
			'dashboard.spendings.paid',
		], function ($view) {
			$tracking_segment_query = TrackingSegment::selectRaw('SUM(contracts.hourly_rate) / 60 AS total_amount');
			$tracking_segment_query->join('tracking_days', 'tracking_days.id', '=', 'tracking_segments.day_id');
			$tracking_segment_query->join('tracking_sessions', 'tracking_sessions.id', '=', 'tracking_segments.session_id');
			$tracking_segment_query->join('contracts', 'contracts.id', '=', 'tracking_sessions.contract_id');
			$tracking_segment_query->whereRaw('tracking_segments.day_id = tracking_days.id');
			$tracking_segment_query->join('projects', 'projects.id', '=', 'tracking_days.project_id');
			$tracking_segment_query->where('projects.owner_user_id', auth()->user()->id);
			$tracking_segment_query->where('tracking_days.created_at', '>=', date(\DateTime::ATOM, floor(time() / 86400) * 86400));
			$tracking_segment_query->where('tracking_days.created_at', '<', date(\DateTime::ATOM, floor(time() / 86400) * 86400 + 86400));
			$progress_amount = floor(($tracking_segment_query->first()->total_amount ?? 0.0) * 100.0) / 100.0;

			// ---------------------------------------------------------------------- //

			$tracking_segment_query = TrackingSegment::selectRaw('SUM(contracts.hourly_rate) / 60 AS total_amount');
			$tracking_segment_query->join('tracking_days', 'tracking_days.id', '=', 'tracking_segments.day_id');
			$tracking_segment_query->join('tracking_sessions', 'tracking_sessions.id', '=', 'tracking_segments.session_id');
			$tracking_segment_query->join('contracts', 'contracts.id', '=', 'tracking_sessions.contract_id');
			$tracking_segment_query->whereRaw('tracking_segments.day_id = tracking_days.id');
			$tracking_segment_query->join('projects', 'projects.id', '=', 'tracking_days.project_id');
			$tracking_segment_query->where('projects.owner_user_id', auth()->user()->id);
			$tracking_segment_query->where('tracking_days.created_at', '>=', date(\DateTime::ATOM, floor(time() / 86400) * 86400 - 5 * 86400));
			$tracking_segment_query->where('tracking_days.created_at', '<', date(\DateTime::ATOM, floor(time() / 86400) * 86400));
			$review_amount = floor(($tracking_segment_query->first()->total_amount ?? 0.0) * 100.0) / 100.0;

			// ---------------------------------------------------------------------- //

			$tracking_segment_query = TrackingSegment::selectRaw('SUM(contracts.hourly_rate) / 60 AS total_amount');
			$tracking_segment_query->join('tracking_days', 'tracking_days.id', '=', 'tracking_segments.day_id');
			$tracking_segment_query->join('tracking_sessions', 'tracking_sessions.id', '=', 'tracking_segments.session_id');
			$tracking_segment_query->join('contracts', 'contracts.id', '=', 'tracking_sessions.contract_id');
			$tracking_segment_query->whereRaw('tracking_segments.day_id = tracking_days.id');
			$tracking_segment_query->join('projects', 'projects.id', '=', 'tracking_days.project_id');
			$tracking_segment_query->where('projects.owner_user_id', auth()->user()->id);
			$tracking_segment_query->where('tracking_days.created_at', '>=', date(\DateTime::ATOM, floor(time() / 86400) * 86400 - 10 * 86400));
			$tracking_segment_query->where('tracking_days.created_at', '<', date(\DateTime::ATOM, floor(time() / 86400) * 86400 - 5 * 86400));

			$milestone_query = Milestone::selectRaw('SUM(milestones.amount) AS total_amount');
			$milestone_query->join('contracts', 'contracts.id', '=', 'milestones.contract_id');
			$milestone_query->where('contracts.employer_user_id', auth()->user()->id);
			$milestone_query->where('milestones.released_at', '!=', null);
        	$milestone_query->where('milestones.released_at', '>=', date(\DateTime::ATOM, time() - 86400 * 5));

			$escrow_amount = floor(array_sum([
				$tracking_segment_query->first()->total_amount ?? 0.0,
				$milestone_query->first()->total_amount ?? 0.0,
			]) * 100.0) / 100.0;

			// ---------------------------------------------------------------------- //

			$tracking_segment_query = TrackingSegment::selectRaw('SUM(contracts.hourly_rate) / 60 AS total_amount');
			$tracking_segment_query->join('tracking_days', 'tracking_days.id', '=', 'tracking_segments.day_id');
			$tracking_segment_query->join('tracking_sessions', 'tracking_sessions.id', '=', 'tracking_segments.session_id');
			$tracking_segment_query->join('contracts', 'contracts.id', '=', 'tracking_sessions.contract_id');
			$tracking_segment_query->whereRaw('tracking_segments.day_id = tracking_days.id');
			$tracking_segment_query->join('projects', 'projects.id', '=', 'tracking_days.project_id');
			$tracking_segment_query->where('projects.owner_user_id', auth()->user()->id);
			$tracking_segment_query->where('tracking_days.created_at', '<', date(\DateTime::ATOM, floor(time() / 86400) * 86400 - 10 * 86400));
			$paid_amount = floor(($tracking_segment_query->first()->total_amount ?? 0.0) * 100.0) / 100.0;

			// ---------------------------------------------------------------------- //

			$view->with('spending_amounts', (object) [
				'progress' => $progress_amount,
				'review' => $review_amount,
				'escrow' => $escrow_amount,
				'paid' => $paid_amount,
			]);
		});
	}
}
