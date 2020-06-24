<?php

namespace App\Models\Project;

use Illuminate\Database\Eloquent\Model;
use App\Models\User\User;
use App\Models\Project\ProjectMemberRole;
use App\Models\Contract;

/**
 * App\Models\Project\ProjectMember
 *
 * @property int $id
 * @property int $project_id
 * @property int $user_id
 * @property string $role
 * @property bool $is_time_trackable
 * @property string|null $last_viewed_at
 * @property string|null $last_tracked_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Contract $contract
 * @property-read \App\Models\Project\Project $project
 * @property-read \App\Models\User\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectMember newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectMember newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectMember query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectMember whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectMember whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectMember whereIsTimeTrackable($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectMember whereLastTrackedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectMember whereLastViewedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectMember whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectMember whereRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectMember whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectMember whereUserId($value)
 * @mixin \Eloquent
 */
class ProjectMember extends Model
{
	const ROLE_OWNER = 'OWNER';
	const ROLE_ADMINISTRATOR = 'ADMINISTRATOR';
	const ROLE_MANAGER = 'MANAGER';
	const ROLE_CONTRACTOR = 'CONTRACTOR';

	public static $roles = [
	    self::ROLE_OWNER,
        self::ROLE_ADMINISTRATOR,
        self::ROLE_MANAGER,
        self::ROLE_CONTRACTOR,
    ];
    
    public $attributes = [
    	'role' => self::ROLE_CONTRACTOR,
        'is_time_trackable' => false,
    ];

    public $casts = [
        'is_time_trackable' => 'boolean',
    ];
    
    public $fillable = [
        'role',
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function project()
    {
        return $this->belongsTo(Project::class);
    }
    
    public function contract()
    {
        return $this->belongsTo(Contract::class);
    }
}
