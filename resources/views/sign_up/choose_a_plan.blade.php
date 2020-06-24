@extends('layouts.main_layout')

@push('meta')
    <title>{!! __('meta.choose_a_plan.title') !!}</title>
    <meta name="description" content="{!! __('meta.choose_a_plan.description') !!}">
    <meta name="keywords" content="{!! __('meta.choose_a_plan.keywords') !!}">
@endpush

@push('scripts')
	<!-- [ OWN SCRIPTS ] -->
	<script>
		$(function() {
			$('.nav-tabs a').on('shown.bs.tab', function() {
				if ($(this).attr('href') == '#plan__company-tab') {
					$('.nav-item.is-for-company-only').removeClass('d-none');
				} else {
					$('.nav-item.is-for-company-only').addClass('d-none');
				}
			});

			$('.card').each(function() {
				var $card = $(this);
				var $submit_button = $card.find('button[type="submit"]');

				$card.submit(function(event) {
					event.preventDefault();
					$submit_button.addClass('is-loading disabled');

					request({
						method: 'POST',
						url: '/sign_up/choose_a_plan',
						data: $card.serialize(),
					}, function(response) {
						$submit_button.removeClass('is-loading disabled');

						if (response.error == 'Not Found') {
							window.location.reload();
							return;
						}

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
	@include('components.navbar.sign_up')

	<!-- Body -->
	<div class="container-fluid">
		<div class="[ pricing-packages ] mt-md-0 mt-5 pt-5 pt-md-0">
			<ul class="[ pick-mode ] nav nav-tabs d-flex justify-content-center">
				<li class="[ pick-item ]">
					<a class="active" data-toggle="tab" href="#plan__freelancer-tab">{{ __('sign_up/choose_a_plan.freelancer_contractor') }}</a>
				</li>
				<li class="[ pick-item ]">
					<a data-toggle="tab" href="#plan__company-tab">{{ __('sign_up/choose_a_plan.company_team') }}</a>
				</li>
			</ul>
			<div class="tab-content">
				<div id="plan__freelancer-tab" class="tab-pane active">
					<div class="container">
						<div class="row">
							<div class="col-lg-4 offset-lg-4">
								<form class="[ card ] mb-5 mb-lg-0" onsubmit="event.preventDefault();">
									<div class="[ card__body ]">
										<p class="[ card__recommended ] text-center">
											{{ __('sign_up/choose_a_plan.68_percent_of_businesses_choose_pro') }}
										</p>
										<h5 class="[ card__title ]">{{ $plans['user.free_190612']->name }} Plan</h5>
										<h6 class="[ card__price ]">$0 USD/month</h6>
										<p class="[ card__short-desc ]">
											Use the Time-Tracker and get paid daily for your work with teams, manage your project tasks easily.
										</p>
										<button class="[ card__button ] btn btn-primary" type="submit">
											{{ __('sign_up/choose_a_plan.get_started_free') }}
										</button>
										<ul class="[ card__nav ]">
											<li>
												<span>
													<img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
												</span>
												<p>ZERO percent commission</p>
											</li>
											<li>
												<span>
													<img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
												</span>
												<p>Daily payouts via Paypal & Payoneer</p>
											</li>
											<li>
												<span>
													<img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
												</span>
												<p>Payouts to 200+ countries</p>
											</li>
											<li>
												<span>
													<img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
												</span>
												<p>{{ __('sign_up/choose_a_plan.unlimited_projects') }}</p>
											</li>
											<li>
												<span>
													<img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
												</span>
												<p>{{ __('sign_up/choose_a_plan.unlimited_time_tracking') }}</p>
											</li>
											<li>
												<span>
													<img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
												</span>
												<p>{{ __('sign_up/choose_a_plan.unlimited_messaging') }}</p>
											</li>
											<li>
												<span>
													<img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
												</span>
												<p>{{ __('sign_up/choose_a_plan.unlimited_reports') }}</p>
											</li>
											<li>
												<span>
													<img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
												</span>
												<p>{{ __('sign_up/choose_a_plan.unlimited_payable_tasks') }}</p>
											</li>
											<li>
												<span>
													<img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
												</span>
												<p>{{ __('sign_up/choose_a_plan.premium_payment_protection') }}</p>
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
									<p class="[ card__recommended ] text-center">{{ __('sign_up/choose_a_plan.68_percent_of_businesses_choose_pro') }}</p>
									<div class="[ card__body ]">
										<h5 class="[ card__title ]">{{ $plans['company.free_190612']->name }} Plan</h5>
										<h6 class="[ card__price ]">$0 USD/month</h6>
										<p class="[ card__short-desc ]">
											Track your freelancers with 12 screenshots per hour for free, with ZERO commissions to save tons of money and invest them back into your projects.
										</p>
										<button class="[ card__button ] btn btn-primary" type="submit">
											{{ __('sign_up/choose_a_plan.get_started_free') }}
										</button>
										<ul class="[ card__nav ]">
											<li>
												<span>
													<img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
												</span>
												<p>ZERO percent commission</p>
											</li>
											<li>
												<span>
													<img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
												</span>
												<p>Daily payments via MasterCard & VISA</p>
											</li>
											<li>
												<span>
													<img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
												</span>
												<p>12 {{ __('sign_up/choose_a_plan.screenshots_per_hour') }}</p>
											</li>
											<li>
												<span>
													<img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
												</span>
												<p>{{ __('sign_up/choose_a_plan.unlimited_screenshots') }}</p>
											</li>
											<li>
												<span>
													<img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
												</span>
												<p>{{ __('sign_up/choose_a_plan.unlimited_freelancer_tracking') }}</p>
											</li>
											<li>
												<span>
													<img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
												</span>
												<p>{{ __('sign_up/choose_a_plan.unlimited_messaging') }}</p>
											</li>
											<li>
												<span>
													<img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
												</span>
												<p>{{ __('sign_up/choose_a_plan.unlimited_projects') }}</p>
											</li>
											<li>
												<span>
													<img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
												</span>
												<p>{{ __('sign_up/choose_a_plan.unlimited_project_managers') }}</p>
											</li>
										</ul>
									</div>
									<input type="hidden" name="choosen_plan[key]" value="company.free_190612">
								</form>
							</div>
							<!-- /Free Plan -->

							@if (FALSE /* DISABLED 25 Aug 2019 because we decided to stay only free plan in the 1st version */)
								<!-- Starter Plan -->
								<div class="col-md-3">
									<form class="[ card ] mb-5" onsubmit="event.preventDefault();">
										<p class="[ card__recommended ] text-center">{{ __('sign_up/choose_a_plan.68_percent_of_businesses_choose_pro') }}</p>
										<div class="[ card__body ]">
											<h5 class="[ card__title ]">{{ $plans['company.starter_190612']->name }}</h5>
											<h6 class="[ card__price ]">
												from
												<span>${{ $plans['company.starter_190612']->price }}</span>
												<br>
												{{ __('sign_up/choose_a_plan.per_user_month') }}
											</h6>
											<p class="[ card__short-desc ]">{{ __('sign_up/choose_a_plan.work_as_a_team_to_manage_conversations') }}</p>
											<button class="[ card__button ] btn btn-primary" type="submit">{{ __('sign_up/choose_a_plan.try_for_free') }}</button>
											<p class="[ card__calculate-price ]">{{ __('sign_up/choose_a_plan.how_we_calculate_price') }}</p>
											<ul class="[ card__nav ]">
												<li>
													<span>
														<img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
													</span>
													<p>{{ __('sign_up/choose_a_plan.everything_from_free_plan') }}</p>
												</li>
												<li>
													<span>
														<img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
													</span>
													<p>15 {{ __('sign_up/choose_a_plan.min_live_screen_streaming') }}</p>
												</li>
												<li>
													<span>
														<img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
													</span>
													<p>2 {{ __('sign_up/choose_a_plan.manager_seat_per_project') }}</p>
												</li>
												<li>
													<span>
														<img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
													</span>
													<p>15 {{ __('sign_up/choose_a_plan.screenshots_per_hour') }}</p>
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
										<p class="[ card__recommended ] text-center">{{ __('sign_up/choose_a_plan.68_percent_of_businesses_choose_pro') }}</p>
										<div class="[ card__body ]">
											<h5 class="[ card__title ]">{{ $plans['company.value_190612']->name }}</h5>
											<h6 class="[ card__price ]">
												{{ __('sign_up/choose_a_plan.from') }}
												<span>${{ $plans['company.value_190612']->price }}</span>
												<br>
												{{ __('sign_up/choose_a_plan.per_user_month') }}
											</h6>
											<p class="[ card__short-desc ]">{{ __('sign_up/choose_a_plan.work_as_a_team_to_manage_conversations') }}</p>
											<button class="[ card__button ] btn btn-primary" type="submit">{{ __('sign_up/choose_a_plan.try_for_free') }}</button>
											<p class="[ card__calculate-price ]">{{ __('sign_up/choose_a_plan.how_we_calculate_price') }}</p>
											<ul class="[ card__nav ]">
												<li>
													<span>
														<img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
													</span>
													<p>{{ __('sign_up/choose_a_plan.everything_from_free_plan') }}</p>
												</li>
												<li>
													<span>
														<img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
													</span>
													<p>15 {{ __('sign_up/choose_a_plan.min_live_screen_streaming') }}</p>
												</li>
												<li>
													<span>
														<img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
													</span>
													<p>2 {{ __('sign_up/choose_a_plan.manager_seat_per_project') }}</p>
												</li>
												<li>
													<span>
														<img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
													</span>
													<p>15 {{ __('sign_up/choose_a_plan.screenshots_per_hour') }}</p>
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
										<p class="[ card__recommended ] text-center">{{ __('sign_up/choose_a_plan.68_percent_of_businesses_choose_pro') }}</p>
										<div class="[ card__body ]">
											<h5 class="[ card__title ]">{{ $plans['company.premium_190612']->name }}</h5>
											<h6 class="[ card__price ]">
												{{ __('sign_up/choose_a_plan.from') }}
												<span>${{ $plans['company.premium_190612']->price }}</span>
												<br>
												{{ __('sign_up/choose_a_plan.per_user_month') }}
											</h6>
											<p class="[ card__short-desc ]">{{ __('sign_up/choose_a_plan.work_as_a_team_to_manage_conversations') }}</p>
											<button class="[ card__button ] btn btn-primary" type="submit">{{ __('sign_up/choose_a_plan.try_for_free') }}</button>
											<p class="[ card__calculate-price ]">{{ __('sign_up/choose_a_plan.how_we_calculate_price') }}</p>
											<ul class="[ card__nav ]">
												<li>
													<span>
														<img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
													</span>
													<p>{{ __('sign_up/choose_a_plan.everything_from_starter_plan') }}</p>
												</li>
												<li>
													<span>
														<img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
													</span>
													<p>{{ __('sign_up/choose_a_plan.2_h_live_screen_streaming') }}</p>
												</li>
												<li>
													<span>
														<img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
													</span>
													<p>5 {{ __('sign_up/choose_a_plan.manager_seat_per_project') }}</p>
												</li>
												<li>
													<span>
														<img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
													</span>
													<p>20 {{ __('sign_up/choose_a_plan.screenshots_per_hour') }}</p>
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
										<p class="[ card__recommended ] text-center">{{ __('sign_up/choose_a_plan.68_percent_of_businesses_choose_pro') }}</p>
										<div class="[ card__body ]">
											<h5 class="[ card__title ]">{{ $plans['company.enterprise_190612']->name }}</h5>
											<h6 class="[ card__price ]">
												{{ __('sign_up/choose_a_plan.from') }}
												<span>${{ $plans['company.enterprise_190612']->price }}</span>
												<br>
												{{ __('sign_up/choose_a_plan.per_user_month') }}
											</h6>
											<p class="[ card__short-desc ]">{{ __('sign_up/choose_a_plan.work_as_a_team_to_manage_conversations') }}</p>
											<button class="[ card__button ] btn btn-primary" type="submit">{{ __('sign_up/choose_a_plan.get_started') }}</button>
											<p class="[ card__calculate-price ]">{{ __('sign_up/choose_a_plan.how_we_calculate_price') }}</p>
											<ul class="[ card__nav ]">
												<li>
													<span>
														<img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
													</span>
													<p>{{ __('sign_up/choose_a_plan.everything_from_plus_plan') }}</p>
												</li>
												<li>
													<span>
														<img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
													</span>
													<p>{{ __('sign_up/choose_a_plan.unlimited_live_screen_streaming') }}</p>
												</li>
												<li>
													<span>
														<img src="{{ asset_no_cache('/img/check-mark-icon.svg') }}" alt="">
													</span>
													<p>{{ __('sign_up/choose_a_plan.unlimited_manager_seat_per_project') }}</p>
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
@endsection
