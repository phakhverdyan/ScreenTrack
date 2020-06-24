<?php

namespace App\Http\Controllers\Api;

use App\Models\Project\Project;
use App\Models\User\UserTip;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Plan\Plan;
use App\Models\User\User;
use App\Models\User\UserSignUp;
use App\Models\Geo\Locality;

class SignUpController extends Controller
{
    public function choose_a_plan(Request $request)
    {
    	$user = auth()->user();

        if (!$user->sign_up) {
            abort(404);
        }

        validator()->make($request->all(), [
            'choosen_plan' => 'required|array',
            'choosen_plan.key' => 'required|string|exists:plans,key',
        ])->validate();

        $user->sign_up->choosen_plan_key = $request->input('choosen_plan.key');
        $user->sign_up->current_stage = UserSignUp::CURRENT_STAGE_SET_ACCOUNT_DETAILS;
        $user->sign_up->save();

        return response()->resource([
            'next_sign_up_stage' => $user->sign_up->current_stage,
        ]);
    }

    public function set_account_details(Request $request)
    {

        $user = auth()->user();

        if ($user && !$user->sign_up) {
            abort(404);
        }

        $user_locality = Locality::getOrMakeByKey($request->input('user_sign_up.user_locality_key'));
        $company_locality = Locality::getOrMakeByKey($request->input('user_sign_up.company_locality_key'));
        $choosen_plan = null;
        $user_was_created = false;

        if ($user) {
            $choosen_plan = $user->sign_up->choosen_plan;
        } else {
            validator()->make($request->all(), [
                'user_sign_up' => 'required|array',
                'user_sign_up.choosen_plan_key' => 'required|string|exists:plans,key',
            ])->validate();

            $choosen_plan = Plan::where('key', $request->input('user_sign_up.choosen_plan_key'))->first();
        }

        $validation_rules = [
            'user_sign_up' => 'required|array',
            'user_sign_up.user_first_name' => 'required|string',
            'user_sign_up.user_last_name' => 'required|string',
            'user_sign_up.user_locality_key' => 'required|exists:localities,key',

            'user_sign_up.user_phone_number' => array_merge([
                'required_with:user_sign_up.user_locality_key',
                'string',
            ], $user_locality ? [
                'regex:/[0-9]{' . substr_count($user_locality->country->phone_number_mask, 'X') . '}/',
            ] : [], [
                'nullable',
            ]),

            'user_sign_up.user_professional_title' => 'required|string',
        ];

        if (!$user) {
            $validation_rules['user_sign_up.user_email'] = 'required|string|email|unique:users,email';
        }

        if ($choosen_plan->account_type == 'Company') {
            $validation_rules['user_sign_up.company_name'] = 'required|string';
            $validation_rules['user_sign_up.company_size_key'] = 'required|exists:company_sizes,key';
            $validation_rules['user_sign_up.company_locality_key'] = 'required|exists:localities,key';

            $validation_rules['user_sign_up.company_phone_number'] = array_merge([
                'required_with:user_sign_up.company_locality_key',
                'string',
            ], $company_locality ? [
                'regex:/[0-9]{' . substr_count($company_locality->country->phone_number_mask, 'X') . '}/',
            ] : [], [
                'nullable',
            ]);
        } else {
            $validation_rules['user_sign_up.user_hourly_rate'] = 'required|numeric|min:0.01';
        }

        //var_dump($validation_rules);die;
        validator()->make($request->all(), $validation_rules)->validate();

        if (!$user) {
            $user = User::create([
                'email' => $request->input('user_sign_up.user_email'),
            ]);

            $user_was_created = true;
            $user->sign_up->choosen_plan_key = $choosen_plan->key;
        }

        $user->sign_up->fill($request->input('user_sign_up'));
        $user->sign_up->current_stage = UserSignUp::CURRENT_STAGE_CHOOSE_ADDONS;
        $user->sign_up->save();

        // if ($user->sign_up->choosen_plan->account_type == 'User') {
        $user->sign_up->setupAndDelete();

        return response()->resource([
            'next_sign_up_stage' => null,

            'user_to_login' => ($user_was_created ? $user->makeVisible([
                'api_token',
            ]) : null),
        ]);
        // }

        // return response()->resource([
        //     'next_sign_up_stage' => $user->sign_up->current_stage,

        //     'user_to_login' => ($user_was_created ? $user->makeVisible([
        //         'api_token',
        //     ]) : null),
        // ]);
    }

