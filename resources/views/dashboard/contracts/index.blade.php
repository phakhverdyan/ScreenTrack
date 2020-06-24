@extends('dashboard.layout')

@push('scripts')
	<script>
		var contract = @json($contract);

		$(function() {
			var $contract_header = $('.contract-header');
			var $contract_statistics = $('.contract-statistics');
			var $contract_no_milestone = $('.contract-no-milestone');
			var $current_milestone = $('.contract-current-milestone');
			var $upcoming_milestones = $('.contract__upcoming-milestones');
			var $upcoming_milestone_list = $('.contract-upcoming-milestone-list');
			var $count_of_upcoming_milestones = $('.contract__count-of-upcoming-milestones');
			var $completed_milestone_list = $('.contract-completed-milestone-list');
			var $count_of_completed_milestones = $('.contract__count-of-completed-milestones');
			var $add_new_milestone_button = $('.contract__add-new-milestone-button');

			// ---------------------------------------------------------------------- //

			var render_header = function() {
				if (contract.type == 'FIXED_PRICE') {
					var current_milestone = contract.milestones && contract.milestones.filter(function(milestone) {
						return !milestone.released_at;
					})[0] || null;

					$contract_header.html(dashboard.template('contract-header', {
						current_milestone: current_milestone,
						contract: contract,
					}));

					var $activate_button = $contract_header.find('.contract-header__activate-button');
					var $release_button = $contract_header.find('.contract-header__release-button');

					$activate_button.click(function(event) {
						event.preventDefault();
						$current_milestone.find('.contract-current-milestone__activate-button').click();
					});

					$release_button.click(function(event) {
						event.preventDefault();
						$current_milestone.find('.contract-current-milestone__release-button').click();
					});
				}

				var $employer_user = $contract_header.find('.contract-header__employer-user');
				var $employee_user = $contract_header.find('.contract-header__employee-user');

				$employer_user.click(function(event) {
					event.preventDefault();

					slideups.user_profile({
						user_id: contract.employer_user.id,
					});
				});

				$employee_user.click(function(event) {
					event.preventDefault();

					slideups.user_profile({
						user_id: contract.employee_user.id,
					});
				});
			};

			var render_statistics = function() {
				if (contract.type == 'FIXED_PRICE') {
					var budget_amount = contract.milestones.reduce(function(amount, milestone) {
						return amount + milestone.amount;
					}, 0.0);

					var remaining_amount = contract.milestones.filter(function(milestone) {
						return !milestone.released_at;
					}).reduce(function(amount, milestone) {
						return amount + milestone.amount;
					}, 0.0);

					var escrow_amount = contract.milestones.filter(function(milestone) {
						return milestone.released_at && milestone.is_in_escrow;
					}).reduce(function(amount, milestone) {
						return amount + milestone.amount;
					}, 0.0);

					var paid_amount = contract.milestones.filter(function(milestone) {
						return milestone.released_at && !milestone.is_in_escrow;
					}).reduce(function(amount, milestone) {
						return amount + milestone.amount;
					}, 0.0);

					$contract_statistics.html(dashboard.template('contract-statistics', {
						budget_amount: budget_amount,
						remaining_amount: remaining_amount,
						escrow_amount: escrow_amount,
						paid_amount: paid_amount,
						contract: contract,
					}));
				}
			};

			var render_no_milestone = function() {
				var current_milestone = contract.milestones.filter(function(milestone) {
					return !milestone.released_at;
				})[0] || null;

				if (contract.employer_user_id != auth.user.id || current_milestone) {
					$contract_no_milestone.addClass('d-none');
					return;
				}
				$contract_no_milestone.removeClass('d-none');
				$contract_no_milestone.unbind();

				var $add_new_button = $contract_no_milestone.find('.contract-no-milestone__add-new-button');

				$add_new_button.click(function(event) {
					event.preventDefault();

					modals.milestone({
						contract: contract,
						milestone: null,

						created: function(milestone) {
							contract.milestones.push(milestone);
							render();
						},
					});
				});
			};

			var render_current_milestone = function() {
				var current_milestone = contract.milestones.filter(function(milestone) {
					return !milestone.released_at;
				})[0] || null;

				if (!current_milestone) {
					$current_milestone.addClass('d-none');
					return;
				}

				$current_milestone.removeClass('d-none');
				$current_milestone.toggleClass('is-clickable', contract.employer_user_id == auth.user.id);

				var budget_amount = contract.milestones.reduce(function(accumulator, milestone) {
					return accumulator + milestone.amount;
				}, 0.0);

				var milestone_index = contract.milestones.indexOf(current_milestone);

				var amount_before = contract.milestones.slice(0, milestone_index + 1).reduce(function(accumulator, milestone) {
					return accumulator + milestone.amount;
				}, 0.0);

				$current_milestone.unbind().html(dashboard.template('contract-current-milestone', {
					milestone: current_milestone,
					milestone_index: milestone_index,
					percentage: amount_before / budget_amount,
				}));

				var $activate_button = $current_milestone.find('.contract-current-milestone__activate-button');
				var $release_button = $current_milestone.find('.contract-current-milestone__release-button');

				$current_milestone.click(function(event) {
					if (!$current_milestone.hasClass('is-clickable')) {
						return;
					}

					if ($(event.target).is('a')) {
						return;
					}

					event.preventDefault();

					modals.milestone({
						contract: contract,
						milestone: current_milestone,

						updated: function(milestone) {
							contract.milestones[milestone_index] = milestone;
							render();
						},
					});
				});

				$activate_button.click(function(event) {
					event.preventDefault();
					event.stopPropagation();
					$activate_button.addClass('is-loading');
					$contract_header.find('.contract-header__activate-button').addClass('is-loading');

					request({
						url: '/milestones/' + current_milestone.id + '/activate',
					}, function(response) {
						$activate_button.removeClass('is-loading');
						$contract_header.find('.contract-header__activate-button').removeClass('is-loading');

						if (response.error) {
							$.notify(response.error, 'error');
							return;
						}

						$.notify('Milestone activated!', 'success');
						contract.milestones[milestone_index] = response.data;
						render();
					});
				});

				$release_button.click(function(event) {
					event.preventDefault();
					event.stopPropagation();
					$release_button.addClass('is-loading');
					$contract_header.find('.contract-header__release-button').addClass('is-loading');

					request({
						url: '/milestones/' + current_milestone.id + '/release',
					}, function(response) {
						$release_button.addClass('is-loading');
						$contract_header.find('.contract-header__release-button').addClass('is-loading');

						if (response.error) {
							$.notify(response.error, 'error');
							return;
						}

						$.notify('Milestone released!', 'success');
						contract.milestones[milestone_index] = response.data;
						render();
					});
				});
			};

			var render_upcoming_milestones = function() {
				var current_milestone = contract.milestones.filter(function(milestone) {
					return !milestone.released_at;
				})[0] || null;

				if (!current_milestone) {
					$upcoming_milestones.addClass('d-none');
					return;
				}

				$upcoming_milestones.removeClass('d-none');
				$upcoming_milestone_list.html('');

				var upcoming_milestones = contract.milestones.filter(function(milestone) {
					return !milestone.released_at;
				}).slice(1);

				if (contract.employer_user_id != auth.user_id && upcoming_milestones.length == 0) {
					$upcoming_milestones.addClass('d-none');
					return;
				}

				var budget_amount = contract.milestones.reduce(function(accumulator, milestone) {
					return accumulator + milestone.amount;
				}, 0.0);

				$count_of_upcoming_milestones.text(upcoming_milestones.length);

				upcoming_milestones.forEach(function(milestone) {
					var milestone_index = contract.milestones.indexOf(milestone);

					var amount_before = contract.milestones.slice(0, milestone_index + 1).reduce(function(accumulator, milestone) {
						return accumulator + milestone.amount;
					}, 0.0);

					var $milestone = $(dashboard.template('contract-upcoming-milestone-item', {
						milestone: milestone,
						milestone_index: milestone_index,
						percentage: amount_before / budget_amount,
					})).toggleClass('is-clickable', contract.employer_user_id == auth.user.id);

					$milestone.click(function(event) {
						if ($(event.target).is('a')) {
							return;
						}

						event.preventDefault();

						modals.milestone({
							contract: contract,
							milestone: milestone,
							milestone_index: milestone_index,

							updated: function(updated_milestone) {
								contract.milestones[milestone_index] = updated_milestone;
								render();
							},
						});
					});

					$milestone.appendTo($upcoming_milestone_list);
				});

				$upcoming_milestone_list.toggleClass('d-none', upcoming_milestones.length == 0);
			};

			var render_completed_milestones = function() {
				$completed_milestone_list.html('');

				var completed_milestones = contract.milestones.filter(function(milestone) {
					return milestone.released_at;
				});

				var budget_amount = contract.milestones.reduce(function(accumulator, milestone) {
					return accumulator + milestone.amount;
				}, 0.0);

				$count_of_completed_milestones.text(completed_milestones.length);

				completed_milestones.forEach(function(milestone) {
					var milestone_index = contract.milestones.indexOf(milestone);

					var amount_before = contract.milestones.slice(0, milestone_index + 1).reduce(function(accumulator, milestone) {
						return accumulator + milestone.amount;
					}, 0.0);

					$(dashboard.template('contract-completed-milestone-item', {
						milestone: milestone,
						milestone_index: milestone_index,
						percentage: amount_before / budget_amount,
					})).appendTo($completed_milestone_list);
				});

				$completed_milestone_list.toggleClass('d-none', completed_milestones.length == 0);
			};

			var render_milestones = function() {
				render_no_milestone();
				render_current_milestone();
				render_upcoming_milestones();
				render_completed_milestones();
			};

			var render = function() {
				render_header();
				render_statistics();
				(contract.type == 'FIXED_PRICE') && render_milestones();
			};

			// ---------------------------------------------------------------------- //

			render();

			// ---------------------------------------------------------------------- //

			$add_new_milestone_button.click(function(event) {
				event.preventDefault();

				modals.milestone({
					contract: contract,
					milestone: null,

					created: function(milestone) {
						contract.milestones.push(milestone);
						render();
					},
				});
			});
		});
	</script>
