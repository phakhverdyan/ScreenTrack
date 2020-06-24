@extends('dashboard.layout')

@push('scripts')
    <script>
        var contracts = @json($contracts);

        $(function () {
            $('.delete-project').click(function () {
                var contract_id = $(this).data('id');

                modals.confirm_action({
                    question: "{{ __('dashboard/contracts.you_really_want_to_delete_this_contract') }}",

                    confirm: function (callback) {
                        request({
                            method: 'GET',
                            url: '/contracts/' + contract_id + '/delete',
                        }, function (response) {
                            if (response.error) {
                                $.notify(response.error);
                                return;
                            }

                            $.notify("{{ __('dashboard.contacts.deleted') }}", 'success');
                            window.location.href = '/dashboard/contracts';
                        });

                        return callback && callback();
                    },
                });

                return false;
            });

            $('.contract-item').click(function (event) {
                event.preventDefault();
                var contract_id = parseInt($(this).attr('data-id'));

                var contract = contracts.data.filter(function (current_contract) {
                    return current_contract.id == contract_id;
                })[0] || null;

                console.log('CLICK', contract);

                if ($(event.target).closest('.contract-item__employer-user').length > 0) {
                    slideups.user_profile({
                        user_id: contract.employer_user.id,
                    });

                    return;
                }

                if ($(event.target).closest('.contract-item__employee-user').length > 0) {
                    slideups.user_profile({
                        user_id: contract.employee_user.id,
                        default_tab: 'timeline',
                    });

                    return;
                }
                
                window.location.href = '/dashboard/contracts/' + $(this).attr('data-id');
            });
        });
    </script>
@endpush

