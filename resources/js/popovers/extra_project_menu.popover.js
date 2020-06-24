popovers.extra_project_menu = function(options) {
	options = options || {};
	var project = options.project;

	var popover = new Popover({
		trigger: options.trigger,
		arrow: false,
		placement: 'bottom',

		content: function() {
			return template('extra-project-menu-popover', {
				project: project,
			});
		},
	});

	popover.initialize = function() {
		popover.$element.find('.popover-list-item.is-leave-project').click(function(event) {
			event.preventDefault();

			modals.confirm_action({
				question: __('popovers.board_menu.leave_project'),

				confirm: function(close_modal) {
					return request({
						url: '/projects/' + project.id + '/leave',
					}, function(response) {
						if (response.error) {
							$.notify(response.error, 'error');
							return;
						}

                        $.notify(__('popovers.board_menu.leave_success'), 'success');
						window.location.href = "/dashboard";
					});
				},
			});
		});

		popover.$element.find('.popover-list-item.is-close-project').click(function(event) {
			event.preventDefault();

			modals.confirm_action({
				question: __('popovers.board_menu.sure_close_project'),

				confirm: function(close_modal) {
					return request({
						url: '/projects/' + project.id + '/close',
					}, function(response) {
						if (response.error) {
							$.notify(response.error, 'error');
							return;
						}

						$.notify(__('popovers.board_menu.project_closed'), 'success');
						window.location.href = '/dashboard';
					});
				},
			});
		});
	};

	return popover;
};
