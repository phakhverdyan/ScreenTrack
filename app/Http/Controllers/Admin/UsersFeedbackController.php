<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User\UserFeedback;

class UsersFeedbackController extends Controller
{
    public function index() {
        $feedback_list = UserFeedback::paginate(50);

        return view('admin.feedback.index', compact('feedback_list'));
    }

    public function show($feedback_id) {
        $feedback = UserFeedback::findOrFail($feedback_id);

        return view('admin.feedback.show', compact('feedback'));
    }
}
