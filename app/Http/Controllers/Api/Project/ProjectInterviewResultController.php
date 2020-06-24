<?php

namespace App\Http\Controllers\Api\Project;

use App\Events\InterviewPassedEvent;
use App\Models\Project\ProjectInterview;
use App\Models\Project\ProjectInterviewResult;
use App\Models\User\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProjectInterviewResultController extends Controller
{
    public function answers(Request $request, $interview_hash) {
        validator()->make($request->all(), [
            'interview' => 'required|array',
            'interview.result_key' => 'required|string',
            'interview.answers' => 'required|array',
            'interview.answers.*' => 'required|string',
        ])->validate();

        $result_key = $request->input('interview.result_key');

        list($result_id, $result_token) = array_merge(explode('.', $result_key), [null]);

        $interview = ProjectInterview::where('hash', $interview_hash)->firstOrFail();

        $interview_result = ProjectInterviewResult::where('token', $result_token)->firstOrFail();

        $answers = $request->input('interview.answers');

        if (count($interview->questions) !== count($answers)) {
            abort(403);
        }

        $interview_result->answers = $answers;

        $redirect_to_dashboard = false;

        if (auth()->check()) {
            $interview_result->passed_interview_user_id = auth()->user()->id;
            $redirect_to_dashboard = true;
            event(new InterviewPassedEvent(auth()->user(), $interview, $interview_result));
        }

        $interview_result->save();

        if ($redirect_to_dashboard) {
            return response()->resource(['redirect_to_dashboard' => true]);
        }

        return response()->resource(['interview_result_key' => $interview_result->key]);
    }

    public function link_with_user(Request $request) {
        validator()->make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'interview_results_keys' => '',
        ])->validate();

        $user_id = $request->input('user_id');

        $results_tokens = [];
        if ($interviews_results_keys = $request->input('interviews_results_keys')) {
            foreach ($interviews_results_keys as $result_key) {
                list($result_id, $result_token) = array_merge(explode('.', $result_key), [null]);

                $results_tokens[] = $result_token;
            }

            ProjectInterviewResult::whereIn('token', $results_tokens)->update(['passed_interview_user_id' => $user_id]);

            $interview_results = ProjectInterviewResult::whereIn('token', $results_tokens)->get();
            $user = User::findOrFail($user_id);

            foreach ($interview_results as $interview_result) {
                event(new InterviewPassedEvent($user, $interview_result->interview, $interview_result));
            }

        }

        return response()->resource();
    }
}
