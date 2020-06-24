<?php

namespace App\Models\Project;

use Illuminate\Database\Eloquent\Model;
use App\Models\User\User;
use App\Models\Project\ProjectTask;

/**
 * App\Models\Project\ProjectTaskMember
 *
 * @property int $id
 * @property int $project_id
 * @property int $project_member_id
 * @property int $board_id
 * @property int $board_member_id
 * @property int $task_id
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Project\ProjectMember $project_member
 * @property-read \App\Models\Project\ProjectTask $task
 * @property-read \App\Models\User\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTaskMember newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTaskMember newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTaskMember query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTaskMember whereBoardId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTaskMember whereBoardMemberId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTaskMember whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTaskMember whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTaskMember whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTaskMember whereProjectMemberId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTaskMember whereTaskId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTaskMember whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTaskMember whereUserId($value)
 * @mixin \Eloquent
 */
class ProjectTaskMember extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function task()
    {
        return $this->belongsTo(ProjectTask::class);
    }
    
    public function project_member()
    {
    	return $this->belongsTo(ProjectMember::class);
    }
}
