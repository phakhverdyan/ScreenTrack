<?php

namespace App\Http\Middleware;

use App\Models\User\User;
use Closure;

class FastLogin
{
    public function handle($request, Closure $next)
    {
        if (auth()->check()) {
            return $next($request);
        }

        if (!$request->input('flt') || !is_string($request->input('flt'))) {
            return $next($request);
        }

        try {
            $user_id = (int) gmp_base_convert(explode('a', gmp_base_convert($request->input('flt'), 62, 37))[0], 16, 10);
        } catch (\Exception $exception) {
            return $next($request);
        }
        
        if (!$user = User::find($user_id)) {
            return $next($request);
        }

        if ($request->input('flt') != $user->fast_login_token) {
            return $next($request);
        }

        auth()->login($user, true);
        
        return $next($request);
    }
}
