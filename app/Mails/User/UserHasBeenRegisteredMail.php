<?php

namespace App\Mails\User;

use App\Mails\Mail;

class UserHasBeenRegisteredMail extends Mail
{
    public $registered_user;
    public $registered_user_original_password;
    public $layout_user = null;
    
    public function build()
    {
    	$this->layout_user = $this->registered_user;
        $this->view('emails.user.user_has_been_registered');
        $this->subject('👋 Welcome to ScreenTrack');

        return $this;
    }
}
