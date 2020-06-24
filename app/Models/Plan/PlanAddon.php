<?php

namespace App\Models\Plan;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Plan\PlanAddon
 *
 * @property int $id
 * @property string $key
 * @property string $account_type
 * @property string $title
 * @property float $price
 * @property string $description
 * @property string $setting_key
 * @property string $setting_value
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Plan\PlanAddon newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Plan\PlanAddon newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Plan\PlanAddon query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Plan\PlanAddon whereAccountType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Plan\PlanAddon whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Plan\PlanAddon whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Plan\PlanAddon whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Plan\PlanAddon whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Plan\PlanAddon whereKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Plan\PlanAddon wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Plan\PlanAddon whereSettingKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Plan\PlanAddon whereSettingValue($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Plan\PlanAddon whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Plan\PlanAddon whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class PlanAddon extends Model
{
    public $fillable = [
    	'key',
    	'account_type',
    	'title',
    	'price',
    	'description',
    	'settings',
        'is_active',
    ];

    public $casts = [
        'is_active' => 'boolean',
    ];
}
