<?php

namespace App\Http\Controllers\Dashboard\Project;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Project\ProjectBoard;
use App\Models\Project\ProjectMember;

class ProjectBoardController extends Controller
{
	public function index(Request $request, $project_id)
	{
		$selected_project = request()->selected_project;

		if (!$project_board_member = $selected_project->board_members()->where('user_id', auth()->user()->id)->first()) {
			return view('dashboard.projects.boards.index');
		}
		
		return redirect()->route('dashboard.project.board', [
			'project_id' => $selected_project->id,
			'board_id' => $project_board_member->board_id,
		]);
	}

	public function main(Request $request, $project_id, $board_id)
	{
		$selected_project = request()->selected_project;

		if (!$selected_project_board = $selected_project->boards()->find($board_id)) {
			return redirect()->route('dashboard.project', [
				'project_id' => $project_id,
			]);
		}

		if (!$project_board_member = $selected_project_board->members()->where('user_id', auth()->user()->id)->first()) {
			return redirect()->route('dashboard.project', [
				'project_id' => $project_id,
			]);
		}

		if ($selected_project_board->archived_at) {
			return redirect()->route('dashboard.project', [
				'project_id' => $project_id,
			]);
		}
		
		$selected_project->load([
			'boards' => function ($query) {
				$query->select('project_boards.*');
				$query->join('project_board_members', 'project_board_members.board_id', '=', 'project_boards.id');
				$query->where('project_board_members.user_id', auth()->user()->id);
				$query->where('project_boards.archived_at', null);
				$query->orderBy('project_boards.position', 'asc');
			},
		]);

		$selected_project_board->load([
			'members' => function ($query) {
				$query->join('project_members', 'project_members.id', '=', 'project_board_members.project_member_id');
				$query->orderBy('project_members.role', 'asc');
			},

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

		$selected_project_board->setRelation('pivot', $project_board_member);

		return view('dashboard.projects.boards.main', [
			'selected_project_board' => $selected_project_board,
		]);
	}
}
