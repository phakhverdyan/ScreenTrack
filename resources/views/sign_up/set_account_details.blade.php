@extends('layouts.main_layout')

@push('meta')
    <title>{!! __('meta.set_account_details.title') !!}</title>
    <meta name="description" content="{!! __('meta.set_account_details.description') !!}">
    <meta name="keywords" content="{!! __('meta.set_account_details.keywords') !!}">
@endpush

@push('styles')
    <link rel="stylesheet" href="{{ asset_no_cache('css/vendor/selectize.bootstrap3.min.css') }}">
    <link rel="stylesheet" href="{{ asset_no_cache('css/vendor/selectize.modified.css') }}">
@endpush

@push('scripts')
    <script src="{{ asset('js/vendor/selectize.min.js') }}"></script>
    <script src="{{ asset('js/vendor/jquery.mask.min.js') }}"></script>
    <script>
        var user_locality = @json($user_locality);
        var choosen_plan = @json($choosen_plan);

        $(function() {
            var $form = $('.gs-form__main');
            var $form_user_locality_select = $form.find('[name="user_sign_up[user_locality_key]"]');
            var $form_user_phone_number_input = $form.find('[data-name="user_sign_up.user_phone_number"]');
            var $form_user_professional_title_input = $form.find('[data-name="user_sign_up.user_professional_title"]');
            var $form_submit_button = $form.find('.btn[type="submit"]');
            var $form_company_name_input = $form.find('[name="user_sign_up[company_name]"]');
            var $form_company_locality_select = $form.find('[name="user_sign_up[company_locality_key]"]');
            var $form_company_phone_number_input = $form.find('[data-name="user_sign_up.company_phone_number"]');

            $form.submit(function(event) {
                event.preventDefault();

                if ($form_submit_button.hasClass('is-loading')) {
                    return;
                }

                $form_submit_button.addClass('is-loading disabled');

                if ($form_user_phone_number_input.prop('disabled')) {
                    $form.find('[name="user_sign_up[user_phone_number]"]').val('');
                } else {
                    $form.find('[name="user_sign_up[user_phone_number]"]').val($form_user_phone_number_input.cleanVal());
                }

                if (choosen_plan.account_type == 'Company') {
                    if ($form_company_phone_number_input.prop('disabled')) {
                        $form.find('[name="user_sign_up[company_phone_number]"]').val('');
                    } else {
                        $form.find('[name="user_sign_up[company_phone_number]"]').val($form_company_phone_number_input.cleanVal());
                    }
                }

                request({
                    method: 'POST',
                    url: '/sign_up/set_account_details',
                    data: $(this).serialize(),
                }, function(response) {
                    $form_submit_button.removeClass('is-loading disabled');

                    if (new Validator($form, response).fails()) {
                        return;
                    }

                    if (response.error == 'Not Found') {
                        window.location.reload();
                        return;
                    }

                    if (response.error) {
                        $.notify(response.error);
                        return;
                    }

                    $form_submit_button.addClass('is-loading disabled');

                    if (!response.data.next_sign_up_stage) {
                        if (!response.data.user_to_login) {
                            window.location.href = '/dashboard';
                            return;
                        }

                        // link_interviews_results_with_user(response.data.user_to_login.id);

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

                            window.location.href = '/dashboard';
                            return;
                        });
                    }

                    if (!response.data.user_to_login) {
                        window.location.href = '/sign-up/choose-addons';
                        return;
                    }

                    // link_interviews_results_with_user(response.data.user_to_login.id);

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

                        window.location.href = '/sign-up/choose-addons';
                        return;
                    });
                });
            });

            $form_user_locality_select.removeClass('custom-select').selectize({
                // sortField: 'full_address',
                valueField: 'key',
                labelField: 'full_address',
                searchField: [ 'name', 'short_address', 'full_address' ],
                placeholder: "{{ __('sign_up/set_account_details.your_city') }}",
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

                    if (!$form_user_phone_number_input.prop('disabled')) {
                        $form_user_phone_number_input.val('');
                    }

                    $form_user_phone_number_input.mask(selectize.options[item_id].country.phone_number_mask, {
                        translation: {
                            'X': { pattern: /\d/ },
                            '0': null,
                            '9': null,
                        },

                        placeholder: selectize.options[item_id].country.phone_number_mask,
                    });

                    $form_user_phone_number_input.prop('disabled', false);
                    $form_user_phone_number_input.focus();
                },
            });

            $form_user_phone_number_input.on('input', function() {
                if (!$form_user_phone_number_input.data('mask')) {
                    return;
                }

                if ($form_user_phone_number_input.val().length < $form_user_phone_number_input.data('mask').mask.length) {
                    return;
                }

                $form_user_professional_title_input.focus();
            });

            if (choosen_plan.account_type == 'Company') {
                $form_company_locality_select.removeClass('custom-select').selectize({
                    // sortField: 'full_address',
                    valueField: 'key',
                    labelField: 'full_address',
                    searchField: [ 'name', 'short_address', 'full_address' ],
                    placeholder: "{{ __('sign_up/set_account_details.company_city') }}",
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

                        if (!$form_company_phone_number_input.prop('disabled')) {
                            $form_company_phone_number_input.val('');
                        }

                        $form_company_phone_number_input.mask(selectize.options[item_id].country.phone_number_mask, {
                            translation: {
                                'X': { pattern: /\d/ },
                                '0': null,
                                '9': null,
                            },

                            placeholder: selectize.options[item_id].country.phone_number_mask,
                        });

                        $form_company_phone_number_input.prop('disabled', false);
                        $form_company_phone_number_input.focus();
                    },
                });
            }

            $form.find('input, textarea').each(function () {
                if (!$(this).val()) {
                    $(this).focus();
                    return false;
                }
            });

            // function link_interviews_results_with_user(user_id) {
            //     if (localStorage.getItem('interviews_results_keys')) {
            //         request({
            //             url: '/interview_result/link_with_user',
            //             method: 'POST',
            //             data: {
            //                 user_id: user_id,
            //                 interviews_results_keys: JSON.parse(localStorage.getItem('interviews_results_keys') || '[]'),
            //             },
            //         }, function(response) {

            //             if (response.error) {
            //                 $.notify(response.error, 'error');
            //                 return;
            //             }

            //             localStorage.removeItem('interviews_results_keys');

            //             return;
            //         });
            //     }
            // }
        });
    </script>
