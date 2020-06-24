<?php

namespace App\Models\Project;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Project\ProjectInterviewQuestion
 *
 * @property int $id
 * @property int $project_interview_id
 * @property int $sort_position
 * @property string $title
 * @property string|null $details
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Project\ProjectInterview $interview
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInterviewQuestion newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInterviewQuestion newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInterviewQuestion query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInterviewQuestion whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInterviewQuestion whereDetails($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInterviewQuestion whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInterviewQuestion whereProjectInterviewId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInterviewQuestion whereSortPosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInterviewQuestion whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInterviewQuestion whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ProjectInterviewQuestion extends Model
{
    protected $fillable = [
        'project_interview_id',
        'sort_position',
        'title',
        'details',
    ];

    public function interview()
    {
        return $this->belongsTo(ProjectInterview::class,'project_interview_id');
    }
}
