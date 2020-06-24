<?php

namespace App\Models\Money;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Money\Deposit
 *
 * @property int $id
 * @property int $user_id
 * @property float $original_amount
 * @property float $stripe_fee
 * @property float $final_amount
 * @property string $stripe_source_id
 * @property string|null $stripe_charge_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Money\Deposit newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Money\Deposit newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Money\Deposit query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Money\Deposit whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Money\Deposit whereFinalAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Money\Deposit whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Money\Deposit whereOriginalAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Money\Deposit whereStripeChargeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Money\Deposit whereStripeFee($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Money\Deposit whereStripeSourceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Money\Deposit whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Money\Deposit whereUserId($value)
 * @mixin \Eloquent
 */
class Deposit extends Model
{
    public function calculateAmounts()
    {
    	$this->stripe_fee = (
			ceil($this->original_amount / 100.0 * config('fees.stripe.percentage') * 100.0) / 100.0
			+
			config('fees.stripe.fixed')
		);

		$this->final_amount = $this->original_amount + $this->stripe_fee;

    	return $this;
    }
}
