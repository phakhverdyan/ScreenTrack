<?php

namespace App\Models\Chat;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use App\Models\User\User;

/**
 * ChatMessage Model
 *
 * @mixin Builder
 * @property int $id
 * @property int $chat_id
 * @property int $author_user_id
 * @property string|null $text
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User\User $author_user
 * @property-read \App\Models\Chat\Chat $chat
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Chat\ChatMessage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Chat\ChatMessage newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Chat\ChatMessage query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Chat\ChatMessage whereAuthorUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Chat\ChatMessage whereChatId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Chat\ChatMessage whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Chat\ChatMessage whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Chat\ChatMessage whereText($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Chat\ChatMessage whereUpdatedAt($value)
 */
class ChatMessage extends Model
{
	public $hidden = [
		//
	];

    public $fillable = [
    	'text',
    ];

    // ---------------------------------------------------------------------- //

    public function author_user()
    {
    	return $this->belongsTo(User::class);
    }

    public function chat()
    {
        return $this->belongsTo(Chat::class);
    }
}
