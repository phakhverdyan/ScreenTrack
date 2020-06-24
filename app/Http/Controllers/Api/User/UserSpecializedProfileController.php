<?php

namespace App\Http\Controllers\Api\User;

use App\Models\User\User;
use App\Models\User\UserSpecializedProfile;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserSpecializedProfileController extends Controller
{
    public function create(Request $request)
    {
        validator()->make($request->all(), [
            'user_specialized_profile' => 'required|array',
            'user_specialized_profile.user_id' => 'required|exists:users,id',
            'user_specialized_profile.title' => 'required|string',
            'user_specialized_profile.description' => 'nullable|string',
        ])->validate();

        $user_id = $request->input('user_specialized_profile.user_id');
        $user = ($user_id == 'me' ? auth()->user() : User::findOrFail($user_id));

        auth()->user()->canEditUserOrForbidden($user);

        $profile = UserSpecializedProfile::create($request->input('user_specialized_profile'));

        return response()->resource($profile);
    }

    public function update(Request $request, $specialized_profile_id)
    {
        validator()->make($request->all(), [
            'user_specialized_profile' => 'required|array',
            'user_specialized_profile.title' => 'required|string',
            'user_specialized_profile.description' => 'nullable|string',
        ])->validate();

        $profile = UserSpecializedProfile::findOrFail($specialized_profile_id);

        auth()->user()->canEditUserOrForbidden($profile->user);

        $profile->fill($request->input('user_specialized_profile'));

        $profile->save();

        return response()->resource($profile);
    }

    public function delete($specialized_profile_id)
    {
        $profile = UserSpecializedProfile::findOrFail($specialized_profile_id);

        auth()->user()->canEditUserOrForbidden($profile->user);

        $profile->delete();

        return response()->resource();
    }

}
