<?php

namespace App\Mails\User;

use App\Mails\Mail;

class UserHasBeenInvitedMail extends Mail
{
    public $invited_user;
    public $invited_user_was_recently_created;
    public $invited_user_original_password;
    public $inviting_user;
    public $project;
    public $project_member;
    public $contract;
    public $chat_message;
    public $layout_user = null;
    
    public function build()
    {
        $this->layout_user = $this->invited_user;
        $this->view('emails.user.user_has_been_invited');
        $this->subject('👋 ' . ($this->inviting_user->first_name ?: $this->inviting_user->slug) . ' wants to chat');

        return $this;
    }
}
