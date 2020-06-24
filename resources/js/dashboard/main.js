dashboard.template = function(template_name, options) {
	return template('dashboard-' + template_name, options);
};

// ---------------------------------------------------------------------- //

$(function() {
	(function initialize_project_select() {
		var $create_project_button = $('.navbar__create-new-project-button');

		$('.navbar__project-select').removeClass('custom-select').selectize({
			valueField: 'id',
			labelField: 'name',
			searchField: [ 'name' ],
			placeholder: 'Select Project',
			sortField: [{ field: 'index', direction: 'asc' }],

			render: {
				item: function(item, escape) {
					return (
						'<div class="selectize-item + is-project">' +
							'<span class="selectize-item__name">' + escape(item.name) + '</span>' +
						'</div>'
					);
				},

				option: function(item, escape) {
					return (
						'<div class="selectize-item + is-project">' +
							'<' + (item.id ? 'span' : 'b') + ' class="selectize-item__name">' +
								(item.id ? '' : '<img src="/img/christmas-stars.svg" style="width: 20px;" alt=""> ') +
								escape(item.name) +
							'</' + (item.id ? 'span' : 'b') + '>' +
						'</div>'
					);
				},

				option_create: function(data, escape) {
					return (
						'<div class="selectize-item-create create">' +
							'<img src="/img/christmas-stars.svg" style="width: 20px;" alt=""> ' +
                            __('common.project_selector.create') + ' `<strong>' + escape(data.input) + '</strong>`' +
						'</div>'
					);
				},
			},

			create: function(value, callback) {
				var selectize = this;

				setTimeout(function() {
					$create_project_button.popover('show');
					var $popover_tip = $($create_project_button.data('bs.popover').tip);
					$popover_tip.find('input[name="project[name]"]').val(value);
				});
			},

			onInitialize: function() {
				var selectize = this;
				selectize.$control_input.attr('autocomplete', 'st-disabled');

				selectize.addOption(auth.user.projects.map(function(project, project_index) {
					return Object.assign({}, project, {
						index: project_index,
					});
				}));

				selectize.addOption({
					id: 0,
					name: __('common.project_selector.create_new_project'),
					index: null,
				});

				dashboard.selected_project && selectize.addItem(dashboard.selected_project.id);
				selectize.refreshState();

				selectize.on('change', function(project_id) {
					if (!project_id) {
						selectize.addOption({
							id: 0,
							name: __('common.project_selector.create_new_project'),
							index: null,
						});

						return;
					}

					project_id = parseInt(project_id);

					if (project_id) {
						window.location.href = '/dashboard/projects/' + project_id;
						return;
					}

					selectize.clear();
					$create_project_button.popover('show');
				});

				selectize.$control_input.on('input', function() {
					selectize.updatePlaceholder();
					selectize.$dropdown.removeClass('is-hidden');

					if ($(this).val()) {
						selectize.removeOption(0);
					} else {
						selectize.addOption({
							id: 0,
							name: __('common.project_selector.create_new_project'),
							last_viewed_at: 'Z',
						});
					}
				});
			},

			onDropdownOpen: function($dropdown) {
				console.log('dropdown open', $dropdown.find(''));
			},
		});
	})();

	$('.navbar-feedback__input').on('input', function() {
		if ($(this).data('modal')) {
			return;
		}

		$(this).data('modal', modals.user_feedback());
	});

	(function initialize_sidebar() {
		$('.sidebar__minimize-button').click(function(event) {
			event.preventDefault();
			var $sidebar = $(this).parents('.sidebar');

			if ($sidebar.hasClass('is-minimized')) {
				localStorage.setItem('sidebar_is_minimized', 0);
				$sidebar.removeClass('is-minimized');
			} else {
				localStorage.setItem('sidebar_is_minimized', 1);
				$sidebar.addClass('is-minimized');
			}
		});

		if (localStorage.getItem('sidebar_is_minimized')) {
			$('.sidebar').toggleClass('is-minimized', parseInt(localStorage.getItem('sidebar_is_minimized')) ? true : false);
		} else {
			$('.sidebar').toggleClass('is-minimized', $(window).width() <= 768);
		}

		setTimeout(function() {
			$('.sidebar').addClass('is-animated');
			$('.content').addClass('is-animated');
		}, 250);
	})();

	(function initialize_chat_panel_invite_form() {
		var $root = $('.chat-panel-invite-form');
		var card = null;
		var $user_select = $root.find('#chat-panel-invite-form__user-select');
		var $email_input = $root.find('input[name="user[email]"]');
		var $chat_message_textarea = $root.find('textarea[name="chat_message[text]"]');
		var $project_section = $root.find('.chat-panel-invite-form__project-section');
		var $member_section = $root.find('.chat-panel-invite-form__member-section');
		var $contract_block = $root.find('.chat-panel-invite-form__contract-block');
		var $project_select = $root.find('select[name="project_member[project_id]"]');
		var $project_member_role_select = $root.find('select[name="project_member[role]"]');
		var $project_member_role_administrator_option = $project_member_role_select.find('option[value="ADMINISTRATOR"]');
		var $close_button = $root.find('.chat-panel-invite-form__close-button');
		var $hourly_rate_block = $root.find('.chat-panel-invite-form__hourly-rate-block');
		var $hourly_rate_input = $root.find('[name="contract[hourly_rate]"]');
		var $contract_title_input = $root.find('[name="contract[title]"]');
		var $credit_card_block = $root.find('.chat-panel-invite-form__credit-card-block');
		var $is_time_trackable_block = $root.find('.chat-panel-invite-form__is-time-trackable-block');
		var $is_time_trackable_checkbox = $root.find('#chat-panel-invite-form__is-time-trackable-checkbox');
		var $with_protection_text = $root.find('.chat-panel-invite-form__with-protection-text');
		var $without_protection_text = $root.find('.chat-panel-invite-form__without-protection-text');
		var $submit_button = $root.find('button[type="submit"]');
		var selected_user = null;
		var selected_project = null;

		$user_select.removeClass('custom-select').selectize({
			valueField: 'id',
			searchField: [ 'email', 'full_name', 'slug' ],
			placeholder: __('sidebar.invite_to_chat'),

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
							(item.id == auth.user.id ? 'has-description is-disabled' : '') +
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
							(item.id == auth.user.id ? '<span class="selectize-item__description">(it\'s you)</span>' : '') +
						'</div>'
					);
				},
			},

			load: function(query, callback) {
				this.clearOptions();

				return request({
					url: '/users/autocomplete',

					data: {
						with_collaborative_projects: true,
						query: query,
					},
				}, function(response) {
					return callback(response.data);
				});
			},

			onChange: function(item_id) {
				var selectize = this;
				var project_selectize = $project_select.data('selectize');

				if (!item_id) {
					selected_user = null;
					$root.find('[name="user[id]"]').prop('disabled', true);
					$root.find('[name="user[email]"]').prop('disabled', true);
					$root.addClass('is-minimized');
					selectize.$wrapper.addClass('has-dropdown-on-top');
					project_selectize.clear();
					project_selectize.clearOptions();
					return;
				}

				selected_user = selectize.options[item_id];

				if (selected_user.id) {
					$root.find('[name="user[id]"]').prop('disabled', false).val(selected_user.id);
					$root.find('[name="user[email]"]').prop('disabled', true);
				} else {
					$root.find('[name="user[id]"]').prop('disabled', true);
					$root.find('[name="user[email]"]').prop('disabled', false).val(selected_user.email);
				}

				$root.removeClass('is-minimized');
				selectize.$wrapper.removeClass('has-dropdown-on-top');
				project_selectize.clear();
				project_selectize.clearOptions();

				project_selectize.addOption(auth.user.projects.filter(function(project) {
					return [ 'OWNER', 'ADMINISTRATOR' ].indexOf(project.pivot.role) > -1;
				}).map(function(project, project_index) {
					return Object.assign({}, project, {
						index: project_index,

						is_aready_joined: selected_user.collaborative_projects.some(function(collaborative_project) {
							return collaborative_project.id == project.id;
						}),
					});
				}));

				$('.chat-list-search__input').val() && $('.chat-list-search__input').val('').trigger('input');
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

			onDropdownClose: function() {
				this.clearOptions();
			},
		});

		$chat_message_textarea.focus(function() {
			$chat_message_textarea.select();

		    $chat_message_textarea.mouseup(function() {
		        $chat_message_textarea.unbind('mouseup');
		        return false;
		    });
		});

		$close_button.click(function(event) {
			event.preventDefault();
			$user_select.data('selectize').clear();
			$user_select.data('selectize').clearOptions();
			$user_select.data('selectize').refreshState();
		});

		$project_section.toggleClass('d-none', !auth.user.projects.some(function(project) {
			return [ 'OWNER', 'ADMINISTRATOR' ].indexOf(project.pivot.role) > -1;
		}));

		$project_select.removeClass('custom-select').selectize({
			valueField: 'id',
			labelField: 'name',
			searchField: [ 'name' ],
			placeholder: 'Invite to Project (optional)',
			sortField: [{ field: 'index', direction: 'asc' }],

			render: {
				item: function(item, escape) {
					return (
						'<div class="selectize-item + is-project">' +
							'<span class="selectize-item__name">' + escape(item.name) + '</span>' +
						'</div>'
					);
				},

				option: function(item, escape) {
					return (
						'<div class="selectize-item + is-project ' + (item.is_aready_joined ? 'is-disabled' : '') + '">' +
							'<span class="selectize-item__name">' + escape(item.name) + '</span>' +
							(item.is_aready_joined ? '<span class="selectize-item__description">(already joined)</span>' : '') +
						'</div>'
					);
				},
			},

			onInitialize: function() {
				var selectize = this;
				selectize.$control_input.attr('autocomplete', 'st-disabled');
				selectize.refreshState();
			},

			onChange: function(project_id) {
				var selectize = this;

				if (project_id) {
					selected_project = selectize.options[project_id];
					$project_member_role_administrator_option.val('CONTRACTOR');
					$project_member_role_administrator_option.toggleClass('d-none', selected_project.pivot.role != 'OWNER');
					$contract_block.toggleClass('d-none', selected_project.pivot.role != 'OWNER' || selected_user.has_active_contract_with_me);
					$member_section.collapse('show');
					$is_time_trackable_checkbox.prop('checked', true);
					$is_time_trackable_checkbox.trigger('change');

					if (selected_user.has_active_contract_with_me) {
						$hourly_rate_block.removeClass('show');
					} else {
						$hourly_rate_block.addClass('show');
						$hourly_rate_input.val(selected_user.hourly_rate || '');
						$contract_title_input.val(selected_user.professional_title || '');
					}

					if (auth.user.default_credit_card) {
						$credit_card_block.removeClass('show');
					} else {
						$credit_card_block.addClass('show');
					}

					return;
				}

				selected_project = null;
				$member_section.collapse('hide');
			},
		});

		$member_section.on('shown.bs.collapse', function() {
			$member_section.find('input[type="text"], input[type="number"]').each(function() {
				if (!$(this).val() && $(this).is(':visible')) {
					$(this).focus();
					return false;
				}
			});
		});

		$is_time_trackable_checkbox.on('change', function() {
			if ($is_time_trackable_checkbox.prop('checked')) {
				$with_protection_text.removeClass('d-none');
				$without_protection_text.addClass('d-none');
			} else {
				$with_protection_text.addClass('d-none');
				$without_protection_text.removeClass('d-none');
			}

			if ($is_time_trackable_checkbox.prop('checked') && !selected_user.has_active_contract_with_me) {
				$hourly_rate_block.collapse('show');
				$hourly_rate_input.focus();
			} else {
				$hourly_rate_block.collapse('hide');
			}
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
            card.mount($root.find('.stripe-card-element')[0] || null);

            card.addEventListener('change', function(event) {
                if (event.error) {
                    $root.find('.stripe-card-errors').text(event.error.message).removeClass('d-none');
                } else {
                    $root.find('.stripe-card-errors').text('').addClass('d-none');
                }
            });
        })();

        $root.submit(function(event) {
			event.preventDefault();

			if ($submit_button.hasClass('is-loading')) {
				return;
			}

			$submit_button.addClass('is-loading disabled');

			return (function(callback) {
				if ($contract_block.hasClass('d-none')) {
					return callback();
				}

				if (!$hourly_rate_block.hasClass('show') || !$credit_card_block.hasClass('show')) {
					return callback();
				}

				return stripe.createToken(card).then(function(result) {
					if (result.error) {
						$submit_button.removeClass('is-loading disabled');
						$root.find('.stripe-card-errors').text(result.error.message).removeClass('d-none');
						return;
					}

					$root.find('.stripe-card-errors').addClass('d-none');
					$root.find('[name="stripe_token_id"]').val(result.token.id);
					return callback();
				});
			})(function() {
				return request({
					method: 'POST',
					url: '/users/invite',
					data: $root.serialize(),
				}, function(response) {
					$submit_button.removeClass('is-loading disabled');

					if (new Validator($root, response).fails()) {
						return;
					}

					if (response.error) {
						$.notify(response.error, 'error');
						return;
					}

					var project_member = response.data.project_member || null;
					delete response.data.project_member;

					if (project_member) {
						project_member.user = response.data;
					}

					project_member && dashboard.selected_project && (function() {
						var project = dashboard.selected_project;

						var existent_project_member = project.members.filter(function(current_project_member) {
							return current_project_member.id == project_member.id;
						})[0] || null;

						if (!existent_project_member) {
							project.members.push(project_member);
						}

						project.renderMembers();
					})();

					$user_select.data('selectize').clear();
					$user_select.data('selectize').clearOptions();
					$user_select.data('selectize').refreshState();
				});
			});
		});
	})();

	popovers.create_new_project({
		trigger: $('.navbar__create-new-project-button'),
	});

	popovers.add_contract({
        trigger: $('.navbar__add-contract-button'),
    });

	$('body').removeClass('is-loading');
});

