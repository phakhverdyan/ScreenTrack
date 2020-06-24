<?php

namespace App\Models\Project;

use App\Models\Project\ProjectInterview;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

/**
 * App\Models\Project\ProjectInterviewResult
 *
 * @property int $id
 * @property string|null $token
 * @property int $project_interview_id
 * @property int|null $passed_interview_user_id
 * @property array|null $questions
 * @property array|null $answers
 * @property string $interview_title
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $key
 * @property-read \App\Models\Project\ProjectInterview $interview
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInterviewResult newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInterviewResult newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInterviewResult query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInterviewResult whereAnswers($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInterviewResult whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInterviewResult whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInterviewResult whereInterviewTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInterviewResult wherePassedInterviewUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInterviewResult whereProjectInterviewId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInterviewResult whereQuestions($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInterviewResult whereToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInterviewResult whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ProjectInterviewResult extends Model
{
    protected $fillable = [
        'token',
        'project_interview_id',
        'passed_interview_user_id',
        'questions',
        'answers',
    ];

    protected $casts = [
        'questions' => 'array',
        'answers' => 'array',

    ];

    public function interview()
    {
        return $this->belongsTo(ProjectInterview::class,'project_interview_id');
    }

    public function getKeyAttribute()
    {
        if (!$this->id) {
            return null;
        }

        return $this->id . '.' . $this->token;
    }

    public function generateToken()
    {
        $this->token = Str::random(60);

        return $this;
    }

    public static function init(ProjectInterview $interview) {
        if (count($questions = $interview->questions)) {
            $result = new ProjectInterviewResult();

            $result->project_interview_id = $interview->id;
            $result->generateToken();

            $questions = $questions->map(function ($item) {
                return [
                    'title' => $item['title'],
                    'details' => $item['details']
                ];
            });

           $result->questions = $questions->toArray();
           $result->interview_title = $interview->title;

           $result->save();

           return $result;
        } else {
            return null;
        }
    }
}
