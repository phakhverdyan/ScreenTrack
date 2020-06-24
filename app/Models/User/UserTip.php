<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\User\UserTip
 *
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserTip newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserTip newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserTip query()
 * @mixin \Eloquent
 */
class UserTip extends Model
{
    const KEY_INTERVIEW_SAVED = 'interview_saved';
    const KEY_ZERO_COMMISSION = 'zero_commission';
    const KEY_DOWNLOAD_DESKTOP_APP = 'download_desktop_app';

    protected $fillable = [
        'user_id',
        'key',
    ];

    static public function create_after_interview_sign_up_tips(User $user) {
        $tips_list_after_interview_sign_up = [
            self::KEY_INTERVIEW_SAVED,
            self::KEY_ZERO_COMMISSION,
            self::KEY_DOWNLOAD_DESKTOP_APP,
        ];

        foreach ($tips_list_after_interview_sign_up as $tip_key) {
            self::create([
                'user_id' => $user->id,
                'key' => $tip_key,
            ]);
        }
    }
}
