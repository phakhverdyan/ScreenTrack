<?php

namespace App\Models\Chat;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

/**
 * Chat Model
 *
 * @mixin Builder
 * @property int $id
 * @property string|null $title
 * @property int $last_message_id
 * @property string $type
 * @property string|null $owner_type
 * @property int|null $owner_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Chat\ChatMessage $last_message
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Chat\ChatMember[] $members
 * @property-read int|null $members_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Chat\ChatMessage[] $messages
 * @property-read int|null $messages_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Chat\Chat newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Chat\Chat newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Chat\Chat query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Chat\Chat whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Chat\Chat whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Chat\Chat whereLastMessageId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Chat\Chat whereOwnerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Chat\Chat whereOwnerType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Chat\Chat whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Chat\Chat whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Chat\Chat whereUpdatedAt($value)
 */
class Chat extends Model
{
	const TYPE_DIALOG = 'dialog';
	const TYPE_GROUP = 'group';

	public $attributes = [
		'type' => self::TYPE_DIALOG,
	];

	public $hidden = [
		// 'pivot',
	];

    public function members()
    {
    	return $this->hasMany(ChatMember::class);
    }

    public function messages()
    {
    	return $this->hasMany(ChatMessage::class);
    }

    public function last_message()
    {
    	return $this->belongsTo(ChatMessage::class);
    }

    // public function getOppositeMemberAttribute()
    // {
    // 	if ($this->type != 'dialog') {
    // 		return null;
    // 	}

    // 	if (!auth()->check()) {
    // 		return null;
    // 	}
    
    // 	return $this->members->where('user_id', '!=', auth()->user()->id)->first();
    // }

    public static function create(array $data)
    {
    	DB::beginTransaction();

    	try {
	    	$chat = new Chat;
	    	$chat->save();
	    	
	    	$chat_member0 = new ChatMember;
	    	$chat_member0->chat_id = $chat->id;
	    	$chat_member0->user_id = $data['user0']->id;
	    	$chat_member0->save();

	    	$chat_member1 = new ChatMember;
	    	$chat_member1->chat_id = $chat->id;
	    	$chat_member1->user_id = $data['user1']->id;
	    	$chat_member1->save();

	    	$chat_message = new ChatMessage;
	    	$chat_message->chat_id = $chat->id;
	    	$chat_message->author_user_id = $data['user0']->id;
	    	$chat_message->fill($data['message']);
	    	$chat_message->save();

	    	$chat->last_message_id = $chat_message->id;
	    	$chat->save();
	    	$chat->setRelation('last_message', $chat_message);

	    	$chat_member0->last_read_message_id = $chat_message->id;
	    	$chat_member0->save();
	    } catch (\Exception $exception) {
	    	DB::rollback();
	    	throw $exception;
	    }

	    DB::commit();

	    return $chat;
    }
}
