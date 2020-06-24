<?php

namespace App\Http\Controllers\Dashboard;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User\User;
use App\Models\Referral\ReferralConnection;

class ReferralController extends Controller
{
	public function index()
	{
		return redirect()->route('dashboard.referrals.direct');
	}

	public function direct()
	{
		$referral_connection_query = ReferralConnection::query();
		
		$referral_connection_query->with([
			'invited_user',
			'invited_user.image',
		]);

		$referral_connection_query->where('referrer_user_id', auth()->user()->id);
		$referral_connection_query->where('tier', ReferralConnection::TIER_1);
		$referral_connection_query->orderBy('id', 'desc');
		$referral_connections = $referral_connection_query->paginate(25);

		return view('dashboard.referrals.direct', [
			'referral_connections' => $referral_connections,
		]);
	}

	public function indirect()
	{
		$referral_connection_query = ReferralConnection::query();
		
		$referral_connection_query->with([
			'invited_user',
			'invited_user.image',
			'tier1',
			'tier1.invited_user',
			'tier1.invited_user.image',
		]);

		$referral_connection_query->where('referrer_user_id', auth()->user()->id);
		$referral_connection_query->where('tier', ReferralConnection::TIER_2);
		$referral_connection_query->orderBy('id', 'desc');
		$referral_connections = $referral_connection_query->paginate(25);

		return view('dashboard.referrals.indirect', [
			'referral_connections' => $referral_connections,
		]);
	}

	public function tier_3()
	{
		if (auth()->user()->affiliate_mode != User::AFFILIATE_MODE_SUPERVISOR) {
			abort(404);
		}

		$referral_connection_query = ReferralConnection::query();
		
		$referral_connection_query->with([
			'invited_user',
			'invited_user.image',
			'tier1',
			'tier1.invited_user',
			'tier1.invited_user.image',
			'tier2',
			'tier2.invited_user',
			'tier2.invited_user.image',
		]);

		$referral_connection_query->where('referrer_user_id', auth()->user()->id);
		$referral_connection_query->where('tier', ReferralConnection::TIER_3);
		$referral_connection_query->orderBy('id', 'desc');
		$referral_connections = $referral_connection_query->paginate(25);

		return view('dashboard.referrals.tier_3', [
			'referral_connections' => $referral_connections,
		]);
	}
}
