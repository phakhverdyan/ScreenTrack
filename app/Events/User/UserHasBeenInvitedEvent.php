<?php

namespace App\Events\User;

use Illuminate\Support\Facades\Mail;
use App\Events\Event;
use App\Mails\User\UserHasBeenInvitedMail;

class UserHasBeenInvitedEvent extends Event
{
    public $invited_user;
    public $inviting_user;
    public $project;
    public $project_member;
    public $contract;
    public $chat_message;

    public function handle()
    {
    	Mail::to($this->invited_user->email)->queue(new UserHasBeenInvitedMail([
            'invited_user' => $this->invited_user,
            'invited_user_was_recently_created' => $this->invited_user->wasRecentlyCreated,
            'invited_user_original_password' => $this->invited_user->original_password,
            'inviting_user' => $this->inviting_user,
            'project' => $this->project,
            'project_member' => $this->project_member,
            'contract' => $this->contract,
            'chat_message' => $this->chat_message,
        ]));
    }
}