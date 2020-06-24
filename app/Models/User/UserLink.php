<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\User\UserLink
 *
 * @property int $id
 * @property int $user_id
 * @property string $type_key
 * @property string $url
 * @property int $index
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserLink newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserLink newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserLink query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserLink whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserLink whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserLink whereIndex($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserLink whereTypeKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserLink whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserLink whereUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserLink whereUserId($value)
 * @mixin \Eloquent
 */
class UserLink extends Model
{
	//
}
