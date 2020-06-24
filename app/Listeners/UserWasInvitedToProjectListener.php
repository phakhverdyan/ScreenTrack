<?php

namespace App\Listeners;

use App\Events\UserWasInvitedToProject;
use App\Mail\Project\InviteForAlreadyRegisteredUserMail;
use App\Mail\Project\InviteForNewRegisteredUserMail;
use Illuminate\Support\Facades\Mail;

class UserWasInvitedToProjectListener
{
    public function handle(UserWasInvitedToProject $event)
    {
        $data = [
            'user' => $event->user,
            'project' => $event->project,
            'contract' => $event->contract,
        ];

        if ($event->user->is_new_created) {
            $data['auto_generated_password'] = $event->user->auto_generated_password;
            $mail = new InviteForNewRegisteredUserMail($data);
        } else {
            $mail = new InviteForAlreadyRegisteredUserMail($data);
        }

        Mail::to($event->user->email)->queue($mail);
    }
}
