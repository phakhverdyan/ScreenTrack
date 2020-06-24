popovers.manage_project_task_members = function(options) {
	options = options || {};

	var popover = new Popover({
		trigger: options.trigger,
		arrow: false,

		content: function() {
			return template('manage-project-task-members-popover', {
				title: options.title || 'Members',
				project: options.project,
				project_task: options.project_task(),
			});
		},
	});

	popover.initialize = function() {
		var project = options.project;
		var project_board = options.project_board;
		var project_task = options.project_task();
		var $member_select = popover.$element.find('.popover-member-select');
		var $member_list = popover.$element.find('.popover-member-list');
		var $invitation_form = popover.$element.find('.popover__invitation-form');
		var $invitation_form_button = $invitation_form.find('button[type="submit"]');

		$member_select.removeClass('custom-select').selectize({
			closeAfterSelect: false,
			selectOnTab: false,
			valueField: 'id',
            searchField: [ 'slug', 'full_name', 'email' ],

            placeholder: ([ 'OWNER', 'ADMINISTRATOR' ].indexOf(project.pivot.role) > -1
                ? __('popovers.manage_project_task_members.enter_name_username_or_email')
                : __('popovers.manage_project_task_members.enter_name_or_username')
            ),

            render: {
                option: function(item, escape) {
                    return (
                        '<div class="selectize-item + is-user ' + (item.is_selected ? 'is-selected' : '') + '">' +
                            '<img class="selectize-item__image" src="https://image.flaticon.com/icons/svg/236/236831.svg" alt="">' +
                            '<span class="selectize-item__title">' + escape(item.title) + '</span>' +
                        '</div>'
                    );
                },
            },

			onInitialize: function() {
				var selectize = this;
				selectize.selected_items = [];
				selectize.$control_input.attr('autocomplete', 'st-disabled');
				selectize.$dropdown.off('mousedown');

				selectize.addOption(project_board.members.map(function(project_member) {
					var is_selected = project_task.members.some(function(project_task_member) {
						return project_member.user_id == project_task_member.user_id;
					});

					return Object.assign({}, project_member.user, {
						is_selected: is_selected,
					});
				}));

				selectize.selected_items = project_board.members.filter(function(project_member) {
					return project_task.members.some(function(project_task_member) {
						return project_member.user_id == project_task_member.user_id;
					});
				}).map(function(project_member) {
					return String(project_member.user_id);
				});

				selectize.setTextboxValue = function() {};
				selectize.setActiveOption = function() {};

				selectize.addItem = function(item_id) {
					if (selectize.$wrapper.hasClass('loading')) {
						return;
					}

					var $option = selectize.getOption(item_id);

					if (selectize.selected_items.indexOf(item_id) > -1) {
						selectize.selected_items.splice(selectize.selected_items.indexOf(item_id), 1);
						$option.removeClass('is-selected');
						selectize.$wrapper.addClass('loading');

						request({
							url: '/project_tasks/' + project_task.id + '/member_users/' + item_id + '/remove',
						}, function(response) {
							selectize.$wrapper.removeClass('loading');

							if (response.error) {
								$.notify(response.error, 'error');
								return;
							}

							options.task_updated({
								project_task_members: response.data.members,
								// project_members: response.data.project.members,
							});
						});
					} else {
						selectize.selected_items.push(item_id);
						$option.addClass('is-selected');
						selectize.$wrapper.addClass('loading');

						request({
							url: '/project_tasks/' + project_task.id + '/member_users/' + item_id + '/add',
						}, function(response) {
							selectize.$wrapper.removeClass('loading');

							if (response.error) {
								$.notify(response.error, 'error');
								return;
							}

							options.task_updated({
								project_task_members: response.data.members,
								// project_members: response.data.project.members,
							});
						});
					}
				};

				selectize.onKeyDown = function(event) {
					if (event.keyCode === 13 && !$invitation_form.hasClass('d-none')) {
						$invitation_form.submit();
					}
				};

				selectize.open();

				setTimeout(function() {
					popover.update();
				});
			},

			onType: function(value) {
				var selectize = this;
				var is_email = /^\S+@\S+\.\S+$/.test(value);
				var has_results = (this.currentResults.items.length > 0);
				selectize.$dropdown.toggleClass('is-hidden', !has_results);
				popover.$element.find('.popover__no-members-message').toggleClass('d-none', has_results);
				// popover.$element.find('.popover__no-members-message').toggleClass('d-none', has_results || is_email);
				// $invitation_form.toggleClass('d-none', has_results || !is_email);

				// if (!has_results && is_email) {
				// 	var email_parts = value.split(/@/)[0].split(/[^a-z0-9]+/i);
				// 	$invitation_form.find('input[name="user[first_name]"]').val(email_parts[0] || '');
				// 	$invitation_form.find('input[name="user[last_name]"]').val(email_parts[1] || '');
				// 	$invitation_form.find('input[name="user[email]"]').val(value);
				// }

				popover.fix();
			},
		});

		$invitation_form.submit(function(event) {
			event.preventDefault();

			if ($invitation_form_button.hasClass('is-loading')) {
				return;
			}

			$invitation_form_button.addClass('is-loading disabled');

			request({
				method: 'POST',
				url: '/project_tasks/' + project_task.id + '/member_users/invite',
				data: $invitation_form.serialize(),
			}, function(response) {
				$invitation_form_button.removeClass('is-loading disabled');

				if (response.error) {
					$.notify(response.error, 'error');
					return;
				}

				options.task_updated({
					project_task_members: response.data.members,
					// project_members: response.data.project.members,
				});

				var selectize = $member_select.data('selectize');
				selectize.$control_input.val('');
				$invitation_form.find('input').val('');
				$invitation_form.addClass('d-none');
				selectize.open();
				selectize.clearOptions();

				selectize.addOption(response.data.project.members.map(function(project_member) {
					var is_selected = response.data.members.some(function(project_task_member) {
						return project_member.user_id == project_task_member.user_id;
					});

					return Object.assign({}, project_member.user, {
						is_selected: is_selected,
					});
				}));
			});
		});

		$invitation_form.on('keypress', function(event) {
			(event.keyCode === 13) && $invitation_form.submit();
		});

		$invitation_form.find('button[type="submit"]').click(function(event) {
			$invitation_form.submit();
		});
	};

	return popover;
};