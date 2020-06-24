@extends('layouts.main_layout')

@push('meta')
    <title>{!! __('meta.about_us.title') !!}</title>
    <meta name="description" content="{!! __('meta.about_us.description') !!}">
    <meta name="keywords" content="{!! __('meta.about_us.keywords') !!}">
@endpush

@section('content')
    @include('components.navbar.main')
    <!-- page header -->
    <div class="[ page-header ] text-center">
        <div class="container">
            <div class="row">
                <div class="col-md-6 d-flex align-items-center">
                    <div class="[ page-header__page-title ]">
                        <h2>{{ __('pages/about_us.about_us') }}</h2>
                        <p>{{ __('pages/about_us.we_are_here_to_help_any_time_with_any_question') }}</p>
                    </div>
                </div>
                <div class="col-md-6">
                    <img src="{{ asset_no_cache('/img/about-us-header.svg') }}" alt="">
                </div>
            </div>
        </div>
    </div>
    <!-- / page header -->

    <section class="[ about-us__main ]">
        <div class="container">
            <div class="row">
                <div class="col-md-6 d-flex align-items-center">
                    <p>{!! __('pages/about_us.here_at_screen_track_our_global_talented_team_works') !!}</p>
                </div>
                <div class="col-md-6 d-flex align-items-center justify-content-center">
                    <img src="{{ asset_no_cache('/img/freelancer-payouts.svg') }}" alt="">
                </div>
            </div>
            <div class="row mb-5 mt-5">
                <div class="col-md-6 d-flex align-items-center justify-content-center">
                    <img src="{{ asset_no_cache('/img/esiest-tools.svg') }}" alt="">
                </div>
                <div class="col-md-6 d-flex align-items-center">
                    <p>{!! __('pages/about_us.we_strive_to_offer_the_easiest_tools_to_ensure') !!}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 d-flex align-items-center">
                    <p>{!! __('pages/about_us.we_love_our_users_and_their_feedback') !!}</p>
                </div>
                <div class="col-md-6 d-flex align-items-center justify-content-center">
                    <img src="{{ asset_no_cache('/img/reffer-friend-reward.svg') }}" alt="">
                </div>
            </div>
        </div>
    </section>

    <div class="container-fluid">
        @include('common.pages.partials.try_now_section')
    </div>

	@include('components.footer.main')
@endsection
