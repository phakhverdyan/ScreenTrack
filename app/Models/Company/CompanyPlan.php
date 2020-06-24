<?php

namespace App\Models\Company;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Company\CompanyPlan
 *
 * @property int $id
 * @property int $company_id
 * @property string $plan_key
 * @property array|null $plan_addon_keys
 * @property float $price
 * @property int|null $live_screen_streaming_minutes
 * @property int|null $manager_seats_per_project
 * @property int|null $screenshots_per_hour
 * @property int|null $first_payment_id
 * @property int|null $last_payment_id
 * @property string|null $expires_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Plan\Plan $plan
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Company\CompanyPlan newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Company\CompanyPlan newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Company\CompanyPlan query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Company\CompanyPlan whereCompanyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Company\CompanyPlan whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Company\CompanyPlan whereExpiresAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Company\CompanyPlan whereFirstPaymentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Company\CompanyPlan whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Company\CompanyPlan whereLastPaymentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Company\CompanyPlan whereLiveScreenStreamingMinutes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Company\CompanyPlan whereManagerSeatsPerProject($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Company\CompanyPlan wherePlanAddonKeys($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Company\CompanyPlan wherePlanKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Company\CompanyPlan wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Company\CompanyPlan whereScreenshotsPerHour($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Company\CompanyPlan whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class CompanyPlan extends Model
{
    public $casts = [
    	'plan_addon_keys' => 'array',
    ];

    public function plan()
    {
    	return $this->belongsTo('App\Models\Plan\Plan', 'plan_key', 'key');
    }
}
