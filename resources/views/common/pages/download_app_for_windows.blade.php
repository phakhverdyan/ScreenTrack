@extends('layouts.main_layout')

@push('meta')
    <title>{!! __('meta.download_app_for_windows.title') !!}</title>
    <meta name="description" content="{!! __('meta.download_app_for_windows.description') !!}">
    <meta name="keywords" content="{!! __('meta.download_app_for_windows.keywords') !!}">
@endpush

@section('content')
    @include('components.navbar.main')

    <!-- Hero -->
    <div class="[ hero ]">
        <div class="container">
            <div class="[ hero__row ] row align-items-center">
                <div class="col-md-6">
                    <div class="[ hero-text ] download-page">
                        <h1 class="[ hero-text__primary-heading ]">{!! __('pages/download_app.download_screen_track_employee_app') !!}</h1>
                        <p class="[ hero-text__bellow-heading ]">{{ __('pages/download_app.the_screen_track_application_is_for_employees') }}</p>
                        <a class="[ hero-text__button ] btn btn-primary btn-block" href="{{ url('builds/ScreenTrack Setup ' . $app_version . '.exe') }}">
                            <p class="text-center">
                                <img src="{{ asset_no_cache('/img/windows-10-logo.svg') }}" width="40" alt="download_app">
                            </p>
                            <img src="{{ asset_no_cache('/img/download-app.svg') }}" alt="download" width="24" class="mr-2">
                            {!! __('pages/download_app.download_for_windows')  !!}
                        </a>
                        <p class="[ hero-text__link ] d-none">
                            <a href="{{ route('download_app_for_mac_os', locale()) }}" style="color: #a9a9a9; text-decoration: none;">
                                <img src="{{ asset_no_cache('img/apple-logo.grey.svg') }}" alt="ios" width="20">
                                Download for Mac OS
                            </a>
                        </p>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="[ hero__illustration-download ]">
                        <object type="image/svg+xml" data="{{ asset_no_cache('img/screentracker-tracker-app.svg') }}"></object>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Hero -->

    <!-- Body -->
    <div class="container-fluid">
        <section class="[ random-questions ]">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="[ random-questions__title ] text-center">
                            <h2>{{ __('pages/download_app.frequently_asked_questions') }}</h2>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <!-- question -->
                    <div class="col-md-6" data-aos="fade-up">
                        <div class="[ random-questions__answer ]">
                            <h4>{!!  __('pages/download_app.what_happens_after_the_start') !!}</h4>
                            <p>{{ __('pages/download_app.after_choosing_a_project') }}</p>
                        </div>
                    </div>
                    <!-- / question -->
                    <!-- question -->
                    <div class="col-md-6" data-aos="fade-up">
                        <div class="[ random-questions__answer ]">
                            <h4>{!! __('pages/download_app.is_screen_track_free') !!}</h4>
                            <p>{!! __('pages/download_app.screen_track_free_app') !!}</p>
                        </div>
                    </div>
                    <!-- / question -->
                </div>
            </div>
        </section>

         @include('common.pages.partials.try_now_section')
    </div>
    <!-- Body or container-fluid -->

	@include('components.footer.main')
@endsection
