popovers.project_boards = function(options) {
	options = options || {};
	var project = options.project;

	var popover = new Popover({
		trigger: options.trigger,
		arrow: false,
		placement: 'bottom',

		content: function() {
			return template('project-boards-popover');
		},
	});

	popover.initialize = function() {
		var project = options.project;
        var $board_select = popover.$element.find('.popover-board-select');
        var $board_list = popover.$element.find('.popover-board-list');
        var shown_project_member_popover = null;

        $board_select.removeClass('custom-select').selectize({
            closeAfterSelect: false,
            selectOnTab: false,
            valueField: 'id',
            searchField: [ 'name' ],
            sortField: [{ field: 'index', direction: 'asc' }],
            placeholder: __('popovers.project_boards.enter_board_name'),

            render: {
                option: function(item, escape) {
                    return (
                        '<div class="selectize-item">' +
                            escape(item.name) +
                        '</div>'
                    );
                },
            },

            onInitialize: function() {
                var selectize = this;
                selectize.selected_items = [];
                selectize.$control_input.attr('autocomplete', 'st-disabled');
                selectize.$dropdown.off('mousedown');

                selectize.addOption(project.boards.map(function(board, board_index) {
                    return Object.assign({}, board, {
                        index: board_index,
                    });
                }));

                selectize.setTextboxValue = function() {};
                selectize.setActiveOption = function() {};

                selectize.addItem = function(item_id) {
                    if (selectize.$wrapper.hasClass('loading')) {
                        return;
                    }

                    window.location.href = '/dashboard/projects/' + dashboard.selected_project.id + '/boards/' + item_id;
                };

                selectize.onKeyDown = function(event) {
                    // if (event.keyCode === 13 && !$invitation_form.hasClass('d-none')) {
                    //     $invitation_form.submit();
                    // }
                };

                selectize.open();

                setTimeout(function() {
                    popover.fix();
                });
            },

            onType: function(value) {
                var selectize = this;
                var has_results = (this.currentResults.items.length > 0);
                selectize.$dropdown.toggleClass('is-hidden', !has_results);
                popover.$element.find('.popover__no-boards-message').toggleClass('d-none', has_results);
                popover.fix();
            },
        });
	};

	popover.shown = function() {
		popover.$element.find('.popover-board-select').data('selectize').$control_input.focus();
	};

    return popover;
};
