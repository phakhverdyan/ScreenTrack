@extends('layouts.main_layout')

@push('scripts')
    <!-- [ OWN SCRIPTS ] -->
    <script src="{{ asset_no_cache('/js/landing/main_v1.js') }}"></script>
    <!-- [ /OWN SCRIPT ] -->
@endpush

@section('content')
    @include('components.navbar.main')

    <!-- Hero -->
    <div class="[ hero ]">
        <div class="container">
            <div class="[ hero__row ] home row pb-5">
                <div class="col-md-6 col-xs-12">
                    <div class="[ hero-text ]">
                        <h1 class="[ hero-text__primary-heading ]">Employee Monitoring Software with Screenshots, Internet, Activity and Time Tracking</h1>
                    </div>

                    <form class="[ registration-form ] form-inline d-inline-flex mt-5 { is-closed is-big }">
                        <p class="is-not-available is-hidden">This email has already been taken</p>
                        <p class="is-invalid is-hidden">Must be a valid email address</p>
                        <input class="[ registration-form__input ] form-control" type="text" name="user[email]" placeholder="Enter your email">
                        <button type="submit" class="[ registration-form__button ] btn btn-primary my-2 my-sm-0 btn-custom">Get Started</button>
                    </form>

                    <p class="mt-3">No Credit Card Required</p>

                </div>
                <div class="col-md-6 col-xs-12">
                    <div class="[ hero__illustration ]">
                        <img src="{{ asset_no_cache('img/screentracker-hero-image.svg') }}" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- / hero -->

    <!-- Body -->
    <div class="container-fluid">
        <!-- video__explainer__blog -->
        <section class="[ video-explainer ]" data-aos="fade-up">
            <div class="container">
                <div class="row  align-items-center">
                    <!-- video__explainer__text -->
                    <div class="col-md-6 col-xs-12">
                        <div class="[ video-explainer__text ]">
                            <h2>Free Screenshots & Streaming</h2>
                            <p>ScreenTrack allows Freelancers and Employers to stay transparent thanks to our screenshot and live video technology. Employers can easily see a realtime video stream to confirm that the freelancer is actually working for the reported time and salary.</p>
                        </div>
                    </div><!-- / video__explainer__text -->
                    <!-- video__explainer__video -->
                    <div class="col-md-6 col-xs-12">
                        <div class="[ video-explainer__video ]">
                            <img src="https://via.placeholder.com/500x250" alt="">
                        </div>
                    </div><!-- / video__explainer__video -->
                </div>
            </div>
        </section>
        <!-- / video__explainer__blog -->

        <!-- view__apps__block -->
        <section class="[ view-apps ]" data-aos="fade-up">
            <div class="container">
                <div class="row align-items-center">
                    <!-- view-apps-feature img -->
                    <div class="col-md-6 col-xs-12 a">
                        <div class="[ view-apps__image ]">
                            <img src="{{ asset_no_cache('img/views-app-img.svg') }}" alt="">
                        </div>
                    </div><!-- view-apps-feature img -->
                    <!-- view-apps-feature text -->
                    <div class="col-md-6 col-xs-12 b">
                        <div class="[ view-apps__text ]">
                            <h2>Live View of Active Apps</h2>
                            <p>ScreenTrack lets you see what applications your contractors are using in real time - this way, you know where the focus goes!</p>
                        </div>
                    </div>
                    <!-- view-apps-feature text -->
                </div>
            </div>
        </section>
        <!-- / view__apps__block -->

        <!-- Manage Projects Section -->
        <section class="[ manage-projects ]" data-aos="fade-up">
            <div class="container">
                <div class="row align-items-center">
                    <!-- Manage Projects Text -->
                    <div class="col-md-6">
                        <div class="[ manage-projects__text ]">
                            <h2>Easily Manage Projects</h2>
                            <p>Having a bird's eye view has never been this easy - Simply add users to your projects and look at live video streaming or screenshots.</p>
                        </div>
                    </div><!-- Manage Projects Text -->
                    <!-- Manage Projects img -->
                    <div class="col-md-6">
                        <div class="[ manage-projects__image ]">
                            <img src="{{ asset_no_cache('img/create-project-img.svg') }}" alt="">
                        </div>
                    </div>
                    <!-- / Manage Projects img -->
                </div>
            </div>
        </section>
        <!-- / Manage Projects Section -->

        <!-- View Statistics Section -->
        <section class="[ view-statistics ]" data-aos="fade-up">
            <div class="container">
                <div class="row align-items-center">
                    <!-- view-statistics-feature img -->
                    <div class="col-md-6">
                        <div class="[ view-statistics__image ]">
                            <img src="{{ asset_no_cache('img/statistics-image.svg') }}" alt="">
                        </div>
                    </div><!-- view-statistics-feature img -->
                    <!-- view-statistics-feature text -->
                    <div class="col-md-6">
                        <div class="[ view-statistics__text ]">
                            <h2>Free Real-Time Project Statistics</h2>
                            <p>ScreenTrack allows you to view project statistics such as time logged, last login, number of mouse clicks and key inputs during a specific period - this allows you to get a quick overview of how well the task's going.</p>
                        </div>
                    </div>
                    <!-- view-statistics-feature text -->
                </div>
            </div>
        </section>
        <!-- / view-statistics-feature Section -->

        <!--  more feature Section -->
        <section class="[ more-features ]" data-aos="fade-up">
            <div class="container">
                <div class="[ more-features__text ] text-center">
                    <h2>A bird's eye view</h2>
                    <p>ScreenTrack's powerful real-time platform synchronises your worldwide team.</p>
                </div>
                <div class="[ more-features__icon ] text-center">
                    <div class="row">
                        <!-- Feature -->
                        <div class="col-md-2">
                            <div class="[ feature-block ]">
                                <div class="[ feature-block__icon ]">
                                    <img src="{{ asset_no_cache('img/view-employee-screen-icon.svg') }}" alt="">
                                </div>
                                <div class="[ feature-block__feature-title ]">
                                    <h4>Screenshots & Streaming</h4>
                                </div>
                            </div>
                        </div><!-- Feature -->
                        <!-- Feature -->
                        <div class="col-md-2">
                            <div class="[ feature-block ]">
                                <div class="[ feature-block__icon ]">
                                    <img src="{{ asset_no_cache('img/track-time-icon.svg') }}" alt="">
                                </div>
                                <div class="[ feature-block__feature-title ]">
                                    <h4>Time Tracking</h4>
                                </div>
                            </div>
                        </div><!-- Feature -->
                        <!-- Feature -->
                        <div class="col-md-2">
                            <div class="[ feature-block ]">
                                <div class="[ feature-block__icon ]">
                                    <img src="{{ asset_no_cache('img/view-mouse-and-keyboard-activity-icon.svg') }}" alt="">
                                </div>
                                <div class="[ feature-block__feature-title ]">
                                    <h4>Keyboard and Mouse Activity</h4>
                                </div>
                            </div>
                        </div><!-- Feature -->
                        <!-- Feature -->
                        <div class="col-md-2">
                            <div class="[ feature-block ]">
                                <div class="[ feature-block__icon ]">
                                    <img src="{{ asset_no_cache('img/view-online-timesheets.svg') }}" alt="">
                                </div>
                                <div class="[ feature-block__feature-title ]">
                                    <h4>Live TimeSheets</h4>
                                </div>
                            </div>
                        </div><!-- Feature -->
                        <!-- Feature -->
                        <div class="col-md-2">
                            <div class="[ feature-block ]">
                                <div class="[ feature-block__icon ]">
                                    <img src="{{ asset_no_cache('img/generate-detailed-reports-icon.svg') }}" alt="">
                                </div>
                                <div class="[ feature-block__feature-title ]">
                                    <h4>Detailed Reports</h4>
                                </div>
                            </div>
                        </div><!-- Feature -->
                        <!-- Feature -->
                        <div class="col-md-2">
                            <div class="[ feature-block ]">
                                <div class="[ feature-block__icon ]">
                                    <img src="{{ asset_no_cache('img/track-apps-icon.svg') }}" alt="">
                                </div>
                                <div class="[ feature-block__feature-title ]">
                                    <h4>Running Apps</h4>
                                </div>
                            </div>
                        </div><!-- Feature -->
                    </div>
                </div>
            </div>
        </section>
        <!-- / more feature Section -->

        <!-- try now block -->
        <section class="[ try-now ]" data-aos="fade-up">
            <div class="container">
                <div class="text-center">
                    <h2 class="try-now__text">{!! __('common.main.try_now') !!}</h2>
                    <form class="[ registration-form ] form-inline d-inline-flex mt-5 { is-closed is-large is-white }">
                        <p class="is-not-available is-hidden">{!! __('common.main.email_taken') !!}</p>
                        <p class="is-invalid is-hidden">{!! __('common.main.must_be_email') !!}</p>
                        <input class="[ registration-form__input ] form-control" type="text" name="user[email]" placeholder="{!! __('common.main.email_placeholder')  !!}">
                        <button type="submit" class="[ registration-form__button ] btn btn-primary my-2 my-sm-0 btn-custom">{!! __('common.main.sign_up_now') !!}</button>
                    </form>
                </div>
            </div>
        </section>
        <!-- / try now block -->
    </div>
    <!-- Body or container-fluid -->

    @include('components.footer.main')
@endsection
