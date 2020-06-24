<?php

namespace App\Http\Controllers\Api;

use App\Models\User\UserCreditCard;
use App\Models\User\UserPayoutMethod;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PayoutMethodsController extends Controller
{
    public function create(Request $request) {
        $user = auth()->user();

        validator()->make($request->all(), [
            'payout_method' => 'required|array',
            'payout_method.type' => 'required|string|in:' . implode(',', UserPayoutMethod::$types),
            'payout_method.identifier' => 'required|email',
        ])->validate();

        $payout_method_query = UserPayoutMethod::where('user_id', $user->id);
        $payout_method_query->where('type', $request->input('payout_method.type'));
        $payout_method_query->where('identifier', $request->input('payout_method.identifier'));
        $payout_method = $payout_method_query->first();

        if ($payout_method) {
            return response()->resource($payout_method);
        }

        $payout_method = new UserPayoutMethod;
        $payout_method->user_id = $user->id;
        $payout_method->type = $request->input('payout_method.type');
        $payout_method->identifier = $request->input('payout_method.identifier');

        if (!$user->default_payout_method) {
            $payout_method->is_default = true;
        }

        $payout_method->save();

        return response()->resource($payout_method);
    }

    public function delete($payout_method_id) {
        $payout_method = UserPayoutMethod::findOrFail($payout_method_id);
        auth()->user()->canManagePayoutMethodOrForbidden($payout_method);

        if ($payout_method->is_default) {
            abort(403);
        }

        $payout_method->delete();

        return response()->resource();
    }

    public function make_default($payout_method_id) {
        $payout_method = UserPayoutMethod::findOrFail($payout_method_id);
        $user = auth()->user();
        $user->canManagePayoutMethodOrForbidden($payout_method);

        if ($user->default_payout_method) {
            $user->default_payout_method->is_default = false;
            $user->default_payout_method->save();
        }

        $payout_method->is_default = true;
        $payout_method->save();

        return response()->resource($payout_method);
    }
}
