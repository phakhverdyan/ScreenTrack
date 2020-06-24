<?php

namespace App\Listeners;

use App\Events\InterviewPassedEvent;
use App\Mail\Interview\InterviewCompletedForEmployerMail;
use App\Mail\Interview\InterviewCompletedForUserMail;
use App\Mail\Interview\InterviewCompletedMail;
use Illuminate\Support\Facades\Mail;

class InterviewPassedListener
{
    public function handle(InterviewPassedEvent $event)
    {
        $this->notifyUser($event);
        $this->notifyEmployer($event);
    }

    private function notifyUser($event) {
        Mail::to($event->user->email)->queue(new InterviewCompletedForUserMail([
            'interview_result' => $event->interview_result,
        ]));
    }

    private function notifyEmployer($event) {
        if (! empty($email = $event->interview->notification_email)) {
            Mail::to($email)->queue(new InterviewCompletedForEmployerMail([
                'user' => $event->user,
                'interview_result' => $event->interview_result,
            ]));
        }
    }
}