@endpush

@section('content')
	<section class="container py-5">
		<div class="row">
			<div class="col">
				<h3 class="[ page-title ]">
					<a href="{{ route('dashboard.contracts') }}">{{ __('dashboard/contracts.contracts') }}</a>
					/
					<span>{{ $contract->title }}</span>
				</h3>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<div class="[ air-card contract ]">
					<div class="[ air-card__content ]">
						<div class="[ contract ]">
							<div class="[ contract-header ] container">
								<div class="row">
									<div class="col-2 py-3">
										<div class="h5 font-weight-bold">{{ $contract->title }}</div>
										<div>{{ __('common.contracts.types.' . $contract->type . '.title') }} Contract</div>
										<div class="text-nowrap">
											{{ $contract->created_at->format('M j, o') }}
											&mdash;
											{{ $contract->closed_at ? $contract->closed_at->format('M j, o') : 'Present' }}
										</div>
									</div>
									<div class="col d-flex align-items-center">
										<a href="#" class="[ contract-item__employer-user ] d-inline-flex align-items-center" title="{{ $contract->employer_user->full_name }}">
											<img height="30px" class="mr-1" src="{{ $contract->employer_user->image->urls->tiny }}">
											@if ($contract->employer_user_id != auth()->user()->id)
												<span class="ml-1">{{ $contract->employer_user->full_name }}</span>
											@endif
										</a>
										<span class="mx-1">&rarr;</span>
										<a href="#" class="[ contract-item__employee-user ] d-inline-flex align-items-center" title="{{ $contract->employee_user->full_name }}">
											<img height="30px" class="mr-1" src="{{ $contract->employee_user->image->urls->tiny }}">
											@if ($contract->employee_user_id != auth()->user()->id)
												<span class="ml-1">{{ $contract->employee_user->full_name }}</span>
											@endif
										</a>
									</div>
									<div class="col-3 d-flex justify-content-end align-items-center">
										<div>
											<button class="[ contract-header__pay-now-button ] btn btn-primary">
												{!! __('dashboard/contacts.pay_now') !!}
											</button>
											<button class="[ contract-header__close-contract-button ] btn btn-secondary">
												{!! __('dashboard/contacts.close_contract') !!}
											</button>
										</div>
									</div>
								</div>
							</div>
							<div class="[ contract-statistics ] container"></div>
							@if ($contract->type == App\Models\Contract::TYPE_FIXED_PRICE)
								<div class="[ contract-no-milestone ] container d-none">
									<div class="row">
										<div class="col p-3 text-center">
											<button class="[ contract-no-milestone__add-new-button ] btn btn-primary">
												{!! __('dashboard/contacts.add_new_milestone') !!}
											</button>
										</div>
									</div>
								</div>
								<div class="[ contract-current-milestone ] container"></div>
								<div class="[ contract__upcoming-milestones ] container">
									<div class="row">
										<div class="col py-3">
											<div class="font-weight-bold">
                                                {!! __('dashboard/contacts.upcoming_milestones', ['count' => 0]) !!}
                                            </div>
											<div class="[ contract-upcoming-milestone-list ] mt-1 d-none"></div>
											@if ($contract->employer_user_id == auth()->user()->id)
												<button class="[ contract__add-new-milestone-button ] btn btn-primary mt-1">
													{!! __('dashboard/contacts.add_new_milestone') !!}
												</button>
											@endif
										</div>
									</div>
								</div>
								<div class="[ contract__completed-milestones ] container">
									<div class="row">
										<div class="col py-3">
											<div class="font-weight-bold">
                                                {!! __('dashboard/contacts.completed_milestones', ['count' => 0]) !!}
											</div>
											<div class="[ contract-completed-milestone-list ] mt-1 d-none"></div>
										</div>
									</div>
								</div>
							@endif
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
@endsection

@ejs_template('dashboard.contract_header')
@ejs_template('dashboard.contract_statistics')
@ejs_template('dashboard.contract_current_milestone')
@ejs_template('dashboard.contract_upcoming_milestone_item')
@ejs_template('dashboard.contract_completed_milestone_item')
