<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\User\UserLinkType
 *
 * @property int $id
 * @property string $key
 * @property string $title
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserLinkType newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserLinkType newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserLinkType query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserLinkType whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserLinkType whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserLinkType whereKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserLinkType whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserLinkType whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class UserLinkType extends Model
{
    protected $fillable = [
        'title'
    ];
}
