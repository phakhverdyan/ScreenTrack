<?php

namespace App\Http\Controllers\Api\Project;

use App\Models\Project\Project;
use App\Models\Project\ProjectInterview;
use App\Models\Project\ProjectInterviewQuestion;
use App\Models\Project\ProjectMember;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class ProjectInterviewController extends Controller
{
    public function create(Request $request)
    {
        $user = auth()->user();

        validator()->make($request->all(), [
            'project_interview' => 'required|array',
            'project_interview.project_id' => 'required|numeric|exists:projects,id',
            'project_interview.title' => 'required|string',
        ])->validate();

        $project_id = $request->input('project_interview.project_id');

        $project = Project::findOrFail($project_id);

        $user->canManageInterviewsForProjectOrForbidden($project);

        $interview = ProjectInterview::create($request->input('project_interview'));
        $interview->generateHash();
        $interview->creator_user_id = $user->id;

        $interview->save();

        return response()->resource($interview);
    }

    public function update(Request $request, $interview_id)
    {
        $user = auth()->user();

        validator()->make($request->all(), [
            'project_interview' => 'required|array',
            'project_interview.title' => 'required|string',
            'project_interview.description' => 'nullable|string',
            'project_interview.hourly_rate' => 'nullable|numeric',
            'project_interview.notification_email' => 'nullable|email',
            'project_interview.thank_you_message' => 'nullable|string',
        ])->validate();

        $interview = ProjectInterview::findOrFail($interview_id);

        $user->canManageInterviewsForProjectOrForbidden($interview->project);

        $interview->fill($request->input('project_interview'));
        $interview->creator_user_id = $user->id;
        $interview->save();

        return response()->resource($interview);
    }

    public function delete($interview_id)
    {
        $user = auth()->user();

        $interview = ProjectInterview::findOrFail($interview_id);

        $user->canManageInterviewsForProjectOrForbidden($interview->project);

        $interview->delete();

        return response()->resource();
    }
}
