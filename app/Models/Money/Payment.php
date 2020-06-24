<?php

namespace App\Models\Money;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Money\Payment
 *
 * @property int $id
 * @property int $user_id
 * @property float $original_amount
 * @property float $processing_fee
 * @property float $final_amount
 * @property string $objective_type
 * @property int|null $objective_id
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Money\Payment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Money\Payment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Money\Payment query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Money\Payment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Money\Payment whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Money\Payment whereFinalAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Money\Payment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Money\Payment whereObjectiveId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Money\Payment whereObjectiveType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Money\Payment whereOriginalAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Money\Payment whereProcessingFee($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Money\Payment whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Money\Payment whereUserId($value)
 * @mixin \Eloquent
 */
class Payment extends Model
{
    public function calculateAmounts()
	{
		$this->processing_fee = (
			ceil(($this->original_amount / 100.0 * config('fees.processing.percentage')) / 2 * 100) * 2 / 100
			+
			config('fees.processing.fixed')
		) / 2;

		$this->final_amount = $this->original_amount + $this->processing_fee;
		
		return $this;
	}
}
