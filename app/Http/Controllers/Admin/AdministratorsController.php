<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Administrator;

class AdministratorsController extends Controller
{
    public function index() {
        $administrators = Administrator::all();

        $roles_list = Administrator::$roles_list;

        return view('admin.administrators.index',
            compact('administrators','roles_list'));
    }

    public function create() {
        $roles_list = Administrator::$roles_list;

        return view('admin.administrators.create_or_edit',
            compact('roles_list'));
    }
}
