<?php

namespace App\Providers;

// use App\Events\ContractClosedEvent;
// use App\Events\InterviewPassedEvent;
// use App\Events\UserAttachedToTaskEvent;
// use App\Events\UserRegisteredEvent;
// use App\Events\UserResetPasswordEvent;
// use App\Events\UserWasInvitedToProjectEvent;
// use App\Events\UserWasAssignedToProjectTaskEvent;
// use App\Listeners\ContractClosedListener;
// use App\Listeners\InterviewPassedListener;
// use App\Listeners\UserAttachedToTaskListener;
// use App\Listeners\UserResetPasswordListener;
// use App\Listeners\UserRegisteredListener;
// use App\Listeners\UserWasInvitedToProjectListener;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        // UserRegisteredEvent::class => [
        //     UserRegisteredListener::class,
        // ],

        // InterviewPassedEvent::class => [
        //     InterviewPassedListener::class,
        // ],

        // UserResetPasswordEvent::class => [
        //     UserResetPasswordListener::class,
        // ],

        // UserWasInvitedToProjectEvent::class => [
        //     UserWasInvitedToProjectListener::class,
        // ],

        // ContractClosedEvent::class => [
        //     ContractClosedListener::class,
        // ],

        // UserAttachedToTaskEvent::class => [
        //     UserAttachedToTaskListener::class,
        // ],

        // UserWasAssignedToProjectTaskEvent::class => [

        // ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}
