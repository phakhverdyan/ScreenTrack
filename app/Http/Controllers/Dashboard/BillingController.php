<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;

class BillingController extends Controller
{
    public function index() {
        $user = auth()->user();

        $user_cards = $user->credit_cards;
        $user_payout_methods = $user->payout_methods;

        return view('dashboard.billing.index')
            ->with(compact('user_cards','user_payout_methods'));
    }
}
