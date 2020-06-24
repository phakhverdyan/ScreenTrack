popovers.create_new_project = function(options) {
	options = options || {};

	var popover = new Popover({
		trigger: options.trigger,
		arrow: false,
		placement: 'bottom',

		content: function() {
			return template('create-new-project-popover', {});
		},
	});

	popover.initialize = function() {
		popover.$element.find('input:first').focus();
		var $form = popover.$element.find('.popover__form');
		var $submit_button = $form.find('button[type="submit"]');

		$form.submit(function(event) {
			event.preventDefault();
			$submit_button.addClass('is-loading');

			request({
				method: 'POST',
				url: '/projects/create',
				data: $form.serialize(),
			}, function(response) {
				$submit_button.removeClass('is-loading');

				if (response.error) {
					$.notify(response.error, 'error');
					return;
				}

				$submit_button.addClass('is-loading');
				window.location.href = '/dashboard/projects/' + response.data.id;
			});
		});
	};

	popover.shown = function() {
		//
	};
};