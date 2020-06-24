<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\User\UserSpecializedProfile
 *
 * @property int $id
 * @property int $user_id
 * @property string $title
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSpecializedProfile newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSpecializedProfile newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSpecializedProfile query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSpecializedProfile whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSpecializedProfile whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSpecializedProfile whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSpecializedProfile whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSpecializedProfile whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSpecializedProfile whereUserId($value)
 * @mixin \Eloquent
 */
class UserSpecializedProfile extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'description',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
