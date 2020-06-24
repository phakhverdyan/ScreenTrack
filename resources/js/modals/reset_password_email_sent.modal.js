modals.reset_password_email_sent = function(options) {
	options = options || {};
	
    var modal = new Modal({
        content: template('reset-password-email-sent-modal', {}),
    });

    modal.$element.find('.modal__back-to-login-button').click(function(event) {
    	event.preventDefault();
    	modal.close();

    	modals.login({
    		email: options.email,
    	});
    });
};