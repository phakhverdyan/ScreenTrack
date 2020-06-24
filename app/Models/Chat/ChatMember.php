<?php

namespace App\Models\Chat;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use App\Models\User\User;

/**
 * ChatMember Model
 *
 * @mixin Builder
 * @property int $id
 * @property int $chat_id
 * @property int $user_id
 * @property int $last_read_message_id
 * @property string|null $last_read_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Chat\Chat $chat
 * @property-read \App\Models\User\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Chat\ChatMember newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Chat\ChatMember newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Chat\ChatMember query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Chat\ChatMember whereChatId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Chat\ChatMember whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Chat\ChatMember whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Chat\ChatMember whereLastReadAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Chat\ChatMember whereLastReadMessageId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Chat\ChatMember whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Chat\ChatMember whereUserId($value)
 */
class ChatMember extends Model
{
    public function chat()
    {
    	return $this->belongsTo(Chat::class);
    }

    public function user()
    {
    	return $this->belongsTo(User::class);
    }
}
