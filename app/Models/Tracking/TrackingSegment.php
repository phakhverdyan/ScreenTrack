<?php

namespace App\Models\Tracking;

use Illuminate\Database\Eloquent\Model;
use App\Models\Tracking\TrackingScreenshot;
use App\Models\Project\Project;
use App\Models\User\User;

/**
 * App\Models\Tracking\TrackingSegment
 *
 * @property int $id
 * @property int $session_id
 * @property int $day_id
 * @property int $count_of_keyboard_clicks
 * @property int $count_of_mouse_clicks
 * @property mixed|null $created_at
 * @property-read \App\Models\Project\Project $project
 * @property-read \App\Models\Tracking\TrackingScreenshot $screenshot
 * @property-read \App\Models\User\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingSegment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingSegment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingSegment query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingSegment whereCountOfKeyboardClicks($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingSegment whereCountOfMouseClicks($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingSegment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingSegment whereDayId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingSegment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingSegment whereSessionId($value)
 * @mixin \Eloquent
 */
class TrackingSegment extends Model
{
    const STATE_PAID = 'PAID';

    public $timestamps = false;

    public $fillable = [
    	'count_of_keyboard_clicks',
    	'count_of_mouse_clicks',
    ];

    public $casts = [
        'created_at' => 'datetime:' . \DateTime::ATOM,
        'is_last' => 'boolean',
        'count_of_mouse_clicks' => 'integer',
        'count_of_keyboard_clicks' => 'integer',
        'earned_amount' => 'float',
    ];

    public $appends = [
    	//
    ];

    public function screenshot()
    {
    	return $this->belongsTo(TrackingScreenshot::class);
    }

    public function project() // is indirect relation
    {
        return $this->belongsTo(Project::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
