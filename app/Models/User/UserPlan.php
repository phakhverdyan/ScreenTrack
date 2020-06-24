<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\User\UserPlan
 *
 * @property int $id
 * @property int $user_id
 * @property string $plan_key
 * @property array|null $plan_addon_keys
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Plan\Plan $plan
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserPlan newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserPlan newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserPlan query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserPlan whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserPlan whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserPlan wherePlanAddonKeys($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserPlan wherePlanKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserPlan whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserPlan whereUserId($value)
 * @mixin \Eloquent
 */
class UserPlan extends Model
{
    public $casts = [
    	'plan_addon_keys' => 'array',
    ];

    public function plan()
    {
    	return $this->belongsTo('App\Models\Plan\Plan', 'plan_key', 'key');
    }
}
