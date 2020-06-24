@extends('layouts.main_layout')

@push('meta')
    <title>{!! __('meta.start_trial.title') !!}</title>
    <meta name="description" content="{!! __('meta.start_trial.description') !!}">
    <meta name="keywords" content="{!! __('meta.start_trial.keywords') !!}">
@endpush

@push('styles')
    <link rel="stylesheet" href="{{ asset_no_cache('css/vendor/selectize.bootstrap3.min.css') }}">
    <link rel="stylesheet" href="{{ asset_no_cache('css/vendor/selectize.modified.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset_no_cache('/css/stripe.css') }}">
@endpush

@push('scripts')
    <script src="https://js.stripe.com/v3/"></script>
    <script>
        window.stripe = Stripe("{{ env('STRIPE_PUBLIC_KEY') }}");
    </script>
    <script src="{{ asset('js/vendor/selectize.min.js') }}"></script>
    <script>
    	$(function() {
            var user_locality = {!! json_encode($user_locality->toArray()) !!};
            var $form = $('.gs-start-trial__main');
            var $form_submit_button = $form.find('button[type="submit"]');
            var card = null;

    		$form.submit(function(event) {
    			event.preventDefault();
                $form_submit_button.addClass('is-loading disabled');
                Validator.clear($form);

                stripe.createToken(card).then(function(result) {
                    if (result.error) {
                        $form_submit_button.removeClass('is-loading disabled');
                        $('#card-errors').text(result.error.message);
                        return;
                    }

                    $('[name="user_sign_up[stripe_token_id]"]').val(result.token.id);

                    request({
                        method: 'POST',
                        url: '/sign_up/start_trial',
                        data: $form.serialize(),
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
                            $.notify(response.error, 'error');
                            return;
                        }

                        if (response.data.next_sign_up_stage) {
                            return;
                        }

                        $form_submit_button.addClass('is-loading disabled');
                        window.location.href = '/setup/create-contact-lists';
                    });
                });
    		});

            $('#sign-up-form__company-locality-key').removeClass('custom-select').selectize({
                valueField: 'key',
                labelField: 'full_address',
                searchField: [ 'name', 'short_address', 'full_address' ],
                placeholder: 'Company location',

                render: {
                    item: function(item, escape) {
                        return (
                            '<div class="selectize-item">' +
                                '<img src="/img/countries/flags/' + (item.country_code || '_') + '.png" alt="' + item.country_code + '" style="display: inline-block; vertical-align: middle;">' +
                                ' ' +
                                '<span class="name" style="display: inline-block; vertical-align: middle;">' + escape(item.full_address) + '</span>' +
                            '</div>'
                        );
                    },

                    option: function(item, escape) {
                        return (
                            '<div class="selectize-item">' +
                                '<img src="/img/countries/flags/' + (item.country_code || '_') + '.png" alt="' + item.country_code + '" style="display: inline-block; vertical-align: middle;">' +
                                ' ' +
                                '<span class="name" style="display: inline-block; vertical-align: middle;">' + escape(item.full_address) + '</span>' +
                            '</div>'
                        );
                    },
                },

                load: function(string, callback) {
                    if (string.length == 0) {
                        return callback();
                    }

                    return request({
                        url: '/localities/autocomplete',

                        data: {
                            query: string,
                            locale: locale(),
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
                    if (user_locality) {
                        this.addOption([ user_locality ]);
                        this.setValue([ user_locality.key ]);
                    }
                },
            });

            (function initialize_stripe_input($form) {
                var elements = stripe.elements();

                var style = {
                    base: {
                        color: '#32325d',
                        lineHeight: '18px',
                        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                        fontSmoothing: 'antialiased',
                        fontSize: '16px',

                        '::placeholder': {
                            color: '#aab7c4'
                        },
                    },

                    invalid: {
                        color: '#fa755a',
                        iconColor: '#fa755a',
                    },
                };

                card = elements.create('card', { style: style });
                card.mount($form.find('.stripe-card-element')[0] || null);

                card.addEventListener('change', function(event) {
                    if (event.error) {
                        $form.find('.stripe-card-errors').text(event.error.message).removeClass('d-none');
                    } else {
                        $form.find('.stripe-card-errors').text('').addClass('d-none');
                    }
                });

                card.addEventListener('ready', function(event) {
                    card.focus();
                });
            })($form);
    	});
    </script>
@endpush

@section('content')
    @include('components.navbar.sign_up')

	<div class="container-fluid">
        <div class="[ gs__wrapper ]">
            <div class="[ gs__wrapper ] row">
                <div class="col-md-8 d-flex justify-content-center">
                    <div class="[ gs-start-trial ]">
                        <h2 class="[ gs-start-trial__page-title ] text-center">
                           {{ __('sign_up/start_trial.start_your_free_trial') }}
                        </h2>
                        <form class="[ gs-start-trial__main ]" onsubmit="event.preventDefault();">
                            <div class="form-group">
                                <label for="credit-card">
                                    {{ __('sign_up/start_trial.credit_card_information') }}
                                	<small>
                                		<img src="{{ asset_no_cache('img/shield.svg') }}"> {{ __('sign_up/start_trial.secured_by_stripe') }}
                                	</small>
                                </label>
                                <div class="[ stripe-card ] mb-3">
                                    <div class="stripe-card-element"></div>
                                    <div class="stripe-card-errors d-none" role="alert"></div>
                                </div>
                            </div>
                            @if ($choosen_plan->account_type == 'Company')
                                <div class="form-group">
                                    <label for="sign-up-form__company-locality-key">{{ __('sign_up/start_trial.company_location') }}</label>
                                    <select class="custom-select selectized" name="user_sign_up[company_locality_key]" id="sign-up-form__company-locality-key" data-name="user_sign_up.company_locality_key"></select>
                                    <div class="invalid-feedback"></div>
                                </div>
                            @endif
                            <div class="form-group mt-4">
                                <button class="[ gs-start-trial__button ] btn btn-primary" type="submit">{{ __('sign_up/start_trial.start_your_free14_day_trial') }}</button>
                            </div>
                            <div class="[ gs-start-trial__info ]">
                                <p>
                                    <img src="{{ asset_no_cache('img/check-mark-icon.svg') }}" alt="">
                                    {{ __('sign_up/start_trial.you_wont_be_billed_today') }}
                                </p>
                                <p>
                                    <img src="{{ asset_no_cache('img/check-mark-icon.svg') }}" alt="">
                                    {{ __('sign_up/start_trial.cancel_any_time_before') }} {{ date('F j, Y', time() + 86400 * 14) }}
                                </p>
                            </div>
                            <p class="required-text mt-4 mb-5">
                                {!! __('sign_up/start_trial.by_clicking_start_your_free_14_day_trial_you_agree') !!}
                            </p>
                            @foreach ($choosen_plan_addons as $current_choosen_plan_addon)
                            	<input type="hidden" name="user_sign_up[choosen_plan_addon_keys][]" value="{{ $current_choosen_plan_addon->key }}">
                            @endforeach
                            <input type="hidden" name="user_sign_up[stripe_token_id]" value="">
                        </form>
                    </div>
                    <!-- / gs-from -->
                </div>

                <div class="col-md-4">
                    @include('sign_up.components.checkout')
                </div>
            </div>
        </div>
    </div>
@endsection
