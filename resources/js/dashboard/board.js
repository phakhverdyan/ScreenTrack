dashboard.Board = function(options) {
	options = options || {};

	// ---------------------------------------------------------------------- //
	
	var self = this;
	self.$root = $(options.selector || '.board:first');
	self.$columns = self.$root.find('.board__columns');
	self.$add_column_form = self.$root.find('.board-column-wrapper.is-add-form');
	self.$add_column_form_input = self.$add_column_form.find('.board__add-column-form__input');
	self.handlers = {};
	self.handlers.create_column = options.create_column;
	self.handlers.update_column = options.update_column;
	self.handlers.archive_column = options.archive_column;
	self.handlers.create_item = options.create_item;
	self.handlers.update_item = options.update_item;
	self.object = options.object;
	self.hovered_column = null;
	self.hovered_item = null;

	// ---------------------------------------------------------------------- //

	self.getColumns = function() {
		return self.$columns.children('.board-column-wrapper:not(.is-add-form)').toArray().map(function(element) {
			return $(element).data('column');
		});
	};

	self.createColumn = function(options) {
		return new dashboard.Board.Column(options, self);
	};

	self.optimizeAddColumnTextarea = function() {
		self.$add_column_form_input.css('height', '');
		self.$add_column_form_input.css('height', self.$add_column_form_input[0].scrollHeight + 'px');
	};

	self.scrollLeft = function() {
		self.$columns.scrollLeft(self.$columns[0].scrollWidth);
	};

	self.clear = function() {
		self.getColumns().forEach(function(column) {
			column.delete();
		});
	};

	// ---------------------------------------------------------------------- //

	self.$add_column_form.submit(function(event) {
		event.preventDefault();

		if (!self.$add_column_form_input.val()) {
			self.$add_column_form_input.focus();
			return;
		}

		var $button = $(this).find('.board__add-column-form__add-button');
		$button.addClass('is-loading disabled');
		var $last_column = self.$columns.children('.board-column-wrapper[data-id]:last');

		self.handlers.create_column({
			title: self.$add_column_form_input.val(),
			position: ($last_column[0] ? $last_column.data('column').position + 65536 : 65535),
		}, function(column_options) {
			$button.removeClass('is-loading disabled');

			if (!column_options) {
				return;
			}

			var column = self.createColumn(column_options);
			column.optimizeTitleTextarea();
			column.bounceIn();
			self.$add_column_form_input.val('');
			self.optimizeAddColumnTextarea();
			self.scrollLeft();
		});
	});

	self.$add_column_form_input.on('input', function() {
		event.preventDefault();
		self.optimizeAddColumnTextarea();
	});

	self.$add_column_form.keydown(function(event) {
		if (event.key == 'Escape') {
			self.$add_column_form_input.val('');
			self.optimizeAddColumnTextarea();
			self.$add_column_form_input.blur();
			return;
		}
	});

	self.$add_column_form_input.keypress(function(event) {
		if (event.which == 13) {
			event.preventDefault();
			self.$add_column_form.submit();
			return;
		}
	});

	self.$columns.sortable({
		items: '.board-column-wrapper:not(.is-add-form)',
		handle: '.board-column-header',
		cursor: 'pointer',
		revert: 200,
		helper: 'clone',
		appendTo: document.body,
		zIndex: 1050,
		// scroll: true,
		// scrollSensitivity: 100,
		// scrollSpeed: 100,

	    start: function(event, ui) {
	        ui.item.show();
			var height = ui.item.find('.board-column').height();
			ui.item.hide();
			$('<div />').addClass('board-column').height(height).appendTo(ui.placeholder);
	        ui.helper.find('.board-column').addClass('is-rotated');

			ui.helper.mouseup(function(event) {
				ui.helper.find('.board-column').removeClass('is-rotated');
			});
	    },

	    update: function(event, ui) {
			// ui.item.addClass('animated bounce-in');

			// setTimeout(function() {
			// 	ui.item.removeClass('animated bounce-in');
			// }, 750);

	    	var column = ui.item.data('column');
			var $previous_column = ui.item.prev('.board-column-wrapper[data-id]');
			var $next_column = ui.item.next('.board-column-wrapper[data-id]');

			if ($previous_column[0] && $next_column[0]) {
				column.position = ($next_column.data('column').position + $previous_column.data('column').position) / 2;
			} else if ($previous_column[0]) {
				column.position = ($previous_column.data('column').position + 65536) / 2;
			} else if ($next_column[0]) {
				column.position = $next_column.data('column').position / 2;
			}
			
			self.handlers.update_column(column);
	    },
    });

    window.addEventListener('paste', function(event) {
		if (self.hovered_item) {
			self.hovered_item.uploadFiles(event.clipboardData.files || []);
			return;
		}

		if (self.hovered_column) {
			self.hovered_column.uploadFiles(event.clipboardData.files || []);
			return;
		}
	});

	// ---------------------------------------------------------------------- //

	self.ready = function() {
		self.$root.removeClass('d-none');

		self.$columns.children('.board-column-wrapper:not(.is-add-form)').each(function() {
			var $column = $(this);
			var column = $column.data('column');
			column.optimizeTitleTextarea();

			column.$items.children('.board-item[data-id]').each(function() {
				var $item = $(this);
				var item = $item.data('item');
				item.optimizeTitleTextarea();
			});
		});
	};
};


