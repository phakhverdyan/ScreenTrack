<?php

namespace App\Http\Controllers\Api\Chat;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Chat\ChatMessageAttachment;

class ChatMessageAttachmentController extends Controller
{
    public function create(Request $request)
    {
        $validator = validator()->make($request->all(), [
            'chat_message_attachment' => 'required|array',
            'chat_message_attachment.file' => 'required|file|max:10240',
        ])->validate();

        DB::beginTransaction();

        try {
	        $chat_message_attachment = new ChatMessageAttachment;
	        $chat_message_attachment->save();
	        $chat_message_attachment->generateToken();
	        $chat_message_attachment->setFile($request->file('chat_message_attachment.file'));
	        $chat_message_attachment->makeThumbnails();
            $chat_message_attachment->save();
	    } catch (\Exception $exception) {
	    	DB::rollback();
	    	throw $exception;
	    }

	    DB::commit();

        return response()->resource($chat_message_attachment);
    }
}
