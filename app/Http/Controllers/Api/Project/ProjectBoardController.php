<?php

namespace App\Http\Controllers\Api\Project;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Project\ProjectList;
use App\Models\Project\ProjectBoard;
use App\Models\Project\ProjectBoardMember;
use App\Models\Project\ProjectMember;

class ProjectBoardController extends Controller
{
    public function get(Request $request, $project_board_id)
    {
        $project_board = ProjectBoard::findOrFail($project_board_id);
        auth()->user()->canAccessProjectBoardOrForbidden($project_board);

        if (!$project_board_member = $project_board->members()->where('user_id', auth()->user()->id)->first()) {
            return abort(404);
        }

        $project_board->load([
            'members',
            'members.user',
            'members.user.image',
            'members.project_member',

            'lists' => function ($query) {
                $query->where('archived_at', null);
                $query->orderBy('position', 'asc');
            },

            'lists.tasks' => function ($query) {
                $query->where('archived_at', null);
                $query->orderBy('position', 'asc');
            },

            'lists.tasks.members',
            'lists.tasks.members.user',
            'lists.tasks.members.user.image',
            'lists.tasks.members.project_member',

            'lists.tasks.attachments' => function ($query) {
                $query->orderBy('position', 'asc');
            },
        ]);

        $project_board->setRelation('pivot', $project_board_member);

        return response()->resource($project_board);
    }

	public function lists(Request $request, $project_board_id)
	{
		$project_board = ProjectBoard::findOrFail($project_board_id);
		auth()->user()->canAccessProjectBoardListsOrForbidden($project_board);

		$project_list_query = $project_board->lists();

		$project_list_query->with([
			'tasks' => function ($query) {
				$query->select('project_tasks.*');
				$query->join('project_task_members', 'project_task_members.task_id', '=', 'project_tasks.id');
				$query->where('project_task_members.user_id', auth()->user()->id);
				$query->orderBy('project_tasks.position', 'asc');
			},
		]);

		$project_list_query->select('project_lists.*');

		if ($request->has('with_trackable_tasks_only')) {
			$project_task_query = ProjectTask::query();
			$project_task_query->selectRaw('COUNT(*)');
			$project_task_query->join('project_task_members', 'project_task_members.task_id', '=', 'project_tasks.id');
			$project_task_query->where('project_task_members.user_id', auth()->user()->id);
			$project_task_query->whereRaw('project_tasks.list_id = project_lists.id');

			$project_list_query->selectRaw('(' . $project_task_query->toSql() . ') AS count_of_tasks', $project_task_query->getBindings());
			$project_list_query->having('count_of_tasks', '>', 0);
		}

		$project_list_query->orderBy('project_lists.position', 'asc');
		$project_lists = $project_list_query->get();

		return response()->resource($project_lists);
	}

	public function update(Request $request, $project_board_id)
	{
		$project_board = ProjectBoard::findOrFail($project_board_id);
		auth()->user()->canEditProjectBoardOrForbidden($project_board);

		validator()->make($request->all(), [
            'project_board' => 'required|array',
            'project_board.name' => 'nullable|string',
            'project_board.position' => 'nullable|numeric|min:0',
        ])->validate();

		$project_board->fill($request->input('project_board'));
		$project_board->save();

		return response()->resource($project_board->makeHidden([
			'project',
		]));
	}

    public function archive(Request $request, $project_board_id)
    {
        $project_board = ProjectBoard::findOrFail($project_board_id);
        auth()->user()->canArchiveProjectBoardOrForbidden($project_board);

        $project_board->archived_at = now();
        $project_board->save();

        return response()->resource($project_board->makeHidden([
            'project',
        ]));
    }

    public function restore(Request $request, $project_board_id)
    {
        $project_board = ProjectBoard::findOrFail($project_board_id);
        auth()->user()->canRestoreProjectBoardOrForbidden($project_board);

        $project_board->archived_at = null;
        $project_board->save();

        return response()->resource($project_board->makeHidden([
            'project',
        ]));
    }

    public function create_list(Request $request, $project_board_id)
    {
        $project_board = ProjectBoard::findOrFail($project_board_id);
        auth()->user()->canAddListToProjectBoardOrForbidden($project_board);

        validator()->make($request->all(), [
            'project_list' => 'required|array',
            'project_list.name' => 'required|string',
            'project_list.position' => 'required|numeric|min:0',
        ])->validate();

        $project_list = new ProjectList;
        $project_list->project_id = $project_board->project_id;
        $project_list->board_id = $project_board->id;
        $project_list->fill($request->input('project_list'));
        $project_list->save();
        $project_list->setRelation('tasks', collect());

        return response()->resource($project_list);
    }

    public function add_member_user(Request $request, $project_board_id, $member_user_id)
    {
        $project_board = ProjectBoard::findOrFail($project_board_id);
        auth()->user()->canEditProjectBoardMembersOrForbidden($project_board);

        if (!$project_member = $project_board->project->members()->where('user_id', $member_user_id)->first()) {
            return response()->error('This user is not a project member');
        }

        if (!$project_board_member = $project_board->members()->where('user_id', $member_user_id)->first()) {
            $project_board_member = new ProjectBoardMember;
            $project_board_member->project_id = $project_board->project_id;
            $project_board_member->project_member_id = $project_member->id;
            $project_board_member->board_id = $project_board->id;
            $project_board_member->task_id = $project_board->id;
            $project_board_member->user_id = $member_user_id;
            $project_board_member->save();

            // event(new UserAttachedToBoardEvent($project_board_member->user, $project_board_member->task));
        }

        $project_board->load([
            'members',
            'members.user',
            'members.user.image',
        ]);

        return response()->resource($project_board);
    }

    public function remove_member_user(Request $request, $project_board_id, $member_user_id)
    {
        $project_board = ProjectBoard::findOrFail($project_board_id);
        auth()->user()->canEditProjectBoardMembersOrForbidden($project_board);

        if (!$project_member = $project_board->project->members()->where('user_id', $member_user_id)->first()) {
            return response()->error('This user is not a project member');
        }

        if (in_array($project_member->role, [ProjectMember::ROLE_OWNER, ProjectMember::ROLE_ADMINISTRATOR])) {
        	return response()->error('This user cannot be removed');
        }

        if ($project_board_member = $project_board->members()->where('user_id', $member_user_id)->first()) {
            $project_board_member->delete();
        }

        $project_board->load([
            'members',
            'members.user',
            'members.user.image',
        ]);

        return response()->resource($project_board);
    }
}
