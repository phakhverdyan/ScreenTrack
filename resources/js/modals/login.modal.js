modals.login = function(options) {
	options = options || {};

	var modal = new Modal({
		name: 'login',

		content: template('login-modal', {
			email: options.email || null,
		}),
	});

	modal.$element.on('shown.bs.modal', function() {
		modal.$element.find('input[value=""]:first').focus();
	});
	
	modal.$element.find('.modal__forgot-password-link').click(function(event) {
		event.preventDefault();
		modal.close();

		modals.reset_password({
			email: modal.$element.find('[name="user[email]"]').val(),
		});
	});

	modal.$element.find('.modal__create-new-account').click(function(event) {
		event.preventDefault();
		modal.close();

		modals.registration({
			email: modal.$element.find('[name="user[email]"]').val(),
		});
	});

	modal.$element.submit(function(event) {
		event.preventDefault();
		Validator.clear(modal.$element);
		modal.$element.find('.modal__wrong-email-or-password-text').removeClass('show');

		request({
			url: '/login',
			data: modal.$element.serialize(),
			method: 'POST',
		}, function(response) {
			if (new Validator(modal.$element, response).fails()) {
				return;
			}

			if (response.error == 'WrongUserCredentials') {
				modal.$element.find('.modal__wrong-email-or-password-text').addClass('show');
				return;
			}

			if (response.error) {
				$.notify(response.error, 'error');
				return;
			}

			console.log(response.data);

			request({
				root: '',
				url: '/login_using_api_token',
				method: 'POST',

				data: {
					user_id: response.data.id,
					api_token: response.data.api_token,
					remember_me: 1,
				},
			}, function(response) {
				if (response.error) {
					$.notify(response.error, 'error');
					return;
				}

				window.location.href = response.data.redirect_url;
				return;
			});
		});
	});
};