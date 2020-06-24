let $ = window.$;

// ---------------------------------------------------------------------- //

window.template = function(name, parameters) {
    let html = $('#' + name + '-template').html() || null;
    
    if (!html) {
		throw new Error('The `' + name + '` template does not exist');
	}
 
	return ejs.render(html, parameters);
};

// ---------------------------------------------------------------------- //

window.request = function(options, callback) {
	if (Array.isArray(options)) {
		options = { many: options, parallel: true };
	}

	if (options.many) {
		let responses = {};
		let requests = options.many;
		
		if (options.parallel) {
			return requests.map(function(options, request_index) {
				return request(options, function(response) {
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
				requests: requests.map(function(request) {
					if (typeof request == 'string') {
						request = { url: request };
					}

					let query_string = $.param(request.data || {});
					return request.url + (query_string ? '?' + query_string : '');
				}),
			},
		}, function(response) {
			return callback.apply(null, response.responses);
		});
	}

	let data = null;

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
			Object.assign(data, { '@': options.fields });
		}
	}

	if (typeof options == 'string') {
		options = { url: options };
	}

	options.root = (options.root === undefined ? '/api' : options.root);
	options.url = options.url.replace(/\/{2,}/, '/').replace(/^\//, '');

	return $.ajax({
		method: (options.method || 'GET'),

		url: (
			options.root
			+
			(options.url && options.url[0] != '/' ? '/' : '')
			+
			options.url
		),

		data: data,
		contentType: options.contentType,
		processData: options.processData,

		xhr: function() {
			let xhr = $.ajaxSettings.xhr();

            xhr.upload && xhr.upload.addEventListener('progress', function(event) {
            	let percent = Math.floor(event.loaded / event.total * 100);
            	return options.progress && options.progress(percent, event.loaded, event.total);
            }, false);

            return xhr;
		},

		beforeSend: function(request) {
			window.csrf_token && request.setRequestHeader('X-CSRF-Token', window.csrf_token);
			window.auth && request.setRequestHeader('Authorization', 'Bearer ' + window.auth.user.api_token);
		},
	}).done(function(response, textStatus, xhr) {
		// let error = response.error || response.exception;

		if (response.error && response.error != 'Validation') {
			return callback && callback(response);
		}

		return callback && callback(response);
	}).fail(function(xhr) {
		if (xhr.statusText == 'abort') {
			return;
		}

		let response = xhr.responseJSON || null;

		if (response && response.error) {
			return callback && callback(response);
		}
		
		if (response && response.exception) {
			return callback && callback(Object.assign({
				error: 'INTERNAL_ERROR',
			}, response));
		}

		if (xhr.status == 404) {
			return callback && callback({
				error: 'NOT_FOUND',
			});
		}

		if (xhr.status == 0) {
			return callback && callback({
				error: 'INTERNET_DISCONNECTED',
			});
		}

		console.error(xhr.responseJSON);
		$.notify('Server error: ' + xhr.status, 'error');
	});
};

// ---------------------------------------------------------------------- //

window.series = function(tasks, done) {
	let results = [];

	if (tasks.length == 0) {
		return done && done(results);
	}

	(function process(index) {
		tasks[index](function(result) {
			++index;
			results.push(result);

			if (index < tasks.length) {
				process(index);
				return;
			}

			done && done(results);
		});
	})(0);
};

// ---------------------------------------------------------------------- //

window.Validator = function(element, response) {
	let self = this;
	self.$element = $(element);

	self.fails = function() {
		Validator.clear(self.$element);

		if (response.error != 'Validation') {
			return false;
		}

		Object.keys(response.validation_fields).forEach(function(validation_field) {
			let errors = response.validation_fields[validation_field];
			let $form_control = self.$element.find('[data-name="' + validation_field + '"]');
			$form_control.addClass('is-invalid');

			$form_control.add($form_control.parents().slice(0, 2)).toArray().some(function(element) {
				let $invalid_feedback = $(element).siblings('.invalid-feedback:first');

				if ($invalid_feedback.length == 0) {
					return false;
				}

				$invalid_feedback.addClass('d-block').html(errors.join('<br />'));
				return true;
			});
		});

		// $.notify('Form validation fails!', 'error');
		return true;
	};
};

Validator.clear = function(element) {
	$(element).find('.is-invalid').removeClass('is-invalid');
	$(element).find('.invalid-feedback').removeClass('d-block').html('');
};

// ---------------------------------------------------------------------- //

window.locale = function() {
	return document.body.parentElement.lang || 'en';
};

// ---------------------------------------------------------------------- //

window.client_ip = function client_ip(callback) {
	if (callback) {
		if (client_ip.data.ip) {
			return callback(client_ip.data);
		}

		return client_ip.ready_callbacks.push(callback);
	}
	
	return client_ip.data;
}

client_ip.data = JSON.parse(localStorage.getItem('last_client_ip') || '{}');
client_ip.ready_callbacks = [];

client_ip.update = function(data) {
	if (!data.ip) {
		return;
	}

	client_ip.data = data;
	localStorage.setItem('last_client_ip', JSON.stringify(client_ip.data));

	client_ip.ready_callbacks.forEach(function(ready_callback) {
		ready_callback(client_ip.data);
	});

	client_ip.ready_callbacks = [];
};

// ---------------------------------------------------------------------- //

window.Router = function(options) {
	let self = this;
	self.current_route = null;

	self.update = function() {
		if (self.current_route) {
			self.current_route.off && self.current_route.off.apply(self.current_route, [ self ]);
		}

		options.clear && options.clear();
		self.current_route = null;

		let found = options.routes.some(function(route) {
			let match = window.location.pathname.match(route.path);

			if (!match) {
				return false;
			}

			self.current_route = route;

			self.current_route.on && self.current_route.on.apply(self.current_route, Array.prototype.slice.apply(match, [1]).concat([
				self,
			]));

			return true;
		});

		if (!found) {
			options.default && options.default();
		}
	};

	self.go = function(path) {
		$(function() {
			if (window.location.pathname != path) {
				history.pushState({}, null, path);
			}

			self.update();
		});
	};

	self.replace = function(path) {
		$(function() {
			if (window.location.pathname != path) {
				history.replaceState({}, null, path);
			}

			self.update();
		});
	};

	window.onpopstate = function() {
		self.update();
	};

	$(document).on('click', 'a[href]:not(a[href^="#"])', function(event) {
		let $self = $(this);

		let route_exists = options.routes.some(function(route) {
			return $self.attr('href').match(route.path);
		});

		if (route_exists) {
			event.preventDefault();
			self.go($self.attr('href'));
		}
	});

	$(function() {
		self.update();
	});
};

// ---------------------------------------------------------------------- //

window.__ = window.trans = function(path, parameters) {
	if (!window.lang) {
		throw new Error('[LANG] No language loaded');
	}

	parameters = parameters || [];

	let expression = path.split(/\./).reduce(function(list, part) {
		return (list && list[part]) ? list[part] : null;
	}, lang) || '';

	(expression && typeof expression == 'string') && (expression.match(/\:[a-z_]+/g) || []).map(function(match) {
		return match.slice(1);
	}).filter(function(parameter_name, parameter_name_index, parameter_names) {
		return parameter_names.indexOf(parameter_name) == parameter_name_index;
	}).sort(function(parameter_name0, parameter_name1) {
		return parameter_name1.length - parameter_name0.length;
	}).forEach(function(parameter_name) {
		if (typeof parameters[parameter_name] === 'undefined') {
			throw new Error('[LANG] Parameter `' + parameter_name + '` is not set in `' + path + '` path');
		}

		expression = expression.replace(new RegExp('\:' + parameter_name, 'g'), parameters[parameter_name] || '');
	});

	return expression || path;
};

// ---------------------------------------------------------------------- //

window.cookies = {};

cookies.set = function(name, value, seconds) {
    let expires = '';

    if (seconds) {
        let date = new Date();
        date.setTime(date.getTime() + seconds * 1000);
        expires = '; expires=' + date.toUTCString();
    }

    document.cookie = name + '=' + (value || '')  + expires + '; path=/';
};

cookies.get = function(name) {
    let nameEQ = name + '=';
    let ca = document.cookie.split(';');

    for (let i = 0; i < ca.length; ++i) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        	c = c.substring(1, c.length);
        }

        if (c.indexOf(nameEQ) == 0) {
        	return c.substring(nameEQ.length, c.length);
        }
    }

    return null;
};

