<?php

namespace App\Models\Tracking;

use Illuminate\Database\Eloquent\Model;
use App\Models\Project\Project;
use App\Models\User\User;
use App\Models\Tracking\TrackingSegment;

/**
 * App\Models\Tracking\TrackingDay
 *
 * @property int $id
 * @property int $project_id
 * @property int $user_id
 * @property int|null $payment_id
 * @property int $is_expedited
 * @property mixed|null $created_at
 * @property-read \App\Models\Project\Project $project
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Tracking\TrackingSegment[] $segments
 * @property-read int|null $segments_count
 * @property-read \App\Models\User\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingDay newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingDay newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingDay query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingDay whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingDay whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingDay whereIsExpedited($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingDay wherePaymentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingDay whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingDay whereUserId($value)
 * @mixin \Eloquent
 */
class TrackingDay extends Model
{
    public $timestamps = false;

    public $casts = [
        'created_at' => 'datetime:' . \DateTime::ATOM,
    ];

    public function project()
    {
    	return $this->belongsTo(Project::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function segments()
    {
    	return $this->hasMany(TrackingSegment::class, 'day_id');
    }
}
