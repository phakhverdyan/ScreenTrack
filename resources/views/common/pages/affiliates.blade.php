@extends('layouts.main_layout')

@push('meta')
    <title>{!! __('meta.affiliates.title') !!}</title>
    <meta name="description" content="{!! __('meta.affiliates.description') !!}">
@endpush

@push('styles')
    <link rel="stylesheet" href="{{ asset_no_cache('css/vendor/selectize.bootstrap3.min.css') }}">
    <link rel="stylesheet" href="{{ asset_no_cache('css/vendor/selectize.modified.css') }}">
    <link rel="stylesheet" href="{{ asset_no_cache('css/affiliates.css') }}">
@endpush

@push('scripts')
    <script src="{{ asset('js/vendor/selectize.min.js') }}"></script>
    <script src="{{ asset('js/vendor/jquery.mask.min.js') }}"></script>
    <script type="text/javascript"
            src="https://platform-api.sharethis.com/js/sharethis.js#property=5d7fca74ab6f1000123c8fce&product=inline-share-buttons"
            async="async"></script>
    <script>
        $(function () {
            var calculate = function (options) {
                options = options || {};
                var count_of_freelancers = parseInt($('#affiliates_freelancers_range').val());
                var count_of_employers = parseInt($('#affiliates_employers_range').val());
                var count_of_users = parseInt($('#affiliates_users_range').val());

                $('.affiliates_freelancers_value').text(count_of_freelancers);
                $('.affiliates_employers_value').text(count_of_employers);
                $('.affiliates_users_value').text(count_of_users);

                var final_amount = Math.ceil(
                    count_of_employers * 150
                    +
                    count_of_freelancers * 100
                    +
                    count_of_users * 50 * (count_of_employers + count_of_freelancers)
                );

                $('.affiliates_slider_price').text('$' + final_amount);

                if (options.animate) {
                    $('.affiliates_slider_price').removeClass('animated rubberBand');

                    setTimeout(function () {
                        $('.affiliates_slider_price').addClass('animated rubberBand');
                    });
                }
            };

            $('#affiliates_freelancers_range').on('input', function () {
                calculate({animate: true});
                $('.affiliates_freelancers_value_container').removeClass('animated rubberBand');

                setTimeout(function () {
                    $('.affiliates_freelancers_value_container').addClass('animated rubberBand');
                });
            });

            $('#affiliates_employers_range').on('input', function () {
                calculate({animate: true});
                $('.affiliates_employers_value_container').removeClass('animated rubberBand');

                setTimeout(function () {
                    $('.affiliates_employers_value_container').addClass('animated rubberBand');
                });
            });

            $('#affiliates_users_range').on('input', function () {
                calculate({animate: true});
                $('.affiliates_users_value_container').removeClass('animated rubberBand');

                setTimeout(function () {
                    $('.affiliates_users_value_container').addClass('animated rubberBand');
                });
            });

            calculate();

            // ---------------------------------------------------------------------- //

            $('.affiliates_step[data-number="1"]').submit(function (event) {
                var $form = $(this);
                event.preventDefault();
                $(this).find('button[type="submit"]').addClass('is-loading').prop('disabled', true);

                request({
                    url: '/register',
                    data: $(this).serialize(),
                }, function (response) {
                    $form.find('button[type="submit"]').removeClass('is-loading').prop('disabled', false);

                    if (new Validator($form, response).fails()) {
                        return;
                    }

                    if (response.error) {
                        $.notify(response.error, 'error');
                        return;
                    }

                    window.auth = {user: response.data};
                    $form.find('button[type="submit"]').addClass('is-loading').prop('disabled', true);

                    request({
                        root: '',
                        url: '/login_using_api_token',
                        method: 'POST',

                        data: {
                            user_id: response.data.id,
                            api_token: response.data.api_token,
                            remember_me: 1,
                        },
                    }, function (response) {
                        $form.find('button[type="submit"]').removeClass('is-loading').prop('disabled', false);

                        if (response.error) {
                            $.notify(response.error, 'error');
                            return;
                        }

                        $('.affiliates_step[data-number="1"]').collapse('hide');
                        $('.affiliates_step[data-number="2"]').collapse('show');
                        $('.affiliates_step[data-number="2"]').find('input[type="text"]:first').focus();
                        $('#affiliate_link_input').val("{{ route('index') }}?" + window.auth.user.id);
                        $('.sharethis-inline-share-buttons').attr('data-url', "{{ route('index') }}?" + window.auth.user.id);
                    });
                });
            });

            $('.affiliates_step[data-number="2"]').each(function () {
                var $form = $(this);
                var $form_user_locality_select = $form.find('[name="user_sign_up[user_locality_key]"]');
                var $form_user_phone_number_input = $form.find('[data-name="user_sign_up.user_phone_number"]');

                $form_user_locality_select.removeClass('custom-select').selectize({
                    // sortField: 'full_address',
                    valueField: 'key',
                    labelField: 'full_address',
                    searchField: ['name', 'short_address', 'full_address'],
                    placeholder: "Your city",
                    // options: [],

                    render: {
                        item: function (item, escape) {
                            return (
                                '<div class="selectize-item + is-locality">' +
                                '<img src="/img/countries/flags/' + (item.country_code || '_') + '.png" alt="' + item.country_code + '" style="display: inline-block; vertical-align: middle;">' +
                                ' ' +
                                '<span class="name" style="display: inline-block; vertical-align: middle;">' + escape(item.full_address) + '</span>' +
                                '</div>'
                            );
                        },

                        option: function (item, escape) {
                            return (
                                '<div class="selectize-item + is-locality">' +
                                '<img src="/img/countries/flags/' + (item.country_code || '_') + '.png" alt="' + item.country_code + '" style="display: inline-block; vertical-align: middle;">' +
                                ' ' +
                                '<span class="name" style="display: inline-block; vertical-align: middle;">' + escape(item.full_address) + '</span>' +
                                '</div>'
                            );
                        },
                    },

                    load: function (query, callback) {
                        if (query.length == 0) {
                            return callback();
                        }

                        return request({
                            url: '/localities/autocomplete',

                            data: {
                                query: query,
                                locale: locale(),
                                with_country: true,
                            },
                        }, function (response) {
                            if (response.error) {
                                $.notify(response.error, 'error');
                                return callback();
                            }

                            return callback(response.data);
                        });
                    },

                    onInitialize: function () {
                        var selectize = this;
                        selectize.$control_input.attr('autocomplete', 'st-disabled');

                        client_locality(function (locality) {
                            if (!locality) {
                                return;
                            }

                            selectize.addOption([locality]);
                            selectize.setValue([locality.key]);
                        });
                    },

                    onChange: function (item_id) {
                        var selectize = this;

                        if (!selectize.options[item_id]) {
                            return;
                        }

                        if (!$form_user_phone_number_input.prop('disabled')) {
                            $form_user_phone_number_input.val('');
                        }

                        $form_user_phone_number_input.mask(selectize.options[item_id].country.phone_number_mask, {
                            translation: {
                                'X': {pattern: /\d/},
                                '0': null,
                                '9': null,
                            },

                            placeholder: selectize.options[item_id].country.phone_number_mask,
                        });

                        $form_user_phone_number_input.prop('disabled', false);
                        $form_user_phone_number_input.focus();
                    },
                });

                $form_user_phone_number_input.on('input', function () {
                    if (!$form_user_phone_number_input.data('mask')) {
                        return;
                    }

                    if ($form_user_phone_number_input.val().length < $form_user_phone_number_input.data('mask').mask.length) {
                        return;
                    }

                    $form_company_name_input.focus();
                });
            });

            $('.affiliates_step[data-number="2"]').submit(function (event) {
                var $form = $(this);
                event.preventDefault();
                var $form_user_phone_number_input = $form.find('[data-name="user_sign_up.user_phone_number"]');

                if ($form_user_phone_number_input.prop('disabled')) {
                    $form.find('[name="user_sign_up[user_phone_number]"]').val('');
                } else {
                    $form.find('[name="user_sign_up[user_phone_number]"]').val($form_user_phone_number_input.cleanVal());
                }

                $(this).find('button[type="submit"]').addClass('is-loading').prop('disabled', true);

                request({
                    method: 'POST',
                    url: '/sign_up/set_account_details',
                    data: $(this).serialize(),
                }, function (response) {
                    $form.find('button[type="submit"]').removeClass('is-loading').prop('disabled', false);

                    if (new Validator($form, response).fails()) {
                        return;
                    }

                    if (response.error) {
                        $.notify(response.error, 'error');
                        return;
                    }

                    $('.affiliates_step[data-number="2"]').collapse('hide');
                    $('.affiliates_step[data-number="3"]').collapse('show');
                    $('.affiliates_step[data-number="3"]').find('input[type="text"]:first').focus();
                });
            });

            $('.affiliates_step[data-number="3"]').each(function () {
                $('input[name="payout_method[type]"]').change(function () {
                    if ($(this).val() == 'PAYPAL') {
                        $('input[name="payout_method[identifier]"]').attr('placeholder', "Enter your PayPal email");
                    } else if ($(this).val() == 'PAYONEER') {
                        $('input[name="payout_method[identifier]"]').attr('placeholder', "Enter your Payouneer email");
                    }

                    setTimeout(function () {
                        $('.affiliates_step[data-number="3"]').find('input[type="text"]:first').focus();
                    });
                });
            });

            $('.affiliates_step[data-number="3"]').submit(function (event) {
                var $form = $(this);
                event.preventDefault();
                $(this).find('button[type="submit"]').addClass('is-loading').prop('disabled', true);

                request({
                    method: 'POST',
                    url: '/payout_methods/create',
                    data: $(this).serialize(),
                }, function (response) {
                    $form.find('button[type="submit"]').removeClass('is-loading').prop('disabled', false);

                    if (new Validator($form, response).fails()) {
                        return;
                    }

                    if (response.error) {
                        $.notify(response.error, 'error');
                        return;
                    }

                    $('.affiliates_step[data-number="3"]').collapse('hide');
                    $('.affiliates_step[data-number="4"]').collapse('show');
                });
            });

            if (!window.auth) {
                $('.affiliates_step[data-number="1"]').addClass('show');
                // $('.affiliates_step[data-number="1"]').find('input[type="text"]:first').focus();
            } else if (window.auth.user.initial_stage) {
                $('.affiliates_step[data-number="2"]').addClass('show');
            } else if (!window.auth.user.default_payout_method) {
                $('.affiliates_step[data-number="3"]').addClass('show');
                // $('.affiliates_step[data-number="2"]').find('input[type="text"]:first').focus();
            } else {
                $('.affiliates_step[data-number="4"]').addClass('show');
            }

            // ---------------------------------------------------------------------- //

            $('#affiliate_link_copy_button').click(function (event) {
                event.preventDefault();
                copy_text_to_clipboard($('#affiliate_link_input').val());
                $.notify('Copied!', 'success');
            });
        });
    </script>
