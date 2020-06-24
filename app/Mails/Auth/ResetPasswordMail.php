<?php

namespace App\Mails\Auth;

use App\Mails\Mail;

class ResetPasswordMail extends Mail
{
    public $user;
    public $password_reset;
    public $layout_user = null;

    public function build()
    {
    	$this->layout_user = $this->user;
        $this->view('emails.auth.reset_password');
        $this->subject('ScreenTrack password reset');

        return $this;
    }
}
