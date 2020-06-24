popovers.project_task_menu = function(options) {
	options = options || {};
	var project_task = options.project_task;
	var board_item = options.board_item;
 
	var popover = new Popover({
		trigger: options.trigger,
		arrow: false,
		placement: 'bottom',

		content: function() {
			return template('project-task-menu-popover', {
				project_task: project_task,
			});
		},
	});
	
	popover.initialize = function() {
		popover.$element.find('.popover-list-item.is-archive').click(function(event) {
			event.preventDefault();
			var $item = $(this);

			request({
				url: '/project_tasks/' + project_task.id + '/archive',
			}, function(response) {
				if (response.error) {
					$.notify(response.error, 'error');
					return;
				}

				popovers.close();
				$.notify('Task was archived!', 'success');
				board_item.delete();
			});
		});
	};
 
	return popover;
};
