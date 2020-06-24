@push('scripts')
    <script>
        $(function() {
            var get_total_sum = function() {
                return $('.gs-checkout__item:not(.d-none)').toArray().reduce(function(sum, element) {
                    return sum + parseFloat($(element).find('.gs-checkout__item__price').text());
                }, 0);
            };

            var update_total_sum = function() {
                var total_sum = get_total_sum();
                $('.gs-checkout__total-sum').text(total_sum);
            };

            $('.gs-checkout__item').each(function() {
                var $item = $(this);

                $item.find('.delete-icon').click(function(event) {
                    event.preventDefault();
                    $item.addClass('d-none');
                    $('[name="user_sign_up[choosen_plan_addon_keys][]"][value="' + $item.attr('data-key') + '"]').prop('disabled', true);
                    update_total_sum();
                });
            });
        });
    </script>
@endpush

<div class="[ gs-checkout ]">
    <div class="gs-checkout__th">
        <h4>{{ __('sign_up/checkout.your_free_trial') }}</h4>
    </div>
    <div class="[ gs-checkout__cart ]">
        <ul class="[ gs-checkout__list ]">
            <li class="[ gs-checkout__item ] is-plan">
                <h4>
                    {{ $choosen_plan->name }} {{ __('sign_up/checkout.plan') }}
                    <br>
                    <small>
                        $<span class="gs-checkout__item__price">{{ $choosen_plan->price }}</span> {{ __('sign_up/checkout.per_user_month') }}
                    </small>
                </h4>
            </li>
            @foreach ($suitable_plan_addons as $current_suitable_plan_addon)
                <li class="[ gs-checkout__item ] is-plan-addon {{ $choosen_plan_addons->where('key', $current_suitable_plan_addon->key)->first() ? '' : 'd-none' }}" data-key="{{ $current_suitable_plan_addon->key }}">
                    <h4>
                        {{ $current_suitable_plan_addon->title }}
                        <br>
                        <small>
                            $<span class="gs-checkout__item__price">{{ $current_suitable_plan_addon->price }}</span> / {{ __('sign_up/checkout.month') }}
                        </small>
                        @if ($user_sign_up->current_stage == 'START_TRIAL')
                            <a class="delete-icon" href="#">
                                <img src="{{ asset_no_cache('img/delete-icon.svg') }}" alt="">
                            </a>
                        @endif
                    </h4>
                </li>
            @endforeach
        </ul>
    </div>
    @if ($user_sign_up && $user_sign_up->current_stage == 'START_TRIAL')
        <div class="[ gs-checkout__total ]">
            <h4>{{ __('sign_up/checkout.total_due_today') }}: <span>$0</span></h4>
            <p>
                {{ __('sign_up/checkout.total_after_trial_from') }}:
                <span class="[ gs-checkout__total-sum-container ]">
                    $<span class="[ gs-checkout__total-sum ]">{{ $choosen_plan->price + $choosen_plan_addons->sum('price') }}</span> / {{ __('sign_up/checkout.month') }}
                </span>
            </p>
        </div>
        <div class="[ gs-checkout__apply-coupon ]">
            <a class="[ coupon-code ]" href="#">{{ __('sign_up/checkout.apply_coupon_code') }}</a>
            <div class="[ gs-checkout__form-coupon ]">
                <form class="form-inline">
                    <input class="form-control" type="text" name="comment" placeholder="Enter code">
                    <button class="[ gs-checkout__button ] btn btn-primary" type="button">{{ __('sign_up/checkout.apply') }}</button>
                </form>
            </div>
        </div>
    @endif
    <div class="[ gs-checkout__quote ]">
        <img src="https://via.placeholder.com/370x170" alt="">
        <p class="[ gs-checkout__quote__text ] pt-3">"Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Donec hendrerit ipsum leo, ultricies rhoncus urna vulputate vitae."</p>
        <h4 class="[ gs-checkout__quote__person ] mb-4">- Mark B. CEO</h4>
    </div>
</div>