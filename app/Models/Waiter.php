<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Waiter
 *
 * @property int $id
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Waiter newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Waiter newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Waiter query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Waiter whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Waiter whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Waiter whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Waiter whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Waiter extends Model
{
    protected $guarded = ['id'];

    public $fillable = [
    	'email',
    ];
}
