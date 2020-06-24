@extends('layouts.main_layout')

@push('meta')
    <title>{!! __('meta.choose_addons.description') !!}</title>
    <meta name="description" content="{!! __('meta.choose_addons.description') !!}">
    <meta name="keywords" content="{!! __('meta.choose_addons.description') !!}">
@endpush

@push('scripts')
    <script>
    	$(function() {
    		var $submit_button = $('.gs-add-on button[type="submit"]');

    		$('.gs-add-on__body').each(function() {
    			var $plan_addon = $(this);
    			var plan_addon_key = $plan_addon.attr('data-key');

    			$plan_addon.find('.gs-add-on__button.add').click(function(event) {
    				event.preventDefault();
    				$plan_addon.find('.gs-add-on__button.add').toggleClass('d-none', true);
    				$plan_addon.find('.gs-add-on__button.remove').toggleClass('d-none', false);
    				$('.gs-checkout__item.is-plan-addon[data-key="' + plan_addon_key + '"]').removeClass('d-none');
    				$plan_addon.find('.gs-add-on__hidden-input').prop('disabled', false);
    			});

    			$plan_addon.find('.gs-add-on__button.remove').click(function(event) {
    				event.preventDefault();
    				$plan_addon.find('.gs-add-on__button.add').toggleClass('d-none', false);
    				$plan_addon.find('.gs-add-on__button.remove').toggleClass('d-none', true);
    				$('.gs-checkout__item.is-plan-addon[data-key="' + plan_addon_key + '"]').addClass('d-none');
    				$plan_addon.find('.gs-add-on__hidden-input').prop('disabled', true);
    			});
    		});

    		$('.gs-add-on').submit(function(event) {
    			event.preventDefault();

    			if ($submit_button.hasClass('is-loading')) {
    				return;
    			}

    			$submit_button.addClass('is-loading disabled');

    			request({
    				method: 'POST',
    				url: '/sign_up/choose_addons',
    				data: $(this).serialize(),
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

    				if (response.data.next_sign_up_stage) {
    					window.location.href = '/sign-up/start-trial';
    					return;
    				}

    				window.location.href = '/setup/create-contact-lists';
    			});
    		});
    	});
    </script>
@endpush

@section('content')
    @include('components.navbar.sign_up')

	<div class="container-fluid">
		<div class="[ gs__wrapper ]">
			<div class="[ gs__wrapper ] row">
				<div class="col-md-8 d-flex justify-content-center">

					<form class="[ gs-add-on ]" onsubmit="event.preventDefault();">
						<h2 class="[ gs-add-on__page-title ] text-center">
							{!! __('sign_up/choose_addons.try_add_ons_with_your_free_trial') !!}
						</h2>

						@foreach ($suitable_plan_addons as $current_suitable_plan_addon)
							<!-- add on-->
							<div class="[ gs-add-on__body ]" data-key="{{ $current_suitable_plan_addon->key }}">
								<div class="[ gs-add-on__icon ]">
									<img src="{{ asset_no_cache('img/logo.svg') }}" alt="">
								</div>
								<div class="[ gs-add-on__text ]">
									<h4>
										{{ $current_suitable_plan_addon->title }}
										<br>
										<small>{{ __('sign_up/choose_addons.from') }} ${{ $current_suitable_plan_addon->price }}/{{ __('sign_up/choose_addons.month') }}</small>
									</h4>
									<p>
										{{ $current_suitable_plan_addon->description }}
									</p>
								</div>
								<button class="[ gs-add-on__button ] ml-auto add btn btn-primary">{{ __('sign_up/choose_addons.add') }}</button>
								<button class="[ gs-add-on__button ] ml-auto remove btn btn-primary d-none">{{ __('sign_up/choose_addons.remove') }}</button>
								<input class="[ gs-add-on__hidden-input ] ml-auto" type="hidden" name="user_sign_up[choosen_plan_addon_keys][]" value="{{ $current_suitable_plan_addon->key }}" data-key="{{ $current_suitable_plan_addon->key }}" disabled>
							</div>
							<!-- add on-->
						@endforeach

						<div class="mt-5 text-center">
							<button class="btn btn-custom" type="submit">{{ __('sign_up/choose_addons.continue') }}</button>
						</div>
					</form>
					<!-- / gs-from -->
				</div>

				<div class="col-md-4">
					@include('sign_up.components.checkout')
				</div>

			</div>

		</div>
	</div>
@endsection
