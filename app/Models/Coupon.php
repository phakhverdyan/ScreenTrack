<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Coupon
 *
 * @property int $id
 * @property string $name
 * @property int $percent_discount
 * @property int $amount_discount
 * @property string|null $valid_date_from
 * @property string|null $valid_date_to
 * @property string|null $email
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Coupon newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Coupon newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Coupon query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Coupon whereAmountDiscount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Coupon whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Coupon whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Coupon whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Coupon whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Coupon wherePercentDiscount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Coupon whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Coupon whereValidDateFrom($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Coupon whereValidDateTo($value)
 * @mixin \Eloquent
 */
class Coupon extends Model
{
    protected $fillable = [
        'name',
        'percent_discount',
        'amount_discount',
        'valid_date_from',
        'valid_date_to',
        'email',
    ];
}
