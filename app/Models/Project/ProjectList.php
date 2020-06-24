<?php

namespace App\Models\Project;

use Illuminate\Database\Eloquent\Model;
use App\Models\Project\Project;
use App\Models\Project\ProjectTask;

/**
 * App\Models\Project\ProjectList
 *
 * @property int $id
 * @property int $project_id
 * @property int $board_id
 * @property string $name
 * @property float $position
 * @property string|null $archived_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Project\Project $project
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Project\ProjectTask[] $tasks
 * @property-read int|null $tasks_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectList newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectList newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectList query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectList whereArchivedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectList whereBoardId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectList whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectList whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectList whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectList wherePosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectList whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectList whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ProjectList extends Model
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

    public function tasks()
    {
    	return $this->hasMany(ProjectTask::class, 'list_id', 'id');
    }

    // ---------------------------------------------------------------------- //

    public static function boot() {
        parent::boot();

   //      static::deleting(function($project_list) {
			// $project_list->tasks()->get()->each(function ($project_task) {
			// 	$project_task->delete();
			// });
   //      });
    }
}
