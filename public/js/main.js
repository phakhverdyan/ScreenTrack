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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/bootstrap/scss/bootstrap.scss":
/*!****************************************************!*\
  !*** ./node_modules/bootstrap/scss/bootstrap.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/js/main.js":
/*!******************************!*\
  !*** ./resources/js/main.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

var $ = window.$; // ---------------------------------------------------------------------- //

window.template = function (name, parameters) {
  var html = $('#' + name + '-template').html() || null;

  if (!html) {
    throw new Error('The `' + name + '` template does not exist');
  }

  return ejs.render(html, parameters);
}; // ---------------------------------------------------------------------- //


window.request = function (options, callback) {
  if (Array.isArray(options)) {
    options = {
      many: options,
      parallel: true
    };
  }

  if (options.many) {
    var responses = {};
    var requests = options.many;

    if (options.parallel) {
      return requests.map(function (options, request_index) {
        return request(options, function (response) {
          responses[request_index] = response;

          if (Object.keys(responses).length < requests.length) {
            return;
          }

          responses.length = requests.length;
          return callback.apply(null, Array.prototype.slice.call(responses));
        });
      });
    }

    return request({
      url: '/',
      data: {
        requests: requests.map(function (request) {
          if (typeof request == 'string') {
            request = {
              url: request
            };
          }

          var query_string = $.param(request.data || {});
          return request.url + (query_string ? '?' + query_string : '');
        })
      }
    }, function (response) {
      return callback.apply(null, response.responses);
    });
  }

  var data = null;

  if (typeof options.data == 'string') {
    data = options.data;

    if (Array.isArray(options.fields) && options.fields.length > 0) {
      if (data) {
        data += '&';
      }

      data += '@=' + options.fields;
    }
  } else if (options.data instanceof FormData) {
    data = options.data;
  } else {
    data = {};
    options.data && Object.assign(data, options.data);

    if (Array.isArray(options.fields) && options.fields.length > 0) {
      Object.assign(data, {
        '@': options.fields
      });
    }
  }

  if (typeof options == 'string') {
    options = {
      url: options
    };
  }

  options.root = options.root === undefined ? '/api' : options.root;
  options.url = options.url.replace(/\/{2,}/, '/').replace(/^\//, '');
  return $.ajax({
    method: options.method || 'GET',
    url: options.root + (options.url && options.url[0] != '/' ? '/' : '') + options.url,
    data: data,
    contentType: options.contentType,
    processData: options.processData,
    xhr: function xhr() {
      var xhr = $.ajaxSettings.xhr();
      xhr.upload && xhr.upload.addEventListener('progress', function (event) {
        var percent = Math.floor(event.loaded / event.total * 100);
        return options.progress && options.progress(percent, event.loaded, event.total);
      }, false);
      return xhr;
    },
    beforeSend: function beforeSend(request) {
      window.csrf_token && request.setRequestHeader('X-CSRF-Token', window.csrf_token);
      window.auth && request.setRequestHeader('Authorization', 'Bearer ' + window.auth.user.api_token);
    }
  }).done(function (response, textStatus, xhr) {
    // let error = response.error || response.exception;
    if (response.error && response.error != 'Validation') {
      return callback && callback(response);
    }

    return callback && callback(response);
  }).fail(function (xhr) {
    if (xhr.statusText == 'abort') {
      return;
    }

    var response = xhr.responseJSON || null;

    if (response && response.error) {
      return callback && callback(response);
    }

    if (response && response.exception) {
      return callback && callback(Object.assign({
        error: 'INTERNAL_ERROR'
      }, response));
    }

    if (xhr.status == 404) {
      return callback && callback({
        error: 'NOT_FOUND'
      });
    }

    if (xhr.status == 0) {
      return callback && callback({
        error: 'INTERNET_DISCONNECTED'
      });
    }

    console.error(xhr.responseJSON);
    $.notify('Server error: ' + xhr.status, 'error');
  });
}; // ---------------------------------------------------------------------- //


window.series = function (tasks, done) {
  var results = [];

  if (tasks.length == 0) {
    return done && done(results);
  }

  (function process(index) {
    tasks[index](function (result) {
      ++index;
      results.push(result);

      if (index < tasks.length) {
        process(index);
        return;
      }

      done && done(results);
    });
  })(0);
}; // ---------------------------------------------------------------------- //


window.Validator = function (element, response) {
  var self = this;
  self.$element = $(element);

  self.fails = function () {
    Validator.clear(self.$element);

    if (response.error != 'Validation') {
      return false;
    }

    Object.keys(response.validation_fields).forEach(function (validation_field) {
      var errors = response.validation_fields[validation_field];
      var $form_control = self.$element.find('[data-name="' + validation_field + '"]');
      $form_control.addClass('is-invalid');
      $form_control.add($form_control.parents().slice(0, 2)).toArray().some(function (element) {
        var $invalid_feedback = $(element).siblings('.invalid-feedback:first');

        if ($invalid_feedback.length == 0) {
          return false;
        }

        $invalid_feedback.addClass('d-block').html(errors.join('<br />'));
        return true;
      });
    }); // $.notify('Form validation fails!', 'error');

    return true;
  };
};

Validator.clear = function (element) {
  $(element).find('.is-invalid').removeClass('is-invalid');
  $(element).find('.invalid-feedback').removeClass('d-block').html('');
}; // ---------------------------------------------------------------------- //


window.locale = function () {
  return document.body.parentElement.lang || 'en';
}; // ---------------------------------------------------------------------- //


window.client_ip = function client_ip(callback) {
  if (callback) {
    if (client_ip.data.ip) {
      return callback(client_ip.data);
    }

    return client_ip.ready_callbacks.push(callback);
  }

  return client_ip.data;
};

client_ip.data = JSON.parse(localStorage.getItem('last_client_ip') || '{}');
client_ip.ready_callbacks = [];

client_ip.update = function (data) {
  if (!data.ip) {
    return;
  }

  client_ip.data = data;
  localStorage.setItem('last_client_ip', JSON.stringify(client_ip.data));
  client_ip.ready_callbacks.forEach(function (ready_callback) {
    ready_callback(client_ip.data);
  });
  client_ip.ready_callbacks = [];
}; // ---------------------------------------------------------------------- //


window.Router = function (options) {
  var self = this;
  self.current_route = null;

  self.update = function () {
    if (self.current_route) {
      self.current_route.off && self.current_route.off.apply(self.current_route, [self]);
    }

    options.clear && options.clear();
    self.current_route = null;
    var found = options.routes.some(function (route) {
      var match = window.location.pathname.match(route.path);

      if (!match) {
        return false;
      }

      self.current_route = route;
      self.current_route.on && self.current_route.on.apply(self.current_route, Array.prototype.slice.apply(match, [1]).concat([self]));
      return true;
    });

    if (!found) {
      options["default"] && options["default"]();
    }
  };

  self.go = function (path) {
    $(function () {
      if (window.location.pathname != path) {
        history.pushState({}, null, path);
      }

      self.update();
    });
  };

  self.replace = function (path) {
    $(function () {
      if (window.location.pathname != path) {
        history.replaceState({}, null, path);
      }

      self.update();
    });
  };

  window.onpopstate = function () {
    self.update();
  };

  $(document).on('click', 'a[href]:not(a[href^="#"])', function (event) {
    var $self = $(this);
    var route_exists = options.routes.some(function (route) {
      return $self.attr('href').match(route.path);
    });

    if (route_exists) {
      event.preventDefault();
      self.go($self.attr('href'));
    }
  });
  $(function () {
    self.update();
  });
}; // ---------------------------------------------------------------------- //


window.__ = window.trans = function (path, parameters) {
  if (!window.lang) {
    throw new Error('[LANG] No language loaded');
  }

  parameters = parameters || [];
  var expression = path.split(/\./).reduce(function (list, part) {
    return list && list[part] ? list[part] : null;
  }, lang) || '';
  expression && typeof expression == 'string' && (expression.match(/\:[a-z_]+/g) || []).map(function (match) {
    return match.slice(1);
  }).filter(function (parameter_name, parameter_name_index, parameter_names) {
    return parameter_names.indexOf(parameter_name) == parameter_name_index;
  }).sort(function (parameter_name0, parameter_name1) {
    return parameter_name1.length - parameter_name0.length;
  }).forEach(function (parameter_name) {
    if (typeof parameters[parameter_name] === 'undefined') {
      throw new Error('[LANG] Parameter `' + parameter_name + '` is not set in `' + path + '` path');
    }

    expression = expression.replace(new RegExp('\:' + parameter_name, 'g'), parameters[parameter_name] || '');
  });
  return expression || path;
}; // ---------------------------------------------------------------------- //


window.cookies = {};

cookies.set = function (name, value, seconds) {
  var expires = '';

  if (seconds) {
    var date = new Date();
    date.setTime(date.getTime() + seconds * 1000);
    expires = '; expires=' + date.toUTCString();
  }

  document.cookie = name + '=' + (value || '') + expires + '; path=/';
};

cookies.get = function (name) {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');

  for (var i = 0; i < ca.length; ++i) {
    var c = ca[i];

    while (c.charAt(0) == ' ') {
      c = c.substring(1, c.length);
    }

    if (c.indexOf(nameEQ) == 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }

  return null;
};

cookies.forget = function (name) {
  cookies.set(name, null, -99999999);
}; // ---------------------------------------------------------------------- //


window.copy_text_to_clipboard = function (text) {
  var $input = $('<input />').appendTo('body');
  $input.val(text).select();
  document.execCommand('copy');
  $input.remove();
};

window.paste_text_from_clipboard = function (element) {
  var value = null;
  var $input = $('<input />').appendTo('body');
  $input.focus();
  document.execCommand('paste');
  value = $input.val();
  $input.remove();
  return value;
};

window.set_input_carret_at_end = function (element) {
  if (document.selection) {
    element.focus();
    var selection_range = document.selection.createRange();
    selection_range.moveStart('character', -element.value.length);
    selection_range.moveStart('character', element.value.length);
    selection_range.moveEnd('character', 0);
    selection_range.select();
  } else if (element.selectionStart || element.selectionStart == '0') {
    element.selectionStart = element.value.length;
    element.selectionEnd = element.value.length;
    element.focus();
  }
};

window.number_format = function (number, count_of_integers_after_dot) {
  count_of_integers_after_dot = count_of_integers_after_dot === undefined ? 2 : count_of_integers_after_dot;
  return number.toFixed(count_of_integers_after_dot);
};

window.time_interval_to_string = function (time_interval, show_seconds) {
  var hours = Math.floor(time_interval / 60 / 60);
  var minutes = Math.floor(time_interval / 60 % 60);
  var seconds = time_interval % 60;
  var parts = [hours, minutes < 10 ? '0' + minutes : minutes];
  show_seconds && parts.push(seconds < 10 ? '0' + seconds : seconds);
  return parts.join(':');
}; // ---------------------------------------------------------------------- //


window.client_locality = function client_locality(parameter_name, default_value) {
  if (typeof parameter_name == 'function') {
    var callback = parameter_name;

    if (client_locality.data) {
      return callback(client_locality.data);
    }

    return client_locality.ready_callbacks.push(callback);
  }

  if (client_locality.data) {
    default_value = default_value || null;
    return parameter_name ? client_locality.data[parameter_name] || default_value : client_locality.data;
  }

  return null;
};

client_locality.data = JSON.parse(localStorage.getItem('last_client_locality') || 'null');
client_locality.ready_callbacks = [];

client_locality.update = function (data) {
  if (!data) {
    return;
  }

  client_locality.data = data;
  localStorage.setItem('last_client_locality', JSON.stringify(client_locality.data));
  client_locality.ready_callbacks.forEach(function (ready_callback) {
    ready_callback(client_locality.data);
  });
  client_locality.ready_callbacks = [];
};

client_ip(function () {
  if (!client_ip.data.city_name || !client_ip.data.country_name) {
    return;
  }

  var query = '';
  query += client_ip.data.city_name;
  query += client_ip.data.region_name ? ', ' + client_ip.data.region_name : '';
  query += ', ' + client_ip.data.country_name;
  return request({
    url: '/localities/autocomplete',
    data: {
      query: query,
      locale: locale(),
      with_country: true
    }
  }, function (response) {
    if (response.error) {
      console.error(response.error);
      return;
    }

    return client_locality.update(response.data[0] || null);
  });
}); // ---------------------------------------------------------------------- //

window.modals = [];
modals.last = null;

modals.close = function () {
  for (var iteration = 0; modals.last && iteration < 1000; ++iteration) {
    modals.last.close();
  }
};

window.Modal = function (options) {
  var self = this;
  self.id = modals.length;
  self.onclosed = null;
  self.name = options.name || null;
  self.position = options.position;

  if (options.$element) {
    self.$element = options.$element;
  } else {
    self.$element = $(options.content || '');
  }

  if (!self.$element.attr('id')) {
    self.$element.attr('id', 'modal-' + self.id);
  }

  self.$close_button = self.$element.find('.modal__close-button');
  self.$element.data('modal', self);
  self.position && self.$element.addClass(self.position);
  self.name && self.$element.addClass('is-' + self.name);
  self.$element.on('hide.bs.modal', function () {
    self.onclose && self.onclose();
  });
  self.$element.on('hidden.bs.modal', function () {
    self.$element.remove();
    self.$element = null;
    modals.splice(modals.indexOf(self), 1);
    modals.last = modals.length > 0 ? modals[modals.length - 1] : null;
    self.onclosed && self.onclosed();
  });

  self.close = function () {
    self.$element.modal('hide');
  };

  self.$element.modal('show');
  modals.push(self);
  modals.last = self;
}; // ---------------------------------------------------------------------- //


window.popovers = {};

popovers.close = function () {
  $('.popover').each(function () {
    $($(this).data('bs.popover').element).popover('hide');
  });
};

window.Popover = function (options) {
  var self = this;
  options.arrow = options.arrow === undefined ? true : options.arrow;
  self.$trigger = $(options.trigger);
  self.$element = null;
  self.$arrow = null;
  self.initialize = options.initialize;
  self.id = Date.now().toString(36).slice(-3) + Math.random().toString(36).slice(2, 5);
  self.close_on_blur = options.close_on_blur !== false;
  self.$trigger.popover({
    title: 'blank',
    html: true,
    placement: options.placement || 'right',
    boundary: 'window'
  });
  self.$trigger.attr('title', self.$trigger.attr('data-original-title'));

  self.external_click_handler = function (event) {
    if (!self.close_on_blur) {
      return;
    }

    if ($(event.target).closest('body').length == 0) {
      return;
    }

    if ($(event.target).closest('.popover').length > 0) {
      return;
    }

    self.hide();
  };

  self.$trigger.on('inserted.bs.popover', function () {
    self.$element = $(self.$trigger.data('bs.popover').tip);
    $('.popover').not(self.$element).each(function () {
      $($(this).data('bs.popover').element).popover('hide');
    });
    var $arrow = self.$element.children('.arrow');
    var $new_element = $(options.content(self) || '');
    self.$element.html($new_element.html()).addClass($new_element.attr('class'));
    options.arrow && $arrow.prependTo(self.$element);
    self.initialize && self.initialize();
    self.$element.find('.popover-header__close-button').click(function (event) {
      event.preventDefault();
      self.hide();
    });
  });
  self.$trigger.on('shown.bs.popover', function () {
    $(document).on('click', self.external_click_handler);
  });
  self.$trigger.on('hidden.bs.popover', function () {
    $(document).off('click', self.external_click_handler);
  });

  self.show = function () {
    self.$trigger.popover('show');
    return self;
  };

  self.hide = function () {
    self.$trigger.popover('hide');
    return self;
  };

  self.close = function () {
    self.$trigger.popover('hide');
    return self;
  };

  self.update = function () {
    self.$trigger.popover('update');
    return self;
  };

  self.fix = function () {
    if (self.$element.position().top + self.$element.height() > $(window).height()) {
      return self.update();
    }

    if (self.$element.position().left + self.$element.width() > $(window).width()) {
      return self.update();
    }

    return self;
  };
}; // ---------------------------------------------------------------------- //
// window.tips = {};
// tips.close = function() {
// 	$('.popover').each(function() {
// 		$($(this).data('bs.popover').element).popover('hide');
// 	});
// };


window.Tip = function (options) {
  var self = this;
  options.arrow = options.arrow === undefined ? true : options.arrow;
  self.$trigger = $(options.selector);
  self.$element = null;
  self.$arrow = null;
  self.initialize = options.initialize;
  self.id = Date.now().toString(36).slice(-3) + Math.random().toString(36).slice(2, 5);
  self.$trigger.popover({
    title: 'blank',
    html: true,
    placement: options.placement || 'right',
    boundary: 'window'
  });
  self.$trigger.attr('title', self.$trigger.attr('data-original-title'));

  self.external_click_handler = function (event) {
    if ($(event.target).closest('body').length == 0) {
      return;
    }

    if ($(event.target).closest('.popover').length > 0) {
      return;
    }

    self.hide();
  };

  self.$trigger.on('inserted.bs.popover', function () {
    self.$element = $(self.$trigger.data('bs.popover').tip);
    var $arrow = self.$element.children('.arrow');
    var $new_element = $(options.content(self) || '');
    self.$element.html($new_element.html()).addClass($new_element.attr('class'));
    options.arrow && $arrow.prependTo(self.$element);
    self.initialize && self.initialize();
    self.$element.find('.popover-header__close-button').click(function (event) {
      event.preventDefault();
      self.hide();
    });
  });
  self.$trigger.on('shown.bs.popover', function () {
    $(document).on('click', self.external_click_handler);
  });
  self.$trigger.on('hidden.bs.popover', function () {
    $(document).off('click', self.external_click_handler);
  });

  self.show = function () {
    self.$trigger.popover('show');
    return self;
  };

  self.hide = function () {
    self.$trigger.popover('hide');
    return self;
  };

  self.close = function () {
    self.$trigger.popover('hide');
    return self;
  };

  self.update = function () {
    self.$trigger.popover('update');
    return self;
  };

  self.fix = function () {
    if (self.$element.position().top + self.$element.height() > $(window).height()) {
      return self.update();
    }

    if (self.$element.position().left + self.$element.width() > $(window).width()) {
      return self.update();
    }

    return self;
  };
}; // ---------------------------------------------------------------------- //


window.slideups = [];
slideups.last = null;

slideups.close = function () {
  for (var iteration = 0; slideups.last && iteration < 1000; ++iteration) {
    slideups.last.close();
  }
};

window.Slideup = function (options) {
  var self = this;
  self.id = Date.now().toString(36);
  self.is_shown = false;
  self.name = options.name || null;
  self.on_closed = null;
  self.on_shown = null;

  if (options.$element) {
    self.$element = options.$element;
  } else {
    self.$element = $(options.content || '');
  }

  if (!self.$element.attr('id')) {
    self.$element.attr('id', 'slideup-' + self.id);
  }

  self.name && self.$element.addClass('is-' + self.name); // self.$element.on('hide.bs.modal', function() {
  // 	self.onclose && self.onclose();
  // });
  // self.$element.on('hidden.bs.modal', function() {
  // 	self.$element.remove();
  // 	self.$element = null;
  // 	slideups.splice(slideups.indexOf(self), 1);
  // 	slideups.last = (slideups.length > 0 ? slideups[slideups.length - 1] : null);
  // 	self.onclosed && self.onclosed();
  // });

  self.$element.on('click', '.slideup-background', function (event) {
    event.preventDefault();
    self.close();
  });
  self.$element.on('click', '.slideup__close-button', function (event) {
    event.preventDefault();
    self.close();
  });

  self.close = function () {
    self.$element.removeClass('is-shown');
    slideups.splice(slideups.indexOf(self), 1);
    slideups.last = slideups.length > 0 ? slideups[slideups.length - 1] : null;
    setTimeout(function () {
      self.$element.remove();
      self.$element = null;
      self.on_closed && self.on_closed();
    }, 10250);
  };

  self.$element.appendTo('body');
  slideups.push(self);
  slideups.last = self;
  setTimeout(function () {
    self.$element.addClass('is-shown');
    self.on_show && self.on_show();
    setTimeout(function () {
      self.is_shown = true;
      console.log('SHOWN!');
      self.on_shown && self.on_shown();
    }, 250);
  }, 0);
}; // ---------------------------------------------------------------------- //


$(function () {
  function initialize_registration_form($form) {
    var $user_email_input = $form.find('[name="user[email]"]');
    var $submit_button = $form.find('.registration-form__button');

    function register(options) {
      options = options || {};
      register.xhr && register.xhr.abort();
      register.timeout && clearTimeout(register.timeout);
      register.timeout = null;
      $form.addClass('is-loading');
      !options.just_validate && $submit_button.addClass('disabled');
      register.timeout = setTimeout(function () {
        register.xhr = request({
          url: '/register',
          data: {
            user: {
              email: $user_email_input.val(),
              locality_key: client_locality('key'),
              referrer_user_id: window.referrer_user_id,
              ad_campaign_id: window.ad_campaign_id
            },
            just_validate: options.just_validate ? 1 : 0,
            locale: locale()
          }
        }, function (response) {
          console.log(response);
          register.xhr = null;
          $form.removeClass('is-loading');
          $submit_button.removeClass('disabled');

          if (response.error) {
            $.notify(response.error, 'error');
            return;
          }

          var incomplete_email_is_valid = !(response.data.validation_messages['user.email'] || []).some(function (text) {
            if (text.match(/^The .*? format is invalid\.$/)) {
              return true;
            }

            return false;
          });
          var complete_email_is_valid = !(response.data.validation_messages['user.email'] || []).some(function (text) {
            if (text.match(/^The .*? must be a valid email address\.$/)) {
              return true;
            }

            if (text.match(/^The .*? field is required\.$/)) {
              return true;
            }

            return false;
          });
          var email_is_available = !(response.data.validation_messages['user.email'] || []).some(function (text) {
            return text.match(/^The .+? has already been taken\.$/);
          });
          $form.toggleClass('is-success', incomplete_email_is_valid && complete_email_is_valid && email_is_available);
          $form.toggleClass('is-fail', !incomplete_email_is_valid || !complete_email_is_valid || !email_is_available);
          $form.find('p').addClass('is-hidden');

          if (!incomplete_email_is_valid) {
            $form.find('p.is-invalid').removeClass('is-hidden');
            $user_email_input.focus();
          } else if (!options.just_validate && !complete_email_is_valid) {
            $form.find('p.is-invalid').removeClass('is-hidden');
            $user_email_input.focus();
          } else if (!email_is_available) {
            $form.find('p.is-not-available').removeClass('is-hidden');
            $user_email_input.focus();
          }

          $form.toggleClass('has-registration-allowed', incomplete_email_is_valid && complete_email_is_valid && email_is_available && response.data.slug_success); // $form.find('.landing-2__registration-form__input p').removeClass('shake animated');
          // setTimeout(function() {
          //  $form.find('.landing-2__registration-form__input p').addClass('shake animated');
          // });

          if (!options.just_validate) {
            if (!$form.hasClass('has-registration-allowed')) {
              return;
            }

            $form.addClass('is-loading');
            $submit_button.addClass('disabled');
            register.xhr = request({
              root: '',
              url: '/login_using_api_token',
              method: 'POST',
              data: {
                user_id: response.data.user.id,
                api_token: response.data.user.api_token,
                remember_me: 1
              }
            }, function (response) {
              if (response.error) {
                $.notify(response.error, 'error');
                return;
              }

              window.location.href = response.data.redirect_url;
              return;
            });
          }
        });
      }, options.just_validate ? 200 : 0);
    }

    $user_email_input.on('input', function (event) {
      event.preventDefault();
      register({
        just_validate: true
      });
    });
    $user_email_input.focus(function (event) {
      set_input_carret_at_end(this);
      $form.addClass('has-user-email-focused');
    }).blur(function (event) {
      $form.removeClass('has-user-email-focused');
    });
    $form.submit(function (event) {
      event.preventDefault();

      if ($submit_button.hasClass('disabled')) {
        return;
      }

      if ($form.hasClass('is-closed')) {
        $form.removeClass('is-closed');
        $user_email_input.focus();
        return;
      }

      register();
    });
  }

  $('.registration-form').each(function () {
    initialize_registration_form($(this));
  }); // ------------------------------------------------------------------ //

  $(window).scroll(function (event) {
    $('.go-to-top-button').toggleClass('is-hidden', $(window).scrollTop() <= 20);
  });
  $('.go-to-top-button').click(function () {
    $(window).scrollTop(0);
  }); // ------------------------------------------------------------------ //

  $('[data-toggle="tooltip"]').tooltip(); // ------------------------------------------------------------------ //

  client_locality(function (locality) {
    console.log(locality);
  }); // ------------------------ HUMBURGER -------------------------------//

  $('#menu-humburger').click(function () {
    $(this).toggleClass('is-open');
  });
});

/***/ }),

