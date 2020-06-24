<ul class="[  ] nav nav-tabs">
    <li class="nav-item">
        <a href="{{ route('dashboard.referrals.direct') }}" class="nav-link {{ request()->route()->named('dashboard.referrals.direct') ? 'active' : '' }}">
            <img src="{{ asset_no_cache('img/user.svg') }}" alt="" style="width: 16px; margin-right: 7px; opacity: 0.3;">
            {!! __('dashboard/referrals.direct', ['count' => $count_of_tier1_referral_connections->total])  !!}
        </a>
    </li>
    <li class="nav-item">
        <a href="{{ route('dashboard.referrals.indirect') }}" class="nav-link {{ request()->route()->named('dashboard.referrals.indirect') ? 'active' : '' }}">
            <img src="{{ asset_no_cache('img/two-men.svg') }}" alt="" style="width: 24px; margin-right: 7px; opacity: 0.3;">
            {!! __('dashboard/referrals.indirect', ['count' => $count_of_tier2_referral_connections->total])  !!}

        </a>
    </li>
    @if (auth()->user()->affiliate_mode == App\Models\User\User::AFFILIATE_MODE_SUPERVISOR)
        <li class="nav-item">
            <a href="{{ route('dashboard.referrals.tier_3') }}" class="nav-link {{ request()->route()->named('dashboard.referrals.tier_3') ? 'active' : '' }}">
                {!! __('dashboard/referrals.tier_3', ['count' => $count_of_tier3_referral_connections->total])  !!}
            </a>
        </li>
    @endif
</ul>