// ---------------------------------------------------------------------- //
//
// - selected project
//
// ---------------------------------------------------------------------- //

if (dashboard.selected_project) {
	if (dashboard.selected_project.members) {
		dashboard.selected_project.renderMembers = function() {
			var $selected_project_members = $('.selected-project-members');
			$selected_project_members.html('');

			dashboard.selected_project.members.slice(0, 7).reverse().forEach(function(project_member) {
				var $selected_project_member = $(dashboard.template('selected-project-member', {
					member: project_member,
				}));

				$selected_project_member.appendTo($selected_project_members);

				popovers.project_member_menu({
					trigger: $selected_project_member,
					project_member: project_member,
					project: dashboard.selected_project,
				});
			});

			var $selected_project_show_more_members_button = $('.selected-project__show-more-members-button');
			$selected_project_show_more_members_button.text('+' + (dashboard.selected_project.members.length - 7));
			$selected_project_show_more_members_button.toggleClass('d-none', dashboard.selected_project.members.length <= 7);
		};

		$(function() {
			dashboard.selected_project.renderMembers();

			popovers.invite_project_member({
				trigger: $('.selected-project__invite-member-button'),
				project: dashboard.selected_project,
			});

			popovers.project_members({
				trigger: $('.selected-project__show-more-members-button'),
				project: dashboard.selected_project,
			});
		});
	}

	$(function() {
		popovers.extra_project_menu({
			trigger: $('.selected-project__extra-menu-button'),
			project: dashboard.selected_project,
		});
	});
}