/***/ "./resources/scss/affiliates.scss":
/*!****************************************!*\
  !*** ./resources/scss/affiliates.scss ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/scss/contact-us.scss":
/*!****************************************!*\
  !*** ./resources/scss/contact-us.scss ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/scss/dashboard/main.old.scss":
/*!************************************************!*\
  !*** ./resources/scss/dashboard/main.old.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/scss/dashboard/main.scss":
/*!********************************************!*\
  !*** ./resources/scss/dashboard/main.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/scss/dashboard/style.scss":
/*!*********************************************!*\
  !*** ./resources/scss/dashboard/style.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/scss/help-center-styles.scss":
/*!************************************************!*\
  !*** ./resources/scss/help-center-styles.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/scss/interview-completed.scss":
/*!*************************************************!*\
  !*** ./resources/scss/interview-completed.scss ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/scss/interview/main.scss":
/*!********************************************!*\
  !*** ./resources/scss/interview/main.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/scss/landing2.scss":
/*!**************************************!*\
  !*** ./resources/scss/landing2.scss ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/scss/login.scss":
/*!***********************************!*\
  !*** ./resources/scss/login.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/scss/main.scss":
/*!**********************************!*\
  !*** ./resources/scss/main.scss ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/scss/setup.scss":
/*!***********************************!*\
  !*** ./resources/scss/setup.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/scss/stripe.scss":
/*!************************************!*\
  !*** ./resources/scss/stripe.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/scss/vendor/animate.modified.scss":
/*!*****************************************************!*\
  !*** ./resources/scss/vendor/animate.modified.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/scss/vendor/pageintro.scss":
/*!**********************************************!*\
  !*** ./resources/scss/vendor/pageintro.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/scss/vendor/selectize.modified.scss":
/*!*******************************************************!*\
  !*** ./resources/scss/vendor/selectize.modified.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** multi ./resources/js/main.js ./resources/scss/vendor/pageintro.scss ./node_modules/bootstrap/scss/bootstrap.scss ./resources/scss/vendor/animate.modified.scss ./resources/scss/vendor/selectize.modified.scss ./resources/scss/main.scss ./resources/scss/setup.scss ./resources/scss/stripe.scss ./resources/scss/login.scss ./resources/scss/landing2.scss ./resources/scss/interview-completed.scss ./resources/scss/help-center-styles.scss ./resources/scss/contact-us.scss ./resources/scss/affiliates.scss ./resources/scss/dashboard/main.old.scss ./resources/scss/dashboard/main.scss ./resources/scss/dashboard/style.scss ./resources/scss/interview/main.scss ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\js\main.js */"./resources/js/main.js");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\scss\vendor\pageintro.scss */"./resources/scss/vendor/pageintro.scss");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\node_modules\bootstrap\scss\bootstrap.scss */"./node_modules/bootstrap/scss/bootstrap.scss");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\scss\vendor\animate.modified.scss */"./resources/scss/vendor/animate.modified.scss");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\scss\vendor\selectize.modified.scss */"./resources/scss/vendor/selectize.modified.scss");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\scss\main.scss */"./resources/scss/main.scss");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\scss\setup.scss */"./resources/scss/setup.scss");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\scss\stripe.scss */"./resources/scss/stripe.scss");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\scss\login.scss */"./resources/scss/login.scss");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\scss\landing2.scss */"./resources/scss/landing2.scss");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\scss\interview-completed.scss */"./resources/scss/interview-completed.scss");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\scss\help-center-styles.scss */"./resources/scss/help-center-styles.scss");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\scss\contact-us.scss */"./resources/scss/contact-us.scss");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\scss\affiliates.scss */"./resources/scss/affiliates.scss");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\scss\dashboard\main.old.scss */"./resources/scss/dashboard/main.old.scss");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\scss\dashboard\main.scss */"./resources/scss/dashboard/main.scss");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\scss\dashboard\style.scss */"./resources/scss/dashboard/style.scss");
