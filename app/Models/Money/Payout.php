<?php

namespace App\Models\Money;

use Illuminate\Database\Eloquent\Model;
use App\Models\User\User;

/**
 * App\Models\Money\Payout
 *
 * @property int $id
 * @property int $user_id
 * @property string|null $type
 * @property string $identifier
 * @property float $original_amount
 * @property float|null $payment_system_fee
 * @property float|null $final_amount
 * @property string $state
 * @property string|null $item_id
 * @property array|null $data
 * @property array|null $error
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Money\Payout newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Money\Payout newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Money\Payout query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Money\Payout whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Money\Payout whereData($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Money\Payout whereError($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Money\Payout whereFinalAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Money\Payout whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Money\Payout whereIdentifier($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Money\Payout whereItemId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Money\Payout whereOriginalAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Money\Payout wherePaymentSystemFee($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Money\Payout whereState($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Money\Payout whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Money\Payout whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Money\Payout whereUserId($value)
 * @mixin \Eloquent
 */
class Payout extends Model
{
	const TYPE_PAYOUNEER = 'PAYOUNEER';
	const TYPE_PAYPAL = 'PAYPAL';

    public static $types = [
        self::TYPE_PAYOUNEER,
        self::TYPE_PAYPAL,
    ];

	const STATE_PENDING = 'PENDING';
	const STATE_SUCCESS = 'SUCCESS';
    const STATE_DENIED = 'DENIED';
    const STATE_FAILED = 'FAILED';
    const STATE_RETURNED = 'RETURNED';
    const STATE_BLOCKED = 'BLOCKED';
    const STATE_REFUNDED = 'REFUNDED';
    const STATE_REVERSED = 'REVERSED';
    const STATE_UNCLAIMED = 'UNCLAIMED';

    public static $states = [
        self::STATE_PENDING,
        self::STATE_SUCCESS,
        self::STATE_DENIED,
        self::STATE_FAILED,
        self::STATE_RETURNED,
        self::STATE_BLOCKED,
        self::STATE_REFUNDED,
        self::STATE_REVERSED,
        self::STATE_UNCLAIMED,
    ];

	public $attributes = [
		'state' => self::STATE_PENDING,
	];

    public $casts = [
    	'original_amount' => 'float',
    	'payment_system_fee' => 'float',
    	'final_amount' => 'float',
    	'data' => 'array',
    	'error' => 'array',
    ];

    public $fillable = [
    	'original_amount',
    ];

    public function calculateFinalAmount()
    {
    	$this->final_amount = $this->original_amount - $this->payment_system_fee;

    	return $this;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