// ---------------------------------------------------------------------- //
//
// - bootstrap tour
//
// ---------------------------------------------------------------------- //

$(function () {
    function initialize_tips() {
        let tips = window.tips.filter((tip) => {
            return $(tip.selector).length > 0;
        });

        if (tips.length === 0) {
            return;
        }

        let initialize = (available_tips, remaining_only) => {
            let relevant_tips = available_tips.filter((tip) => {
                if (remaining_only) {
                    return !tip.is_viewed;
                }

                return true;
            });

            if (relevant_tips.length === 0) {
                return;
            }

            PageIntro.init({
                container: 'body',
                spacing: 20,

                actions: {
                    skip: {
                        text: (remaining_only ? 'Skip Tour' : 'End Tour'),
                        class: 'btn btn-default btn-sm',
                    }, next: {
                        text: 'Next',
                        class: 'btn btn-primary',
                    }, finish: {
                        text: 'Finish',
                        class: 'btn btn-primary',
                    },
                },

                entries: relevant_tips.map((tip) => {
                    return {
                        selector: tip.selector,
                        text: __('tips.' + tip.key),

                        onExit: () => {
                            !tip.is_viewed && request({
                                url: `/tips/${tip.id}/got_it`,
                            }, function(response) {
                                if (response.error) {
                                    console.error(response.error);
                                    return;
                                }

                                tip.is_viewed = true;
                            });
                        },
                    };
                }),

                onSkip: () => {
                    tips.some((tip) => {
                        return !tip.is_viewed;
                    }) && request({
                        url: `/tips/skip_all`,
                    }, function(response) {
                        if (response.error) {
                            console.error(response.error);
                            return;
                        }

                        tips.forEach((tip) => {
                            tip.is_viewed = true;
                        });
                    });
                },
            });

            PageIntro.start();
        };

        // $('.navbar__tour-button').removeClass('d-none').click(function() {
        //     initialize(tips, false);
        // });

        initialize(tips, true);
    }

    // setTimeout(initialize_tips, 0);
});

//Spendings javascript
$(function(){
    $('#date_range_filter').daterangepicker();
});
