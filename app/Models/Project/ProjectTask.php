<?php

namespace App\Models\Project;

use Illuminate\Database\Eloquent\Model;
use App\Models\Project\Project;
use App\Models\Project\ProjectList;
use App\Models\Project\ProjectBoard;
use App\Models\Project\ProjectTaskMember;
use App\Models\Project\ProjectTaskAttachment;

/**
 * App\Models\Project\ProjectTask
 *
 * @property int $id
 * @property int $project_id
 * @property int $board_id
 * @property int $list_id
 * @property string $title
 * @property string $description
 * @property float $position
 * @property string|null $archived_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Project\ProjectTaskAttachment[] $attachments
 * @property-read int|null $attachments_count
 * @property-read \App\Models\Project\ProjectBoard $board
 * @property-read \App\Models\Project\ProjectList $list
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Project\ProjectTaskMember[] $members
 * @property-read int|null $members_count
 * @property-read \App\Models\Project\Project $project
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTask newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTask newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTask query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTask whereArchivedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTask whereBoardId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTask whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTask whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTask whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTask whereListId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTask wherePosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTask whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTask whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTask whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ProjectTask extends Model
{
	public $fillable = [
		'title',
        'description',
		'position',
		'list_id',
	];
    
	public $casts = [
		'position' => 'float',
		'list_id' => 'integer',
	];

    // ---------------------------------------------------------------------- //

    public function setTitleAttribute($value)
    {
        $this->attributes['title'] = trim($value);
    }

    public function setDescriptionAttribute($value)
    {
        $this->attributes['description'] = trim($value);
    }

    // ---------------------------------------------------------------------- //

    public function project()
	{
		return $this->belongsTo(Project::class);
	}

    public function board()
    {
        return $this->belongsTo(ProjectBoard::class);
    }

    public function list()
    {
    	return $this->belongsTo(ProjectList::class);
    }

    public function members()
    {
    	return $this->hasMany(ProjectTaskMember::class, 'task_id');
    }

    public function attachments()
    {
    	return $this->hasMany(ProjectTaskAttachment::class, 'task_id');
    }

    // ---------------------------------------------------------------------- //

    public static function boot() {
        parent::boot();

        static::deleting(function($project_task) {
			$project_task->members()->delete();

			$project_task->attachments()->get()->each(function ($project_task_attachment) {
				$project_task_attachment->delete();
			});
        });
    }
}
