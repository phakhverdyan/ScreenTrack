<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Illuminate\Http\Request;

class CouponsController extends Controller
{
    public function create(Request $request) {
        validator()->make($request->all(), [
            'coupon.percent_discount' => 'nullable|numeric|max:100',
            'coupon.amount_discount' => 'nullable|numeric',
            'coupon.name' => 'required|string|unique:coupons,name',
            'coupon.valid_date_from' => 'nullable|date',
            'coupon.valid_date_to' => 'nullable|date',
            'coupon.email' => 'nullable|email',
        ])->validate();

        $data = $request->input('coupon');


        if (empty($data['percent_discount'])) {
            $data['percent_discount'] = 0;
        }

        if (empty($data['amount_discount'])) {
            $data['amount_discount'] = 0;
        }

        $coupon = Coupon::create($data);

        return response()->resource($coupon);
    }

    public function update(Request $request, $coupon_id) {
        validator()->make($request->all(), [
            'coupon.percent_discount' => 'nullable|numeric|max:100',
            'coupon.amount_discount' => 'nullable|numeric',
            'coupon.name' => 'required|string|unique:coupons,name,'.$coupon_id,
            'coupon.valid_date_from' => 'nullable|date',
            'coupon.valid_date_to' => 'nullable|date',
            'coupon.email' => 'nullable|email',
        ])->validate();

        $coupon = Coupon::findOrFail($coupon_id);

        $coupon->fill($request->input('coupon'));

        $coupon->save();

        return response()->resource($coupon);
    }

    public function delete($coupon_id) {
        $coupon = Coupon::findOrFail($coupon_id);
        $coupon->delete();

        return response()->resource();
    }

}
