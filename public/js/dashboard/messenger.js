/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/dashboard/messenger.js":
/*!*********************************************!*\
  !*** ./resources/js/dashboard/messenger.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

dashboard.messenger = {};

dashboard.messenger.ChatPanel = function () {
  var self = this;
  self.lists = {};
  self.$root = $('.chat-panel'); // ------------------------------------------------------------------ //

  self.lists.people = new dashboard.messenger.ChatList({
    root: '.chat-list.is-people',
    owner: {
      type: null
    }
  }, self); // panel.lists.channel = new dashboard.chat.List({
  // 	owner: { type: 'Project' },
  // });
};

dashboard.messenger.ChatList = function (options, panel) {
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
  self.$search_input = self.$root.find('.chat-list-search__input'); // ------------------------------------------------------------------ //

  self.getItemById = function (item_id) {
    var item = null;
    self.items.some(function (current_item) {
      if (current_item.object.id != item_id) {
        return false;
      }

      item = current_item;
      return true;
    });
    return item;
  };

  self.itemExists = function (item_id) {
    return self.getItemById(item_id) ? true : false;
  };

  self.createItemOrUpdate = function (options) {
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

  self.clearItems = function () {
    self.items.forEach(function (item) {
      item.$root.remove();
    });
    self.items = [];
    self.$load_more_button.addClass('d-none');
    self.count_of_chats_after = 0;
  };

  self.initialize = function () {
    console.log('[messenger]', '>', '[chat_list.initialize]', {
      owner: self.owner,
      after_last_message_id: self.items[0] ? self.items[0].object.last_message_id : 0,
      count: self.items_per_page,
      search: {
        query: self.$search_input.val().trim()
      }
    });
    realtime.emit('chat_list.initialize', {
      owner: self.owner,
      after_last_message_id: self.items[0] ? self.items[0].object.last_message_id : 0,
      count: self.items_per_page,
      search: {
        query: self.$search_input.val().trim()
      }
    });
  }; // ------------------------------------------------------------------ //


  self.scrollTop = function (height) {
    if (height !== undefined) {
      return self.$items.scrollTop(height);
    }

    return self.$items.scrollTop();
  };

  self.scrollBottom = function (height) {
    if (height !== undefined) {
      return self.scrollTop(self.$items[0].scrollHeight - (height + self.$items.outerHeight()));
    }

    return self.$items[0].scrollHeight - (self.$items.scrollTop() + self.$items.outerHeight());
  }; // ------------------------------------------------------------------ //


  self.$load_more_button.click(function (event) {
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
        query: self.$search_input.val().trim()
      }
    });
  });
  self.$items.scroll(function () {
    if (self.count_of_chats_after > 0 && self.scrollBottom() < 500) {
      self.$load_more_button.click();
    }
  });
  self.$search_input.on('input', function () {
    var original_value = $(this).val();
    var fixed_value = $(this).val().replace(/^mailto:/, '');
    original_value != fixed_value && $(this).val(fixed_value);
    clearTimeout(self.search_timeout);
    self.search_timeout = setTimeout(function () {
      self.clearItems();
      self.$no_items.addClass('d-none');
      self.$loader.removeClass('d-none');
      self.initialize();
    }, 200);
  }); // ------------------------------------------------------------------ //

  realtime.authorized(function () {
    console.log('[messenger]', '[authorized]');
    self.initialize();
  });
  realtime.on('chat_list.initialize', function (data) {
    console.log('[messenger]', '<', '[chat_list.initialize]', data);
    self.$loader.addClass('d-none');
    console.log(data);
    data.chats.forEach(function (chat) {
      self.createItemOrUpdate({
        object: chat
      });
    });
    self.count_of_chats_after = data.count_of_chats_after;
    self.$load_more_button.toggleClass('d-none', self.count_of_chats_after == 0);
    !self.is_initialized && self.$search.toggleClass('d-none', self.items.length == 0);
    self.$items.toggleClass('d-none', self.items.length == 0);
    self.$no_items.toggleClass('d-none', self.items.length > 0);
    self.is_initialized = true;
  });
  realtime.on('chat_list.load_more', function (data) {
    console.log('[messenger]', '<', '[chat_list.load_more]', data);
    data.chats.forEach(function (chat) {
      self.createItemOrUpdate({
        object: chat
      });
    });
    self.count_of_chats_after = data.count_of_chats_after;
    console.log('data.count_of_chats_after', data.count_of_chats_after);
    self.$load_more_button.removeClass('is-loading disabled');
    self.$load_more_button.toggleClass('d-none', self.count_of_chats_after == 0);
  });
  realtime.on('chat_message_created', function (data) {
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
      object: chat
    });
    self.$search.removeClass('d-none');
    self.$items.removeClass('d-none');
    self.$no_items.addClass('d-none');
    chat.last_message.author_user_id != auth.user.id && item.bounceIn();
  });
  realtime.on('chat_message_was_read', function (data) {
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
  realtime.on('typing_chat_message', function (data) {
    var item = self.getItemById(data.chat_id);

    if (!item.object || item.object.id != data.chat_id) {
      return;
    }

    console.log('[messenger]', '<', 'typing_chat_message', data);
    item.addTypingMember(data.member);
    item.render();
  }); // ------------------------------------------------------------------ //

  self.typing_interval = setInterval(function () {
    self.items.forEach(function (item) {
      if (item.typing_members.length == 0) {
        return;
      }

      var typing_members = item.typing_members.filter(function (typing_member) {
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

dashboard.messenger.ChatItem = function (options, list, panel) {
  var self = this;
  self.object = options.object;
  self.typing_members = [];
  self.dragging = 0;
  self.$root = $(dashboard.template('chat-item', {
    item: self,
    chat: self.object
  })).data('item', self).insertBefore(list.$load_more_button);

  self.render = function () {
    var $root = $(dashboard.template('chat-item', {
      item: self,
      chat: self.object
    }));
    self.$root.find('.chat-item__typing-members').html($root.find('.chat-item__typing-members').html());
    self.$root.find('.chat-item__message').html($root.find('.chat-item__message').html());
    self.$root.find('.chat-item__time').html($root.find('.chat-item__time').html());
    self.$root.attr('class', $root.attr('class'));
  };

  self.bounceIn = function () {
    self.$root.addClass('animated bounce-in');
    clearTimeout(self.bounceIn.timeout);
    self.bounceIn.timeout = setTimeout(function () {
      self.$root.removeClass('animated bounce-in');
    }, 750);
  };

  self.place = function () {
    var index = list.items.indexOf(self);
    index >= 0 && list.items.splice(list.items.indexOf(self), 1);
    var next_item = null;
    list.items.some(function (item) {
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

  self.getTypingMemberById = function (member_id) {
    var found_typing_member = null;
    self.typing_members.some(function (typing_member) {
      if (typing_member.id != member_id) {
        return false;
      }

      found_typing_member = typing_member;
      return true;
    });
    return found_typing_member;
  };

  self.addTypingMember = function (member) {
    var found_member = self.getTypingMemberById(member.id);

    if (found_member) {
      found_member.started_at = Date.now();
      return;
    }

    member.started_at = Date.now();
    self.typing_members.push(member);
    self.render('members');
  };

  self.$root.click(function (event) {
    event.preventDefault();

    if (self.object.type == 'dialog' && self.object.owner_type == null) {
      slideups.user_profile({
        user_id: self.object.opposite_member.user_id
      });
      return;
    }
  });
  self.$root.on('drag dragstart dragend dragover dragenter dragleave drop', function (event) {
    event.preventDefault();
    event.stopPropagation();
  }).on('dragenter', function (event) {
    ++self.dragging;

    if (self.dragging > 1) {
      return;
    }

    self.$root.addClass('is-dragover');
    self.$dropzone_text.addClass('animated bounceIn');
  }).on('dragleave drop', function () {
    --self.dragging;

    if (self.dragging > 0) {
      return;
    }

    self.$root.removeClass('is-dragover');
    self.$dropzone_text.removeClass('animated bounceIn');
  }).on('drop', function (event) {// self.uploadFiles(event.originalEvent.dataTransfer.files || []);
  });
  self.place();
};

dashboard.messenger.MessagePanel = function (options) {
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
  self.dragging = 0; // ------------------------------------------------------------------ //

  self.getItemById = function (item_id) {
    var item = null;
    self.items.some(function (current_item) {
      if (current_item.object.id != item_id) {
        return false;
      }

      item = current_item;
      return true;
    });
    return item;
  };

  self.getItemByLabel = function (item_label) {
    var item = null;
    self.items.some(function (current_item) {
      if (current_item.object.label != item_label) {
        return false;
      }

      item = current_item;
      return true;
    });
    return item;
  };

  self.createItemOrUpdate = function (options) {
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

  self.optimizeTextarea = function () {
    self.$textarea.css('height', '');
    self.$textarea.css('height', self.$textarea[0].scrollHeight + 'px');
  };

  self.scrollTop = function (height) {
    if (height !== undefined) {
      return self.$history.scrollTop(height);
    }

    return self.$history.scrollTop();
  };

  self.scrollBottom = function (height) {
    if (height !== undefined) {
      return self.scrollTop(self.$history[0].scrollHeight - (height + self.$history.outerHeight()));
    }

    return self.$history[0].scrollHeight - (self.$history.scrollTop() + self.$history.outerHeight());
  };

  self.isBottomScrolled = function () {
    return self.scrollBottom() <= 50;
  };

  self.focus = function () {
    self.$textarea.focus();
  };

  self.goToItem = function (item_id) {
    var item = self.getItemById(item_id);

    if (!item) {
      return;
    }

    self.scrollTop(item.$root.offset().top - self.$items.offset().top);
  };

  self.getFirstUnreadItem = function () {
    var found_item = null;
    self.items.some(function (item) {
      if (item.object.is_read) {
        return false;
      }

      found_item = item;
      return true;
    });
    return found_item;
  };

  self.goToFirstUnreadItem = function () {
    var first_unread_item = self.getFirstUnreadItem();

    if (!first_unread_item) {
      return false;
    }

    self.goToItem(first_unread_item.object.id);
    return true;
  };

  self.getSendingItems = function () {
    return self.items.filter(function (item) {
      return item.is_sending;
    });
  };

  self.send = function () {
    if (self.sending_item) {
      return;
    }

    var sending_items = self.getSendingItems();

    if (sending_items.length == 0) {
      return;
    }

    self.sending_item = sending_items[0];
    return function (callback) {
      if (!self.object) {
        return self.create({
          label: self.sending_item.object.label,
          text: self.sending_item.object.text
        }, callback);
      }

      return request({
        method: 'POST',
        url: '/chats/' + self.object.id + '/messages/create',
        data: {
          chat_message: {
            label: self.sending_item.object.label,
            text: self.sending_item.object.text
          }
        }
      }, callback);
    }(function (response) {
      if (response.error) {
        return setTimeout(function () {
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
      self.sending_item = null; // self.sortItems();

      self.send();
    });
  };

  self.getShownItems = function () {
    var history_scroll_top = self.$history.scrollTop();
    var history_height = self.$history.outerHeight();
    var items_top_offset = self.$items.offset().top;
    return self.items.filter(function (item) {
      var item_position = item.$root.offset().top - items_top_offset;
      var item_height = item.$root.height();
      return item_position >= history_scroll_top && item_position + item_height <= history_scroll_top + history_height;
    });
  };

  self.makeAllItemsRead = function () {
    self.items.filter(function (item) {
      return !item.object.is_read;
    }).forEach(function (item) {
      item.object.is_read = true;
      item.render();
    });
  };

  self.clearItems = function () {
    self.items.forEach(function (item) {
      item.$root.remove();
    });
    self.items = [];
    self.$load_more_before_button.addClass('d-none');
    self.$load_more_after_button.addClass('d-none');
    self.object.count_of_messages_before = 0;
    self.object.count_of_messages_after = 0;
  };

  self.removeLastReadMembersById = function (last_read_member_ids) {
    self.items.forEach(function (item) {
      var last_read_members = item.object.last_read_members.filter(function (last_read_member) {
        return last_read_member_ids.indexOf(last_read_member.id) > -1;
      });

      if (last_read_members.length >= item.object.last_read_members.length) {
        return;
      }

      item.object.last_read_members = last_read_members;
      item.render();
    });
  };

  self.getTypingMemberById = function (member_id) {
    var found_typing_member = null;
    self.typing_members.some(function (typing_member) {
      if (typing_member.id != member_id) {
        return false;
      }

      found_typing_member = typing_member;
      return true;
    });
    return found_typing_member;
  };

  self.addTypingMember = function (member) {
    var found_member = self.getTypingMemberById(member.id);

    if (found_member) {
      found_member.started_at = Date.now();
      return;
    }

    member.started_at = Date.now();
    self.typing_members.push(member);
    self.renderTypingMembers();
  };

  self.renderTypingMembers = function () {
    self.$typing_members.html('');
    self.typing_members.forEach(function (typing_member) {
      var $image = $('<img />');
      $image.attr('src', typing_member.user.image.urls.tiny);
      $image.attr('title', typing_member.user.title);
      $image.appendTo(self.$typing_members);
    });
    self.$typing_members.toggleClass('is-shown', self.typing_members.length > 0);
  };

  self.updateLastReadMessage = function () {
    var shown_items = self.getShownItems();

    if (shown_items.length == 0) {
      return;
    }

    var last_shown_item = shown_items[shown_items.length - 1];

    if (last_shown_item.object.id > self.object.last_read_message_id) {
      console.log('[messenger]', '>', 'chat_message_was_read', {
        id: self.object.id,
        message_id: last_shown_item.object.id
      });
      realtime.emit('chat_message_was_read', {
        id: self.object.id,
        message_id: last_shown_item.object.id
      });
      self.object.last_read_message_id = last_shown_item.object.id;
    }
  };

  self.uploadFiles = function (files, callback) {
    files = Array.prototype.slice.call(files);

    if (files.length == 0) {
      return;
    }

    console.log(files);
    self.$root.addClass('is-loading');
    return series(files.map(function (file) {
      var notification_id = Date.now().toString(36) + Math.random().toString(36).slice(2);
      $.notify('Uploading: 0%', {
        className: 'success is-' + notification_id,
        autoHide: false,
        showDuration: 0
      });
      var $notification = $('.notifyjs-bootstrap-base.is-' + notification_id).parents('.notifyjs-wrapper');
      return function (callback) {
        var data = new FormData();
        data.append('chat_message_attachment[file]', file);
        var started_at = Date.now();
        request({
          method: 'POST',
          url: '/project_message_attachments/create',
          data: data,
          contentType: false,
          processData: false,
          progress: function progress(percent) {
            $notification.find('span').text('Uploading: ' + percent + '%');
          }
        }, function (response) {
          $notification.click();

          if (response.error) {
            $.notify(response.error, 'error');
            return callback && callback();
          } // self.object.attachments.push(response.data);


          return callback && callback();
        });
      };
    }), function () {
      self.$root.removeClass('is-loading');
      return callback && callback();
    });
  };

  self.createAttachmentItem = function (options) {
    return new dashboard.messenger.AttachmentItem(options, self);
  }; // ------------------------------------------------------------------ //


  self.typing_interval = setInterval(function () {
    if (self.typing_members.length == 0) {
      return;
    }

    var typing_members = self.typing_members.filter(function (typing_member) {
      return Date.now() - typing_member.started_at <= 3000;
    });

    if (typing_members.length == self.typing_members.length) {
      return;
    }

    self.typing_members = typing_members;
    self.renderTypingMembers();
  }, 100); // ------------------------------------------------------------------ //

  self.$textarea.on('input', function () {
    self.optimizeTextarea();
    self.object && realtime.emit('typing_chat_message', {
      chat_id: self.object.id
    });
  });
  self.$textarea.keypress(function (event) {
    if (event.which == 13) {
      event.preventDefault();
      self.$form.submit();
      return;
    }
  });
  self.$form.on('submit', function (event) {
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
        after_message_id: 0
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
        last_read_members: []
      }
    }, self);
    self.scrollBottom(0);
    self.$textarea.val('');
    self.optimizeTextarea();
    self.makeAllItemsRead();
  });
  self.$history.scroll(function () {
    self.updateLastReadMessage();

    if (self.object.count_of_messages_before > 0 && self.scrollTop() < 500) {
      self.$load_more_before_button.click();
    } else if (self.object.count_of_messages_after > 0 && self.scrollBottom() < 500) {
      self.$load_more_after_button.click();
    }
  });
  self.$root.on('drag dragstart dragend dragover dragenter dragleave drop', function (event) {
    event.preventDefault();
    event.stopPropagation();
  }).on('dragenter', function (event) {
    ++self.dragging;

    if (self.dragging > 1) {
      return;
    }

    self.$root.addClass('is-dragover');
    self.$dropzone_text.addClass('animated bounceIn');
  }).on('dragleave drop', function () {
    --self.dragging;

    if (self.dragging > 0) {
      return;
    }

    self.$root.removeClass('is-dragover');
    self.$dropzone_text.removeClass('animated bounceIn');
  }).on('drop', function (event) {
    self.uploadFiles(event.originalEvent.dataTransfer.files || []);
  }); // ------------------------------------------------------------------ //

  self.$load_more_before_button.click(function (event) {
    event.preventDefault();

    if (self.$load_more_before_button.hasClass('is-loading')) {
      return;
    }

    self.$load_more_before_button.addClass('is-loading disabled');
    console.log('[messenger]', '>', 'message_panel.load_more', {
      id: self.object.id,
      before_message_id: self.items[0].object.id,
      count: self.items_per_page
    });
    realtime.emit('message_panel.load_more', {
      id: self.object.id,
      before_message_id: self.items[0].object.id,
      count: self.items_per_page
    });
  });
  self.$load_more_after_button.click(function (event) {
    event.preventDefault();

    if (self.$load_more_after_button.hasClass('is-loading')) {
      return;
    }

    self.$load_more_after_button.addClass('is-loading disabled');
    console.log('[messenger]', '>', 'message_panel.load_more', {
      id: self.object.id,
      after_message_id: self.items[self.items.length - 1].object.id,
      count: self.items_per_page
    });
    realtime.emit('message_panel.load_more', {
      id: self.object.id,
      after_message_id: self.items[self.items.length - 1].object.id,
      count: self.items_per_page
    });
  }); // ------------------------------------------------------------------ //

  realtime.authorized(function () {
    if (!self.object) {
      return;
    }

    console.log('[messenger]', '[authorized]');
    console.log('[messenger]', '>', 'message_panel.initialize', {
      id: self.object.id,
      count: self.items_per_page,
      after_message_id: self.items.length > 0 ? self.items[self.items.length - 1].object.id : 0
    });
    realtime.emit('message_panel.initialize', {
      id: self.object.id,
      count: self.items_per_page,
      after_message_id: self.items.length > 0 ? self.items[self.items.length - 1].object.id : 0
    });
  });
  realtime.on('message_panel.initialize', function (chat) {
    console.log('[messenger]', '<', 'message_panel.initialize', chat);
    self.object = chat; // var was_bottom_scrolled = self.isBottomScrolled();

    chat.messages.forEach(function (message) {
      self.createItemOrUpdate({
        object: message
      });
    });
    self.$load_more_before_button.toggleClass('d-none', self.object.count_of_messages_before == 0);
    self.$load_more_after_button.toggleClass('d-none', self.object.count_of_messages_after == 0);
    self.goToFirstUnreadItem() || self.scrollBottom(0);
    self.updateLastReadMessage();
  });
  realtime.on('message_panel.load_more', function (chat) {
    console.log('[messenger]', '<', 'message_panel.load_more', chat);

    if (!self.object || chat.id != self.object.id) {
      return;
    }

    if (chat.before_message_id) {
      var scroll_bottom = self.scrollBottom();
      chat.messages.sort(function (message1, message0) {
        return message1.id - message0.id;
      }).forEach(function (message) {
        self.createItemOrUpdate({
          object: message
        });
      });
      self.object.count_of_messages_before = chat.count_of_messages_before;
      self.$load_more_before_button.removeClass('is-loading disabled');
      self.$load_more_before_button.toggleClass('d-none', self.object.count_of_messages_before == 0);
      self.scrollBottom(scroll_bottom);
    } else if (chat.after_message_id) {
      var scroll_top = self.scrollTop();
      chat.messages.sort(function (message1, message0) {
        return message1.id - message0.id;
      }).forEach(function (message) {
        self.createItemOrUpdate({
          object: message
        });
      });
      self.object.count_of_messages_after = chat.count_of_messages_after;
      self.$load_more_after_button.removeClass('is-loading disabled');
      self.$load_more_after_button.toggleClass('d-none', self.object.count_of_messages_after == 0);
      self.scrollTop(scroll_top);
    }
  });
  realtime.on('chat_message_created', function (data) {
    if (!self.object || self.object.id != data.chat_id) {
      return;
    }

    console.log('[messenger]', '<', 'chat_message_created', data);
    var was_bottom_scrolled = self.isBottomScrolled();
    var item = self.createItemOrUpdate({
      object: data
    });
    was_bottom_scrolled && self.scrollBottom(0);
    data.author_user_id != auth.user.id && item.bounceIn();
    self.typing_members = [];
    self.renderTypingMembers();
  });
  realtime.on('chat_message_was_read', function (data) {
    if (!self.object || self.object.id != data.chat_id) {
      return;
    }

    console.log('[messenger]', '<', 'chat_message_was_read', data);
    var item = self.getItemById(data.id);

    if (!item) {
      return;
    }

    var was_bottom_scrolled = self.isBottomScrolled();
    self.removeLastReadMembersById(item.object.last_read_members.map(function (last_read_member) {
      return last_read_member.id;
    }));
    item.object.last_read_members = data.last_read_members;
    item.render();
    was_bottom_scrolled && self.scrollBottom(0);
  });
  realtime.on('typing_chat_message', function (data) {
    if (!self.object || self.object.id != data.chat_id) {
      return;
    }

    console.log('[messenger]', '<', 'typing_chat_message', data);
    self.addTypingMember(data.member);
    self.renderTypingMembers();
  }); // ------------------------------------------------------------------ //

  self.$root.data('panel', self);

  if (self.object) {
    options.object.messages.forEach(function (message) {
      self.createItemOrUpdate({
        object: message
      });
    });
    delete options.object.messages;
    self.$load_more_before_button.toggleClass('d-none', self.object.count_of_messages_before == 0);
    self.$load_more_after_button.toggleClass('d-none', self.object.count_of_messages_after == 0);
    self.goToFirstUnreadItem() || self.scrollBottom(0);
  }
};

dashboard.messenger.MessageItem = function (options, panel) {
  var self = this;
  self.is_sending = options.is_sending || false;
  self.object = options.object;

  if (self.is_sending) {
    self.object.id = --panel.last_sending_item_id;
  }

  self.is_written_by_me = self.object.author_user_id == auth.user.id;
  self.$root = $(dashboard.template('message-item', {
    item: self,
    message: self.object
  })).data('item', self);
  self.$wrapper = self.$root.find('.message-item__wrapper');

  self.render = function () {
    var $root = $(dashboard.template('message-item', {
      item: self,
      message: self.object,
      chat: panel.object
    }));
    self.$root.html($root.html());
    self.$root.attr('class', $root.attr('class'));
    self.$root.attr('data-id', $root.attr('data-id'));
  };

  self.place = function () {
    var index = panel.items.indexOf(self);
    index >= 0 && panel.items.splice(index, 1);
    var next_item = null;
    panel.items.some(function (item) {
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

  self.bounceIn = function () {
    self.$wrapper.addClass('animated bounce-in');
    clearTimeout(self.bounceIn.timeout);
    self.bounceIn.timeout = setTimeout(function () {
      self.$wrapper.removeClass('animated bounce-in');
    }, 750);
  };

  self.remove = function () {
    self.$root.remove();
    var index = panel.items.indexOf(self);
    index > -1 && panel.items.splice(index, 1);
  };

  self.place();
  self.is_sending && panel.send();
};

dashboard.messenger.AttachmentItem = function (options, panel) {
  var self = this;
  self.object = options.object;
  self.$root = $(dashboard.template('message-panel-attachment-item', {
    attachment: self.object
  })).data('item', self);

  self.render = function () {
    var $root = $(dashboard.template('message-panel-attachment-item', {
      attachment: self.object
    }));
    self.$root.html($root.html());
    self.$root.attr('class', $root.attr('class'));
    self.$root.attr('data-id', $root.attr('data-id'));
  };

  self.bounceIn = function () {
    self.$wrapper.addClass('animated bounce-in');
    clearTimeout(self.bounceIn.timeout);
    self.bounceIn.timeout = setTimeout(function () {
      self.$wrapper.removeClass('animated bounce-in');
    }, 750);
  };

  self.remove = function () {
    self.$root.remove();
    var index = panel.attachment_items.indexOf(self);
    index > -1 && panel.attachment_items.splice(index, 1);
  };

  self.$root.appendTo(panel.$attachment_items);
  panel.attachment_items.push(self);
};

/***/ }),

