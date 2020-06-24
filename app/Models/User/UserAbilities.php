<?php

namespace App\Models\User;

use App\Models\Project\Project;
use App\Models\Project\ProjectTask;
use App\Models\Project\ProjectList;
use App\Models\Project\ProjectMember;

trait UserAbilities
{
	public function abilities()
	{
		$this->ability(function ($user) {
            if ($this->administrator) {
                return true;
            }

            return $user->id == $this->id;
        }, [
            'ACCESS_USER',
            'EDIT_USER',
        ]);

        // ---------------------------------------------------------------------- //

        $this->ability(function ($company) { // company OWNER only
            return $company->owner_user_id == $this->id;
        }, [
            'EDIT_COMPANY',
            'DELETE_COMPANY',
        ]);

        // ---------------------------------------------------------------------- //

        $this->ability(function ($project) { // project members: ALL
            return $project->members()->where('user_id', $this->id)->exists();
        }, [
            'ACCESS_PROJECT',
        ]);

        $this->ability(function ($project) { // project members: ALL BUT NOT OWNER
            if (!$project_member = $project->members()->where('user_id', $this->id)->first()) {
                return false;
            }

            return $project_member->role != ProjectMember::ROLE_OWNER;
        }, [
            'LEAVE_PROJECT',
        ]);

        $this->ability(function ($project) { // project members: OWNER and ADMINISTRATOR only
            return $project->members()->where('user_id', $this->id)->whereIn('role', [
                ProjectMember::ROLE_OWNER,
                ProjectMember::ROLE_ADMINISTRATOR,
            ])->exists();
        }, [
            'EDIT_PROJECT',
            // 'ACCESS_PROJECT_LISTS',
            // 'SORT_PROJECT_LISTS',
            'MANAGE_INTERVIEWS_FOR_PROJECT',
            'ACCESS_PROJECT_MEMBERS',
            'ADD_BOARD_TO_PROJECT',
            'MANAGE_PROJECT_MEMBERS',
            'ADD_MEMBER_TO_PROJECT',
            'ADD_PROJECT_MEMBERS',
        ]);

        $this->ability(function ($project) { // project members: OWNER only
            return $project->members()->where('user_id', $this->id)->where('role', ProjectMember::ROLE_OWNER)->exists();
        }, [
            'OPEN_CONTRACT_IN_PROJECT',
            'CLOSE_PROJECT',
            'DELETE_PROJECT',
        ]);

        // ---------------------------------------------------------------------- //

        $this->ability(function ($project_member) { // project members: OWNER only
            return $project_member->project->members()->where('user_id', $this->id)->where('role', ProjectMember::ROLE_OWNER)->exists();
        }, [
            'DELETE_PROJECT_MEMBER_FROM_ALL_OWNER_PROJECTS',
            'CLOSE_CONTRACT_OF_PROJECT_MEMBER',
        ]);

        $this->ability(function ($project_member) { // project members: OWNER and ADMINISTRATOR only
            return $project_member->project->members()->where('user_id', $this->id)->whereIn('role', [
                ProjectMember::ROLE_OWNER,
                ProjectMember::ROLE_ADMINISTRATOR,
            ])->exists();
        }, [
            'DELETE_PROJECT_MEMBER',
            'UPDATE_PROJECT_MEMBER',
        ]);

        // ---------------------------------------------------------------------- //

        $this->ability(function ($project_board) { // list project members: OWNER and ADMINISTRATOR only
            return $project_board->project->members()->where('user_id', $this->id)->whereIn('role', [
                ProjectMember::ROLE_OWNER,
                ProjectMember::ROLE_ADMINISTRATOR,
            ])->exists();
        }, [
            'ADD_MEMBER_TO_PROJECT_BOARD',
            'EDIT_PROJECT_BOARD',
            'ARCHIVE_PROJECT_BOARD',
            'EDIT_PROJECT_BOARD_MEMBERS',
        ]);

        $this->ability(function ($project_board) {
            return $project_board->project->members()->where('user_id', $this->id)->exists();
        }, [
            'ACCESS_PROJECT_BOARD',
            'ADD_LIST_TO_PROJECT_BOARD',
        ]);

        // ---------------------------------------------------------------------- //

        $this->ability(function ($project_list) { // list project members: OWNER and ADMINISTRATOR only
            return $project_list->project->members()->where('user_id', $this->id)->whereIn('role', [
                ProjectMember::ROLE_OWNER,
                ProjectMember::ROLE_ADMINISTRATOR,
            ])->exists();
        }, [
            // 'EDIT_PROJECT_LIST',
            // 'DELETE_PROJECT_LIST',
        ]);

        $this->ability(function ($project_list) { // list project members: OWNER, ADMINISTRATOR, and MANAGER only
            return $project_list->project->members()->where('user_id', $this->id)->whereIn('role', [
                ProjectMember::ROLE_OWNER,
                ProjectMember::ROLE_ADMINISTRATOR,
                ProjectMember::ROLE_MANAGER,
            ])->exists();
        }, [
            // 'SORT_PROJECT_LIST_TASKS',
        ]);

        $this->ability(function ($project_list) { // list project members: ALL
            return $project_list->project->members()->where('user_id', $this->id)->exists();
        }, [
            'ADD_TASK_TO_PROJECT_LIST',
            'EDIT_PROJECT_LIST',
            'ARCHIVE_PROJECT_LIST',
            'RESTORE_PROJECT_LIST',
        ]);

        // ---------------------------------------------------------------------- //

        $this->ability(function ($project_task) { // task project members: ALL
            return $project_task->project->members()->where('user_id', $this->id)->whereIn('role', [
                ProjectMember::ROLE_OWNER,
                ProjectMember::ROLE_ADMINISTRATOR,
                ProjectMember::ROLE_MANAGER,
                ProjectMember::ROLE_CONTRACTOR,
            ])->exists();
        }, [
            'EDIT_PROJECT_TASK',
            'EDIT_PROJECT_TASK_MEMBERS',
            'ARCHIVE_PROJECT_TASK',
            'RESTORE_PROJECT_TASK',
        ]);

        $this->ability(function ($project_task) { // task project members: OWNER, ADMINISTRATOR, MANAGER only
            return $project_task->project->members()->where('user_id', $this->id)->whereIn('role', [
                ProjectMember::ROLE_OWNER,
                ProjectMember::ROLE_ADMINISTRATOR,
                ProjectMember::ROLE_MANAGER,
            ])->exists();
        }, [
            //
        ]);

        // ---------------------------------------------------------------------- //

        $this->ability(function ($project_task) { // project task members only
            $project_member_query = $project_task->board->members();
            $project_member_query->where('project_board_members.project_id', $project_task->project_id);
            $project_member_query->where('project_board_members.user_id', $this->id);
            // $project_member_query->where('project_board_members.is_time_trackable', 1);
            
            return $project_member_query->exists();
        }, [
            'TRACK_PROJECT_TASK',
            'ACCESS_PROJECT_TASK',
        ]);

        // ---------------------------------------------------------------------- //

        $this->ability(function ($contact) { // contact follower user only
            return $contact->follower_user_id == $this->id;
        }, [
            'EDIT_CONTACT',
            'ADD_CONTACT_TO_CONTACT_LIST',
            'ADD_CONTACT_TO_PROJECT_MEMBERS',
            'DELETE_CONTACT',
        ]);

        // ---------------------------------------------------------------------- //

        $this->ability(function ($contract) { // contract EMPLOYER USER OR EMPLOYEE USER only
            return $this->id == $contract->employer_user_id || $this->id == $contract->employee_user_id;
        }, [
            'ACCESS_CONTRACT',
            'CLOSE_CONTRACT',
        ]);

        $this->ability(function ($contract) { // contract EMPLOYER user only
            return $this->id == $contract->employer_user_id;
        }, [
            'EDIT_CONTRACT',
        ]);

        // ---------------------------------------------------------------------- //

        $this->ability(function ($milestone) {
            return $this->id == $milestone->contract->employer_user->id;
        }, [
            'EDIT_MILESTONE',
            'ACTIVATE_MILESTONE',
            'RELEASE_MILESTONE',
        ]);

        // ---------------------------------------------------------------------- //

        $this->ability(function ($contact_list) {
            return $contact_list->user_id == $this->id;
        }, [
            'EDIT_CONTACT_LIST',
            'DELETE_CONTACT_LIST',
        ]);

        // ---------------------------------------------------------------------- //

        $this->ability(function ($chat) { // chat member only
            return $chat->members()->where('user_id', $this->id)->exists();
        }, [
            'ACCESS_CHAT',
        ]);

        // ---------------------------------------------------------------------- //

        $this->ability(function ($credit_card) {
            return $credit_card->user_id == $this->id;
        }, [
            'MANAGE_CREDIT_CARD',
        ]);

        // ---------------------------------------------------------------------- //

        $this->ability(function ($payout_method) {
            return $payout_method->user_id == $this->id;
        }, [
            'MANAGE_PAYOUT_METHOD',
        ]);

        // ---------------------------------------------------------------------- //

        $this->ability(function ($payout) {
            if ($this->administrator) {
                return true;
            }

            return false;
        }, [
            'CHANGE_PAYOUT_STATE',
        ]);
	}
}