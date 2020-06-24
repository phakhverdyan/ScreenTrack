<?php

namespace App\Http\Middleware\Dashboard;

use App\Models\Project\ProjectMember;
use Closure;
use App\Models\Project\Project;
use Illuminate\Support\Carbon;

class SelectedProjectDetection
{
	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next)
	{
		$project_query = Project::query();
		$project_query->select('projects.*');

		$project_query->selectRaw('(' .
			'SELECT COUNT(*) FROM project_members WHERE project_members.project_id = projects.id' .
		') AS count_of_members');
		
		$project_query->selectRaw('(' .
			'SELECT COUNT(*) FROM project_interviews WHERE project_interviews.project_id = projects.id' .
		') AS count_of_interviews');
		
		$project_query->selectRaw('(' . collect([
			'SELECT COUNT(*) FROM contracts',
			'JOIN project_members ON project_members.user_id = contracts.employee_user_id',
			'WHERE project_members.project_id = projects.id',
			'AND contracts.employer_user_id = projects.owner_user_id',
			'AND contracts.closed_at IS NULL',
		])->join(' ') . ') AS count_of_contracts');


		if ($request->route()->named(['dashboard.project', 'dashboard.project.*'])) {
			$project_query->where('projects.id', $request->route()->parameter('project_id'));
		} else {
			$project_query->join('project_members', 'project_members.project_id', '=', 'projects.id');
			$project_query->orderBy('project_members.last_viewed_at', 'desc');
			$project_query->where('project_members.user_id', auth()->user()->id);
		}

		if (!$request->selected_project = $project_query->first()) {
			$request->selected_project = Project::create([
				'name' => 'Project 1',
			], [
				'owner_user' => auth()->user(),
			]);
		}
		
		auth()->user()->canAccessProjectOrNotFound($request->selected_project);
		
		$request->selected_project->setRelation('pivot', $request->selected_project->members()->where('user_id', auth()->user()->id)->first());
		$request->selected_project->pivot->last_viewed_at = now();
		$request->selected_project->pivot->save();
		
		if (in_array($request->selected_project->pivot->role, [ProjectMember::ROLE_OWNER, ProjectMember::ROLE_ADMINISTRATOR])) {
			$request->selected_project->load([
				'members' => function($query) {
					$query->select('project_members.*');

					$query->selectRaw('(' . collect([
						'SELECT contracts.id',
						'FROM contracts',
						'JOIN projects',
						'WHERE projects.id = project_members.project_id',
						'AND contracts.employer_user_id = projects.owner_user_id',
						'AND contracts.employee_user_id = project_members.user_id',
						'AND contracts.closed_at IS NULL',
						'LIMIT 1',
					])->join(' ') . ') AS contract_id');

					$query->orderBy('project_members.role', 'asc');
				},

				'members.user',
				'members.user.image',
				'members.contract',
				'boards',
			]);
		}

		if (in_array($request->selected_project->pivot->role, [ProjectMember::ROLE_OWNER])) {
			$request->selected_project->makeVisible([
				'count_of_contracts',
			]);

			foreach ($request->selected_project->members as $project_member) {
				if ($project_member->contract) {
					$project_member->contract->makeVisible('hourly_rate');
				}
			}
		}

		if (in_array($request->selected_project->pivot->role, [ProjectMember::ROLE_OWNER, ProjectMember::ROLE_ADMINISTRATOR])) {
			foreach ($request->selected_project->members as $project_member) {
				$project_member->user->makeVisible('email');
			}
		}
		
		return $next($request);
	}
}
