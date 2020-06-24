<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\User\UserPayoutMethod
 *
 * @property int $id
 * @property int $user_id
 * @property string $type
 * @property string $identifier
 * @property int $is_default
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserPayoutMethod newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserPayoutMethod newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserPayoutMethod query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserPayoutMethod whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserPayoutMethod whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserPayoutMethod whereIdentifier($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserPayoutMethod whereIsDefault($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserPayoutMethod whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserPayoutMethod whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserPayoutMethod whereUserId($value)
 * @mixin \Eloquent
 */
class UserPayoutMethod extends Model
{
    const TYPE_PAYONEER = 'PAYONEER';
    const TYPE_PAYPAL = 'PAYPAL';

    public static $types = [
        self::TYPE_PAYONEER,
        self::TYPE_PAYPAL,
    ];

    protected $fillable = [
        'user_id',
        'type',
        'identifier',
        'is_default',
    ];
}
