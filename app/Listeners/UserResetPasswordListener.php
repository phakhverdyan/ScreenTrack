<?php

namespace App\Listeners;

use App\Events\UserResetPasswordEvent;
use App\Mail\Auth\ResetPasswordMail;
use Illuminate\Support\Facades\Mail;

class UserResetPasswordListener
{
    public function handle(UserResetPasswordEvent $event)
    {
        Mail::to($event->user->email)->queue(new ResetPasswordMail([
            'user' => $event->user,
            'password_reset' => $event->password_reset,
        ]));
    }
}
