<?php

namespace App\Models\User;

use App\Models\User\User;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\User\UserFeedback
 *
 * @property int $id
 * @property int $user_id
 * @property string $text
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserFeedback newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserFeedback newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserFeedback query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserFeedback whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserFeedback whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserFeedback whereText($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserFeedback whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserFeedback whereUserId($value)
 * @mixin \Eloquent
 */
class UserFeedback extends Model
{
    protected $fillable = [
        'user_id',
        'text',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
