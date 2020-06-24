<?php

namespace App\Events\User;

use Illuminate\Support\Facades\Mail;
use App\Events\Event;
use App\Mails\User\UserHasBeenRegisteredMail;

class UserHasBeenRegisteredEvent extends Event
{
    public $registered_user;

    public function handle()
    {   
        Mail::to($this->registered_user->email)->queue(new UserHasBeenRegisteredMail([
            'registered_user' => $this->registered_user,
            'registered_user_original_password' => $this->registered_user->original_password,
        ]));
    }
}
