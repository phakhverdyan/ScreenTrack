<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Administrator;
use App\Models\User\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AdministratorsController extends Controller
{
    public function create(Request $request) {

        validator()->make($request->all(), [
            'administrator.email' => 'required|email|exists:users,email',
            'administrator.role' => [
                'required','string',  Rule::in(array_keys(Administrator::$roles_list)),
            ]
        ])->validate();

        $user = User::where('email', $request->input('administrator.email'))->firstOrFail();

        if (! empty($user->administrator)) {
            return response()->resource($user->administrator);
        }

        $administrator = Administrator::create([
            'user_id' => $user->id,
            'role' => $request->input('administrator.role'),
        ]);

        return response()->resource($administrator);
    }

    public function update(Request $request, $administrator_id) {

        validator()->make($request->all(), [
            'administrator.email' => 'email|exists:users,email',
            'administrator.role' => [
                'string',  Rule::in(array_keys(Administrator::$roles_list)),
            ]
        ])->validate();

        $administrator = Administrator::findOrFail($administrator_id);

        $administrator->fill($request->input('administrator'));

        $administrator->save();

        return response()->resource($administrator);
    }

    public function delete($administrator_id) {
        $administrator = Administrator::findOrFail($administrator_id);

        $administrator->delete();

        return response()->resource();
    }

}
