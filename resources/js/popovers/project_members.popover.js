popovers.project_members = function(options) {
	options = options || {};
	var project = options.project;

	var popover = new Popover({
		trigger: options.trigger,
		arrow: false,
		placement: 'bottom',

		content: function() {
			return template('project-members-popover');
		},
	});

	popover.initialize = function() {
		var project = options.project;
        var $member_select = popover.$element.find('.popover-member-select');
        var $member_list = popover.$element.find('.popover-member-list');
        var shown_project_member_popover = null;

        var update_member_popovers = function() {
            var selectize = $member_select.data('selectize');

            Object.keys(selectize.options).forEach(function(user_id) {
                var $option = selectize.getOption(user_id)

                if ($option.data('bs.popover')) {
                    return;
                }

                var found_member = project.members.filter(function(member) {
                    return member.user.id == user_id;
                })[0] || null;

                var popover = popovers.project_member_menu({
                    trigger: selectize.getOption(user_id),
                    project_member: found_member,
                    project: project,
                });

                popover.$trigger.on('show.bs.popover', function() {
                    shown_project_member_popover && shown_project_member_popover.$trigger.popover('hide');
                    shown_project_member_popover = popover;
                });
            });
        };

        $member_select.removeClass('custom-select').selectize({
            closeAfterSelect: false,
            selectOnTab: false,
            valueField: 'id',
            searchField: [ 'title', 'full_name', 'slug', 'email' ],
            sortField: [{ field: 'index', direction: 'asc' }],

            placeholder: ([ 'OWNER', 'ADMINISTRATOR' ].indexOf(project.pivot.role) > -1
                ? __('popovers.project_members.enter_name_username_or_email')
                : __('popovers.project_members.enter_name_or_username')
            ),

            render: {
                option: function(item, escape) {
                    return (
                        '<div class="selectize-item + is-user">' +
                            '<img class="selectize-item__image" src="' + item.image.urls.tiny + '" alt="">' +
                            '<span class="selectize-item__title">' + escape(item.title) + '</span>' +
                            '<span class="selectize-item__status + ' + (item.is_online ? 'is-online' : '')  + '" data-connection-status-for-user-id="' + item.id +'"></span>' +
                        '</div>'
                    );
                },
            },

            onInitialize: function() {
                var selectize = this;
                selectize.selected_items = [];
                selectize.$control_input.attr('autocomplete', 'st-disabled');
                selectize.$dropdown.off('mousedown');

                selectize.addOption(project.members.map(function(member, member_index) {
                    return Object.assign({}, member.user, {
                        index: member_index,
                    });
                }));

                selectize.setTextboxValue = function() {};
                selectize.setActiveOption = function() {};

                selectize.addItem = function(item_id) {
                    if (selectize.$wrapper.hasClass('loading')) {
                        return;
                    }

                    var $option = selectize.getOption(item_id);

                    // 
                };

                selectize.onKeyDown = function(event) {
                    // if (event.keyCode === 13 && !$invitation_form.hasClass('d-none')) {
                    //     $invitation_form.submit();
                    // }
                };

                selectize.open();

                setTimeout(function() {
                    popover.update();
                    update_member_popovers();
                });
            },

            onType: function(value) {
                var selectize = this;
                update_member_popovers();
                var has_results = (this.currentResults.items.length > 0);
                selectize.$dropdown.toggleClass('is-hidden', !has_results);
                popover.$element.find('.popover__no-members-message').toggleClass('d-none', has_results);
                popover.fix();
            },
        });
	};

	popover.shown = function() {
		popover.$element.find('.popover-member-select').data('selectize').$control_input.focus();
	};

    return popover;
};