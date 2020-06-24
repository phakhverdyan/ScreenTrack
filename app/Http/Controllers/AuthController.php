<?php

namespace App\Http\Controllers;

use App\Models\User\User;
use App\Models\Auth\PasswordReset;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        if (auth()->user()) {
            return redirect('/dashboard');
        }

        if ($interview_result_key = $request->input('interview_result_key')) {
            return view('common.auth.login.login_after_interview', compact('interview_result_key'));
        }

        return view('common.auth.login.login');
    }


    public function login_using_api_token(Request $request)
    {
        $validator = validator()->make($request->all(), [
            'user_id' => 'required|integer|min:1',
            'api_token' => 'required|string',
            'remember_me' => 'string',
        ]);

        if ($validator->fails()) {
            if ($request->ajax()) {
                return [
                    'error' => 'Validation',
                    'validation_fields' => $validator->errors(),
                ];
            }

            return redirect($request->server('HTTP_REFERER') ?: '/');
        }

        $user_query = User::query();
        $user_query->where('id', $request->input('user_id'));
        $user_query->where('api_token', $request->input('api_token'));

        if (!$user = $user_query->first()) {
            if ($request->ajax()) {
                return response()->error('User Does Not Exist');
            }

            return redirect($request->server('HTTP_REFERER') ?: '/');
        }

        \Cookie::queue(\Cookie::forget('referrer_user_id'));
        auth()->login($user, $request->input('remember_me') ? true : false);
        $redirect_url = '/sign-up/choose-a-plan';
        
        if ($request->ajax()) {
            return [
                'data' => [
                    'redirect_url' => $redirect_url,
                ],
            ];
        }

        return redirect($redirect_url);
    }

    public function logout(Request $request)
    {
        if ($user = auth()->user()) {
            \Cookie::queue('last_user_id', $user->id, 60 * 24 * 30);
            auth()->logout();
        }

        if ($request->ajax()) {
            return ['data' => true];
        }
        
		return redirect(($user && $user->interface_language_code ? '/'. $user->interface_language_code : '') . '/see-you-soon');
    }

    public function forgot_password() {
        return view('common.auth.make_password_reset');
    }

    public function password_reset_sent() {
        return view('common.auth.password_reset_sent');
    }

    public function password_reset(Request $request, $locale, $reset_password_token)
    {
        if (auth()->check()) {
            abort(404);
        }

        $password_reset = PasswordReset::where('token', $reset_password_token)->firstOrFail();

        if ($password_reset->is_used) {
            abort(404);
        }
        
        $user = User::where('id', $password_reset->user_id)->firstOrFail();

        return view('common.auth.password_reset', [
            'user' => $user,
            'password_reset' => $password_reset,
        ]);
    }
}
