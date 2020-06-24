slideups.user_profile = function(options) {
	slideups.close();
	options = options || {};
	options.default_tab = options.default_tab || 'profile';

	var slideup = new Slideup({
		content: template('user-profile-slideup', {
			user: null,
			id: 0,
		}),
	});

	return (function(callback) {
		if (options.user) {
			return callback(options.user);
		}

		if (options.user_id) {
			return request({
				url: '/users/' + options.user_id,
			}, function(response) {
				if (response.error) {
					$.notify(response.error, 'error');
					return;
				}

				return callback(response.data);
			});
		}

		throw new Error('`user_id` or `user` parameter is required');
	})(function(user) {
		slideup.$element.html($(template('user-profile-slideup', {
			id: slideup.id,
			user: user,
		})).html());

		// ---------------------------------------------------------------------- //

		var message_panel = new dashboard.messenger.MessagePanel({
			object: user.direct_chat,
			root: slideup.$element.find('.message-panel'),

			create: function(options, callback) {
				return request({
					method: 'POST',
					url: '/users/' + user.id + '/message',

					data: {
						chat_message: {
							text: options.text,
							label: options.label,
						},
					},
				}, callback);
			},
		});

		// ---------------------------------------------------------------------- //

		var timeline = dashboard.Timeline({
			root: slideup.$element.find('.timeline'),
			format: 'day',
			segments: user.tracking_segments,
			user_id: user.id,
		});

		// ---------------------------------------------------------------------- //

		slideup.$element.find('.slideup__open-new-contract-button').click(function(event) {
			event.preventDefault();

			modals.contract({
				employee_user: user,

				contract_created: function(new_contract) {
					if (user.contracts[0]) {
						user.contracts[0].closed_at = new_contract.created_at;
						user.contracts[0].render();
					}

					user.contracts.splice(0, 0, new_contract);
					initialize_contract(new_contract).prependTo('.user-profile-contracts__body');
					slideup.$element.find('.user-profile-no-contracts').addClass('d-none');
					slideup.$element.find('.user-profile-contracts').removeClass('d-none');
				},
			});
		});

		var initialize_contract = function(contract) {
			var $contract = $(template('slideups-user-profile-slideup-contract-item', {
				contract: contract,
			})).data('contract', contract);

			contract.render = function() {
				var $root = $(template('slideups-user-profile-slideup-contract-item', {
					contract: contract,
				}));

				$contract.html($root.html()).attr($root.html());
			};

			$contract.on('click', '.user-profile-contract-item__actions .btn.is-change', function(event) {
				event.preventDefault();

				modals.contract({
					contract: contract,

					contract_created: function(new_contract) {
						if (user.contracts[0]) {
							user.contracts[0].closed_at = new_contract.created_at;
							user.contracts[0].render();
						}

						user.contracts.splice(0, 0, new_contract);
						initialize_contract(new_contract).prependTo('.user-profile-contracts__body');
					},
				});
			});

			$contract.on('click', '.user-profile-contract-item__actions .btn.is-close', function(event) {
				event.preventDefault();

				modals.close_contract({
					contract: contract,
				});
			});

			return $contract;
		};

		user.contracts.forEach(function(contract) {
			initialize_contract(contract).appendTo('.user-profile-contracts__body');
		});

		slideup.$element.find('.slideup-profile__affiliate-modes .badge').click(function(event) {
			event.preventDefault();
			var $this = $(this);

			request({
				method: 'POST',
				url: '/users/' + user.id + '/update',

				data: {
					user: {
						affiliate_mode: $this.attr('data-value'),
					},
				},
			}, function(response) {
				if (response.error) {
					$.notify(response.error, 'error');
					return;
				}

				slideup.$element.find('.slideup-profile__affiliate-modes .badge').removeClass('badge-warning').addClass('badge-secondary');
				$this.removeClass('badge-secondary').addClass('badge-warning');
				$.notify('Saved!', 'success');
			});
		});

		// ---------------------------------------------------------------------- //

		(function() {
			console.log('#user-profile-' + slideup.id + '__' + options.default_tab + '-tab');
			var $tab_link = slideup.$element.find('#user-profile-' + slideup.id + '__' + options.default_tab + '-tab');
			var $tab = slideup.$element.find('#user-profile-' + slideup.id + '__' + options.default_tab);

			if ($tab_link.length > 0) {
				slideup.$element.find('.nav-tabs .nav-link').removeClass('active');
				slideup.$element.find('.tab-content .tab-pane').removeClass('active show');
				$tab_link.addClass('active');
				$tab.addClass('active show');
			}
		})();

		(function(on_shown) {
			if (slideup.is_shown) {
				return on_shown();
			}

			slideup.on_shown = on_shown;
		})(function() {
			message_panel.focus();
		});
	});
};