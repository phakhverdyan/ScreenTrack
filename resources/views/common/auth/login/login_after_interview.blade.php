@extends('layouts.main_layout')

@push('styles')
    <link rel="stylesheet" type="text/css" href="{{ asset_no_cache('/css/login.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset_no_cache('/css/interview-completed.css') }}">
    <link rel="stylesheet" href="{{ asset_no_cache('css/vendor/selectize.bootstrap3.min.css') }}">
    <link rel="stylesheet" href="{{ asset_no_cache('css/vendor/selectize.modified.css') }}">
@endpush

@push('scripts')
@include('common.auth.login.partials.js')
<script src="{{ asset('js/vendor/selectize.min.js') }}"></script>
<script src="{{ asset('js/vendor/jquery.mask.min.js') }}"></script>
<script>

    $(function() {
        var $form = $('.gs-form__main');
        var $form_phone_locality_select = $form.find('[name="user_sign_up[user_locality_key]"]');
        var $form_phone_number_input = $form.find('[data-name="user_sign_up.user_phone_number"]');

        $form_phone_locality_select.removeClass('custom-select').selectize({
            // sortField: 'full_address',
            valueField: 'key',
            labelField: 'full_address',
            searchField: [ 'name', 'short_address', 'full_address' ],
            placeholder: 'City',
            // options: [],

            render: {
                item: function(item, escape) {
                    return (
                        '<div class="selectize-item + is-locality">' +
                        '<img src="/img/countries/flags/' + (item.country_code || '_') + '.png" alt="' + item.country_code + '" style="display: inline-block; vertical-align: middle;">' +
                        ' ' +
                        '<span class="name" style="display: inline-block; vertical-align: middle;">' + escape(item.full_address) + '</span>' +
                        '</div>'
                    );
                },

                option: function(item, escape) {
                    return (
                        '<div class="selectize-item + is-locality">' +
                        '<img src="/img/countries/flags/' + (item.country_code || '_') + '.png" alt="' + item.country_code + '" style="display: inline-block; vertical-align: middle;">' +
                        ' ' +
                        '<span class="name" style="display: inline-block; vertical-align: middle;">' + escape(item.full_address) + '</span>' +
                        '</div>'
                    );
                },
            },

            load: function(query, callback) {
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
                }, function(response) {
                    if (response.error) {
                        $.notify(response.error, 'error');
                        return callback();
                    }

                    return callback(response.data);
                });
            },

            onInitialize: function() {
                var selectize = this;
                selectize.$control_input.attr('autocomplete', 'st-disabled');

                var user_locality = false;

                if (window.auth && auth.user.locality) {
                    selectize.addOption([ auth.user.locality ]);
                    selectize.setValue([ auth.user.locality.key ]);
                } else if (user_locality) {
                    selectize.addOption([ user_locality ]);
                    selectize.setValue([ user_locality.key ]);
                } else {
                    client_locality(function(locality) {
                        if (!locality) {
                            return;
                        }

                        selectize.addOption([ locality ]);
                        selectize.setValue([ locality.key ]);
                    });
                }
            },

            onChange: function(item_id) {
                var selectize = this;

                if (!selectize.options[item_id]) {
                    return;
                }

                if (!$form_phone_number_input.prop('disabled')) {
                    $form_phone_number_input.val('');
                }

                $form_phone_number_input.mask(selectize.options[item_id].country.phone_number_mask, {
                    translation: {
                        'X': { pattern: /\d/ },
                        '0': null,
                        '9': null,
                    },

                    placeholder: selectize.options[item_id].country.phone_number_mask,
                });

                $form_phone_number_input.prop('disabled', false);
                $form_phone_number_input.focus();
            },
        });

        $form_phone_number_input.on('input', function() {
            if (!$form_phone_number_input.data('mask')) {
                return;
            }

            if ($form_phone_number_input.val().length < $form_phone_number_input.data('mask').mask.length) {
                return;
            }
        });

        function show_login_form(email) {
            $('#check_email_form').hide();
            $('#login_form').find('input.user_email').val(email);
            $('#login_form').show();
            $('#login_form').find('input.user_password').focus();
        }

        function show_register_form(email) {
            $('#check_email_form').hide();
            $('#register_form').find('input.user_email').val(email);
            $('#register_form').show();
            $('#register_form').find('input.first_name').focus();
        }

        $('#check_email_button').click(function (event) {
            event.preventDefault();
            $form = $('form#check_email_form');

            var $button = $(this);

            $button.addClass('is-loading disabled');

            request({
                url: '/is_user_registered',
                data: $form.serialize(),
            }, function(response) {
                $button.removeClass('is-loading disabled');
                if (new Validator($form, response).fails()) {
                    return;
                }

                if (response.error) {
                    $.notify(response.error);
                    return;
                }

                if (response.data.is_registered) {
                    show_login_form(response.data.email);
                } else {
                    show_register_form(response.data.email)
                }
            });
        });

        $('#register_button').click(function (event) {
            event.preventDefault();

            $form = $('form#register_form');
            var $button = $(this);
            $button.addClass('is-loading disabled');

            if ($form_phone_number_input.prop('disabled')) {
                $form.find('[name="user_sign_up[user_phone_number]"]').val('');
            } else {
                $form.find('[name="user_sign_up[user_phone_number]"]').val($form_phone_number_input.cleanVal());
            }

            request({
                url: '/sign_up/after_interview',
                data: $form.serialize(),
            }, function(response) {

                if (new Validator($form, response).fails()) {
                    return;
                }

                if (response.error) {
                    $.notify(response.error);
                    return;
                }
                var user_id = response.data.user_to_login.id;

                return request({
                    root: '',
                    url: '/login_using_api_token',
                    method: 'POST',
                    data: {
                        user_id: response.data.user_to_login.id,
                        api_token: response.data.user_to_login.api_token,
                        remember_me: 1,
                    },
                }, function(response) {
                    if (response.error) {
                        $.notify(response.error, 'error');
                        return;
                    }

                    if (localStorage.getItem('interviews_results_keys')) {
                        request({
                            url: '/interview_result/link_with_user',
                            method: 'POST',
                            data: {
                                user_id: user_id,
                                interviews_results_keys: JSON.parse(localStorage.getItem('interviews_results_keys') || '[]'),
                            },
                        }, function(response) {

                            if (response.error) {
                                $.notify(response.error, 'error');
                                return;
                            }

                            localStorage.removeItem('interviews_results_keys');

                            return;
                        });
                    }

                    window.location.href = '/dashboard';
                    return;
                });
            });
        });
    });

