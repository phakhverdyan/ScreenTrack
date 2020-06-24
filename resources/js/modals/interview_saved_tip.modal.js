modals.interview_saved_tip_modal = function(options) {
	options = options || {};

	var modal = new Modal({
		content: template('interview-saved-tip-modal', {
			question: options.question,
		}),
	});

	modal.$element.find('.modal__confirm-button').click(function(event) {
        event.preventDefault();
        $(this).addClass('loading');
        user_tip_confirmed('interview_saved');
        modal.close();
	});
};