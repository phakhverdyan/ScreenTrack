<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\User\UserSetup
 *
 * @property int $id
 * @property int $user_id
 * @property string $current_stage
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSetup newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSetup newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSetup query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSetup whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSetup whereCurrentStage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSetup whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSetup whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSetup whereUserId($value)
 * @mixin \Eloquent
 */
class UserSetup extends Model
{
    const CURRENT_STAGE_CREATE_CONTACT_LISTS = 'CREATE_CONTACT_LISTS';
    const CURRENT_STAGE_CREATE_PROJECTS = 'CREATE_PROJECTS';
    const CURRENT_STAGE_ADD_CONTACTS = 'ADD_CONTACTS';

    public $attributes = [
        'current_stage' => self::CURRENT_STAGE_CREATE_CONTACT_LISTS,
    ];

    // ---------------------------------------------------------------------- //
    // 
    // - Relations
    // 
    // ---------------------------------------------------------------------- //

    public function user()
    {
        return $this->belongsTo('App\Models\User\User');
    }

    // ---------------------------------------------------------------------- //
    // 
    // - Methods
    // 
    // ---------------------------------------------------------------------- //

    // 
}
