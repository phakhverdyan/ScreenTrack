@extends('layouts.main_layout')

@push('meta')
    <title>{!! __('meta.plans.title') !!}</title>
    <meta name="description" content="{!! __('meta.plans.description') !!}">
@endpush

@push('scripts')
    <!-- [ OWN SCRIPTS ] -->
    <script>
        $(function () {
            $('.card').each(function () {
                var $card = $(this);
                var $submit_button = $card.find('button[type="submit"]');

                $card.submit(function (event) {
                    event.preventDefault();
                    $submit_button.addClass('is-loading disabled');

                    if (!window.auth) {
                        window.location.href = '/sign-up/set-account-details?' + $.param(Object.assign({
                            choosen_plan_key: $card.find('input[name="choosen_plan[key]"]').val(),
                        }, client_locality('key') ? {
                            user_locality_key: client_locality('key'),
                        } : {}, {
                            locale: locale(),
                        }));

                        return;
                    }

                    request({
                        method: 'POST',
                        url: '/sign_up/choose_a_plan',
                        data: $card.serialize(),
                    }, function (response) {
                        $submit_button.removeClass('is-loading disabled');

                        if (response.error) {
                            $.notify(response.error, 'error');
                            return;
                        }

                        $submit_button.addClass('is-loading disabled');
                        window.location.href = '/sign-up/set-account-details';
                    });
                });
            });
        });
    </script>
    <!-- [ /OWN SCRIPT ] -->
@endpush

