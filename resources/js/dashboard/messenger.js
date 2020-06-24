dashboard.messenger = {};

dashboard.messenger.ChatPanel = function() {
	var self = this;
	self.lists = {};
	self.$root = $('.chat-panel');

	// ------------------------------------------------------------------ //

	self.lists.people = new dashboard.messenger.ChatList({
		root: '.chat-list.is-people',
		owner: { type: null },
	}, self);

	// panel.lists.channel = new dashboard.chat.List({
	// 	owner: { type: 'Project' },
	// });
};

dashboard.messenger.ChatList = function(options, panel) {
	// selector, type, initial_items

	var self = this;
	self.is_initialized = false;
	self.owner = options.owner;
	self.items = [];
	self.$root = $(options.root);
	self.$items = self.$root.find('.chat-list__items');
	self.$no_items = self.$root.find('.chat-list__no-items');
	self.$loader = self.$root.find('.chat-list__loader');
	self.$load_more_button = self.$root.find('.chat-list__load-more-button');
	self.items_per_page = 20;
	self.count_of_chats_after = 0;
	self.$search = self.$root.find('.chat-list-search');
	self.$search_input = self.$root.find('.chat-list-search__input');

	// ------------------------------------------------------------------ //

	self.getItemById = function(item_id) {
		var item = null;

		self.items.some(function(current_item) {
			if (current_item.object.id != item_id) {
				return false;
			}

			item = current_item;
			return true;
		});

		return item;
	};

	self.itemExists = function(item_id) {
		return self.getItemById(item_id) ? true : false;
	};

	self.createItemOrUpdate = function(options) {
		var item = self.getItemById(options.object.id);

		if (item) {
			item.object = options.object;
			item.typing_members = [];
			item.render();
			item.place();
			return item;
		}

		return new dashboard.messenger.ChatItem(options, self, panel);
	};

	self.clearItems = function() {
		self.items.forEach(function(item) {
			item.$root.remove();
		});

		self.items = [];
		self.$load_more_button.addClass('d-none');
		self.count_of_chats_after = 0;
	};

	self.initialize = function() {
		console.log('[messenger]', '>', '[chat_list.initialize]', {
			owner: self.owner,
			after_last_message_id: self.items[0] ? self.items[0].object.last_message_id : 0,
			count: self.items_per_page,

			search: {
				query: self.$search_input.val().trim(),
			},
		});

		realtime.emit('chat_list.initialize', {
			owner: self.owner,
			after_last_message_id: self.items[0] ? self.items[0].object.last_message_id : 0,
			count: self.items_per_page,

			search: {
				query: self.$search_input.val().trim(),
			},
		});
	};

	// ------------------------------------------------------------------ //

	self.scrollTop = function(height) {
		if (height !== undefined) {
			return self.$items.scrollTop(height);
		}

		return self.$items.scrollTop();
	};

	self.scrollBottom = function(height) {
		if (height !== undefined) {
			return self.scrollTop(self.$items[0].scrollHeight - (height + self.$items.outerHeight()));
		}

		return self.$items[0].scrollHeight - (self.$items.scrollTop() + self.$items.outerHeight());
	};

	// ------------------------------------------------------------------ //

	self.$load_more_button.click(function(event) {
		event.preventDefault();

		if (self.$load_more_button.hasClass('is-loading')) {
			return;
		}

		self.$load_more_button.addClass('is-loading disabled');

		realtime.emit('chat_list.load_more', {
			owner: self.owner,
			before_last_message_id: self.items[self.items.length - 1].object.last_message_id,
			count: self.items_per_page,

			search: {
				query: self.$search_input.val().trim(),
			},
		});
	});

	self.$items.scroll(function() {
		if (self.count_of_chats_after > 0 && self.scrollBottom() < 500) {
			self.$load_more_button.click();
		}
	});

	self.$search_input.on('input', function() {
		var original_value = $(this).val();
		var fixed_value = $(this).val().replace(/^mailto:/, '');
		(original_value != fixed_value) && $(this).val(fixed_value);
		clearTimeout(self.search_timeout);
		
		self.search_timeout = setTimeout(function() {
			self.clearItems();
			self.$no_items.addClass('d-none');
			self.$loader.removeClass('d-none');
			self.initialize();
		}, 200);
	});

	// ------------------------------------------------------------------ //

	realtime.authorized(function() {
		console.log('[messenger]', '[authorized]');
		self.initialize();
	});

	realtime.on('chat_list.initialize', function(data) {
		console.log('[messenger]', '<', '[chat_list.initialize]', data);
		self.$loader.addClass('d-none');
		console.log(data);

		data.chats.forEach(function(chat) {
			self.createItemOrUpdate({
				object: chat,
			});
		});

		self.count_of_chats_after = data.count_of_chats_after;
		self.$load_more_button.toggleClass('d-none', self.count_of_chats_after == 0);
		!self.is_initialized && self.$search.toggleClass('d-none', self.items.length == 0);
		self.$items.toggleClass('d-none', self.items.length == 0);
		self.$no_items.toggleClass('d-none', self.items.length > 0);
		self.is_initialized = true;
	});

	realtime.on('chat_list.load_more', function(data) {
		console.log('[messenger]', '<', '[chat_list.load_more]', data);

		data.chats.forEach(function(chat) {
			self.createItemOrUpdate({
				object: chat,
			});
		});

		self.count_of_chats_after = data.count_of_chats_after;
		console.log('data.count_of_chats_after', data.count_of_chats_after);
		self.$load_more_button.removeClass('is-loading disabled');
		self.$load_more_button.toggleClass('d-none', self.count_of_chats_after == 0);
	});

	realtime.on('chat_message_created', function(data) {
		if (self.$search_input.val()) {
			return;
		}
		
		if (self.owner.type && self.owner.type != data.owner.type) {
			return;
		}

		if (self.owner.type && self.owner.id && self.owner.id != data.owner.id) {
			return;
		}

		console.log('[messenger]', '<', '[chat_message_created]', data);
		var chat_message = data;
		var chat = chat_message.chat;
		delete chat_message.chat;
		chat.last_message = chat_message;

		var item = self.createItemOrUpdate({
			object: chat,
		});

		self.$search.removeClass('d-none');
		self.$items.removeClass('d-none');
		self.$no_items.addClass('d-none');
		(chat.last_message.author_user_id != auth.user.id) && item.bounceIn();
	});

	realtime.on('chat_message_was_read', function(data) {
		if (!data.chat || data.chat.count_of_unread_messages === undefined) {
			return;
		}

		var item = self.getItemById(data.chat_id);

		if (!item) {
			return;
		}
		
		console.log('[messenger]', '<', '[chat_message_was_read]', data);
		item.object.count_of_unread_messages = data.chat.count_of_unread_messages;
		item.render();
	});

	realtime.on('typing_chat_message', function(data) {
		var item = self.getItemById(data.chat_id);

		if (!item.object || item.object.id != data.chat_id) {
			return;
		}

		console.log('[messenger]', '<', 'typing_chat_message', data);
		item.addTypingMember(data.member);
		item.render();
	});

	// ------------------------------------------------------------------ //

	self.typing_interval = setInterval(function() {
		self.items.forEach(function(item) {
			if (item.typing_members.length == 0) {
				return;
			}

			var typing_members = item.typing_members.filter(function(typing_member) {
				return Date.now() - typing_member.started_at <= 3000;
			});

			if (typing_members.length == item.typing_members.length) {
				return;
			}

			item.typing_members = typing_members;
			item.render();
		});
	}, 100);
};

