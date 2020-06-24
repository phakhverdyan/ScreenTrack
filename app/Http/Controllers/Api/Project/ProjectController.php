<?php

namespace App\Http\Controllers\Api\Project;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Events\User\UserHasBeenInvitedToProjectEvent;
use App\Models\Contract;
use App\Models\Milestone;
use App\Models\User\User;
use App\Models\User\UserCreditCard;
use App\Models\Project\Project;
use App\Models\Project\ProjectList;
use App\Models\Project\ProjectTask;
use App\Models\Project\ProjectBoard;
use App\Models\Project\ProjectBoardMember;
use App\Models\Project\ProjectMember;
use App\Models\Project\ProjectTaskMember;

class ProjectController extends Controller
{
	public function create(Request $request) {
		validator()->make($request->all(), [
			'project' => 'required|array',
			'project.name' => 'required|string',
			'project.description' => 'nullable|string',
			'project.related_company_id' => 'nullable|exists:companies,id',
		])->validate();

		$project = Project::create($request->input('project'), [
            'owner_user' => auth()->user(),
        ]);

		return response()->resource($project);
	}

	public function get(Request $request, $project_id) {
		$project_query = Project::select('projects.*');

		$project_query->selectRaw('(' . collect([
			'SELECT COUNT(*) * 60 FROM tracking_segments ',
			'JOIN tracking_sessions ON tracking_sessions.id = tracking_segments.session_id',
			'WHERE tracking_sessions.project_id = projects.id',
			'AND tracking_sessions.user_id = ?',
			'AND tracking_segments.created_at >= ?',
			'AND tracking_segments.created_at < ?',
		])->join(' ') . ') AS tracked_time_today', [
			auth()->user()->id,
			date(\DateTime::ATOM, floor(time() / 86400) * 86400),
			date(\DateTime::ATOM, floor(time() / 86400) * 86400 + 86400),
		]);

		$project_query->selectRaw('(' . collect([
			'SELECT COUNT(*) * 60 FROM tracking_segments ',
			'JOIN tracking_sessions ON tracking_sessions.id = tracking_segments.session_id',
			'WHERE tracking_sessions.project_id = projects.id',
			'AND tracking_sessions.user_id = ?',
			'AND tracking_segments.created_at >= ?',
			'AND tracking_segments.created_at < ?',
		])->join(' ') . ') AS tracked_time_this_week', [
			auth()->user()->id,
			date(\DateTime::ATOM, strtotime('-' . (date('N') - 1) . ' days', floor(time() / 86400) * 86400)),
			date(\DateTime::ATOM, strtotime('-' . (date('N') - 1) . ' days', floor(time() / 86400) * 86400 + 7 * 86400)),
		]);

		$project = $project_query->findOrFail($project_id);
		auth()->user()->canAccessProjectOrForbidden($project);

		if ($request->has('with_trackable_tasks_only') || $request->has('is_time_trackable_only')) {
			$contract_query = Contract::query();
			$contract_query->where('employer_user_id', $project->owner_user_id);
			$contract_query->where('employee_user_id', auth()->user()->id);
			$contract_query->where('contracts.closed_at', null);

			if (!$contract_query->first()) {
				abort(403);
			}
		}

		$project->load([
			// ---------------------------------------------------------------------- //
			//
			// just for old Tracker Versions
			//
			// ---------------------------------------------------------------------- //

			'lists' => function ($query) use ($request) {
				$query->select('project_lists.*');
				$query->join('project_boards', 'project_boards.id', '=', 'project_lists.board_id');
				$query->join('project_board_members', 'project_board_members.board_id', '=', 'project_boards.id');
				$query->where('project_boards.archived_at', null);
				$query->where('project_lists.archived_at', null);
				$query->where('project_board_members.user_id', auth()->user()->id);

				if ($request->has('with_trackable_tasks_only') || $request->has('is_time_trackable_only')) {
					$query->selectRaw('(' . collect([
						'SELECT COUNT(*) FROM project_tasks',
						'WHERE project_tasks.list_id = project_lists.id',
						'AND project_tasks.archived_at IS NULL',
					])->join(' ') . ') AS count_of_tasks');

					$query->having('count_of_tasks', '>', 0);
				}
			},

			'lists.tasks' => function ($query) use ($request) {
				$query->select('project_tasks.*');
				$query->where('project_tasks.archived_at', null);
			},

			// ---------------------------------------------------------------------- //

			'boards' => function ($query) use ($request) {
				$query->select('project_boards.*');
				$query->join('project_board_members', 'project_board_members.board_id', '=', 'project_boards.id');
				$query->where('project_boards.archived_at', null);
				$query->where('project_board_members.user_id', auth()->user()->id);

				if ($request->has('with_trackable_tasks_only') || $request->has('is_time_trackable_only')) {
					$query->selectRaw('(' . collect([
						'SELECT COUNT(*) FROM project_tasks',
						'WHERE project_tasks.board_id = project_boards.id',
						'AND project_tasks.archived_at IS NULL',
					])->join(' ') . ') AS count_of_tasks');

					$query->having('count_of_tasks', '>', 0);
				}
			},

			'boards.lists' => function ($query) use ($request) {
				$query->select('project_lists.*');
				$query->where('project_lists.archived_at', null);

				if ($request->has('with_trackable_tasks_only') || $request->has('is_time_trackable_only')) {
					$query->selectRaw('(' . collect([
						'SELECT COUNT(*) FROM project_tasks',
						'WHERE project_tasks.list_id = project_lists.id',
						'AND project_tasks.archived_at IS NULL',
					])->join(' ') . ') AS count_of_tasks');

					$query->having('count_of_tasks', '>', 0);
				}
			},

			'boards.lists.tasks' => function ($query) {
				$query->select('project_tasks.*');
				$query->where('project_tasks.archived_at', null);
			},
		]);

		return response()->resource($project);
	}