@section('content')
    <section class="container py-5">
        <div class="row">
            <div class="col">
                <h3 class="[ page-title ]">
                    {{ __('dashboard/contracts.contracts') }} ({{ $contracts->total() }})
                </h3>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="[ air-card ]">
                    <div class="[ air-card__content ]">
                        <div class="[ contract-list ] container">
                            @forelse ($contracts as $contract)
                                <div class="[ contract-item ] row py-3" data-id="{{ $contract->id }}">
                                    <div class="col-3 d-flex flex-column justify-content-center">
                                        <a href="{{ route('dashboard.contract', [$contract->id]) }}"
                                           class="[ contract-item__title ]">
                                            {{ $contract->title }}
                                        </a>
                                        <div class="[ contract-item__type ]">
                                            {{ __('common.contracts.types.' . $contract->type . '.title') }} {!! __('dashboard/contracts.contract') !!}
                                        </div>
                                        <div class="[ contract-item__direction ] mt-2 d-flex align-items-center">
                                            <a href="#"
                                               class="[ contract-item__employer-user ] d-inline-flex align-items-center"
                                               title="{{ $contract->employer_user->full_name }}">
                                                <img height="30px" class="mr-1"
                                                     src="{{ $contract->employer_user->image->urls->tiny }}">
                                                @if ($contract->employer_user_id != auth()->user()->id)
                                                    <span class="ml-1">{{ $contract->employer_user->full_name }}</span>
                                                @endif
                                            </a>
                                            <span class="mx-1">&rarr;</span>
                                            <a href="#"
                                               class="[ contract-item__employee-user ] d-inline-flex align-items-center"
                                               title="{{ $contract->employee_user->full_name }}">
                                                <img height="30px" class="mr-1"
                                                     src="{{ $contract->employee_user->image->urls->tiny }}">
                                                @if ($contract->employee_user_id != auth()->user()->id)
                                                    <span class="ml-1">{{ $contract->employee_user->full_name }}</span>
                                                @endif
                                            </a>
                                        </div>
                                        <div class="[ contract-item__period ] mt-2">
                                            {{ $contract->created_at->format('M j, o') }}
                                            &mdash;
                                            {{ $contract->closed_at ? $contract->closed_at->format('M j, o') :  __('client/slideups/user_profile_contract.present') }}
                                        </div>
                                    </div>
                                    <div
                                        class="[ contract-item__description ] col d-flex flex-column justify-content-center">
                                        @if ($contract->type == App\Models\Contract::TYPE_HOURLY)
                                            <p> {!! __('dashboard/contracts.hourly_rate') !!} : ${{ $contract->hourly_rate }}{{ __('dashboard/contracts.per_hour') }}</p>
                                            <p>
                                                {!! __('dashboard/contracts.total_hours') !!}: {{ time_interval_to_string($contract->count_of_segments * 60, [
				                                    'string_rounding' => 'minutes',
				                                    'string_cutting' => 'hours',

				                                    'format' => [
				                                        'hours' => '%d:',
				                                        'minutes' => '%02d',
				                                    ],
				                                ]) }}
                                            </p>
                                            <p>
                                                {{ $contract->employer_user_id == auth()->user()->id ?
                                                 __('dashboard/contracts.total_spendings')
                                                :
                                                 __('dashboard/contracts.total_earnings')}}
                                                :
                                                ${{ number_format($contract->hourly_rate / 60 * $contract->count_of_segments, 2) }}
                                            </p>
                                        @elseif ($contract->type == App\Models\Contract::TYPE_FIXED_PRICE)
                                            <p>{!! __('dashboard/contracts.budget') !!}: ${{ number_format($contract->total_amount, 2) }}</p>
                                            <p>{!! __('dashboard/contracts.total_spendings') !!} ${{ number_format($contract->total_spent, 2) }}</p>
                                        @endif
                                    </div>
                                    <div class="col-3 d-flex align-items-center justify-content-start">
                                        <div class="contract-item__badges">
                                            @if ($contract->type == App\Models\Contract::TYPE_HOURLY)
                                                <div class="badge badge-primary">
                                                    <span>{!! __('dashboard/contracts.progress') !!}</span>
                                                    <span>
														${{ number_format($contract->hourly_rate / 60 * $contract->count_of_progress_segments, 2) }}
														({{ time_interval_to_string($contract->count_of_progress_segments * 60, [
						                                    'string_rounding' => 'minutes',
						                                    'string_cutting' => 'hours',

						                                    'format' => [
						                                        'hours' => '%d:',
						                                        'minutes' => '%02d',
						                                    ],
						                                ]) }} {!! __('dashboard/contracts.hrs') !!})
						                            </span>
                                                </div>
                                                <div class="badge badge-warning">
                                                    <span>{!! __('dashboard/contracts.review') !!}</span>
                                                    <span>
														${{ number_format($contract->hourly_rate / 60 * $contract->count_of_review_segments, 2) }}
														({{ time_interval_to_string($contract->count_of_review_segments * 60, [
						                                    'string_rounding' => 'minutes',
						                                    'string_cutting' => 'hours',

						                                    'format' => [
						                                        'hours' => '%d:',
						                                        'minutes' => '%02d',
						                                    ],
						                                ]) }}  {!! __('dashboard/contracts.hrs') !!})
						                            </span>
                                                </div>
                                                <div class="badge badge-secondary">
                                                    <span>{!! __('dashboard/contracts.escrow') !!}</span>
                                                    <span>
														${{ number_format($contract->hourly_rate / 60 * $contract->count_of_escrow_segments, 2) }}
														({{ time_interval_to_string($contract->count_of_escrow_segments * 60, [
						                                    'string_rounding' => 'minutes',
						                                    'string_cutting' => 'hours',

						                                    'format' => [
						                                        'hours' => '%d:',
						                                        'minutes' => '%02d',
						                                    ],
						                                ]) }}  {!! __('dashboard/contracts.hrs') !!})
						                            </span>
                                                </div>
                                                <div class="badge badge-success">
                                                    <span>{!! __('dashboard/contracts.paid') !!}</span>
                                                    <span>
														${{ number_format($contract->hourly_rate / 60 * $contract->count_of_paid_segments, 2) }}
														({{ time_interval_to_string($contract->count_of_paid_segments * 60, [
						                                    'string_rounding' => 'minutes',
						                                    'string_cutting' => 'hours',

						                                    'format' => [
						                                        'hours' => '%d:',
						                                        'minutes' => '%02d',
						                                    ],
						                                ]) }}  {!! __('dashboard/contracts.hrs') !!})
						                            </span>
					                            </div>
					                        @elseif ($contract->type == App\Models\Contract::TYPE_FIXED_PRICE)
												<div class="badge badge-primary">
													<span>Remaining:</span>
													<span>${{ number_format($contract->remaining_amount, 2) }}</span>
												</div>
												<div class="badge badge-secondary">
													<span>Escrow:</span>
													<span>${{ number_format($contract->escrow_amount, 2) }}</span>
												</div>
												<div class="badge badge-success">
													<span>Paid:</span>
													<span>${{ number_format($contract->paid_amount, 2) }}</span>
												</div>
					                        @endif
					                    </div>
									</div>
									<div class="col-2 text-right d-flex align-items-center justify-content-end">
										@if (!$contract->closed_at)
											<button class="btn btn-secondary btn-sm">Close</button>
										@endif
									</div>
								</div>
							@empty
								<div class="[ no-contract-items ] row">
									<div class="col text-center p-3">You do not have contracts yet</div>
								</div>
							@endforelse
						</div>
					</div>
					<div class="[ air-card__footer ]">
						{{ $contracts->links() }}
					</div>
                </div>
            </div>
        </div>
    </section>
@endsection
