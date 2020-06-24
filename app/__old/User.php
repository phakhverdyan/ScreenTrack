<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * App\User
 *
 * @property int $id
 * @property string|null $initial_stage
 * @property string $slug
 * @property string $email
 * @property string|null $skype
 * @property float|null $hourly_rate
 * @property string|null $website_url
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string|null $first_name
 * @property string|null $last_name
 * @property string|null $professional_title
 * @property string|null $professional_description
 * @property string|null $timezone
 * @property int $utc_offset
 * @property string|null $interface_language_code
 * @property string|null $password
 * @property string|null $api_token
 * @property string|null $realtime_token
 * @property float $balance
 * @property int|null $phone_code
 * @property string|null $phone_number
 * @property int $is_online
 * @property string|null $country_code
 * @property string|null $locality_key
 * @property string|null $affiliate_mode
 * @property string|null $stripe_customer_id
 * @property int|null $ad_campaign_id
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereAdCampaignId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereAffiliateMode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereApiToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereBalance($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereCountryCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereHourlyRate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereInitialStage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereInterfaceLanguageCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereIsOnline($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereLocalityKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User wherePhoneCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User wherePhoneNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereProfessionalDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereProfessionalTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereRealtimeToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereSkype($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereStripeCustomerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereTimezone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereUtcOffset($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereWebsiteUrl($value)
 * @mixin \Eloquent
 */
class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
