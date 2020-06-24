<?php

namespace App\Http\Controllers\Api\User;

use App\Models\User\UserFeedback;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserFeedbackController extends Controller
{
    public function create(Request $request)
    {
        validator()->make($request->all(), [
            'user_feedback' => 'required|array',
            'user_feedback.text' => 'required|string',
        ])->validate();

        $data = $request->input('user_feedback');
        $data['user_id'] = auth()->user()->id;

        $feedback = UserFeedback::create($data);

        return response()->resource($feedback);
    }
}
