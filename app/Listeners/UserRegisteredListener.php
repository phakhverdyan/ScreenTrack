<?php

namespace App\Listeners;

use App\Events\UserRegisteredEvent;
use App\Mail\User\UserHasBeenRegisteredMail;
use Illuminate\Support\Facades\Mail;

class UserRegisteredListener
{
    public function handle(UserRegisteredEvent $event)
    {
        Mail::to($event->user->email)->queue(new UserHasBeenRegisteredMail([
            'user' => $event->user,
            'auto_generated_password' => $event->user->auto_generated_password,
        ]));
    }
}
