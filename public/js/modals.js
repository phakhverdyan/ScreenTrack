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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/modals/close_contract.modal.js":
/*!*****************************************************!*\
  !*** ./resources/js/modals/close_contract.modal.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

modals.close_contract = function (options) {
  options = options || {};
  var contract = options.contract;
  var modal = new Modal({
    content: template('close-contract-modal', {
      contract: contract
    })
  });
  modal.$element.find('.modal__confirm-button').click(function (event) {
    event.preventDefault();
    var $self = $(this);
    $self.addClass('is-loading');
    request({
      url: '/contracts/' + contract.id + '/close',
      data: modal.$element.serialize()
    }, function (response) {
      $self.removeClass('is-loading');

      if (response.error) {
        $.notify(response.error, 'error');
        return;
      }

      Object.assign(contract, response.data);
      contract.render && contract.render();

      if (modal.$element.find('#modal__remove-from-all-projects-checkbox').prop('checked')) {
        if (dashboard.selected_project) {
          var existent_project_member = dashboard.selected_project.members.filter(function (current_project_member) {
            return current_project_member.user_id === contract.employee_user_id;
          })[0] || null;

          if (existent_project_member) {
            dashboard.selected_project.members.splice(dashboard.selected_project.members.indexOf(existent_project_member), 1);
          }

          dashboard.selected_project.renderMembers();
        }

        window.board && window.board.getColumns().forEach(function (board_column) {
          board_column.getItems().forEach(function (board_item) {
            var found_task_member = board_item.object.members.filter(function (task_member) {
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

/***/ }),

/***/ "./resources/js/modals/confirm_action.modal.js":
/*!*****************************************************!*\
  !*** ./resources/js/modals/confirm_action.modal.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

modals.confirm_action = function (options) {
  options = options || {};
  var modal = new Modal({
    content: template('confirm-action-modal', {
      question: options.question
    })
  });
  modal.$element.find('.modal__confirm-button').click(function (event) {
    event.preventDefault();
    $(this).addClass('is-loading');

    if (options.confirm) {
      options.confirm(function () {
        modal.close();
      });
    } else {
      modal.close();
    }
  });
};

/***/ }),

/***/ "./resources/js/modals/contract.modal.js":
/*!***********************************************!*\
  !*** ./resources/js/modals/contract.modal.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

modals.contract = function (options) {
  options = options || {};
  var contract = options.contract || null;
  var employee_user = options.employee_user || contract.employee_user || null;
  var contract_created = options.contract_created || null;
  var modal = new Modal({
    content: template('contract-modal', {
      contract: contract,
      employee_user: employee_user
    })
  });
  var $save_button = modal.$element.find('.modal__save-button');
  var $hourly_rate_input = modal.$element.find('[name="contract[hourly_rate]"]');
  $hourly_rate_input.on('input', function (event) {
    event.preventDefault();

    if (contract) {
      if (parseFloat($hourly_rate_input.val()) == contract.hourly_rate) {
        $save_button.text(__('modals.contract.save'));
      } else {
        $save_button.text(__('modals.contract.recreate_a_new_contract'));
      }
    }
  });
  modal.$element.submit(function (event) {
    event.preventDefault();
    $save_button.addClass('is-loading');
    request({
      method: 'POST',
      url: contract && contract.hourly_rate == parseFloat($hourly_rate_input.val()) ? '/contracts/' + contract.id + '/update' : '/users/' + employee_user.id + '/open_contract?recreate=true',
      data: modal.$element.serialize()
    }, function (response) {
      $save_button.removeClass('is-loading');

      if (response.error) {
        $.notify(response.error, 'error');
        return;
      }

      if (contract && contract.id == response.data.id) {
        Object.assign(contract, response.data);
        contract.render();
        $.notify(__('modals.contract.contract_updated'), 'success');
        modal.close();
        return;
      }

      contract_created && contract_created(response.data);
      $.notify(__('modals.contract.contract_created'), 'success');
      modal.close();
    });
  });
  modal.$element.on('shown.bs.modal', function () {
    modal.$element.find('input[value=""]:first').focus();
  });
};

/***/ }),

/***/ "./resources/js/modals/download_desktop_app_tip.modal.js":
/*!***************************************************************!*\
  !*** ./resources/js/modals/download_desktop_app_tip.modal.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

modals.download_desktop_app_tip_modal = function (options) {
  options = options || {};
  var modal = new Modal({
    content: template('download-desktop-app-tip-modal', {
      question: options.question
    })
  });
  modal.$element.find('.modal__confirm-button').click(function (event) {
    event.preventDefault();
    $(this).addClass('loading');
    user_tip_confirmed('download_desktop_app');
    modal.close();
  });
};

/***/ }),

/***/ "./resources/js/modals/interview_saved_tip.modal.js":
/*!**********************************************************!*\
  !*** ./resources/js/modals/interview_saved_tip.modal.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

modals.interview_saved_tip_modal = function (options) {
  options = options || {};
  var modal = new Modal({
    content: template('interview-saved-tip-modal', {
      question: options.question
    })
  });
  modal.$element.find('.modal__confirm-button').click(function (event) {
    event.preventDefault();
    $(this).addClass('loading');
    user_tip_confirmed('interview_saved');
    modal.close();
  });
};

/***/ }),

/***/ "./resources/js/modals/introduction.modal.js":
/*!***************************************************!*\
  !*** ./resources/js/modals/introduction.modal.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

modals.introduction = function (options) {
  options = options || {};
  var modal = new Modal({
    content: template('introduction-modal', {})
  });
};

/***/ }),

/***/ "./resources/js/modals/login.modal.js":
/*!********************************************!*\
  !*** ./resources/js/modals/login.modal.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

modals.login = function (options) {
  options = options || {};
  var modal = new Modal({
    name: 'login',
    content: template('login-modal', {
      email: options.email || null
    })
  });
  modal.$element.on('shown.bs.modal', function () {
    modal.$element.find('input[value=""]:first').focus();
  });
  modal.$element.find('.modal__forgot-password-link').click(function (event) {
    event.preventDefault();
    modal.close();
    modals.reset_password({
      email: modal.$element.find('[name="user[email]"]').val()
    });
  });
  modal.$element.find('.modal__create-new-account').click(function (event) {
    event.preventDefault();
    modal.close();
    modals.registration({
      email: modal.$element.find('[name="user[email]"]').val()
    });
  });
  modal.$element.submit(function (event) {
    event.preventDefault();
    Validator.clear(modal.$element);
    modal.$element.find('.modal__wrong-email-or-password-text').removeClass('show');
    request({
      url: '/login',
      data: modal.$element.serialize(),
      method: 'POST'
    }, function (response) {
      if (new Validator(modal.$element, response).fails()) {
        return;
      }

      if (response.error == 'WrongUserCredentials') {
        modal.$element.find('.modal__wrong-email-or-password-text').addClass('show');
        return;
      }

      if (response.error) {
        $.notify(response.error, 'error');
        return;
      }

      console.log(response.data);
      request({
        root: '',
        url: '/login_using_api_token',
        method: 'POST',
        data: {
          user_id: response.data.id,
          api_token: response.data.api_token,
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
    });
  });
};

/***/ }),

/***/ "./resources/js/modals/milestone.modal.js":
/*!************************************************!*\
  !*** ./resources/js/modals/milestone.modal.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

modals.milestone = function (options) {
  options = options || {};
  var contract = options.contract;
  var current_milestone = contract.milestones.filter(function (milestone) {
    return !milestone.released_at;
  })[0] || null;
  var milestone = options.milestone;
  var milestone_index = milestone ? contract.milestones.indexOf(milestone) : contract.milestones.length;
  var previous_milestone = milestone_index > 0 ? contract.milestones[milestone_index - 1] : null;
  var modal = new Modal({
    content: template('milestone-modal', {
      id: Date.now().toString(36),
      contract: contract,
      milestone: milestone,
      current_milestone: current_milestone,
      milestone_index: milestone_index
    })
  });
  var $save_button = modal.$element.find('button[type="submit"]');
  var $project_select = modal.$element.find('select[name="milestone[project_id]"]');
  $project_select.removeClass('custom-select').selectize({
    valueField: 'id',
    labelField: 'name',
    searchField: ['name'],
    placeholder: 'Select Project',
    sortField: [{
      field: 'index',
      direction: 'asc'
    }],
    render: {
      item: function item(_item, escape) {
        return '<div class="selectize-item + is-project">' + '<span class="selectize-item__name">' + escape(_item.name) + '</span>' + '</div>';
      },
      option: function option(item, escape) {
        return '<div class="selectize-item + is-project">' + '<span class="selectize-item__name">' + escape(item.name) + '</span>' + '</div>';
      }
    },
    onInitialize: function onInitialize() {
      var selectize = this;
      selectize.$control_input.attr('autocomplete', 'st-disabled');
      selectize.addOption(auth.user.projects.filter(function (project) {
        return project.pivot.role == 'OWNER';
      }).map(function (project, project_index) {
        return Object.assign({}, project, {
          index: project_index
        });
      }));
      var previous_milestone_project = previous_milestone && auth.user.projects.filter(function (project) {
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

      milestone && milestone.payment_id && selectize.disable();
    }
  });
  modal.$element.submit(function (event) {
    event.preventDefault();
    $save_button.addClass('is-loading');
    request({
      method: 'POST',
      url: milestone ? '/milestones/' + milestone.id + '/update' : '/contracts/' + contract.id + '/milestones/create',
      data: modal.$element.serialize()
    }, function (response) {
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
  modal.$element.on('shown.bs.modal', function () {
    modal.$element.find('input[value=""]:first').focus();
  });
};

/***/ }),

/***/ "./resources/js/modals/not_optimized_for_mobile.modal.js":
/*!***************************************************************!*\
  !*** ./resources/js/modals/not_optimized_for_mobile.modal.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

modals.not_optimized_for_mobile = function (options) {
  options = options || {};
  var modal = new Modal({
    content: template('not-optimized-for-mobile-modal', {})
  });
};

/***/ }),

/***/ "./resources/js/modals/project_task.modal.js":
/*!***************************************************!*\
  !*** ./resources/js/modals/project_task.modal.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

modals.project_task = function (options) {
  options = options || {};

  if (!options.project_task) {
    throw new Error('`project_task` option required');
  }

  var project_task = options.project_task;
  var board_item = options.board_item;
  var modal = new Modal({
    content: template('project-task-modal', {
      project_task: project_task
    })
  });
  modal.$title_textarea = modal.$element.find('.modal-header__title');
  modal.$description = modal.$element.find('.modal-task-description');
  modal.$description_textarea = modal.$element.find('.modal-task-description__textarea');
  modal.$description_save_button = modal.$element.find('.modal-task-description__save-button');
  modal.$description_close_button = modal.$element.find('.modal-task-description__close-button'); // ---------------------------------------------------------------------- //

  modal.optimize_title_textarea = function () {
    modal.$title_textarea.css('height', '');
    modal.$title_textarea.css({
      height: modal.$title_textarea[0].scrollHeight + parseInt(modal.$title_textarea.css('border')) * 2 + 'px'
    });
  };

  modal.$title_textarea.on('input', function () {
    modal.optimize_title_textarea();
  });
  modal.$title_textarea.keypress(function (event) {
    if (event.which == 13) {
      event.preventDefault();
      $(this).blur();
      return;
    }
  });
  modal.$title_textarea.keydown(function (event) {
    if (event.key == 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      $(this).val(project_task.title);
      $(this).blur();
      modal.$element.focus();
      return;
    }
  });
  modal.$title_textarea.blur(function () {
    if (project_task.title == modal.$title_textarea.val()) {
      return;
    }

    if (!modal.$title_textarea.val()) {
      modal.$title_textarea.val(project_task.title);
      return;
    }

    modal.$close_button.addClass('is-loading disabled');
    request({
      method: 'POST',
      url: '/project_tasks/' + project_task.id + '/update',
      data: {
        project_task: {
          title: modal.$title_textarea.val()
        }
      }
    }, function (response) {
      modal.$close_button.removeClass('is-loading disabled');

      if (response.error) {
        $.notify(response.error, 'error');
        return;
      }

      project_task.title = response.data.title;
      modal.$title_textarea.val(project_task.title);
      board_item.renderTitle();
    });
  }); // ---------------------------------------------------------------------- //

  modal.optimize_description_textarea = function () {
    modal.$description_textarea.css('height', '');
    modal.$description_textarea.css({
      height: modal.$description_textarea[0].scrollHeight + parseInt(modal.$title_textarea.css('border')) * 2 + 'px'
    });
  };

  modal.$description_textarea.on('input', function () {
    modal.optimize_description_textarea();
  });
  modal.$description_textarea.focus(function (event) {
    event.preventDefault();
    modal.$description.addClass('is-focus');
  });
  modal.$description_textarea.keydown(function (event) {
    if (event.key == 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      modal.$description_close_button.click();
      return;
    }
  });
  modal.$description_textarea.blur(function (event) {
    event.preventDefault(); // modal.$description.removeClass('is-focus');
  });
  modal.$description_save_button.click(function (event) {
    event.preventDefault();

    if (project_task.description == modal.$description_textarea.val()) {
      modal.$description.removeClass('is-focus');
      return;
    }

    modal.$description_save_button.addClass('is-loading disabled');
    request({
      method: 'POST',
      url: '/project_tasks/' + project_task.id + '/update',
      data: {
        project_task: {
          description: modal.$description_textarea.val()
        }
      }
    }, function (response) {
      modal.$description_save_button.removeClass('is-loading disabled');

      if (response.error) {
        $.notify(response.error, 'error');
        return;
      }

      project_task.description = response.data.description;
      modal.$description_textarea.val(project_task.description);
      modal.$description.removeClass('is-focus');
    });
  });
  modal.$description_close_button.click(function (event) {
    event.preventDefault();
    modal.$description_textarea.val(project_task.description);
    modal.$description_textarea.blur();
    modal.$description.removeClass('is-focus');
  });
  modal.$element.click(function (event) {
    if (modal.$description.hasClass('is-focus')) {
      if ($(event.target).is('.modal-task-description__textarea')) {
        return;
      }

      if ($(event.target).is('.modal-task-description__save-button')) {
        return;
      }

      modal.$description_save_button.click();
      return;
    }
  }); // ---------------------------------------------------------------------- //

  setTimeout(function () {
    modal.optimize_title_textarea();
    modal.optimize_description_textarea();
  }, 150);
};

/***/ }),