dashboard.Board.Column = function(options, board) {
	var self = this;
	self.id = options.id;
	self.title = options.title;
	self.position = options.position;
	self.object = options.object;
	self.dragging = 0;

	self.$root = $(dashboard.template('board-column', {
		column: self,
	})).data('column', self).insertBefore(board.$add_column_form);

	self.$add_item_form = self.$root.find('.board-column__add-item-form');
	self.$add_item_form_input = self.$root.find('.board-column__add-item-form__input');
	self.$add_item_link = self.$root.find('.board-column__add-item-link');
	self.$header_target = self.$root.find('.board-column-header__target');
	self.$title_textarea = self.$root.find('.board-column-header__title');
	self.$delete_button = self.$root.find('.board-column-header__delete-button');
	self.$dropzone_text = self.$root.find('.board-column-dropzone__text');
	self.$items = self.$root.find('.board-column__items');

	self.getItems = function() {
		return self.$items.children('.board-item').toArray().slice(1).map(function(element) {
			return $(element).data('item');
		});
	};

	self.createItem = function(options) {
		return new dashboard.Board.Item(options, self, board);
	};

	self.optimizeTitleTextarea = function() {
		self.$title_textarea.css('height', '');
		self.$title_textarea.css('height', self.$title_textarea[0].scrollHeight + 'px');
	};

	self.optimizeAddItemTextarea = function() {
		self.$add_item_form_input.css('height', '');
		self.$add_item_form_input.css('height', self.$add_item_form_input[0].scrollHeight + 'px');
	};

	self.bounceIn = function() {
		var $inner = self.$root.find('.board-column');
		$inner.addClass('animated bounce-in');
		clearTimeout(self.bounceIn.timeout);

		self.bounceIn.timeout = setTimeout(function() {
			$inner.removeClass('animated bounce-in');
		}, 750);
	};

	self.scrollBottom = function() {
		self.$items.scrollTop(self.$items[0].scrollHeight);
	};

	self.uploadFiles = function(files, callback) {
		files = Array.prototype.slice.call(files);

		if (files.length == 0) {
			return callback && callback();
		}

		var $last_item = self.$items.find('.board-item[data-id]:last');
		var notification_id = Date.now().toString(36) + Math.random().toString(36).slice(2);

		$.notify('Creating task...', {
			className: 'success is-' + notification_id,
			autoHide: false,
			showDuration: 0,
		});

		var $notification = $('.notifyjs-bootstrap-base.is-' + notification_id).parents('.notifyjs-wrapper');
		self.$root.addClass('is-loading');

		board.handlers.create_item({
			title: files[0].name,
			position: ($last_item[0] ? $last_item.data('item').position + 65536 : 65535),
		}, self, function(item_options) {
			$notification.click();

			if (!item_options) {
				return;
			}

			var item = self.createItem(item_options);
			item.optimizeTitleTextarea();
			item.bounceIn();
			self.scrollBottom();
			item.$root.addClass('is-loading');

			return series(files.map(function(file) {
				var notification_id = Date.now().toString(36) + Math.random().toString(36).slice(2);

				$.notify('Uploading: 0%', {
					className: 'success is-' + notification_id,
					autoHide: false,
					showDuration: 0,
				});

				var $notification = $('.notifyjs-bootstrap-base.is-' + notification_id).parents('.notifyjs-wrapper');

				return function(callback) {
					var data = new FormData;
					data.append('project_task_attachment[file]', file);
					var started_at = Date.now();

					request({
						method: 'POST',
						url: '/project_tasks/' + item.object.id + '/attachments/create',
						data: data,
						contentType: false,
						processData: false,

						progress: function(percent) {
							$notification.find('span').text('Uploading: ' + percent + '%');
						},
					}, function(response) {
						$notification.click();

						if (response.error) {
							$.notify(response.error, 'error');
							return callback();
						}

						if (response.data.is_cover) {
							item.object.attachments.forEach(function(project_task_attachment) {
								project_task_attachment.is_cover = false;
							});	
						}

						item.object.attachments.push(response.data);
						item.renderCover();
						return callback();
					});
				};
			}), function() {
				self.scrollBottom();
				item.$root.removeClass('is-loading');
			});
		});
	};

	self.$root.disableSelection();

	self.$root.hover(function() {
		board.hovered_column = self;
	}, function() {
		board.hovered_column = null;
	});

	self.$root.on('drag dragstart dragend dragover dragenter dragleave drop', function(event) {
	    event.preventDefault();
	    event.stopPropagation();
	}).on('dragenter', function(event) {
		++self.dragging;

		if (self.dragging > 1) {
			return;
		}

	    self.$root.addClass('is-dragover');
	    self.$dropzone_text.addClass('animated bounceIn');
	}).on('dragleave drop', function() {
		--self.dragging;

		if (self.dragging > 0) {
			return;
		}

		self.$root.removeClass('is-dragover');
		self.$dropzone_text.removeClass('animated bounceIn');
	}).on('drop', function(event) {
		self.uploadFiles(event.originalEvent.dataTransfer.files || []);
	});

	self.$header_target.click(function(event) {
		event.preventDefault();
		self.$title_textarea.focus();
		set_input_carret_at_end(self.$title_textarea[0]);
	});

	self.$title_textarea.on('input', function() {
		self.optimizeTitleTextarea();
	});

	self.$title_textarea.keypress(function(event) {
		if (event.which == 13) {
			event.preventDefault();
			$(this).blur();
			return;
		}
	});

	self.$title_textarea.keydown(function(event) {
		if (event.key == 'Escape') {
			event.preventDefault();
			$(this).val(self.title);
			$(this).blur();
			return;
		}
	});

	self.$title_textarea.focus(function() {
		self.$header_target.addClass('is-hidden');
		self.$delete_button.addClass('is-hidden');
		self.$root.enableSelection();
	});

	self.$title_textarea.blur(function() {
		self.$header_target.removeClass('is-hidden');
		self.$delete_button.removeClass('is-hidden');
		self.$root.disableSelection();

		if (self.title == $(this).val()) {
			return;
		}

		if (!$(this).val()) {
			$(this).val(self.title);
			return;
		}

		self.title = $(this).val();
		self.$delete_button.addClass('is-loading disabled');

		board.handlers.update_column(self, function() {
			self.$delete_button.removeClass('is-loading disabled');
		});
	});

	self.delete = function() {
		self.getItems().forEach(function(item) {
			item.delete();
		});

		self.$root.empty().remove();
	};

	self.$delete_button.click(function(event) {
		event.preventDefault();

		if ($(this).hasClass('is-loading disabled')) {
			return;
		}

		modals.confirm_action({
			question: 'Are you sure you want to archive this list?',

			confirm: function(close) {
				board.handlers.archive_column(self, function(was_archived) {
					if (!was_archived) {
						return;
					}

					self.delete();
					close();
				});
			},
		});
	});

	self.$add_item_form.find('.board-column__add-item-form__close-button').click(function(event) {
		event.preventDefault();
		self.$add_item_form_input.val('');
		self.optimizeAddItemTextarea();
		self.$add_item_form.addClass('is-hidden');
		self.$add_item_link.removeClass('is-hidden');
	});

	self.$add_item_form.submit(function(event) {
		event.preventDefault();

		if (!self.$add_item_form_input.val()) {
			self.$add_item_form_input.focus();
			return;
		}

		var $button = self.$add_item_form.find('.board-column__add-item-form__add-button');
		$button.addClass('is-loading disabled');
		var $last_item = self.$items.find('.board-item[data-id]:last');

		board.handlers.create_item({
			title: self.$add_item_form_input.val(),
			position: ($last_item[0] ? $last_item.data('item').position + 65536 : 65535),
		}, self, function(item_options) {
			$button.removeClass('is-loading disabled');

			if (!item_options) {
				return;
			}

			var item = self.createItem(item_options);
			item.optimizeTitleTextarea();
			item.bounceIn();
			self.$add_item_form_input.val('');
			self.optimizeAddItemTextarea();
			self.scrollBottom();
		});
	});

	self.$add_item_form.keydown(function(event) {
		if (event.key == 'Escape') {
			self.$add_item_form.find('.board-column__add-item-form__close-button').click();
			return;
		}
	});

	self.$add_item_form_input.keypress(function(event) {
		if (event.which == 13) {
			event.preventDefault();
			self.$add_item_form.submit();
			return;
		}
	});

	self.$add_item_form_input.on('input', function() {
		self.optimizeAddItemTextarea();
	});

	self.$add_item_link.click(function(event) {
		event.preventDefault();
		self.$add_item_link.addClass('is-hidden');
		self.$add_item_form.removeClass('is-hidden');
		self.scrollBottom();
		self.$add_item_form_input.focus();
	});

	self.$root.sortable({
		items: '.board-item',
		connectWith: '.board-column-wrapper',
		handle: '.board-item-wrapper:not(.is-menu-shown)',
		cursor: 'pointer',
		revert: 200,
		helper: 'clone',
		appendTo: document.body,
		zIndex: 1050,
		// scroll: true,
		// scrollSensitivity: 100,
		// scrollSpeed: 100,

        start: function(event, ui) {
	        ui.placeholder.height(ui.item.height());
	        ui.helper.addClass('is-rotated');

			ui.helper.mouseup(function(event) {
				ui.helper.removeClass('is-rotated');
			});
	    },

	    // sort: function(event, ui) {
	    // 	(ui.helper.width() != ui.placeholder.width()) && ui.helper.width(ui.placeholder.width());
	    // },

	    update: function(event, ui) {
			if (this !== ui.item.parents('.board-column-wrapper')[0]) {
				return;
			}

			var item = ui.item.data('item');
			var $previous_item = ui.item.prev('.board-item[data-id]');
			var $next_item = ui.item.next('.board-item[data-id]');

			if ($previous_item[0] && $next_item[0]) {
				item.position = ($next_item.data('item').position + $previous_item.data('item').position) / 2;
			} else if ($previous_item[0]) {
				item.position = ($previous_item.data('item').position + 65536) / 2;
			} else if ($next_item[0]) {
				item.position = $next_item.data('item').position / 2;
			}

			board.handlers.update_item(item, self);
	    },
    });
};

