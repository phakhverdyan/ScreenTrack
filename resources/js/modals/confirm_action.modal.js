modals.confirm_action = function(options) {
	options = options || {};

	var modal = new Modal({
		content: template('confirm-action-modal', {
			question: options.question,
		}),
	});

	modal.$element.find('.modal__confirm-button').click(function(event) {
		event.preventDefault();
		$(this).addClass('is-loading');

		if (options.confirm) {
			options.confirm(function() {
				modal.close();
			});
		} else {
			modal.close();
		}
	});
};