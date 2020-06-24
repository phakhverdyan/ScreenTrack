<?php

namespace App\Models\Project;

use App\Models\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

/**
 * App\Models\Project\ProjectInterview
 *
 * @property int $id
 * @property string $hash
 * @property int $project_id
 * @property int $creator_user_id
 * @property string $title
 * @property string|null $description
 * @property float|null $hourly_rate
 * @property string|null $notification_email
 * @property string|null $thank_you_message
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User\User $creator_user
 * @property-read \App\Models\Project\Project $project
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Project\ProjectInterviewQuestion[] $questions
 * @property-read int|null $questions_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInterview newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInterview newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInterview query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInterview whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInterview whereCreatorUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInterview whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInterview whereHash($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInterview whereHourlyRate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInterview whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInterview whereNotificationEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInterview whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInterview whereThankYouMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInterview whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInterview whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ProjectInterview extends Model
{
    protected $fillable = [
        'project_id',
        'creator_user_id',
        'title',
        'description',
        'hourly_rate',
        'notification_email',
        'thank_you_message'
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function questions()
    {
        return $this->hasMany(ProjectInterviewQuestion::class)->orderBy('sort_position','ASC');
    }

    public function creator_user()
    {
        return $this->belongsTo(User::class,'creator_user_id');
    }

    public function generateHash()
    {
        do {
            $this->hash = Str::random(60);
        } while (self::where('hash', $this->hash)->first());

        return $this;
    }

    public function delete() {
        DB::beginTransaction();

        try {
            ProjectInterviewQuestion::where('project_interview_id', $this->id)->delete();

            parent::delete();
        } catch (\Exception $exception) {
            DB::rollback();
            throw $exception;
        }

        DB::commit();
    }
}
