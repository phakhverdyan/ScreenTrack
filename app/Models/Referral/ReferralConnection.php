<?php

namespace App\Models\Referral;

use Illuminate\Database\Eloquent\Model;
use App\Models\User\User;

/**
 * App\Models\Referral\ReferralConnection
 *
 * @property int $id
 * @property int $invited_user_id
 * @property string|null $invited_user_type
 * @property int $referrer_user_id
 * @property string $type
 * @property int $tier
 * @property float $earned_amount
 * @property float|null $maximum_amount
 * @property float $progress
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Referral\ReferralEarning[] $earnings
 * @property-read int|null $earnings_count
 * @property-read \App\Models\User\User $invited_user
 * @property-read \App\Models\User\User $referrer_user
 * @property-read \App\Models\Referral\ReferralConnection $tier1
 * @property-read \App\Models\Referral\ReferralConnection $tier2
 * @property-read \App\Models\Referral\ReferralConnection $tier3
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Referral\ReferralConnection newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Referral\ReferralConnection newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Referral\ReferralConnection query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Referral\ReferralConnection whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Referral\ReferralConnection whereEarnedAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Referral\ReferralConnection whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Referral\ReferralConnection whereInvitedUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Referral\ReferralConnection whereInvitedUserType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Referral\ReferralConnection whereMaximumAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Referral\ReferralConnection whereProgress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Referral\ReferralConnection whereReferrerUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Referral\ReferralConnection whereTier($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Referral\ReferralConnection whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Referral\ReferralConnection whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ReferralConnection extends Model
{
    const TYPE_DIRECT = 'DIRECT';
    const TYPE_INDIRECT = 'INDIRECT';

    const TIER_1 = 1;
    const TIER_2 = 2;
    const TIER_3 = 3;

    const INVITED_USER_TYPE_EMPLOYER = 'EMPLOYER';
    const INVITED_USER_TYPE_FREELANCER = 'FREELANCER';
    
    public $attributes = [
        'invited_user_type' => null,
        'earned_amount' => 0.0,
        'maximum_amount' => null,
        'progress' => 0.0,
    ];

    public function recalculateEarnedAmount()
    {
        $this->earned_amount = $this->earnings()->sum('amount');
        $this->progress = min(1.0, $this->earned_amount / $this->maximum_amount);

		return $this;
    }

    public function earnings()
    {
        return $this->hasMany(ReferralEarning::class);
    }

    public function invited_user()
    {
    	return $this->belongsTo(User::class);
    }

    public function referrer_user()
    {
    	return $this->belongsTo(User::class);
    }

    public function tier1()
    {
        return $this->hasOne(ReferralConnection::class, 'invited_user_id', 'invited_user_id')->where('tier', ReferralConnection::TIER_1);
    }

    public function tier2()
    {
        return $this->hasOne(ReferralConnection::class, 'invited_user_id', 'invited_user_id')->where('tier', ReferralConnection::TIER_2);
    }

    public function tier3()
    {
        return $this->hasOne(ReferralConnection::class, 'invited_user_id', 'invited_user_id')->where('tier', ReferralConnection::TIER_3);
    }
}
