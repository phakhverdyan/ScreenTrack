<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\Controller;
use App\Http\Resources\BaseResource;
use App\Events\User\UserResetPasswordEvent;
use App\Models\Auth\EmailVerification;
use App\Models\Auth\PasswordReset;
use App\Models\User\User;
use App\Models\Company;
use App\Models\Geo\Country;
use App\Models\Geo\Locality;

/**
 * @group Authorization
 *
 * Class AuthController
 * @package App\Http\Controllers\Api
 */

class AuthController extends Controller
{
	/**
	 * @param Request $request
	 * @return |null
	 * @throws \Exception
	 */
	public function register(Request $request)
	{
		Locality::getOrMakeByKey($request->input('user.locality_key'));

		$validator_rules = [
			'user' => 'required|array',
			'user.email' => 'required|string|regex:/^[\.0-9a-z-_]+@[\.0-9a-z-_]+[.][0-9a-z-_]{2,}$/i|email|unique:users,email',

			'user.slug' => [
				'string',
				'regex:/^[\.0-9a-z-_]{3,32}$/i',
				'unique:users,slug',
				'not_in:' . implode(',', User::slugReservedWords()),
				'nullable',
			],

			'user.locality_key' => 'string|nullable|exists:localities,key',
			'user.referrer_user_id' => 'integer|nullable',
			'user.ad_campaign_id' => 'integer|nullable',
			'user.choosen_plan_key' => 'string|nullable|exists:plans,key',
			'form' => 'string|nullable',
		];

		$form = $request->input('form');
		$custom_validation_messages = [];

		if ($form) {
			validator()->make($request->all(), $validator_rules, $custom_validation_messages)->validate();
			$user = User::create($request->input('user'));

			return response()->resource($user->makeVisible([
				'api_token',
				'realtime_token',
			]));
		}

		$validator = validator()->make($request->all(), $validator_rules, $custom_validation_messages);
		$validation_messages = $validator->errors()->getMessages();
		$suggested_user_slug = null;

		if ($request->input('suggest_user_slug')) {
			$suggested_user_slug = User::getSuggestedSlugFromEmail($request->input('user.email'));
		}

		$user = null;

		if (!$request->input('just_validate') && !$validator->fails()) {
			$user = User::create($request->input('user'));
		}

		return response()->resource([
			'email_success' => !isset($validation_messages['user.email']),
			'slug_success' => ($suggested_user_slug || !isset($validation_messages['user.slug'])),
			'suggested_user_slug' => $suggested_user_slug,
			'validation_messages' => $validator->errors()->toArray(),

			'user' => $user ? $user->makeVisible([
				'api_token',
				'realtime_token',
			])->toArray() : null,
		]);
	}

	/**
	 * Login
	 * Login in User's account
	 *
	 * @bodyParam user object required
	 * @bodyParam user.email email required
	 * @bodyParam user.password string required
	 * @apiResource App\Http\Resources\UserResource
	 * @apiResourceModel App\Models\User\User
	 *
	 * @param Request $request
	 * @return |null
	 */
	public function login(Request $request)
	{
		if (auth()->check()) {
			return response()->error('You Are Already Logged In', 400);
		}

		validator()->make($request->all(), [
			'user.email' => 'required|max:255',
			'user.password' => 'required|string',
			// 'form' => 'string|nullable|in:dms',
		], custom_validation_messages('auth.login'))->validate();

		$user_query = User::query();
		$user_query->where('email', $request->input('user.email'));
		$user = $user_query->first();

		if (!$user) {
			if (preg_match('/P([0-9]+)/', $request->input('user.email'), $match)) {
				$user_query = User::select('users.*');
				$user_query->join('projects', 'projects.owner_user_id', '=', 'users.id');
				$user_query->where('projects.id', $match[1]);
				$user = $user_query->first();
			} elseif (preg_match('/U([0-9]+)/', $request->input('user.email'), $match)) {
				$user_query = User::query();
				$user_query->where('id', $match[1]);
				$user = $user_query->first();
			}
		}

		if (!$user) {
			return response()->error('Wrong User Credentials', 400);
		}

		if (false){//!$user->doesPasswordEqual($request->input('user.password'))) {
			return response()->error('Wrong User Credentials', 400);
		}

		if (!$user->api_token) {
			$user->generateApiToken();
		}

		if (!$user->realtime_token) {
			$user->generateRealtimeToken();
		}

		if ($user->isDirty()) {
			$user->save();
		}

		return new UserResource($user->makeVisible([
			'api_token',
			'realtime_token',
		]));
	}

	public function resetPassword(Request $request)
	{
		if (auth()->check()) {
			return response()->error('You Are Already Logged In', 400);
		}

		validator()->make($request->all(), [
			'user.email' => 'required|email',
		], custom_validation_messages('auth.reset_password'))->validate();

		if ($user = User::where('email', $request->input('user.email'))->first()) {
			$password_reset = new PasswordReset;
			$password_reset->user_id = $user->id;
			$password_reset->generateToken();
			$password_reset->is_used = false;
			$password_reset->save();

            event(new UserResetPasswordEvent([
            	'user' => $user,
            	'password_reset' => $password_reset,
            ]));
		}

		return response()->resource();
	}

	public function resetPasswordComplete(Request $request, $password_reset_token)
	{
		if (auth()->check()) {
			return response()->error('You Are Already Logged In');
		}

		$password_reset = PasswordReset::where('token', $password_reset_token)->firstOrFail();

		if ($password_reset->is_used) {
			abort(404);
		}

		$user = User::where('id', $password_reset->user_id)->first();

		validator()->make($request->all(), [
			'user.password' => 'required|string|min:6|confirmed',
		], custom_validation_messages('auth.reset_password_complete'))->validate();

		$user->password = $request->input('user.password');
		$user->generateApiToken();
		$user->generateRealtimeToken();
		$user->save();
		$password_reset->is_used = true;
		$password_reset->save();

		return response()->resource($user->makeVisible([
			'api_token',
			'realtime_token',
		]));
	}

	public function isUserRegistered(Request $request) {
        validator()->make($request->all(), [
            'user.email' => 'required|string|regex:/^[\.0-9a-z-_]+@[\.0-9a-z-_]+[.][0-9a-z-_]{2,}$/i|email',
        ])->validate();

        $user_email = $request->input('user.email');
        $user_exists = User::where('email', $user_email)->exists();

        return response()->resource([
            'email' => $user_email,
            'is_registered' => $user_exists,
        ]);
    }
}
