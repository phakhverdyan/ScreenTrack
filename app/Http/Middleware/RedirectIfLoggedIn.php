<?php

namespace App\Http\Middleware;

use Closure;

class RedirectIfLoggedIn
{
    public function handle($request, Closure $next, $redirect_url = null)
    {
        if (!auth()->check()) {
            return $next($request);
        }

        if ($redirect_url) {
        	return redirect($redirect_url);
        }

        $redirect_url = '/sign-up/choose-a-plan';

        return redirect($redirect_url);
    }
}
