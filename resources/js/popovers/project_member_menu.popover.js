popovers.project_member_menu = function(options) {
	options = options || {};
	var project_member = options.project_member;
	var board_item = options.board_item || null;
	var project = options.project;
	var project_board = options.project_board;

	var popover = new Popover({
		trigger: options.trigger,
		arrow: false,
		placement: 'bottom',

		content: function() {
			return template('project-member-menu-popover', {
				project_member: project_member,
				project: project,
				board_item: board_item,
				project_board: project_board,
			});
		},
	});

	popover.initialize = function() {
		var $default_page = popover.$element.find('.popover-page.is-default');
		var $remove_member_page = popover.$element.find('.popover-page.is-remove-member');
		var $change_role_page = popover.$element.find('.popover-page.is-change-role');

		$default_page.find('.popover-list-item.is-view-profile').click(function(event) {
			event.preventDefault();
			
			slideups.user_profile({
				user_id: project_member.user_id,
				default_tab: 'profile',
			});

			popovers.close();
		});

		$default_page.find('.popover-list-item.is-view-timeline').click(function(event) {
			event.preventDefault();
			
			slideups.user_profile({
				user_id: project_member.user_id,
				default_tab: 'timeline',
			});

			popovers.close();
		});

		$default_page.find('.popover-list-item.is-edit-contract').click(function(event) {
			event.preventDefault();

			slideups.user_profile({
				user_id: project_member.user_id,
				default_tab: 'contract',
			});

			popovers.close();
		});

		$default_page.find('.popover-list-item.is-unassign-from-task').click(function(event) {
			event.preventDefault();
			popovers.close();

			request({
				url: '/project_tasks/' + board_item.object.id + '/member_users/' + project_member.user.id + '/remove',
			}, function(response) {
				if (response.error) {
					$.notify(response.error, 'error');
					return;
				}

				board_item.object.members = response.data.members;
				board_item.renderMembers();
				$.notify('Member was unassigned!', 'success');
			});
		});

		$default_page.find('.popover-list-item.is-remove-from-board').click(function(event) {
			event.preventDefault();
			popovers.close();

			// request({
			// 	url: '/project_tasks/' + board_item.object.id + '/member_users/' + project_member.user.id + '/remove',
			// }, function(response) {
			// 	if (response.error) {
			// 		$.notify(response.error, 'error');
			// 		return;
			// 	}

			// 	board_item.object.members = response.data.members;
			// 	board_item.renderMembers();
			// 	$.notify('Member was unassigned!', 'success');
			// });
		});

		$default_page.find('.popover-list-item.is-remove-from-project').click(function(event) {
			event.preventDefault();
			$default_page.removeClass('is-shown');
			$remove_member_page.addClass('is-shown');
			popover.fix();
		});

		$default_page.find('.popover-profile__role.is-link').click(function(event) {
			event.preventDefault();
			popover.$element.find('.popover-page.is-default').removeClass('is-shown');
			popover.$element.find('.popover-page.is-change-role').addClass('is-shown');
			popover.fix();
		});

		// ---------------------------------------------------------------------- //

		$remove_member_page.find('.popover-header__back-button').click(function(event) {
			event.preventDefault();
			$remove_member_page.removeClass('is-shown');
			$default_page.addClass('is-shown');
			popover.fix();
		});

		$remove_member_page.find('#popover-project-member-menu__remove-from-all-projects-checkbox').change(function() {
			$remove_member_page.find('.popover-content__alert.is-default').toggleClass('d-none', $(this).prop('checked'));
			$remove_member_page.find('.popover-content__alert.is-remove-from-all-projects').toggleClass('d-none', !$(this).prop('checked'));
		});

		$remove_member_page.find('.popover-content__remove-button').click(function(event) {
			event.preventDefault();
			var $button = $(this);
			$button.addClass('is-loading');

			request({
				url: '/project_members/' + project_member.id + '/delete',
				data: $remove_member_page.find('.popover-content__form').serialize(),
			}, function(response) {
				$button.removeClass('is-loading');

				if (response.error) {
					$.notify(response.error, 'error');
					return;
				}

				popovers.close();
				$.notify('This member was removed!', 'success');

				var existent_project_member = dashboard.selected_project.members.filter(function(current_project_member) {
					return current_project_member.id == project_member.id;
				})[0] || null;

				if (existent_project_member) {
					dashboard.selected_project.members.splice(dashboard.selected_project.members.indexOf(existent_project_member), 1);
				}

				dashboard.selected_project.renderMembers();

				dashboard.selected_board && (function() {
					var found_board_member = dashboard.selected_board.members.filter(function(board_member) {
						return board_member.user_id == project_member.user_id;
					})[0];

					if (!found_board_member) {
						return;
					}

					dashboard.selected_board.members.splice(dashboard.selected_board.members.indexOf(found_board_member), 1);
					dashboard.selected_board.renderMembers();
				})();

				window.board && window.board.getColumns().forEach(function(board_column) {
					board_column.getItems().forEach(function(board_item) {
						var found_task_member = board_item.object.members.filter(function(task_member) {
							return task_member.user_id == project_member.user_id;
						})[0] || null;

						if (!found_task_member) {
							return;
						}

						board_item.object.members.splice(board_item.object.members.indexOf(found_task_member), 1);
						board_item.renderMembers();
					});
				});
			});
		});

		// ---------------------------------------------------------------------- //

		$change_role_page.find('.popover-header__back-button').click(function(event) {
			event.preventDefault();
			$change_role_page.removeClass('is-shown');
			$default_page.addClass('is-shown');
			popover.fix();
		});

		$change_role_page.find('.popover-list-item').click(function(event) {
			event.preventDefault();
			var $self = $(this);
			$self.addClass('is-loading');

			request({
				url: '/project_members/' + project_member.id + '/update',

				data: {
					project_member: {
						role: $self.attr('data-key'),
					},
				},
			}, function(response) {
				$self.removeClass('is-loading');

				if (response.error) {
					$.notify(response.error, 'error');
					return;
				}

				var found_project_member = project.members.filter(function(current_project_member) {
					return current_project_member.id == project_member.id;
				})[0] || null;

				found_project_member && Object.assign(found_project_member, response.data);

				dashboard.selected_board && (function() {
					var found_board_member = dashboard.selected_board.members.filter(function(current_board_member) {
						return current_board_member.project_member.id == project_member.id;
					})[0] || null;

					found_board_member && Object.assign(found_board_member.project_member, response.data);
				})();

				$default_page.find('.popover-profile__role span').text(__('common.project_members.roles.' + project_member.role + '.extra_title'));
				$change_role_page.find('.popover-list-item').removeClass('is-selected');
				$self.addClass('is-selected');
			});
		});
	};

	return popover;
};