dashboard.messenger.ChatItem = function(options, list, panel) {
	var self = this;
	self.object = options.object;
	self.typing_members = [];
	self.dragging = 0;

	self.$root = $(dashboard.template('chat-item', {
		item: self,
		chat: self.object,
	})).data('item', self).insertBefore(list.$load_more_button);

	self.render = function() {
		var $root = $(dashboard.template('chat-item', {
			item: self,
			chat: self.object,
		}));

		self.$root.find('.chat-item__typing-members').html($root.find('.chat-item__typing-members').html());
		self.$root.find('.chat-item__message').html($root.find('.chat-item__message').html());
		self.$root.find('.chat-item__time').html($root.find('.chat-item__time').html());
		self.$root.attr('class', $root.attr('class'));
	};

	self.bounceIn = function() {
		self.$root.addClass('animated bounce-in');
		clearTimeout(self.bounceIn.timeout);

		self.bounceIn.timeout = setTimeout(function() {
			self.$root.removeClass('animated bounce-in');
		}, 750);
	};

	self.place = function() {
		var index = list.items.indexOf(self);
		(index >= 0) && list.items.splice(list.items.indexOf(self), 1);
		var next_item = null;

		list.items.some(function(item) {
			if (self.object.last_message_id < item.object.last_message_id) {
				return false;
			}

			next_item = item;
			return true;
		});

		if (next_item) {
			self.$root.insertBefore(next_item.$root);
			list.items.splice(list.items.indexOf(next_item), 0, self);
		} else {
			self.$root.insertBefore(list.$load_more_button);
			list.items.push(self);
		}
	};

	self.getTypingMemberById = function(member_id) {
		var found_typing_member = null;

		self.typing_members.some(function(typing_member) {
			if (typing_member.id != member_id) {
				return false;
			}

			found_typing_member = typing_member;
			return true;
		});

		return found_typing_member;
	};

	self.addTypingMember = function(member) {
		var found_member = self.getTypingMemberById(member.id);

		if (found_member) {
			found_member.started_at = Date.now();
			return;
		}

		member.started_at = Date.now();
		self.typing_members.push(member);
		self.render('members');
	};

	self.$root.click(function(event) {
		event.preventDefault();
		
		if (self.object.type == 'dialog' && self.object.owner_type == null) {
			slideups.user_profile({
				user_id: self.object.opposite_member.user_id,
			});

			return;
		}
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
		// self.uploadFiles(event.originalEvent.dataTransfer.files || []);
	});

	self.place();
};