/***/ "./resources/js/modals/registration.modal.js":
/*!***************************************************!*\
  !*** ./resources/js/modals/registration.modal.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

modals.registration = function (options) {
  options = options || {};
  var modal = new Modal({
    name: 'registration',
    content: template('registration-modal', {
      email: options.email || null
    })
  });
  modal.$element.on('shown.bs.modal', function () {
    modal.$element.find('input[value=""]:first').focus();
  });
  modal.$element.find('.modal__already-have-account').click(function (event) {
    event.preventDefault();
    modal.close();
    modals.login({
      email: modal.$element.find('[name="user[email]"]').val()
    });
  });

  (function initialize_registration_form($form) {
    var $user_email_input = $form.find('[name="user[email]"]');
    var $user_slug_input = $form.find('[name="user[slug]"]');
    var $user_locality_input = $form.find('[name="user[locality_id]"]');
    var $user_latitude_input = $form.find('[name="user[latitude]"]');
    var $user_longitude_input = $form.find('[name="user[longitude]"]');
    var $user_slug_block = $form.find('.paypage-link-input-block');

    function register(options) {
      options = options || {};
      register.timeout && clearTimeout(register.timeout);
      register.timeout = null;
      register.timeout = setTimeout(function () {
        register.xhr && register.xhr.abort();
        $form.addClass('loading');
        register.xhr = request({
          url: '/register',
          data: {
            user: {
              email: $user_email_input.val(),
              slug: $user_slug_input.val(),
              locality_id: $user_locality_input.val(),
              latitude: $user_latitude_input.val(),
              longitude: $user_longitude_input.val(),
              referrer_user_id: window.referrer_user_id
            },
            suggest_user_slug: $user_slug_input.hasClass('was-manually-changed') ? 0 : 1,
            just_validate: options.just_validate ? 1 : 0
          }
        }, function (response) {
          $form.toggleClass('user-slug-shown', $user_email_input.val().length >= 3);
          $form.find('.modal__user-slug-container').toggleClass('show', $user_email_input.val().length >= 3);
          $user_slug_input.attr('tabindex', $user_email_input.val().length >= 3 ? '' : '-1');
          $form.removeClass('loading');

          if (response.error) {
            $.notify(response.error, 'error');
            return;
          }

          register.xhr = null;

          if (!$user_slug_input.hasClass('was-manually-changed')) {
            $user_slug_input.val(response.data.suggested_user_slug);
            $form.toggleClass('user-slug-less-than-3', response.data.suggested_user_slug.length < 3);
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
          var slug_is_available = !(response.data.validation_messages['user.slug'] || []).some(function (text) {
            if (text.match(/^The .+? has already been taken\.$/)) {
              return true;
            }

            if (text.match(/^The selected .*? is invalid\.$/)) {
              return true;
            }

            return false;
          });
          var slug_is_valid = !(response.data.validation_messages['user.slug'] || []).some(function (text) {
            if (text.match(/^The .*? format is invalid\.$/)) {
              return true;
            }

            if (text.match(/^The .*? field is required\.$/)) {
              return true;
            }

            return false;
          });
          $user_email_input.parent().toggleClass('success', complete_email_is_valid && email_is_available);
          $user_email_input.parent().toggleClass('fail', !incomplete_email_is_valid || !email_is_available);
          $user_slug_input.parent().toggleClass('success', response.data.slug_success);
          $user_slug_input.parent().toggleClass('fail', !response.data.slug_success);
          $user_email_input.siblings('.invalid-feedback').removeClass('d-block');

          if (!incomplete_email_is_valid) {
            $user_email_input.siblings('.invalid-feedback.is-invalid').addClass('d-block');
          } else if (!options.just_validate && !complete_email_is_valid) {
            $user_email_input.siblings('.invalid-feedback.is-invalid').addClass('d-block');
          } else if (!email_is_available) {
            $user_email_input.siblings('.invalid-feedback.is-not-available').addClass('d-block');
          }

          $user_slug_block.siblings('.invalid-feedback').removeClass('d-block');

          if (!response.data.slug_success && !slug_is_valid) {
            $user_slug_block.siblings('.invalid-feedback.is-invalid').addClass('d-block');
          } else if (!response.data.slug_success && !slug_is_available) {
            $user_slug_block.siblings('.invalid-feedback.is-not-available').addClass('d-block');
          }

          $form.toggleClass('allow-registration', complete_email_is_valid && email_is_available && response.data.slug_success); // $form.find('.landing-2__registration-form__input p').removeClass('shake animated');
          // setTimeout(function() {
          // 	$form.find('.landing-2__registration-form__input p').addClass('shake animated');
          // });

          if (!options.just_validate) {
            if (!$form.hasClass('allow-registration')) {
              return;
            }

            $form.addClass('loading');
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

              window.location.href = '/dashboard';
              return;
            });
          }
        });
      }, options.just_validate ? 200 : 0);
    }

    function set_input_carret_at_end(element) {
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
    }

    $user_email_input.on('input', function (event) {
      event.preventDefault();
      $user_email_input.not(this).val($(this).val());
      register({
        just_validate: true
      });
    });
    $user_slug_input.on('input', function (event) {
      event.preventDefault();
      $user_slug_input.not(this).val($(this).val());
      $user_slug_input.addClass('was-manually-changed');
      $form.toggleClass('user-slug-less-than-3', $user_slug_input.val().length < 3);
      register({
        just_validate: true
      });
    });
    $user_email_input.focus(function (event) {
      set_input_carret_at_end(this);
      $form.addClass('user-email-focused');
      $('.landing-2__top-background').addClass('landing-2__blur-effect');
      $('.landing-2__blur-container').addClass('landing-2__blur-effect');
    }).blur(function (event) {
      $form.removeClass('user-email-focused');
      $('.landing-2__top-background').removeClass('landing-2__blur-effect');
      $('.landing-2__blur-container').removeClass('landing-2__blur-effect');
    });
    $user_slug_input.focus(function (event) {
      set_input_carret_at_end(this);
      $form.addClass('user-slug-focused');
      $('.landing-2__top-background').addClass('landing-2__blur-effect');
      $('.landing-2__blur-container').addClass('landing-2__blur-effect');
    }).blur(function (event) {
      $form.removeClass('user-slug-focused');
      $('.landing-2__top-background').removeClass('landing-2__blur-effect');
      $('.landing-2__blur-container').removeClass('landing-2__blur-effect');
    });
    $form.submit(function (event) {
      event.preventDefault();
      register();
    });
    options.email && register({
      just_validate: true
    });
  })(modal.$element);
};

/***/ }),

/***/ "./resources/js/modals/reset_password.modal.js":
/*!*****************************************************!*\
  !*** ./resources/js/modals/reset_password.modal.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

modals.reset_password = function (options) {
  options = options || {};
  var modal = new Modal({
    content: template('reset-password-modal', {
      email: options.email || null
    })
  });
  modal.$element.on('shown.bs.modal', function () {
    modal.$element.find('input[value=""]:first').focus();
  });
  modal.$element.find('.modal__back-button').click(function (event) {
    event.preventDefault();
    modal.close();
    modals.login({
      email: modal.$element.find('[name="user[email]"]').val()
    });
  });
  modal.$element.find('.modal__reset-button').click(function (event) {
    event.preventDefault();
    request({
      url: '/reset_password',
      data: modal.$element.serialize(),
      method: 'POST'
    }, function (response) {
      if (new Validator(modal.$element, response).fails()) {
        return;
      }

      if (response.error) {
        $.notify(response.error, 'error');
        return;
      }

      modal.close();
      modals.reset_password_email_sent({
        email: modal.$element.find('[name="user[email]"]').val() || null
      });
    });
  });
};

/***/ }),

/***/ "./resources/js/modals/reset_password_completed.modal.js":
/*!***************************************************************!*\
  !*** ./resources/js/modals/reset_password_completed.modal.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

modals.reset_password_completed = function (options) {
  var modal = new Modal({
    content: template('reset-password-completed-modal', {})
  });
  modal.$element.submit(function (event) {
    event.preventDefault();
    window.location.href = '' + '/login_using_api_token?user_id=' + options.user.id + '&api_token=' + options.user.api_token + '&redirect_to=/dashboard&remember_me=1' + '';
  });
};

/***/ }),

/***/ "./resources/js/modals/reset_password_email_sent.modal.js":
/*!****************************************************************!*\
  !*** ./resources/js/modals/reset_password_email_sent.modal.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

modals.reset_password_email_sent = function (options) {
  options = options || {};
  var modal = new Modal({
    content: template('reset-password-email-sent-modal', {})
  });
  modal.$element.find('.modal__back-to-login-button').click(function (event) {
    event.preventDefault();
    modal.close();
    modals.login({
      email: options.email
    });
  });
};

/***/ }),

/***/ "./resources/js/modals/timeline_segment.modal.js":
/*!*******************************************************!*\
  !*** ./resources/js/modals/timeline_segment.modal.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

modals.timeline_segment = function (options) {
  options = options || {};
  var segments = options.segments;
  var current_segment = options.current_segment;
  var modal = new Modal({
    content: template('timeline-segment-modal', {
      segment: current_segment
    })
  });
  var $prev_button = modal.$element.find('.modal__prev-button');
  var $next_button = modal.$element.find('.modal__next-button');
  var $header = modal.$element.find('.modal-header');
  var $image_container = modal.$element.find('.modal__screenshot');
  var $image = modal.$element.find('.modal__screenshot img');
  var $current_screenshot = modal.$element.find('.modal__current-screenshot');
  var $no_screenshot = modal.$element.find('.modal__no-screenshot');
  $next_button.on('click', function () {
    current_segment = segments[segments.indexOf(current_segment) + 1];
    update_content(current_segment);
  });
  $prev_button.on('click', function () {
    current_segment = segments[segments.indexOf(current_segment) - 1];
    update_content(current_segment);
  });

  var update_content = function update_content(segment) {
    var current_segment_index = segments.indexOf(segment);
    $prev_button.prop('disabled', current_segment_index === 0);
    $next_button.prop('disabled', current_segment_index === segments.length - 1);
    $header.text([moment(segment.created_at).format('ddd, MMM D, YYYY'), 'at', moment(segment.created_at).format('h:mm A')].join(' '));
    $current_screenshot.text(current_segment_index + 1 + ' / ' + segments.length);

    if (segment.screenshot) {
      $image.attr('src', segment.screenshot.urls.original);
      $image_container.attr('href', segment.screenshot.urls.original);
      $image.removeClass('d-none');
      $no_screenshot.addClass('d-none');
    } else {
      $image.addClass('d-none');
      $no_screenshot.removeClass('d-none');
    }
  };

  update_content(current_segment);
};

/***/ }),

/***/ "./resources/js/modals/user_feedback.modal.js":
/*!****************************************************!*\
  !*** ./resources/js/modals/user_feedback.modal.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

$('body').on('click', '.show-user-feedback-modal', function (event) {
  event.preventDefault();
  modals.user_feedback();
});

modals.user_feedback = function (options) {
  options = options || {};
  var modal = new Modal({
    content: template('user-feedback-modal')
  });
  modal.$element.on('shown.bs.modal', function () {
    modal.$element.find('[name="user_feedback[text]"]').val($('.navbar-feedback__input').val());
    $('.navbar-feedback__input').val('');
    $('.navbar-feedback__input').removeData('modal');
    modal.$element.find('[name="user_feedback[text]"]').focus();
  });
  modal.$element.find('.modal__send-feedback-button').click(function (event) {
    event.preventDefault();
    $(this).addClass('is-loading disabled');
    var $form = $('form#feedback-form');
    var $this_button = $(this);
    request({
      method: 'POST',
      url: '/user_feedback/create',
      data: $form.serialize()
    }, function (response) {
      if (new Validator($form, response).fails()) {
        $this_button.removeClass('is-loading disabled');
        return;
      }

      if (response.error) {
        $.notify(response.error);
        return;
      }

      $.notify('We got your feedback! Thanks!', 'success');
      modal.close();
    });
  });
  return modal;
};

/***/ }),

/***/ "./resources/js/modals/user_profile.modal.js":
/*!***************************************************!*\
  !*** ./resources/js/modals/user_profile.modal.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

$(function () {
  $('body').on('click', '.user-profile-slide-out', function () {
    modals.user_profile({
      user_id: $(this).data('user-id')
    });
  });
});

modals.user_profile = function (options) {
  options = options || {};

  if (!options.user_id && !options.user) {
    throw new Error('`user_id` or `user` option required');
  }

  (function (callback) {
    if (options.user) {
      return callback(options.user);
    }

    return request({
      url: '/users/' + options.user_id
    }, function (response) {
      if (response.error) {
        $.notify(response.error, 'error');
        return;
      }

      return callback(response.data);
    });
  })(function (user) {
    var modal = new Modal({
      position: 'right',
      content: template('user-profile-modal', {
        user: user
      })
    });
  });
};

/***/ }),

/***/ "./resources/js/modals/zero_commission_tip.modal.js":
/*!**********************************************************!*\
  !*** ./resources/js/modals/zero_commission_tip.modal.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

modals.zero_commission_tip_modal = function (options) {
  options = options || {};
  var modal = new Modal({
    content: template('zero-commission-tip-modal')
  });
  modal.$element.find('.modal__confirm-button').click(function (event) {
    event.preventDefault();
    $(this).addClass('loading');
    user_tip_confirmed('zero_commission');
    modal.close();
  });
};

/***/ }),

