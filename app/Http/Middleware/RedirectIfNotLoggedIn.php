<?php

namespace App\Http\Middleware;

use Closure;

class RedirectIfNotLoggedIn
{
    public function handle($request, Closure $next, $redirect_url = null)
    {
        if (auth()->check()) {
        	return $next($request);
        }

        if ($redirect_url) {
        	return redirect($redirect_url);
        }

        $redirect_url = '/';

        return redirect($redirect_url);
    }
}
