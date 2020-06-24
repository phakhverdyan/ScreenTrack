<?php

namespace App\Models\Tracking;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Tracking\TrackingSession
 *
 * @property int $id
 * @property string $label
 * @property int $user_id
 * @property int $project_id
 * @property int $contract_id
 * @property int $task_id
 * @property string|null $app_version
 * @property mixed|null $created_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingSession newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingSession newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingSession query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingSession whereAppVersion($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingSession whereContractId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingSession whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingSession whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingSession whereLabel($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingSession whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingSession whereTaskId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingSession whereUserId($value)
 * @mixin \Eloquent
 */
class TrackingSession extends Model
{
    public $timestamps = false;

    public $casts = [
        'created_at' => 'datetime:' . \DateTime::ATOM,
    ];
}
