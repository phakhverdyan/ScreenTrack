<?php

namespace App\Http\Controllers\Dashboard;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Language;

class ProfileController extends Controller
{
    public function edit() {
    	$user = auth()->user();

    	$user->load([
    		'links',
    		'spoken_languages',
    		'locality',
    	]);

    	$language_query = Language::query();
    	$language_query->whereIn('code', config('app.available_locales'));
    	$language_query->orderBy('name', 'asc');
    	$available_languages = $language_query->get();

    	$available_languages = $available_languages->sortBy(function ($available_language) {
    		return array_search($available_language->code, config('app.available_locales'));
    	});
    	
    	$language_query = Language::query();
    	$language_query->orderBy('name', 'asc');
    	$spoken_languages = $language_query->get();
    	$spoken_languages = $available_languages->concat($spoken_languages->whereNotIn('code', $available_languages->pluck('code')));

        return view('dashboard.profile.edit', compact([
            'user',
            'available_languages',
            'spoken_languages',
        ]));
    }

    public function change_password() {
        return view('dashboard.profile.change_password');
    }
}