/***/ 9:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** multi ./resources/js/modals/close_contract.modal.js ./resources/js/modals/confirm_action.modal.js ./resources/js/modals/contract.modal.js ./resources/js/modals/download_desktop_app_tip.modal.js ./resources/js/modals/interview_saved_tip.modal.js ./resources/js/modals/introduction.modal.js ./resources/js/modals/login.modal.js ./resources/js/modals/milestone.modal.js ./resources/js/modals/not_optimized_for_mobile.modal.js ./resources/js/modals/project_task.modal.js ./resources/js/modals/registration.modal.js ./resources/js/modals/reset_password_completed.modal.js ./resources/js/modals/reset_password_email_sent.modal.js ./resources/js/modals/reset_password.modal.js ./resources/js/modals/timeline_segment.modal.js ./resources/js/modals/user_feedback.modal.js ./resources/js/modals/user_profile.modal.js ./resources/js/modals/zero_commission_tip.modal.js ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\js\modals\close_contract.modal.js */"./resources/js/modals/close_contract.modal.js");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\js\modals\confirm_action.modal.js */"./resources/js/modals/confirm_action.modal.js");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\js\modals\contract.modal.js */"./resources/js/modals/contract.modal.js");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\js\modals\download_desktop_app_tip.modal.js */"./resources/js/modals/download_desktop_app_tip.modal.js");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\js\modals\interview_saved_tip.modal.js */"./resources/js/modals/interview_saved_tip.modal.js");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\js\modals\introduction.modal.js */"./resources/js/modals/introduction.modal.js");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\js\modals\login.modal.js */"./resources/js/modals/login.modal.js");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\js\modals\milestone.modal.js */"./resources/js/modals/milestone.modal.js");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\js\modals\not_optimized_for_mobile.modal.js */"./resources/js/modals/not_optimized_for_mobile.modal.js");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\js\modals\project_task.modal.js */"./resources/js/modals/project_task.modal.js");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\js\modals\registration.modal.js */"./resources/js/modals/registration.modal.js");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\js\modals\reset_password_completed.modal.js */"./resources/js/modals/reset_password_completed.modal.js");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\js\modals\reset_password_email_sent.modal.js */"./resources/js/modals/reset_password_email_sent.modal.js");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\js\modals\reset_password.modal.js */"./resources/js/modals/reset_password.modal.js");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\js\modals\timeline_segment.modal.js */"./resources/js/modals/timeline_segment.modal.js");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\js\modals\user_feedback.modal.js */"./resources/js/modals/user_feedback.modal.js");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\js\modals\user_profile.modal.js */"./resources/js/modals/user_profile.modal.js");
module.exports = __webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\js\modals\zero_commission_tip.modal.js */"./resources/js/modals/zero_commission_tip.modal.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL21vZGFscy9jbG9zZV9jb250cmFjdC5tb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvbW9kYWxzL2NvbmZpcm1fYWN0aW9uLm1vZGFsLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9tb2RhbHMvY29udHJhY3QubW9kYWwuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL21vZGFscy9kb3dubG9hZF9kZXNrdG9wX2FwcF90aXAubW9kYWwuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL21vZGFscy9pbnRlcnZpZXdfc2F2ZWRfdGlwLm1vZGFsLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9tb2RhbHMvaW50cm9kdWN0aW9uLm1vZGFsLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9tb2RhbHMvbG9naW4ubW9kYWwuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL21vZGFscy9taWxlc3RvbmUubW9kYWwuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL21vZGFscy9ub3Rfb3B0aW1pemVkX2Zvcl9tb2JpbGUubW9kYWwuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL21vZGFscy9wcm9qZWN0X3Rhc2subW9kYWwuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL21vZGFscy9yZWdpc3RyYXRpb24ubW9kYWwuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL21vZGFscy9yZXNldF9wYXNzd29yZC5tb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvbW9kYWxzL3Jlc2V0X3Bhc3N3b3JkX2NvbXBsZXRlZC5tb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvbW9kYWxzL3Jlc2V0X3Bhc3N3b3JkX2VtYWlsX3NlbnQubW9kYWwuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL21vZGFscy90aW1lbGluZV9zZWdtZW50Lm1vZGFsLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9tb2RhbHMvdXNlcl9mZWVkYmFjay5tb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvbW9kYWxzL3VzZXJfcHJvZmlsZS5tb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvbW9kYWxzL3plcm9fY29tbWlzc2lvbl90aXAubW9kYWwuanMiXSwibmFtZXMiOlsibW9kYWxzIiwiY2xvc2VfY29udHJhY3QiLCJvcHRpb25zIiwiY29udHJhY3QiLCJtb2RhbCIsIk1vZGFsIiwiY29udGVudCIsInRlbXBsYXRlIiwiJGVsZW1lbnQiLCJmaW5kIiwiY2xpY2siLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiJHNlbGYiLCIkIiwiYWRkQ2xhc3MiLCJyZXF1ZXN0IiwidXJsIiwiaWQiLCJkYXRhIiwic2VyaWFsaXplIiwicmVzcG9uc2UiLCJyZW1vdmVDbGFzcyIsImVycm9yIiwibm90aWZ5IiwiT2JqZWN0IiwiYXNzaWduIiwicmVuZGVyIiwicHJvcCIsImRhc2hib2FyZCIsInNlbGVjdGVkX3Byb2plY3QiLCJleGlzdGVudF9wcm9qZWN0X21lbWJlciIsIm1lbWJlcnMiLCJmaWx0ZXIiLCJjdXJyZW50X3Byb2plY3RfbWVtYmVyIiwidXNlcl9pZCIsImVtcGxveWVlX3VzZXJfaWQiLCJzcGxpY2UiLCJpbmRleE9mIiwicmVuZGVyTWVtYmVycyIsIndpbmRvdyIsImJvYXJkIiwiZ2V0Q29sdW1ucyIsImZvckVhY2giLCJib2FyZF9jb2x1bW4iLCJnZXRJdGVtcyIsImJvYXJkX2l0ZW0iLCJmb3VuZF90YXNrX21lbWJlciIsIm9iamVjdCIsInRhc2tfbWVtYmVyIiwiY2xvc2UiLCJjb25maXJtX2FjdGlvbiIsInF1ZXN0aW9uIiwiY29uZmlybSIsImVtcGxveWVlX3VzZXIiLCJjb250cmFjdF9jcmVhdGVkIiwiJHNhdmVfYnV0dG9uIiwiJGhvdXJseV9yYXRlX2lucHV0Iiwib24iLCJwYXJzZUZsb2F0IiwidmFsIiwiaG91cmx5X3JhdGUiLCJ0ZXh0IiwiX18iLCJzdWJtaXQiLCJtZXRob2QiLCJmb2N1cyIsImRvd25sb2FkX2Rlc2t0b3BfYXBwX3RpcF9tb2RhbCIsInVzZXJfdGlwX2NvbmZpcm1lZCIsImludGVydmlld19zYXZlZF90aXBfbW9kYWwiLCJpbnRyb2R1Y3Rpb24iLCJsb2dpbiIsIm5hbWUiLCJlbWFpbCIsInJlc2V0X3Bhc3N3b3JkIiwicmVnaXN0cmF0aW9uIiwiVmFsaWRhdG9yIiwiY2xlYXIiLCJmYWlscyIsImNvbnNvbGUiLCJsb2ciLCJyb290IiwiYXBpX3Rva2VuIiwicmVtZW1iZXJfbWUiLCJsb2NhdGlvbiIsImhyZWYiLCJyZWRpcmVjdF91cmwiLCJtaWxlc3RvbmUiLCJjdXJyZW50X21pbGVzdG9uZSIsIm1pbGVzdG9uZXMiLCJyZWxlYXNlZF9hdCIsIm1pbGVzdG9uZV9pbmRleCIsImxlbmd0aCIsInByZXZpb3VzX21pbGVzdG9uZSIsIkRhdGUiLCJub3ciLCJ0b1N0cmluZyIsIiRwcm9qZWN0X3NlbGVjdCIsInNlbGVjdGl6ZSIsInZhbHVlRmllbGQiLCJsYWJlbEZpZWxkIiwic2VhcmNoRmllbGQiLCJwbGFjZWhvbGRlciIsInNvcnRGaWVsZCIsImZpZWxkIiwiZGlyZWN0aW9uIiwiaXRlbSIsImVzY2FwZSIsIm9wdGlvbiIsIm9uSW5pdGlhbGl6ZSIsIiRjb250cm9sX2lucHV0IiwiYXR0ciIsImFkZE9wdGlvbiIsImF1dGgiLCJ1c2VyIiwicHJvamVjdHMiLCJwcm9qZWN0IiwicGl2b3QiLCJyb2xlIiwibWFwIiwicHJvamVjdF9pbmRleCIsImluZGV4IiwicHJldmlvdXNfbWlsZXN0b25lX3Byb2plY3QiLCJhZGRJdGVtIiwicHJvamVjdF9pZCIsInBheW1lbnRfaWQiLCJkaXNhYmxlIiwidXBkYXRlZCIsImNyZWF0ZWQiLCJub3Rfb3B0aW1pemVkX2Zvcl9tb2JpbGUiLCJwcm9qZWN0X3Rhc2siLCJFcnJvciIsIiR0aXRsZV90ZXh0YXJlYSIsIiRkZXNjcmlwdGlvbiIsIiRkZXNjcmlwdGlvbl90ZXh0YXJlYSIsIiRkZXNjcmlwdGlvbl9zYXZlX2J1dHRvbiIsIiRkZXNjcmlwdGlvbl9jbG9zZV9idXR0b24iLCJvcHRpbWl6ZV90aXRsZV90ZXh0YXJlYSIsImNzcyIsImhlaWdodCIsInNjcm9sbEhlaWdodCIsInBhcnNlSW50Iiwia2V5cHJlc3MiLCJ3aGljaCIsImJsdXIiLCJrZXlkb3duIiwia2V5Iiwic3RvcFByb3BhZ2F0aW9uIiwidGl0bGUiLCIkY2xvc2VfYnV0dG9uIiwicmVuZGVyVGl0bGUiLCJvcHRpbWl6ZV9kZXNjcmlwdGlvbl90ZXh0YXJlYSIsImRlc2NyaXB0aW9uIiwiaGFzQ2xhc3MiLCJ0YXJnZXQiLCJpcyIsInNldFRpbWVvdXQiLCJpbml0aWFsaXplX3JlZ2lzdHJhdGlvbl9mb3JtIiwiJGZvcm0iLCIkdXNlcl9lbWFpbF9pbnB1dCIsIiR1c2VyX3NsdWdfaW5wdXQiLCIkdXNlcl9sb2NhbGl0eV9pbnB1dCIsIiR1c2VyX2xhdGl0dWRlX2lucHV0IiwiJHVzZXJfbG9uZ2l0dWRlX2lucHV0IiwiJHVzZXJfc2x1Z19ibG9jayIsInJlZ2lzdGVyIiwidGltZW91dCIsImNsZWFyVGltZW91dCIsInhociIsImFib3J0Iiwic2x1ZyIsImxvY2FsaXR5X2lkIiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJyZWZlcnJlcl91c2VyX2lkIiwic3VnZ2VzdF91c2VyX3NsdWciLCJqdXN0X3ZhbGlkYXRlIiwidG9nZ2xlQ2xhc3MiLCJzdWdnZXN0ZWRfdXNlcl9zbHVnIiwiaW5jb21wbGV0ZV9lbWFpbF9pc192YWxpZCIsInZhbGlkYXRpb25fbWVzc2FnZXMiLCJzb21lIiwibWF0Y2giLCJjb21wbGV0ZV9lbWFpbF9pc192YWxpZCIsImVtYWlsX2lzX2F2YWlsYWJsZSIsInNsdWdfaXNfYXZhaWxhYmxlIiwic2x1Z19pc192YWxpZCIsInBhcmVudCIsInNsdWdfc3VjY2VzcyIsInNpYmxpbmdzIiwic2V0X2lucHV0X2NhcnJldF9hdF9lbmQiLCJlbGVtZW50IiwiZG9jdW1lbnQiLCJzZWxlY3Rpb24iLCJzZWxlY3Rpb25fcmFuZ2UiLCJjcmVhdGVSYW5nZSIsIm1vdmVTdGFydCIsInZhbHVlIiwibW92ZUVuZCIsInNlbGVjdCIsInNlbGVjdGlvblN0YXJ0Iiwic2VsZWN0aW9uRW5kIiwibm90IiwicmVzZXRfcGFzc3dvcmRfZW1haWxfc2VudCIsInJlc2V0X3Bhc3N3b3JkX2NvbXBsZXRlZCIsInRpbWVsaW5lX3NlZ21lbnQiLCJzZWdtZW50cyIsImN1cnJlbnRfc2VnbWVudCIsInNlZ21lbnQiLCIkcHJldl9idXR0b24iLCIkbmV4dF9idXR0b24iLCIkaGVhZGVyIiwiJGltYWdlX2NvbnRhaW5lciIsIiRpbWFnZSIsIiRjdXJyZW50X3NjcmVlbnNob3QiLCIkbm9fc2NyZWVuc2hvdCIsInVwZGF0ZV9jb250ZW50IiwiY3VycmVudF9zZWdtZW50X2luZGV4IiwibW9tZW50IiwiY3JlYXRlZF9hdCIsImZvcm1hdCIsImpvaW4iLCJzY3JlZW5zaG90IiwidXJscyIsIm9yaWdpbmFsIiwidXNlcl9mZWVkYmFjayIsInJlbW92ZURhdGEiLCIkdGhpc19idXR0b24iLCJ1c2VyX3Byb2ZpbGUiLCJjYWxsYmFjayIsInBvc2l0aW9uIiwiemVyb19jb21taXNzaW9uX3RpcF9tb2RhbCJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNB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LEtBVGEsQ0FBZDtBQVVBLEdBZkQsRUFlRyxVQUFTK0YsSUFBVCxFQUFlO0FBQ2pCLFFBQUk5RyxLQUFLLEdBQUcsSUFBSUMsS0FBSixDQUFVO0FBQ3JCaU8sY0FBUSxFQUFFLE9BRFc7QUFHckJoTyxhQUFPLEVBQUVDLFFBQVEsQ0FBQyxvQkFBRCxFQUF1QjtBQUN2QzJHLFlBQUksRUFBRUE7QUFEaUMsT0FBdkI7QUFISSxLQUFWLENBQVo7QUFPQSxHQXZCRDtBQXdCQSxDQS9CRCxDOzs7Ozs7Ozs7OztBQ05BbEgsTUFBTSxDQUFDdU8seUJBQVAsR0FBbUMsVUFBU3JPLE9BQVQsRUFBa0I7QUFDcERBLFNBQU8sR0FBR0EsT0FBTyxJQUFJLEVBQXJCO0FBRUEsTUFBSUUsS0FBSyxHQUFHLElBQUlDLEtBQUosQ0FBVTtBQUNyQkMsV0FBTyxFQUFFQyxRQUFRLENBQUMsMkJBQUQ7QUFESSxHQUFWLENBQVo7QUFJQUgsT0FBSyxDQUFDSSxRQUFOLENBQWVDLElBQWYsQ0FBb0Isd0JBQXBCLEVBQThDQyxLQUE5QyxDQUFvRCxVQUFTQyxLQUFULEVBQWdCO0FBQ25FQSxTQUFLLENBQUNDLGNBQU47QUFDQUUsS0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRQyxRQUFSLENBQWlCLFNBQWpCO0FBQ01xRCxzQkFBa0IsQ0FBQyxpQkFBRCxDQUFsQjtBQUNBaEUsU0FBSyxDQUFDOEMsS0FBTjtBQUNOLEdBTEQ7QUFNQSxDQWJELEMiLCJmaWxlIjoiL2pzL21vZGFscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gOSk7XG4iLCJtb2RhbHMuY2xvc2VfY29udHJhY3QgPSBmdW5jdGlvbihvcHRpb25zKSB7XHJcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblx0dmFyIGNvbnRyYWN0ID0gb3B0aW9ucy5jb250cmFjdDtcclxuXHJcblx0dmFyIG1vZGFsID0gbmV3IE1vZGFsKHtcclxuXHRcdGNvbnRlbnQ6IHRlbXBsYXRlKCdjbG9zZS1jb250cmFjdC1tb2RhbCcsIHtcclxuXHRcdFx0Y29udHJhY3Q6IGNvbnRyYWN0LFxyXG5cdFx0fSksXHJcblx0fSk7XHJcblxyXG5cdG1vZGFsLiRlbGVtZW50LmZpbmQoJy5tb2RhbF9fY29uZmlybS1idXR0b24nKS5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdHZhciAkc2VsZiA9ICQodGhpcyk7XHJcblx0XHQkc2VsZi5hZGRDbGFzcygnaXMtbG9hZGluZycpO1xyXG5cclxuXHRcdHJlcXVlc3Qoe1xyXG5cdFx0XHR1cmw6ICcvY29udHJhY3RzLycgKyBjb250cmFjdC5pZCArICcvY2xvc2UnLFxyXG5cdFx0XHRkYXRhOiBtb2RhbC4kZWxlbWVudC5zZXJpYWxpemUoKSxcclxuXHRcdH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcblx0XHRcdCRzZWxmLnJlbW92ZUNsYXNzKCdpcy1sb2FkaW5nJyk7XHJcblxyXG5cdFx0XHRpZiAocmVzcG9uc2UuZXJyb3IpIHtcclxuXHRcdFx0XHQkLm5vdGlmeShyZXNwb25zZS5lcnJvciwgJ2Vycm9yJyk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRPYmplY3QuYXNzaWduKGNvbnRyYWN0LCByZXNwb25zZS5kYXRhKTtcclxuXHRcdFx0Y29udHJhY3QucmVuZGVyICYmIGNvbnRyYWN0LnJlbmRlcigpO1xyXG5cclxuXHRcdFx0aWYgKG1vZGFsLiRlbGVtZW50LmZpbmQoJyNtb2RhbF9fcmVtb3ZlLWZyb20tYWxsLXByb2plY3RzLWNoZWNrYm94JykucHJvcCgnY2hlY2tlZCcpKSB7XHJcblx0XHRcdFx0aWYgKGRhc2hib2FyZC5zZWxlY3RlZF9wcm9qZWN0KSB7XHJcblx0XHRcdFx0XHR2YXIgZXhpc3RlbnRfcHJvamVjdF9tZW1iZXIgPSBkYXNoYm9hcmQuc2VsZWN0ZWRfcHJvamVjdC5tZW1iZXJzLmZpbHRlcihmdW5jdGlvbihjdXJyZW50X3Byb2plY3RfbWVtYmVyKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBjdXJyZW50X3Byb2plY3RfbWVtYmVyLnVzZXJfaWQgPT09IGNvbnRyYWN0LmVtcGxveWVlX3VzZXJfaWQ7XHJcblx0XHRcdFx0XHR9KVswXSB8fCBudWxsO1xyXG5cclxuXHRcdFx0XHRcdGlmIChleGlzdGVudF9wcm9qZWN0X21lbWJlcikge1xyXG5cdFx0XHRcdFx0XHRkYXNoYm9hcmQuc2VsZWN0ZWRfcHJvamVjdC5tZW1iZXJzLnNwbGljZShkYXNoYm9hcmQuc2VsZWN0ZWRfcHJvamVjdC5tZW1iZXJzLmluZGV4T2YoZXhpc3RlbnRfcHJvamVjdF9tZW1iZXIpLCAxKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRkYXNoYm9hcmQuc2VsZWN0ZWRfcHJvamVjdC5yZW5kZXJNZW1iZXJzKCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR3aW5kb3cuYm9hcmQgJiYgd2luZG93LmJvYXJkLmdldENvbHVtbnMoKS5mb3JFYWNoKGZ1bmN0aW9uKGJvYXJkX2NvbHVtbikge1xyXG5cdFx0XHRcdFx0Ym9hcmRfY29sdW1uLmdldEl0ZW1zKCkuZm9yRWFjaChmdW5jdGlvbihib2FyZF9pdGVtKSB7XHJcblx0XHRcdFx0XHRcdHZhciBmb3VuZF90YXNrX21lbWJlciA9IGJvYXJkX2l0ZW0ub2JqZWN0Lm1lbWJlcnMuZmlsdGVyKGZ1bmN0aW9uKHRhc2tfbWVtYmVyKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRhc2tfbWVtYmVyLnVzZXJfaWQgPT09IGNvbnRyYWN0LmVtcGxveWVlX3VzZXJfaWQ7XHJcblx0XHRcdFx0XHRcdH0pWzBdIHx8IG51bGw7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoIWZvdW5kX3Rhc2tfbWVtYmVyKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRib2FyZF9pdGVtLm9iamVjdC5tZW1iZXJzLnNwbGljZShib2FyZF9pdGVtLm9iamVjdC5tZW1iZXJzLmluZGV4T2YoZm91bmRfdGFza19tZW1iZXIpLCAxKTtcclxuXHRcdFx0XHRcdFx0Ym9hcmRfaXRlbS5yZW5kZXJNZW1iZXJzKCk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bW9kYWwuY2xvc2UoKTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59O1xyXG4iLCJtb2RhbHMuY29uZmlybV9hY3Rpb24gPSBmdW5jdGlvbihvcHRpb25zKSB7XHJcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblxyXG5cdHZhciBtb2RhbCA9IG5ldyBNb2RhbCh7XHJcblx0XHRjb250ZW50OiB0ZW1wbGF0ZSgnY29uZmlybS1hY3Rpb24tbW9kYWwnLCB7XHJcblx0XHRcdHF1ZXN0aW9uOiBvcHRpb25zLnF1ZXN0aW9uLFxyXG5cdFx0fSksXHJcblx0fSk7XHJcblxyXG5cdG1vZGFsLiRlbGVtZW50LmZpbmQoJy5tb2RhbF9fY29uZmlybS1idXR0b24nKS5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdCQodGhpcykuYWRkQ2xhc3MoJ2lzLWxvYWRpbmcnKTtcclxuXHJcblx0XHRpZiAob3B0aW9ucy5jb25maXJtKSB7XHJcblx0XHRcdG9wdGlvbnMuY29uZmlybShmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRtb2RhbC5jbG9zZSgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdG1vZGFsLmNsb3NlKCk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn07IiwibW9kYWxzLmNvbnRyYWN0ID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cdHZhciBjb250cmFjdCA9IG9wdGlvbnMuY29udHJhY3QgfHwgbnVsbDtcclxuXHR2YXIgZW1wbG95ZWVfdXNlciA9IG9wdGlvbnMuZW1wbG95ZWVfdXNlciB8fCBjb250cmFjdC5lbXBsb3llZV91c2VyIHx8IG51bGw7XHJcblx0dmFyIGNvbnRyYWN0X2NyZWF0ZWQgPSBvcHRpb25zLmNvbnRyYWN0X2NyZWF0ZWQgfHwgbnVsbDtcclxuXHJcblx0dmFyIG1vZGFsID0gbmV3IE1vZGFsKHtcclxuXHRcdGNvbnRlbnQ6IHRlbXBsYXRlKCdjb250cmFjdC1tb2RhbCcsIHtcclxuXHRcdFx0Y29udHJhY3Q6IGNvbnRyYWN0LFxyXG5cdFx0XHRlbXBsb3llZV91c2VyOiBlbXBsb3llZV91c2VyLFxyXG5cdFx0fSksXHJcblx0fSk7XHJcblxyXG5cdHZhciAkc2F2ZV9idXR0b24gPSBtb2RhbC4kZWxlbWVudC5maW5kKCcubW9kYWxfX3NhdmUtYnV0dG9uJyk7XHJcblx0dmFyICRob3VybHlfcmF0ZV9pbnB1dCA9IG1vZGFsLiRlbGVtZW50LmZpbmQoJ1tuYW1lPVwiY29udHJhY3RbaG91cmx5X3JhdGVdXCJdJyk7XHJcblxyXG5cdCRob3VybHlfcmF0ZV9pbnB1dC5vbignaW5wdXQnLCBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRpZiAoY29udHJhY3QpIHtcclxuXHRcdFx0aWYgKHBhcnNlRmxvYXQoJGhvdXJseV9yYXRlX2lucHV0LnZhbCgpKSA9PSBjb250cmFjdC5ob3VybHlfcmF0ZSkge1xyXG5cdFx0XHRcdCRzYXZlX2J1dHRvbi50ZXh0KF9fKCdtb2RhbHMuY29udHJhY3Quc2F2ZScpKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkc2F2ZV9idXR0b24udGV4dChfXygnbW9kYWxzLmNvbnRyYWN0LnJlY3JlYXRlX2FfbmV3X2NvbnRyYWN0JykpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdG1vZGFsLiRlbGVtZW50LnN1Ym1pdChmdW5jdGlvbihldmVudCkge1xyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdCRzYXZlX2J1dHRvbi5hZGRDbGFzcygnaXMtbG9hZGluZycpO1xyXG5cclxuXHRcdHJlcXVlc3Qoe1xyXG5cdFx0XHRtZXRob2Q6ICdQT1NUJyxcclxuXHJcblx0XHRcdHVybDogKGNvbnRyYWN0ICYmIGNvbnRyYWN0LmhvdXJseV9yYXRlID09IHBhcnNlRmxvYXQoJGhvdXJseV9yYXRlX2lucHV0LnZhbCgpKVxyXG5cdFx0XHRcdD8gJy9jb250cmFjdHMvJyArIGNvbnRyYWN0LmlkICsgJy91cGRhdGUnXHJcblx0XHRcdFx0OiAnL3VzZXJzLycgKyBlbXBsb3llZV91c2VyLmlkICsgJy9vcGVuX2NvbnRyYWN0P3JlY3JlYXRlPXRydWUnXHJcblx0XHRcdCksXHJcblxyXG5cdFx0XHRkYXRhOiBtb2RhbC4kZWxlbWVudC5zZXJpYWxpemUoKSxcclxuXHRcdH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcblx0XHRcdCRzYXZlX2J1dHRvbi5yZW1vdmVDbGFzcygnaXMtbG9hZGluZycpO1xyXG5cclxuXHRcdFx0aWYgKHJlc3BvbnNlLmVycm9yKSB7XHJcblx0XHRcdFx0JC5ub3RpZnkocmVzcG9uc2UuZXJyb3IsICdlcnJvcicpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGNvbnRyYWN0ICYmIGNvbnRyYWN0LmlkID09IHJlc3BvbnNlLmRhdGEuaWQpIHtcclxuXHRcdFx0XHRPYmplY3QuYXNzaWduKGNvbnRyYWN0LCByZXNwb25zZS5kYXRhKTtcclxuXHRcdFx0XHRjb250cmFjdC5yZW5kZXIoKTtcclxuXHRcdFx0XHQkLm5vdGlmeShfXygnbW9kYWxzLmNvbnRyYWN0LmNvbnRyYWN0X3VwZGF0ZWQnKSwgJ3N1Y2Nlc3MnKTtcclxuXHRcdFx0XHRtb2RhbC5jbG9zZSgpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y29udHJhY3RfY3JlYXRlZCAmJiBjb250cmFjdF9jcmVhdGVkKHJlc3BvbnNlLmRhdGEpO1xyXG5cdFx0XHQkLm5vdGlmeShfXygnbW9kYWxzLmNvbnRyYWN0LmNvbnRyYWN0X2NyZWF0ZWQnKSwgJ3N1Y2Nlc3MnKTtcclxuXHRcdFx0bW9kYWwuY2xvc2UoKTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHRtb2RhbC4kZWxlbWVudC5vbignc2hvd24uYnMubW9kYWwnLCBmdW5jdGlvbigpIHtcclxuXHRcdG1vZGFsLiRlbGVtZW50LmZpbmQoJ2lucHV0W3ZhbHVlPVwiXCJdOmZpcnN0JykuZm9jdXMoKTtcclxuXHR9KTtcclxufTtcclxuIiwibW9kYWxzLmRvd25sb2FkX2Rlc2t0b3BfYXBwX3RpcF9tb2RhbCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHJcblx0dmFyIG1vZGFsID0gbmV3IE1vZGFsKHtcclxuXHRcdGNvbnRlbnQ6IHRlbXBsYXRlKCdkb3dubG9hZC1kZXNrdG9wLWFwcC10aXAtbW9kYWwnLCB7XHJcblx0XHRcdHF1ZXN0aW9uOiBvcHRpb25zLnF1ZXN0aW9uLFxyXG5cdFx0fSksXHJcblx0fSk7XHJcblxyXG5cdG1vZGFsLiRlbGVtZW50LmZpbmQoJy5tb2RhbF9fY29uZmlybS1idXR0b24nKS5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnbG9hZGluZycpO1xyXG4gICAgICAgIHVzZXJfdGlwX2NvbmZpcm1lZCgnZG93bmxvYWRfZGVza3RvcF9hcHAnKTtcclxuICAgICAgICBtb2RhbC5jbG9zZSgpO1xyXG5cdH0pO1xyXG59OyIsIm1vZGFscy5pbnRlcnZpZXdfc2F2ZWRfdGlwX21vZGFsID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cclxuXHR2YXIgbW9kYWwgPSBuZXcgTW9kYWwoe1xyXG5cdFx0Y29udGVudDogdGVtcGxhdGUoJ2ludGVydmlldy1zYXZlZC10aXAtbW9kYWwnLCB7XHJcblx0XHRcdHF1ZXN0aW9uOiBvcHRpb25zLnF1ZXN0aW9uLFxyXG5cdFx0fSksXHJcblx0fSk7XHJcblxyXG5cdG1vZGFsLiRlbGVtZW50LmZpbmQoJy5tb2RhbF9fY29uZmlybS1idXR0b24nKS5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnbG9hZGluZycpO1xyXG4gICAgICAgIHVzZXJfdGlwX2NvbmZpcm1lZCgnaW50ZXJ2aWV3X3NhdmVkJyk7XHJcbiAgICAgICAgbW9kYWwuY2xvc2UoKTtcclxuXHR9KTtcclxufTsiLCJtb2RhbHMuaW50cm9kdWN0aW9uID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cdFxyXG5cdHZhciBtb2RhbCA9IG5ldyBNb2RhbCh7XHJcblx0XHRjb250ZW50OiB0ZW1wbGF0ZSgnaW50cm9kdWN0aW9uLW1vZGFsJywge30pLFxyXG5cdH0pO1xyXG59OyIsIm1vZGFscy5sb2dpbiA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHJcblx0dmFyIG1vZGFsID0gbmV3IE1vZGFsKHtcclxuXHRcdG5hbWU6ICdsb2dpbicsXHJcblxyXG5cdFx0Y29udGVudDogdGVtcGxhdGUoJ2xvZ2luLW1vZGFsJywge1xyXG5cdFx0XHRlbWFpbDogb3B0aW9ucy5lbWFpbCB8fCBudWxsLFxyXG5cdFx0fSksXHJcblx0fSk7XHJcblxyXG5cdG1vZGFsLiRlbGVtZW50Lm9uKCdzaG93bi5icy5tb2RhbCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0bW9kYWwuJGVsZW1lbnQuZmluZCgnaW5wdXRbdmFsdWU9XCJcIl06Zmlyc3QnKS5mb2N1cygpO1xyXG5cdH0pO1xyXG5cdFxyXG5cdG1vZGFsLiRlbGVtZW50LmZpbmQoJy5tb2RhbF9fZm9yZ290LXBhc3N3b3JkLWxpbmsnKS5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdG1vZGFsLmNsb3NlKCk7XHJcblxyXG5cdFx0bW9kYWxzLnJlc2V0X3Bhc3N3b3JkKHtcclxuXHRcdFx0ZW1haWw6IG1vZGFsLiRlbGVtZW50LmZpbmQoJ1tuYW1lPVwidXNlcltlbWFpbF1cIl0nKS52YWwoKSxcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHRtb2RhbC4kZWxlbWVudC5maW5kKCcubW9kYWxfX2NyZWF0ZS1uZXctYWNjb3VudCcpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0bW9kYWwuY2xvc2UoKTtcclxuXHJcblx0XHRtb2RhbHMucmVnaXN0cmF0aW9uKHtcclxuXHRcdFx0ZW1haWw6IG1vZGFsLiRlbGVtZW50LmZpbmQoJ1tuYW1lPVwidXNlcltlbWFpbF1cIl0nKS52YWwoKSxcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHRtb2RhbC4kZWxlbWVudC5zdWJtaXQoZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRWYWxpZGF0b3IuY2xlYXIobW9kYWwuJGVsZW1lbnQpO1xyXG5cdFx0bW9kYWwuJGVsZW1lbnQuZmluZCgnLm1vZGFsX193cm9uZy1lbWFpbC1vci1wYXNzd29yZC10ZXh0JykucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcclxuXHJcblx0XHRyZXF1ZXN0KHtcclxuXHRcdFx0dXJsOiAnL2xvZ2luJyxcclxuXHRcdFx0ZGF0YTogbW9kYWwuJGVsZW1lbnQuc2VyaWFsaXplKCksXHJcblx0XHRcdG1ldGhvZDogJ1BPU1QnLFxyXG5cdFx0fSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuXHRcdFx0aWYgKG5ldyBWYWxpZGF0b3IobW9kYWwuJGVsZW1lbnQsIHJlc3BvbnNlKS5mYWlscygpKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAocmVzcG9uc2UuZXJyb3IgPT0gJ1dyb25nVXNlckNyZWRlbnRpYWxzJykge1xyXG5cdFx0XHRcdG1vZGFsLiRlbGVtZW50LmZpbmQoJy5tb2RhbF9fd3JvbmctZW1haWwtb3ItcGFzc3dvcmQtdGV4dCcpLmFkZENsYXNzKCdzaG93Jyk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAocmVzcG9uc2UuZXJyb3IpIHtcclxuXHRcdFx0XHQkLm5vdGlmeShyZXNwb25zZS5lcnJvciwgJ2Vycm9yJyk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5kYXRhKTtcclxuXHJcblx0XHRcdHJlcXVlc3Qoe1xyXG5cdFx0XHRcdHJvb3Q6ICcnLFxyXG5cdFx0XHRcdHVybDogJy9sb2dpbl91c2luZ19hcGlfdG9rZW4nLFxyXG5cdFx0XHRcdG1ldGhvZDogJ1BPU1QnLFxyXG5cclxuXHRcdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0XHR1c2VyX2lkOiByZXNwb25zZS5kYXRhLmlkLFxyXG5cdFx0XHRcdFx0YXBpX3Rva2VuOiByZXNwb25zZS5kYXRhLmFwaV90b2tlbixcclxuXHRcdFx0XHRcdHJlbWVtYmVyX21lOiAxLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcblx0XHRcdFx0aWYgKHJlc3BvbnNlLmVycm9yKSB7XHJcblx0XHRcdFx0XHQkLm5vdGlmeShyZXNwb25zZS5lcnJvciwgJ2Vycm9yJyk7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlc3BvbnNlLmRhdGEucmVkaXJlY3RfdXJsO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxufTsiLCJtb2RhbHMubWlsZXN0b25lID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cdHZhciBjb250cmFjdCA9IG9wdGlvbnMuY29udHJhY3Q7XHJcblxyXG5cdHZhciBjdXJyZW50X21pbGVzdG9uZSA9IGNvbnRyYWN0Lm1pbGVzdG9uZXMuZmlsdGVyKGZ1bmN0aW9uKG1pbGVzdG9uZSkge1xyXG5cdFx0cmV0dXJuICFtaWxlc3RvbmUucmVsZWFzZWRfYXQ7XHJcblx0fSlbMF0gfHwgbnVsbDtcclxuXHJcblx0dmFyIG1pbGVzdG9uZSA9IG9wdGlvbnMubWlsZXN0b25lO1xyXG5cdHZhciBtaWxlc3RvbmVfaW5kZXggPSBtaWxlc3RvbmUgPyBjb250cmFjdC5taWxlc3RvbmVzLmluZGV4T2YobWlsZXN0b25lKSA6IGNvbnRyYWN0Lm1pbGVzdG9uZXMubGVuZ3RoO1xyXG5cdHZhciBwcmV2aW91c19taWxlc3RvbmUgPSAobWlsZXN0b25lX2luZGV4ID4gMCA/IGNvbnRyYWN0Lm1pbGVzdG9uZXNbbWlsZXN0b25lX2luZGV4IC0gMV0gOiBudWxsKTtcclxuXHJcblx0dmFyIG1vZGFsID0gbmV3IE1vZGFsKHtcclxuXHRcdGNvbnRlbnQ6IHRlbXBsYXRlKCdtaWxlc3RvbmUtbW9kYWwnLCB7XHJcblx0XHRcdGlkOiBEYXRlLm5vdygpLnRvU3RyaW5nKDM2KSxcclxuXHRcdFx0Y29udHJhY3Q6IGNvbnRyYWN0LFxyXG5cdFx0XHRtaWxlc3RvbmU6IG1pbGVzdG9uZSxcclxuXHRcdFx0Y3VycmVudF9taWxlc3RvbmU6IGN1cnJlbnRfbWlsZXN0b25lLFxyXG5cdFx0XHRtaWxlc3RvbmVfaW5kZXg6IG1pbGVzdG9uZV9pbmRleCxcclxuXHRcdH0pLFxyXG5cdH0pO1xyXG5cclxuXHR2YXIgJHNhdmVfYnV0dG9uID0gbW9kYWwuJGVsZW1lbnQuZmluZCgnYnV0dG9uW3R5cGU9XCJzdWJtaXRcIl0nKTtcclxuXHR2YXIgJHByb2plY3Rfc2VsZWN0ID0gbW9kYWwuJGVsZW1lbnQuZmluZCgnc2VsZWN0W25hbWU9XCJtaWxlc3RvbmVbcHJvamVjdF9pZF1cIl0nKTtcclxuXHJcblx0JHByb2plY3Rfc2VsZWN0LnJlbW92ZUNsYXNzKCdjdXN0b20tc2VsZWN0Jykuc2VsZWN0aXplKHtcclxuXHRcdHZhbHVlRmllbGQ6ICdpZCcsXHJcblx0XHRsYWJlbEZpZWxkOiAnbmFtZScsXHJcblx0XHRzZWFyY2hGaWVsZDogWyAnbmFtZScgXSxcclxuXHRcdHBsYWNlaG9sZGVyOiAnU2VsZWN0IFByb2plY3QnLFxyXG5cdFx0c29ydEZpZWxkOiBbeyBmaWVsZDogJ2luZGV4JywgZGlyZWN0aW9uOiAnYXNjJyB9XSxcclxuXHJcblx0XHRyZW5kZXI6IHtcclxuXHRcdFx0aXRlbTogZnVuY3Rpb24oaXRlbSwgZXNjYXBlKSB7XHJcblx0XHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwic2VsZWN0aXplLWl0ZW0gKyBpcy1wcm9qZWN0XCI+JyArXHJcblx0XHRcdFx0XHRcdCc8c3BhbiBjbGFzcz1cInNlbGVjdGl6ZS1pdGVtX19uYW1lXCI+JyArIGVzY2FwZShpdGVtLm5hbWUpICsgJzwvc3Bhbj4nICtcclxuXHRcdFx0XHRcdCc8L2Rpdj4nXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdG9wdGlvbjogZnVuY3Rpb24oaXRlbSwgZXNjYXBlKSB7XHJcblx0XHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwic2VsZWN0aXplLWl0ZW0gKyBpcy1wcm9qZWN0XCI+JyArXHJcblx0XHRcdFx0XHRcdCc8c3BhbiBjbGFzcz1cInNlbGVjdGl6ZS1pdGVtX19uYW1lXCI+JyArIGVzY2FwZShpdGVtLm5hbWUpICsgJzwvc3Bhbj4nICtcclxuXHRcdFx0XHRcdCc8L2Rpdj4nXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fSxcclxuXHRcdH0sXHJcblxyXG5cdFx0b25Jbml0aWFsaXplOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIHNlbGVjdGl6ZSA9IHRoaXM7XHJcblx0XHRcdHNlbGVjdGl6ZS4kY29udHJvbF9pbnB1dC5hdHRyKCdhdXRvY29tcGxldGUnLCAnc3QtZGlzYWJsZWQnKTtcclxuXHJcblx0XHRcdHNlbGVjdGl6ZS5hZGRPcHRpb24oYXV0aC51c2VyLnByb2plY3RzLmZpbHRlcihmdW5jdGlvbihwcm9qZWN0KSB7XHJcblx0XHRcdFx0cmV0dXJuIHByb2plY3QucGl2b3Qucm9sZSA9PSAnT1dORVInO1xyXG5cdFx0XHR9KS5tYXAoZnVuY3Rpb24ocHJvamVjdCwgcHJvamVjdF9pbmRleCkge1xyXG5cdFx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBwcm9qZWN0LCB7XHJcblx0XHRcdFx0XHRpbmRleDogcHJvamVjdF9pbmRleCxcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSkpO1xyXG5cclxuXHRcdFx0dmFyIHByZXZpb3VzX21pbGVzdG9uZV9wcm9qZWN0ID0gcHJldmlvdXNfbWlsZXN0b25lICYmIGF1dGgudXNlci5wcm9qZWN0cy5maWx0ZXIoZnVuY3Rpb24ocHJvamVjdCkge1xyXG5cdFx0XHRcdHJldHVybiBwcm9qZWN0LmlkID09IHByZXZpb3VzX21pbGVzdG9uZS5pZDtcclxuXHRcdFx0fSlbMF0gfHwgbnVsbDtcclxuXHJcblx0XHRcdGlmIChtaWxlc3RvbmUpIHtcclxuXHRcdFx0XHRzZWxlY3RpemUuYWRkSXRlbShtaWxlc3RvbmUucHJvamVjdF9pZCk7XHJcblx0XHRcdH0gZWxzZSBpZiAocHJldmlvdXNfbWlsZXN0b25lX3Byb2plY3QpIHtcclxuXHRcdFx0XHRzZWxlY3RpemUuYWRkSXRlbShwcmV2aW91c19taWxlc3RvbmVfcHJvamVjdC5pZCk7XHJcblx0XHRcdH0gZWxzZSBpZiAoZGFzaGJvYXJkLnNlbGVjdGVkX3Byb2plY3QpIHtcclxuXHRcdFx0XHRzZWxlY3RpemUuYWRkSXRlbShkYXNoYm9hcmQuc2VsZWN0ZWRfcHJvamVjdC5pZCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0c2VsZWN0aXplLmFkZEl0ZW0oYXV0aC51c2VyLnByb2plY3RzWzBdLmlkKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0KG1pbGVzdG9uZSAmJiBtaWxlc3RvbmUucGF5bWVudF9pZCkgJiYgc2VsZWN0aXplLmRpc2FibGUoKTtcclxuXHRcdH0sXHJcblx0fSk7XHJcblxyXG5cdG1vZGFsLiRlbGVtZW50LnN1Ym1pdChmdW5jdGlvbihldmVudCkge1xyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdCRzYXZlX2J1dHRvbi5hZGRDbGFzcygnaXMtbG9hZGluZycpO1xyXG5cclxuXHRcdHJlcXVlc3Qoe1xyXG5cdFx0XHRtZXRob2Q6ICdQT1NUJyxcclxuXHRcdFx0XHJcblx0XHRcdHVybDogKFxyXG5cdFx0XHRcdG1pbGVzdG9uZVxyXG5cdFx0XHRcdD8gJy9taWxlc3RvbmVzLycgKyBtaWxlc3RvbmUuaWQgKyAnL3VwZGF0ZSdcclxuXHRcdFx0XHQ6ICcvY29udHJhY3RzLycgKyBjb250cmFjdC5pZCArICcvbWlsZXN0b25lcy9jcmVhdGUnXHJcblx0XHRcdCksXHJcblxyXG5cdFx0XHRkYXRhOiBtb2RhbC4kZWxlbWVudC5zZXJpYWxpemUoKSxcclxuXHRcdH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcblx0XHRcdCRzYXZlX2J1dHRvbi5yZW1vdmVDbGFzcygnaXMtbG9hZGluZycpO1xyXG5cclxuXHRcdFx0aWYgKG5ldyBWYWxpZGF0b3IobW9kYWwuJGVsZW1lbnQsIHJlc3BvbnNlKS5mYWlscygpKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAocmVzcG9uc2UuZXJyb3IpIHtcclxuXHRcdFx0XHQkLm5vdGlmeShyZXNwb25zZS5lcnJvcik7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAobWlsZXN0b25lKSB7XHJcblx0XHRcdFx0b3B0aW9ucy51cGRhdGVkICYmIG9wdGlvbnMudXBkYXRlZChyZXNwb25zZS5kYXRhKTtcclxuXHRcdFx0XHQkLm5vdGlmeSgnTWlsZXN0b25lIHNhdmVkIScsICdzdWNjZXNzJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkICYmIG9wdGlvbnMuY3JlYXRlZChyZXNwb25zZS5kYXRhKTtcclxuXHRcdFx0XHQkLm5vdGlmeSgnTWlsZXN0b25lIGNyZWF0ZWQhJywgJ3N1Y2Nlc3MnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bW9kYWwuY2xvc2UoKTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHRtb2RhbC4kZWxlbWVudC5vbignc2hvd24uYnMubW9kYWwnLCBmdW5jdGlvbigpIHtcclxuXHRcdG1vZGFsLiRlbGVtZW50LmZpbmQoJ2lucHV0W3ZhbHVlPVwiXCJdOmZpcnN0JykuZm9jdXMoKTtcclxuXHR9KTtcclxufTsiLCJtb2RhbHMubm90X29wdGltaXplZF9mb3JfbW9iaWxlID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cdFxyXG5cdHZhciBtb2RhbCA9IG5ldyBNb2RhbCh7XHJcblx0XHRjb250ZW50OiB0ZW1wbGF0ZSgnbm90LW9wdGltaXplZC1mb3ItbW9iaWxlLW1vZGFsJywge30pLFxyXG5cdH0pO1xyXG59OyIsIm1vZGFscy5wcm9qZWN0X3Rhc2sgPSBmdW5jdGlvbihvcHRpb25zKSB7XHJcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblxyXG5cdGlmICghb3B0aW9ucy5wcm9qZWN0X3Rhc2spIHtcclxuXHRcdHRocm93IG5ldyBFcnJvcignYHByb2plY3RfdGFza2Agb3B0aW9uIHJlcXVpcmVkJyk7XHJcblx0fVxyXG5cclxuXHR2YXIgcHJvamVjdF90YXNrID0gb3B0aW9ucy5wcm9qZWN0X3Rhc2s7XHJcblx0dmFyIGJvYXJkX2l0ZW0gPSBvcHRpb25zLmJvYXJkX2l0ZW07XHJcblxyXG5cdHZhciBtb2RhbCA9IG5ldyBNb2RhbCh7XHJcblx0XHRjb250ZW50OiB0ZW1wbGF0ZSgncHJvamVjdC10YXNrLW1vZGFsJywge1xyXG5cdFx0XHRwcm9qZWN0X3Rhc2s6IHByb2plY3RfdGFzayxcclxuXHRcdH0pLFxyXG5cdH0pO1xyXG5cclxuXHRtb2RhbC4kdGl0bGVfdGV4dGFyZWEgPSBtb2RhbC4kZWxlbWVudC5maW5kKCcubW9kYWwtaGVhZGVyX190aXRsZScpO1xyXG5cdG1vZGFsLiRkZXNjcmlwdGlvbiA9IG1vZGFsLiRlbGVtZW50LmZpbmQoJy5tb2RhbC10YXNrLWRlc2NyaXB0aW9uJyk7XHJcblx0bW9kYWwuJGRlc2NyaXB0aW9uX3RleHRhcmVhID0gbW9kYWwuJGVsZW1lbnQuZmluZCgnLm1vZGFsLXRhc2stZGVzY3JpcHRpb25fX3RleHRhcmVhJyk7XHJcblx0bW9kYWwuJGRlc2NyaXB0aW9uX3NhdmVfYnV0dG9uID0gbW9kYWwuJGVsZW1lbnQuZmluZCgnLm1vZGFsLXRhc2stZGVzY3JpcHRpb25fX3NhdmUtYnV0dG9uJyk7XHJcblx0bW9kYWwuJGRlc2NyaXB0aW9uX2Nsb3NlX2J1dHRvbiA9IG1vZGFsLiRlbGVtZW50LmZpbmQoJy5tb2RhbC10YXNrLWRlc2NyaXB0aW9uX19jbG9zZS1idXR0b24nKTtcclxuXHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xyXG5cclxuXHRtb2RhbC5vcHRpbWl6ZV90aXRsZV90ZXh0YXJlYSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0bW9kYWwuJHRpdGxlX3RleHRhcmVhLmNzcygnaGVpZ2h0JywgJycpO1xyXG5cdFx0XHJcblx0XHRtb2RhbC4kdGl0bGVfdGV4dGFyZWEuY3NzKHtcclxuXHRcdFx0aGVpZ2h0OiAobW9kYWwuJHRpdGxlX3RleHRhcmVhWzBdLnNjcm9sbEhlaWdodCArIHBhcnNlSW50KG1vZGFsLiR0aXRsZV90ZXh0YXJlYS5jc3MoJ2JvcmRlcicpKSAqIDIpICsgJ3B4JyxcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdG1vZGFsLiR0aXRsZV90ZXh0YXJlYS5vbignaW5wdXQnLCBmdW5jdGlvbigpIHtcclxuXHRcdG1vZGFsLm9wdGltaXplX3RpdGxlX3RleHRhcmVhKCk7XHJcblx0fSk7XHJcblxyXG5cdG1vZGFsLiR0aXRsZV90ZXh0YXJlYS5rZXlwcmVzcyhmdW5jdGlvbihldmVudCkge1xyXG5cdFx0aWYgKGV2ZW50LndoaWNoID09IDEzKSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdCQodGhpcykuYmx1cigpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdG1vZGFsLiR0aXRsZV90ZXh0YXJlYS5rZXlkb3duKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRpZiAoZXZlbnQua2V5ID09ICdFc2NhcGUnKSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHQkKHRoaXMpLnZhbChwcm9qZWN0X3Rhc2sudGl0bGUpO1xyXG5cdFx0XHQkKHRoaXMpLmJsdXIoKTtcclxuXHRcdFx0bW9kYWwuJGVsZW1lbnQuZm9jdXMoKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHRtb2RhbC4kdGl0bGVfdGV4dGFyZWEuYmx1cihmdW5jdGlvbigpIHtcclxuXHRcdGlmIChwcm9qZWN0X3Rhc2sudGl0bGUgPT0gbW9kYWwuJHRpdGxlX3RleHRhcmVhLnZhbCgpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIW1vZGFsLiR0aXRsZV90ZXh0YXJlYS52YWwoKSkge1xyXG5cdFx0XHRtb2RhbC4kdGl0bGVfdGV4dGFyZWEudmFsKHByb2plY3RfdGFzay50aXRsZSk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRtb2RhbC4kY2xvc2VfYnV0dG9uLmFkZENsYXNzKCdpcy1sb2FkaW5nIGRpc2FibGVkJyk7XHJcblxyXG5cdFx0cmVxdWVzdCh7XHJcblx0XHRcdG1ldGhvZDogJ1BPU1QnLFxyXG5cdFx0XHR1cmw6ICcvcHJvamVjdF90YXNrcy8nICsgcHJvamVjdF90YXNrLmlkICsgJy91cGRhdGUnLFxyXG5cclxuXHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdHByb2plY3RfdGFzazoge1xyXG5cdFx0XHRcdFx0dGl0bGU6IG1vZGFsLiR0aXRsZV90ZXh0YXJlYS52YWwoKSxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cdFx0fSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuXHRcdFx0bW9kYWwuJGNsb3NlX2J1dHRvbi5yZW1vdmVDbGFzcygnaXMtbG9hZGluZyBkaXNhYmxlZCcpO1xyXG5cclxuXHRcdFx0aWYgKHJlc3BvbnNlLmVycm9yKSB7XHJcblx0XHRcdFx0JC5ub3RpZnkocmVzcG9uc2UuZXJyb3IsICdlcnJvcicpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cHJvamVjdF90YXNrLnRpdGxlID0gcmVzcG9uc2UuZGF0YS50aXRsZTtcclxuXHRcdFx0bW9kYWwuJHRpdGxlX3RleHRhcmVhLnZhbChwcm9qZWN0X3Rhc2sudGl0bGUpO1xyXG5cdFx0XHRib2FyZF9pdGVtLnJlbmRlclRpdGxlKCk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xyXG5cclxuXHRtb2RhbC5vcHRpbWl6ZV9kZXNjcmlwdGlvbl90ZXh0YXJlYSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0bW9kYWwuJGRlc2NyaXB0aW9uX3RleHRhcmVhLmNzcygnaGVpZ2h0JywgJycpO1xyXG5cclxuXHRcdG1vZGFsLiRkZXNjcmlwdGlvbl90ZXh0YXJlYS5jc3Moe1xyXG5cdFx0XHRoZWlnaHQ6IChtb2RhbC4kZGVzY3JpcHRpb25fdGV4dGFyZWFbMF0uc2Nyb2xsSGVpZ2h0ICsgcGFyc2VJbnQobW9kYWwuJHRpdGxlX3RleHRhcmVhLmNzcygnYm9yZGVyJykpICogMikgKyAncHgnLFxyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0bW9kYWwuJGRlc2NyaXB0aW9uX3RleHRhcmVhLm9uKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0bW9kYWwub3B0aW1pemVfZGVzY3JpcHRpb25fdGV4dGFyZWEoKTtcclxuXHR9KTtcclxuXHJcblx0bW9kYWwuJGRlc2NyaXB0aW9uX3RleHRhcmVhLmZvY3VzKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0bW9kYWwuJGRlc2NyaXB0aW9uLmFkZENsYXNzKCdpcy1mb2N1cycpO1xyXG5cdH0pO1xyXG5cclxuXHRtb2RhbC4kZGVzY3JpcHRpb25fdGV4dGFyZWEua2V5ZG93bihmdW5jdGlvbihldmVudCkge1xyXG5cdFx0aWYgKGV2ZW50LmtleSA9PSAnRXNjYXBlJykge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0bW9kYWwuJGRlc2NyaXB0aW9uX2Nsb3NlX2J1dHRvbi5jbGljaygpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdG1vZGFsLiRkZXNjcmlwdGlvbl90ZXh0YXJlYS5ibHVyKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0Ly8gbW9kYWwuJGRlc2NyaXB0aW9uLnJlbW92ZUNsYXNzKCdpcy1mb2N1cycpO1xyXG5cdH0pO1xyXG5cclxuXHRtb2RhbC4kZGVzY3JpcHRpb25fc2F2ZV9idXR0b24uY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0aWYgKHByb2plY3RfdGFzay5kZXNjcmlwdGlvbiA9PSBtb2RhbC4kZGVzY3JpcHRpb25fdGV4dGFyZWEudmFsKCkpIHtcclxuXHRcdFx0bW9kYWwuJGRlc2NyaXB0aW9uLnJlbW92ZUNsYXNzKCdpcy1mb2N1cycpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bW9kYWwuJGRlc2NyaXB0aW9uX3NhdmVfYnV0dG9uLmFkZENsYXNzKCdpcy1sb2FkaW5nIGRpc2FibGVkJyk7XHJcblxyXG5cdFx0cmVxdWVzdCh7XHJcblx0XHRcdG1ldGhvZDogJ1BPU1QnLFxyXG5cdFx0XHR1cmw6ICcvcHJvamVjdF90YXNrcy8nICsgcHJvamVjdF90YXNrLmlkICsgJy91cGRhdGUnLFxyXG5cclxuXHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdHByb2plY3RfdGFzazoge1xyXG5cdFx0XHRcdFx0ZGVzY3JpcHRpb246IG1vZGFsLiRkZXNjcmlwdGlvbl90ZXh0YXJlYS52YWwoKSxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cdFx0fSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuXHRcdFx0bW9kYWwuJGRlc2NyaXB0aW9uX3NhdmVfYnV0dG9uLnJlbW92ZUNsYXNzKCdpcy1sb2FkaW5nIGRpc2FibGVkJyk7XHJcblxyXG5cdFx0XHRpZiAocmVzcG9uc2UuZXJyb3IpIHtcclxuXHRcdFx0XHQkLm5vdGlmeShyZXNwb25zZS5lcnJvciwgJ2Vycm9yJyk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRwcm9qZWN0X3Rhc2suZGVzY3JpcHRpb24gPSByZXNwb25zZS5kYXRhLmRlc2NyaXB0aW9uO1xyXG5cdFx0XHRtb2RhbC4kZGVzY3JpcHRpb25fdGV4dGFyZWEudmFsKHByb2plY3RfdGFzay5kZXNjcmlwdGlvbik7XHJcblx0XHRcdG1vZGFsLiRkZXNjcmlwdGlvbi5yZW1vdmVDbGFzcygnaXMtZm9jdXMnKTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHRtb2RhbC4kZGVzY3JpcHRpb25fY2xvc2VfYnV0dG9uLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0bW9kYWwuJGRlc2NyaXB0aW9uX3RleHRhcmVhLnZhbChwcm9qZWN0X3Rhc2suZGVzY3JpcHRpb24pO1xyXG5cdFx0bW9kYWwuJGRlc2NyaXB0aW9uX3RleHRhcmVhLmJsdXIoKTtcclxuXHRcdG1vZGFsLiRkZXNjcmlwdGlvbi5yZW1vdmVDbGFzcygnaXMtZm9jdXMnKTtcclxuXHR9KTtcclxuXHJcblx0bW9kYWwuJGVsZW1lbnQuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdGlmIChtb2RhbC4kZGVzY3JpcHRpb24uaGFzQ2xhc3MoJ2lzLWZvY3VzJykpIHtcclxuXHRcdFx0aWYgKCQoZXZlbnQudGFyZ2V0KS5pcygnLm1vZGFsLXRhc2stZGVzY3JpcHRpb25fX3RleHRhcmVhJykpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICgkKGV2ZW50LnRhcmdldCkuaXMoJy5tb2RhbC10YXNrLWRlc2NyaXB0aW9uX19zYXZlLWJ1dHRvbicpKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRtb2RhbC4kZGVzY3JpcHRpb25fc2F2ZV9idXR0b24uY2xpY2soKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXHJcblxyXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRtb2RhbC5vcHRpbWl6ZV90aXRsZV90ZXh0YXJlYSgpO1xyXG5cdFx0bW9kYWwub3B0aW1pemVfZGVzY3JpcHRpb25fdGV4dGFyZWEoKTtcclxuXHR9LCAxNTApO1xyXG59OyIsIm1vZGFscy5yZWdpc3RyYXRpb24gPSBmdW5jdGlvbihvcHRpb25zKSB7XHJcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblxyXG5cdHZhciBtb2RhbCA9IG5ldyBNb2RhbCh7XHJcblx0XHRuYW1lOiAncmVnaXN0cmF0aW9uJyxcclxuXHJcblx0XHRjb250ZW50OiB0ZW1wbGF0ZSgncmVnaXN0cmF0aW9uLW1vZGFsJywge1xyXG5cdFx0XHRlbWFpbDogb3B0aW9ucy5lbWFpbCB8fCBudWxsLFxyXG5cdFx0fSksXHJcblx0fSk7XHJcblxyXG5cdG1vZGFsLiRlbGVtZW50Lm9uKCdzaG93bi5icy5tb2RhbCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0bW9kYWwuJGVsZW1lbnQuZmluZCgnaW5wdXRbdmFsdWU9XCJcIl06Zmlyc3QnKS5mb2N1cygpO1xyXG5cdH0pO1xyXG5cclxuXHRtb2RhbC4kZWxlbWVudC5maW5kKCcubW9kYWxfX2FscmVhZHktaGF2ZS1hY2NvdW50JykuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRtb2RhbC5jbG9zZSgpO1xyXG5cclxuXHRcdG1vZGFscy5sb2dpbih7XHJcblx0XHRcdGVtYWlsOiBtb2RhbC4kZWxlbWVudC5maW5kKCdbbmFtZT1cInVzZXJbZW1haWxdXCJdJykudmFsKCksXHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0KGZ1bmN0aW9uIGluaXRpYWxpemVfcmVnaXN0cmF0aW9uX2Zvcm0oJGZvcm0pIHtcclxuXHRcdHZhciAkdXNlcl9lbWFpbF9pbnB1dCA9ICRmb3JtLmZpbmQoJ1tuYW1lPVwidXNlcltlbWFpbF1cIl0nKTtcclxuXHRcdHZhciAkdXNlcl9zbHVnX2lucHV0ID0gJGZvcm0uZmluZCgnW25hbWU9XCJ1c2VyW3NsdWddXCJdJyk7XHJcblx0XHR2YXIgJHVzZXJfbG9jYWxpdHlfaW5wdXQgPSAkZm9ybS5maW5kKCdbbmFtZT1cInVzZXJbbG9jYWxpdHlfaWRdXCJdJyk7XHJcblx0XHR2YXIgJHVzZXJfbGF0aXR1ZGVfaW5wdXQgPSAkZm9ybS5maW5kKCdbbmFtZT1cInVzZXJbbGF0aXR1ZGVdXCJdJyk7XHJcblx0XHR2YXIgJHVzZXJfbG9uZ2l0dWRlX2lucHV0ID0gJGZvcm0uZmluZCgnW25hbWU9XCJ1c2VyW2xvbmdpdHVkZV1cIl0nKTtcclxuXHRcdHZhciAkdXNlcl9zbHVnX2Jsb2NrID0gJGZvcm0uZmluZCgnLnBheXBhZ2UtbGluay1pbnB1dC1ibG9jaycpO1xyXG5cclxuXHRcdGZ1bmN0aW9uIHJlZ2lzdGVyKG9wdGlvbnMpIHtcclxuXHRcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblx0XHRcdHJlZ2lzdGVyLnRpbWVvdXQgJiYgY2xlYXJUaW1lb3V0KHJlZ2lzdGVyLnRpbWVvdXQpO1xyXG5cdFx0XHRyZWdpc3Rlci50aW1lb3V0ID0gbnVsbDtcclxuXHJcblx0XHRcdHJlZ2lzdGVyLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJlZ2lzdGVyLnhociAmJiByZWdpc3Rlci54aHIuYWJvcnQoKTtcclxuXHRcdFx0XHQkZm9ybS5hZGRDbGFzcygnbG9hZGluZycpO1xyXG5cclxuXHRcdFx0XHRyZWdpc3Rlci54aHIgPSByZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogJy9yZWdpc3RlcicsXHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHRcdFx0dXNlcjoge1xyXG5cdFx0XHRcdFx0XHRcdGVtYWlsOiAkdXNlcl9lbWFpbF9pbnB1dC52YWwoKSxcclxuXHRcdFx0XHRcdFx0XHRzbHVnOiAkdXNlcl9zbHVnX2lucHV0LnZhbCgpLFxyXG5cdFx0XHRcdFx0XHRcdGxvY2FsaXR5X2lkOiAkdXNlcl9sb2NhbGl0eV9pbnB1dC52YWwoKSxcclxuXHRcdFx0XHRcdFx0XHRsYXRpdHVkZTogJHVzZXJfbGF0aXR1ZGVfaW5wdXQudmFsKCksXHJcblx0XHRcdFx0XHRcdFx0bG9uZ2l0dWRlOiAkdXNlcl9sb25naXR1ZGVfaW5wdXQudmFsKCksXHJcblx0XHRcdFx0XHRcdFx0cmVmZXJyZXJfdXNlcl9pZDogd2luZG93LnJlZmVycmVyX3VzZXJfaWQsXHJcblx0XHRcdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdFx0XHRzdWdnZXN0X3VzZXJfc2x1ZzogJHVzZXJfc2x1Z19pbnB1dC5oYXNDbGFzcygnd2FzLW1hbnVhbGx5LWNoYW5nZWQnKSA/IDAgOiAxLFxyXG5cdFx0XHRcdFx0XHRqdXN0X3ZhbGlkYXRlOiBvcHRpb25zLmp1c3RfdmFsaWRhdGUgPyAxIDogMCxcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0fSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuXHRcdFx0XHRcdCRmb3JtLnRvZ2dsZUNsYXNzKCd1c2VyLXNsdWctc2hvd24nLCAkdXNlcl9lbWFpbF9pbnB1dC52YWwoKS5sZW5ndGggPj0gMyk7XHJcblx0XHRcdFx0XHQkZm9ybS5maW5kKCcubW9kYWxfX3VzZXItc2x1Zy1jb250YWluZXInKS50b2dnbGVDbGFzcygnc2hvdycsICR1c2VyX2VtYWlsX2lucHV0LnZhbCgpLmxlbmd0aCA+PSAzKTtcclxuXHRcdFx0XHRcdCR1c2VyX3NsdWdfaW5wdXQuYXR0cigndGFiaW5kZXgnLCAkdXNlcl9lbWFpbF9pbnB1dC52YWwoKS5sZW5ndGggPj0gMyA/ICcnIDogJy0xJyk7XHJcblx0XHRcdFx0XHQkZm9ybS5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChyZXNwb25zZS5lcnJvcikge1xyXG5cdFx0XHRcdFx0XHQkLm5vdGlmeShyZXNwb25zZS5lcnJvciwgJ2Vycm9yJyk7XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRyZWdpc3Rlci54aHIgPSBudWxsO1xyXG5cclxuXHRcdFx0XHRcdGlmICghJHVzZXJfc2x1Z19pbnB1dC5oYXNDbGFzcygnd2FzLW1hbnVhbGx5LWNoYW5nZWQnKSkge1xyXG5cdFx0XHRcdFx0XHQkdXNlcl9zbHVnX2lucHV0LnZhbChyZXNwb25zZS5kYXRhLnN1Z2dlc3RlZF91c2VyX3NsdWcpO1xyXG5cdFx0XHRcdFx0XHQkZm9ybS50b2dnbGVDbGFzcygndXNlci1zbHVnLWxlc3MtdGhhbi0zJywgcmVzcG9uc2UuZGF0YS5zdWdnZXN0ZWRfdXNlcl9zbHVnLmxlbmd0aCA8IDMpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHZhciBpbmNvbXBsZXRlX2VtYWlsX2lzX3ZhbGlkID0gIShyZXNwb25zZS5kYXRhLnZhbGlkYXRpb25fbWVzc2FnZXNbJ3VzZXIuZW1haWwnXSB8fCBbXSkuc29tZShmdW5jdGlvbih0ZXh0KSB7XHJcblx0XHRcdFx0XHRcdGlmICh0ZXh0Lm1hdGNoKC9eVGhlIC4qPyBmb3JtYXQgaXMgaW52YWxpZFxcLiQvKSkge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0dmFyIGNvbXBsZXRlX2VtYWlsX2lzX3ZhbGlkID0gIShyZXNwb25zZS5kYXRhLnZhbGlkYXRpb25fbWVzc2FnZXNbJ3VzZXIuZW1haWwnXSB8fCBbXSkuc29tZShmdW5jdGlvbih0ZXh0KSB7XHJcblx0XHRcdFx0XHRcdGlmICh0ZXh0Lm1hdGNoKC9eVGhlIC4qPyBtdXN0IGJlIGEgdmFsaWQgZW1haWwgYWRkcmVzc1xcLiQvKSkge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAodGV4dC5tYXRjaCgvXlRoZSAuKj8gZmllbGQgaXMgcmVxdWlyZWRcXC4kLykpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0dmFyIGVtYWlsX2lzX2F2YWlsYWJsZSA9ICEocmVzcG9uc2UuZGF0YS52YWxpZGF0aW9uX21lc3NhZ2VzWyd1c2VyLmVtYWlsJ10gfHwgW10pLnNvbWUoZnVuY3Rpb24odGV4dCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGV4dC5tYXRjaCgvXlRoZSAuKz8gaGFzIGFscmVhZHkgYmVlbiB0YWtlblxcLiQvKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdHZhciBzbHVnX2lzX2F2YWlsYWJsZSA9ICEocmVzcG9uc2UuZGF0YS52YWxpZGF0aW9uX21lc3NhZ2VzWyd1c2VyLnNsdWcnXSB8fCBbXSkuc29tZShmdW5jdGlvbih0ZXh0KSB7XHJcblx0XHRcdFx0XHRcdGlmICh0ZXh0Lm1hdGNoKC9eVGhlIC4rPyBoYXMgYWxyZWFkeSBiZWVuIHRha2VuXFwuJC8pKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdGlmICh0ZXh0Lm1hdGNoKC9eVGhlIHNlbGVjdGVkIC4qPyBpcyBpbnZhbGlkXFwuJC8pKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdHZhciBzbHVnX2lzX3ZhbGlkID0gIShyZXNwb25zZS5kYXRhLnZhbGlkYXRpb25fbWVzc2FnZXNbJ3VzZXIuc2x1ZyddIHx8IFtdKS5zb21lKGZ1bmN0aW9uKHRleHQpIHtcclxuXHRcdFx0XHRcdFx0aWYgKHRleHQubWF0Y2goL15UaGUgLio/IGZvcm1hdCBpcyBpbnZhbGlkXFwuJC8pKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdGlmICh0ZXh0Lm1hdGNoKC9eVGhlIC4qPyBmaWVsZCBpcyByZXF1aXJlZFxcLiQvKSkge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHQkdXNlcl9lbWFpbF9pbnB1dC5wYXJlbnQoKS50b2dnbGVDbGFzcygnc3VjY2VzcycsIGNvbXBsZXRlX2VtYWlsX2lzX3ZhbGlkICYmIGVtYWlsX2lzX2F2YWlsYWJsZSk7XHJcblx0XHRcdFx0XHQkdXNlcl9lbWFpbF9pbnB1dC5wYXJlbnQoKS50b2dnbGVDbGFzcygnZmFpbCcsICFpbmNvbXBsZXRlX2VtYWlsX2lzX3ZhbGlkIHx8ICFlbWFpbF9pc19hdmFpbGFibGUpO1xyXG5cdFx0XHRcdFx0JHVzZXJfc2x1Z19pbnB1dC5wYXJlbnQoKS50b2dnbGVDbGFzcygnc3VjY2VzcycsIHJlc3BvbnNlLmRhdGEuc2x1Z19zdWNjZXNzKTtcclxuXHRcdFx0XHRcdCR1c2VyX3NsdWdfaW5wdXQucGFyZW50KCkudG9nZ2xlQ2xhc3MoJ2ZhaWwnLCAhcmVzcG9uc2UuZGF0YS5zbHVnX3N1Y2Nlc3MpO1xyXG5cdFx0XHRcdFx0JHVzZXJfZW1haWxfaW5wdXQuc2libGluZ3MoJy5pbnZhbGlkLWZlZWRiYWNrJykucmVtb3ZlQ2xhc3MoJ2QtYmxvY2snKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoIWluY29tcGxldGVfZW1haWxfaXNfdmFsaWQpIHtcclxuXHRcdFx0XHRcdFx0JHVzZXJfZW1haWxfaW5wdXQuc2libGluZ3MoJy5pbnZhbGlkLWZlZWRiYWNrLmlzLWludmFsaWQnKS5hZGRDbGFzcygnZC1ibG9jaycpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmICghb3B0aW9ucy5qdXN0X3ZhbGlkYXRlICYmICFjb21wbGV0ZV9lbWFpbF9pc192YWxpZCkge1xyXG5cdFx0XHRcdFx0XHQkdXNlcl9lbWFpbF9pbnB1dC5zaWJsaW5ncygnLmludmFsaWQtZmVlZGJhY2suaXMtaW52YWxpZCcpLmFkZENsYXNzKCdkLWJsb2NrJyk7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKCFlbWFpbF9pc19hdmFpbGFibGUpIHtcclxuXHRcdFx0XHRcdFx0JHVzZXJfZW1haWxfaW5wdXQuc2libGluZ3MoJy5pbnZhbGlkLWZlZWRiYWNrLmlzLW5vdC1hdmFpbGFibGUnKS5hZGRDbGFzcygnZC1ibG9jaycpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdCR1c2VyX3NsdWdfYmxvY2suc2libGluZ3MoJy5pbnZhbGlkLWZlZWRiYWNrJykucmVtb3ZlQ2xhc3MoJ2QtYmxvY2snKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoIXJlc3BvbnNlLmRhdGEuc2x1Z19zdWNjZXNzICYmICFzbHVnX2lzX3ZhbGlkKSB7XHJcblx0XHRcdFx0XHRcdCR1c2VyX3NsdWdfYmxvY2suc2libGluZ3MoJy5pbnZhbGlkLWZlZWRiYWNrLmlzLWludmFsaWQnKS5hZGRDbGFzcygnZC1ibG9jaycpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmICghcmVzcG9uc2UuZGF0YS5zbHVnX3N1Y2Nlc3MgJiYgIXNsdWdfaXNfYXZhaWxhYmxlKSB7XHJcblx0XHRcdFx0XHRcdCR1c2VyX3NsdWdfYmxvY2suc2libGluZ3MoJy5pbnZhbGlkLWZlZWRiYWNrLmlzLW5vdC1hdmFpbGFibGUnKS5hZGRDbGFzcygnZC1ibG9jaycpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQkZm9ybS50b2dnbGVDbGFzcygnYWxsb3ctcmVnaXN0cmF0aW9uJywgY29tcGxldGVfZW1haWxfaXNfdmFsaWQgJiYgZW1haWxfaXNfYXZhaWxhYmxlICYmIHJlc3BvbnNlLmRhdGEuc2x1Z19zdWNjZXNzKTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0Ly8gJGZvcm0uZmluZCgnLmxhbmRpbmctMl9fcmVnaXN0cmF0aW9uLWZvcm1fX2lucHV0IHAnKS5yZW1vdmVDbGFzcygnc2hha2UgYW5pbWF0ZWQnKTtcclxuXHJcblx0XHRcdFx0XHQvLyBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0Ly8gXHQkZm9ybS5maW5kKCcubGFuZGluZy0yX19yZWdpc3RyYXRpb24tZm9ybV9faW5wdXQgcCcpLmFkZENsYXNzKCdzaGFrZSBhbmltYXRlZCcpO1xyXG5cdFx0XHRcdFx0Ly8gfSk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKCFvcHRpb25zLmp1c3RfdmFsaWRhdGUpIHtcclxuXHRcdFx0XHRcdFx0aWYgKCEkZm9ybS5oYXNDbGFzcygnYWxsb3ctcmVnaXN0cmF0aW9uJykpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdCRmb3JtLmFkZENsYXNzKCdsb2FkaW5nJyk7XHJcblxyXG5cdFx0XHRcdFx0XHRyZWdpc3Rlci54aHIgPSByZXF1ZXN0KHtcclxuXHRcdFx0XHRcdFx0XHRyb290OiAnJyxcclxuXHRcdFx0XHRcdFx0XHR1cmw6ICcvbG9naW5fdXNpbmdfYXBpX3Rva2VuJyxcclxuXHRcdFx0XHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcclxuXHJcblx0XHRcdFx0XHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdFx0XHRcdFx0dXNlcl9pZDogcmVzcG9uc2UuZGF0YS51c2VyLmlkLFxyXG5cdFx0XHRcdFx0XHRcdFx0YXBpX3Rva2VuOiByZXNwb25zZS5kYXRhLnVzZXIuYXBpX3Rva2VuLFxyXG5cdFx0XHRcdFx0XHRcdFx0cmVtZW1iZXJfbWU6IDEsXHJcblx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0fSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAocmVzcG9uc2UuZXJyb3IpIHtcclxuXHRcdFx0XHRcdFx0XHRcdCQubm90aWZ5KHJlc3BvbnNlLmVycm9yLCAnZXJyb3InKTtcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9kYXNoYm9hcmQnO1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0sIG9wdGlvbnMuanVzdF92YWxpZGF0ZSA/IDIwMCA6IDApO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIHNldF9pbnB1dF9jYXJyZXRfYXRfZW5kKGVsZW1lbnQpIHtcclxuXHRcdFx0aWYgKGRvY3VtZW50LnNlbGVjdGlvbikge1xyXG5cdFx0XHRcdGVsZW1lbnQuZm9jdXMoKTtcclxuXHRcdFx0XHR2YXIgc2VsZWN0aW9uX3JhbmdlID0gZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCk7XHJcblx0XHRcdFx0c2VsZWN0aW9uX3JhbmdlLm1vdmVTdGFydCgnY2hhcmFjdGVyJywgLWVsZW1lbnQudmFsdWUubGVuZ3RoKTtcclxuXHRcdFx0XHRzZWxlY3Rpb25fcmFuZ2UubW92ZVN0YXJ0KCdjaGFyYWN0ZXInLCBlbGVtZW50LnZhbHVlLmxlbmd0aCk7XHJcblx0XHRcdFx0c2VsZWN0aW9uX3JhbmdlLm1vdmVFbmQoJ2NoYXJhY3RlcicsIDApO1xyXG5cdFx0XHRcdHNlbGVjdGlvbl9yYW5nZS5zZWxlY3QoKTtcclxuXHRcdFx0fSBlbHNlIGlmIChlbGVtZW50LnNlbGVjdGlvblN0YXJ0IHx8IGVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPT0gJzAnKSB7XHJcblx0XHRcdFx0ZWxlbWVudC5zZWxlY3Rpb25TdGFydCA9IGVsZW1lbnQudmFsdWUubGVuZ3RoO1xyXG5cdFx0XHRcdGVsZW1lbnQuc2VsZWN0aW9uRW5kID0gZWxlbWVudC52YWx1ZS5sZW5ndGg7XHJcblx0XHRcdFx0ZWxlbWVudC5mb2N1cygpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0JHVzZXJfZW1haWxfaW5wdXQub24oJ2lucHV0JywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0JHVzZXJfZW1haWxfaW5wdXQubm90KHRoaXMpLnZhbCgkKHRoaXMpLnZhbCgpKTtcclxuXHRcdFx0cmVnaXN0ZXIoeyBqdXN0X3ZhbGlkYXRlOiB0cnVlIH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JHVzZXJfc2x1Z19pbnB1dC5vbignaW5wdXQnLCBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHQkdXNlcl9zbHVnX2lucHV0Lm5vdCh0aGlzKS52YWwoJCh0aGlzKS52YWwoKSk7XHJcblx0XHRcdCR1c2VyX3NsdWdfaW5wdXQuYWRkQ2xhc3MoJ3dhcy1tYW51YWxseS1jaGFuZ2VkJyk7XHJcblx0XHRcdCRmb3JtLnRvZ2dsZUNsYXNzKCd1c2VyLXNsdWctbGVzcy10aGFuLTMnLCAkdXNlcl9zbHVnX2lucHV0LnZhbCgpLmxlbmd0aCA8IDMpO1xyXG5cdFx0XHRyZWdpc3Rlcih7IGp1c3RfdmFsaWRhdGU6IHRydWUgfSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkdXNlcl9lbWFpbF9pbnB1dC5mb2N1cyhmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRzZXRfaW5wdXRfY2FycmV0X2F0X2VuZCh0aGlzKTtcclxuXHRcdFx0JGZvcm0uYWRkQ2xhc3MoJ3VzZXItZW1haWwtZm9jdXNlZCcpO1xyXG5cdFx0XHQkKCcubGFuZGluZy0yX190b3AtYmFja2dyb3VuZCcpLmFkZENsYXNzKCdsYW5kaW5nLTJfX2JsdXItZWZmZWN0Jyk7XHJcblx0XHRcdCQoJy5sYW5kaW5nLTJfX2JsdXItY29udGFpbmVyJykuYWRkQ2xhc3MoJ2xhbmRpbmctMl9fYmx1ci1lZmZlY3QnKTtcclxuXHRcdH0pLmJsdXIoZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0JGZvcm0ucmVtb3ZlQ2xhc3MoJ3VzZXItZW1haWwtZm9jdXNlZCcpO1xyXG5cdFx0XHQkKCcubGFuZGluZy0yX190b3AtYmFja2dyb3VuZCcpLnJlbW92ZUNsYXNzKCdsYW5kaW5nLTJfX2JsdXItZWZmZWN0Jyk7XHJcblx0XHRcdCQoJy5sYW5kaW5nLTJfX2JsdXItY29udGFpbmVyJykucmVtb3ZlQ2xhc3MoJ2xhbmRpbmctMl9fYmx1ci1lZmZlY3QnKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCR1c2VyX3NsdWdfaW5wdXQuZm9jdXMoZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0c2V0X2lucHV0X2NhcnJldF9hdF9lbmQodGhpcyk7XHJcblx0XHRcdCRmb3JtLmFkZENsYXNzKCd1c2VyLXNsdWctZm9jdXNlZCcpO1xyXG5cdFx0XHQkKCcubGFuZGluZy0yX190b3AtYmFja2dyb3VuZCcpLmFkZENsYXNzKCdsYW5kaW5nLTJfX2JsdXItZWZmZWN0Jyk7XHJcblx0XHRcdCQoJy5sYW5kaW5nLTJfX2JsdXItY29udGFpbmVyJykuYWRkQ2xhc3MoJ2xhbmRpbmctMl9fYmx1ci1lZmZlY3QnKTtcclxuXHRcdH0pLmJsdXIoZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0JGZvcm0ucmVtb3ZlQ2xhc3MoJ3VzZXItc2x1Zy1mb2N1c2VkJyk7XHJcblx0XHRcdCQoJy5sYW5kaW5nLTJfX3RvcC1iYWNrZ3JvdW5kJykucmVtb3ZlQ2xhc3MoJ2xhbmRpbmctMl9fYmx1ci1lZmZlY3QnKTtcclxuXHRcdFx0JCgnLmxhbmRpbmctMl9fYmx1ci1jb250YWluZXInKS5yZW1vdmVDbGFzcygnbGFuZGluZy0yX19ibHVyLWVmZmVjdCcpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JGZvcm0uc3VibWl0KGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHJlZ2lzdGVyKCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRvcHRpb25zLmVtYWlsICYmIHJlZ2lzdGVyKHsganVzdF92YWxpZGF0ZTogdHJ1ZSB9KTtcclxuXHR9KShtb2RhbC4kZWxlbWVudCk7XHJcbn07IiwibW9kYWxzLnJlc2V0X3Bhc3N3b3JkID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblxyXG4gICAgdmFyIG1vZGFsID0gbmV3IE1vZGFsKHtcclxuICAgICAgICBjb250ZW50OiB0ZW1wbGF0ZSgncmVzZXQtcGFzc3dvcmQtbW9kYWwnLCB7XHJcbiAgICAgICAgICAgIGVtYWlsOiBvcHRpb25zLmVtYWlsIHx8IG51bGwsXHJcbiAgICAgICAgfSksXHJcbiAgICB9KTtcclxuXHJcbiAgICBtb2RhbC4kZWxlbWVudC5vbignc2hvd24uYnMubW9kYWwnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBtb2RhbC4kZWxlbWVudC5maW5kKCdpbnB1dFt2YWx1ZT1cIlwiXTpmaXJzdCcpLmZvY3VzKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBtb2RhbC4kZWxlbWVudC5maW5kKCcubW9kYWxfX2JhY2stYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIG1vZGFsLmNsb3NlKCk7XHJcblxyXG4gICAgICAgIG1vZGFscy5sb2dpbih7XHJcbiAgICAgICAgICAgIGVtYWlsOiBtb2RhbC4kZWxlbWVudC5maW5kKCdbbmFtZT1cInVzZXJbZW1haWxdXCJdJykudmFsKCksXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBtb2RhbC4kZWxlbWVudC5maW5kKCcubW9kYWxfX3Jlc2V0LWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgcmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDogJy9yZXNldF9wYXNzd29yZCcsXHJcbiAgICAgICAgICAgIGRhdGE6IG1vZGFsLiRlbGVtZW50LnNlcmlhbGl6ZSgpLFxyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICB9LCBmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICBpZiAobmV3IFZhbGlkYXRvcihtb2RhbC4kZWxlbWVudCwgcmVzcG9uc2UpLmZhaWxzKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAkLm5vdGlmeShyZXNwb25zZS5lcnJvciwgJ2Vycm9yJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG1vZGFsLmNsb3NlKCk7XHJcblxyXG4gICAgICAgICAgICBtb2RhbHMucmVzZXRfcGFzc3dvcmRfZW1haWxfc2VudCh7XHJcbiAgICAgICAgICAgICAgICBlbWFpbDogbW9kYWwuJGVsZW1lbnQuZmluZCgnW25hbWU9XCJ1c2VyW2VtYWlsXVwiXScpLnZhbCgpIHx8IG51bGwsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSlcclxufTsiLCJtb2RhbHMucmVzZXRfcGFzc3dvcmRfY29tcGxldGVkID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG4gICAgdmFyIG1vZGFsID0gbmV3IE1vZGFsKHtcclxuICAgICAgICBjb250ZW50OiB0ZW1wbGF0ZSgncmVzZXQtcGFzc3dvcmQtY29tcGxldGVkLW1vZGFsJywge30pLFxyXG4gICAgfSk7XHJcblxyXG4gICAgbW9kYWwuJGVsZW1lbnQuc3VibWl0KGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICBcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgXHR3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcnICtcclxuICAgICAgICAgICAgJy9sb2dpbl91c2luZ19hcGlfdG9rZW4/dXNlcl9pZD0nICsgb3B0aW9ucy51c2VyLmlkICtcclxuICAgICAgICAgICAgJyZhcGlfdG9rZW49JyArIG9wdGlvbnMudXNlci5hcGlfdG9rZW4gK1xyXG4gICAgICAgICAgICAnJnJlZGlyZWN0X3RvPS9kYXNoYm9hcmQmcmVtZW1iZXJfbWU9MScgK1xyXG4gICAgICAgICcnO1xyXG4gICAgfSk7XHJcbn07IiwibW9kYWxzLnJlc2V0X3Bhc3N3b3JkX2VtYWlsX3NlbnQgPSBmdW5jdGlvbihvcHRpb25zKSB7XHJcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblx0XHJcbiAgICB2YXIgbW9kYWwgPSBuZXcgTW9kYWwoe1xyXG4gICAgICAgIGNvbnRlbnQ6IHRlbXBsYXRlKCdyZXNldC1wYXNzd29yZC1lbWFpbC1zZW50LW1vZGFsJywge30pLFxyXG4gICAgfSk7XHJcblxyXG4gICAgbW9kYWwuJGVsZW1lbnQuZmluZCgnLm1vZGFsX19iYWNrLXRvLWxvZ2luLWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICBcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBcdG1vZGFsLmNsb3NlKCk7XHJcblxyXG4gICAgXHRtb2RhbHMubG9naW4oe1xyXG4gICAgXHRcdGVtYWlsOiBvcHRpb25zLmVtYWlsLFxyXG4gICAgXHR9KTtcclxuICAgIH0pO1xyXG59OyIsIm1vZGFscy50aW1lbGluZV9zZWdtZW50ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgbGV0IHNlZ21lbnRzID0gb3B0aW9ucy5zZWdtZW50cztcclxuICAgIGxldCBjdXJyZW50X3NlZ21lbnQgPSBvcHRpb25zLmN1cnJlbnRfc2VnbWVudDtcclxuXHJcbiAgICB2YXIgbW9kYWwgPSBuZXcgTW9kYWwoe1xyXG4gICAgICAgIGNvbnRlbnQ6IHRlbXBsYXRlKCd0aW1lbGluZS1zZWdtZW50LW1vZGFsJywge1xyXG4gICAgICAgICAgICBzZWdtZW50OiBjdXJyZW50X3NlZ21lbnQsXHJcbiAgICAgICAgfSksXHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgJHByZXZfYnV0dG9uID0gbW9kYWwuJGVsZW1lbnQuZmluZCgnLm1vZGFsX19wcmV2LWJ1dHRvbicpO1xyXG4gICAgbGV0ICRuZXh0X2J1dHRvbiA9IG1vZGFsLiRlbGVtZW50LmZpbmQoJy5tb2RhbF9fbmV4dC1idXR0b24nKTtcclxuICAgIGxldCAkaGVhZGVyID0gbW9kYWwuJGVsZW1lbnQuZmluZCgnLm1vZGFsLWhlYWRlcicpO1xyXG4gICAgbGV0ICRpbWFnZV9jb250YWluZXIgPSBtb2RhbC4kZWxlbWVudC5maW5kKCcubW9kYWxfX3NjcmVlbnNob3QnKTtcclxuICAgIGxldCAkaW1hZ2UgPSBtb2RhbC4kZWxlbWVudC5maW5kKCcubW9kYWxfX3NjcmVlbnNob3QgaW1nJyk7XHJcbiAgICBsZXQgJGN1cnJlbnRfc2NyZWVuc2hvdCA9IG1vZGFsLiRlbGVtZW50LmZpbmQoJy5tb2RhbF9fY3VycmVudC1zY3JlZW5zaG90Jyk7XHJcbiAgICBsZXQgJG5vX3NjcmVlbnNob3QgPSBtb2RhbC4kZWxlbWVudC5maW5kKCcubW9kYWxfX25vLXNjcmVlbnNob3QnKTtcclxuXHJcbiAgICAkbmV4dF9idXR0b24ub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGN1cnJlbnRfc2VnbWVudCA9IHNlZ21lbnRzW3NlZ21lbnRzLmluZGV4T2YoY3VycmVudF9zZWdtZW50KSArIDFdO1xyXG4gICAgICAgIHVwZGF0ZV9jb250ZW50KGN1cnJlbnRfc2VnbWVudCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkcHJldl9idXR0b24ub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGN1cnJlbnRfc2VnbWVudCA9IHNlZ21lbnRzW3NlZ21lbnRzLmluZGV4T2YoY3VycmVudF9zZWdtZW50KSAtIDFdO1xyXG4gICAgICAgIHVwZGF0ZV9jb250ZW50KGN1cnJlbnRfc2VnbWVudCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgdXBkYXRlX2NvbnRlbnQgPSBmdW5jdGlvbiAoc2VnbWVudCkge1xyXG4gICAgICAgIGxldCBjdXJyZW50X3NlZ21lbnRfaW5kZXggPSBzZWdtZW50cy5pbmRleE9mKHNlZ21lbnQpO1xyXG5cclxuICAgICAgICAkcHJldl9idXR0b24ucHJvcCgnZGlzYWJsZWQnLCBjdXJyZW50X3NlZ21lbnRfaW5kZXggPT09IDApO1xyXG4gICAgICAgICRuZXh0X2J1dHRvbi5wcm9wKCdkaXNhYmxlZCcsIGN1cnJlbnRfc2VnbWVudF9pbmRleCA9PT0gc2VnbWVudHMubGVuZ3RoIC0gMSk7XHJcblxyXG4gICAgICAgICRoZWFkZXIudGV4dChbXHJcbiAgICAgICAgICAgIG1vbWVudChzZWdtZW50LmNyZWF0ZWRfYXQpLmZvcm1hdCgnZGRkLCBNTU0gRCwgWVlZWScpLFxyXG4gICAgICAgICAgICAnYXQnLFxyXG4gICAgICAgICAgICBtb21lbnQoc2VnbWVudC5jcmVhdGVkX2F0KS5mb3JtYXQoJ2g6bW0gQScpXHJcbiAgICAgICAgXS5qb2luKCcgJykpO1xyXG5cclxuICAgICAgICAkY3VycmVudF9zY3JlZW5zaG90LnRleHQoKGN1cnJlbnRfc2VnbWVudF9pbmRleCArIDEpICsgJyAvICcgKyBzZWdtZW50cy5sZW5ndGgpO1xyXG5cclxuICAgICAgICBpZiAoc2VnbWVudC5zY3JlZW5zaG90KSB7XHJcbiAgICAgICAgICAgICRpbWFnZS5hdHRyKCdzcmMnLCBzZWdtZW50LnNjcmVlbnNob3QudXJscy5vcmlnaW5hbCk7XHJcbiAgICAgICAgICAgICRpbWFnZV9jb250YWluZXIuYXR0cignaHJlZicsIHNlZ21lbnQuc2NyZWVuc2hvdC51cmxzLm9yaWdpbmFsKTtcclxuICAgICAgICAgICAgJGltYWdlLnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxuICAgICAgICAgICAgJG5vX3NjcmVlbnNob3QuYWRkQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICRpbWFnZS5hZGRDbGFzcygnZC1ub25lJyk7XHJcbiAgICAgICAgICAgICRub19zY3JlZW5zaG90LnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHVwZGF0ZV9jb250ZW50KGN1cnJlbnRfc2VnbWVudCk7XHJcbn07XHJcbiIsIiQoJ2JvZHknKS5vbignY2xpY2snLCAnLnNob3ctdXNlci1mZWVkYmFjay1tb2RhbCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIG1vZGFscy51c2VyX2ZlZWRiYWNrKCk7XHJcbn0pO1xyXG5cclxubW9kYWxzLnVzZXJfZmVlZGJhY2sgPSBmdW5jdGlvbihvcHRpb25zKSB7XHJcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblxyXG5cdHZhciBtb2RhbCA9IG5ldyBNb2RhbCh7XHJcblx0XHRjb250ZW50OiB0ZW1wbGF0ZSgndXNlci1mZWVkYmFjay1tb2RhbCcpLFxyXG5cdH0pO1xyXG5cclxuICAgIG1vZGFsLiRlbGVtZW50Lm9uKCdzaG93bi5icy5tb2RhbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIG1vZGFsLiRlbGVtZW50LmZpbmQoJ1tuYW1lPVwidXNlcl9mZWVkYmFja1t0ZXh0XVwiXScpLnZhbCgkKCcubmF2YmFyLWZlZWRiYWNrX19pbnB1dCcpLnZhbCgpKTtcclxuICAgICAgICAkKCcubmF2YmFyLWZlZWRiYWNrX19pbnB1dCcpLnZhbCgnJyk7XHJcbiAgICAgICAgJCgnLm5hdmJhci1mZWVkYmFja19faW5wdXQnKS5yZW1vdmVEYXRhKCdtb2RhbCcpXHJcbiAgICAgICAgbW9kYWwuJGVsZW1lbnQuZmluZCgnW25hbWU9XCJ1c2VyX2ZlZWRiYWNrW3RleHRdXCJdJykuZm9jdXMoKTtcclxuICAgIH0pO1xyXG5cclxuXHRtb2RhbC4kZWxlbWVudC5maW5kKCcubW9kYWxfX3NlbmQtZmVlZGJhY2stYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtbG9hZGluZyBkaXNhYmxlZCcpO1xyXG5cdFx0dmFyICRmb3JtID0gJCgnZm9ybSNmZWVkYmFjay1mb3JtJyk7XHJcbiAgICAgICAgdmFyICR0aGlzX2J1dHRvbiA9ICQodGhpcyk7XHJcblxyXG4gICAgICAgIHJlcXVlc3Qoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgdXJsOiAnL3VzZXJfZmVlZGJhY2svY3JlYXRlJyxcclxuXHRcdFx0ZGF0YTogJGZvcm0uc2VyaWFsaXplKCksXHJcbiAgICAgICAgfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgaWYgKG5ldyBWYWxpZGF0b3IoJGZvcm0sIHJlc3BvbnNlKS5mYWlscygpKSB7XHJcbiAgICAgICAgICAgICAgICAkdGhpc19idXR0b24ucmVtb3ZlQ2xhc3MoJ2lzLWxvYWRpbmcgZGlzYWJsZWQnKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICQubm90aWZ5KHJlc3BvbnNlLmVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJC5ub3RpZnkoJ1dlIGdvdCB5b3VyIGZlZWRiYWNrISBUaGFua3MhJywgJ3N1Y2Nlc3MnKTtcclxuICAgICAgICAgICAgbW9kYWwuY2xvc2UoKTtcclxuICAgICAgICB9KTtcclxuXHR9KTtcclxuXHJcbiAgICByZXR1cm4gbW9kYWw7XHJcbn07IiwiJChmdW5jdGlvbiAoKSB7XHJcblx0JCgnYm9keScpLm9uKCdjbGljaycsICcudXNlci1wcm9maWxlLXNsaWRlLW91dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBtb2RhbHMudXNlcl9wcm9maWxlKHsgdXNlcl9pZDogJCh0aGlzKS5kYXRhKCd1c2VyLWlkJykgfSk7XHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5tb2RhbHMudXNlcl9wcm9maWxlID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cclxuXHRpZiAoIW9wdGlvbnMudXNlcl9pZCAmJiAhb3B0aW9ucy51c2VyKSB7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ2B1c2VyX2lkYCBvciBgdXNlcmAgb3B0aW9uIHJlcXVpcmVkJyk7XHJcblx0fVxyXG5cclxuXHQoZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuXHRcdGlmIChvcHRpb25zLnVzZXIpIHtcclxuXHRcdFx0cmV0dXJuIGNhbGxiYWNrKG9wdGlvbnMudXNlcik7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHJlcXVlc3Qoe1xyXG5cdFx0XHR1cmw6ICcvdXNlcnMvJyArIG9wdGlvbnMudXNlcl9pZCxcclxuXHRcdH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcblx0XHRcdGlmIChyZXNwb25zZS5lcnJvcikge1xyXG5cdFx0XHRcdCQubm90aWZ5KHJlc3BvbnNlLmVycm9yLCAnZXJyb3InKTtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBjYWxsYmFjayhyZXNwb25zZS5kYXRhKTtcclxuXHRcdH0pO1xyXG5cdH0pKGZ1bmN0aW9uKHVzZXIpIHtcclxuXHRcdHZhciBtb2RhbCA9IG5ldyBNb2RhbCh7XHJcblx0XHRcdHBvc2l0aW9uOiAncmlnaHQnLFxyXG5cclxuXHRcdFx0Y29udGVudDogdGVtcGxhdGUoJ3VzZXItcHJvZmlsZS1tb2RhbCcsIHtcclxuXHRcdFx0XHR1c2VyOiB1c2VyLFxyXG5cdFx0XHR9KSxcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59OyIsIm1vZGFscy56ZXJvX2NvbW1pc3Npb25fdGlwX21vZGFsID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cclxuXHR2YXIgbW9kYWwgPSBuZXcgTW9kYWwoe1xyXG5cdFx0Y29udGVudDogdGVtcGxhdGUoJ3plcm8tY29tbWlzc2lvbi10aXAtbW9kYWwnKSxcclxuXHR9KTtcclxuXHJcblx0bW9kYWwuJGVsZW1lbnQuZmluZCgnLm1vZGFsX19jb25maXJtLWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0JCh0aGlzKS5hZGRDbGFzcygnbG9hZGluZycpO1xyXG4gICAgICAgIHVzZXJfdGlwX2NvbmZpcm1lZCgnemVyb19jb21taXNzaW9uJyk7XHJcbiAgICAgICAgbW9kYWwuY2xvc2UoKTtcclxuXHR9KTtcclxufTsiXSwic291cmNlUm9vdCI6IiJ9