<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    /**
     * The application's global HTTP middleware stack.
     *
     * These middleware are run during every request to your application.
     *
     * @var array
     */
    protected $middleware = [
        \App\Http\Middleware\CheckForMaintenanceMode::class,
        \Illuminate\Foundation\Http\Middleware\ValidatePostSize::class,
        \App\Http\Middleware\TrimStrings::class,
        \Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class,
        \App\Http\Middleware\TrustProxies::class,
		\Fruitcake\Cors\HandleCors::class,
    ];

    /**
     * The application's route middleware groups.
     *
     * @var array
     */
    protected $middlewareGroups = [
        'web' => [
            \App\Http\Middleware\EncryptCookies::class,
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            \Illuminate\Session\Middleware\StartSession::class,
            // \Illuminate\Session\Middleware\AuthenticateSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
            \App\Http\Middleware\VerifyCsrfToken::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
            \App\Http\Middleware\DefineUserLocale::class,
            \App\Http\Middleware\AdCampaignDetection::class,
        ],

        'api' => [
            // 'throttle:60,1',
            'bindings',
            'guard_switcher:api',
            \App\Http\Middleware\ApiLocaleDetection::class,
        ],

        'tracker' => [],
    ];

    /**
     * The application's route middleware.
     *
     * These middleware may be assigned to groups or used individually.
     *
     * @var array
     */
    protected $routeMiddleware = [
        'auth' => \App\Http\Middleware\Authenticate::class,
        'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
        'bindings' => \Illuminate\Routing\Middleware\SubstituteBindings::class,
        'cache.headers' => \Illuminate\Http\Middleware\SetCacheHeaders::class,
        'can' => \Illuminate\Auth\Middleware\Authorize::class,
        'guard_switcher' => \App\Http\Middleware\GuardSwitcher::class,
        'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
        'route_locale_detection' => \App\Http\Middleware\RouteLocaleDetection::class,
        'user_locale_detection' => \App\Http\Middleware\UserLocaleDetection::class,
        'ad_campaign_detection' => \App\Http\Middleware\AdCampaignDetection::class,
        'redirect_if_logged_in' => \App\Http\Middleware\RedirectIfLoggedIn::class,
        'redirect_if_not_logged_in' => \App\Http\Middleware\RedirectIfNotLoggedIn::class,
        'forbidden_if_logged_in' => \App\Http\Middleware\ForbiddenIfLoggedIn::class,
        'not_logged_in_only' => \App\Http\Middleware\ForbiddenIfLoggedIn::class,
        'forbidden_if_not_logged_in' => \App\Http\Middleware\ForbiddenIfNotLoggedIn::class,
        'logged_in_only' => \App\Http\Middleware\ForbiddenIfNotLoggedIn::class,
        'administrator_only' => \App\Http\Middleware\RedirectIfNotAdministrator::class,
        'signed' => \Illuminate\Routing\Middleware\ValidateSignature::class,
        'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
        'verified' => \Illuminate\Auth\Middleware\EnsureEmailIsVerified::class,
        'redirect_to_correct_initial_stage' => \App\Http\Middleware\RedirectToCorrectInitialStage::class,
        'referrer_user_detection' => \App\Http\Middleware\ReferrerUserDetection::class,
        'fast_login' => \App\Http\Middleware\FastLogin::class,
        'dashboard.selected_project_detection' => \App\Http\Middleware\Dashboard\SelectedProjectDetection::class,
    ];

    /**
     * The priority-sorted list of middleware.
     *
     * This forces non-global middleware to always be in the given order.
     *
     * @var array
     */
    protected $middlewarePriority = [
        \Illuminate\Session\Middleware\StartSession::class,
        \Illuminate\View\Middleware\ShareErrorsFromSession::class,
        \App\Http\Middleware\Authenticate::class,
        \Illuminate\Session\Middleware\AuthenticateSession::class,
        \Illuminate\Routing\Middleware\SubstituteBindings::class,
        \Illuminate\Auth\Middleware\Authorize::class,
    ];
}