/***/ 6:
/*!***************************************************!*\
  !*** multi ./resources/js/dashboard/messenger.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\js\dashboard\messenger.js */"./resources/js/dashboard/messenger.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2Rhc2hib2FyZC9tZXNzZW5nZXIuanMiXSwibmFtZXMiOlsiZGFzaGJvYXJkIiwibWVzc2VuZ2VyIiwiQ2hhdFBhbmVsIiwic2VsZiIsImxpc3RzIiwiJHJvb3QiLCIkIiwicGVvcGxlIiwiQ2hhdExpc3QiLCJyb290Iiwib3duZXIiLCJ0eXBlIiwib3B0aW9ucyIsInBhbmVsIiwiaXNfaW5pdGlhbGl6ZWQiLCJpdGVtcyIsIiRpdGVtcyIsImZpbmQiLCIkbm9faXRlbXMiLCIkbG9hZGVyIiwiJGxvYWRfbW9yZV9idXR0b24iLCJpdGVtc19wZXJfcGFnZSIsImNvdW50X29mX2NoYXRzX2FmdGVyIiwiJHNlYXJjaCIsIiRzZWFyY2hfaW5wdXQiLCJnZXRJdGVtQnlJZCIsIml0ZW1faWQiLCJpdGVtIiwic29tZSIsImN1cnJlbnRfaXRlbSIsIm9iamVjdCIsImlkIiwiaXRlbUV4aXN0cyIsImNyZWF0ZUl0ZW1PclVwZGF0ZSIsInR5cGluZ19tZW1iZXJzIiwicmVuZGVyIiwicGxhY2UiLCJDaGF0SXRlbSIsImNsZWFySXRlbXMiLCJmb3JFYWNoIiwicmVtb3ZlIiwiYWRkQ2xhc3MiLCJpbml0aWFsaXplIiwiY29uc29sZSIsImxvZyIsImFmdGVyX2xhc3RfbWVzc2FnZV9pZCIsImxhc3RfbWVzc2FnZV9pZCIsImNvdW50Iiwic2VhcmNoIiwicXVlcnkiLCJ2YWwiLCJ0cmltIiwicmVhbHRpbWUiLCJlbWl0Iiwic2Nyb2xsVG9wIiwiaGVpZ2h0IiwidW5kZWZpbmVkIiwic2Nyb2xsQm90dG9tIiwic2Nyb2xsSGVpZ2h0Iiwib3V0ZXJIZWlnaHQiLCJjbGljayIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJoYXNDbGFzcyIsImJlZm9yZV9sYXN0X21lc3NhZ2VfaWQiLCJsZW5ndGgiLCJzY3JvbGwiLCJvbiIsIm9yaWdpbmFsX3ZhbHVlIiwiZml4ZWRfdmFsdWUiLCJyZXBsYWNlIiwiY2xlYXJUaW1lb3V0Iiwic2VhcmNoX3RpbWVvdXQiLCJzZXRUaW1lb3V0IiwicmVtb3ZlQ2xhc3MiLCJhdXRob3JpemVkIiwiZGF0YSIsImNoYXRzIiwiY2hhdCIsInRvZ2dsZUNsYXNzIiwiY2hhdF9tZXNzYWdlIiwibGFzdF9tZXNzYWdlIiwiYXV0aG9yX3VzZXJfaWQiLCJhdXRoIiwidXNlciIsImJvdW5jZUluIiwiY291bnRfb2ZfdW5yZWFkX21lc3NhZ2VzIiwiY2hhdF9pZCIsImFkZFR5cGluZ01lbWJlciIsIm1lbWJlciIsInR5cGluZ19pbnRlcnZhbCIsInNldEludGVydmFsIiwiZmlsdGVyIiwidHlwaW5nX21lbWJlciIsIkRhdGUiLCJub3ciLCJzdGFydGVkX2F0IiwibGlzdCIsImRyYWdnaW5nIiwidGVtcGxhdGUiLCJpbnNlcnRCZWZvcmUiLCJodG1sIiwiYXR0ciIsInRpbWVvdXQiLCJpbmRleCIsImluZGV4T2YiLCJzcGxpY2UiLCJuZXh0X2l0ZW0iLCJwdXNoIiwiZ2V0VHlwaW5nTWVtYmVyQnlJZCIsIm1lbWJlcl9pZCIsImZvdW5kX3R5cGluZ19tZW1iZXIiLCJmb3VuZF9tZW1iZXIiLCJvd25lcl90eXBlIiwic2xpZGV1cHMiLCJ1c2VyX3Byb2ZpbGUiLCJ1c2VyX2lkIiwib3Bwb3NpdGVfbWVtYmVyIiwic3RvcFByb3BhZ2F0aW9uIiwiJGRyb3B6b25lX3RleHQiLCJNZXNzYWdlUGFuZWwiLCJjcmVhdGUiLCIkY29udGVudCIsIiRoaXN0b3J5IiwiJGxvYWRfbW9yZV9iZWZvcmVfYnV0dG9uIiwiJGxvYWRfbW9yZV9hZnRlcl9idXR0b24iLCIkdHlwaW5nX21lbWJlcnMiLCIkZm9ybSIsIiR0ZXh0YXJlYSIsIiRidXR0b24iLCIkYXR0YWNobWVudF9pdGVtcyIsImF0dGFjaG1lbnRfaXRlbXMiLCJzZW5kaW5nX2l0ZW0iLCJsYXN0X3NlbmRpbmdfaXRlbV9pZCIsImdldEl0ZW1CeUxhYmVsIiwiaXRlbV9sYWJlbCIsImxhYmVsIiwiTWVzc2FnZUl0ZW0iLCJvcHRpbWl6ZVRleHRhcmVhIiwiY3NzIiwiaXNCb3R0b21TY3JvbGxlZCIsImZvY3VzIiwiZ29Ub0l0ZW0iLCJvZmZzZXQiLCJ0b3AiLCJnZXRGaXJzdFVucmVhZEl0ZW0iLCJmb3VuZF9pdGVtIiwiaXNfcmVhZCIsImdvVG9GaXJzdFVucmVhZEl0ZW0iLCJmaXJzdF91bnJlYWRfaXRlbSIsImdldFNlbmRpbmdJdGVtcyIsImlzX3NlbmRpbmciLCJzZW5kIiwic2VuZGluZ19pdGVtcyIsImNhbGxiYWNrIiwidGV4dCIsInJlcXVlc3QiLCJtZXRob2QiLCJ1cmwiLCJyZXNwb25zZSIsImVycm9yIiwiZ2V0U2hvd25JdGVtcyIsImhpc3Rvcnlfc2Nyb2xsX3RvcCIsImhpc3RvcnlfaGVpZ2h0IiwiaXRlbXNfdG9wX29mZnNldCIsIml0ZW1fcG9zaXRpb24iLCJpdGVtX2hlaWdodCIsIm1ha2VBbGxJdGVtc1JlYWQiLCJjb3VudF9vZl9tZXNzYWdlc19iZWZvcmUiLCJjb3VudF9vZl9tZXNzYWdlc19hZnRlciIsInJlbW92ZUxhc3RSZWFkTWVtYmVyc0J5SWQiLCJsYXN0X3JlYWRfbWVtYmVyX2lkcyIsImxhc3RfcmVhZF9tZW1iZXJzIiwibGFzdF9yZWFkX21lbWJlciIsInJlbmRlclR5cGluZ01lbWJlcnMiLCIkaW1hZ2UiLCJpbWFnZSIsInVybHMiLCJ0aW55IiwidGl0bGUiLCJhcHBlbmRUbyIsInVwZGF0ZUxhc3RSZWFkTWVzc2FnZSIsInNob3duX2l0ZW1zIiwibGFzdF9zaG93bl9pdGVtIiwibGFzdF9yZWFkX21lc3NhZ2VfaWQiLCJtZXNzYWdlX2lkIiwidXBsb2FkRmlsZXMiLCJmaWxlcyIsIkFycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJjYWxsIiwic2VyaWVzIiwibWFwIiwiZmlsZSIsIm5vdGlmaWNhdGlvbl9pZCIsInRvU3RyaW5nIiwiTWF0aCIsInJhbmRvbSIsIm5vdGlmeSIsImNsYXNzTmFtZSIsImF1dG9IaWRlIiwic2hvd0R1cmF0aW9uIiwiJG5vdGlmaWNhdGlvbiIsInBhcmVudHMiLCJGb3JtRGF0YSIsImFwcGVuZCIsImNvbnRlbnRUeXBlIiwicHJvY2Vzc0RhdGEiLCJwcm9ncmVzcyIsInBlcmNlbnQiLCJjcmVhdGVBdHRhY2htZW50SXRlbSIsIkF0dGFjaG1lbnRJdGVtIiwia2V5cHJlc3MiLCJ3aGljaCIsInN1Ym1pdCIsImFmdGVyX21lc3NhZ2VfaWQiLCJjcmVhdGVkX2F0IiwibW9tZW50IiwidG9JU09TdHJpbmciLCJ1cGRhdGVkX2F0Iiwib3JpZ2luYWxFdmVudCIsImRhdGFUcmFuc2ZlciIsImJlZm9yZV9tZXNzYWdlX2lkIiwibWVzc2FnZXMiLCJtZXNzYWdlIiwic2Nyb2xsX2JvdHRvbSIsInNvcnQiLCJtZXNzYWdlMSIsIm1lc3NhZ2UwIiwic2Nyb2xsX3RvcCIsIndhc19ib3R0b21fc2Nyb2xsZWQiLCJpc193cml0dGVuX2J5X21lIiwiJHdyYXBwZXIiLCJhdHRhY2htZW50Il0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkFBLFNBQVMsQ0FBQ0MsU0FBVixHQUFzQixFQUF0Qjs7QUFFQUQsU0FBUyxDQUFDQyxTQUFWLENBQW9CQyxTQUFwQixHQUFnQyxZQUFXO0FBQzFDLE1BQUlDLElBQUksR0FBRyxJQUFYO0FBQ0FBLE1BQUksQ0FBQ0MsS0FBTCxHQUFhLEVBQWI7QUFDQUQsTUFBSSxDQUFDRSxLQUFMLEdBQWFDLENBQUMsQ0FBQyxhQUFELENBQWQsQ0FIMEMsQ0FLMUM7O0FBRUFILE1BQUksQ0FBQ0MsS0FBTCxDQUFXRyxNQUFYLEdBQW9CLElBQUlQLFNBQVMsQ0FBQ0MsU0FBVixDQUFvQk8sUUFBeEIsQ0FBaUM7QUFDcERDLFFBQUksRUFBRSxzQkFEOEM7QUFFcERDLFNBQUssRUFBRTtBQUFFQyxVQUFJLEVBQUU7QUFBUjtBQUY2QyxHQUFqQyxFQUdqQlIsSUFIaUIsQ0FBcEIsQ0FQMEMsQ0FZMUM7QUFDQTtBQUNBO0FBQ0EsQ0FmRDs7QUFpQkFILFNBQVMsQ0FBQ0MsU0FBVixDQUFvQk8sUUFBcEIsR0FBK0IsVUFBU0ksT0FBVCxFQUFrQkMsS0FBbEIsRUFBeUI7QUFDdkQ7QUFFQSxNQUFJVixJQUFJLEdBQUcsSUFBWDtBQUNBQSxNQUFJLENBQUNXLGNBQUwsR0FBc0IsS0FBdEI7QUFDQVgsTUFBSSxDQUFDTyxLQUFMLEdBQWFFLE9BQU8sQ0FBQ0YsS0FBckI7QUFDQVAsTUFBSSxDQUFDWSxLQUFMLEdBQWEsRUFBYjtBQUNBWixNQUFJLENBQUNFLEtBQUwsR0FBYUMsQ0FBQyxDQUFDTSxPQUFPLENBQUNILElBQVQsQ0FBZDtBQUNBTixNQUFJLENBQUNhLE1BQUwsR0FBY2IsSUFBSSxDQUFDRSxLQUFMLENBQVdZLElBQVgsQ0FBZ0IsbUJBQWhCLENBQWQ7QUFDQWQsTUFBSSxDQUFDZSxTQUFMLEdBQWlCZixJQUFJLENBQUNFLEtBQUwsQ0FBV1ksSUFBWCxDQUFnQixzQkFBaEIsQ0FBakI7QUFDQWQsTUFBSSxDQUFDZ0IsT0FBTCxHQUFlaEIsSUFBSSxDQUFDRSxLQUFMLENBQVdZLElBQVgsQ0FBZ0Isb0JBQWhCLENBQWY7QUFDQWQsTUFBSSxDQUFDaUIsaUJBQUwsR0FBeUJqQixJQUFJLENBQUNFLEtBQUwsQ0FBV1ksSUFBWCxDQUFnQiw4QkFBaEIsQ0FBekI7QUFDQWQsTUFBSSxDQUFDa0IsY0FBTCxHQUFzQixFQUF0QjtBQUNBbEIsTUFBSSxDQUFDbUIsb0JBQUwsR0FBNEIsQ0FBNUI7QUFDQW5CLE1BQUksQ0FBQ29CLE9BQUwsR0FBZXBCLElBQUksQ0FBQ0UsS0FBTCxDQUFXWSxJQUFYLENBQWdCLG1CQUFoQixDQUFmO0FBQ0FkLE1BQUksQ0FBQ3FCLGFBQUwsR0FBcUJyQixJQUFJLENBQUNFLEtBQUwsQ0FBV1ksSUFBWCxDQUFnQiwwQkFBaEIsQ0FBckIsQ0FmdUQsQ0FpQnZEOztBQUVBZCxNQUFJLENBQUNzQixXQUFMLEdBQW1CLFVBQVNDLE9BQVQsRUFBa0I7QUFDcEMsUUFBSUMsSUFBSSxHQUFHLElBQVg7QUFFQXhCLFFBQUksQ0FBQ1ksS0FBTCxDQUFXYSxJQUFYLENBQWdCLFVBQVNDLFlBQVQsRUFBdUI7QUFDdEMsVUFBSUEsWUFBWSxDQUFDQyxNQUFiLENBQW9CQyxFQUFwQixJQUEwQkwsT0FBOUIsRUFBdUM7QUFDdEMsZUFBTyxLQUFQO0FBQ0E7O0FBRURDLFVBQUksR0FBR0UsWUFBUDtBQUNBLGFBQU8sSUFBUDtBQUNBLEtBUEQ7QUFTQSxXQUFPRixJQUFQO0FBQ0EsR0FiRDs7QUFlQXhCLE1BQUksQ0FBQzZCLFVBQUwsR0FBa0IsVUFBU04sT0FBVCxFQUFrQjtBQUNuQyxXQUFPdkIsSUFBSSxDQUFDc0IsV0FBTCxDQUFpQkMsT0FBakIsSUFBNEIsSUFBNUIsR0FBbUMsS0FBMUM7QUFDQSxHQUZEOztBQUlBdkIsTUFBSSxDQUFDOEIsa0JBQUwsR0FBMEIsVUFBU3JCLE9BQVQsRUFBa0I7QUFDM0MsUUFBSWUsSUFBSSxHQUFHeEIsSUFBSSxDQUFDc0IsV0FBTCxDQUFpQmIsT0FBTyxDQUFDa0IsTUFBUixDQUFlQyxFQUFoQyxDQUFYOztBQUVBLFFBQUlKLElBQUosRUFBVTtBQUNUQSxVQUFJLENBQUNHLE1BQUwsR0FBY2xCLE9BQU8sQ0FBQ2tCLE1BQXRCO0FBQ0FILFVBQUksQ0FBQ08sY0FBTCxHQUFzQixFQUF0QjtBQUNBUCxVQUFJLENBQUNRLE1BQUw7QUFDQVIsVUFBSSxDQUFDUyxLQUFMO0FBQ0EsYUFBT1QsSUFBUDtBQUNBOztBQUVELFdBQU8sSUFBSTNCLFNBQVMsQ0FBQ0MsU0FBVixDQUFvQm9DLFFBQXhCLENBQWlDekIsT0FBakMsRUFBMENULElBQTFDLEVBQWdEVSxLQUFoRCxDQUFQO0FBQ0EsR0FaRDs7QUFjQVYsTUFBSSxDQUFDbUMsVUFBTCxHQUFrQixZQUFXO0FBQzVCbkMsUUFBSSxDQUFDWSxLQUFMLENBQVd3QixPQUFYLENBQW1CLFVBQVNaLElBQVQsRUFBZTtBQUNqQ0EsVUFBSSxDQUFDdEIsS0FBTCxDQUFXbUMsTUFBWDtBQUNBLEtBRkQ7QUFJQXJDLFFBQUksQ0FBQ1ksS0FBTCxHQUFhLEVBQWI7QUFDQVosUUFBSSxDQUFDaUIsaUJBQUwsQ0FBdUJxQixRQUF2QixDQUFnQyxRQUFoQztBQUNBdEMsUUFBSSxDQUFDbUIsb0JBQUwsR0FBNEIsQ0FBNUI7QUFDQSxHQVJEOztBQVVBbkIsTUFBSSxDQUFDdUMsVUFBTCxHQUFrQixZQUFXO0FBQzVCQyxXQUFPLENBQUNDLEdBQVIsQ0FBWSxhQUFaLEVBQTJCLEdBQTNCLEVBQWdDLHdCQUFoQyxFQUEwRDtBQUN6RGxDLFdBQUssRUFBRVAsSUFBSSxDQUFDTyxLQUQ2QztBQUV6RG1DLDJCQUFxQixFQUFFMUMsSUFBSSxDQUFDWSxLQUFMLENBQVcsQ0FBWCxJQUFnQlosSUFBSSxDQUFDWSxLQUFMLENBQVcsQ0FBWCxFQUFjZSxNQUFkLENBQXFCZ0IsZUFBckMsR0FBdUQsQ0FGckI7QUFHekRDLFdBQUssRUFBRTVDLElBQUksQ0FBQ2tCLGNBSDZDO0FBS3pEMkIsWUFBTSxFQUFFO0FBQ1BDLGFBQUssRUFBRTlDLElBQUksQ0FBQ3FCLGFBQUwsQ0FBbUIwQixHQUFuQixHQUF5QkMsSUFBekI7QUFEQTtBQUxpRCxLQUExRDtBQVVBQyxZQUFRLENBQUNDLElBQVQsQ0FBYyxzQkFBZCxFQUFzQztBQUNyQzNDLFdBQUssRUFBRVAsSUFBSSxDQUFDTyxLQUR5QjtBQUVyQ21DLDJCQUFxQixFQUFFMUMsSUFBSSxDQUFDWSxLQUFMLENBQVcsQ0FBWCxJQUFnQlosSUFBSSxDQUFDWSxLQUFMLENBQVcsQ0FBWCxFQUFjZSxNQUFkLENBQXFCZ0IsZUFBckMsR0FBdUQsQ0FGekM7QUFHckNDLFdBQUssRUFBRTVDLElBQUksQ0FBQ2tCLGNBSHlCO0FBS3JDMkIsWUFBTSxFQUFFO0FBQ1BDLGFBQUssRUFBRTlDLElBQUksQ0FBQ3FCLGFBQUwsQ0FBbUIwQixHQUFuQixHQUF5QkMsSUFBekI7QUFEQTtBQUw2QixLQUF0QztBQVNBLEdBcEJELENBOUR1RCxDQW9GdkQ7OztBQUVBaEQsTUFBSSxDQUFDbUQsU0FBTCxHQUFpQixVQUFTQyxNQUFULEVBQWlCO0FBQ2pDLFFBQUlBLE1BQU0sS0FBS0MsU0FBZixFQUEwQjtBQUN6QixhQUFPckQsSUFBSSxDQUFDYSxNQUFMLENBQVlzQyxTQUFaLENBQXNCQyxNQUF0QixDQUFQO0FBQ0E7O0FBRUQsV0FBT3BELElBQUksQ0FBQ2EsTUFBTCxDQUFZc0MsU0FBWixFQUFQO0FBQ0EsR0FORDs7QUFRQW5ELE1BQUksQ0FBQ3NELFlBQUwsR0FBb0IsVUFBU0YsTUFBVCxFQUFpQjtBQUNwQyxRQUFJQSxNQUFNLEtBQUtDLFNBQWYsRUFBMEI7QUFDekIsYUFBT3JELElBQUksQ0FBQ21ELFNBQUwsQ0FBZW5ELElBQUksQ0FBQ2EsTUFBTCxDQUFZLENBQVosRUFBZTBDLFlBQWYsSUFBK0JILE1BQU0sR0FBR3BELElBQUksQ0FBQ2EsTUFBTCxDQUFZMkMsV0FBWixFQUF4QyxDQUFmLENBQVA7QUFDQTs7QUFFRCxXQUFPeEQsSUFBSSxDQUFDYSxNQUFMLENBQVksQ0FBWixFQUFlMEMsWUFBZixJQUErQnZELElBQUksQ0FBQ2EsTUFBTCxDQUFZc0MsU0FBWixLQUEwQm5ELElBQUksQ0FBQ2EsTUFBTCxDQUFZMkMsV0FBWixFQUF6RCxDQUFQO0FBQ0EsR0FORCxDQTlGdUQsQ0FzR3ZEOzs7QUFFQXhELE1BQUksQ0FBQ2lCLGlCQUFMLENBQXVCd0MsS0FBdkIsQ0FBNkIsVUFBU0MsS0FBVCxFQUFnQjtBQUM1Q0EsU0FBSyxDQUFDQyxjQUFOOztBQUVBLFFBQUkzRCxJQUFJLENBQUNpQixpQkFBTCxDQUF1QjJDLFFBQXZCLENBQWdDLFlBQWhDLENBQUosRUFBbUQ7QUFDbEQ7QUFDQTs7QUFFRDVELFFBQUksQ0FBQ2lCLGlCQUFMLENBQXVCcUIsUUFBdkIsQ0FBZ0MscUJBQWhDO0FBRUFXLFlBQVEsQ0FBQ0MsSUFBVCxDQUFjLHFCQUFkLEVBQXFDO0FBQ3BDM0MsV0FBSyxFQUFFUCxJQUFJLENBQUNPLEtBRHdCO0FBRXBDc0QsNEJBQXNCLEVBQUU3RCxJQUFJLENBQUNZLEtBQUwsQ0FBV1osSUFBSSxDQUFDWSxLQUFMLENBQVdrRCxNQUFYLEdBQW9CLENBQS9CLEVBQWtDbkMsTUFBbEMsQ0FBeUNnQixlQUY3QjtBQUdwQ0MsV0FBSyxFQUFFNUMsSUFBSSxDQUFDa0IsY0FId0I7QUFLcEMyQixZQUFNLEVBQUU7QUFDUEMsYUFBSyxFQUFFOUMsSUFBSSxDQUFDcUIsYUFBTCxDQUFtQjBCLEdBQW5CLEdBQXlCQyxJQUF6QjtBQURBO0FBTDRCLEtBQXJDO0FBU0EsR0FsQkQ7QUFvQkFoRCxNQUFJLENBQUNhLE1BQUwsQ0FBWWtELE1BQVosQ0FBbUIsWUFBVztBQUM3QixRQUFJL0QsSUFBSSxDQUFDbUIsb0JBQUwsR0FBNEIsQ0FBNUIsSUFBaUNuQixJQUFJLENBQUNzRCxZQUFMLEtBQXNCLEdBQTNELEVBQWdFO0FBQy9EdEQsVUFBSSxDQUFDaUIsaUJBQUwsQ0FBdUJ3QyxLQUF2QjtBQUNBO0FBQ0QsR0FKRDtBQU1BekQsTUFBSSxDQUFDcUIsYUFBTCxDQUFtQjJDLEVBQW5CLENBQXNCLE9BQXRCLEVBQStCLFlBQVc7QUFDekMsUUFBSUMsY0FBYyxHQUFHOUQsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRNEMsR0FBUixFQUFyQjtBQUNBLFFBQUltQixXQUFXLEdBQUcvRCxDQUFDLENBQUMsSUFBRCxDQUFELENBQVE0QyxHQUFSLEdBQWNvQixPQUFkLENBQXNCLFVBQXRCLEVBQWtDLEVBQWxDLENBQWxCO0FBQ0NGLGtCQUFjLElBQUlDLFdBQW5CLElBQW1DL0QsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRNEMsR0FBUixDQUFZbUIsV0FBWixDQUFuQztBQUNBRSxnQkFBWSxDQUFDcEUsSUFBSSxDQUFDcUUsY0FBTixDQUFaO0FBRUFyRSxRQUFJLENBQUNxRSxjQUFMLEdBQXNCQyxVQUFVLENBQUMsWUFBVztBQUMzQ3RFLFVBQUksQ0FBQ21DLFVBQUw7QUFDQW5DLFVBQUksQ0FBQ2UsU0FBTCxDQUFldUIsUUFBZixDQUF3QixRQUF4QjtBQUNBdEMsVUFBSSxDQUFDZ0IsT0FBTCxDQUFhdUQsV0FBYixDQUF5QixRQUF6QjtBQUNBdkUsVUFBSSxDQUFDdUMsVUFBTDtBQUNBLEtBTCtCLEVBSzdCLEdBTDZCLENBQWhDO0FBTUEsR0FaRCxFQWxJdUQsQ0FnSnZEOztBQUVBVSxVQUFRLENBQUN1QixVQUFULENBQW9CLFlBQVc7QUFDOUJoQyxXQUFPLENBQUNDLEdBQVIsQ0FBWSxhQUFaLEVBQTJCLGNBQTNCO0FBQ0F6QyxRQUFJLENBQUN1QyxVQUFMO0FBQ0EsR0FIRDtBQUtBVSxVQUFRLENBQUNlLEVBQVQsQ0FBWSxzQkFBWixFQUFvQyxVQUFTUyxJQUFULEVBQWU7QUFDbERqQyxXQUFPLENBQUNDLEdBQVIsQ0FBWSxhQUFaLEVBQTJCLEdBQTNCLEVBQWdDLHdCQUFoQyxFQUEwRGdDLElBQTFEO0FBQ0F6RSxRQUFJLENBQUNnQixPQUFMLENBQWFzQixRQUFiLENBQXNCLFFBQXRCO0FBQ0FFLFdBQU8sQ0FBQ0MsR0FBUixDQUFZZ0MsSUFBWjtBQUVBQSxRQUFJLENBQUNDLEtBQUwsQ0FBV3RDLE9BQVgsQ0FBbUIsVUFBU3VDLElBQVQsRUFBZTtBQUNqQzNFLFVBQUksQ0FBQzhCLGtCQUFMLENBQXdCO0FBQ3ZCSCxjQUFNLEVBQUVnRDtBQURlLE9BQXhCO0FBR0EsS0FKRDtBQU1BM0UsUUFBSSxDQUFDbUIsb0JBQUwsR0FBNEJzRCxJQUFJLENBQUN0RCxvQkFBakM7QUFDQW5CLFFBQUksQ0FBQ2lCLGlCQUFMLENBQXVCMkQsV0FBdkIsQ0FBbUMsUUFBbkMsRUFBNkM1RSxJQUFJLENBQUNtQixvQkFBTCxJQUE2QixDQUExRTtBQUNBLEtBQUNuQixJQUFJLENBQUNXLGNBQU4sSUFBd0JYLElBQUksQ0FBQ29CLE9BQUwsQ0FBYXdELFdBQWIsQ0FBeUIsUUFBekIsRUFBbUM1RSxJQUFJLENBQUNZLEtBQUwsQ0FBV2tELE1BQVgsSUFBcUIsQ0FBeEQsQ0FBeEI7QUFDQTlELFFBQUksQ0FBQ2EsTUFBTCxDQUFZK0QsV0FBWixDQUF3QixRQUF4QixFQUFrQzVFLElBQUksQ0FBQ1ksS0FBTCxDQUFXa0QsTUFBWCxJQUFxQixDQUF2RDtBQUNBOUQsUUFBSSxDQUFDZSxTQUFMLENBQWU2RCxXQUFmLENBQTJCLFFBQTNCLEVBQXFDNUUsSUFBSSxDQUFDWSxLQUFMLENBQVdrRCxNQUFYLEdBQW9CLENBQXpEO0FBQ0E5RCxRQUFJLENBQUNXLGNBQUwsR0FBc0IsSUFBdEI7QUFDQSxHQWpCRDtBQW1CQXNDLFVBQVEsQ0FBQ2UsRUFBVCxDQUFZLHFCQUFaLEVBQW1DLFVBQVNTLElBQVQsRUFBZTtBQUNqRGpDLFdBQU8sQ0FBQ0MsR0FBUixDQUFZLGFBQVosRUFBMkIsR0FBM0IsRUFBZ0MsdUJBQWhDLEVBQXlEZ0MsSUFBekQ7QUFFQUEsUUFBSSxDQUFDQyxLQUFMLENBQVd0QyxPQUFYLENBQW1CLFVBQVN1QyxJQUFULEVBQWU7QUFDakMzRSxVQUFJLENBQUM4QixrQkFBTCxDQUF3QjtBQUN2QkgsY0FBTSxFQUFFZ0Q7QUFEZSxPQUF4QjtBQUdBLEtBSkQ7QUFNQTNFLFFBQUksQ0FBQ21CLG9CQUFMLEdBQTRCc0QsSUFBSSxDQUFDdEQsb0JBQWpDO0FBQ0FxQixXQUFPLENBQUNDLEdBQVIsQ0FBWSwyQkFBWixFQUF5Q2dDLElBQUksQ0FBQ3RELG9CQUE5QztBQUNBbkIsUUFBSSxDQUFDaUIsaUJBQUwsQ0FBdUJzRCxXQUF2QixDQUFtQyxxQkFBbkM7QUFDQXZFLFFBQUksQ0FBQ2lCLGlCQUFMLENBQXVCMkQsV0FBdkIsQ0FBbUMsUUFBbkMsRUFBNkM1RSxJQUFJLENBQUNtQixvQkFBTCxJQUE2QixDQUExRTtBQUNBLEdBYkQ7QUFlQThCLFVBQVEsQ0FBQ2UsRUFBVCxDQUFZLHNCQUFaLEVBQW9DLFVBQVNTLElBQVQsRUFBZTtBQUNsRCxRQUFJekUsSUFBSSxDQUFDcUIsYUFBTCxDQUFtQjBCLEdBQW5CLEVBQUosRUFBOEI7QUFDN0I7QUFDQTs7QUFFRCxRQUFJL0MsSUFBSSxDQUFDTyxLQUFMLENBQVdDLElBQVgsSUFBbUJSLElBQUksQ0FBQ08sS0FBTCxDQUFXQyxJQUFYLElBQW1CaUUsSUFBSSxDQUFDbEUsS0FBTCxDQUFXQyxJQUFyRCxFQUEyRDtBQUMxRDtBQUNBOztBQUVELFFBQUlSLElBQUksQ0FBQ08sS0FBTCxDQUFXQyxJQUFYLElBQW1CUixJQUFJLENBQUNPLEtBQUwsQ0FBV3FCLEVBQTlCLElBQW9DNUIsSUFBSSxDQUFDTyxLQUFMLENBQVdxQixFQUFYLElBQWlCNkMsSUFBSSxDQUFDbEUsS0FBTCxDQUFXcUIsRUFBcEUsRUFBd0U7QUFDdkU7QUFDQTs7QUFFRFksV0FBTyxDQUFDQyxHQUFSLENBQVksYUFBWixFQUEyQixHQUEzQixFQUFnQyx3QkFBaEMsRUFBMERnQyxJQUExRDtBQUNBLFFBQUlJLFlBQVksR0FBR0osSUFBbkI7QUFDQSxRQUFJRSxJQUFJLEdBQUdFLFlBQVksQ0FBQ0YsSUFBeEI7QUFDQSxXQUFPRSxZQUFZLENBQUNGLElBQXBCO0FBQ0FBLFFBQUksQ0FBQ0csWUFBTCxHQUFvQkQsWUFBcEI7QUFFQSxRQUFJckQsSUFBSSxHQUFHeEIsSUFBSSxDQUFDOEIsa0JBQUwsQ0FBd0I7QUFDbENILFlBQU0sRUFBRWdEO0FBRDBCLEtBQXhCLENBQVg7QUFJQTNFLFFBQUksQ0FBQ29CLE9BQUwsQ0FBYW1ELFdBQWIsQ0FBeUIsUUFBekI7QUFDQXZFLFFBQUksQ0FBQ2EsTUFBTCxDQUFZMEQsV0FBWixDQUF3QixRQUF4QjtBQUNBdkUsUUFBSSxDQUFDZSxTQUFMLENBQWV1QixRQUFmLENBQXdCLFFBQXhCO0FBQ0NxQyxRQUFJLENBQUNHLFlBQUwsQ0FBa0JDLGNBQWxCLElBQW9DQyxJQUFJLENBQUNDLElBQUwsQ0FBVXJELEVBQS9DLElBQXNESixJQUFJLENBQUMwRCxRQUFMLEVBQXREO0FBQ0EsR0EzQkQ7QUE2QkFqQyxVQUFRLENBQUNlLEVBQVQsQ0FBWSx1QkFBWixFQUFxQyxVQUFTUyxJQUFULEVBQWU7QUFDbkQsUUFBSSxDQUFDQSxJQUFJLENBQUNFLElBQU4sSUFBY0YsSUFBSSxDQUFDRSxJQUFMLENBQVVRLHdCQUFWLEtBQXVDOUIsU0FBekQsRUFBb0U7QUFDbkU7QUFDQTs7QUFFRCxRQUFJN0IsSUFBSSxHQUFHeEIsSUFBSSxDQUFDc0IsV0FBTCxDQUFpQm1ELElBQUksQ0FBQ1csT0FBdEIsQ0FBWDs7QUFFQSxRQUFJLENBQUM1RCxJQUFMLEVBQVc7QUFDVjtBQUNBOztBQUVEZ0IsV0FBTyxDQUFDQyxHQUFSLENBQVksYUFBWixFQUEyQixHQUEzQixFQUFnQyx5QkFBaEMsRUFBMkRnQyxJQUEzRDtBQUNBakQsUUFBSSxDQUFDRyxNQUFMLENBQVl3RCx3QkFBWixHQUF1Q1YsSUFBSSxDQUFDRSxJQUFMLENBQVVRLHdCQUFqRDtBQUNBM0QsUUFBSSxDQUFDUSxNQUFMO0FBQ0EsR0FkRDtBQWdCQWlCLFVBQVEsQ0FBQ2UsRUFBVCxDQUFZLHFCQUFaLEVBQW1DLFVBQVNTLElBQVQsRUFBZTtBQUNqRCxRQUFJakQsSUFBSSxHQUFHeEIsSUFBSSxDQUFDc0IsV0FBTCxDQUFpQm1ELElBQUksQ0FBQ1csT0FBdEIsQ0FBWDs7QUFFQSxRQUFJLENBQUM1RCxJQUFJLENBQUNHLE1BQU4sSUFBZ0JILElBQUksQ0FBQ0csTUFBTCxDQUFZQyxFQUFaLElBQWtCNkMsSUFBSSxDQUFDVyxPQUEzQyxFQUFvRDtBQUNuRDtBQUNBOztBQUVENUMsV0FBTyxDQUFDQyxHQUFSLENBQVksYUFBWixFQUEyQixHQUEzQixFQUFnQyxxQkFBaEMsRUFBdURnQyxJQUF2RDtBQUNBakQsUUFBSSxDQUFDNkQsZUFBTCxDQUFxQlosSUFBSSxDQUFDYSxNQUExQjtBQUNBOUQsUUFBSSxDQUFDUSxNQUFMO0FBQ0EsR0FWRCxFQXRPdUQsQ0FrUHZEOztBQUVBaEMsTUFBSSxDQUFDdUYsZUFBTCxHQUF1QkMsV0FBVyxDQUFDLFlBQVc7QUFDN0N4RixRQUFJLENBQUNZLEtBQUwsQ0FBV3dCLE9BQVgsQ0FBbUIsVUFBU1osSUFBVCxFQUFlO0FBQ2pDLFVBQUlBLElBQUksQ0FBQ08sY0FBTCxDQUFvQitCLE1BQXBCLElBQThCLENBQWxDLEVBQXFDO0FBQ3BDO0FBQ0E7O0FBRUQsVUFBSS9CLGNBQWMsR0FBR1AsSUFBSSxDQUFDTyxjQUFMLENBQW9CMEQsTUFBcEIsQ0FBMkIsVUFBU0MsYUFBVCxFQUF3QjtBQUN2RSxlQUFPQyxJQUFJLENBQUNDLEdBQUwsS0FBYUYsYUFBYSxDQUFDRyxVQUEzQixJQUF5QyxJQUFoRDtBQUNBLE9BRm9CLENBQXJCOztBQUlBLFVBQUk5RCxjQUFjLENBQUMrQixNQUFmLElBQXlCdEMsSUFBSSxDQUFDTyxjQUFMLENBQW9CK0IsTUFBakQsRUFBeUQ7QUFDeEQ7QUFDQTs7QUFFRHRDLFVBQUksQ0FBQ08sY0FBTCxHQUFzQkEsY0FBdEI7QUFDQVAsVUFBSSxDQUFDUSxNQUFMO0FBQ0EsS0FmRDtBQWdCQSxHQWpCaUMsRUFpQi9CLEdBakIrQixDQUFsQztBQWtCQSxDQXRRRDs7QUF3UUFuQyxTQUFTLENBQUNDLFNBQVYsQ0FBb0JvQyxRQUFwQixHQUErQixVQUFTekIsT0FBVCxFQUFrQnFGLElBQWxCLEVBQXdCcEYsS0FBeEIsRUFBK0I7QUFDN0QsTUFBSVYsSUFBSSxHQUFHLElBQVg7QUFDQUEsTUFBSSxDQUFDMkIsTUFBTCxHQUFjbEIsT0FBTyxDQUFDa0IsTUFBdEI7QUFDQTNCLE1BQUksQ0FBQytCLGNBQUwsR0FBc0IsRUFBdEI7QUFDQS9CLE1BQUksQ0FBQytGLFFBQUwsR0FBZ0IsQ0FBaEI7QUFFQS9GLE1BQUksQ0FBQ0UsS0FBTCxHQUFhQyxDQUFDLENBQUNOLFNBQVMsQ0FBQ21HLFFBQVYsQ0FBbUIsV0FBbkIsRUFBZ0M7QUFDOUN4RSxRQUFJLEVBQUV4QixJQUR3QztBQUU5QzJFLFFBQUksRUFBRTNFLElBQUksQ0FBQzJCO0FBRm1DLEdBQWhDLENBQUQsQ0FBRCxDQUdUOEMsSUFIUyxDQUdKLE1BSEksRUFHSXpFLElBSEosRUFHVWlHLFlBSFYsQ0FHdUJILElBQUksQ0FBQzdFLGlCQUg1QixDQUFiOztBQUtBakIsTUFBSSxDQUFDZ0MsTUFBTCxHQUFjLFlBQVc7QUFDeEIsUUFBSTlCLEtBQUssR0FBR0MsQ0FBQyxDQUFDTixTQUFTLENBQUNtRyxRQUFWLENBQW1CLFdBQW5CLEVBQWdDO0FBQzdDeEUsVUFBSSxFQUFFeEIsSUFEdUM7QUFFN0MyRSxVQUFJLEVBQUUzRSxJQUFJLENBQUMyQjtBQUZrQyxLQUFoQyxDQUFELENBQWI7QUFLQTNCLFFBQUksQ0FBQ0UsS0FBTCxDQUFXWSxJQUFYLENBQWdCLDRCQUFoQixFQUE4Q29GLElBQTlDLENBQW1EaEcsS0FBSyxDQUFDWSxJQUFOLENBQVcsNEJBQVgsRUFBeUNvRixJQUF6QyxFQUFuRDtBQUNBbEcsUUFBSSxDQUFDRSxLQUFMLENBQVdZLElBQVgsQ0FBZ0IscUJBQWhCLEVBQXVDb0YsSUFBdkMsQ0FBNENoRyxLQUFLLENBQUNZLElBQU4sQ0FBVyxxQkFBWCxFQUFrQ29GLElBQWxDLEVBQTVDO0FBQ0FsRyxRQUFJLENBQUNFLEtBQUwsQ0FBV1ksSUFBWCxDQUFnQixrQkFBaEIsRUFBb0NvRixJQUFwQyxDQUF5Q2hHLEtBQUssQ0FBQ1ksSUFBTixDQUFXLGtCQUFYLEVBQStCb0YsSUFBL0IsRUFBekM7QUFDQWxHLFFBQUksQ0FBQ0UsS0FBTCxDQUFXaUcsSUFBWCxDQUFnQixPQUFoQixFQUF5QmpHLEtBQUssQ0FBQ2lHLElBQU4sQ0FBVyxPQUFYLENBQXpCO0FBQ0EsR0FWRDs7QUFZQW5HLE1BQUksQ0FBQ2tGLFFBQUwsR0FBZ0IsWUFBVztBQUMxQmxGLFFBQUksQ0FBQ0UsS0FBTCxDQUFXb0MsUUFBWCxDQUFvQixvQkFBcEI7QUFDQThCLGdCQUFZLENBQUNwRSxJQUFJLENBQUNrRixRQUFMLENBQWNrQixPQUFmLENBQVo7QUFFQXBHLFFBQUksQ0FBQ2tGLFFBQUwsQ0FBY2tCLE9BQWQsR0FBd0I5QixVQUFVLENBQUMsWUFBVztBQUM3Q3RFLFVBQUksQ0FBQ0UsS0FBTCxDQUFXcUUsV0FBWCxDQUF1QixvQkFBdkI7QUFDQSxLQUZpQyxFQUUvQixHQUYrQixDQUFsQztBQUdBLEdBUEQ7O0FBU0F2RSxNQUFJLENBQUNpQyxLQUFMLEdBQWEsWUFBVztBQUN2QixRQUFJb0UsS0FBSyxHQUFHUCxJQUFJLENBQUNsRixLQUFMLENBQVcwRixPQUFYLENBQW1CdEcsSUFBbkIsQ0FBWjtBQUNDcUcsU0FBSyxJQUFJLENBQVYsSUFBZ0JQLElBQUksQ0FBQ2xGLEtBQUwsQ0FBVzJGLE1BQVgsQ0FBa0JULElBQUksQ0FBQ2xGLEtBQUwsQ0FBVzBGLE9BQVgsQ0FBbUJ0RyxJQUFuQixDQUFsQixFQUE0QyxDQUE1QyxDQUFoQjtBQUNBLFFBQUl3RyxTQUFTLEdBQUcsSUFBaEI7QUFFQVYsUUFBSSxDQUFDbEYsS0FBTCxDQUFXYSxJQUFYLENBQWdCLFVBQVNELElBQVQsRUFBZTtBQUM5QixVQUFJeEIsSUFBSSxDQUFDMkIsTUFBTCxDQUFZZ0IsZUFBWixHQUE4Qm5CLElBQUksQ0FBQ0csTUFBTCxDQUFZZ0IsZUFBOUMsRUFBK0Q7QUFDOUQsZUFBTyxLQUFQO0FBQ0E7O0FBRUQ2RCxlQUFTLEdBQUdoRixJQUFaO0FBQ0EsYUFBTyxJQUFQO0FBQ0EsS0FQRDs7QUFTQSxRQUFJZ0YsU0FBSixFQUFlO0FBQ2R4RyxVQUFJLENBQUNFLEtBQUwsQ0FBVytGLFlBQVgsQ0FBd0JPLFNBQVMsQ0FBQ3RHLEtBQWxDO0FBQ0E0RixVQUFJLENBQUNsRixLQUFMLENBQVcyRixNQUFYLENBQWtCVCxJQUFJLENBQUNsRixLQUFMLENBQVcwRixPQUFYLENBQW1CRSxTQUFuQixDQUFsQixFQUFpRCxDQUFqRCxFQUFvRHhHLElBQXBEO0FBQ0EsS0FIRCxNQUdPO0FBQ05BLFVBQUksQ0FBQ0UsS0FBTCxDQUFXK0YsWUFBWCxDQUF3QkgsSUFBSSxDQUFDN0UsaUJBQTdCO0FBQ0E2RSxVQUFJLENBQUNsRixLQUFMLENBQVc2RixJQUFYLENBQWdCekcsSUFBaEI7QUFDQTtBQUNELEdBckJEOztBQXVCQUEsTUFBSSxDQUFDMEcsbUJBQUwsR0FBMkIsVUFBU0MsU0FBVCxFQUFvQjtBQUM5QyxRQUFJQyxtQkFBbUIsR0FBRyxJQUExQjtBQUVBNUcsUUFBSSxDQUFDK0IsY0FBTCxDQUFvQk4sSUFBcEIsQ0FBeUIsVUFBU2lFLGFBQVQsRUFBd0I7QUFDaEQsVUFBSUEsYUFBYSxDQUFDOUQsRUFBZCxJQUFvQitFLFNBQXhCLEVBQW1DO0FBQ2xDLGVBQU8sS0FBUDtBQUNBOztBQUVEQyx5QkFBbUIsR0FBR2xCLGFBQXRCO0FBQ0EsYUFBTyxJQUFQO0FBQ0EsS0FQRDtBQVNBLFdBQU9rQixtQkFBUDtBQUNBLEdBYkQ7O0FBZUE1RyxNQUFJLENBQUNxRixlQUFMLEdBQXVCLFVBQVNDLE1BQVQsRUFBaUI7QUFDdkMsUUFBSXVCLFlBQVksR0FBRzdHLElBQUksQ0FBQzBHLG1CQUFMLENBQXlCcEIsTUFBTSxDQUFDMUQsRUFBaEMsQ0FBbkI7O0FBRUEsUUFBSWlGLFlBQUosRUFBa0I7QUFDakJBLGtCQUFZLENBQUNoQixVQUFiLEdBQTBCRixJQUFJLENBQUNDLEdBQUwsRUFBMUI7QUFDQTtBQUNBOztBQUVETixVQUFNLENBQUNPLFVBQVAsR0FBb0JGLElBQUksQ0FBQ0MsR0FBTCxFQUFwQjtBQUNBNUYsUUFBSSxDQUFDK0IsY0FBTCxDQUFvQjBFLElBQXBCLENBQXlCbkIsTUFBekI7QUFDQXRGLFFBQUksQ0FBQ2dDLE1BQUwsQ0FBWSxTQUFaO0FBQ0EsR0FYRDs7QUFhQWhDLE1BQUksQ0FBQ0UsS0FBTCxDQUFXdUQsS0FBWCxDQUFpQixVQUFTQyxLQUFULEVBQWdCO0FBQ2hDQSxTQUFLLENBQUNDLGNBQU47O0FBRUEsUUFBSTNELElBQUksQ0FBQzJCLE1BQUwsQ0FBWW5CLElBQVosSUFBb0IsUUFBcEIsSUFBZ0NSLElBQUksQ0FBQzJCLE1BQUwsQ0FBWW1GLFVBQVosSUFBMEIsSUFBOUQsRUFBb0U7QUFDbkVDLGNBQVEsQ0FBQ0MsWUFBVCxDQUFzQjtBQUNyQkMsZUFBTyxFQUFFakgsSUFBSSxDQUFDMkIsTUFBTCxDQUFZdUYsZUFBWixDQUE0QkQ7QUFEaEIsT0FBdEI7QUFJQTtBQUNBO0FBQ0QsR0FWRDtBQVlBakgsTUFBSSxDQUFDRSxLQUFMLENBQVc4RCxFQUFYLENBQWMsMERBQWQsRUFBMEUsVUFBU04sS0FBVCxFQUFnQjtBQUN0RkEsU0FBSyxDQUFDQyxjQUFOO0FBQ0FELFNBQUssQ0FBQ3lELGVBQU47QUFDSCxHQUhELEVBR0duRCxFQUhILENBR00sV0FITixFQUdtQixVQUFTTixLQUFULEVBQWdCO0FBQ2xDLE1BQUUxRCxJQUFJLENBQUMrRixRQUFQOztBQUVBLFFBQUkvRixJQUFJLENBQUMrRixRQUFMLEdBQWdCLENBQXBCLEVBQXVCO0FBQ3RCO0FBQ0E7O0FBRUUvRixRQUFJLENBQUNFLEtBQUwsQ0FBV29DLFFBQVgsQ0FBb0IsYUFBcEI7QUFDQXRDLFFBQUksQ0FBQ29ILGNBQUwsQ0FBb0I5RSxRQUFwQixDQUE2QixtQkFBN0I7QUFDSCxHQVpELEVBWUcwQixFQVpILENBWU0sZ0JBWk4sRUFZd0IsWUFBVztBQUNsQyxNQUFFaEUsSUFBSSxDQUFDK0YsUUFBUDs7QUFFQSxRQUFJL0YsSUFBSSxDQUFDK0YsUUFBTCxHQUFnQixDQUFwQixFQUF1QjtBQUN0QjtBQUNBOztBQUVEL0YsUUFBSSxDQUFDRSxLQUFMLENBQVdxRSxXQUFYLENBQXVCLGFBQXZCO0FBQ0F2RSxRQUFJLENBQUNvSCxjQUFMLENBQW9CN0MsV0FBcEIsQ0FBZ0MsbUJBQWhDO0FBQ0EsR0FyQkQsRUFxQkdQLEVBckJILENBcUJNLE1BckJOLEVBcUJjLFVBQVNOLEtBQVQsRUFBZ0IsQ0FDN0I7QUFDQSxHQXZCRDtBQXlCQTFELE1BQUksQ0FBQ2lDLEtBQUw7QUFDQSxDQXpIRDs7QUEySEFwQyxTQUFTLENBQUNDLFNBQVYsQ0FBb0J1SCxZQUFwQixHQUFtQyxVQUFTNUcsT0FBVCxFQUFrQjtBQUNwRCxNQUFJVCxJQUFJLEdBQUcsSUFBWDtBQUNBQSxNQUFJLENBQUMyQixNQUFMLEdBQWNsQixPQUFPLENBQUNrQixNQUF0QjtBQUNBM0IsTUFBSSxDQUFDc0gsTUFBTCxHQUFjN0csT0FBTyxDQUFDNkcsTUFBdEI7QUFDQXRILE1BQUksQ0FBQ0UsS0FBTCxHQUFhQyxDQUFDLENBQUNNLE9BQU8sQ0FBQ0gsSUFBUixJQUFnQixnQkFBakIsQ0FBZDtBQUNBTixNQUFJLENBQUNvSCxjQUFMLEdBQXNCcEgsSUFBSSxDQUFDRSxLQUFMLENBQVdZLElBQVgsQ0FBZ0IsK0JBQWhCLENBQXRCO0FBQ0FkLE1BQUksQ0FBQ3VILFFBQUwsR0FBZ0J2SCxJQUFJLENBQUNFLEtBQUwsQ0FBV1ksSUFBWCxDQUFnQix3QkFBaEIsQ0FBaEI7QUFDQWQsTUFBSSxDQUFDd0gsUUFBTCxHQUFnQnhILElBQUksQ0FBQ0UsS0FBTCxDQUFXWSxJQUFYLENBQWdCLHdCQUFoQixDQUFoQjtBQUNBZCxNQUFJLENBQUNhLE1BQUwsR0FBY2IsSUFBSSxDQUFDRSxLQUFMLENBQVdZLElBQVgsQ0FBZ0IsK0JBQWhCLENBQWQ7QUFDQWQsTUFBSSxDQUFDeUgsd0JBQUwsR0FBZ0N6SCxJQUFJLENBQUNFLEtBQUwsQ0FBV1ksSUFBWCxDQUFnQiw0Q0FBaEIsQ0FBaEM7QUFDQWQsTUFBSSxDQUFDMEgsdUJBQUwsR0FBK0IxSCxJQUFJLENBQUNFLEtBQUwsQ0FBV1ksSUFBWCxDQUFnQiwyQ0FBaEIsQ0FBL0I7QUFDQWQsTUFBSSxDQUFDMkgsZUFBTCxHQUF1QjNILElBQUksQ0FBQ0UsS0FBTCxDQUFXWSxJQUFYLENBQWdCLHFDQUFoQixDQUF2QjtBQUNBZCxNQUFJLENBQUNZLEtBQUwsR0FBYSxFQUFiO0FBQ0FaLE1BQUksQ0FBQzRILEtBQUwsR0FBYTVILElBQUksQ0FBQ0UsS0FBTCxDQUFXWSxJQUFYLENBQWdCLHFCQUFoQixDQUFiO0FBQ0FkLE1BQUksQ0FBQzZILFNBQUwsR0FBaUI3SCxJQUFJLENBQUNFLEtBQUwsQ0FBV1ksSUFBWCxDQUFnQiw0QkFBaEIsQ0FBakI7QUFDQWQsTUFBSSxDQUFDOEgsT0FBTCxHQUFlOUgsSUFBSSxDQUFDRSxLQUFMLENBQVdZLElBQVgsQ0FBZ0IsNkJBQWhCLENBQWY7QUFDQWQsTUFBSSxDQUFDK0gsaUJBQUwsR0FBeUIvSCxJQUFJLENBQUNFLEtBQUwsQ0FBV1ksSUFBWCxDQUFnQixrQ0FBaEIsQ0FBekI7QUFDQWQsTUFBSSxDQUFDZ0ksZ0JBQUwsR0FBd0IsRUFBeEI7QUFDQWhJLE1BQUksQ0FBQ2lJLFlBQUwsR0FBb0IsSUFBcEI7QUFDQWpJLE1BQUksQ0FBQ2tJLG9CQUFMLEdBQTRCLENBQTVCO0FBQ0FsSSxNQUFJLENBQUNrQixjQUFMLEdBQXNCLEVBQXRCO0FBQ0FsQixNQUFJLENBQUMrQixjQUFMLEdBQXNCLEVBQXRCO0FBQ0EvQixNQUFJLENBQUMrRixRQUFMLEdBQWdCLENBQWhCLENBdEJvRCxDQXdCcEQ7O0FBRUEvRixNQUFJLENBQUNzQixXQUFMLEdBQW1CLFVBQVNDLE9BQVQsRUFBa0I7QUFDcEMsUUFBSUMsSUFBSSxHQUFHLElBQVg7QUFFQXhCLFFBQUksQ0FBQ1ksS0FBTCxDQUFXYSxJQUFYLENBQWdCLFVBQVNDLFlBQVQsRUFBdUI7QUFDdEMsVUFBSUEsWUFBWSxDQUFDQyxNQUFiLENBQW9CQyxFQUFwQixJQUEwQkwsT0FBOUIsRUFBdUM7QUFDdEMsZUFBTyxLQUFQO0FBQ0E7O0FBRURDLFVBQUksR0FBR0UsWUFBUDtBQUNBLGFBQU8sSUFBUDtBQUNBLEtBUEQ7QUFTQSxXQUFPRixJQUFQO0FBQ0EsR0FiRDs7QUFlQXhCLE1BQUksQ0FBQ21JLGNBQUwsR0FBc0IsVUFBU0MsVUFBVCxFQUFxQjtBQUMxQyxRQUFJNUcsSUFBSSxHQUFHLElBQVg7QUFFQXhCLFFBQUksQ0FBQ1ksS0FBTCxDQUFXYSxJQUFYLENBQWdCLFVBQVNDLFlBQVQsRUFBdUI7QUFDdEMsVUFBSUEsWUFBWSxDQUFDQyxNQUFiLENBQW9CMEcsS0FBcEIsSUFBNkJELFVBQWpDLEVBQTZDO0FBQzVDLGVBQU8sS0FBUDtBQUNBOztBQUVENUcsVUFBSSxHQUFHRSxZQUFQO0FBQ0EsYUFBTyxJQUFQO0FBQ0EsS0FQRDtBQVNBLFdBQU9GLElBQVA7QUFDQSxHQWJEOztBQWVBeEIsTUFBSSxDQUFDOEIsa0JBQUwsR0FBMEIsVUFBU3JCLE9BQVQsRUFBa0I7QUFDM0MsUUFBSWUsSUFBSSxHQUFHeEIsSUFBSSxDQUFDc0IsV0FBTCxDQUFpQmIsT0FBTyxDQUFDa0IsTUFBUixDQUFlQyxFQUFoQyxDQUFYOztBQUVBLFFBQUksQ0FBQ0osSUFBRCxJQUFTZixPQUFPLENBQUNrQixNQUFSLENBQWUwRyxLQUE1QixFQUFtQztBQUNsQzdHLFVBQUksR0FBR3hCLElBQUksQ0FBQ21JLGNBQUwsQ0FBb0IxSCxPQUFPLENBQUNrQixNQUFSLENBQWUwRyxLQUFuQyxDQUFQO0FBQ0E7O0FBRUQsUUFBSTdHLElBQUosRUFBVTtBQUNUQSxVQUFJLENBQUNHLE1BQUwsR0FBY2xCLE9BQU8sQ0FBQ2tCLE1BQXRCO0FBQ0FILFVBQUksQ0FBQ1EsTUFBTDtBQUNBLGFBQU9SLElBQVA7QUFDQTs7QUFFRCxXQUFPLElBQUkzQixTQUFTLENBQUNDLFNBQVYsQ0FBb0J3SSxXQUF4QixDQUFvQzdILE9BQXBDLEVBQTZDVCxJQUE3QyxDQUFQO0FBQ0EsR0FkRDs7QUFnQkFBLE1BQUksQ0FBQ3VJLGdCQUFMLEdBQXdCLFlBQVc7QUFDbEN2SSxRQUFJLENBQUM2SCxTQUFMLENBQWVXLEdBQWYsQ0FBbUIsUUFBbkIsRUFBNkIsRUFBN0I7QUFDQXhJLFFBQUksQ0FBQzZILFNBQUwsQ0FBZVcsR0FBZixDQUFtQixRQUFuQixFQUE2QnhJLElBQUksQ0FBQzZILFNBQUwsQ0FBZSxDQUFmLEVBQWtCdEUsWUFBbEIsR0FBaUMsSUFBOUQ7QUFDQSxHQUhEOztBQUtBdkQsTUFBSSxDQUFDbUQsU0FBTCxHQUFpQixVQUFTQyxNQUFULEVBQWlCO0FBQ2pDLFFBQUlBLE1BQU0sS0FBS0MsU0FBZixFQUEwQjtBQUN6QixhQUFPckQsSUFBSSxDQUFDd0gsUUFBTCxDQUFjckUsU0FBZCxDQUF3QkMsTUFBeEIsQ0FBUDtBQUNBOztBQUVELFdBQU9wRCxJQUFJLENBQUN3SCxRQUFMLENBQWNyRSxTQUFkLEVBQVA7QUFDQSxHQU5EOztBQVFBbkQsTUFBSSxDQUFDc0QsWUFBTCxHQUFvQixVQUFTRixNQUFULEVBQWlCO0FBQ3BDLFFBQUlBLE1BQU0sS0FBS0MsU0FBZixFQUEwQjtBQUN6QixhQUFPckQsSUFBSSxDQUFDbUQsU0FBTCxDQUFlbkQsSUFBSSxDQUFDd0gsUUFBTCxDQUFjLENBQWQsRUFBaUJqRSxZQUFqQixJQUFpQ0gsTUFBTSxHQUFHcEQsSUFBSSxDQUFDd0gsUUFBTCxDQUFjaEUsV0FBZCxFQUExQyxDQUFmLENBQVA7QUFDQTs7QUFFRCxXQUFPeEQsSUFBSSxDQUFDd0gsUUFBTCxDQUFjLENBQWQsRUFBaUJqRSxZQUFqQixJQUFpQ3ZELElBQUksQ0FBQ3dILFFBQUwsQ0FBY3JFLFNBQWQsS0FBNEJuRCxJQUFJLENBQUN3SCxRQUFMLENBQWNoRSxXQUFkLEVBQTdELENBQVA7QUFDQSxHQU5EOztBQVFBeEQsTUFBSSxDQUFDeUksZ0JBQUwsR0FBd0IsWUFBVztBQUNsQyxXQUFPekksSUFBSSxDQUFDc0QsWUFBTCxNQUF1QixFQUE5QjtBQUNBLEdBRkQ7O0FBSUF0RCxNQUFJLENBQUMwSSxLQUFMLEdBQWEsWUFBVztBQUN2QjFJLFFBQUksQ0FBQzZILFNBQUwsQ0FBZWEsS0FBZjtBQUNBLEdBRkQ7O0FBSUExSSxNQUFJLENBQUMySSxRQUFMLEdBQWdCLFVBQVNwSCxPQUFULEVBQWtCO0FBQ2pDLFFBQUlDLElBQUksR0FBR3hCLElBQUksQ0FBQ3NCLFdBQUwsQ0FBaUJDLE9BQWpCLENBQVg7O0FBRUEsUUFBSSxDQUFDQyxJQUFMLEVBQVc7QUFDVjtBQUNBOztBQUVEeEIsUUFBSSxDQUFDbUQsU0FBTCxDQUFlM0IsSUFBSSxDQUFDdEIsS0FBTCxDQUFXMEksTUFBWCxHQUFvQkMsR0FBcEIsR0FBMEI3SSxJQUFJLENBQUNhLE1BQUwsQ0FBWStILE1BQVosR0FBcUJDLEdBQTlEO0FBQ0EsR0FSRDs7QUFVQTdJLE1BQUksQ0FBQzhJLGtCQUFMLEdBQTBCLFlBQVc7QUFDcEMsUUFBSUMsVUFBVSxHQUFHLElBQWpCO0FBRUEvSSxRQUFJLENBQUNZLEtBQUwsQ0FBV2EsSUFBWCxDQUFnQixVQUFTRCxJQUFULEVBQWU7QUFDOUIsVUFBSUEsSUFBSSxDQUFDRyxNQUFMLENBQVlxSCxPQUFoQixFQUF5QjtBQUN4QixlQUFPLEtBQVA7QUFDQTs7QUFFREQsZ0JBQVUsR0FBR3ZILElBQWI7QUFDQSxhQUFPLElBQVA7QUFDQSxLQVBEO0FBU0EsV0FBT3VILFVBQVA7QUFDQSxHQWJEOztBQWVBL0ksTUFBSSxDQUFDaUosbUJBQUwsR0FBMkIsWUFBVztBQUNyQyxRQUFJQyxpQkFBaUIsR0FBR2xKLElBQUksQ0FBQzhJLGtCQUFMLEVBQXhCOztBQUVBLFFBQUksQ0FBQ0ksaUJBQUwsRUFBd0I7QUFDdkIsYUFBTyxLQUFQO0FBQ0E7O0FBRURsSixRQUFJLENBQUMySSxRQUFMLENBQWNPLGlCQUFpQixDQUFDdkgsTUFBbEIsQ0FBeUJDLEVBQXZDO0FBQ0EsV0FBTyxJQUFQO0FBQ0EsR0FURDs7QUFXQTVCLE1BQUksQ0FBQ21KLGVBQUwsR0FBdUIsWUFBVztBQUNqQyxXQUFPbkosSUFBSSxDQUFDWSxLQUFMLENBQVc2RSxNQUFYLENBQWtCLFVBQVNqRSxJQUFULEVBQWU7QUFDdkMsYUFBT0EsSUFBSSxDQUFDNEgsVUFBWjtBQUNBLEtBRk0sQ0FBUDtBQUdBLEdBSkQ7O0FBTUFwSixNQUFJLENBQUNxSixJQUFMLEdBQVksWUFBVztBQUN0QixRQUFJckosSUFBSSxDQUFDaUksWUFBVCxFQUF1QjtBQUN0QjtBQUNBOztBQUVELFFBQUlxQixhQUFhLEdBQUd0SixJQUFJLENBQUNtSixlQUFMLEVBQXBCOztBQUVBLFFBQUlHLGFBQWEsQ0FBQ3hGLE1BQWQsSUFBd0IsQ0FBNUIsRUFBK0I7QUFDOUI7QUFDQTs7QUFFRDlELFFBQUksQ0FBQ2lJLFlBQUwsR0FBb0JxQixhQUFhLENBQUMsQ0FBRCxDQUFqQztBQUVBLFdBQVEsVUFBU0MsUUFBVCxFQUFtQjtBQUMxQixVQUFJLENBQUN2SixJQUFJLENBQUMyQixNQUFWLEVBQWtCO0FBQ2pCLGVBQU8zQixJQUFJLENBQUNzSCxNQUFMLENBQVk7QUFDbEJlLGVBQUssRUFBRXJJLElBQUksQ0FBQ2lJLFlBQUwsQ0FBa0J0RyxNQUFsQixDQUF5QjBHLEtBRGQ7QUFFbEJtQixjQUFJLEVBQUV4SixJQUFJLENBQUNpSSxZQUFMLENBQWtCdEcsTUFBbEIsQ0FBeUI2SDtBQUZiLFNBQVosRUFHSkQsUUFISSxDQUFQO0FBSUE7O0FBRUQsYUFBT0UsT0FBTyxDQUFDO0FBQ2RDLGNBQU0sRUFBRSxNQURNO0FBRWRDLFdBQUcsRUFBRSxZQUFZM0osSUFBSSxDQUFDMkIsTUFBTCxDQUFZQyxFQUF4QixHQUE2QixrQkFGcEI7QUFJZDZDLFlBQUksRUFBRTtBQUNMSSxzQkFBWSxFQUFFO0FBQ2J3RCxpQkFBSyxFQUFFckksSUFBSSxDQUFDaUksWUFBTCxDQUFrQnRHLE1BQWxCLENBQXlCMEcsS0FEbkI7QUFFYm1CLGdCQUFJLEVBQUV4SixJQUFJLENBQUNpSSxZQUFMLENBQWtCdEcsTUFBbEIsQ0FBeUI2SDtBQUZsQjtBQURUO0FBSlEsT0FBRCxFQVVYRCxRQVZXLENBQWQ7QUFXQSxLQW5CTSxDQW1CSixVQUFTSyxRQUFULEVBQW1CO0FBQ3JCLFVBQUlBLFFBQVEsQ0FBQ0MsS0FBYixFQUFvQjtBQUNuQixlQUFPdkYsVUFBVSxDQUFDLFlBQVc7QUFDNUJ0RSxjQUFJLENBQUNpSSxZQUFMLEdBQW9CLElBQXBCO0FBQ0FqSSxjQUFJLENBQUNxSixJQUFMO0FBQ0EsU0FIZ0IsRUFHZCxJQUhjLENBQWpCO0FBSUE7O0FBRURySixVQUFJLENBQUMyQixNQUFMLEdBQWNpSSxRQUFRLENBQUNuRixJQUFULENBQWNFLElBQTVCO0FBQ0EsYUFBT2lGLFFBQVEsQ0FBQ25GLElBQVQsQ0FBY0UsSUFBckI7QUFDQTNFLFVBQUksQ0FBQ2lJLFlBQUwsQ0FBa0J0RyxNQUFsQixHQUEyQmlJLFFBQVEsQ0FBQ25GLElBQXBDO0FBQ0F6RSxVQUFJLENBQUNpSSxZQUFMLENBQWtCbUIsVUFBbEIsR0FBK0IsS0FBL0I7QUFDQXBKLFVBQUksQ0FBQ2lJLFlBQUwsQ0FBa0JqRyxNQUFsQjtBQUNBaEMsVUFBSSxDQUFDaUksWUFBTCxDQUFrQmhHLEtBQWxCO0FBQ0FqQyxVQUFJLENBQUNpSSxZQUFMLEdBQW9CLElBQXBCLENBZHFCLENBZXJCOztBQUNBakksVUFBSSxDQUFDcUosSUFBTDtBQUNBLEtBcENNLENBQVA7QUFxQ0EsR0FsREQ7O0FBb0RBckosTUFBSSxDQUFDOEosYUFBTCxHQUFxQixZQUFXO0FBQy9CLFFBQUlDLGtCQUFrQixHQUFHL0osSUFBSSxDQUFDd0gsUUFBTCxDQUFjckUsU0FBZCxFQUF6QjtBQUNBLFFBQUk2RyxjQUFjLEdBQUdoSyxJQUFJLENBQUN3SCxRQUFMLENBQWNoRSxXQUFkLEVBQXJCO0FBQ0EsUUFBSXlHLGdCQUFnQixHQUFHakssSUFBSSxDQUFDYSxNQUFMLENBQVkrSCxNQUFaLEdBQXFCQyxHQUE1QztBQUVBLFdBQU83SSxJQUFJLENBQUNZLEtBQUwsQ0FBVzZFLE1BQVgsQ0FBa0IsVUFBU2pFLElBQVQsRUFBZTtBQUN2QyxVQUFJMEksYUFBYSxHQUFHMUksSUFBSSxDQUFDdEIsS0FBTCxDQUFXMEksTUFBWCxHQUFvQkMsR0FBcEIsR0FBMEJvQixnQkFBOUM7QUFDQSxVQUFJRSxXQUFXLEdBQUczSSxJQUFJLENBQUN0QixLQUFMLENBQVdrRCxNQUFYLEVBQWxCO0FBQ0EsYUFBUThHLGFBQWEsSUFBSUgsa0JBQWpCLElBQXVDRyxhQUFhLEdBQUdDLFdBQWhCLElBQStCSixrQkFBa0IsR0FBR0MsY0FBbkc7QUFDQSxLQUpNLENBQVA7QUFLQSxHQVZEOztBQVlBaEssTUFBSSxDQUFDb0ssZ0JBQUwsR0FBd0IsWUFBVztBQUNsQ3BLLFFBQUksQ0FBQ1ksS0FBTCxDQUFXNkUsTUFBWCxDQUFrQixVQUFTakUsSUFBVCxFQUFlO0FBQ2hDLGFBQU8sQ0FBQ0EsSUFBSSxDQUFDRyxNQUFMLENBQVlxSCxPQUFwQjtBQUNBLEtBRkQsRUFFRzVHLE9BRkgsQ0FFVyxVQUFTWixJQUFULEVBQWU7QUFDekJBLFVBQUksQ0FBQ0csTUFBTCxDQUFZcUgsT0FBWixHQUFzQixJQUF0QjtBQUNBeEgsVUFBSSxDQUFDUSxNQUFMO0FBQ0EsS0FMRDtBQU1BLEdBUEQ7O0FBU0FoQyxNQUFJLENBQUNtQyxVQUFMLEdBQWtCLFlBQVc7QUFDNUJuQyxRQUFJLENBQUNZLEtBQUwsQ0FBV3dCLE9BQVgsQ0FBbUIsVUFBU1osSUFBVCxFQUFlO0FBQ2pDQSxVQUFJLENBQUN0QixLQUFMLENBQVdtQyxNQUFYO0FBQ0EsS0FGRDtBQUlBckMsUUFBSSxDQUFDWSxLQUFMLEdBQWEsRUFBYjtBQUNBWixRQUFJLENBQUN5SCx3QkFBTCxDQUE4Qm5GLFFBQTlCLENBQXVDLFFBQXZDO0FBQ0F0QyxRQUFJLENBQUMwSCx1QkFBTCxDQUE2QnBGLFFBQTdCLENBQXNDLFFBQXRDO0FBQ0F0QyxRQUFJLENBQUMyQixNQUFMLENBQVkwSSx3QkFBWixHQUF1QyxDQUF2QztBQUNBckssUUFBSSxDQUFDMkIsTUFBTCxDQUFZMkksdUJBQVosR0FBc0MsQ0FBdEM7QUFDQSxHQVZEOztBQVlBdEssTUFBSSxDQUFDdUsseUJBQUwsR0FBaUMsVUFBU0Msb0JBQVQsRUFBK0I7QUFDL0R4SyxRQUFJLENBQUNZLEtBQUwsQ0FBV3dCLE9BQVgsQ0FBbUIsVUFBU1osSUFBVCxFQUFlO0FBQ2pDLFVBQUlpSixpQkFBaUIsR0FBR2pKLElBQUksQ0FBQ0csTUFBTCxDQUFZOEksaUJBQVosQ0FBOEJoRixNQUE5QixDQUFxQyxVQUFTaUYsZ0JBQVQsRUFBMkI7QUFDdkYsZUFBT0Ysb0JBQW9CLENBQUNsRSxPQUFyQixDQUE2Qm9FLGdCQUFnQixDQUFDOUksRUFBOUMsSUFBb0QsQ0FBQyxDQUE1RDtBQUNBLE9BRnVCLENBQXhCOztBQUlBLFVBQUk2SSxpQkFBaUIsQ0FBQzNHLE1BQWxCLElBQTRCdEMsSUFBSSxDQUFDRyxNQUFMLENBQVk4SSxpQkFBWixDQUE4QjNHLE1BQTlELEVBQXNFO0FBQ3JFO0FBQ0E7O0FBRUR0QyxVQUFJLENBQUNHLE1BQUwsQ0FBWThJLGlCQUFaLEdBQWdDQSxpQkFBaEM7QUFDQWpKLFVBQUksQ0FBQ1EsTUFBTDtBQUNBLEtBWEQ7QUFZQSxHQWJEOztBQWVBaEMsTUFBSSxDQUFDMEcsbUJBQUwsR0FBMkIsVUFBU0MsU0FBVCxFQUFvQjtBQUM5QyxRQUFJQyxtQkFBbUIsR0FBRyxJQUExQjtBQUVBNUcsUUFBSSxDQUFDK0IsY0FBTCxDQUFvQk4sSUFBcEIsQ0FBeUIsVUFBU2lFLGFBQVQsRUFBd0I7QUFDaEQsVUFBSUEsYUFBYSxDQUFDOUQsRUFBZCxJQUFvQitFLFNBQXhCLEVBQW1DO0FBQ2xDLGVBQU8sS0FBUDtBQUNBOztBQUVEQyx5QkFBbUIsR0FBR2xCLGFBQXRCO0FBQ0EsYUFBTyxJQUFQO0FBQ0EsS0FQRDtBQVNBLFdBQU9rQixtQkFBUDtBQUNBLEdBYkQ7O0FBZUE1RyxNQUFJLENBQUNxRixlQUFMLEdBQXVCLFVBQVNDLE1BQVQsRUFBaUI7QUFDdkMsUUFBSXVCLFlBQVksR0FBRzdHLElBQUksQ0FBQzBHLG1CQUFMLENBQXlCcEIsTUFBTSxDQUFDMUQsRUFBaEMsQ0FBbkI7O0FBRUEsUUFBSWlGLFlBQUosRUFBa0I7QUFDakJBLGtCQUFZLENBQUNoQixVQUFiLEdBQTBCRixJQUFJLENBQUNDLEdBQUwsRUFBMUI7QUFDQTtBQUNBOztBQUVETixVQUFNLENBQUNPLFVBQVAsR0FBb0JGLElBQUksQ0FBQ0MsR0FBTCxFQUFwQjtBQUNBNUYsUUFBSSxDQUFDK0IsY0FBTCxDQUFvQjBFLElBQXBCLENBQXlCbkIsTUFBekI7QUFDQXRGLFFBQUksQ0FBQzJLLG1CQUFMO0FBQ0EsR0FYRDs7QUFhQTNLLE1BQUksQ0FBQzJLLG1CQUFMLEdBQTJCLFlBQVc7QUFDckMzSyxRQUFJLENBQUMySCxlQUFMLENBQXFCekIsSUFBckIsQ0FBMEIsRUFBMUI7QUFFQWxHLFFBQUksQ0FBQytCLGNBQUwsQ0FBb0JLLE9BQXBCLENBQTRCLFVBQVNzRCxhQUFULEVBQXdCO0FBQ25ELFVBQUlrRixNQUFNLEdBQUd6SyxDQUFDLENBQUMsU0FBRCxDQUFkO0FBQ0F5SyxZQUFNLENBQUN6RSxJQUFQLENBQVksS0FBWixFQUFtQlQsYUFBYSxDQUFDVCxJQUFkLENBQW1CNEYsS0FBbkIsQ0FBeUJDLElBQXpCLENBQThCQyxJQUFqRDtBQUNBSCxZQUFNLENBQUN6RSxJQUFQLENBQVksT0FBWixFQUFxQlQsYUFBYSxDQUFDVCxJQUFkLENBQW1CK0YsS0FBeEM7QUFDQUosWUFBTSxDQUFDSyxRQUFQLENBQWdCakwsSUFBSSxDQUFDMkgsZUFBckI7QUFDQSxLQUxEO0FBT0EzSCxRQUFJLENBQUMySCxlQUFMLENBQXFCL0MsV0FBckIsQ0FBaUMsVUFBakMsRUFBNkM1RSxJQUFJLENBQUMrQixjQUFMLENBQW9CK0IsTUFBcEIsR0FBNkIsQ0FBMUU7QUFDQSxHQVhEOztBQWFBOUQsTUFBSSxDQUFDa0wscUJBQUwsR0FBNkIsWUFBVztBQUN2QyxRQUFJQyxXQUFXLEdBQUduTCxJQUFJLENBQUM4SixhQUFMLEVBQWxCOztBQUVBLFFBQUlxQixXQUFXLENBQUNySCxNQUFaLElBQXNCLENBQTFCLEVBQTZCO0FBQzVCO0FBQ0E7O0FBRUQsUUFBSXNILGVBQWUsR0FBR0QsV0FBVyxDQUFDQSxXQUFXLENBQUNySCxNQUFaLEdBQXFCLENBQXRCLENBQWpDOztBQUVBLFFBQUlzSCxlQUFlLENBQUN6SixNQUFoQixDQUF1QkMsRUFBdkIsR0FBNEI1QixJQUFJLENBQUMyQixNQUFMLENBQVkwSixvQkFBNUMsRUFBa0U7QUFDakU3SSxhQUFPLENBQUNDLEdBQVIsQ0FBWSxhQUFaLEVBQTJCLEdBQTNCLEVBQWdDLHVCQUFoQyxFQUF5RDtBQUN4RGIsVUFBRSxFQUFFNUIsSUFBSSxDQUFDMkIsTUFBTCxDQUFZQyxFQUR3QztBQUV4RDBKLGtCQUFVLEVBQUVGLGVBQWUsQ0FBQ3pKLE1BQWhCLENBQXVCQztBQUZxQixPQUF6RDtBQUtBcUIsY0FBUSxDQUFDQyxJQUFULENBQWMsdUJBQWQsRUFBdUM7QUFDdEN0QixVQUFFLEVBQUU1QixJQUFJLENBQUMyQixNQUFMLENBQVlDLEVBRHNCO0FBRXRDMEosa0JBQVUsRUFBRUYsZUFBZSxDQUFDekosTUFBaEIsQ0FBdUJDO0FBRkcsT0FBdkM7QUFLQTVCLFVBQUksQ0FBQzJCLE1BQUwsQ0FBWTBKLG9CQUFaLEdBQW1DRCxlQUFlLENBQUN6SixNQUFoQixDQUF1QkMsRUFBMUQ7QUFDQTtBQUNELEdBdEJEOztBQXdCQTVCLE1BQUksQ0FBQ3VMLFdBQUwsR0FBbUIsVUFBU0MsS0FBVCxFQUFnQmpDLFFBQWhCLEVBQTBCO0FBQzVDaUMsU0FBSyxHQUFHQyxLQUFLLENBQUNDLFNBQU4sQ0FBZ0JDLEtBQWhCLENBQXNCQyxJQUF0QixDQUEyQkosS0FBM0IsQ0FBUjs7QUFFQSxRQUFJQSxLQUFLLENBQUMxSCxNQUFOLElBQWdCLENBQXBCLEVBQXVCO0FBQ3RCO0FBQ0E7O0FBRUR0QixXQUFPLENBQUNDLEdBQVIsQ0FBWStJLEtBQVo7QUFDQXhMLFFBQUksQ0FBQ0UsS0FBTCxDQUFXb0MsUUFBWCxDQUFvQixZQUFwQjtBQUVBLFdBQU91SixNQUFNLENBQUNMLEtBQUssQ0FBQ00sR0FBTixDQUFVLFVBQVNDLElBQVQsRUFBZTtBQUN0QyxVQUFJQyxlQUFlLEdBQUdyRyxJQUFJLENBQUNDLEdBQUwsR0FBV3FHLFFBQVgsQ0FBb0IsRUFBcEIsSUFBMEJDLElBQUksQ0FBQ0MsTUFBTCxHQUFjRixRQUFkLENBQXVCLEVBQXZCLEVBQTJCTixLQUEzQixDQUFpQyxDQUFqQyxDQUFoRDtBQUVBeEwsT0FBQyxDQUFDaU0sTUFBRixDQUFTLGVBQVQsRUFBMEI7QUFDekJDLGlCQUFTLEVBQUUsZ0JBQWdCTCxlQURGO0FBRXpCTSxnQkFBUSxFQUFFLEtBRmU7QUFHekJDLG9CQUFZLEVBQUU7QUFIVyxPQUExQjtBQU1BLFVBQUlDLGFBQWEsR0FBR3JNLENBQUMsQ0FBQyxpQ0FBaUM2TCxlQUFsQyxDQUFELENBQW9EUyxPQUFwRCxDQUE0RCxtQkFBNUQsQ0FBcEI7QUFFQSxhQUFPLFVBQVNsRCxRQUFULEVBQW1CO0FBQ3pCLFlBQUk5RSxJQUFJLEdBQUcsSUFBSWlJLFFBQUosRUFBWDtBQUNBakksWUFBSSxDQUFDa0ksTUFBTCxDQUFZLCtCQUFaLEVBQTZDWixJQUE3QztBQUNBLFlBQUlsRyxVQUFVLEdBQUdGLElBQUksQ0FBQ0MsR0FBTCxFQUFqQjtBQUVBNkQsZUFBTyxDQUFDO0FBQ1BDLGdCQUFNLEVBQUUsTUFERDtBQUVQQyxhQUFHLEVBQUUscUNBRkU7QUFHUGxGLGNBQUksRUFBRUEsSUFIQztBQUlQbUkscUJBQVcsRUFBRSxLQUpOO0FBS1BDLHFCQUFXLEVBQUUsS0FMTjtBQU9QQyxrQkFBUSxFQUFFLGtCQUFTQyxPQUFULEVBQWtCO0FBQzNCUCx5QkFBYSxDQUFDMUwsSUFBZCxDQUFtQixNQUFuQixFQUEyQjBJLElBQTNCLENBQWdDLGdCQUFnQnVELE9BQWhCLEdBQTBCLEdBQTFEO0FBQ0E7QUFUTSxTQUFELEVBVUosVUFBU25ELFFBQVQsRUFBbUI7QUFDckI0Qyx1QkFBYSxDQUFDL0ksS0FBZDs7QUFFQSxjQUFJbUcsUUFBUSxDQUFDQyxLQUFiLEVBQW9CO0FBQ25CMUosYUFBQyxDQUFDaU0sTUFBRixDQUFTeEMsUUFBUSxDQUFDQyxLQUFsQixFQUF5QixPQUF6QjtBQUNBLG1CQUFPTixRQUFRLElBQUlBLFFBQVEsRUFBM0I7QUFDQSxXQU5vQixDQVFyQjs7O0FBQ0EsaUJBQU9BLFFBQVEsSUFBSUEsUUFBUSxFQUEzQjtBQUNBLFNBcEJNLENBQVA7QUFxQkEsT0ExQkQ7QUEyQkEsS0F0Q2EsQ0FBRCxFQXNDVCxZQUFXO0FBQ2R2SixVQUFJLENBQUNFLEtBQUwsQ0FBV3FFLFdBQVgsQ0FBdUIsWUFBdkI7QUFDQSxhQUFPZ0YsUUFBUSxJQUFJQSxRQUFRLEVBQTNCO0FBQ0EsS0F6Q1ksQ0FBYjtBQTBDQSxHQXBERDs7QUFzREF2SixNQUFJLENBQUNnTixvQkFBTCxHQUE0QixVQUFTdk0sT0FBVCxFQUFrQjtBQUM3QyxXQUFPLElBQUlaLFNBQVMsQ0FBQ0MsU0FBVixDQUFvQm1OLGNBQXhCLENBQXVDeE0sT0FBdkMsRUFBZ0RULElBQWhELENBQVA7QUFDQSxHQUZELENBMVdvRCxDQThXcEQ7OztBQUVBQSxNQUFJLENBQUN1RixlQUFMLEdBQXVCQyxXQUFXLENBQUMsWUFBVztBQUM3QyxRQUFJeEYsSUFBSSxDQUFDK0IsY0FBTCxDQUFvQitCLE1BQXBCLElBQThCLENBQWxDLEVBQXFDO0FBQ3BDO0FBQ0E7O0FBRUQsUUFBSS9CLGNBQWMsR0FBRy9CLElBQUksQ0FBQytCLGNBQUwsQ0FBb0IwRCxNQUFwQixDQUEyQixVQUFTQyxhQUFULEVBQXdCO0FBQ3ZFLGFBQU9DLElBQUksQ0FBQ0MsR0FBTCxLQUFhRixhQUFhLENBQUNHLFVBQTNCLElBQXlDLElBQWhEO0FBQ0EsS0FGb0IsQ0FBckI7O0FBSUEsUUFBSTlELGNBQWMsQ0FBQytCLE1BQWYsSUFBeUI5RCxJQUFJLENBQUMrQixjQUFMLENBQW9CK0IsTUFBakQsRUFBeUQ7QUFDeEQ7QUFDQTs7QUFFRDlELFFBQUksQ0FBQytCLGNBQUwsR0FBc0JBLGNBQXRCO0FBQ0EvQixRQUFJLENBQUMySyxtQkFBTDtBQUNBLEdBZmlDLEVBZS9CLEdBZitCLENBQWxDLENBaFhvRCxDQWlZcEQ7O0FBRUEzSyxNQUFJLENBQUM2SCxTQUFMLENBQWU3RCxFQUFmLENBQWtCLE9BQWxCLEVBQTJCLFlBQVc7QUFDckNoRSxRQUFJLENBQUN1SSxnQkFBTDtBQUVBdkksUUFBSSxDQUFDMkIsTUFBTCxJQUFlc0IsUUFBUSxDQUFDQyxJQUFULENBQWMscUJBQWQsRUFBcUM7QUFDbkRrQyxhQUFPLEVBQUVwRixJQUFJLENBQUMyQixNQUFMLENBQVlDO0FBRDhCLEtBQXJDLENBQWY7QUFHQSxHQU5EO0FBUUE1QixNQUFJLENBQUM2SCxTQUFMLENBQWVxRixRQUFmLENBQXdCLFVBQVN4SixLQUFULEVBQWdCO0FBQ3ZDLFFBQUlBLEtBQUssQ0FBQ3lKLEtBQU4sSUFBZSxFQUFuQixFQUF1QjtBQUN0QnpKLFdBQUssQ0FBQ0MsY0FBTjtBQUNBM0QsVUFBSSxDQUFDNEgsS0FBTCxDQUFXd0YsTUFBWDtBQUNBO0FBQ0E7QUFDRCxHQU5EO0FBUUFwTixNQUFJLENBQUM0SCxLQUFMLENBQVc1RCxFQUFYLENBQWMsUUFBZCxFQUF3QixVQUFTTixLQUFULEVBQWdCO0FBQ3ZDQSxTQUFLLENBQUNDLGNBQU47O0FBRUEsUUFBSSxDQUFDM0QsSUFBSSxDQUFDNkgsU0FBTCxDQUFlOUUsR0FBZixFQUFMLEVBQTJCO0FBQzFCL0MsVUFBSSxDQUFDNkgsU0FBTCxDQUFlYSxLQUFmO0FBQ0E7QUFDQTs7QUFFRCxRQUFJMUksSUFBSSxDQUFDMkIsTUFBTCxJQUFlM0IsSUFBSSxDQUFDMkIsTUFBTCxDQUFZMkksdUJBQVosR0FBc0MsQ0FBekQsRUFBNEQ7QUFDM0R0SyxVQUFJLENBQUNtQyxVQUFMO0FBRUFjLGNBQVEsQ0FBQ0MsSUFBVCxDQUFjLDBCQUFkLEVBQTBDO0FBQ3pDdEIsVUFBRSxFQUFFNUIsSUFBSSxDQUFDMkIsTUFBTCxDQUFZQyxFQUR5QjtBQUV6Q2dCLGFBQUssRUFBRTVDLElBQUksQ0FBQ2tCLGNBRjZCO0FBR3pDbU0sd0JBQWdCLEVBQUU7QUFIdUIsT0FBMUM7QUFLQTs7QUFFRCxRQUFJeE4sU0FBUyxDQUFDQyxTQUFWLENBQW9Cd0ksV0FBeEIsQ0FBb0M7QUFDbkNjLGdCQUFVLEVBQUUsSUFEdUI7QUFHbkN6SCxZQUFNLEVBQUU7QUFDUDBHLGFBQUssRUFBRTFDLElBQUksQ0FBQ0MsR0FBTCxHQUFXcUcsUUFBWCxDQUFvQixFQUFwQixJQUEwQkMsSUFBSSxDQUFDQyxNQUFMLEdBQWNGLFFBQWQsQ0FBdUIsRUFBdkIsRUFBMkJOLEtBQTNCLENBQWlDLENBQWpDLENBRDFCO0FBRVBuQyxZQUFJLEVBQUV4SixJQUFJLENBQUM2SCxTQUFMLENBQWU5RSxHQUFmLEVBRkM7QUFHUGdDLHNCQUFjLEVBQUVDLElBQUksQ0FBQ0MsSUFBTCxDQUFVckQsRUFIbkI7QUFJUHFELFlBQUksRUFBRUQsSUFBSSxDQUFDQyxJQUpKO0FBS1BxSSxrQkFBVSxFQUFFQyxNQUFNLEdBQUdDLFdBQVQsRUFMTDtBQU1QQyxrQkFBVSxFQUFFRixNQUFNLEdBQUdDLFdBQVQsRUFOTDtBQU9QeEUsZUFBTyxFQUFFLElBUEY7QUFRUHlCLHlCQUFpQixFQUFFO0FBUlo7QUFIMkIsS0FBcEMsRUFhR3pLLElBYkg7QUFlQUEsUUFBSSxDQUFDc0QsWUFBTCxDQUFrQixDQUFsQjtBQUNBdEQsUUFBSSxDQUFDNkgsU0FBTCxDQUFlOUUsR0FBZixDQUFtQixFQUFuQjtBQUNBL0MsUUFBSSxDQUFDdUksZ0JBQUw7QUFDQXZJLFFBQUksQ0FBQ29LLGdCQUFMO0FBQ0EsR0FyQ0Q7QUF1Q0FwSyxNQUFJLENBQUN3SCxRQUFMLENBQWN6RCxNQUFkLENBQXFCLFlBQVc7QUFDL0IvRCxRQUFJLENBQUNrTCxxQkFBTDs7QUFFQSxRQUFJbEwsSUFBSSxDQUFDMkIsTUFBTCxDQUFZMEksd0JBQVosR0FBdUMsQ0FBdkMsSUFBNENySyxJQUFJLENBQUNtRCxTQUFMLEtBQW1CLEdBQW5FLEVBQXdFO0FBQ3ZFbkQsVUFBSSxDQUFDeUgsd0JBQUwsQ0FBOEJoRSxLQUE5QjtBQUNBLEtBRkQsTUFFTyxJQUFJekQsSUFBSSxDQUFDMkIsTUFBTCxDQUFZMkksdUJBQVosR0FBc0MsQ0FBdEMsSUFBMkN0SyxJQUFJLENBQUNzRCxZQUFMLEtBQXNCLEdBQXJFLEVBQTBFO0FBQ2hGdEQsVUFBSSxDQUFDMEgsdUJBQUwsQ0FBNkJqRSxLQUE3QjtBQUNBO0FBQ0QsR0FSRDtBQVVBekQsTUFBSSxDQUFDRSxLQUFMLENBQVc4RCxFQUFYLENBQWMsMERBQWQsRUFBMEUsVUFBU04sS0FBVCxFQUFnQjtBQUN0RkEsU0FBSyxDQUFDQyxjQUFOO0FBQ0FELFNBQUssQ0FBQ3lELGVBQU47QUFDSCxHQUhELEVBR0duRCxFQUhILENBR00sV0FITixFQUdtQixVQUFTTixLQUFULEVBQWdCO0FBQ2xDLE1BQUUxRCxJQUFJLENBQUMrRixRQUFQOztBQUVBLFFBQUkvRixJQUFJLENBQUMrRixRQUFMLEdBQWdCLENBQXBCLEVBQXVCO0FBQ3RCO0FBQ0E7O0FBRUUvRixRQUFJLENBQUNFLEtBQUwsQ0FBV29DLFFBQVgsQ0FBb0IsYUFBcEI7QUFDQXRDLFFBQUksQ0FBQ29ILGNBQUwsQ0FBb0I5RSxRQUFwQixDQUE2QixtQkFBN0I7QUFDSCxHQVpELEVBWUcwQixFQVpILENBWU0sZ0JBWk4sRUFZd0IsWUFBVztBQUNsQyxNQUFFaEUsSUFBSSxDQUFDK0YsUUFBUDs7QUFFQSxRQUFJL0YsSUFBSSxDQUFDK0YsUUFBTCxHQUFnQixDQUFwQixFQUF1QjtBQUN0QjtBQUNBOztBQUVEL0YsUUFBSSxDQUFDRSxLQUFMLENBQVdxRSxXQUFYLENBQXVCLGFBQXZCO0FBQ0F2RSxRQUFJLENBQUNvSCxjQUFMLENBQW9CN0MsV0FBcEIsQ0FBZ0MsbUJBQWhDO0FBQ0EsR0FyQkQsRUFxQkdQLEVBckJILENBcUJNLE1BckJOLEVBcUJjLFVBQVNOLEtBQVQsRUFBZ0I7QUFDN0IxRCxRQUFJLENBQUN1TCxXQUFMLENBQWlCN0gsS0FBSyxDQUFDZ0ssYUFBTixDQUFvQkMsWUFBcEIsQ0FBaUNuQyxLQUFqQyxJQUEwQyxFQUEzRDtBQUNBLEdBdkJELEVBcGNvRCxDQTZkcEQ7O0FBRUF4TCxNQUFJLENBQUN5SCx3QkFBTCxDQUE4QmhFLEtBQTlCLENBQW9DLFVBQVNDLEtBQVQsRUFBZ0I7QUFDbkRBLFNBQUssQ0FBQ0MsY0FBTjs7QUFFQSxRQUFJM0QsSUFBSSxDQUFDeUgsd0JBQUwsQ0FBOEI3RCxRQUE5QixDQUF1QyxZQUF2QyxDQUFKLEVBQTBEO0FBQ3pEO0FBQ0E7O0FBRUQ1RCxRQUFJLENBQUN5SCx3QkFBTCxDQUE4Qm5GLFFBQTlCLENBQXVDLHFCQUF2QztBQUVBRSxXQUFPLENBQUNDLEdBQVIsQ0FBWSxhQUFaLEVBQTJCLEdBQTNCLEVBQWdDLHlCQUFoQyxFQUEyRDtBQUMxRGIsUUFBRSxFQUFFNUIsSUFBSSxDQUFDMkIsTUFBTCxDQUFZQyxFQUQwQztBQUUxRGdNLHVCQUFpQixFQUFFNU4sSUFBSSxDQUFDWSxLQUFMLENBQVcsQ0FBWCxFQUFjZSxNQUFkLENBQXFCQyxFQUZrQjtBQUcxRGdCLFdBQUssRUFBRTVDLElBQUksQ0FBQ2tCO0FBSDhDLEtBQTNEO0FBTUErQixZQUFRLENBQUNDLElBQVQsQ0FBYyx5QkFBZCxFQUF5QztBQUN4Q3RCLFFBQUUsRUFBRTVCLElBQUksQ0FBQzJCLE1BQUwsQ0FBWUMsRUFEd0I7QUFFeENnTSx1QkFBaUIsRUFBRTVOLElBQUksQ0FBQ1ksS0FBTCxDQUFXLENBQVgsRUFBY2UsTUFBZCxDQUFxQkMsRUFGQTtBQUd4Q2dCLFdBQUssRUFBRTVDLElBQUksQ0FBQ2tCO0FBSDRCLEtBQXpDO0FBS0EsR0FwQkQ7QUFzQkFsQixNQUFJLENBQUMwSCx1QkFBTCxDQUE2QmpFLEtBQTdCLENBQW1DLFVBQVNDLEtBQVQsRUFBZ0I7QUFDbERBLFNBQUssQ0FBQ0MsY0FBTjs7QUFFQSxRQUFJM0QsSUFBSSxDQUFDMEgsdUJBQUwsQ0FBNkI5RCxRQUE3QixDQUFzQyxZQUF0QyxDQUFKLEVBQXlEO0FBQ3hEO0FBQ0E7O0FBRUQ1RCxRQUFJLENBQUMwSCx1QkFBTCxDQUE2QnBGLFFBQTdCLENBQXNDLHFCQUF0QztBQUVBRSxXQUFPLENBQUNDLEdBQVIsQ0FBWSxhQUFaLEVBQTJCLEdBQTNCLEVBQWdDLHlCQUFoQyxFQUEyRDtBQUMxRGIsUUFBRSxFQUFFNUIsSUFBSSxDQUFDMkIsTUFBTCxDQUFZQyxFQUQwQztBQUUxRHlMLHNCQUFnQixFQUFFck4sSUFBSSxDQUFDWSxLQUFMLENBQVdaLElBQUksQ0FBQ1ksS0FBTCxDQUFXa0QsTUFBWCxHQUFvQixDQUEvQixFQUFrQ25DLE1BQWxDLENBQXlDQyxFQUZEO0FBRzFEZ0IsV0FBSyxFQUFFNUMsSUFBSSxDQUFDa0I7QUFIOEMsS0FBM0Q7QUFNQStCLFlBQVEsQ0FBQ0MsSUFBVCxDQUFjLHlCQUFkLEVBQXlDO0FBQ3hDdEIsUUFBRSxFQUFFNUIsSUFBSSxDQUFDMkIsTUFBTCxDQUFZQyxFQUR3QjtBQUV4Q3lMLHNCQUFnQixFQUFFck4sSUFBSSxDQUFDWSxLQUFMLENBQVdaLElBQUksQ0FBQ1ksS0FBTCxDQUFXa0QsTUFBWCxHQUFvQixDQUEvQixFQUFrQ25DLE1BQWxDLENBQXlDQyxFQUZuQjtBQUd4Q2dCLFdBQUssRUFBRTVDLElBQUksQ0FBQ2tCO0FBSDRCLEtBQXpDO0FBS0EsR0FwQkQsRUFyZm9ELENBMmdCcEQ7O0FBRUErQixVQUFRLENBQUN1QixVQUFULENBQW9CLFlBQVc7QUFDOUIsUUFBSSxDQUFDeEUsSUFBSSxDQUFDMkIsTUFBVixFQUFrQjtBQUNqQjtBQUNBOztBQUVEYSxXQUFPLENBQUNDLEdBQVIsQ0FBWSxhQUFaLEVBQTJCLGNBQTNCO0FBRUFELFdBQU8sQ0FBQ0MsR0FBUixDQUFZLGFBQVosRUFBMkIsR0FBM0IsRUFBZ0MsMEJBQWhDLEVBQTREO0FBQzNEYixRQUFFLEVBQUU1QixJQUFJLENBQUMyQixNQUFMLENBQVlDLEVBRDJDO0FBRTNEZ0IsV0FBSyxFQUFFNUMsSUFBSSxDQUFDa0IsY0FGK0M7QUFHM0RtTSxzQkFBZ0IsRUFBR3JOLElBQUksQ0FBQ1ksS0FBTCxDQUFXa0QsTUFBWCxHQUFvQixDQUFwQixHQUF3QjlELElBQUksQ0FBQ1ksS0FBTCxDQUFXWixJQUFJLENBQUNZLEtBQUwsQ0FBV2tELE1BQVgsR0FBb0IsQ0FBL0IsRUFBa0NuQyxNQUFsQyxDQUF5Q0MsRUFBakUsR0FBc0U7QUFIOUIsS0FBNUQ7QUFNQXFCLFlBQVEsQ0FBQ0MsSUFBVCxDQUFjLDBCQUFkLEVBQTBDO0FBQ3pDdEIsUUFBRSxFQUFFNUIsSUFBSSxDQUFDMkIsTUFBTCxDQUFZQyxFQUR5QjtBQUV6Q2dCLFdBQUssRUFBRTVDLElBQUksQ0FBQ2tCLGNBRjZCO0FBR3pDbU0sc0JBQWdCLEVBQUdyTixJQUFJLENBQUNZLEtBQUwsQ0FBV2tELE1BQVgsR0FBb0IsQ0FBcEIsR0FBd0I5RCxJQUFJLENBQUNZLEtBQUwsQ0FBV1osSUFBSSxDQUFDWSxLQUFMLENBQVdrRCxNQUFYLEdBQW9CLENBQS9CLEVBQWtDbkMsTUFBbEMsQ0FBeUNDLEVBQWpFLEdBQXNFO0FBSGhELEtBQTFDO0FBS0EsR0FsQkQ7QUFvQkFxQixVQUFRLENBQUNlLEVBQVQsQ0FBWSwwQkFBWixFQUF3QyxVQUFTVyxJQUFULEVBQWU7QUFDdERuQyxXQUFPLENBQUNDLEdBQVIsQ0FBWSxhQUFaLEVBQTJCLEdBQTNCLEVBQWdDLDBCQUFoQyxFQUE0RGtDLElBQTVEO0FBQ0EzRSxRQUFJLENBQUMyQixNQUFMLEdBQWNnRCxJQUFkLENBRnNELENBR3REOztBQUVBQSxRQUFJLENBQUNrSixRQUFMLENBQWN6TCxPQUFkLENBQXNCLFVBQVMwTCxPQUFULEVBQWtCO0FBQ3ZDOU4sVUFBSSxDQUFDOEIsa0JBQUwsQ0FBd0I7QUFDdkJILGNBQU0sRUFBRW1NO0FBRGUsT0FBeEI7QUFHQSxLQUpEO0FBTUE5TixRQUFJLENBQUN5SCx3QkFBTCxDQUE4QjdDLFdBQTlCLENBQTBDLFFBQTFDLEVBQW9ENUUsSUFBSSxDQUFDMkIsTUFBTCxDQUFZMEksd0JBQVosSUFBd0MsQ0FBNUY7QUFDQXJLLFFBQUksQ0FBQzBILHVCQUFMLENBQTZCOUMsV0FBN0IsQ0FBeUMsUUFBekMsRUFBbUQ1RSxJQUFJLENBQUMyQixNQUFMLENBQVkySSx1QkFBWixJQUF1QyxDQUExRjtBQUNBdEssUUFBSSxDQUFDaUosbUJBQUwsTUFBOEJqSixJQUFJLENBQUNzRCxZQUFMLENBQWtCLENBQWxCLENBQTlCO0FBQ0F0RCxRQUFJLENBQUNrTCxxQkFBTDtBQUNBLEdBZkQ7QUFpQkFqSSxVQUFRLENBQUNlLEVBQVQsQ0FBWSx5QkFBWixFQUF1QyxVQUFTVyxJQUFULEVBQWU7QUFDckRuQyxXQUFPLENBQUNDLEdBQVIsQ0FBWSxhQUFaLEVBQTJCLEdBQTNCLEVBQWdDLHlCQUFoQyxFQUEyRGtDLElBQTNEOztBQUVBLFFBQUksQ0FBQzNFLElBQUksQ0FBQzJCLE1BQU4sSUFBZ0JnRCxJQUFJLENBQUMvQyxFQUFMLElBQVc1QixJQUFJLENBQUMyQixNQUFMLENBQVlDLEVBQTNDLEVBQStDO0FBQzlDO0FBQ0E7O0FBRUQsUUFBSStDLElBQUksQ0FBQ2lKLGlCQUFULEVBQTRCO0FBQzNCLFVBQUlHLGFBQWEsR0FBRy9OLElBQUksQ0FBQ3NELFlBQUwsRUFBcEI7QUFFQXFCLFVBQUksQ0FBQ2tKLFFBQUwsQ0FBY0csSUFBZCxDQUFtQixVQUFTQyxRQUFULEVBQW1CQyxRQUFuQixFQUE2QjtBQUMvQyxlQUFPRCxRQUFRLENBQUNyTSxFQUFULEdBQWNzTSxRQUFRLENBQUN0TSxFQUE5QjtBQUNBLE9BRkQsRUFFR1EsT0FGSCxDQUVXLFVBQVMwTCxPQUFULEVBQWtCO0FBQzVCOU4sWUFBSSxDQUFDOEIsa0JBQUwsQ0FBd0I7QUFDdkJILGdCQUFNLEVBQUVtTTtBQURlLFNBQXhCO0FBR0EsT0FORDtBQVFBOU4sVUFBSSxDQUFDMkIsTUFBTCxDQUFZMEksd0JBQVosR0FBdUMxRixJQUFJLENBQUMwRix3QkFBNUM7QUFDQXJLLFVBQUksQ0FBQ3lILHdCQUFMLENBQThCbEQsV0FBOUIsQ0FBMEMscUJBQTFDO0FBQ0F2RSxVQUFJLENBQUN5SCx3QkFBTCxDQUE4QjdDLFdBQTlCLENBQTBDLFFBQTFDLEVBQW9ENUUsSUFBSSxDQUFDMkIsTUFBTCxDQUFZMEksd0JBQVosSUFBd0MsQ0FBNUY7QUFDQXJLLFVBQUksQ0FBQ3NELFlBQUwsQ0FBa0J5SyxhQUFsQjtBQUNBLEtBZkQsTUFlTyxJQUFJcEosSUFBSSxDQUFDMEksZ0JBQVQsRUFBMkI7QUFDakMsVUFBSWMsVUFBVSxHQUFHbk8sSUFBSSxDQUFDbUQsU0FBTCxFQUFqQjtBQUVBd0IsVUFBSSxDQUFDa0osUUFBTCxDQUFjRyxJQUFkLENBQW1CLFVBQVNDLFFBQVQsRUFBbUJDLFFBQW5CLEVBQTZCO0FBQy9DLGVBQU9ELFFBQVEsQ0FBQ3JNLEVBQVQsR0FBY3NNLFFBQVEsQ0FBQ3RNLEVBQTlCO0FBQ0EsT0FGRCxFQUVHUSxPQUZILENBRVcsVUFBUzBMLE9BQVQsRUFBa0I7QUFDNUI5TixZQUFJLENBQUM4QixrQkFBTCxDQUF3QjtBQUN2QkgsZ0JBQU0sRUFBRW1NO0FBRGUsU0FBeEI7QUFHQSxPQU5EO0FBUUE5TixVQUFJLENBQUMyQixNQUFMLENBQVkySSx1QkFBWixHQUFzQzNGLElBQUksQ0FBQzJGLHVCQUEzQztBQUNBdEssVUFBSSxDQUFDMEgsdUJBQUwsQ0FBNkJuRCxXQUE3QixDQUF5QyxxQkFBekM7QUFDQXZFLFVBQUksQ0FBQzBILHVCQUFMLENBQTZCOUMsV0FBN0IsQ0FBeUMsUUFBekMsRUFBbUQ1RSxJQUFJLENBQUMyQixNQUFMLENBQVkySSx1QkFBWixJQUF1QyxDQUExRjtBQUNBdEssVUFBSSxDQUFDbUQsU0FBTCxDQUFlZ0wsVUFBZjtBQUNBO0FBQ0QsR0F0Q0Q7QUF3Q0FsTCxVQUFRLENBQUNlLEVBQVQsQ0FBWSxzQkFBWixFQUFvQyxVQUFTUyxJQUFULEVBQWU7QUFDbEQsUUFBSSxDQUFDekUsSUFBSSxDQUFDMkIsTUFBTixJQUFnQjNCLElBQUksQ0FBQzJCLE1BQUwsQ0FBWUMsRUFBWixJQUFrQjZDLElBQUksQ0FBQ1csT0FBM0MsRUFBb0Q7QUFDbkQ7QUFDQTs7QUFFRDVDLFdBQU8sQ0FBQ0MsR0FBUixDQUFZLGFBQVosRUFBMkIsR0FBM0IsRUFBZ0Msc0JBQWhDLEVBQXdEZ0MsSUFBeEQ7QUFDQSxRQUFJMkosbUJBQW1CLEdBQUdwTyxJQUFJLENBQUN5SSxnQkFBTCxFQUExQjtBQUVBLFFBQUlqSCxJQUFJLEdBQUd4QixJQUFJLENBQUM4QixrQkFBTCxDQUF3QjtBQUNsQ0gsWUFBTSxFQUFFOEM7QUFEMEIsS0FBeEIsQ0FBWDtBQUlBMkosdUJBQW1CLElBQUlwTyxJQUFJLENBQUNzRCxZQUFMLENBQWtCLENBQWxCLENBQXZCO0FBQ0NtQixRQUFJLENBQUNNLGNBQUwsSUFBdUJDLElBQUksQ0FBQ0MsSUFBTCxDQUFVckQsRUFBbEMsSUFBeUNKLElBQUksQ0FBQzBELFFBQUwsRUFBekM7QUFDQWxGLFFBQUksQ0FBQytCLGNBQUwsR0FBc0IsRUFBdEI7QUFDQS9CLFFBQUksQ0FBQzJLLG1CQUFMO0FBQ0EsR0FoQkQ7QUFrQkExSCxVQUFRLENBQUNlLEVBQVQsQ0FBWSx1QkFBWixFQUFxQyxVQUFTUyxJQUFULEVBQWU7QUFDbkQsUUFBSSxDQUFDekUsSUFBSSxDQUFDMkIsTUFBTixJQUFnQjNCLElBQUksQ0FBQzJCLE1BQUwsQ0FBWUMsRUFBWixJQUFrQjZDLElBQUksQ0FBQ1csT0FBM0MsRUFBb0Q7QUFDbkQ7QUFDQTs7QUFFRDVDLFdBQU8sQ0FBQ0MsR0FBUixDQUFZLGFBQVosRUFBMkIsR0FBM0IsRUFBZ0MsdUJBQWhDLEVBQXlEZ0MsSUFBekQ7QUFFQSxRQUFJakQsSUFBSSxHQUFHeEIsSUFBSSxDQUFDc0IsV0FBTCxDQUFpQm1ELElBQUksQ0FBQzdDLEVBQXRCLENBQVg7O0FBRUEsUUFBSSxDQUFDSixJQUFMLEVBQVc7QUFDVjtBQUNBOztBQUVELFFBQUk0TSxtQkFBbUIsR0FBR3BPLElBQUksQ0FBQ3lJLGdCQUFMLEVBQTFCO0FBQ0F6SSxRQUFJLENBQUN1Syx5QkFBTCxDQUErQi9JLElBQUksQ0FBQ0csTUFBTCxDQUFZOEksaUJBQVosQ0FBOEJxQixHQUE5QixDQUFrQyxVQUFTcEIsZ0JBQVQsRUFBMkI7QUFDM0YsYUFBT0EsZ0JBQWdCLENBQUM5SSxFQUF4QjtBQUNBLEtBRjhCLENBQS9CO0FBSUFKLFFBQUksQ0FBQ0csTUFBTCxDQUFZOEksaUJBQVosR0FBZ0NoRyxJQUFJLENBQUNnRyxpQkFBckM7QUFDQWpKLFFBQUksQ0FBQ1EsTUFBTDtBQUNBb00sdUJBQW1CLElBQUlwTyxJQUFJLENBQUNzRCxZQUFMLENBQWtCLENBQWxCLENBQXZCO0FBQ0EsR0FyQkQ7QUF1QkFMLFVBQVEsQ0FBQ2UsRUFBVCxDQUFZLHFCQUFaLEVBQW1DLFVBQVNTLElBQVQsRUFBZTtBQUNqRCxRQUFJLENBQUN6RSxJQUFJLENBQUMyQixNQUFOLElBQWdCM0IsSUFBSSxDQUFDMkIsTUFBTCxDQUFZQyxFQUFaLElBQWtCNkMsSUFBSSxDQUFDVyxPQUEzQyxFQUFvRDtBQUNuRDtBQUNBOztBQUVENUMsV0FBTyxDQUFDQyxHQUFSLENBQVksYUFBWixFQUEyQixHQUEzQixFQUFnQyxxQkFBaEMsRUFBdURnQyxJQUF2RDtBQUNBekUsUUFBSSxDQUFDcUYsZUFBTCxDQUFxQlosSUFBSSxDQUFDYSxNQUExQjtBQUNBdEYsUUFBSSxDQUFDMkssbUJBQUw7QUFDQSxHQVJELEVBbm9Cb0QsQ0E2b0JwRDs7QUFFQTNLLE1BQUksQ0FBQ0UsS0FBTCxDQUFXdUUsSUFBWCxDQUFnQixPQUFoQixFQUF5QnpFLElBQXpCOztBQUVBLE1BQUlBLElBQUksQ0FBQzJCLE1BQVQsRUFBaUI7QUFDaEJsQixXQUFPLENBQUNrQixNQUFSLENBQWVrTSxRQUFmLENBQXdCekwsT0FBeEIsQ0FBZ0MsVUFBUzBMLE9BQVQsRUFBa0I7QUFDakQ5TixVQUFJLENBQUM4QixrQkFBTCxDQUF3QjtBQUN2QkgsY0FBTSxFQUFFbU07QUFEZSxPQUF4QjtBQUdBLEtBSkQ7QUFNQSxXQUFPck4sT0FBTyxDQUFDa0IsTUFBUixDQUFla00sUUFBdEI7QUFDQTdOLFFBQUksQ0FBQ3lILHdCQUFMLENBQThCN0MsV0FBOUIsQ0FBMEMsUUFBMUMsRUFBb0Q1RSxJQUFJLENBQUMyQixNQUFMLENBQVkwSSx3QkFBWixJQUF3QyxDQUE1RjtBQUNBckssUUFBSSxDQUFDMEgsdUJBQUwsQ0FBNkI5QyxXQUE3QixDQUF5QyxRQUF6QyxFQUFtRDVFLElBQUksQ0FBQzJCLE1BQUwsQ0FBWTJJLHVCQUFaLElBQXVDLENBQTFGO0FBQ0F0SyxRQUFJLENBQUNpSixtQkFBTCxNQUE4QmpKLElBQUksQ0FBQ3NELFlBQUwsQ0FBa0IsQ0FBbEIsQ0FBOUI7QUFDQTtBQUNELENBN3BCRDs7QUErcEJBekQsU0FBUyxDQUFDQyxTQUFWLENBQW9Cd0ksV0FBcEIsR0FBa0MsVUFBUzdILE9BQVQsRUFBa0JDLEtBQWxCLEVBQXlCO0FBQzFELE1BQUlWLElBQUksR0FBRyxJQUFYO0FBQ0FBLE1BQUksQ0FBQ29KLFVBQUwsR0FBa0IzSSxPQUFPLENBQUMySSxVQUFSLElBQXNCLEtBQXhDO0FBQ0FwSixNQUFJLENBQUMyQixNQUFMLEdBQWNsQixPQUFPLENBQUNrQixNQUF0Qjs7QUFFQSxNQUFJM0IsSUFBSSxDQUFDb0osVUFBVCxFQUFxQjtBQUNwQnBKLFFBQUksQ0FBQzJCLE1BQUwsQ0FBWUMsRUFBWixHQUFpQixFQUFFbEIsS0FBSyxDQUFDd0gsb0JBQXpCO0FBQ0E7O0FBRURsSSxNQUFJLENBQUNxTyxnQkFBTCxHQUF5QnJPLElBQUksQ0FBQzJCLE1BQUwsQ0FBWW9ELGNBQVosSUFBOEJDLElBQUksQ0FBQ0MsSUFBTCxDQUFVckQsRUFBakU7QUFFQTVCLE1BQUksQ0FBQ0UsS0FBTCxHQUFhQyxDQUFDLENBQUNOLFNBQVMsQ0FBQ21HLFFBQVYsQ0FBbUIsY0FBbkIsRUFBbUM7QUFDakR4RSxRQUFJLEVBQUV4QixJQUQyQztBQUVqRDhOLFdBQU8sRUFBRTlOLElBQUksQ0FBQzJCO0FBRm1DLEdBQW5DLENBQUQsQ0FBRCxDQUdUOEMsSUFIUyxDQUdKLE1BSEksRUFHSXpFLElBSEosQ0FBYjtBQUtBQSxNQUFJLENBQUNzTyxRQUFMLEdBQWdCdE8sSUFBSSxDQUFDRSxLQUFMLENBQVdZLElBQVgsQ0FBZ0Isd0JBQWhCLENBQWhCOztBQUVBZCxNQUFJLENBQUNnQyxNQUFMLEdBQWMsWUFBVztBQUN4QixRQUFJOUIsS0FBSyxHQUFHQyxDQUFDLENBQUNOLFNBQVMsQ0FBQ21HLFFBQVYsQ0FBbUIsY0FBbkIsRUFBbUM7QUFDaER4RSxVQUFJLEVBQUV4QixJQUQwQztBQUVoRDhOLGFBQU8sRUFBRTlOLElBQUksQ0FBQzJCLE1BRmtDO0FBR2hEZ0QsVUFBSSxFQUFFakUsS0FBSyxDQUFDaUI7QUFIb0MsS0FBbkMsQ0FBRCxDQUFiO0FBTUEzQixRQUFJLENBQUNFLEtBQUwsQ0FBV2dHLElBQVgsQ0FBZ0JoRyxLQUFLLENBQUNnRyxJQUFOLEVBQWhCO0FBQ0FsRyxRQUFJLENBQUNFLEtBQUwsQ0FBV2lHLElBQVgsQ0FBZ0IsT0FBaEIsRUFBeUJqRyxLQUFLLENBQUNpRyxJQUFOLENBQVcsT0FBWCxDQUF6QjtBQUNBbkcsUUFBSSxDQUFDRSxLQUFMLENBQVdpRyxJQUFYLENBQWdCLFNBQWhCLEVBQTJCakcsS0FBSyxDQUFDaUcsSUFBTixDQUFXLFNBQVgsQ0FBM0I7QUFDQSxHQVZEOztBQVlBbkcsTUFBSSxDQUFDaUMsS0FBTCxHQUFhLFlBQVc7QUFDdkIsUUFBSW9FLEtBQUssR0FBRzNGLEtBQUssQ0FBQ0UsS0FBTixDQUFZMEYsT0FBWixDQUFvQnRHLElBQXBCLENBQVo7QUFDQ3FHLFNBQUssSUFBSSxDQUFWLElBQWdCM0YsS0FBSyxDQUFDRSxLQUFOLENBQVkyRixNQUFaLENBQW1CRixLQUFuQixFQUEwQixDQUExQixDQUFoQjtBQUNBLFFBQUlHLFNBQVMsR0FBRyxJQUFoQjtBQUVBOUYsU0FBSyxDQUFDRSxLQUFOLENBQVlhLElBQVosQ0FBaUIsVUFBU0QsSUFBVCxFQUFlO0FBQy9CLFVBQUlBLElBQUksQ0FBQ0csTUFBTCxDQUFZQyxFQUFaLEdBQWlCLENBQXJCLEVBQXdCO0FBQ3ZCLFlBQUk1QixJQUFJLENBQUMyQixNQUFMLENBQVlDLEVBQVosR0FBaUIsQ0FBckIsRUFBd0I7QUFDdkIsY0FBSTVCLElBQUksQ0FBQzJCLE1BQUwsQ0FBWUMsRUFBWixHQUFpQkosSUFBSSxDQUFDRyxNQUFMLENBQVlDLEVBQWpDLEVBQXFDO0FBQ3BDNEUscUJBQVMsR0FBR2hGLElBQVo7QUFDQSxtQkFBTyxJQUFQO0FBQ0E7O0FBRUQsaUJBQU8sS0FBUDtBQUNBOztBQUVELGVBQU8sS0FBUDtBQUNBOztBQUVELFVBQUl4QixJQUFJLENBQUMyQixNQUFMLENBQVlDLEVBQVosR0FBaUIsQ0FBckIsRUFBd0I7QUFDdkI0RSxpQkFBUyxHQUFHaEYsSUFBWjtBQUNBLGVBQU8sSUFBUDtBQUNBOztBQUVELFVBQUl4QixJQUFJLENBQUMyQixNQUFMLENBQVlDLEVBQVosR0FBaUJKLElBQUksQ0FBQ0csTUFBTCxDQUFZQyxFQUFqQyxFQUFxQztBQUNwQzRFLGlCQUFTLEdBQUdoRixJQUFaO0FBQ0EsZUFBTyxJQUFQO0FBQ0E7O0FBRUQsYUFBTyxLQUFQO0FBQ0EsS0F6QkQ7O0FBMkJBLFFBQUlnRixTQUFKLEVBQWU7QUFDZHhHLFVBQUksQ0FBQ0UsS0FBTCxDQUFXK0YsWUFBWCxDQUF3Qk8sU0FBUyxDQUFDdEcsS0FBbEM7QUFDQVEsV0FBSyxDQUFDRSxLQUFOLENBQVkyRixNQUFaLENBQW1CN0YsS0FBSyxDQUFDRSxLQUFOLENBQVkwRixPQUFaLENBQW9CRSxTQUFwQixDQUFuQixFQUFtRCxDQUFuRCxFQUFzRHhHLElBQXREO0FBQ0EsS0FIRCxNQUdPO0FBQ05BLFVBQUksQ0FBQ0UsS0FBTCxDQUFXK0YsWUFBWCxDQUF3QnZGLEtBQUssQ0FBQ2dILHVCQUE5QjtBQUNBaEgsV0FBSyxDQUFDRSxLQUFOLENBQVk2RixJQUFaLENBQWlCekcsSUFBakI7QUFDQTtBQUNELEdBdkNEOztBQXlDQUEsTUFBSSxDQUFDa0YsUUFBTCxHQUFnQixZQUFXO0FBQzFCbEYsUUFBSSxDQUFDc08sUUFBTCxDQUFjaE0sUUFBZCxDQUF1QixvQkFBdkI7QUFDQThCLGdCQUFZLENBQUNwRSxJQUFJLENBQUNrRixRQUFMLENBQWNrQixPQUFmLENBQVo7QUFFQXBHLFFBQUksQ0FBQ2tGLFFBQUwsQ0FBY2tCLE9BQWQsR0FBd0I5QixVQUFVLENBQUMsWUFBVztBQUM3Q3RFLFVBQUksQ0FBQ3NPLFFBQUwsQ0FBYy9KLFdBQWQsQ0FBMEIsb0JBQTFCO0FBQ0EsS0FGaUMsRUFFL0IsR0FGK0IsQ0FBbEM7QUFHQSxHQVBEOztBQVNBdkUsTUFBSSxDQUFDcUMsTUFBTCxHQUFjLFlBQVc7QUFDeEJyQyxRQUFJLENBQUNFLEtBQUwsQ0FBV21DLE1BQVg7QUFDQSxRQUFJZ0UsS0FBSyxHQUFHM0YsS0FBSyxDQUFDRSxLQUFOLENBQVkwRixPQUFaLENBQW9CdEcsSUFBcEIsQ0FBWjtBQUNDcUcsU0FBSyxHQUFHLENBQUMsQ0FBVixJQUFnQjNGLEtBQUssQ0FBQ0UsS0FBTixDQUFZMkYsTUFBWixDQUFtQkYsS0FBbkIsRUFBMEIsQ0FBMUIsQ0FBaEI7QUFDQSxHQUpEOztBQU1BckcsTUFBSSxDQUFDaUMsS0FBTDtBQUNBakMsTUFBSSxDQUFDb0osVUFBTCxJQUFtQjFJLEtBQUssQ0FBQzJJLElBQU4sRUFBbkI7QUFDQSxDQXhGRDs7QUEwRkF4SixTQUFTLENBQUNDLFNBQVYsQ0FBb0JtTixjQUFwQixHQUFxQyxVQUFTeE0sT0FBVCxFQUFrQkMsS0FBbEIsRUFBeUI7QUFDN0QsTUFBSVYsSUFBSSxHQUFHLElBQVg7QUFDQUEsTUFBSSxDQUFDMkIsTUFBTCxHQUFjbEIsT0FBTyxDQUFDa0IsTUFBdEI7QUFFQTNCLE1BQUksQ0FBQ0UsS0FBTCxHQUFhQyxDQUFDLENBQUNOLFNBQVMsQ0FBQ21HLFFBQVYsQ0FBbUIsK0JBQW5CLEVBQW9EO0FBQ2xFdUksY0FBVSxFQUFFdk8sSUFBSSxDQUFDMkI7QUFEaUQsR0FBcEQsQ0FBRCxDQUFELENBRVQ4QyxJQUZTLENBRUosTUFGSSxFQUVJekUsSUFGSixDQUFiOztBQUlBQSxNQUFJLENBQUNnQyxNQUFMLEdBQWMsWUFBVztBQUN4QixRQUFJOUIsS0FBSyxHQUFHQyxDQUFDLENBQUNOLFNBQVMsQ0FBQ21HLFFBQVYsQ0FBbUIsK0JBQW5CLEVBQW9EO0FBQ2pFdUksZ0JBQVUsRUFBRXZPLElBQUksQ0FBQzJCO0FBRGdELEtBQXBELENBQUQsQ0FBYjtBQUlBM0IsUUFBSSxDQUFDRSxLQUFMLENBQVdnRyxJQUFYLENBQWdCaEcsS0FBSyxDQUFDZ0csSUFBTixFQUFoQjtBQUNBbEcsUUFBSSxDQUFDRSxLQUFMLENBQVdpRyxJQUFYLENBQWdCLE9BQWhCLEVBQXlCakcsS0FBSyxDQUFDaUcsSUFBTixDQUFXLE9BQVgsQ0FBekI7QUFDQW5HLFFBQUksQ0FBQ0UsS0FBTCxDQUFXaUcsSUFBWCxDQUFnQixTQUFoQixFQUEyQmpHLEtBQUssQ0FBQ2lHLElBQU4sQ0FBVyxTQUFYLENBQTNCO0FBQ0EsR0FSRDs7QUFVQW5HLE1BQUksQ0FBQ2tGLFFBQUwsR0FBZ0IsWUFBVztBQUMxQmxGLFFBQUksQ0FBQ3NPLFFBQUwsQ0FBY2hNLFFBQWQsQ0FBdUIsb0JBQXZCO0FBQ0E4QixnQkFBWSxDQUFDcEUsSUFBSSxDQUFDa0YsUUFBTCxDQUFja0IsT0FBZixDQUFaO0FBRUFwRyxRQUFJLENBQUNrRixRQUFMLENBQWNrQixPQUFkLEdBQXdCOUIsVUFBVSxDQUFDLFlBQVc7QUFDN0N0RSxVQUFJLENBQUNzTyxRQUFMLENBQWMvSixXQUFkLENBQTBCLG9CQUExQjtBQUNBLEtBRmlDLEVBRS9CLEdBRitCLENBQWxDO0FBR0EsR0FQRDs7QUFTQXZFLE1BQUksQ0FBQ3FDLE1BQUwsR0FBYyxZQUFXO0FBQ3hCckMsUUFBSSxDQUFDRSxLQUFMLENBQVdtQyxNQUFYO0FBQ0EsUUFBSWdFLEtBQUssR0FBRzNGLEtBQUssQ0FBQ3NILGdCQUFOLENBQXVCMUIsT0FBdkIsQ0FBK0J0RyxJQUEvQixDQUFaO0FBQ0NxRyxTQUFLLEdBQUcsQ0FBQyxDQUFWLElBQWdCM0YsS0FBSyxDQUFDc0gsZ0JBQU4sQ0FBdUJ6QixNQUF2QixDQUE4QkYsS0FBOUIsRUFBcUMsQ0FBckMsQ0FBaEI7QUFDQSxHQUpEOztBQU1BckcsTUFBSSxDQUFDRSxLQUFMLENBQVcrSyxRQUFYLENBQW9CdkssS0FBSyxDQUFDcUgsaUJBQTFCO0FBQ0FySCxPQUFLLENBQUNzSCxnQkFBTixDQUF1QnZCLElBQXZCLENBQTRCekcsSUFBNUI7QUFDQSxDQW5DRCxDIiwiZmlsZSI6Ii9qcy9kYXNoYm9hcmQvbWVzc2VuZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA2KTtcbiIsImRhc2hib2FyZC5tZXNzZW5nZXIgPSB7fTtcclxuXHJcbmRhc2hib2FyZC5tZXNzZW5nZXIuQ2hhdFBhbmVsID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdHNlbGYubGlzdHMgPSB7fTtcclxuXHRzZWxmLiRyb290ID0gJCgnLmNoYXQtcGFuZWwnKTtcclxuXHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXHJcblxyXG5cdHNlbGYubGlzdHMucGVvcGxlID0gbmV3IGRhc2hib2FyZC5tZXNzZW5nZXIuQ2hhdExpc3Qoe1xyXG5cdFx0cm9vdDogJy5jaGF0LWxpc3QuaXMtcGVvcGxlJyxcclxuXHRcdG93bmVyOiB7IHR5cGU6IG51bGwgfSxcclxuXHR9LCBzZWxmKTtcclxuXHJcblx0Ly8gcGFuZWwubGlzdHMuY2hhbm5lbCA9IG5ldyBkYXNoYm9hcmQuY2hhdC5MaXN0KHtcclxuXHQvLyBcdG93bmVyOiB7IHR5cGU6ICdQcm9qZWN0JyB9LFxyXG5cdC8vIH0pO1xyXG59O1xyXG5cclxuZGFzaGJvYXJkLm1lc3Nlbmdlci5DaGF0TGlzdCA9IGZ1bmN0aW9uKG9wdGlvbnMsIHBhbmVsKSB7XHJcblx0Ly8gc2VsZWN0b3IsIHR5cGUsIGluaXRpYWxfaXRlbXNcclxuXHJcblx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdHNlbGYuaXNfaW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuXHRzZWxmLm93bmVyID0gb3B0aW9ucy5vd25lcjtcclxuXHRzZWxmLml0ZW1zID0gW107XHJcblx0c2VsZi4kcm9vdCA9ICQob3B0aW9ucy5yb290KTtcclxuXHRzZWxmLiRpdGVtcyA9IHNlbGYuJHJvb3QuZmluZCgnLmNoYXQtbGlzdF9faXRlbXMnKTtcclxuXHRzZWxmLiRub19pdGVtcyA9IHNlbGYuJHJvb3QuZmluZCgnLmNoYXQtbGlzdF9fbm8taXRlbXMnKTtcclxuXHRzZWxmLiRsb2FkZXIgPSBzZWxmLiRyb290LmZpbmQoJy5jaGF0LWxpc3RfX2xvYWRlcicpO1xyXG5cdHNlbGYuJGxvYWRfbW9yZV9idXR0b24gPSBzZWxmLiRyb290LmZpbmQoJy5jaGF0LWxpc3RfX2xvYWQtbW9yZS1idXR0b24nKTtcclxuXHRzZWxmLml0ZW1zX3Blcl9wYWdlID0gMjA7XHJcblx0c2VsZi5jb3VudF9vZl9jaGF0c19hZnRlciA9IDA7XHJcblx0c2VsZi4kc2VhcmNoID0gc2VsZi4kcm9vdC5maW5kKCcuY2hhdC1saXN0LXNlYXJjaCcpO1xyXG5cdHNlbGYuJHNlYXJjaF9pbnB1dCA9IHNlbGYuJHJvb3QuZmluZCgnLmNoYXQtbGlzdC1zZWFyY2hfX2lucHV0Jyk7XHJcblxyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xyXG5cclxuXHRzZWxmLmdldEl0ZW1CeUlkID0gZnVuY3Rpb24oaXRlbV9pZCkge1xyXG5cdFx0dmFyIGl0ZW0gPSBudWxsO1xyXG5cclxuXHRcdHNlbGYuaXRlbXMuc29tZShmdW5jdGlvbihjdXJyZW50X2l0ZW0pIHtcclxuXHRcdFx0aWYgKGN1cnJlbnRfaXRlbS5vYmplY3QuaWQgIT0gaXRlbV9pZCkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aXRlbSA9IGN1cnJlbnRfaXRlbTtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gaXRlbTtcclxuXHR9O1xyXG5cclxuXHRzZWxmLml0ZW1FeGlzdHMgPSBmdW5jdGlvbihpdGVtX2lkKSB7XHJcblx0XHRyZXR1cm4gc2VsZi5nZXRJdGVtQnlJZChpdGVtX2lkKSA/IHRydWUgOiBmYWxzZTtcclxuXHR9O1xyXG5cclxuXHRzZWxmLmNyZWF0ZUl0ZW1PclVwZGF0ZSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuXHRcdHZhciBpdGVtID0gc2VsZi5nZXRJdGVtQnlJZChvcHRpb25zLm9iamVjdC5pZCk7XHJcblxyXG5cdFx0aWYgKGl0ZW0pIHtcclxuXHRcdFx0aXRlbS5vYmplY3QgPSBvcHRpb25zLm9iamVjdDtcclxuXHRcdFx0aXRlbS50eXBpbmdfbWVtYmVycyA9IFtdO1xyXG5cdFx0XHRpdGVtLnJlbmRlcigpO1xyXG5cdFx0XHRpdGVtLnBsYWNlKCk7XHJcblx0XHRcdHJldHVybiBpdGVtO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBuZXcgZGFzaGJvYXJkLm1lc3Nlbmdlci5DaGF0SXRlbShvcHRpb25zLCBzZWxmLCBwYW5lbCk7XHJcblx0fTtcclxuXHJcblx0c2VsZi5jbGVhckl0ZW1zID0gZnVuY3Rpb24oKSB7XHJcblx0XHRzZWxmLml0ZW1zLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xyXG5cdFx0XHRpdGVtLiRyb290LnJlbW92ZSgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0c2VsZi5pdGVtcyA9IFtdO1xyXG5cdFx0c2VsZi4kbG9hZF9tb3JlX2J1dHRvbi5hZGRDbGFzcygnZC1ub25lJyk7XHJcblx0XHRzZWxmLmNvdW50X29mX2NoYXRzX2FmdGVyID0gMDtcclxuXHR9O1xyXG5cclxuXHRzZWxmLmluaXRpYWxpemUgPSBmdW5jdGlvbigpIHtcclxuXHRcdGNvbnNvbGUubG9nKCdbbWVzc2VuZ2VyXScsICc+JywgJ1tjaGF0X2xpc3QuaW5pdGlhbGl6ZV0nLCB7XHJcblx0XHRcdG93bmVyOiBzZWxmLm93bmVyLFxyXG5cdFx0XHRhZnRlcl9sYXN0X21lc3NhZ2VfaWQ6IHNlbGYuaXRlbXNbMF0gPyBzZWxmLml0ZW1zWzBdLm9iamVjdC5sYXN0X21lc3NhZ2VfaWQgOiAwLFxyXG5cdFx0XHRjb3VudDogc2VsZi5pdGVtc19wZXJfcGFnZSxcclxuXHJcblx0XHRcdHNlYXJjaDoge1xyXG5cdFx0XHRcdHF1ZXJ5OiBzZWxmLiRzZWFyY2hfaW5wdXQudmFsKCkudHJpbSgpLFxyXG5cdFx0XHR9LFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmVhbHRpbWUuZW1pdCgnY2hhdF9saXN0LmluaXRpYWxpemUnLCB7XHJcblx0XHRcdG93bmVyOiBzZWxmLm93bmVyLFxyXG5cdFx0XHRhZnRlcl9sYXN0X21lc3NhZ2VfaWQ6IHNlbGYuaXRlbXNbMF0gPyBzZWxmLml0ZW1zWzBdLm9iamVjdC5sYXN0X21lc3NhZ2VfaWQgOiAwLFxyXG5cdFx0XHRjb3VudDogc2VsZi5pdGVtc19wZXJfcGFnZSxcclxuXHJcblx0XHRcdHNlYXJjaDoge1xyXG5cdFx0XHRcdHF1ZXJ5OiBzZWxmLiRzZWFyY2hfaW5wdXQudmFsKCkudHJpbSgpLFxyXG5cdFx0XHR9LFxyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXHJcblxyXG5cdHNlbGYuc2Nyb2xsVG9wID0gZnVuY3Rpb24oaGVpZ2h0KSB7XHJcblx0XHRpZiAoaGVpZ2h0ICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIHNlbGYuJGl0ZW1zLnNjcm9sbFRvcChoZWlnaHQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBzZWxmLiRpdGVtcy5zY3JvbGxUb3AoKTtcclxuXHR9O1xyXG5cclxuXHRzZWxmLnNjcm9sbEJvdHRvbSA9IGZ1bmN0aW9uKGhlaWdodCkge1xyXG5cdFx0aWYgKGhlaWdodCAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybiBzZWxmLnNjcm9sbFRvcChzZWxmLiRpdGVtc1swXS5zY3JvbGxIZWlnaHQgLSAoaGVpZ2h0ICsgc2VsZi4kaXRlbXMub3V0ZXJIZWlnaHQoKSkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBzZWxmLiRpdGVtc1swXS5zY3JvbGxIZWlnaHQgLSAoc2VsZi4kaXRlbXMuc2Nyb2xsVG9wKCkgKyBzZWxmLiRpdGVtcy5vdXRlckhlaWdodCgpKTtcclxuXHR9O1xyXG5cclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cclxuXHJcblx0c2VsZi4kbG9hZF9tb3JlX2J1dHRvbi5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRpZiAoc2VsZi4kbG9hZF9tb3JlX2J1dHRvbi5oYXNDbGFzcygnaXMtbG9hZGluZycpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRzZWxmLiRsb2FkX21vcmVfYnV0dG9uLmFkZENsYXNzKCdpcy1sb2FkaW5nIGRpc2FibGVkJyk7XHJcblxyXG5cdFx0cmVhbHRpbWUuZW1pdCgnY2hhdF9saXN0LmxvYWRfbW9yZScsIHtcclxuXHRcdFx0b3duZXI6IHNlbGYub3duZXIsXHJcblx0XHRcdGJlZm9yZV9sYXN0X21lc3NhZ2VfaWQ6IHNlbGYuaXRlbXNbc2VsZi5pdGVtcy5sZW5ndGggLSAxXS5vYmplY3QubGFzdF9tZXNzYWdlX2lkLFxyXG5cdFx0XHRjb3VudDogc2VsZi5pdGVtc19wZXJfcGFnZSxcclxuXHJcblx0XHRcdHNlYXJjaDoge1xyXG5cdFx0XHRcdHF1ZXJ5OiBzZWxmLiRzZWFyY2hfaW5wdXQudmFsKCkudHJpbSgpLFxyXG5cdFx0XHR9LFxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdHNlbGYuJGl0ZW1zLnNjcm9sbChmdW5jdGlvbigpIHtcclxuXHRcdGlmIChzZWxmLmNvdW50X29mX2NoYXRzX2FmdGVyID4gMCAmJiBzZWxmLnNjcm9sbEJvdHRvbSgpIDwgNTAwKSB7XHJcblx0XHRcdHNlbGYuJGxvYWRfbW9yZV9idXR0b24uY2xpY2soKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0c2VsZi4kc2VhcmNoX2lucHV0Lm9uKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIG9yaWdpbmFsX3ZhbHVlID0gJCh0aGlzKS52YWwoKTtcclxuXHRcdHZhciBmaXhlZF92YWx1ZSA9ICQodGhpcykudmFsKCkucmVwbGFjZSgvXm1haWx0bzovLCAnJyk7XHJcblx0XHQob3JpZ2luYWxfdmFsdWUgIT0gZml4ZWRfdmFsdWUpICYmICQodGhpcykudmFsKGZpeGVkX3ZhbHVlKTtcclxuXHRcdGNsZWFyVGltZW91dChzZWxmLnNlYXJjaF90aW1lb3V0KTtcclxuXHRcdFxyXG5cdFx0c2VsZi5zZWFyY2hfdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdHNlbGYuY2xlYXJJdGVtcygpO1xyXG5cdFx0XHRzZWxmLiRub19pdGVtcy5hZGRDbGFzcygnZC1ub25lJyk7XHJcblx0XHRcdHNlbGYuJGxvYWRlci5yZW1vdmVDbGFzcygnZC1ub25lJyk7XHJcblx0XHRcdHNlbGYuaW5pdGlhbGl6ZSgpO1xyXG5cdFx0fSwgMjAwKTtcclxuXHR9KTtcclxuXHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXHJcblxyXG5cdHJlYWx0aW1lLmF1dGhvcml6ZWQoZnVuY3Rpb24oKSB7XHJcblx0XHRjb25zb2xlLmxvZygnW21lc3Nlbmdlcl0nLCAnW2F1dGhvcml6ZWRdJyk7XHJcblx0XHRzZWxmLmluaXRpYWxpemUoKTtcclxuXHR9KTtcclxuXHJcblx0cmVhbHRpbWUub24oJ2NoYXRfbGlzdC5pbml0aWFsaXplJywgZnVuY3Rpb24oZGF0YSkge1xyXG5cdFx0Y29uc29sZS5sb2coJ1ttZXNzZW5nZXJdJywgJzwnLCAnW2NoYXRfbGlzdC5pbml0aWFsaXplXScsIGRhdGEpO1xyXG5cdFx0c2VsZi4kbG9hZGVyLmFkZENsYXNzKCdkLW5vbmUnKTtcclxuXHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cclxuXHRcdGRhdGEuY2hhdHMuZm9yRWFjaChmdW5jdGlvbihjaGF0KSB7XHJcblx0XHRcdHNlbGYuY3JlYXRlSXRlbU9yVXBkYXRlKHtcclxuXHRcdFx0XHRvYmplY3Q6IGNoYXQsXHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0c2VsZi5jb3VudF9vZl9jaGF0c19hZnRlciA9IGRhdGEuY291bnRfb2ZfY2hhdHNfYWZ0ZXI7XHJcblx0XHRzZWxmLiRsb2FkX21vcmVfYnV0dG9uLnRvZ2dsZUNsYXNzKCdkLW5vbmUnLCBzZWxmLmNvdW50X29mX2NoYXRzX2FmdGVyID09IDApO1xyXG5cdFx0IXNlbGYuaXNfaW5pdGlhbGl6ZWQgJiYgc2VsZi4kc2VhcmNoLnRvZ2dsZUNsYXNzKCdkLW5vbmUnLCBzZWxmLml0ZW1zLmxlbmd0aCA9PSAwKTtcclxuXHRcdHNlbGYuJGl0ZW1zLnRvZ2dsZUNsYXNzKCdkLW5vbmUnLCBzZWxmLml0ZW1zLmxlbmd0aCA9PSAwKTtcclxuXHRcdHNlbGYuJG5vX2l0ZW1zLnRvZ2dsZUNsYXNzKCdkLW5vbmUnLCBzZWxmLml0ZW1zLmxlbmd0aCA+IDApO1xyXG5cdFx0c2VsZi5pc19pbml0aWFsaXplZCA9IHRydWU7XHJcblx0fSk7XHJcblxyXG5cdHJlYWx0aW1lLm9uKCdjaGF0X2xpc3QubG9hZF9tb3JlJywgZnVuY3Rpb24oZGF0YSkge1xyXG5cdFx0Y29uc29sZS5sb2coJ1ttZXNzZW5nZXJdJywgJzwnLCAnW2NoYXRfbGlzdC5sb2FkX21vcmVdJywgZGF0YSk7XHJcblxyXG5cdFx0ZGF0YS5jaGF0cy5mb3JFYWNoKGZ1bmN0aW9uKGNoYXQpIHtcclxuXHRcdFx0c2VsZi5jcmVhdGVJdGVtT3JVcGRhdGUoe1xyXG5cdFx0XHRcdG9iamVjdDogY2hhdCxcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRzZWxmLmNvdW50X29mX2NoYXRzX2FmdGVyID0gZGF0YS5jb3VudF9vZl9jaGF0c19hZnRlcjtcclxuXHRcdGNvbnNvbGUubG9nKCdkYXRhLmNvdW50X29mX2NoYXRzX2FmdGVyJywgZGF0YS5jb3VudF9vZl9jaGF0c19hZnRlcik7XHJcblx0XHRzZWxmLiRsb2FkX21vcmVfYnV0dG9uLnJlbW92ZUNsYXNzKCdpcy1sb2FkaW5nIGRpc2FibGVkJyk7XHJcblx0XHRzZWxmLiRsb2FkX21vcmVfYnV0dG9uLnRvZ2dsZUNsYXNzKCdkLW5vbmUnLCBzZWxmLmNvdW50X29mX2NoYXRzX2FmdGVyID09IDApO1xyXG5cdH0pO1xyXG5cclxuXHRyZWFsdGltZS5vbignY2hhdF9tZXNzYWdlX2NyZWF0ZWQnLCBmdW5jdGlvbihkYXRhKSB7XHJcblx0XHRpZiAoc2VsZi4kc2VhcmNoX2lucHV0LnZhbCgpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0aWYgKHNlbGYub3duZXIudHlwZSAmJiBzZWxmLm93bmVyLnR5cGUgIT0gZGF0YS5vd25lci50eXBlKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoc2VsZi5vd25lci50eXBlICYmIHNlbGYub3duZXIuaWQgJiYgc2VsZi5vd25lci5pZCAhPSBkYXRhLm93bmVyLmlkKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRjb25zb2xlLmxvZygnW21lc3Nlbmdlcl0nLCAnPCcsICdbY2hhdF9tZXNzYWdlX2NyZWF0ZWRdJywgZGF0YSk7XHJcblx0XHR2YXIgY2hhdF9tZXNzYWdlID0gZGF0YTtcclxuXHRcdHZhciBjaGF0ID0gY2hhdF9tZXNzYWdlLmNoYXQ7XHJcblx0XHRkZWxldGUgY2hhdF9tZXNzYWdlLmNoYXQ7XHJcblx0XHRjaGF0Lmxhc3RfbWVzc2FnZSA9IGNoYXRfbWVzc2FnZTtcclxuXHJcblx0XHR2YXIgaXRlbSA9IHNlbGYuY3JlYXRlSXRlbU9yVXBkYXRlKHtcclxuXHRcdFx0b2JqZWN0OiBjaGF0LFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0c2VsZi4kc2VhcmNoLnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxuXHRcdHNlbGYuJGl0ZW1zLnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxuXHRcdHNlbGYuJG5vX2l0ZW1zLmFkZENsYXNzKCdkLW5vbmUnKTtcclxuXHRcdChjaGF0Lmxhc3RfbWVzc2FnZS5hdXRob3JfdXNlcl9pZCAhPSBhdXRoLnVzZXIuaWQpICYmIGl0ZW0uYm91bmNlSW4oKTtcclxuXHR9KTtcclxuXHJcblx0cmVhbHRpbWUub24oJ2NoYXRfbWVzc2FnZV93YXNfcmVhZCcsIGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdGlmICghZGF0YS5jaGF0IHx8IGRhdGEuY2hhdC5jb3VudF9vZl91bnJlYWRfbWVzc2FnZXMgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGl0ZW0gPSBzZWxmLmdldEl0ZW1CeUlkKGRhdGEuY2hhdF9pZCk7XHJcblxyXG5cdFx0aWYgKCFpdGVtKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0Y29uc29sZS5sb2coJ1ttZXNzZW5nZXJdJywgJzwnLCAnW2NoYXRfbWVzc2FnZV93YXNfcmVhZF0nLCBkYXRhKTtcclxuXHRcdGl0ZW0ub2JqZWN0LmNvdW50X29mX3VucmVhZF9tZXNzYWdlcyA9IGRhdGEuY2hhdC5jb3VudF9vZl91bnJlYWRfbWVzc2FnZXM7XHJcblx0XHRpdGVtLnJlbmRlcigpO1xyXG5cdH0pO1xyXG5cclxuXHRyZWFsdGltZS5vbigndHlwaW5nX2NoYXRfbWVzc2FnZScsIGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdHZhciBpdGVtID0gc2VsZi5nZXRJdGVtQnlJZChkYXRhLmNoYXRfaWQpO1xyXG5cclxuXHRcdGlmICghaXRlbS5vYmplY3QgfHwgaXRlbS5vYmplY3QuaWQgIT0gZGF0YS5jaGF0X2lkKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRjb25zb2xlLmxvZygnW21lc3Nlbmdlcl0nLCAnPCcsICd0eXBpbmdfY2hhdF9tZXNzYWdlJywgZGF0YSk7XHJcblx0XHRpdGVtLmFkZFR5cGluZ01lbWJlcihkYXRhLm1lbWJlcik7XHJcblx0XHRpdGVtLnJlbmRlcigpO1xyXG5cdH0pO1xyXG5cclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cclxuXHJcblx0c2VsZi50eXBpbmdfaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuXHRcdHNlbGYuaXRlbXMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XHJcblx0XHRcdGlmIChpdGVtLnR5cGluZ19tZW1iZXJzLmxlbmd0aCA9PSAwKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgdHlwaW5nX21lbWJlcnMgPSBpdGVtLnR5cGluZ19tZW1iZXJzLmZpbHRlcihmdW5jdGlvbih0eXBpbmdfbWVtYmVyKSB7XHJcblx0XHRcdFx0cmV0dXJuIERhdGUubm93KCkgLSB0eXBpbmdfbWVtYmVyLnN0YXJ0ZWRfYXQgPD0gMzAwMDtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpZiAodHlwaW5nX21lbWJlcnMubGVuZ3RoID09IGl0ZW0udHlwaW5nX21lbWJlcnMubGVuZ3RoKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpdGVtLnR5cGluZ19tZW1iZXJzID0gdHlwaW5nX21lbWJlcnM7XHJcblx0XHRcdGl0ZW0ucmVuZGVyKCk7XHJcblx0XHR9KTtcclxuXHR9LCAxMDApO1xyXG59O1xyXG5cclxuZGFzaGJvYXJkLm1lc3Nlbmdlci5DaGF0SXRlbSA9IGZ1bmN0aW9uKG9wdGlvbnMsIGxpc3QsIHBhbmVsKSB7XHJcblx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdHNlbGYub2JqZWN0ID0gb3B0aW9ucy5vYmplY3Q7XHJcblx0c2VsZi50eXBpbmdfbWVtYmVycyA9IFtdO1xyXG5cdHNlbGYuZHJhZ2dpbmcgPSAwO1xyXG5cclxuXHRzZWxmLiRyb290ID0gJChkYXNoYm9hcmQudGVtcGxhdGUoJ2NoYXQtaXRlbScsIHtcclxuXHRcdGl0ZW06IHNlbGYsXHJcblx0XHRjaGF0OiBzZWxmLm9iamVjdCxcclxuXHR9KSkuZGF0YSgnaXRlbScsIHNlbGYpLmluc2VydEJlZm9yZShsaXN0LiRsb2FkX21vcmVfYnV0dG9uKTtcclxuXHJcblx0c2VsZi5yZW5kZXIgPSBmdW5jdGlvbigpIHtcclxuXHRcdHZhciAkcm9vdCA9ICQoZGFzaGJvYXJkLnRlbXBsYXRlKCdjaGF0LWl0ZW0nLCB7XHJcblx0XHRcdGl0ZW06IHNlbGYsXHJcblx0XHRcdGNoYXQ6IHNlbGYub2JqZWN0LFxyXG5cdFx0fSkpO1xyXG5cclxuXHRcdHNlbGYuJHJvb3QuZmluZCgnLmNoYXQtaXRlbV9fdHlwaW5nLW1lbWJlcnMnKS5odG1sKCRyb290LmZpbmQoJy5jaGF0LWl0ZW1fX3R5cGluZy1tZW1iZXJzJykuaHRtbCgpKTtcclxuXHRcdHNlbGYuJHJvb3QuZmluZCgnLmNoYXQtaXRlbV9fbWVzc2FnZScpLmh0bWwoJHJvb3QuZmluZCgnLmNoYXQtaXRlbV9fbWVzc2FnZScpLmh0bWwoKSk7XHJcblx0XHRzZWxmLiRyb290LmZpbmQoJy5jaGF0LWl0ZW1fX3RpbWUnKS5odG1sKCRyb290LmZpbmQoJy5jaGF0LWl0ZW1fX3RpbWUnKS5odG1sKCkpO1xyXG5cdFx0c2VsZi4kcm9vdC5hdHRyKCdjbGFzcycsICRyb290LmF0dHIoJ2NsYXNzJykpO1xyXG5cdH07XHJcblxyXG5cdHNlbGYuYm91bmNlSW4gPSBmdW5jdGlvbigpIHtcclxuXHRcdHNlbGYuJHJvb3QuYWRkQ2xhc3MoJ2FuaW1hdGVkIGJvdW5jZS1pbicpO1xyXG5cdFx0Y2xlYXJUaW1lb3V0KHNlbGYuYm91bmNlSW4udGltZW91dCk7XHJcblxyXG5cdFx0c2VsZi5ib3VuY2VJbi50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0c2VsZi4kcm9vdC5yZW1vdmVDbGFzcygnYW5pbWF0ZWQgYm91bmNlLWluJyk7XHJcblx0XHR9LCA3NTApO1xyXG5cdH07XHJcblxyXG5cdHNlbGYucGxhY2UgPSBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBpbmRleCA9IGxpc3QuaXRlbXMuaW5kZXhPZihzZWxmKTtcclxuXHRcdChpbmRleCA+PSAwKSAmJiBsaXN0Lml0ZW1zLnNwbGljZShsaXN0Lml0ZW1zLmluZGV4T2Yoc2VsZiksIDEpO1xyXG5cdFx0dmFyIG5leHRfaXRlbSA9IG51bGw7XHJcblxyXG5cdFx0bGlzdC5pdGVtcy5zb21lKGZ1bmN0aW9uKGl0ZW0pIHtcclxuXHRcdFx0aWYgKHNlbGYub2JqZWN0Lmxhc3RfbWVzc2FnZV9pZCA8IGl0ZW0ub2JqZWN0Lmxhc3RfbWVzc2FnZV9pZCkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bmV4dF9pdGVtID0gaXRlbTtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpZiAobmV4dF9pdGVtKSB7XHJcblx0XHRcdHNlbGYuJHJvb3QuaW5zZXJ0QmVmb3JlKG5leHRfaXRlbS4kcm9vdCk7XHJcblx0XHRcdGxpc3QuaXRlbXMuc3BsaWNlKGxpc3QuaXRlbXMuaW5kZXhPZihuZXh0X2l0ZW0pLCAwLCBzZWxmKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHNlbGYuJHJvb3QuaW5zZXJ0QmVmb3JlKGxpc3QuJGxvYWRfbW9yZV9idXR0b24pO1xyXG5cdFx0XHRsaXN0Lml0ZW1zLnB1c2goc2VsZik7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0c2VsZi5nZXRUeXBpbmdNZW1iZXJCeUlkID0gZnVuY3Rpb24obWVtYmVyX2lkKSB7XHJcblx0XHR2YXIgZm91bmRfdHlwaW5nX21lbWJlciA9IG51bGw7XHJcblxyXG5cdFx0c2VsZi50eXBpbmdfbWVtYmVycy5zb21lKGZ1bmN0aW9uKHR5cGluZ19tZW1iZXIpIHtcclxuXHRcdFx0aWYgKHR5cGluZ19tZW1iZXIuaWQgIT0gbWVtYmVyX2lkKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRmb3VuZF90eXBpbmdfbWVtYmVyID0gdHlwaW5nX21lbWJlcjtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gZm91bmRfdHlwaW5nX21lbWJlcjtcclxuXHR9O1xyXG5cclxuXHRzZWxmLmFkZFR5cGluZ01lbWJlciA9IGZ1bmN0aW9uKG1lbWJlcikge1xyXG5cdFx0dmFyIGZvdW5kX21lbWJlciA9IHNlbGYuZ2V0VHlwaW5nTWVtYmVyQnlJZChtZW1iZXIuaWQpO1xyXG5cclxuXHRcdGlmIChmb3VuZF9tZW1iZXIpIHtcclxuXHRcdFx0Zm91bmRfbWVtYmVyLnN0YXJ0ZWRfYXQgPSBEYXRlLm5vdygpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bWVtYmVyLnN0YXJ0ZWRfYXQgPSBEYXRlLm5vdygpO1xyXG5cdFx0c2VsZi50eXBpbmdfbWVtYmVycy5wdXNoKG1lbWJlcik7XHJcblx0XHRzZWxmLnJlbmRlcignbWVtYmVycycpO1xyXG5cdH07XHJcblxyXG5cdHNlbGYuJHJvb3QuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcclxuXHRcdGlmIChzZWxmLm9iamVjdC50eXBlID09ICdkaWFsb2cnICYmIHNlbGYub2JqZWN0Lm93bmVyX3R5cGUgPT0gbnVsbCkge1xyXG5cdFx0XHRzbGlkZXVwcy51c2VyX3Byb2ZpbGUoe1xyXG5cdFx0XHRcdHVzZXJfaWQ6IHNlbGYub2JqZWN0Lm9wcG9zaXRlX21lbWJlci51c2VyX2lkLFxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0c2VsZi4kcm9vdC5vbignZHJhZyBkcmFnc3RhcnQgZHJhZ2VuZCBkcmFnb3ZlciBkcmFnZW50ZXIgZHJhZ2xlYXZlIGRyb3AnLCBmdW5jdGlvbihldmVudCkge1xyXG5cdCAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdCAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHR9KS5vbignZHJhZ2VudGVyJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdCsrc2VsZi5kcmFnZ2luZztcclxuXHJcblx0XHRpZiAoc2VsZi5kcmFnZ2luZyA+IDEpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHQgICAgc2VsZi4kcm9vdC5hZGRDbGFzcygnaXMtZHJhZ292ZXInKTtcclxuXHQgICAgc2VsZi4kZHJvcHpvbmVfdGV4dC5hZGRDbGFzcygnYW5pbWF0ZWQgYm91bmNlSW4nKTtcclxuXHR9KS5vbignZHJhZ2xlYXZlIGRyb3AnLCBmdW5jdGlvbigpIHtcclxuXHRcdC0tc2VsZi5kcmFnZ2luZztcclxuXHJcblx0XHRpZiAoc2VsZi5kcmFnZ2luZyA+IDApIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNlbGYuJHJvb3QucmVtb3ZlQ2xhc3MoJ2lzLWRyYWdvdmVyJyk7XHJcblx0XHRzZWxmLiRkcm9wem9uZV90ZXh0LnJlbW92ZUNsYXNzKCdhbmltYXRlZCBib3VuY2VJbicpO1xyXG5cdH0pLm9uKCdkcm9wJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdC8vIHNlbGYudXBsb2FkRmlsZXMoZXZlbnQub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuZmlsZXMgfHwgW10pO1xyXG5cdH0pO1xyXG5cclxuXHRzZWxmLnBsYWNlKCk7XHJcbn07XHJcblxyXG5kYXNoYm9hcmQubWVzc2VuZ2VyLk1lc3NhZ2VQYW5lbCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuXHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0c2VsZi5vYmplY3QgPSBvcHRpb25zLm9iamVjdDtcclxuXHRzZWxmLmNyZWF0ZSA9IG9wdGlvbnMuY3JlYXRlO1xyXG5cdHNlbGYuJHJvb3QgPSAkKG9wdGlvbnMucm9vdCB8fCAnLm1lc3NhZ2UtcGFuZWwnKTtcclxuXHRzZWxmLiRkcm9wem9uZV90ZXh0ID0gc2VsZi4kcm9vdC5maW5kKCcubWVzc2FnZS1wYW5lbC1kcm9wem9uZV9fdGV4dCcpO1xyXG5cdHNlbGYuJGNvbnRlbnQgPSBzZWxmLiRyb290LmZpbmQoJy5tZXNzYWdlLXBhbmVsLWNvbnRlbnQnKTtcclxuXHRzZWxmLiRoaXN0b3J5ID0gc2VsZi4kcm9vdC5maW5kKCcubWVzc2FnZS1wYW5lbC1oaXN0b3J5Jyk7XHJcblx0c2VsZi4kaXRlbXMgPSBzZWxmLiRyb290LmZpbmQoJy5tZXNzYWdlLXBhbmVsLWhpc3RvcnlfX2l0ZW1zJyk7XHJcblx0c2VsZi4kbG9hZF9tb3JlX2JlZm9yZV9idXR0b24gPSBzZWxmLiRyb290LmZpbmQoJy5tZXNzYWdlLXBhbmVsX19sb2FkLW1vcmUtYnV0dG9uLmlzLWJlZm9yZScpO1xyXG5cdHNlbGYuJGxvYWRfbW9yZV9hZnRlcl9idXR0b24gPSBzZWxmLiRyb290LmZpbmQoJy5tZXNzYWdlLXBhbmVsX19sb2FkLW1vcmUtYnV0dG9uLmlzLWFmdGVyJyk7XHJcblx0c2VsZi4kdHlwaW5nX21lbWJlcnMgPSBzZWxmLiRyb290LmZpbmQoJy5tZXNzYWdlLXBhbmVsLWZvcm1fX3R5cGluZy1tZW1iZXJzJyk7XHJcblx0c2VsZi5pdGVtcyA9IFtdO1xyXG5cdHNlbGYuJGZvcm0gPSBzZWxmLiRyb290LmZpbmQoJy5tZXNzYWdlLXBhbmVsLWZvcm0nKTtcclxuXHRzZWxmLiR0ZXh0YXJlYSA9IHNlbGYuJHJvb3QuZmluZCgnLm1lc3NhZ2UtcGFuZWwtZm9ybV9faW5wdXQnKTtcclxuXHRzZWxmLiRidXR0b24gPSBzZWxmLiRyb290LmZpbmQoJy5tZXNzYWdlLXBhbmVsLWZvcm1fX2J1dHRvbicpO1xyXG5cdHNlbGYuJGF0dGFjaG1lbnRfaXRlbXMgPSBzZWxmLiRyb290LmZpbmQoJy5tZXNzYWdlLXBhbmVsLWZvcm1fX2F0dGFjaG1lbnRzJyk7XHJcblx0c2VsZi5hdHRhY2htZW50X2l0ZW1zID0gW107XHJcblx0c2VsZi5zZW5kaW5nX2l0ZW0gPSBudWxsO1xyXG5cdHNlbGYubGFzdF9zZW5kaW5nX2l0ZW1faWQgPSAwO1xyXG5cdHNlbGYuaXRlbXNfcGVyX3BhZ2UgPSAyMDtcclxuXHRzZWxmLnR5cGluZ19tZW1iZXJzID0gW107XHJcblx0c2VsZi5kcmFnZ2luZyA9IDA7XHJcblxyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xyXG5cclxuXHRzZWxmLmdldEl0ZW1CeUlkID0gZnVuY3Rpb24oaXRlbV9pZCkge1xyXG5cdFx0dmFyIGl0ZW0gPSBudWxsO1xyXG5cclxuXHRcdHNlbGYuaXRlbXMuc29tZShmdW5jdGlvbihjdXJyZW50X2l0ZW0pIHtcclxuXHRcdFx0aWYgKGN1cnJlbnRfaXRlbS5vYmplY3QuaWQgIT0gaXRlbV9pZCkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aXRlbSA9IGN1cnJlbnRfaXRlbTtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gaXRlbTtcclxuXHR9O1xyXG5cclxuXHRzZWxmLmdldEl0ZW1CeUxhYmVsID0gZnVuY3Rpb24oaXRlbV9sYWJlbCkge1xyXG5cdFx0dmFyIGl0ZW0gPSBudWxsO1xyXG5cclxuXHRcdHNlbGYuaXRlbXMuc29tZShmdW5jdGlvbihjdXJyZW50X2l0ZW0pIHtcclxuXHRcdFx0aWYgKGN1cnJlbnRfaXRlbS5vYmplY3QubGFiZWwgIT0gaXRlbV9sYWJlbCkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aXRlbSA9IGN1cnJlbnRfaXRlbTtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gaXRlbTtcclxuXHR9O1xyXG5cclxuXHRzZWxmLmNyZWF0ZUl0ZW1PclVwZGF0ZSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuXHRcdHZhciBpdGVtID0gc2VsZi5nZXRJdGVtQnlJZChvcHRpb25zLm9iamVjdC5pZCk7XHJcblxyXG5cdFx0aWYgKCFpdGVtICYmIG9wdGlvbnMub2JqZWN0LmxhYmVsKSB7XHJcblx0XHRcdGl0ZW0gPSBzZWxmLmdldEl0ZW1CeUxhYmVsKG9wdGlvbnMub2JqZWN0LmxhYmVsKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoaXRlbSkge1xyXG5cdFx0XHRpdGVtLm9iamVjdCA9IG9wdGlvbnMub2JqZWN0O1xyXG5cdFx0XHRpdGVtLnJlbmRlcigpO1xyXG5cdFx0XHRyZXR1cm4gaXRlbTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbmV3IGRhc2hib2FyZC5tZXNzZW5nZXIuTWVzc2FnZUl0ZW0ob3B0aW9ucywgc2VsZik7XHJcblx0fTtcclxuXHJcblx0c2VsZi5vcHRpbWl6ZVRleHRhcmVhID0gZnVuY3Rpb24oKSB7XHJcblx0XHRzZWxmLiR0ZXh0YXJlYS5jc3MoJ2hlaWdodCcsICcnKTtcclxuXHRcdHNlbGYuJHRleHRhcmVhLmNzcygnaGVpZ2h0Jywgc2VsZi4kdGV4dGFyZWFbMF0uc2Nyb2xsSGVpZ2h0ICsgJ3B4Jyk7XHJcblx0fTtcclxuXHJcblx0c2VsZi5zY3JvbGxUb3AgPSBmdW5jdGlvbihoZWlnaHQpIHtcclxuXHRcdGlmIChoZWlnaHQgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gc2VsZi4kaGlzdG9yeS5zY3JvbGxUb3AoaGVpZ2h0KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gc2VsZi4kaGlzdG9yeS5zY3JvbGxUb3AoKTtcclxuXHR9O1xyXG5cclxuXHRzZWxmLnNjcm9sbEJvdHRvbSA9IGZ1bmN0aW9uKGhlaWdodCkge1xyXG5cdFx0aWYgKGhlaWdodCAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybiBzZWxmLnNjcm9sbFRvcChzZWxmLiRoaXN0b3J5WzBdLnNjcm9sbEhlaWdodCAtIChoZWlnaHQgKyBzZWxmLiRoaXN0b3J5Lm91dGVySGVpZ2h0KCkpKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gc2VsZi4kaGlzdG9yeVswXS5zY3JvbGxIZWlnaHQgLSAoc2VsZi4kaGlzdG9yeS5zY3JvbGxUb3AoKSArIHNlbGYuJGhpc3Rvcnkub3V0ZXJIZWlnaHQoKSk7XHJcblx0fTtcclxuXHJcblx0c2VsZi5pc0JvdHRvbVNjcm9sbGVkID0gZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gc2VsZi5zY3JvbGxCb3R0b20oKSA8PSA1MDtcclxuXHR9O1xyXG5cclxuXHRzZWxmLmZvY3VzID0gZnVuY3Rpb24oKSB7XHJcblx0XHRzZWxmLiR0ZXh0YXJlYS5mb2N1cygpO1xyXG5cdH07XHJcblxyXG5cdHNlbGYuZ29Ub0l0ZW0gPSBmdW5jdGlvbihpdGVtX2lkKSB7XHJcblx0XHR2YXIgaXRlbSA9IHNlbGYuZ2V0SXRlbUJ5SWQoaXRlbV9pZCk7XHJcblxyXG5cdFx0aWYgKCFpdGVtKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRzZWxmLnNjcm9sbFRvcChpdGVtLiRyb290Lm9mZnNldCgpLnRvcCAtIHNlbGYuJGl0ZW1zLm9mZnNldCgpLnRvcCk7XHJcblx0fTtcclxuXHJcblx0c2VsZi5nZXRGaXJzdFVucmVhZEl0ZW0gPSBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBmb3VuZF9pdGVtID0gbnVsbDtcclxuXHJcblx0XHRzZWxmLml0ZW1zLnNvbWUoZnVuY3Rpb24oaXRlbSkge1xyXG5cdFx0XHRpZiAoaXRlbS5vYmplY3QuaXNfcmVhZCkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Zm91bmRfaXRlbSA9IGl0ZW07XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIGZvdW5kX2l0ZW07XHJcblx0fTtcclxuXHJcblx0c2VsZi5nb1RvRmlyc3RVbnJlYWRJdGVtID0gZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgZmlyc3RfdW5yZWFkX2l0ZW0gPSBzZWxmLmdldEZpcnN0VW5yZWFkSXRlbSgpO1xyXG5cclxuXHRcdGlmICghZmlyc3RfdW5yZWFkX2l0ZW0pIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNlbGYuZ29Ub0l0ZW0oZmlyc3RfdW5yZWFkX2l0ZW0ub2JqZWN0LmlkKTtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH07XHJcblxyXG5cdHNlbGYuZ2V0U2VuZGluZ0l0ZW1zID0gZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gc2VsZi5pdGVtcy5maWx0ZXIoZnVuY3Rpb24oaXRlbSkge1xyXG5cdFx0XHRyZXR1cm4gaXRlbS5pc19zZW5kaW5nO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0c2VsZi5zZW5kID0gZnVuY3Rpb24oKSB7XHJcblx0XHRpZiAoc2VsZi5zZW5kaW5nX2l0ZW0pIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBzZW5kaW5nX2l0ZW1zID0gc2VsZi5nZXRTZW5kaW5nSXRlbXMoKTtcclxuXHJcblx0XHRpZiAoc2VuZGluZ19pdGVtcy5sZW5ndGggPT0gMCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0c2VsZi5zZW5kaW5nX2l0ZW0gPSBzZW5kaW5nX2l0ZW1zWzBdO1xyXG5cclxuXHRcdHJldHVybiAoZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuXHRcdFx0aWYgKCFzZWxmLm9iamVjdCkge1xyXG5cdFx0XHRcdHJldHVybiBzZWxmLmNyZWF0ZSh7XHJcblx0XHRcdFx0XHRsYWJlbDogc2VsZi5zZW5kaW5nX2l0ZW0ub2JqZWN0LmxhYmVsLFxyXG5cdFx0XHRcdFx0dGV4dDogc2VsZi5zZW5kaW5nX2l0ZW0ub2JqZWN0LnRleHQsXHJcblx0XHRcdFx0fSwgY2FsbGJhY2spO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gcmVxdWVzdCh7XHJcblx0XHRcdFx0bWV0aG9kOiAnUE9TVCcsXHJcblx0XHRcdFx0dXJsOiAnL2NoYXRzLycgKyBzZWxmLm9iamVjdC5pZCArICcvbWVzc2FnZXMvY3JlYXRlJyxcclxuXHJcblx0XHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdFx0Y2hhdF9tZXNzYWdlOiB7XHJcblx0XHRcdFx0XHRcdGxhYmVsOiBzZWxmLnNlbmRpbmdfaXRlbS5vYmplY3QubGFiZWwsXHJcblx0XHRcdFx0XHRcdHRleHQ6IHNlbGYuc2VuZGluZ19pdGVtLm9iamVjdC50ZXh0LFxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LCBjYWxsYmFjayk7XHJcblx0XHR9KShmdW5jdGlvbihyZXNwb25zZSkge1xyXG5cdFx0XHRpZiAocmVzcG9uc2UuZXJyb3IpIHtcclxuXHRcdFx0XHRyZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdHNlbGYuc2VuZGluZ19pdGVtID0gbnVsbDtcclxuXHRcdFx0XHRcdHNlbGYuc2VuZCgpO1xyXG5cdFx0XHRcdH0sIDUwMDApO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzZWxmLm9iamVjdCA9IHJlc3BvbnNlLmRhdGEuY2hhdDtcclxuXHRcdFx0ZGVsZXRlIHJlc3BvbnNlLmRhdGEuY2hhdDtcclxuXHRcdFx0c2VsZi5zZW5kaW5nX2l0ZW0ub2JqZWN0ID0gcmVzcG9uc2UuZGF0YTtcclxuXHRcdFx0c2VsZi5zZW5kaW5nX2l0ZW0uaXNfc2VuZGluZyA9IGZhbHNlO1xyXG5cdFx0XHRzZWxmLnNlbmRpbmdfaXRlbS5yZW5kZXIoKTtcclxuXHRcdFx0c2VsZi5zZW5kaW5nX2l0ZW0ucGxhY2UoKTtcclxuXHRcdFx0c2VsZi5zZW5kaW5nX2l0ZW0gPSBudWxsO1xyXG5cdFx0XHQvLyBzZWxmLnNvcnRJdGVtcygpO1xyXG5cdFx0XHRzZWxmLnNlbmQoKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdHNlbGYuZ2V0U2hvd25JdGVtcyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIGhpc3Rvcnlfc2Nyb2xsX3RvcCA9IHNlbGYuJGhpc3Rvcnkuc2Nyb2xsVG9wKCk7XHJcblx0XHR2YXIgaGlzdG9yeV9oZWlnaHQgPSBzZWxmLiRoaXN0b3J5Lm91dGVySGVpZ2h0KCk7XHJcblx0XHR2YXIgaXRlbXNfdG9wX29mZnNldCA9IHNlbGYuJGl0ZW1zLm9mZnNldCgpLnRvcDtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIHNlbGYuaXRlbXMuZmlsdGVyKGZ1bmN0aW9uKGl0ZW0pIHtcclxuXHRcdFx0dmFyIGl0ZW1fcG9zaXRpb24gPSBpdGVtLiRyb290Lm9mZnNldCgpLnRvcCAtIGl0ZW1zX3RvcF9vZmZzZXQ7XHJcblx0XHRcdHZhciBpdGVtX2hlaWdodCA9IGl0ZW0uJHJvb3QuaGVpZ2h0KCk7XHJcblx0XHRcdHJldHVybiAoaXRlbV9wb3NpdGlvbiA+PSBoaXN0b3J5X3Njcm9sbF90b3AgJiYgaXRlbV9wb3NpdGlvbiArIGl0ZW1faGVpZ2h0IDw9IGhpc3Rvcnlfc2Nyb2xsX3RvcCArIGhpc3RvcnlfaGVpZ2h0KTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdHNlbGYubWFrZUFsbEl0ZW1zUmVhZCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0c2VsZi5pdGVtcy5maWx0ZXIoZnVuY3Rpb24oaXRlbSkge1xyXG5cdFx0XHRyZXR1cm4gIWl0ZW0ub2JqZWN0LmlzX3JlYWQ7XHJcblx0XHR9KS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcclxuXHRcdFx0aXRlbS5vYmplY3QuaXNfcmVhZCA9IHRydWU7XHJcblx0XHRcdGl0ZW0ucmVuZGVyKCk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRzZWxmLmNsZWFySXRlbXMgPSBmdW5jdGlvbigpIHtcclxuXHRcdHNlbGYuaXRlbXMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XHJcblx0XHRcdGl0ZW0uJHJvb3QucmVtb3ZlKCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRzZWxmLml0ZW1zID0gW107XHJcblx0XHRzZWxmLiRsb2FkX21vcmVfYmVmb3JlX2J1dHRvbi5hZGRDbGFzcygnZC1ub25lJyk7XHJcblx0XHRzZWxmLiRsb2FkX21vcmVfYWZ0ZXJfYnV0dG9uLmFkZENsYXNzKCdkLW5vbmUnKTtcclxuXHRcdHNlbGYub2JqZWN0LmNvdW50X29mX21lc3NhZ2VzX2JlZm9yZSA9IDA7XHJcblx0XHRzZWxmLm9iamVjdC5jb3VudF9vZl9tZXNzYWdlc19hZnRlciA9IDA7XHJcblx0fTtcclxuXHJcblx0c2VsZi5yZW1vdmVMYXN0UmVhZE1lbWJlcnNCeUlkID0gZnVuY3Rpb24obGFzdF9yZWFkX21lbWJlcl9pZHMpIHtcclxuXHRcdHNlbGYuaXRlbXMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XHJcblx0XHRcdHZhciBsYXN0X3JlYWRfbWVtYmVycyA9IGl0ZW0ub2JqZWN0Lmxhc3RfcmVhZF9tZW1iZXJzLmZpbHRlcihmdW5jdGlvbihsYXN0X3JlYWRfbWVtYmVyKSB7XHJcblx0XHRcdFx0cmV0dXJuIGxhc3RfcmVhZF9tZW1iZXJfaWRzLmluZGV4T2YobGFzdF9yZWFkX21lbWJlci5pZCkgPiAtMTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpZiAobGFzdF9yZWFkX21lbWJlcnMubGVuZ3RoID49IGl0ZW0ub2JqZWN0Lmxhc3RfcmVhZF9tZW1iZXJzLmxlbmd0aCkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aXRlbS5vYmplY3QubGFzdF9yZWFkX21lbWJlcnMgPSBsYXN0X3JlYWRfbWVtYmVycztcclxuXHRcdFx0aXRlbS5yZW5kZXIoKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdHNlbGYuZ2V0VHlwaW5nTWVtYmVyQnlJZCA9IGZ1bmN0aW9uKG1lbWJlcl9pZCkge1xyXG5cdFx0dmFyIGZvdW5kX3R5cGluZ19tZW1iZXIgPSBudWxsO1xyXG5cclxuXHRcdHNlbGYudHlwaW5nX21lbWJlcnMuc29tZShmdW5jdGlvbih0eXBpbmdfbWVtYmVyKSB7XHJcblx0XHRcdGlmICh0eXBpbmdfbWVtYmVyLmlkICE9IG1lbWJlcl9pZCkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Zm91bmRfdHlwaW5nX21lbWJlciA9IHR5cGluZ19tZW1iZXI7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIGZvdW5kX3R5cGluZ19tZW1iZXI7XHJcblx0fTtcclxuXHJcblx0c2VsZi5hZGRUeXBpbmdNZW1iZXIgPSBmdW5jdGlvbihtZW1iZXIpIHtcclxuXHRcdHZhciBmb3VuZF9tZW1iZXIgPSBzZWxmLmdldFR5cGluZ01lbWJlckJ5SWQobWVtYmVyLmlkKTtcclxuXHJcblx0XHRpZiAoZm91bmRfbWVtYmVyKSB7XHJcblx0XHRcdGZvdW5kX21lbWJlci5zdGFydGVkX2F0ID0gRGF0ZS5ub3coKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1lbWJlci5zdGFydGVkX2F0ID0gRGF0ZS5ub3coKTtcclxuXHRcdHNlbGYudHlwaW5nX21lbWJlcnMucHVzaChtZW1iZXIpO1xyXG5cdFx0c2VsZi5yZW5kZXJUeXBpbmdNZW1iZXJzKCk7XHJcblx0fTtcclxuXHJcblx0c2VsZi5yZW5kZXJUeXBpbmdNZW1iZXJzID0gZnVuY3Rpb24oKSB7XHJcblx0XHRzZWxmLiR0eXBpbmdfbWVtYmVycy5odG1sKCcnKTtcclxuXHJcblx0XHRzZWxmLnR5cGluZ19tZW1iZXJzLmZvckVhY2goZnVuY3Rpb24odHlwaW5nX21lbWJlcikge1xyXG5cdFx0XHR2YXIgJGltYWdlID0gJCgnPGltZyAvPicpO1xyXG5cdFx0XHQkaW1hZ2UuYXR0cignc3JjJywgdHlwaW5nX21lbWJlci51c2VyLmltYWdlLnVybHMudGlueSk7XHJcblx0XHRcdCRpbWFnZS5hdHRyKCd0aXRsZScsIHR5cGluZ19tZW1iZXIudXNlci50aXRsZSk7XHJcblx0XHRcdCRpbWFnZS5hcHBlbmRUbyhzZWxmLiR0eXBpbmdfbWVtYmVycyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRzZWxmLiR0eXBpbmdfbWVtYmVycy50b2dnbGVDbGFzcygnaXMtc2hvd24nLCBzZWxmLnR5cGluZ19tZW1iZXJzLmxlbmd0aCA+IDApO1xyXG5cdH07XHJcblxyXG5cdHNlbGYudXBkYXRlTGFzdFJlYWRNZXNzYWdlID0gZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgc2hvd25faXRlbXMgPSBzZWxmLmdldFNob3duSXRlbXMoKTtcclxuXHJcblx0XHRpZiAoc2hvd25faXRlbXMubGVuZ3RoID09IDApIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBsYXN0X3Nob3duX2l0ZW0gPSBzaG93bl9pdGVtc1tzaG93bl9pdGVtcy5sZW5ndGggLSAxXTtcclxuXHJcblx0XHRpZiAobGFzdF9zaG93bl9pdGVtLm9iamVjdC5pZCA+IHNlbGYub2JqZWN0Lmxhc3RfcmVhZF9tZXNzYWdlX2lkKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdbbWVzc2VuZ2VyXScsICc+JywgJ2NoYXRfbWVzc2FnZV93YXNfcmVhZCcsIHtcclxuXHRcdFx0XHRpZDogc2VsZi5vYmplY3QuaWQsXHJcblx0XHRcdFx0bWVzc2FnZV9pZDogbGFzdF9zaG93bl9pdGVtLm9iamVjdC5pZCxcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRyZWFsdGltZS5lbWl0KCdjaGF0X21lc3NhZ2Vfd2FzX3JlYWQnLCB7XHJcblx0XHRcdFx0aWQ6IHNlbGYub2JqZWN0LmlkLFxyXG5cdFx0XHRcdG1lc3NhZ2VfaWQ6IGxhc3Rfc2hvd25faXRlbS5vYmplY3QuaWQsXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0c2VsZi5vYmplY3QubGFzdF9yZWFkX21lc3NhZ2VfaWQgPSBsYXN0X3Nob3duX2l0ZW0ub2JqZWN0LmlkO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdHNlbGYudXBsb2FkRmlsZXMgPSBmdW5jdGlvbihmaWxlcywgY2FsbGJhY2spIHtcclxuXHRcdGZpbGVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZmlsZXMpO1xyXG5cclxuXHRcdGlmIChmaWxlcy5sZW5ndGggPT0gMCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc29sZS5sb2coZmlsZXMpO1xyXG5cdFx0c2VsZi4kcm9vdC5hZGRDbGFzcygnaXMtbG9hZGluZycpO1xyXG5cclxuXHRcdHJldHVybiBzZXJpZXMoZmlsZXMubWFwKGZ1bmN0aW9uKGZpbGUpIHtcclxuXHRcdFx0dmFyIG5vdGlmaWNhdGlvbl9pZCA9IERhdGUubm93KCkudG9TdHJpbmcoMzYpICsgTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc2xpY2UoMik7XHJcblxyXG5cdFx0XHQkLm5vdGlmeSgnVXBsb2FkaW5nOiAwJScsIHtcclxuXHRcdFx0XHRjbGFzc05hbWU6ICdzdWNjZXNzIGlzLScgKyBub3RpZmljYXRpb25faWQsXHJcblx0XHRcdFx0YXV0b0hpZGU6IGZhbHNlLFxyXG5cdFx0XHRcdHNob3dEdXJhdGlvbjogMCxcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHR2YXIgJG5vdGlmaWNhdGlvbiA9ICQoJy5ub3RpZnlqcy1ib290c3RyYXAtYmFzZS5pcy0nICsgbm90aWZpY2F0aW9uX2lkKS5wYXJlbnRzKCcubm90aWZ5anMtd3JhcHBlcicpO1xyXG5cclxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBuZXcgRm9ybURhdGE7XHJcblx0XHRcdFx0ZGF0YS5hcHBlbmQoJ2NoYXRfbWVzc2FnZV9hdHRhY2htZW50W2ZpbGVdJywgZmlsZSk7XHJcblx0XHRcdFx0dmFyIHN0YXJ0ZWRfYXQgPSBEYXRlLm5vdygpO1xyXG5cclxuXHRcdFx0XHRyZXF1ZXN0KHtcclxuXHRcdFx0XHRcdG1ldGhvZDogJ1BPU1QnLFxyXG5cdFx0XHRcdFx0dXJsOiAnL3Byb2plY3RfbWVzc2FnZV9hdHRhY2htZW50cy9jcmVhdGUnLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdGNvbnRlbnRUeXBlOiBmYWxzZSxcclxuXHRcdFx0XHRcdHByb2Nlc3NEYXRhOiBmYWxzZSxcclxuXHJcblx0XHRcdFx0XHRwcm9ncmVzczogZnVuY3Rpb24ocGVyY2VudCkge1xyXG5cdFx0XHRcdFx0XHQkbm90aWZpY2F0aW9uLmZpbmQoJ3NwYW4nKS50ZXh0KCdVcGxvYWRpbmc6ICcgKyBwZXJjZW50ICsgJyUnKTtcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0fSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuXHRcdFx0XHRcdCRub3RpZmljYXRpb24uY2xpY2soKTtcclxuXHJcblx0XHRcdFx0XHRpZiAocmVzcG9uc2UuZXJyb3IpIHtcclxuXHRcdFx0XHRcdFx0JC5ub3RpZnkocmVzcG9uc2UuZXJyb3IsICdlcnJvcicpO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0Ly8gc2VsZi5vYmplY3QuYXR0YWNobWVudHMucHVzaChyZXNwb25zZS5kYXRhKTtcclxuXHRcdFx0XHRcdHJldHVybiBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9O1xyXG5cdFx0fSksIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRzZWxmLiRyb290LnJlbW92ZUNsYXNzKCdpcy1sb2FkaW5nJyk7XHJcblx0XHRcdHJldHVybiBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0c2VsZi5jcmVhdGVBdHRhY2htZW50SXRlbSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuXHRcdHJldHVybiBuZXcgZGFzaGJvYXJkLm1lc3Nlbmdlci5BdHRhY2htZW50SXRlbShvcHRpb25zLCBzZWxmKTtcclxuXHR9O1xyXG5cclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cclxuXHJcblx0c2VsZi50eXBpbmdfaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuXHRcdGlmIChzZWxmLnR5cGluZ19tZW1iZXJzLmxlbmd0aCA9PSAwKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgdHlwaW5nX21lbWJlcnMgPSBzZWxmLnR5cGluZ19tZW1iZXJzLmZpbHRlcihmdW5jdGlvbih0eXBpbmdfbWVtYmVyKSB7XHJcblx0XHRcdHJldHVybiBEYXRlLm5vdygpIC0gdHlwaW5nX21lbWJlci5zdGFydGVkX2F0IDw9IDMwMDA7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpZiAodHlwaW5nX21lbWJlcnMubGVuZ3RoID09IHNlbGYudHlwaW5nX21lbWJlcnMubGVuZ3RoKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRzZWxmLnR5cGluZ19tZW1iZXJzID0gdHlwaW5nX21lbWJlcnM7XHJcblx0XHRzZWxmLnJlbmRlclR5cGluZ01lbWJlcnMoKTtcclxuXHR9LCAxMDApO1xyXG5cclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cclxuXHJcblx0c2VsZi4kdGV4dGFyZWEub24oJ2lucHV0JywgZnVuY3Rpb24oKSB7XHJcblx0XHRzZWxmLm9wdGltaXplVGV4dGFyZWEoKTtcclxuXHRcdFxyXG5cdFx0c2VsZi5vYmplY3QgJiYgcmVhbHRpbWUuZW1pdCgndHlwaW5nX2NoYXRfbWVzc2FnZScsIHtcclxuXHRcdFx0Y2hhdF9pZDogc2VsZi5vYmplY3QuaWQsXHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0c2VsZi4kdGV4dGFyZWEua2V5cHJlc3MoZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdGlmIChldmVudC53aGljaCA9PSAxMykge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRzZWxmLiRmb3JtLnN1Ym1pdCgpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdHNlbGYuJGZvcm0ub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdGlmICghc2VsZi4kdGV4dGFyZWEudmFsKCkpIHtcclxuXHRcdFx0c2VsZi4kdGV4dGFyZWEuZm9jdXMoKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChzZWxmLm9iamVjdCAmJiBzZWxmLm9iamVjdC5jb3VudF9vZl9tZXNzYWdlc19hZnRlciA+IDApIHtcclxuXHRcdFx0c2VsZi5jbGVhckl0ZW1zKCk7XHJcblxyXG5cdFx0XHRyZWFsdGltZS5lbWl0KCdtZXNzYWdlX3BhbmVsLmluaXRpYWxpemUnLCB7XHJcblx0XHRcdFx0aWQ6IHNlbGYub2JqZWN0LmlkLFxyXG5cdFx0XHRcdGNvdW50OiBzZWxmLml0ZW1zX3Blcl9wYWdlLFxyXG5cdFx0XHRcdGFmdGVyX21lc3NhZ2VfaWQ6IDAsXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdG5ldyBkYXNoYm9hcmQubWVzc2VuZ2VyLk1lc3NhZ2VJdGVtKHtcclxuXHRcdFx0aXNfc2VuZGluZzogdHJ1ZSxcclxuXHJcblx0XHRcdG9iamVjdDoge1xyXG5cdFx0XHRcdGxhYmVsOiBEYXRlLm5vdygpLnRvU3RyaW5nKDM2KSArIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnNsaWNlKDEpLFxyXG5cdFx0XHRcdHRleHQ6IHNlbGYuJHRleHRhcmVhLnZhbCgpLFxyXG5cdFx0XHRcdGF1dGhvcl91c2VyX2lkOiBhdXRoLnVzZXIuaWQsXHJcblx0XHRcdFx0dXNlcjogYXV0aC51c2VyLFxyXG5cdFx0XHRcdGNyZWF0ZWRfYXQ6IG1vbWVudCgpLnRvSVNPU3RyaW5nKCksXHJcblx0XHRcdFx0dXBkYXRlZF9hdDogbW9tZW50KCkudG9JU09TdHJpbmcoKSxcclxuXHRcdFx0XHRpc19yZWFkOiB0cnVlLFxyXG5cdFx0XHRcdGxhc3RfcmVhZF9tZW1iZXJzOiBbXSxcclxuXHRcdFx0fSxcclxuXHRcdH0sIHNlbGYpO1xyXG5cclxuXHRcdHNlbGYuc2Nyb2xsQm90dG9tKDApO1xyXG5cdFx0c2VsZi4kdGV4dGFyZWEudmFsKCcnKTtcclxuXHRcdHNlbGYub3B0aW1pemVUZXh0YXJlYSgpO1xyXG5cdFx0c2VsZi5tYWtlQWxsSXRlbXNSZWFkKCk7XHJcblx0fSk7XHJcblxyXG5cdHNlbGYuJGhpc3Rvcnkuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG5cdFx0c2VsZi51cGRhdGVMYXN0UmVhZE1lc3NhZ2UoKTtcclxuXHJcblx0XHRpZiAoc2VsZi5vYmplY3QuY291bnRfb2ZfbWVzc2FnZXNfYmVmb3JlID4gMCAmJiBzZWxmLnNjcm9sbFRvcCgpIDwgNTAwKSB7XHJcblx0XHRcdHNlbGYuJGxvYWRfbW9yZV9iZWZvcmVfYnV0dG9uLmNsaWNrKCk7XHJcblx0XHR9IGVsc2UgaWYgKHNlbGYub2JqZWN0LmNvdW50X29mX21lc3NhZ2VzX2FmdGVyID4gMCAmJiBzZWxmLnNjcm9sbEJvdHRvbSgpIDwgNTAwKSB7XHJcblx0XHRcdHNlbGYuJGxvYWRfbW9yZV9hZnRlcl9idXR0b24uY2xpY2soKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0c2VsZi4kcm9vdC5vbignZHJhZyBkcmFnc3RhcnQgZHJhZ2VuZCBkcmFnb3ZlciBkcmFnZW50ZXIgZHJhZ2xlYXZlIGRyb3AnLCBmdW5jdGlvbihldmVudCkge1xyXG5cdCAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdCAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHR9KS5vbignZHJhZ2VudGVyJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdCsrc2VsZi5kcmFnZ2luZztcclxuXHJcblx0XHRpZiAoc2VsZi5kcmFnZ2luZyA+IDEpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHQgICAgc2VsZi4kcm9vdC5hZGRDbGFzcygnaXMtZHJhZ292ZXInKTtcclxuXHQgICAgc2VsZi4kZHJvcHpvbmVfdGV4dC5hZGRDbGFzcygnYW5pbWF0ZWQgYm91bmNlSW4nKTtcclxuXHR9KS5vbignZHJhZ2xlYXZlIGRyb3AnLCBmdW5jdGlvbigpIHtcclxuXHRcdC0tc2VsZi5kcmFnZ2luZztcclxuXHJcblx0XHRpZiAoc2VsZi5kcmFnZ2luZyA+IDApIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNlbGYuJHJvb3QucmVtb3ZlQ2xhc3MoJ2lzLWRyYWdvdmVyJyk7XHJcblx0XHRzZWxmLiRkcm9wem9uZV90ZXh0LnJlbW92ZUNsYXNzKCdhbmltYXRlZCBib3VuY2VJbicpO1xyXG5cdH0pLm9uKCdkcm9wJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdHNlbGYudXBsb2FkRmlsZXMoZXZlbnQub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuZmlsZXMgfHwgW10pO1xyXG5cdH0pO1xyXG5cclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cclxuXHJcblx0c2VsZi4kbG9hZF9tb3JlX2JlZm9yZV9idXR0b24uY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0aWYgKHNlbGYuJGxvYWRfbW9yZV9iZWZvcmVfYnV0dG9uLmhhc0NsYXNzKCdpcy1sb2FkaW5nJykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNlbGYuJGxvYWRfbW9yZV9iZWZvcmVfYnV0dG9uLmFkZENsYXNzKCdpcy1sb2FkaW5nIGRpc2FibGVkJyk7XHJcblxyXG5cdFx0Y29uc29sZS5sb2coJ1ttZXNzZW5nZXJdJywgJz4nLCAnbWVzc2FnZV9wYW5lbC5sb2FkX21vcmUnLCB7XHJcblx0XHRcdGlkOiBzZWxmLm9iamVjdC5pZCxcclxuXHRcdFx0YmVmb3JlX21lc3NhZ2VfaWQ6IHNlbGYuaXRlbXNbMF0ub2JqZWN0LmlkLFxyXG5cdFx0XHRjb3VudDogc2VsZi5pdGVtc19wZXJfcGFnZSxcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJlYWx0aW1lLmVtaXQoJ21lc3NhZ2VfcGFuZWwubG9hZF9tb3JlJywge1xyXG5cdFx0XHRpZDogc2VsZi5vYmplY3QuaWQsXHJcblx0XHRcdGJlZm9yZV9tZXNzYWdlX2lkOiBzZWxmLml0ZW1zWzBdLm9iamVjdC5pZCxcclxuXHRcdFx0Y291bnQ6IHNlbGYuaXRlbXNfcGVyX3BhZ2UsXHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0c2VsZi4kbG9hZF9tb3JlX2FmdGVyX2J1dHRvbi5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRpZiAoc2VsZi4kbG9hZF9tb3JlX2FmdGVyX2J1dHRvbi5oYXNDbGFzcygnaXMtbG9hZGluZycpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRzZWxmLiRsb2FkX21vcmVfYWZ0ZXJfYnV0dG9uLmFkZENsYXNzKCdpcy1sb2FkaW5nIGRpc2FibGVkJyk7XHJcblxyXG5cdFx0Y29uc29sZS5sb2coJ1ttZXNzZW5nZXJdJywgJz4nLCAnbWVzc2FnZV9wYW5lbC5sb2FkX21vcmUnLCB7XHJcblx0XHRcdGlkOiBzZWxmLm9iamVjdC5pZCxcclxuXHRcdFx0YWZ0ZXJfbWVzc2FnZV9pZDogc2VsZi5pdGVtc1tzZWxmLml0ZW1zLmxlbmd0aCAtIDFdLm9iamVjdC5pZCxcclxuXHRcdFx0Y291bnQ6IHNlbGYuaXRlbXNfcGVyX3BhZ2UsXHJcblx0XHR9KTtcclxuXHJcblx0XHRyZWFsdGltZS5lbWl0KCdtZXNzYWdlX3BhbmVsLmxvYWRfbW9yZScsIHtcclxuXHRcdFx0aWQ6IHNlbGYub2JqZWN0LmlkLFxyXG5cdFx0XHRhZnRlcl9tZXNzYWdlX2lkOiBzZWxmLml0ZW1zW3NlbGYuaXRlbXMubGVuZ3RoIC0gMV0ub2JqZWN0LmlkLFxyXG5cdFx0XHRjb3VudDogc2VsZi5pdGVtc19wZXJfcGFnZSxcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cclxuXHJcblx0cmVhbHRpbWUuYXV0aG9yaXplZChmdW5jdGlvbigpIHtcclxuXHRcdGlmICghc2VsZi5vYmplY3QpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnNvbGUubG9nKCdbbWVzc2VuZ2VyXScsICdbYXV0aG9yaXplZF0nKTtcclxuXHJcblx0XHRjb25zb2xlLmxvZygnW21lc3Nlbmdlcl0nLCAnPicsICdtZXNzYWdlX3BhbmVsLmluaXRpYWxpemUnLCB7XHJcblx0XHRcdGlkOiBzZWxmLm9iamVjdC5pZCxcclxuXHRcdFx0Y291bnQ6IHNlbGYuaXRlbXNfcGVyX3BhZ2UsXHJcblx0XHRcdGFmdGVyX21lc3NhZ2VfaWQ6IChzZWxmLml0ZW1zLmxlbmd0aCA+IDAgPyBzZWxmLml0ZW1zW3NlbGYuaXRlbXMubGVuZ3RoIC0gMV0ub2JqZWN0LmlkIDogMCksXHJcblx0XHR9KTtcclxuXHJcblx0XHRyZWFsdGltZS5lbWl0KCdtZXNzYWdlX3BhbmVsLmluaXRpYWxpemUnLCB7XHJcblx0XHRcdGlkOiBzZWxmLm9iamVjdC5pZCxcclxuXHRcdFx0Y291bnQ6IHNlbGYuaXRlbXNfcGVyX3BhZ2UsXHJcblx0XHRcdGFmdGVyX21lc3NhZ2VfaWQ6IChzZWxmLml0ZW1zLmxlbmd0aCA+IDAgPyBzZWxmLml0ZW1zW3NlbGYuaXRlbXMubGVuZ3RoIC0gMV0ub2JqZWN0LmlkIDogMCksXHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0cmVhbHRpbWUub24oJ21lc3NhZ2VfcGFuZWwuaW5pdGlhbGl6ZScsIGZ1bmN0aW9uKGNoYXQpIHtcclxuXHRcdGNvbnNvbGUubG9nKCdbbWVzc2VuZ2VyXScsICc8JywgJ21lc3NhZ2VfcGFuZWwuaW5pdGlhbGl6ZScsIGNoYXQpO1xyXG5cdFx0c2VsZi5vYmplY3QgPSBjaGF0O1xyXG5cdFx0Ly8gdmFyIHdhc19ib3R0b21fc2Nyb2xsZWQgPSBzZWxmLmlzQm90dG9tU2Nyb2xsZWQoKTtcclxuXHJcblx0XHRjaGF0Lm1lc3NhZ2VzLmZvckVhY2goZnVuY3Rpb24obWVzc2FnZSkge1xyXG5cdFx0XHRzZWxmLmNyZWF0ZUl0ZW1PclVwZGF0ZSh7XHJcblx0XHRcdFx0b2JqZWN0OiBtZXNzYWdlLFxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHNlbGYuJGxvYWRfbW9yZV9iZWZvcmVfYnV0dG9uLnRvZ2dsZUNsYXNzKCdkLW5vbmUnLCBzZWxmLm9iamVjdC5jb3VudF9vZl9tZXNzYWdlc19iZWZvcmUgPT0gMCk7XHJcblx0XHRzZWxmLiRsb2FkX21vcmVfYWZ0ZXJfYnV0dG9uLnRvZ2dsZUNsYXNzKCdkLW5vbmUnLCBzZWxmLm9iamVjdC5jb3VudF9vZl9tZXNzYWdlc19hZnRlciA9PSAwKTtcclxuXHRcdHNlbGYuZ29Ub0ZpcnN0VW5yZWFkSXRlbSgpIHx8IHNlbGYuc2Nyb2xsQm90dG9tKDApO1xyXG5cdFx0c2VsZi51cGRhdGVMYXN0UmVhZE1lc3NhZ2UoKTtcclxuXHR9KTtcclxuXHJcblx0cmVhbHRpbWUub24oJ21lc3NhZ2VfcGFuZWwubG9hZF9tb3JlJywgZnVuY3Rpb24oY2hhdCkge1xyXG5cdFx0Y29uc29sZS5sb2coJ1ttZXNzZW5nZXJdJywgJzwnLCAnbWVzc2FnZV9wYW5lbC5sb2FkX21vcmUnLCBjaGF0KTtcclxuXHJcblx0XHRpZiAoIXNlbGYub2JqZWN0IHx8IGNoYXQuaWQgIT0gc2VsZi5vYmplY3QuaWQpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChjaGF0LmJlZm9yZV9tZXNzYWdlX2lkKSB7XHJcblx0XHRcdHZhciBzY3JvbGxfYm90dG9tID0gc2VsZi5zY3JvbGxCb3R0b20oKTtcclxuXHJcblx0XHRcdGNoYXQubWVzc2FnZXMuc29ydChmdW5jdGlvbihtZXNzYWdlMSwgbWVzc2FnZTApIHtcclxuXHRcdFx0XHRyZXR1cm4gbWVzc2FnZTEuaWQgLSBtZXNzYWdlMC5pZDtcclxuXHRcdFx0fSkuZm9yRWFjaChmdW5jdGlvbihtZXNzYWdlKSB7XHJcblx0XHRcdFx0c2VsZi5jcmVhdGVJdGVtT3JVcGRhdGUoe1xyXG5cdFx0XHRcdFx0b2JqZWN0OiBtZXNzYWdlLFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHNlbGYub2JqZWN0LmNvdW50X29mX21lc3NhZ2VzX2JlZm9yZSA9IGNoYXQuY291bnRfb2ZfbWVzc2FnZXNfYmVmb3JlO1xyXG5cdFx0XHRzZWxmLiRsb2FkX21vcmVfYmVmb3JlX2J1dHRvbi5yZW1vdmVDbGFzcygnaXMtbG9hZGluZyBkaXNhYmxlZCcpO1xyXG5cdFx0XHRzZWxmLiRsb2FkX21vcmVfYmVmb3JlX2J1dHRvbi50b2dnbGVDbGFzcygnZC1ub25lJywgc2VsZi5vYmplY3QuY291bnRfb2ZfbWVzc2FnZXNfYmVmb3JlID09IDApO1xyXG5cdFx0XHRzZWxmLnNjcm9sbEJvdHRvbShzY3JvbGxfYm90dG9tKTtcclxuXHRcdH0gZWxzZSBpZiAoY2hhdC5hZnRlcl9tZXNzYWdlX2lkKSB7XHJcblx0XHRcdHZhciBzY3JvbGxfdG9wID0gc2VsZi5zY3JvbGxUb3AoKTtcclxuXHJcblx0XHRcdGNoYXQubWVzc2FnZXMuc29ydChmdW5jdGlvbihtZXNzYWdlMSwgbWVzc2FnZTApIHtcclxuXHRcdFx0XHRyZXR1cm4gbWVzc2FnZTEuaWQgLSBtZXNzYWdlMC5pZDtcclxuXHRcdFx0fSkuZm9yRWFjaChmdW5jdGlvbihtZXNzYWdlKSB7XHJcblx0XHRcdFx0c2VsZi5jcmVhdGVJdGVtT3JVcGRhdGUoe1xyXG5cdFx0XHRcdFx0b2JqZWN0OiBtZXNzYWdlLFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHNlbGYub2JqZWN0LmNvdW50X29mX21lc3NhZ2VzX2FmdGVyID0gY2hhdC5jb3VudF9vZl9tZXNzYWdlc19hZnRlcjtcclxuXHRcdFx0c2VsZi4kbG9hZF9tb3JlX2FmdGVyX2J1dHRvbi5yZW1vdmVDbGFzcygnaXMtbG9hZGluZyBkaXNhYmxlZCcpO1xyXG5cdFx0XHRzZWxmLiRsb2FkX21vcmVfYWZ0ZXJfYnV0dG9uLnRvZ2dsZUNsYXNzKCdkLW5vbmUnLCBzZWxmLm9iamVjdC5jb3VudF9vZl9tZXNzYWdlc19hZnRlciA9PSAwKTtcclxuXHRcdFx0c2VsZi5zY3JvbGxUb3Aoc2Nyb2xsX3RvcCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdHJlYWx0aW1lLm9uKCdjaGF0X21lc3NhZ2VfY3JlYXRlZCcsIGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdGlmICghc2VsZi5vYmplY3QgfHwgc2VsZi5vYmplY3QuaWQgIT0gZGF0YS5jaGF0X2lkKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRjb25zb2xlLmxvZygnW21lc3Nlbmdlcl0nLCAnPCcsICdjaGF0X21lc3NhZ2VfY3JlYXRlZCcsIGRhdGEpO1xyXG5cdFx0dmFyIHdhc19ib3R0b21fc2Nyb2xsZWQgPSBzZWxmLmlzQm90dG9tU2Nyb2xsZWQoKTtcclxuXHJcblx0XHR2YXIgaXRlbSA9IHNlbGYuY3JlYXRlSXRlbU9yVXBkYXRlKHtcclxuXHRcdFx0b2JqZWN0OiBkYXRhLFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0d2FzX2JvdHRvbV9zY3JvbGxlZCAmJiBzZWxmLnNjcm9sbEJvdHRvbSgwKTtcclxuXHRcdChkYXRhLmF1dGhvcl91c2VyX2lkICE9IGF1dGgudXNlci5pZCkgJiYgaXRlbS5ib3VuY2VJbigpO1xyXG5cdFx0c2VsZi50eXBpbmdfbWVtYmVycyA9IFtdO1xyXG5cdFx0c2VsZi5yZW5kZXJUeXBpbmdNZW1iZXJzKCk7XHJcblx0fSk7XHJcblxyXG5cdHJlYWx0aW1lLm9uKCdjaGF0X21lc3NhZ2Vfd2FzX3JlYWQnLCBmdW5jdGlvbihkYXRhKSB7XHJcblx0XHRpZiAoIXNlbGYub2JqZWN0IHx8IHNlbGYub2JqZWN0LmlkICE9IGRhdGEuY2hhdF9pZCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc29sZS5sb2coJ1ttZXNzZW5nZXJdJywgJzwnLCAnY2hhdF9tZXNzYWdlX3dhc19yZWFkJywgZGF0YSk7XHJcblxyXG5cdFx0dmFyIGl0ZW0gPSBzZWxmLmdldEl0ZW1CeUlkKGRhdGEuaWQpO1xyXG5cclxuXHRcdGlmICghaXRlbSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHdhc19ib3R0b21fc2Nyb2xsZWQgPSBzZWxmLmlzQm90dG9tU2Nyb2xsZWQoKTtcclxuXHRcdHNlbGYucmVtb3ZlTGFzdFJlYWRNZW1iZXJzQnlJZChpdGVtLm9iamVjdC5sYXN0X3JlYWRfbWVtYmVycy5tYXAoZnVuY3Rpb24obGFzdF9yZWFkX21lbWJlcikge1xyXG5cdFx0XHRyZXR1cm4gbGFzdF9yZWFkX21lbWJlci5pZDtcclxuXHRcdH0pKTtcclxuXHJcblx0XHRpdGVtLm9iamVjdC5sYXN0X3JlYWRfbWVtYmVycyA9IGRhdGEubGFzdF9yZWFkX21lbWJlcnM7XHJcblx0XHRpdGVtLnJlbmRlcigpO1xyXG5cdFx0d2FzX2JvdHRvbV9zY3JvbGxlZCAmJiBzZWxmLnNjcm9sbEJvdHRvbSgwKTtcclxuXHR9KTtcclxuXHJcblx0cmVhbHRpbWUub24oJ3R5cGluZ19jaGF0X21lc3NhZ2UnLCBmdW5jdGlvbihkYXRhKSB7XHJcblx0XHRpZiAoIXNlbGYub2JqZWN0IHx8IHNlbGYub2JqZWN0LmlkICE9IGRhdGEuY2hhdF9pZCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc29sZS5sb2coJ1ttZXNzZW5nZXJdJywgJzwnLCAndHlwaW5nX2NoYXRfbWVzc2FnZScsIGRhdGEpO1xyXG5cdFx0c2VsZi5hZGRUeXBpbmdNZW1iZXIoZGF0YS5tZW1iZXIpO1xyXG5cdFx0c2VsZi5yZW5kZXJUeXBpbmdNZW1iZXJzKCk7XHJcblx0fSk7XHJcblxyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xyXG5cclxuXHRzZWxmLiRyb290LmRhdGEoJ3BhbmVsJywgc2VsZik7XHJcblxyXG5cdGlmIChzZWxmLm9iamVjdCkge1xyXG5cdFx0b3B0aW9ucy5vYmplY3QubWVzc2FnZXMuZm9yRWFjaChmdW5jdGlvbihtZXNzYWdlKSB7XHJcblx0XHRcdHNlbGYuY3JlYXRlSXRlbU9yVXBkYXRlKHtcclxuXHRcdFx0XHRvYmplY3Q6IG1lc3NhZ2UsXHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZGVsZXRlIG9wdGlvbnMub2JqZWN0Lm1lc3NhZ2VzO1xyXG5cdFx0c2VsZi4kbG9hZF9tb3JlX2JlZm9yZV9idXR0b24udG9nZ2xlQ2xhc3MoJ2Qtbm9uZScsIHNlbGYub2JqZWN0LmNvdW50X29mX21lc3NhZ2VzX2JlZm9yZSA9PSAwKTtcclxuXHRcdHNlbGYuJGxvYWRfbW9yZV9hZnRlcl9idXR0b24udG9nZ2xlQ2xhc3MoJ2Qtbm9uZScsIHNlbGYub2JqZWN0LmNvdW50X29mX21lc3NhZ2VzX2FmdGVyID09IDApO1xyXG5cdFx0c2VsZi5nb1RvRmlyc3RVbnJlYWRJdGVtKCkgfHwgc2VsZi5zY3JvbGxCb3R0b20oMCk7XHJcblx0fVxyXG59O1xyXG5cclxuZGFzaGJvYXJkLm1lc3Nlbmdlci5NZXNzYWdlSXRlbSA9IGZ1bmN0aW9uKG9wdGlvbnMsIHBhbmVsKSB7XHJcblx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdHNlbGYuaXNfc2VuZGluZyA9IG9wdGlvbnMuaXNfc2VuZGluZyB8fCBmYWxzZTtcclxuXHRzZWxmLm9iamVjdCA9IG9wdGlvbnMub2JqZWN0O1xyXG5cclxuXHRpZiAoc2VsZi5pc19zZW5kaW5nKSB7XHJcblx0XHRzZWxmLm9iamVjdC5pZCA9IC0tcGFuZWwubGFzdF9zZW5kaW5nX2l0ZW1faWQ7XHJcblx0fVxyXG5cclxuXHRzZWxmLmlzX3dyaXR0ZW5fYnlfbWUgPSAoc2VsZi5vYmplY3QuYXV0aG9yX3VzZXJfaWQgPT0gYXV0aC51c2VyLmlkKTtcclxuXHJcblx0c2VsZi4kcm9vdCA9ICQoZGFzaGJvYXJkLnRlbXBsYXRlKCdtZXNzYWdlLWl0ZW0nLCB7XHJcblx0XHRpdGVtOiBzZWxmLFxyXG5cdFx0bWVzc2FnZTogc2VsZi5vYmplY3QsXHJcblx0fSkpLmRhdGEoJ2l0ZW0nLCBzZWxmKTtcclxuXHJcblx0c2VsZi4kd3JhcHBlciA9IHNlbGYuJHJvb3QuZmluZCgnLm1lc3NhZ2UtaXRlbV9fd3JhcHBlcicpO1xyXG5cclxuXHRzZWxmLnJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyICRyb290ID0gJChkYXNoYm9hcmQudGVtcGxhdGUoJ21lc3NhZ2UtaXRlbScsIHtcclxuXHRcdFx0aXRlbTogc2VsZixcclxuXHRcdFx0bWVzc2FnZTogc2VsZi5vYmplY3QsXHJcblx0XHRcdGNoYXQ6IHBhbmVsLm9iamVjdCxcclxuXHRcdH0pKTtcclxuXHJcblx0XHRzZWxmLiRyb290Lmh0bWwoJHJvb3QuaHRtbCgpKTtcclxuXHRcdHNlbGYuJHJvb3QuYXR0cignY2xhc3MnLCAkcm9vdC5hdHRyKCdjbGFzcycpKTtcclxuXHRcdHNlbGYuJHJvb3QuYXR0cignZGF0YS1pZCcsICRyb290LmF0dHIoJ2RhdGEtaWQnKSk7XHJcblx0fTtcclxuXHJcblx0c2VsZi5wbGFjZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIGluZGV4ID0gcGFuZWwuaXRlbXMuaW5kZXhPZihzZWxmKTtcclxuXHRcdChpbmRleCA+PSAwKSAmJiBwYW5lbC5pdGVtcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG5cdFx0dmFyIG5leHRfaXRlbSA9IG51bGw7XHJcblxyXG5cdFx0cGFuZWwuaXRlbXMuc29tZShmdW5jdGlvbihpdGVtKSB7XHJcblx0XHRcdGlmIChpdGVtLm9iamVjdC5pZCA+IDApIHtcclxuXHRcdFx0XHRpZiAoc2VsZi5vYmplY3QuaWQgPiAwKSB7XHJcblx0XHRcdFx0XHRpZiAoc2VsZi5vYmplY3QuaWQgPCBpdGVtLm9iamVjdC5pZCkge1xyXG5cdFx0XHRcdFx0XHRuZXh0X2l0ZW0gPSBpdGVtO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChzZWxmLm9iamVjdC5pZCA+IDApIHtcclxuXHRcdFx0XHRuZXh0X2l0ZW0gPSBpdGVtO1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoc2VsZi5vYmplY3QuaWQgPiBpdGVtLm9iamVjdC5pZCkge1xyXG5cdFx0XHRcdG5leHRfaXRlbSA9IGl0ZW07XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmIChuZXh0X2l0ZW0pIHtcclxuXHRcdFx0c2VsZi4kcm9vdC5pbnNlcnRCZWZvcmUobmV4dF9pdGVtLiRyb290KTtcclxuXHRcdFx0cGFuZWwuaXRlbXMuc3BsaWNlKHBhbmVsLml0ZW1zLmluZGV4T2YobmV4dF9pdGVtKSwgMCwgc2VsZik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzZWxmLiRyb290Lmluc2VydEJlZm9yZShwYW5lbC4kbG9hZF9tb3JlX2FmdGVyX2J1dHRvbik7XHJcblx0XHRcdHBhbmVsLml0ZW1zLnB1c2goc2VsZik7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0c2VsZi5ib3VuY2VJbiA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0c2VsZi4kd3JhcHBlci5hZGRDbGFzcygnYW5pbWF0ZWQgYm91bmNlLWluJyk7XHJcblx0XHRjbGVhclRpbWVvdXQoc2VsZi5ib3VuY2VJbi50aW1lb3V0KTtcclxuXHJcblx0XHRzZWxmLmJvdW5jZUluLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRzZWxmLiR3cmFwcGVyLnJlbW92ZUNsYXNzKCdhbmltYXRlZCBib3VuY2UtaW4nKTtcclxuXHRcdH0sIDc1MCk7XHJcblx0fTtcclxuXHJcblx0c2VsZi5yZW1vdmUgPSBmdW5jdGlvbigpIHtcclxuXHRcdHNlbGYuJHJvb3QucmVtb3ZlKCk7XHJcblx0XHR2YXIgaW5kZXggPSBwYW5lbC5pdGVtcy5pbmRleE9mKHNlbGYpO1xyXG5cdFx0KGluZGV4ID4gLTEpICYmIHBhbmVsLml0ZW1zLnNwbGljZShpbmRleCwgMSk7XHJcblx0fTtcclxuXHJcblx0c2VsZi5wbGFjZSgpO1xyXG5cdHNlbGYuaXNfc2VuZGluZyAmJiBwYW5lbC5zZW5kKCk7XHJcbn07XHJcblxyXG5kYXNoYm9hcmQubWVzc2VuZ2VyLkF0dGFjaG1lbnRJdGVtID0gZnVuY3Rpb24ob3B0aW9ucywgcGFuZWwpIHtcclxuXHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0c2VsZi5vYmplY3QgPSBvcHRpb25zLm9iamVjdDtcclxuXHJcblx0c2VsZi4kcm9vdCA9ICQoZGFzaGJvYXJkLnRlbXBsYXRlKCdtZXNzYWdlLXBhbmVsLWF0dGFjaG1lbnQtaXRlbScsIHtcclxuXHRcdGF0dGFjaG1lbnQ6IHNlbGYub2JqZWN0LFxyXG5cdH0pKS5kYXRhKCdpdGVtJywgc2VsZik7XHJcblxyXG5cdHNlbGYucmVuZGVyID0gZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgJHJvb3QgPSAkKGRhc2hib2FyZC50ZW1wbGF0ZSgnbWVzc2FnZS1wYW5lbC1hdHRhY2htZW50LWl0ZW0nLCB7XHJcblx0XHRcdGF0dGFjaG1lbnQ6IHNlbGYub2JqZWN0LFxyXG5cdFx0fSkpO1xyXG5cclxuXHRcdHNlbGYuJHJvb3QuaHRtbCgkcm9vdC5odG1sKCkpO1xyXG5cdFx0c2VsZi4kcm9vdC5hdHRyKCdjbGFzcycsICRyb290LmF0dHIoJ2NsYXNzJykpO1xyXG5cdFx0c2VsZi4kcm9vdC5hdHRyKCdkYXRhLWlkJywgJHJvb3QuYXR0cignZGF0YS1pZCcpKTtcclxuXHR9O1xyXG5cclxuXHRzZWxmLmJvdW5jZUluID0gZnVuY3Rpb24oKSB7XHJcblx0XHRzZWxmLiR3cmFwcGVyLmFkZENsYXNzKCdhbmltYXRlZCBib3VuY2UtaW4nKTtcclxuXHRcdGNsZWFyVGltZW91dChzZWxmLmJvdW5jZUluLnRpbWVvdXQpO1xyXG5cclxuXHRcdHNlbGYuYm91bmNlSW4udGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdHNlbGYuJHdyYXBwZXIucmVtb3ZlQ2xhc3MoJ2FuaW1hdGVkIGJvdW5jZS1pbicpO1xyXG5cdFx0fSwgNzUwKTtcclxuXHR9O1xyXG5cclxuXHRzZWxmLnJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0c2VsZi4kcm9vdC5yZW1vdmUoKTtcclxuXHRcdHZhciBpbmRleCA9IHBhbmVsLmF0dGFjaG1lbnRfaXRlbXMuaW5kZXhPZihzZWxmKTtcclxuXHRcdChpbmRleCA+IC0xKSAmJiBwYW5lbC5hdHRhY2htZW50X2l0ZW1zLnNwbGljZShpbmRleCwgMSk7XHJcblx0fTtcclxuXHJcblx0c2VsZi4kcm9vdC5hcHBlbmRUbyhwYW5lbC4kYXR0YWNobWVudF9pdGVtcyk7XHJcblx0cGFuZWwuYXR0YWNobWVudF9pdGVtcy5wdXNoKHNlbGYpO1xyXG59OyJdLCJzb3VyY2VSb290IjoiIn0=