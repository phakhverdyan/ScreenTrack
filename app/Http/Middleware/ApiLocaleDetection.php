<?php

namespace App\Http\Middleware;

use Closure;

class ApiLocaleDetection
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // $request->input('locale')

        if ($request->input('locale') && is_string($request->input('locale'))) {
            if (in_array($request->input('locale'), config('app.available_locales'))) {
                app()->setLocale($request->input('locale'));
            }
        }
        
        return $next($request);
    }
}
