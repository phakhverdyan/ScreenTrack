modals.close_contract = function(options) {
	options = options || {};
	var contract = options.contract;

	var modal = new Modal({
		content: template('close-contract-modal', {
			contract: contract,
		}),
	});

	modal.$element.find('.modal__confirm-button').click(function(event) {
		event.preventDefault();
		var $self = $(this);
		$self.addClass('is-loading');

		request({
			url: '/contracts/' + contract.id + '/close',
			data: modal.$element.serialize(),
		}, function(response) {
			$self.removeClass('is-loading');

			if (response.error) {
				$.notify(response.error, 'error');
				return;
			}

			Object.assign(contract, response.data);
			contract.render && contract.render();

			if (modal.$element.find('#modal__remove-from-all-projects-checkbox').prop('checked')) {
				if (dashboard.selected_project) {
					var existent_project_member = dashboard.selected_project.members.filter(function(current_project_member) {
						return current_project_member.user_id === contract.employee_user_id;
					})[0] || null;

					if (existent_project_member) {
						dashboard.selected_project.members.splice(dashboard.selected_project.members.indexOf(existent_project_member), 1);
					}

					dashboard.selected_project.renderMembers();
				}

				window.board && window.board.getColumns().forEach(function(board_column) {
					board_column.getItems().forEach(function(board_item) {
						var found_task_member = board_item.object.members.filter(function(task_member) {
							return task_member.user_id === contract.employee_user_id;
						})[0] || null;

						if (!found_task_member) {
							return;
						}

						board_item.object.members.splice(board_item.object.members.indexOf(found_task_member), 1);
						board_item.renderMembers();
					});
				});
			}

			modal.close();
		});
	});
};
