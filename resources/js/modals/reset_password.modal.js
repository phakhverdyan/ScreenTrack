modals.reset_password = function(options) {
    options = options || {};

    var modal = new Modal({
        content: template('reset-password-modal', {
            email: options.email || null,
        }),
    });

    modal.$element.on('shown.bs.modal', function() {
        modal.$element.find('input[value=""]:first').focus();
    });

    modal.$element.find('.modal__back-button').click(function(event) {
        event.preventDefault();
        modal.close();

        modals.login({
            email: modal.$element.find('[name="user[email]"]').val(),
        });
    });

    modal.$element.find('.modal__reset-button').click(function(event) {
        event.preventDefault();

        request({
            url: '/reset_password',
            data: modal.$element.serialize(),
            method: 'POST',
        }, function(response) {
            if (new Validator(modal.$element, response).fails()) {
                return;
            }

            if (response.error) {
                $.notify(response.error, 'error');
                return;
            }

            modal.close();

            modals.reset_password_email_sent({
                email: modal.$element.find('[name="user[email]"]').val() || null,
            });
        });
    })
};