    public function choose_addons(Request $request)
    {
        $user = auth()->user();

        if (!$user->sign_up) {
            abort(404);
        }

        validator()->make($request->all(), [
            'user_sign_up.choosen_plan_addon_keys' => 'array|nullable',
            'user_sign_up.choosen_plan_addon_keys.*' => 'required|string|exists:plan_addons,key',
        ])->validate();

        $user->sign_up->choosen_plan_addon_keys = $request->input('user_sign_up.choosen_plan_addon_keys', []);
        $user->sign_up->current_stage = UserSignUp::CURRENT_STAGE_START_TRIAL;
        $user->sign_up->save();

        if ($user->sign_up->choosen_plan->category == 'free' && count($user->sign_up->choosen_plan_addon_keys) == 0) {
            $user->sign_up->setupAndDelete();

            return response()->resource([
                'next_sign_up_stage' => null,
            ]);
        }

        return response()->resource([
            'next_sign_up_stage' => $user->sign_up->current_stage,
        ]);
    }

    public function start_trial(Request $request)
    {
        $user = auth()->user();

        if (!$user->sign_up) {
            abort(404);
        }

        Locality::getOrMakeByKey($request->input('user_sign_up.company_locality_key'));

        $validation_rules = [
            'user_sign_up.choosen_plan_addon_keys' => 'array|nullable',
            'user_sign_up.choosen_plan_addon_keys.*' => 'required|string|exists:plan_addons,key',
            'user_sign_up.stripe_token_id' => 'required|string',
        ];

        if ($user->sign_up->choosen_plan->account_type == 'Company') {
            $validation_rules['user_sign_up.company_locality_key'] = 'required|exists:localities,key';
        }

        validator()->make($request->all(), $validation_rules)->validate();

        $user->sign_up->choosen_plan_addon_keys = $request->input('user_sign_up.choosen_plan_addon_keys', []);
        $user->sign_up->company_locality_key = $request->input('user_sign_up.company_locality_key');
        $user->sign_up->stripe_token_id = $request->input('user_sign_up.stripe_token_id');
        $user->sign_up->current_stage = null;
        $user->sign_up->save();

        // ---------------------------------------------------------------------- //

        $user->sign_up->setupAndDelete();

        return response()->resource([
            'next_sign_up_stage' => null,
        ]);
    }

    public function after_interview(Request $request) {
        validator()->make($request->all(), [
            'user_sign_up' => 'required|array',
            'user_sign_up.user_email' =>'required|string|email|unique:users,email',
            'user_sign_up.user_first_name' => 'required|string',
            'user_sign_up.user_last_name' => 'required|string',
            'user_sign_up.user_locality_key' => 'required|exists:localities,key',
            'user_sign_up.user_phone_number' => 'required_with:user_sign_up.user_locality_key|string|nullable',
        ])->validate();

        $user = User::create([
            'email' => $request->input('user_sign_up.user_email'),
        ]);

        $user->initial_stage = null;
        $user->save();

        $user->sign_up->fill($request->input('user_sign_up'));
        $user->sign_up->current_stage = null;
        $user->sign_up->save();

        Project::create(['name' => 'Project 1'], [
            'owner_user' => $user,
        ]);

        UserTip::create_after_interview_sign_up_tips($user);

        return response()->resource([
            'user_to_login' => $user->makeVisible([
                'api_token',
            ]),
        ]);
    }
}
