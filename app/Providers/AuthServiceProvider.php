<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;
use Illuminate\Contracts\Session\Session;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot(Session $session)
    {
        $this->registerPolicies();

        Auth::extend('session', function($app, $name, array $config) use ($session) {
            $provider = Auth::createUserProvider($config['provider'] ?? null);
            $guard = new \App\Auth\SessionGuard($name, $provider, $this->app['session.store']);

            if (method_exists($guard, 'setCookieJar')) {
                $guard->setCookieJar($this->app['cookie']);
            }

            if (method_exists($guard, 'setDispatcher')) {
                $guard->setDispatcher($this->app['events']);
            }

            if (method_exists($guard, 'setRequest')) {
                $guard->setRequest($this->app->refresh('request', $guard, 'setRequest'));
            }

            return $guard;
        });

        Auth::extend('token', function($app, $name, array $config) {
            return new \App\Auth\TokenGuard(Auth::createUserProvider($config['provider']), $app['request']);
        });
    }
}
