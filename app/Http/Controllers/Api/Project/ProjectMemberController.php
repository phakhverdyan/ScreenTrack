<?php

namespace App\Http\Controllers\Api\Project;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Contract;
use App\Models\Contact\Contact;
use App\Models\Contact\ContactList;
use App\Models\Project\Project;
use App\Models\Project\ProjectMember;
use App\Models\Project\ProjectTaskMember;
use App\Models\Project\ProjectBoardMember;

class ProjectMemberController extends Controller
{
    public function list(Request $request, $project_id)
    {
        $project = Project::findOrFail($project_id);
        auth()->user()->canAccessProjectMembersOrForbidden($project);

        validator()->make($request->all(), [
            'query' => 'nullable|string',
        ])->validate();

        $project_member_query = $project->members();

        $project_member_query->with([
            'user',
            'user.image',
        ]);

        if ($request->input('query')) {
            $project_member_query->join('users', 'users.id', '=', 'project_members.user_id');
            $project_member_query->where('email', '%' . $request->input('query') . '%');
        }

        $project_members = $project_member_query->get();

        foreach ($project_members as $project_member) {
            $project_member->user->makeVisible([
                'email',
            ]);
        }

        return response()->resource($project_members);
    }

    public function create__disabled(Request $request, $project_id)
    {
        $project = Project::findOrFail($project_id);
        auth()->user()->canAddMemberToProjectOrForbidden($project);

        validator()->make($request->all(), [
            'project_member' => 'required|array',
            'project_member.user_id' => 'required|numeric|exists:users,id',

            'project_member.role' => 'required|string|in:' . implode(',', [
                ProjectMember::ROLE_ADMINISTRATOR,
                ProjectMember::ROLE_MANAGER,
                ProjectMember::ROLE_CONTRACTOR,
            ]),
        ])->validate();

        if (!$project_member = $project->members()->where('user_id', $request->input('project_member.user_id'))->first()) {
            $project_member = new ProjectMember;
            $project_member->project_id = $project->id;
            $project_member->user_id = $request->input('project_member.user_id');
            $project_member->role = $request->input('project_member.role');
            $project_member->save();
        }

        return response()->resource($project_member);
    }

    public function update(Request $request, $project_member_id)
    {
        $project_member = ProjectMember::findOrFail($project_member_id);
        auth()->user()->canUpdateProjectMemberOrForbidden($project_member);

        validator()->make($request->all(), [
            'project_member' => 'required|array',
            'project_member.role' => 'string|nullable|in:' . implode(',', ProjectMember::$roles),
        ])->validate();

        $project_member->fill($request->input('project_member'));
        $project_member->save();

        return response()->resource($project_member);

    }

    public function delete(Request $request, $project_member_id)
    {
        $project_member = ProjectMember::findOrFail($project_member_id);
        auth()->user()->canDeleteProjectMemberOrForbidden($project_member);
        $contract = null;

        DB::beginTransaction();

        try {
            if (
                $request->input('remove_from_all_my_projects')
                &&
                auth()->user()->canDeleteProjectMemberFromAllOwnerProjects($project_member)
            ) {
                $project_board_member_query = ProjectBoardMember::query();
                $project_board_member_query->join('projects', 'projects.id', '=', 'project_board_members.project_id');
                $project_board_member_query->where('projects.owner_user_id', $project_member->project->owner_user_id);
                $project_board_member_query->where('project_board_members.user_id', $project_member->user_id);
                $project_board_member_query->delete();

                $project_task_member_query = ProjectTaskMember::query();
                $project_task_member_query->join('projects', 'projects.id', '=', 'project_task_members.project_id');
                $project_task_member_query->where('projects.owner_user_id', $project_member->project->owner_user_id);
                $project_task_member_query->where('project_task_members.user_id', $project_member->user_id);
                $project_task_member_query->delete();

                $project_member_query = ProjectMember::query();
                $project_member_query->join('projects', 'projects.id', '=', 'project_members.project_id');
                $project_member_query->where('projects.owner_user_id', $project_member->project->owner_user_id);
                $project_member_query->where('project_members.user_id', $project_member->user_id);
                $project_member_query->delete();
            } else {
                $project_board_member_query = ProjectBoardMember::query();
                $project_board_member_query->where('project_board_members.project_id', $project_member->project_id);
                $project_board_member_query->where('project_board_members.user_id', $project_member->user_id);
                $project_board_member_query->delete();

                $project_task_member_query = ProjectTaskMember::query();
                $project_task_member_query->where('project_task_members.project_id', $project_member->project_id);
                $project_task_member_query->where('project_task_members.user_id', $project_member->user_id);
                $project_task_member_query->delete();
                
                $project_member->delete();
            }

            if ($request->input('close_contract') && auth()->user()->canCloseContractOfProjectMember($project_member)) {
                $contract_query = Contract::query();
                $contract_query->where('employer_user_id', $project_member->project->owner_user_id);
                $contract_query->where('employee_user_id', $project_member->user_id);
                $contract_query->where('closed_at', null);
                $contract = $contract_query->first();

                if ($contract) {
                    $contract->closed_at = now();
                    $contract->save();
                }
            }
        } catch (\Exception $exception) {
            DB::rollback();
            throw $exception;
        }

        DB::commit();

        // EVENT: USER HAS BEEN REMOVED FROM PROJECT & (sometimes) contract was closed

        return response()->resource();
    }
}