@section('content')
    @if (auth()->check())
        @include('components.navbar.sign_up')
    @else
        @include('components.navbar.main')
    @endif

    <!-- Body -->
    <div class="container-fluid">
        <div class="[ pricing-packages ]">
            <ul class="[ pick-mode ] nav nav-tabs d-flex justify-content-center">
                <li class="[ pick-item ]">
                    <a class="active" data-toggle="tab"
                       href="#plan__freelancer-tab">{{ __('pages/prices.freelancer_contractor') }}</a>
                </li>
                <li class="[ pick-item ]">
                    <a data-toggle="tab" href="#plan__company-tab">{{ __('pages/prices.company_team') }}</a>
                </li>
            </ul>
            <div class="tab-content">
                <div id="plan__freelancer-tab" class="tab-pane active">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-4 offset-md-4">
                                <form class="[ card ] mb-5 mb-lg-0" onsubmit="event.preventDefault();">
                                    <div class="[ card__body ]">
                                        <p class="[ card__recommended ] text-center">
                                            {{ __('pages/prices.68_of_businesses_choose_pro') }}
                                        </p>
                                        <h5 class="[ card__title ]">{{ $plans['user.free_190612']->name }} Plan</h5>
                                        <h6 class="[ card__price ]">{!! __('pages/prices.usd_per_month', ['price' => 0]) !!}</h6>
                                        <p class="[ card__short-desc ]">
                                            {!! __('pages/prices.use_time_tracker') !!}
                                        </p>
                                        <button class="[ card__button ] btn btn-primary" type="submit">
                                            {{ __('pages/prices.get_started_free') }}
                                        </button>
                                        <ul class="[ card__nav ]">
                                            <li>
                                                <span>
                                                    <img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
                                                </span>
                                                <p>{!! __('pages/prices.zero_commission') !!}</p>
                                            </li>
                                            <li>
                                                <span>
                                                    <img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
                                                </span>
                                                <p>{!! __('pages/prices.daily_payouts') !!}</p>
                                            </li>
                                            <li>
                                                <span>
                                                    <img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
                                                </span>
                                                <p>{{ __('pages/prices.unlimited_projects') }}</p>
                                            </li>
                                            <li>
                                                <span>
                                                    <img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
                                                </span>
                                                <p>{{ __('pages/prices.unlimited_time_tracking') }}</p>
                                            </li>
                                            <li>
                                                <span>
                                                    <img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
                                                </span>
                                                <p>{{ __('pages/prices.unlimited_messaging') }}</p>
                                            </li>
                                            <li>
                                                <span>
                                                    <img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
                                                </span>
                                                <p>{{ __('pages/prices.unlimited_reports') }}</p>
                                            </li>
                                            <li>
                                                <span>
                                                    <img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
                                                </span>
                                                <p>{{ __('pages/prices.unlimited_payable_tasks') }}</p>
                                            </li>
                                            <li>
                                                <span>
                                                    <img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
                                                </span>
                                                <p>{{ __('pages/prices.premium_payment_protection') }}</p>
                                            </li>
                                        </ul>
                                    </div>
                                    <input type="hidden" name="choosen_plan[key]" value="user.free_190612">
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="plan__company-tab" class="tab-pane">
                    <div class="container">
                        <div class="row">
                            <!-- Free Plan -->
                            <div class="col-md-4 offset-md-4">
                                <form class="[ card ] mb-5" onsubmit="event.preventDefault();">
                                    <p class="[ card__recommended ] text-center">{{ __('pages/prices.68_of_businesses_choose_pro') }}</p>
                                    <div class="[ card__body ]">
                                        <h5 class="[ card__title ]">{{ $plans['company.free_190612']->name }} Plan</h5>
                                        <h6 class="[ card__price ]">{!! __('pages/prices.usd_per_month', ['price' => 0]) !!}</h6>
                                        <p class="[ card__short-desc ]">
                                            {!! __('pages/prices.track_your_freelancers') !!}
                                        </p>
                                        <button class="[ card__button ] btn btn-primary" type="submit">
                                            {{ __('pages/prices.get_started_free') }}
                                        </button>
                                        <ul class="[ card__nav ]">
                                            <li>
                                                <span>
                                                    <img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
                                                </span>
                                                <p>{{ __('pages/prices.zero_commission') }}</p>
                                            </li>
                                            <li>
                                                <span>
                                                    <img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
                                                </span>
                                                <p>{!! __('pages/prices.daily_payments') !!}</p>
                                            </li>
                                            <li>
                                                <span>
                                                    <img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
                                                </span>
                                                <p>12 {{ __('pages/prices.screenshots_per_hour') }}</p>
                                            </li>
                                            <li>
                                                <span>
                                                    <img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
                                                </span>
                                                <p>{{ __('pages/prices.unlimited_screenshots') }}</p>
                                            </li>
                                            <li>
                                                <span>
                                                    <img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
                                                </span>
                                                <p>{{ __('pages/prices.unlimited_freelancer_tracking') }}</p>
                                            </li>
                                            <li>
                                                <span>
                                                    <img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
                                                </span>
                                                <p>{{ __('pages/prices.unlimited_messaging') }}</p>
                                            </li>
                                            <li>
                                                <span>
                                                    <img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
                                                </span>
                                                <p>{{ __('pages/prices.unlimited_projects') }}</p>
                                            </li>
                                            <li>
                                                <span>
                                                    <img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
                                                </span>
                                                <p>{{ __('pages/prices.unlimited_project_managers') }}</p>
                                            </li>
                                        </ul>
                                    </div>
                                    <input type="hidden" name="choosen_plan[key]" value="company.free_190612">
                                </form>
                            </div>
                            <!-- /Free Plan -->

                        @if (false /* DISABLED 25 Aug 2019 by Dan */)
                            <!-- Starter Plan -->
                                <div class="col-md-3">
                                    <form class="[ card ] mb-5" onsubmit="event.preventDefault();">
                                        <p class="[ card__recommended ] text-center">{{ __('pages/prices.68_of_businesses_choose_pro') }}</p>
                                        <div class="[ card__body ]">
                                            <h5 class="[ card__title ]">{{ $plans['company.starter_190612']->name }}</h5>
                                            <h6 class="[ card__price ]">
                                                {{ __('pages/prices.from') }}
                                                <span>${{ $plans['company.starter_190612']->price }}</span>
                                                <br>
                                                {{ __('pages/prices.per_user_month') }}
                                            </h6>
                                            <p class="[ card__short-desc ]">{{ __('pages/prices.work_as_a_team_to_manage_conversations') }}</p>
                                            <button class="[ card__button ] btn btn-primary"
                                                    type="submit">{{ __('pages/prices.try_for_free') }}</button>
                                            <ul class="[ card__nav ]">
                                                <li>
                                                    <span>
                                                        <img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}"
                                                             alt="">
                                                    </span>
                                                    <p>{{ __('pages/prices.everything_from_free_plan') }}</p>
                                                </li>
                                                <li>
                                                    <span>
                                                        <img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}"
                                                             alt="">
                                                    </span>
                                                    <p>{{ __('pages/prices.15_min_live_screen_streaming') }}</p>
                                                </li>
                                                <li>
                                                    <span>
                                                        <img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}"
                                                             alt="">
                                                    </span>
                                                    <p>2 {{ __('pages/prices.manager_seat_per_project') }}</p>
                                                </li>
                                                <li>
                                                    <span>
                                                        <img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}"
                                                             alt="">
                                                    </span>
                                                    <p>15 {{ __('pages/prices.screenshots_per_hour') }}</p>
                                                </li>
                                            </ul>
                                        </div>
                                        <input type="hidden" name="choosen_plan[key]" value="company.starter_190612">
                                    </form>
                                </div>
                                <!-- /Starter Plan -->

                                <!-- Value Plan -->
                                <div class="col-md-3">
                                    <form class="[ card ] is-recommended mb-5" onsubmit="event.preventDefault();">
                                        <p class="[ card__recommended ] text-center">{{ __('pages/prices.68_of_businesses_choose_pro') }}</p>
                                        <div class="[ card__body ]">
                                            <h5 class="[ card__title ]">{{ $plans['company.value_190612']->name }}</h5>
                                            <h6 class="[ card__price ]">
                                                {{ __('pages/prices.from') }}
                                                <span>${{ $plans['company.value_190612']->price }}</span>
                                                <br>
                                                {{ __('pages/prices.per_user_month') }}
                                            </h6>
                                            <p class="[ card__short-desc ]">{{ __('pages/prices.work_as_a_team_to_manage_conversations') }}</p>
                                            <button class="[ card__button ] btn btn-primary"
                                                    type="submit">{{ __('pages/prices.try_for_free') }}</button>
                                            <ul class="[ card__nav ]">
                                                <li>
                                                    <span>
                                                        <img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}"
                                                             alt="">
                                                    </span>
                                                    <p>{{ __('pages/prices.everything_from_free_plan') }}</p>
                                                </li>
                                                <li>
                                                    <span>
                                                        <img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}"
                                                             alt="">
                                                    </span>
                                                    <p>{{ __('pages/prices.15_min_live_screen_streaming') }}</p>
                                                </li>
                                                <li>
                                                    <span>
                                                        <img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}"
                                                             alt="">
                                                    </span>
                                                    <p>2 {{ __('pages/prices.manager_seat_per_project') }}</p>
                                                </li>
                                                <li>
                                                    <span>
                                                        <img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}"
                                                             alt="">
                                                    </span>
                                                    <p>15 {{ __('pages/prices.screenshots_per_hour') }}</p>
                                                </li>
                                            </ul>
                                        </div>
                                        <input type="hidden" name="choosen_plan[key]" value="company.value_190612">
                                    </form>
                                </div>
                                <!-- /Value Plan -->

                                <!-- Premium Plan -->
                                <div class="col-md-3">
                                    <form class="[ card ] mb-5" onsubmit="event.preventDefault();">
                                        <p class="[ card__recommended ] text-center">{{ __('pages/prices.68_of_businesses_choose_pro') }}</p>
                                        <div class="[ card__body ]">
                                            <h5 class="[ card__title ]">{{ $plans['company.premium_190612']->name }}</h5>
                                            <h6 class="[ card__price ]">
                                                {{ __('pages/prices.from') }}
                                                <span>${{ $plans['company.premium_190612']->price }}</span>
                                                <br>
                                                {{ __('pages/prices.per_user_month') }}
                                            </h6>
                                            <p class="[ card__short-desc ]">{{ __('pages/prices.work_as_a_team_to_manage_conversations') }}</p>
                                            <button class="[ card__button ] btn btn-primary"
                                                    type="submit">{{ __('pages/prices.try_for_free') }}</button>
                                            <ul class="[ card__nav ]">
                                                <li>
                                                    <span>
                                                        <img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}"
                                                             alt="">
                                                    </span>
                                                    <p>{{ __('pages/prices.everything_from_starter_plan') }}</p>
                                                </li>
                                                <li>
                                                    <span>
                                                        <img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}"
                                                             alt="">
                                                    </span>
                                                    <p>{{ __('pages/prices.2_h_live_screen_streaming') }}</p>
                                                </li>
                                                <li>
                                                    <span>
                                                        <img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}"
                                                             alt="">
                                                    </span>
                                                    <p>5 {{ __('pages/prices.manager_seat_per_project') }}</p>
                                                </li>
                                                <li>
                                                    <span>
                                                        <img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}"
                                                             alt="">
                                                    </span>
                                                    <p>20 {{ __('pages/prices.screenshots_per_hour') }}</p>
                                                </li>
                                            </ul>
                                        </div>
                                        <input type="hidden" name="choosen_plan[key]" value="company.premium_190612">
                                    </form>
                                </div>
                                <!-- /Premium Plan -->

                                <!-- Enterprise Plan -->
                                <div class="col-md-3">
                                    <form class="[ card ] mb-5" onsubmit="event.preventDefault();">
                                        <p class="[ card__recommended ] text-center">{{ __('pages/prices.68_of_businesses_choose_pro') }}</p>
                                        <div class="[ card__body ]">
                                            <h5 class="[ card__title ]">{{ $plans['company.enterprise_190612']->name }}</h5>
                                            <h6 class="[ card__price ]">
                                                {{ __('pages/prices.from') }}
                                                <span>${{ $plans['company.enterprise_190612']->price }}</span>
                                                <br>
                                                {{ __('pages/prices.per_user_month') }}
                                            </h6>
                                            <p class="[ card__short-desc ]">{{ __('pages/prices.work_as_a_team_to_manage_conversations') }}</p>
                                            <button class="[ card__button ] btn btn-primary"
                                                    type="submit">{{ __('pages/prices.get_started') }}</button>
                                            <ul class="[ card__nav ]">
                                                <li>
                                                    <span>
                                                        <img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}"
                                                             alt="">
                                                    </span>
                                                    <p>{{ __('pages/prices.everything_from_plus_plan') }}</p>
                                                </li>
                                                <li>
                                                    <span>
                                                        <img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}"
                                                             alt="">
                                                    </span>
                                                    <p>{{ __('pages/prices.unlimited_live_screen_streaming') }}</p>
                                                </li>
                                                <li>
                                                    <span>
                                                        <img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}"
                                                             alt="">
                                                    </span>
                                                    <p>{{ __('pages/prices.unlimited_manager_seat_per_project') }}</p>
                                                </li>
                                            </ul>
                                        </div>
                                        <input type="hidden" name="choosen_plan[key]" value="company.enterprise_190612">
                                    </form>
                                </div>
                                <!-- /Enterprise Plan -->
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- /Body -->

    @if (!auth()->check())
        @include('components.footer.main')
    @endif
@endsection
