<?php

namespace App\Models\Auth;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

/**
 * App\Models\Auth\EmailVerification
 *
 * @property int $id
 * @property string $email
 * @property string $token
 * @property string $code
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Auth\EmailVerification newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Auth\EmailVerification newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Auth\EmailVerification query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Auth\EmailVerification whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Auth\EmailVerification whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Auth\EmailVerification whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Auth\EmailVerification whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Auth\EmailVerification whereToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Auth\EmailVerification whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class EmailVerification extends Model
{
    protected $fillable = [
        'email',
    ];

    public function generateCode()
    {
        do {
            $this->code = sprintf('%05d', rand(0, 99999));
        } while (EmailVerification::where([
            'email' => $this->email,
            'code' => $this->code,
        ])->first());

        return $this;
    }

    public function generateToken()
    {
        do {
            $this->token = Str::random(60);
        } while (EmailVerification::where('token', $this->token)->first());
        
        return $this;
    }
}
