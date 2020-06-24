popovers.invite_project_member = function(options) {
	options = options || {};
	var project = options.project;

	var popover = new Popover({
		trigger: options.trigger,
		arrow: false,
		placement: 'bottom',
		close_on_blur: false,

		content: function(popover) {
			return template('invite-project-member-popover', {
				title: options.title || 'Invite a new Member',
				project: project,
				id: popover.id,
			});
		},
	});

	popover.initialize = function() {
		var card = null;
		var selected_user = null;
		var user_type = null;
		var user_role = null;
		var contract_type = 'HOURLY';
		var contract_payment_type = 'DIRECT';
		var milestones = [{ title: null, amount: null }];

		var $content = popover.$element.find('.popover-content');
		var $user_type_block = popover.$element.find('.popover__user-type-block');
		var $user_type_pills = popover.$element.find('.popover__user-type-pills');
		var $contract_type_pills = popover.$element.find('.popover__contract-type-pills');
		var $contract_type_input = popover.$element.find('input[name="contract[type]"]');
        var $contract_payment_type_pills = popover.$element.find('.popover__contract-payment-type-pills');
        var $contract_payment_type_input  = popover.$element.find('input[name="contract[payment_type]"]');
        var $contract_payment_type_direct_text = popover.$element.find('.popover__contract-payment-type-direct-text');
		var $contract_payment_type_escrow_text = popover.$element.find('.popover__contract-payment-type-escrow-text');
		var $user_type_freelancer_text = popover.$element.find('.popover__user-type-freelancer-text');
		var $user_type_employer_text = popover.$element.find('.popover__user-type-employer-text');
		var $payment_type_direct_text = popover.$element.find('.popover_payment_type_direct_text');
		var $payment_type_escrow_text = popover.$element.find('.popover_payment_type_escrow_text');
		var $invitation_form = popover.$element.find('.popover__invitation-form');
		var $member_was_added_block = $('.popover__member-was-added-block');
		var $member_was_added_block_close_button = $('.popover__member-was-added-block__close-button');
		var $project_member_select = popover.$element.find('.popover-member-select');
		var $project_member_role_select = popover.$element.find('#popover-' +  popover.id + '__role');
		var $role_block = popover.$element.find('.popover__invitation-form__role-block');
		var $boards_block = popover.$element.find('.popover__invitation-form__boards-block');
		var $project_boards_select = popover.$element.find('#popover-' +  popover.id + '__boards');
		var $invitation_form_submit_button = $invitation_form.find('button[type="submit"]');
		var $invitation_parameters_block = popover.$element.find('.popover__invitation-parameters-block');
		var $first_name_input = popover.$element.find('input[name="user[first_name]"]');
		var $last_name_input = popover.$element.find('input[name="user[last_name]"]');
		var $name_block = popover.$element.find('.popover__invitation-form__name-block');
		var $contract_block = popover.$element.find('.popover__contract-block');
		var $contract_details_block = popover.$element.find('.popover__contract-details-block');
		var $hourly_rate_block = popover.$element.find('.popover__invitation-form__hourly-rate-block');
		var $credit_card_block = popover.$element.find('.popover__invitation-form__credit-card-block');
		var $hourly_rate_input = popover.$element.find('[name="contract[hourly_rate]"]');
		var $contract_title_input = popover.$element.find('[name="contract[title]"]');
		var $have_contract_text = popover.$element.find('.popover__have-contract-text');
		var $milestone_block = popover.$element.find('.popover__milestone-block');
		var $add_milestone_button = popover.$element.find('.popover__add-milestone-button');
		var $milestone_items = popover.$element.find('.popover__milestone-items');

		// ---------------------------------------------------------------------- //

		var update_contract_type_input = function() {
			contract_type = $contract_type_pills.find('.nav-link.active').attr('data-value') || null;
			$contract_type_input.val(contract_type).prop('disabled', !contract_type);
		};
		
		var update_contract_payment_type_input = function() {
			contract_payment_type = $contract_payment_type_pills.find('.nav-link.active').attr('data-value') || null;
			$contract_payment_type_input.val(contract_payment_type).prop('disabled', !contract_payment_type);
		};

		// ---------------------------------------------------------------------- //

		var update_visibility = function() {
			$user_type_block.toggleClass('d-none', project.pivot.role != 'OWNER');

			if (user_type === 'FREELANCER') {
				$user_type_freelancer_text.addClass('show');
				$user_type_employer_text.removeClass('show');
			} else if (user_type === 'EMPLOYER') {
				$user_type_freelancer_text.removeClass('show');
				$user_type_employer_text.addClass('show');
			}

			if (selected_user) {
				$invitation_parameters_block.addClass('show');

				if (selected_user.id) {
					$invitation_form.find('[name="user[id]"]').prop('disabled', false).val(selected_user.id);
					$invitation_form.find('[name="user[email]"]').prop('disabled', true);
				} else {
					$invitation_form.find('[name="user[id]"]').prop('disabled', true);
					$invitation_form.find('[name="user[email]"]').prop('disabled', false).val(selected_user.email);
				}

				if (project.pivot.role === 'OWNER' && user_type === 'FREELANCER') {
					$role_block.addClass('show');
				} else {
					$role_block.removeClass('show');
				}

				if (project.pivot.role === 'OWNER' && user_type === 'FREELANCER' && user_role === 'CONTRACTOR') {
					$boards_block.addClass('show');
				} else {
					$boards_block.removeClass('show');
				}

				if (selected_user.id) {
					$name_block.removeClass('show');
				} else {
					$name_block.addClass('show');
				}

				if (project.pivot.role === 'OWNER') {
					if (user_type === 'FREELANCER') {
						if (selected_user.contract) {
							$contract_block.removeClass('show');
						} else {
							$contract_block.addClass('show');
						}
					} else if (user_type === 'EMPLOYER') {
						$contract_block.removeClass('show');
					}
				} else {
					$contract_block.removeClass('show');
				}
				
				if (contract_payment_type === 'DIRECT') {
					$contract_payment_type_direct_text.addClass('show');
					$contract_payment_type_escrow_text.removeClass('show');
					$hourly_rate_block.removeClass('show');
					$milestone_block.removeClass('show');
					$contract_details_block.addClass('show');
				} else if (contract_payment_type === 'ESCROW') {
					$contract_payment_type_direct_text.removeClass('show');
					$contract_payment_type_escrow_text.addClass('show');
					
					if (contract_type === 'HOURLY') {
						$contract_details_block.addClass('show');
						$hourly_rate_block.addClass('show');
						$milestone_block.removeClass('show');
					} else if (contract_type === 'FIXED_PRICE') {
						$contract_details_block.addClass('show');
						$hourly_rate_block.removeClass('show');
						$milestone_block.addClass('show');
					} else {
						$contract_details_block.removeClass('show');
					}
				}

				if (selected_user.contract) {
					$have_contract_text.removeClass('d-none');
				} else {
					$have_contract_text.addClass('d-none');
				}

				if (!auth.user.default_credit_card && [ 'HOURLY', 'FIXED_PRICE' ].indexOf(contract_type) > -1 && contract_payment_type === 'ESCROW') {
					$credit_card_block.addClass('show');
				} else {
					$credit_card_block.removeClass('show');
				}
			} else {
				$invitation_parameters_block.removeClass('show');
				// $project_member_select.data('selectize').focus();
			}

			popover.update();
		};

		var update_focus = function(options) {
			options = options || {};
			options.after = options.after || null;

			if (!selected_user) {
				$project_member_select.data('selectize').focus();
				console.log('project member select focus');
				return;
			}

			if ([ 'selected_user', 'user_type', 'user_role' ].indexOf(options.after) > -1) {
				if (!selected_user.id) {
					if (!$first_name_input.val()) {
						$first_name_input.focus();
						console.log('first name input focus');
						return;
					}

					if (!$last_name_input.val()) {
						$last_name_input.focus();
						console.log('last name input focus');
						return;
					}
				}
			}

			if (!selected_user.contract) {
				if (contract_payment_type === 'DIRECT') {
					if (!$contract_title_input.val()) {
						$contract_title_input.focus();
						return;
					}
				} else {
					if (contract_type === 'HOURLY') {
						if (!$hourly_rate_input.val()) {
							$hourly_rate_input.focus();
							return;
						}
						
						if (!$contract_title_input.val()) {
							$contract_title_input.focus();
							return;
						}
					} else if (contract_type === 'FIXED_PRICE') {
						if (!$contract_title_input.val()) {
							$contract_title_input.focus();
							return;
						}
					} else {
						//
					}
				}
			}

			//

			console.log('nothing to focus :C');
		};

		var update_visibility_and_focus = function(options) {
			update_visibility(options);
			update_focus(options);
		};
		
		// ---------------------------------------------------------------------- //
		
		$contract_payment_type_pills.find('.nav-link').click(function(event) {
			event.preventDefault();
			$contract_payment_type_pills.find('.nav-link').removeClass('active');
			$(this).addClass('active');
			update_contract_payment_type_input();
			update_visibility_and_focus({ after: 'contract_payment_type' });
		});

		update_contract_payment_type_input();

		$user_type_pills.find('.nav-link').click(function(event) {
			event.preventDefault();
			$user_type_pills.find('.nav-link').removeClass('active');
			$(this).addClass('active');
			user_type = $(this).attr('data-value');
			update_visibility_and_focus();
		});

		user_type = $user_type_pills.find('.nav-link.active').attr('data-value');

		// $contract_type_pills.find('.nav-link').click(function(event) {
		// 	event.preventDefault();
		// 	$contract_type_pills.find('.nav-link').removeClass('active');
		// 	$(this).addClass('active');
		// });

		$project_member_select.removeClass('custom-select').selectize({
			valueField: 'id',
			searchField: [ 'email', 'full_name', 'slug' ],
			placeholder: __('popovers.invite_project_member.enter_name_username_or_email'),

			render: {
				item: function(item, escape) {
					return (
						'<div class="selectize-item + is-user ' + (item.is_selected ? 'is-selected' : '') + '">' +
							(item.image
								? '<img class="selectize-item__image" src="' + item.image.urls.tiny + '" alt="">'
								: ''
							) +
							'<span class="selectize-item__title">' +
								(item.full_name
									? escape(item.full_name) + ' (' + item.slug + ')'
									: item.slug
								) +
							'</span>' +
						'</div>'
					);
				},

				option: function(item, escape) {
					return (
						'<div class="' +
							'selectize-item + is-user ' +
							(item.is_joined_project ? 'has-description is-disabled' : '') +
						'">' +
							(item.image
								? '<img class="selectize-item__image" src="' + item.image.urls.tiny + '" alt="">'
								: ''
							) +
							'<span class="selectize-item__title">' +
								(item.full_name
									? escape(item.full_name) + ' (' + item.slug + ')'
									: item.slug
								) +
							'</span>' +
							(item.is_joined_project
								? '<span class="selectize-item__description">(already joined)</span>'
								: ''
							) +
						'</div>'
					);
				},
			},

			load: function(query, callback) {
				this.clearOptions();

				return request({
					url: '/users/autocomplete',

					data: {
						inviting_project_id: project.id,
						query: query,
					},
				}, function(response) {
					return callback(response.data);
				});
			},

			onChange: function(item_id) {
				if (!item_id) {
					selected_user = null;
					$invitation_form.find('[name="user[id]"]').prop('disabled', true);
					$invitation_form.find('[name="user[email]"]').prop('disabled', true);
					update_visibility_and_focus();
					return;
				}

				selected_user = this.options[item_id];

				if (!selected_user.id) {
					var email_parts = selected_user.email.split(/@/)[0].split(/[^a-z0-9]+/i);
					$first_name_input.val(email_parts[0] || '');
					$last_name_input.val(email_parts[1] || '');
				}

				if (selected_user.contract) {
					$have_contract_text.find('.popover__have-contract-text__hourly-rate').text(selected_user.contract.hourly_rate);
				} else {
					$hourly_rate_input.val(selected_user.hourly_rate || '');
					$contract_title_input.val(selected_user.professional_title || '');
				}

				update_visibility_and_focus({ after: 'selected_user' });
			},

			onInitialize: function() {
				var selectize = this;
				selectize.$control_input.attr('autocomplete', 'st-disabled');
				selectize.$control_input.focus();

				selectize.$control_input.on('input', function() {
					var original_value = $(this).val();
					var fixed_value = $(this).val().replace(/^mailto:/, '');

					if (original_value != fixed_value) {
						$(this).val(fixed_value);
					}
				});
			},
		});

		$project_member_role_select.removeClass('custom-select').selectize({
			valueField: 'value',
			// searchField: [ 'email', 'full_name', 'slug' ],
			// placeholder: 'Enter role name',

			render: {
				item: function(item, escape) {
					return (
						'<div class="selectize-item + is-project-role">' +
							'<span class="selectize-item__title">' + item.title + '</span>' +
						'</div>'
					);
				},

				option: function(item, escape) {
					return (
						'<div class="selectize-item + is-project-role">' +
							'<span class="selectize-item__title">' + item.title + '</span>' +
							'<span class="selectize-item__description">' +  item.description + '</span>' +
						'</div>'
					);
				},
			},

			onChange: function(item_id) {
				user_role = item_id;
				update_visibility_and_focus({ after: 'user_role' });
			},

			onInitialize: function() {
				var selectize = this;

				selectize.addOption({
					value: 'CONTRACTOR',
					title: __('common.project_members.roles.CONTRACTOR.extra_title'),
					description: __('common.project_members.roles.CONTRACTOR.description'),
				});

				if (project.pivot.role == 'OWNER') {
					selectize.addOption({
						value: 'ADMINISTRATOR',
						title: __('common.project_members.roles.ADMINISTRATOR.extra_title'),
						description: __('common.project_members.roles.ADMINISTRATOR.description'),
					});
				}

				selectize.addItem('CONTRACTOR');
				selectize.$control_input.css('visibility', 'hidden');

				selectize.$control_input.on('input', function(event) {
					event.preventDefault();
					event.stopPropagation();
					return false;
				});
			},
		});

		$project_boards_select.removeClass('custom-select').selectize({
			plugins: [ 'remove_button' ],
		});

		$contract_type_pills.find('.nav-link').click(function(event) {
			event.preventDefault();
			$contract_type_pills.find('.nav-link').removeClass('active');
			$(this).addClass('active');
			update_contract_type_input();
			update_visibility_and_focus({ after: 'contract_type' });
		});

		update_contract_type_input();

		// $contract_block.toggleClass('show', project.pivot.role == 'OWNER');

		// $invitation_parameters_block.on('shown.bs.collapse', function() {
		// 	$invitation_parameters_block.find('input[type="text"], input[type="number"]').each(function() {
		// 		if (!$(this).val() && $(this).is(':visible')) {
		// 			$(this).focus();
		// 			return false;
		// 		}
		// 	});
		// });

		// $is_time_trackable_checkbox.on('change', function() {
		// 	if ($is_time_trackable_checkbox.prop('checked')) {
		// 		$with_protection_text.removeClass('d-none');
		// 		$without_protection_text.addClass('d-none');
		// 	} else {
		// 		$with_protection_text.addClass('d-none');
		// 		$without_protection_text.removeClass('d-none');
		// 	}

		// 	if ($is_time_trackable_checkbox.prop('checked') && !selected_user.contract) {
		// 		$hourly_rate_block.collapse('show');
		// 		$hourly_rate_input.focus();
		// 	} else {
		// 		$hourly_rate_block.collapse('hide');
		// 	}
		// });

		// popover.$element.find('.popover__invitation-form__message').on('input', function(event) {
		// 	event.preventDefault();
		// 	$(this).innerHeight(0);
		// 	$(this).innerHeight(this.scrollHeight);
		// });

        // ---------------------------------------------------------------------- //

		function initialize_milestone_item() {
			var $self = $(this);
			var index = parseInt($self.attr('data-index'));
			var milestone = milestones[index];

			$self.find('input[name="contract[milestones][' + index + '][title]"]').on('input', function() {
				milestone.title = $(this).val();
			});

			$self.find('input[name="contract[milestones][' + index + '][amount]"]').on('input', function() {
				milestone.amount = parseFloat($(this).val());
				// console.log(milestone);
			});

			$self.find('.popover__milestone-item__remove-button').click(function() {
				var index = parseInt($self.attr('data-index'));
				milestones.splice(index, 1);
				render_milestones();
			});
		}

		function render_milestones() {
			$milestone_items.html('');

			milestones.forEach(function(milestone, milestone_index) {
				$(template('invite-project-member-popover-milestone-item', {
					id: popover.id,
					index: milestone_index,
					title: milestone.title,
					amount: milestone.amount,
				})).each(initialize_milestone_item).appendTo($milestone_items);
			});
		}

		render_milestones();

		$add_milestone_button.click(function(event) {
			event.preventDefault();

			milestones.push({
				title: null,
				amount: null,
			});

			render_milestones();
			$content.scrollTop($content[0].scrollHeight);
			$milestone_items.children().last().find('input:first').focus();
		});

		(function initialize_stripe_input() {
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
			card.mount(popover.$element.find('.stripe-card-element')[0] || null);

			card.addEventListener('change', function(event) {
				if (event.error) {
					popover.$element.find('.stripe-card-errors').text(event.error.message).removeClass('d-none');
				} else {
					popover.$element.find('.stripe-card-errors').text('').addClass('d-none');
				}
			});
		})();

		$invitation_form.submit(function(event) {
			event.preventDefault();

			if (!selected_user) {
				$project_member_select.data('selectize').$control_input.focus();
				return;
			}

			if ($invitation_form_submit_button.hasClass('is-loading')) {
				return;
			}

			$invitation_form_submit_button.addClass('is-loading disabled');

			if (project.pivot.role == 'OWNER' && user_type == 'EMPLOYER') {
				popover.$element.find('[name="project_member[role]"]').val('OWNER');
			} else {
				popover.$element.find('[name="project_member[role]"]').val($project_member_role_select.val());
			}

			return (function(callback) {
				if (!$contract_block.hasClass('show')) {
					return callback();
				}

				if (!contract_type || !$credit_card_block.hasClass('show')) {
					return callback();
				}

				return stripe.createToken(card).then(function(result) {
					if (result.error) {
						$invitation_form_submit_button.removeClass('is-loading disabled');
						$invitation_form.find('.stripe-card-errors').text(result.error.message).removeClass('d-none');
						return;
					}

					$invitation_form.find('.stripe-card-errors').addClass('d-none');
					$invitation_form.find('[name="stripe_token_id"]').val(result.token.id);
					return callback();
				});
			})(function() {
				return request({
					method: 'POST',
					url: '/projects/' + project.id + '/invite_member',
					data: $invitation_form.serialize(),
				}, function(response) {
					$invitation_form_submit_button.removeClass('is-loading disabled');

					if (new Validator($invitation_form, response).fails()) {
						return;
					}

					if (response.error) {
						$.notify(response.error, 'error');
						return;
					}

					var project_member = project.members.filter(function(current_project_member) {
						return current_project_member.id == response.data.id;
					})[0] || null;

					if (!project_member) {
						project_member = response.data;
						project.members.push(project_member);
					}

					project.renderMembers();

					dashboard.selected_board && (function() {
						var board_member = response.data.board_members.filter(function(board_member) {
							return dashboard.selected_board.id == board_member.board_id;
						})[0] || null;

						if (!board_member) {
							return;
						}

						board_member.user = response.data.user;
						board_member.project_member = Object.assign({}, project_member);
						dashboard.selected_board.members.push(board_member);
						dashboard.selected_board.renderMembers();
					})();

					$invitation_form.removeClass('show');
					$member_was_added_block.addClass('show');
				});
			});
		});

		$member_was_added_block_close_button.click(function(event) {
			event.preventDefault();
			popover.close();
		});

		update_visibility();
	};

	popover.shown = function() {
		update_focus();
	};
};
