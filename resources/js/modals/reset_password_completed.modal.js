modals.reset_password_completed = function(options) {
    var modal = new Modal({
        content: template('reset-password-completed-modal', {}),
    });

    modal.$element.submit(function(event) {
    	event.preventDefault();

    	window.location.href = '' +
            '/login_using_api_token?user_id=' + options.user.id +
            '&api_token=' + options.user.api_token +
            '&redirect_to=/dashboard&remember_me=1' +
        '';
    });
};