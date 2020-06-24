<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

/**
 * App\Models\Tip
 *
 * @property int $id
 * @property string $key
 * @property int $step
 * @property string|null $route
 * @property string $selector
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tip newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tip newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tip query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tip whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tip whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tip whereKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tip whereRoute($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tip whereSelector($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tip whereStep($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tip whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Tip extends Model
{
    const USER_PIVOT_TABLE = 'user__tip';

    public $fillable = [
        'key',
        'route',
        'selector',
        'step',
    ];
    
    public $casts = [
        'is_viewed' => 'boolean',
    ];
}
