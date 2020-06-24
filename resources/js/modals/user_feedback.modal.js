$('body').on('click', '.show-user-feedback-modal', function (event) {
    event.preventDefault();
    modals.user_feedback();
});

modals.user_feedback = function(options) {
	options = options || {};

	var modal = new Modal({
		content: template('user-feedback-modal'),
	});

    modal.$element.on('shown.bs.modal', function() {
        modal.$element.find('[name="user_feedback[text]"]').val($('.navbar-feedback__input').val());
        $('.navbar-feedback__input').val('');
        $('.navbar-feedback__input').removeData('modal')
        modal.$element.find('[name="user_feedback[text]"]').focus();
    });

	modal.$element.find('.modal__send-feedback-button').click(function(event) {
		event.preventDefault();
        $(this).addClass('is-loading disabled');
		var $form = $('form#feedback-form');
        var $this_button = $(this);

        request({
            method: 'POST',
            url: '/user_feedback/create',
			data: $form.serialize(),
        }, function(response) {
            if (new Validator($form, response).fails()) {
                $this_button.removeClass('is-loading disabled')
                return;
            }

            if (response.error) {
                $.notify(response.error);
                return;
            }

            $.notify('We got your feedback! Thanks!', 'success');
            modal.close();
        });
	});

    return modal;
};