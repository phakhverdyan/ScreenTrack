<?php

namespace App\Models\Referral;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Referral\ReferralEarning
 *
 * @property int $id
 * @property int $referral_connection_id
 * @property float $amount
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Referral\ReferralEarning newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Referral\ReferralEarning newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Referral\ReferralEarning query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Referral\ReferralEarning whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Referral\ReferralEarning whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Referral\ReferralEarning whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Referral\ReferralEarning whereReferralConnectionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Referral\ReferralEarning whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ReferralEarning extends Model
{
    //
}
