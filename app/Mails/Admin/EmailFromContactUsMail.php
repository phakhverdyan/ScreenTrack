<?php

namespace App\Mails\Admin;

use App\Mails\Mail;

class EmailFromContactUsMail extends Mail
{
    public $contact_us_type;
    public $contact_us_email;
    public $contact_us_name;
    public $contact_us_message_title;
    public $contact_us_message_text;
    public $layout_user = null;

    public function build()
    {
        $this->view('emails.admin.email_from_contact_us');
        $this->subject('Email from Contact Us');

        return $this;
    }
}