dashboard.messenger.MessagePanel = function(options) {
	var self = this;
	self.object = options.object;
	self.create = options.create;
	self.$root = $(options.root || '.message-panel');
	self.$dropzone_text = self.$root.find('.message-panel-dropzone__text');
	self.$content = self.$root.find('.message-panel-content');
	self.$history = self.$root.find('.message-panel-history');
	self.$items = self.$root.find('.message-panel-history__items');
	self.$load_more_before_button = self.$root.find('.message-panel__load-more-button.is-before');
	self.$load_more_after_button = self.$root.find('.message-panel__load-more-button.is-after');
	self.$typing_members = self.$root.find('.message-panel-form__typing-members');
	self.items = [];
	self.$form = self.$root.find('.message-panel-form');
	self.$textarea = self.$root.find('.message-panel-form__input');
	self.$button = self.$root.find('.message-panel-form__button');
	self.$attachment_items = self.$root.find('.message-panel-form__attachments');
	self.attachment_items = [];
	self.sending_item = null;
	self.last_sending_item_id = 0;
	self.items_per_page = 20;
	self.typing_members = [];
	self.dragging = 0;

	// ------------------------------------------------------------------ //

	self.getItemById = function(item_id) {
		var item = null;

		self.items.some(function(current_item) {
			if (current_item.object.id != item_id) {
				return false;
			}

			item = current_item;
			return true;
		});

		return item;
	};

	self.getItemByLabel = function(item_label) {
		var item = null;

		self.items.some(function(current_item) {
			if (current_item.object.label != item_label) {
				return false;
			}

			item = current_item;
			return true;
		});

		return item;
	};

	self.createItemOrUpdate = function(options) {
		var item = self.getItemById(options.object.id);

		if (!item && options.object.label) {
			item = self.getItemByLabel(options.object.label);
		}

		if (item) {
			item.object = options.object;
			item.render();
			return item;
		}

		return new dashboard.messenger.MessageItem(options, self);
	};

	self.optimizeTextarea = function() {
		self.$textarea.css('height', '');
		self.$textarea.css('height', self.$textarea[0].scrollHeight + 'px');
	};

	self.scrollTop = function(height) {
		if (height !== undefined) {
			return self.$history.scrollTop(height);
		}

		return self.$history.scrollTop();
	};

	self.scrollBottom = function(height) {
		if (height !== undefined) {
			return self.scrollTop(self.$history[0].scrollHeight - (height + self.$history.outerHeight()));
		}

		return self.$history[0].scrollHeight - (self.$history.scrollTop() + self.$history.outerHeight());
	};

	self.isBottomScrolled = function() {
		return self.scrollBottom() <= 50;
	};

	self.focus = function() {
		self.$textarea.focus();
	};

	self.goToItem = function(item_id) {
		var item = self.getItemById(item_id);

		if (!item) {
			return;
		}

		self.scrollTop(item.$root.offset().top - self.$items.offset().top);
	};

	self.getFirstUnreadItem = function() {
		var found_item = null;

		self.items.some(function(item) {
			if (item.object.is_read) {
				return false;
			}

			found_item = item;
			return true;
		});

		return found_item;
	};

	self.goToFirstUnreadItem = function() {
		var first_unread_item = self.getFirstUnreadItem();

		if (!first_unread_item) {
			return false;
		}

		self.goToItem(first_unread_item.object.id);
		return true;
	};

	self.getSendingItems = function() {
		return self.items.filter(function(item) {
			return item.is_sending;
		});
	};

	self.send = function() {
		if (self.sending_item) {
			return;
		}

		var sending_items = self.getSendingItems();

		if (sending_items.length == 0) {
			return;
		}

		self.sending_item = sending_items[0];

		return (function(callback) {
			if (!self.object) {
				return self.create({
					label: self.sending_item.object.label,
					text: self.sending_item.object.text,
				}, callback);
			}

			return request({
				method: 'POST',
				url: '/chats/' + self.object.id + '/messages/create',

				data: {
					chat_message: {
						label: self.sending_item.object.label,
						text: self.sending_item.object.text,
					},
				},
			}, callback);
		})(function(response) {
			if (response.error) {
				return setTimeout(function() {
					self.sending_item = null;
					self.send();
				}, 5000);
			}

			self.object = response.data.chat;
			delete response.data.chat;
			self.sending_item.object = response.data;
			self.sending_item.is_sending = false;
			self.sending_item.render();
			self.sending_item.place();
			self.sending_item = null;
			// self.sortItems();
			self.send();
		});
	};

	self.getShownItems = function() {
		var history_scroll_top = self.$history.scrollTop();
		var history_height = self.$history.outerHeight();
		var items_top_offset = self.$items.offset().top;
		
		return self.items.filter(function(item) {
			var item_position = item.$root.offset().top - items_top_offset;
			var item_height = item.$root.height();
			return (item_position >= history_scroll_top && item_position + item_height <= history_scroll_top + history_height);
		});
	};

	self.makeAllItemsRead = function() {
		self.items.filter(function(item) {
			return !item.object.is_read;
		}).forEach(function(item) {
			item.object.is_read = true;
			item.render();
		});
	};

	self.clearItems = function() {
		self.items.forEach(function(item) {
			item.$root.remove();
		});

		self.items = [];
		self.$load_more_before_button.addClass('d-none');
		self.$load_more_after_button.addClass('d-none');
		self.object.count_of_messages_before = 0;
		self.object.count_of_messages_after = 0;
	};

	self.removeLastReadMembersById = function(last_read_member_ids) {
		self.items.forEach(function(item) {
			var last_read_members = item.object.last_read_members.filter(function(last_read_member) {
				return last_read_member_ids.indexOf(last_read_member.id) > -1;
			});

			if (last_read_members.length >= item.object.last_read_members.length) {
				return;
			}

			item.object.last_read_members = last_read_members;
			item.render();
		});
	};

	self.getTypingMemberById = function(member_id) {
		var found_typing_member = null;

		self.typing_members.some(function(typing_member) {
			if (typing_member.id != member_id) {
				return false;
			}

			found_typing_member = typing_member;
			return true;
		});

		return found_typing_member;
	};

	self.addTypingMember = function(member) {
		var found_member = self.getTypingMemberById(member.id);

		if (found_member) {
			found_member.started_at = Date.now();
			return;
		}

		member.started_at = Date.now();
		self.typing_members.push(member);
		self.renderTypingMembers();
	};

	self.renderTypingMembers = function() {
		self.$typing_members.html('');

		self.typing_members.forEach(function(typing_member) {
			var $image = $('<img />');
			$image.attr('src', typing_member.user.image.urls.tiny);
			$image.attr('title', typing_member.user.title);
			$image.appendTo(self.$typing_members);
		});

		self.$typing_members.toggleClass('is-shown', self.typing_members.length > 0);
	};

	self.updateLastReadMessage = function() {
		var shown_items = self.getShownItems();

		if (shown_items.length == 0) {
			return;
		}

		var last_shown_item = shown_items[shown_items.length - 1];

		if (last_shown_item.object.id > self.object.last_read_message_id) {
			console.log('[messenger]', '>', 'chat_message_was_read', {
				id: self.object.id,
				message_id: last_shown_item.object.id,
			});

			realtime.emit('chat_message_was_read', {
				id: self.object.id,
				message_id: last_shown_item.object.id,
			});

			self.object.last_read_message_id = last_shown_item.object.id;
		}
	};

	self.uploadFiles = function(files, callback) {
		files = Array.prototype.slice.call(files);

		if (files.length == 0) {
			return;
		}

		console.log(files);
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
				data.append('chat_message_attachment[file]', file);
				var started_at = Date.now();

				request({
					method: 'POST',
					url: '/project_message_attachments/create',
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
					
					// self.object.attachments.push(response.data);
					return callback && callback();
				});
			};
		}), function() {
			self.$root.removeClass('is-loading');
			return callback && callback();
		});
	};

	self.createAttachmentItem = function(options) {
		return new dashboard.messenger.AttachmentItem(options, self);
	};

	// ------------------------------------------------------------------ //

	self.typing_interval = setInterval(function() {
		if (self.typing_members.length == 0) {
			return;
		}

		var typing_members = self.typing_members.filter(function(typing_member) {
			return Date.now() - typing_member.started_at <= 3000;
		});

		if (typing_members.length == self.typing_members.length) {
			return;
		}

		self.typing_members = typing_members;
		self.renderTypingMembers();
	}, 100);

	// ------------------------------------------------------------------ //

	self.$textarea.on('input', function() {
		self.optimizeTextarea();
		
		self.object && realtime.emit('typing_chat_message', {
			chat_id: self.object.id,
		});
	});

	self.$textarea.keypress(function(event) {
		if (event.which == 13) {
			event.preventDefault();
			self.$form.submit();
			return;
		}
	});

	self.$form.on('submit', function(event) {
		event.preventDefault();

		if (!self.$textarea.val()) {
			self.$textarea.focus();
			return;
		}

		if (self.object && self.object.count_of_messages_after > 0) {
			self.clearItems();

			realtime.emit('message_panel.initialize', {
				id: self.object.id,
				count: self.items_per_page,
				after_message_id: 0,
			});
		}

		new dashboard.messenger.MessageItem({
			is_sending: true,

			object: {
				label: Date.now().toString(36) + Math.random().toString(36).slice(1),
				text: self.$textarea.val(),
				author_user_id: auth.user.id,
				user: auth.user,
				created_at: moment().toISOString(),
				updated_at: moment().toISOString(),
				is_read: true,
				last_read_members: [],
			},
		}, self);

		self.scrollBottom(0);
		self.$textarea.val('');
		self.optimizeTextarea();
		self.makeAllItemsRead();
	});

	self.$history.scroll(function() {
		self.updateLastReadMessage();

		if (self.object.count_of_messages_before > 0 && self.scrollTop() < 500) {
			self.$load_more_before_button.click();
		} else if (self.object.count_of_messages_after > 0 && self.scrollBottom() < 500) {
			self.$load_more_after_button.click();
		}
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

	// ------------------------------------------------------------------ //

	self.$load_more_before_button.click(function(event) {
		event.preventDefault();

		if (self.$load_more_before_button.hasClass('is-loading')) {
			return;
		}

		self.$load_more_before_button.addClass('is-loading disabled');

		console.log('[messenger]', '>', 'message_panel.load_more', {
			id: self.object.id,
			before_message_id: self.items[0].object.id,
			count: self.items_per_page,
		});

		realtime.emit('message_panel.load_more', {
			id: self.object.id,
			before_message_id: self.items[0].object.id,
			count: self.items_per_page,
		});
	});

	self.$load_more_after_button.click(function(event) {
		event.preventDefault();

		if (self.$load_more_after_button.hasClass('is-loading')) {
			return;
		}

		self.$load_more_after_button.addClass('is-loading disabled');

		console.log('[messenger]', '>', 'message_panel.load_more', {
			id: self.object.id,
			after_message_id: self.items[self.items.length - 1].object.id,
			count: self.items_per_page,
		});

		realtime.emit('message_panel.load_more', {
			id: self.object.id,
			after_message_id: self.items[self.items.length - 1].object.id,
			count: self.items_per_page,
		});
	});

	// ------------------------------------------------------------------ //

	realtime.authorized(function() {
		if (!self.object) {
			return;
		}

		console.log('[messenger]', '[authorized]');

		console.log('[messenger]', '>', 'message_panel.initialize', {
			id: self.object.id,
			count: self.items_per_page,
			after_message_id: (self.items.length > 0 ? self.items[self.items.length - 1].object.id : 0),
		});

		realtime.emit('message_panel.initialize', {
			id: self.object.id,
			count: self.items_per_page,
			after_message_id: (self.items.length > 0 ? self.items[self.items.length - 1].object.id : 0),
		});
	});

	realtime.on('message_panel.initialize', function(chat) {
		console.log('[messenger]', '<', 'message_panel.initialize', chat);
		self.object = chat;
		// var was_bottom_scrolled = self.isBottomScrolled();

		chat.messages.forEach(function(message) {
			self.createItemOrUpdate({
				object: message,
			});
		});

		self.$load_more_before_button.toggleClass('d-none', self.object.count_of_messages_before == 0);
		self.$load_more_after_button.toggleClass('d-none', self.object.count_of_messages_after == 0);
		self.goToFirstUnreadItem() || self.scrollBottom(0);
		self.updateLastReadMessage();
	});

	realtime.on('message_panel.load_more', function(chat) {
		console.log('[messenger]', '<', 'message_panel.load_more', chat);

		if (!self.object || chat.id != self.object.id) {
			return;
		}

		if (chat.before_message_id) {
			var scroll_bottom = self.scrollBottom();

			chat.messages.sort(function(message1, message0) {
				return message1.id - message0.id;
			}).forEach(function(message) {
				self.createItemOrUpdate({
					object: message,
				});
			});

			self.object.count_of_messages_before = chat.count_of_messages_before;
			self.$load_more_before_button.removeClass('is-loading disabled');
			self.$load_more_before_button.toggleClass('d-none', self.object.count_of_messages_before == 0);
			self.scrollBottom(scroll_bottom);
		} else if (chat.after_message_id) {
			var scroll_top = self.scrollTop();

			chat.messages.sort(function(message1, message0) {
				return message1.id - message0.id;
			}).forEach(function(message) {
				self.createItemOrUpdate({
					object: message,
				});
			});

			self.object.count_of_messages_after = chat.count_of_messages_after;
			self.$load_more_after_button.removeClass('is-loading disabled');
			self.$load_more_after_button.toggleClass('d-none', self.object.count_of_messages_after == 0);
			self.scrollTop(scroll_top);
		}
	});

	realtime.on('chat_message_created', function(data) {
		if (!self.object || self.object.id != data.chat_id) {
			return;
		}

		console.log('[messenger]', '<', 'chat_message_created', data);
		var was_bottom_scrolled = self.isBottomScrolled();

		var item = self.createItemOrUpdate({
			object: data,
		});

		was_bottom_scrolled && self.scrollBottom(0);
		(data.author_user_id != auth.user.id) && item.bounceIn();
		self.typing_members = [];
		self.renderTypingMembers();
	});

	realtime.on('chat_message_was_read', function(data) {
		if (!self.object || self.object.id != data.chat_id) {
			return;
		}

		console.log('[messenger]', '<', 'chat_message_was_read', data);

		var item = self.getItemById(data.id);

		if (!item) {
			return;
		}

		var was_bottom_scrolled = self.isBottomScrolled();
		self.removeLastReadMembersById(item.object.last_read_members.map(function(last_read_member) {
			return last_read_member.id;
		}));

		item.object.last_read_members = data.last_read_members;
		item.render();
		was_bottom_scrolled && self.scrollBottom(0);
	});

	realtime.on('typing_chat_message', function(data) {
		if (!self.object || self.object.id != data.chat_id) {
			return;
		}

		console.log('[messenger]', '<', 'typing_chat_message', data);
		self.addTypingMember(data.member);
		self.renderTypingMembers();
	});

	// ------------------------------------------------------------------ //

	self.$root.data('panel', self);

	if (self.object) {
		options.object.messages.forEach(function(message) {
			self.createItemOrUpdate({
				object: message,
			});
		});

		delete options.object.messages;
		self.$load_more_before_button.toggleClass('d-none', self.object.count_of_messages_before == 0);
		self.$load_more_after_button.toggleClass('d-none', self.object.count_of_messages_after == 0);
		self.goToFirstUnreadItem() || self.scrollBottom(0);
	}
};

dashboard.messenger.MessageItem = function(options, panel) {
	var self = this;
	self.is_sending = options.is_sending || false;
	self.object = options.object;

	if (self.is_sending) {
		self.object.id = --panel.last_sending_item_id;
	}

	self.is_written_by_me = (self.object.author_user_id == auth.user.id);

	self.$root = $(dashboard.template('message-item', {
		item: self,
		message: self.object,
	})).data('item', self);

	self.$wrapper = self.$root.find('.message-item__wrapper');

	self.render = function() {
		var $root = $(dashboard.template('message-item', {
			item: self,
			message: self.object,
			chat: panel.object,
		}));

		self.$root.html($root.html());
		self.$root.attr('class', $root.attr('class'));
		self.$root.attr('data-id', $root.attr('data-id'));
	};

	self.place = function() {
		var index = panel.items.indexOf(self);
		(index >= 0) && panel.items.splice(index, 1);
		var next_item = null;

		panel.items.some(function(item) {
			if (item.object.id > 0) {
				if (self.object.id > 0) {
					if (self.object.id < item.object.id) {
						next_item = item;
						return true;
					}

					return false;
				}

				return false;
			}

			if (self.object.id > 0) {
				next_item = item;
				return true;
			}

			if (self.object.id > item.object.id) {
				next_item = item;
				return true;
			}

			return false;
		});

		if (next_item) {
			self.$root.insertBefore(next_item.$root);
			panel.items.splice(panel.items.indexOf(next_item), 0, self);
		} else {
			self.$root.insertBefore(panel.$load_more_after_button);
			panel.items.push(self);
		}
	};

	self.bounceIn = function() {
		self.$wrapper.addClass('animated bounce-in');
		clearTimeout(self.bounceIn.timeout);

		self.bounceIn.timeout = setTimeout(function() {
			self.$wrapper.removeClass('animated bounce-in');
		}, 750);
	};

	self.remove = function() {
		self.$root.remove();
		var index = panel.items.indexOf(self);
		(index > -1) && panel.items.splice(index, 1);
	};

	self.place();
	self.is_sending && panel.send();
};

dashboard.messenger.AttachmentItem = function(options, panel) {
	var self = this;
	self.object = options.object;

	self.$root = $(dashboard.template('message-panel-attachment-item', {
		attachment: self.object,
	})).data('item', self);

	self.render = function() {
		var $root = $(dashboard.template('message-panel-attachment-item', {
			attachment: self.object,
		}));

		self.$root.html($root.html());
		self.$root.attr('class', $root.attr('class'));
		self.$root.attr('data-id', $root.attr('data-id'));
	};

	self.bounceIn = function() {
		self.$wrapper.addClass('animated bounce-in');
		clearTimeout(self.bounceIn.timeout);

		self.bounceIn.timeout = setTimeout(function() {
			self.$wrapper.removeClass('animated bounce-in');
		}, 750);
	};

	self.remove = function() {
		self.$root.remove();
		var index = panel.attachment_items.indexOf(self);
		(index > -1) && panel.attachment_items.splice(index, 1);
	};

	self.$root.appendTo(panel.$attachment_items);
	panel.attachment_items.push(self);
};