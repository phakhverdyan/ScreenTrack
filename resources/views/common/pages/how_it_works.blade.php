@extends('layouts.main_layout')

@push('meta')
    <title>{!! __('meta.how_it_works.title') !!}</title>
    <meta name="description" content="{!! __('meta.how_it_works.description') !!}">
@endpush

@section('content')
    @include('components.navbar.main')

	<!-- page header -->
    <div class="[ page-header ] text-center">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="[ page-header__page-title ]">
                        <h2>{{ __('pages/how_it_works.how_does_screen_track_work') }}</h2>
                        <p>{{ __('pages/how_it_works.we_made_screen_track_easy_to_use') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- / page header -->

    <!-- Body -->

    <div class="container-fluid">

        <!-- sign-up Section -->
        <section class="[ sign-up ]" data-aos="fade-up">
            <div class="container">
                <div class="row align-items-center">
                    <!-- sign-up Text -->
                    <div class="col-md-6 align-items-center">
                        <div class="[ sign-up__text ]">
                            <h2>{{ __('pages/how_it_works.sign_up') }}</h2>
                            <p>{{ __('pages/how_it_works.it_is_quick_and_easy_to_sign_up') }}</p>
                            <a class="btn btn-primary btn-custom" href="{{ route('pricing', locale()) }}">{{ __('pages/how_it_works.try_now') }}</a>
                        </div>
                    </div>
                    <!-- / sign-up Text -->

                    <!-- sign-up Video -->
                    <div class="col-md-6">
                        <div class="[ sign-up__img ]">
                            <object type="image/svg+xml" data="{{ asset_no_cache('/img/screentracker-signup-graph.svg') }}"></object>
                        </div>
                    </div>
                    <!-- / sign-up Video -->
                </div>
            </div>
        </section>
        <!-- / sign-up Section -->

        <!-- invite Section -->
        <section class="[ invite ]" data-aos="fade-up">
            <div class="container">
                <div class="row align-items-center">
                    <!-- invite img -->
                    <div class="col-md-6">
                        <div class="[ invite__img ]">
                            <object type="image/svg+xml" data="{{ asset_no_cache('/img/screentracker-invite-graph.svg') }}"></object>
                        </div>
                    </div>
                    <!-- /invite img -->
                    <!-- invite text -->
                    <div class="col-md-6">
                        <div class="[ invite__text ]">
                            <h2>{{ __('pages/how_it_works.invite_member') }}</h2>
                            <p>{{ __('pages/how_it_works.businesses_invite_local_remote_and_international') }}</p>
                            <a class="btn btn-primary btn-custom" href="{{ route('pricing', locale()) }}">{{ __('pages/how_it_works.try_now') }}</a>
                        </div>
                    </div>
                    <!-- / invite text -->
                </div>
            </div>
        </section>
        <!-- / invite Section -->

        <!-- time-tracking Section -->
        <section class="[ time-tracking ]" data-aos="fade-up">
            <div class="container">
                <div class="row align-items-center">
                    <!-- time-tracking Text -->
                    <div class="col-md-6">
                        <div class="[ time-tracking__text ]">
                            <h2>{{ __('pages/how_it_works.time_tracking') }}</h2>
                            <p>{{ __('pages/how_it_works.employees_use_the_screentrack_application') }}</p>
                            <a class="btn btn-primary btn-custom" href="{{ route('pricing', locale()) }}">{{ __('pages/how_it_works.try_now') }}</a>
                        </div>
                    </div><!-- time-tracking Text -->

                    <!-- time-tracking img -->
                    <div class="col-md-6">
                        <div class="[ time-tracking__img ]">
                            <object type="image/svg+xml" data="{{ asset_no_cache('/img/screentracker-tracker-app.svg') }}"></object>
                        </div>
                    </div><!-- time-tracking img -->
                </div>
            </div>

        </section>
        <!-- / time-tracking Section -->

        <!-- view-activity Section -->
        <section class="[ view-activity ]" data-aos="fade-up">
            <div class="container">
                <div class="row align-items-center">
                    <!-- view-statistics-feature img -->
                    <div class="col-md-6">
                        <div class="[ view-activity__img ]">
                            <object type="image/svg+xml" data="{{ asset_no_cache('/img/views-app-img.svg') }}"></object>
                        </div>
                    </div><!-- view-statistics-feature img -->

                    <!-- view-statistics-feature text -->
                    <div class="col-md-6">
                        <div class="[ view-activity__text ]">
                            <h2>{{ __('pages/how_it_works.view_activity') }}</h2>
                            <p>{{ __('pages/how_it_works.for_detailed_information') }}</p>
                        </div>
                    </div><!-- view-statistics-feature text -->
                </div>
            </div>
        </section>
        <!-- / view-activity Section -->

        <!-- Generate Reports Section -->
        <section class="[ generate-reports ]" data-aos="fade-up">
            <div class="container">
                <div class="row align-items-center">
                    <!-- Create Projects Text -->
                    <div class="col-md-6">
                        <div class="[ generate-reports__text ]">
                            <h2>{{ __('pages/how_it_works.generate_reports') }}</h2>
                            <p>{{ __('pages/how_it_works.all_projects_have_individual_reports') }}</p>
                            <a class="btn btn-primary btn-custom" href="{{ route('pricing', locale()) }}">{{ __('pages/how_it_works.try_now') }}</a>
                        </div>
                    </div>
                    <!-- / Create Projects Text -->
                    <!-- Create Projects img -->
                    <div class="col-md-6">
                        <div class="[ generate-reports__img ]">
                            <object type="image/svg+xml" data="{{ asset_no_cache('/img/statistics-image.svg') }}"></object>
                        </div>
                    </div>
                    <!--  /Create Projects img -->
                </div>
            </div>
        </section>
        <!-- / Create Projects Section -->

        @include('common.pages.partials.more_feature_section')
        @include('common.pages.partials.try_now_section')

    </div><!-- Body or container-fluid -->

	@include('components.footer.main')
@endsection
