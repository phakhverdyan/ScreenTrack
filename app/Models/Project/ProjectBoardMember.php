<?php

namespace App\Models\Project;

use Illuminate\Database\Eloquent\Model;
use App\Models\User\User;
use App\Models\Project\ProjectMember;

/**
 * App\Models\Project\ProjectBoardMember
 *
 * @property int $id
 * @property int $project_id
 * @property int $project_member_id
 * @property int $board_id
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Project\ProjectMember $project_member
 * @property-read \App\Models\User\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectBoardMember newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectBoardMember newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectBoardMember query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectBoardMember whereBoardId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectBoardMember whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectBoardMember whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectBoardMember whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectBoardMember whereProjectMemberId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectBoardMember whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectBoardMember whereUserId($value)
 * @mixin \Eloquent
 */
class ProjectBoardMember extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function project_member()
    {
    	return $this->belongsTo(ProjectMember::class);
    }
}
