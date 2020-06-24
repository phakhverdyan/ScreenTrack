<?php

namespace App\Listeners;

use App\Events\UserAttachedToTaskEvent;
use App\Mail\ProjectTask\UserAttachedToTaskNotifyMail;
use Illuminate\Support\Facades\Mail;

class UserAttachedToTaskListener
{
    public function handle(UserAttachedToTaskEvent $event)
    {
        $this->notifyUser($event);
    }

    private function notifyUser($event) {
        Mail::to($event->user->email)->queue(new UserAttachedToTaskNotifyMail([
            'user' => $event->user,
            'task' => $event->task,
        ]));
    }
}
