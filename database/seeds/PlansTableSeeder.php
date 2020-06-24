<?php

use Illuminate\Database\Seeder;
use App\Models\Plan\Plan;

class PlansTableSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		$user_seeding_plans = [
			'free_190612' => [
				'name' => 'Free',
				'price' => 0,
				'category' => 'free',
				'settings' => null,
				'inheriting_plan_key' => null,
				'settings' => [],
				'is_active' => true,
			],
		];

		// ---------------------------------------------------------------------- //

		$company_seeding_plans = [
			'free_190612' => [
				'name' => 'Free Startup',
				'price' => 0,
				'category' => 'free',

				'settings' => [
					'live_screen_streaming_minutes' => 2,
					'manager_seats_per_project' => 1,
					'screenshots_per_hour' => 6,
				],

				'inheriting_plan_key' => null,
				'is_active' => true,
			],

			'starter_190612' => [
				'name' => 'Starter',
				'price' => 2,
				'category' => 'starter',

				'settings' => [
					'live_screen_streaming_minutes' => 15,
					'manager_seats_per_project' => 2,
					'screenshots_per_hour' => 15,
				],

				'inheriting_plan_key' => 'free',
				'is_active' => true,
			],

			'value_190612' => [
				'name' => 'Value',
				'price' => 82,
				'category' => 'value',

				'settings' => [
					'live_screen_streaming_minutes' => 120,
					'manager_seats_per_project' => 5,
					'screenshots_per_hour' => 20,
				],

				'inheriting_plan_key' => 'starter_190612',
				'is_active' => true,
			],

			'premium_190612' => [
				'name' => 'Premium',
				'price' => 122,
				'category' => 'premium',
				
				'settings' => [
					'live_screen_streaming_minutes' => 0,
					'manager_seats_per_project' => 0,
				],

				'inheriting_plan_key' => 'value_190612',
				'is_active' => true,
			],

			'enterprise_190612' => [
				'name' => 'Enterprise',
				'price' => 122,
				'category' => 'enterprise',
				
				'settings' => [
					'live_screen_streaming_minutes' => 0,
					'manager_seats_per_project' => 0,
				],

				'inheriting_plan_key' => 'premium_190612',
				'is_active' => true,
			],
		];

		// ---------------------------------------------------------------------- //

		foreach ($user_seeding_plans as $user_seeding_plan_key => &$user_seeding_plan) {
			$user_seeding_plan['account_type'] = 'User';
			$user_seeding_plan['key'] = 'user.' . $user_seeding_plan_key;

			if ($user_seeding_plan['inheriting_plan_key']) {
				$user_seeding_plan['inheriting_plan_key'] = 'user.' . $user_seeding_plan['inheriting_plan_key'];
			}
		}

		foreach ($company_seeding_plans as $company_seeding_plan_key => &$company_seeding_plan) {
			$company_seeding_plan['account_type'] = 'Company';
			$company_seeding_plan['key'] = 'company.' . $company_seeding_plan_key;

			if ($company_seeding_plan['inheriting_plan_key']) {
				$company_seeding_plan['inheriting_plan_key'] = 'company.' . $company_seeding_plan['inheriting_plan_key'];
			}
		}

		$seeding_plans = array_merge(array_values($user_seeding_plans), array_values($company_seeding_plans));

		foreach ($seeding_plans as $seeding_plan) {
			if (!$plan = Plan::where('key', $seeding_plan['key'])->first()) {
				$plan = new Plan;
			}
			
			$plan->fill($seeding_plan);
			$plan->isDirty() && $plan->save();
		}

		echo 'The `plans` table were seeded successfully.' . "\n";
	}
}
