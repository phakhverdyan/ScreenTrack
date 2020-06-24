<?php

namespace App\Events;

use App\Models\Project\ProjectInterview;
use App\Models\Project\ProjectInterviewResult;
use App\Models\User\User;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;

class InterviewPassedEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $user;
    public $interview;
    public $interview_result;

    public function __construct(User $user, ProjectInterview $interview, ProjectInterviewResult $interview_result)
    {
        $this->user = $user;
        $this->interview = $interview;
        $this->interview_result = $interview_result;
    }
}
