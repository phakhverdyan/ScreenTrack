<?php

namespace App\Auth;

use Illuminate\Contracts\Session\Session;
use Illuminate\Contracts\Auth\UserProvider;
use Symfony\Component\HttpFoundation\Request;

class SessionGuard extends \Illuminate\Auth\SessionGuard {
	public function __construct($name, UserProvider $provider, Session $session, Request $request = null)
    {
    	parent::__construct($name, $provider, $session, $request);
    }

    public function json()
    {
    	$auth = null;

        if (auth()->check()) {
            auth()->user()->load([
                'administrator',
                'default_credit_card',
                'image',
                'locality',
                'locality.relevant_translation',
                'locality.country',
                'locality.country.relevant_translation',

                'projects' => function ($query) {
                    $query->select('projects.*');
                    $query->selectRaw('UNIX_TIMESTAMP(project_members.last_viewed_at) AS last_viewed_timestamp');
                    $query->orderBy('project_members.last_viewed_at', 'desc');
                },
            ]);
            
        	auth()->user()->makeVisible([
                'initial_stage',
                'email',
                'api_token',
                'realtime_token',
        	]);

            $auth = ['user' => auth()->user()->toArray()];
        }
        
    	return json_encode($auth);
    }
}