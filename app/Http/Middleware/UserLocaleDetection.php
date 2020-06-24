<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\App;

class UserLocaleDetection
{
    public function handle($request, Closure $next)
    {
    	if (!auth()->check()) {
    		return $next($request);
    	}

        app()->setLocale(auth()->user()->interface_language_code);
        return $next($request);
    }
}
