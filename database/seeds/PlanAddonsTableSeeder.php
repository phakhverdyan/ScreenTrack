<?php

use Illuminate\Database\Seeder;
use App\Models\Plan\PlanAddon;

class PlanAddonsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user_seeding_plan_addons = [];

        // ---------------------------------------------------------------------- //

        $company_seeding_plan_addons = [
    		'unlimited_live_screen_streaming_190612' => [
    			'title' => 'Unlimited live screen streaming',
                'price' => 60,
                'description' => 'Bla bla bla des cri pti on here bla bla bla.',
                'setting_key' => 'live_screen_streaming_minutes',
                'setting_value' => 0,
                'is_active' => 1,
    		],

    		'unlimited_manager_seats_190612' => [
    			'title' => 'Unlimited manager seats',
                'price' => 30,
                'description' => 'Bla bla bla des cri pti on here bla bla bla.',
                'setting_key' => 'manager_seats_per_project',
                'setting_value' => 0,
                'is_active' => 1,
    		],
        ];

        // ---------------------------------------------------------------------- //

    	foreach ($user_seeding_plan_addons as $user_seeding_plan_addon_key => &$user_seeding_plan_addon) {
    		$user_seeding_plan_addon['key'] = 'user' . '.' . $user_seeding_plan_addon_key;
    		$user_seeding_plan_addon['account_type'] = 'user';
    	}

    	foreach ($company_seeding_plan_addons as $company_seeding_plan_addon_key => &$company_seeding_plan_addon) {
    		$company_seeding_plan_addon['key'] = 'company' . '.' . $company_seeding_plan_addon_key;
    		$company_seeding_plan_addon['account_type'] = 'company';
    	}

        $seeding_plan_addons = array_merge(array_values($user_seeding_plan_addons), array_values($company_seeding_plan_addons));

        foreach ($seeding_plan_addons as $seeding_plan_addon) {
        	if (!$plan_addon = PlanAddon::where('key', $seeding_plan_addon['key'])->first()) {
        		$plan_addon = new PlanAddon;
        	}

        	$plan_addon->fill($seeding_plan_addon);
        	$plan_addon->isDirty() && $plan_addon->save();
        }

        echo 'The `plan_addons` table were seeded successfully.' . "\n";
    }
}
