<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Plan\Plan;
use App\Models\Plan\PlanAddon;
use App\Models\Geo\Country;
use App\Models\Geo\Locality;
use App\Models\Company\CompanySize;

class SignUpController extends Controller
{
    public function choose_a_plan(Request $request)
    {
    	$plans = Plan::get()->mapWithKeys(function ($plan) {
		    return [$plan['key'] => $plan];
		});

    	return view('sign_up.choose_a_plan', [
    		'current_page' => 'CHOOSE_A_PLAN',
    		'plans' => $plans,
            'choosen_plan' => null,
    	]);
    }

    public function set_account_details(Request $request)
    {
        $user = null;
        $user_sign_up = null;
        $user_locality = null;
        $choosen_plan = null;

        if (auth()->check()) {
        	$user = auth()->user();
            $user_sign_up = $user->sign_up()->first();
            $user_locality = $user->locality()->with('relevant_translation')->first();
    	
        	if (!$choosen_plan = Plan::where('key', $user->sign_up->choosen_plan_key)->first()) {
        		abort(500);
        	}
        } else {
            $validator = validator()->make($request->all(), [
                'choosen_plan_key' => 'required|string|exists:plans,key',
                'user_locality_key' => 'nullable|string',
                'locale' => 'nullable|string',
            ]);

            if ($validator->fails()) {
                abort(404);
            }

            $choosen_plan = Plan::where('key', $request->input('choosen_plan_key'))->first();
            $user_locality = Locality::getOrMakeByKey($request->input('user_locality_key'));
            app()->setLocale($request->input('locale'));
        }

    	$company_sizes = CompanySize::orderBy('id', 'asc')->get();

        return view('sign_up.set_account_details', [
        	'current_page' => 'SET_ACCOUNT_DETAILS',
        	'user' => $user,
        	'user_sign_up' => $user_sign_up,
        	'user_locality' => $user_locality,
        	'company_sizes' => $company_sizes,
        	'choosen_plan' => $choosen_plan,
            'choosen_plan_addons' => collect(),
        	'suitable_plan_addons' => collect(),
        ]);
    }

    public function choose_addons(Request $request)
    {
    	$user = auth()->user();
    	$user->load('sign_up');
    	
    	if (!$choosen_plan = Plan::where('key', $user->sign_up->choosen_plan_key)->first()) {
    		return response()->error('No choosen plan found');
    	}

    	$suitable_plan_addons = PlanAddon::get();

    	return view('sign_up.choose_addons', [
        	'current_page' => 'CHOOSE_ADDONS',
        	'user' => $user,
        	'user_sign_up' => $user->sign_up,
            'choosen_plan' => $choosen_plan,
            'choosen_plan_addons' => collect(),
        	'suitable_plan_addons' => $suitable_plan_addons,
        ]);
    }

    public function start_trial(Request $request)
    {
    	$user = auth()->user();
    	$user->load('sign_up');
    	
    	if (!$choosen_plan = Plan::where('key', $user->sign_up->choosen_plan_key)->first()) {
    		return response()->error('No choosen plan found');
    	}

    	$suitable_plan_addons = PlanAddon::get();
    	$choosen_plan_addons = $suitable_plan_addons->whereIn('key', $user->sign_up->choosen_plan_addon_keys);
        $user_locality_query = Locality::query();

        $user_locality_query->with([
            'relevant_translation',
            'country',
            'country.relevant_translation',
        ]);

        $user_locality_query->where('key', $user->sign_up->user_locality_key);
        $user_locality = $user_locality_query->first();

    	return view('sign_up.start_trial', [
        	'current_page' => 'START_TRIAL',
        	'user' => $user,
        	'user_sign_up' => $user->sign_up,
        	'choosen_plan' => $choosen_plan,
        	'suitable_plan_addons' => $suitable_plan_addons,
        	'choosen_plan_addons' => $choosen_plan_addons,
            'user_locality' => $user_locality,
        ]);
    }
}
