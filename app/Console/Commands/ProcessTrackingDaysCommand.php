<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Models\Money\Payment;
use App\Models\Money\Deposit;
use App\Models\User\User;
use App\Models\User\UserTransaction;
use App\Models\Tracking\TrackingDay;
use App\Models\Tracking\TrackingSegment;
use App\Models\Referral\ReferralConnection;

class ProcessTrackingDaysCommand extends Command
{
	/**
	 * The name and signature of the console command.
	 *
	 * @var string
	 */
	protected $signature = 'process_tracking_days';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Process Tracking Days: make payments, etc.';

	/**
	 * Create a new command instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		parent::__construct();
	}

	/**
	 * Execute the console command.
	 *
	 * @return mixed
	 */
	public function handle()
	{
		$this->make_payments_as_user();
	}

	public function make_payments_as_user()
	{
		$current_time = time();

		$employer_user_query = User::select('users.*');
		
		$employer_user_query->with([
			'default_credit_card',
			'administrator',
		]);

		$employer_user_query->whereRaw('EXISTS(' . collect([
			'SELECT *',
			'FROM user_credit_cards',
			'WHERE user_credit_cards.user_id = users.id',
			'AND user_credit_cards.is_default = 1',
		])->join(' ') . ')');

		$employer_user_query->whereRaw('EXISTS(' . collect([
			'SELECT *',
			'FROM tracking_days',
			'JOIN projects ON tracking_days.project_id = projects.id',
			'WHERE projects.owner_user_id = users.id',
			'AND projects.related_company_id IS NULL',
			'AND (tracking_days.created_at < ? OR tracking_days.is_expedited = 1)',
			'AND tracking_days.payment_id IS NULL',
		])->join(' ') . ')', [
			date(\DateTime::ATOM, floor($current_time / 86400) * 86400 - 1 * 86400),
		]);

		$employer_user_query->take(100);
		$employer_users = $employer_user_query->get();
		// dd($employer_users->toArray());

		foreach ($employer_users as $employer_user) {
			$tracking_day_query = TrackingDay::select('tracking_days.*');
			$tracking_day_query->join('projects', 'projects.id', '=', 'tracking_days.project_id');
			$tracking_day_query->where('projects.owner_user_id', $employer_user->id);
			$tracking_day_query->where('projects.related_company_id', null);
			
			$tracking_day_query->where(function ($where) use ($current_time) {
				$where->orWhereRaw('tracking_days.created_at < ?', [
					date(\DateTime::ATOM, floor($current_time / 86400) * 86400 - 1 * 86400),
					// date(\DateTime::ATOM, floor($current_time / 86400)), // before tomorrow 0:00
				]);

				$where->orWhere('tracking_days.is_expedited', true);
			});

			$tracking_day_query->where('tracking_days.payment_id', null);
			$tracking_days = $tracking_day_query->get();
			// dd($tracking_days->toArray());

			if ($tracking_days->count() == 0) {
				continue;
			}

			$tracking_segment_query = TrackingSegment::select('tracking_segments.*');

			$tracking_segment_query->with([
				'user',
			]);

			$tracking_segment_query->selectRaw('SUM(contracts.hourly_rate) / 60 AS amount_to_pay');
			$tracking_segment_query->selectRaw('tracking_sessions.user_id AS user_id');
			$tracking_segment_query->join('tracking_sessions', 'tracking_sessions.id', '=', 'tracking_segments.session_id');
			$tracking_segment_query->join('contracts', 'contracts.id', '=', 'tracking_sessions.contract_id');
			$tracking_segment_query->whereIn('tracking_segments.day_id', $tracking_days->pluck('id'));
			$tracking_segment_query->groupBy('tracking_sessions.user_id');
			$tracking_segments = $tracking_segment_query->get();

			foreach ($tracking_segments as $tracking_segment) {
				$tracking_segment->setRelation('day', $tracking_days->where('id', $tracking_segment->day_id)->first());
			}

			$total_amount_to_pay = $tracking_segments->sum('amount_to_pay');
			// dd($tracking_days->toArray());

			DB::beginTransaction();

			try {
				$payment = new Payment;
				$payment->user_id = $employer_user->id;
				$payment->original_amount = $total_amount_to_pay;
				$payment->objective_type = 'TrackingDays';
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

				foreach ($tracking_days as $tracking_day) {
					$tracking_day->payment_id = $payment->id;
					$tracking_day->save();
				}

				foreach ($tracking_segments as $tracking_segment) {
					$user_transaction = new UserTransaction;
					$user_transaction->user_id = $tracking_segment->user->id;
					$user_transaction->amount = +$tracking_segment->amount_to_pay; // should it be ORIGINAL amount or FINAL amount?

					$user_transaction->processing_fee = (
						ceil(($tracking_segment->amount_to_pay / 100.0 * config('fees.processing.percentage')) / 2 * 100) * 2 / 100
						+
						config('fees.processing.fixed')
					) / 2;

					$user_transaction->action_type = 'Payment';
					$user_transaction->action_id = $payment->id;
					$user_transaction->state = UserTransaction::STATE_SUCCESS;

					if ($tracking_segment->day->is_expedited) {
						$user_transaction->frozen_till = null;
					} else {
						$user_transaction->frozen_till = (new \DateTime)->setTimestamp(
							floor($tracking_segment->day->created_at->getTimestamp() / 86400) * 86400 + 11 * 86400
						);
					}

					$user_transaction->save();

					$tracking_segment->user->recalculateBalance();
					$tracking_segment->user->save();

					$tracking_segment->user->releaseReferrersRemuneration(
						$user_transaction->processing_fee,
						ReferralConnection::INVITED_USER_TYPE_FREELANCER
					);
				}

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
						echo 'Payment for User #' . $employer_user->id . ' Failed' . "\n";
						continue;
					}

					$deposit->stripe_charge_id = $stripe_charge->id;
					$deposit->save();
				}
			} catch (\Stripe\Error\Card $exception) {
				$exception_body = $exception->getJsonBody();
				$exception_error = $exception_body['error'];
				DB::rollback();
				echo 'Payment for User #' . $employer_user->id . ' Failed, code: ' . $exception_error['code'] . "\n";
				continue;
			} catch (\Exception $exception) {
				DB::rollback();
				throw $exception;
			}

			DB::commit();
		}

		echo 'Done.' . "\n";
	}
}
