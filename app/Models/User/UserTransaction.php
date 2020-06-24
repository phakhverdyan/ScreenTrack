<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\User\UserTransaction
 *
 * @property int $id
 * @property int $user_id
 * @property float $amount
 * @property string|null $description
 * @property string|null $action_type
 * @property int|null $action_id
 * @property float $processing_fee
 * @property string|null $state
 * @property \Illuminate\Support\Carbon|null $frozen_till
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $is_frozen
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserTransaction newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserTransaction newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserTransaction query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserTransaction whereActionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserTransaction whereActionType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserTransaction whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserTransaction whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserTransaction whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserTransaction whereFrozenTill($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserTransaction whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserTransaction whereProcessingFee($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserTransaction whereState($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserTransaction whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserTransaction whereUserId($value)
 * @mixin \Eloquent
 */
class UserTransaction extends Model
{
	const STATE_PENDING = 'PENDING';
	const STATE_SUCCESS = 'SUCCESS';
	const STATE_FAILED = 'FAILED';

	public static $states = [
		self::STATE_PENDING,
		self::STATE_SUCCESS,
		self::STATE_FAILED,
	];

	public $attributes = [
		'state' => self::STATE_PENDING,
		'processing_fee' => 0.0,
		'frozen_till' => null,
	];

    public $casts = [
    	'amount' => 'float',
    	'processing_fee' => 'float',
    	'return_amount' => 'float',
    	'frozen_till' => 'datetime',
    ];

    public $hidden = [
    	'processing_fee',
    	'return_amount',
    ];

    public $appends = [
    	'is_frozen',
    ];

    public function getIsFrozenAttribute()
    {
        if (!$this->frozen_till) {
            return false;
        }
        
    	return $this->frozen_till->getTimestamp() >= time();
    }
}
