<?php

namespace App\Mail\Project;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Models\User;

class InviteForAlreadyRegisteredUserMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $project;
    public $contract;

    public function __construct($options)
    {
        foreach ($options as $option_key => $option_value) {
            $this->{$option_key} = $option_value;
        }
    }

    public function build()
    {
        return $this->view('emails.project.invite_for_already_registered_user')
            ->subject('You was invited to the project in ScreenTrack');
    }
}