@endpush

@section('content')
    @include('components.navbar.sign_up')

    <div class="container-fluid">
        <div class="[ gs__wrapper ]">
            <div class="[ gs__wrapper ] row">
                <div class="col d-flex justify-content-center">
                    <div class="[ gs-form ] pt-5">
                        <div class="text-center mb-5">
                            <img src="{{ asset_no_cache('img/goal.svg') }}" alt="" style="width: 80px;">
                        </div>
                        <h2 class="[ gs-form__page-title ] text-center">
                            {{ __('sign_up/set_account_details.please_complete_your_account') }}
                        </h2>
                        <form class="[ gs-form__main ] pt-3" onsubmit="event.preventDefault();">
                            @if (!$user)
                                <div class="form-group">
                                    <label for="registration-form__email">{{ __('sign_up/set_account_details.your_email') }}</label>
                                    <input type="text" class="form-control" id="registration-form__email" name="user_sign_up[user_email]" placeholder="{{ __('sign_up/set_account_details.your_email') }}" data-name="user_sign_up.user_email">
                                    <div class="invalid-feedback"></div>
                                </div>
                            @endif
                            <div class="form-row flex-md-row flex-column mb-3">
                                <div class="col">
                                    <label
                                        for="registration-form__first-name">{{ __('sign_up/set_account_details.first_name') }}</label>
                                    <input type="text" class="form-control + is-first-capitalized"
                                           id="registration-form__first-name" name="user_sign_up[user_first_name]"
                                           placeholder="{{ __('sign_up/set_account_details.first_name') }}"
                                           data-name="user_sign_up.user_first_name"
                                           value="{{ $user_sign_up->user_first_name ?? $user->first_name ?? '' }}">
                                    <div class="invalid-feedback"></div>
                                </div>
                                <div class="col mt-md-0 mt-3">
                                    <label
                                        for="registration-form__last-name">{{ __('sign_up/set_account_details.last_name') }}</label>
                                    <input type="text" class="form-control + is-first-capitalized"
                                           id="registration-form__last-name" name="user_sign_up[user_last_name]"
                                           placeholder="{{ __('sign_up/set_account_details.last_name') }}"
                                           data-name="user_sign_up.user_last_name"
                                           value="{{ $user_sign_up->user_last_name ?? $user->last_name ?? '' }}">
                                    <div class="invalid-feedback"></div>
                                </div>
                            </div>
                            <div class="form-row flex-md-row flex-column mb-3">
                                <div class="col">
                                    <label for="registration-form__locality">
                                        {{ __('sign_up/set_account_details.your_city') }}
                                    </label>
                                    <select
                                        class="custom-select selectized" id="registration-form__locality"
                                        name="user_sign_up[user_locality_key]"
                                        data-name="user_sign_up.user_locality_key"
                                    ></select>
                                    <div class="invalid-feedback"></div>
                                </div>
                                <div class="col mt-md-0 mt-3">
                                    <label for="registration-form__phone-number">
                                        {{ __('sign_up/set_account_details.your_phone_number') }}
                                    </label>
                                    <input
                                        type="text" class="form-control"
                                        placeholder="{{ __('sign_up/set_account_details.your_phone_number') }}"
                                        value="{{ $user_sign_up->user_phone_number ?? '' }}" disabled
                                        id="registration-form__phone-number"
                                        data-name="user_sign_up.user_phone_number"
                                    >
                                    <div class="invalid-feedback"></div>
                                    <input type="hidden" name="user_sign_up[user_phone_number]">
                                </div>
                            </div>
                            @if ($choosen_plan->account_type == 'User')
                                <div class="form-row flex-md-row flex-column mb-3">
                                    <div class="col">
                                        <label for="registration-form__professional-title">
                                            {!! __('sign_up/set_account_details.professional_title') !!}
                                        </label>
                                        <input
                                            type="text" class="form-control"
                                            id="registration-form__professional-title"
                                            name="user_sign_up[user_professional_title]"
                                            placeholder="{!! __('sign_up/set_account_details.professional_title_placeholder') !!}"
                                            data-name="user_sign_up.user_professional_title"
                                            value="{{ $user_sign_up->user_professional_title ?? $user->professional_title ?? '' }}"
                                        >
                                        <div class="invalid-feedback"></div>
                                    </div>
                                    <div class="col mt-md-0 mt-3" style="max-width: 180px;">
                                            <label for="registration-form__hourly-rate">
                                                {!! __('sign_up/set_account_details.hourly_rate') !!}
                                            </label>
                                            <div class="form-control-group + has-prefix has-postfix" style="position: relative;">
                                                <span class="form-control-group__prefix">$</span>
                                                <input
                                                    value=""
                                                    name="user_sign_up[user_hourly_rate]"
                                                    data-name="user_sign_up.user_hourly_rate"
                                                    class="form-control text-right"
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    max="999"
                                                    placeholder="0"
                                                    id="registration-form__hourly-rate"
                                                >
                                                <span class="form-control-group__postfix">/h</span>
                                            </div>
                                            <div class="invalid-feedback"></div>
                                        </div>
                                </div>
                                <div class="form-row flex-md-row flex-column mb-3">
                                <div class="col">
                                    <label for="registration-form__skype">
                                        {!! __('sign_up/set_account_details.skype') !!}
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="registration-form__skype"
                                        name="user_sign_up[user_skype]"
                                        placeholder="{!! __('sign_up/set_account_details.skype_placeholder') !!}"
                                        data-name="user_sign_up.user_skype"
                                        value="{{ $user_sign_up->user_skype ?? $user->skype ?? '' }}"
                                    >
                                    <div class="invalid-feedback"></div>
                                </div>
                            </div>
                            @elseif ($choosen_plan->account_type == 'Company')
                                <div class="form-row flex-md-row flex-column mb-3">
                                    <div class="col">
                                        <label for="registration-form__professional-title">
                                            {!! __('sign_up/set_account_details.professional_title') !!}
                                        </label>
                                        <input
                                            type="text" class="form-control"
                                            id="registration-form__professional-title"
                                            name="user_sign_up[user_professional_title]"
                                            placeholder="{!! __('sign_up/set_account_details.professional_title_placeholder') !!}"
                                            data-name="user_sign_up.user_professional_title"
                                            value="{{ $user_sign_up->user_professional_title ?? $user->professional_title ?? '' }}"
                                        >
                                        <div class="invalid-feedback"></div>
                                    </div>
                                    <div class="col mt-md-0 mt-3">
                                        <label for="registration-form__skype">
                                            {!! __('sign_up/set_account_details.skype') !!}
                                        </label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="registration-form__skype"
                                            name="user_sign_up[user_skype]"
                                            placeholder="{!! __('sign_up/set_account_details.skype_placeholder') !!}"
                                            data-name="user_sign_up.user_skype"
                                            value="{{ $user_sign_up->user_skype ?? $user->skype ?? '' }}"
                                        >
                                        <div class="invalid-feedback"></div>
                                    </div>
                                </div>
                                <hr class="mt-4">
                                <div class="form-row flex-md-row flex-column mb-3">
                                    <div class="col">
                                        <label for="registration-form__company-name">
                                            {{ __('sign_up/set_account_details.company_name') }}
                                        </label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="registration-form__company-name"
                                            name="user_sign_up[company_name]"
                                            placeholder="{{ __('sign_up/set_account_details.company_name') }}"
                                            data-name="user_sign_up.company_name"
                                            value="{{ $user_sign_up->company_name ?? '' }}"
                                        >
                                        <div class="invalid-feedback"></div>
                                    </div>
                                    <div class="col mt-md-0 mt-3">
                                        <label for="registration-form__company-size">
                                            {{ __('sign_up/set_account_details.company_size') }}
                                        </label>
                                        <select
                                            class="form-control"
                                            name="user_sign_up[company_size_key]"
                                            id="registration-form__company-size"
                                            data-name="user_sign_up.company_size_key"
                                        >
                                            @foreach ($company_sizes as $current_company_size)
                                                <option
                                                    value="{{ $current_company_size->key }}"
                                                    {{ $current_company_size->key == ($user_sign_up->company_size_key ?? 'small') ? 'selected' : '' }}
                                                >
                                                    {{ $current_company_size->title }}
                                                </option>
                                            @endforeach
                                        </select>
                                        <div class="invalid-feedback"></div>
                                    </div>
                                </div>
                                <div class="form-row flex-md-row flex-column mb-3">
                                    <div class="col">
                                        <label for="registration-form__locality">
                                            {{ __('sign_up/set_account_details.company_city') }}
                                        </label>
                                        <select
                                            class="custom-select selectized"
                                            id="registration-form__company-locality"
                                            name="user_sign_up[company_locality_key]"
                                            data-name="user_sign_up.company_locality_key"
                                        ></select>
                                        <div class="invalid-feedback"></div>
                                    </div>
                                    <div class="col mt-md-0 mt-3">
                                        <label for="registration-form__phone-number">
                                            {{ __('sign_up/set_account_details.company_phone_number') }}
                                        </label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            placeholder="{{ __('sign_up/set_account_details.company_phone_number') }}"
                                            value="{{ $user_sign_up->company_phone_number ?? '' }}"
                                            disabled
                                            id="registration-form__company-phone-number"
                                            data-name="user_sign_up.company_phone_number"
                                        >
                                        <div class="invalid-feedback"></div>
                                        <input type="hidden" name="user_sign_up[company_phone_number]">
                                    </div>
                                </div>
                            @endif
                            <div class="form-group mt-4">
                                <button class="[ gs-form__main__button ] btn btn-primary +" type="submit" class="form-control">
                                    {!! __('sign_up/set_account_details.continue') !!}
                                </button>
                            </div>
                            <p class="required-text mt-4 mb-5">
                                {!! __('sign_up/set_account_details.by_clicking_register_you_agree', [
                                    'terms_url' => route('terms', locale()),
                                    'privacy_url' => route('privacy', locale()),
                                ]) !!}
                            </p>
                            <input type="hidden" name="user_sign_up[choosen_plan_key]" value="{{ $choosen_plan->key }}">
                            <input type="hidden" name="user_sign_up[user_referrer_user_id]" value="{{ $referrer_user_id ?? '0' }}">
                        </form>
                    </div>
                    <!-- / gs-from -->
                </div>
                @if (FALSE && $choosen_plan->account_type == 'Company')
                    <div class="col-md-4">
                        @include('sign_up.components.checkout')
                    </div>
                @endif
            </div>
        </div>
    </div>
@endsection
