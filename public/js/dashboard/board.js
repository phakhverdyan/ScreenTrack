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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/dashboard/board.js":
/*!*****************************************!*\
  !*** ./resources/js/dashboard/board.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

dashboard.Board = function (options) {
  options = options || {}; // ---------------------------------------------------------------------- //

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
  self.hovered_item = null; // ---------------------------------------------------------------------- //

  self.getColumns = function () {
    return self.$columns.children('.board-column-wrapper:not(.is-add-form)').toArray().map(function (element) {
      return $(element).data('column');
    });
  };

  self.createColumn = function (options) {
    return new dashboard.Board.Column(options, self);
  };

  self.optimizeAddColumnTextarea = function () {
    self.$add_column_form_input.css('height', '');
    self.$add_column_form_input.css('height', self.$add_column_form_input[0].scrollHeight + 'px');
  };

  self.scrollLeft = function () {
    self.$columns.scrollLeft(self.$columns[0].scrollWidth);
  };

  self.clear = function () {
    self.getColumns().forEach(function (column) {
      column["delete"]();
    });
  }; // ---------------------------------------------------------------------- //


  self.$add_column_form.submit(function (event) {
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
      position: $last_column[0] ? $last_column.data('column').position + 65536 : 65535
    }, function (column_options) {
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
  self.$add_column_form_input.on('input', function () {
    event.preventDefault();
    self.optimizeAddColumnTextarea();
  });
  self.$add_column_form.keydown(function (event) {
    if (event.key == 'Escape') {
      self.$add_column_form_input.val('');
      self.optimizeAddColumnTextarea();
      self.$add_column_form_input.blur();
      return;
    }
  });
  self.$add_column_form_input.keypress(function (event) {
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
    start: function start(event, ui) {
      ui.item.show();
      var height = ui.item.find('.board-column').height();
      ui.item.hide();
      $('<div />').addClass('board-column').height(height).appendTo(ui.placeholder);
      ui.helper.find('.board-column').addClass('is-rotated');
      ui.helper.mouseup(function (event) {
        ui.helper.find('.board-column').removeClass('is-rotated');
      });
    },
    update: function update(event, ui) {
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
    }
  });
  window.addEventListener('paste', function (event) {
    if (self.hovered_item) {
      self.hovered_item.uploadFiles(event.clipboardData.files || []);
      return;
    }

    if (self.hovered_column) {
      self.hovered_column.uploadFiles(event.clipboardData.files || []);
      return;
    }
  }); // ---------------------------------------------------------------------- //

  self.ready = function () {
    self.$root.removeClass('d-none');
    self.$columns.children('.board-column-wrapper:not(.is-add-form)').each(function () {
      var $column = $(this);
      var column = $column.data('column');
      column.optimizeTitleTextarea();
      column.$items.children('.board-item[data-id]').each(function () {
        var $item = $(this);
        var item = $item.data('item');
        item.optimizeTitleTextarea();
      });
    });
  };
};

dashboard.Board.Column = function (options, board) {
  var self = this;
  self.id = options.id;
  self.title = options.title;
  self.position = options.position;
  self.object = options.object;
  self.dragging = 0;
  self.$root = $(dashboard.template('board-column', {
    column: self
  })).data('column', self).insertBefore(board.$add_column_form);
  self.$add_item_form = self.$root.find('.board-column__add-item-form');
  self.$add_item_form_input = self.$root.find('.board-column__add-item-form__input');
  self.$add_item_link = self.$root.find('.board-column__add-item-link');
  self.$header_target = self.$root.find('.board-column-header__target');
  self.$title_textarea = self.$root.find('.board-column-header__title');
  self.$delete_button = self.$root.find('.board-column-header__delete-button');
  self.$dropzone_text = self.$root.find('.board-column-dropzone__text');
  self.$items = self.$root.find('.board-column__items');

  self.getItems = function () {
    return self.$items.children('.board-item').toArray().slice(1).map(function (element) {
      return $(element).data('item');
    });
  };

  self.createItem = function (options) {
    return new dashboard.Board.Item(options, self, board);
  };

  self.optimizeTitleTextarea = function () {
    self.$title_textarea.css('height', '');
    self.$title_textarea.css('height', self.$title_textarea[0].scrollHeight + 'px');
  };

  self.optimizeAddItemTextarea = function () {
    self.$add_item_form_input.css('height', '');
    self.$add_item_form_input.css('height', self.$add_item_form_input[0].scrollHeight + 'px');
  };

  self.bounceIn = function () {
    var $inner = self.$root.find('.board-column');
    $inner.addClass('animated bounce-in');
    clearTimeout(self.bounceIn.timeout);
    self.bounceIn.timeout = setTimeout(function () {
      $inner.removeClass('animated bounce-in');
    }, 750);
  };

  self.scrollBottom = function () {
    self.$items.scrollTop(self.$items[0].scrollHeight);
  };

  self.uploadFiles = function (files, callback) {
    files = Array.prototype.slice.call(files);

    if (files.length == 0) {
      return callback && callback();
    }

    var $last_item = self.$items.find('.board-item[data-id]:last');
    var notification_id = Date.now().toString(36) + Math.random().toString(36).slice(2);
    $.notify('Creating task...', {
      className: 'success is-' + notification_id,
      autoHide: false,
      showDuration: 0
    });
    var $notification = $('.notifyjs-bootstrap-base.is-' + notification_id).parents('.notifyjs-wrapper');
    self.$root.addClass('is-loading');
    board.handlers.create_item({
      title: files[0].name,
      position: $last_item[0] ? $last_item.data('item').position + 65536 : 65535
    }, self, function (item_options) {
      $notification.click();

      if (!item_options) {
        return;
      }

      var item = self.createItem(item_options);
      item.optimizeTitleTextarea();
      item.bounceIn();
      self.scrollBottom();
      item.$root.addClass('is-loading');
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
          data.append('project_task_attachment[file]', file);
          var started_at = Date.now();
          request({
            method: 'POST',
            url: '/project_tasks/' + item.object.id + '/attachments/create',
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
              return callback();
            }

            if (response.data.is_cover) {
              item.object.attachments.forEach(function (project_task_attachment) {
                project_task_attachment.is_cover = false;
              });
            }

            item.object.attachments.push(response.data);
            item.renderCover();
            return callback();
          });
        };
      }), function () {
        self.scrollBottom();
        item.$root.removeClass('is-loading');
      });
    });
  };

  self.$root.disableSelection();
  self.$root.hover(function () {
    board.hovered_column = self;
  }, function () {
    board.hovered_column = null;
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
  });
  self.$header_target.click(function (event) {
    event.preventDefault();
    self.$title_textarea.focus();
    set_input_carret_at_end(self.$title_textarea[0]);
  });
  self.$title_textarea.on('input', function () {
    self.optimizeTitleTextarea();
  });
  self.$title_textarea.keypress(function (event) {
    if (event.which == 13) {
      event.preventDefault();
      $(this).blur();
      return;
    }
  });
  self.$title_textarea.keydown(function (event) {
    if (event.key == 'Escape') {
      event.preventDefault();
      $(this).val(self.title);
      $(this).blur();
      return;
    }
  });
  self.$title_textarea.focus(function () {
    self.$header_target.addClass('is-hidden');
    self.$delete_button.addClass('is-hidden');
    self.$root.enableSelection();
  });
  self.$title_textarea.blur(function () {
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
    board.handlers.update_column(self, function () {
      self.$delete_button.removeClass('is-loading disabled');
    });
  });

  self["delete"] = function () {
    self.getItems().forEach(function (item) {
      item["delete"]();
    });
    self.$root.empty().remove();
  };

  self.$delete_button.click(function (event) {
    event.preventDefault();

    if ($(this).hasClass('is-loading disabled')) {
      return;
    }

    modals.confirm_action({
      question: 'Are you sure you want to archive this list?',
      confirm: function confirm(close) {
        board.handlers.archive_column(self, function (was_archived) {
          if (!was_archived) {
            return;
          }

          self["delete"]();
          close();
        });
      }
    });
  });
  self.$add_item_form.find('.board-column__add-item-form__close-button').click(function (event) {
    event.preventDefault();
    self.$add_item_form_input.val('');
    self.optimizeAddItemTextarea();
    self.$add_item_form.addClass('is-hidden');
    self.$add_item_link.removeClass('is-hidden');
  });
  self.$add_item_form.submit(function (event) {
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
      position: $last_item[0] ? $last_item.data('item').position + 65536 : 65535
    }, self, function (item_options) {
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
  self.$add_item_form.keydown(function (event) {
    if (event.key == 'Escape') {
      self.$add_item_form.find('.board-column__add-item-form__close-button').click();
      return;
    }
  });
  self.$add_item_form_input.keypress(function (event) {
    if (event.which == 13) {
      event.preventDefault();
      self.$add_item_form.submit();
      return;
    }
  });
  self.$add_item_form_input.on('input', function () {
    self.optimizeAddItemTextarea();
  });
  self.$add_item_link.click(function (event) {
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
    start: function start(event, ui) {
      ui.placeholder.height(ui.item.height());
      ui.helper.addClass('is-rotated');
      ui.helper.mouseup(function (event) {
        ui.helper.removeClass('is-rotated');
      });
    },
    // sort: function(event, ui) {
    // 	(ui.helper.width() != ui.placeholder.width()) && ui.helper.width(ui.placeholder.width());
    // },
    update: function update(event, ui) {
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
    }
  });
};

dashboard.Board.Item = function (options, column, board) {
  var self = this;
  self.id = options.id;
  self.title = options.title;
  self.position = options.position;
  self.object = options.object;
  self.dragging = 0;
  self.$root = $(dashboard.template('board-item', {
    item: self
  })).data('item', self).insertBefore(column.$add_item_form);
  self.$wrapper = self.$root.find('.board-item-wrapper');
  self.$header_target = self.$root.find('.board-item-header__target');
  self.$title_textarea = self.$root.find('.board-item-header__title');
  self.$menu_button = self.$root.find('.board-item-header__menu-button');
  self.$dropzone = self.$root.find('.board-item-dropzone');
  self.$dropzone_text = self.$root.find('.board-item-dropzone__text');

  self.optimizeTitleTextarea = function () {
    self.$title_textarea.css('height', '');
    self.$title_textarea.css('height', self.$title_textarea[0].scrollHeight + 'px');
  };

  self.bounceIn = function () {
    self.$root.addClass('animated bounce-in');
    clearTimeout(self.bounceIn.timeout);
    self.bounceIn.timeout = setTimeout(function () {
      self.$root.removeClass('animated bounce-in');
    }, 750);
  };

  self.uploadFiles = function (files, callback) {
    files = Array.prototype.slice.call(files);

    if (files.length == 0) {
      return;
    }

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
        data.append('project_task_attachment[file]', file);
        var started_at = Date.now();
        request({
          method: 'POST',
          url: '/project_tasks/' + self.object.id + '/attachments/create',
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
          }

          if (response.data.is_cover) {
            self.object.attachments.forEach(function (project_task_attachment) {
              project_task_attachment.is_cover = false;
            });
          }

          self.object.attachments.push(response.data);
          self.renderCover();
          self.renderBadges();
          return callback && callback();
        });
      };
    }), function () {
      self.$root.removeClass('is-loading'); // if (files.length > 1) {
      // 	$.notify('Files were uploaded!', 'success');
      // } else if (files.length == 1) {
      // 	$.notify('File was uploaded!', 'success');
      // }

      return callback && callback();
    });
  };

  self.$root.hover(function () {
    board.hovered_item = self;
    self.$root.addClass('is-hover');
  }, function () {
    board.hovered_item = null;
    self.$root.removeClass('is-hover');
  }); // self.$root.mousedown(function(event) {
  // 	self.$root.removeClass('animated weakBounceIn');
  // });

  self.$root.click(function (event) {
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
      board_item: self
    });
  });
  self.$header_target.click(function (event) {
    event.preventDefault(); // self.$title_textarea.focus();
    // set_input_carret_at_end(self.$title_textarea[0]);

    modals.project_task({
      project_task: self.object,
      board_item: self
    });
  });
  self.$title_textarea.on('input', function () {
    self.optimizeTitleTextarea();
  });
  self.$title_textarea.keypress(function (event) {
    if (event.which == 13) {
      event.preventDefault();
      $(this).blur();
      return;
    }
  });
  self.$title_textarea.keydown(function (event) {
    if (event.key == 'Escape') {
      event.preventDefault();
      $(this).val(self.title);
      $(this).blur();
      return;
    }
  });
  self.$title_textarea.focus(function () {
    self.$title_textarea.addClass('is-hidden');
    self.$menu_button.addClass('is-hidden');
    column.$root.enableSelection();
  });
  self.$title_textarea.blur(function () {
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
    board.handlers.update_item(self, column, function () {
      self.$menu_button.removeClass('is-loading disabled');
    });
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
    self.$dropzone.css({
      height: self.$root.height() + 'px',
      lineHeight: self.$root.height() + 'px'
    });
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
  });

  self.renderTitle = function () {
    self.$title_textarea.val(self.object.title);
  };

  self.renderMembers = function () {
    self.$root.find('.board-item-member').remove();
    var $members = self.$root.find('.board-item__members');
    self.object.members.forEach(function (member) {
      var $member = $(dashboard.template('board-item-member', {
        member: member
      }));
      var project_member = board.object.members.filter(function (current_board_member) {
        return current_board_member.user_id == member.user_id;
      })[0] || null;
      popovers.project_member_menu({
        trigger: $member,
        project_member: project_member,
        project: dashboard.selected_project,
        project_board: board.object,
        board_item: self,
        project_task_member: member
      });
      $member.prependTo($members);
    });
  };

  self.renderBadges = function () {
    var $root = self.$root.find('.board-item__badges');
    var $new_root = $(dashboard.template('board-item-badges', {
      item: self,
      task: self.object
    }));
    $root.html($new_root.html()).attr('class', $new_root.attr('class'));
  };

  self.renderCover = function () {
    var cover_attachment = self.object.attachments.filter(function (attachment) {
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

  self["delete"] = function () {
    self.$root.empty().remove();
  };

  (function initialize() {
    self.renderMembers();
    self.renderBadges();
    self.renderCover();
  })(); // ---------------------------------------------------------------------- //


  popovers.manage_project_task_members({
    trigger: self.$root.find('.board-item__members__add-new-button'),
    project: dashboard.selected_project,
    project_board: board.object,
    project_task: function project_task() {
      return self.object;
    },
    task_updated: function task_updated(options) {
      self.object.members = options.project_task_members; // board.object.members = options.project_members; // ?

      self.renderMembers();
    }
  });
  popovers.project_task_menu({
    trigger: self.$menu_button,
    project_task: self.object,
    board_item: self
  });
  self.$menu_button.on('inserted.bs.popover', function () {
    self.$wrapper.addClass('is-menu-shown');
  });
  self.$menu_button.on('hidden.bs.popover', function () {
    self.$wrapper.removeClass('is-menu-shown');
  });
};

/***/ }),

