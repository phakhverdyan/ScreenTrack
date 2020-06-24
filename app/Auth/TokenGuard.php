<?php

namespace App\Auth;

use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\UserProvider;

class TokenGuard extends \Illuminate\Auth\TokenGuard {
	public function __construct(UserProvider $provider, Request $request)
    {
        parent::__construct($provider, $request);
    }
}