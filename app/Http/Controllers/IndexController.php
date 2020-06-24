<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Models\Plan\Plan;
use App\Models\User\User;

class IndexController extends Controller
{
    public function landing_1()
    {
        return view('common.landing.main_v1');
    }

    public function landing_2()
    {
        return view('common.landing.main_v2');
    }

    public function coming_soon()
    {
        return view('common.coming_soon.main');
    }

    public function how_it_works()
    {
    	return view('common.pages.how_it_works');
    }

    public function log_in()
    {
    	return view('common.pages.log_in');
    }

    public function see_you_soon()
    {
        return view('common.pages.see_you_soon');
    }

    public function contact_us()
    {
        return view('common.pages.contact_us');
    }

    public function about_us()
    {
        return view('common.pages.about_us');
    }

    public function faq()
    {
        return view('common.pages.faq');
    }

    public function careers()
    {
        return view('common.pages.careers');
    }

    public function status()
    {
        return view('common.pages.status');
    }

    public function security()
    {
        return view('common.pages.security');
    }

    public function download_app_for_windows()
    {
        $content = Storage::disk('public')->get('builds/latest.yml');
        preg_match('/version: ([.0-9]+?)\n/', $content, $match);
        $app_version = $match[1];

        return view('common.pages.download_app_for_windows', [
            'app_version' => $app_version,
        ]);
    }

    public function download_app_for_mac_os()
    {
        $content = Storage::disk('public')->get('builds/latest-mac.yml');
        preg_match('/version: ([.0-9]+?)\n/', $content, $match);
        $app_version = $match[1];

        return view('common.pages.download_app_for_mac_os', [
            'app_version' => $app_version,
        ]);
    }

    public function privacy()
    {
        return view('common.pages.privacy');
    }

    public function terms()
    {
        return view('common.pages.terms');
    }

    public function affiliates()
    {
        if (auth()->check()) {
            auth()->user()->load([
                'default_payout_method',
            ]);
        }

        $plans = Plan::get()->mapWithKeys(function ($plan) {
            return [$plan['key'] => $plan];
        });

        return view('common.pages.affiliates');
    }

    public function pricing($locale)
    {
        return redirect()->route('plans', [$locale]);
    }

    public function plans()
    {
        $plans = Plan::get()->mapWithKeys(function ($plan) {
            return [$plan['key'] => $plan];
        });

        return view('common.pages.plans', [
            'plans' => $plans,
        ]);
    }

    public function other($locale, $argument0 = null, $argument1 = null)
    {
        if ($user = User::where('slug', $argument0)->first()) {
            abort(503);
            return $user->toArray();
        }

        abort(404);
    }
}
