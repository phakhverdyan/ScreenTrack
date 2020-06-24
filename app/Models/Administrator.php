<?php

namespace App\Models;

use App\Models\User\User;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Administrator
 *
 * @property int $id
 * @property int $user_id
 * @property string $role
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Administrator newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Administrator newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Administrator query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Administrator whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Administrator whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Administrator whereRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Administrator whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Administrator whereUserId($value)
 * @mixin \Eloquent
 */
class Administrator extends Model
{
    const ROLE_GOD = 'GOD';
    
    protected $fillable = [
        'user_id',
        'role',
    ];
    
    public function user() {
        return $this->belongsTo(User::class);
    }
}
