<?php

namespace App\Http\Controllers;


use App\Models\User\UserSetup;

class SetupController extends Controller
{
    public function create_contact_lists() {
        return view('setup.create_contact_lists');
    }

    public function create_projects() {
        return view('setup.create_projects');
    }

    public function add_contacts() {
        $user = auth()->user();
        $contact_lists = $user->contact_lists()->get();
        $user_projects = $user->projects()->get();

        return view('setup.add_contacts', [
            'contact_lists' => $contact_lists,
            'user_projects' => $user_projects,
        ]);
    }
}
