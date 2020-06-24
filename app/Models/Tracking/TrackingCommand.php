<?php

namespace App\Models\Tracking;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Tracking\TrackingCommand
 *
 * @property int $id
 * @property int $user_id
 * @property string $request
 * @property string|null $app_version
 * @property string $response
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingCommand newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingCommand newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingCommand query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingCommand whereAppVersion($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingCommand whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingCommand whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingCommand whereRequest($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingCommand whereResponse($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingCommand whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingCommand whereUserId($value)
 * @mixin \Eloquent
 */
class TrackingCommand extends Model
{
    public $fillable = [
    	'request',
    	'app_version',
    	'response',
    ];
}
