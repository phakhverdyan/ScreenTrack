<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User\User;

class UserController extends Controller
{
	public function index(Request $request)
	{
		$user_query = User::query();
		$user_query->where('created_at', '>=', date(\DateTime::ATOM, floor(time() / 86400) * 86400));
		$count_of_users_today = $user_query->count();

		$user_query = User::select('users.*');

		$user_query->with([
			'locality',
			'companies',
			'tier1_referral_connection',
			'tier1_referral_connection.referrer_user',
			'tier2_referral_connection',
			'tier2_referral_connection.referrer_user',
			'tier3_referral_connection',
			'tier3_referral_connection.referrer_user',
		]);

		$user_query->selectRaw('(' . collect([
			'SELECT -SUM(amount)',
			'FROM user_transactions',
			'WHERE user_id = users.id',
			'AND action_type IN (?)',
			'AND amount < 0',
		])->join(' ') . ') AS total_spent_amount', ['Payment']);

		$user_query->selectRaw('(' . collect([
			'SELECT SUM(amount)',
			'FROM user_transactions',
			'WHERE user_id = users.id',
			'AND action_type IN (?)',
			'AND amount > 0',
		])->join(' ') . ') AS total_earned_amount', ['Payment']);

		$user_query->selectRaw('(' . collect([
			'SELECT COUNT(*)',
			'FROM companies',
			'WHERE companies.owner_user_id = users.id',
		])->join(' ') . ') AS count_of_companies');

		if ($request->input('order') == 'total_earned_amount') {
			$user_query->orderBy('total_earned_amount', 'desc');
		} elseif ($request->input('order') == 'total_spent_amount') {
			$user_query->orderBy('total_spent_amount', 'desc');
		} else {
			$user_query->orderBy('id', 'desc');
		}

		$users = $user_query->paginate(50);

		return view('admin.users.index', [
			'users' => $users,
			'count_of_users_today' => $count_of_users_today,
		]);
	}
}
