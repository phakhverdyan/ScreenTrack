<?php

namespace App\Mail\Interview;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class InterviewCompletedForUserMail extends Mailable
{
    use Queueable, SerializesModels;

    public $interview_result;

    public function __construct($options)
    {
        foreach ($options as $option_key => $option_value) {
            $this->{$option_key} = $option_value;
        }
    }

    public function build()
    {
        return $this->view('emails.interview.completed_for_user')
            ->subject('You complete interview');
    }
}
