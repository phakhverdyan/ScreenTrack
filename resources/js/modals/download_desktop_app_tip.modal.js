modals.download_desktop_app_tip_modal = function(options) {
	options = options || {};

	var modal = new Modal({
		content: template('download-desktop-app-tip-modal', {
			question: options.question,
		}),
	});

	modal.$element.find('.modal__confirm-button').click(function(event) {
        event.preventDefault();
        $(this).addClass('loading');
        user_tip_confirmed('download_desktop_app');
        modal.close();
	});
};