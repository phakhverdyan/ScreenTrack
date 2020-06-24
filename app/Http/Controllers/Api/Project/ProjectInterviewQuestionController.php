<?php

namespace App\Http\Controllers\Api\Project;

use App\Models\Project\Project;
use App\Models\Project\ProjectInterview;
use App\Models\Project\ProjectInterviewQuestion;
use App\Models\Project\ProjectMember;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProjectInterviewQuestionController extends Controller
{
    public function create(Request $request)
    {
        $user = auth()->user();

        validator()->make($request->all(), [
            'interview_question' => 'required|array',
            'interview_question.project_interview_id' => 'required|numeric|exists:project_interviews,id',
            'interview_question.title' => 'required|string',
            'interview_question.details' => 'nullable|string',
        ])->validate();

        $interview = ProjectInterview::findOrFail($request->input('interview_question.project_interview_id'));

        $user->canManageInterviewsForProjectOrForbidden($interview->project);

        $question = ProjectInterviewQuestion::create($request->input('interview_question'));

        return response()->resource($question);
    }

    public function update(Request $request, $question_id)
    {
        $user = auth()->user();

        validator()->make($request->all(), [
            'interview_question' => 'required|array',
            'interview_question.title' => 'required|string',
            'interview_question.details' => 'nullable|string',
        ])->validate();

        $question = ProjectInterviewQuestion::findOrFail($question_id);

        $user->canManageInterviewsForProjectOrForbidden($question->interview->project);

        $question->fill($request->input('interview_question'));

        $question->save();

        return response()->resource($question);
    }

    public function delete($question_id)
    {
        $user = auth()->user();

        $question = ProjectInterviewQuestion::findOrFail($question_id);

        $user->canManageInterviewsForProjectOrForbidden($question->interview->project);

        $question->delete();

        return response()->resource();
    }

    public function update_positions(Request $request, $interview_id)
    {
        $user = auth()->user();

        validator()->make($request->all(), [
            'interview_questions' => 'required|array',
            'interview_questions.positions' => 'required|array',
            'interview_questions.positions.*' => 'required|integer',
        ])->validate();

        $interview = ProjectInterview::where('id',$interview_id)->with('questions')->firstOrFail();

        $user->canManageInterviewsForProjectOrForbidden($interview->project);

        $questions_ids_with_new_positions = array_map('intval', $request->input('interview_questions.positions'));;

        $current_questions_ids = $interview->questions->pluck('id')->toArray();

        if (! arrays_have_same_values($questions_ids_with_new_positions, $current_questions_ids)) {
            return abort(403);
        }

        //TODO: More fast mass update: https://packagist.org/packages/mavinoo/laravel-batch
        foreach ($questions_ids_with_new_positions as $position => $id) {
            $question_for_update = $interview->questions->where('id', $id)->first();
            $question_for_update->sort_position = $position;
            $question_for_update->save();
        }

        return response()->resource($interview->questions);
    }

}