/***/ 4:
/*!***********************************************!*\
  !*** multi ./resources/js/dashboard/board.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\js\dashboard\board.js */"./resources/js/dashboard/board.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2Rhc2hib2FyZC9ib2FyZC5qcyJdLCJuYW1lcyI6WyJkYXNoYm9hcmQiLCJCb2FyZCIsIm9wdGlvbnMiLCJzZWxmIiwiJHJvb3QiLCIkIiwic2VsZWN0b3IiLCIkY29sdW1ucyIsImZpbmQiLCIkYWRkX2NvbHVtbl9mb3JtIiwiJGFkZF9jb2x1bW5fZm9ybV9pbnB1dCIsImhhbmRsZXJzIiwiY3JlYXRlX2NvbHVtbiIsInVwZGF0ZV9jb2x1bW4iLCJhcmNoaXZlX2NvbHVtbiIsImNyZWF0ZV9pdGVtIiwidXBkYXRlX2l0ZW0iLCJvYmplY3QiLCJob3ZlcmVkX2NvbHVtbiIsImhvdmVyZWRfaXRlbSIsImdldENvbHVtbnMiLCJjaGlsZHJlbiIsInRvQXJyYXkiLCJtYXAiLCJlbGVtZW50IiwiZGF0YSIsImNyZWF0ZUNvbHVtbiIsIkNvbHVtbiIsIm9wdGltaXplQWRkQ29sdW1uVGV4dGFyZWEiLCJjc3MiLCJzY3JvbGxIZWlnaHQiLCJzY3JvbGxMZWZ0Iiwic2Nyb2xsV2lkdGgiLCJjbGVhciIsImZvckVhY2giLCJjb2x1bW4iLCJzdWJtaXQiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwidmFsIiwiZm9jdXMiLCIkYnV0dG9uIiwiYWRkQ2xhc3MiLCIkbGFzdF9jb2x1bW4iLCJ0aXRsZSIsInBvc2l0aW9uIiwiY29sdW1uX29wdGlvbnMiLCJyZW1vdmVDbGFzcyIsIm9wdGltaXplVGl0bGVUZXh0YXJlYSIsImJvdW5jZUluIiwib24iLCJrZXlkb3duIiwia2V5IiwiYmx1ciIsImtleXByZXNzIiwid2hpY2giLCJzb3J0YWJsZSIsIml0ZW1zIiwiaGFuZGxlIiwiY3Vyc29yIiwicmV2ZXJ0IiwiaGVscGVyIiwiYXBwZW5kVG8iLCJkb2N1bWVudCIsImJvZHkiLCJ6SW5kZXgiLCJzdGFydCIsInVpIiwiaXRlbSIsInNob3ciLCJoZWlnaHQiLCJoaWRlIiwicGxhY2Vob2xkZXIiLCJtb3VzZXVwIiwidXBkYXRlIiwiJHByZXZpb3VzX2NvbHVtbiIsInByZXYiLCIkbmV4dF9jb2x1bW4iLCJuZXh0Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsInVwbG9hZEZpbGVzIiwiY2xpcGJvYXJkRGF0YSIsImZpbGVzIiwicmVhZHkiLCJlYWNoIiwiJGNvbHVtbiIsIiRpdGVtcyIsIiRpdGVtIiwiYm9hcmQiLCJpZCIsImRyYWdnaW5nIiwidGVtcGxhdGUiLCJpbnNlcnRCZWZvcmUiLCIkYWRkX2l0ZW1fZm9ybSIsIiRhZGRfaXRlbV9mb3JtX2lucHV0IiwiJGFkZF9pdGVtX2xpbmsiLCIkaGVhZGVyX3RhcmdldCIsIiR0aXRsZV90ZXh0YXJlYSIsIiRkZWxldGVfYnV0dG9uIiwiJGRyb3B6b25lX3RleHQiLCJnZXRJdGVtcyIsInNsaWNlIiwiY3JlYXRlSXRlbSIsIkl0ZW0iLCJvcHRpbWl6ZUFkZEl0ZW1UZXh0YXJlYSIsIiRpbm5lciIsImNsZWFyVGltZW91dCIsInRpbWVvdXQiLCJzZXRUaW1lb3V0Iiwic2Nyb2xsQm90dG9tIiwic2Nyb2xsVG9wIiwiY2FsbGJhY2siLCJBcnJheSIsInByb3RvdHlwZSIsImNhbGwiLCJsZW5ndGgiLCIkbGFzdF9pdGVtIiwibm90aWZpY2F0aW9uX2lkIiwiRGF0ZSIsIm5vdyIsInRvU3RyaW5nIiwiTWF0aCIsInJhbmRvbSIsIm5vdGlmeSIsImNsYXNzTmFtZSIsImF1dG9IaWRlIiwic2hvd0R1cmF0aW9uIiwiJG5vdGlmaWNhdGlvbiIsInBhcmVudHMiLCJuYW1lIiwiaXRlbV9vcHRpb25zIiwiY2xpY2siLCJzZXJpZXMiLCJmaWxlIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJzdGFydGVkX2F0IiwicmVxdWVzdCIsIm1ldGhvZCIsInVybCIsImNvbnRlbnRUeXBlIiwicHJvY2Vzc0RhdGEiLCJwcm9ncmVzcyIsInBlcmNlbnQiLCJ0ZXh0IiwicmVzcG9uc2UiLCJlcnJvciIsImlzX2NvdmVyIiwiYXR0YWNobWVudHMiLCJwcm9qZWN0X3Rhc2tfYXR0YWNobWVudCIsInB1c2giLCJyZW5kZXJDb3ZlciIsImRpc2FibGVTZWxlY3Rpb24iLCJob3ZlciIsInN0b3BQcm9wYWdhdGlvbiIsIm9yaWdpbmFsRXZlbnQiLCJkYXRhVHJhbnNmZXIiLCJzZXRfaW5wdXRfY2FycmV0X2F0X2VuZCIsImVuYWJsZVNlbGVjdGlvbiIsImVtcHR5IiwicmVtb3ZlIiwiaGFzQ2xhc3MiLCJtb2RhbHMiLCJjb25maXJtX2FjdGlvbiIsInF1ZXN0aW9uIiwiY29uZmlybSIsImNsb3NlIiwid2FzX2FyY2hpdmVkIiwiY29ubmVjdFdpdGgiLCIkcHJldmlvdXNfaXRlbSIsIiRuZXh0X2l0ZW0iLCIkd3JhcHBlciIsIiRtZW51X2J1dHRvbiIsIiRkcm9wem9uZSIsInJlbmRlckJhZGdlcyIsInRhcmdldCIsImNsb3Nlc3QiLCJwcm9qZWN0X3Rhc2siLCJib2FyZF9pdGVtIiwibGluZUhlaWdodCIsInJlbmRlclRpdGxlIiwicmVuZGVyTWVtYmVycyIsIiRtZW1iZXJzIiwibWVtYmVycyIsIm1lbWJlciIsIiRtZW1iZXIiLCJwcm9qZWN0X21lbWJlciIsImZpbHRlciIsImN1cnJlbnRfYm9hcmRfbWVtYmVyIiwidXNlcl9pZCIsInBvcG92ZXJzIiwicHJvamVjdF9tZW1iZXJfbWVudSIsInRyaWdnZXIiLCJwcm9qZWN0Iiwic2VsZWN0ZWRfcHJvamVjdCIsInByb2plY3RfYm9hcmQiLCJwcm9qZWN0X3Rhc2tfbWVtYmVyIiwicHJlcGVuZFRvIiwiJG5ld19yb290IiwidGFzayIsImh0bWwiLCJhdHRyIiwiY292ZXJfYXR0YWNobWVudCIsImF0dGFjaG1lbnQiLCIkY292ZXIiLCJ0aHVtYm5haWxzIiwibWlkZGxlIiwiY292ZXJfaGVpZ2h0Iiwid2lkdGgiLCJtaW4iLCJpbml0aWFsaXplIiwibWFuYWdlX3Byb2plY3RfdGFza19tZW1iZXJzIiwidGFza191cGRhdGVkIiwicHJvamVjdF90YXNrX21lbWJlcnMiLCJwcm9qZWN0X3Rhc2tfbWVudSJdLCJt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QTBCLGVBQTFCO0FBQ0EsR0FGRDtBQUdBLENBNVVELEMiLCJmaWxlIjoiL2pzL2Rhc2hib2FyZC9ib2FyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNCk7XG4iLCJkYXNoYm9hcmQuQm9hcmQgPSBmdW5jdGlvbihvcHRpb25zKSB7XHJcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblxyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cclxuXHRcclxuXHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0c2VsZi4kcm9vdCA9ICQob3B0aW9ucy5zZWxlY3RvciB8fCAnLmJvYXJkOmZpcnN0Jyk7XHJcblx0c2VsZi4kY29sdW1ucyA9IHNlbGYuJHJvb3QuZmluZCgnLmJvYXJkX19jb2x1bW5zJyk7XHJcblx0c2VsZi4kYWRkX2NvbHVtbl9mb3JtID0gc2VsZi4kcm9vdC5maW5kKCcuYm9hcmQtY29sdW1uLXdyYXBwZXIuaXMtYWRkLWZvcm0nKTtcclxuXHRzZWxmLiRhZGRfY29sdW1uX2Zvcm1faW5wdXQgPSBzZWxmLiRhZGRfY29sdW1uX2Zvcm0uZmluZCgnLmJvYXJkX19hZGQtY29sdW1uLWZvcm1fX2lucHV0Jyk7XHJcblx0c2VsZi5oYW5kbGVycyA9IHt9O1xyXG5cdHNlbGYuaGFuZGxlcnMuY3JlYXRlX2NvbHVtbiA9IG9wdGlvbnMuY3JlYXRlX2NvbHVtbjtcclxuXHRzZWxmLmhhbmRsZXJzLnVwZGF0ZV9jb2x1bW4gPSBvcHRpb25zLnVwZGF0ZV9jb2x1bW47XHJcblx0c2VsZi5oYW5kbGVycy5hcmNoaXZlX2NvbHVtbiA9IG9wdGlvbnMuYXJjaGl2ZV9jb2x1bW47XHJcblx0c2VsZi5oYW5kbGVycy5jcmVhdGVfaXRlbSA9IG9wdGlvbnMuY3JlYXRlX2l0ZW07XHJcblx0c2VsZi5oYW5kbGVycy51cGRhdGVfaXRlbSA9IG9wdGlvbnMudXBkYXRlX2l0ZW07XHJcblx0c2VsZi5vYmplY3QgPSBvcHRpb25zLm9iamVjdDtcclxuXHRzZWxmLmhvdmVyZWRfY29sdW1uID0gbnVsbDtcclxuXHRzZWxmLmhvdmVyZWRfaXRlbSA9IG51bGw7XHJcblxyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cclxuXHJcblx0c2VsZi5nZXRDb2x1bW5zID0gZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gc2VsZi4kY29sdW1ucy5jaGlsZHJlbignLmJvYXJkLWNvbHVtbi13cmFwcGVyOm5vdCguaXMtYWRkLWZvcm0pJykudG9BcnJheSgpLm1hcChmdW5jdGlvbihlbGVtZW50KSB7XHJcblx0XHRcdHJldHVybiAkKGVsZW1lbnQpLmRhdGEoJ2NvbHVtbicpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0c2VsZi5jcmVhdGVDb2x1bW4gPSBmdW5jdGlvbihvcHRpb25zKSB7XHJcblx0XHRyZXR1cm4gbmV3IGRhc2hib2FyZC5Cb2FyZC5Db2x1bW4ob3B0aW9ucywgc2VsZik7XHJcblx0fTtcclxuXHJcblx0c2VsZi5vcHRpbWl6ZUFkZENvbHVtblRleHRhcmVhID0gZnVuY3Rpb24oKSB7XHJcblx0XHRzZWxmLiRhZGRfY29sdW1uX2Zvcm1faW5wdXQuY3NzKCdoZWlnaHQnLCAnJyk7XHJcblx0XHRzZWxmLiRhZGRfY29sdW1uX2Zvcm1faW5wdXQuY3NzKCdoZWlnaHQnLCBzZWxmLiRhZGRfY29sdW1uX2Zvcm1faW5wdXRbMF0uc2Nyb2xsSGVpZ2h0ICsgJ3B4Jyk7XHJcblx0fTtcclxuXHJcblx0c2VsZi5zY3JvbGxMZWZ0ID0gZnVuY3Rpb24oKSB7XHJcblx0XHRzZWxmLiRjb2x1bW5zLnNjcm9sbExlZnQoc2VsZi4kY29sdW1uc1swXS5zY3JvbGxXaWR0aCk7XHJcblx0fTtcclxuXHJcblx0c2VsZi5jbGVhciA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0c2VsZi5nZXRDb2x1bW5zKCkuZm9yRWFjaChmdW5jdGlvbihjb2x1bW4pIHtcclxuXHRcdFx0Y29sdW1uLmRlbGV0ZSgpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xyXG5cclxuXHRzZWxmLiRhZGRfY29sdW1uX2Zvcm0uc3VibWl0KGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdGlmICghc2VsZi4kYWRkX2NvbHVtbl9mb3JtX2lucHV0LnZhbCgpKSB7XHJcblx0XHRcdHNlbGYuJGFkZF9jb2x1bW5fZm9ybV9pbnB1dC5mb2N1cygpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyICRidXR0b24gPSAkKHRoaXMpLmZpbmQoJy5ib2FyZF9fYWRkLWNvbHVtbi1mb3JtX19hZGQtYnV0dG9uJyk7XHJcblx0XHQkYnV0dG9uLmFkZENsYXNzKCdpcy1sb2FkaW5nIGRpc2FibGVkJyk7XHJcblx0XHR2YXIgJGxhc3RfY29sdW1uID0gc2VsZi4kY29sdW1ucy5jaGlsZHJlbignLmJvYXJkLWNvbHVtbi13cmFwcGVyW2RhdGEtaWRdOmxhc3QnKTtcclxuXHJcblx0XHRzZWxmLmhhbmRsZXJzLmNyZWF0ZV9jb2x1bW4oe1xyXG5cdFx0XHR0aXRsZTogc2VsZi4kYWRkX2NvbHVtbl9mb3JtX2lucHV0LnZhbCgpLFxyXG5cdFx0XHRwb3NpdGlvbjogKCRsYXN0X2NvbHVtblswXSA/ICRsYXN0X2NvbHVtbi5kYXRhKCdjb2x1bW4nKS5wb3NpdGlvbiArIDY1NTM2IDogNjU1MzUpLFxyXG5cdFx0fSwgZnVuY3Rpb24oY29sdW1uX29wdGlvbnMpIHtcclxuXHRcdFx0JGJ1dHRvbi5yZW1vdmVDbGFzcygnaXMtbG9hZGluZyBkaXNhYmxlZCcpO1xyXG5cclxuXHRcdFx0aWYgKCFjb2x1bW5fb3B0aW9ucykge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIGNvbHVtbiA9IHNlbGYuY3JlYXRlQ29sdW1uKGNvbHVtbl9vcHRpb25zKTtcclxuXHRcdFx0Y29sdW1uLm9wdGltaXplVGl0bGVUZXh0YXJlYSgpO1xyXG5cdFx0XHRjb2x1bW4uYm91bmNlSW4oKTtcclxuXHRcdFx0c2VsZi4kYWRkX2NvbHVtbl9mb3JtX2lucHV0LnZhbCgnJyk7XHJcblx0XHRcdHNlbGYub3B0aW1pemVBZGRDb2x1bW5UZXh0YXJlYSgpO1xyXG5cdFx0XHRzZWxmLnNjcm9sbExlZnQoKTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHRzZWxmLiRhZGRfY29sdW1uX2Zvcm1faW5wdXQub24oJ2lucHV0JywgZnVuY3Rpb24oKSB7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0c2VsZi5vcHRpbWl6ZUFkZENvbHVtblRleHRhcmVhKCk7XHJcblx0fSk7XHJcblxyXG5cdHNlbGYuJGFkZF9jb2x1bW5fZm9ybS5rZXlkb3duKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRpZiAoZXZlbnQua2V5ID09ICdFc2NhcGUnKSB7XHJcblx0XHRcdHNlbGYuJGFkZF9jb2x1bW5fZm9ybV9pbnB1dC52YWwoJycpO1xyXG5cdFx0XHRzZWxmLm9wdGltaXplQWRkQ29sdW1uVGV4dGFyZWEoKTtcclxuXHRcdFx0c2VsZi4kYWRkX2NvbHVtbl9mb3JtX2lucHV0LmJsdXIoKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHRzZWxmLiRhZGRfY29sdW1uX2Zvcm1faW5wdXQua2V5cHJlc3MoZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdGlmIChldmVudC53aGljaCA9PSAxMykge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRzZWxmLiRhZGRfY29sdW1uX2Zvcm0uc3VibWl0KCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0c2VsZi4kY29sdW1ucy5zb3J0YWJsZSh7XHJcblx0XHRpdGVtczogJy5ib2FyZC1jb2x1bW4td3JhcHBlcjpub3QoLmlzLWFkZC1mb3JtKScsXHJcblx0XHRoYW5kbGU6ICcuYm9hcmQtY29sdW1uLWhlYWRlcicsXHJcblx0XHRjdXJzb3I6ICdwb2ludGVyJyxcclxuXHRcdHJldmVydDogMjAwLFxyXG5cdFx0aGVscGVyOiAnY2xvbmUnLFxyXG5cdFx0YXBwZW5kVG86IGRvY3VtZW50LmJvZHksXHJcblx0XHR6SW5kZXg6IDEwNTAsXHJcblx0XHQvLyBzY3JvbGw6IHRydWUsXHJcblx0XHQvLyBzY3JvbGxTZW5zaXRpdml0eTogMTAwLFxyXG5cdFx0Ly8gc2Nyb2xsU3BlZWQ6IDEwMCxcclxuXHJcblx0ICAgIHN0YXJ0OiBmdW5jdGlvbihldmVudCwgdWkpIHtcclxuXHQgICAgICAgIHVpLml0ZW0uc2hvdygpO1xyXG5cdFx0XHR2YXIgaGVpZ2h0ID0gdWkuaXRlbS5maW5kKCcuYm9hcmQtY29sdW1uJykuaGVpZ2h0KCk7XHJcblx0XHRcdHVpLml0ZW0uaGlkZSgpO1xyXG5cdFx0XHQkKCc8ZGl2IC8+JykuYWRkQ2xhc3MoJ2JvYXJkLWNvbHVtbicpLmhlaWdodChoZWlnaHQpLmFwcGVuZFRvKHVpLnBsYWNlaG9sZGVyKTtcclxuXHQgICAgICAgIHVpLmhlbHBlci5maW5kKCcuYm9hcmQtY29sdW1uJykuYWRkQ2xhc3MoJ2lzLXJvdGF0ZWQnKTtcclxuXHJcblx0XHRcdHVpLmhlbHBlci5tb3VzZXVwKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdFx0dWkuaGVscGVyLmZpbmQoJy5ib2FyZC1jb2x1bW4nKS5yZW1vdmVDbGFzcygnaXMtcm90YXRlZCcpO1xyXG5cdFx0XHR9KTtcclxuXHQgICAgfSxcclxuXHJcblx0ICAgIHVwZGF0ZTogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XHJcblx0XHRcdC8vIHVpLml0ZW0uYWRkQ2xhc3MoJ2FuaW1hdGVkIGJvdW5jZS1pbicpO1xyXG5cclxuXHRcdFx0Ly8gc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0Ly8gXHR1aS5pdGVtLnJlbW92ZUNsYXNzKCdhbmltYXRlZCBib3VuY2UtaW4nKTtcclxuXHRcdFx0Ly8gfSwgNzUwKTtcclxuXHJcblx0ICAgIFx0dmFyIGNvbHVtbiA9IHVpLml0ZW0uZGF0YSgnY29sdW1uJyk7XHJcblx0XHRcdHZhciAkcHJldmlvdXNfY29sdW1uID0gdWkuaXRlbS5wcmV2KCcuYm9hcmQtY29sdW1uLXdyYXBwZXJbZGF0YS1pZF0nKTtcclxuXHRcdFx0dmFyICRuZXh0X2NvbHVtbiA9IHVpLml0ZW0ubmV4dCgnLmJvYXJkLWNvbHVtbi13cmFwcGVyW2RhdGEtaWRdJyk7XHJcblxyXG5cdFx0XHRpZiAoJHByZXZpb3VzX2NvbHVtblswXSAmJiAkbmV4dF9jb2x1bW5bMF0pIHtcclxuXHRcdFx0XHRjb2x1bW4ucG9zaXRpb24gPSAoJG5leHRfY29sdW1uLmRhdGEoJ2NvbHVtbicpLnBvc2l0aW9uICsgJHByZXZpb3VzX2NvbHVtbi5kYXRhKCdjb2x1bW4nKS5wb3NpdGlvbikgLyAyO1xyXG5cdFx0XHR9IGVsc2UgaWYgKCRwcmV2aW91c19jb2x1bW5bMF0pIHtcclxuXHRcdFx0XHRjb2x1bW4ucG9zaXRpb24gPSAoJHByZXZpb3VzX2NvbHVtbi5kYXRhKCdjb2x1bW4nKS5wb3NpdGlvbiArIDY1NTM2KSAvIDI7XHJcblx0XHRcdH0gZWxzZSBpZiAoJG5leHRfY29sdW1uWzBdKSB7XHJcblx0XHRcdFx0Y29sdW1uLnBvc2l0aW9uID0gJG5leHRfY29sdW1uLmRhdGEoJ2NvbHVtbicpLnBvc2l0aW9uIC8gMjtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0c2VsZi5oYW5kbGVycy51cGRhdGVfY29sdW1uKGNvbHVtbik7XHJcblx0ICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncGFzdGUnLCBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0aWYgKHNlbGYuaG92ZXJlZF9pdGVtKSB7XHJcblx0XHRcdHNlbGYuaG92ZXJlZF9pdGVtLnVwbG9hZEZpbGVzKGV2ZW50LmNsaXBib2FyZERhdGEuZmlsZXMgfHwgW10pO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHNlbGYuaG92ZXJlZF9jb2x1bW4pIHtcclxuXHRcdFx0c2VsZi5ob3ZlcmVkX2NvbHVtbi51cGxvYWRGaWxlcyhldmVudC5jbGlwYm9hcmREYXRhLmZpbGVzIHx8IFtdKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXHJcblxyXG5cdHNlbGYucmVhZHkgPSBmdW5jdGlvbigpIHtcclxuXHRcdHNlbGYuJHJvb3QucmVtb3ZlQ2xhc3MoJ2Qtbm9uZScpO1xyXG5cclxuXHRcdHNlbGYuJGNvbHVtbnMuY2hpbGRyZW4oJy5ib2FyZC1jb2x1bW4td3JhcHBlcjpub3QoLmlzLWFkZC1mb3JtKScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciAkY29sdW1uID0gJCh0aGlzKTtcclxuXHRcdFx0dmFyIGNvbHVtbiA9ICRjb2x1bW4uZGF0YSgnY29sdW1uJyk7XHJcblx0XHRcdGNvbHVtbi5vcHRpbWl6ZVRpdGxlVGV4dGFyZWEoKTtcclxuXHJcblx0XHRcdGNvbHVtbi4kaXRlbXMuY2hpbGRyZW4oJy5ib2FyZC1pdGVtW2RhdGEtaWRdJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR2YXIgJGl0ZW0gPSAkKHRoaXMpO1xyXG5cdFx0XHRcdHZhciBpdGVtID0gJGl0ZW0uZGF0YSgnaXRlbScpO1xyXG5cdFx0XHRcdGl0ZW0ub3B0aW1pemVUaXRsZVRleHRhcmVhKCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fTtcclxufTtcclxuXHJcblxyXG5kYXNoYm9hcmQuQm9hcmQuQ29sdW1uID0gZnVuY3Rpb24ob3B0aW9ucywgYm9hcmQpIHtcclxuXHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0c2VsZi5pZCA9IG9wdGlvbnMuaWQ7XHJcblx0c2VsZi50aXRsZSA9IG9wdGlvbnMudGl0bGU7XHJcblx0c2VsZi5wb3NpdGlvbiA9IG9wdGlvbnMucG9zaXRpb247XHJcblx0c2VsZi5vYmplY3QgPSBvcHRpb25zLm9iamVjdDtcclxuXHRzZWxmLmRyYWdnaW5nID0gMDtcclxuXHJcblx0c2VsZi4kcm9vdCA9ICQoZGFzaGJvYXJkLnRlbXBsYXRlKCdib2FyZC1jb2x1bW4nLCB7XHJcblx0XHRjb2x1bW46IHNlbGYsXHJcblx0fSkpLmRhdGEoJ2NvbHVtbicsIHNlbGYpLmluc2VydEJlZm9yZShib2FyZC4kYWRkX2NvbHVtbl9mb3JtKTtcclxuXHJcblx0c2VsZi4kYWRkX2l0ZW1fZm9ybSA9IHNlbGYuJHJvb3QuZmluZCgnLmJvYXJkLWNvbHVtbl9fYWRkLWl0ZW0tZm9ybScpO1xyXG5cdHNlbGYuJGFkZF9pdGVtX2Zvcm1faW5wdXQgPSBzZWxmLiRyb290LmZpbmQoJy5ib2FyZC1jb2x1bW5fX2FkZC1pdGVtLWZvcm1fX2lucHV0Jyk7XHJcblx0c2VsZi4kYWRkX2l0ZW1fbGluayA9IHNlbGYuJHJvb3QuZmluZCgnLmJvYXJkLWNvbHVtbl9fYWRkLWl0ZW0tbGluaycpO1xyXG5cdHNlbGYuJGhlYWRlcl90YXJnZXQgPSBzZWxmLiRyb290LmZpbmQoJy5ib2FyZC1jb2x1bW4taGVhZGVyX190YXJnZXQnKTtcclxuXHRzZWxmLiR0aXRsZV90ZXh0YXJlYSA9IHNlbGYuJHJvb3QuZmluZCgnLmJvYXJkLWNvbHVtbi1oZWFkZXJfX3RpdGxlJyk7XHJcblx0c2VsZi4kZGVsZXRlX2J1dHRvbiA9IHNlbGYuJHJvb3QuZmluZCgnLmJvYXJkLWNvbHVtbi1oZWFkZXJfX2RlbGV0ZS1idXR0b24nKTtcclxuXHRzZWxmLiRkcm9wem9uZV90ZXh0ID0gc2VsZi4kcm9vdC5maW5kKCcuYm9hcmQtY29sdW1uLWRyb3B6b25lX190ZXh0Jyk7XHJcblx0c2VsZi4kaXRlbXMgPSBzZWxmLiRyb290LmZpbmQoJy5ib2FyZC1jb2x1bW5fX2l0ZW1zJyk7XHJcblxyXG5cdHNlbGYuZ2V0SXRlbXMgPSBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiBzZWxmLiRpdGVtcy5jaGlsZHJlbignLmJvYXJkLWl0ZW0nKS50b0FycmF5KCkuc2xpY2UoMSkubWFwKGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuXHRcdFx0cmV0dXJuICQoZWxlbWVudCkuZGF0YSgnaXRlbScpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0c2VsZi5jcmVhdGVJdGVtID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG5cdFx0cmV0dXJuIG5ldyBkYXNoYm9hcmQuQm9hcmQuSXRlbShvcHRpb25zLCBzZWxmLCBib2FyZCk7XHJcblx0fTtcclxuXHJcblx0c2VsZi5vcHRpbWl6ZVRpdGxlVGV4dGFyZWEgPSBmdW5jdGlvbigpIHtcclxuXHRcdHNlbGYuJHRpdGxlX3RleHRhcmVhLmNzcygnaGVpZ2h0JywgJycpO1xyXG5cdFx0c2VsZi4kdGl0bGVfdGV4dGFyZWEuY3NzKCdoZWlnaHQnLCBzZWxmLiR0aXRsZV90ZXh0YXJlYVswXS5zY3JvbGxIZWlnaHQgKyAncHgnKTtcclxuXHR9O1xyXG5cclxuXHRzZWxmLm9wdGltaXplQWRkSXRlbVRleHRhcmVhID0gZnVuY3Rpb24oKSB7XHJcblx0XHRzZWxmLiRhZGRfaXRlbV9mb3JtX2lucHV0LmNzcygnaGVpZ2h0JywgJycpO1xyXG5cdFx0c2VsZi4kYWRkX2l0ZW1fZm9ybV9pbnB1dC5jc3MoJ2hlaWdodCcsIHNlbGYuJGFkZF9pdGVtX2Zvcm1faW5wdXRbMF0uc2Nyb2xsSGVpZ2h0ICsgJ3B4Jyk7XHJcblx0fTtcclxuXHJcblx0c2VsZi5ib3VuY2VJbiA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyICRpbm5lciA9IHNlbGYuJHJvb3QuZmluZCgnLmJvYXJkLWNvbHVtbicpO1xyXG5cdFx0JGlubmVyLmFkZENsYXNzKCdhbmltYXRlZCBib3VuY2UtaW4nKTtcclxuXHRcdGNsZWFyVGltZW91dChzZWxmLmJvdW5jZUluLnRpbWVvdXQpO1xyXG5cclxuXHRcdHNlbGYuYm91bmNlSW4udGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdCRpbm5lci5yZW1vdmVDbGFzcygnYW5pbWF0ZWQgYm91bmNlLWluJyk7XHJcblx0XHR9LCA3NTApO1xyXG5cdH07XHJcblxyXG5cdHNlbGYuc2Nyb2xsQm90dG9tID0gZnVuY3Rpb24oKSB7XHJcblx0XHRzZWxmLiRpdGVtcy5zY3JvbGxUb3Aoc2VsZi4kaXRlbXNbMF0uc2Nyb2xsSGVpZ2h0KTtcclxuXHR9O1xyXG5cclxuXHRzZWxmLnVwbG9hZEZpbGVzID0gZnVuY3Rpb24oZmlsZXMsIGNhbGxiYWNrKSB7XHJcblx0XHRmaWxlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZpbGVzKTtcclxuXHJcblx0XHRpZiAoZmlsZXMubGVuZ3RoID09IDApIHtcclxuXHRcdFx0cmV0dXJuIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyICRsYXN0X2l0ZW0gPSBzZWxmLiRpdGVtcy5maW5kKCcuYm9hcmQtaXRlbVtkYXRhLWlkXTpsYXN0Jyk7XHJcblx0XHR2YXIgbm90aWZpY2F0aW9uX2lkID0gRGF0ZS5ub3coKS50b1N0cmluZygzNikgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zbGljZSgyKTtcclxuXHJcblx0XHQkLm5vdGlmeSgnQ3JlYXRpbmcgdGFzay4uLicsIHtcclxuXHRcdFx0Y2xhc3NOYW1lOiAnc3VjY2VzcyBpcy0nICsgbm90aWZpY2F0aW9uX2lkLFxyXG5cdFx0XHRhdXRvSGlkZTogZmFsc2UsXHJcblx0XHRcdHNob3dEdXJhdGlvbjogMCxcclxuXHRcdH0pO1xyXG5cclxuXHRcdHZhciAkbm90aWZpY2F0aW9uID0gJCgnLm5vdGlmeWpzLWJvb3RzdHJhcC1iYXNlLmlzLScgKyBub3RpZmljYXRpb25faWQpLnBhcmVudHMoJy5ub3RpZnlqcy13cmFwcGVyJyk7XHJcblx0XHRzZWxmLiRyb290LmFkZENsYXNzKCdpcy1sb2FkaW5nJyk7XHJcblxyXG5cdFx0Ym9hcmQuaGFuZGxlcnMuY3JlYXRlX2l0ZW0oe1xyXG5cdFx0XHR0aXRsZTogZmlsZXNbMF0ubmFtZSxcclxuXHRcdFx0cG9zaXRpb246ICgkbGFzdF9pdGVtWzBdID8gJGxhc3RfaXRlbS5kYXRhKCdpdGVtJykucG9zaXRpb24gKyA2NTUzNiA6IDY1NTM1KSxcclxuXHRcdH0sIHNlbGYsIGZ1bmN0aW9uKGl0ZW1fb3B0aW9ucykge1xyXG5cdFx0XHQkbm90aWZpY2F0aW9uLmNsaWNrKCk7XHJcblxyXG5cdFx0XHRpZiAoIWl0ZW1fb3B0aW9ucykge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIGl0ZW0gPSBzZWxmLmNyZWF0ZUl0ZW0oaXRlbV9vcHRpb25zKTtcclxuXHRcdFx0aXRlbS5vcHRpbWl6ZVRpdGxlVGV4dGFyZWEoKTtcclxuXHRcdFx0aXRlbS5ib3VuY2VJbigpO1xyXG5cdFx0XHRzZWxmLnNjcm9sbEJvdHRvbSgpO1xyXG5cdFx0XHRpdGVtLiRyb290LmFkZENsYXNzKCdpcy1sb2FkaW5nJyk7XHJcblxyXG5cdFx0XHRyZXR1cm4gc2VyaWVzKGZpbGVzLm1hcChmdW5jdGlvbihmaWxlKSB7XHJcblx0XHRcdFx0dmFyIG5vdGlmaWNhdGlvbl9pZCA9IERhdGUubm93KCkudG9TdHJpbmcoMzYpICsgTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc2xpY2UoMik7XHJcblxyXG5cdFx0XHRcdCQubm90aWZ5KCdVcGxvYWRpbmc6IDAlJywge1xyXG5cdFx0XHRcdFx0Y2xhc3NOYW1lOiAnc3VjY2VzcyBpcy0nICsgbm90aWZpY2F0aW9uX2lkLFxyXG5cdFx0XHRcdFx0YXV0b0hpZGU6IGZhbHNlLFxyXG5cdFx0XHRcdFx0c2hvd0R1cmF0aW9uOiAwLFxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHR2YXIgJG5vdGlmaWNhdGlvbiA9ICQoJy5ub3RpZnlqcy1ib290c3RyYXAtYmFzZS5pcy0nICsgbm90aWZpY2F0aW9uX2lkKS5wYXJlbnRzKCcubm90aWZ5anMtd3JhcHBlcicpO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuXHRcdFx0XHRcdHZhciBkYXRhID0gbmV3IEZvcm1EYXRhO1xyXG5cdFx0XHRcdFx0ZGF0YS5hcHBlbmQoJ3Byb2plY3RfdGFza19hdHRhY2htZW50W2ZpbGVdJywgZmlsZSk7XHJcblx0XHRcdFx0XHR2YXIgc3RhcnRlZF9hdCA9IERhdGUubm93KCk7XHJcblxyXG5cdFx0XHRcdFx0cmVxdWVzdCh7XHJcblx0XHRcdFx0XHRcdG1ldGhvZDogJ1BPU1QnLFxyXG5cdFx0XHRcdFx0XHR1cmw6ICcvcHJvamVjdF90YXNrcy8nICsgaXRlbS5vYmplY3QuaWQgKyAnL2F0dGFjaG1lbnRzL2NyZWF0ZScsXHJcblx0XHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRcdGNvbnRlbnRUeXBlOiBmYWxzZSxcclxuXHRcdFx0XHRcdFx0cHJvY2Vzc0RhdGE6IGZhbHNlLFxyXG5cclxuXHRcdFx0XHRcdFx0cHJvZ3Jlc3M6IGZ1bmN0aW9uKHBlcmNlbnQpIHtcclxuXHRcdFx0XHRcdFx0XHQkbm90aWZpY2F0aW9uLmZpbmQoJ3NwYW4nKS50ZXh0KCdVcGxvYWRpbmc6ICcgKyBwZXJjZW50ICsgJyUnKTtcclxuXHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcblx0XHRcdFx0XHRcdCRub3RpZmljYXRpb24uY2xpY2soKTtcclxuXHJcblx0XHRcdFx0XHRcdGlmIChyZXNwb25zZS5lcnJvcikge1xyXG5cdFx0XHRcdFx0XHRcdCQubm90aWZ5KHJlc3BvbnNlLmVycm9yLCAnZXJyb3InKTtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gY2FsbGJhY2soKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0aWYgKHJlc3BvbnNlLmRhdGEuaXNfY292ZXIpIHtcclxuXHRcdFx0XHRcdFx0XHRpdGVtLm9iamVjdC5hdHRhY2htZW50cy5mb3JFYWNoKGZ1bmN0aW9uKHByb2plY3RfdGFza19hdHRhY2htZW50KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRwcm9qZWN0X3Rhc2tfYXR0YWNobWVudC5pc19jb3ZlciA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRcdH0pO1x0XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdGl0ZW0ub2JqZWN0LmF0dGFjaG1lbnRzLnB1c2gocmVzcG9uc2UuZGF0YSk7XHJcblx0XHRcdFx0XHRcdGl0ZW0ucmVuZGVyQ292ZXIoKTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGNhbGxiYWNrKCk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9KSwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0c2VsZi5zY3JvbGxCb3R0b20oKTtcclxuXHRcdFx0XHRpdGVtLiRyb290LnJlbW92ZUNsYXNzKCdpcy1sb2FkaW5nJyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0c2VsZi4kcm9vdC5kaXNhYmxlU2VsZWN0aW9uKCk7XHJcblxyXG5cdHNlbGYuJHJvb3QuaG92ZXIoZnVuY3Rpb24oKSB7XHJcblx0XHRib2FyZC5ob3ZlcmVkX2NvbHVtbiA9IHNlbGY7XHJcblx0fSwgZnVuY3Rpb24oKSB7XHJcblx0XHRib2FyZC5ob3ZlcmVkX2NvbHVtbiA9IG51bGw7XHJcblx0fSk7XHJcblxyXG5cdHNlbGYuJHJvb3Qub24oJ2RyYWcgZHJhZ3N0YXJ0IGRyYWdlbmQgZHJhZ292ZXIgZHJhZ2VudGVyIGRyYWdsZWF2ZSBkcm9wJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHQgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHQgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0fSkub24oJ2RyYWdlbnRlcicsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHQrK3NlbGYuZHJhZ2dpbmc7XHJcblxyXG5cdFx0aWYgKHNlbGYuZHJhZ2dpbmcgPiAxKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0ICAgIHNlbGYuJHJvb3QuYWRkQ2xhc3MoJ2lzLWRyYWdvdmVyJyk7XHJcblx0ICAgIHNlbGYuJGRyb3B6b25lX3RleHQuYWRkQ2xhc3MoJ2FuaW1hdGVkIGJvdW5jZUluJyk7XHJcblx0fSkub24oJ2RyYWdsZWF2ZSBkcm9wJywgZnVuY3Rpb24oKSB7XHJcblx0XHQtLXNlbGYuZHJhZ2dpbmc7XHJcblxyXG5cdFx0aWYgKHNlbGYuZHJhZ2dpbmcgPiAwKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRzZWxmLiRyb290LnJlbW92ZUNsYXNzKCdpcy1kcmFnb3ZlcicpO1xyXG5cdFx0c2VsZi4kZHJvcHpvbmVfdGV4dC5yZW1vdmVDbGFzcygnYW5pbWF0ZWQgYm91bmNlSW4nKTtcclxuXHR9KS5vbignZHJvcCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRzZWxmLnVwbG9hZEZpbGVzKGV2ZW50Lm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzIHx8IFtdKTtcclxuXHR9KTtcclxuXHJcblx0c2VsZi4kaGVhZGVyX3RhcmdldC5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdHNlbGYuJHRpdGxlX3RleHRhcmVhLmZvY3VzKCk7XHJcblx0XHRzZXRfaW5wdXRfY2FycmV0X2F0X2VuZChzZWxmLiR0aXRsZV90ZXh0YXJlYVswXSk7XHJcblx0fSk7XHJcblxyXG5cdHNlbGYuJHRpdGxlX3RleHRhcmVhLm9uKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0c2VsZi5vcHRpbWl6ZVRpdGxlVGV4dGFyZWEoKTtcclxuXHR9KTtcclxuXHJcblx0c2VsZi4kdGl0bGVfdGV4dGFyZWEua2V5cHJlc3MoZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdGlmIChldmVudC53aGljaCA9PSAxMykge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHQkKHRoaXMpLmJsdXIoKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHRzZWxmLiR0aXRsZV90ZXh0YXJlYS5rZXlkb3duKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRpZiAoZXZlbnQua2V5ID09ICdFc2NhcGUnKSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdCQodGhpcykudmFsKHNlbGYudGl0bGUpO1xyXG5cdFx0XHQkKHRoaXMpLmJsdXIoKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHRzZWxmLiR0aXRsZV90ZXh0YXJlYS5mb2N1cyhmdW5jdGlvbigpIHtcclxuXHRcdHNlbGYuJGhlYWRlcl90YXJnZXQuYWRkQ2xhc3MoJ2lzLWhpZGRlbicpO1xyXG5cdFx0c2VsZi4kZGVsZXRlX2J1dHRvbi5hZGRDbGFzcygnaXMtaGlkZGVuJyk7XHJcblx0XHRzZWxmLiRyb290LmVuYWJsZVNlbGVjdGlvbigpO1xyXG5cdH0pO1xyXG5cclxuXHRzZWxmLiR0aXRsZV90ZXh0YXJlYS5ibHVyKGZ1bmN0aW9uKCkge1xyXG5cdFx0c2VsZi4kaGVhZGVyX3RhcmdldC5yZW1vdmVDbGFzcygnaXMtaGlkZGVuJyk7XHJcblx0XHRzZWxmLiRkZWxldGVfYnV0dG9uLnJlbW92ZUNsYXNzKCdpcy1oaWRkZW4nKTtcclxuXHRcdHNlbGYuJHJvb3QuZGlzYWJsZVNlbGVjdGlvbigpO1xyXG5cclxuXHRcdGlmIChzZWxmLnRpdGxlID09ICQodGhpcykudmFsKCkpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghJCh0aGlzKS52YWwoKSkge1xyXG5cdFx0XHQkKHRoaXMpLnZhbChzZWxmLnRpdGxlKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNlbGYudGl0bGUgPSAkKHRoaXMpLnZhbCgpO1xyXG5cdFx0c2VsZi4kZGVsZXRlX2J1dHRvbi5hZGRDbGFzcygnaXMtbG9hZGluZyBkaXNhYmxlZCcpO1xyXG5cclxuXHRcdGJvYXJkLmhhbmRsZXJzLnVwZGF0ZV9jb2x1bW4oc2VsZiwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdHNlbGYuJGRlbGV0ZV9idXR0b24ucmVtb3ZlQ2xhc3MoJ2lzLWxvYWRpbmcgZGlzYWJsZWQnKTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHRzZWxmLmRlbGV0ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0c2VsZi5nZXRJdGVtcygpLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xyXG5cdFx0XHRpdGVtLmRlbGV0ZSgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0c2VsZi4kcm9vdC5lbXB0eSgpLnJlbW92ZSgpO1xyXG5cdH07XHJcblxyXG5cdHNlbGYuJGRlbGV0ZV9idXR0b24uY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWxvYWRpbmcgZGlzYWJsZWQnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bW9kYWxzLmNvbmZpcm1fYWN0aW9uKHtcclxuXHRcdFx0cXVlc3Rpb246ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gYXJjaGl2ZSB0aGlzIGxpc3Q/JyxcclxuXHJcblx0XHRcdGNvbmZpcm06IGZ1bmN0aW9uKGNsb3NlKSB7XHJcblx0XHRcdFx0Ym9hcmQuaGFuZGxlcnMuYXJjaGl2ZV9jb2x1bW4oc2VsZiwgZnVuY3Rpb24od2FzX2FyY2hpdmVkKSB7XHJcblx0XHRcdFx0XHRpZiAoIXdhc19hcmNoaXZlZCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0c2VsZi5kZWxldGUoKTtcclxuXHRcdFx0XHRcdGNsb3NlKCk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0sXHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0c2VsZi4kYWRkX2l0ZW1fZm9ybS5maW5kKCcuYm9hcmQtY29sdW1uX19hZGQtaXRlbS1mb3JtX19jbG9zZS1idXR0b24nKS5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdHNlbGYuJGFkZF9pdGVtX2Zvcm1faW5wdXQudmFsKCcnKTtcclxuXHRcdHNlbGYub3B0aW1pemVBZGRJdGVtVGV4dGFyZWEoKTtcclxuXHRcdHNlbGYuJGFkZF9pdGVtX2Zvcm0uYWRkQ2xhc3MoJ2lzLWhpZGRlbicpO1xyXG5cdFx0c2VsZi4kYWRkX2l0ZW1fbGluay5yZW1vdmVDbGFzcygnaXMtaGlkZGVuJyk7XHJcblx0fSk7XHJcblxyXG5cdHNlbGYuJGFkZF9pdGVtX2Zvcm0uc3VibWl0KGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdGlmICghc2VsZi4kYWRkX2l0ZW1fZm9ybV9pbnB1dC52YWwoKSkge1xyXG5cdFx0XHRzZWxmLiRhZGRfaXRlbV9mb3JtX2lucHV0LmZvY3VzKCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgJGJ1dHRvbiA9IHNlbGYuJGFkZF9pdGVtX2Zvcm0uZmluZCgnLmJvYXJkLWNvbHVtbl9fYWRkLWl0ZW0tZm9ybV9fYWRkLWJ1dHRvbicpO1xyXG5cdFx0JGJ1dHRvbi5hZGRDbGFzcygnaXMtbG9hZGluZyBkaXNhYmxlZCcpO1xyXG5cdFx0dmFyICRsYXN0X2l0ZW0gPSBzZWxmLiRpdGVtcy5maW5kKCcuYm9hcmQtaXRlbVtkYXRhLWlkXTpsYXN0Jyk7XHJcblxyXG5cdFx0Ym9hcmQuaGFuZGxlcnMuY3JlYXRlX2l0ZW0oe1xyXG5cdFx0XHR0aXRsZTogc2VsZi4kYWRkX2l0ZW1fZm9ybV9pbnB1dC52YWwoKSxcclxuXHRcdFx0cG9zaXRpb246ICgkbGFzdF9pdGVtWzBdID8gJGxhc3RfaXRlbS5kYXRhKCdpdGVtJykucG9zaXRpb24gKyA2NTUzNiA6IDY1NTM1KSxcclxuXHRcdH0sIHNlbGYsIGZ1bmN0aW9uKGl0ZW1fb3B0aW9ucykge1xyXG5cdFx0XHQkYnV0dG9uLnJlbW92ZUNsYXNzKCdpcy1sb2FkaW5nIGRpc2FibGVkJyk7XHJcblxyXG5cdFx0XHRpZiAoIWl0ZW1fb3B0aW9ucykge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIGl0ZW0gPSBzZWxmLmNyZWF0ZUl0ZW0oaXRlbV9vcHRpb25zKTtcclxuXHRcdFx0aXRlbS5vcHRpbWl6ZVRpdGxlVGV4dGFyZWEoKTtcclxuXHRcdFx0aXRlbS5ib3VuY2VJbigpO1xyXG5cdFx0XHRzZWxmLiRhZGRfaXRlbV9mb3JtX2lucHV0LnZhbCgnJyk7XHJcblx0XHRcdHNlbGYub3B0aW1pemVBZGRJdGVtVGV4dGFyZWEoKTtcclxuXHRcdFx0c2VsZi5zY3JvbGxCb3R0b20oKTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHRzZWxmLiRhZGRfaXRlbV9mb3JtLmtleWRvd24oZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdGlmIChldmVudC5rZXkgPT0gJ0VzY2FwZScpIHtcclxuXHRcdFx0c2VsZi4kYWRkX2l0ZW1fZm9ybS5maW5kKCcuYm9hcmQtY29sdW1uX19hZGQtaXRlbS1mb3JtX19jbG9zZS1idXR0b24nKS5jbGljaygpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdHNlbGYuJGFkZF9pdGVtX2Zvcm1faW5wdXQua2V5cHJlc3MoZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdGlmIChldmVudC53aGljaCA9PSAxMykge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRzZWxmLiRhZGRfaXRlbV9mb3JtLnN1Ym1pdCgpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdHNlbGYuJGFkZF9pdGVtX2Zvcm1faW5wdXQub24oJ2lucHV0JywgZnVuY3Rpb24oKSB7XHJcblx0XHRzZWxmLm9wdGltaXplQWRkSXRlbVRleHRhcmVhKCk7XHJcblx0fSk7XHJcblxyXG5cdHNlbGYuJGFkZF9pdGVtX2xpbmsuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRzZWxmLiRhZGRfaXRlbV9saW5rLmFkZENsYXNzKCdpcy1oaWRkZW4nKTtcclxuXHRcdHNlbGYuJGFkZF9pdGVtX2Zvcm0ucmVtb3ZlQ2xhc3MoJ2lzLWhpZGRlbicpO1xyXG5cdFx0c2VsZi5zY3JvbGxCb3R0b20oKTtcclxuXHRcdHNlbGYuJGFkZF9pdGVtX2Zvcm1faW5wdXQuZm9jdXMoKTtcclxuXHR9KTtcclxuXHJcblx0c2VsZi4kcm9vdC5zb3J0YWJsZSh7XHJcblx0XHRpdGVtczogJy5ib2FyZC1pdGVtJyxcclxuXHRcdGNvbm5lY3RXaXRoOiAnLmJvYXJkLWNvbHVtbi13cmFwcGVyJyxcclxuXHRcdGhhbmRsZTogJy5ib2FyZC1pdGVtLXdyYXBwZXI6bm90KC5pcy1tZW51LXNob3duKScsXHJcblx0XHRjdXJzb3I6ICdwb2ludGVyJyxcclxuXHRcdHJldmVydDogMjAwLFxyXG5cdFx0aGVscGVyOiAnY2xvbmUnLFxyXG5cdFx0YXBwZW5kVG86IGRvY3VtZW50LmJvZHksXHJcblx0XHR6SW5kZXg6IDEwNTAsXHJcblx0XHQvLyBzY3JvbGw6IHRydWUsXHJcblx0XHQvLyBzY3JvbGxTZW5zaXRpdml0eTogMTAwLFxyXG5cdFx0Ly8gc2Nyb2xsU3BlZWQ6IDEwMCxcclxuXHJcbiAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xyXG5cdCAgICAgICAgdWkucGxhY2Vob2xkZXIuaGVpZ2h0KHVpLml0ZW0uaGVpZ2h0KCkpO1xyXG5cdCAgICAgICAgdWkuaGVscGVyLmFkZENsYXNzKCdpcy1yb3RhdGVkJyk7XHJcblxyXG5cdFx0XHR1aS5oZWxwZXIubW91c2V1cChmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRcdHVpLmhlbHBlci5yZW1vdmVDbGFzcygnaXMtcm90YXRlZCcpO1xyXG5cdFx0XHR9KTtcclxuXHQgICAgfSxcclxuXHJcblx0ICAgIC8vIHNvcnQ6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xyXG5cdCAgICAvLyBcdCh1aS5oZWxwZXIud2lkdGgoKSAhPSB1aS5wbGFjZWhvbGRlci53aWR0aCgpKSAmJiB1aS5oZWxwZXIud2lkdGgodWkucGxhY2Vob2xkZXIud2lkdGgoKSk7XHJcblx0ICAgIC8vIH0sXHJcblxyXG5cdCAgICB1cGRhdGU6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xyXG5cdFx0XHRpZiAodGhpcyAhPT0gdWkuaXRlbS5wYXJlbnRzKCcuYm9hcmQtY29sdW1uLXdyYXBwZXInKVswXSkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIGl0ZW0gPSB1aS5pdGVtLmRhdGEoJ2l0ZW0nKTtcclxuXHRcdFx0dmFyICRwcmV2aW91c19pdGVtID0gdWkuaXRlbS5wcmV2KCcuYm9hcmQtaXRlbVtkYXRhLWlkXScpO1xyXG5cdFx0XHR2YXIgJG5leHRfaXRlbSA9IHVpLml0ZW0ubmV4dCgnLmJvYXJkLWl0ZW1bZGF0YS1pZF0nKTtcclxuXHJcblx0XHRcdGlmICgkcHJldmlvdXNfaXRlbVswXSAmJiAkbmV4dF9pdGVtWzBdKSB7XHJcblx0XHRcdFx0aXRlbS5wb3NpdGlvbiA9ICgkbmV4dF9pdGVtLmRhdGEoJ2l0ZW0nKS5wb3NpdGlvbiArICRwcmV2aW91c19pdGVtLmRhdGEoJ2l0ZW0nKS5wb3NpdGlvbikgLyAyO1xyXG5cdFx0XHR9IGVsc2UgaWYgKCRwcmV2aW91c19pdGVtWzBdKSB7XHJcblx0XHRcdFx0aXRlbS5wb3NpdGlvbiA9ICgkcHJldmlvdXNfaXRlbS5kYXRhKCdpdGVtJykucG9zaXRpb24gKyA2NTUzNikgLyAyO1xyXG5cdFx0XHR9IGVsc2UgaWYgKCRuZXh0X2l0ZW1bMF0pIHtcclxuXHRcdFx0XHRpdGVtLnBvc2l0aW9uID0gJG5leHRfaXRlbS5kYXRhKCdpdGVtJykucG9zaXRpb24gLyAyO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRib2FyZC5oYW5kbGVycy51cGRhdGVfaXRlbShpdGVtLCBzZWxmKTtcclxuXHQgICAgfSxcclxuICAgIH0pO1xyXG59O1xyXG5cclxuZGFzaGJvYXJkLkJvYXJkLkl0ZW0gPSBmdW5jdGlvbihvcHRpb25zLCBjb2x1bW4sIGJvYXJkKSB7XHJcblx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdHNlbGYuaWQgPSBvcHRpb25zLmlkO1xyXG5cdHNlbGYudGl0bGUgPSBvcHRpb25zLnRpdGxlO1xyXG5cdHNlbGYucG9zaXRpb24gPSBvcHRpb25zLnBvc2l0aW9uO1xyXG5cdHNlbGYub2JqZWN0ID0gb3B0aW9ucy5vYmplY3Q7XHJcblx0c2VsZi5kcmFnZ2luZyA9IDA7XHJcblxyXG5cdHNlbGYuJHJvb3QgPSAkKGRhc2hib2FyZC50ZW1wbGF0ZSgnYm9hcmQtaXRlbScsIHtcclxuXHRcdGl0ZW06IHNlbGYsXHJcblx0fSkpLmRhdGEoJ2l0ZW0nLCBzZWxmKS5pbnNlcnRCZWZvcmUoY29sdW1uLiRhZGRfaXRlbV9mb3JtKTtcclxuXHJcblx0c2VsZi4kd3JhcHBlciA9IHNlbGYuJHJvb3QuZmluZCgnLmJvYXJkLWl0ZW0td3JhcHBlcicpO1xyXG5cdHNlbGYuJGhlYWRlcl90YXJnZXQgPSBzZWxmLiRyb290LmZpbmQoJy5ib2FyZC1pdGVtLWhlYWRlcl9fdGFyZ2V0Jyk7XHJcblx0c2VsZi4kdGl0bGVfdGV4dGFyZWEgPSBzZWxmLiRyb290LmZpbmQoJy5ib2FyZC1pdGVtLWhlYWRlcl9fdGl0bGUnKTtcclxuXHRzZWxmLiRtZW51X2J1dHRvbiA9IHNlbGYuJHJvb3QuZmluZCgnLmJvYXJkLWl0ZW0taGVhZGVyX19tZW51LWJ1dHRvbicpO1xyXG5cdHNlbGYuJGRyb3B6b25lID0gc2VsZi4kcm9vdC5maW5kKCcuYm9hcmQtaXRlbS1kcm9wem9uZScpO1xyXG5cdHNlbGYuJGRyb3B6b25lX3RleHQgPSBzZWxmLiRyb290LmZpbmQoJy5ib2FyZC1pdGVtLWRyb3B6b25lX190ZXh0Jyk7XHJcblxyXG5cdHNlbGYub3B0aW1pemVUaXRsZVRleHRhcmVhID0gZnVuY3Rpb24oKSB7XHJcblx0XHRzZWxmLiR0aXRsZV90ZXh0YXJlYS5jc3MoJ2hlaWdodCcsICcnKTtcclxuXHRcdHNlbGYuJHRpdGxlX3RleHRhcmVhLmNzcygnaGVpZ2h0Jywgc2VsZi4kdGl0bGVfdGV4dGFyZWFbMF0uc2Nyb2xsSGVpZ2h0ICsgJ3B4Jyk7XHJcblx0fTtcclxuXHJcblx0c2VsZi5ib3VuY2VJbiA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0c2VsZi4kcm9vdC5hZGRDbGFzcygnYW5pbWF0ZWQgYm91bmNlLWluJyk7XHJcblx0XHRjbGVhclRpbWVvdXQoc2VsZi5ib3VuY2VJbi50aW1lb3V0KTtcclxuXHJcblx0XHRzZWxmLmJvdW5jZUluLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRzZWxmLiRyb290LnJlbW92ZUNsYXNzKCdhbmltYXRlZCBib3VuY2UtaW4nKTtcclxuXHRcdH0sIDc1MCk7XHJcblx0fTtcclxuXHJcblx0c2VsZi51cGxvYWRGaWxlcyA9IGZ1bmN0aW9uKGZpbGVzLCBjYWxsYmFjaykge1xyXG5cdFx0ZmlsZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmaWxlcyk7XHJcblxyXG5cdFx0aWYgKGZpbGVzLmxlbmd0aCA9PSAwKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRzZWxmLiRyb290LmFkZENsYXNzKCdpcy1sb2FkaW5nJyk7XHJcblxyXG5cdFx0cmV0dXJuIHNlcmllcyhmaWxlcy5tYXAoZnVuY3Rpb24oZmlsZSkge1xyXG5cdFx0XHR2YXIgbm90aWZpY2F0aW9uX2lkID0gRGF0ZS5ub3coKS50b1N0cmluZygzNikgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zbGljZSgyKTtcclxuXHJcblx0XHRcdCQubm90aWZ5KCdVcGxvYWRpbmc6IDAlJywge1xyXG5cdFx0XHRcdGNsYXNzTmFtZTogJ3N1Y2Nlc3MgaXMtJyArIG5vdGlmaWNhdGlvbl9pZCxcclxuXHRcdFx0XHRhdXRvSGlkZTogZmFsc2UsXHJcblx0XHRcdFx0c2hvd0R1cmF0aW9uOiAwLFxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHZhciAkbm90aWZpY2F0aW9uID0gJCgnLm5vdGlmeWpzLWJvb3RzdHJhcC1iYXNlLmlzLScgKyBub3RpZmljYXRpb25faWQpLnBhcmVudHMoJy5ub3RpZnlqcy13cmFwcGVyJyk7XHJcblxyXG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IG5ldyBGb3JtRGF0YTtcclxuXHRcdFx0XHRkYXRhLmFwcGVuZCgncHJvamVjdF90YXNrX2F0dGFjaG1lbnRbZmlsZV0nLCBmaWxlKTtcclxuXHRcdFx0XHR2YXIgc3RhcnRlZF9hdCA9IERhdGUubm93KCk7XHJcblxyXG5cdFx0XHRcdHJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0bWV0aG9kOiAnUE9TVCcsXHJcblx0XHRcdFx0XHR1cmw6ICcvcHJvamVjdF90YXNrcy8nICsgc2VsZi5vYmplY3QuaWQgKyAnL2F0dGFjaG1lbnRzL2NyZWF0ZScsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0Y29udGVudFR5cGU6IGZhbHNlLFxyXG5cdFx0XHRcdFx0cHJvY2Vzc0RhdGE6IGZhbHNlLFxyXG5cclxuXHRcdFx0XHRcdHByb2dyZXNzOiBmdW5jdGlvbihwZXJjZW50KSB7XHJcblx0XHRcdFx0XHRcdCRub3RpZmljYXRpb24uZmluZCgnc3BhbicpLnRleHQoJ1VwbG9hZGluZzogJyArIHBlcmNlbnQgKyAnJScpO1xyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHR9LCBmdW5jdGlvbihyZXNwb25zZSkge1xyXG5cdFx0XHRcdFx0JG5vdGlmaWNhdGlvbi5jbGljaygpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChyZXNwb25zZS5lcnJvcikge1xyXG5cdFx0XHRcdFx0XHQkLm5vdGlmeShyZXNwb25zZS5lcnJvciwgJ2Vycm9yJyk7XHJcblx0XHRcdFx0XHRcdHJldHVybiBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmIChyZXNwb25zZS5kYXRhLmlzX2NvdmVyKSB7XHJcblx0XHRcdFx0XHRcdHNlbGYub2JqZWN0LmF0dGFjaG1lbnRzLmZvckVhY2goZnVuY3Rpb24ocHJvamVjdF90YXNrX2F0dGFjaG1lbnQpIHtcclxuXHRcdFx0XHRcdFx0XHRwcm9qZWN0X3Rhc2tfYXR0YWNobWVudC5pc19jb3ZlciA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHR9KTtcdFxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRzZWxmLm9iamVjdC5hdHRhY2htZW50cy5wdXNoKHJlc3BvbnNlLmRhdGEpO1xyXG5cdFx0XHRcdFx0c2VsZi5yZW5kZXJDb3ZlcigpO1xyXG5cdFx0XHRcdFx0c2VsZi5yZW5kZXJCYWRnZXMoKTtcclxuXHRcdFx0XHRcdHJldHVybiBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9O1xyXG5cdFx0fSksIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRzZWxmLiRyb290LnJlbW92ZUNsYXNzKCdpcy1sb2FkaW5nJyk7XHJcblx0XHRcdFxyXG5cdFx0XHQvLyBpZiAoZmlsZXMubGVuZ3RoID4gMSkge1xyXG5cdFx0XHQvLyBcdCQubm90aWZ5KCdGaWxlcyB3ZXJlIHVwbG9hZGVkIScsICdzdWNjZXNzJyk7XHJcblx0XHRcdC8vIH0gZWxzZSBpZiAoZmlsZXMubGVuZ3RoID09IDEpIHtcclxuXHRcdFx0Ly8gXHQkLm5vdGlmeSgnRmlsZSB3YXMgdXBsb2FkZWQhJywgJ3N1Y2Nlc3MnKTtcclxuXHRcdFx0Ly8gfVxyXG5cdFx0XHRcclxuXHRcdFx0cmV0dXJuIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRzZWxmLiRyb290LmhvdmVyKGZ1bmN0aW9uKCkge1xyXG5cdFx0Ym9hcmQuaG92ZXJlZF9pdGVtID0gc2VsZjtcclxuXHRcdHNlbGYuJHJvb3QuYWRkQ2xhc3MoJ2lzLWhvdmVyJyk7XHJcblx0fSwgZnVuY3Rpb24oKSB7XHJcblx0XHRib2FyZC5ob3ZlcmVkX2l0ZW0gPSBudWxsO1xyXG5cdFx0c2VsZi4kcm9vdC5yZW1vdmVDbGFzcygnaXMtaG92ZXInKTtcclxuXHR9KTtcclxuXHJcblx0Ly8gc2VsZi4kcm9vdC5tb3VzZWRvd24oZnVuY3Rpb24oZXZlbnQpIHtcclxuXHQvLyBcdHNlbGYuJHJvb3QucmVtb3ZlQ2xhc3MoJ2FuaW1hdGVkIHdlYWtCb3VuY2VJbicpO1xyXG5cdC8vIH0pO1xyXG5cclxuXHRzZWxmLiRyb290LmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdGlmICgkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLmJvYXJkLWl0ZW0taGVhZGVyJykubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcuYm9hcmQtaXRlbS1tZW1iZXInKS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJy5ib2FyZC1pdGVtX19tZW1iZXJzX19hZGQtbmV3LWJ1dHRvbicpLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1vZGFscy5wcm9qZWN0X3Rhc2soe1xyXG5cdFx0XHRwcm9qZWN0X3Rhc2s6IHNlbGYub2JqZWN0LFxyXG5cdFx0XHRib2FyZF9pdGVtOiBzZWxmLFxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdHNlbGYuJGhlYWRlcl90YXJnZXQuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0Ly8gc2VsZi4kdGl0bGVfdGV4dGFyZWEuZm9jdXMoKTtcclxuXHRcdC8vIHNldF9pbnB1dF9jYXJyZXRfYXRfZW5kKHNlbGYuJHRpdGxlX3RleHRhcmVhWzBdKTtcclxuXHJcblx0XHRtb2RhbHMucHJvamVjdF90YXNrKHtcclxuXHRcdFx0cHJvamVjdF90YXNrOiBzZWxmLm9iamVjdCxcclxuXHRcdFx0Ym9hcmRfaXRlbTogc2VsZixcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHRzZWxmLiR0aXRsZV90ZXh0YXJlYS5vbignaW5wdXQnLCBmdW5jdGlvbigpIHtcclxuXHRcdHNlbGYub3B0aW1pemVUaXRsZVRleHRhcmVhKCk7XHJcblx0fSk7XHJcblxyXG5cdHNlbGYuJHRpdGxlX3RleHRhcmVhLmtleXByZXNzKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRpZiAoZXZlbnQud2hpY2ggPT0gMTMpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0JCh0aGlzKS5ibHVyKCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0c2VsZi4kdGl0bGVfdGV4dGFyZWEua2V5ZG93bihmdW5jdGlvbihldmVudCkge1xyXG5cdFx0aWYgKGV2ZW50LmtleSA9PSAnRXNjYXBlJykge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHQkKHRoaXMpLnZhbChzZWxmLnRpdGxlKTtcclxuXHRcdFx0JCh0aGlzKS5ibHVyKCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0c2VsZi4kdGl0bGVfdGV4dGFyZWEuZm9jdXMoZnVuY3Rpb24oKSB7XHJcblx0XHRzZWxmLiR0aXRsZV90ZXh0YXJlYS5hZGRDbGFzcygnaXMtaGlkZGVuJyk7XHJcblx0XHRzZWxmLiRtZW51X2J1dHRvbi5hZGRDbGFzcygnaXMtaGlkZGVuJyk7XHJcblx0XHRjb2x1bW4uJHJvb3QuZW5hYmxlU2VsZWN0aW9uKCk7XHJcblx0fSk7XHJcblxyXG5cdHNlbGYuJHRpdGxlX3RleHRhcmVhLmJsdXIoZnVuY3Rpb24oKSB7XHJcblx0XHRzZWxmLiRoZWFkZXJfdGFyZ2V0LnJlbW92ZUNsYXNzKCdpcy1oaWRkZW4nKTtcclxuXHRcdHNlbGYuJG1lbnVfYnV0dG9uLnJlbW92ZUNsYXNzKCdpcy1oaWRkZW4nKTtcclxuXHRcdGNvbHVtbi4kcm9vdC5kaXNhYmxlU2VsZWN0aW9uKCk7XHJcblxyXG5cdFx0aWYgKHNlbGYudGl0bGUgPT0gJCh0aGlzKS52YWwoKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCEkKHRoaXMpLnZhbCgpKSB7XHJcblx0XHRcdCQodGhpcykudmFsKHNlbGYudGl0bGUpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0c2VsZi50aXRsZSA9ICQodGhpcykudmFsKCk7XHJcblx0XHRzZWxmLiRtZW51X2J1dHRvbi5hZGRDbGFzcygnaXMtbG9hZGluZyBkaXNhYmxlZCcpO1xyXG5cclxuXHRcdGJvYXJkLmhhbmRsZXJzLnVwZGF0ZV9pdGVtKHNlbGYsIGNvbHVtbiwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdHNlbGYuJG1lbnVfYnV0dG9uLnJlbW92ZUNsYXNzKCdpcy1sb2FkaW5nIGRpc2FibGVkJyk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0c2VsZi4kcm9vdC5vbignZHJhZyBkcmFnc3RhcnQgZHJhZ2VuZCBkcmFnb3ZlciBkcmFnZW50ZXIgZHJhZ2xlYXZlIGRyb3AnLCBmdW5jdGlvbihldmVudCkge1xyXG5cdCAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdCAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHR9KS5vbignZHJhZ2VudGVyJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdCsrc2VsZi5kcmFnZ2luZztcclxuXHJcblx0XHRpZiAoc2VsZi5kcmFnZ2luZyA+IDEpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHQgICAgc2VsZi4kcm9vdC5hZGRDbGFzcygnaXMtZHJhZ292ZXInKTtcclxuXHJcblx0ICAgIHNlbGYuJGRyb3B6b25lLmNzcyh7XHJcblx0ICAgIFx0aGVpZ2h0OiBzZWxmLiRyb290LmhlaWdodCgpICsgJ3B4JyxcclxuXHQgICAgXHRsaW5lSGVpZ2h0OiBzZWxmLiRyb290LmhlaWdodCgpICsgJ3B4JyxcclxuXHQgICAgfSk7XHJcblxyXG5cdCAgICBzZWxmLiRkcm9wem9uZV90ZXh0LmFkZENsYXNzKCdhbmltYXRlZCBib3VuY2VJbicpO1xyXG5cdH0pLm9uKCdkcmFnbGVhdmUgZHJvcCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0LS1zZWxmLmRyYWdnaW5nO1xyXG5cclxuXHRcdGlmIChzZWxmLmRyYWdnaW5nID4gMCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0c2VsZi4kcm9vdC5yZW1vdmVDbGFzcygnaXMtZHJhZ292ZXInKTtcclxuXHRcdHNlbGYuJGRyb3B6b25lX3RleHQucmVtb3ZlQ2xhc3MoJ2FuaW1hdGVkIGJvdW5jZUluJyk7XHJcblx0fSkub24oJ2Ryb3AnLCBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0c2VsZi51cGxvYWRGaWxlcyhldmVudC5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5maWxlcyB8fCBbXSk7XHJcblx0fSk7XHJcblxyXG5cdHNlbGYucmVuZGVyVGl0bGUgPSBmdW5jdGlvbigpIHtcclxuXHRcdHNlbGYuJHRpdGxlX3RleHRhcmVhLnZhbChzZWxmLm9iamVjdC50aXRsZSk7XHJcblx0fTtcclxuXHJcblx0c2VsZi5yZW5kZXJNZW1iZXJzID0gZnVuY3Rpb24oKSB7XHJcblx0XHRzZWxmLiRyb290LmZpbmQoJy5ib2FyZC1pdGVtLW1lbWJlcicpLnJlbW92ZSgpO1xyXG5cdFx0dmFyICRtZW1iZXJzID0gc2VsZi4kcm9vdC5maW5kKCcuYm9hcmQtaXRlbV9fbWVtYmVycycpO1xyXG5cdFx0XHJcblx0XHRzZWxmLm9iamVjdC5tZW1iZXJzLmZvckVhY2goZnVuY3Rpb24obWVtYmVyKSB7XHJcblx0XHRcdHZhciAkbWVtYmVyID0gJChkYXNoYm9hcmQudGVtcGxhdGUoJ2JvYXJkLWl0ZW0tbWVtYmVyJywge1xyXG5cdFx0XHRcdG1lbWJlcjogbWVtYmVyLFxyXG5cdFx0XHR9KSk7XHJcblxyXG5cdFx0XHR2YXIgcHJvamVjdF9tZW1iZXIgPSBib2FyZC5vYmplY3QubWVtYmVycy5maWx0ZXIoZnVuY3Rpb24oY3VycmVudF9ib2FyZF9tZW1iZXIpIHtcclxuXHRcdFx0XHRyZXR1cm4gY3VycmVudF9ib2FyZF9tZW1iZXIudXNlcl9pZCA9PSBtZW1iZXIudXNlcl9pZDtcclxuXHRcdFx0fSlbMF0gfHwgbnVsbDtcclxuXHJcblx0XHRcdHBvcG92ZXJzLnByb2plY3RfbWVtYmVyX21lbnUoe1xyXG5cdFx0XHRcdHRyaWdnZXI6ICRtZW1iZXIsXHJcblx0XHRcdFx0cHJvamVjdF9tZW1iZXI6IHByb2plY3RfbWVtYmVyLFxyXG5cdFx0XHRcdHByb2plY3Q6IGRhc2hib2FyZC5zZWxlY3RlZF9wcm9qZWN0LFxyXG5cdFx0XHRcdHByb2plY3RfYm9hcmQ6IGJvYXJkLm9iamVjdCxcclxuXHRcdFx0XHRib2FyZF9pdGVtOiBzZWxmLFxyXG5cdFx0XHRcdHByb2plY3RfdGFza19tZW1iZXI6IG1lbWJlcixcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQkbWVtYmVyLnByZXBlbmRUbygkbWVtYmVycyk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRzZWxmLnJlbmRlckJhZGdlcyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyICRyb290ID0gc2VsZi4kcm9vdC5maW5kKCcuYm9hcmQtaXRlbV9fYmFkZ2VzJyk7XHJcblxyXG5cdFx0dmFyICRuZXdfcm9vdCA9ICQoZGFzaGJvYXJkLnRlbXBsYXRlKCdib2FyZC1pdGVtLWJhZGdlcycsIHtcclxuXHRcdFx0aXRlbTogc2VsZixcclxuXHRcdFx0dGFzazogc2VsZi5vYmplY3QsXHJcblx0XHR9KSk7XHJcblxyXG5cdFx0JHJvb3QuaHRtbCgkbmV3X3Jvb3QuaHRtbCgpKS5hdHRyKCdjbGFzcycsICRuZXdfcm9vdC5hdHRyKCdjbGFzcycpKTtcclxuXHR9O1xyXG5cclxuXHRzZWxmLnJlbmRlckNvdmVyID0gZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgY292ZXJfYXR0YWNobWVudCA9IHNlbGYub2JqZWN0LmF0dGFjaG1lbnRzLmZpbHRlcihmdW5jdGlvbihhdHRhY2htZW50KSB7XHJcblx0XHRcdHJldHVybiBhdHRhY2htZW50LmlzX2NvdmVyO1xyXG5cdFx0fSlbMF0gfHwgbnVsbDtcclxuXHJcblx0XHR2YXIgJGNvdmVyID0gc2VsZi4kcm9vdC5maW5kKCcuYm9hcmQtaXRlbV9fY292ZXInKTtcclxuXHJcblx0XHRpZiAoIWNvdmVyX2F0dGFjaG1lbnQpIHtcclxuXHRcdFx0JGNvdmVyLmFkZENsYXNzKCdkLW5vbmUnKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdCRjb3Zlci5yZW1vdmVDbGFzcygnZC1ub25lJyk7XHJcblx0XHQkY292ZXIuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJywgJ3VybChcXCcnICsgY292ZXJfYXR0YWNobWVudC50aHVtYm5haWxzLm1pZGRsZS51cmwgKyAnXFwnKScpO1xyXG5cdFx0dmFyIGNvdmVyX2hlaWdodCA9IGNvdmVyX2F0dGFjaG1lbnQudGh1bWJuYWlscy5taWRkbGUuaGVpZ2h0O1xyXG5cclxuXHRcdGlmIChjb3Zlcl9hdHRhY2htZW50LnRodW1ibmFpbHMubWlkZGxlLndpZHRoID4gMjU0KSB7XHJcblx0XHRcdGNvdmVyX2hlaWdodCA9IDI1NCAvIGNvdmVyX2F0dGFjaG1lbnQudGh1bWJuYWlscy5taWRkbGUud2lkdGggKiBjb3Zlcl9hdHRhY2htZW50LnRodW1ibmFpbHMubWlkZGxlLmhlaWdodDtcclxuXHRcdH1cclxuXHJcblx0XHQkY292ZXIuaGVpZ2h0KE1hdGgubWluKGNvdmVyX2hlaWdodCwgMjYwKSk7XHJcblx0XHQkY292ZXIuY3NzKCdiYWNrZ3JvdW5kLXNpemUnLCBjb3Zlcl9hdHRhY2htZW50LnRodW1ibmFpbHMubWlkZGxlLndpZHRoID4gMjU0ID8gJ2NvdmVyJyA6ICdjb250YWluJyk7XHJcblx0fTtcclxuXHJcblx0c2VsZi5kZWxldGUgPSBmdW5jdGlvbigpIHtcclxuXHRcdHNlbGYuJHJvb3QuZW1wdHkoKS5yZW1vdmUoKTtcclxuXHR9O1xyXG5cclxuXHQoZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcclxuXHRcdHNlbGYucmVuZGVyTWVtYmVycygpO1xyXG5cdFx0c2VsZi5yZW5kZXJCYWRnZXMoKTtcclxuXHRcdHNlbGYucmVuZGVyQ292ZXIoKTtcclxuXHR9KSgpO1xyXG5cclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXHJcblxyXG5cdHBvcG92ZXJzLm1hbmFnZV9wcm9qZWN0X3Rhc2tfbWVtYmVycyh7XHJcblx0XHR0cmlnZ2VyOiBzZWxmLiRyb290LmZpbmQoJy5ib2FyZC1pdGVtX19tZW1iZXJzX19hZGQtbmV3LWJ1dHRvbicpLFxyXG5cdFx0cHJvamVjdDogZGFzaGJvYXJkLnNlbGVjdGVkX3Byb2plY3QsXHJcblx0XHRwcm9qZWN0X2JvYXJkOiBib2FyZC5vYmplY3QsXHJcblxyXG5cdFx0cHJvamVjdF90YXNrOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmV0dXJuIHNlbGYub2JqZWN0O1xyXG5cdFx0fSxcclxuXHJcblx0XHR0YXNrX3VwZGF0ZWQ6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuXHRcdFx0c2VsZi5vYmplY3QubWVtYmVycyA9IG9wdGlvbnMucHJvamVjdF90YXNrX21lbWJlcnM7XHJcblx0XHRcdC8vIGJvYXJkLm9iamVjdC5tZW1iZXJzID0gb3B0aW9ucy5wcm9qZWN0X21lbWJlcnM7IC8vID9cclxuXHRcdFx0c2VsZi5yZW5kZXJNZW1iZXJzKCk7XHJcblx0XHR9LFxyXG5cdH0pO1xyXG5cclxuXHRwb3BvdmVycy5wcm9qZWN0X3Rhc2tfbWVudSh7XHJcblx0XHR0cmlnZ2VyOiBzZWxmLiRtZW51X2J1dHRvbixcclxuXHRcdHByb2plY3RfdGFzazogc2VsZi5vYmplY3QsXHJcblx0XHRib2FyZF9pdGVtOiBzZWxmLFxyXG5cdH0pO1xyXG5cclxuXHRzZWxmLiRtZW51X2J1dHRvbi5vbignaW5zZXJ0ZWQuYnMucG9wb3ZlcicsIGZ1bmN0aW9uKCkge1xyXG5cdFx0c2VsZi4kd3JhcHBlci5hZGRDbGFzcygnaXMtbWVudS1zaG93bicpO1xyXG5cdH0pO1xyXG5cclxuXHRzZWxmLiRtZW51X2J1dHRvbi5vbignaGlkZGVuLmJzLnBvcG92ZXInLCBmdW5jdGlvbigpIHtcclxuXHRcdHNlbGYuJHdyYXBwZXIucmVtb3ZlQ2xhc3MoJ2lzLW1lbnUtc2hvd24nKTtcclxuXHR9KTtcclxufTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==