modals.contract = function(options) {
	options = options || {};
	var contract = options.contract || null;
	var employee_user = options.employee_user || contract.employee_user || null;
	var contract_created = options.contract_created || null;

	var modal = new Modal({
		content: template('contract-modal', {
			contract: contract,
			employee_user: employee_user,
		}),
	});

	var $save_button = modal.$element.find('.modal__save-button');
	var $hourly_rate_input = modal.$element.find('[name="contract[hourly_rate]"]');

	$hourly_rate_input.on('input', function(event) {
		event.preventDefault();

		if (contract) {
			if (parseFloat($hourly_rate_input.val()) == contract.hourly_rate) {
				$save_button.text(__('modals.contract.save'));
			} else {
				$save_button.text(__('modals.contract.recreate_a_new_contract'));
			}
		}
	});

	modal.$element.submit(function(event) {
		event.preventDefault();
		$save_button.addClass('is-loading');

		request({
			method: 'POST',

			url: (contract && contract.hourly_rate == parseFloat($hourly_rate_input.val())
				? '/contracts/' + contract.id + '/update'
				: '/users/' + employee_user.id + '/open_contract?recreate=true'
			),

			data: modal.$element.serialize(),
		}, function(response) {
			$save_button.removeClass('is-loading');

			if (response.error) {
				$.notify(response.error, 'error');
				return;
			}

			if (contract && contract.id == response.data.id) {
				Object.assign(contract, response.data);
				contract.render();
				$.notify(__('modals.contract.contract_updated'), 'success');
				modal.close();
				return;
			}

			contract_created && contract_created(response.data);
			$.notify(__('modals.contract.contract_created'), 'success');
			modal.close();
		});
	});

	modal.$element.on('shown.bs.modal', function() {
		modal.$element.find('input[value=""]:first').focus();
	});
};
