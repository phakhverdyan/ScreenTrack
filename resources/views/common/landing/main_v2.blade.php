@extends('layouts.main_layout')

@push('meta')
    <title>{!! __('meta.main_v2.title') !!}</title>
    <meta name="description" content="{!! __('meta.main_v2.description') !!}">
    <meta name="keywords" content="{!! __('meta.main_v2.keywords') !!}">
@endpush

@push('styles')
    <link rel="stylesheet" href="{{ asset_no_cache('css/vendor/owl.carousel.min.css') }}">
    <link rel="stylesheet" href="{{ asset_no_cache('css/landing2.css') }}">
@endpush

@push('scripts')
    <script src="{{ asset_no_cache('js/vendor/owl.carousel.min.js') }}"></script>

    <script>
        $(document).ready(function() {
            $(".owl-carousel").owlCarousel({
                autoPlay: 3000, // Set AutoPlay to 3 seconds
                items: 4,
                itemsDesktop: [ 1199, 3 ],
                itemsDesktopSmall: [ 979, 3 ],

                responsive: {
                    0: {
                        items: 1,
                    },
                    567: {
                        items: 2,
                    },

                    768: {
                        items: 3,
                    },

                    992: {
                        items: 4,
                    },
                },
            });

            $("#owl-demo-1").owlCarousel({
                autoPlay: 3000, // Set AutoPlay to 3 seconds
                items: 4,
                itemsDesktop: [ 1199, 3 ],
                itemsDesktopSmall: [ 979, 3 ],

                responsive: {
                    0: {
                        items: 1,
                    },
                    567: {
                        items: 2,
                    },

                    768: {
                        items: 3,
                    },

                    992: {
                        items: 4,
                    },
                },
            });
        });
    </script>
@endpush

