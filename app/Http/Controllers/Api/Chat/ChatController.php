<?php

namespace App\Http\Controllers\Api\Chat;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Chat\Chat;
use App\Models\Chat\ChatMessage;

class ChatController extends Controller
{
    public function get($chat_id)
    {
    	$chat = Chat::findOrFail($chat_id);
    	auth()->user()->canAccessChatOrForbidden($chat);
    	
    	$chat->load([
    		'members',
    		'last_message',
    	]);

    	return response()->resource($chat);
    }

    public function messages($chat_id)
    {
    	$chat = Chat::findOrFail($chat_id);
    	auth()->user()->canAccessChatOrForbidden($chat);

    	$chat_message_query = $chat->messages();
    	$chat_message_query->with('author_user');
    	$chat_messages = $chat_message_query->get();

    	return response()->resource($chat_messages);
    }

    public function create_message(Request $request, $chat_id)
    {
    	$chat = Chat::findOrFail($chat_id);
    	auth()->user()->canAccessChatOrForbidden($chat);

    	validator()->make($request->all(), [
            'chat_message' => 'required|array',
            'chat_message.label' => 'string|nullable',
            'chat_message.text' => 'required|string',
        ])->validate();

    	$chat_member = $chat->members()->where('user_id', auth()->user()->id)->first();

    	DB::beginTransaction();

    	try {
	    	$chat_message = new ChatMessage;
	    	$chat_message->chat_id = $chat->id;
	    	$chat_message->author_user_id = auth()->user()->id;
	    	$chat_message->text = $request->input('chat_message.text');
	    	$chat_message->save();
            $chat_message->setRelation('chat', $chat);

	    	$chat->last_message_id = $chat_message->id;
	    	$chat->save();

    		$chat_member->last_read_message_id = $chat_message->id;
            $chat_member->last_read_at = now();
    		$chat_member->save();
    	} catch (\Exception $exception) {
    		DB::rollback();
    		throw $exception;
    	}

    	DB::commit();
        
        $chat_message->is_read = true;
        $chat_message->label = $request->input('chat_message.label');
        $chat_message->setRelation('last_read_members', collect());
        $chat->last_read_message_id = $chat_message->id;
        realtime('chat_message_created', $chat_message->toArray());

    	return response()->resource($chat_message);
    }
}
