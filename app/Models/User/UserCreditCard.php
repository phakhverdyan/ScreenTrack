<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\User\UserCreditCard
 *
 * @property int $id
 * @property int $user_id
 * @property string|null $stripe_id
 * @property string|null $address_zip
 * @property string|null $brand
 * @property string|null $country_code
 * @property int|null $expiration_month
 * @property int|null $expiration_year
 * @property string|null $funding
 * @property string|null $last4
 * @property int $is_default
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserCreditCard newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserCreditCard newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserCreditCard query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserCreditCard whereAddressZip($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserCreditCard whereBrand($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserCreditCard whereCountryCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserCreditCard whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserCreditCard whereExpirationMonth($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserCreditCard whereExpirationYear($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserCreditCard whereFunding($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserCreditCard whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserCreditCard whereIsDefault($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserCreditCard whereLast4($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserCreditCard whereStripeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserCreditCard whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserCreditCard whereUserId($value)
 * @mixin \Eloquent
 */
class UserCreditCard extends Model
{
    //
}
