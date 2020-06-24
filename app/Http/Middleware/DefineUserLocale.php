<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Language;

class DefineUserLocale
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
        $available_locales = config('app.available_locales');

        if ($request->cookie('locale')) {
            if (in_array($request->cookie('locale'), $available_locales)) {
                app()->setLocale($request->cookie('locale'));
            }

            return $next($request);
        }
        
        $user_agent_locales = explode(',', $request->server('HTTP_ACCEPT_LANGUAGE'));

        $user_agent_locales = array_unique(array_map(function ($current_user_agent_locale) {
            return explode('-', explode(';', $current_user_agent_locale)[0])[0];
        }, $user_agent_locales));

        $user_agent_locales = array_filter($user_agent_locales, function ($current_user_agent_locale) use ($available_locales) {
            return in_array($current_user_agent_locale, $available_locales);
        });

        $user_agent_locales = array_values($user_agent_locales);

        if (count($user_agent_locales) > 0) {
            \Cookie::queue(\Cookie::forever('locale', $user_agent_locales[0]));
            app()->setLocale($user_agent_locales[0]);
        }

        return $next($request);
    }
}