cookies.forget = function(name) {
	cookies.set(name, null, -99999999);
};

// ---------------------------------------------------------------------- //

window.copy_text_to_clipboard = function(text) {
	let $input = $('<input />').appendTo('body');
	$input.val(text).select();
	document.execCommand('copy');
	$input.remove();
};

window.paste_text_from_clipboard = function(element) {
	let value = null;
	let $input = $('<input />').appendTo('body');
	$input.focus();
	document.execCommand('paste');
	value = $input.val();
	$input.remove();
	return value;
};

window.set_input_carret_at_end = function(element) {
	if (document.selection) {
		element.focus();
		let selection_range = document.selection.createRange();
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

window.number_format = function(number, count_of_integers_after_dot) {
	count_of_integers_after_dot = (count_of_integers_after_dot === undefined ? 2 : count_of_integers_after_dot);
	return number.toFixed(count_of_integers_after_dot);
};

window.time_interval_to_string = (time_interval, show_seconds) => {
	let hours = Math.floor(time_interval / 60 / 60);
	let minutes = Math.floor(time_interval / 60 % 60);
	let seconds = time_interval % 60;

	let parts = [
		hours,
		minutes < 10 ? '0' + minutes : minutes,
	];

	show_seconds && parts.push(seconds < 10 ? '0' + seconds : seconds);
	return parts.join(':');
};

// ---------------------------------------------------------------------- //

window.client_locality = function client_locality(parameter_name, default_value) {
	if (typeof parameter_name == 'function') {
		let callback = parameter_name;

		if (client_locality.data) {
			return callback(client_locality.data);
		}

		return client_locality.ready_callbacks.push(callback);
	}

	if (client_locality.data) {
		default_value = default_value || null;
		return parameter_name ? (client_locality.data[parameter_name] || default_value) : client_locality.data;
	}

	return null;
}

client_locality.data = JSON.parse(localStorage.getItem('last_client_locality') || 'null');
client_locality.ready_callbacks = [];

client_locality.update = function(data) {
	if (!data) {
		return;
	}

	client_locality.data = data;
	localStorage.setItem('last_client_locality', JSON.stringify(client_locality.data));

	client_locality.ready_callbacks.forEach(function(ready_callback) {
		ready_callback(client_locality.data);
	});

	client_locality.ready_callbacks = [];
}

client_ip(function() {
	if (!client_ip.data.city_name || !client_ip.data.country_name) {
		return;
	}

	let query = '';
	query += client_ip.data.city_name;
	query += (client_ip.data.region_name ? ', ' + client_ip.data.region_name : '');
	query += ', ' + client_ip.data.country_name;

	return request({
		url: '/localities/autocomplete',

		data: {
			query: query,
			locale: locale(),
			with_country: true,
		},
	}, function(response) {
		if (response.error) {
			console.error(response.error);
			return;
		}

		return client_locality.update(response.data[0] || null);
	});
});

// ---------------------------------------------------------------------- //

window.modals = [];
modals.last = null;

modals.close = function() {
	for (let iteration = 0; (modals.last && iteration < 1000); ++iteration) {
		modals.last.close();
	}
};

window.Modal = function(options) {
	let self = this;
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

	self.$element.on('hide.bs.modal', function() {
		self.onclose && self.onclose();
	});

	self.$element.on('hidden.bs.modal', function() {
		self.$element.remove();
		self.$element = null;
		modals.splice(modals.indexOf(self), 1);
		modals.last = (modals.length > 0 ? modals[modals.length - 1] : null);
		self.onclosed && self.onclosed();
	});

	self.close = function() {
		self.$element.modal('hide');
	};

	self.$element.modal('show');
	modals.push(self);
	modals.last = self;
};

// ---------------------------------------------------------------------- //

window.popovers = {};

popovers.close = function() {
	$('.popover').each(function() {
		$($(this).data('bs.popover').element).popover('hide');
	});
};

window.Popover = function(options) {
	let self = this;
	options.arrow = (options.arrow === undefined ? true : options.arrow);
	self.$trigger = $(options.trigger);
	self.$element = null;
	self.$arrow = null;
	self.initialize = options.initialize;
	self.id = Date.now().toString(36).slice(-3) + Math.random().toString(36).slice(2, 5);
	self.close_on_blur = (options.close_on_blur !== false);
	
	self.$trigger.popover({
		title: 'blank',
		html: true,
		placement: options.placement || 'right',
		boundary: 'window',
	});

	self.$trigger.attr('title', self.$trigger.attr('data-original-title'));

	self.external_click_handler = function(event) {
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

	self.$trigger.on('inserted.bs.popover', function() {
		self.$element = $(self.$trigger.data('bs.popover').tip);
		
        $('.popover').not(self.$element).each(function() {
            $($(this).data('bs.popover').element).popover('hide');
        });
        
        let $arrow = self.$element.children('.arrow');
		let $new_element = $(options.content(self) || '');
		self.$element.html($new_element.html()).addClass($new_element.attr('class'));
		options.arrow && $arrow.prependTo(self.$element);
		self.initialize && self.initialize();

		self.$element.find('.popover-header__close-button').click(function(event) {
			event.preventDefault();
			self.hide();
		});
	});

	self.$trigger.on('shown.bs.popover', function() {
		$(document).on('click', self.external_click_handler);
	});

	self.$trigger.on('hidden.bs.popover', function() {
		$(document).off('click', self.external_click_handler);
	});

	self.show = function() {
		self.$trigger.popover('show');
		return self;
	};

	self.hide = function() {
		self.$trigger.popover('hide');
		return self;
	};

	self.close = function() {
		self.$trigger.popover('hide');
		return self;
	};

	self.update = function() {
		self.$trigger.popover('update');
		return self;
	};

	self.fix = function() {
		if (self.$element.position().top + self.$element.height() > $(window).height()) {
			return self.update();
		}

		if (self.$element.position().left + self.$element.width() > $(window).width()) {
			return self.update();
		}

		return self;
	};
};

// ---------------------------------------------------------------------- //

// window.tips = {};

// tips.close = function() {
// 	$('.popover').each(function() {
// 		$($(this).data('bs.popover').element).popover('hide');
// 	});
// };

window.Tip = function(options) {
	let self = this;
	options.arrow = (options.arrow === undefined ? true : options.arrow);
	self.$trigger = $(options.selector);
	self.$element = null;
	self.$arrow = null;
	self.initialize = options.initialize;
	self.id = Date.now().toString(36).slice(-3) + Math.random().toString(36).slice(2, 5);

	self.$trigger.popover({
		title: 'blank',
		html: true,
		placement: options.placement || 'right',
		boundary: 'window',
	});

	self.$trigger.attr('title', self.$trigger.attr('data-original-title'));

	self.external_click_handler = function(event) {
		if ($(event.target).closest('body').length == 0) {
			return;
		}

		if ($(event.target).closest('.popover').length > 0) {
			return;
		}

		self.hide();
	};

	self.$trigger.on('inserted.bs.popover', function() {
		self.$element = $(self.$trigger.data('bs.popover').tip);
		let $arrow = self.$element.children('.arrow');
		let $new_element = $(options.content(self) || '');
		self.$element.html($new_element.html()).addClass($new_element.attr('class'));
		options.arrow && $arrow.prependTo(self.$element);
		self.initialize && self.initialize();

		self.$element.find('.popover-header__close-button').click(function(event) {
			event.preventDefault();
			self.hide();
		});
	});

	self.$trigger.on('shown.bs.popover', function() {
		$(document).on('click', self.external_click_handler);
	});

	self.$trigger.on('hidden.bs.popover', function() {
		$(document).off('click', self.external_click_handler);
	});

	self.show = function() {
		self.$trigger.popover('show');
		return self;
	};

	self.hide = function() {
		self.$trigger.popover('hide');
		return self;
	};

	self.close = function() {
		self.$trigger.popover('hide');
		return self;
	};

	self.update = function() {
		self.$trigger.popover('update');
		return self;
	};

	self.fix = function() {
		if (self.$element.position().top + self.$element.height() > $(window).height()) {
			return self.update();
		}

		if (self.$element.position().left + self.$element.width() > $(window).width()) {
			return self.update();
		}

		return self;
	};
};

// ---------------------------------------------------------------------- //

window.slideups = [];
slideups.last = null;

slideups.close = function() {
	for (let iteration = 0; (slideups.last && iteration < 1000); ++iteration) {
		slideups.last.close();
	}
};

window.Slideup = function(options) {
	let self = this;
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

	self.name && self.$element.addClass('is-' + self.name);

	// self.$element.on('hide.bs.modal', function() {
	// 	self.onclose && self.onclose();
	// });

	// self.$element.on('hidden.bs.modal', function() {
	// 	self.$element.remove();
	// 	self.$element = null;
	// 	slideups.splice(slideups.indexOf(self), 1);
	// 	slideups.last = (slideups.length > 0 ? slideups[slideups.length - 1] : null);
	// 	self.onclosed && self.onclosed();
	// });

	self.$element.on('click', '.slideup-background', function(event) {
		event.preventDefault();
		self.close();
	});

	self.$element.on('click', '.slideup__close-button', function(event) {
		event.preventDefault();
		self.close();
	});

	self.close = function() {
		self.$element.removeClass('is-shown');
		slideups.splice(slideups.indexOf(self), 1);
		slideups.last = (slideups.length > 0 ? slideups[slideups.length - 1] : null);

		setTimeout(function() {
			self.$element.remove();
			self.$element = null;
			self.on_closed && self.on_closed();
		}, 10250);
	};

	self.$element.appendTo('body');
	slideups.push(self);
	slideups.last = self;

	setTimeout(function() {
		self.$element.addClass('is-shown');
		self.on_show && self.on_show();

		setTimeout(function() {
			self.is_shown = true;
			console.log('SHOWN!');
			self.on_shown && self.on_shown();
		}, 250);
	}, 0);
};

// ---------------------------------------------------------------------- //

$(function() {
	function initialize_registration_form($form) {
		let $user_email_input = $form.find('[name="user[email]"]');
		let $submit_button = $form.find('.registration-form__button');

		function register(options) {
			options = options || {};
			register.xhr && register.xhr.abort();
			register.timeout && clearTimeout(register.timeout);
			register.timeout = null;
			$form.addClass('is-loading');
			!options.just_validate && $submit_button.addClass('disabled');

			register.timeout = setTimeout(function() {
				register.xhr = request({
					url: '/register',
					
					data: {
						user: {
							email: $user_email_input.val(),
							locality_key: client_locality('key'),
							referrer_user_id: window.referrer_user_id,
							ad_campaign_id: window.ad_campaign_id,
						},

						just_validate: options.just_validate ? 1 : 0,
						locale: locale(),
					},
				}, function(response) {
					console.log(response);
					register.xhr = null;
					$form.removeClass('is-loading');
					$submit_button.removeClass('disabled');

					if (response.error) {
						$.notify(response.error, 'error');
						return;
					}

					let incomplete_email_is_valid = !(response.data.validation_messages['user.email'] || []).some(function(text) {
						if (text.match(/^The .*? format is invalid\.$/)) {
							return true;
						}

						return false;
					});
					
					let complete_email_is_valid = !(response.data.validation_messages['user.email'] || []).some(function(text) {
						if (text.match(/^The .*? must be a valid email address\.$/)) {
							return true;
						}

						if (text.match(/^The .*? field is required\.$/)) {
							return true;
						}

						return false;
					});

					let email_is_available = !(response.data.validation_messages['user.email'] || []).some(function(text) {
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
					
					$form.toggleClass('has-registration-allowed', (
						incomplete_email_is_valid
						&&
						complete_email_is_valid
						&&
						email_is_available
						&&
						response.data.slug_success
					));
					
					// $form.find('.landing-2__registration-form__input p').removeClass('shake animated');

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
								remember_me: 1,
							},
						}, function(response) {
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
  
		$user_email_input.on('input', function(event) {
			event.preventDefault();
			register({ just_validate: true });
		});
  
		$user_email_input.focus(function(event) {
			set_input_carret_at_end(this);
			$form.addClass('has-user-email-focused');
		}).blur(function(event) {
			$form.removeClass('has-user-email-focused');
		});
  
		$form.submit(function(event) {
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
 
	$('.registration-form').each(function() {
		initialize_registration_form($(this));
	});
 
	// ------------------------------------------------------------------ //
 
	$(window).scroll(function(event) {
		$('.go-to-top-button').toggleClass('is-hidden', $(window).scrollTop() <= 20);
	});

	$('.go-to-top-button').click(function() {
		$(window).scrollTop(0);
	});
 
	// ------------------------------------------------------------------ //
 
	$('[data-toggle="tooltip"]').tooltip();
 
	// ------------------------------------------------------------------ //
 
	client_locality(function(locality) {
		console.log(locality);
	});
 
	// ------------------------ HUMBURGER -------------------------------//
 
	$('#menu-humburger').click(function() {
		$(this).toggleClass('is-open');
	});
});

