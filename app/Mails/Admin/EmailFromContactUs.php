<?php

namespace App\Mail\Admin;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class EmailFromContactUs extends Mailable
{
    use Queueable, SerializesModels;

    public $contact_us_type;
    public $contact_us_email;
    public $contact_us_name;
    public $contact_us_message_title;
    public $contact_us_message_text;
    public $layout_user = null;

    public function __construct($options)
    {
        foreach ($options as $option_key => $option_value) {
            $this->{$option_key} = $option_value;
        }
    }

    public function build()
    {
        return $this->view('emails.admin.email_from_contact_us');
    }
}
