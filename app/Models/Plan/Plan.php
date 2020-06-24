<?php

namespace App\Models\Plan;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Plan\Plan
 *
 * @property int $id
 * @property string $key
 * @property string $account_type
 * @property string $category
 * @property string $name
 * @property float $price
 * @property string|null $inheriting_plan_key
 * @property array|null $settings
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Plan\Plan newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Plan\Plan newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Plan\Plan query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Plan\Plan whereAccountType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Plan\Plan whereCategory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Plan\Plan whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Plan\Plan whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Plan\Plan whereInheritingPlanKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Plan\Plan whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Plan\Plan whereKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Plan\Plan whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Plan\Plan wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Plan\Plan whereSettings($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Plan\Plan whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Plan extends Model
{
    public $fillable = [
		'key',
    	'account_type',
		'name',
		'price',
		'inheriting_plan_key',
		'settings',
        'is_active',
    ];

    public $casts = [
    	'settings' => 'array',
        'is_active' => 'boolean',
    ];

    public static function getActiveFree()
    {
        static $free_plans = null;

        if (!$free_plans) {
            $free_plan_query = Plan::query();
            $free_plan_query->where('category', 'free');
            $free_plan_query->where('is_active', true);

            $free_plans = $free_plan_query->get()->mapWithKeys(function ($plan) {
                return [$plan['account_type'] => $plan];
            });
        }

        return $free_plans;
    }
}