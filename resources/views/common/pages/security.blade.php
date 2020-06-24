@extends('layouts.main_layout')

@push('meta')
    <title>{!! __('meta.security.title') !!}</title>
    <meta name="description" content="{!! __('meta.security.description') !!}">
    <meta name="keywords" content="{!! __('meta.security.keywords') !!}">
@endpush

@section('content')
    @include('components.navbar.main')

    <!-- page header -->
    <div class="[ page-header ] text-center">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="[ page-header__page-title ]">
                        <h2>{{ __('pages/security.security_and_reliability_safeguards') }}</h2>
                        <p>{{ __('pages/security.the_information_provided_here') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- / page header -->


    <!-- Body -->

    <div class="container-fluid">

        <section class="[ security ]">

            <div class="container">

                <p data-aos="fade-up">
                    {{ __('pages/security.at_screen_track_we_know_that_our_customers') }}
                </p>

                <!-- SSL -->
                <div class="[ security__body ]" data-aos="fade-up">
                    <div class="[ security__icon ]">
                        <img src="{{ asset_no_cache('/img/ssl.svg') }}" alt="">
                    </div>
                    <h4 class="[ security__title ]">{{ __('pages/security.ssl') }}</h4>
                    <p><strong>{{ __('pages/security.256_bit_ssl_security') }}<br></strong>
                        {{ __('pages/security.all_information_travelling_between') }}</p>
                </div>
                <!-- / SSL -->

                <!--  Cloud flare -->
                <div class="[ security__body ]" data-aos="fade-up">
                    <div class="[ security__icon ]">
                        <img src="{{ asset_no_cache('/img/cookie.svg') }}" alt="">
                    </div>
                    <h4 class="[ security__title ]">{{ __('pages/security.cookies') }}</h4>
                    <p><strong>{{ __('pages/security.cloud_flare') }}<br></strong>
                        {{ __('pages/security.all_information_travelling_between') }}<br><br>
                        <strong>{{ __('pages/security.google_analytics') }}</strong>
                        {{ __('pages/security.we_use_this_service_to_analyze_traffic') }}<br><br>

                        <strong>{{ __('pages/security.microsoft_azure') }}</strong>
                        {{ __('pages/security.depending_on_demand_we_host_site_on_multiple_servers') }}
                    </p>
                </div>
                <!--  /Cloud flare -->

                <div class="[ security__body ]" data-aos="fade-up">
                    <div class="[ security__icon ]">
                        <img src="{{ asset_no_cache('/img/encrypt.svg') }}" alt="">
                    </div>
                    <h4 class="[ security__title ]">{{ __('pages/security.strong_encryption') }}</h4>
                    <p>{{ __('pages/security.no_credit_card_information_is_ever_stored') }}</p>
                </div>

                <div class="[ security__body ]" data-aos="fade-up">
                    <div class="[ security__icon ]">
                        <img src="{{ asset_no_cache('/img/back-up.svg') }}" alt="">
                    </div>
                    <h4 class="[ security__title ]">{{ __('pages/security.backups') }}</h4>
                    <p>{{ __('pages/security.the_data_in_your_screen_track_account') }}</p>
                </div>
            </div>

    </div>

    </section>

    @include('common.pages.partials.try_now_section')

	@include('components.footer.main')
@endsection
