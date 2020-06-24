<?php

namespace App\Http\Controllers\Dashboard\Project;

use App\Models\Project\ProjectMember;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Company\Company;
use App\Models\Project\Project;

class ProjectController extends Controller
{
	public function index()
	{
		$user = auth()->user();

		$user->load([
			'projects' => function ($query) {
				$query->orderBy('created_at', 'desc');
			},

			'own_projects' => function ($query) {
				$query->orderBy('created_at', 'desc');
			},

			'joined_projects' => function ($query) {
				$query->orderBy('created_at', 'desc');
			},
		]);

		return view('dashboard.projects.index', compact([
			'user',
		]));
	}

	public function create()
	{
		$user = auth()->user();
		$project = null;

		return view('dashboard.projects.create_or_edit', compact([
			'user',
			'project',
		]));
	}

	public function edit()
	{
		$project = request()->selected_project;
		auth()->user()->canEditProjectOrNotFound($project);
		$user = auth()->user();

		return view('dashboard.projects.create_or_edit', compact([
			'user',
			'project',
		]));
	}

	public function main(Request $request, $project_id)
	{
		return redirect()->route('dashboard.project.boards', [$project_id]);
	}

	public function tasks(Request $request)
	{
		// $selected_project = request()->selected_project;

		// $selected_project->load([
		//     'lists' => function ($query) {
		//         $query->where('archived_at', null);
		//         $query->orderBy('position', 'asc');
		//     },

		//     'lists.tasks' => function ($query) {
		//         $query->where('archived_at', null);
		//         $query->orderBy('position', 'asc');
		//     },

		//     'lists.tasks.members',
		//     'lists.tasks.members.user',
		//     'lists.tasks.members.user.image',

		//     'lists.tasks.attachments' => function ($query) {
		//         $query->orderBy('position', 'asc');
		//     },
		// ]);

		return view('dashboard.projects.tasks');
	}

	public function channels()
	{
		return view('dashboard.projects.channels');
	}

	public function contracts()
	{
		return view('dashboard.projects.contracts');
	}
}
