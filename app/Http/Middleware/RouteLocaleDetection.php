<?php

namespace App\Http\Middleware;

use Closure;

class RouteLocaleDetection
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
        if ($request->method() === 'GET') {
            $segment = $request->segment(1);

            if (!$segment || strlen($segment) !== 2) {
                $redirect_url = $request->getPathInfo() . ($request->getQueryString() ? ('?' . $request->getQueryString()) : '');
                
                return redirect()->to('/' . locale() . preg_replace('/([0-9]+)=/', '$1', $redirect_url));
            }

            if (!in_array($segment, config('app.available_locales'))) {
                $redirect_url = $request->getPathInfo() . ($request->getQueryString() ? ('?' . $request->getQueryString()) : '');
                $redirect_url = substr($redirect_url, 3);

                return redirect()->to('/' . locale() . preg_replace('/([0-9]+)=/', '$1', $redirect_url));
            }

            app()->setLocale($segment);
            // $request->route()->forgetParameter('locale');
        }

        return $next($request);
    }
}
