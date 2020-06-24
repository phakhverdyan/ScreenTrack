<?php

namespace App\Http\Controllers\Api\Project;

use App\Events\UserAttachedToTaskEvent;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\User\User;
use App\Models\Project\ProjectTask;
use App\Models\Project\ProjectMember;
use App\Models\Project\ProjectTaskMember;

class ProjectTaskController extends Controller
{
    public function update(Request $request, $project_task_id)
    {
    	$project_task = ProjectTask::findOrFail($project_task_id);
		auth()->user()->canEditProjectTaskOrForbidden($project_task);

		validator()->make($request->all(), [
            'project_task' => 'required|array',
            'project_task.title' => 'nullable|string',
            'project_task.position' => 'nullable|numeric|min:0',
            
            'project_task.list_id' => [
                'nullable',
                'integer',
                'min:1',
                Rule::exists('project_lists', 'id')->where('project_id', $project_task->project_id),
            ],
        ])->validate();

		$project_task->fill($request->input('project_task'));
		$project_task->save();

		return response()->resource($project_task->makeHidden([
			'project',
		]));
    }

    public function archive(Request $request, $project_task_id)
    {
        $project_task = ProjectTask::findOrFail($project_task_id);
        auth()->user()->canArchiveProjectTaskOrForbidden($project_task);

        $project_task->archived_at = now();
        $project_task->save();

        return response()->resource($project_task->makeHidden([
            'project',
        ]));
    }

    public function restore(Request $request, $project_task_id)
    {
        $project_task = ProjectTask::findOrFail($project_task_id);
        auth()->user()->canRestoreProjectTaskOrForbidden($project_task);

        $project_task->archived_at = null;
        $project_task->save();

        return response()->resource($project_task->makeHidden([
            'project',
        ]));
    }

    public function add_member_user(Request $request, $project_task_id, $member_user_id)
    {
        $project_task = ProjectTask::findOrFail($project_task_id);
        auth()->user()->canEditProjectTaskMembersOrForbidden($project_task);

        if (!$project_member = $project_task->project->members()->where('user_id', $member_user_id)->first()) {
            return response()->error('This user is not a project member');
        }

        if (!$project_board_member = $project_task->board->members()->where('user_id', $member_user_id)->first()) {
            return response()->error('This user is not a board member');
        }

        if (!$project_task_member = $project_task->members()->where('user_id', $member_user_id)->first()) {
            $project_task_member = new ProjectTaskMember;
            $project_task_member->project_id = $project_task->project_id;
            $project_task_member->project_member_id = $project_member->id;
            $project_task_member->board_id = $project_task->board_id;
            $project_task_member->board_member_id = $project_board_member->id;
            $project_task_member->task_id = $project_task->id;
            $project_task_member->user_id = $member_user_id;
            $project_task_member->save();
            
            event(new UserAttachedToTaskEvent($project_task_member->user, $project_task_member->task));
        }

        $project_task->load([
            'members',
            'members.user',
            'members.user.image',
        ]);

        return response()->resource($project_task);
    }

    public function remove_member_user(Request $request, $project_task_id, $member_user_id)
    {
        $project_task = ProjectTask::findOrFail($project_task_id);
        auth()->user()->canEditProjectTaskMembersOrForbidden($project_task);

        if (!$project_task->project->members()->where('user_id', $member_user_id)->first()) {
            return response()->error('This user is not a project member');
        }

        if ($project_task_member = $project_task->members()->where('user_id', $member_user_id)->first()) {
            $project_task_member->delete();
        }

        $project_task->load([
            'members',
            'members.user',
            'members.user.image',
        ]);
        
        return response()->resource($project_task);
    }
}
