<?php

namespace App\Models\Project;

use Illuminate\Database\Eloquent\Model;
use App\Models\Project\Project;
use App\Models\Project\ProjectList;
use App\Models\Project\ProjectTask;
use App\Models\Project\ProjectBoardMember;

/**
 * App\Models\Project\ProjectBoard
 *
 * @property int $id
 * @property int $project_id
 * @property string $name
 * @property float $position
 * @property string|null $archived_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Project\ProjectList[] $lists
 * @property-read int|null $lists_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Project\ProjectBoardMember[] $members
 * @property-read int|null $members_count
 * @property-read \App\Models\Project\Project $project
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Project\ProjectTask[] $tasks
 * @property-read int|null $tasks_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectBoard newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectBoard newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectBoard query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectBoard whereArchivedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectBoard whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectBoard whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectBoard whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectBoard wherePosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectBoard whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectBoard whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ProjectBoard extends Model
{
	public $fillable = [
		'name',
		'position',
	];

	public $casts = [
		'position' => 'float',
	];

	// ---------------------------------------------------------------------- //

	public function project()
	{
		return $this->belongsTo(Project::class);
	}

    public function lists()
    {
        return $this->hasMany(ProjectList::class, 'board_id');
    }

    public function tasks()
    {
        return $this->hasMany(ProjectTask::class, 'board_id');
    }

    public function members()
    {
    	return $this->hasMany(ProjectBoardMember::class, 'board_id');
    }

    // ---------------------------------------------------------------------- //

    // 
}
