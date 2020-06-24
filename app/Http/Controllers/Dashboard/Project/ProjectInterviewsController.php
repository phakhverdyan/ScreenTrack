<?php

namespace App\Http\Controllers\Dashboard\Project;

use App\Models\Project\ProjectInterview;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Project\Project;

class ProjectInterviewsController extends Controller
{
    public function index($project_id)
    {
        $project = Project::where('id', $project_id)->firstOrFail();

        $project_id = $project->id;
        $interviews = $project->interviews;

        return view('dashboard.projects.interviews.index', compact('interviews','project_id'));
    }

    public function edit($project_id, $interview_id)
    {
        $project = Project::where('id', $project_id)->firstOrFail();

        $project_id = $project->id;

        $interview = ProjectInterview::where('id', $interview_id)->firstOrFail();

        return view('dashboard.projects.interviews.edit',compact('project_id','interview'));
    }

    public function manage_questions($project_id, $interview_id)
    {
        $project = Project::where('id', $project_id)->firstOrFail();

        $project_id = $project->id;

        $interview = ProjectInterview::where('id', $interview_id)->firstOrFail();

        return view('dashboard.projects.interviews.manage_questions',compact('project_id','interview'));
    }
}
