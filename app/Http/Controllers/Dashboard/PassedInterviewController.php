<?php

namespace App\Http\Controllers\Dashboard;

use App\Models\Project\ProjectInterview;
use App\Models\Project\ProjectInterviewResult;
use App\Http\Controllers\Controller;

class PassedInterviewController extends Controller
{
    public function index() {
        $user = auth()->user();
        $passed_interviews = ProjectInterviewResult::where('passed_interview_user_id', $user->id)->orderBy('created_at', 'DESC')->get();

        return view('dashboard.passed_interviews.index', compact('passed_interviews'));
    }

    public function show($interview_result_id) {
        $passed_interview = ProjectInterviewResult::findOrFail($interview_result_id);

        $title = $passed_interview->interview_title;
        $questions = $passed_interview->questions;
        $answers = $passed_interview->answers;

        return view('dashboard.passed_interviews.show', compact('title','questions','answers'));
    }
}
