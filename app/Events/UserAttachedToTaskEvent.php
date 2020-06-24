<?php

namespace App\Events;

use App\Models\Project\ProjectTask;
use App\Models\User\User;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;

class UserAttachedToTaskEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $user;
    public $task;

    public function __construct(User $user, ProjectTask $task)
    {
        $this->user = $user;
        $this->task = $task;
    }
}
