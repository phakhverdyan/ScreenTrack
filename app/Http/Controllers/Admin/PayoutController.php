<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Money\Payout;

class PayoutController extends Controller
{
    public function pending()
    {
    	$payout_query = Payout::query();
    	$payout_query->where('state', Payout::STATE_PENDING);
    	$payout_query->orderBy('id', 'asc');

        $payout_query->with([
            'user',
            'user.image',
        ]);

    	$pending_payouts = $payout_query->paginate(50);

    	return view('admin.payouts.pending', [
    		'pending_payouts' => $pending_payouts,
    	]);
    }
}
