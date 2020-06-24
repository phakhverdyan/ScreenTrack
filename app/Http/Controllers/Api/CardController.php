<?php

namespace App\Http\Controllers\Api;

use App\Models\User\UserCreditCard;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CardController extends Controller
{
    public function add(Request $request) {
        $user = auth()->user();

        validator()->make($request->all(), [
            'card.stripe_token_id' => 'required|string',
        ])->validate();

        $user_stripe_customer = \Stripe\Customer::retrieve($user->stripe_customer_id);

        $user_stripe_credit_card = $user_stripe_customer->sources->create([
            'source' => $request->input('card.stripe_token_id'),
        ]);

        $user_credit_card = new UserCreditCard;

        $user_credit_card->user_id = $user->id;
        $user_credit_card->stripe_id = $user_stripe_credit_card->id;
        $user_credit_card->address_zip = $user_stripe_credit_card->address_zip;
        $user_credit_card->brand = $user_stripe_credit_card->brand;
        $user_credit_card->country_code = $user_stripe_credit_card->country;
        $user_credit_card->expiration_month = $user_stripe_credit_card->exp_month;
        $user_credit_card->expiration_year = $user_stripe_credit_card->exp_year;
        $user_credit_card->funding = $user_stripe_credit_card->funding;
        $user_credit_card->last4 = $user_stripe_credit_card->last4;

        if (! $user->default_credit_card) {
            $user_credit_card->is_default = true;
        } else {
            $user_credit_card->is_default = false;
        }

        $user_credit_card->save();

        return response()->resource($user_credit_card);
    }

    public function delete($card_id) {
        $user = auth()->user();
        $card = UserCreditCard::findOrFail($card_id);
        $user->canManageCreditCardOrForbidden($card);

        if ($card->is_default) {
            abort(403);
        }

        $card->delete();

        return response()->resource();
    }

    public function make_primary($card_id) {
        $user = auth()->user();
        $card = UserCreditCard::findOrFail($card_id);
        $user->canManageCreditCardOrForbidden($card);
        
        if ($user->default_credit_card) {
            $user->default_credit_card->is_default = false;
            $user->default_credit_card->save();
        }
        
        $card->is_default = true;
        $card->save();
        
        return response()->resource();
    }
}
