popovers.project_board_menu = function(options) {
	options = options || {};
	var project = options.project;
	var project_board = options.project_board;

	var popover = new Popover({
		trigger: options.trigger,
		arrow: false,
		placement: 'bottom',

		content: function() {
			return template('project-board-menu-popover', {
				project: project,
				project_board: project_board,
			});
		},
	});

	popover.initialize = function() {
		popover.$element.find('.popover-list-item.is-archive-board').click(function(event) {
			event.preventDefault();

			modals.confirm_action({
				question: "Are you sure you want to archive this board?",

				confirm: function(close_modal) {
					return request({
						url: '/project_boards/' + project_board.id + '/archive',
					}, function(response) {
						if (response.error) {
							$.notify(response.error, 'error');
							return;
						}

						$.notify('This board was archived!', 'success');
						window.location.href = "/dashboard/projects/" + project.id;
					});
				},
			});
		});
	};

	return popover;
};