dashboard.Board.Item = function(options, column, board) {
	var self = this;
	self.id = options.id;
	self.title = options.title;
	self.position = options.position;
	self.object = options.object;
	self.dragging = 0;

	self.$root = $(dashboard.template('board-item', {
		item: self,
	})).data('item', self).insertBefore(column.$add_item_form);

	self.$wrapper = self.$root.find('.board-item-wrapper');
	self.$header_target = self.$root.find('.board-item-header__target');
	self.$title_textarea = self.$root.find('.board-item-header__title');
	self.$menu_button = self.$root.find('.board-item-header__menu-button');
	self.$dropzone = self.$root.find('.board-item-dropzone');
	self.$dropzone_text = self.$root.find('.board-item-dropzone__text');

	self.optimizeTitleTextarea = function() {
		self.$title_textarea.css('height', '');
		self.$title_textarea.css('height', self.$title_textarea[0].scrollHeight + 'px');
	};

	self.bounceIn = function() {
		self.$root.addClass('animated bounce-in');
		clearTimeout(self.bounceIn.timeout);

		self.bounceIn.timeout = setTimeout(function() {
			self.$root.removeClass('animated bounce-in');
		}, 750);
	};

	self.uploadFiles = function(files, callback) {
		files = Array.prototype.slice.call(files);

		if (files.length == 0) {
			return;
		}

		self.$root.addClass('is-loading');

		return series(files.map(function(file) {
			var notification_id = Date.now().toString(36) + Math.random().toString(36).slice(2);

			$.notify('Uploading: 0%', {
				className: 'success is-' + notification_id,
				autoHide: false,
				showDuration: 0,
			});

			var $notification = $('.notifyjs-bootstrap-base.is-' + notification_id).parents('.notifyjs-wrapper');

			return function(callback) {
				var data = new FormData;
				data.append('project_task_attachment[file]', file);
				var started_at = Date.now();

				request({
					method: 'POST',
					url: '/project_tasks/' + self.object.id + '/attachments/create',
					data: data,
					contentType: false,
					processData: false,

					progress: function(percent) {
						$notification.find('span').text('Uploading: ' + percent + '%');
					},
				}, function(response) {
					$notification.click();

					if (response.error) {
						$.notify(response.error, 'error');
						return callback && callback();
					}

					if (response.data.is_cover) {
						self.object.attachments.forEach(function(project_task_attachment) {
							project_task_attachment.is_cover = false;
						});	
					}
					
					self.object.attachments.push(response.data);
					self.renderCover();
					self.renderBadges();
					return callback && callback();
				});
			};
		}), function() {
			self.$root.removeClass('is-loading');
			
			// if (files.length > 1) {
			// 	$.notify('Files were uploaded!', 'success');
			// } else if (files.length == 1) {
			// 	$.notify('File was uploaded!', 'success');
			// }
			
			return callback && callback();
		});
	};

	self.$root.hover(function() {
		board.hovered_item = self;
		self.$root.addClass('is-hover');
	}, function() {
		board.hovered_item = null;
		self.$root.removeClass('is-hover');
	});

	// self.$root.mousedown(function(event) {
	// 	self.$root.removeClass('animated weakBounceIn');
	// });

	self.$root.click(function(event) {
		event.preventDefault();

		if ($(event.target).closest('.board-item-header').length > 0) {
			return;
		}

		if ($(event.target).closest('.board-item-member').length > 0) {
			return;
		}

		if ($(event.target).closest('.board-item__members__add-new-button').length > 0) {
			return;
		}

		modals.project_task({
			project_task: self.object,
			board_item: self,
		});
	});

	self.$header_target.click(function(event) {
		event.preventDefault();

		// self.$title_textarea.focus();
		// set_input_carret_at_end(self.$title_textarea[0]);

		modals.project_task({
			project_task: self.object,
			board_item: self,
		});
	});

	self.$title_textarea.on('input', function() {
		self.optimizeTitleTextarea();
	});

	self.$title_textarea.keypress(function(event) {
		if (event.which == 13) {
			event.preventDefault();
			$(this).blur();
			return;
		}
	});

	self.$title_textarea.keydown(function(event) {
		if (event.key == 'Escape') {
			event.preventDefault();
			$(this).val(self.title);
			$(this).blur();
			return;
		}
	});

	self.$title_textarea.focus(function() {
		self.$title_textarea.addClass('is-hidden');
		self.$menu_button.addClass('is-hidden');
		column.$root.enableSelection();
	});

	self.$title_textarea.blur(function() {
		self.$header_target.removeClass('is-hidden');
		self.$menu_button.removeClass('is-hidden');
		column.$root.disableSelection();

		if (self.title == $(this).val()) {
			return;
		}

		if (!$(this).val()) {
			$(this).val(self.title);
			return;
		}

		self.title = $(this).val();
		self.$menu_button.addClass('is-loading disabled');

		board.handlers.update_item(self, column, function() {
			self.$menu_button.removeClass('is-loading disabled');
		});
	});

	self.$root.on('drag dragstart dragend dragover dragenter dragleave drop', function(event) {
	    event.preventDefault();
	    event.stopPropagation();
	}).on('dragenter', function(event) {
		++self.dragging;

		if (self.dragging > 1) {
			return;
		}

	    self.$root.addClass('is-dragover');

	    self.$dropzone.css({
	    	height: self.$root.height() + 'px',
	    	lineHeight: self.$root.height() + 'px',
	    });

	    self.$dropzone_text.addClass('animated bounceIn');
	}).on('dragleave drop', function() {
		--self.dragging;

		if (self.dragging > 0) {
			return;
		}

		self.$root.removeClass('is-dragover');
		self.$dropzone_text.removeClass('animated bounceIn');
	}).on('drop', function(event) {
		self.uploadFiles(event.originalEvent.dataTransfer.files || []);
	});

	self.renderTitle = function() {
		self.$title_textarea.val(self.object.title);
	};

	self.renderMembers = function() {
		self.$root.find('.board-item-member').remove();
		var $members = self.$root.find('.board-item__members');
		
		self.object.members.forEach(function(member) {
			var $member = $(dashboard.template('board-item-member', {
				member: member,
			}));

			var project_member = board.object.members.filter(function(current_board_member) {
				return current_board_member.user_id == member.user_id;
			})[0] || null;

			popovers.project_member_menu({
				trigger: $member,
				project_member: project_member,
				project: dashboard.selected_project,
				project_board: board.object,
				board_item: self,
				project_task_member: member,
			});

			$member.prependTo($members);
		});
	};

	self.renderBadges = function() {
		var $root = self.$root.find('.board-item__badges');

		var $new_root = $(dashboard.template('board-item-badges', {
			item: self,
			task: self.object,
		}));

		$root.html($new_root.html()).attr('class', $new_root.attr('class'));
	};

	self.renderCover = function() {
		var cover_attachment = self.object.attachments.filter(function(attachment) {
			return attachment.is_cover;
		})[0] || null;

		var $cover = self.$root.find('.board-item__cover');

		if (!cover_attachment) {
			$cover.addClass('d-none');
			return;
		}

		$cover.removeClass('d-none');
		$cover.css('background-image', 'url(\'' + cover_attachment.thumbnails.middle.url + '\')');
		var cover_height = cover_attachment.thumbnails.middle.height;

		if (cover_attachment.thumbnails.middle.width > 254) {
			cover_height = 254 / cover_attachment.thumbnails.middle.width * cover_attachment.thumbnails.middle.height;
		}

		$cover.height(Math.min(cover_height, 260));
		$cover.css('background-size', cover_attachment.thumbnails.middle.width > 254 ? 'cover' : 'contain');
	};

	self.delete = function() {
		self.$root.empty().remove();
	};

	(function initialize() {
		self.renderMembers();
		self.renderBadges();
		self.renderCover();
	})();

	// ---------------------------------------------------------------------- //

	popovers.manage_project_task_members({
		trigger: self.$root.find('.board-item__members__add-new-button'),
		project: dashboard.selected_project,
		project_board: board.object,

		project_task: function() {
			return self.object;
		},

		task_updated: function(options) {
			self.object.members = options.project_task_members;
			// board.object.members = options.project_members; // ?
			self.renderMembers();
		},
	});

	popovers.project_task_menu({
		trigger: self.$menu_button,
		project_task: self.object,
		board_item: self,
	});

	self.$menu_button.on('inserted.bs.popover', function() {
		self.$wrapper.addClass('is-menu-shown');
	});

	self.$menu_button.on('hidden.bs.popover', function() {
		self.$wrapper.removeClass('is-menu-shown');
	});
};
