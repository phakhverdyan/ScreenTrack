<?php

namespace App\Mail\ProjectTask;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Models\User;

class UserAttachedToTaskNotifyMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $task;

    public function __construct($options)
    {
        foreach ($options as $option_key => $option_value) {
            $this->{$option_key} = $option_value;
        }
    }

    public function build()
    {
        return $this->view('emails.project_task.user_attached')
            ->subject('You was attached to Task');
    }
}
