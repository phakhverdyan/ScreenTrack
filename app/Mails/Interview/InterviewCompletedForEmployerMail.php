<?php

namespace App\Mail\Interview;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class InterviewCompletedForEmployerMail extends Mailable
{
    use Queueable, SerializesModels;

    public $interview_result;
    public $user;

    public function __construct($options)
    {
        foreach ($options as $option_key => $option_value) {
            $this->{$option_key} = $option_value;
        }
    }

    public function build()
    {
        return $this->view('emails.interview.completed_for_employer')
            ->subject('User complete interview');
    }
}
