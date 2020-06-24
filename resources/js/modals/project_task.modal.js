modals.project_task = function(options) {
	options = options || {};

	if (!options.project_task) {
		throw new Error('`project_task` option required');
	}

	var project_task = options.project_task;
	var board_item = options.board_item;

	var modal = new Modal({
		content: template('project-task-modal', {
			project_task: project_task,
		}),
	});

	modal.$title_textarea = modal.$element.find('.modal-header__title');
	modal.$description = modal.$element.find('.modal-task-description');
	modal.$description_textarea = modal.$element.find('.modal-task-description__textarea');
	modal.$description_save_button = modal.$element.find('.modal-task-description__save-button');
	modal.$description_close_button = modal.$element.find('.modal-task-description__close-button');

	// ---------------------------------------------------------------------- //

	modal.optimize_title_textarea = function() {
		modal.$title_textarea.css('height', '');
		
		modal.$title_textarea.css({
			height: (modal.$title_textarea[0].scrollHeight + parseInt(modal.$title_textarea.css('border')) * 2) + 'px',
		});
	};

	modal.$title_textarea.on('input', function() {
		modal.optimize_title_textarea();
	});

	modal.$title_textarea.keypress(function(event) {
		if (event.which == 13) {
			event.preventDefault();
			$(this).blur();
			return;
		}
	});

	modal.$title_textarea.keydown(function(event) {
		if (event.key == 'Escape') {
			event.preventDefault();
			event.stopPropagation();
			$(this).val(project_task.title);
			$(this).blur();
			modal.$element.focus();
			return;
		}
	});

	modal.$title_textarea.blur(function() {
		if (project_task.title == modal.$title_textarea.val()) {
			return;
		}

		if (!modal.$title_textarea.val()) {
			modal.$title_textarea.val(project_task.title);
			return;
		}

		modal.$close_button.addClass('is-loading disabled');

		request({
			method: 'POST',
			url: '/project_tasks/' + project_task.id + '/update',

			data: {
				project_task: {
					title: modal.$title_textarea.val(),
				},
			},
		}, function(response) {
			modal.$close_button.removeClass('is-loading disabled');

			if (response.error) {
				$.notify(response.error, 'error');
				return;
			}

			project_task.title = response.data.title;
			modal.$title_textarea.val(project_task.title);
			board_item.renderTitle();
		});
	});

	// ---------------------------------------------------------------------- //

	modal.optimize_description_textarea = function() {
		modal.$description_textarea.css('height', '');

		modal.$description_textarea.css({
			height: (modal.$description_textarea[0].scrollHeight + parseInt(modal.$title_textarea.css('border')) * 2) + 'px',
		});
	};

	modal.$description_textarea.on('input', function() {
		modal.optimize_description_textarea();
	});

	modal.$description_textarea.focus(function(event) {
		event.preventDefault();
		modal.$description.addClass('is-focus');
	});

	modal.$description_textarea.keydown(function(event) {
		if (event.key == 'Escape') {
			event.preventDefault();
			event.stopPropagation();
			modal.$description_close_button.click();
			return;
		}
	});

	modal.$description_textarea.blur(function(event) {
		event.preventDefault();
		// modal.$description.removeClass('is-focus');
	});

	modal.$description_save_button.click(function(event) {
		event.preventDefault();

		if (project_task.description == modal.$description_textarea.val()) {
			modal.$description.removeClass('is-focus');
			return;
		}

		modal.$description_save_button.addClass('is-loading disabled');

		request({
			method: 'POST',
			url: '/project_tasks/' + project_task.id + '/update',

			data: {
				project_task: {
					description: modal.$description_textarea.val(),
				},
			},
		}, function(response) {
			modal.$description_save_button.removeClass('is-loading disabled');

			if (response.error) {
				$.notify(response.error, 'error');
				return;
			}

			project_task.description = response.data.description;
			modal.$description_textarea.val(project_task.description);
			modal.$description.removeClass('is-focus');
		});
	});

	modal.$description_close_button.click(function(event) {
		event.preventDefault();
		modal.$description_textarea.val(project_task.description);
		modal.$description_textarea.blur();
		modal.$description.removeClass('is-focus');
	});

	modal.$element.click(function(event) {
		if (modal.$description.hasClass('is-focus')) {
			if ($(event.target).is('.modal-task-description__textarea')) {
				return;
			}

			if ($(event.target).is('.modal-task-description__save-button')) {
				return;
			}

			modal.$description_save_button.click();
			return;
		}
	});

	// ---------------------------------------------------------------------- //

	setTimeout(function() {
		modal.optimize_title_textarea();
		modal.optimize_description_textarea();
	}, 150);
};