@section('content')
    @include('components.navbar.main')

    <header class="[ header ]">
        <div class="container">
            <div class="row [ hero ]">
                <div class="col-lg-5 [ hero__text ]">
                    <div class="row">
                        <div class="col-md-12">
                            <h1>{{ __('pages/home_page.free_employee_monitoring_software_with_screenshots') }}</h2>
                            <h2>{!! __('common.main.totally_free') !!}</h2>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <form class="[ registration-form ] form-inline d-inline-flex mt-5 { is-closed is-big }" onsubmit="event.preventDefault();">
                                <p class="is-not-available is-hidden">{{ __('pages/home_page.this_email_has_already_been_taken') }}</p>
                                <p class="is-invalid is-hidden">{{ __('pages/home_page.must_be_a_valid_email_address') }}</p>
                                <input class="[ registration-form__input ] form-control" type="text" name="user[email]" placeholder="{{ __('pages/home_page.enter_your_email') }}">
                                <button type="submit" class="[ registration-form__button ] btn btn-primary my-2 my-sm-0 btn-custom">
                                    {!! __('common.main.lets_go') !!}
                                    <img src="{{ asset_no_cache('img/like-icon.svg') }}" style="width: 25px; margin-top: -8px;" alt="">
                                </button>
                            </form>
                            <p class="mt-3">
                                {{ __('pages/home_page.no_credit_card_required') }}.
                                <b>{{ __('pages/home_page.no_strings_attached') }}.</b>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-7 mt-lg-0 mt-5 [ hero__image ] d-v d-flex jusitify-content-center align-items-center">
                    <img class="img-01" src="{{ asset_no_cache('/img/hero/app-screen.svg') }}" alt="">
                    <img class="img-02 d-none d-lg-block" src="{{ asset_no_cache('/img/hero/app-profile.svg') }}" alt="">
                    <img class="img-03 d-none d-lg-block" src="{{ asset_no_cache('/img/hero/profile-button.svg') }}" alt="">
                    <div class="[ hero__image-chat-anime ] item-1 d-none d-lg-block">
                        <span class="[ hero__image-chat-anime__item ] msg-01"></span>
                        <span class="[ hero__image-chat-anime__item ] msg-02"></span>
                        <span class="[ hero__image-chat-anime__item ] msg-03"></span>
                        <span class="[ hero__image-chat-anime__item ] msg-04"></span>
                    </div>
                    <div class="[ hero__image-chat-anime ] item-2 d-none d-lg-block">
                        <span class="[ hero__image-chat-anime__item ] msg-01"></span>
                        <span class="[ hero__image-chat-anime__item ] msg-02"></span>
                        <span class="[ hero__image-chat-anime__item ] msg-03"></span>
                        <span class="[ hero__image-chat-anime__item ] msg-04"></span>
                    </div>
                    <div class="[ hero__image-chat-anime ] item-3 d-none d-lg-block">
                        <span class="[ hero__image-chat-anime__item ] msg-01"></span>
                        <span class="[ hero__image-chat-anime__item ] msg-02"></span>
                        <span class="[ hero__image-chat-anime__item ] msg-03"></span>
                        <span class="[ hero__image-chat-anime__item ] msg-04"></span>
                    </div>
                    <div class="[ hero__image-chat-anime__dots ] d-none d-lg-block">
                        <span class="[ hero__image-chat-anime__dot ] dot-01"></span>
                        <span class="[ hero__image-chat-anime__dot ] dot-02"></span>
                        <span class="[ hero__image-chat-anime__dot ] dot-03"></span>
                    </div>
                    <img class="img-04 d-none d-lg-block" src="{{ asset_no_cache('/img/hero/screenshot.svg') }}" alt="">
                    <img class="img-05 d-none d-lg-block" src="{{ asset_no_cache('/img/hero/screenshot.svg') }}" alt="">
                    <img class="img-06 d-none d-lg-block" src="{{ asset_no_cache('/img/hero/screenshot.svg') }}" alt="">
                    <img class="img-07 d-none d-lg-block" src="{{ asset_no_cache('/img/hero/screenshot.svg') }}" alt="">
                    <img class="img-08 d-none d-lg-block" src="{{ asset_no_cache('/img/hero/curves.svg') }}" alt="">
                </div>
            </div>
            <div class="row">
                <div class="col-lg-8">
                    <div class="d-flex flex-lg-row flex-column mt-5">
                        <div>
                            <div class="d-flex align-items-center">
                                <img src="{{ asset_no_cache('img/check-mark-icon.svg') }}" alt="" style="width: 20px;">
                                <p class="ml-2 mb-0">{!! __('common.main.zero_commission') !!}</p>
                            </div>
                            <div class="d-flex align-items-center mt-3">
                                <img src="{{ asset_no_cache('img/check-mark-icon.svg') }}" alt="" style="width: 20px;">
                                <p class="ml-2 mb-0">{!! __('common.main.premium_payment_protection') !!}</p>
                            </div>
                            <div class="d-flex align-items-center mt-3">
                                <img src="{{ asset_no_cache('img/check-mark-icon.svg') }}" alt="" style="width: 20px;">
                                <p class="ml-2 mb-0">{!! __('common.main.daily_payouts') !!}</p>
                            </div>
                            <div class="d-flex align-items-center mt-3">
                                <img src="{{ asset_no_cache('img/check-mark-icon.svg') }}" alt="" style="width: 20px;">
                                <p class="ml-2 mb-0">{!! __('common.main.paid_employer') !!}</p>
                                <a href="#landing__affiliate-program" class="ml-1">
                                    <img src="{{ asset_no_cache('img/question-circle.svg') }}" alt="" style="width: 20px; opacity: 0.3;">
                                </a>
                            </div>
                            <div class="d-flex align-items-center mt-3">
                                <img src="{{ asset_no_cache('img/check-mark-icon.svg') }}" alt="" style="width: 20px;">
                                <p class="ml-2 mb-0">{!! __('common.main.full_encrypted') !!}</p>
                            </div>
                        </div>
                        <div class="ml-lg-5 mt-lg-0 mt-3">
                            <div class="d-flex align-items-center">
                                <img src="{{ asset_no_cache('img/check-mark-icon.svg') }}" alt="" style="width: 20px;">
                                <p class="ml-2 mb-0">{!! __('common.main.screenshots_per_hour') !!}</p>
                            </div>
                            <div class="d-flex align-items-center mt-3">
                                <img src="{{ asset_no_cache('img/check-mark-icon.svg') }}" alt="" style="width: 20px;">
                                <p class="ml-2 mb-0">{!! __('common.main.unlimited_projects_users') !!}</p>
                            </div>
                            <div class="d-flex align-items-center mt-3">
                                <img src="{{ asset_no_cache('img/check-mark-icon.svg') }}" alt="" style="width: 20px;">
                                <p class="ml-2 mb-0">{!! __('common.main.kanban_board') !!}</p>
                            </div>
                            <div class="d-flex align-items-center mt-3">
                                <img src="{{ asset_no_cache('img/check-mark-icon.svg') }}" alt="" style="width: 20px;">
                                <p class="ml-2 mb-0">{!! __('common.main.paid_referrer') !!}</p>
                                <a href="#landing__affiliate-program" class="ml-1">
                                    <img src="{{ asset_no_cache('img/question-circle.svg') }}" alt="" style="width: 20px; opacity: 0.3;">
                                </a>
                            </div>
                            <div class="d-flex align-items-center mt-3">
                                <img src="{{ asset_no_cache('img/check-mark-icon.svg') }}" alt="" style="width: 20px;">
                                <p class="ml-2 mb-0">
                                    {!! __('common.main.online_transaction_processing') !!}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" style="margin-top: 50px;">
                <div class="col flex-md-row flex-column d-flex justify-content-center">
                    <div class="mx-3">
                        <img src="{{ asset_no_cache('img/paypal-logo.svg') }}" alt="" style="height: 120px; opacity: 0.3;">
                    </div>
                    <div class="mx-3">
                        <img src="{{ asset_no_cache('img/payoneer-logo.svg') }}" alt="" style="height: 120px; opacity: 0.3;">
                    </div>
                    <div class="mx-3">
                        <img src="{{ asset_no_cache('img/mastercard-logo-2.svg') }}" alt="" style="height: 120px; opacity: 0.3;">
                    </div>
                    <div class="mx-3">
                        <img src="{{ asset_no_cache('img/visa-pay-logo.svg') }}" alt="" style="height: 120px; opacity: 0.3;">
                    </div>
                </div>
            </div>
        </div>
    </header>

    <section class="[ testimonials ]">
        <div class="[ testimonials-slider ]">
            <div class="container">
                <div id="owl-demo-0" class="owl-carousel owl-theme">
                    <div class="[ user ] item">
                        <div class="[ user-image ]" style="background-image: url('/img/testimonial_freelancers/alexandra_u_ua.jpg');"></div>
                        <p class="[ user-quote ]">
                            I love ScreenTrack :) Easy platform to use, fantasic staff and nothing but great results!
                        </p>
                        <div class="[ user-info ]">
                            <img class="[ user-location ]" src="{{ asset_no_cache('/img/flags/ukraine.svg') }}" alt="">
                            <div class="[ user-name ]">
                                <p>Alexandra U</p>
                                <p class="title">UI/UX</p>
                            </div>
                        </div>
                    </div>
                    <div class="[ user ] item">
                        <div class="[ user-image ]" style="background-image: url('/img/testimonial_freelancers/charles_h_mern_au.jpg');"></div>
                        <p class="[ user-quote ]">
                            We’re running all jobs through their awesome platform for our company.
                        </p>
                        <div class="[ user-info ]">
                            <img class="[ user-location ]" src="{{ asset_no_cache('/img/flags/australia.svg') }}" alt="">
                            <div class="[ user-name ]">
                                <p>Charles H</p>
                                <p class="title">MERN-Stack Developer</p>
                            </div>
                        </div>
                    </div>
                    <div class="[ user ] item">
                        <div class="[ user-image ]" style="background-image: url('/img/testimonial_freelancers/giau_n_vn.jpg');"></div>
                        <p class="[ user-quote ]">
                            ScreenTrack is a terrific all-in-one solution for the better project
                            organization and easy comunication.
                        </p>
                        <div class="[ user-info ]">
                            <img class="[ user-location ]" src="{{ asset_no_cache('/img/flags/vietnam.svg') }}" alt="">
                            <div class="[ user-name ]">
                                <p>Giau N</p>
                                <p class="title">Full-Stack Web Developer</p>
                            </div>
                        </div>
                    </div>
                    <div class="[ user ] item">
                        <div class="[ user-image ]" style="background-image: url('/img/testimonial_freelancers/gor_g_vn.jpg');"></div>
                        <p class="[ user-quote ]">
                            Great customer service and intuitive product! I’ve tried everything
                            out there and you all offer the absolute best experience start to finish.
                        </p>
                        <div class="[ user-info ]">
                            <img class="[ user-location ]" src="{{ asset_no_cache('/img/flags/armenia.svg') }}" alt="">
                            <div class="[ user-name ]">
                                <p>Gor G</p>
                                <p class="title">Full-Stack Developer</p>
                            </div>
                        </div>
                    </div>
                    <div class="[ user ] item">
                        <div class="[ user-image ]" style="background-image: url('/img/testimonial_freelancers/hani_l_al.jpg');"></div>
                        <p class="[ user-quote ]">
                            I am impressed with ScreenTrack. Best online product ever. Give it a
                            try. It’s aboslutelly free.
                        </p>
                        <div class="[ user-info ]">
                            <img class="[ user-location ]" src="{{ asset_no_cache('/img/flags/algeria.svg') }}" alt="">
                            <div class="[ user-name ]">
                                <p>Hani L</p>
                                <p class="title">Designer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="[ testimonials-slider ]">
            <div class="container">
                <div id="owl-demo-1" class="owl-carousel owl-theme">
                    <div class="[ user ] item">
                        <div class="[ user-image ]" style="background-image: url('/img/testimonial_freelancers/jam_m_al.jpg');"></div>
                        <p class="[ user-quote ]">
                            When you’re running a small business, there’s tons of other things to be doing besides organising. ScreenTrack help me a lot and It’s free. Yes, free. I am speechless.
                        </p>
                        <div class="[ user-info ]">
                            <img class="[ user-location ]" src="{{ asset_no_cache('/img/flags/pakistan.svg') }}" alt="">
                            <div class="[ user-name ]">
                                <p>Jam M</p>
                                <p class="title">Designer</p>
                            </div>
                        </div>
                    </div>
                    <div class="[ user ] item">
                        <div class="[ user-image ]" style="background-image: url('/img/testimonial_freelancers/samir_i_it.jpg');"></div>
                        <p class="[ user-quote ]">
                            I love ScreenTrack and recommend it to all of my friends who own small businesses. My project are safe and organised with ScreenTrack Kanban feature.
                        </p>
                        <div class="[ user-info ]">
                            <img class="[ user-location ]" src="{{ asset_no_cache('/img/flags/italy.svg') }}" alt="">
                            <div class="[ user-name ]">
                                <p>Samir I</p>
                                <p class="title">Software Developer</p>
                            </div>
                        </div>
                    </div>
                    <div class="[ user ] item">
                        <div class="[ user-image ]" style="background-image: url('/img/testimonial_freelancers/shilpa_m_in.jpg');"></div>
                        <p class="[ user-quote ]">
                            ScreenTrack help us treat every freelancer like royalty.
                        </p>
                        <div class="[ user-info ]">
                            <img class="[ user-location ]" src="{{ asset_no_cache('/img/flags/india.svg') }}" alt="">
                            <div class="[ user-name ]">
                                <p>Shilpa M</p>
                                <p class="title">Wordpress Expert</p>
                            </div>
                        </div>
                    </div>
                    <div class="[ user ] item">
                        <div class="[ user-image ]" style="background-image: url('/img/testimonial_freelancers/umesh_p_np.jpg');"></div>
                        <p class="[ user-quote ]">
                            ScreenTrack is really a great product to get started with your startup. Awesome features and easy communication between freelancers and employers. This product made my day. Very recommended.
                        </p>
                        <div class="[ user-info ]">
                            <img class="[ user-location ]" src="{{ asset_no_cache('/img/flags/nepal.svg') }}" alt="">
                            <div class="[ user-name ]">
                                <p>Umesh P</p>
                                <p class="title">PHP Hybrid Developer</p>
                            </div>
                        </div>
                    </div>
                    <div class="[ user ] item">
                        <div class="[ user-image ]" style="background-image: url('/img/testimonial_freelancers/victor_h_br.jpg');"></div>
                        <p class="[ user-quote ]">
                            Easy to use, got way more and way better organisation. That actually I expected and I am very happy with the end results I got.
                        </p>
                        <div class="[ user-info ]">
                            <img class="[ user-location ]" src="{{ asset_no_cache('/img/flags/brazil.svg') }}" alt="">
                            <div class="[ user-name ]">
                                <p>Victor H</p>
                                <p class="title">CEO - ScreenTrack</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="[ story ]">
        <div class="[ story-top ]">
            <div class="container">
                <h3 class="[ section-title ] text-center">{{ __('pages/home_page.why_screen_track_rocks_audrey') }}</h3>
                <!-- Story item -->
                <div class="[ story__content ]">
                    <div class="row">
                        <div class="col-md-8 flex-lg-row flex-column-reverse offset-md-2 [ story__item ]">
                            <div class="[ story__item-text ] mt-lg-0 mt-5">
                                <h3>{{ __('pages/home_page.zero_commission') }}</h3>
                                <p>{{ __('pages/home_page.with_screen_track_audrey_pays_zero_commission') }}</p>
                            </div>
                            <div class="[ story__item-image ] commission">
                                <img class="img-01" src="{{ asset_no_cache('/img/commission/woman.svg') }}" alt="">
                                <object class="img-02" type="image/svg+xml" data="{{ asset_no_cache('/img/commission/bubble.svg') }}"></object>
                                <img class="img-03" src="{{ asset_no_cache('/img/commission/money.svg') }}" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / Story item -->

                <div class="[ story__item-devider ]">
                    <img src={{ asset_no_cache('/img/dashed-line.svg') }}" alt="">
                </div>

                <!-- Story item -->
                <div class="[ story__content ]">
                    <div class="row">
                        <div class="col-md-8 flex-lg-row flex-column offset-md-2 [ story__item ]">
                            <div class="[ story__item-image ] freetime-screenshots">
                                <img class="img-01" src="{{ asset_no_cache('/img/freetime-screenshots/woman.svg') }}" alt="">
                                <img class="img-02" src="{{ asset_no_cache('/img/freetime-screenshots/window.svg') }}" alt="">
                                <img class="img-03" src="{{ asset_no_cache('/img/freetime-screenshots/shape-1.svg') }}" alt="">
                                <img class="img-04" src="{{ asset_no_cache('/img/freetime-screenshots/shape-2.svg') }}" alt="">
                                <img class="img-05" src="{{ asset_no_cache('/img/freetime-screenshots/shape-3.svg') }}" alt="">
                                <img class="img-06" src="{{ asset_no_cache('/img/freetime-screenshots/shape-4.svg') }}" alt="">
                                <img class="img-07" src="{{ asset_no_cache('/img/freetime-screenshots/shape-3.svg') }}" alt="">
                                <img class="img-08" src="{{ asset_no_cache('/img/freetime-screenshots/shape-4.svg') }}" alt="">
                            </div>
                            <div class="[ story__item-text ] mt-lg-0 mt-5">
                                <h3>{{ __('pages/home_page.free_time_tracker_with_screenshots') }}</h3>
                                <p>{{ __('pages/home_page.she_enjoys_a_free_time_tracker') }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / Story item -->

                <div class="[ story__item-devider ] reverse">
                    <img src="{{ asset_no_cache('/img/dashed-line.svg') }}" alt="">
                </div>

                <!-- Story item -->
                <div class="[ story__content ]">
                    <div class="row">
                        <div class="col-md-8 flex-lg-row flex-column-reverse offset-md-2 [ story__item ]">
                            <div class="[ story__item-text ] mt-lg-0 mt-5">
                                <h3>{{ __('pages/home_page.free_unlimited_projects_users_managers') }}</h3>
                                <p>{{ __('pages/home_page.her_employer_can_add_her_to_unlimited_projects') }}
                                </p>
                            </div>
                            <div class="[ story__item-image ] unlimited-projects">
                                <img class="img-01" src="{{ asset_no_cache('/img/unlimited-projects/form.svg') }}" alt="">
                                <img class="img-02" src="{{ asset_no_cache('/img/unlimited-projects/success.svg') }}" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / Story item -->
                <div class="[ story__item-devider ] between">
                    <img src="{{ asset_no_cache('/img/dashed-line.svg') }}" alt="">
                </div>

                <!-- Story item -->
                <div class="[ story__content ]">
                    <div class="row">
                        <div class="col-md-8 flex-lg-row flex-column offset-md-2 [ story__item ] ">
                            <div class="[ story__item-image ] kanban">
                                <img class="img-01" src="{{ asset_no_cache('/img/kanban/woman.svg') }}" alt="">
                                <img class="img-02" src="{{ asset_no_cache('/img/kanban/big-box.svg') }}" alt="">
                                <img class="img-03" src="{{ asset_no_cache('/img/kanban/small-box.svg') }}" alt="">
                                <img class="img-04" src="{{ asset_no_cache('/img/kanban/window.svg') }}" alt="">
                            </div>
                            <div class="[ story__item-text ] mt-lg-0 mt-5">
                                <h3>{{ __('pages/home_page.kanban_project_management_with_live_messaging') }}</h3>
                                <p>{{ __('pages/home_page.audrey_can_easily_use_the_task_kanban_tool') }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / Story item -->

                <div class="[ story__item-devider ] reverse">
                    <img src="{{ asset_no_cache('/img/dashed-line.svg') }}" alt="">
                </div>

                <!-- Story item -->
                <div class="[ story__content ]">
                    <div class="row">
                        <div class="col-md-8 flex-lg-row flex-column-reverse offset-md-2 [ story__item ] ">
                            <div class="[ story__item-text ] mt-lg-0 mt-5">
                                <h3>{{ __('pages/home_page.premium_payment_protection') }}</h3>
                                <p>{{ __('pages/home_page.her_employer_rests_easy') }}</p>
                            </div>
                            <div class="[ story__item-image ] premium-payment">
                                <object class="img-01" type="image/svg+xml" data="{{ asset_no_cache('/img/payment/credit-card.svg') }}"></object>
                                <img class="img-02" src="{{ asset_no_cache('/img/payment/money-1.svg') }}" alt="">
                                <img class="img-03" src="{{ asset_no_cache('/img/payment/money-2.svg') }}" alt="">
                                <img class="img-04" src="{{ asset_no_cache('/img/payment/coin.svg') }}" alt="">
                                <img class="img-05" src="{{ asset_no_cache('/img/payment/coin.svg') }}" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / Story item -->

                <div class="[ story__item-devider ]" id="landing__affiliate-program">
                    <img src="{{ asset_no_cache('/img/dashed-line.svg') }}" alt="">
                </div>

                <!-- Story item -->
                <div class="[ story__content ]">
                    <div class="row">
                        <div class="col-md-8 flex-lg-row flex-column offset-md-2 [ story__item ] ">
                            <div class="[ story__item-image ] refer-employer">
                                <img class="img-01" src="{{ asset_no_cache('/img/refer-employer/woman.svg') }}" alt="">
                                <img class="img-02" src="{{ asset_no_cache('/img/refer-employer/avatar-1.svg') }}" alt="">
                                <img class="img-03" src="{{ asset_no_cache('/img/refer-employer/avatar-2.svg') }}" alt="">
                                <img class="img-04" src="{{ asset_no_cache('/img/refer-employer/avatar-3.svg') }} alt="">
                                <img class="img-05" src="{{ asset_no_cache('/img/refer-employer/dollar-sign.svg') }}" alt="">
                                <img class="img-06" src="{{ asset_no_cache('/img/refer-employer/dollar-sign.svg') }}" alt="">
                                <img class="img-07" src="{{ asset_no_cache('/img/refer-employer/dollar-sign.svg') }}" alt="">
                                <img class="img-08" src="{{ asset_no_cache('/img/refer-employer/dollar-sign.svg') }}" alt="">
                                <img class="img-09" src="{{ asset_no_cache('/img/refer-employer/dollar-sign.svg') }}" alt="">
                                <img class="img-10" src="{{ asset_no_cache('/img/refer-employer/dollar-sign.svg') }}" alt="">
                            </div>
                            <div class="[ story__item-text ] mt-lg-0 mt-5">
                                <h3>{{ __('pages/home_page.500_per_employer_referral') }}</h3>
                                <p>{{ __('pages/home_page.audrey_also_earns_by_inviting') }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / Story item -->

                <div class="[ story__item-devider ] reverse">
                    <img src="{{ asset_no_cache('/img/dashed-line.svg') }}" alt="">
                </div>

                <!-- Story item -->
                <div class="[ story__content ]">
                    <div class="row">
                        <div class="col-md-8 flex-lg-row flex-column-reverse offset-md-2 [ story__item ] ">
                            <div class="[ story__item-text ] mt-lg-0 mt-5">
                                <h3>{{ __('pages/home_page.50_for_anyone_referred_by_your') }}</h3>
                                <p>{{ __('pages/home_page.she_even_gets_paid_when_the_friends') }}</p>
                            </div>
                            <div class="[ story__item-image ] refer-friend">
                                <img class="img-01" src="{{ asset_no_cache('/img/refer-friend/base.svg') }}" alt="">
                                <img class="img-02" src="{{ asset_no_cache('/img/refer-friend/avatar-1.svg') }}" alt="">
                                <img class="img-03" src="{{ asset_no_cache('/img/refer-friend/avatar-2.svg') }}" alt="">
                                <img class="img-04" src="{{ asset_no_cache('/img/refer-friend/avatar-3.svg') }}" alt="">
                                <img class="img-05" src="{{ asset_no_cache('/img/refer-friend/avatar-4.svg') }}" alt="">
                                <img class="img-06" src="{{ asset_no_cache('/img/refer-friend/avatar-5.svg') }}" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / Story item -->
            </div>
        </div>
    </section>

    @include('components.footer.main')
    @include('components.go_to_top_button')
@endsection
