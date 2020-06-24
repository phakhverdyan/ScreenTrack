<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\Models\Project\Project;
use App\Models\Project\ProjectTask;
use App\Models\Project\ProjectList;
use App\Models\Project\ProjectBoard;
use App\Models\Project\ProjectMember;
use App\Models\Project\ProjectTaskMember;
use App\Models\Project\ProjectBoardMember;

class GlobalFixRelatedToProjectBoards extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // 1. Add General Board to Projects without any Board

        $project_query = Project::select('projects.*');

        $project_query->selectRaw('(' . collect([
            'SELECT COUNT(*)',
            'FROM project_boards',
            'WHERE project_boards.project_id = projects.id',
        ])->join(' ') . ') AS count_of_boards');

        $project_query->having('count_of_boards', '=', 0);

        $project_query->chunk(100, function ($projects) {
            foreach ($projects as $project) {
                $project_board = new ProjectBoard;
                $project_board->project_id = $project->id;
                $project_board->name = 'General';
                $project_board->position = 65535;
                $project_board->save();
            }
        });

        // 2. Add Project Owner & Administrators to each Board if they are not there

        $project_query = Project::query();

        $project_query->chunk(100, function ($projects) {
            foreach ($projects as $project) {
                // 1. Get All Project Owner & Administrator Members

                $project_members = $project->members()->whereIn('role', [
                    ProjectMember::ROLE_OWNER,
                    ProjectMember::ROLE_ADMINISTRATOR,
                ])->get();

                // 2. Get All Project Boards

                $project_boards = $project->boards()->get();

                // 3. Go through all Project Boards and see if member exists there

                foreach ($project_boards as $project_board) {
                    foreach ($project_members as $project_member) {
                        $project_board_member_query = ProjectBoardMember::query();
                        $project_board_member_query->where('board_id', $project_board->id);
                        $project_board_member_query->where('user_id', $project_member->user_id);

                        if ($project_board_member = $project_board_member_query->first()) {
                            continue;
                        }

                        $project_board_member = new ProjectBoardMember;
                        $project_board_member->project_id = $project->id;
                        $project_board_member->project_member_id = $project_member->id;
                        $project_board_member->board_id = $project_board->id;
                        $project_board_member->user_id = $project_member->user_id;
                        $project_board_member->save();
                    }
                }
            }
        });

        // 3. Fix Project Lists

        $project_list_query = ProjectList::query();
        $project_list_query->where('board_id', 0);

        $project_list_query->chunk(100, function ($project_lists) {
            foreach ($project_lists as $project_list) {
                if (!$project_board = ProjectBoard::where('project_id', $project_list->project_id)->first()) {
                    continue;
                }

                $project_list->board_id = $project_board->id;
                $project_list->save();
            }
        });

        // 4. Fix Project Tasks

        $project_task_query = ProjectTask::query();
        $project_task_query->where('board_id', 0);
        $project_task_query->with('list');

        $project_task_query->chunk(100, function ($project_tasks) {
            foreach ($project_tasks as $project_task) {
                $project_task->board_id = $project_task->list->board_id;
                $project_task->save();

                $project_task_member_query = ProjectTaskMember::query();
                $project_task_member_query->where('task_id', $project_task->id);
                $project_task_members = $project_task_member_query->get();

                foreach ($project_task_members as $project_task_member) {
                    $project_member_query = ProjectMember::query();
                    $project_member_query->where('project_id', $project_task->project_id);
                    $project_member_query->where('user_id', $project_task_member->user_id);

                    if (!$project_member = $project_member_query->first()) {
                        $project_member = new ProjectMember;
                        $project_member->project_id = $project_task->project_id;
                        $project_member->user_id = $project_task_member->user_id;
                        $project_member->role = ProjectMember::ROLE_CONTRACTOR;
                        $project_member->is_time_trackable = 0;
                        $project_member->save();
                    }

                    $project_board_member_query = ProjectBoardMember::query();
                    $project_board_member_query->where('board_id', $project_task->board_id);
                    $project_board_member_query->where('user_id', $project_task_member->user_id);

                    if (!$project_board_member = $project_board_member_query->first()) {
                        $project_board_member = new ProjectBoardMember;
                    }

                    $project_board_member->project_id = $project_task->project_id;
                    $project_board_member->project_member_id = $project_member->id;
                    $project_board_member->board_id = $project_task->board_id;
                    $project_board_member->user_id = $project_task_member->id;
                    $project_board_member->save();

                    $project_task_member->project_id = $project_task->project_id;
                    $project_task_member->project_member_id = $project_member->id;
                    $project_task_member->board_id = $project_task->board_id;
                    $project_task_member->board_member_id = $project_board_member->id;
                    $project_task_member->save();
                }
            }
        });

        // throw \Exception('ROLLBACK!');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