	public function update(Request $request, $project_id) {
		$project = Project::findOrFail($project_id);
		auth()->user()->canEditProjectOrForbidden($project);

		validator()->make($request->all(), [
			'project' => 'required|array',
			'project.name' => 'string',
			'project.description' => 'nullable|string',
			'project.related_company_id' => 'nullable|exists:companies,id',
		])->validate();

		$project->fill($request->input('project'));
		$project->save();

		return response()->resource($project);
	}

	public function delete($project_id) {
		$project = Project::findOrFail($project_id);
		auth()->user()->canDeleteProjectOrForbidden($project);
		$project->delete();

		return response()->resource();
	}

	public function create_board(Request $request, $project_id)
	{
		$project_query = Project::select('projects.*');

		$project_query->selectRaw('(' . collect([
			'SELECT COUNT(*)',
			'FROM project_boards',
			'WHERE project_boards.project_id = projects.id',
		])->join(' ') . ') AS count_of_boards');

		$project = $project_query->findOrFail($project_id);
		auth()->user()->canAddBoardToProjectOrForbidden($project);

		validator()->make($request->all(), [
			'project_board' => 'required|array',
			'project_board.name' => 'string|nullable',
			'project_board.position' => 'required|numeric|min:0',
		])->validate();

		DB::beginTransaction();

		try {
			$project_board = new ProjectBoard;
			$project_board->project_id = $project->id;
			$project_board->fill($request->input('project_board'));
			$project_board->name = $project_board->name ?: 'Board ' . ($project->count_of_boards + 1);
			$project_board->save();

			$project_members = $project->members()->whereIn('role', [
				ProjectMember::ROLE_OWNER,
				ProjectMember::ROLE_ADMINISTRATOR,
			])->get();

			foreach ($project_members as $project_member) {
				$project_board_member = new ProjectBoardMember;
				$project_board_member->project_id = $project->id;
				$project_board_member->project_member_id = $project_member->id;
				$project_board_member->board_id = $project_board->id;
				$project_board_member->user_id = $project_member->user_id;
				$project_board_member->save();
			}

			$project_lists = collect();

			foreach (['To Do', 'Doing', 'To Verify', 'Done'] as $project_list_name) {
                $project_list = new ProjectList;
                $project_list->project_id = $project->id;
                $project_list->board_id = $project_board->id;
                $project_list->name = $project_list_name;
                $project_list->save();
                $project_lists->push($project_list);
            }

            $project_task = new ProjectTask;
            $project_task->project_id = $project->id;
            $project_task->board_id = $project_board->id;
            $project_task->list_id = $project_lists[0]->id;
            $project_task->title = 'First Task';
            $project_task->save();

            $project_board->setRelation('lists', $project_lists);
            $project_list->setRelation('tasks', collect([$project_task]));
		} catch (\Exception $exception) {
			DB::rollback();
			throw $exception;
		}

		DB::commit();

		return response()->resource($project_board);
	}

