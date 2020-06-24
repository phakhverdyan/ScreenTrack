<?php

namespace App\Http\Controllers\Api\Project;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Project\ProjectList;
use App\Models\Project\ProjectTask;

class ProjectListController extends Controller
{
	public function update(Request $request, $project_list_id)
	{
		$project_list = ProjectList::findOrFail($project_list_id);
		auth()->user()->canEditProjectListOrForbidden($project_list);

		validator()->make($request->all(), [
            'project_list' => 'required|array',
            'project_list.name' => 'required|string',
            'project_list.position' => 'required|numeric|min:0',
        ])->validate();

		$project_list->fill($request->input('project_list'));
		$project_list->save();

		return response()->resource($project_list->makeHidden([
			'project',
		]));
	}

    public function archive(Request $request, $project_list_id)
    {
        $project_list = ProjectList::findOrFail($project_list_id);
        auth()->user()->canArchiveProjectListOrForbidden($project_list);

        $project_list->archived_at = now();
        $project_list->save();

        return response()->resource($project_list->makeHidden([
            'project',
        ]));
    }

    public function restore(Request $request, $project_list_id)
    {
        $project_list = ProjectList::findOrFail($project_list_id);
        auth()->user()->canRestoreProjectListOrForbidden($project_list);

        $project_list->archived_at = null;
        $project_list->save();

        return response()->resource($project_list->makeHidden([
            'project',
        ]));
    }

    public function create_task(Request $request, $project_list_id)
    {
    	$project_list = ProjectList::findOrFail($project_list_id);
    	auth()->user()->canAddTaskToProjectListOrForbidden($project_list);

		validator()->make($request->all(), [
            'project_task' => 'required|array',
            'project_task.title' => 'required|string',
            'project_task.position' => 'required|numeric|min:0',
        ])->validate();

		$project_task = new ProjectTask;
        $project_task->project_id = $project_list->project_id;
        $project_task->board_id = $project_list->board_id;
        $project_task->list_id = $project_list->id;
        $project_task->fill($request->input('project_task'));
        $project_task->save();
        $project_task->setRelation('members', collect());
        $project_task->setRelation('attachments', collect());

        return response()->resource($project_task);
    }
}