module.exports = __webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\scss\interview\main.scss */"./resources/scss/interview/main.scss");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC9zY3NzL2Jvb3RzdHJhcC5zY3NzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9tYWluLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9zY3NzL2FmZmlsaWF0ZXMuc2NzcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvc2Nzcy9jb250YWN0LXVzLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3Njc3MvZGFzaGJvYXJkL21haW4ub2xkLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3Njc3MvZGFzaGJvYXJkL21haW4uc2NzcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvc2Nzcy9kYXNoYm9hcmQvc3R5bGUuc2NzcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvc2Nzcy9oZWxwLWNlbnRlci1zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvc2Nzcy9pbnRlcnZpZXctY29tcGxldGVkLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3Njc3MvaW50ZXJ2aWV3L21haW4uc2NzcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvc2Nzcy9sYW5kaW5nMi5zY3NzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9zY3NzL2xvZ2luLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3Njc3MvbWFpbi5zY3NzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9zY3NzL3NldHVwLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3Njc3Mvc3RyaXBlLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3Njc3MvdmVuZG9yL2FuaW1hdGUubW9kaWZpZWQuc2NzcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvc2Nzcy92ZW5kb3IvcGFnZWludHJvLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3Njc3MvdmVuZG9yL3NlbGVjdGl6ZS5tb2RpZmllZC5zY3NzIl0sIm5hbWVzIjpbIiQiLCJ3aW5kb3ciLCJ0ZW1wbGF0ZSIsIm5hbWUiLCJwYXJhbWV0ZXJzIiwiaHRtbCIsIkVycm9yIiwiZWpzIiwicmVuZGVyIiwicmVxdWVzdCIsIm9wdGlvbnMiLCJjYWxsYmFjayIsIkFycmF5IiwiaXNBcnJheSIsIm1hbnkiLCJwYXJhbGxlbCIsInJlc3BvbnNlcyIsInJlcXVlc3RzIiwibWFwIiwicmVxdWVzdF9pbmRleCIsInJlc3BvbnNlIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsImFwcGx5IiwicHJvdG90eXBlIiwic2xpY2UiLCJjYWxsIiwidXJsIiwiZGF0YSIsInF1ZXJ5X3N0cmluZyIsInBhcmFtIiwiZmllbGRzIiwiRm9ybURhdGEiLCJhc3NpZ24iLCJyb290IiwidW5kZWZpbmVkIiwicmVwbGFjZSIsImFqYXgiLCJtZXRob2QiLCJjb250ZW50VHlwZSIsInByb2Nlc3NEYXRhIiwieGhyIiwiYWpheFNldHRpbmdzIiwidXBsb2FkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwicGVyY2VudCIsIk1hdGgiLCJmbG9vciIsImxvYWRlZCIsInRvdGFsIiwicHJvZ3Jlc3MiLCJiZWZvcmVTZW5kIiwiY3NyZl90b2tlbiIsInNldFJlcXVlc3RIZWFkZXIiLCJhdXRoIiwidXNlciIsImFwaV90b2tlbiIsImRvbmUiLCJ0ZXh0U3RhdHVzIiwiZXJyb3IiLCJmYWlsIiwic3RhdHVzVGV4dCIsInJlc3BvbnNlSlNPTiIsImV4Y2VwdGlvbiIsInN0YXR1cyIsImNvbnNvbGUiLCJub3RpZnkiLCJzZXJpZXMiLCJ0YXNrcyIsInJlc3VsdHMiLCJwcm9jZXNzIiwiaW5kZXgiLCJyZXN1bHQiLCJwdXNoIiwiVmFsaWRhdG9yIiwiZWxlbWVudCIsInNlbGYiLCIkZWxlbWVudCIsImZhaWxzIiwiY2xlYXIiLCJ2YWxpZGF0aW9uX2ZpZWxkcyIsImZvckVhY2giLCJ2YWxpZGF0aW9uX2ZpZWxkIiwiZXJyb3JzIiwiJGZvcm1fY29udHJvbCIsImZpbmQiLCJhZGRDbGFzcyIsImFkZCIsInBhcmVudHMiLCJ0b0FycmF5Iiwic29tZSIsIiRpbnZhbGlkX2ZlZWRiYWNrIiwic2libGluZ3MiLCJqb2luIiwicmVtb3ZlQ2xhc3MiLCJsb2NhbGUiLCJkb2N1bWVudCIsImJvZHkiLCJwYXJlbnRFbGVtZW50IiwibGFuZyIsImNsaWVudF9pcCIsImlwIiwicmVhZHlfY2FsbGJhY2tzIiwiSlNPTiIsInBhcnNlIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInVwZGF0ZSIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJyZWFkeV9jYWxsYmFjayIsIlJvdXRlciIsImN1cnJlbnRfcm91dGUiLCJvZmYiLCJmb3VuZCIsInJvdXRlcyIsInJvdXRlIiwibWF0Y2giLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwicGF0aCIsIm9uIiwiY29uY2F0IiwiZ28iLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwicmVwbGFjZVN0YXRlIiwib25wb3BzdGF0ZSIsIiRzZWxmIiwicm91dGVfZXhpc3RzIiwiYXR0ciIsInByZXZlbnREZWZhdWx0IiwiX18iLCJ0cmFucyIsImV4cHJlc3Npb24iLCJzcGxpdCIsInJlZHVjZSIsImxpc3QiLCJwYXJ0IiwiZmlsdGVyIiwicGFyYW1ldGVyX25hbWUiLCJwYXJhbWV0ZXJfbmFtZV9pbmRleCIsInBhcmFtZXRlcl9uYW1lcyIsImluZGV4T2YiLCJzb3J0IiwicGFyYW1ldGVyX25hbWUwIiwicGFyYW1ldGVyX25hbWUxIiwiUmVnRXhwIiwiY29va2llcyIsInNldCIsInZhbHVlIiwic2Vjb25kcyIsImV4cGlyZXMiLCJkYXRlIiwiRGF0ZSIsInNldFRpbWUiLCJnZXRUaW1lIiwidG9VVENTdHJpbmciLCJjb29raWUiLCJnZXQiLCJuYW1lRVEiLCJjYSIsImkiLCJjIiwiY2hhckF0Iiwic3Vic3RyaW5nIiwiZm9yZ2V0IiwiY29weV90ZXh0X3RvX2NsaXBib2FyZCIsInRleHQiLCIkaW5wdXQiLCJhcHBlbmRUbyIsInZhbCIsInNlbGVjdCIsImV4ZWNDb21tYW5kIiwicmVtb3ZlIiwicGFzdGVfdGV4dF9mcm9tX2NsaXBib2FyZCIsImZvY3VzIiwic2V0X2lucHV0X2NhcnJldF9hdF9lbmQiLCJzZWxlY3Rpb24iLCJzZWxlY3Rpb25fcmFuZ2UiLCJjcmVhdGVSYW5nZSIsIm1vdmVTdGFydCIsIm1vdmVFbmQiLCJzZWxlY3Rpb25TdGFydCIsInNlbGVjdGlvbkVuZCIsIm51bWJlcl9mb3JtYXQiLCJudW1iZXIiLCJjb3VudF9vZl9pbnRlZ2Vyc19hZnRlcl9kb3QiLCJ0b0ZpeGVkIiwidGltZV9pbnRlcnZhbF90b19zdHJpbmciLCJ0aW1lX2ludGVydmFsIiwic2hvd19zZWNvbmRzIiwiaG91cnMiLCJtaW51dGVzIiwicGFydHMiLCJjbGllbnRfbG9jYWxpdHkiLCJkZWZhdWx0X3ZhbHVlIiwiY2l0eV9uYW1lIiwiY291bnRyeV9uYW1lIiwicXVlcnkiLCJyZWdpb25fbmFtZSIsIndpdGhfY291bnRyeSIsIm1vZGFscyIsImxhc3QiLCJjbG9zZSIsIml0ZXJhdGlvbiIsIk1vZGFsIiwiaWQiLCJvbmNsb3NlZCIsInBvc2l0aW9uIiwiY29udGVudCIsIiRjbG9zZV9idXR0b24iLCJvbmNsb3NlIiwic3BsaWNlIiwibW9kYWwiLCJwb3BvdmVycyIsImVhY2giLCJwb3BvdmVyIiwiUG9wb3ZlciIsImFycm93IiwiJHRyaWdnZXIiLCJ0cmlnZ2VyIiwiJGFycm93IiwiaW5pdGlhbGl6ZSIsIm5vdyIsInRvU3RyaW5nIiwicmFuZG9tIiwiY2xvc2Vfb25fYmx1ciIsInRpdGxlIiwicGxhY2VtZW50IiwiYm91bmRhcnkiLCJleHRlcm5hbF9jbGlja19oYW5kbGVyIiwidGFyZ2V0IiwiY2xvc2VzdCIsImhpZGUiLCJ0aXAiLCJub3QiLCJjaGlsZHJlbiIsIiRuZXdfZWxlbWVudCIsInByZXBlbmRUbyIsImNsaWNrIiwic2hvdyIsImZpeCIsInRvcCIsImhlaWdodCIsImxlZnQiLCJ3aWR0aCIsIlRpcCIsInNlbGVjdG9yIiwic2xpZGV1cHMiLCJTbGlkZXVwIiwiaXNfc2hvd24iLCJvbl9jbG9zZWQiLCJvbl9zaG93biIsInNldFRpbWVvdXQiLCJvbl9zaG93IiwibG9nIiwiaW5pdGlhbGl6ZV9yZWdpc3RyYXRpb25fZm9ybSIsIiRmb3JtIiwiJHVzZXJfZW1haWxfaW5wdXQiLCIkc3VibWl0X2J1dHRvbiIsInJlZ2lzdGVyIiwiYWJvcnQiLCJ0aW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwianVzdF92YWxpZGF0ZSIsImVtYWlsIiwibG9jYWxpdHlfa2V5IiwicmVmZXJyZXJfdXNlcl9pZCIsImFkX2NhbXBhaWduX2lkIiwiaW5jb21wbGV0ZV9lbWFpbF9pc192YWxpZCIsInZhbGlkYXRpb25fbWVzc2FnZXMiLCJjb21wbGV0ZV9lbWFpbF9pc192YWxpZCIsImVtYWlsX2lzX2F2YWlsYWJsZSIsInRvZ2dsZUNsYXNzIiwic2x1Z19zdWNjZXNzIiwiaGFzQ2xhc3MiLCJ1c2VyX2lkIiwicmVtZW1iZXJfbWUiLCJocmVmIiwicmVkaXJlY3RfdXJsIiwiYmx1ciIsInN1Ym1pdCIsInNjcm9sbCIsInNjcm9sbFRvcCIsInRvb2x0aXAiLCJsb2NhbGl0eSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7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QUFELENBQVFvUixXQUFSLENBQW9CLFNBQXBCO0FBQ0EsR0FGRDtBQUdBLENBeExBLENBQUQsQzs7Ozs7Ozs7Ozs7QUNoMkJBLHlDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLHlDIiwiZmlsZSI6Ii9qcy9tYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luIiwibGV0ICQgPSB3aW5kb3cuJDtcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cclxuXHJcbndpbmRvdy50ZW1wbGF0ZSA9IGZ1bmN0aW9uKG5hbWUsIHBhcmFtZXRlcnMpIHtcclxuICAgIGxldCBodG1sID0gJCgnIycgKyBuYW1lICsgJy10ZW1wbGF0ZScpLmh0bWwoKSB8fCBudWxsO1xyXG4gICAgXHJcbiAgICBpZiAoIWh0bWwpIHtcclxuXHRcdHRocm93IG5ldyBFcnJvcignVGhlIGAnICsgbmFtZSArICdgIHRlbXBsYXRlIGRvZXMgbm90IGV4aXN0Jyk7XHJcblx0fVxyXG4gXHJcblx0cmV0dXJuIGVqcy5yZW5kZXIoaHRtbCwgcGFyYW1ldGVycyk7XHJcbn07XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXHJcblxyXG53aW5kb3cucmVxdWVzdCA9IGZ1bmN0aW9uKG9wdGlvbnMsIGNhbGxiYWNrKSB7XHJcblx0aWYgKEFycmF5LmlzQXJyYXkob3B0aW9ucykpIHtcclxuXHRcdG9wdGlvbnMgPSB7IG1hbnk6IG9wdGlvbnMsIHBhcmFsbGVsOiB0cnVlIH07XHJcblx0fVxyXG5cclxuXHRpZiAob3B0aW9ucy5tYW55KSB7XHJcblx0XHRsZXQgcmVzcG9uc2VzID0ge307XHJcblx0XHRsZXQgcmVxdWVzdHMgPSBvcHRpb25zLm1hbnk7XHJcblx0XHRcclxuXHRcdGlmIChvcHRpb25zLnBhcmFsbGVsKSB7XHJcblx0XHRcdHJldHVybiByZXF1ZXN0cy5tYXAoZnVuY3Rpb24ob3B0aW9ucywgcmVxdWVzdF9pbmRleCkge1xyXG5cdFx0XHRcdHJldHVybiByZXF1ZXN0KG9wdGlvbnMsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcblx0XHRcdFx0XHRyZXNwb25zZXNbcmVxdWVzdF9pbmRleF0gPSByZXNwb25zZTtcclxuXHJcblx0XHRcdFx0XHRpZiAoT2JqZWN0LmtleXMocmVzcG9uc2VzKS5sZW5ndGggPCByZXF1ZXN0cy5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHJlc3BvbnNlcy5sZW5ndGggPSByZXF1ZXN0cy5sZW5ndGg7XHJcblx0XHRcdFx0XHRyZXR1cm4gY2FsbGJhY2suYXBwbHkobnVsbCwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwocmVzcG9uc2VzKSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByZXF1ZXN0KHtcclxuXHRcdFx0dXJsOiAnLycsXHJcblxyXG5cdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0cmVxdWVzdHM6IHJlcXVlc3RzLm1hcChmdW5jdGlvbihyZXF1ZXN0KSB7XHJcblx0XHRcdFx0XHRpZiAodHlwZW9mIHJlcXVlc3QgPT0gJ3N0cmluZycpIHtcclxuXHRcdFx0XHRcdFx0cmVxdWVzdCA9IHsgdXJsOiByZXF1ZXN0IH07XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0bGV0IHF1ZXJ5X3N0cmluZyA9ICQucGFyYW0ocmVxdWVzdC5kYXRhIHx8IHt9KTtcclxuXHRcdFx0XHRcdHJldHVybiByZXF1ZXN0LnVybCArIChxdWVyeV9zdHJpbmcgPyAnPycgKyBxdWVyeV9zdHJpbmcgOiAnJyk7XHJcblx0XHRcdFx0fSksXHJcblx0XHRcdH0sXHJcblx0XHR9LCBmdW5jdGlvbihyZXNwb25zZSkge1xyXG5cdFx0XHRyZXR1cm4gY2FsbGJhY2suYXBwbHkobnVsbCwgcmVzcG9uc2UucmVzcG9uc2VzKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0bGV0IGRhdGEgPSBudWxsO1xyXG5cclxuXHRpZiAodHlwZW9mIG9wdGlvbnMuZGF0YSA9PSAnc3RyaW5nJykge1xyXG5cdFx0ZGF0YSA9IG9wdGlvbnMuZGF0YTtcclxuXHJcblx0XHRpZiAoQXJyYXkuaXNBcnJheShvcHRpb25zLmZpZWxkcykgJiYgb3B0aW9ucy5maWVsZHMubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRpZiAoZGF0YSkge1xyXG5cdFx0XHRcdGRhdGEgKz0gJyYnO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRkYXRhICs9ICdAPScgKyBvcHRpb25zLmZpZWxkcztcclxuXHRcdH1cclxuXHR9IGVsc2UgaWYgKG9wdGlvbnMuZGF0YSBpbnN0YW5jZW9mIEZvcm1EYXRhKSB7XHJcblx0XHRkYXRhID0gb3B0aW9ucy5kYXRhO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRkYXRhID0ge307XHJcblx0XHRvcHRpb25zLmRhdGEgJiYgT2JqZWN0LmFzc2lnbihkYXRhLCBvcHRpb25zLmRhdGEpO1xyXG5cclxuXHRcdGlmIChBcnJheS5pc0FycmF5KG9wdGlvbnMuZmllbGRzKSAmJiBvcHRpb25zLmZpZWxkcy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdE9iamVjdC5hc3NpZ24oZGF0YSwgeyAnQCc6IG9wdGlvbnMuZmllbGRzIH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0aWYgKHR5cGVvZiBvcHRpb25zID09ICdzdHJpbmcnKSB7XHJcblx0XHRvcHRpb25zID0geyB1cmw6IG9wdGlvbnMgfTtcclxuXHR9XHJcblxyXG5cdG9wdGlvbnMucm9vdCA9IChvcHRpb25zLnJvb3QgPT09IHVuZGVmaW5lZCA/ICcvYXBpJyA6IG9wdGlvbnMucm9vdCk7XHJcblx0b3B0aW9ucy51cmwgPSBvcHRpb25zLnVybC5yZXBsYWNlKC9cXC97Mix9LywgJy8nKS5yZXBsYWNlKC9eXFwvLywgJycpO1xyXG5cclxuXHRyZXR1cm4gJC5hamF4KHtcclxuXHRcdG1ldGhvZDogKG9wdGlvbnMubWV0aG9kIHx8ICdHRVQnKSxcclxuXHJcblx0XHR1cmw6IChcclxuXHRcdFx0b3B0aW9ucy5yb290XHJcblx0XHRcdCtcclxuXHRcdFx0KG9wdGlvbnMudXJsICYmIG9wdGlvbnMudXJsWzBdICE9ICcvJyA/ICcvJyA6ICcnKVxyXG5cdFx0XHQrXHJcblx0XHRcdG9wdGlvbnMudXJsXHJcblx0XHQpLFxyXG5cclxuXHRcdGRhdGE6IGRhdGEsXHJcblx0XHRjb250ZW50VHlwZTogb3B0aW9ucy5jb250ZW50VHlwZSxcclxuXHRcdHByb2Nlc3NEYXRhOiBvcHRpb25zLnByb2Nlc3NEYXRhLFxyXG5cclxuXHRcdHhocjogZnVuY3Rpb24oKSB7XHJcblx0XHRcdGxldCB4aHIgPSAkLmFqYXhTZXR0aW5ncy54aHIoKTtcclxuXHJcbiAgICAgICAgICAgIHhoci51cGxvYWQgJiYgeGhyLnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIFx0bGV0IHBlcmNlbnQgPSBNYXRoLmZsb29yKGV2ZW50LmxvYWRlZCAvIGV2ZW50LnRvdGFsICogMTAwKTtcclxuICAgICAgICAgICAgXHRyZXR1cm4gb3B0aW9ucy5wcm9ncmVzcyAmJiBvcHRpb25zLnByb2dyZXNzKHBlcmNlbnQsIGV2ZW50LmxvYWRlZCwgZXZlbnQudG90YWwpO1xyXG4gICAgICAgICAgICB9LCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4geGhyO1xyXG5cdFx0fSxcclxuXHJcblx0XHRiZWZvcmVTZW5kOiBmdW5jdGlvbihyZXF1ZXN0KSB7XHJcblx0XHRcdHdpbmRvdy5jc3JmX3Rva2VuICYmIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignWC1DU1JGLVRva2VuJywgd2luZG93LmNzcmZfdG9rZW4pO1xyXG5cdFx0XHR3aW5kb3cuYXV0aCAmJiByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoJ0F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcgKyB3aW5kb3cuYXV0aC51c2VyLmFwaV90b2tlbik7XHJcblx0XHR9LFxyXG5cdH0pLmRvbmUoZnVuY3Rpb24ocmVzcG9uc2UsIHRleHRTdGF0dXMsIHhocikge1xyXG5cdFx0Ly8gbGV0IGVycm9yID0gcmVzcG9uc2UuZXJyb3IgfHwgcmVzcG9uc2UuZXhjZXB0aW9uO1xyXG5cclxuXHRcdGlmIChyZXNwb25zZS5lcnJvciAmJiByZXNwb25zZS5lcnJvciAhPSAnVmFsaWRhdGlvbicpIHtcclxuXHRcdFx0cmV0dXJuIGNhbGxiYWNrICYmIGNhbGxiYWNrKHJlc3BvbnNlKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gY2FsbGJhY2sgJiYgY2FsbGJhY2socmVzcG9uc2UpO1xyXG5cdH0pLmZhaWwoZnVuY3Rpb24oeGhyKSB7XHJcblx0XHRpZiAoeGhyLnN0YXR1c1RleHQgPT0gJ2Fib3J0Jykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHJlc3BvbnNlID0geGhyLnJlc3BvbnNlSlNPTiB8fCBudWxsO1xyXG5cclxuXHRcdGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5lcnJvcikge1xyXG5cdFx0XHRyZXR1cm4gY2FsbGJhY2sgJiYgY2FsbGJhY2socmVzcG9uc2UpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2UuZXhjZXB0aW9uKSB7XHJcblx0XHRcdHJldHVybiBjYWxsYmFjayAmJiBjYWxsYmFjayhPYmplY3QuYXNzaWduKHtcclxuXHRcdFx0XHRlcnJvcjogJ0lOVEVSTkFMX0VSUk9SJyxcclxuXHRcdFx0fSwgcmVzcG9uc2UpKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoeGhyLnN0YXR1cyA9PSA0MDQpIHtcclxuXHRcdFx0cmV0dXJuIGNhbGxiYWNrICYmIGNhbGxiYWNrKHtcclxuXHRcdFx0XHRlcnJvcjogJ05PVF9GT1VORCcsXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh4aHIuc3RhdHVzID09IDApIHtcclxuXHRcdFx0cmV0dXJuIGNhbGxiYWNrICYmIGNhbGxiYWNrKHtcclxuXHRcdFx0XHRlcnJvcjogJ0lOVEVSTkVUX0RJU0NPTk5FQ1RFRCcsXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnNvbGUuZXJyb3IoeGhyLnJlc3BvbnNlSlNPTik7XHJcblx0XHQkLm5vdGlmeSgnU2VydmVyIGVycm9yOiAnICsgeGhyLnN0YXR1cywgJ2Vycm9yJyk7XHJcblx0fSk7XHJcbn07XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXHJcblxyXG53aW5kb3cuc2VyaWVzID0gZnVuY3Rpb24odGFza3MsIGRvbmUpIHtcclxuXHRsZXQgcmVzdWx0cyA9IFtdO1xyXG5cclxuXHRpZiAodGFza3MubGVuZ3RoID09IDApIHtcclxuXHRcdHJldHVybiBkb25lICYmIGRvbmUocmVzdWx0cyk7XHJcblx0fVxyXG5cclxuXHQoZnVuY3Rpb24gcHJvY2VzcyhpbmRleCkge1xyXG5cdFx0dGFza3NbaW5kZXhdKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG5cdFx0XHQrK2luZGV4O1xyXG5cdFx0XHRyZXN1bHRzLnB1c2gocmVzdWx0KTtcclxuXHJcblx0XHRcdGlmIChpbmRleCA8IHRhc2tzLmxlbmd0aCkge1xyXG5cdFx0XHRcdHByb2Nlc3MoaW5kZXgpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZG9uZSAmJiBkb25lKHJlc3VsdHMpO1xyXG5cdFx0fSk7XHJcblx0fSkoMCk7XHJcbn07XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXHJcblxyXG53aW5kb3cuVmFsaWRhdG9yID0gZnVuY3Rpb24oZWxlbWVudCwgcmVzcG9uc2UpIHtcclxuXHRsZXQgc2VsZiA9IHRoaXM7XHJcblx0c2VsZi4kZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblxyXG5cdHNlbGYuZmFpbHMgPSBmdW5jdGlvbigpIHtcclxuXHRcdFZhbGlkYXRvci5jbGVhcihzZWxmLiRlbGVtZW50KTtcclxuXHJcblx0XHRpZiAocmVzcG9uc2UuZXJyb3IgIT0gJ1ZhbGlkYXRpb24nKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRPYmplY3Qua2V5cyhyZXNwb25zZS52YWxpZGF0aW9uX2ZpZWxkcykuZm9yRWFjaChmdW5jdGlvbih2YWxpZGF0aW9uX2ZpZWxkKSB7XHJcblx0XHRcdGxldCBlcnJvcnMgPSByZXNwb25zZS52YWxpZGF0aW9uX2ZpZWxkc1t2YWxpZGF0aW9uX2ZpZWxkXTtcclxuXHRcdFx0bGV0ICRmb3JtX2NvbnRyb2wgPSBzZWxmLiRlbGVtZW50LmZpbmQoJ1tkYXRhLW5hbWU9XCInICsgdmFsaWRhdGlvbl9maWVsZCArICdcIl0nKTtcclxuXHRcdFx0JGZvcm1fY29udHJvbC5hZGRDbGFzcygnaXMtaW52YWxpZCcpO1xyXG5cclxuXHRcdFx0JGZvcm1fY29udHJvbC5hZGQoJGZvcm1fY29udHJvbC5wYXJlbnRzKCkuc2xpY2UoMCwgMikpLnRvQXJyYXkoKS5zb21lKGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuXHRcdFx0XHRsZXQgJGludmFsaWRfZmVlZGJhY2sgPSAkKGVsZW1lbnQpLnNpYmxpbmdzKCcuaW52YWxpZC1mZWVkYmFjazpmaXJzdCcpO1xyXG5cclxuXHRcdFx0XHRpZiAoJGludmFsaWRfZmVlZGJhY2subGVuZ3RoID09IDApIHtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdCRpbnZhbGlkX2ZlZWRiYWNrLmFkZENsYXNzKCdkLWJsb2NrJykuaHRtbChlcnJvcnMuam9pbignPGJyIC8+JykpO1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vICQubm90aWZ5KCdGb3JtIHZhbGlkYXRpb24gZmFpbHMhJywgJ2Vycm9yJyk7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9O1xyXG59O1xyXG5cclxuVmFsaWRhdG9yLmNsZWFyID0gZnVuY3Rpb24oZWxlbWVudCkge1xyXG5cdCQoZWxlbWVudCkuZmluZCgnLmlzLWludmFsaWQnKS5yZW1vdmVDbGFzcygnaXMtaW52YWxpZCcpO1xyXG5cdCQoZWxlbWVudCkuZmluZCgnLmludmFsaWQtZmVlZGJhY2snKS5yZW1vdmVDbGFzcygnZC1ibG9jaycpLmh0bWwoJycpO1xyXG59O1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xyXG5cclxud2luZG93LmxvY2FsZSA9IGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiBkb2N1bWVudC5ib2R5LnBhcmVudEVsZW1lbnQubGFuZyB8fCAnZW4nO1xyXG59O1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xyXG5cclxud2luZG93LmNsaWVudF9pcCA9IGZ1bmN0aW9uIGNsaWVudF9pcChjYWxsYmFjaykge1xyXG5cdGlmIChjYWxsYmFjaykge1xyXG5cdFx0aWYgKGNsaWVudF9pcC5kYXRhLmlwKSB7XHJcblx0XHRcdHJldHVybiBjYWxsYmFjayhjbGllbnRfaXAuZGF0YSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGNsaWVudF9pcC5yZWFkeV9jYWxsYmFja3MucHVzaChjYWxsYmFjayk7XHJcblx0fVxyXG5cdFxyXG5cdHJldHVybiBjbGllbnRfaXAuZGF0YTtcclxufVxyXG5cclxuY2xpZW50X2lwLmRhdGEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsYXN0X2NsaWVudF9pcCcpIHx8ICd7fScpO1xyXG5jbGllbnRfaXAucmVhZHlfY2FsbGJhY2tzID0gW107XHJcblxyXG5jbGllbnRfaXAudXBkYXRlID0gZnVuY3Rpb24oZGF0YSkge1xyXG5cdGlmICghZGF0YS5pcCkge1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblx0Y2xpZW50X2lwLmRhdGEgPSBkYXRhO1xyXG5cdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsYXN0X2NsaWVudF9pcCcsIEpTT04uc3RyaW5naWZ5KGNsaWVudF9pcC5kYXRhKSk7XHJcblxyXG5cdGNsaWVudF9pcC5yZWFkeV9jYWxsYmFja3MuZm9yRWFjaChmdW5jdGlvbihyZWFkeV9jYWxsYmFjaykge1xyXG5cdFx0cmVhZHlfY2FsbGJhY2soY2xpZW50X2lwLmRhdGEpO1xyXG5cdH0pO1xyXG5cclxuXHRjbGllbnRfaXAucmVhZHlfY2FsbGJhY2tzID0gW107XHJcbn07XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXHJcblxyXG53aW5kb3cuUm91dGVyID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG5cdGxldCBzZWxmID0gdGhpcztcclxuXHRzZWxmLmN1cnJlbnRfcm91dGUgPSBudWxsO1xyXG5cclxuXHRzZWxmLnVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYgKHNlbGYuY3VycmVudF9yb3V0ZSkge1xyXG5cdFx0XHRzZWxmLmN1cnJlbnRfcm91dGUub2ZmICYmIHNlbGYuY3VycmVudF9yb3V0ZS5vZmYuYXBwbHkoc2VsZi5jdXJyZW50X3JvdXRlLCBbIHNlbGYgXSk7XHJcblx0XHR9XHJcblxyXG5cdFx0b3B0aW9ucy5jbGVhciAmJiBvcHRpb25zLmNsZWFyKCk7XHJcblx0XHRzZWxmLmN1cnJlbnRfcm91dGUgPSBudWxsO1xyXG5cclxuXHRcdGxldCBmb3VuZCA9IG9wdGlvbnMucm91dGVzLnNvbWUoZnVuY3Rpb24ocm91dGUpIHtcclxuXHRcdFx0bGV0IG1hdGNoID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLm1hdGNoKHJvdXRlLnBhdGgpO1xyXG5cclxuXHRcdFx0aWYgKCFtYXRjaCkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c2VsZi5jdXJyZW50X3JvdXRlID0gcm91dGU7XHJcblxyXG5cdFx0XHRzZWxmLmN1cnJlbnRfcm91dGUub24gJiYgc2VsZi5jdXJyZW50X3JvdXRlLm9uLmFwcGx5KHNlbGYuY3VycmVudF9yb3V0ZSwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmFwcGx5KG1hdGNoLCBbMV0pLmNvbmNhdChbXHJcblx0XHRcdFx0c2VsZixcclxuXHRcdFx0XSkpO1xyXG5cclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpZiAoIWZvdW5kKSB7XHJcblx0XHRcdG9wdGlvbnMuZGVmYXVsdCAmJiBvcHRpb25zLmRlZmF1bHQoKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRzZWxmLmdvID0gZnVuY3Rpb24ocGF0aCkge1xyXG5cdFx0JChmdW5jdGlvbigpIHtcclxuXHRcdFx0aWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSAhPSBwYXRoKSB7XHJcblx0XHRcdFx0aGlzdG9yeS5wdXNoU3RhdGUoe30sIG51bGwsIHBhdGgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzZWxmLnVwZGF0ZSgpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0c2VsZi5yZXBsYWNlID0gZnVuY3Rpb24ocGF0aCkge1xyXG5cdFx0JChmdW5jdGlvbigpIHtcclxuXHRcdFx0aWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSAhPSBwYXRoKSB7XHJcblx0XHRcdFx0aGlzdG9yeS5yZXBsYWNlU3RhdGUoe30sIG51bGwsIHBhdGgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzZWxmLnVwZGF0ZSgpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0d2luZG93Lm9ucG9wc3RhdGUgPSBmdW5jdGlvbigpIHtcclxuXHRcdHNlbGYudXBkYXRlKCk7XHJcblx0fTtcclxuXHJcblx0JChkb2N1bWVudCkub24oJ2NsaWNrJywgJ2FbaHJlZl06bm90KGFbaHJlZl49XCIjXCJdKScsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRsZXQgJHNlbGYgPSAkKHRoaXMpO1xyXG5cclxuXHRcdGxldCByb3V0ZV9leGlzdHMgPSBvcHRpb25zLnJvdXRlcy5zb21lKGZ1bmN0aW9uKHJvdXRlKSB7XHJcblx0XHRcdHJldHVybiAkc2VsZi5hdHRyKCdocmVmJykubWF0Y2gocm91dGUucGF0aCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpZiAocm91dGVfZXhpc3RzKSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHNlbGYuZ28oJHNlbGYuYXR0cignaHJlZicpKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0JChmdW5jdGlvbigpIHtcclxuXHRcdHNlbGYudXBkYXRlKCk7XHJcblx0fSk7XHJcbn07XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXHJcblxyXG53aW5kb3cuX18gPSB3aW5kb3cudHJhbnMgPSBmdW5jdGlvbihwYXRoLCBwYXJhbWV0ZXJzKSB7XHJcblx0aWYgKCF3aW5kb3cubGFuZykge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKCdbTEFOR10gTm8gbGFuZ3VhZ2UgbG9hZGVkJyk7XHJcblx0fVxyXG5cclxuXHRwYXJhbWV0ZXJzID0gcGFyYW1ldGVycyB8fCBbXTtcclxuXHJcblx0bGV0IGV4cHJlc3Npb24gPSBwYXRoLnNwbGl0KC9cXC4vKS5yZWR1Y2UoZnVuY3Rpb24obGlzdCwgcGFydCkge1xyXG5cdFx0cmV0dXJuIChsaXN0ICYmIGxpc3RbcGFydF0pID8gbGlzdFtwYXJ0XSA6IG51bGw7XHJcblx0fSwgbGFuZykgfHwgJyc7XHJcblxyXG5cdChleHByZXNzaW9uICYmIHR5cGVvZiBleHByZXNzaW9uID09ICdzdHJpbmcnKSAmJiAoZXhwcmVzc2lvbi5tYXRjaCgvXFw6W2Etel9dKy9nKSB8fCBbXSkubWFwKGZ1bmN0aW9uKG1hdGNoKSB7XHJcblx0XHRyZXR1cm4gbWF0Y2guc2xpY2UoMSk7XHJcblx0fSkuZmlsdGVyKGZ1bmN0aW9uKHBhcmFtZXRlcl9uYW1lLCBwYXJhbWV0ZXJfbmFtZV9pbmRleCwgcGFyYW1ldGVyX25hbWVzKSB7XHJcblx0XHRyZXR1cm4gcGFyYW1ldGVyX25hbWVzLmluZGV4T2YocGFyYW1ldGVyX25hbWUpID09IHBhcmFtZXRlcl9uYW1lX2luZGV4O1xyXG5cdH0pLnNvcnQoZnVuY3Rpb24ocGFyYW1ldGVyX25hbWUwLCBwYXJhbWV0ZXJfbmFtZTEpIHtcclxuXHRcdHJldHVybiBwYXJhbWV0ZXJfbmFtZTEubGVuZ3RoIC0gcGFyYW1ldGVyX25hbWUwLmxlbmd0aDtcclxuXHR9KS5mb3JFYWNoKGZ1bmN0aW9uKHBhcmFtZXRlcl9uYW1lKSB7XHJcblx0XHRpZiAodHlwZW9mIHBhcmFtZXRlcnNbcGFyYW1ldGVyX25hbWVdID09PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ1tMQU5HXSBQYXJhbWV0ZXIgYCcgKyBwYXJhbWV0ZXJfbmFtZSArICdgIGlzIG5vdCBzZXQgaW4gYCcgKyBwYXRoICsgJ2AgcGF0aCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGV4cHJlc3Npb24gPSBleHByZXNzaW9uLnJlcGxhY2UobmV3IFJlZ0V4cCgnXFw6JyArIHBhcmFtZXRlcl9uYW1lLCAnZycpLCBwYXJhbWV0ZXJzW3BhcmFtZXRlcl9uYW1lXSB8fCAnJyk7XHJcblx0fSk7XHJcblxyXG5cdHJldHVybiBleHByZXNzaW9uIHx8IHBhdGg7XHJcbn07XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXHJcblxyXG53aW5kb3cuY29va2llcyA9IHt9O1xyXG5cclxuY29va2llcy5zZXQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSwgc2Vjb25kcykge1xyXG4gICAgbGV0IGV4cGlyZXMgPSAnJztcclxuXHJcbiAgICBpZiAoc2Vjb25kcykge1xyXG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICBkYXRlLnNldFRpbWUoZGF0ZS5nZXRUaW1lKCkgKyBzZWNvbmRzICogMTAwMCk7XHJcbiAgICAgICAgZXhwaXJlcyA9ICc7IGV4cGlyZXM9JyArIGRhdGUudG9VVENTdHJpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBkb2N1bWVudC5jb29raWUgPSBuYW1lICsgJz0nICsgKHZhbHVlIHx8ICcnKSAgKyBleHBpcmVzICsgJzsgcGF0aD0vJztcclxufTtcclxuXHJcbmNvb2tpZXMuZ2V0ID0gZnVuY3Rpb24obmFtZSkge1xyXG4gICAgbGV0IG5hbWVFUSA9IG5hbWUgKyAnPSc7XHJcbiAgICBsZXQgY2EgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgbGV0IGMgPSBjYVtpXTtcclxuICAgICAgICB3aGlsZSAoYy5jaGFyQXQoMCkgPT0gJyAnKSB7XHJcbiAgICAgICAgXHRjID0gYy5zdWJzdHJpbmcoMSwgYy5sZW5ndGgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGMuaW5kZXhPZihuYW1lRVEpID09IDApIHtcclxuICAgICAgICBcdHJldHVybiBjLnN1YnN0cmluZyhuYW1lRVEubGVuZ3RoLCBjLmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuY29va2llcy5mb3JnZXQgPSBmdW5jdGlvbihuYW1lKSB7XHJcblx0Y29va2llcy5zZXQobmFtZSwgbnVsbCwgLTk5OTk5OTk5KTtcclxufTtcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cclxuXHJcbndpbmRvdy5jb3B5X3RleHRfdG9fY2xpcGJvYXJkID0gZnVuY3Rpb24odGV4dCkge1xyXG5cdGxldCAkaW5wdXQgPSAkKCc8aW5wdXQgLz4nKS5hcHBlbmRUbygnYm9keScpO1xyXG5cdCRpbnB1dC52YWwodGV4dCkuc2VsZWN0KCk7XHJcblx0ZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKTtcclxuXHQkaW5wdXQucmVtb3ZlKCk7XHJcbn07XHJcblxyXG53aW5kb3cucGFzdGVfdGV4dF9mcm9tX2NsaXBib2FyZCA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuXHRsZXQgdmFsdWUgPSBudWxsO1xyXG5cdGxldCAkaW5wdXQgPSAkKCc8aW5wdXQgLz4nKS5hcHBlbmRUbygnYm9keScpO1xyXG5cdCRpbnB1dC5mb2N1cygpO1xyXG5cdGRvY3VtZW50LmV4ZWNDb21tYW5kKCdwYXN0ZScpO1xyXG5cdHZhbHVlID0gJGlucHV0LnZhbCgpO1xyXG5cdCRpbnB1dC5yZW1vdmUoKTtcclxuXHRyZXR1cm4gdmFsdWU7XHJcbn07XHJcblxyXG53aW5kb3cuc2V0X2lucHV0X2NhcnJldF9hdF9lbmQgPSBmdW5jdGlvbihlbGVtZW50KSB7XHJcblx0aWYgKGRvY3VtZW50LnNlbGVjdGlvbikge1xyXG5cdFx0ZWxlbWVudC5mb2N1cygpO1xyXG5cdFx0bGV0IHNlbGVjdGlvbl9yYW5nZSA9IGRvY3VtZW50LnNlbGVjdGlvbi5jcmVhdGVSYW5nZSgpO1xyXG5cdFx0c2VsZWN0aW9uX3JhbmdlLm1vdmVTdGFydCgnY2hhcmFjdGVyJywgLWVsZW1lbnQudmFsdWUubGVuZ3RoKTtcclxuXHRcdHNlbGVjdGlvbl9yYW5nZS5tb3ZlU3RhcnQoJ2NoYXJhY3RlcicsIGVsZW1lbnQudmFsdWUubGVuZ3RoKTtcclxuXHRcdHNlbGVjdGlvbl9yYW5nZS5tb3ZlRW5kKCdjaGFyYWN0ZXInLCAwKTtcclxuXHRcdHNlbGVjdGlvbl9yYW5nZS5zZWxlY3QoKTtcclxuXHR9IGVsc2UgaWYgKGVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgfHwgZWxlbWVudC5zZWxlY3Rpb25TdGFydCA9PSAnMCcpIHtcclxuXHRcdGVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPSBlbGVtZW50LnZhbHVlLmxlbmd0aDtcclxuXHRcdGVsZW1lbnQuc2VsZWN0aW9uRW5kID0gZWxlbWVudC52YWx1ZS5sZW5ndGg7XHJcblx0XHRlbGVtZW50LmZvY3VzKCk7XHJcblx0fVxyXG59O1xyXG5cclxud2luZG93Lm51bWJlcl9mb3JtYXQgPSBmdW5jdGlvbihudW1iZXIsIGNvdW50X29mX2ludGVnZXJzX2FmdGVyX2RvdCkge1xyXG5cdGNvdW50X29mX2ludGVnZXJzX2FmdGVyX2RvdCA9IChjb3VudF9vZl9pbnRlZ2Vyc19hZnRlcl9kb3QgPT09IHVuZGVmaW5lZCA/IDIgOiBjb3VudF9vZl9pbnRlZ2Vyc19hZnRlcl9kb3QpO1xyXG5cdHJldHVybiBudW1iZXIudG9GaXhlZChjb3VudF9vZl9pbnRlZ2Vyc19hZnRlcl9kb3QpO1xyXG59O1xyXG5cclxud2luZG93LnRpbWVfaW50ZXJ2YWxfdG9fc3RyaW5nID0gKHRpbWVfaW50ZXJ2YWwsIHNob3dfc2Vjb25kcykgPT4ge1xyXG5cdGxldCBob3VycyA9IE1hdGguZmxvb3IodGltZV9pbnRlcnZhbCAvIDYwIC8gNjApO1xyXG5cdGxldCBtaW51dGVzID0gTWF0aC5mbG9vcih0aW1lX2ludGVydmFsIC8gNjAgJSA2MCk7XHJcblx0bGV0IHNlY29uZHMgPSB0aW1lX2ludGVydmFsICUgNjA7XHJcblxyXG5cdGxldCBwYXJ0cyA9IFtcclxuXHRcdGhvdXJzLFxyXG5cdFx0bWludXRlcyA8IDEwID8gJzAnICsgbWludXRlcyA6IG1pbnV0ZXMsXHJcblx0XTtcclxuXHJcblx0c2hvd19zZWNvbmRzICYmIHBhcnRzLnB1c2goc2Vjb25kcyA8IDEwID8gJzAnICsgc2Vjb25kcyA6IHNlY29uZHMpO1xyXG5cdHJldHVybiBwYXJ0cy5qb2luKCc6Jyk7XHJcbn07XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXHJcblxyXG53aW5kb3cuY2xpZW50X2xvY2FsaXR5ID0gZnVuY3Rpb24gY2xpZW50X2xvY2FsaXR5KHBhcmFtZXRlcl9uYW1lLCBkZWZhdWx0X3ZhbHVlKSB7XHJcblx0aWYgKHR5cGVvZiBwYXJhbWV0ZXJfbmFtZSA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRsZXQgY2FsbGJhY2sgPSBwYXJhbWV0ZXJfbmFtZTtcclxuXHJcblx0XHRpZiAoY2xpZW50X2xvY2FsaXR5LmRhdGEpIHtcclxuXHRcdFx0cmV0dXJuIGNhbGxiYWNrKGNsaWVudF9sb2NhbGl0eS5kYXRhKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gY2xpZW50X2xvY2FsaXR5LnJlYWR5X2NhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcclxuXHR9XHJcblxyXG5cdGlmIChjbGllbnRfbG9jYWxpdHkuZGF0YSkge1xyXG5cdFx0ZGVmYXVsdF92YWx1ZSA9IGRlZmF1bHRfdmFsdWUgfHwgbnVsbDtcclxuXHRcdHJldHVybiBwYXJhbWV0ZXJfbmFtZSA/IChjbGllbnRfbG9jYWxpdHkuZGF0YVtwYXJhbWV0ZXJfbmFtZV0gfHwgZGVmYXVsdF92YWx1ZSkgOiBjbGllbnRfbG9jYWxpdHkuZGF0YTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBudWxsO1xyXG59XHJcblxyXG5jbGllbnRfbG9jYWxpdHkuZGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xhc3RfY2xpZW50X2xvY2FsaXR5JykgfHwgJ251bGwnKTtcclxuY2xpZW50X2xvY2FsaXR5LnJlYWR5X2NhbGxiYWNrcyA9IFtdO1xyXG5cclxuY2xpZW50X2xvY2FsaXR5LnVwZGF0ZSA9IGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRpZiAoIWRhdGEpIHtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cdGNsaWVudF9sb2NhbGl0eS5kYXRhID0gZGF0YTtcclxuXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbGFzdF9jbGllbnRfbG9jYWxpdHknLCBKU09OLnN0cmluZ2lmeShjbGllbnRfbG9jYWxpdHkuZGF0YSkpO1xyXG5cclxuXHRjbGllbnRfbG9jYWxpdHkucmVhZHlfY2FsbGJhY2tzLmZvckVhY2goZnVuY3Rpb24ocmVhZHlfY2FsbGJhY2spIHtcclxuXHRcdHJlYWR5X2NhbGxiYWNrKGNsaWVudF9sb2NhbGl0eS5kYXRhKTtcclxuXHR9KTtcclxuXHJcblx0Y2xpZW50X2xvY2FsaXR5LnJlYWR5X2NhbGxiYWNrcyA9IFtdO1xyXG59XHJcblxyXG5jbGllbnRfaXAoZnVuY3Rpb24oKSB7XHJcblx0aWYgKCFjbGllbnRfaXAuZGF0YS5jaXR5X25hbWUgfHwgIWNsaWVudF9pcC5kYXRhLmNvdW50cnlfbmFtZSkge1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblx0bGV0IHF1ZXJ5ID0gJyc7XHJcblx0cXVlcnkgKz0gY2xpZW50X2lwLmRhdGEuY2l0eV9uYW1lO1xyXG5cdHF1ZXJ5ICs9IChjbGllbnRfaXAuZGF0YS5yZWdpb25fbmFtZSA/ICcsICcgKyBjbGllbnRfaXAuZGF0YS5yZWdpb25fbmFtZSA6ICcnKTtcclxuXHRxdWVyeSArPSAnLCAnICsgY2xpZW50X2lwLmRhdGEuY291bnRyeV9uYW1lO1xyXG5cclxuXHRyZXR1cm4gcmVxdWVzdCh7XHJcblx0XHR1cmw6ICcvbG9jYWxpdGllcy9hdXRvY29tcGxldGUnLFxyXG5cclxuXHRcdGRhdGE6IHtcclxuXHRcdFx0cXVlcnk6IHF1ZXJ5LFxyXG5cdFx0XHRsb2NhbGU6IGxvY2FsZSgpLFxyXG5cdFx0XHR3aXRoX2NvdW50cnk6IHRydWUsXHJcblx0XHR9LFxyXG5cdH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcblx0XHRpZiAocmVzcG9uc2UuZXJyb3IpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihyZXNwb25zZS5lcnJvcik7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gY2xpZW50X2xvY2FsaXR5LnVwZGF0ZShyZXNwb25zZS5kYXRhWzBdIHx8IG51bGwpO1xyXG5cdH0pO1xyXG59KTtcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cclxuXHJcbndpbmRvdy5tb2RhbHMgPSBbXTtcclxubW9kYWxzLmxhc3QgPSBudWxsO1xyXG5cclxubW9kYWxzLmNsb3NlID0gZnVuY3Rpb24oKSB7XHJcblx0Zm9yIChsZXQgaXRlcmF0aW9uID0gMDsgKG1vZGFscy5sYXN0ICYmIGl0ZXJhdGlvbiA8IDEwMDApOyArK2l0ZXJhdGlvbikge1xyXG5cdFx0bW9kYWxzLmxhc3QuY2xvc2UoKTtcclxuXHR9XHJcbn07XHJcblxyXG53aW5kb3cuTW9kYWwgPSBmdW5jdGlvbihvcHRpb25zKSB7XHJcblx0bGV0IHNlbGYgPSB0aGlzO1xyXG5cdHNlbGYuaWQgPSBtb2RhbHMubGVuZ3RoO1xyXG5cdHNlbGYub25jbG9zZWQgPSBudWxsO1xyXG5cdHNlbGYubmFtZSA9IG9wdGlvbnMubmFtZSB8fCBudWxsO1xyXG5cdHNlbGYucG9zaXRpb24gPSBvcHRpb25zLnBvc2l0aW9uO1xyXG5cclxuXHRpZiAob3B0aW9ucy4kZWxlbWVudCkge1xyXG5cdFx0c2VsZi4kZWxlbWVudCA9IG9wdGlvbnMuJGVsZW1lbnQ7XHJcblx0fSBlbHNlIHtcclxuXHRcdHNlbGYuJGVsZW1lbnQgPSAkKG9wdGlvbnMuY29udGVudCB8fCAnJyk7XHJcblx0fVxyXG5cclxuXHRpZiAoIXNlbGYuJGVsZW1lbnQuYXR0cignaWQnKSkge1xyXG5cdFx0c2VsZi4kZWxlbWVudC5hdHRyKCdpZCcsICdtb2RhbC0nICsgc2VsZi5pZCk7XHJcblx0fVxyXG5cclxuXHRzZWxmLiRjbG9zZV9idXR0b24gPSBzZWxmLiRlbGVtZW50LmZpbmQoJy5tb2RhbF9fY2xvc2UtYnV0dG9uJyk7XHJcblx0c2VsZi4kZWxlbWVudC5kYXRhKCdtb2RhbCcsIHNlbGYpO1xyXG5cdHNlbGYucG9zaXRpb24gJiYgc2VsZi4kZWxlbWVudC5hZGRDbGFzcyhzZWxmLnBvc2l0aW9uKTtcclxuXHRzZWxmLm5hbWUgJiYgc2VsZi4kZWxlbWVudC5hZGRDbGFzcygnaXMtJyArIHNlbGYubmFtZSk7XHJcblxyXG5cdHNlbGYuJGVsZW1lbnQub24oJ2hpZGUuYnMubW9kYWwnLCBmdW5jdGlvbigpIHtcclxuXHRcdHNlbGYub25jbG9zZSAmJiBzZWxmLm9uY2xvc2UoKTtcclxuXHR9KTtcclxuXHJcblx0c2VsZi4kZWxlbWVudC5vbignaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24oKSB7XHJcblx0XHRzZWxmLiRlbGVtZW50LnJlbW92ZSgpO1xyXG5cdFx0c2VsZi4kZWxlbWVudCA9IG51bGw7XHJcblx0XHRtb2RhbHMuc3BsaWNlKG1vZGFscy5pbmRleE9mKHNlbGYpLCAxKTtcclxuXHRcdG1vZGFscy5sYXN0ID0gKG1vZGFscy5sZW5ndGggPiAwID8gbW9kYWxzW21vZGFscy5sZW5ndGggLSAxXSA6IG51bGwpO1xyXG5cdFx0c2VsZi5vbmNsb3NlZCAmJiBzZWxmLm9uY2xvc2VkKCk7XHJcblx0fSk7XHJcblxyXG5cdHNlbGYuY2xvc2UgPSBmdW5jdGlvbigpIHtcclxuXHRcdHNlbGYuJGVsZW1lbnQubW9kYWwoJ2hpZGUnKTtcclxuXHR9O1xyXG5cclxuXHRzZWxmLiRlbGVtZW50Lm1vZGFsKCdzaG93Jyk7XHJcblx0bW9kYWxzLnB1c2goc2VsZik7XHJcblx0bW9kYWxzLmxhc3QgPSBzZWxmO1xyXG59O1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xyXG5cclxud2luZG93LnBvcG92ZXJzID0ge307XHJcblxyXG5wb3BvdmVycy5jbG9zZSA9IGZ1bmN0aW9uKCkge1xyXG5cdCQoJy5wb3BvdmVyJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdCQoJCh0aGlzKS5kYXRhKCdicy5wb3BvdmVyJykuZWxlbWVudCkucG9wb3ZlcignaGlkZScpO1xyXG5cdH0pO1xyXG59O1xyXG5cclxud2luZG93LlBvcG92ZXIgPSBmdW5jdGlvbihvcHRpb25zKSB7XHJcblx0bGV0IHNlbGYgPSB0aGlzO1xyXG5cdG9wdGlvbnMuYXJyb3cgPSAob3B0aW9ucy5hcnJvdyA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IG9wdGlvbnMuYXJyb3cpO1xyXG5cdHNlbGYuJHRyaWdnZXIgPSAkKG9wdGlvbnMudHJpZ2dlcik7XHJcblx0c2VsZi4kZWxlbWVudCA9IG51bGw7XHJcblx0c2VsZi4kYXJyb3cgPSBudWxsO1xyXG5cdHNlbGYuaW5pdGlhbGl6ZSA9IG9wdGlvbnMuaW5pdGlhbGl6ZTtcclxuXHRzZWxmLmlkID0gRGF0ZS5ub3coKS50b1N0cmluZygzNikuc2xpY2UoLTMpICsgTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc2xpY2UoMiwgNSk7XHJcblx0c2VsZi5jbG9zZV9vbl9ibHVyID0gKG9wdGlvbnMuY2xvc2Vfb25fYmx1ciAhPT0gZmFsc2UpO1xyXG5cdFxyXG5cdHNlbGYuJHRyaWdnZXIucG9wb3Zlcih7XHJcblx0XHR0aXRsZTogJ2JsYW5rJyxcclxuXHRcdGh0bWw6IHRydWUsXHJcblx0XHRwbGFjZW1lbnQ6IG9wdGlvbnMucGxhY2VtZW50IHx8ICdyaWdodCcsXHJcblx0XHRib3VuZGFyeTogJ3dpbmRvdycsXHJcblx0fSk7XHJcblxyXG5cdHNlbGYuJHRyaWdnZXIuYXR0cigndGl0bGUnLCBzZWxmLiR0cmlnZ2VyLmF0dHIoJ2RhdGEtb3JpZ2luYWwtdGl0bGUnKSk7XHJcblxyXG5cdHNlbGYuZXh0ZXJuYWxfY2xpY2tfaGFuZGxlciA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRpZiAoIXNlbGYuY2xvc2Vfb25fYmx1cikge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCdib2R5JykubGVuZ3RoID09IDApIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICgkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLnBvcG92ZXInKS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRzZWxmLmhpZGUoKTtcclxuXHR9O1xyXG5cclxuXHRzZWxmLiR0cmlnZ2VyLm9uKCdpbnNlcnRlZC5icy5wb3BvdmVyJywgZnVuY3Rpb24oKSB7XHJcblx0XHRzZWxmLiRlbGVtZW50ID0gJChzZWxmLiR0cmlnZ2VyLmRhdGEoJ2JzLnBvcG92ZXInKS50aXApO1xyXG5cdFx0XHJcbiAgICAgICAgJCgnLnBvcG92ZXInKS5ub3Qoc2VsZi4kZWxlbWVudCkuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCgkKHRoaXMpLmRhdGEoJ2JzLnBvcG92ZXInKS5lbGVtZW50KS5wb3BvdmVyKCdoaWRlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0ICRhcnJvdyA9IHNlbGYuJGVsZW1lbnQuY2hpbGRyZW4oJy5hcnJvdycpO1xyXG5cdFx0bGV0ICRuZXdfZWxlbWVudCA9ICQob3B0aW9ucy5jb250ZW50KHNlbGYpIHx8ICcnKTtcclxuXHRcdHNlbGYuJGVsZW1lbnQuaHRtbCgkbmV3X2VsZW1lbnQuaHRtbCgpKS5hZGRDbGFzcygkbmV3X2VsZW1lbnQuYXR0cignY2xhc3MnKSk7XHJcblx0XHRvcHRpb25zLmFycm93ICYmICRhcnJvdy5wcmVwZW5kVG8oc2VsZi4kZWxlbWVudCk7XHJcblx0XHRzZWxmLmluaXRpYWxpemUgJiYgc2VsZi5pbml0aWFsaXplKCk7XHJcblxyXG5cdFx0c2VsZi4kZWxlbWVudC5maW5kKCcucG9wb3Zlci1oZWFkZXJfX2Nsb3NlLWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHNlbGYuaGlkZSgpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdHNlbGYuJHRyaWdnZXIub24oJ3Nob3duLmJzLnBvcG92ZXInLCBmdW5jdGlvbigpIHtcclxuXHRcdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsIHNlbGYuZXh0ZXJuYWxfY2xpY2tfaGFuZGxlcik7XHJcblx0fSk7XHJcblxyXG5cdHNlbGYuJHRyaWdnZXIub24oJ2hpZGRlbi5icy5wb3BvdmVyJywgZnVuY3Rpb24oKSB7XHJcblx0XHQkKGRvY3VtZW50KS5vZmYoJ2NsaWNrJywgc2VsZi5leHRlcm5hbF9jbGlja19oYW5kbGVyKTtcclxuXHR9KTtcclxuXHJcblx0c2VsZi5zaG93ID0gZnVuY3Rpb24oKSB7XHJcblx0XHRzZWxmLiR0cmlnZ2VyLnBvcG92ZXIoJ3Nob3cnKTtcclxuXHRcdHJldHVybiBzZWxmO1xyXG5cdH07XHJcblxyXG5cdHNlbGYuaGlkZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0c2VsZi4kdHJpZ2dlci5wb3BvdmVyKCdoaWRlJyk7XHJcblx0XHRyZXR1cm4gc2VsZjtcclxuXHR9O1xyXG5cclxuXHRzZWxmLmNsb3NlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRzZWxmLiR0cmlnZ2VyLnBvcG92ZXIoJ2hpZGUnKTtcclxuXHRcdHJldHVybiBzZWxmO1xyXG5cdH07XHJcblxyXG5cdHNlbGYudXBkYXRlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRzZWxmLiR0cmlnZ2VyLnBvcG92ZXIoJ3VwZGF0ZScpO1xyXG5cdFx0cmV0dXJuIHNlbGY7XHJcblx0fTtcclxuXHJcblx0c2VsZi5maXggPSBmdW5jdGlvbigpIHtcclxuXHRcdGlmIChzZWxmLiRlbGVtZW50LnBvc2l0aW9uKCkudG9wICsgc2VsZi4kZWxlbWVudC5oZWlnaHQoKSA+ICQod2luZG93KS5oZWlnaHQoKSkge1xyXG5cdFx0XHRyZXR1cm4gc2VsZi51cGRhdGUoKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoc2VsZi4kZWxlbWVudC5wb3NpdGlvbigpLmxlZnQgKyBzZWxmLiRlbGVtZW50LndpZHRoKCkgPiAkKHdpbmRvdykud2lkdGgoKSkge1xyXG5cdFx0XHRyZXR1cm4gc2VsZi51cGRhdGUoKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gc2VsZjtcclxuXHR9O1xyXG59O1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xyXG5cclxuLy8gd2luZG93LnRpcHMgPSB7fTtcclxuXHJcbi8vIHRpcHMuY2xvc2UgPSBmdW5jdGlvbigpIHtcclxuLy8gXHQkKCcucG9wb3ZlcicpLmVhY2goZnVuY3Rpb24oKSB7XHJcbi8vIFx0XHQkKCQodGhpcykuZGF0YSgnYnMucG9wb3ZlcicpLmVsZW1lbnQpLnBvcG92ZXIoJ2hpZGUnKTtcclxuLy8gXHR9KTtcclxuLy8gfTtcclxuXHJcbndpbmRvdy5UaXAgPSBmdW5jdGlvbihvcHRpb25zKSB7XHJcblx0bGV0IHNlbGYgPSB0aGlzO1xyXG5cdG9wdGlvbnMuYXJyb3cgPSAob3B0aW9ucy5hcnJvdyA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IG9wdGlvbnMuYXJyb3cpO1xyXG5cdHNlbGYuJHRyaWdnZXIgPSAkKG9wdGlvbnMuc2VsZWN0b3IpO1xyXG5cdHNlbGYuJGVsZW1lbnQgPSBudWxsO1xyXG5cdHNlbGYuJGFycm93ID0gbnVsbDtcclxuXHRzZWxmLmluaXRpYWxpemUgPSBvcHRpb25zLmluaXRpYWxpemU7XHJcblx0c2VsZi5pZCA9IERhdGUubm93KCkudG9TdHJpbmcoMzYpLnNsaWNlKC0zKSArIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnNsaWNlKDIsIDUpO1xyXG5cclxuXHRzZWxmLiR0cmlnZ2VyLnBvcG92ZXIoe1xyXG5cdFx0dGl0bGU6ICdibGFuaycsXHJcblx0XHRodG1sOiB0cnVlLFxyXG5cdFx0cGxhY2VtZW50OiBvcHRpb25zLnBsYWNlbWVudCB8fCAncmlnaHQnLFxyXG5cdFx0Ym91bmRhcnk6ICd3aW5kb3cnLFxyXG5cdH0pO1xyXG5cclxuXHRzZWxmLiR0cmlnZ2VyLmF0dHIoJ3RpdGxlJywgc2VsZi4kdHJpZ2dlci5hdHRyKCdkYXRhLW9yaWdpbmFsLXRpdGxlJykpO1xyXG5cclxuXHRzZWxmLmV4dGVybmFsX2NsaWNrX2hhbmRsZXIgPSBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0aWYgKCQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCdib2R5JykubGVuZ3RoID09IDApIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICgkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLnBvcG92ZXInKS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRzZWxmLmhpZGUoKTtcclxuXHR9O1xyXG5cclxuXHRzZWxmLiR0cmlnZ2VyLm9uKCdpbnNlcnRlZC5icy5wb3BvdmVyJywgZnVuY3Rpb24oKSB7XHJcblx0XHRzZWxmLiRlbGVtZW50ID0gJChzZWxmLiR0cmlnZ2VyLmRhdGEoJ2JzLnBvcG92ZXInKS50aXApO1xyXG5cdFx0bGV0ICRhcnJvdyA9IHNlbGYuJGVsZW1lbnQuY2hpbGRyZW4oJy5hcnJvdycpO1xyXG5cdFx0bGV0ICRuZXdfZWxlbWVudCA9ICQob3B0aW9ucy5jb250ZW50KHNlbGYpIHx8ICcnKTtcclxuXHRcdHNlbGYuJGVsZW1lbnQuaHRtbCgkbmV3X2VsZW1lbnQuaHRtbCgpKS5hZGRDbGFzcygkbmV3X2VsZW1lbnQuYXR0cignY2xhc3MnKSk7XHJcblx0XHRvcHRpb25zLmFycm93ICYmICRhcnJvdy5wcmVwZW5kVG8oc2VsZi4kZWxlbWVudCk7XHJcblx0XHRzZWxmLmluaXRpYWxpemUgJiYgc2VsZi5pbml0aWFsaXplKCk7XHJcblxyXG5cdFx0c2VsZi4kZWxlbWVudC5maW5kKCcucG9wb3Zlci1oZWFkZXJfX2Nsb3NlLWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHNlbGYuaGlkZSgpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdHNlbGYuJHRyaWdnZXIub24oJ3Nob3duLmJzLnBvcG92ZXInLCBmdW5jdGlvbigpIHtcclxuXHRcdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsIHNlbGYuZXh0ZXJuYWxfY2xpY2tfaGFuZGxlcik7XHJcblx0fSk7XHJcblxyXG5cdHNlbGYuJHRyaWdnZXIub24oJ2hpZGRlbi5icy5wb3BvdmVyJywgZnVuY3Rpb24oKSB7XHJcblx0XHQkKGRvY3VtZW50KS5vZmYoJ2NsaWNrJywgc2VsZi5leHRlcm5hbF9jbGlja19oYW5kbGVyKTtcclxuXHR9KTtcclxuXHJcblx0c2VsZi5zaG93ID0gZnVuY3Rpb24oKSB7XHJcblx0XHRzZWxmLiR0cmlnZ2VyLnBvcG92ZXIoJ3Nob3cnKTtcclxuXHRcdHJldHVybiBzZWxmO1xyXG5cdH07XHJcblxyXG5cdHNlbGYuaGlkZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0c2VsZi4kdHJpZ2dlci5wb3BvdmVyKCdoaWRlJyk7XHJcblx0XHRyZXR1cm4gc2VsZjtcclxuXHR9O1xyXG5cclxuXHRzZWxmLmNsb3NlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRzZWxmLiR0cmlnZ2VyLnBvcG92ZXIoJ2hpZGUnKTtcclxuXHRcdHJldHVybiBzZWxmO1xyXG5cdH07XHJcblxyXG5cdHNlbGYudXBkYXRlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRzZWxmLiR0cmlnZ2VyLnBvcG92ZXIoJ3VwZGF0ZScpO1xyXG5cdFx0cmV0dXJuIHNlbGY7XHJcblx0fTtcclxuXHJcblx0c2VsZi5maXggPSBmdW5jdGlvbigpIHtcclxuXHRcdGlmIChzZWxmLiRlbGVtZW50LnBvc2l0aW9uKCkudG9wICsgc2VsZi4kZWxlbWVudC5oZWlnaHQoKSA+ICQod2luZG93KS5oZWlnaHQoKSkge1xyXG5cdFx0XHRyZXR1cm4gc2VsZi51cGRhdGUoKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoc2VsZi4kZWxlbWVudC5wb3NpdGlvbigpLmxlZnQgKyBzZWxmLiRlbGVtZW50LndpZHRoKCkgPiAkKHdpbmRvdykud2lkdGgoKSkge1xyXG5cdFx0XHRyZXR1cm4gc2VsZi51cGRhdGUoKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gc2VsZjtcclxuXHR9O1xyXG59O1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xyXG5cclxud2luZG93LnNsaWRldXBzID0gW107XHJcbnNsaWRldXBzLmxhc3QgPSBudWxsO1xyXG5cclxuc2xpZGV1cHMuY2xvc2UgPSBmdW5jdGlvbigpIHtcclxuXHRmb3IgKGxldCBpdGVyYXRpb24gPSAwOyAoc2xpZGV1cHMubGFzdCAmJiBpdGVyYXRpb24gPCAxMDAwKTsgKytpdGVyYXRpb24pIHtcclxuXHRcdHNsaWRldXBzLmxhc3QuY2xvc2UoKTtcclxuXHR9XHJcbn07XHJcblxyXG53aW5kb3cuU2xpZGV1cCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuXHRsZXQgc2VsZiA9IHRoaXM7XHJcblx0c2VsZi5pZCA9IERhdGUubm93KCkudG9TdHJpbmcoMzYpO1xyXG5cdHNlbGYuaXNfc2hvd24gPSBmYWxzZTtcclxuXHRzZWxmLm5hbWUgPSBvcHRpb25zLm5hbWUgfHwgbnVsbDtcclxuXHRzZWxmLm9uX2Nsb3NlZCA9IG51bGw7XHJcblx0c2VsZi5vbl9zaG93biA9IG51bGw7XHJcblxyXG5cdGlmIChvcHRpb25zLiRlbGVtZW50KSB7XHJcblx0XHRzZWxmLiRlbGVtZW50ID0gb3B0aW9ucy4kZWxlbWVudDtcclxuXHR9IGVsc2Uge1xyXG5cdFx0c2VsZi4kZWxlbWVudCA9ICQob3B0aW9ucy5jb250ZW50IHx8ICcnKTtcclxuXHR9XHJcblxyXG5cdGlmICghc2VsZi4kZWxlbWVudC5hdHRyKCdpZCcpKSB7XHJcblx0XHRzZWxmLiRlbGVtZW50LmF0dHIoJ2lkJywgJ3NsaWRldXAtJyArIHNlbGYuaWQpO1xyXG5cdH1cclxuXHJcblx0c2VsZi5uYW1lICYmIHNlbGYuJGVsZW1lbnQuYWRkQ2xhc3MoJ2lzLScgKyBzZWxmLm5hbWUpO1xyXG5cclxuXHQvLyBzZWxmLiRlbGVtZW50Lm9uKCdoaWRlLmJzLm1vZGFsJywgZnVuY3Rpb24oKSB7XHJcblx0Ly8gXHRzZWxmLm9uY2xvc2UgJiYgc2VsZi5vbmNsb3NlKCk7XHJcblx0Ly8gfSk7XHJcblxyXG5cdC8vIHNlbGYuJGVsZW1lbnQub24oJ2hpZGRlbi5icy5tb2RhbCcsIGZ1bmN0aW9uKCkge1xyXG5cdC8vIFx0c2VsZi4kZWxlbWVudC5yZW1vdmUoKTtcclxuXHQvLyBcdHNlbGYuJGVsZW1lbnQgPSBudWxsO1xyXG5cdC8vIFx0c2xpZGV1cHMuc3BsaWNlKHNsaWRldXBzLmluZGV4T2Yoc2VsZiksIDEpO1xyXG5cdC8vIFx0c2xpZGV1cHMubGFzdCA9IChzbGlkZXVwcy5sZW5ndGggPiAwID8gc2xpZGV1cHNbc2xpZGV1cHMubGVuZ3RoIC0gMV0gOiBudWxsKTtcclxuXHQvLyBcdHNlbGYub25jbG9zZWQgJiYgc2VsZi5vbmNsb3NlZCgpO1xyXG5cdC8vIH0pO1xyXG5cclxuXHRzZWxmLiRlbGVtZW50Lm9uKCdjbGljaycsICcuc2xpZGV1cC1iYWNrZ3JvdW5kJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRzZWxmLmNsb3NlKCk7XHJcblx0fSk7XHJcblxyXG5cdHNlbGYuJGVsZW1lbnQub24oJ2NsaWNrJywgJy5zbGlkZXVwX19jbG9zZS1idXR0b24nLCBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdHNlbGYuY2xvc2UoKTtcclxuXHR9KTtcclxuXHJcblx0c2VsZi5jbG9zZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0c2VsZi4kZWxlbWVudC5yZW1vdmVDbGFzcygnaXMtc2hvd24nKTtcclxuXHRcdHNsaWRldXBzLnNwbGljZShzbGlkZXVwcy5pbmRleE9mKHNlbGYpLCAxKTtcclxuXHRcdHNsaWRldXBzLmxhc3QgPSAoc2xpZGV1cHMubGVuZ3RoID4gMCA/IHNsaWRldXBzW3NsaWRldXBzLmxlbmd0aCAtIDFdIDogbnVsbCk7XHJcblxyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0c2VsZi4kZWxlbWVudC5yZW1vdmUoKTtcclxuXHRcdFx0c2VsZi4kZWxlbWVudCA9IG51bGw7XHJcblx0XHRcdHNlbGYub25fY2xvc2VkICYmIHNlbGYub25fY2xvc2VkKCk7XHJcblx0XHR9LCAxMDI1MCk7XHJcblx0fTtcclxuXHJcblx0c2VsZi4kZWxlbWVudC5hcHBlbmRUbygnYm9keScpO1xyXG5cdHNsaWRldXBzLnB1c2goc2VsZik7XHJcblx0c2xpZGV1cHMubGFzdCA9IHNlbGY7XHJcblxyXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRzZWxmLiRlbGVtZW50LmFkZENsYXNzKCdpcy1zaG93bicpO1xyXG5cdFx0c2VsZi5vbl9zaG93ICYmIHNlbGYub25fc2hvdygpO1xyXG5cclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdHNlbGYuaXNfc2hvd24gPSB0cnVlO1xyXG5cdFx0XHRjb25zb2xlLmxvZygnU0hPV04hJyk7XHJcblx0XHRcdHNlbGYub25fc2hvd24gJiYgc2VsZi5vbl9zaG93bigpO1xyXG5cdFx0fSwgMjUwKTtcclxuXHR9LCAwKTtcclxufTtcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cclxuXHJcbiQoZnVuY3Rpb24oKSB7XHJcblx0ZnVuY3Rpb24gaW5pdGlhbGl6ZV9yZWdpc3RyYXRpb25fZm9ybSgkZm9ybSkge1xyXG5cdFx0bGV0ICR1c2VyX2VtYWlsX2lucHV0ID0gJGZvcm0uZmluZCgnW25hbWU9XCJ1c2VyW2VtYWlsXVwiXScpO1xyXG5cdFx0bGV0ICRzdWJtaXRfYnV0dG9uID0gJGZvcm0uZmluZCgnLnJlZ2lzdHJhdGlvbi1mb3JtX19idXR0b24nKTtcclxuXHJcblx0XHRmdW5jdGlvbiByZWdpc3RlcihvcHRpb25zKSB7XHJcblx0XHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cdFx0XHRyZWdpc3Rlci54aHIgJiYgcmVnaXN0ZXIueGhyLmFib3J0KCk7XHJcblx0XHRcdHJlZ2lzdGVyLnRpbWVvdXQgJiYgY2xlYXJUaW1lb3V0KHJlZ2lzdGVyLnRpbWVvdXQpO1xyXG5cdFx0XHRyZWdpc3Rlci50aW1lb3V0ID0gbnVsbDtcclxuXHRcdFx0JGZvcm0uYWRkQ2xhc3MoJ2lzLWxvYWRpbmcnKTtcclxuXHRcdFx0IW9wdGlvbnMuanVzdF92YWxpZGF0ZSAmJiAkc3VibWl0X2J1dHRvbi5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuXHJcblx0XHRcdHJlZ2lzdGVyLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJlZ2lzdGVyLnhociA9IHJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiAnL3JlZ2lzdGVyJyxcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdFx0XHR1c2VyOiB7XHJcblx0XHRcdFx0XHRcdFx0ZW1haWw6ICR1c2VyX2VtYWlsX2lucHV0LnZhbCgpLFxyXG5cdFx0XHRcdFx0XHRcdGxvY2FsaXR5X2tleTogY2xpZW50X2xvY2FsaXR5KCdrZXknKSxcclxuXHRcdFx0XHRcdFx0XHRyZWZlcnJlcl91c2VyX2lkOiB3aW5kb3cucmVmZXJyZXJfdXNlcl9pZCxcclxuXHRcdFx0XHRcdFx0XHRhZF9jYW1wYWlnbl9pZDogd2luZG93LmFkX2NhbXBhaWduX2lkLFxyXG5cdFx0XHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHRcdFx0anVzdF92YWxpZGF0ZTogb3B0aW9ucy5qdXN0X3ZhbGlkYXRlID8gMSA6IDAsXHJcblx0XHRcdFx0XHRcdGxvY2FsZTogbG9jYWxlKCksXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcblx0XHRcdFx0XHRyZWdpc3Rlci54aHIgPSBudWxsO1xyXG5cdFx0XHRcdFx0JGZvcm0ucmVtb3ZlQ2xhc3MoJ2lzLWxvYWRpbmcnKTtcclxuXHRcdFx0XHRcdCRzdWJtaXRfYnV0dG9uLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChyZXNwb25zZS5lcnJvcikge1xyXG5cdFx0XHRcdFx0XHQkLm5vdGlmeShyZXNwb25zZS5lcnJvciwgJ2Vycm9yJyk7XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRsZXQgaW5jb21wbGV0ZV9lbWFpbF9pc192YWxpZCA9ICEocmVzcG9uc2UuZGF0YS52YWxpZGF0aW9uX21lc3NhZ2VzWyd1c2VyLmVtYWlsJ10gfHwgW10pLnNvbWUoZnVuY3Rpb24odGV4dCkge1xyXG5cdFx0XHRcdFx0XHRpZiAodGV4dC5tYXRjaCgvXlRoZSAuKj8gZm9ybWF0IGlzIGludmFsaWRcXC4kLykpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGxldCBjb21wbGV0ZV9lbWFpbF9pc192YWxpZCA9ICEocmVzcG9uc2UuZGF0YS52YWxpZGF0aW9uX21lc3NhZ2VzWyd1c2VyLmVtYWlsJ10gfHwgW10pLnNvbWUoZnVuY3Rpb24odGV4dCkge1xyXG5cdFx0XHRcdFx0XHRpZiAodGV4dC5tYXRjaCgvXlRoZSAuKj8gbXVzdCBiZSBhIHZhbGlkIGVtYWlsIGFkZHJlc3NcXC4kLykpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0aWYgKHRleHQubWF0Y2goL15UaGUgLio/IGZpZWxkIGlzIHJlcXVpcmVkXFwuJC8pKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdGxldCBlbWFpbF9pc19hdmFpbGFibGUgPSAhKHJlc3BvbnNlLmRhdGEudmFsaWRhdGlvbl9tZXNzYWdlc1sndXNlci5lbWFpbCddIHx8IFtdKS5zb21lKGZ1bmN0aW9uKHRleHQpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRleHQubWF0Y2goL15UaGUgLis/IGhhcyBhbHJlYWR5IGJlZW4gdGFrZW5cXC4kLyk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHQkZm9ybS50b2dnbGVDbGFzcygnaXMtc3VjY2VzcycsIGluY29tcGxldGVfZW1haWxfaXNfdmFsaWQgJiYgY29tcGxldGVfZW1haWxfaXNfdmFsaWQgJiYgZW1haWxfaXNfYXZhaWxhYmxlKTtcclxuXHRcdFx0XHRcdCRmb3JtLnRvZ2dsZUNsYXNzKCdpcy1mYWlsJywgIWluY29tcGxldGVfZW1haWxfaXNfdmFsaWQgfHwgIWNvbXBsZXRlX2VtYWlsX2lzX3ZhbGlkIHx8ICFlbWFpbF9pc19hdmFpbGFibGUpO1xyXG5cdFx0XHRcdFx0JGZvcm0uZmluZCgncCcpLmFkZENsYXNzKCdpcy1oaWRkZW4nKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoIWluY29tcGxldGVfZW1haWxfaXNfdmFsaWQpIHtcclxuXHRcdFx0XHRcdFx0JGZvcm0uZmluZCgncC5pcy1pbnZhbGlkJykucmVtb3ZlQ2xhc3MoJ2lzLWhpZGRlbicpO1xyXG5cdFx0XHRcdFx0XHQkdXNlcl9lbWFpbF9pbnB1dC5mb2N1cygpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmICghb3B0aW9ucy5qdXN0X3ZhbGlkYXRlICYmICFjb21wbGV0ZV9lbWFpbF9pc192YWxpZCkge1xyXG5cdFx0XHRcdFx0XHQkZm9ybS5maW5kKCdwLmlzLWludmFsaWQnKS5yZW1vdmVDbGFzcygnaXMtaGlkZGVuJyk7XHJcblx0XHRcdFx0XHRcdCR1c2VyX2VtYWlsX2lucHV0LmZvY3VzKCk7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKCFlbWFpbF9pc19hdmFpbGFibGUpIHtcclxuXHRcdFx0XHRcdFx0JGZvcm0uZmluZCgncC5pcy1ub3QtYXZhaWxhYmxlJykucmVtb3ZlQ2xhc3MoJ2lzLWhpZGRlbicpO1xyXG5cdFx0XHRcdFx0XHQkdXNlcl9lbWFpbF9pbnB1dC5mb2N1cygpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQkZm9ybS50b2dnbGVDbGFzcygnaGFzLXJlZ2lzdHJhdGlvbi1hbGxvd2VkJywgKFxyXG5cdFx0XHRcdFx0XHRpbmNvbXBsZXRlX2VtYWlsX2lzX3ZhbGlkXHJcblx0XHRcdFx0XHRcdCYmXHJcblx0XHRcdFx0XHRcdGNvbXBsZXRlX2VtYWlsX2lzX3ZhbGlkXHJcblx0XHRcdFx0XHRcdCYmXHJcblx0XHRcdFx0XHRcdGVtYWlsX2lzX2F2YWlsYWJsZVxyXG5cdFx0XHRcdFx0XHQmJlxyXG5cdFx0XHRcdFx0XHRyZXNwb25zZS5kYXRhLnNsdWdfc3VjY2Vzc1xyXG5cdFx0XHRcdFx0KSk7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdC8vICRmb3JtLmZpbmQoJy5sYW5kaW5nLTJfX3JlZ2lzdHJhdGlvbi1mb3JtX19pbnB1dCBwJykucmVtb3ZlQ2xhc3MoJ3NoYWtlIGFuaW1hdGVkJyk7XHJcblxyXG5cdFx0XHRcdFx0Ly8gc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdC8vICAkZm9ybS5maW5kKCcubGFuZGluZy0yX19yZWdpc3RyYXRpb24tZm9ybV9faW5wdXQgcCcpLmFkZENsYXNzKCdzaGFrZSBhbmltYXRlZCcpO1xyXG5cdFx0XHRcdFx0Ly8gfSk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKCFvcHRpb25zLmp1c3RfdmFsaWRhdGUpIHtcclxuXHRcdFx0XHRcdFx0aWYgKCEkZm9ybS5oYXNDbGFzcygnaGFzLXJlZ2lzdHJhdGlvbi1hbGxvd2VkJykpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdCRmb3JtLmFkZENsYXNzKCdpcy1sb2FkaW5nJyk7XHJcblx0XHRcdFx0XHRcdCRzdWJtaXRfYnV0dG9uLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG5cclxuXHRcdFx0XHRcdFx0cmVnaXN0ZXIueGhyID0gcmVxdWVzdCh7XHJcblx0XHRcdFx0XHRcdFx0cm9vdDogJycsXHJcblx0XHRcdFx0XHRcdFx0dXJsOiAnL2xvZ2luX3VzaW5nX2FwaV90b2tlbicsXHJcblx0XHRcdFx0XHRcdFx0bWV0aG9kOiAnUE9TVCcsXHJcblxyXG5cdFx0XHRcdFx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHRcdFx0XHRcdHVzZXJfaWQ6IHJlc3BvbnNlLmRhdGEudXNlci5pZCxcclxuXHRcdFx0XHRcdFx0XHRcdGFwaV90b2tlbjogcmVzcG9uc2UuZGF0YS51c2VyLmFwaV90b2tlbixcclxuXHRcdFx0XHRcdFx0XHRcdHJlbWVtYmVyX21lOiAxLFxyXG5cdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKHJlc3BvbnNlLmVycm9yKSB7XHJcblx0XHRcdFx0XHRcdFx0XHQkLm5vdGlmeShyZXNwb25zZS5lcnJvciwgJ2Vycm9yJyk7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlc3BvbnNlLmRhdGEucmVkaXJlY3RfdXJsO1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0sIG9wdGlvbnMuanVzdF92YWxpZGF0ZSA/IDIwMCA6IDApO1xyXG5cdFx0fVxyXG4gIFxyXG5cdFx0JHVzZXJfZW1haWxfaW5wdXQub24oJ2lucHV0JywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmVnaXN0ZXIoeyBqdXN0X3ZhbGlkYXRlOiB0cnVlIH0pO1xyXG5cdFx0fSk7XHJcbiAgXHJcblx0XHQkdXNlcl9lbWFpbF9pbnB1dC5mb2N1cyhmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRzZXRfaW5wdXRfY2FycmV0X2F0X2VuZCh0aGlzKTtcclxuXHRcdFx0JGZvcm0uYWRkQ2xhc3MoJ2hhcy11c2VyLWVtYWlsLWZvY3VzZWQnKTtcclxuXHRcdH0pLmJsdXIoZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0JGZvcm0ucmVtb3ZlQ2xhc3MoJ2hhcy11c2VyLWVtYWlsLWZvY3VzZWQnKTtcclxuXHRcdH0pO1xyXG4gIFxyXG5cdFx0JGZvcm0uc3VibWl0KGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgIFxyXG5cdFx0XHRpZiAoJHN1Ym1pdF9idXR0b24uaGFzQ2xhc3MoJ2Rpc2FibGVkJykpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuICAgXHJcblx0XHRcdGlmICgkZm9ybS5oYXNDbGFzcygnaXMtY2xvc2VkJykpIHtcclxuXHRcdFx0XHQkZm9ybS5yZW1vdmVDbGFzcygnaXMtY2xvc2VkJyk7XHJcblx0XHRcdFx0JHVzZXJfZW1haWxfaW5wdXQuZm9jdXMoKTtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuICAgXHJcblx0XHRcdHJlZ2lzdGVyKCk7XHJcblx0XHR9KTtcclxuXHR9XHJcbiBcclxuXHQkKCcucmVnaXN0cmF0aW9uLWZvcm0nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0aW5pdGlhbGl6ZV9yZWdpc3RyYXRpb25fZm9ybSgkKHRoaXMpKTtcclxuXHR9KTtcclxuIFxyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xyXG4gXHJcblx0JCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbihldmVudCkge1xyXG5cdFx0JCgnLmdvLXRvLXRvcC1idXR0b24nKS50b2dnbGVDbGFzcygnaXMtaGlkZGVuJywgJCh3aW5kb3cpLnNjcm9sbFRvcCgpIDw9IDIwKTtcclxuXHR9KTtcclxuXHJcblx0JCgnLmdvLXRvLXRvcC1idXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdCQod2luZG93KS5zY3JvbGxUb3AoMCk7XHJcblx0fSk7XHJcbiBcclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cclxuIFxyXG5cdCQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKCk7XHJcbiBcclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cclxuIFxyXG5cdGNsaWVudF9sb2NhbGl0eShmdW5jdGlvbihsb2NhbGl0eSkge1xyXG5cdFx0Y29uc29sZS5sb2cobG9jYWxpdHkpO1xyXG5cdH0pO1xyXG4gXHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEhVTUJVUkdFUiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxuIFxyXG5cdCQoJyNtZW51LWh1bWJ1cmdlcicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0JCh0aGlzKS50b2dnbGVDbGFzcygnaXMtb3BlbicpO1xyXG5cdH0pO1xyXG59KTtcclxuXHJcbiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpbiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpbiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpbiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpbiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpbiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==