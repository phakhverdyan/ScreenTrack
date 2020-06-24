modals.registration = function(options) {
	options = options || {};

	var modal = new Modal({
		name: 'registration',

		content: template('registration-modal', {
			email: options.email || null,
		}),
	});

	modal.$element.on('shown.bs.modal', function() {
		modal.$element.find('input[value=""]:first').focus();
	});

	modal.$element.find('.modal__already-have-account').click(function(event) {
		event.preventDefault();
		modal.close();

		modals.login({
			email: modal.$element.find('[name="user[email]"]').val(),
		});
	});

	(function initialize_registration_form($form) {
		var $user_email_input = $form.find('[name="user[email]"]');
		var $user_slug_input = $form.find('[name="user[slug]"]');
		var $user_locality_input = $form.find('[name="user[locality_id]"]');
		var $user_latitude_input = $form.find('[name="user[latitude]"]');
		var $user_longitude_input = $form.find('[name="user[longitude]"]');
		var $user_slug_block = $form.find('.paypage-link-input-block');

		function register(options) {
			options = options || {};
			register.timeout && clearTimeout(register.timeout);
			register.timeout = null;

			register.timeout = setTimeout(function() {
				register.xhr && register.xhr.abort();
				$form.addClass('loading');

				register.xhr = request({
					url: '/register',
					
					data: {
						user: {
							email: $user_email_input.val(),
							slug: $user_slug_input.val(),
							locality_id: $user_locality_input.val(),
							latitude: $user_latitude_input.val(),
							longitude: $user_longitude_input.val(),
							referrer_user_id: window.referrer_user_id,
						},

						suggest_user_slug: $user_slug_input.hasClass('was-manually-changed') ? 0 : 1,
						just_validate: options.just_validate ? 1 : 0,
					},
				}, function(response) {
					$form.toggleClass('user-slug-shown', $user_email_input.val().length >= 3);
					$form.find('.modal__user-slug-container').toggleClass('show', $user_email_input.val().length >= 3);
					$user_slug_input.attr('tabindex', $user_email_input.val().length >= 3 ? '' : '-1');
					$form.removeClass('loading');

					if (response.error) {
						$.notify(response.error, 'error');
						return;
					}

					register.xhr = null;

					if (!$user_slug_input.hasClass('was-manually-changed')) {
						$user_slug_input.val(response.data.suggested_user_slug);
						$form.toggleClass('user-slug-less-than-3', response.data.suggested_user_slug.length < 3);
					}

					var incomplete_email_is_valid = !(response.data.validation_messages['user.email'] || []).some(function(text) {
						if (text.match(/^The .*? format is invalid\.$/)) {
							return true;
						}

						return false;
					});
					
					var complete_email_is_valid = !(response.data.validation_messages['user.email'] || []).some(function(text) {
						if (text.match(/^The .*? must be a valid email address\.$/)) {
							return true;
						}

						if (text.match(/^The .*? field is required\.$/)) {
							return true;
						}

						return false;
					});

					var email_is_available = !(response.data.validation_messages['user.email'] || []).some(function(text) {
						return text.match(/^The .+? has already been taken\.$/);
					});

					var slug_is_available = !(response.data.validation_messages['user.slug'] || []).some(function(text) {
						if (text.match(/^The .+? has already been taken\.$/)) {
							return true;
						}

						if (text.match(/^The selected .*? is invalid\.$/)) {
							return true;
						}

						return false;
					});

					var slug_is_valid = !(response.data.validation_messages['user.slug'] || []).some(function(text) {
						if (text.match(/^The .*? format is invalid\.$/)) {
							return true;
						}

						if (text.match(/^The .*? field is required\.$/)) {
							return true;
						}

						return false;
					});

					$user_email_input.parent().toggleClass('success', complete_email_is_valid && email_is_available);
					$user_email_input.parent().toggleClass('fail', !incomplete_email_is_valid || !email_is_available);
					$user_slug_input.parent().toggleClass('success', response.data.slug_success);
					$user_slug_input.parent().toggleClass('fail', !response.data.slug_success);
					$user_email_input.siblings('.invalid-feedback').removeClass('d-block');

					if (!incomplete_email_is_valid) {
						$user_email_input.siblings('.invalid-feedback.is-invalid').addClass('d-block');
					} else if (!options.just_validate && !complete_email_is_valid) {
						$user_email_input.siblings('.invalid-feedback.is-invalid').addClass('d-block');
					} else if (!email_is_available) {
						$user_email_input.siblings('.invalid-feedback.is-not-available').addClass('d-block');
					}

					$user_slug_block.siblings('.invalid-feedback').removeClass('d-block');

					if (!response.data.slug_success && !slug_is_valid) {
						$user_slug_block.siblings('.invalid-feedback.is-invalid').addClass('d-block');
					} else if (!response.data.slug_success && !slug_is_available) {
						$user_slug_block.siblings('.invalid-feedback.is-not-available').addClass('d-block');
					}
					
					$form.toggleClass('allow-registration', complete_email_is_valid && email_is_available && response.data.slug_success);
					
					// $form.find('.landing-2__registration-form__input p').removeClass('shake animated');

					// setTimeout(function() {
					// 	$form.find('.landing-2__registration-form__input p').addClass('shake animated');
					// });

					if (!options.just_validate) {
						if (!$form.hasClass('allow-registration')) {
							return;
						}

						$form.addClass('loading');

						register.xhr = request({
							root: '',
							url: '/login_using_api_token',
							method: 'POST',

							data: {
								user_id: response.data.user.id,
								api_token: response.data.user.api_token,
								remember_me: 1,
							},
						}, function(response) {
							if (response.error) {
								$.notify(response.error, 'error');
								return;
							}

							window.location.href = '/dashboard';
							return;
						});
					}
				});
			}, options.just_validate ? 200 : 0);
		}

		function set_input_carret_at_end(element) {
			if (document.selection) {
				element.focus();
				var selection_range = document.selection.createRange();
				selection_range.moveStart('character', -element.value.length);
				selection_range.moveStart('character', element.value.length);
				selection_range.moveEnd('character', 0);
				selection_range.select();
			} else if (element.selectionStart || element.selectionStart == '0') {
				element.selectionStart = element.value.length;
				element.selectionEnd = element.value.length;
				element.focus();
			}
		}

		$user_email_input.on('input', function(event) {
			event.preventDefault();
			$user_email_input.not(this).val($(this).val());
			register({ just_validate: true });
		});

		$user_slug_input.on('input', function(event) {
			event.preventDefault();
			$user_slug_input.not(this).val($(this).val());
			$user_slug_input.addClass('was-manually-changed');
			$form.toggleClass('user-slug-less-than-3', $user_slug_input.val().length < 3);
			register({ just_validate: true });
		});

		$user_email_input.focus(function(event) {
			set_input_carret_at_end(this);
			$form.addClass('user-email-focused');
			$('.landing-2__top-background').addClass('landing-2__blur-effect');
			$('.landing-2__blur-container').addClass('landing-2__blur-effect');
		}).blur(function(event) {
			$form.removeClass('user-email-focused');
			$('.landing-2__top-background').removeClass('landing-2__blur-effect');
			$('.landing-2__blur-container').removeClass('landing-2__blur-effect');
		});

		$user_slug_input.focus(function(event) {
			set_input_carret_at_end(this);
			$form.addClass('user-slug-focused');
			$('.landing-2__top-background').addClass('landing-2__blur-effect');
			$('.landing-2__blur-container').addClass('landing-2__blur-effect');
		}).blur(function(event) {
			$form.removeClass('user-slug-focused');
			$('.landing-2__top-background').removeClass('landing-2__blur-effect');
			$('.landing-2__blur-container').removeClass('landing-2__blur-effect');
		});

		$form.submit(function(event) {
			event.preventDefault();
			register();
		});

		options.email && register({ just_validate: true });
	})(modal.$element);
};