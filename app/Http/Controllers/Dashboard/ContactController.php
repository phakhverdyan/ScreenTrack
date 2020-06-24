<?php

namespace App\Http\Controllers\Dashboard;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Project\ProjectMember;

class ContactController extends Controller
{
    public function contacts() {
    	$user = auth()->user();

        $user_projects = $user->projects()->whereIn('project_members.role', [
        	ProjectMember::ROLE_OWNER,
        	ProjectMember::ROLE_ADMINISTRATOR,
        ])->get();

        $user_contact_lists = $user->contact_lists()
            ->with(['contacts','contacts.following_user'])
            ->orderBy('id', 'desc')->get();

        $user_contacts = $user->contacts()->with([
        	'lists',
            'following_user',

        	'following_user.projects' => function ($query) use ($user) {
                $query->join('project_members as follower_project_members', function ($join) {
                    $join->on('follower_project_members.project_id', '=', 'projects.id');
                });

                $query->where('follower_project_members.user_id', $user->id);

                $query->whereIn('follower_project_members.role', [
                    ProjectMember::ROLE_OWNER,
                    ProjectMember::ROLE_ADMINISTRATOR,
                ]);
            },
        ])->orderBy('id', 'desc')->get();

        return view('dashboard.contacts.contacts', compact([
        	'user_projects',
        	'user_contact_lists',
        	'user_contacts',
        ]));
    }

    public function contacts_lists() {
        $user = auth()->user();

        $user_projects = $user->projects()->whereIn('project_members.role', [
            ProjectMember::ROLE_OWNER,
            ProjectMember::ROLE_ADMINISTRATOR,
        ])->get();

        $user_contact_lists = $user->contact_lists()
            ->with(['contacts','contacts.following_user'])
            ->orderBy('id', 'desc')->get();

        return view('dashboard.contacts.contacts_lists', compact([
            'user_projects',
            'user_contact_lists',
        ]));
    }
}
