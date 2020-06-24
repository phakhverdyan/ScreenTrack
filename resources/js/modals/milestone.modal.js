modals.milestone = function(options) {
	options = options || {};
	var contract = options.contract;

	var current_milestone = contract.milestones.filter(function(milestone) {
		return !milestone.released_at;
	})[0] || null;

	var milestone = options.milestone;
	var milestone_index = milestone ? contract.milestones.indexOf(milestone) : contract.milestones.length;
	var previous_milestone = (milestone_index > 0 ? contract.milestones[milestone_index - 1] : null);

	var modal = new Modal({
		content: template('milestone-modal', {
			id: Date.now().toString(36),
			contract: contract,
			milestone: milestone,
			current_milestone: current_milestone,
			milestone_index: milestone_index,
		}),
	});

	var $save_button = modal.$element.find('button[type="submit"]');
	var $project_select = modal.$element.find('select[name="milestone[project_id]"]');

	$project_select.removeClass('custom-select').selectize({
		valueField: 'id',
		labelField: 'name',
		searchField: [ 'name' ],
		placeholder: 'Select Project',
		sortField: [{ field: 'index', direction: 'asc' }],

		render: {
			item: function(item, escape) {
				return (
					'<div class="selectize-item + is-project">' +
						'<span class="selectize-item__name">' + escape(item.name) + '</span>' +
					'</div>'
				);
			},

			option: function(item, escape) {
				return (
					'<div class="selectize-item + is-project">' +
						'<span class="selectize-item__name">' + escape(item.name) + '</span>' +
					'</div>'
				);
			},
		},

		onInitialize: function() {
			var selectize = this;
			selectize.$control_input.attr('autocomplete', 'st-disabled');

			selectize.addOption(auth.user.projects.filter(function(project) {
				return project.pivot.role == 'OWNER';
			}).map(function(project, project_index) {
				return Object.assign({}, project, {
					index: project_index,
				});
			}));

			var previous_milestone_project = previous_milestone && auth.user.projects.filter(function(project) {
				return project.id == previous_milestone.id;
			})[0] || null;

			if (milestone) {
				selectize.addItem(milestone.project_id);
			} else if (previous_milestone_project) {
				selectize.addItem(previous_milestone_project.id);
			} else if (dashboard.selected_project) {
				selectize.addItem(dashboard.selected_project.id);
			} else {
				selectize.addItem(auth.user.projects[0].id);
			}

			(milestone && milestone.payment_id) && selectize.disable();
		},
	});

	modal.$element.submit(function(event) {
		event.preventDefault();
		$save_button.addClass('is-loading');

		request({
			method: 'POST',
			
			url: (
				milestone
				? '/milestones/' + milestone.id + '/update'
				: '/contracts/' + contract.id + '/milestones/create'
			),

			data: modal.$element.serialize(),
		}, function(response) {
			$save_button.removeClass('is-loading');

			if (new Validator(modal.$element, response).fails()) {
				return;
			}

			if (response.error) {
				$.notify(response.error);
				return;
			}

			if (milestone) {
				options.updated && options.updated(response.data);
				$.notify('Milestone saved!', 'success');
			} else {
				options.created && options.created(response.data);
				$.notify('Milestone created!', 'success');
			}

			modal.close();
		});
	});

	modal.$element.on('shown.bs.modal', function() {
		modal.$element.find('input[value=""]:first').focus();
	});
};