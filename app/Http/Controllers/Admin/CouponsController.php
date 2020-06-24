<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Administrator;
use App\Models\Coupon;

class CouponsController extends Controller
{
    public function index() {
        $coupons_for_all = Coupon::whereNull('email')->get();
        $coupons_for_specific_emails = Coupon::whereNotNull('email')->get();
        return view('admin.coupons.index', compact('coupons_for_all','coupons_for_specific_emails'));
    }

    public function create() {
        return view('admin.coupons.create_or_edit');
    }

    public function edit($coupon_id) {
        $coupon = Coupon::findOrFail($coupon_id);
        return view('admin.coupons.create_or_edit', compact('coupon'));
    }
}