@endpush

@section('content')
    @include('components.navbar.main')

    <div class="[ affiliates ] mb-5">
        <div class="container">
            <h2 class="d-flex align-items-start mt-lg-5 justify-content-center text-center [ affiliates_title ]">
                <img src="{{ asset_no_cache('img/affiliates/money.svg') }}" width="50" alt="" class="mr-lg-3">
                {!! __('pages/affiliates.see_profit') !!}
            </h2>
            <!-- RANGE SLIDERS -->
            <div
                class="[ affiliates_slider ] d-flex flex-lg-row flex-column justify-content-between align-items-center pt-lg-5">
                <div class="col-lg-3 px-lg-4">
                    <div>
                        <p class="affiliates_freelancers_value_container text-center h4 d-lg-block d-none">
                            <span
                                class="affiliates_freelancers_value d-inline-block">6</span> {!! __('pages/affiliates.up_freelancers') !!}
                        </p>
                        <p class="text-center d-lg-block d-none" style="font-size: 13px;">
                            {!! __('pages/affiliates.profit_per_user',[
                                'cost' => '100',
                            ]) !!}
                        </p>
                        <p class="text-left mt-3 mb-0 d-lg-none d-block" style="font-size: 13px;">
                            {!! __('pages/affiliates.how_many_u_can_refer', [
                                'type' => __('pages/affiliates.freelancers')
                            ]) !!}
                        </p>
                        <input type="range" value="6" min="1" max="10" step="1" id="affiliates_freelancers_range">
                        <p class="affiliates_freelancers_value_container d-inline-block h4 ml-3">
                            <span class="d-lg-none d-block">
                                <b class="affiliates_freelancers_value d-inline-block">6</b>
                            </span>
                        </p>
                    </div>
                    <p class="text-center mt-3  d-lg-block d-none">
                        {!! __('pages/affiliates.how_many_u_can_refer', [
                            'type' => __('pages/affiliates.freelancers'),
                            'separator' => '</br>',
                        ]) !!}
                    </p>
                </div>
                <div class="col-lg-3 px-lg-4">
                    <div>
                        <p class="affiliates_employers_value_container text-center h4 d-lg-block d-none">
                            <span class="affiliates_employers_value d-inline-block">1</span>  {!! __('pages/affiliates.up_employers') !!}
                        </p>
                        <p class="text-center d-lg-block d-none" style="font-size: 13px;">
                            {!! __('pages/affiliates.profit_per_user',[
                                'cost' => '150',
                            ]) !!}
                        </p>
                        <p class="text-left mt-3 mb-0 d-lg-none d-block" style="font-size: 13px;">
                            {!! __('pages/affiliates.how_many_u_can_refer', [
                                'type' => __('pages/affiliates.employers')
                            ]) !!}
                        </p>
                        <input type="range" value="1" min="0" max="10" step="1" id="affiliates_employers_range">
                        <p class="affiliates_employers_value_container d-inline-block h4 ml-3">
                            <span class="d-lg-none d-block">
                                <b class="affiliates_employers_value d-inline-block">1</b>
                            </span>
                        </p>
                    </div>
                    <p class="text-center mt-3 d-lg-block d-none">
                        {!! __('pages/affiliates.how_many_u_can_refer', [
                            'type' => __('pages/affiliates.employers'),
                            'separator' => '</br>',
                        ]) !!}
                    </p>
                </div>
                <div class="col-lg-3 px-lg-4">
                    <div>
                        <p class="affiliates_users_value_container text-center h4 d-lg-block d-none">
                            <span class="affiliates_users_value d-inline-block">2</span>  {!! __('pages/affiliates.up_users') !!}
                        </p>
                        <p class="text-center d-lg-block d-none" style="font-size: 13px;">
                            {!! __('pages/affiliates.profit_per_user',[
                                'cost' => '50',
                            ]) !!}
                        </p>
                        <p class="text-left mt-3 mb-0 d-lg-none d-block" style="font-size: 13px;">
                            {!! __('pages/affiliates.how_many_u_can_refer', [
                                'type' => __('pages/affiliates.users')
                            ]) !!}
                        </p>
                        <input type="range" value="2" min="0" max="10" step="1" id="affiliates_users_range">
                        <p class="affiliates_users_value_container d-inline-block h4 ml-3">
                            <span class="d-lg-none d-block">
                                <b class="affiliates_users_value d-inline-block">2</b>
                            </span>
                        </p>
                    </div>
                    <p class="text-center mt-3 d-lg-block d-none">
                        {!! __('pages/affiliates.how_many_u_can_refer', [
                            'type' => __('pages/affiliates.users'),
                            'separator' => '</br>',
                        ]) !!}
                    </p>
                </div>
                <div
                    class="[ affiliates_slider_estimated ] col-lg-3 text-lg-right text-center mt-lg-0 mt-4 text-nowrap">
                    <p class="mb-lg-3 mb-0">{!! __('pages/affiliates.estimated_earnings') !!}</p>
                    <span class="[ affiliates_slider_price ] d-inline-block">$1450</span>
                    <b class="text-nowrap">{!! __('pages/affiliates.usd_weekly') !!}</b>
                </div>
            </div>
            <!-- /RANGE SLIDER -->
            <div class="row mt-3">
                <div class="col-lg-5">
                    <!-- 1 STEP -->
                    <form class="[ affiliates_step ] collapse" data-number="1">
                        <div class="[ affiliates_step_content ]">
                            <div class="[ affiliates_step_number ]">1</div>
                            <p class="h3">
                                {!! __('pages/affiliates.get_started') !!}
                                <img src="{{ asset_no_cache('img/curved-arrow.svg') }}" alt=""
                                     style="width: 30px; margin-top: 7px; transform: scale(-1, 1) rotate(171deg);">
                            </p>
                            <div class="form-group mt-3">
                                <input type="text" name="user[email]" placeholder="{!! __('pages/affiliates.email_placeholder') !!}"
                                       class="form-control" data-name="user.email">
                                <div class="invalid-feedback"></div>
                            </div>
                            <p>
                                <button type="submit" class="btn btn-primary btn-block btn-custom"
                                        style="font-size: 1.4rem;">
                                    {!! __('pages/affiliates.activate_affiliate_link') !!}
                                    <img src="{{ asset_no_cache('img/launch.svg') }}"
                                         style="margin-left: 5px; margin-top: -3px; width: 30px; animation: float-launch-icon 5s infinite;"
                                         alt="">
                                </button>
                            </p>
                        </div>
                        <input type="hidden" name="user[choosen_plan_key]" value="user.free_190612">
                        <input type="hidden" name="form" value="affiliates">
                    </form>
                    <!-- /1 STEP -->
                    <!-- 2 STEP -->
                    <form class="[ affiliates_step ] collapse" data-number="2">
                        <div class="[ affiliates_step_content ]">
                            <div class="[ affiliates_step_number ]">2</div>
                            <p>{!! __('pages/affiliates.fill_your_information') !!}</p>
                            <!-- <div class="mt-3 mb-2"> -->
                            <div class="form-row flex-md-row flex-column mb-3">
                                <div class="col">
                                    <label for="registration-form__first-name">First Name</label>
                                    <input type="text" class="form-control + is-first-capitalized"
                                           id="registration-form__first-name" name="user_sign_up[user_first_name]"
                                           placeholder="First name" data-name="user_sign_up.user_first_name" value="">
                                    <div class="invalid-feedback"></div>
                                </div>
                                <div class="col mt-md-0 mt-3">
                                    <label for="registration-form__last-name">Last Name</label>
                                    <input type="text" class="form-control + is-first-capitalized"
                                           id="registration-form__last-name" name="user_sign_up[user_last_name]"
                                           placeholder="Last name" data-name="user_sign_up.user_last_name" value="">
                                    <div class="invalid-feedback"></div>
                                </div>
                            </div>
                            <div class="form-row flex-md-row flex-column mb-3">
                                <div class="col">
                                    <label for="registration-form__locality">Your city</label>
                                    <select class="custom-select selectized" id="registration-form__locality"
                                            name="user_sign_up[user_locality_key]"
                                            data-name="user_sign_up.user_locality_key"></select>
                                    <div class="invalid-feedback"></div>
                                </div>
                                <div class="col mt-md-0 mt-3">
                                    <label for="registration-form__phone-number">Your phone number</label>
                                    <input type="text" class="form-control" placeholder="Your phone number" value=""
                                           disabled id="registration-form__phone-number"
                                           data-name="user_sign_up.user_phone_number">
                                    <div class="invalid-feedback"></div>
                                    <input type="hidden" name="user_sign_up[user_phone_number]">
                                </div>
                            </div>
                            <p>
                                <button type="submit" class="btn btn-primary btn-block btn-custom">
                                    {!! __('pages/affiliates.choose_pay_way') !!}
                                    <img src="{{ asset_no_cache('img/finger.svg') }}"
                                         style="width: 25px; margin-top: -5px; transform: rotate(90deg); margin-left: 5px;"
                                         alt="">
                                </button>
                            </p>
                        </div>
                    </form>
                    <!-- /2 STEP -->
                    <!-- 3 STEP -->
                    <form class="[ affiliates_step ] collapse" data-number="3">
                        <div class="[ affiliates_step_content ]">
                            <div class="[ affiliates_step_number ]">3</div>
                            <p>{!! __('pages/affiliates.how_we_pay') !!}</p>
                            <div class="d-flex align-items-center mt-3">
                                <div class="btn-group btn-group-toggle justify-content-around w-100"
                                     data-toggle="buttons">
                                    <label class="btn col-4 py-0 [ affiliates_step_content_payment-type ] active">
                                        <input type="radio" name="payout_method[type]" value="PAYPAL" autocomplete="off"
                                               checked>
                                        <img src="{{ asset_no_cache('img/check-mark.grey.svg') }}" width="20"
                                             alt="payoneer" class="[ checked ] mr-2">
                                        <img src="{{ asset_no_cache('img/affiliates/paypal_logo.png') }}" width="100%"
                                             alt="PayPal">
                                    </label>
                                    <label class="btn col-4 py-0 [ affiliates_step_content_payment-type ]">
                                        <input type="radio" name="payout_method[type]" value="PAYONEER"
                                               autocomplete="off">
                                        <img src="{{ asset_no_cache('img/check-mark.grey.svg') }}" width="20"
                                             alt="payoneer" class="[ checked ] mr-2">
                                        <img src="{{ asset_no_cache('img/affiliates/payoneer-logo.png') }}" width="100%"
                                             alt="Payoneer">
                                    </label>
                                </div>
                            </div>
                            <div class="mt-3 mb-2">
                                <input type="text" name="payout_method[identifier]"
                                       placeholder="Enter Your Paypal email" class="form-control"
                                       data-name="payout_method.identifier">
                                <div class="invalid-feedback"></div>
                            </div>
                            <p>
                                <button type="submit" class="btn btn-primary btn-block btn-custom">
                                    Get my Link
                                    <img src="{{ asset_no_cache('img/finger.svg') }}"
                                         style="width: 25px; margin-top: -5px; transform: rotate(90deg); margin-left: 5px;"
                                         alt="">
                                </button>
                            </p>
                        </div>
                    </form>
                    <!-- /3 STEP -->
                    <!-- 4 STEP -->
                    <div class="[ affiliates_step ] collapse" data-number="4">
                        <div class="[ affiliates_step_content ]">
                            <div class="[ affiliates_step_number ]">4</div>
                            <p class="mb-2">Here's your affiliate link:</p>
                            <div class="mb-3" style="position: relative;">
                                <input class="form-control" value="{{ route('index') }}?{{ auth()->user()->id ?? '0' }}"
                                       id="affiliate_link_input">
                                <button class="btn btn-primary btn-sm"
                                        style="position: absolute; top: 4px; right: 4px; height: 30px;"
                                        id="affiliate_link_copy_button">Copy
                                </button>
                            </div>
                            <p>To start earning, share your referral link to all your freelancers/employer contacts</p>
                            <div class="sharethis-inline-share-buttons"
                                 data-url="{{ route('index') }}?{{ auth()->user()->id ?? '0' }}"></div>
                            <div class="mt-4">
                                <a href="{{ route('dashboard.referrals') }}"
                                   class="btn btn-primary btn-block btn-custom">
                                    Go to Affiliate Section
                                    <img src="{{ asset_no_cache('img/finger.svg') }}"
                                         style="width: 25px; margin-top: -5px; transform: rotate(90deg); margin-left: 5px;"
                                         alt="">
                                </a>
                            </div>
                        </div>
                    </div>
                    <!-- /4 STEP -->
                </div>
                <div class="col-lg-7 mt-lg-0 mt-5 ">
                    <div class="[ affiliates_video ]"></div>
                </div>
            </div>

        </div>
    </div>

    @include('components.footer.main')
@endsection
