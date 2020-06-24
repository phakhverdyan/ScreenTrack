<?php

namespace App\Http\Controllers;

use App\Models\Company\Company;
use App\Models\Project\ProjectInterview;
use App\Models\Project\ProjectInterviewResult;
use App\Models\User\User;

class InterviewController extends Controller
{
    public function show_start_interview($interview_hash) {
        $interview = ProjectInterview::with('questions','creator_user')
            ->where('hash', $interview_hash)->firstOrFail();

        $data = $this->get_related_data($interview);
        $data['interview'] = $interview;

        return view('interview.start', $data);
    }

    public function show_interview($interview_hash) {
        $interview = ProjectInterview::with('questions','creator_user')
            ->where('hash', $interview_hash)->firstOrFail();

        $data = $this->get_related_data($interview);
        $data['interview'] = $interview;

        $result = ProjectInterviewResult::init($interview);

        if (! empty($result)) {
            $data['interview_result_key'] = $result->key;
        }

        return view('interview.index', $data);
    }

    public function get_related_data(ProjectInterview $interview) {
        $data = [];

        if (! empty($company = $interview->project->related_company)) {
            $data['company'] = $this->format_company_data($company);
        }

        $data['creator_user'] = $this->format_creator_user_data($interview->creator_user);

        return $data;
    }

    private function format_company_data(Company $related_company) {
        $company['name'] = $related_company->name;
        $company['location'] = $related_company->locality->full_address;
        $company['country_code'] = $related_company->locality->country_code;
        $company['logo'] = $related_company->image->urls->small;

        return $company;
    }

    private function format_creator_user_data(User $user) {
        $creator_user['full_name'] = $user->full_name;
        $creator_user['location'] = $user->locality->full_address;
        $creator_user['country_code'] = $user->locality->country_code;
        $creator_user['photo'] = $user->image->urls->small;

        return $creator_user;
    }
}