	public function invite_member(Request $request, $project_id)
	{
		$project = Project::findOrFail($project_id);
		auth()->user()->canAddMemberToProjectOrForbidden($project);

		// ---------------------------------------------------------------------- //

		$validation_rules = [
			'user' => 'array',
			'user.id' => 'required_without:user.email|nullable|integer|exists:users,id',
			'user.email' => 'required_without:user.id|nullable|email',
			'user.first_name' => 'nullable|string',
			'user.last_name' => 'nullable|string',
			'project_member' => 'required|array',

			'project_member.role' => [
				'required',
				'string',

				'in:' . collect([
					ProjectMember::ROLE_CONTRACTOR,
				])->concat(auth()->user()->id == $project->owner_user_id ? [
					ProjectMember::ROLE_ADMINISTRATOR,
					ProjectMember::ROLE_OWNER,
				] : [])->join(','),
			],

			'project_member.board_ids' => 'required|array',
			'project_member.board_ids.*' => 'required|integer|exists:project_boards,id',
		];

		if (auth()->user()->canOpenContractInProject($project)) {
			$validation_rules['project_member.is_time_trackable'] = 'integer|nullable';
		}

		$being_invited_user = null;

		if ($request->input('user.email') && is_string($request->input('user.email'))) {
			$being_invited_user = User::where('email', $request->input('user.email'))->first();
		} else if ($request->input('user.id') && is_string($request->input('user.id'))) {
			$being_invited_user = User::find($request->input('user.id'));
		}

		$contract = null;

		if ($being_invited_user) {
			$contract_query = $being_invited_user->employee_contracts();
			$contract_query->where('employer_user_id', $project->owner_user_id);
			$contract_query->where('closed_at', null);
			$contract = $contract_query->first();
		}

		if ($request->input('contract.type') && auth()->user()->canOpenContractInProject($project)) {
			if (!$contract) {
				$validation_rules['contract'] = 'required|array';
				$validation_rules['contract.payment_type'] = 'required|in:' . implode(',', Contract::$paymentTypes);
				$validation_rules['contract.type'] = 'required|in:' . implode(',', Contract::$types);
				$validation_rules['contract.title'] = 'required|string';
				
				if ($request->input('contract.payment_type') === Contract::PAYMENT_TYPE_ESCROW) {
					if ($request->input('contract.type') == Contract::TYPE_HOURLY) {
						$validation_rules['contract.hourly_rate'] = array_merge([
							auth()->user()->administrator ? 'nullable' : 'required',
							'numeric',
							'min:0',
							'max:999',
						]);
					}
					
					if ($request->input('contract.type') == Contract::TYPE_FIXED_PRICE) {
						$validation_rules['contract.milestones'] = 'required|array';
						$validation_rules['contract.milestones.0'] = 'required|array';
						$validation_rules['contract.milestones.*'] = 'required|array';
						$validation_rules['contract.milestones.*.title'] = 'required|string';
						$validation_rules['contract.milestones.*.amount'] = 'required|numeric|min:5';
					}
				}
			}

			if (!auth()->user()->default_credit_card && $request->input('contract.payment_type') === Contract::PAYMENT_TYPE_ESCROW) {
				$validation_rules['stripe_token_id'] = 'required|string';
			}
		}

		validator()->make($request->all(), $validation_rules)->validate();

        // ---------------------------------------------------------------------- //

		DB::beginTransaction();

		try {
			if ($request->input('user.email')) {
				if (!$being_invited_user) {
					$being_invited_user = User::create([
						'email' => $request->input('user.email'),
						'first_name' => $request->input('user.first_name'),
						'last_name' => $request->input('user.last_name'),
						'referrer_user_id' => auth()->user()->id,
					]);
				}
			}

			$being_invited_user->load('image');

			if ($request->input('contract.type') && auth()->user()->canOpenContractInProject($project)) {
				if (!$contract) {
					$contract = new Contract;
					$contract->employer_user_id = auth()->user()->id;
					$contract->employee_user_id = $being_invited_user->id;
					$contract->type = $request->input('contract.type');
                    $contract->payment_type = $request->input('contract.payment_type');
                    
					if ($request->input('contract.type') == Contract::TYPE_HOURLY) {
						$contract->hourly_rate = (float) $request->input('contract.hourly_rate', 0.0);
					}

					$contract->title = $request->input('contract.title');
					$contract->save();

					if ($request->input('contract.type') == Contract::TYPE_FIXED_PRICE) {
						$contract->setRelation('milestones', collect());

						foreach ($request->input('contract.milestones', []) as $input_milestone) {
							$milestone = new Milestone;
							$milestone->contract_id = $contract->id;
							$milestone->title = $input_milestone['title'];
							$milestone->amount = (float) $input_milestone['amount'];
							$milestone->project_id = $project->id;
							$milestone->save();

							$contract->milestones->push($milestone);
						}
					}
				}
			}

			$project->load([
				'boards',

				'boards.members' => function($query) use ($being_invited_user) {
					$query->where('project_board_members.user_id', $being_invited_user->id);
				},
			]);

			if (!$project_member = $project->members()->where('user_id', $being_invited_user->id)->first()) {
				if ($request->input('project_member.role') == ProjectMember::ROLE_OWNER) {
					$project->owner_user_id = $being_invited_user->id;
					$project->save();

					$project->members()->where('role', ProjectMember::ROLE_OWNER)->update([
						'role' => ProjectMember::ROLE_ADMINISTRATOR,
					]);
				}

				$project_member = new ProjectMember;
				$project_member->project_id = $project->id;
				$project_member->user_id = $being_invited_user->id;
				$project_member->role = $request->input('project_member.role');
				$project_member->save();

				if (in_array($project_member->role, [ProjectMember::ROLE_OWNER, ProjectMember::ROLE_ADMINISTRATOR])) {
					foreach ($project->boards as $project_board) {
						if ($project_board->members->where('user_id', $being_invited_user->id)->first()) {
							continue;
						}

						$project_board_member = new ProjectBoardMember;
						$project_board_member->project_id = $project->id;
						$project_board_member->project_member_id = $project_member->id;
						$project_board_member->user_id = $being_invited_user->id;
						$project_board_member->board_id = $project_board->id;
						$project_board_member->save();
						$project_board->members->push($project_board_member);
					}
				} else {
					foreach ($request->input('project_member.board_ids', []) as $project_board_id) {
						if (!$project_board = $project->boards->where('id', $project_board_id)->first()) {
							continue;
						}

						if ($project_board->members->where('user_id', $being_invited_user->id)->first()) {
							continue;
						}

						$project_board_member = new ProjectBoardMember;
						$project_board_member->project_id = $project->id;
						$project_board_member->project_member_id = $project_member->id;
						$project_board_member->user_id = $being_invited_user->id;
						$project_board_member->board_id = $project_board->id;
						$project_board_member->save();
						$project_board->members->push($project_board_member);
					}
				}
			}

			$project_member->setRelation('user', $being_invited_user);

			$project_member->setRelation('board_members', $project->boards->map(function ($project_board) {
				return $project_board->members->first();
			})->filter(function ($project_board_member) {
				return $project_board_member;
			})->values());

			if ($request->input('stripe_token_id')) {
				$user_stripe_customer = \Stripe\Customer::retrieve(auth()->user()->stripe_customer_id);

				$user_stripe_credit_card = $user_stripe_customer->sources->create([
					'source' => $request->input('stripe_token_id'),
				]);

				$user_credit_card = new UserCreditCard;
				$user_credit_card->user_id = auth()->user()->id;
				$user_credit_card->stripe_id = $user_stripe_credit_card->id;
				$user_credit_card->address_zip = $user_stripe_credit_card->address_zip;
				$user_credit_card->brand = $user_stripe_credit_card->brand;
				$user_credit_card->country_code = $user_stripe_credit_card->country;
				$user_credit_card->expiration_month = $user_stripe_credit_card->exp_month;
				$user_credit_card->expiration_year = $user_stripe_credit_card->exp_year;
				$user_credit_card->funding = $user_stripe_credit_card->funding;
				$user_credit_card->last4 = $user_stripe_credit_card->last4;
				$user_credit_card->is_default = true;
				$user_credit_card->save();
			}
		} catch (\Exception $exception) {
			DB::rollback();
			throw $exception;
		}

		DB::commit();

		event(new UserHasBeenInvitedToProjectEvent([
			'invited_user' => $being_invited_user,
			'inviting_user' => auth()->user(),
			'project' => $project,
			'project_member' => $project_member,
			'contract' => $contract,
		]));

		return response()->resource($project_member);
	}

