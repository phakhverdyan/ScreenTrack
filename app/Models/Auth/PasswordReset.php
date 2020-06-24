<?php

namespace App\Models\Auth;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

/**
 * App\Models\Auth\PasswordReset
 *
 * @property int $id
 * @property int $user_id
 * @property string $token
 * @property int $is_used
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Auth\PasswordReset newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Auth\PasswordReset newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Auth\PasswordReset query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Auth\PasswordReset whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Auth\PasswordReset whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Auth\PasswordReset whereIsUsed($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Auth\PasswordReset whereToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Auth\PasswordReset whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Auth\PasswordReset whereUserId($value)
 * @mixin \Eloquent
 */
class PasswordReset extends Model
{
    protected $fillable = [
        'email',
    ];

    public function generateToken()
    {
        do {
            $this->token = Str::random(60);
        } while (PasswordReset::where('token', $this->token)->first());

        return $this;
    }

}
