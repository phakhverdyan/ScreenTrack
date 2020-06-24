modals.zero_commission_tip_modal = function(options) {
	options = options || {};

	var modal = new Modal({
		content: template('zero-commission-tip-modal'),
	});

	modal.$element.find('.modal__confirm-button').click(function(event) {
		event.preventDefault();
		$(this).addClass('loading');
        user_tip_confirmed('zero_commission');
        modal.close();
	});
};