	public function leave(Request $request, $project_id)
	{
		$project = Project::findOrFail($project_id);
		auth()->user()->canLeaveProjectOrForbidden($project);

		// ---------------------------------------------------------------------- //

		DB::beginTransaction();

		try {
			$project_task_member_query = ProjectTaskMember::query();
			$project_task_member_query->join('project_tasks', 'project_tasks.id', '=', 'project_task_members.task_id');
			$project_task_member_query->where('project_tasks.project_id', $project->id);
			$project_task_member_query->where('project_task_members.user_id', auth()->user()->id);
			$project_task_member_query->delete();

			$project_board_member_query = ProjectBoardMember::query();
			$project_board_member_query->join('project_boards', 'project_boards.id', '=', 'project_board_members.board_id');
			$project_board_member_query->where('project_boards.project_id', $project->id);
			$project_board_member_query->where('project_board_members.user_id', auth()->user()->id);
			$project_board_member_query->delete();

			$project_member_query = ProjectMember::query();
			$project_member_query->where('project_id', $project->id);
			$project_member_query->where('user_id', auth()->user()->id);
			$project_member_query->delete();
		} catch (\Exception $exception) {
			throw $exception;
			DB::rollback();
		}

		DB::commit();

		return response()->resource();
	}

	public function close(Request $request, $project_id)
	{
		$project = Project::findOrFail($project_id);
		auth()->user()->canCloseProjectOrForbidden($project);

		$project->closed_at = now();
		$project->save();

		return response()->resource($project);
	}
}
