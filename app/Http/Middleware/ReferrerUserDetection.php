<?php

namespace App\Http\Middleware;

use App\Models\User\User;
use Closure;

class ReferrerUserDetection
{
    public function handle($request, Closure $next)
    {
        if (auth()->check()) {
            $request->referrer_user_id = 0;
            
            return $next($request);
        }

        $referrer_user_id = (int) $request->cookie('referrer_user_id');

        if ($referrer_user_id > 0) {
            $request->referrer_user_id = $referrer_user_id;
        } else {
            $input_parameters = array_filter($request->input(), function ($value, $key) {
                return $value === null && preg_match('/^[0-9]+$/', $key);
            }, ARRAY_FILTER_USE_BOTH);

            reset($input_parameters);
            $referrer_user_id = (int) key($input_parameters);
            $referrer_user = null;

            if ($referrer_user_id > 0 && $referrer_user = User::where('id', $referrer_user_id)->first()) {
                $request->referrer_user_id = $referrer_user->id;
                \Cookie::queue('referrer_user_id', $referrer_user_id, 60 * 24 * 30);
            } else {
                $request->referrer_user_id = 0;
            }
        }
        
        return $next($request);
    }
}