</script>
@endpush

@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-5 d-flex justify-content-center">

                <div class="[ login-form ]">
                    <div class="text-center">
                        <p>{{ __('auth/login_after_interview.almost_done') }}</p>
                        <h4 class="mb-3">{{ __('auth/login_after_interview.complete_your_interview') }}</h4>
                    </div>
                    <br/>
                    <h2 class="[ login-form__page-title ] text-center"></h2>
                    <div class="collapse" id="wrong" style="color: red;">{{ __('auth/login_after_interview.wrong_email_or_password') }}</div>
                    <form action="" id="check_email_form" class="[ login-form__main ]">
                        <div class="form-group mt-4">
                            <label for="email">{{ __('auth/login_after_interview.email') }}</label>
                            <input name="user[email]" data-name="user.email" type="text" class="form-control" aria-describedby="emailHelp" placeholder="{{ __('auth/login_after_interview.your_email_address') }}">
                            <div class="invalid-feedback"></div>
                        </div>
                        <div class="form-group mt-4 mb-5">
                            <button id="check_email_button" class="[ login-form__button ] btn btn-primary" type="submit">{{ __('auth/login_after_interview.complete_interview') }}</button>
                        </div>
                    </form>

                    <form action="" id="login_form" class="[ login-form__main ] collapse">
                        <h3>{{ __('auth/login_after_interview.you_already_have_screen_track_account') }}</h3>
                        <p>{{ __('auth/login_after_interview.enter_your_password') }}</p>
                        <div class="form-group mt-4">
                            <label for="email">{{ __('auth/login_after_interview.email') }}</label>
                            <input name="user[email]" data-name="user.email" type="text" class="form-control user_email" aria-describedby="emailHelp" placeholder="{{ __('auth/login_after_interview.your_email_address') }}">
                            <div class="invalid-feedback"></div>
                        </div>
                        <div class="form-group mt-4">
                            <label for="password">{{ __('auth/login_after_interview.password') }}</label>
                            <input name="user[password]" data-name="user.password" type="password" class="form-control user_password" id="password" aria-describedby="emailHelp" placeholder="{{ __('auth/login_after_interview.your_password') }}">
                            <div class="invalid-feedback"></div>
                        </div>
                        <div class="form-group mt-4 mb-5">
                            <button class="[ login-form__button ] btn btn-primary" type="submit"{{ __('auth/login_after_interview.login_complete_interview') }}</button>
                        </div>
                    </form>

                    <form id="register_form" class="[ gs-form__main ] pt-3 collapse" onsubmit="event.preventDefault();">
                        <h3>{{ __('auth/login_after_interview.you_dont_have_screen_track_account') }}</h3>
                        <p>{{ __('auth/login_after_interview.please_complete_registration') }}</p>
                        <div class="form-group mt-4">
                            <label for="email">{{ __('auth/login_after_interview.email') }}</label>
                            <input name="user_sign_up[user_email]" data-name="user_sign_up.user_email" type="text" class="form-control user_email" id="email" aria-describedby="emailHelp" placeholder="{{ __('auth/login_after_interview.your_email_address') }}">
                            <div class="invalid-feedback"></div>
                        </div>
                        <div class="form-row mb-3">
                            <div class="col">
                                <label for="registration-form__first-name">{{ __('auth/login_after_interview.first_name') }}</label>
                                <input type="text" class="form-control + is-first-capitalized first_name" id="registration-form__first-name" name="user_sign_up[user_first_name]" placeholder="{{ __('auth/login_after_interview.first_name') }}" data-name="user_sign_up.user_first_name" value="{{ $user_sign_up->user_first_name ?? '' }}">
                                <div class="invalid-feedback"></div>
                            </div>
                            <div class="col">
                                <label for="registration-form__last-name">{{ __('auth/login_after_interview.last_name') }}</label>
                                <input type="text" class="form-control + is-first-capitalized" id="registration-form__last-name" name="user_sign_up[user_last_name]" placeholder="{{ __('auth/login_after_interview.last_name') }}" data-name="user_sign_up.user_last_name" value="{{ $user_sign_up->user_last_name ?? '' }}">
                                <div class="invalid-feedback"></div>
                            </div>
                        </div>
                        <div class="form-row mt-4 mb-4">
                            <div class="col">
                                {{ __('auth/login_after_interview.information_for_interviewer_to_contact_you') }}
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="col">
                                <label for="registration-form__locality">{{ __('auth/login_after_interview.city') }}</label>
                                <select class="custom-select selectized" id="registration-form__locality" name="user_sign_up[user_locality_key]" data-name="user_sign_up.user_locality_key"></select>
                                <div class="invalid-feedback"></div>
                            </div>
                            <div class="col">
                                <label for="registration-form__phone-number">{{ __('auth/login_after_interview.phone_number') }}</label>
                                <input type="text" class="form-control" placeholder="Phone number" value="" disabled id="registration-form__phone-number" data-name="user_sign_up.user_phone_number">
                                <div class="invalid-feedback"></div>
                                <input type="hidden" name="user_sign_up[user_phone_number]">
                            </div>
                        </div>
                        <div class="form-group mt-4">
                            <button id="register_button" class="[ gs-form__main__button ] btn btn-primary +" type="submit" class="form-control">{{ __('auth/login_after_interview.register_complete_interview') }}</button>
                        </div>
                        <p class="required-text mt-4 mb-5">
                            {{ __('auth/login_after_interview.by_clicking_register_you_agree') }}
                            <a href="">{{ __('auth/login_after_interview.terms_of_service') }}</a> and <a href="">{{ __('auth/login_after_interview.privacy_policy') }}</a>
                        </p>
                        <input type="hidden" name="user_sign_up[choosen_plan_key]" value="">
                        <input type="hidden" name="user_sign_up[user_referrer_user_id]" value="">
                    </form>
                </div>
            </div>
            <div class="col-md-7 mt-5">
                <div class="[ complete-inteview__download-app ]">
                    <div class="[ complete-inteview__download-app__info ]">
                        <h4>{{ __('auth/login_after_interview.zero_commission_with_screen_track') }}</h4>
                        <span><img src="{{ asset_no_cache('img/check-mark-icon.svg') }}"><p class="mb-0">{{ __('auth/login_after_interview.free_tracker_with_screenshots') }}</p></span>
                        <span><img src="{{ asset_no_cache('img/check-mark-icon.svg') }}"><p class="mb-0">{{ __('auth/login_after_interview.free_payment_protection') }}</p></span>
                        <span><img src="{{ asset_no_cache('img/check-mark-icon.svg') }}"><p class="mb-0">{{ __('auth/login_after_interview.trello_style_project_kanban') }}</p></span>
                        <span><img src="{{ asset_no_cache('img/check-mark-icon.svg') }}"><p class="mb-0">{{ __('auth/login_after_interview.payoneer_paypal_payouts') }}</p></span>
                        <button class="btn btn-primary">{{ __('auth/login_after_interview.download_screen_track_app') }}</button>
                    </div>
                    <div class="[ complete-inteview__download-app__image ]">
                        <img src="{{ asset_no_cache('img/complete-interview.svg') }}" alt="">
                    </div>
                </div>
                <div class="[ complete-interview__affiliate-info ] mt-5">
                    <h4>Affiliate Info</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque porta nec elit at consequat. Interdum et malesuada fames ac ante ipsum primis in faucibus</p>

                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque porta nec elit at consequat. Interdum et malesuada fames ac ante ipsum primis in faucibus</p>
                </div>
            </div>
        </div>
    </div><!-- Body or container-fluid -->
@endsection
