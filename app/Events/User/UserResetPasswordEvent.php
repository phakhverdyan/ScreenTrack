<?php

namespace App\Events\User;

use Illuminate\Support\Facades\Mail;
use App\Events\Event;
use App\Mails\Auth\ResetPasswordMail;

class UserResetPasswordEvent extends Event
{
    public $user;
    public $password_reset;

    public function handle()
    {   
        Mail::to($this->user->email)->queue(new ResetPasswordMail([
            'user' => $this->user,
            'password_reset' => $this->password_reset,
        ]));
    }
}
