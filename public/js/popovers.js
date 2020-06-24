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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/popovers/add_contract.popover.js":
/*!*******************************************************!*\
  !*** ./resources/js/popovers/add_contract.popover.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

popovers.add_contract = function (options) {
  options = options || {};
  var project = dashboard.selected_project || null;
  var popover = new Popover({
    trigger: options.trigger,
    arrow: false,
    placement: 'bottom',
    close_on_blur: false,
    content: function content(popover) {
      return template('add-contract-popover', {
        title: options.title || 'Add new Contract',
        project: project,
        id: popover.id
      });
    }
  });

  popover.initialize = function () {
    var card = null;
    var contract_type = 'HOURLY';
    var contract_payment_type = 'DIRECT';
    var milestones = [{
      title: null,
      amount: null
    }];
    var user_type = null;
    var selected_user = null;
    var user_role = null;
    var $content = popover.$element.find('.popover-content');
    var $creation_form = popover.$element.find('.popover__creation-form');
    var $creation_form_submit_button = $creation_form.find('button[type="submit"]');
    var $contractWasCreatedBlock = popover.$element.find('.popover__contract-was-created-block');
    var $contract_type_pills = popover.$element.find('.popover__contract-type-pills');
    var $name_block = popover.$element.find('.popover__user-name-block');
    var $contract_type_block = popover.$element.find('.popover__contract-type-block');
    var $contract_payment_type_pills = popover.$element.find('.popover__contract-payment-type-pills');
    var $contract_payment_type_input = popover.$element.find('input[name="contract[payment_type]"]');
    var $contract_payment_type_direct_text = popover.$element.find('.popover__contract-payment-type-direct-text');
    var $contract_payment_type_escrow_text = popover.$element.find('.popover__contract-payment-type-escrow-text');
    var $user_type_block = popover.$element.find('.popover__user-type-block');
    var $user_type_pills = popover.$element.find('.popover__user-type-pills');
    var $contract_type_input = popover.$element.find('input[name="contract[type]"]');
    var $user_type_input = popover.$element.find('input[name="contract[type]"]');
    var $contract_title_input = popover.$element.find('[name="contract[title]"]');
    var $milestone_block = popover.$element.find('.popover__milestone-block');
    var $add_milestone_button = popover.$element.find('.popover__add-milestone-button');
    var $milestone_items = popover.$element.find('.popover__milestone-items');
    var $hourly_rate_block = popover.$element.find('.popover__hourly-rate-block');
    var $hourly_rate_input = popover.$element.find('[name="contract[hourly_rate]"]');
    var $user_block = popover.$element.find('.popover__user-block');
    var $contract_details_block = popover.$element.find('.popover__contract-details-block');
    var $project_member_select = popover.$element.find('.popover-member-select');
    var $project_member_role_select = popover.$element.find('#popover-' + popover.id + '__role');
    var $project_boards_select = popover.$element.find('#popover-' + popover.id + '__boards');
    var $have_contract_text = popover.$element.find('.popover__have-contract-text');
    var $user_role_block = popover.$element.find('.popover__user-role-block');
    var $user_boards_block = popover.$element.find('.popover__boards-block');
    var $first_name_input = $creation_form.find('input[name="user[first_name]"]');
    var $last_name_input = $creation_form.find('input[name="user[last_name]"]');
    var $credit_card_block = popover.$element.find('.popover__creation-form__credit-card-block'); // ---------------------------------------------------------------------- //

    var update_contract_type_input = function update_contract_type_input() {
      contract_type = $contract_type_pills.find('.nav-link.active').attr('data-value') || null;
      $contract_type_input.val(contract_type).prop('disabled', !contract_type);
    };

    var update_contract_payment_type_input = function update_contract_payment_type_input() {
      contract_payment_type = $contract_payment_type_pills.find('.nav-link.active').attr('data-value') || null;
      $contract_payment_type_input.val(contract_payment_type).prop('disabled', !contract_payment_type);
    };

    var update_user_type_input = function update_user_type_input() {
      user_type = $user_type_pills.find('.nav-link.active').attr('data-value') || null;
      $user_type_input.val(user_type).prop('disabled', !user_type);
    }; // ---------------------------------------------------------------------- //


    var update_visibility = function update_visibility() {
      if (contract_payment_type === 'DIRECT') {
        $contract_payment_type_direct_text.addClass('show');
        $contract_payment_type_escrow_text.removeClass('show');
        $hourly_rate_block.removeClass('show');
        $milestone_block.removeClass('show');
      } else if (contract_payment_type === 'ESCROW') {
        $contract_payment_type_direct_text.removeClass('show');
        $contract_payment_type_escrow_text.addClass('show');

        if (contract_type === 'HOURLY') {
          $hourly_rate_block.addClass('show');
          $milestone_block.removeClass('show');
        } else if (contract_type === 'FIXED_PRICE') {
          $hourly_rate_block.removeClass('show');
          $milestone_block.addClass('show');
        }
      }

      if ($contract_title_input.val()) {
        $user_block.addClass('show');
      } else {
        $user_block.removeClass('show');
      }

      if (selected_user) {
        if (selected_user.id) {
          $name_block.removeClass('show');
        } else {
          $name_block.addClass('show');
        }

        $user_type_block.addClass('show'); // $contract_type_block.addClass('show');

        $contract_details_block.addClass('show');
        $user_role_block.addClass('show');
        $user_boards_block.addClass('show');
      } else {
        $name_block.removeClass('show');
        $user_type_block.removeClass('show'); // $contract_type_block.removeClass('show');

        $contract_details_block.removeClass('show');
        $user_role_block.removeClass('show');
        $user_boards_block.removeClass('show');
      }

      popover.update();
    };

    var update_focus = function update_focus(options) {
      options = options || {};
      options.after = options.after || null;

      if (!selected_user) {
        $project_member_select.data('selectize').focus();
        console.log('project member select focus');
        return;
      }

      if (!selected_user.id) {
        if (!$first_name_input.val()) {
          $first_name_input.focus();
          console.log('first name input focus');
          return;
        }

        if (!$last_name_input.val()) {
          $last_name_input.focus();
          console.log('last name input focus');
          return;
        }
      }

      if (contract_type === 'HOURLY') {
        if (!$hourly_rate_input.val()) {
          $hourly_rate_input.focus();
          return;
        }

        if (!$contract_title_input.val()) {
          $contract_title_input.focus();
          return;
        }
      } else if (contract_type === 'FIXED_PRICE') {
        if (!$contract_title_input.val()) {
          $contract_title_input.focus();
          return;
        }
      } // if (!selected_user) {
      // 	$project_member_select.data('selectize').focus();
      // 	console.log('project member select focus');
      // 	return;
      // }
      //
      // if ([ 'selected_user', 'user_type', 'user_role' ].indexOf(options.after) > -1) {
      // 	if (!selected_user.id) {
      // 		if (!$first_name_input.val()) {
      // 			$first_name_input.focus();
      // 			console.log('first name input focus');
      // 			return;
      // 		}
      //
      // 		if (!$last_name_input.val()) {
      // 			$last_name_input.focus();
      // 			console.log('last name input focus');
      // 			return;
      // 		}
      // 	}
      // }
      // if (!selected_user.contract) {
      //
      // }
      //


      console.log('nothing to focus :C');
    };

    var update_visibility_and_focus = function update_visibility_and_focus(options) {
      update_visibility(options);
      update_focus(options);
    }; // ---------------------------------------------------------------------- //


    $contract_payment_type_pills.find('.nav-link').click(function (event) {
      event.preventDefault();
      $contract_payment_type_pills.find('.nav-link').removeClass('active');
      $(this).addClass('active');
      update_contract_payment_type_input();
      update_visibility_and_focus({
        after: 'contract_payment_type'
      });
    });
    update_contract_payment_type_input();
    $contract_type_pills.find('.nav-link').click(function (event) {
      event.preventDefault();
      $contract_type_pills.find('.nav-link').removeClass('active');
      $(this).addClass('active');
      update_contract_type_input();
      update_visibility_and_focus();
    });
    update_contract_type_input();
    $user_type_pills.find('.nav-link').click(function (event) {
      event.preventDefault();
      $user_type_pills.find('.nav-link').removeClass('active');
      $(this).addClass('active');
      update_user_type_input();
      update_visibility_and_focus();
    });
    $contract_title_input.on('input', function () {
      update_visibility();
    });
    $project_member_select.removeClass('custom-select').selectize({
      valueField: 'id',
      searchField: ['email', 'full_name', 'slug'],
      placeholder: __('popovers.add_contract.enter_name_username_or_email'),
      render: {
        item: function item(_item, escape) {
          return '<div class="selectize-item + is-user ' + (_item.is_selected ? 'is-selected' : '') + '">' + (_item.image ? '<img class="selectize-item__image" src="' + _item.image.urls.tiny + '" alt="">' : '') + '<span class="selectize-item__title">' + (_item.full_name ? escape(_item.full_name) + ' (' + _item.slug + ')' : _item.slug) + '</span>' + '</div>';
        },
        option: function option(item, escape) {
          return '<div class="' + 'selectize-item + is-user ' + (item.contract ? 'has-description is-disabled' : '') + '">' + (item.image ? '<img class="selectize-item__image" src="' + item.image.urls.tiny + '" alt="">' : '') + '<span class="selectize-item__title">' + (item.full_name ? escape(item.full_name) + ' (' + item.slug + ')' : item.slug) + '</span>' + (item.contract ? '<span class="selectize-item__description">(already has a Contract with you)</span>' : '') + '</div>';
        }
      },
      load: function load(query, callback) {
        this.clearOptions();
        return request({
          url: '/users/autocomplete',
          data: {
            inviting_project_id: project.id,
            query: query
          }
        }, function (response) {
          return callback(response.data);
        });
      },
      onChange: function onChange(item_id) {
        if (!item_id) {
          selected_user = null;
          $creation_form.find('[name="user[id]"]').prop('disabled', true);
          $creation_form.find('[name="user[email]"]').prop('disabled', true);
          update_visibility_and_focus();
          return;
        }

        selected_user = this.options[item_id];

        if (!selected_user.id) {
          var email_parts = selected_user.email.split(/@/)[0].split(/[^a-z0-9]+/i);
          $creation_form.val(email_parts[0] || '');
          $creation_form.val(email_parts[1] || '');
        }

        if (selected_user.contract) {
          $have_contract_text.find('.popover__have-contract-text__hourly-rate').text(selected_user.contract.hourly_rate);
        } else {
          $hourly_rate_input.val(selected_user.hourly_rate || '');
          $contract_title_input.val(selected_user.professional_title || '');
        }

        update_visibility_and_focus({
          after: 'selected_user'
        });
      },
      onInitialize: function onInitialize() {
        var selectize = this;
        selectize.$control_input.attr('autocomplete', 'st-disabled');
        selectize.$control_input.focus();
        selectize.$control_input.on('input', function () {
          var original_value = $(this).val();
          var fixed_value = $(this).val().replace(/^mailto:/, '');

          if (original_value !== fixed_value) {
            $(this).val(fixed_value);
          }
        });
      }
    });
    $project_member_role_select.removeClass('custom-select').selectize({
      valueField: 'value',
      // searchField: [ 'email', 'full_name', 'slug' ],
      // placeholder: 'Enter role name',
      render: {
        item: function item(_item2, escape) {
          return '<div class="selectize-item + is-project-role">' + '<span class="selectize-item__title">' + _item2.title + '</span>' + '</div>';
        },
        option: function option(item, escape) {
          return '<div class="selectize-item + is-project-role">' + '<span class="selectize-item__title">' + item.title + '</span>' + '<span class="selectize-item__description">' + item.description + '</span>' + '</div>';
        }
      },
      onChange: function onChange(item_id) {
        user_role = item_id;
        update_visibility_and_focus({
          after: 'user_role'
        });
      },
      onInitialize: function onInitialize() {
        var selectize = this;
        selectize.addOption({
          value: 'CONTRACTOR',
          title: __('common.project_members.roles.CONTRACTOR.extra_title'),
          description: __('common.project_members.roles.CONTRACTOR.description')
        });

        if (project.pivot.role == 'OWNER') {
          selectize.addOption({
            value: 'ADMINISTRATOR',
            title: __('common.project_members.roles.ADMINISTRATOR.extra_title'),
            description: __('common.project_members.roles.ADMINISTRATOR.description')
          });
        }

        selectize.addItem('CONTRACTOR');
        selectize.$control_input.css('visibility', 'hidden');
        selectize.$control_input.on('input', function (event) {
          event.preventDefault();
          event.stopPropagation();
          return false;
        });
      }
    });
    $project_boards_select.removeClass('custom-select').selectize({
      plugins: ['remove_button']
    }); // ---------------------------------------------------------------------- //

    function initialize_milestone_item() {
      var $self = $(this);
      var index = parseInt($self.attr('data-index'));
      var milestone = milestones[index];
      $self.find('input[name="contract[milestones][' + index + '][title]"]').on('input', function () {
        milestone.title = $(this).val();
      });
      $self.find('input[name="contract[milestones][' + index + '][amount]"]').on('input', function () {
        milestone.amount = parseFloat($(this).val()); // console.log(milestone);
      });
      $self.find('.popover__milestone-item__remove-button').click(function () {
        var index = parseInt($self.attr('data-index'));
        milestones.splice(index, 1);
        render_milestones();
      });
    }

    function render_milestones() {
      $milestone_items.html('');
      milestones.forEach(function (milestone, milestone_index) {
        $(template('invite-project-member-popover-milestone-item', {
          id: popover.id,
          index: milestone_index,
          title: milestone.title,
          amount: milestone.amount
        })).each(initialize_milestone_item).appendTo($milestone_items);
      });
    }

    render_milestones();
    $add_milestone_button.click(function (event) {
      event.preventDefault();
      milestones.push({
        title: null,
        amount: null
      });
      render_milestones();
      $content.scrollTop($content[0].scrollHeight);
      $milestone_items.children().last().find('input:first').focus();
    });
    $creation_form.submit(function (event) {
      event.preventDefault();

      if (!selected_user) {
        $project_member_select.data('selectize').$control_input.focus();
        return;
      }

      if ($creation_form_submit_button.hasClass('is-loading')) {
        return;
      }

      $creation_form_submit_button.addClass('is-loading disabled');

      if (project.pivot.role === 'OWNER' && user_type === 'EMPLOYER') {
        popover.$element.find('[name="project_member[role]"]').val('OWNER');
      } else {
        popover.$element.find('[name="project_member[role]"]').val($project_member_role_select.val());
      }

      return function (callback) {
        if (!contract_type || !$credit_card_block.hasClass('show')) {
          return callback();
        }

        return stripe.createToken(card).then(function (result) {
          if (result.error) {
            $creation_form_submit_button.removeClass('is-loading disabled');
            $creation_form.find('.stripe-card-errors').text(result.error.message).removeClass('d-none');
            return;
          }

          $creation_form.find('.stripe-card-errors').addClass('d-none');
          $creation_form.find('[name="stripe_token_id"]').val(result.token.id);
          return callback();
        });
      }(function () {
        return request({
          method: 'POST',
          url: '/projects/' + project.id + '/invite_member',
          data: $creation_form.serialize()
        }, function (response) {
          $creation_form_submit_button.removeClass('is-loading disabled');

          if (new Validator($creation_form, response).fails()) {
            return;
          }

          if (response.error) {
            $.notify(response.error, 'error');
            return;
          }

          var project_member = project.members.filter(function (current_project_member) {
            return current_project_member.id === response.data.id;
          })[0] || null;

          if (!project_member) {
            project_member = response.data;
            project.members.push(project_member);
          }

          project.renderMembers();
          dashboard.selected_board && function () {
            var board_member = response.data.board_members.filter(function (board_member) {
              return dashboard.selected_board.id == board_member.board_id;
            })[0] || null;

            if (!board_member) {
              return;
            }

            board_member.user = response.data.user;
            board_member.project_member = Object.assign({}, project_member);
            dashboard.selected_board.members.push(board_member);
            dashboard.selected_board.renderMembers();
          }();
          $creation_form.removeClass('show');
          $contractWasCreatedBlock.addClass('show');
        });
      });
    });
    update_visibility();
  };

  popover.shown = function () {// update_focus();
  };
};

/***/ }),

/***/ "./resources/js/popovers/create_new_project.popover.js":
/*!*************************************************************!*\
  !*** ./resources/js/popovers/create_new_project.popover.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

popovers.create_new_project = function (options) {
  options = options || {};
  var popover = new Popover({
    trigger: options.trigger,
    arrow: false,
    placement: 'bottom',
    content: function content() {
      return template('create-new-project-popover', {});
    }
  });

  popover.initialize = function () {
    popover.$element.find('input:first').focus();
    var $form = popover.$element.find('.popover__form');
    var $submit_button = $form.find('button[type="submit"]');
    $form.submit(function (event) {
      event.preventDefault();
      $submit_button.addClass('is-loading');
      request({
        method: 'POST',
        url: '/projects/create',
        data: $form.serialize()
      }, function (response) {
        $submit_button.removeClass('is-loading');

        if (response.error) {
          $.notify(response.error, 'error');
          return;
        }

        $submit_button.addClass('is-loading');
        window.location.href = '/dashboard/projects/' + response.data.id;
      });
    });
  };

  popover.shown = function () {//
  };
};

/***/ }),

/***/ "./resources/js/popovers/extra_project_menu.popover.js":
/*!*************************************************************!*\
  !*** ./resources/js/popovers/extra_project_menu.popover.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

popovers.extra_project_menu = function (options) {
  options = options || {};
  var project = options.project;
  var popover = new Popover({
    trigger: options.trigger,
    arrow: false,
    placement: 'bottom',
    content: function content() {
      return template('extra-project-menu-popover', {
        project: project
      });
    }
  });

  popover.initialize = function () {
    popover.$element.find('.popover-list-item.is-leave-project').click(function (event) {
      event.preventDefault();
      modals.confirm_action({
        question: __('popovers.board_menu.leave_project'),
        confirm: function confirm(close_modal) {
          return request({
            url: '/projects/' + project.id + '/leave'
          }, function (response) {
            if (response.error) {
              $.notify(response.error, 'error');
              return;
            }

            $.notify(__('popovers.board_menu.leave_success'), 'success');
            window.location.href = "/dashboard";
          });
        }
      });
    });
    popover.$element.find('.popover-list-item.is-close-project').click(function (event) {
      event.preventDefault();
      modals.confirm_action({
        question: __('popovers.board_menu.sure_close_project'),
        confirm: function confirm(close_modal) {
          return request({
            url: '/projects/' + project.id + '/close'
          }, function (response) {
            if (response.error) {
              $.notify(response.error, 'error');
              return;
            }

            $.notify(__('popovers.board_menu.project_closed'), 'success');
            window.location.href = '/dashboard';
          });
        }
      });
    });
  };

  return popover;
};

/***/ }),

/***/ "./resources/js/popovers/invite_project_member.popover.js":
/*!****************************************************************!*\
  !*** ./resources/js/popovers/invite_project_member.popover.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

popovers.invite_project_member = function (options) {
  options = options || {};
  var project = options.project;
  var popover = new Popover({
    trigger: options.trigger,
    arrow: false,
    placement: 'bottom',
    close_on_blur: false,
    content: function content(popover) {
      return template('invite-project-member-popover', {
        title: options.title || 'Invite a new Member',
        project: project,
        id: popover.id
      });
    }
  });

  popover.initialize = function () {
    var card = null;
    var selected_user = null;
    var user_type = null;
    var user_role = null;
    var contract_type = 'HOURLY';
    var contract_payment_type = 'DIRECT';
    var milestones = [{
      title: null,
      amount: null
    }];
    var $content = popover.$element.find('.popover-content');
    var $user_type_block = popover.$element.find('.popover__user-type-block');
    var $user_type_pills = popover.$element.find('.popover__user-type-pills');
    var $contract_type_pills = popover.$element.find('.popover__contract-type-pills');
    var $contract_type_input = popover.$element.find('input[name="contract[type]"]');
    var $contract_payment_type_pills = popover.$element.find('.popover__contract-payment-type-pills');
    var $contract_payment_type_input = popover.$element.find('input[name="contract[payment_type]"]');
    var $contract_payment_type_direct_text = popover.$element.find('.popover__contract-payment-type-direct-text');
    var $contract_payment_type_escrow_text = popover.$element.find('.popover__contract-payment-type-escrow-text');
    var $user_type_freelancer_text = popover.$element.find('.popover__user-type-freelancer-text');
    var $user_type_employer_text = popover.$element.find('.popover__user-type-employer-text');
    var $payment_type_direct_text = popover.$element.find('.popover_payment_type_direct_text');
    var $payment_type_escrow_text = popover.$element.find('.popover_payment_type_escrow_text');
    var $invitation_form = popover.$element.find('.popover__invitation-form');
    var $member_was_added_block = $('.popover__member-was-added-block');
    var $member_was_added_block_close_button = $('.popover__member-was-added-block__close-button');
    var $project_member_select = popover.$element.find('.popover-member-select');
    var $project_member_role_select = popover.$element.find('#popover-' + popover.id + '__role');
    var $role_block = popover.$element.find('.popover__invitation-form__role-block');
    var $boards_block = popover.$element.find('.popover__invitation-form__boards-block');
    var $project_boards_select = popover.$element.find('#popover-' + popover.id + '__boards');
    var $invitation_form_submit_button = $invitation_form.find('button[type="submit"]');
    var $invitation_parameters_block = popover.$element.find('.popover__invitation-parameters-block');
    var $first_name_input = popover.$element.find('input[name="user[first_name]"]');
    var $last_name_input = popover.$element.find('input[name="user[last_name]"]');
    var $name_block = popover.$element.find('.popover__invitation-form__name-block');
    var $contract_block = popover.$element.find('.popover__contract-block');
    var $contract_details_block = popover.$element.find('.popover__contract-details-block');
    var $hourly_rate_block = popover.$element.find('.popover__invitation-form__hourly-rate-block');
    var $credit_card_block = popover.$element.find('.popover__invitation-form__credit-card-block');
    var $hourly_rate_input = popover.$element.find('[name="contract[hourly_rate]"]');
    var $contract_title_input = popover.$element.find('[name="contract[title]"]');
    var $have_contract_text = popover.$element.find('.popover__have-contract-text');
    var $milestone_block = popover.$element.find('.popover__milestone-block');
    var $add_milestone_button = popover.$element.find('.popover__add-milestone-button');
    var $milestone_items = popover.$element.find('.popover__milestone-items'); // ---------------------------------------------------------------------- //

    var update_contract_type_input = function update_contract_type_input() {
      contract_type = $contract_type_pills.find('.nav-link.active').attr('data-value') || null;
      $contract_type_input.val(contract_type).prop('disabled', !contract_type);
    };

    var update_contract_payment_type_input = function update_contract_payment_type_input() {
      contract_payment_type = $contract_payment_type_pills.find('.nav-link.active').attr('data-value') || null;
      $contract_payment_type_input.val(contract_payment_type).prop('disabled', !contract_payment_type);
    }; // ---------------------------------------------------------------------- //


    var update_visibility = function update_visibility() {
      $user_type_block.toggleClass('d-none', project.pivot.role != 'OWNER');

      if (user_type === 'FREELANCER') {
        $user_type_freelancer_text.addClass('show');
        $user_type_employer_text.removeClass('show');
      } else if (user_type === 'EMPLOYER') {
        $user_type_freelancer_text.removeClass('show');
        $user_type_employer_text.addClass('show');
      }

      if (selected_user) {
        $invitation_parameters_block.addClass('show');

        if (selected_user.id) {
          $invitation_form.find('[name="user[id]"]').prop('disabled', false).val(selected_user.id);
          $invitation_form.find('[name="user[email]"]').prop('disabled', true);
        } else {
          $invitation_form.find('[name="user[id]"]').prop('disabled', true);
          $invitation_form.find('[name="user[email]"]').prop('disabled', false).val(selected_user.email);
        }

        if (project.pivot.role === 'OWNER' && user_type === 'FREELANCER') {
          $role_block.addClass('show');
        } else {
          $role_block.removeClass('show');
        }

        if (project.pivot.role === 'OWNER' && user_type === 'FREELANCER' && user_role === 'CONTRACTOR') {
          $boards_block.addClass('show');
        } else {
          $boards_block.removeClass('show');
        }

        if (selected_user.id) {
          $name_block.removeClass('show');
        } else {
          $name_block.addClass('show');
        }

        if (project.pivot.role === 'OWNER') {
          if (user_type === 'FREELANCER') {
            if (selected_user.contract) {
              $contract_block.removeClass('show');
            } else {
              $contract_block.addClass('show');
            }
          } else if (user_type === 'EMPLOYER') {
            $contract_block.removeClass('show');
          }
        } else {
          $contract_block.removeClass('show');
        }

        if (contract_payment_type === 'DIRECT') {
          $contract_payment_type_direct_text.addClass('show');
          $contract_payment_type_escrow_text.removeClass('show');
          $hourly_rate_block.removeClass('show');
          $milestone_block.removeClass('show');
          $contract_details_block.addClass('show');
        } else if (contract_payment_type === 'ESCROW') {
          $contract_payment_type_direct_text.removeClass('show');
          $contract_payment_type_escrow_text.addClass('show');

          if (contract_type === 'HOURLY') {
            $contract_details_block.addClass('show');
            $hourly_rate_block.addClass('show');
            $milestone_block.removeClass('show');
          } else if (contract_type === 'FIXED_PRICE') {
            $contract_details_block.addClass('show');
            $hourly_rate_block.removeClass('show');
            $milestone_block.addClass('show');
          } else {
            $contract_details_block.removeClass('show');
          }
        }

        if (selected_user.contract) {
          $have_contract_text.removeClass('d-none');
        } else {
          $have_contract_text.addClass('d-none');
        }

        if (!auth.user.default_credit_card && ['HOURLY', 'FIXED_PRICE'].indexOf(contract_type) > -1 && contract_payment_type === 'ESCROW') {
          $credit_card_block.addClass('show');
        } else {
          $credit_card_block.removeClass('show');
        }
      } else {
        $invitation_parameters_block.removeClass('show'); // $project_member_select.data('selectize').focus();
      }

      popover.update();
    };

    var update_focus = function update_focus(options) {
      options = options || {};
      options.after = options.after || null;

      if (!selected_user) {
        $project_member_select.data('selectize').focus();
        console.log('project member select focus');
        return;
      }

      if (['selected_user', 'user_type', 'user_role'].indexOf(options.after) > -1) {
        if (!selected_user.id) {
          if (!$first_name_input.val()) {
            $first_name_input.focus();
            console.log('first name input focus');
            return;
          }

          if (!$last_name_input.val()) {
            $last_name_input.focus();
            console.log('last name input focus');
            return;
          }
        }
      }

      if (!selected_user.contract) {
        if (contract_payment_type === 'DIRECT') {
          if (!$contract_title_input.val()) {
            $contract_title_input.focus();
            return;
          }
        } else {
          if (contract_type === 'HOURLY') {
            if (!$hourly_rate_input.val()) {
              $hourly_rate_input.focus();
              return;
            }

            if (!$contract_title_input.val()) {
              $contract_title_input.focus();
              return;
            }
          } else if (contract_type === 'FIXED_PRICE') {
            if (!$contract_title_input.val()) {
              $contract_title_input.focus();
              return;
            }
          } else {//
          }
        }
      } //


      console.log('nothing to focus :C');
    };

    var update_visibility_and_focus = function update_visibility_and_focus(options) {
      update_visibility(options);
      update_focus(options);
    }; // ---------------------------------------------------------------------- //


    $contract_payment_type_pills.find('.nav-link').click(function (event) {
      event.preventDefault();
      $contract_payment_type_pills.find('.nav-link').removeClass('active');
      $(this).addClass('active');
      update_contract_payment_type_input();
      update_visibility_and_focus({
        after: 'contract_payment_type'
      });
    });
    update_contract_payment_type_input();
    $user_type_pills.find('.nav-link').click(function (event) {
      event.preventDefault();
      $user_type_pills.find('.nav-link').removeClass('active');
      $(this).addClass('active');
      user_type = $(this).attr('data-value');
      update_visibility_and_focus();
    });
    user_type = $user_type_pills.find('.nav-link.active').attr('data-value'); // $contract_type_pills.find('.nav-link').click(function(event) {
    // 	event.preventDefault();
    // 	$contract_type_pills.find('.nav-link').removeClass('active');
    // 	$(this).addClass('active');
    // });

    $project_member_select.removeClass('custom-select').selectize({
      valueField: 'id',
      searchField: ['email', 'full_name', 'slug'],
      placeholder: __('popovers.invite_project_member.enter_name_username_or_email'),
      render: {
        item: function item(_item, escape) {
          return '<div class="selectize-item + is-user ' + (_item.is_selected ? 'is-selected' : '') + '">' + (_item.image ? '<img class="selectize-item__image" src="' + _item.image.urls.tiny + '" alt="">' : '') + '<span class="selectize-item__title">' + (_item.full_name ? escape(_item.full_name) + ' (' + _item.slug + ')' : _item.slug) + '</span>' + '</div>';
        },
        option: function option(item, escape) {
          return '<div class="' + 'selectize-item + is-user ' + (item.is_joined_project ? 'has-description is-disabled' : '') + '">' + (item.image ? '<img class="selectize-item__image" src="' + item.image.urls.tiny + '" alt="">' : '') + '<span class="selectize-item__title">' + (item.full_name ? escape(item.full_name) + ' (' + item.slug + ')' : item.slug) + '</span>' + (item.is_joined_project ? '<span class="selectize-item__description">(already joined)</span>' : '') + '</div>';
        }
      },
      load: function load(query, callback) {
        this.clearOptions();
        return request({
          url: '/users/autocomplete',
          data: {
            inviting_project_id: project.id,
            query: query
          }
        }, function (response) {
          return callback(response.data);
        });
      },
      onChange: function onChange(item_id) {
        if (!item_id) {
          selected_user = null;
          $invitation_form.find('[name="user[id]"]').prop('disabled', true);
          $invitation_form.find('[name="user[email]"]').prop('disabled', true);
          update_visibility_and_focus();
          return;
        }

        selected_user = this.options[item_id];

        if (!selected_user.id) {
          var email_parts = selected_user.email.split(/@/)[0].split(/[^a-z0-9]+/i);
          $first_name_input.val(email_parts[0] || '');
          $last_name_input.val(email_parts[1] || '');
        }

        if (selected_user.contract) {
          $have_contract_text.find('.popover__have-contract-text__hourly-rate').text(selected_user.contract.hourly_rate);
        } else {
          $hourly_rate_input.val(selected_user.hourly_rate || '');
          $contract_title_input.val(selected_user.professional_title || '');
        }

        update_visibility_and_focus({
          after: 'selected_user'
        });
      },
      onInitialize: function onInitialize() {
        var selectize = this;
        selectize.$control_input.attr('autocomplete', 'st-disabled');
        selectize.$control_input.focus();
        selectize.$control_input.on('input', function () {
          var original_value = $(this).val();
          var fixed_value = $(this).val().replace(/^mailto:/, '');

          if (original_value != fixed_value) {
            $(this).val(fixed_value);
          }
        });
      }
    });
    $project_member_role_select.removeClass('custom-select').selectize({
      valueField: 'value',
      // searchField: [ 'email', 'full_name', 'slug' ],
      // placeholder: 'Enter role name',
      render: {
        item: function item(_item2, escape) {
          return '<div class="selectize-item + is-project-role">' + '<span class="selectize-item__title">' + _item2.title + '</span>' + '</div>';
        },
        option: function option(item, escape) {
          return '<div class="selectize-item + is-project-role">' + '<span class="selectize-item__title">' + item.title + '</span>' + '<span class="selectize-item__description">' + item.description + '</span>' + '</div>';
        }
      },
      onChange: function onChange(item_id) {
        user_role = item_id;
        update_visibility_and_focus({
          after: 'user_role'
        });
      },
      onInitialize: function onInitialize() {
        var selectize = this;
        selectize.addOption({
          value: 'CONTRACTOR',
          title: __('common.project_members.roles.CONTRACTOR.extra_title'),
          description: __('common.project_members.roles.CONTRACTOR.description')
        });

        if (project.pivot.role == 'OWNER') {
          selectize.addOption({
            value: 'ADMINISTRATOR',
            title: __('common.project_members.roles.ADMINISTRATOR.extra_title'),
            description: __('common.project_members.roles.ADMINISTRATOR.description')
          });
        }

        selectize.addItem('CONTRACTOR');
        selectize.$control_input.css('visibility', 'hidden');
        selectize.$control_input.on('input', function (event) {
          event.preventDefault();
          event.stopPropagation();
          return false;
        });
      }
    });
    $project_boards_select.removeClass('custom-select').selectize({
      plugins: ['remove_button']
    });
    $contract_type_pills.find('.nav-link').click(function (event) {
      event.preventDefault();
      $contract_type_pills.find('.nav-link').removeClass('active');
      $(this).addClass('active');
      update_contract_type_input();
      update_visibility_and_focus({
        after: 'contract_type'
      });
    });
    update_contract_type_input(); // $contract_block.toggleClass('show', project.pivot.role == 'OWNER');
    // $invitation_parameters_block.on('shown.bs.collapse', function() {
    // 	$invitation_parameters_block.find('input[type="text"], input[type="number"]').each(function() {
    // 		if (!$(this).val() && $(this).is(':visible')) {
    // 			$(this).focus();
    // 			return false;
    // 		}
    // 	});
    // });
    // $is_time_trackable_checkbox.on('change', function() {
    // 	if ($is_time_trackable_checkbox.prop('checked')) {
    // 		$with_protection_text.removeClass('d-none');
    // 		$without_protection_text.addClass('d-none');
    // 	} else {
    // 		$with_protection_text.addClass('d-none');
    // 		$without_protection_text.removeClass('d-none');
    // 	}
    // 	if ($is_time_trackable_checkbox.prop('checked') && !selected_user.contract) {
    // 		$hourly_rate_block.collapse('show');
    // 		$hourly_rate_input.focus();
    // 	} else {
    // 		$hourly_rate_block.collapse('hide');
    // 	}
    // });
    // popover.$element.find('.popover__invitation-form__message').on('input', function(event) {
    // 	event.preventDefault();
    // 	$(this).innerHeight(0);
    // 	$(this).innerHeight(this.scrollHeight);
    // });
    // ---------------------------------------------------------------------- //

    function initialize_milestone_item() {
      var $self = $(this);
      var index = parseInt($self.attr('data-index'));
      var milestone = milestones[index];
      $self.find('input[name="contract[milestones][' + index + '][title]"]').on('input', function () {
        milestone.title = $(this).val();
      });
      $self.find('input[name="contract[milestones][' + index + '][amount]"]').on('input', function () {
        milestone.amount = parseFloat($(this).val()); // console.log(milestone);
      });
      $self.find('.popover__milestone-item__remove-button').click(function () {
        var index = parseInt($self.attr('data-index'));
        milestones.splice(index, 1);
        render_milestones();
      });
    }

    function render_milestones() {
      $milestone_items.html('');
      milestones.forEach(function (milestone, milestone_index) {
        $(template('invite-project-member-popover-milestone-item', {
          id: popover.id,
          index: milestone_index,
          title: milestone.title,
          amount: milestone.amount
        })).each(initialize_milestone_item).appendTo($milestone_items);
      });
    }

    render_milestones();
    $add_milestone_button.click(function (event) {
      event.preventDefault();
      milestones.push({
        title: null,
        amount: null
      });
      render_milestones();
      $content.scrollTop($content[0].scrollHeight);
      $milestone_items.children().last().find('input:first').focus();
    });

    (function initialize_stripe_input() {
      var elements = stripe.elements();
      var style = {
        base: {
          color: '#32325d',
          lineHeight: '18px',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': {
            color: '#aab7c4'
          }
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a'
        }
      };
      card = elements.create('card', {
        style: style
      });
      card.mount(popover.$element.find('.stripe-card-element')[0] || null);
      card.addEventListener('change', function (event) {
        if (event.error) {
          popover.$element.find('.stripe-card-errors').text(event.error.message).removeClass('d-none');
        } else {
          popover.$element.find('.stripe-card-errors').text('').addClass('d-none');
        }
      });
    })();

    $invitation_form.submit(function (event) {
      event.preventDefault();

      if (!selected_user) {
        $project_member_select.data('selectize').$control_input.focus();
        return;
      }

      if ($invitation_form_submit_button.hasClass('is-loading')) {
        return;
      }

      $invitation_form_submit_button.addClass('is-loading disabled');

      if (project.pivot.role == 'OWNER' && user_type == 'EMPLOYER') {
        popover.$element.find('[name="project_member[role]"]').val('OWNER');
      } else {
        popover.$element.find('[name="project_member[role]"]').val($project_member_role_select.val());
      }

      return function (callback) {
        if (!$contract_block.hasClass('show')) {
          return callback();
        }

        if (!contract_type || !$credit_card_block.hasClass('show')) {
          return callback();
        }

        return stripe.createToken(card).then(function (result) {
          if (result.error) {
            $invitation_form_submit_button.removeClass('is-loading disabled');
            $invitation_form.find('.stripe-card-errors').text(result.error.message).removeClass('d-none');
            return;
          }

          $invitation_form.find('.stripe-card-errors').addClass('d-none');
          $invitation_form.find('[name="stripe_token_id"]').val(result.token.id);
          return callback();
        });
      }(function () {
        return request({
          method: 'POST',
          url: '/projects/' + project.id + '/invite_member',
          data: $invitation_form.serialize()
        }, function (response) {
          $invitation_form_submit_button.removeClass('is-loading disabled');

          if (new Validator($invitation_form, response).fails()) {
            return;
          }

          if (response.error) {
            $.notify(response.error, 'error');
            return;
          }

          var project_member = project.members.filter(function (current_project_member) {
            return current_project_member.id == response.data.id;
          })[0] || null;

          if (!project_member) {
            project_member = response.data;
            project.members.push(project_member);
          }

          project.renderMembers();
          dashboard.selected_board && function () {
            var board_member = response.data.board_members.filter(function (board_member) {
              return dashboard.selected_board.id == board_member.board_id;
            })[0] || null;

            if (!board_member) {
              return;
            }

            board_member.user = response.data.user;
            board_member.project_member = Object.assign({}, project_member);
            dashboard.selected_board.members.push(board_member);
            dashboard.selected_board.renderMembers();
          }();
          $invitation_form.removeClass('show');
          $member_was_added_block.addClass('show');
        });
      });
    });
    $member_was_added_block_close_button.click(function (event) {
      event.preventDefault();
      popover.close();
    });
    update_visibility();
  };

  popover.shown = function () {
    update_focus();
  };
};

/***/ }),

/***/ "./resources/js/popovers/manage_project_board_members.popover.js":
/*!***********************************************************************!*\
  !*** ./resources/js/popovers/manage_project_board_members.popover.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

popovers.manage_project_board_members = function (options) {
  options = options || {};
  var popover = new Popover({
    trigger: options.trigger,
    arrow: false,
    content: function content() {
      return template('manage-project-board-members-popover', {
        title: options.title || 'Members',
        project: options.project,
        project_board: options.project_board
      });
    }
  });

  popover.initialize = function () {
    var project = options.project;
    var project_board = options.project_board;
    var $member_select = popover.$element.find('.popover-member-select');
    var $member_list = popover.$element.find('.popover-member-list');
    var $invitation_form = popover.$element.find('.popover__invitation-form');
    var $invitation_form_button = $invitation_form.find('button[type="submit"]');
    $member_select.removeClass('custom-select').selectize({
      closeAfterSelect: false,
      selectOnTab: false,
      valueField: 'id',
      searchField: ['slug', 'full_name', 'email'],
      placeholder: ['OWNER', 'ADMINISTRATOR'].indexOf(project.pivot.role) > -1 ? __('popovers.manage_project_board_members.enter_name_username_or_email') : __('popovers.manage_project_board_members.enter_name_or_username'),
      render: {
        option: function option(item, escape) {
          console.log(item);
          return '<div class="selectize-item + is-user ' + (item.is_selected ? 'is-selected' : '') + ' ' + (item.is_disabled ? 'is-disabled' : '') + '">' + '<img class="selectize-item__image" src="https://image.flaticon.com/icons/svg/236/236831.svg" alt="">' + '<span class="selectize-item__title">' + escape(item.title) + '</span>' + '</div>';
        }
      },
      onInitialize: function onInitialize() {
        var selectize = this;
        selectize.selected_items = [];
        selectize.$control_input.attr('autocomplete', 'st-disabled');
        selectize.$dropdown.off('mousedown');
        selectize.addOption(project.members.map(function (project_member) {
          var is_selected = project_board.members.some(function (project_board_member) {
            return project_member.user_id == project_board_member.user_id;
          });
          return Object.assign({}, project_member.user, {
            is_selected: is_selected,
            is_disabled: ['OWNER', 'ADMINISTRATOR'].indexOf(project_member.role) > -1
          });
        }));
        selectize.selected_items = project.members.filter(function (project_member) {
          return project_board.members.some(function (project_board_member) {
            return project_member.user_id == project_board_member.user_id;
          });
        }).map(function (project_member) {
          return String(project_member.user_id);
        });

        selectize.setTextboxValue = function () {};

        selectize.setActiveOption = function () {};

        selectize.addItem = function (item_id) {
          if (selectize.$wrapper.hasClass('loading')) {
            return;
          }

          var $option = selectize.getOption(item_id);

          if (selectize.selected_items.indexOf(item_id) > -1) {
            selectize.selected_items.splice(selectize.selected_items.indexOf(item_id), 1);
            $option.removeClass('is-selected');
            selectize.$wrapper.addClass('loading');
            request({
              url: '/project_boards/' + project_board.id + '/member_users/' + item_id + '/remove'
            }, function (response) {
              selectize.$wrapper.removeClass('loading');

              if (response.error) {
                $.notify(response.error, 'error');
                $option.addClass('is-selected');
                return;
              }

              options.board_updated({
                project_board_members: response.data.members // project_members: response.data.project.members,

              });
            });
          } else {
            selectize.selected_items.push(item_id);
            $option.addClass('is-selected');
            selectize.$wrapper.addClass('loading');
            request({
              url: '/project_boards/' + project_board.id + '/member_users/' + item_id + '/add'
            }, function (response) {
              selectize.$wrapper.removeClass('loading');

              if (response.error) {
                $.notify(response.error, 'error');
                $option.removeClass('is-selected');
                return;
              }

              options.board_updated({
                project_board_members: response.data.members // project_members: response.data.project.members,

              });
            });
          }
        };

        selectize.onKeyDown = function (event) {
          if (event.keyCode === 13 && !$invitation_form.hasClass('d-none')) {
            $invitation_form.submit();
          }
        };

        selectize.open();
        setTimeout(function () {
          popover.update();
        });
      },
      onType: function onType(value) {
        var selectize = this;
        var is_email = /^\S+@\S+\.\S+$/.test(value);
        var has_results = this.currentResults.items.length > 0;
        selectize.$dropdown.toggleClass('is-hidden', !has_results);
        popover.$element.find('.popover__no-members-message').toggleClass('d-none', has_results); // popover.$element.find('.popover__no-members-message').toggleClass('d-none', has_results || is_email);
        // $invitation_form.toggleClass('d-none', has_results || !is_email);
        // if (!has_results && is_email) {
        // 	var email_parts = value.split(/@/)[0].split(/[^a-z0-9]+/i);
        // 	$invitation_form.find('input[name="user[first_name]"]').val(email_parts[0] || '');
        // 	$invitation_form.find('input[name="user[last_name]"]').val(email_parts[1] || '');
        // 	$invitation_form.find('input[name="user[email]"]').val(value);
        // }

        popover.fix();
      }
    });
    $invitation_form.submit(function (event) {
      event.preventDefault();

      if ($invitation_form_button.hasClass('is-loading')) {
        return;
      }

      $invitation_form_button.addClass('is-loading disabled');
      request({
        method: 'POST',
        url: '/project_boards/' + project_board.id + '/member_users/invite',
        data: $invitation_form.serialize()
      }, function (response) {
        $invitation_form_button.removeClass('is-loading disabled');

        if (response.error) {
          $.notify(response.error, 'error');
          return;
        }

        options.task_updated({
          project_board_members: response.data.members,
          project_members: response.data.project.members
        });
        var selectize = $member_select.data('selectize');
        selectize.$control_input.val('');
        $invitation_form.find('input').val('');
        $invitation_form.addClass('d-none');
        selectize.open();
        selectize.clearOptions();
        selectize.addOption(response.data.project.members.map(function (project_member) {
          var is_selected = response.data.members.some(function (project_board_member) {
            return project_member.user_id == project_board_member.user_id;
          });
          return Object.assign({}, project_member.user, {
            is_selected: is_selected
          });
        }));
      });
    });
    $invitation_form.on('keypress', function (event) {
      event.keyCode === 13 && $invitation_form.submit();
    });
    $invitation_form.find('button[type="submit"]').click(function (event) {
      $invitation_form.submit();
    });
  };

  return popover;
};

/***/ }),

/***/ "./resources/js/popovers/manage_project_task_members.popover.js":
/*!**********************************************************************!*\
  !*** ./resources/js/popovers/manage_project_task_members.popover.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

popovers.manage_project_task_members = function (options) {
  options = options || {};
  var popover = new Popover({
    trigger: options.trigger,
    arrow: false,
    content: function content() {
      return template('manage-project-task-members-popover', {
        title: options.title || 'Members',
        project: options.project,
        project_task: options.project_task()
      });
    }
  });

  popover.initialize = function () {
    var project = options.project;
    var project_board = options.project_board;
    var project_task = options.project_task();
    var $member_select = popover.$element.find('.popover-member-select');
    var $member_list = popover.$element.find('.popover-member-list');
    var $invitation_form = popover.$element.find('.popover__invitation-form');
    var $invitation_form_button = $invitation_form.find('button[type="submit"]');
    $member_select.removeClass('custom-select').selectize({
      closeAfterSelect: false,
      selectOnTab: false,
      valueField: 'id',
      searchField: ['slug', 'full_name', 'email'],
      placeholder: ['OWNER', 'ADMINISTRATOR'].indexOf(project.pivot.role) > -1 ? __('popovers.manage_project_task_members.enter_name_username_or_email') : __('popovers.manage_project_task_members.enter_name_or_username'),
      render: {
        option: function option(item, escape) {
          return '<div class="selectize-item + is-user ' + (item.is_selected ? 'is-selected' : '') + '">' + '<img class="selectize-item__image" src="https://image.flaticon.com/icons/svg/236/236831.svg" alt="">' + '<span class="selectize-item__title">' + escape(item.title) + '</span>' + '</div>';
        }
      },
      onInitialize: function onInitialize() {
        var selectize = this;
        selectize.selected_items = [];
        selectize.$control_input.attr('autocomplete', 'st-disabled');
        selectize.$dropdown.off('mousedown');
        selectize.addOption(project_board.members.map(function (project_member) {
          var is_selected = project_task.members.some(function (project_task_member) {
            return project_member.user_id == project_task_member.user_id;
          });
          return Object.assign({}, project_member.user, {
            is_selected: is_selected
          });
        }));
        selectize.selected_items = project_board.members.filter(function (project_member) {
          return project_task.members.some(function (project_task_member) {
            return project_member.user_id == project_task_member.user_id;
          });
        }).map(function (project_member) {
          return String(project_member.user_id);
        });

        selectize.setTextboxValue = function () {};

        selectize.setActiveOption = function () {};

        selectize.addItem = function (item_id) {
          if (selectize.$wrapper.hasClass('loading')) {
            return;
          }

          var $option = selectize.getOption(item_id);

          if (selectize.selected_items.indexOf(item_id) > -1) {
            selectize.selected_items.splice(selectize.selected_items.indexOf(item_id), 1);
            $option.removeClass('is-selected');
            selectize.$wrapper.addClass('loading');
            request({
              url: '/project_tasks/' + project_task.id + '/member_users/' + item_id + '/remove'
            }, function (response) {
              selectize.$wrapper.removeClass('loading');

              if (response.error) {
                $.notify(response.error, 'error');
                return;
              }

              options.task_updated({
                project_task_members: response.data.members // project_members: response.data.project.members,

              });
            });
          } else {
            selectize.selected_items.push(item_id);
            $option.addClass('is-selected');
            selectize.$wrapper.addClass('loading');
            request({
              url: '/project_tasks/' + project_task.id + '/member_users/' + item_id + '/add'
            }, function (response) {
              selectize.$wrapper.removeClass('loading');

              if (response.error) {
                $.notify(response.error, 'error');
                return;
              }

              options.task_updated({
                project_task_members: response.data.members // project_members: response.data.project.members,

              });
            });
          }
        };

        selectize.onKeyDown = function (event) {
          if (event.keyCode === 13 && !$invitation_form.hasClass('d-none')) {
            $invitation_form.submit();
          }
        };

        selectize.open();
        setTimeout(function () {
          popover.update();
        });
      },
      onType: function onType(value) {
        var selectize = this;
        var is_email = /^\S+@\S+\.\S+$/.test(value);
        var has_results = this.currentResults.items.length > 0;
        selectize.$dropdown.toggleClass('is-hidden', !has_results);
        popover.$element.find('.popover__no-members-message').toggleClass('d-none', has_results); // popover.$element.find('.popover__no-members-message').toggleClass('d-none', has_results || is_email);
        // $invitation_form.toggleClass('d-none', has_results || !is_email);
        // if (!has_results && is_email) {
        // 	var email_parts = value.split(/@/)[0].split(/[^a-z0-9]+/i);
        // 	$invitation_form.find('input[name="user[first_name]"]').val(email_parts[0] || '');
        // 	$invitation_form.find('input[name="user[last_name]"]').val(email_parts[1] || '');
        // 	$invitation_form.find('input[name="user[email]"]').val(value);
        // }

        popover.fix();
      }
    });
    $invitation_form.submit(function (event) {
      event.preventDefault();

      if ($invitation_form_button.hasClass('is-loading')) {
        return;
      }

      $invitation_form_button.addClass('is-loading disabled');
      request({
        method: 'POST',
        url: '/project_tasks/' + project_task.id + '/member_users/invite',
        data: $invitation_form.serialize()
      }, function (response) {
        $invitation_form_button.removeClass('is-loading disabled');

        if (response.error) {
          $.notify(response.error, 'error');
          return;
        }

        options.task_updated({
          project_task_members: response.data.members // project_members: response.data.project.members,

        });
        var selectize = $member_select.data('selectize');
        selectize.$control_input.val('');
        $invitation_form.find('input').val('');
        $invitation_form.addClass('d-none');
        selectize.open();
        selectize.clearOptions();
        selectize.addOption(response.data.project.members.map(function (project_member) {
          var is_selected = response.data.members.some(function (project_task_member) {
            return project_member.user_id == project_task_member.user_id;
          });
          return Object.assign({}, project_member.user, {
            is_selected: is_selected
          });
        }));
      });
    });
    $invitation_form.on('keypress', function (event) {
      event.keyCode === 13 && $invitation_form.submit();
    });
    $invitation_form.find('button[type="submit"]').click(function (event) {
      $invitation_form.submit();
    });
  };

  return popover;
};

/***/ }),

/***/ "./resources/js/popovers/project_board_members.popover.js":
/*!****************************************************************!*\
  !*** ./resources/js/popovers/project_board_members.popover.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

popovers.project_board_members = function (options) {
  options = options || {};
  var project = options.project;
  var project_board = options.project_board;
  var popover = new Popover({
    trigger: options.trigger,
    arrow: false,
    placement: 'bottom',
    content: function content() {
      return template('project-board-members-popover');
    }
  });

  popover.initialize = function () {
    var project = options.project;
    var $member_select = popover.$element.find('.popover-member-select');
    var $member_list = popover.$element.find('.popover-member-list');
    var shown_project_member_popover = null;

    var update_member_popovers = function update_member_popovers() {
      var selectize = $member_select.data('selectize');
      Object.keys(selectize.options).forEach(function (user_id) {
        var $option = selectize.getOption(user_id);

        if ($option.data('bs.popover')) {
          return;
        }

        var found_member = project_board.members.filter(function (member) {
          return member.user_id == user_id;
        })[0] || null;
        var popover = popovers.project_member_menu({
          trigger: selectize.getOption(user_id),
          project_member: Object.assign({}, found_member.project_member, {
            user: found_member.user
          }),
          project: project,
          project_board: project_board
        });
        popover.$trigger.on('show.bs.popover', function () {
          shown_project_member_popover && shown_project_member_popover.$trigger.popover('hide');
          shown_project_member_popover = popover;
        });
      });
    };

    $member_select.removeClass('custom-select').selectize({
      closeAfterSelect: false,
      selectOnTab: false,
      valueField: 'id',
      searchField: ['title', 'full_name', 'slug', 'email'],
      sortField: [{
        field: 'index',
        direction: 'asc'
      }],
      placeholder: ['OWNER', 'ADMINISTRATOR'].indexOf(project.pivot.role) > -1 ? __('popovers.project_members.enter_name_username_or_email') : __('popovers.project_members.enter_name_or_username'),
      render: {
        option: function option(item, escape) {
          return '<div class="selectize-item + is-user">' + '<img class="selectize-item__image" src="' + item.image.urls.tiny + '" alt="">' + '<span class="selectize-item__title">' + escape(item.title) + '</span>' + '<span class="selectize-item__status + ' + (item.is_online ? 'is-online' : '') + '" data-connection-status-for-user-id="' + item.id + '"></span>' + '</div>';
        }
      },
      onInitialize: function onInitialize() {
        var selectize = this;
        selectize.selected_items = [];
        selectize.$control_input.attr('autocomplete', 'st-disabled');
        selectize.$dropdown.off('mousedown');
        selectize.addOption(project_board.members.map(function (member, member_index) {
          return Object.assign({}, member.user, {
            index: member_index
          });
        }));

        selectize.setTextboxValue = function () {};

        selectize.setActiveOption = function () {};

        selectize.addItem = function (item_id) {
          if (selectize.$wrapper.hasClass('loading')) {
            return;
          }

          var $option = selectize.getOption(item_id); // 
        };

        selectize.onKeyDown = function (event) {// if (event.keyCode === 13 && !$invitation_form.hasClass('d-none')) {
          //     $invitation_form.submit();
          // }
        };

        selectize.open();
        setTimeout(function () {
          popover.update();
          update_member_popovers();
        });
      },
      onType: function onType(value) {
        var selectize = this;
        update_member_popovers();
        var has_results = this.currentResults.items.length > 0;
        selectize.$dropdown.toggleClass('is-hidden', !has_results);
        popover.$element.find('.popover__no-members-message').toggleClass('d-none', has_results);
        popover.fix();
      }
    });
  };

  popover.shown = function () {
    popover.$element.find('.popover-member-select').data('selectize').$control_input.focus();
  };

  return popover;
};

/***/ }),

/***/ "./resources/js/popovers/project_board_menu.popover.js":
/*!*************************************************************!*\
  !*** ./resources/js/popovers/project_board_menu.popover.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

popovers.project_board_menu = function (options) {
  options = options || {};
  var project = options.project;
  var project_board = options.project_board;
  var popover = new Popover({
    trigger: options.trigger,
    arrow: false,
    placement: 'bottom',
    content: function content() {
      return template('project-board-menu-popover', {
        project: project,
        project_board: project_board
      });
    }
  });

  popover.initialize = function () {
    popover.$element.find('.popover-list-item.is-archive-board').click(function (event) {
      event.preventDefault();
      modals.confirm_action({
        question: "Are you sure you want to archive this board?",
        confirm: function confirm(close_modal) {
          return request({
            url: '/project_boards/' + project_board.id + '/archive'
          }, function (response) {
            if (response.error) {
              $.notify(response.error, 'error');
              return;
            }

            $.notify('This board was archived!', 'success');
            window.location.href = "/dashboard/projects/" + project.id;
          });
        }
      });
    });
  };

  return popover;
};

/***/ }),

/***/ "./resources/js/popovers/project_boards.popover.js":
/*!*********************************************************!*\
  !*** ./resources/js/popovers/project_boards.popover.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

popovers.project_boards = function (options) {
  options = options || {};
  var project = options.project;
  var popover = new Popover({
    trigger: options.trigger,
    arrow: false,
    placement: 'bottom',
    content: function content() {
      return template('project-boards-popover');
    }
  });

  popover.initialize = function () {
    var project = options.project;
    var $board_select = popover.$element.find('.popover-board-select');
    var $board_list = popover.$element.find('.popover-board-list');
    var shown_project_member_popover = null;
    $board_select.removeClass('custom-select').selectize({
      closeAfterSelect: false,
      selectOnTab: false,
      valueField: 'id',
      searchField: ['name'],
      sortField: [{
        field: 'index',
        direction: 'asc'
      }],
      placeholder: __('popovers.project_boards.enter_board_name'),
      render: {
        option: function option(item, escape) {
          return '<div class="selectize-item">' + escape(item.name) + '</div>';
        }
      },
      onInitialize: function onInitialize() {
        var selectize = this;
        selectize.selected_items = [];
        selectize.$control_input.attr('autocomplete', 'st-disabled');
        selectize.$dropdown.off('mousedown');
        selectize.addOption(project.boards.map(function (board, board_index) {
          return Object.assign({}, board, {
            index: board_index
          });
        }));

        selectize.setTextboxValue = function () {};

        selectize.setActiveOption = function () {};

        selectize.addItem = function (item_id) {
          if (selectize.$wrapper.hasClass('loading')) {
            return;
          }

          window.location.href = '/dashboard/projects/' + dashboard.selected_project.id + '/boards/' + item_id;
        };

        selectize.onKeyDown = function (event) {// if (event.keyCode === 13 && !$invitation_form.hasClass('d-none')) {
          //     $invitation_form.submit();
          // }
        };

        selectize.open();
        setTimeout(function () {
          popover.fix();
        });
      },
      onType: function onType(value) {
        var selectize = this;
        var has_results = this.currentResults.items.length > 0;
        selectize.$dropdown.toggleClass('is-hidden', !has_results);
        popover.$element.find('.popover__no-boards-message').toggleClass('d-none', has_results);
        popover.fix();
      }
    });
  };

  popover.shown = function () {
    popover.$element.find('.popover-board-select').data('selectize').$control_input.focus();
  };

  return popover;
};

/***/ }),

/***/ "./resources/js/popovers/project_member_menu.popover.js":
/*!**************************************************************!*\
  !*** ./resources/js/popovers/project_member_menu.popover.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

popovers.project_member_menu = function (options) {
  options = options || {};
  var project_member = options.project_member;
  var board_item = options.board_item || null;
  var project = options.project;
  var project_board = options.project_board;
  var popover = new Popover({
    trigger: options.trigger,
    arrow: false,
    placement: 'bottom',
    content: function content() {
      return template('project-member-menu-popover', {
        project_member: project_member,
        project: project,
        board_item: board_item,
        project_board: project_board
      });
    }
  });

  popover.initialize = function () {
    var $default_page = popover.$element.find('.popover-page.is-default');
    var $remove_member_page = popover.$element.find('.popover-page.is-remove-member');
    var $change_role_page = popover.$element.find('.popover-page.is-change-role');
    $default_page.find('.popover-list-item.is-view-profile').click(function (event) {
      event.preventDefault();
      slideups.user_profile({
        user_id: project_member.user_id,
        default_tab: 'profile'
      });
      popovers.close();
    });
    $default_page.find('.popover-list-item.is-view-timeline').click(function (event) {
      event.preventDefault();
      slideups.user_profile({
        user_id: project_member.user_id,
        default_tab: 'timeline'
      });
      popovers.close();
    });
    $default_page.find('.popover-list-item.is-edit-contract').click(function (event) {
      event.preventDefault();
      slideups.user_profile({
        user_id: project_member.user_id,
        default_tab: 'contract'
      });
      popovers.close();
    });
    $default_page.find('.popover-list-item.is-unassign-from-task').click(function (event) {
      event.preventDefault();
      popovers.close();
      request({
        url: '/project_tasks/' + board_item.object.id + '/member_users/' + project_member.user.id + '/remove'
      }, function (response) {
        if (response.error) {
          $.notify(response.error, 'error');
          return;
        }

        board_item.object.members = response.data.members;
        board_item.renderMembers();
        $.notify('Member was unassigned!', 'success');
      });
    });
    $default_page.find('.popover-list-item.is-remove-from-board').click(function (event) {
      event.preventDefault();
      popovers.close(); // request({
      // 	url: '/project_tasks/' + board_item.object.id + '/member_users/' + project_member.user.id + '/remove',
      // }, function(response) {
      // 	if (response.error) {
      // 		$.notify(response.error, 'error');
      // 		return;
      // 	}
      // 	board_item.object.members = response.data.members;
      // 	board_item.renderMembers();
      // 	$.notify('Member was unassigned!', 'success');
      // });
    });
    $default_page.find('.popover-list-item.is-remove-from-project').click(function (event) {
      event.preventDefault();
      $default_page.removeClass('is-shown');
      $remove_member_page.addClass('is-shown');
      popover.fix();
    });
    $default_page.find('.popover-profile__role.is-link').click(function (event) {
      event.preventDefault();
      popover.$element.find('.popover-page.is-default').removeClass('is-shown');
      popover.$element.find('.popover-page.is-change-role').addClass('is-shown');
      popover.fix();
    }); // ---------------------------------------------------------------------- //

    $remove_member_page.find('.popover-header__back-button').click(function (event) {
      event.preventDefault();
      $remove_member_page.removeClass('is-shown');
      $default_page.addClass('is-shown');
      popover.fix();
    });
    $remove_member_page.find('#popover-project-member-menu__remove-from-all-projects-checkbox').change(function () {
      $remove_member_page.find('.popover-content__alert.is-default').toggleClass('d-none', $(this).prop('checked'));
      $remove_member_page.find('.popover-content__alert.is-remove-from-all-projects').toggleClass('d-none', !$(this).prop('checked'));
    });
    $remove_member_page.find('.popover-content__remove-button').click(function (event) {
      event.preventDefault();
      var $button = $(this);
      $button.addClass('is-loading');
      request({
        url: '/project_members/' + project_member.id + '/delete',
        data: $remove_member_page.find('.popover-content__form').serialize()
      }, function (response) {
        $button.removeClass('is-loading');

        if (response.error) {
          $.notify(response.error, 'error');
          return;
        }

        popovers.close();
        $.notify('This member was removed!', 'success');
        var existent_project_member = dashboard.selected_project.members.filter(function (current_project_member) {
          return current_project_member.id == project_member.id;
        })[0] || null;

        if (existent_project_member) {
          dashboard.selected_project.members.splice(dashboard.selected_project.members.indexOf(existent_project_member), 1);
        }

        dashboard.selected_project.renderMembers();
        dashboard.selected_board && function () {
          var found_board_member = dashboard.selected_board.members.filter(function (board_member) {
            return board_member.user_id == project_member.user_id;
          })[0];

          if (!found_board_member) {
            return;
          }

          dashboard.selected_board.members.splice(dashboard.selected_board.members.indexOf(found_board_member), 1);
          dashboard.selected_board.renderMembers();
        }();
        window.board && window.board.getColumns().forEach(function (board_column) {
          board_column.getItems().forEach(function (board_item) {
            var found_task_member = board_item.object.members.filter(function (task_member) {
              return task_member.user_id == project_member.user_id;
            })[0] || null;

            if (!found_task_member) {
              return;
            }

            board_item.object.members.splice(board_item.object.members.indexOf(found_task_member), 1);
            board_item.renderMembers();
          });
        });
      });
    }); // ---------------------------------------------------------------------- //

    $change_role_page.find('.popover-header__back-button').click(function (event) {
      event.preventDefault();
      $change_role_page.removeClass('is-shown');
      $default_page.addClass('is-shown');
      popover.fix();
    });
    $change_role_page.find('.popover-list-item').click(function (event) {
      event.preventDefault();
      var $self = $(this);
      $self.addClass('is-loading');
      request({
        url: '/project_members/' + project_member.id + '/update',
        data: {
          project_member: {
            role: $self.attr('data-key')
          }
        }
      }, function (response) {
        $self.removeClass('is-loading');

        if (response.error) {
          $.notify(response.error, 'error');
          return;
        }

        var found_project_member = project.members.filter(function (current_project_member) {
          return current_project_member.id == project_member.id;
        })[0] || null;
        found_project_member && Object.assign(found_project_member, response.data);
        dashboard.selected_board && function () {
          var found_board_member = dashboard.selected_board.members.filter(function (current_board_member) {
            return current_board_member.project_member.id == project_member.id;
          })[0] || null;
          found_board_member && Object.assign(found_board_member.project_member, response.data);
        }();
        $default_page.find('.popover-profile__role span').text(__('common.project_members.roles.' + project_member.role + '.extra_title'));
        $change_role_page.find('.popover-list-item').removeClass('is-selected');
        $self.addClass('is-selected');
      });
    });
  };

  return popover;
};

/***/ }),

/***/ "./resources/js/popovers/project_members.popover.js":
/*!**********************************************************!*\
  !*** ./resources/js/popovers/project_members.popover.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

popovers.project_members = function (options) {
  options = options || {};
  var project = options.project;
  var popover = new Popover({
    trigger: options.trigger,
    arrow: false,
    placement: 'bottom',
    content: function content() {
      return template('project-members-popover');
    }
  });

  popover.initialize = function () {
    var project = options.project;
    var $member_select = popover.$element.find('.popover-member-select');
    var $member_list = popover.$element.find('.popover-member-list');
    var shown_project_member_popover = null;

    var update_member_popovers = function update_member_popovers() {
      var selectize = $member_select.data('selectize');
      Object.keys(selectize.options).forEach(function (user_id) {
        var $option = selectize.getOption(user_id);

        if ($option.data('bs.popover')) {
          return;
        }

        var found_member = project.members.filter(function (member) {
          return member.user.id == user_id;
        })[0] || null;
        var popover = popovers.project_member_menu({
          trigger: selectize.getOption(user_id),
          project_member: found_member,
          project: project
        });
        popover.$trigger.on('show.bs.popover', function () {
          shown_project_member_popover && shown_project_member_popover.$trigger.popover('hide');
          shown_project_member_popover = popover;
        });
      });
    };

    $member_select.removeClass('custom-select').selectize({
      closeAfterSelect: false,
      selectOnTab: false,
      valueField: 'id',
      searchField: ['title', 'full_name', 'slug', 'email'],
      sortField: [{
        field: 'index',
        direction: 'asc'
      }],
      placeholder: ['OWNER', 'ADMINISTRATOR'].indexOf(project.pivot.role) > -1 ? __('popovers.project_members.enter_name_username_or_email') : __('popovers.project_members.enter_name_or_username'),
      render: {
        option: function option(item, escape) {
          return '<div class="selectize-item + is-user">' + '<img class="selectize-item__image" src="' + item.image.urls.tiny + '" alt="">' + '<span class="selectize-item__title">' + escape(item.title) + '</span>' + '<span class="selectize-item__status + ' + (item.is_online ? 'is-online' : '') + '" data-connection-status-for-user-id="' + item.id + '"></span>' + '</div>';
        }
      },
      onInitialize: function onInitialize() {
        var selectize = this;
        selectize.selected_items = [];
        selectize.$control_input.attr('autocomplete', 'st-disabled');
        selectize.$dropdown.off('mousedown');
        selectize.addOption(project.members.map(function (member, member_index) {
          return Object.assign({}, member.user, {
            index: member_index
          });
        }));

        selectize.setTextboxValue = function () {};

        selectize.setActiveOption = function () {};

        selectize.addItem = function (item_id) {
          if (selectize.$wrapper.hasClass('loading')) {
            return;
          }

          var $option = selectize.getOption(item_id); // 
        };

        selectize.onKeyDown = function (event) {// if (event.keyCode === 13 && !$invitation_form.hasClass('d-none')) {
          //     $invitation_form.submit();
          // }
        };

        selectize.open();
        setTimeout(function () {
          popover.update();
          update_member_popovers();
        });
      },
      onType: function onType(value) {
        var selectize = this;
        update_member_popovers();
        var has_results = this.currentResults.items.length > 0;
        selectize.$dropdown.toggleClass('is-hidden', !has_results);
        popover.$element.find('.popover__no-members-message').toggleClass('d-none', has_results);
        popover.fix();
      }
    });
  };

  popover.shown = function () {
    popover.$element.find('.popover-member-select').data('selectize').$control_input.focus();
  };

  return popover;
};

/***/ }),

/***/ "./resources/js/popovers/project_task_menu.popover.js":
/*!************************************************************!*\
  !*** ./resources/js/popovers/project_task_menu.popover.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

popovers.project_task_menu = function (options) {
  options = options || {};
  var project_task = options.project_task;
  var board_item = options.board_item;
  var popover = new Popover({
    trigger: options.trigger,
    arrow: false,
    placement: 'bottom',
    content: function content() {
      return template('project-task-menu-popover', {
        project_task: project_task
      });
    }
  });

  popover.initialize = function () {
    popover.$element.find('.popover-list-item.is-archive').click(function (event) {
      event.preventDefault();
      var $item = $(this);
      request({
        url: '/project_tasks/' + project_task.id + '/archive'
      }, function (response) {
        if (response.error) {
          $.notify(response.error, 'error');
          return;
        }

        popovers.close();
        $.notify('Task was archived!', 'success');
        board_item["delete"]();
      });
    });
  };

  return popover;
};

/***/ }),

/***/ 10:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** multi ./resources/js/popovers/add_contract.popover.js ./resources/js/popovers/create_new_project.popover.js ./resources/js/popovers/extra_project_menu.popover.js ./resources/js/popovers/invite_project_member.popover.js ./resources/js/popovers/manage_project_board_members.popover.js ./resources/js/popovers/manage_project_task_members.popover.js ./resources/js/popovers/project_board_members.popover.js ./resources/js/popovers/project_board_menu.popover.js ./resources/js/popovers/project_boards.popover.js ./resources/js/popovers/project_member_menu.popover.js ./resources/js/popovers/project_members.popover.js ./resources/js/popovers/project_task_menu.popover.js ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\js\popovers\add_contract.popover.js */"./resources/js/popovers/add_contract.popover.js");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\js\popovers\create_new_project.popover.js */"./resources/js/popovers/create_new_project.popover.js");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\js\popovers\extra_project_menu.popover.js */"./resources/js/popovers/extra_project_menu.popover.js");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\js\popovers\invite_project_member.popover.js */"./resources/js/popovers/invite_project_member.popover.js");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\js\popovers\manage_project_board_members.popover.js */"./resources/js/popovers/manage_project_board_members.popover.js");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\js\popovers\manage_project_task_members.popover.js */"./resources/js/popovers/manage_project_task_members.popover.js");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\js\popovers\project_board_members.popover.js */"./resources/js/popovers/project_board_members.popover.js");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\js\popovers\project_board_menu.popover.js */"./resources/js/popovers/project_board_menu.popover.js");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\js\popovers\project_boards.popover.js */"./resources/js/popovers/project_boards.popover.js");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\js\popovers\project_member_menu.popover.js */"./resources/js/popovers/project_member_menu.popover.js");
__webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\js\popovers\project_members.popover.js */"./resources/js/popovers/project_members.popover.js");
module.exports = __webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\js\popovers\project_task_menu.popover.js */"./resources/js/popovers/project_task_menu.popover.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL3BvcG92ZXJzL2FkZF9jb250cmFjdC5wb3BvdmVyLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9wb3BvdmVycy9jcmVhdGVfbmV3X3Byb2plY3QucG9wb3Zlci5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvcG9wb3ZlcnMvZXh0cmFfcHJvamVjdF9tZW51LnBvcG92ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL3BvcG92ZXJzL2ludml0ZV9wcm9qZWN0X21lbWJlci5wb3BvdmVyLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9wb3BvdmVycy9tYW5hZ2VfcHJvamVjdF9ib2FyZF9tZW1iZXJzLnBvcG92ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL3BvcG92ZXJzL21hbmFnZV9wcm9qZWN0X3Rhc2tfbWVtYmVycy5wb3BvdmVyLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9wb3BvdmVycy9wcm9qZWN0X2JvYXJkX21lbWJlcnMucG9wb3Zlci5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvcG9wb3ZlcnMvcHJvamVjdF9ib2FyZF9tZW51LnBvcG92ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL3BvcG92ZXJzL3Byb2plY3RfYm9hcmRzLnBvcG92ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL3BvcG92ZXJzL3Byb2plY3RfbWVtYmVyX21lbnUucG9wb3Zlci5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvcG9wb3ZlcnMvcHJvamVjdF9tZW1iZXJzLnBvcG92ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL3BvcG92ZXJzL3Byb2plY3RfdGFza19tZW51LnBvcG92ZXIuanMiXSwibmFtZXMiOlsicG9wb3ZlcnMiLCJhZGRfY29udHJhY3QiLCJvcHRpb25zIiwicHJvamVjdCIsImRhc2hib2FyZCIsInNlbGVjdGVkX3Byb2plY3QiLCJwb3BvdmVyIiwiUG9wb3ZlciIsInRyaWdnZXIiLCJhcnJvdyIsInBsYWNlbWVudCIsImNsb3NlX29uX2JsdXIiLCJjb250ZW50IiwidGVtcGxhdGUiLCJ0aXRsZSIsImlkIiwiaW5pdGlhbGl6ZSIsImNhcmQiLCJjb250cmFjdF90eXBlIiwiY29udHJhY3RfcGF5bWVudF90eXBlIiwibWlsZXN0b25lcyIsImFtb3VudCIsInVzZXJfdHlwZSIsInNlbGVjdGVkX3VzZXIiLCJ1c2VyX3JvbGUiLCIkY29udGVudCIsIiRlbGVtZW50IiwiZmluZCIsIiRjcmVhdGlvbl9mb3JtIiwiJGNyZWF0aW9uX2Zvcm1fc3VibWl0X2J1dHRvbiIsIiRjb250cmFjdFdhc0NyZWF0ZWRCbG9jayIsIiRjb250cmFjdF90eXBlX3BpbGxzIiwiJG5hbWVfYmxvY2siLCIkY29udHJhY3RfdHlwZV9ibG9jayIsIiRjb250cmFjdF9wYXltZW50X3R5cGVfcGlsbHMiLCIkY29udHJhY3RfcGF5bWVudF90eXBlX2lucHV0IiwiJGNvbnRyYWN0X3BheW1lbnRfdHlwZV9kaXJlY3RfdGV4dCIsIiRjb250cmFjdF9wYXltZW50X3R5cGVfZXNjcm93X3RleHQiLCIkdXNlcl90eXBlX2Jsb2NrIiwiJHVzZXJfdHlwZV9waWxscyIsIiRjb250cmFjdF90eXBlX2lucHV0IiwiJHVzZXJfdHlwZV9pbnB1dCIsIiRjb250cmFjdF90aXRsZV9pbnB1dCIsIiRtaWxlc3RvbmVfYmxvY2siLCIkYWRkX21pbGVzdG9uZV9idXR0b24iLCIkbWlsZXN0b25lX2l0ZW1zIiwiJGhvdXJseV9yYXRlX2Jsb2NrIiwiJGhvdXJseV9yYXRlX2lucHV0IiwiJHVzZXJfYmxvY2siLCIkY29udHJhY3RfZGV0YWlsc19ibG9jayIsIiRwcm9qZWN0X21lbWJlcl9zZWxlY3QiLCIkcHJvamVjdF9tZW1iZXJfcm9sZV9zZWxlY3QiLCIkcHJvamVjdF9ib2FyZHNfc2VsZWN0IiwiJGhhdmVfY29udHJhY3RfdGV4dCIsIiR1c2VyX3JvbGVfYmxvY2siLCIkdXNlcl9ib2FyZHNfYmxvY2siLCIkZmlyc3RfbmFtZV9pbnB1dCIsIiRsYXN0X25hbWVfaW5wdXQiLCIkY3JlZGl0X2NhcmRfYmxvY2siLCJ1cGRhdGVfY29udHJhY3RfdHlwZV9pbnB1dCIsImF0dHIiLCJ2YWwiLCJwcm9wIiwidXBkYXRlX2NvbnRyYWN0X3BheW1lbnRfdHlwZV9pbnB1dCIsInVwZGF0ZV91c2VyX3R5cGVfaW5wdXQiLCJ1cGRhdGVfdmlzaWJpbGl0eSIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJ1cGRhdGUiLCJ1cGRhdGVfZm9jdXMiLCJhZnRlciIsImRhdGEiLCJmb2N1cyIsImNvbnNvbGUiLCJsb2ciLCJ1cGRhdGVfdmlzaWJpbGl0eV9hbmRfZm9jdXMiLCJjbGljayIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCIkIiwib24iLCJzZWxlY3RpemUiLCJ2YWx1ZUZpZWxkIiwic2VhcmNoRmllbGQiLCJwbGFjZWhvbGRlciIsIl9fIiwicmVuZGVyIiwiaXRlbSIsImVzY2FwZSIsImlzX3NlbGVjdGVkIiwiaW1hZ2UiLCJ1cmxzIiwidGlueSIsImZ1bGxfbmFtZSIsInNsdWciLCJvcHRpb24iLCJjb250cmFjdCIsImxvYWQiLCJxdWVyeSIsImNhbGxiYWNrIiwiY2xlYXJPcHRpb25zIiwicmVxdWVzdCIsInVybCIsImludml0aW5nX3Byb2plY3RfaWQiLCJyZXNwb25zZSIsIm9uQ2hhbmdlIiwiaXRlbV9pZCIsImVtYWlsX3BhcnRzIiwiZW1haWwiLCJzcGxpdCIsInRleHQiLCJob3VybHlfcmF0ZSIsInByb2Zlc3Npb25hbF90aXRsZSIsIm9uSW5pdGlhbGl6ZSIsIiRjb250cm9sX2lucHV0Iiwib3JpZ2luYWxfdmFsdWUiLCJmaXhlZF92YWx1ZSIsInJlcGxhY2UiLCJkZXNjcmlwdGlvbiIsImFkZE9wdGlvbiIsInZhbHVlIiwicGl2b3QiLCJyb2xlIiwiYWRkSXRlbSIsImNzcyIsInN0b3BQcm9wYWdhdGlvbiIsInBsdWdpbnMiLCJpbml0aWFsaXplX21pbGVzdG9uZV9pdGVtIiwiJHNlbGYiLCJpbmRleCIsInBhcnNlSW50IiwibWlsZXN0b25lIiwicGFyc2VGbG9hdCIsInNwbGljZSIsInJlbmRlcl9taWxlc3RvbmVzIiwiaHRtbCIsImZvckVhY2giLCJtaWxlc3RvbmVfaW5kZXgiLCJlYWNoIiwiYXBwZW5kVG8iLCJwdXNoIiwic2Nyb2xsVG9wIiwic2Nyb2xsSGVpZ2h0IiwiY2hpbGRyZW4iLCJsYXN0Iiwic3VibWl0IiwiaGFzQ2xhc3MiLCJzdHJpcGUiLCJjcmVhdGVUb2tlbiIsInRoZW4iLCJyZXN1bHQiLCJlcnJvciIsIm1lc3NhZ2UiLCJ0b2tlbiIsIm1ldGhvZCIsInNlcmlhbGl6ZSIsIlZhbGlkYXRvciIsImZhaWxzIiwibm90aWZ5IiwicHJvamVjdF9tZW1iZXIiLCJtZW1iZXJzIiwiZmlsdGVyIiwiY3VycmVudF9wcm9qZWN0X21lbWJlciIsInJlbmRlck1lbWJlcnMiLCJzZWxlY3RlZF9ib2FyZCIsImJvYXJkX21lbWJlciIsImJvYXJkX21lbWJlcnMiLCJib2FyZF9pZCIsInVzZXIiLCJPYmplY3QiLCJhc3NpZ24iLCJzaG93biIsImNyZWF0ZV9uZXdfcHJvamVjdCIsIiRmb3JtIiwiJHN1Ym1pdF9idXR0b24iLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJleHRyYV9wcm9qZWN0X21lbnUiLCJtb2RhbHMiLCJjb25maXJtX2FjdGlvbiIsInF1ZXN0aW9uIiwiY29uZmlybSIsImNsb3NlX21vZGFsIiwiaW52aXRlX3Byb2plY3RfbWVtYmVyIiwiJHVzZXJfdHlwZV9mcmVlbGFuY2VyX3RleHQiLCIkdXNlcl90eXBlX2VtcGxveWVyX3RleHQiLCIkcGF5bWVudF90eXBlX2RpcmVjdF90ZXh0IiwiJHBheW1lbnRfdHlwZV9lc2Nyb3dfdGV4dCIsIiRpbnZpdGF0aW9uX2Zvcm0iLCIkbWVtYmVyX3dhc19hZGRlZF9ibG9jayIsIiRtZW1iZXJfd2FzX2FkZGVkX2Jsb2NrX2Nsb3NlX2J1dHRvbiIsIiRyb2xlX2Jsb2NrIiwiJGJvYXJkc19ibG9jayIsIiRpbnZpdGF0aW9uX2Zvcm1fc3VibWl0X2J1dHRvbiIsIiRpbnZpdGF0aW9uX3BhcmFtZXRlcnNfYmxvY2siLCIkY29udHJhY3RfYmxvY2siLCJ0b2dnbGVDbGFzcyIsImF1dGgiLCJkZWZhdWx0X2NyZWRpdF9jYXJkIiwiaW5kZXhPZiIsImlzX2pvaW5lZF9wcm9qZWN0IiwiaW5pdGlhbGl6ZV9zdHJpcGVfaW5wdXQiLCJlbGVtZW50cyIsInN0eWxlIiwiYmFzZSIsImNvbG9yIiwibGluZUhlaWdodCIsImZvbnRGYW1pbHkiLCJmb250U21vb3RoaW5nIiwiZm9udFNpemUiLCJpbnZhbGlkIiwiaWNvbkNvbG9yIiwiY3JlYXRlIiwibW91bnQiLCJhZGRFdmVudExpc3RlbmVyIiwiY2xvc2UiLCJtYW5hZ2VfcHJvamVjdF9ib2FyZF9tZW1iZXJzIiwicHJvamVjdF9ib2FyZCIsIiRtZW1iZXJfc2VsZWN0IiwiJG1lbWJlcl9saXN0IiwiJGludml0YXRpb25fZm9ybV9idXR0b24iLCJjbG9zZUFmdGVyU2VsZWN0Iiwic2VsZWN0T25UYWIiLCJpc19kaXNhYmxlZCIsInNlbGVjdGVkX2l0ZW1zIiwiJGRyb3Bkb3duIiwib2ZmIiwibWFwIiwic29tZSIsInByb2plY3RfYm9hcmRfbWVtYmVyIiwidXNlcl9pZCIsIlN0cmluZyIsInNldFRleHRib3hWYWx1ZSIsInNldEFjdGl2ZU9wdGlvbiIsIiR3cmFwcGVyIiwiJG9wdGlvbiIsImdldE9wdGlvbiIsImJvYXJkX3VwZGF0ZWQiLCJwcm9qZWN0X2JvYXJkX21lbWJlcnMiLCJvbktleURvd24iLCJrZXlDb2RlIiwib3BlbiIsInNldFRpbWVvdXQiLCJvblR5cGUiLCJpc19lbWFpbCIsInRlc3QiLCJoYXNfcmVzdWx0cyIsImN1cnJlbnRSZXN1bHRzIiwiaXRlbXMiLCJsZW5ndGgiLCJmaXgiLCJ0YXNrX3VwZGF0ZWQiLCJwcm9qZWN0X21lbWJlcnMiLCJtYW5hZ2VfcHJvamVjdF90YXNrX21lbWJlcnMiLCJwcm9qZWN0X3Rhc2siLCJwcm9qZWN0X3Rhc2tfbWVtYmVyIiwicHJvamVjdF90YXNrX21lbWJlcnMiLCJzaG93bl9wcm9qZWN0X21lbWJlcl9wb3BvdmVyIiwidXBkYXRlX21lbWJlcl9wb3BvdmVycyIsImtleXMiLCJmb3VuZF9tZW1iZXIiLCJtZW1iZXIiLCJwcm9qZWN0X21lbWJlcl9tZW51IiwiJHRyaWdnZXIiLCJzb3J0RmllbGQiLCJmaWVsZCIsImRpcmVjdGlvbiIsImlzX29ubGluZSIsIm1lbWJlcl9pbmRleCIsInByb2plY3RfYm9hcmRfbWVudSIsInByb2plY3RfYm9hcmRzIiwiJGJvYXJkX3NlbGVjdCIsIiRib2FyZF9saXN0IiwibmFtZSIsImJvYXJkcyIsImJvYXJkIiwiYm9hcmRfaW5kZXgiLCJib2FyZF9pdGVtIiwiJGRlZmF1bHRfcGFnZSIsIiRyZW1vdmVfbWVtYmVyX3BhZ2UiLCIkY2hhbmdlX3JvbGVfcGFnZSIsInNsaWRldXBzIiwidXNlcl9wcm9maWxlIiwiZGVmYXVsdF90YWIiLCJvYmplY3QiLCJjaGFuZ2UiLCIkYnV0dG9uIiwiZXhpc3RlbnRfcHJvamVjdF9tZW1iZXIiLCJmb3VuZF9ib2FyZF9tZW1iZXIiLCJnZXRDb2x1bW5zIiwiYm9hcmRfY29sdW1uIiwiZ2V0SXRlbXMiLCJmb3VuZF90YXNrX21lbWJlciIsInRhc2tfbWVtYmVyIiwiZm91bmRfcHJvamVjdF9tZW1iZXIiLCJjdXJyZW50X2JvYXJkX21lbWJlciIsInByb2plY3RfdGFza19tZW51IiwiJGl0ZW0iXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtR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b1IsVUFBekI7QUFFQSxNQUFJaFIsT0FBTyxHQUFHLElBQUlDLE9BQUosQ0FBWTtBQUN6QkMsV0FBTyxFQUFFTixPQUFPLENBQUNNLE9BRFE7QUFFekJDLFNBQUssRUFBRSxLQUZrQjtBQUd6QkMsYUFBUyxFQUFFLFFBSGM7QUFLekJFLFdBQU8sRUFBRSxtQkFBVztBQUNuQixhQUFPQyxRQUFRLENBQUMsMkJBQUQsRUFBOEI7QUFDNUNrUCxvQkFBWSxFQUFFQTtBQUQ4QixPQUE5QixDQUFmO0FBR0E7QUFUd0IsR0FBWixDQUFkOztBQVlBelAsU0FBTyxDQUFDVSxVQUFSLEdBQXFCLFlBQVc7QUFDL0JWLFdBQU8sQ0FBQ29CLFFBQVIsQ0FBaUJDLElBQWpCLENBQXNCLCtCQUF0QixFQUF1RGlELEtBQXZELENBQTZELFVBQVNDLEtBQVQsRUFBZ0I7QUFDNUVBLFdBQUssQ0FBQ0MsY0FBTjtBQUNBLFVBQUk0TixLQUFLLEdBQUczTixDQUFDLENBQUMsSUFBRCxDQUFiO0FBRUFzQixhQUFPLENBQUM7QUFDUEMsV0FBRyxFQUFFLG9CQUFvQnlKLFlBQVksQ0FBQ2hQLEVBQWpDLEdBQXNDO0FBRHBDLE9BQUQsRUFFSixVQUFTeUYsUUFBVCxFQUFtQjtBQUNyQixZQUFJQSxRQUFRLENBQUMrQyxLQUFiLEVBQW9CO0FBQ25CeEUsV0FBQyxDQUFDK0UsTUFBRixDQUFTdEQsUUFBUSxDQUFDK0MsS0FBbEIsRUFBeUIsT0FBekI7QUFDQTtBQUNBOztBQUVEdkosZ0JBQVEsQ0FBQ3dOLEtBQVQ7QUFDQXpJLFNBQUMsQ0FBQytFLE1BQUYsQ0FBUyxvQkFBVCxFQUErQixTQUEvQjtBQUNBd0gsa0JBQVUsVUFBVjtBQUNBLE9BWE0sQ0FBUDtBQVlBLEtBaEJEO0FBaUJBLEdBbEJEOztBQW9CQSxTQUFPaFIsT0FBUDtBQUNBLENBdENELEMiLCJmaWxlIjoiL2pzL3BvcG92ZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxMCk7XG4iLCJwb3BvdmVycy5hZGRfY29udHJhY3QgPSBmdW5jdGlvbihvcHRpb25zKSB7XHJcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblx0dmFyIHByb2plY3QgPSBkYXNoYm9hcmQuc2VsZWN0ZWRfcHJvamVjdCB8fCBudWxsO1xyXG5cclxuXHR2YXIgcG9wb3ZlciA9IG5ldyBQb3BvdmVyKHtcclxuXHRcdHRyaWdnZXI6IG9wdGlvbnMudHJpZ2dlcixcclxuXHRcdGFycm93OiBmYWxzZSxcclxuXHRcdHBsYWNlbWVudDogJ2JvdHRvbScsXHJcblx0XHRjbG9zZV9vbl9ibHVyOiBmYWxzZSxcclxuXHJcblx0XHRjb250ZW50OiBmdW5jdGlvbihwb3BvdmVyKSB7XHJcblx0XHRcdHJldHVybiB0ZW1wbGF0ZSgnYWRkLWNvbnRyYWN0LXBvcG92ZXInLCB7XHJcblx0XHRcdFx0dGl0bGU6IG9wdGlvbnMudGl0bGUgfHwgJ0FkZCBuZXcgQ29udHJhY3QnLFxyXG5cdFx0XHRcdHByb2plY3Q6IHByb2plY3QsXHJcblx0XHRcdFx0aWQ6IHBvcG92ZXIuaWQsXHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHR9KTtcclxuXHJcblx0cG9wb3Zlci5pbml0aWFsaXplID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGNhcmQgPSBudWxsO1xyXG4gICAgICAgIHZhciBjb250cmFjdF90eXBlID0gJ0hPVVJMWSc7XHJcbiAgICAgICAgdmFyIGNvbnRyYWN0X3BheW1lbnRfdHlwZSA9ICdESVJFQ1QnO1xyXG4gICAgICAgIHZhciBtaWxlc3RvbmVzID0gW3sgdGl0bGU6IG51bGwsIGFtb3VudDogbnVsbCB9XTtcclxuICAgICAgICB2YXIgdXNlcl90eXBlID0gbnVsbDtcclxuICAgICAgICB2YXIgc2VsZWN0ZWRfdXNlciA9IG51bGw7XHJcblx0XHR2YXIgdXNlcl9yb2xlID0gbnVsbDtcclxuXHRcdFxyXG5cdFx0dmFyICRjb250ZW50ID0gcG9wb3Zlci4kZWxlbWVudC5maW5kKCcucG9wb3Zlci1jb250ZW50Jyk7XHJcblx0XHR2YXIgJGNyZWF0aW9uX2Zvcm0gPSBwb3BvdmVyLiRlbGVtZW50LmZpbmQoJy5wb3BvdmVyX19jcmVhdGlvbi1mb3JtJyk7XHJcblx0XHR2YXIgJGNyZWF0aW9uX2Zvcm1fc3VibWl0X2J1dHRvbiA9ICRjcmVhdGlvbl9mb3JtLmZpbmQoJ2J1dHRvblt0eXBlPVwic3VibWl0XCJdJyk7XHJcblx0XHR2YXIgJGNvbnRyYWN0V2FzQ3JlYXRlZEJsb2NrID0gcG9wb3Zlci4kZWxlbWVudC5maW5kKCcucG9wb3Zlcl9fY29udHJhY3Qtd2FzLWNyZWF0ZWQtYmxvY2snKTtcclxuICAgICAgICB2YXIgJGNvbnRyYWN0X3R5cGVfcGlsbHMgPSBwb3BvdmVyLiRlbGVtZW50LmZpbmQoJy5wb3BvdmVyX19jb250cmFjdC10eXBlLXBpbGxzJyk7XHJcbiAgICAgICAgdmFyICRuYW1lX2Jsb2NrID0gcG9wb3Zlci4kZWxlbWVudC5maW5kKCcucG9wb3Zlcl9fdXNlci1uYW1lLWJsb2NrJyk7XHJcbiAgICAgICAgdmFyICRjb250cmFjdF90eXBlX2Jsb2NrID0gcG9wb3Zlci4kZWxlbWVudC5maW5kKCcucG9wb3Zlcl9fY29udHJhY3QtdHlwZS1ibG9jaycpO1xyXG4gICAgICAgIHZhciAkY29udHJhY3RfcGF5bWVudF90eXBlX3BpbGxzID0gcG9wb3Zlci4kZWxlbWVudC5maW5kKCcucG9wb3Zlcl9fY29udHJhY3QtcGF5bWVudC10eXBlLXBpbGxzJyk7XHJcbiAgICAgICAgdmFyICRjb250cmFjdF9wYXltZW50X3R5cGVfaW5wdXQgID0gcG9wb3Zlci4kZWxlbWVudC5maW5kKCdpbnB1dFtuYW1lPVwiY29udHJhY3RbcGF5bWVudF90eXBlXVwiXScpO1xyXG4gICAgICAgIHZhciAkY29udHJhY3RfcGF5bWVudF90eXBlX2RpcmVjdF90ZXh0ID0gcG9wb3Zlci4kZWxlbWVudC5maW5kKCcucG9wb3Zlcl9fY29udHJhY3QtcGF5bWVudC10eXBlLWRpcmVjdC10ZXh0Jyk7XHJcblx0XHR2YXIgJGNvbnRyYWN0X3BheW1lbnRfdHlwZV9lc2Nyb3dfdGV4dCA9IHBvcG92ZXIuJGVsZW1lbnQuZmluZCgnLnBvcG92ZXJfX2NvbnRyYWN0LXBheW1lbnQtdHlwZS1lc2Nyb3ctdGV4dCcpO1xyXG4gICAgICAgIHZhciAkdXNlcl90eXBlX2Jsb2NrID0gcG9wb3Zlci4kZWxlbWVudC5maW5kKCcucG9wb3Zlcl9fdXNlci10eXBlLWJsb2NrJyk7XHJcbiAgICAgICAgdmFyICR1c2VyX3R5cGVfcGlsbHMgPSBwb3BvdmVyLiRlbGVtZW50LmZpbmQoJy5wb3BvdmVyX191c2VyLXR5cGUtcGlsbHMnKTtcclxuICAgICAgICB2YXIgJGNvbnRyYWN0X3R5cGVfaW5wdXQgPSBwb3BvdmVyLiRlbGVtZW50LmZpbmQoJ2lucHV0W25hbWU9XCJjb250cmFjdFt0eXBlXVwiXScpO1xyXG4gICAgICAgIHZhciAkdXNlcl90eXBlX2lucHV0ID0gcG9wb3Zlci4kZWxlbWVudC5maW5kKCdpbnB1dFtuYW1lPVwiY29udHJhY3RbdHlwZV1cIl0nKTtcclxuICAgICAgICB2YXIgJGNvbnRyYWN0X3RpdGxlX2lucHV0ID0gcG9wb3Zlci4kZWxlbWVudC5maW5kKCdbbmFtZT1cImNvbnRyYWN0W3RpdGxlXVwiXScpO1xyXG4gICAgICAgIHZhciAkbWlsZXN0b25lX2Jsb2NrID0gcG9wb3Zlci4kZWxlbWVudC5maW5kKCcucG9wb3Zlcl9fbWlsZXN0b25lLWJsb2NrJyk7XHJcbiAgICAgICAgdmFyICRhZGRfbWlsZXN0b25lX2J1dHRvbiA9IHBvcG92ZXIuJGVsZW1lbnQuZmluZCgnLnBvcG92ZXJfX2FkZC1taWxlc3RvbmUtYnV0dG9uJyk7XHJcbiAgICAgICAgdmFyICRtaWxlc3RvbmVfaXRlbXMgPSBwb3BvdmVyLiRlbGVtZW50LmZpbmQoJy5wb3BvdmVyX19taWxlc3RvbmUtaXRlbXMnKTtcclxuICAgICAgICB2YXIgJGhvdXJseV9yYXRlX2Jsb2NrID0gcG9wb3Zlci4kZWxlbWVudC5maW5kKCcucG9wb3Zlcl9faG91cmx5LXJhdGUtYmxvY2snKTtcclxuICAgICAgICB2YXIgJGhvdXJseV9yYXRlX2lucHV0ID0gcG9wb3Zlci4kZWxlbWVudC5maW5kKCdbbmFtZT1cImNvbnRyYWN0W2hvdXJseV9yYXRlXVwiXScpO1xyXG4gICAgICAgIHZhciAkdXNlcl9ibG9jayA9IHBvcG92ZXIuJGVsZW1lbnQuZmluZCgnLnBvcG92ZXJfX3VzZXItYmxvY2snKTtcclxuICAgICAgICB2YXIgJGNvbnRyYWN0X2RldGFpbHNfYmxvY2sgPSBwb3BvdmVyLiRlbGVtZW50LmZpbmQoJy5wb3BvdmVyX19jb250cmFjdC1kZXRhaWxzLWJsb2NrJyk7XHJcbiAgICAgICAgdmFyICRwcm9qZWN0X21lbWJlcl9zZWxlY3QgPSBwb3BvdmVyLiRlbGVtZW50LmZpbmQoJy5wb3BvdmVyLW1lbWJlci1zZWxlY3QnKTtcclxuICAgICAgICB2YXIgJHByb2plY3RfbWVtYmVyX3JvbGVfc2VsZWN0ID0gcG9wb3Zlci4kZWxlbWVudC5maW5kKCcjcG9wb3Zlci0nICsgIHBvcG92ZXIuaWQgKyAnX19yb2xlJyk7XHJcbiAgICAgICAgdmFyICRwcm9qZWN0X2JvYXJkc19zZWxlY3QgPSBwb3BvdmVyLiRlbGVtZW50LmZpbmQoJyNwb3BvdmVyLScgKyAgcG9wb3Zlci5pZCArICdfX2JvYXJkcycpO1xyXG4gICAgICAgIHZhciAkaGF2ZV9jb250cmFjdF90ZXh0ID0gcG9wb3Zlci4kZWxlbWVudC5maW5kKCcucG9wb3Zlcl9faGF2ZS1jb250cmFjdC10ZXh0Jyk7XHJcbiAgICAgICAgdmFyICR1c2VyX3JvbGVfYmxvY2sgPSBwb3BvdmVyLiRlbGVtZW50LmZpbmQoJy5wb3BvdmVyX191c2VyLXJvbGUtYmxvY2snKTtcclxuICAgICAgICB2YXIgJHVzZXJfYm9hcmRzX2Jsb2NrID0gcG9wb3Zlci4kZWxlbWVudC5maW5kKCcucG9wb3Zlcl9fYm9hcmRzLWJsb2NrJyk7XHJcbiAgICAgICAgdmFyICRmaXJzdF9uYW1lX2lucHV0ID0gJGNyZWF0aW9uX2Zvcm0uZmluZCgnaW5wdXRbbmFtZT1cInVzZXJbZmlyc3RfbmFtZV1cIl0nKTtcclxuXHRcdHZhciAkbGFzdF9uYW1lX2lucHV0ID0gJGNyZWF0aW9uX2Zvcm0uZmluZCgnaW5wdXRbbmFtZT1cInVzZXJbbGFzdF9uYW1lXVwiXScpO1xyXG5cdFx0dmFyICRjcmVkaXRfY2FyZF9ibG9jayA9IHBvcG92ZXIuJGVsZW1lbnQuZmluZCgnLnBvcG92ZXJfX2NyZWF0aW9uLWZvcm1fX2NyZWRpdC1jYXJkLWJsb2NrJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xyXG5cclxuICAgICAgICB2YXIgdXBkYXRlX2NvbnRyYWN0X3R5cGVfaW5wdXQgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0Y29udHJhY3RfdHlwZSA9ICRjb250cmFjdF90eXBlX3BpbGxzLmZpbmQoJy5uYXYtbGluay5hY3RpdmUnKS5hdHRyKCdkYXRhLXZhbHVlJykgfHwgbnVsbDtcclxuXHRcdFx0JGNvbnRyYWN0X3R5cGVfaW5wdXQudmFsKGNvbnRyYWN0X3R5cGUpLnByb3AoJ2Rpc2FibGVkJywgIWNvbnRyYWN0X3R5cGUpO1xyXG5cdFx0fTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgdXBkYXRlX2NvbnRyYWN0X3BheW1lbnRfdHlwZV9pbnB1dCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRjb250cmFjdF9wYXltZW50X3R5cGUgPSAkY29udHJhY3RfcGF5bWVudF90eXBlX3BpbGxzLmZpbmQoJy5uYXYtbGluay5hY3RpdmUnKS5hdHRyKCdkYXRhLXZhbHVlJykgfHwgbnVsbDtcclxuXHRcdFx0JGNvbnRyYWN0X3BheW1lbnRfdHlwZV9pbnB1dC52YWwoY29udHJhY3RfcGF5bWVudF90eXBlKS5wcm9wKCdkaXNhYmxlZCcsICFjb250cmFjdF9wYXltZW50X3R5cGUpO1xyXG5cdFx0fTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgdXBkYXRlX3VzZXJfdHlwZV9pbnB1dCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR1c2VyX3R5cGUgPSAkdXNlcl90eXBlX3BpbGxzLmZpbmQoJy5uYXYtbGluay5hY3RpdmUnKS5hdHRyKCdkYXRhLXZhbHVlJykgfHwgbnVsbDtcclxuXHRcdFx0JHVzZXJfdHlwZV9pbnB1dC52YWwodXNlcl90eXBlKS5wcm9wKCdkaXNhYmxlZCcsICF1c2VyX3R5cGUpO1xyXG5cdFx0fTtcclxuXHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciB1cGRhdGVfdmlzaWJpbGl0eSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIFx0aWYgKGNvbnRyYWN0X3BheW1lbnRfdHlwZSA9PT0gJ0RJUkVDVCcpIHtcclxuXHRcdFx0XHQkY29udHJhY3RfcGF5bWVudF90eXBlX2RpcmVjdF90ZXh0LmFkZENsYXNzKCdzaG93Jyk7XHJcblx0XHRcdFx0JGNvbnRyYWN0X3BheW1lbnRfdHlwZV9lc2Nyb3dfdGV4dC5yZW1vdmVDbGFzcygnc2hvdycpO1xyXG5cdFx0XHRcdCRob3VybHlfcmF0ZV9ibG9jay5yZW1vdmVDbGFzcygnc2hvdycpO1xyXG5cdFx0XHRcdCRtaWxlc3RvbmVfYmxvY2sucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcclxuXHRcdFx0fSBlbHNlIGlmIChjb250cmFjdF9wYXltZW50X3R5cGUgPT09ICdFU0NST1cnKSB7XHJcbiAgICAgICAgXHRcdCRjb250cmFjdF9wYXltZW50X3R5cGVfZGlyZWN0X3RleHQucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcclxuXHRcdFx0XHQkY29udHJhY3RfcGF5bWVudF90eXBlX2VzY3Jvd190ZXh0LmFkZENsYXNzKCdzaG93Jyk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aWYgKGNvbnRyYWN0X3R5cGUgPT09ICdIT1VSTFknKSB7XHJcblx0XHRcdFx0XHQkaG91cmx5X3JhdGVfYmxvY2suYWRkQ2xhc3MoJ3Nob3cnKTtcclxuXHRcdFx0XHRcdCRtaWxlc3RvbmVfYmxvY2sucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKGNvbnRyYWN0X3R5cGUgPT09ICdGSVhFRF9QUklDRScpIHtcclxuXHRcdFx0XHRcdCRob3VybHlfcmF0ZV9ibG9jay5yZW1vdmVDbGFzcygnc2hvdycpO1xyXG5cdFx0XHRcdFx0JG1pbGVzdG9uZV9ibG9jay5hZGRDbGFzcygnc2hvdycpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKCRjb250cmFjdF90aXRsZV9pbnB1dC52YWwoKSkge1xyXG4gICAgICAgICAgICAgICAgJHVzZXJfYmxvY2suYWRkQ2xhc3MoJ3Nob3cnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICR1c2VyX2Jsb2NrLnJlbW92ZUNsYXNzKCdzaG93Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZF91c2VyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRfdXNlci5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRuYW1lX2Jsb2NrLnJlbW92ZUNsYXNzKCdzaG93Jyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICRuYW1lX2Jsb2NrLmFkZENsYXNzKCdzaG93Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICR1c2VyX3R5cGVfYmxvY2suYWRkQ2xhc3MoJ3Nob3cnKTtcclxuICAgICAgICAgICAgICAgIC8vICRjb250cmFjdF90eXBlX2Jsb2NrLmFkZENsYXNzKCdzaG93Jyk7XHJcbiAgICAgICAgICAgICAgICAkY29udHJhY3RfZGV0YWlsc19ibG9jay5hZGRDbGFzcygnc2hvdycpO1xyXG4gICAgICAgICAgICAgICAgJHVzZXJfcm9sZV9ibG9jay5hZGRDbGFzcygnc2hvdycpO1xyXG4gICAgICAgICAgICAgICAgJHVzZXJfYm9hcmRzX2Jsb2NrLmFkZENsYXNzKCdzaG93Jyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkbmFtZV9ibG9jay5yZW1vdmVDbGFzcygnc2hvdycpO1xyXG4gICAgICAgICAgICAgICAgJHVzZXJfdHlwZV9ibG9jay5yZW1vdmVDbGFzcygnc2hvdycpO1xyXG4gICAgICAgICAgICAgICAgLy8gJGNvbnRyYWN0X3R5cGVfYmxvY2sucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcclxuICAgICAgICAgICAgICAgICRjb250cmFjdF9kZXRhaWxzX2Jsb2NrLnJlbW92ZUNsYXNzKCdzaG93Jyk7XHJcbiAgICAgICAgICAgICAgICAkdXNlcl9yb2xlX2Jsb2NrLnJlbW92ZUNsYXNzKCdzaG93Jyk7XHJcbiAgICAgICAgICAgICAgICAkdXNlcl9ib2FyZHNfYmxvY2sucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuXHRcdFx0cG9wb3Zlci51cGRhdGUoKTtcclxuXHRcdH07XHJcblxyXG5cdFx0dmFyIHVwZGF0ZV9mb2N1cyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuXHRcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblx0XHRcdG9wdGlvbnMuYWZ0ZXIgPSBvcHRpb25zLmFmdGVyIHx8IG51bGw7XHJcblx0XHRcdFxyXG5cdFx0XHRpZiAoIXNlbGVjdGVkX3VzZXIpIHtcclxuXHRcdFx0XHQkcHJvamVjdF9tZW1iZXJfc2VsZWN0LmRhdGEoJ3NlbGVjdGl6ZScpLmZvY3VzKCk7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ3Byb2plY3QgbWVtYmVyIHNlbGVjdCBmb2N1cycpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0aWYgKCFzZWxlY3RlZF91c2VyLmlkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoISRmaXJzdF9uYW1lX2lucHV0LnZhbCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGZpcnN0X25hbWVfaW5wdXQuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZmlyc3QgbmFtZSBpbnB1dCBmb2N1cycpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoISRsYXN0X25hbWVfaW5wdXQudmFsKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAkbGFzdF9uYW1lX2lucHV0LmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2xhc3QgbmFtZSBpbnB1dCBmb2N1cycpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cdFx0XHRcclxuICAgICAgICAgICAgaWYgKGNvbnRyYWN0X3R5cGUgPT09ICdIT1VSTFknKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoISRob3VybHlfcmF0ZV9pbnB1dC52YWwoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRob3VybHlfcmF0ZV9pbnB1dC5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKCEkY29udHJhY3RfdGl0bGVfaW5wdXQudmFsKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAkY29udHJhY3RfdGl0bGVfaW5wdXQuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29udHJhY3RfdHlwZSA9PT0gJ0ZJWEVEX1BSSUNFJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEkY29udHJhY3RfdGl0bGVfaW5wdXQudmFsKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAkY29udHJhY3RfdGl0bGVfaW5wdXQuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcblx0XHRcdC8vIGlmICghc2VsZWN0ZWRfdXNlcikge1xyXG5cdFx0XHQvLyBcdCRwcm9qZWN0X21lbWJlcl9zZWxlY3QuZGF0YSgnc2VsZWN0aXplJykuZm9jdXMoKTtcclxuXHRcdFx0Ly8gXHRjb25zb2xlLmxvZygncHJvamVjdCBtZW1iZXIgc2VsZWN0IGZvY3VzJyk7XHJcblx0XHRcdC8vIFx0cmV0dXJuO1xyXG5cdFx0XHQvLyB9XHJcbiAgICAgICAgICAgIC8vXHJcblx0XHRcdC8vIGlmIChbICdzZWxlY3RlZF91c2VyJywgJ3VzZXJfdHlwZScsICd1c2VyX3JvbGUnIF0uaW5kZXhPZihvcHRpb25zLmFmdGVyKSA+IC0xKSB7XHJcblx0XHRcdC8vIFx0aWYgKCFzZWxlY3RlZF91c2VyLmlkKSB7XHJcblx0XHRcdC8vIFx0XHRpZiAoISRmaXJzdF9uYW1lX2lucHV0LnZhbCgpKSB7XHJcblx0XHRcdC8vIFx0XHRcdCRmaXJzdF9uYW1lX2lucHV0LmZvY3VzKCk7XHJcblx0XHRcdC8vIFx0XHRcdGNvbnNvbGUubG9nKCdmaXJzdCBuYW1lIGlucHV0IGZvY3VzJyk7XHJcblx0XHRcdC8vIFx0XHRcdHJldHVybjtcclxuXHRcdFx0Ly8gXHRcdH1cclxuICAgICAgICAgICAgLy9cclxuXHRcdFx0Ly8gXHRcdGlmICghJGxhc3RfbmFtZV9pbnB1dC52YWwoKSkge1xyXG5cdFx0XHQvLyBcdFx0XHQkbGFzdF9uYW1lX2lucHV0LmZvY3VzKCk7XHJcblx0XHRcdC8vIFx0XHRcdGNvbnNvbGUubG9nKCdsYXN0IG5hbWUgaW5wdXQgZm9jdXMnKTtcclxuXHRcdFx0Ly8gXHRcdFx0cmV0dXJuO1xyXG5cdFx0XHQvLyBcdFx0fVxyXG5cdFx0XHQvLyBcdH1cclxuXHRcdFx0Ly8gfVxyXG5cclxuXHRcdFx0Ly8gaWYgKCFzZWxlY3RlZF91c2VyLmNvbnRyYWN0KSB7XHJcblx0XHRcdC8vXHJcblx0XHRcdC8vIH1cclxuXHJcblx0XHRcdC8vXHJcblxyXG5cdFx0XHRjb25zb2xlLmxvZygnbm90aGluZyB0byBmb2N1cyA6QycpO1xyXG5cdFx0fTtcclxuXHJcblx0XHR2YXIgdXBkYXRlX3Zpc2liaWxpdHlfYW5kX2ZvY3VzID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG5cdFx0XHR1cGRhdGVfdmlzaWJpbGl0eShvcHRpb25zKTtcclxuXHRcdFx0dXBkYXRlX2ZvY3VzKG9wdGlvbnMpO1xyXG5cdFx0fTtcclxuICAgICAgICBcclxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXHJcblx0XHRcclxuXHRcdCRjb250cmFjdF9wYXltZW50X3R5cGVfcGlsbHMuZmluZCgnLm5hdi1saW5rJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0JGNvbnRyYWN0X3BheW1lbnRfdHlwZV9waWxscy5maW5kKCcubmF2LWxpbmsnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHR1cGRhdGVfY29udHJhY3RfcGF5bWVudF90eXBlX2lucHV0KCk7XHJcblx0XHRcdHVwZGF0ZV92aXNpYmlsaXR5X2FuZF9mb2N1cyh7IGFmdGVyOiAnY29udHJhY3RfcGF5bWVudF90eXBlJyB9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHVwZGF0ZV9jb250cmFjdF9wYXltZW50X3R5cGVfaW5wdXQoKTtcclxuXHRcdFxyXG4gICAgICAgICRjb250cmFjdF90eXBlX3BpbGxzLmZpbmQoJy5uYXYtbGluaycpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdCRjb250cmFjdF90eXBlX3BpbGxzLmZpbmQoJy5uYXYtbGluaycpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdHVwZGF0ZV9jb250cmFjdF90eXBlX2lucHV0KCk7XHJcblx0XHRcdHVwZGF0ZV92aXNpYmlsaXR5X2FuZF9mb2N1cygpO1xyXG5cdFx0fSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdXBkYXRlX2NvbnRyYWN0X3R5cGVfaW5wdXQoKTtcclxuICAgICAgICBcclxuICAgICAgICAkdXNlcl90eXBlX3BpbGxzLmZpbmQoJy5uYXYtbGluaycpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdCR1c2VyX3R5cGVfcGlsbHMuZmluZCgnLm5hdi1saW5rJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHQkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0dXBkYXRlX3VzZXJfdHlwZV9pbnB1dCgpO1xyXG5cdFx0XHR1cGRhdGVfdmlzaWJpbGl0eV9hbmRfZm9jdXMoKTtcclxuXHRcdH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgICRjb250cmFjdF90aXRsZV9pbnB1dC5vbignaW5wdXQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdXBkYXRlX3Zpc2liaWxpdHkoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICAkcHJvamVjdF9tZW1iZXJfc2VsZWN0LnJlbW92ZUNsYXNzKCdjdXN0b20tc2VsZWN0Jykuc2VsZWN0aXplKHtcclxuXHRcdFx0dmFsdWVGaWVsZDogJ2lkJyxcclxuXHRcdFx0c2VhcmNoRmllbGQ6IFsgJ2VtYWlsJywgJ2Z1bGxfbmFtZScsICdzbHVnJyBdLFxyXG5cdFx0XHRwbGFjZWhvbGRlcjogX18oJ3BvcG92ZXJzLmFkZF9jb250cmFjdC5lbnRlcl9uYW1lX3VzZXJuYW1lX29yX2VtYWlsJyksXHJcblx0XHRcdFxyXG5cdFx0XHRyZW5kZXI6IHtcclxuXHRcdFx0XHRpdGVtOiBmdW5jdGlvbihpdGVtLCBlc2NhcGUpIHtcclxuXHRcdFx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwic2VsZWN0aXplLWl0ZW0gKyBpcy11c2VyICcgKyAoaXRlbS5pc19zZWxlY3RlZCA/ICdpcy1zZWxlY3RlZCcgOiAnJykgKyAnXCI+JyArXHJcblx0XHRcdFx0XHRcdFx0KGl0ZW0uaW1hZ2VcclxuXHRcdFx0XHRcdFx0XHRcdD8gJzxpbWcgY2xhc3M9XCJzZWxlY3RpemUtaXRlbV9faW1hZ2VcIiBzcmM9XCInICsgaXRlbS5pbWFnZS51cmxzLnRpbnkgKyAnXCIgYWx0PVwiXCI+J1xyXG5cdFx0XHRcdFx0XHRcdFx0OiAnJ1xyXG5cdFx0XHRcdFx0XHRcdCkgK1xyXG5cdFx0XHRcdFx0XHRcdCc8c3BhbiBjbGFzcz1cInNlbGVjdGl6ZS1pdGVtX190aXRsZVwiPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0KGl0ZW0uZnVsbF9uYW1lXHJcblx0XHRcdFx0XHRcdFx0XHRcdD8gZXNjYXBlKGl0ZW0uZnVsbF9uYW1lKSArICcgKCcgKyBpdGVtLnNsdWcgKyAnKSdcclxuXHRcdFx0XHRcdFx0XHRcdFx0OiBpdGVtLnNsdWdcclxuXHRcdFx0XHRcdFx0XHRcdCkgK1xyXG5cdFx0XHRcdFx0XHRcdCc8L3NwYW4+JyArXHJcblx0XHRcdFx0XHRcdCc8L2Rpdj4nXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdG9wdGlvbjogZnVuY3Rpb24oaXRlbSwgZXNjYXBlKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cIicgK1xyXG5cdFx0XHRcdFx0XHRcdCdzZWxlY3RpemUtaXRlbSArIGlzLXVzZXIgJyArXHJcblx0XHRcdFx0XHRcdFx0KGl0ZW0uY29udHJhY3QgPyAnaGFzLWRlc2NyaXB0aW9uIGlzLWRpc2FibGVkJyA6ICcnKSArXHJcblx0XHRcdFx0XHRcdCdcIj4nICtcclxuXHRcdFx0XHRcdFx0XHQoaXRlbS5pbWFnZVxyXG5cdFx0XHRcdFx0XHRcdFx0PyAnPGltZyBjbGFzcz1cInNlbGVjdGl6ZS1pdGVtX19pbWFnZVwiIHNyYz1cIicgKyBpdGVtLmltYWdlLnVybHMudGlueSArICdcIiBhbHQ9XCJcIj4nXHJcblx0XHRcdFx0XHRcdFx0XHQ6ICcnXHJcblx0XHRcdFx0XHRcdFx0KSArXHJcblx0XHRcdFx0XHRcdFx0JzxzcGFuIGNsYXNzPVwic2VsZWN0aXplLWl0ZW1fX3RpdGxlXCI+JyArXHJcblx0XHRcdFx0XHRcdFx0XHQoaXRlbS5mdWxsX25hbWVcclxuXHRcdFx0XHRcdFx0XHRcdFx0PyBlc2NhcGUoaXRlbS5mdWxsX25hbWUpICsgJyAoJyArIGl0ZW0uc2x1ZyArICcpJ1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQ6IGl0ZW0uc2x1Z1xyXG5cdFx0XHRcdFx0XHRcdFx0KSArXHJcblx0XHRcdFx0XHRcdFx0Jzwvc3Bhbj4nICtcclxuXHRcdFx0XHRcdFx0XHQoaXRlbS5jb250cmFjdFxyXG5cdFx0XHRcdFx0XHRcdFx0PyAnPHNwYW4gY2xhc3M9XCJzZWxlY3RpemUtaXRlbV9fZGVzY3JpcHRpb25cIj4oYWxyZWFkeSBoYXMgYSBDb250cmFjdCB3aXRoIHlvdSk8L3NwYW4+J1xyXG5cdFx0XHRcdFx0XHRcdFx0OiAnJ1xyXG5cdFx0XHRcdFx0XHRcdCkgK1xyXG5cdFx0XHRcdFx0XHQnPC9kaXY+J1xyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0bG9hZDogZnVuY3Rpb24ocXVlcnksIGNhbGxiYWNrKSB7XHJcblx0XHRcdFx0dGhpcy5jbGVhck9wdGlvbnMoKTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIHJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiAnL3VzZXJzL2F1dG9jb21wbGV0ZScsXHJcblxyXG5cdFx0XHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdFx0XHRpbnZpdGluZ19wcm9qZWN0X2lkOiBwcm9qZWN0LmlkLFxyXG5cdFx0XHRcdFx0XHRxdWVyeTogcXVlcnksXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gY2FsbGJhY2socmVzcG9uc2UuZGF0YSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oaXRlbV9pZCkge1xyXG5cdFx0XHRcdGlmICghaXRlbV9pZCkge1xyXG5cdFx0XHRcdFx0c2VsZWN0ZWRfdXNlciA9IG51bGw7XHJcblx0XHRcdFx0XHQkY3JlYXRpb25fZm9ybS5maW5kKCdbbmFtZT1cInVzZXJbaWRdXCJdJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuXHRcdFx0XHRcdCRjcmVhdGlvbl9mb3JtLmZpbmQoJ1tuYW1lPVwidXNlcltlbWFpbF1cIl0nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG5cdFx0XHRcdFx0dXBkYXRlX3Zpc2liaWxpdHlfYW5kX2ZvY3VzKCk7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRzZWxlY3RlZF91c2VyID0gdGhpcy5vcHRpb25zW2l0ZW1faWRdO1xyXG5cclxuXHRcdFx0XHRpZiAoIXNlbGVjdGVkX3VzZXIuaWQpIHtcclxuXHRcdFx0XHRcdHZhciBlbWFpbF9wYXJ0cyA9IHNlbGVjdGVkX3VzZXIuZW1haWwuc3BsaXQoL0AvKVswXS5zcGxpdCgvW15hLXowLTldKy9pKTtcclxuXHRcdFx0XHRcdCRjcmVhdGlvbl9mb3JtLnZhbChlbWFpbF9wYXJ0c1swXSB8fCAnJyk7XHJcblx0XHRcdFx0XHQkY3JlYXRpb25fZm9ybS52YWwoZW1haWxfcGFydHNbMV0gfHwgJycpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKHNlbGVjdGVkX3VzZXIuY29udHJhY3QpIHtcclxuXHRcdFx0XHRcdCRoYXZlX2NvbnRyYWN0X3RleHQuZmluZCgnLnBvcG92ZXJfX2hhdmUtY29udHJhY3QtdGV4dF9faG91cmx5LXJhdGUnKS50ZXh0KHNlbGVjdGVkX3VzZXIuY29udHJhY3QuaG91cmx5X3JhdGUpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQkaG91cmx5X3JhdGVfaW5wdXQudmFsKHNlbGVjdGVkX3VzZXIuaG91cmx5X3JhdGUgfHwgJycpO1xyXG5cdFx0XHRcdFx0JGNvbnRyYWN0X3RpdGxlX2lucHV0LnZhbChzZWxlY3RlZF91c2VyLnByb2Zlc3Npb25hbF90aXRsZSB8fCAnJyk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR1cGRhdGVfdmlzaWJpbGl0eV9hbmRfZm9jdXMoeyBhZnRlcjogJ3NlbGVjdGVkX3VzZXInIH0pO1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0b25Jbml0aWFsaXplOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR2YXIgc2VsZWN0aXplID0gdGhpcztcclxuXHRcdFx0XHRzZWxlY3RpemUuJGNvbnRyb2xfaW5wdXQuYXR0cignYXV0b2NvbXBsZXRlJywgJ3N0LWRpc2FibGVkJyk7XHJcblx0XHRcdFx0c2VsZWN0aXplLiRjb250cm9sX2lucHV0LmZvY3VzKCk7XHJcblxyXG5cdFx0XHRcdHNlbGVjdGl6ZS4kY29udHJvbF9pbnB1dC5vbignaW5wdXQnLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdHZhciBvcmlnaW5hbF92YWx1ZSA9ICQodGhpcykudmFsKCk7XHJcblx0XHRcdFx0XHR2YXIgZml4ZWRfdmFsdWUgPSAkKHRoaXMpLnZhbCgpLnJlcGxhY2UoL15tYWlsdG86LywgJycpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChvcmlnaW5hbF92YWx1ZSAhPT0gZml4ZWRfdmFsdWUpIHtcclxuXHRcdFx0XHRcdFx0JCh0aGlzKS52YWwoZml4ZWRfdmFsdWUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JHByb2plY3RfbWVtYmVyX3JvbGVfc2VsZWN0LnJlbW92ZUNsYXNzKCdjdXN0b20tc2VsZWN0Jykuc2VsZWN0aXplKHtcclxuXHRcdFx0dmFsdWVGaWVsZDogJ3ZhbHVlJyxcclxuXHRcdFx0Ly8gc2VhcmNoRmllbGQ6IFsgJ2VtYWlsJywgJ2Z1bGxfbmFtZScsICdzbHVnJyBdLFxyXG5cdFx0XHQvLyBwbGFjZWhvbGRlcjogJ0VudGVyIHJvbGUgbmFtZScsXHJcblx0XHRcdFxyXG5cdFx0XHRyZW5kZXI6IHtcclxuXHRcdFx0XHRpdGVtOiBmdW5jdGlvbihpdGVtLCBlc2NhcGUpIHtcclxuXHRcdFx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwic2VsZWN0aXplLWl0ZW0gKyBpcy1wcm9qZWN0LXJvbGVcIj4nICtcclxuXHRcdFx0XHRcdFx0XHQnPHNwYW4gY2xhc3M9XCJzZWxlY3RpemUtaXRlbV9fdGl0bGVcIj4nICsgaXRlbS50aXRsZSArICc8L3NwYW4+JyArXHJcblx0XHRcdFx0XHRcdCc8L2Rpdj4nXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdG9wdGlvbjogZnVuY3Rpb24oaXRlbSwgZXNjYXBlKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cInNlbGVjdGl6ZS1pdGVtICsgaXMtcHJvamVjdC1yb2xlXCI+JyArXHJcblx0XHRcdFx0XHRcdFx0JzxzcGFuIGNsYXNzPVwic2VsZWN0aXplLWl0ZW1fX3RpdGxlXCI+JyArIGl0ZW0udGl0bGUgKyAnPC9zcGFuPicgK1xyXG5cdFx0XHRcdFx0XHRcdCc8c3BhbiBjbGFzcz1cInNlbGVjdGl6ZS1pdGVtX19kZXNjcmlwdGlvblwiPicgKyAgaXRlbS5kZXNjcmlwdGlvbiArICc8L3NwYW4+JyArXHJcblx0XHRcdFx0XHRcdCc8L2Rpdj4nXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oaXRlbV9pZCkge1xyXG5cdFx0XHRcdHVzZXJfcm9sZSA9IGl0ZW1faWQ7XHJcblx0XHRcdFx0dXBkYXRlX3Zpc2liaWxpdHlfYW5kX2ZvY3VzKHsgYWZ0ZXI6ICd1c2VyX3JvbGUnIH0pO1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0b25Jbml0aWFsaXplOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR2YXIgc2VsZWN0aXplID0gdGhpcztcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRzZWxlY3RpemUuYWRkT3B0aW9uKHtcclxuXHRcdFx0XHRcdHZhbHVlOiAnQ09OVFJBQ1RPUicsXHJcblx0XHRcdFx0XHR0aXRsZTogX18oJ2NvbW1vbi5wcm9qZWN0X21lbWJlcnMucm9sZXMuQ09OVFJBQ1RPUi5leHRyYV90aXRsZScpLFxyXG5cdFx0XHRcdFx0ZGVzY3JpcHRpb246IF9fKCdjb21tb24ucHJvamVjdF9tZW1iZXJzLnJvbGVzLkNPTlRSQUNUT1IuZGVzY3JpcHRpb24nKSxcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0aWYgKHByb2plY3QucGl2b3Qucm9sZSA9PSAnT1dORVInKSB7XHJcblx0XHRcdFx0XHRzZWxlY3RpemUuYWRkT3B0aW9uKHtcclxuXHRcdFx0XHRcdFx0dmFsdWU6ICdBRE1JTklTVFJBVE9SJyxcclxuXHRcdFx0XHRcdFx0dGl0bGU6IF9fKCdjb21tb24ucHJvamVjdF9tZW1iZXJzLnJvbGVzLkFETUlOSVNUUkFUT1IuZXh0cmFfdGl0bGUnKSxcclxuXHRcdFx0XHRcdFx0ZGVzY3JpcHRpb246IF9fKCdjb21tb24ucHJvamVjdF9tZW1iZXJzLnJvbGVzLkFETUlOSVNUUkFUT1IuZGVzY3JpcHRpb24nKSxcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0c2VsZWN0aXplLmFkZEl0ZW0oJ0NPTlRSQUNUT1InKTtcclxuXHRcdFx0XHRzZWxlY3RpemUuJGNvbnRyb2xfaW5wdXQuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xyXG5cclxuXHRcdFx0XHRzZWxlY3RpemUuJGNvbnRyb2xfaW5wdXQub24oJ2lucHV0JywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSxcclxuXHRcdH0pO1xyXG5cclxuXHRcdCRwcm9qZWN0X2JvYXJkc19zZWxlY3QucmVtb3ZlQ2xhc3MoJ2N1c3RvbS1zZWxlY3QnKS5zZWxlY3RpemUoe1xyXG5cdFx0XHRwbHVnaW5zOiBbICdyZW1vdmVfYnV0dG9uJyBdLFxyXG5cdFx0fSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGluaXRpYWxpemVfbWlsZXN0b25lX2l0ZW0oKSB7XHJcblx0XHRcdHZhciAkc2VsZiA9ICQodGhpcyk7XHJcblx0XHRcdHZhciBpbmRleCA9IHBhcnNlSW50KCRzZWxmLmF0dHIoJ2RhdGEtaW5kZXgnKSk7XHJcblx0XHRcdHZhciBtaWxlc3RvbmUgPSBtaWxlc3RvbmVzW2luZGV4XTtcclxuXHJcblx0XHRcdCRzZWxmLmZpbmQoJ2lucHV0W25hbWU9XCJjb250cmFjdFttaWxlc3RvbmVzXVsnICsgaW5kZXggKyAnXVt0aXRsZV1cIl0nKS5vbignaW5wdXQnLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRtaWxlc3RvbmUudGl0bGUgPSAkKHRoaXMpLnZhbCgpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdCRzZWxmLmZpbmQoJ2lucHV0W25hbWU9XCJjb250cmFjdFttaWxlc3RvbmVzXVsnICsgaW5kZXggKyAnXVthbW91bnRdXCJdJykub24oJ2lucHV0JywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0bWlsZXN0b25lLmFtb3VudCA9IHBhcnNlRmxvYXQoJCh0aGlzKS52YWwoKSk7XHJcblx0XHRcdFx0Ly8gY29uc29sZS5sb2cobWlsZXN0b25lKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQkc2VsZi5maW5kKCcucG9wb3Zlcl9fbWlsZXN0b25lLWl0ZW1fX3JlbW92ZS1idXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR2YXIgaW5kZXggPSBwYXJzZUludCgkc2VsZi5hdHRyKCdkYXRhLWluZGV4JykpO1xyXG5cdFx0XHRcdG1pbGVzdG9uZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuXHRcdFx0XHRyZW5kZXJfbWlsZXN0b25lcygpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiByZW5kZXJfbWlsZXN0b25lcygpIHtcclxuXHRcdFx0JG1pbGVzdG9uZV9pdGVtcy5odG1sKCcnKTtcclxuXHJcblx0XHRcdG1pbGVzdG9uZXMuZm9yRWFjaChmdW5jdGlvbihtaWxlc3RvbmUsIG1pbGVzdG9uZV9pbmRleCkge1xyXG5cdFx0XHRcdCQodGVtcGxhdGUoJ2ludml0ZS1wcm9qZWN0LW1lbWJlci1wb3BvdmVyLW1pbGVzdG9uZS1pdGVtJywge1xyXG5cdFx0XHRcdFx0aWQ6IHBvcG92ZXIuaWQsXHJcblx0XHRcdFx0XHRpbmRleDogbWlsZXN0b25lX2luZGV4LFxyXG5cdFx0XHRcdFx0dGl0bGU6IG1pbGVzdG9uZS50aXRsZSxcclxuXHRcdFx0XHRcdGFtb3VudDogbWlsZXN0b25lLmFtb3VudCxcclxuXHRcdFx0XHR9KSkuZWFjaChpbml0aWFsaXplX21pbGVzdG9uZV9pdGVtKS5hcHBlbmRUbygkbWlsZXN0b25lX2l0ZW1zKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmVuZGVyX21pbGVzdG9uZXMoKTtcclxuXHJcblx0XHQkYWRkX21pbGVzdG9uZV9idXR0b24uY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHJcblx0XHRcdG1pbGVzdG9uZXMucHVzaCh7XHJcblx0XHRcdFx0dGl0bGU6IG51bGwsXHJcblx0XHRcdFx0YW1vdW50OiBudWxsLFxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJlbmRlcl9taWxlc3RvbmVzKCk7XHJcblx0XHRcdCRjb250ZW50LnNjcm9sbFRvcCgkY29udGVudFswXS5zY3JvbGxIZWlnaHQpO1xyXG5cdFx0XHQkbWlsZXN0b25lX2l0ZW1zLmNoaWxkcmVuKCkubGFzdCgpLmZpbmQoJ2lucHV0OmZpcnN0JykuZm9jdXMoKTtcclxuXHRcdH0pO1xyXG5cdFx0XHJcblx0XHQkY3JlYXRpb25fZm9ybS5zdWJtaXQoZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFxyXG5cdFx0XHRpZiAoIXNlbGVjdGVkX3VzZXIpIHtcclxuXHRcdFx0XHQkcHJvamVjdF9tZW1iZXJfc2VsZWN0LmRhdGEoJ3NlbGVjdGl6ZScpLiRjb250cm9sX2lucHV0LmZvY3VzKCk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcclxuXHRcdFx0aWYgKCRjcmVhdGlvbl9mb3JtX3N1Ym1pdF9idXR0b24uaGFzQ2xhc3MoJ2lzLWxvYWRpbmcnKSkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHJcblx0XHRcdCRjcmVhdGlvbl9mb3JtX3N1Ym1pdF9idXR0b24uYWRkQ2xhc3MoJ2lzLWxvYWRpbmcgZGlzYWJsZWQnKTtcclxuXHRcdFxyXG5cdFx0XHRpZiAocHJvamVjdC5waXZvdC5yb2xlID09PSAnT1dORVInICYmIHVzZXJfdHlwZSA9PT0gJ0VNUExPWUVSJykge1xyXG5cdFx0XHRcdHBvcG92ZXIuJGVsZW1lbnQuZmluZCgnW25hbWU9XCJwcm9qZWN0X21lbWJlcltyb2xlXVwiXScpLnZhbCgnT1dORVInKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRwb3BvdmVyLiRlbGVtZW50LmZpbmQoJ1tuYW1lPVwicHJvamVjdF9tZW1iZXJbcm9sZV1cIl0nKS52YWwoJHByb2plY3RfbWVtYmVyX3JvbGVfc2VsZWN0LnZhbCgpKTtcclxuXHRcdFx0fVxyXG5cdFx0XHJcblx0XHRcdHJldHVybiAoZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuXHRcdFx0XHRpZiAoIWNvbnRyYWN0X3R5cGUgfHwgISRjcmVkaXRfY2FyZF9ibG9jay5oYXNDbGFzcygnc2hvdycpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gY2FsbGJhY2soKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcclxuXHRcdFx0XHRyZXR1cm4gc3RyaXBlLmNyZWF0ZVRva2VuKGNhcmQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcblx0XHRcdFx0XHRpZiAocmVzdWx0LmVycm9yKSB7XHJcblx0XHRcdFx0XHRcdCRjcmVhdGlvbl9mb3JtX3N1Ym1pdF9idXR0b24ucmVtb3ZlQ2xhc3MoJ2lzLWxvYWRpbmcgZGlzYWJsZWQnKTtcclxuXHRcdFx0XHRcdFx0JGNyZWF0aW9uX2Zvcm0uZmluZCgnLnN0cmlwZS1jYXJkLWVycm9ycycpLnRleHQocmVzdWx0LmVycm9yLm1lc3NhZ2UpLnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHJcblx0XHRcdFx0XHQkY3JlYXRpb25fZm9ybS5maW5kKCcuc3RyaXBlLWNhcmQtZXJyb3JzJykuYWRkQ2xhc3MoJ2Qtbm9uZScpO1xyXG5cdFx0XHRcdFx0JGNyZWF0aW9uX2Zvcm0uZmluZCgnW25hbWU9XCJzdHJpcGVfdG9rZW5faWRcIl0nKS52YWwocmVzdWx0LnRva2VuLmlkKTtcclxuXHRcdFx0XHRcdHJldHVybiBjYWxsYmFjaygpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KShmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXR1cm4gcmVxdWVzdCh7XHJcblx0XHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcclxuXHRcdFx0XHRcdHVybDogJy9wcm9qZWN0cy8nICsgcHJvamVjdC5pZCArICcvaW52aXRlX21lbWJlcicsXHJcblx0XHRcdFx0XHRkYXRhOiAkY3JlYXRpb25fZm9ybS5zZXJpYWxpemUoKSxcclxuXHRcdFx0XHR9LCBmdW5jdGlvbihyZXNwb25zZSkge1xyXG5cdFx0XHRcdFx0JGNyZWF0aW9uX2Zvcm1fc3VibWl0X2J1dHRvbi5yZW1vdmVDbGFzcygnaXMtbG9hZGluZyBkaXNhYmxlZCcpO1xyXG5cdFx0XHJcblx0XHRcdFx0XHRpZiAobmV3IFZhbGlkYXRvcigkY3JlYXRpb25fZm9ybSwgcmVzcG9uc2UpLmZhaWxzKCkpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHJcblx0XHRcdFx0XHRpZiAocmVzcG9uc2UuZXJyb3IpIHtcclxuXHRcdFx0XHRcdFx0JC5ub3RpZnkocmVzcG9uc2UuZXJyb3IsICdlcnJvcicpO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcclxuXHRcdFx0XHRcdHZhciBwcm9qZWN0X21lbWJlciA9IHByb2plY3QubWVtYmVycy5maWx0ZXIoZnVuY3Rpb24oY3VycmVudF9wcm9qZWN0X21lbWJlcikge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gY3VycmVudF9wcm9qZWN0X21lbWJlci5pZCA9PT0gcmVzcG9uc2UuZGF0YS5pZDtcclxuXHRcdFx0XHRcdH0pWzBdIHx8IG51bGw7XHJcblx0XHRcclxuXHRcdFx0XHRcdGlmICghcHJvamVjdF9tZW1iZXIpIHtcclxuXHRcdFx0XHRcdFx0cHJvamVjdF9tZW1iZXIgPSByZXNwb25zZS5kYXRhO1xyXG5cdFx0XHRcdFx0XHRwcm9qZWN0Lm1lbWJlcnMucHVzaChwcm9qZWN0X21lbWJlcik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcclxuXHRcdFx0XHRcdHByb2plY3QucmVuZGVyTWVtYmVycygpO1xyXG5cdFx0XHJcblx0XHRcdFx0XHRkYXNoYm9hcmQuc2VsZWN0ZWRfYm9hcmQgJiYgKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHR2YXIgYm9hcmRfbWVtYmVyID0gcmVzcG9uc2UuZGF0YS5ib2FyZF9tZW1iZXJzLmZpbHRlcihmdW5jdGlvbihib2FyZF9tZW1iZXIpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZGFzaGJvYXJkLnNlbGVjdGVkX2JvYXJkLmlkID09IGJvYXJkX21lbWJlci5ib2FyZF9pZDtcclxuXHRcdFx0XHRcdFx0fSlbMF0gfHwgbnVsbDtcclxuXHRcdFxyXG5cdFx0XHRcdFx0XHRpZiAoIWJvYXJkX21lbWJlcikge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHJcblx0XHRcdFx0XHRcdGJvYXJkX21lbWJlci51c2VyID0gcmVzcG9uc2UuZGF0YS51c2VyO1xyXG5cdFx0XHRcdFx0XHRib2FyZF9tZW1iZXIucHJvamVjdF9tZW1iZXIgPSBPYmplY3QuYXNzaWduKHt9LCBwcm9qZWN0X21lbWJlcik7XHJcblx0XHRcdFx0XHRcdGRhc2hib2FyZC5zZWxlY3RlZF9ib2FyZC5tZW1iZXJzLnB1c2goYm9hcmRfbWVtYmVyKTtcclxuXHRcdFx0XHRcdFx0ZGFzaGJvYXJkLnNlbGVjdGVkX2JvYXJkLnJlbmRlck1lbWJlcnMoKTtcclxuXHRcdFx0XHRcdH0pKCk7XHJcblx0XHRcclxuXHRcdFx0XHRcdCRjcmVhdGlvbl9mb3JtLnJlbW92ZUNsYXNzKCdzaG93Jyk7XHJcblx0XHRcdFx0XHQkY29udHJhY3RXYXNDcmVhdGVkQmxvY2suYWRkQ2xhc3MoJ3Nob3cnKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHRcdFxyXG5cdFx0dXBkYXRlX3Zpc2liaWxpdHkoKTtcclxuXHJcblx0fTtcclxuXHJcblx0cG9wb3Zlci5zaG93biA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0Ly8gdXBkYXRlX2ZvY3VzKCk7XHJcblx0fTtcclxufTtcclxuIiwicG9wb3ZlcnMuY3JlYXRlX25ld19wcm9qZWN0ID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cclxuXHR2YXIgcG9wb3ZlciA9IG5ldyBQb3BvdmVyKHtcclxuXHRcdHRyaWdnZXI6IG9wdGlvbnMudHJpZ2dlcixcclxuXHRcdGFycm93OiBmYWxzZSxcclxuXHRcdHBsYWNlbWVudDogJ2JvdHRvbScsXHJcblxyXG5cdFx0Y29udGVudDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJldHVybiB0ZW1wbGF0ZSgnY3JlYXRlLW5ldy1wcm9qZWN0LXBvcG92ZXInLCB7fSk7XHJcblx0XHR9LFxyXG5cdH0pO1xyXG5cclxuXHRwb3BvdmVyLmluaXRpYWxpemUgPSBmdW5jdGlvbigpIHtcclxuXHRcdHBvcG92ZXIuJGVsZW1lbnQuZmluZCgnaW5wdXQ6Zmlyc3QnKS5mb2N1cygpO1xyXG5cdFx0dmFyICRmb3JtID0gcG9wb3Zlci4kZWxlbWVudC5maW5kKCcucG9wb3Zlcl9fZm9ybScpO1xyXG5cdFx0dmFyICRzdWJtaXRfYnV0dG9uID0gJGZvcm0uZmluZCgnYnV0dG9uW3R5cGU9XCJzdWJtaXRcIl0nKTtcclxuXHJcblx0XHQkZm9ybS5zdWJtaXQoZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0JHN1Ym1pdF9idXR0b24uYWRkQ2xhc3MoJ2lzLWxvYWRpbmcnKTtcclxuXHJcblx0XHRcdHJlcXVlc3Qoe1xyXG5cdFx0XHRcdG1ldGhvZDogJ1BPU1QnLFxyXG5cdFx0XHRcdHVybDogJy9wcm9qZWN0cy9jcmVhdGUnLFxyXG5cdFx0XHRcdGRhdGE6ICRmb3JtLnNlcmlhbGl6ZSgpLFxyXG5cdFx0XHR9LCBmdW5jdGlvbihyZXNwb25zZSkge1xyXG5cdFx0XHRcdCRzdWJtaXRfYnV0dG9uLnJlbW92ZUNsYXNzKCdpcy1sb2FkaW5nJyk7XHJcblxyXG5cdFx0XHRcdGlmIChyZXNwb25zZS5lcnJvcikge1xyXG5cdFx0XHRcdFx0JC5ub3RpZnkocmVzcG9uc2UuZXJyb3IsICdlcnJvcicpO1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0JHN1Ym1pdF9idXR0b24uYWRkQ2xhc3MoJ2lzLWxvYWRpbmcnKTtcclxuXHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvZGFzaGJvYXJkL3Byb2plY3RzLycgKyByZXNwb25zZS5kYXRhLmlkO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdHBvcG92ZXIuc2hvd24gPSBmdW5jdGlvbigpIHtcclxuXHRcdC8vXHJcblx0fTtcclxufTsiLCJwb3BvdmVycy5leHRyYV9wcm9qZWN0X21lbnUgPSBmdW5jdGlvbihvcHRpb25zKSB7XHJcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblx0dmFyIHByb2plY3QgPSBvcHRpb25zLnByb2plY3Q7XHJcblxyXG5cdHZhciBwb3BvdmVyID0gbmV3IFBvcG92ZXIoe1xyXG5cdFx0dHJpZ2dlcjogb3B0aW9ucy50cmlnZ2VyLFxyXG5cdFx0YXJyb3c6IGZhbHNlLFxyXG5cdFx0cGxhY2VtZW50OiAnYm90dG9tJyxcclxuXHJcblx0XHRjb250ZW50OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmV0dXJuIHRlbXBsYXRlKCdleHRyYS1wcm9qZWN0LW1lbnUtcG9wb3ZlcicsIHtcclxuXHRcdFx0XHRwcm9qZWN0OiBwcm9qZWN0LFxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0fSk7XHJcblxyXG5cdHBvcG92ZXIuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0cG9wb3Zlci4kZWxlbWVudC5maW5kKCcucG9wb3Zlci1saXN0LWl0ZW0uaXMtbGVhdmUtcHJvamVjdCcpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRtb2RhbHMuY29uZmlybV9hY3Rpb24oe1xyXG5cdFx0XHRcdHF1ZXN0aW9uOiBfXygncG9wb3ZlcnMuYm9hcmRfbWVudS5sZWF2ZV9wcm9qZWN0JyksXHJcblxyXG5cdFx0XHRcdGNvbmZpcm06IGZ1bmN0aW9uKGNsb3NlX21vZGFsKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gcmVxdWVzdCh7XHJcblx0XHRcdFx0XHRcdHVybDogJy9wcm9qZWN0cy8nICsgcHJvamVjdC5pZCArICcvbGVhdmUnLFxyXG5cdFx0XHRcdFx0fSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuXHRcdFx0XHRcdFx0aWYgKHJlc3BvbnNlLmVycm9yKSB7XHJcblx0XHRcdFx0XHRcdFx0JC5ub3RpZnkocmVzcG9uc2UuZXJyb3IsICdlcnJvcicpO1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5ub3RpZnkoX18oJ3BvcG92ZXJzLmJvYXJkX21lbnUubGVhdmVfc3VjY2VzcycpLCAnc3VjY2VzcycpO1xyXG5cdFx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL2Rhc2hib2FyZFwiO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRwb3BvdmVyLiRlbGVtZW50LmZpbmQoJy5wb3BvdmVyLWxpc3QtaXRlbS5pcy1jbG9zZS1wcm9qZWN0JykuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdG1vZGFscy5jb25maXJtX2FjdGlvbih7XHJcblx0XHRcdFx0cXVlc3Rpb246IF9fKCdwb3BvdmVycy5ib2FyZF9tZW51LnN1cmVfY2xvc2VfcHJvamVjdCcpLFxyXG5cclxuXHRcdFx0XHRjb25maXJtOiBmdW5jdGlvbihjbG9zZV9tb2RhbCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0XHR1cmw6ICcvcHJvamVjdHMvJyArIHByb2plY3QuaWQgKyAnL2Nsb3NlJyxcclxuXHRcdFx0XHRcdH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcblx0XHRcdFx0XHRcdGlmIChyZXNwb25zZS5lcnJvcikge1xyXG5cdFx0XHRcdFx0XHRcdCQubm90aWZ5KHJlc3BvbnNlLmVycm9yLCAnZXJyb3InKTtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdCQubm90aWZ5KF9fKCdwb3BvdmVycy5ib2FyZF9tZW51LnByb2plY3RfY2xvc2VkJyksICdzdWNjZXNzJyk7XHJcblx0XHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9kYXNoYm9hcmQnO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRyZXR1cm4gcG9wb3ZlcjtcclxufTtcclxuIiwicG9wb3ZlcnMuaW52aXRlX3Byb2plY3RfbWVtYmVyID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cdHZhciBwcm9qZWN0ID0gb3B0aW9ucy5wcm9qZWN0O1xyXG5cclxuXHR2YXIgcG9wb3ZlciA9IG5ldyBQb3BvdmVyKHtcclxuXHRcdHRyaWdnZXI6IG9wdGlvbnMudHJpZ2dlcixcclxuXHRcdGFycm93OiBmYWxzZSxcclxuXHRcdHBsYWNlbWVudDogJ2JvdHRvbScsXHJcblx0XHRjbG9zZV9vbl9ibHVyOiBmYWxzZSxcclxuXHJcblx0XHRjb250ZW50OiBmdW5jdGlvbihwb3BvdmVyKSB7XHJcblx0XHRcdHJldHVybiB0ZW1wbGF0ZSgnaW52aXRlLXByb2plY3QtbWVtYmVyLXBvcG92ZXInLCB7XHJcblx0XHRcdFx0dGl0bGU6IG9wdGlvbnMudGl0bGUgfHwgJ0ludml0ZSBhIG5ldyBNZW1iZXInLFxyXG5cdFx0XHRcdHByb2plY3Q6IHByb2plY3QsXHJcblx0XHRcdFx0aWQ6IHBvcG92ZXIuaWQsXHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHR9KTtcclxuXHJcblx0cG9wb3Zlci5pbml0aWFsaXplID0gZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgY2FyZCA9IG51bGw7XHJcblx0XHR2YXIgc2VsZWN0ZWRfdXNlciA9IG51bGw7XHJcblx0XHR2YXIgdXNlcl90eXBlID0gbnVsbDtcclxuXHRcdHZhciB1c2VyX3JvbGUgPSBudWxsO1xyXG5cdFx0dmFyIGNvbnRyYWN0X3R5cGUgPSAnSE9VUkxZJztcclxuXHRcdHZhciBjb250cmFjdF9wYXltZW50X3R5cGUgPSAnRElSRUNUJztcclxuXHRcdHZhciBtaWxlc3RvbmVzID0gW3sgdGl0bGU6IG51bGwsIGFtb3VudDogbnVsbCB9XTtcclxuXHJcblx0XHR2YXIgJGNvbnRlbnQgPSBwb3BvdmVyLiRlbGVtZW50LmZpbmQoJy5wb3BvdmVyLWNvbnRlbnQnKTtcclxuXHRcdHZhciAkdXNlcl90eXBlX2Jsb2NrID0gcG9wb3Zlci4kZWxlbWVudC5maW5kKCcucG9wb3Zlcl9fdXNlci10eXBlLWJsb2NrJyk7XHJcblx0XHR2YXIgJHVzZXJfdHlwZV9waWxscyA9IHBvcG92ZXIuJGVsZW1lbnQuZmluZCgnLnBvcG92ZXJfX3VzZXItdHlwZS1waWxscycpO1xyXG5cdFx0dmFyICRjb250cmFjdF90eXBlX3BpbGxzID0gcG9wb3Zlci4kZWxlbWVudC5maW5kKCcucG9wb3Zlcl9fY29udHJhY3QtdHlwZS1waWxscycpO1xyXG5cdFx0dmFyICRjb250cmFjdF90eXBlX2lucHV0ID0gcG9wb3Zlci4kZWxlbWVudC5maW5kKCdpbnB1dFtuYW1lPVwiY29udHJhY3RbdHlwZV1cIl0nKTtcclxuICAgICAgICB2YXIgJGNvbnRyYWN0X3BheW1lbnRfdHlwZV9waWxscyA9IHBvcG92ZXIuJGVsZW1lbnQuZmluZCgnLnBvcG92ZXJfX2NvbnRyYWN0LXBheW1lbnQtdHlwZS1waWxscycpO1xyXG4gICAgICAgIHZhciAkY29udHJhY3RfcGF5bWVudF90eXBlX2lucHV0ICA9IHBvcG92ZXIuJGVsZW1lbnQuZmluZCgnaW5wdXRbbmFtZT1cImNvbnRyYWN0W3BheW1lbnRfdHlwZV1cIl0nKTtcclxuICAgICAgICB2YXIgJGNvbnRyYWN0X3BheW1lbnRfdHlwZV9kaXJlY3RfdGV4dCA9IHBvcG92ZXIuJGVsZW1lbnQuZmluZCgnLnBvcG92ZXJfX2NvbnRyYWN0LXBheW1lbnQtdHlwZS1kaXJlY3QtdGV4dCcpO1xyXG5cdFx0dmFyICRjb250cmFjdF9wYXltZW50X3R5cGVfZXNjcm93X3RleHQgPSBwb3BvdmVyLiRlbGVtZW50LmZpbmQoJy5wb3BvdmVyX19jb250cmFjdC1wYXltZW50LXR5cGUtZXNjcm93LXRleHQnKTtcclxuXHRcdHZhciAkdXNlcl90eXBlX2ZyZWVsYW5jZXJfdGV4dCA9IHBvcG92ZXIuJGVsZW1lbnQuZmluZCgnLnBvcG92ZXJfX3VzZXItdHlwZS1mcmVlbGFuY2VyLXRleHQnKTtcclxuXHRcdHZhciAkdXNlcl90eXBlX2VtcGxveWVyX3RleHQgPSBwb3BvdmVyLiRlbGVtZW50LmZpbmQoJy5wb3BvdmVyX191c2VyLXR5cGUtZW1wbG95ZXItdGV4dCcpO1xyXG5cdFx0dmFyICRwYXltZW50X3R5cGVfZGlyZWN0X3RleHQgPSBwb3BvdmVyLiRlbGVtZW50LmZpbmQoJy5wb3BvdmVyX3BheW1lbnRfdHlwZV9kaXJlY3RfdGV4dCcpO1xyXG5cdFx0dmFyICRwYXltZW50X3R5cGVfZXNjcm93X3RleHQgPSBwb3BvdmVyLiRlbGVtZW50LmZpbmQoJy5wb3BvdmVyX3BheW1lbnRfdHlwZV9lc2Nyb3dfdGV4dCcpO1xyXG5cdFx0dmFyICRpbnZpdGF0aW9uX2Zvcm0gPSBwb3BvdmVyLiRlbGVtZW50LmZpbmQoJy5wb3BvdmVyX19pbnZpdGF0aW9uLWZvcm0nKTtcclxuXHRcdHZhciAkbWVtYmVyX3dhc19hZGRlZF9ibG9jayA9ICQoJy5wb3BvdmVyX19tZW1iZXItd2FzLWFkZGVkLWJsb2NrJyk7XHJcblx0XHR2YXIgJG1lbWJlcl93YXNfYWRkZWRfYmxvY2tfY2xvc2VfYnV0dG9uID0gJCgnLnBvcG92ZXJfX21lbWJlci13YXMtYWRkZWQtYmxvY2tfX2Nsb3NlLWJ1dHRvbicpO1xyXG5cdFx0dmFyICRwcm9qZWN0X21lbWJlcl9zZWxlY3QgPSBwb3BvdmVyLiRlbGVtZW50LmZpbmQoJy5wb3BvdmVyLW1lbWJlci1zZWxlY3QnKTtcclxuXHRcdHZhciAkcHJvamVjdF9tZW1iZXJfcm9sZV9zZWxlY3QgPSBwb3BvdmVyLiRlbGVtZW50LmZpbmQoJyNwb3BvdmVyLScgKyAgcG9wb3Zlci5pZCArICdfX3JvbGUnKTtcclxuXHRcdHZhciAkcm9sZV9ibG9jayA9IHBvcG92ZXIuJGVsZW1lbnQuZmluZCgnLnBvcG92ZXJfX2ludml0YXRpb24tZm9ybV9fcm9sZS1ibG9jaycpO1xyXG5cdFx0dmFyICRib2FyZHNfYmxvY2sgPSBwb3BvdmVyLiRlbGVtZW50LmZpbmQoJy5wb3BvdmVyX19pbnZpdGF0aW9uLWZvcm1fX2JvYXJkcy1ibG9jaycpO1xyXG5cdFx0dmFyICRwcm9qZWN0X2JvYXJkc19zZWxlY3QgPSBwb3BvdmVyLiRlbGVtZW50LmZpbmQoJyNwb3BvdmVyLScgKyAgcG9wb3Zlci5pZCArICdfX2JvYXJkcycpO1xyXG5cdFx0dmFyICRpbnZpdGF0aW9uX2Zvcm1fc3VibWl0X2J1dHRvbiA9ICRpbnZpdGF0aW9uX2Zvcm0uZmluZCgnYnV0dG9uW3R5cGU9XCJzdWJtaXRcIl0nKTtcclxuXHRcdHZhciAkaW52aXRhdGlvbl9wYXJhbWV0ZXJzX2Jsb2NrID0gcG9wb3Zlci4kZWxlbWVudC5maW5kKCcucG9wb3Zlcl9faW52aXRhdGlvbi1wYXJhbWV0ZXJzLWJsb2NrJyk7XHJcblx0XHR2YXIgJGZpcnN0X25hbWVfaW5wdXQgPSBwb3BvdmVyLiRlbGVtZW50LmZpbmQoJ2lucHV0W25hbWU9XCJ1c2VyW2ZpcnN0X25hbWVdXCJdJyk7XHJcblx0XHR2YXIgJGxhc3RfbmFtZV9pbnB1dCA9IHBvcG92ZXIuJGVsZW1lbnQuZmluZCgnaW5wdXRbbmFtZT1cInVzZXJbbGFzdF9uYW1lXVwiXScpO1xyXG5cdFx0dmFyICRuYW1lX2Jsb2NrID0gcG9wb3Zlci4kZWxlbWVudC5maW5kKCcucG9wb3Zlcl9faW52aXRhdGlvbi1mb3JtX19uYW1lLWJsb2NrJyk7XHJcblx0XHR2YXIgJGNvbnRyYWN0X2Jsb2NrID0gcG9wb3Zlci4kZWxlbWVudC5maW5kKCcucG9wb3Zlcl9fY29udHJhY3QtYmxvY2snKTtcclxuXHRcdHZhciAkY29udHJhY3RfZGV0YWlsc19ibG9jayA9IHBvcG92ZXIuJGVsZW1lbnQuZmluZCgnLnBvcG92ZXJfX2NvbnRyYWN0LWRldGFpbHMtYmxvY2snKTtcclxuXHRcdHZhciAkaG91cmx5X3JhdGVfYmxvY2sgPSBwb3BvdmVyLiRlbGVtZW50LmZpbmQoJy5wb3BvdmVyX19pbnZpdGF0aW9uLWZvcm1fX2hvdXJseS1yYXRlLWJsb2NrJyk7XHJcblx0XHR2YXIgJGNyZWRpdF9jYXJkX2Jsb2NrID0gcG9wb3Zlci4kZWxlbWVudC5maW5kKCcucG9wb3Zlcl9faW52aXRhdGlvbi1mb3JtX19jcmVkaXQtY2FyZC1ibG9jaycpO1xyXG5cdFx0dmFyICRob3VybHlfcmF0ZV9pbnB1dCA9IHBvcG92ZXIuJGVsZW1lbnQuZmluZCgnW25hbWU9XCJjb250cmFjdFtob3VybHlfcmF0ZV1cIl0nKTtcclxuXHRcdHZhciAkY29udHJhY3RfdGl0bGVfaW5wdXQgPSBwb3BvdmVyLiRlbGVtZW50LmZpbmQoJ1tuYW1lPVwiY29udHJhY3RbdGl0bGVdXCJdJyk7XHJcblx0XHR2YXIgJGhhdmVfY29udHJhY3RfdGV4dCA9IHBvcG92ZXIuJGVsZW1lbnQuZmluZCgnLnBvcG92ZXJfX2hhdmUtY29udHJhY3QtdGV4dCcpO1xyXG5cdFx0dmFyICRtaWxlc3RvbmVfYmxvY2sgPSBwb3BvdmVyLiRlbGVtZW50LmZpbmQoJy5wb3BvdmVyX19taWxlc3RvbmUtYmxvY2snKTtcclxuXHRcdHZhciAkYWRkX21pbGVzdG9uZV9idXR0b24gPSBwb3BvdmVyLiRlbGVtZW50LmZpbmQoJy5wb3BvdmVyX19hZGQtbWlsZXN0b25lLWJ1dHRvbicpO1xyXG5cdFx0dmFyICRtaWxlc3RvbmVfaXRlbXMgPSBwb3BvdmVyLiRlbGVtZW50LmZpbmQoJy5wb3BvdmVyX19taWxlc3RvbmUtaXRlbXMnKTtcclxuXHJcblx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXHJcblxyXG5cdFx0dmFyIHVwZGF0ZV9jb250cmFjdF90eXBlX2lucHV0ID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdGNvbnRyYWN0X3R5cGUgPSAkY29udHJhY3RfdHlwZV9waWxscy5maW5kKCcubmF2LWxpbmsuYWN0aXZlJykuYXR0cignZGF0YS12YWx1ZScpIHx8IG51bGw7XHJcblx0XHRcdCRjb250cmFjdF90eXBlX2lucHV0LnZhbChjb250cmFjdF90eXBlKS5wcm9wKCdkaXNhYmxlZCcsICFjb250cmFjdF90eXBlKTtcclxuXHRcdH07XHJcblx0XHRcclxuXHRcdHZhciB1cGRhdGVfY29udHJhY3RfcGF5bWVudF90eXBlX2lucHV0ID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdGNvbnRyYWN0X3BheW1lbnRfdHlwZSA9ICRjb250cmFjdF9wYXltZW50X3R5cGVfcGlsbHMuZmluZCgnLm5hdi1saW5rLmFjdGl2ZScpLmF0dHIoJ2RhdGEtdmFsdWUnKSB8fCBudWxsO1xyXG5cdFx0XHQkY29udHJhY3RfcGF5bWVudF90eXBlX2lucHV0LnZhbChjb250cmFjdF9wYXltZW50X3R5cGUpLnByb3AoJ2Rpc2FibGVkJywgIWNvbnRyYWN0X3BheW1lbnRfdHlwZSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cclxuXHJcblx0XHR2YXIgdXBkYXRlX3Zpc2liaWxpdHkgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0JHVzZXJfdHlwZV9ibG9jay50b2dnbGVDbGFzcygnZC1ub25lJywgcHJvamVjdC5waXZvdC5yb2xlICE9ICdPV05FUicpO1xyXG5cclxuXHRcdFx0aWYgKHVzZXJfdHlwZSA9PT0gJ0ZSRUVMQU5DRVInKSB7XHJcblx0XHRcdFx0JHVzZXJfdHlwZV9mcmVlbGFuY2VyX3RleHQuYWRkQ2xhc3MoJ3Nob3cnKTtcclxuXHRcdFx0XHQkdXNlcl90eXBlX2VtcGxveWVyX3RleHQucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcclxuXHRcdFx0fSBlbHNlIGlmICh1c2VyX3R5cGUgPT09ICdFTVBMT1lFUicpIHtcclxuXHRcdFx0XHQkdXNlcl90eXBlX2ZyZWVsYW5jZXJfdGV4dC5yZW1vdmVDbGFzcygnc2hvdycpO1xyXG5cdFx0XHRcdCR1c2VyX3R5cGVfZW1wbG95ZXJfdGV4dC5hZGRDbGFzcygnc2hvdycpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoc2VsZWN0ZWRfdXNlcikge1xyXG5cdFx0XHRcdCRpbnZpdGF0aW9uX3BhcmFtZXRlcnNfYmxvY2suYWRkQ2xhc3MoJ3Nob3cnKTtcclxuXHJcblx0XHRcdFx0aWYgKHNlbGVjdGVkX3VzZXIuaWQpIHtcclxuXHRcdFx0XHRcdCRpbnZpdGF0aW9uX2Zvcm0uZmluZCgnW25hbWU9XCJ1c2VyW2lkXVwiXScpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpLnZhbChzZWxlY3RlZF91c2VyLmlkKTtcclxuXHRcdFx0XHRcdCRpbnZpdGF0aW9uX2Zvcm0uZmluZCgnW25hbWU9XCJ1c2VyW2VtYWlsXVwiXScpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdCRpbnZpdGF0aW9uX2Zvcm0uZmluZCgnW25hbWU9XCJ1c2VyW2lkXVwiXScpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblx0XHRcdFx0XHQkaW52aXRhdGlvbl9mb3JtLmZpbmQoJ1tuYW1lPVwidXNlcltlbWFpbF1cIl0nKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKS52YWwoc2VsZWN0ZWRfdXNlci5lbWFpbCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAocHJvamVjdC5waXZvdC5yb2xlID09PSAnT1dORVInICYmIHVzZXJfdHlwZSA9PT0gJ0ZSRUVMQU5DRVInKSB7XHJcblx0XHRcdFx0XHQkcm9sZV9ibG9jay5hZGRDbGFzcygnc2hvdycpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQkcm9sZV9ibG9jay5yZW1vdmVDbGFzcygnc2hvdycpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKHByb2plY3QucGl2b3Qucm9sZSA9PT0gJ09XTkVSJyAmJiB1c2VyX3R5cGUgPT09ICdGUkVFTEFOQ0VSJyAmJiB1c2VyX3JvbGUgPT09ICdDT05UUkFDVE9SJykge1xyXG5cdFx0XHRcdFx0JGJvYXJkc19ibG9jay5hZGRDbGFzcygnc2hvdycpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQkYm9hcmRzX2Jsb2NrLnJlbW92ZUNsYXNzKCdzaG93Jyk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoc2VsZWN0ZWRfdXNlci5pZCkge1xyXG5cdFx0XHRcdFx0JG5hbWVfYmxvY2sucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0JG5hbWVfYmxvY2suYWRkQ2xhc3MoJ3Nob3cnKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChwcm9qZWN0LnBpdm90LnJvbGUgPT09ICdPV05FUicpIHtcclxuXHRcdFx0XHRcdGlmICh1c2VyX3R5cGUgPT09ICdGUkVFTEFOQ0VSJykge1xyXG5cdFx0XHRcdFx0XHRpZiAoc2VsZWN0ZWRfdXNlci5jb250cmFjdCkge1xyXG5cdFx0XHRcdFx0XHRcdCRjb250cmFjdF9ibG9jay5yZW1vdmVDbGFzcygnc2hvdycpO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdCRjb250cmFjdF9ibG9jay5hZGRDbGFzcygnc2hvdycpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHVzZXJfdHlwZSA9PT0gJ0VNUExPWUVSJykge1xyXG5cdFx0XHRcdFx0XHQkY29udHJhY3RfYmxvY2sucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0JGNvbnRyYWN0X2Jsb2NrLnJlbW92ZUNsYXNzKCdzaG93Jyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGlmIChjb250cmFjdF9wYXltZW50X3R5cGUgPT09ICdESVJFQ1QnKSB7XHJcblx0XHRcdFx0XHQkY29udHJhY3RfcGF5bWVudF90eXBlX2RpcmVjdF90ZXh0LmFkZENsYXNzKCdzaG93Jyk7XHJcblx0XHRcdFx0XHQkY29udHJhY3RfcGF5bWVudF90eXBlX2VzY3Jvd190ZXh0LnJlbW92ZUNsYXNzKCdzaG93Jyk7XHJcblx0XHRcdFx0XHQkaG91cmx5X3JhdGVfYmxvY2sucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcclxuXHRcdFx0XHRcdCRtaWxlc3RvbmVfYmxvY2sucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcclxuXHRcdFx0XHRcdCRjb250cmFjdF9kZXRhaWxzX2Jsb2NrLmFkZENsYXNzKCdzaG93Jyk7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChjb250cmFjdF9wYXltZW50X3R5cGUgPT09ICdFU0NST1cnKSB7XHJcblx0XHRcdFx0XHQkY29udHJhY3RfcGF5bWVudF90eXBlX2RpcmVjdF90ZXh0LnJlbW92ZUNsYXNzKCdzaG93Jyk7XHJcblx0XHRcdFx0XHQkY29udHJhY3RfcGF5bWVudF90eXBlX2VzY3Jvd190ZXh0LmFkZENsYXNzKCdzaG93Jyk7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGlmIChjb250cmFjdF90eXBlID09PSAnSE9VUkxZJykge1xyXG5cdFx0XHRcdFx0XHQkY29udHJhY3RfZGV0YWlsc19ibG9jay5hZGRDbGFzcygnc2hvdycpO1xyXG5cdFx0XHRcdFx0XHQkaG91cmx5X3JhdGVfYmxvY2suYWRkQ2xhc3MoJ3Nob3cnKTtcclxuXHRcdFx0XHRcdFx0JG1pbGVzdG9uZV9ibG9jay5yZW1vdmVDbGFzcygnc2hvdycpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChjb250cmFjdF90eXBlID09PSAnRklYRURfUFJJQ0UnKSB7XHJcblx0XHRcdFx0XHRcdCRjb250cmFjdF9kZXRhaWxzX2Jsb2NrLmFkZENsYXNzKCdzaG93Jyk7XHJcblx0XHRcdFx0XHRcdCRob3VybHlfcmF0ZV9ibG9jay5yZW1vdmVDbGFzcygnc2hvdycpO1xyXG5cdFx0XHRcdFx0XHQkbWlsZXN0b25lX2Jsb2NrLmFkZENsYXNzKCdzaG93Jyk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHQkY29udHJhY3RfZGV0YWlsc19ibG9jay5yZW1vdmVDbGFzcygnc2hvdycpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKHNlbGVjdGVkX3VzZXIuY29udHJhY3QpIHtcclxuXHRcdFx0XHRcdCRoYXZlX2NvbnRyYWN0X3RleHQucmVtb3ZlQ2xhc3MoJ2Qtbm9uZScpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQkaGF2ZV9jb250cmFjdF90ZXh0LmFkZENsYXNzKCdkLW5vbmUnKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmICghYXV0aC51c2VyLmRlZmF1bHRfY3JlZGl0X2NhcmQgJiYgWyAnSE9VUkxZJywgJ0ZJWEVEX1BSSUNFJyBdLmluZGV4T2YoY29udHJhY3RfdHlwZSkgPiAtMSAmJiBjb250cmFjdF9wYXltZW50X3R5cGUgPT09ICdFU0NST1cnKSB7XHJcblx0XHRcdFx0XHQkY3JlZGl0X2NhcmRfYmxvY2suYWRkQ2xhc3MoJ3Nob3cnKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0JGNyZWRpdF9jYXJkX2Jsb2NrLnJlbW92ZUNsYXNzKCdzaG93Jyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCRpbnZpdGF0aW9uX3BhcmFtZXRlcnNfYmxvY2sucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcclxuXHRcdFx0XHQvLyAkcHJvamVjdF9tZW1iZXJfc2VsZWN0LmRhdGEoJ3NlbGVjdGl6ZScpLmZvY3VzKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHBvcG92ZXIudXBkYXRlKCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdHZhciB1cGRhdGVfZm9jdXMgPSBmdW5jdGlvbihvcHRpb25zKSB7XHJcblx0XHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cdFx0XHRvcHRpb25zLmFmdGVyID0gb3B0aW9ucy5hZnRlciB8fCBudWxsO1xyXG5cclxuXHRcdFx0aWYgKCFzZWxlY3RlZF91c2VyKSB7XHJcblx0XHRcdFx0JHByb2plY3RfbWVtYmVyX3NlbGVjdC5kYXRhKCdzZWxlY3RpemUnKS5mb2N1cygpO1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdwcm9qZWN0IG1lbWJlciBzZWxlY3QgZm9jdXMnKTtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChbICdzZWxlY3RlZF91c2VyJywgJ3VzZXJfdHlwZScsICd1c2VyX3JvbGUnIF0uaW5kZXhPZihvcHRpb25zLmFmdGVyKSA+IC0xKSB7XHJcblx0XHRcdFx0aWYgKCFzZWxlY3RlZF91c2VyLmlkKSB7XHJcblx0XHRcdFx0XHRpZiAoISRmaXJzdF9uYW1lX2lucHV0LnZhbCgpKSB7XHJcblx0XHRcdFx0XHRcdCRmaXJzdF9uYW1lX2lucHV0LmZvY3VzKCk7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdmaXJzdCBuYW1lIGlucHV0IGZvY3VzJyk7XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZiAoISRsYXN0X25hbWVfaW5wdXQudmFsKCkpIHtcclxuXHRcdFx0XHRcdFx0JGxhc3RfbmFtZV9pbnB1dC5mb2N1cygpO1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnbGFzdCBuYW1lIGlucHV0IGZvY3VzJyk7XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICghc2VsZWN0ZWRfdXNlci5jb250cmFjdCkge1xyXG5cdFx0XHRcdGlmIChjb250cmFjdF9wYXltZW50X3R5cGUgPT09ICdESVJFQ1QnKSB7XHJcblx0XHRcdFx0XHRpZiAoISRjb250cmFjdF90aXRsZV9pbnB1dC52YWwoKSkge1xyXG5cdFx0XHRcdFx0XHQkY29udHJhY3RfdGl0bGVfaW5wdXQuZm9jdXMoKTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRpZiAoY29udHJhY3RfdHlwZSA9PT0gJ0hPVVJMWScpIHtcclxuXHRcdFx0XHRcdFx0aWYgKCEkaG91cmx5X3JhdGVfaW5wdXQudmFsKCkpIHtcclxuXHRcdFx0XHRcdFx0XHQkaG91cmx5X3JhdGVfaW5wdXQuZm9jdXMoKTtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdGlmICghJGNvbnRyYWN0X3RpdGxlX2lucHV0LnZhbCgpKSB7XHJcblx0XHRcdFx0XHRcdFx0JGNvbnRyYWN0X3RpdGxlX2lucHV0LmZvY3VzKCk7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGNvbnRyYWN0X3R5cGUgPT09ICdGSVhFRF9QUklDRScpIHtcclxuXHRcdFx0XHRcdFx0aWYgKCEkY29udHJhY3RfdGl0bGVfaW5wdXQudmFsKCkpIHtcclxuXHRcdFx0XHRcdFx0XHQkY29udHJhY3RfdGl0bGVfaW5wdXQuZm9jdXMoKTtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdC8vXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvL1xyXG5cclxuXHRcdFx0Y29uc29sZS5sb2coJ25vdGhpbmcgdG8gZm9jdXMgOkMnKTtcclxuXHRcdH07XHJcblxyXG5cdFx0dmFyIHVwZGF0ZV92aXNpYmlsaXR5X2FuZF9mb2N1cyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuXHRcdFx0dXBkYXRlX3Zpc2liaWxpdHkob3B0aW9ucyk7XHJcblx0XHRcdHVwZGF0ZV9mb2N1cyhvcHRpb25zKTtcclxuXHRcdH07XHJcblx0XHRcclxuXHRcdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cclxuXHRcdFxyXG5cdFx0JGNvbnRyYWN0X3BheW1lbnRfdHlwZV9waWxscy5maW5kKCcubmF2LWxpbmsnKS5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHQkY29udHJhY3RfcGF5bWVudF90eXBlX3BpbGxzLmZpbmQoJy5uYXYtbGluaycpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdHVwZGF0ZV9jb250cmFjdF9wYXltZW50X3R5cGVfaW5wdXQoKTtcclxuXHRcdFx0dXBkYXRlX3Zpc2liaWxpdHlfYW5kX2ZvY3VzKHsgYWZ0ZXI6ICdjb250cmFjdF9wYXltZW50X3R5cGUnIH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0dXBkYXRlX2NvbnRyYWN0X3BheW1lbnRfdHlwZV9pbnB1dCgpO1xyXG5cclxuXHRcdCR1c2VyX3R5cGVfcGlsbHMuZmluZCgnLm5hdi1saW5rJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0JHVzZXJfdHlwZV9waWxscy5maW5kKCcubmF2LWxpbmsnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHR1c2VyX3R5cGUgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtdmFsdWUnKTtcclxuXHRcdFx0dXBkYXRlX3Zpc2liaWxpdHlfYW5kX2ZvY3VzKCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHR1c2VyX3R5cGUgPSAkdXNlcl90eXBlX3BpbGxzLmZpbmQoJy5uYXYtbGluay5hY3RpdmUnKS5hdHRyKCdkYXRhLXZhbHVlJyk7XHJcblxyXG5cdFx0Ly8gJGNvbnRyYWN0X3R5cGVfcGlsbHMuZmluZCgnLm5hdi1saW5rJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdC8vIFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdC8vIFx0JGNvbnRyYWN0X3R5cGVfcGlsbHMuZmluZCgnLm5hdi1saW5rJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0Ly8gXHQkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdC8vIH0pO1xyXG5cclxuXHRcdCRwcm9qZWN0X21lbWJlcl9zZWxlY3QucmVtb3ZlQ2xhc3MoJ2N1c3RvbS1zZWxlY3QnKS5zZWxlY3RpemUoe1xyXG5cdFx0XHR2YWx1ZUZpZWxkOiAnaWQnLFxyXG5cdFx0XHRzZWFyY2hGaWVsZDogWyAnZW1haWwnLCAnZnVsbF9uYW1lJywgJ3NsdWcnIF0sXHJcblx0XHRcdHBsYWNlaG9sZGVyOiBfXygncG9wb3ZlcnMuaW52aXRlX3Byb2plY3RfbWVtYmVyLmVudGVyX25hbWVfdXNlcm5hbWVfb3JfZW1haWwnKSxcclxuXHJcblx0XHRcdHJlbmRlcjoge1xyXG5cdFx0XHRcdGl0ZW06IGZ1bmN0aW9uKGl0ZW0sIGVzY2FwZSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJzZWxlY3RpemUtaXRlbSArIGlzLXVzZXIgJyArIChpdGVtLmlzX3NlbGVjdGVkID8gJ2lzLXNlbGVjdGVkJyA6ICcnKSArICdcIj4nICtcclxuXHRcdFx0XHRcdFx0XHQoaXRlbS5pbWFnZVxyXG5cdFx0XHRcdFx0XHRcdFx0PyAnPGltZyBjbGFzcz1cInNlbGVjdGl6ZS1pdGVtX19pbWFnZVwiIHNyYz1cIicgKyBpdGVtLmltYWdlLnVybHMudGlueSArICdcIiBhbHQ9XCJcIj4nXHJcblx0XHRcdFx0XHRcdFx0XHQ6ICcnXHJcblx0XHRcdFx0XHRcdFx0KSArXHJcblx0XHRcdFx0XHRcdFx0JzxzcGFuIGNsYXNzPVwic2VsZWN0aXplLWl0ZW1fX3RpdGxlXCI+JyArXHJcblx0XHRcdFx0XHRcdFx0XHQoaXRlbS5mdWxsX25hbWVcclxuXHRcdFx0XHRcdFx0XHRcdFx0PyBlc2NhcGUoaXRlbS5mdWxsX25hbWUpICsgJyAoJyArIGl0ZW0uc2x1ZyArICcpJ1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQ6IGl0ZW0uc2x1Z1xyXG5cdFx0XHRcdFx0XHRcdFx0KSArXHJcblx0XHRcdFx0XHRcdFx0Jzwvc3Bhbj4nICtcclxuXHRcdFx0XHRcdFx0JzwvZGl2PidcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0b3B0aW9uOiBmdW5jdGlvbihpdGVtLCBlc2NhcGUpIHtcclxuXHRcdFx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwiJyArXHJcblx0XHRcdFx0XHRcdFx0J3NlbGVjdGl6ZS1pdGVtICsgaXMtdXNlciAnICtcclxuXHRcdFx0XHRcdFx0XHQoaXRlbS5pc19qb2luZWRfcHJvamVjdCA/ICdoYXMtZGVzY3JpcHRpb24gaXMtZGlzYWJsZWQnIDogJycpICtcclxuXHRcdFx0XHRcdFx0J1wiPicgK1xyXG5cdFx0XHRcdFx0XHRcdChpdGVtLmltYWdlXHJcblx0XHRcdFx0XHRcdFx0XHQ/ICc8aW1nIGNsYXNzPVwic2VsZWN0aXplLWl0ZW1fX2ltYWdlXCIgc3JjPVwiJyArIGl0ZW0uaW1hZ2UudXJscy50aW55ICsgJ1wiIGFsdD1cIlwiPidcclxuXHRcdFx0XHRcdFx0XHRcdDogJydcclxuXHRcdFx0XHRcdFx0XHQpICtcclxuXHRcdFx0XHRcdFx0XHQnPHNwYW4gY2xhc3M9XCJzZWxlY3RpemUtaXRlbV9fdGl0bGVcIj4nICtcclxuXHRcdFx0XHRcdFx0XHRcdChpdGVtLmZ1bGxfbmFtZVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ/IGVzY2FwZShpdGVtLmZ1bGxfbmFtZSkgKyAnICgnICsgaXRlbS5zbHVnICsgJyknXHJcblx0XHRcdFx0XHRcdFx0XHRcdDogaXRlbS5zbHVnXHJcblx0XHRcdFx0XHRcdFx0XHQpICtcclxuXHRcdFx0XHRcdFx0XHQnPC9zcGFuPicgK1xyXG5cdFx0XHRcdFx0XHRcdChpdGVtLmlzX2pvaW5lZF9wcm9qZWN0XHJcblx0XHRcdFx0XHRcdFx0XHQ/ICc8c3BhbiBjbGFzcz1cInNlbGVjdGl6ZS1pdGVtX19kZXNjcmlwdGlvblwiPihhbHJlYWR5IGpvaW5lZCk8L3NwYW4+J1xyXG5cdFx0XHRcdFx0XHRcdFx0OiAnJ1xyXG5cdFx0XHRcdFx0XHRcdCkgK1xyXG5cdFx0XHRcdFx0XHQnPC9kaXY+J1xyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0bG9hZDogZnVuY3Rpb24ocXVlcnksIGNhbGxiYWNrKSB7XHJcblx0XHRcdFx0dGhpcy5jbGVhck9wdGlvbnMoKTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIHJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiAnL3VzZXJzL2F1dG9jb21wbGV0ZScsXHJcblxyXG5cdFx0XHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdFx0XHRpbnZpdGluZ19wcm9qZWN0X2lkOiBwcm9qZWN0LmlkLFxyXG5cdFx0XHRcdFx0XHRxdWVyeTogcXVlcnksXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gY2FsbGJhY2socmVzcG9uc2UuZGF0YSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oaXRlbV9pZCkge1xyXG5cdFx0XHRcdGlmICghaXRlbV9pZCkge1xyXG5cdFx0XHRcdFx0c2VsZWN0ZWRfdXNlciA9IG51bGw7XHJcblx0XHRcdFx0XHQkaW52aXRhdGlvbl9mb3JtLmZpbmQoJ1tuYW1lPVwidXNlcltpZF1cIl0nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG5cdFx0XHRcdFx0JGludml0YXRpb25fZm9ybS5maW5kKCdbbmFtZT1cInVzZXJbZW1haWxdXCJdJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuXHRcdFx0XHRcdHVwZGF0ZV92aXNpYmlsaXR5X2FuZF9mb2N1cygpO1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0c2VsZWN0ZWRfdXNlciA9IHRoaXMub3B0aW9uc1tpdGVtX2lkXTtcclxuXHJcblx0XHRcdFx0aWYgKCFzZWxlY3RlZF91c2VyLmlkKSB7XHJcblx0XHRcdFx0XHR2YXIgZW1haWxfcGFydHMgPSBzZWxlY3RlZF91c2VyLmVtYWlsLnNwbGl0KC9ALylbMF0uc3BsaXQoL1teYS16MC05XSsvaSk7XHJcblx0XHRcdFx0XHQkZmlyc3RfbmFtZV9pbnB1dC52YWwoZW1haWxfcGFydHNbMF0gfHwgJycpO1xyXG5cdFx0XHRcdFx0JGxhc3RfbmFtZV9pbnB1dC52YWwoZW1haWxfcGFydHNbMV0gfHwgJycpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKHNlbGVjdGVkX3VzZXIuY29udHJhY3QpIHtcclxuXHRcdFx0XHRcdCRoYXZlX2NvbnRyYWN0X3RleHQuZmluZCgnLnBvcG92ZXJfX2hhdmUtY29udHJhY3QtdGV4dF9faG91cmx5LXJhdGUnKS50ZXh0KHNlbGVjdGVkX3VzZXIuY29udHJhY3QuaG91cmx5X3JhdGUpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQkaG91cmx5X3JhdGVfaW5wdXQudmFsKHNlbGVjdGVkX3VzZXIuaG91cmx5X3JhdGUgfHwgJycpO1xyXG5cdFx0XHRcdFx0JGNvbnRyYWN0X3RpdGxlX2lucHV0LnZhbChzZWxlY3RlZF91c2VyLnByb2Zlc3Npb25hbF90aXRsZSB8fCAnJyk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR1cGRhdGVfdmlzaWJpbGl0eV9hbmRfZm9jdXMoeyBhZnRlcjogJ3NlbGVjdGVkX3VzZXInIH0pO1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0b25Jbml0aWFsaXplOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR2YXIgc2VsZWN0aXplID0gdGhpcztcclxuXHRcdFx0XHRzZWxlY3RpemUuJGNvbnRyb2xfaW5wdXQuYXR0cignYXV0b2NvbXBsZXRlJywgJ3N0LWRpc2FibGVkJyk7XHJcblx0XHRcdFx0c2VsZWN0aXplLiRjb250cm9sX2lucHV0LmZvY3VzKCk7XHJcblxyXG5cdFx0XHRcdHNlbGVjdGl6ZS4kY29udHJvbF9pbnB1dC5vbignaW5wdXQnLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdHZhciBvcmlnaW5hbF92YWx1ZSA9ICQodGhpcykudmFsKCk7XHJcblx0XHRcdFx0XHR2YXIgZml4ZWRfdmFsdWUgPSAkKHRoaXMpLnZhbCgpLnJlcGxhY2UoL15tYWlsdG86LywgJycpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChvcmlnaW5hbF92YWx1ZSAhPSBmaXhlZF92YWx1ZSkge1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpLnZhbChmaXhlZF92YWx1ZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0sXHJcblx0XHR9KTtcclxuXHJcblx0XHQkcHJvamVjdF9tZW1iZXJfcm9sZV9zZWxlY3QucmVtb3ZlQ2xhc3MoJ2N1c3RvbS1zZWxlY3QnKS5zZWxlY3RpemUoe1xyXG5cdFx0XHR2YWx1ZUZpZWxkOiAndmFsdWUnLFxyXG5cdFx0XHQvLyBzZWFyY2hGaWVsZDogWyAnZW1haWwnLCAnZnVsbF9uYW1lJywgJ3NsdWcnIF0sXHJcblx0XHRcdC8vIHBsYWNlaG9sZGVyOiAnRW50ZXIgcm9sZSBuYW1lJyxcclxuXHJcblx0XHRcdHJlbmRlcjoge1xyXG5cdFx0XHRcdGl0ZW06IGZ1bmN0aW9uKGl0ZW0sIGVzY2FwZSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJzZWxlY3RpemUtaXRlbSArIGlzLXByb2plY3Qtcm9sZVwiPicgK1xyXG5cdFx0XHRcdFx0XHRcdCc8c3BhbiBjbGFzcz1cInNlbGVjdGl6ZS1pdGVtX190aXRsZVwiPicgKyBpdGVtLnRpdGxlICsgJzwvc3Bhbj4nICtcclxuXHRcdFx0XHRcdFx0JzwvZGl2PidcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0b3B0aW9uOiBmdW5jdGlvbihpdGVtLCBlc2NhcGUpIHtcclxuXHRcdFx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwic2VsZWN0aXplLWl0ZW0gKyBpcy1wcm9qZWN0LXJvbGVcIj4nICtcclxuXHRcdFx0XHRcdFx0XHQnPHNwYW4gY2xhc3M9XCJzZWxlY3RpemUtaXRlbV9fdGl0bGVcIj4nICsgaXRlbS50aXRsZSArICc8L3NwYW4+JyArXHJcblx0XHRcdFx0XHRcdFx0JzxzcGFuIGNsYXNzPVwic2VsZWN0aXplLWl0ZW1fX2Rlc2NyaXB0aW9uXCI+JyArICBpdGVtLmRlc2NyaXB0aW9uICsgJzwvc3Bhbj4nICtcclxuXHRcdFx0XHRcdFx0JzwvZGl2PidcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihpdGVtX2lkKSB7XHJcblx0XHRcdFx0dXNlcl9yb2xlID0gaXRlbV9pZDtcclxuXHRcdFx0XHR1cGRhdGVfdmlzaWJpbGl0eV9hbmRfZm9jdXMoeyBhZnRlcjogJ3VzZXJfcm9sZScgfSk7XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRvbkluaXRpYWxpemU6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHZhciBzZWxlY3RpemUgPSB0aGlzO1xyXG5cclxuXHRcdFx0XHRzZWxlY3RpemUuYWRkT3B0aW9uKHtcclxuXHRcdFx0XHRcdHZhbHVlOiAnQ09OVFJBQ1RPUicsXHJcblx0XHRcdFx0XHR0aXRsZTogX18oJ2NvbW1vbi5wcm9qZWN0X21lbWJlcnMucm9sZXMuQ09OVFJBQ1RPUi5leHRyYV90aXRsZScpLFxyXG5cdFx0XHRcdFx0ZGVzY3JpcHRpb246IF9fKCdjb21tb24ucHJvamVjdF9tZW1iZXJzLnJvbGVzLkNPTlRSQUNUT1IuZGVzY3JpcHRpb24nKSxcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0aWYgKHByb2plY3QucGl2b3Qucm9sZSA9PSAnT1dORVInKSB7XHJcblx0XHRcdFx0XHRzZWxlY3RpemUuYWRkT3B0aW9uKHtcclxuXHRcdFx0XHRcdFx0dmFsdWU6ICdBRE1JTklTVFJBVE9SJyxcclxuXHRcdFx0XHRcdFx0dGl0bGU6IF9fKCdjb21tb24ucHJvamVjdF9tZW1iZXJzLnJvbGVzLkFETUlOSVNUUkFUT1IuZXh0cmFfdGl0bGUnKSxcclxuXHRcdFx0XHRcdFx0ZGVzY3JpcHRpb246IF9fKCdjb21tb24ucHJvamVjdF9tZW1iZXJzLnJvbGVzLkFETUlOSVNUUkFUT1IuZGVzY3JpcHRpb24nKSxcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0c2VsZWN0aXplLmFkZEl0ZW0oJ0NPTlRSQUNUT1InKTtcclxuXHRcdFx0XHRzZWxlY3RpemUuJGNvbnRyb2xfaW5wdXQuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xyXG5cclxuXHRcdFx0XHRzZWxlY3RpemUuJGNvbnRyb2xfaW5wdXQub24oJ2lucHV0JywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSxcclxuXHRcdH0pO1xyXG5cclxuXHRcdCRwcm9qZWN0X2JvYXJkc19zZWxlY3QucmVtb3ZlQ2xhc3MoJ2N1c3RvbS1zZWxlY3QnKS5zZWxlY3RpemUoe1xyXG5cdFx0XHRwbHVnaW5zOiBbICdyZW1vdmVfYnV0dG9uJyBdLFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JGNvbnRyYWN0X3R5cGVfcGlsbHMuZmluZCgnLm5hdi1saW5rJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0JGNvbnRyYWN0X3R5cGVfcGlsbHMuZmluZCgnLm5hdi1saW5rJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHQkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0dXBkYXRlX2NvbnRyYWN0X3R5cGVfaW5wdXQoKTtcclxuXHRcdFx0dXBkYXRlX3Zpc2liaWxpdHlfYW5kX2ZvY3VzKHsgYWZ0ZXI6ICdjb250cmFjdF90eXBlJyB9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHVwZGF0ZV9jb250cmFjdF90eXBlX2lucHV0KCk7XHJcblxyXG5cdFx0Ly8gJGNvbnRyYWN0X2Jsb2NrLnRvZ2dsZUNsYXNzKCdzaG93JywgcHJvamVjdC5waXZvdC5yb2xlID09ICdPV05FUicpO1xyXG5cclxuXHRcdC8vICRpbnZpdGF0aW9uX3BhcmFtZXRlcnNfYmxvY2sub24oJ3Nob3duLmJzLmNvbGxhcHNlJywgZnVuY3Rpb24oKSB7XHJcblx0XHQvLyBcdCRpbnZpdGF0aW9uX3BhcmFtZXRlcnNfYmxvY2suZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl0sIGlucHV0W3R5cGU9XCJudW1iZXJcIl0nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0Ly8gXHRcdGlmICghJCh0aGlzKS52YWwoKSAmJiAkKHRoaXMpLmlzKCc6dmlzaWJsZScpKSB7XHJcblx0XHQvLyBcdFx0XHQkKHRoaXMpLmZvY3VzKCk7XHJcblx0XHQvLyBcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHQvLyBcdFx0fVxyXG5cdFx0Ly8gXHR9KTtcclxuXHRcdC8vIH0pO1xyXG5cclxuXHRcdC8vICRpc190aW1lX3RyYWNrYWJsZV9jaGVja2JveC5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcblx0XHQvLyBcdGlmICgkaXNfdGltZV90cmFja2FibGVfY2hlY2tib3gucHJvcCgnY2hlY2tlZCcpKSB7XHJcblx0XHQvLyBcdFx0JHdpdGhfcHJvdGVjdGlvbl90ZXh0LnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxuXHRcdC8vIFx0XHQkd2l0aG91dF9wcm90ZWN0aW9uX3RleHQuYWRkQ2xhc3MoJ2Qtbm9uZScpO1xyXG5cdFx0Ly8gXHR9IGVsc2Uge1xyXG5cdFx0Ly8gXHRcdCR3aXRoX3Byb3RlY3Rpb25fdGV4dC5hZGRDbGFzcygnZC1ub25lJyk7XHJcblx0XHQvLyBcdFx0JHdpdGhvdXRfcHJvdGVjdGlvbl90ZXh0LnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxuXHRcdC8vIFx0fVxyXG5cclxuXHRcdC8vIFx0aWYgKCRpc190aW1lX3RyYWNrYWJsZV9jaGVja2JveC5wcm9wKCdjaGVja2VkJykgJiYgIXNlbGVjdGVkX3VzZXIuY29udHJhY3QpIHtcclxuXHRcdC8vIFx0XHQkaG91cmx5X3JhdGVfYmxvY2suY29sbGFwc2UoJ3Nob3cnKTtcclxuXHRcdC8vIFx0XHQkaG91cmx5X3JhdGVfaW5wdXQuZm9jdXMoKTtcclxuXHRcdC8vIFx0fSBlbHNlIHtcclxuXHRcdC8vIFx0XHQkaG91cmx5X3JhdGVfYmxvY2suY29sbGFwc2UoJ2hpZGUnKTtcclxuXHRcdC8vIFx0fVxyXG5cdFx0Ly8gfSk7XHJcblxyXG5cdFx0Ly8gcG9wb3Zlci4kZWxlbWVudC5maW5kKCcucG9wb3Zlcl9faW52aXRhdGlvbi1mb3JtX19tZXNzYWdlJykub24oJ2lucHV0JywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdC8vIFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdC8vIFx0JCh0aGlzKS5pbm5lckhlaWdodCgwKTtcclxuXHRcdC8vIFx0JCh0aGlzKS5pbm5lckhlaWdodCh0aGlzLnNjcm9sbEhlaWdodCk7XHJcblx0XHQvLyB9KTtcclxuXHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xyXG5cclxuXHRcdGZ1bmN0aW9uIGluaXRpYWxpemVfbWlsZXN0b25lX2l0ZW0oKSB7XHJcblx0XHRcdHZhciAkc2VsZiA9ICQodGhpcyk7XHJcblx0XHRcdHZhciBpbmRleCA9IHBhcnNlSW50KCRzZWxmLmF0dHIoJ2RhdGEtaW5kZXgnKSk7XHJcblx0XHRcdHZhciBtaWxlc3RvbmUgPSBtaWxlc3RvbmVzW2luZGV4XTtcclxuXHJcblx0XHRcdCRzZWxmLmZpbmQoJ2lucHV0W25hbWU9XCJjb250cmFjdFttaWxlc3RvbmVzXVsnICsgaW5kZXggKyAnXVt0aXRsZV1cIl0nKS5vbignaW5wdXQnLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRtaWxlc3RvbmUudGl0bGUgPSAkKHRoaXMpLnZhbCgpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdCRzZWxmLmZpbmQoJ2lucHV0W25hbWU9XCJjb250cmFjdFttaWxlc3RvbmVzXVsnICsgaW5kZXggKyAnXVthbW91bnRdXCJdJykub24oJ2lucHV0JywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0bWlsZXN0b25lLmFtb3VudCA9IHBhcnNlRmxvYXQoJCh0aGlzKS52YWwoKSk7XHJcblx0XHRcdFx0Ly8gY29uc29sZS5sb2cobWlsZXN0b25lKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQkc2VsZi5maW5kKCcucG9wb3Zlcl9fbWlsZXN0b25lLWl0ZW1fX3JlbW92ZS1idXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR2YXIgaW5kZXggPSBwYXJzZUludCgkc2VsZi5hdHRyKCdkYXRhLWluZGV4JykpO1xyXG5cdFx0XHRcdG1pbGVzdG9uZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuXHRcdFx0XHRyZW5kZXJfbWlsZXN0b25lcygpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiByZW5kZXJfbWlsZXN0b25lcygpIHtcclxuXHRcdFx0JG1pbGVzdG9uZV9pdGVtcy5odG1sKCcnKTtcclxuXHJcblx0XHRcdG1pbGVzdG9uZXMuZm9yRWFjaChmdW5jdGlvbihtaWxlc3RvbmUsIG1pbGVzdG9uZV9pbmRleCkge1xyXG5cdFx0XHRcdCQodGVtcGxhdGUoJ2ludml0ZS1wcm9qZWN0LW1lbWJlci1wb3BvdmVyLW1pbGVzdG9uZS1pdGVtJywge1xyXG5cdFx0XHRcdFx0aWQ6IHBvcG92ZXIuaWQsXHJcblx0XHRcdFx0XHRpbmRleDogbWlsZXN0b25lX2luZGV4LFxyXG5cdFx0XHRcdFx0dGl0bGU6IG1pbGVzdG9uZS50aXRsZSxcclxuXHRcdFx0XHRcdGFtb3VudDogbWlsZXN0b25lLmFtb3VudCxcclxuXHRcdFx0XHR9KSkuZWFjaChpbml0aWFsaXplX21pbGVzdG9uZV9pdGVtKS5hcHBlbmRUbygkbWlsZXN0b25lX2l0ZW1zKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmVuZGVyX21pbGVzdG9uZXMoKTtcclxuXHJcblx0XHQkYWRkX21pbGVzdG9uZV9idXR0b24uY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdG1pbGVzdG9uZXMucHVzaCh7XHJcblx0XHRcdFx0dGl0bGU6IG51bGwsXHJcblx0XHRcdFx0YW1vdW50OiBudWxsLFxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJlbmRlcl9taWxlc3RvbmVzKCk7XHJcblx0XHRcdCRjb250ZW50LnNjcm9sbFRvcCgkY29udGVudFswXS5zY3JvbGxIZWlnaHQpO1xyXG5cdFx0XHQkbWlsZXN0b25lX2l0ZW1zLmNoaWxkcmVuKCkubGFzdCgpLmZpbmQoJ2lucHV0OmZpcnN0JykuZm9jdXMoKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdChmdW5jdGlvbiBpbml0aWFsaXplX3N0cmlwZV9pbnB1dCgpIHtcclxuXHRcdFx0dmFyIGVsZW1lbnRzID0gc3RyaXBlLmVsZW1lbnRzKCk7XHJcblxyXG5cdFx0XHR2YXIgc3R5bGUgPSB7XHJcblx0XHRcdFx0YmFzZToge1xyXG5cdFx0XHRcdFx0Y29sb3I6ICcjMzIzMjVkJyxcclxuXHRcdFx0XHRcdGxpbmVIZWlnaHQ6ICcxOHB4JyxcclxuXHRcdFx0XHRcdGZvbnRGYW1pbHk6ICdcIkhlbHZldGljYSBOZXVlXCIsIEhlbHZldGljYSwgc2Fucy1zZXJpZicsXHJcblx0XHRcdFx0XHRmb250U21vb3RoaW5nOiAnYW50aWFsaWFzZWQnLFxyXG5cdFx0XHRcdFx0Zm9udFNpemU6ICcxNnB4JyxcclxuXHJcblx0XHRcdFx0XHQnOjpwbGFjZWhvbGRlcic6IHtcclxuXHRcdFx0XHRcdFx0Y29sb3I6ICcjYWFiN2M0J1xyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHRpbnZhbGlkOiB7XHJcblx0XHRcdFx0XHRjb2xvcjogJyNmYTc1NWEnLFxyXG5cdFx0XHRcdFx0aWNvbkNvbG9yOiAnI2ZhNzU1YScsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGNhcmQgPSBlbGVtZW50cy5jcmVhdGUoJ2NhcmQnLCB7IHN0eWxlOiBzdHlsZSB9KTtcclxuXHRcdFx0Y2FyZC5tb3VudChwb3BvdmVyLiRlbGVtZW50LmZpbmQoJy5zdHJpcGUtY2FyZC1lbGVtZW50JylbMF0gfHwgbnVsbCk7XHJcblxyXG5cdFx0XHRjYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdFx0aWYgKGV2ZW50LmVycm9yKSB7XHJcblx0XHRcdFx0XHRwb3BvdmVyLiRlbGVtZW50LmZpbmQoJy5zdHJpcGUtY2FyZC1lcnJvcnMnKS50ZXh0KGV2ZW50LmVycm9yLm1lc3NhZ2UpLnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0cG9wb3Zlci4kZWxlbWVudC5maW5kKCcuc3RyaXBlLWNhcmQtZXJyb3JzJykudGV4dCgnJykuYWRkQ2xhc3MoJ2Qtbm9uZScpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9KSgpO1xyXG5cclxuXHRcdCRpbnZpdGF0aW9uX2Zvcm0uc3VibWl0KGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRpZiAoIXNlbGVjdGVkX3VzZXIpIHtcclxuXHRcdFx0XHQkcHJvamVjdF9tZW1iZXJfc2VsZWN0LmRhdGEoJ3NlbGVjdGl6ZScpLiRjb250cm9sX2lucHV0LmZvY3VzKCk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoJGludml0YXRpb25fZm9ybV9zdWJtaXRfYnV0dG9uLmhhc0NsYXNzKCdpcy1sb2FkaW5nJykpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCRpbnZpdGF0aW9uX2Zvcm1fc3VibWl0X2J1dHRvbi5hZGRDbGFzcygnaXMtbG9hZGluZyBkaXNhYmxlZCcpO1xyXG5cclxuXHRcdFx0aWYgKHByb2plY3QucGl2b3Qucm9sZSA9PSAnT1dORVInICYmIHVzZXJfdHlwZSA9PSAnRU1QTE9ZRVInKSB7XHJcblx0XHRcdFx0cG9wb3Zlci4kZWxlbWVudC5maW5kKCdbbmFtZT1cInByb2plY3RfbWVtYmVyW3JvbGVdXCJdJykudmFsKCdPV05FUicpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHBvcG92ZXIuJGVsZW1lbnQuZmluZCgnW25hbWU9XCJwcm9qZWN0X21lbWJlcltyb2xlXVwiXScpLnZhbCgkcHJvamVjdF9tZW1iZXJfcm9sZV9zZWxlY3QudmFsKCkpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gKGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcblx0XHRcdFx0aWYgKCEkY29udHJhY3RfYmxvY2suaGFzQ2xhc3MoJ3Nob3cnKSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGNhbGxiYWNrKCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoIWNvbnRyYWN0X3R5cGUgfHwgISRjcmVkaXRfY2FyZF9ibG9jay5oYXNDbGFzcygnc2hvdycpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gY2FsbGJhY2soKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiBzdHJpcGUuY3JlYXRlVG9rZW4oY2FyZCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuXHRcdFx0XHRcdGlmIChyZXN1bHQuZXJyb3IpIHtcclxuXHRcdFx0XHRcdFx0JGludml0YXRpb25fZm9ybV9zdWJtaXRfYnV0dG9uLnJlbW92ZUNsYXNzKCdpcy1sb2FkaW5nIGRpc2FibGVkJyk7XHJcblx0XHRcdFx0XHRcdCRpbnZpdGF0aW9uX2Zvcm0uZmluZCgnLnN0cmlwZS1jYXJkLWVycm9ycycpLnRleHQocmVzdWx0LmVycm9yLm1lc3NhZ2UpLnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdCRpbnZpdGF0aW9uX2Zvcm0uZmluZCgnLnN0cmlwZS1jYXJkLWVycm9ycycpLmFkZENsYXNzKCdkLW5vbmUnKTtcclxuXHRcdFx0XHRcdCRpbnZpdGF0aW9uX2Zvcm0uZmluZCgnW25hbWU9XCJzdHJpcGVfdG9rZW5faWRcIl0nKS52YWwocmVzdWx0LnRva2VuLmlkKTtcclxuXHRcdFx0XHRcdHJldHVybiBjYWxsYmFjaygpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KShmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXR1cm4gcmVxdWVzdCh7XHJcblx0XHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcclxuXHRcdFx0XHRcdHVybDogJy9wcm9qZWN0cy8nICsgcHJvamVjdC5pZCArICcvaW52aXRlX21lbWJlcicsXHJcblx0XHRcdFx0XHRkYXRhOiAkaW52aXRhdGlvbl9mb3JtLnNlcmlhbGl6ZSgpLFxyXG5cdFx0XHRcdH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcblx0XHRcdFx0XHQkaW52aXRhdGlvbl9mb3JtX3N1Ym1pdF9idXR0b24ucmVtb3ZlQ2xhc3MoJ2lzLWxvYWRpbmcgZGlzYWJsZWQnKTtcclxuXHJcblx0XHRcdFx0XHRpZiAobmV3IFZhbGlkYXRvcigkaW52aXRhdGlvbl9mb3JtLCByZXNwb25zZSkuZmFpbHMoKSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKHJlc3BvbnNlLmVycm9yKSB7XHJcblx0XHRcdFx0XHRcdCQubm90aWZ5KHJlc3BvbnNlLmVycm9yLCAnZXJyb3InKTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHZhciBwcm9qZWN0X21lbWJlciA9IHByb2plY3QubWVtYmVycy5maWx0ZXIoZnVuY3Rpb24oY3VycmVudF9wcm9qZWN0X21lbWJlcikge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gY3VycmVudF9wcm9qZWN0X21lbWJlci5pZCA9PSByZXNwb25zZS5kYXRhLmlkO1xyXG5cdFx0XHRcdFx0fSlbMF0gfHwgbnVsbDtcclxuXHJcblx0XHRcdFx0XHRpZiAoIXByb2plY3RfbWVtYmVyKSB7XHJcblx0XHRcdFx0XHRcdHByb2plY3RfbWVtYmVyID0gcmVzcG9uc2UuZGF0YTtcclxuXHRcdFx0XHRcdFx0cHJvamVjdC5tZW1iZXJzLnB1c2gocHJvamVjdF9tZW1iZXIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHByb2plY3QucmVuZGVyTWVtYmVycygpO1xyXG5cclxuXHRcdFx0XHRcdGRhc2hib2FyZC5zZWxlY3RlZF9ib2FyZCAmJiAoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdHZhciBib2FyZF9tZW1iZXIgPSByZXNwb25zZS5kYXRhLmJvYXJkX21lbWJlcnMuZmlsdGVyKGZ1bmN0aW9uKGJvYXJkX21lbWJlcikge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBkYXNoYm9hcmQuc2VsZWN0ZWRfYm9hcmQuaWQgPT0gYm9hcmRfbWVtYmVyLmJvYXJkX2lkO1xyXG5cdFx0XHRcdFx0XHR9KVswXSB8fCBudWxsO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYgKCFib2FyZF9tZW1iZXIpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdGJvYXJkX21lbWJlci51c2VyID0gcmVzcG9uc2UuZGF0YS51c2VyO1xyXG5cdFx0XHRcdFx0XHRib2FyZF9tZW1iZXIucHJvamVjdF9tZW1iZXIgPSBPYmplY3QuYXNzaWduKHt9LCBwcm9qZWN0X21lbWJlcik7XHJcblx0XHRcdFx0XHRcdGRhc2hib2FyZC5zZWxlY3RlZF9ib2FyZC5tZW1iZXJzLnB1c2goYm9hcmRfbWVtYmVyKTtcclxuXHRcdFx0XHRcdFx0ZGFzaGJvYXJkLnNlbGVjdGVkX2JvYXJkLnJlbmRlck1lbWJlcnMoKTtcclxuXHRcdFx0XHRcdH0pKCk7XHJcblxyXG5cdFx0XHRcdFx0JGludml0YXRpb25fZm9ybS5yZW1vdmVDbGFzcygnc2hvdycpO1xyXG5cdFx0XHRcdFx0JG1lbWJlcl93YXNfYWRkZWRfYmxvY2suYWRkQ2xhc3MoJ3Nob3cnKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkbWVtYmVyX3dhc19hZGRlZF9ibG9ja19jbG9zZV9idXR0b24uY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cG9wb3Zlci5jbG9zZSgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0dXBkYXRlX3Zpc2liaWxpdHkoKTtcclxuXHR9O1xyXG5cclxuXHRwb3BvdmVyLnNob3duID0gZnVuY3Rpb24oKSB7XHJcblx0XHR1cGRhdGVfZm9jdXMoKTtcclxuXHR9O1xyXG59O1xyXG4iLCJwb3BvdmVycy5tYW5hZ2VfcHJvamVjdF9ib2FyZF9tZW1iZXJzID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cclxuXHR2YXIgcG9wb3ZlciA9IG5ldyBQb3BvdmVyKHtcclxuXHRcdHRyaWdnZXI6IG9wdGlvbnMudHJpZ2dlcixcclxuXHRcdGFycm93OiBmYWxzZSxcclxuXHJcblx0XHRjb250ZW50OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmV0dXJuIHRlbXBsYXRlKCdtYW5hZ2UtcHJvamVjdC1ib2FyZC1tZW1iZXJzLXBvcG92ZXInLCB7XHJcblx0XHRcdFx0dGl0bGU6IG9wdGlvbnMudGl0bGUgfHwgJ01lbWJlcnMnLFxyXG5cdFx0XHRcdHByb2plY3Q6IG9wdGlvbnMucHJvamVjdCxcclxuXHRcdFx0XHRwcm9qZWN0X2JvYXJkOiBvcHRpb25zLnByb2plY3RfYm9hcmQsXHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHR9KTtcclxuXHJcblx0cG9wb3Zlci5pbml0aWFsaXplID0gZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgcHJvamVjdCA9IG9wdGlvbnMucHJvamVjdDtcclxuXHRcdHZhciBwcm9qZWN0X2JvYXJkID0gb3B0aW9ucy5wcm9qZWN0X2JvYXJkO1xyXG5cdFx0dmFyICRtZW1iZXJfc2VsZWN0ID0gcG9wb3Zlci4kZWxlbWVudC5maW5kKCcucG9wb3Zlci1tZW1iZXItc2VsZWN0Jyk7XHJcblx0XHR2YXIgJG1lbWJlcl9saXN0ID0gcG9wb3Zlci4kZWxlbWVudC5maW5kKCcucG9wb3Zlci1tZW1iZXItbGlzdCcpO1xyXG5cdFx0dmFyICRpbnZpdGF0aW9uX2Zvcm0gPSBwb3BvdmVyLiRlbGVtZW50LmZpbmQoJy5wb3BvdmVyX19pbnZpdGF0aW9uLWZvcm0nKTtcclxuXHRcdHZhciAkaW52aXRhdGlvbl9mb3JtX2J1dHRvbiA9ICRpbnZpdGF0aW9uX2Zvcm0uZmluZCgnYnV0dG9uW3R5cGU9XCJzdWJtaXRcIl0nKTtcclxuXHJcblx0XHQkbWVtYmVyX3NlbGVjdC5yZW1vdmVDbGFzcygnY3VzdG9tLXNlbGVjdCcpLnNlbGVjdGl6ZSh7XHJcblx0XHRcdGNsb3NlQWZ0ZXJTZWxlY3Q6IGZhbHNlLFxyXG5cdFx0XHRzZWxlY3RPblRhYjogZmFsc2UsXHJcblx0XHRcdHZhbHVlRmllbGQ6ICdpZCcsXHJcbiAgICAgICAgICAgIHNlYXJjaEZpZWxkOiBbICdzbHVnJywgJ2Z1bGxfbmFtZScsICdlbWFpbCcgXSxcclxuXHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAoWyAnT1dORVInLCAnQURNSU5JU1RSQVRPUicgXS5pbmRleE9mKHByb2plY3QucGl2b3Qucm9sZSkgPiAtMVxyXG4gICAgICAgICAgICAgICAgPyBfXygncG9wb3ZlcnMubWFuYWdlX3Byb2plY3RfYm9hcmRfbWVtYmVycy5lbnRlcl9uYW1lX3VzZXJuYW1lX29yX2VtYWlsJylcclxuICAgICAgICAgICAgICAgIDogX18oJ3BvcG92ZXJzLm1hbmFnZV9wcm9qZWN0X2JvYXJkX21lbWJlcnMuZW50ZXJfbmFtZV9vcl91c2VybmFtZScpXHJcbiAgICAgICAgICAgICksXHJcblxyXG4gICAgICAgICAgICByZW5kZXI6IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbjogZnVuY3Rpb24oaXRlbSwgZXNjYXBlKSB7XHJcbiAgICAgICAgICAgICAgICBcdGNvbnNvbGUubG9nKGl0ZW0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInNlbGVjdGl6ZS1pdGVtICsgaXMtdXNlciAnICsgKGl0ZW0uaXNfc2VsZWN0ZWQgPyAnaXMtc2VsZWN0ZWQnIDogJycpICsgJyAnICsgKGl0ZW0uaXNfZGlzYWJsZWQgPyAnaXMtZGlzYWJsZWQnIDogJycpICsgJ1wiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxpbWcgY2xhc3M9XCJzZWxlY3RpemUtaXRlbV9faW1hZ2VcIiBzcmM9XCJodHRwczovL2ltYWdlLmZsYXRpY29uLmNvbS9pY29ucy9zdmcvMjM2LzIzNjgzMS5zdmdcIiBhbHQ9XCJcIj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cInNlbGVjdGl6ZS1pdGVtX190aXRsZVwiPicgKyBlc2NhcGUoaXRlbS50aXRsZSkgKyAnPC9zcGFuPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+J1xyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG5cclxuXHRcdFx0b25Jbml0aWFsaXplOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR2YXIgc2VsZWN0aXplID0gdGhpcztcclxuXHRcdFx0XHRzZWxlY3RpemUuc2VsZWN0ZWRfaXRlbXMgPSBbXTtcclxuXHRcdFx0XHRzZWxlY3RpemUuJGNvbnRyb2xfaW5wdXQuYXR0cignYXV0b2NvbXBsZXRlJywgJ3N0LWRpc2FibGVkJyk7XHJcblx0XHRcdFx0c2VsZWN0aXplLiRkcm9wZG93bi5vZmYoJ21vdXNlZG93bicpO1xyXG5cclxuXHRcdFx0XHRzZWxlY3RpemUuYWRkT3B0aW9uKHByb2plY3QubWVtYmVycy5tYXAoZnVuY3Rpb24ocHJvamVjdF9tZW1iZXIpIHtcclxuXHRcdFx0XHRcdHZhciBpc19zZWxlY3RlZCA9IHByb2plY3RfYm9hcmQubWVtYmVycy5zb21lKGZ1bmN0aW9uKHByb2plY3RfYm9hcmRfbWVtYmVyKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBwcm9qZWN0X21lbWJlci51c2VyX2lkID09IHByb2plY3RfYm9hcmRfbWVtYmVyLnVzZXJfaWQ7XHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgcHJvamVjdF9tZW1iZXIudXNlciwge1xyXG5cdFx0XHRcdFx0XHRpc19zZWxlY3RlZDogaXNfc2VsZWN0ZWQsXHJcblx0XHRcdFx0XHRcdGlzX2Rpc2FibGVkOiBbICdPV05FUicsICdBRE1JTklTVFJBVE9SJyBdLmluZGV4T2YocHJvamVjdF9tZW1iZXIucm9sZSkgPiAtMSxcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0pKTtcclxuXHJcblx0XHRcdFx0c2VsZWN0aXplLnNlbGVjdGVkX2l0ZW1zID0gcHJvamVjdC5tZW1iZXJzLmZpbHRlcihmdW5jdGlvbihwcm9qZWN0X21lbWJlcikge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHByb2plY3RfYm9hcmQubWVtYmVycy5zb21lKGZ1bmN0aW9uKHByb2plY3RfYm9hcmRfbWVtYmVyKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBwcm9qZWN0X21lbWJlci51c2VyX2lkID09IHByb2plY3RfYm9hcmRfbWVtYmVyLnVzZXJfaWQ7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9KS5tYXAoZnVuY3Rpb24ocHJvamVjdF9tZW1iZXIpIHtcclxuXHRcdFx0XHRcdHJldHVybiBTdHJpbmcocHJvamVjdF9tZW1iZXIudXNlcl9pZCk7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdHNlbGVjdGl6ZS5zZXRUZXh0Ym94VmFsdWUgPSBmdW5jdGlvbigpIHt9O1xyXG5cdFx0XHRcdHNlbGVjdGl6ZS5zZXRBY3RpdmVPcHRpb24gPSBmdW5jdGlvbigpIHt9O1xyXG5cclxuXHRcdFx0XHRzZWxlY3RpemUuYWRkSXRlbSA9IGZ1bmN0aW9uKGl0ZW1faWQpIHtcclxuXHRcdFx0XHRcdGlmIChzZWxlY3RpemUuJHdyYXBwZXIuaGFzQ2xhc3MoJ2xvYWRpbmcnKSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0dmFyICRvcHRpb24gPSBzZWxlY3RpemUuZ2V0T3B0aW9uKGl0ZW1faWQpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChzZWxlY3RpemUuc2VsZWN0ZWRfaXRlbXMuaW5kZXhPZihpdGVtX2lkKSA+IC0xKSB7XHJcblx0XHRcdFx0XHRcdHNlbGVjdGl6ZS5zZWxlY3RlZF9pdGVtcy5zcGxpY2Uoc2VsZWN0aXplLnNlbGVjdGVkX2l0ZW1zLmluZGV4T2YoaXRlbV9pZCksIDEpO1xyXG5cdFx0XHRcdFx0XHQkb3B0aW9uLnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xyXG5cdFx0XHRcdFx0XHRzZWxlY3RpemUuJHdyYXBwZXIuYWRkQ2xhc3MoJ2xvYWRpbmcnKTtcclxuXHJcblx0XHRcdFx0XHRcdHJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0XHRcdHVybDogJy9wcm9qZWN0X2JvYXJkcy8nICsgcHJvamVjdF9ib2FyZC5pZCArICcvbWVtYmVyX3VzZXJzLycgKyBpdGVtX2lkICsgJy9yZW1vdmUnLFxyXG5cdFx0XHRcdFx0XHR9LCBmdW5jdGlvbihyZXNwb25zZSkge1xyXG5cdFx0XHRcdFx0XHRcdHNlbGVjdGl6ZS4kd3JhcHBlci5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAocmVzcG9uc2UuZXJyb3IpIHtcclxuXHRcdFx0XHRcdFx0XHRcdCQubm90aWZ5KHJlc3BvbnNlLmVycm9yLCAnZXJyb3InKTtcclxuXHRcdFx0XHRcdFx0XHRcdCRvcHRpb24uYWRkQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRvcHRpb25zLmJvYXJkX3VwZGF0ZWQoe1xyXG5cdFx0XHRcdFx0XHRcdFx0cHJvamVjdF9ib2FyZF9tZW1iZXJzOiByZXNwb25zZS5kYXRhLm1lbWJlcnMsXHJcblx0XHRcdFx0XHRcdFx0XHQvLyBwcm9qZWN0X21lbWJlcnM6IHJlc3BvbnNlLmRhdGEucHJvamVjdC5tZW1iZXJzLFxyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHNlbGVjdGl6ZS5zZWxlY3RlZF9pdGVtcy5wdXNoKGl0ZW1faWQpO1xyXG5cdFx0XHRcdFx0XHQkb3B0aW9uLmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpO1xyXG5cdFx0XHRcdFx0XHRzZWxlY3RpemUuJHdyYXBwZXIuYWRkQ2xhc3MoJ2xvYWRpbmcnKTtcclxuXHJcblx0XHRcdFx0XHRcdHJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0XHRcdHVybDogJy9wcm9qZWN0X2JvYXJkcy8nICsgcHJvamVjdF9ib2FyZC5pZCArICcvbWVtYmVyX3VzZXJzLycgKyBpdGVtX2lkICsgJy9hZGQnLFxyXG5cdFx0XHRcdFx0XHR9LCBmdW5jdGlvbihyZXNwb25zZSkge1xyXG5cdFx0XHRcdFx0XHRcdHNlbGVjdGl6ZS4kd3JhcHBlci5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAocmVzcG9uc2UuZXJyb3IpIHtcclxuXHRcdFx0XHRcdFx0XHRcdCQubm90aWZ5KHJlc3BvbnNlLmVycm9yLCAnZXJyb3InKTtcclxuXHRcdFx0XHRcdFx0XHRcdCRvcHRpb24ucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRvcHRpb25zLmJvYXJkX3VwZGF0ZWQoe1xyXG5cdFx0XHRcdFx0XHRcdFx0cHJvamVjdF9ib2FyZF9tZW1iZXJzOiByZXNwb25zZS5kYXRhLm1lbWJlcnMsXHJcblx0XHRcdFx0XHRcdFx0XHQvLyBwcm9qZWN0X21lbWJlcnM6IHJlc3BvbnNlLmRhdGEucHJvamVjdC5tZW1iZXJzLFxyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRzZWxlY3RpemUub25LZXlEb3duID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHRcdGlmIChldmVudC5rZXlDb2RlID09PSAxMyAmJiAhJGludml0YXRpb25fZm9ybS5oYXNDbGFzcygnZC1ub25lJykpIHtcclxuXHRcdFx0XHRcdFx0JGludml0YXRpb25fZm9ybS5zdWJtaXQoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRzZWxlY3RpemUub3BlbigpO1xyXG5cclxuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0cG9wb3Zlci51cGRhdGUoKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdG9uVHlwZTogZnVuY3Rpb24odmFsdWUpIHtcclxuXHRcdFx0XHR2YXIgc2VsZWN0aXplID0gdGhpcztcclxuXHRcdFx0XHR2YXIgaXNfZW1haWwgPSAvXlxcUytAXFxTK1xcLlxcUyskLy50ZXN0KHZhbHVlKTtcclxuXHRcdFx0XHR2YXIgaGFzX3Jlc3VsdHMgPSAodGhpcy5jdXJyZW50UmVzdWx0cy5pdGVtcy5sZW5ndGggPiAwKTtcclxuXHRcdFx0XHRzZWxlY3RpemUuJGRyb3Bkb3duLnRvZ2dsZUNsYXNzKCdpcy1oaWRkZW4nLCAhaGFzX3Jlc3VsdHMpO1xyXG5cdFx0XHRcdHBvcG92ZXIuJGVsZW1lbnQuZmluZCgnLnBvcG92ZXJfX25vLW1lbWJlcnMtbWVzc2FnZScpLnRvZ2dsZUNsYXNzKCdkLW5vbmUnLCBoYXNfcmVzdWx0cyk7XHJcblx0XHRcdFx0Ly8gcG9wb3Zlci4kZWxlbWVudC5maW5kKCcucG9wb3Zlcl9fbm8tbWVtYmVycy1tZXNzYWdlJykudG9nZ2xlQ2xhc3MoJ2Qtbm9uZScsIGhhc19yZXN1bHRzIHx8IGlzX2VtYWlsKTtcclxuXHRcdFx0XHQvLyAkaW52aXRhdGlvbl9mb3JtLnRvZ2dsZUNsYXNzKCdkLW5vbmUnLCBoYXNfcmVzdWx0cyB8fCAhaXNfZW1haWwpO1xyXG5cclxuXHRcdFx0XHQvLyBpZiAoIWhhc19yZXN1bHRzICYmIGlzX2VtYWlsKSB7XHJcblx0XHRcdFx0Ly8gXHR2YXIgZW1haWxfcGFydHMgPSB2YWx1ZS5zcGxpdCgvQC8pWzBdLnNwbGl0KC9bXmEtejAtOV0rL2kpO1xyXG5cdFx0XHRcdC8vIFx0JGludml0YXRpb25fZm9ybS5maW5kKCdpbnB1dFtuYW1lPVwidXNlcltmaXJzdF9uYW1lXVwiXScpLnZhbChlbWFpbF9wYXJ0c1swXSB8fCAnJyk7XHJcblx0XHRcdFx0Ly8gXHQkaW52aXRhdGlvbl9mb3JtLmZpbmQoJ2lucHV0W25hbWU9XCJ1c2VyW2xhc3RfbmFtZV1cIl0nKS52YWwoZW1haWxfcGFydHNbMV0gfHwgJycpO1xyXG5cdFx0XHRcdC8vIFx0JGludml0YXRpb25fZm9ybS5maW5kKCdpbnB1dFtuYW1lPVwidXNlcltlbWFpbF1cIl0nKS52YWwodmFsdWUpO1xyXG5cdFx0XHRcdC8vIH1cclxuXHJcblx0XHRcdFx0cG9wb3Zlci5maXgoKTtcclxuXHRcdFx0fSxcclxuXHRcdH0pO1xyXG5cclxuXHRcdCRpbnZpdGF0aW9uX2Zvcm0uc3VibWl0KGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRpZiAoJGludml0YXRpb25fZm9ybV9idXR0b24uaGFzQ2xhc3MoJ2lzLWxvYWRpbmcnKSkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JGludml0YXRpb25fZm9ybV9idXR0b24uYWRkQ2xhc3MoJ2lzLWxvYWRpbmcgZGlzYWJsZWQnKTtcclxuXHJcblx0XHRcdHJlcXVlc3Qoe1xyXG5cdFx0XHRcdG1ldGhvZDogJ1BPU1QnLFxyXG5cdFx0XHRcdHVybDogJy9wcm9qZWN0X2JvYXJkcy8nICsgcHJvamVjdF9ib2FyZC5pZCArICcvbWVtYmVyX3VzZXJzL2ludml0ZScsXHJcblx0XHRcdFx0ZGF0YTogJGludml0YXRpb25fZm9ybS5zZXJpYWxpemUoKSxcclxuXHRcdFx0fSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuXHRcdFx0XHQkaW52aXRhdGlvbl9mb3JtX2J1dHRvbi5yZW1vdmVDbGFzcygnaXMtbG9hZGluZyBkaXNhYmxlZCcpO1xyXG5cclxuXHRcdFx0XHRpZiAocmVzcG9uc2UuZXJyb3IpIHtcclxuXHRcdFx0XHRcdCQubm90aWZ5KHJlc3BvbnNlLmVycm9yLCAnZXJyb3InKTtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdG9wdGlvbnMudGFza191cGRhdGVkKHtcclxuXHRcdFx0XHRcdHByb2plY3RfYm9hcmRfbWVtYmVyczogcmVzcG9uc2UuZGF0YS5tZW1iZXJzLFxyXG5cdFx0XHRcdFx0cHJvamVjdF9tZW1iZXJzOiByZXNwb25zZS5kYXRhLnByb2plY3QubWVtYmVycyxcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0dmFyIHNlbGVjdGl6ZSA9ICRtZW1iZXJfc2VsZWN0LmRhdGEoJ3NlbGVjdGl6ZScpO1xyXG5cdFx0XHRcdHNlbGVjdGl6ZS4kY29udHJvbF9pbnB1dC52YWwoJycpO1xyXG5cdFx0XHRcdCRpbnZpdGF0aW9uX2Zvcm0uZmluZCgnaW5wdXQnKS52YWwoJycpO1xyXG5cdFx0XHRcdCRpbnZpdGF0aW9uX2Zvcm0uYWRkQ2xhc3MoJ2Qtbm9uZScpO1xyXG5cdFx0XHRcdHNlbGVjdGl6ZS5vcGVuKCk7XHJcblx0XHRcdFx0c2VsZWN0aXplLmNsZWFyT3B0aW9ucygpO1xyXG5cclxuXHRcdFx0XHRzZWxlY3RpemUuYWRkT3B0aW9uKHJlc3BvbnNlLmRhdGEucHJvamVjdC5tZW1iZXJzLm1hcChmdW5jdGlvbihwcm9qZWN0X21lbWJlcikge1xyXG5cdFx0XHRcdFx0dmFyIGlzX3NlbGVjdGVkID0gcmVzcG9uc2UuZGF0YS5tZW1iZXJzLnNvbWUoZnVuY3Rpb24ocHJvamVjdF9ib2FyZF9tZW1iZXIpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHByb2plY3RfbWVtYmVyLnVzZXJfaWQgPT0gcHJvamVjdF9ib2FyZF9tZW1iZXIudXNlcl9pZDtcclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBwcm9qZWN0X21lbWJlci51c2VyLCB7XHJcblx0XHRcdFx0XHRcdGlzX3NlbGVjdGVkOiBpc19zZWxlY3RlZCxcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0pKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkaW52aXRhdGlvbl9mb3JtLm9uKCdrZXlwcmVzcycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdChldmVudC5rZXlDb2RlID09PSAxMykgJiYgJGludml0YXRpb25fZm9ybS5zdWJtaXQoKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCRpbnZpdGF0aW9uX2Zvcm0uZmluZCgnYnV0dG9uW3R5cGU9XCJzdWJtaXRcIl0nKS5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHQkaW52aXRhdGlvbl9mb3JtLnN1Ym1pdCgpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0cmV0dXJuIHBvcG92ZXI7XHJcbn07IiwicG9wb3ZlcnMubWFuYWdlX3Byb2plY3RfdGFza19tZW1iZXJzID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cclxuXHR2YXIgcG9wb3ZlciA9IG5ldyBQb3BvdmVyKHtcclxuXHRcdHRyaWdnZXI6IG9wdGlvbnMudHJpZ2dlcixcclxuXHRcdGFycm93OiBmYWxzZSxcclxuXHJcblx0XHRjb250ZW50OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmV0dXJuIHRlbXBsYXRlKCdtYW5hZ2UtcHJvamVjdC10YXNrLW1lbWJlcnMtcG9wb3ZlcicsIHtcclxuXHRcdFx0XHR0aXRsZTogb3B0aW9ucy50aXRsZSB8fCAnTWVtYmVycycsXHJcblx0XHRcdFx0cHJvamVjdDogb3B0aW9ucy5wcm9qZWN0LFxyXG5cdFx0XHRcdHByb2plY3RfdGFzazogb3B0aW9ucy5wcm9qZWN0X3Rhc2soKSxcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cdH0pO1xyXG5cclxuXHRwb3BvdmVyLmluaXRpYWxpemUgPSBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBwcm9qZWN0ID0gb3B0aW9ucy5wcm9qZWN0O1xyXG5cdFx0dmFyIHByb2plY3RfYm9hcmQgPSBvcHRpb25zLnByb2plY3RfYm9hcmQ7XHJcblx0XHR2YXIgcHJvamVjdF90YXNrID0gb3B0aW9ucy5wcm9qZWN0X3Rhc2soKTtcclxuXHRcdHZhciAkbWVtYmVyX3NlbGVjdCA9IHBvcG92ZXIuJGVsZW1lbnQuZmluZCgnLnBvcG92ZXItbWVtYmVyLXNlbGVjdCcpO1xyXG5cdFx0dmFyICRtZW1iZXJfbGlzdCA9IHBvcG92ZXIuJGVsZW1lbnQuZmluZCgnLnBvcG92ZXItbWVtYmVyLWxpc3QnKTtcclxuXHRcdHZhciAkaW52aXRhdGlvbl9mb3JtID0gcG9wb3Zlci4kZWxlbWVudC5maW5kKCcucG9wb3Zlcl9faW52aXRhdGlvbi1mb3JtJyk7XHJcblx0XHR2YXIgJGludml0YXRpb25fZm9ybV9idXR0b24gPSAkaW52aXRhdGlvbl9mb3JtLmZpbmQoJ2J1dHRvblt0eXBlPVwic3VibWl0XCJdJyk7XHJcblxyXG5cdFx0JG1lbWJlcl9zZWxlY3QucmVtb3ZlQ2xhc3MoJ2N1c3RvbS1zZWxlY3QnKS5zZWxlY3RpemUoe1xyXG5cdFx0XHRjbG9zZUFmdGVyU2VsZWN0OiBmYWxzZSxcclxuXHRcdFx0c2VsZWN0T25UYWI6IGZhbHNlLFxyXG5cdFx0XHR2YWx1ZUZpZWxkOiAnaWQnLFxyXG4gICAgICAgICAgICBzZWFyY2hGaWVsZDogWyAnc2x1ZycsICdmdWxsX25hbWUnLCAnZW1haWwnIF0sXHJcblxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogKFsgJ09XTkVSJywgJ0FETUlOSVNUUkFUT1InIF0uaW5kZXhPZihwcm9qZWN0LnBpdm90LnJvbGUpID4gLTFcclxuICAgICAgICAgICAgICAgID8gX18oJ3BvcG92ZXJzLm1hbmFnZV9wcm9qZWN0X3Rhc2tfbWVtYmVycy5lbnRlcl9uYW1lX3VzZXJuYW1lX29yX2VtYWlsJylcclxuICAgICAgICAgICAgICAgIDogX18oJ3BvcG92ZXJzLm1hbmFnZV9wcm9qZWN0X3Rhc2tfbWVtYmVycy5lbnRlcl9uYW1lX29yX3VzZXJuYW1lJylcclxuICAgICAgICAgICAgKSxcclxuXHJcbiAgICAgICAgICAgIHJlbmRlcjoge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uOiBmdW5jdGlvbihpdGVtLCBlc2NhcGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInNlbGVjdGl6ZS1pdGVtICsgaXMtdXNlciAnICsgKGl0ZW0uaXNfc2VsZWN0ZWQgPyAnaXMtc2VsZWN0ZWQnIDogJycpICsgJ1wiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxpbWcgY2xhc3M9XCJzZWxlY3RpemUtaXRlbV9faW1hZ2VcIiBzcmM9XCJodHRwczovL2ltYWdlLmZsYXRpY29uLmNvbS9pY29ucy9zdmcvMjM2LzIzNjgzMS5zdmdcIiBhbHQ9XCJcIj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cInNlbGVjdGl6ZS1pdGVtX190aXRsZVwiPicgKyBlc2NhcGUoaXRlbS50aXRsZSkgKyAnPC9zcGFuPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+J1xyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG5cclxuXHRcdFx0b25Jbml0aWFsaXplOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR2YXIgc2VsZWN0aXplID0gdGhpcztcclxuXHRcdFx0XHRzZWxlY3RpemUuc2VsZWN0ZWRfaXRlbXMgPSBbXTtcclxuXHRcdFx0XHRzZWxlY3RpemUuJGNvbnRyb2xfaW5wdXQuYXR0cignYXV0b2NvbXBsZXRlJywgJ3N0LWRpc2FibGVkJyk7XHJcblx0XHRcdFx0c2VsZWN0aXplLiRkcm9wZG93bi5vZmYoJ21vdXNlZG93bicpO1xyXG5cclxuXHRcdFx0XHRzZWxlY3RpemUuYWRkT3B0aW9uKHByb2plY3RfYm9hcmQubWVtYmVycy5tYXAoZnVuY3Rpb24ocHJvamVjdF9tZW1iZXIpIHtcclxuXHRcdFx0XHRcdHZhciBpc19zZWxlY3RlZCA9IHByb2plY3RfdGFzay5tZW1iZXJzLnNvbWUoZnVuY3Rpb24ocHJvamVjdF90YXNrX21lbWJlcikge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gcHJvamVjdF9tZW1iZXIudXNlcl9pZCA9PSBwcm9qZWN0X3Rhc2tfbWVtYmVyLnVzZXJfaWQ7XHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgcHJvamVjdF9tZW1iZXIudXNlciwge1xyXG5cdFx0XHRcdFx0XHRpc19zZWxlY3RlZDogaXNfc2VsZWN0ZWQsXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9KSk7XHJcblxyXG5cdFx0XHRcdHNlbGVjdGl6ZS5zZWxlY3RlZF9pdGVtcyA9IHByb2plY3RfYm9hcmQubWVtYmVycy5maWx0ZXIoZnVuY3Rpb24ocHJvamVjdF9tZW1iZXIpIHtcclxuXHRcdFx0XHRcdHJldHVybiBwcm9qZWN0X3Rhc2subWVtYmVycy5zb21lKGZ1bmN0aW9uKHByb2plY3RfdGFza19tZW1iZXIpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHByb2plY3RfbWVtYmVyLnVzZXJfaWQgPT0gcHJvamVjdF90YXNrX21lbWJlci51c2VyX2lkO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSkubWFwKGZ1bmN0aW9uKHByb2plY3RfbWVtYmVyKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gU3RyaW5nKHByb2plY3RfbWVtYmVyLnVzZXJfaWQpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRzZWxlY3RpemUuc2V0VGV4dGJveFZhbHVlID0gZnVuY3Rpb24oKSB7fTtcclxuXHRcdFx0XHRzZWxlY3RpemUuc2V0QWN0aXZlT3B0aW9uID0gZnVuY3Rpb24oKSB7fTtcclxuXHJcblx0XHRcdFx0c2VsZWN0aXplLmFkZEl0ZW0gPSBmdW5jdGlvbihpdGVtX2lkKSB7XHJcblx0XHRcdFx0XHRpZiAoc2VsZWN0aXplLiR3cmFwcGVyLmhhc0NsYXNzKCdsb2FkaW5nJykpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHZhciAkb3B0aW9uID0gc2VsZWN0aXplLmdldE9wdGlvbihpdGVtX2lkKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoc2VsZWN0aXplLnNlbGVjdGVkX2l0ZW1zLmluZGV4T2YoaXRlbV9pZCkgPiAtMSkge1xyXG5cdFx0XHRcdFx0XHRzZWxlY3RpemUuc2VsZWN0ZWRfaXRlbXMuc3BsaWNlKHNlbGVjdGl6ZS5zZWxlY3RlZF9pdGVtcy5pbmRleE9mKGl0ZW1faWQpLCAxKTtcclxuXHRcdFx0XHRcdFx0JG9wdGlvbi5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcclxuXHRcdFx0XHRcdFx0c2VsZWN0aXplLiR3cmFwcGVyLmFkZENsYXNzKCdsb2FkaW5nJyk7XHJcblxyXG5cdFx0XHRcdFx0XHRyZXF1ZXN0KHtcclxuXHRcdFx0XHRcdFx0XHR1cmw6ICcvcHJvamVjdF90YXNrcy8nICsgcHJvamVjdF90YXNrLmlkICsgJy9tZW1iZXJfdXNlcnMvJyArIGl0ZW1faWQgKyAnL3JlbW92ZScsXHJcblx0XHRcdFx0XHRcdH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcblx0XHRcdFx0XHRcdFx0c2VsZWN0aXplLiR3cmFwcGVyLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGlmIChyZXNwb25zZS5lcnJvcikge1xyXG5cdFx0XHRcdFx0XHRcdFx0JC5ub3RpZnkocmVzcG9uc2UuZXJyb3IsICdlcnJvcicpO1xyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0b3B0aW9ucy50YXNrX3VwZGF0ZWQoe1xyXG5cdFx0XHRcdFx0XHRcdFx0cHJvamVjdF90YXNrX21lbWJlcnM6IHJlc3BvbnNlLmRhdGEubWVtYmVycyxcclxuXHRcdFx0XHRcdFx0XHRcdC8vIHByb2plY3RfbWVtYmVyczogcmVzcG9uc2UuZGF0YS5wcm9qZWN0Lm1lbWJlcnMsXHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0c2VsZWN0aXplLnNlbGVjdGVkX2l0ZW1zLnB1c2goaXRlbV9pZCk7XHJcblx0XHRcdFx0XHRcdCRvcHRpb24uYWRkQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XHJcblx0XHRcdFx0XHRcdHNlbGVjdGl6ZS4kd3JhcHBlci5hZGRDbGFzcygnbG9hZGluZycpO1xyXG5cclxuXHRcdFx0XHRcdFx0cmVxdWVzdCh7XHJcblx0XHRcdFx0XHRcdFx0dXJsOiAnL3Byb2plY3RfdGFza3MvJyArIHByb2plY3RfdGFzay5pZCArICcvbWVtYmVyX3VzZXJzLycgKyBpdGVtX2lkICsgJy9hZGQnLFxyXG5cdFx0XHRcdFx0XHR9LCBmdW5jdGlvbihyZXNwb25zZSkge1xyXG5cdFx0XHRcdFx0XHRcdHNlbGVjdGl6ZS4kd3JhcHBlci5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAocmVzcG9uc2UuZXJyb3IpIHtcclxuXHRcdFx0XHRcdFx0XHRcdCQubm90aWZ5KHJlc3BvbnNlLmVycm9yLCAnZXJyb3InKTtcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdG9wdGlvbnMudGFza191cGRhdGVkKHtcclxuXHRcdFx0XHRcdFx0XHRcdHByb2plY3RfdGFza19tZW1iZXJzOiByZXNwb25zZS5kYXRhLm1lbWJlcnMsXHJcblx0XHRcdFx0XHRcdFx0XHQvLyBwcm9qZWN0X21lbWJlcnM6IHJlc3BvbnNlLmRhdGEucHJvamVjdC5tZW1iZXJzLFxyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRzZWxlY3RpemUub25LZXlEb3duID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHRcdGlmIChldmVudC5rZXlDb2RlID09PSAxMyAmJiAhJGludml0YXRpb25fZm9ybS5oYXNDbGFzcygnZC1ub25lJykpIHtcclxuXHRcdFx0XHRcdFx0JGludml0YXRpb25fZm9ybS5zdWJtaXQoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRzZWxlY3RpemUub3BlbigpO1xyXG5cclxuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0cG9wb3Zlci51cGRhdGUoKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdG9uVHlwZTogZnVuY3Rpb24odmFsdWUpIHtcclxuXHRcdFx0XHR2YXIgc2VsZWN0aXplID0gdGhpcztcclxuXHRcdFx0XHR2YXIgaXNfZW1haWwgPSAvXlxcUytAXFxTK1xcLlxcUyskLy50ZXN0KHZhbHVlKTtcclxuXHRcdFx0XHR2YXIgaGFzX3Jlc3VsdHMgPSAodGhpcy5jdXJyZW50UmVzdWx0cy5pdGVtcy5sZW5ndGggPiAwKTtcclxuXHRcdFx0XHRzZWxlY3RpemUuJGRyb3Bkb3duLnRvZ2dsZUNsYXNzKCdpcy1oaWRkZW4nLCAhaGFzX3Jlc3VsdHMpO1xyXG5cdFx0XHRcdHBvcG92ZXIuJGVsZW1lbnQuZmluZCgnLnBvcG92ZXJfX25vLW1lbWJlcnMtbWVzc2FnZScpLnRvZ2dsZUNsYXNzKCdkLW5vbmUnLCBoYXNfcmVzdWx0cyk7XHJcblx0XHRcdFx0Ly8gcG9wb3Zlci4kZWxlbWVudC5maW5kKCcucG9wb3Zlcl9fbm8tbWVtYmVycy1tZXNzYWdlJykudG9nZ2xlQ2xhc3MoJ2Qtbm9uZScsIGhhc19yZXN1bHRzIHx8IGlzX2VtYWlsKTtcclxuXHRcdFx0XHQvLyAkaW52aXRhdGlvbl9mb3JtLnRvZ2dsZUNsYXNzKCdkLW5vbmUnLCBoYXNfcmVzdWx0cyB8fCAhaXNfZW1haWwpO1xyXG5cclxuXHRcdFx0XHQvLyBpZiAoIWhhc19yZXN1bHRzICYmIGlzX2VtYWlsKSB7XHJcblx0XHRcdFx0Ly8gXHR2YXIgZW1haWxfcGFydHMgPSB2YWx1ZS5zcGxpdCgvQC8pWzBdLnNwbGl0KC9bXmEtejAtOV0rL2kpO1xyXG5cdFx0XHRcdC8vIFx0JGludml0YXRpb25fZm9ybS5maW5kKCdpbnB1dFtuYW1lPVwidXNlcltmaXJzdF9uYW1lXVwiXScpLnZhbChlbWFpbF9wYXJ0c1swXSB8fCAnJyk7XHJcblx0XHRcdFx0Ly8gXHQkaW52aXRhdGlvbl9mb3JtLmZpbmQoJ2lucHV0W25hbWU9XCJ1c2VyW2xhc3RfbmFtZV1cIl0nKS52YWwoZW1haWxfcGFydHNbMV0gfHwgJycpO1xyXG5cdFx0XHRcdC8vIFx0JGludml0YXRpb25fZm9ybS5maW5kKCdpbnB1dFtuYW1lPVwidXNlcltlbWFpbF1cIl0nKS52YWwodmFsdWUpO1xyXG5cdFx0XHRcdC8vIH1cclxuXHJcblx0XHRcdFx0cG9wb3Zlci5maXgoKTtcclxuXHRcdFx0fSxcclxuXHRcdH0pO1xyXG5cclxuXHRcdCRpbnZpdGF0aW9uX2Zvcm0uc3VibWl0KGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRpZiAoJGludml0YXRpb25fZm9ybV9idXR0b24uaGFzQ2xhc3MoJ2lzLWxvYWRpbmcnKSkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JGludml0YXRpb25fZm9ybV9idXR0b24uYWRkQ2xhc3MoJ2lzLWxvYWRpbmcgZGlzYWJsZWQnKTtcclxuXHJcblx0XHRcdHJlcXVlc3Qoe1xyXG5cdFx0XHRcdG1ldGhvZDogJ1BPU1QnLFxyXG5cdFx0XHRcdHVybDogJy9wcm9qZWN0X3Rhc2tzLycgKyBwcm9qZWN0X3Rhc2suaWQgKyAnL21lbWJlcl91c2Vycy9pbnZpdGUnLFxyXG5cdFx0XHRcdGRhdGE6ICRpbnZpdGF0aW9uX2Zvcm0uc2VyaWFsaXplKCksXHJcblx0XHRcdH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcblx0XHRcdFx0JGludml0YXRpb25fZm9ybV9idXR0b24ucmVtb3ZlQ2xhc3MoJ2lzLWxvYWRpbmcgZGlzYWJsZWQnKTtcclxuXHJcblx0XHRcdFx0aWYgKHJlc3BvbnNlLmVycm9yKSB7XHJcblx0XHRcdFx0XHQkLm5vdGlmeShyZXNwb25zZS5lcnJvciwgJ2Vycm9yJyk7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRvcHRpb25zLnRhc2tfdXBkYXRlZCh7XHJcblx0XHRcdFx0XHRwcm9qZWN0X3Rhc2tfbWVtYmVyczogcmVzcG9uc2UuZGF0YS5tZW1iZXJzLFxyXG5cdFx0XHRcdFx0Ly8gcHJvamVjdF9tZW1iZXJzOiByZXNwb25zZS5kYXRhLnByb2plY3QubWVtYmVycyxcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0dmFyIHNlbGVjdGl6ZSA9ICRtZW1iZXJfc2VsZWN0LmRhdGEoJ3NlbGVjdGl6ZScpO1xyXG5cdFx0XHRcdHNlbGVjdGl6ZS4kY29udHJvbF9pbnB1dC52YWwoJycpO1xyXG5cdFx0XHRcdCRpbnZpdGF0aW9uX2Zvcm0uZmluZCgnaW5wdXQnKS52YWwoJycpO1xyXG5cdFx0XHRcdCRpbnZpdGF0aW9uX2Zvcm0uYWRkQ2xhc3MoJ2Qtbm9uZScpO1xyXG5cdFx0XHRcdHNlbGVjdGl6ZS5vcGVuKCk7XHJcblx0XHRcdFx0c2VsZWN0aXplLmNsZWFyT3B0aW9ucygpO1xyXG5cclxuXHRcdFx0XHRzZWxlY3RpemUuYWRkT3B0aW9uKHJlc3BvbnNlLmRhdGEucHJvamVjdC5tZW1iZXJzLm1hcChmdW5jdGlvbihwcm9qZWN0X21lbWJlcikge1xyXG5cdFx0XHRcdFx0dmFyIGlzX3NlbGVjdGVkID0gcmVzcG9uc2UuZGF0YS5tZW1iZXJzLnNvbWUoZnVuY3Rpb24ocHJvamVjdF90YXNrX21lbWJlcikge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gcHJvamVjdF9tZW1iZXIudXNlcl9pZCA9PSBwcm9qZWN0X3Rhc2tfbWVtYmVyLnVzZXJfaWQ7XHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgcHJvamVjdF9tZW1iZXIudXNlciwge1xyXG5cdFx0XHRcdFx0XHRpc19zZWxlY3RlZDogaXNfc2VsZWN0ZWQsXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9KSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JGludml0YXRpb25fZm9ybS5vbigna2V5cHJlc3MnLCBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHQoZXZlbnQua2V5Q29kZSA9PT0gMTMpICYmICRpbnZpdGF0aW9uX2Zvcm0uc3VibWl0KCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkaW52aXRhdGlvbl9mb3JtLmZpbmQoJ2J1dHRvblt0eXBlPVwic3VibWl0XCJdJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0JGludml0YXRpb25fZm9ybS5zdWJtaXQoKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdHJldHVybiBwb3BvdmVyO1xyXG59OyIsInBvcG92ZXJzLnByb2plY3RfYm9hcmRfbWVtYmVycyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHR2YXIgcHJvamVjdCA9IG9wdGlvbnMucHJvamVjdDtcclxuICAgIHZhciBwcm9qZWN0X2JvYXJkID0gb3B0aW9ucy5wcm9qZWN0X2JvYXJkO1xyXG5cclxuXHR2YXIgcG9wb3ZlciA9IG5ldyBQb3BvdmVyKHtcclxuXHRcdHRyaWdnZXI6IG9wdGlvbnMudHJpZ2dlcixcclxuXHRcdGFycm93OiBmYWxzZSxcclxuXHRcdHBsYWNlbWVudDogJ2JvdHRvbScsXHJcblxyXG5cdFx0Y29udGVudDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJldHVybiB0ZW1wbGF0ZSgncHJvamVjdC1ib2FyZC1tZW1iZXJzLXBvcG92ZXInKTtcclxuXHRcdH0sXHJcblx0fSk7XHJcblxyXG5cdHBvcG92ZXIuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHByb2plY3QgPSBvcHRpb25zLnByb2plY3Q7XHJcbiAgICAgICAgdmFyICRtZW1iZXJfc2VsZWN0ID0gcG9wb3Zlci4kZWxlbWVudC5maW5kKCcucG9wb3Zlci1tZW1iZXItc2VsZWN0Jyk7XHJcbiAgICAgICAgdmFyICRtZW1iZXJfbGlzdCA9IHBvcG92ZXIuJGVsZW1lbnQuZmluZCgnLnBvcG92ZXItbWVtYmVyLWxpc3QnKTtcclxuICAgICAgICB2YXIgc2hvd25fcHJvamVjdF9tZW1iZXJfcG9wb3ZlciA9IG51bGw7XHJcblxyXG4gICAgICAgIHZhciB1cGRhdGVfbWVtYmVyX3BvcG92ZXJzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWxlY3RpemUgPSAkbWVtYmVyX3NlbGVjdC5kYXRhKCdzZWxlY3RpemUnKTtcclxuXHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHNlbGVjdGl6ZS5vcHRpb25zKS5mb3JFYWNoKGZ1bmN0aW9uKHVzZXJfaWQpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkb3B0aW9uID0gc2VsZWN0aXplLmdldE9wdGlvbih1c2VyX2lkKVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkb3B0aW9uLmRhdGEoJ2JzLnBvcG92ZXInKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZm91bmRfbWVtYmVyID0gcHJvamVjdF9ib2FyZC5tZW1iZXJzLmZpbHRlcihmdW5jdGlvbihtZW1iZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWVtYmVyLnVzZXJfaWQgPT0gdXNlcl9pZDtcclxuICAgICAgICAgICAgICAgIH0pWzBdIHx8IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHBvcG92ZXIgPSBwb3BvdmVycy5wcm9qZWN0X21lbWJlcl9tZW51KHtcclxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyOiBzZWxlY3RpemUuZ2V0T3B0aW9uKHVzZXJfaWQpLFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHByb2plY3RfbWVtYmVyOiBPYmplY3QuYXNzaWduKHt9LCBmb3VuZF9tZW1iZXIucHJvamVjdF9tZW1iZXIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcjogZm91bmRfbWVtYmVyLnVzZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHByb2plY3Q6IHByb2plY3QsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvamVjdF9ib2FyZDogcHJvamVjdF9ib2FyZCxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHBvcG92ZXIuJHRyaWdnZXIub24oJ3Nob3cuYnMucG9wb3ZlcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3duX3Byb2plY3RfbWVtYmVyX3BvcG92ZXIgJiYgc2hvd25fcHJvamVjdF9tZW1iZXJfcG9wb3Zlci4kdHJpZ2dlci5wb3BvdmVyKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd25fcHJvamVjdF9tZW1iZXJfcG9wb3ZlciA9IHBvcG92ZXI7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJG1lbWJlcl9zZWxlY3QucmVtb3ZlQ2xhc3MoJ2N1c3RvbS1zZWxlY3QnKS5zZWxlY3RpemUoe1xyXG4gICAgICAgICAgICBjbG9zZUFmdGVyU2VsZWN0OiBmYWxzZSxcclxuICAgICAgICAgICAgc2VsZWN0T25UYWI6IGZhbHNlLFxyXG4gICAgICAgICAgICB2YWx1ZUZpZWxkOiAnaWQnLFxyXG4gICAgICAgICAgICBzZWFyY2hGaWVsZDogWyAndGl0bGUnLCAnZnVsbF9uYW1lJywgJ3NsdWcnLCAnZW1haWwnIF0sXHJcbiAgICAgICAgICAgIHNvcnRGaWVsZDogW3sgZmllbGQ6ICdpbmRleCcsIGRpcmVjdGlvbjogJ2FzYycgfV0sXHJcblxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogKFsgJ09XTkVSJywgJ0FETUlOSVNUUkFUT1InIF0uaW5kZXhPZihwcm9qZWN0LnBpdm90LnJvbGUpID4gLTFcclxuICAgICAgICAgICAgICAgID8gX18oJ3BvcG92ZXJzLnByb2plY3RfbWVtYmVycy5lbnRlcl9uYW1lX3VzZXJuYW1lX29yX2VtYWlsJylcclxuICAgICAgICAgICAgICAgIDogX18oJ3BvcG92ZXJzLnByb2plY3RfbWVtYmVycy5lbnRlcl9uYW1lX29yX3VzZXJuYW1lJylcclxuICAgICAgICAgICAgKSxcclxuXHJcbiAgICAgICAgICAgIHJlbmRlcjoge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uOiBmdW5jdGlvbihpdGVtLCBlc2NhcGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInNlbGVjdGl6ZS1pdGVtICsgaXMtdXNlclwiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxpbWcgY2xhc3M9XCJzZWxlY3RpemUtaXRlbV9faW1hZ2VcIiBzcmM9XCInICsgaXRlbS5pbWFnZS51cmxzLnRpbnkgKyAnXCIgYWx0PVwiXCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJzZWxlY3RpemUtaXRlbV9fdGl0bGVcIj4nICsgZXNjYXBlKGl0ZW0udGl0bGUpICsgJzwvc3Bhbj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cInNlbGVjdGl6ZS1pdGVtX19zdGF0dXMgKyAnICsgKGl0ZW0uaXNfb25saW5lID8gJ2lzLW9ubGluZScgOiAnJykgICsgJ1wiIGRhdGEtY29ubmVjdGlvbi1zdGF0dXMtZm9yLXVzZXItaWQ9XCInICsgaXRlbS5pZCArJ1wiPjwvc3Bhbj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PidcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIG9uSW5pdGlhbGl6ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VsZWN0aXplID0gdGhpcztcclxuICAgICAgICAgICAgICAgIHNlbGVjdGl6ZS5zZWxlY3RlZF9pdGVtcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0aXplLiRjb250cm9sX2lucHV0LmF0dHIoJ2F1dG9jb21wbGV0ZScsICdzdC1kaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0aXplLiRkcm9wZG93bi5vZmYoJ21vdXNlZG93bicpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGVjdGl6ZS5hZGRPcHRpb24ocHJvamVjdF9ib2FyZC5tZW1iZXJzLm1hcChmdW5jdGlvbihtZW1iZXIsIG1lbWJlcl9pbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBtZW1iZXIudXNlciwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogbWVtYmVyX2luZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGVjdGl6ZS5zZXRUZXh0Ym94VmFsdWUgPSBmdW5jdGlvbigpIHt9O1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0aXplLnNldEFjdGl2ZU9wdGlvbiA9IGZ1bmN0aW9uKCkge307XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZWN0aXplLmFkZEl0ZW0gPSBmdW5jdGlvbihpdGVtX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGl6ZS4kd3JhcHBlci5oYXNDbGFzcygnbG9hZGluZycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciAkb3B0aW9uID0gc2VsZWN0aXplLmdldE9wdGlvbihpdGVtX2lkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGVjdGl6ZS5vbktleURvd24gPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIChldmVudC5rZXlDb2RlID09PSAxMyAmJiAhJGludml0YXRpb25fZm9ybS5oYXNDbGFzcygnZC1ub25lJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgJGludml0YXRpb25fZm9ybS5zdWJtaXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGVjdGl6ZS5vcGVuKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBwb3BvdmVyLnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZV9tZW1iZXJfcG9wb3ZlcnMoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgb25UeXBlOiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNlbGVjdGl6ZSA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVfbWVtYmVyX3BvcG92ZXJzKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgaGFzX3Jlc3VsdHMgPSAodGhpcy5jdXJyZW50UmVzdWx0cy5pdGVtcy5sZW5ndGggPiAwKTtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGl6ZS4kZHJvcGRvd24udG9nZ2xlQ2xhc3MoJ2lzLWhpZGRlbicsICFoYXNfcmVzdWx0cyk7XHJcbiAgICAgICAgICAgICAgICBwb3BvdmVyLiRlbGVtZW50LmZpbmQoJy5wb3BvdmVyX19uby1tZW1iZXJzLW1lc3NhZ2UnKS50b2dnbGVDbGFzcygnZC1ub25lJywgaGFzX3Jlc3VsdHMpO1xyXG4gICAgICAgICAgICAgICAgcG9wb3Zlci5maXgoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuXHR9O1xyXG5cclxuXHRwb3BvdmVyLnNob3duID0gZnVuY3Rpb24oKSB7XHJcblx0XHRwb3BvdmVyLiRlbGVtZW50LmZpbmQoJy5wb3BvdmVyLW1lbWJlci1zZWxlY3QnKS5kYXRhKCdzZWxlY3RpemUnKS4kY29udHJvbF9pbnB1dC5mb2N1cygpO1xyXG5cdH07XHJcblxyXG4gICAgcmV0dXJuIHBvcG92ZXI7XHJcbn07IiwicG9wb3ZlcnMucHJvamVjdF9ib2FyZF9tZW51ID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cdHZhciBwcm9qZWN0ID0gb3B0aW9ucy5wcm9qZWN0O1xyXG5cdHZhciBwcm9qZWN0X2JvYXJkID0gb3B0aW9ucy5wcm9qZWN0X2JvYXJkO1xyXG5cclxuXHR2YXIgcG9wb3ZlciA9IG5ldyBQb3BvdmVyKHtcclxuXHRcdHRyaWdnZXI6IG9wdGlvbnMudHJpZ2dlcixcclxuXHRcdGFycm93OiBmYWxzZSxcclxuXHRcdHBsYWNlbWVudDogJ2JvdHRvbScsXHJcblxyXG5cdFx0Y29udGVudDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJldHVybiB0ZW1wbGF0ZSgncHJvamVjdC1ib2FyZC1tZW51LXBvcG92ZXInLCB7XHJcblx0XHRcdFx0cHJvamVjdDogcHJvamVjdCxcclxuXHRcdFx0XHRwcm9qZWN0X2JvYXJkOiBwcm9qZWN0X2JvYXJkLFxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0fSk7XHJcblxyXG5cdHBvcG92ZXIuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0cG9wb3Zlci4kZWxlbWVudC5maW5kKCcucG9wb3Zlci1saXN0LWl0ZW0uaXMtYXJjaGl2ZS1ib2FyZCcpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRtb2RhbHMuY29uZmlybV9hY3Rpb24oe1xyXG5cdFx0XHRcdHF1ZXN0aW9uOiBcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBhcmNoaXZlIHRoaXMgYm9hcmQ/XCIsXHJcblxyXG5cdFx0XHRcdGNvbmZpcm06IGZ1bmN0aW9uKGNsb3NlX21vZGFsKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gcmVxdWVzdCh7XHJcblx0XHRcdFx0XHRcdHVybDogJy9wcm9qZWN0X2JvYXJkcy8nICsgcHJvamVjdF9ib2FyZC5pZCArICcvYXJjaGl2ZScsXHJcblx0XHRcdFx0XHR9LCBmdW5jdGlvbihyZXNwb25zZSkge1xyXG5cdFx0XHRcdFx0XHRpZiAocmVzcG9uc2UuZXJyb3IpIHtcclxuXHRcdFx0XHRcdFx0XHQkLm5vdGlmeShyZXNwb25zZS5lcnJvciwgJ2Vycm9yJyk7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHQkLm5vdGlmeSgnVGhpcyBib2FyZCB3YXMgYXJjaGl2ZWQhJywgJ3N1Y2Nlc3MnKTtcclxuXHRcdFx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9kYXNoYm9hcmQvcHJvamVjdHMvXCIgKyBwcm9qZWN0LmlkO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRyZXR1cm4gcG9wb3ZlcjtcclxufTsiLCJwb3BvdmVycy5wcm9qZWN0X2JvYXJkcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHR2YXIgcHJvamVjdCA9IG9wdGlvbnMucHJvamVjdDtcclxuXHJcblx0dmFyIHBvcG92ZXIgPSBuZXcgUG9wb3Zlcih7XHJcblx0XHR0cmlnZ2VyOiBvcHRpb25zLnRyaWdnZXIsXHJcblx0XHRhcnJvdzogZmFsc2UsXHJcblx0XHRwbGFjZW1lbnQ6ICdib3R0b20nLFxyXG5cclxuXHRcdGNvbnRlbnQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZXR1cm4gdGVtcGxhdGUoJ3Byb2plY3QtYm9hcmRzLXBvcG92ZXInKTtcclxuXHRcdH0sXHJcblx0fSk7XHJcblxyXG5cdHBvcG92ZXIuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHByb2plY3QgPSBvcHRpb25zLnByb2plY3Q7XHJcbiAgICAgICAgdmFyICRib2FyZF9zZWxlY3QgPSBwb3BvdmVyLiRlbGVtZW50LmZpbmQoJy5wb3BvdmVyLWJvYXJkLXNlbGVjdCcpO1xyXG4gICAgICAgIHZhciAkYm9hcmRfbGlzdCA9IHBvcG92ZXIuJGVsZW1lbnQuZmluZCgnLnBvcG92ZXItYm9hcmQtbGlzdCcpO1xyXG4gICAgICAgIHZhciBzaG93bl9wcm9qZWN0X21lbWJlcl9wb3BvdmVyID0gbnVsbDtcclxuXHJcbiAgICAgICAgJGJvYXJkX3NlbGVjdC5yZW1vdmVDbGFzcygnY3VzdG9tLXNlbGVjdCcpLnNlbGVjdGl6ZSh7XHJcbiAgICAgICAgICAgIGNsb3NlQWZ0ZXJTZWxlY3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICBzZWxlY3RPblRhYjogZmFsc2UsXHJcbiAgICAgICAgICAgIHZhbHVlRmllbGQ6ICdpZCcsXHJcbiAgICAgICAgICAgIHNlYXJjaEZpZWxkOiBbICduYW1lJyBdLFxyXG4gICAgICAgICAgICBzb3J0RmllbGQ6IFt7IGZpZWxkOiAnaW5kZXgnLCBkaXJlY3Rpb246ICdhc2MnIH1dLFxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogX18oJ3BvcG92ZXJzLnByb2plY3RfYm9hcmRzLmVudGVyX2JvYXJkX25hbWUnKSxcclxuXHJcbiAgICAgICAgICAgIHJlbmRlcjoge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uOiBmdW5jdGlvbihpdGVtLCBlc2NhcGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInNlbGVjdGl6ZS1pdGVtXCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlc2NhcGUoaXRlbS5uYW1lKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBvbkluaXRpYWxpemU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNlbGVjdGl6ZSA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RpemUuc2VsZWN0ZWRfaXRlbXMgPSBbXTtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGl6ZS4kY29udHJvbF9pbnB1dC5hdHRyKCdhdXRvY29tcGxldGUnLCAnc3QtZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGl6ZS4kZHJvcGRvd24ub2ZmKCdtb3VzZWRvd24nKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RpemUuYWRkT3B0aW9uKHByb2plY3QuYm9hcmRzLm1hcChmdW5jdGlvbihib2FyZCwgYm9hcmRfaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgYm9hcmQsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGJvYXJkX2luZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGVjdGl6ZS5zZXRUZXh0Ym94VmFsdWUgPSBmdW5jdGlvbigpIHt9O1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0aXplLnNldEFjdGl2ZU9wdGlvbiA9IGZ1bmN0aW9uKCkge307XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZWN0aXplLmFkZEl0ZW0gPSBmdW5jdGlvbihpdGVtX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGl6ZS4kd3JhcHBlci5oYXNDbGFzcygnbG9hZGluZycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9kYXNoYm9hcmQvcHJvamVjdHMvJyArIGRhc2hib2FyZC5zZWxlY3RlZF9wcm9qZWN0LmlkICsgJy9ib2FyZHMvJyArIGl0ZW1faWQ7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGVjdGl6ZS5vbktleURvd24gPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIChldmVudC5rZXlDb2RlID09PSAxMyAmJiAhJGludml0YXRpb25fZm9ybS5oYXNDbGFzcygnZC1ub25lJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgJGludml0YXRpb25fZm9ybS5zdWJtaXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGVjdGl6ZS5vcGVuKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBwb3BvdmVyLmZpeCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBvblR5cGU6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VsZWN0aXplID0gdGhpcztcclxuICAgICAgICAgICAgICAgIHZhciBoYXNfcmVzdWx0cyA9ICh0aGlzLmN1cnJlbnRSZXN1bHRzLml0ZW1zLmxlbmd0aCA+IDApO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0aXplLiRkcm9wZG93bi50b2dnbGVDbGFzcygnaXMtaGlkZGVuJywgIWhhc19yZXN1bHRzKTtcclxuICAgICAgICAgICAgICAgIHBvcG92ZXIuJGVsZW1lbnQuZmluZCgnLnBvcG92ZXJfX25vLWJvYXJkcy1tZXNzYWdlJykudG9nZ2xlQ2xhc3MoJ2Qtbm9uZScsIGhhc19yZXN1bHRzKTtcclxuICAgICAgICAgICAgICAgIHBvcG92ZXIuZml4KCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcblx0fTtcclxuXHJcblx0cG9wb3Zlci5zaG93biA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0cG9wb3Zlci4kZWxlbWVudC5maW5kKCcucG9wb3Zlci1ib2FyZC1zZWxlY3QnKS5kYXRhKCdzZWxlY3RpemUnKS4kY29udHJvbF9pbnB1dC5mb2N1cygpO1xyXG5cdH07XHJcblxyXG4gICAgcmV0dXJuIHBvcG92ZXI7XHJcbn07XHJcbiIsInBvcG92ZXJzLnByb2plY3RfbWVtYmVyX21lbnUgPSBmdW5jdGlvbihvcHRpb25zKSB7XHJcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblx0dmFyIHByb2plY3RfbWVtYmVyID0gb3B0aW9ucy5wcm9qZWN0X21lbWJlcjtcclxuXHR2YXIgYm9hcmRfaXRlbSA9IG9wdGlvbnMuYm9hcmRfaXRlbSB8fCBudWxsO1xyXG5cdHZhciBwcm9qZWN0ID0gb3B0aW9ucy5wcm9qZWN0O1xyXG5cdHZhciBwcm9qZWN0X2JvYXJkID0gb3B0aW9ucy5wcm9qZWN0X2JvYXJkO1xyXG5cclxuXHR2YXIgcG9wb3ZlciA9IG5ldyBQb3BvdmVyKHtcclxuXHRcdHRyaWdnZXI6IG9wdGlvbnMudHJpZ2dlcixcclxuXHRcdGFycm93OiBmYWxzZSxcclxuXHRcdHBsYWNlbWVudDogJ2JvdHRvbScsXHJcblxyXG5cdFx0Y29udGVudDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJldHVybiB0ZW1wbGF0ZSgncHJvamVjdC1tZW1iZXItbWVudS1wb3BvdmVyJywge1xyXG5cdFx0XHRcdHByb2plY3RfbWVtYmVyOiBwcm9qZWN0X21lbWJlcixcclxuXHRcdFx0XHRwcm9qZWN0OiBwcm9qZWN0LFxyXG5cdFx0XHRcdGJvYXJkX2l0ZW06IGJvYXJkX2l0ZW0sXHJcblx0XHRcdFx0cHJvamVjdF9ib2FyZDogcHJvamVjdF9ib2FyZCxcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cdH0pO1xyXG5cclxuXHRwb3BvdmVyLmluaXRpYWxpemUgPSBmdW5jdGlvbigpIHtcclxuXHRcdHZhciAkZGVmYXVsdF9wYWdlID0gcG9wb3Zlci4kZWxlbWVudC5maW5kKCcucG9wb3Zlci1wYWdlLmlzLWRlZmF1bHQnKTtcclxuXHRcdHZhciAkcmVtb3ZlX21lbWJlcl9wYWdlID0gcG9wb3Zlci4kZWxlbWVudC5maW5kKCcucG9wb3Zlci1wYWdlLmlzLXJlbW92ZS1tZW1iZXInKTtcclxuXHRcdHZhciAkY2hhbmdlX3JvbGVfcGFnZSA9IHBvcG92ZXIuJGVsZW1lbnQuZmluZCgnLnBvcG92ZXItcGFnZS5pcy1jaGFuZ2Utcm9sZScpO1xyXG5cclxuXHRcdCRkZWZhdWx0X3BhZ2UuZmluZCgnLnBvcG92ZXItbGlzdC1pdGVtLmlzLXZpZXctcHJvZmlsZScpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFxyXG5cdFx0XHRzbGlkZXVwcy51c2VyX3Byb2ZpbGUoe1xyXG5cdFx0XHRcdHVzZXJfaWQ6IHByb2plY3RfbWVtYmVyLnVzZXJfaWQsXHJcblx0XHRcdFx0ZGVmYXVsdF90YWI6ICdwcm9maWxlJyxcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRwb3BvdmVycy5jbG9zZSgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JGRlZmF1bHRfcGFnZS5maW5kKCcucG9wb3Zlci1saXN0LWl0ZW0uaXMtdmlldy10aW1lbGluZScpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFxyXG5cdFx0XHRzbGlkZXVwcy51c2VyX3Byb2ZpbGUoe1xyXG5cdFx0XHRcdHVzZXJfaWQ6IHByb2plY3RfbWVtYmVyLnVzZXJfaWQsXHJcblx0XHRcdFx0ZGVmYXVsdF90YWI6ICd0aW1lbGluZScsXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0cG9wb3ZlcnMuY2xvc2UoKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCRkZWZhdWx0X3BhZ2UuZmluZCgnLnBvcG92ZXItbGlzdC1pdGVtLmlzLWVkaXQtY29udHJhY3QnKS5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0c2xpZGV1cHMudXNlcl9wcm9maWxlKHtcclxuXHRcdFx0XHR1c2VyX2lkOiBwcm9qZWN0X21lbWJlci51c2VyX2lkLFxyXG5cdFx0XHRcdGRlZmF1bHRfdGFiOiAnY29udHJhY3QnLFxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHBvcG92ZXJzLmNsb3NlKCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkZGVmYXVsdF9wYWdlLmZpbmQoJy5wb3BvdmVyLWxpc3QtaXRlbS5pcy11bmFzc2lnbi1mcm9tLXRhc2snKS5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRwb3BvdmVycy5jbG9zZSgpO1xyXG5cclxuXHRcdFx0cmVxdWVzdCh7XHJcblx0XHRcdFx0dXJsOiAnL3Byb2plY3RfdGFza3MvJyArIGJvYXJkX2l0ZW0ub2JqZWN0LmlkICsgJy9tZW1iZXJfdXNlcnMvJyArIHByb2plY3RfbWVtYmVyLnVzZXIuaWQgKyAnL3JlbW92ZScsXHJcblx0XHRcdH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcblx0XHRcdFx0aWYgKHJlc3BvbnNlLmVycm9yKSB7XHJcblx0XHRcdFx0XHQkLm5vdGlmeShyZXNwb25zZS5lcnJvciwgJ2Vycm9yJyk7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRib2FyZF9pdGVtLm9iamVjdC5tZW1iZXJzID0gcmVzcG9uc2UuZGF0YS5tZW1iZXJzO1xyXG5cdFx0XHRcdGJvYXJkX2l0ZW0ucmVuZGVyTWVtYmVycygpO1xyXG5cdFx0XHRcdCQubm90aWZ5KCdNZW1iZXIgd2FzIHVuYXNzaWduZWQhJywgJ3N1Y2Nlc3MnKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkZGVmYXVsdF9wYWdlLmZpbmQoJy5wb3BvdmVyLWxpc3QtaXRlbS5pcy1yZW1vdmUtZnJvbS1ib2FyZCcpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHBvcG92ZXJzLmNsb3NlKCk7XHJcblxyXG5cdFx0XHQvLyByZXF1ZXN0KHtcclxuXHRcdFx0Ly8gXHR1cmw6ICcvcHJvamVjdF90YXNrcy8nICsgYm9hcmRfaXRlbS5vYmplY3QuaWQgKyAnL21lbWJlcl91c2Vycy8nICsgcHJvamVjdF9tZW1iZXIudXNlci5pZCArICcvcmVtb3ZlJyxcclxuXHRcdFx0Ly8gfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuXHRcdFx0Ly8gXHRpZiAocmVzcG9uc2UuZXJyb3IpIHtcclxuXHRcdFx0Ly8gXHRcdCQubm90aWZ5KHJlc3BvbnNlLmVycm9yLCAnZXJyb3InKTtcclxuXHRcdFx0Ly8gXHRcdHJldHVybjtcclxuXHRcdFx0Ly8gXHR9XHJcblxyXG5cdFx0XHQvLyBcdGJvYXJkX2l0ZW0ub2JqZWN0Lm1lbWJlcnMgPSByZXNwb25zZS5kYXRhLm1lbWJlcnM7XHJcblx0XHRcdC8vIFx0Ym9hcmRfaXRlbS5yZW5kZXJNZW1iZXJzKCk7XHJcblx0XHRcdC8vIFx0JC5ub3RpZnkoJ01lbWJlciB3YXMgdW5hc3NpZ25lZCEnLCAnc3VjY2VzcycpO1xyXG5cdFx0XHQvLyB9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCRkZWZhdWx0X3BhZ2UuZmluZCgnLnBvcG92ZXItbGlzdC1pdGVtLmlzLXJlbW92ZS1mcm9tLXByb2plY3QnKS5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHQkZGVmYXVsdF9wYWdlLnJlbW92ZUNsYXNzKCdpcy1zaG93bicpO1xyXG5cdFx0XHQkcmVtb3ZlX21lbWJlcl9wYWdlLmFkZENsYXNzKCdpcy1zaG93bicpO1xyXG5cdFx0XHRwb3BvdmVyLmZpeCgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JGRlZmF1bHRfcGFnZS5maW5kKCcucG9wb3Zlci1wcm9maWxlX19yb2xlLmlzLWxpbmsnKS5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRwb3BvdmVyLiRlbGVtZW50LmZpbmQoJy5wb3BvdmVyLXBhZ2UuaXMtZGVmYXVsdCcpLnJlbW92ZUNsYXNzKCdpcy1zaG93bicpO1xyXG5cdFx0XHRwb3BvdmVyLiRlbGVtZW50LmZpbmQoJy5wb3BvdmVyLXBhZ2UuaXMtY2hhbmdlLXJvbGUnKS5hZGRDbGFzcygnaXMtc2hvd24nKTtcclxuXHRcdFx0cG9wb3Zlci5maXgoKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cclxuXHJcblx0XHQkcmVtb3ZlX21lbWJlcl9wYWdlLmZpbmQoJy5wb3BvdmVyLWhlYWRlcl9fYmFjay1idXR0b24nKS5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHQkcmVtb3ZlX21lbWJlcl9wYWdlLnJlbW92ZUNsYXNzKCdpcy1zaG93bicpO1xyXG5cdFx0XHQkZGVmYXVsdF9wYWdlLmFkZENsYXNzKCdpcy1zaG93bicpO1xyXG5cdFx0XHRwb3BvdmVyLmZpeCgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JHJlbW92ZV9tZW1iZXJfcGFnZS5maW5kKCcjcG9wb3Zlci1wcm9qZWN0LW1lbWJlci1tZW51X19yZW1vdmUtZnJvbS1hbGwtcHJvamVjdHMtY2hlY2tib3gnKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XHJcblx0XHRcdCRyZW1vdmVfbWVtYmVyX3BhZ2UuZmluZCgnLnBvcG92ZXItY29udGVudF9fYWxlcnQuaXMtZGVmYXVsdCcpLnRvZ2dsZUNsYXNzKCdkLW5vbmUnLCAkKHRoaXMpLnByb3AoJ2NoZWNrZWQnKSk7XHJcblx0XHRcdCRyZW1vdmVfbWVtYmVyX3BhZ2UuZmluZCgnLnBvcG92ZXItY29udGVudF9fYWxlcnQuaXMtcmVtb3ZlLWZyb20tYWxsLXByb2plY3RzJykudG9nZ2xlQ2xhc3MoJ2Qtbm9uZScsICEkKHRoaXMpLnByb3AoJ2NoZWNrZWQnKSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkcmVtb3ZlX21lbWJlcl9wYWdlLmZpbmQoJy5wb3BvdmVyLWNvbnRlbnRfX3JlbW92ZS1idXR0b24nKS5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR2YXIgJGJ1dHRvbiA9ICQodGhpcyk7XHJcblx0XHRcdCRidXR0b24uYWRkQ2xhc3MoJ2lzLWxvYWRpbmcnKTtcclxuXHJcblx0XHRcdHJlcXVlc3Qoe1xyXG5cdFx0XHRcdHVybDogJy9wcm9qZWN0X21lbWJlcnMvJyArIHByb2plY3RfbWVtYmVyLmlkICsgJy9kZWxldGUnLFxyXG5cdFx0XHRcdGRhdGE6ICRyZW1vdmVfbWVtYmVyX3BhZ2UuZmluZCgnLnBvcG92ZXItY29udGVudF9fZm9ybScpLnNlcmlhbGl6ZSgpLFxyXG5cdFx0XHR9LCBmdW5jdGlvbihyZXNwb25zZSkge1xyXG5cdFx0XHRcdCRidXR0b24ucmVtb3ZlQ2xhc3MoJ2lzLWxvYWRpbmcnKTtcclxuXHJcblx0XHRcdFx0aWYgKHJlc3BvbnNlLmVycm9yKSB7XHJcblx0XHRcdFx0XHQkLm5vdGlmeShyZXNwb25zZS5lcnJvciwgJ2Vycm9yJyk7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRwb3BvdmVycy5jbG9zZSgpO1xyXG5cdFx0XHRcdCQubm90aWZ5KCdUaGlzIG1lbWJlciB3YXMgcmVtb3ZlZCEnLCAnc3VjY2VzcycpO1xyXG5cclxuXHRcdFx0XHR2YXIgZXhpc3RlbnRfcHJvamVjdF9tZW1iZXIgPSBkYXNoYm9hcmQuc2VsZWN0ZWRfcHJvamVjdC5tZW1iZXJzLmZpbHRlcihmdW5jdGlvbihjdXJyZW50X3Byb2plY3RfbWVtYmVyKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gY3VycmVudF9wcm9qZWN0X21lbWJlci5pZCA9PSBwcm9qZWN0X21lbWJlci5pZDtcclxuXHRcdFx0XHR9KVswXSB8fCBudWxsO1xyXG5cclxuXHRcdFx0XHRpZiAoZXhpc3RlbnRfcHJvamVjdF9tZW1iZXIpIHtcclxuXHRcdFx0XHRcdGRhc2hib2FyZC5zZWxlY3RlZF9wcm9qZWN0Lm1lbWJlcnMuc3BsaWNlKGRhc2hib2FyZC5zZWxlY3RlZF9wcm9qZWN0Lm1lbWJlcnMuaW5kZXhPZihleGlzdGVudF9wcm9qZWN0X21lbWJlciksIDEpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZGFzaGJvYXJkLnNlbGVjdGVkX3Byb2plY3QucmVuZGVyTWVtYmVycygpO1xyXG5cclxuXHRcdFx0XHRkYXNoYm9hcmQuc2VsZWN0ZWRfYm9hcmQgJiYgKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0dmFyIGZvdW5kX2JvYXJkX21lbWJlciA9IGRhc2hib2FyZC5zZWxlY3RlZF9ib2FyZC5tZW1iZXJzLmZpbHRlcihmdW5jdGlvbihib2FyZF9tZW1iZXIpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGJvYXJkX21lbWJlci51c2VyX2lkID09IHByb2plY3RfbWVtYmVyLnVzZXJfaWQ7XHJcblx0XHRcdFx0XHR9KVswXTtcclxuXHJcblx0XHRcdFx0XHRpZiAoIWZvdW5kX2JvYXJkX21lbWJlcikge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0ZGFzaGJvYXJkLnNlbGVjdGVkX2JvYXJkLm1lbWJlcnMuc3BsaWNlKGRhc2hib2FyZC5zZWxlY3RlZF9ib2FyZC5tZW1iZXJzLmluZGV4T2YoZm91bmRfYm9hcmRfbWVtYmVyKSwgMSk7XHJcblx0XHRcdFx0XHRkYXNoYm9hcmQuc2VsZWN0ZWRfYm9hcmQucmVuZGVyTWVtYmVycygpO1xyXG5cdFx0XHRcdH0pKCk7XHJcblxyXG5cdFx0XHRcdHdpbmRvdy5ib2FyZCAmJiB3aW5kb3cuYm9hcmQuZ2V0Q29sdW1ucygpLmZvckVhY2goZnVuY3Rpb24oYm9hcmRfY29sdW1uKSB7XHJcblx0XHRcdFx0XHRib2FyZF9jb2x1bW4uZ2V0SXRlbXMoKS5mb3JFYWNoKGZ1bmN0aW9uKGJvYXJkX2l0ZW0pIHtcclxuXHRcdFx0XHRcdFx0dmFyIGZvdW5kX3Rhc2tfbWVtYmVyID0gYm9hcmRfaXRlbS5vYmplY3QubWVtYmVycy5maWx0ZXIoZnVuY3Rpb24odGFza19tZW1iZXIpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdGFza19tZW1iZXIudXNlcl9pZCA9PSBwcm9qZWN0X21lbWJlci51c2VyX2lkO1xyXG5cdFx0XHRcdFx0XHR9KVswXSB8fCBudWxsO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYgKCFmb3VuZF90YXNrX21lbWJlcikge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0Ym9hcmRfaXRlbS5vYmplY3QubWVtYmVycy5zcGxpY2UoYm9hcmRfaXRlbS5vYmplY3QubWVtYmVycy5pbmRleE9mKGZvdW5kX3Rhc2tfbWVtYmVyKSwgMSk7XHJcblx0XHRcdFx0XHRcdGJvYXJkX2l0ZW0ucmVuZGVyTWVtYmVycygpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xyXG5cclxuXHRcdCRjaGFuZ2Vfcm9sZV9wYWdlLmZpbmQoJy5wb3BvdmVyLWhlYWRlcl9fYmFjay1idXR0b24nKS5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHQkY2hhbmdlX3JvbGVfcGFnZS5yZW1vdmVDbGFzcygnaXMtc2hvd24nKTtcclxuXHRcdFx0JGRlZmF1bHRfcGFnZS5hZGRDbGFzcygnaXMtc2hvd24nKTtcclxuXHRcdFx0cG9wb3Zlci5maXgoKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCRjaGFuZ2Vfcm9sZV9wYWdlLmZpbmQoJy5wb3BvdmVyLWxpc3QtaXRlbScpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHZhciAkc2VsZiA9ICQodGhpcyk7XHJcblx0XHRcdCRzZWxmLmFkZENsYXNzKCdpcy1sb2FkaW5nJyk7XHJcblxyXG5cdFx0XHRyZXF1ZXN0KHtcclxuXHRcdFx0XHR1cmw6ICcvcHJvamVjdF9tZW1iZXJzLycgKyBwcm9qZWN0X21lbWJlci5pZCArICcvdXBkYXRlJyxcclxuXHJcblx0XHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdFx0cHJvamVjdF9tZW1iZXI6IHtcclxuXHRcdFx0XHRcdFx0cm9sZTogJHNlbGYuYXR0cignZGF0YS1rZXknKSxcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuXHRcdFx0XHQkc2VsZi5yZW1vdmVDbGFzcygnaXMtbG9hZGluZycpO1xyXG5cclxuXHRcdFx0XHRpZiAocmVzcG9uc2UuZXJyb3IpIHtcclxuXHRcdFx0XHRcdCQubm90aWZ5KHJlc3BvbnNlLmVycm9yLCAnZXJyb3InKTtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHZhciBmb3VuZF9wcm9qZWN0X21lbWJlciA9IHByb2plY3QubWVtYmVycy5maWx0ZXIoZnVuY3Rpb24oY3VycmVudF9wcm9qZWN0X21lbWJlcikge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGN1cnJlbnRfcHJvamVjdF9tZW1iZXIuaWQgPT0gcHJvamVjdF9tZW1iZXIuaWQ7XHJcblx0XHRcdFx0fSlbMF0gfHwgbnVsbDtcclxuXHJcblx0XHRcdFx0Zm91bmRfcHJvamVjdF9tZW1iZXIgJiYgT2JqZWN0LmFzc2lnbihmb3VuZF9wcm9qZWN0X21lbWJlciwgcmVzcG9uc2UuZGF0YSk7XHJcblxyXG5cdFx0XHRcdGRhc2hib2FyZC5zZWxlY3RlZF9ib2FyZCAmJiAoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHR2YXIgZm91bmRfYm9hcmRfbWVtYmVyID0gZGFzaGJvYXJkLnNlbGVjdGVkX2JvYXJkLm1lbWJlcnMuZmlsdGVyKGZ1bmN0aW9uKGN1cnJlbnRfYm9hcmRfbWVtYmVyKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBjdXJyZW50X2JvYXJkX21lbWJlci5wcm9qZWN0X21lbWJlci5pZCA9PSBwcm9qZWN0X21lbWJlci5pZDtcclxuXHRcdFx0XHRcdH0pWzBdIHx8IG51bGw7XHJcblxyXG5cdFx0XHRcdFx0Zm91bmRfYm9hcmRfbWVtYmVyICYmIE9iamVjdC5hc3NpZ24oZm91bmRfYm9hcmRfbWVtYmVyLnByb2plY3RfbWVtYmVyLCByZXNwb25zZS5kYXRhKTtcclxuXHRcdFx0XHR9KSgpO1xyXG5cclxuXHRcdFx0XHQkZGVmYXVsdF9wYWdlLmZpbmQoJy5wb3BvdmVyLXByb2ZpbGVfX3JvbGUgc3BhbicpLnRleHQoX18oJ2NvbW1vbi5wcm9qZWN0X21lbWJlcnMucm9sZXMuJyArIHByb2plY3RfbWVtYmVyLnJvbGUgKyAnLmV4dHJhX3RpdGxlJykpO1xyXG5cdFx0XHRcdCRjaGFuZ2Vfcm9sZV9wYWdlLmZpbmQoJy5wb3BvdmVyLWxpc3QtaXRlbScpLnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xyXG5cdFx0XHRcdCRzZWxmLmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdHJldHVybiBwb3BvdmVyO1xyXG59OyIsInBvcG92ZXJzLnByb2plY3RfbWVtYmVycyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHR2YXIgcHJvamVjdCA9IG9wdGlvbnMucHJvamVjdDtcclxuXHJcblx0dmFyIHBvcG92ZXIgPSBuZXcgUG9wb3Zlcih7XHJcblx0XHR0cmlnZ2VyOiBvcHRpb25zLnRyaWdnZXIsXHJcblx0XHRhcnJvdzogZmFsc2UsXHJcblx0XHRwbGFjZW1lbnQ6ICdib3R0b20nLFxyXG5cclxuXHRcdGNvbnRlbnQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZXR1cm4gdGVtcGxhdGUoJ3Byb2plY3QtbWVtYmVycy1wb3BvdmVyJyk7XHJcblx0XHR9LFxyXG5cdH0pO1xyXG5cclxuXHRwb3BvdmVyLmluaXRpYWxpemUgPSBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBwcm9qZWN0ID0gb3B0aW9ucy5wcm9qZWN0O1xyXG4gICAgICAgIHZhciAkbWVtYmVyX3NlbGVjdCA9IHBvcG92ZXIuJGVsZW1lbnQuZmluZCgnLnBvcG92ZXItbWVtYmVyLXNlbGVjdCcpO1xyXG4gICAgICAgIHZhciAkbWVtYmVyX2xpc3QgPSBwb3BvdmVyLiRlbGVtZW50LmZpbmQoJy5wb3BvdmVyLW1lbWJlci1saXN0Jyk7XHJcbiAgICAgICAgdmFyIHNob3duX3Byb2plY3RfbWVtYmVyX3BvcG92ZXIgPSBudWxsO1xyXG5cclxuICAgICAgICB2YXIgdXBkYXRlX21lbWJlcl9wb3BvdmVycyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgc2VsZWN0aXplID0gJG1lbWJlcl9zZWxlY3QuZGF0YSgnc2VsZWN0aXplJyk7XHJcblxyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhzZWxlY3RpemUub3B0aW9ucykuZm9yRWFjaChmdW5jdGlvbih1c2VyX2lkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJG9wdGlvbiA9IHNlbGVjdGl6ZS5nZXRPcHRpb24odXNlcl9pZClcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJG9wdGlvbi5kYXRhKCdicy5wb3BvdmVyJykpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGZvdW5kX21lbWJlciA9IHByb2plY3QubWVtYmVycy5maWx0ZXIoZnVuY3Rpb24obWVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1lbWJlci51c2VyLmlkID09IHVzZXJfaWQ7XHJcbiAgICAgICAgICAgICAgICB9KVswXSB8fCBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBwb3BvdmVyID0gcG9wb3ZlcnMucHJvamVjdF9tZW1iZXJfbWVudSh7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcjogc2VsZWN0aXplLmdldE9wdGlvbih1c2VyX2lkKSxcclxuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0X21lbWJlcjogZm91bmRfbWVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIHByb2plY3Q6IHByb2plY3QsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBwb3BvdmVyLiR0cmlnZ2VyLm9uKCdzaG93LmJzLnBvcG92ZXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBzaG93bl9wcm9qZWN0X21lbWJlcl9wb3BvdmVyICYmIHNob3duX3Byb2plY3RfbWVtYmVyX3BvcG92ZXIuJHRyaWdnZXIucG9wb3ZlcignaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3duX3Byb2plY3RfbWVtYmVyX3BvcG92ZXIgPSBwb3BvdmVyO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRtZW1iZXJfc2VsZWN0LnJlbW92ZUNsYXNzKCdjdXN0b20tc2VsZWN0Jykuc2VsZWN0aXplKHtcclxuICAgICAgICAgICAgY2xvc2VBZnRlclNlbGVjdDogZmFsc2UsXHJcbiAgICAgICAgICAgIHNlbGVjdE9uVGFiOiBmYWxzZSxcclxuICAgICAgICAgICAgdmFsdWVGaWVsZDogJ2lkJyxcclxuICAgICAgICAgICAgc2VhcmNoRmllbGQ6IFsgJ3RpdGxlJywgJ2Z1bGxfbmFtZScsICdzbHVnJywgJ2VtYWlsJyBdLFxyXG4gICAgICAgICAgICBzb3J0RmllbGQ6IFt7IGZpZWxkOiAnaW5kZXgnLCBkaXJlY3Rpb246ICdhc2MnIH1dLFxyXG5cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IChbICdPV05FUicsICdBRE1JTklTVFJBVE9SJyBdLmluZGV4T2YocHJvamVjdC5waXZvdC5yb2xlKSA+IC0xXHJcbiAgICAgICAgICAgICAgICA/IF9fKCdwb3BvdmVycy5wcm9qZWN0X21lbWJlcnMuZW50ZXJfbmFtZV91c2VybmFtZV9vcl9lbWFpbCcpXHJcbiAgICAgICAgICAgICAgICA6IF9fKCdwb3BvdmVycy5wcm9qZWN0X21lbWJlcnMuZW50ZXJfbmFtZV9vcl91c2VybmFtZScpXHJcbiAgICAgICAgICAgICksXHJcblxyXG4gICAgICAgICAgICByZW5kZXI6IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbjogZnVuY3Rpb24oaXRlbSwgZXNjYXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJzZWxlY3RpemUtaXRlbSArIGlzLXVzZXJcIj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8aW1nIGNsYXNzPVwic2VsZWN0aXplLWl0ZW1fX2ltYWdlXCIgc3JjPVwiJyArIGl0ZW0uaW1hZ2UudXJscy50aW55ICsgJ1wiIGFsdD1cIlwiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwic2VsZWN0aXplLWl0ZW1fX3RpdGxlXCI+JyArIGVzY2FwZShpdGVtLnRpdGxlKSArICc8L3NwYW4+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJzZWxlY3RpemUtaXRlbV9fc3RhdHVzICsgJyArIChpdGVtLmlzX29ubGluZSA/ICdpcy1vbmxpbmUnIDogJycpICArICdcIiBkYXRhLWNvbm5lY3Rpb24tc3RhdHVzLWZvci11c2VyLWlkPVwiJyArIGl0ZW0uaWQgKydcIj48L3NwYW4+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBvbkluaXRpYWxpemU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNlbGVjdGl6ZSA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RpemUuc2VsZWN0ZWRfaXRlbXMgPSBbXTtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGl6ZS4kY29udHJvbF9pbnB1dC5hdHRyKCdhdXRvY29tcGxldGUnLCAnc3QtZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGl6ZS4kZHJvcGRvd24ub2ZmKCdtb3VzZWRvd24nKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RpemUuYWRkT3B0aW9uKHByb2plY3QubWVtYmVycy5tYXAoZnVuY3Rpb24obWVtYmVyLCBtZW1iZXJfaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgbWVtYmVyLnVzZXIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IG1lbWJlcl9pbmRleCxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RpemUuc2V0VGV4dGJveFZhbHVlID0gZnVuY3Rpb24oKSB7fTtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGl6ZS5zZXRBY3RpdmVPcHRpb24gPSBmdW5jdGlvbigpIHt9O1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGVjdGl6ZS5hZGRJdGVtID0gZnVuY3Rpb24oaXRlbV9pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RpemUuJHdyYXBwZXIuaGFzQ2xhc3MoJ2xvYWRpbmcnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgJG9wdGlvbiA9IHNlbGVjdGl6ZS5nZXRPcHRpb24oaXRlbV9pZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RpemUub25LZXlEb3duID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMgJiYgISRpbnZpdGF0aW9uX2Zvcm0uaGFzQ2xhc3MoJ2Qtbm9uZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICRpbnZpdGF0aW9uX2Zvcm0uc3VibWl0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RpemUub3BlbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9wb3Zlci51cGRhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVfbWVtYmVyX3BvcG92ZXJzKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIG9uVHlwZTogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzZWxlY3RpemUgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlX21lbWJlcl9wb3BvdmVycygpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGhhc19yZXN1bHRzID0gKHRoaXMuY3VycmVudFJlc3VsdHMuaXRlbXMubGVuZ3RoID4gMCk7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RpemUuJGRyb3Bkb3duLnRvZ2dsZUNsYXNzKCdpcy1oaWRkZW4nLCAhaGFzX3Jlc3VsdHMpO1xyXG4gICAgICAgICAgICAgICAgcG9wb3Zlci4kZWxlbWVudC5maW5kKCcucG9wb3Zlcl9fbm8tbWVtYmVycy1tZXNzYWdlJykudG9nZ2xlQ2xhc3MoJ2Qtbm9uZScsIGhhc19yZXN1bHRzKTtcclxuICAgICAgICAgICAgICAgIHBvcG92ZXIuZml4KCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcblx0fTtcclxuXHJcblx0cG9wb3Zlci5zaG93biA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0cG9wb3Zlci4kZWxlbWVudC5maW5kKCcucG9wb3Zlci1tZW1iZXItc2VsZWN0JykuZGF0YSgnc2VsZWN0aXplJykuJGNvbnRyb2xfaW5wdXQuZm9jdXMoKTtcclxuXHR9O1xyXG5cclxuICAgIHJldHVybiBwb3BvdmVyO1xyXG59OyIsInBvcG92ZXJzLnByb2plY3RfdGFza19tZW51ID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cdHZhciBwcm9qZWN0X3Rhc2sgPSBvcHRpb25zLnByb2plY3RfdGFzaztcclxuXHR2YXIgYm9hcmRfaXRlbSA9IG9wdGlvbnMuYm9hcmRfaXRlbTtcclxuIFxyXG5cdHZhciBwb3BvdmVyID0gbmV3IFBvcG92ZXIoe1xyXG5cdFx0dHJpZ2dlcjogb3B0aW9ucy50cmlnZ2VyLFxyXG5cdFx0YXJyb3c6IGZhbHNlLFxyXG5cdFx0cGxhY2VtZW50OiAnYm90dG9tJyxcclxuXHJcblx0XHRjb250ZW50OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmV0dXJuIHRlbXBsYXRlKCdwcm9qZWN0LXRhc2stbWVudS1wb3BvdmVyJywge1xyXG5cdFx0XHRcdHByb2plY3RfdGFzazogcHJvamVjdF90YXNrLFxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0fSk7XHJcblx0XHJcblx0cG9wb3Zlci5pbml0aWFsaXplID0gZnVuY3Rpb24oKSB7XHJcblx0XHRwb3BvdmVyLiRlbGVtZW50LmZpbmQoJy5wb3BvdmVyLWxpc3QtaXRlbS5pcy1hcmNoaXZlJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0dmFyICRpdGVtID0gJCh0aGlzKTtcclxuXHJcblx0XHRcdHJlcXVlc3Qoe1xyXG5cdFx0XHRcdHVybDogJy9wcm9qZWN0X3Rhc2tzLycgKyBwcm9qZWN0X3Rhc2suaWQgKyAnL2FyY2hpdmUnLFxyXG5cdFx0XHR9LCBmdW5jdGlvbihyZXNwb25zZSkge1xyXG5cdFx0XHRcdGlmIChyZXNwb25zZS5lcnJvcikge1xyXG5cdFx0XHRcdFx0JC5ub3RpZnkocmVzcG9uc2UuZXJyb3IsICdlcnJvcicpO1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cG9wb3ZlcnMuY2xvc2UoKTtcclxuXHRcdFx0XHQkLm5vdGlmeSgnVGFzayB3YXMgYXJjaGl2ZWQhJywgJ3N1Y2Nlc3MnKTtcclxuXHRcdFx0XHRib2FyZF9pdGVtLmRlbGV0ZSgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH07XHJcbiBcclxuXHRyZXR1cm4gcG9wb3ZlcjtcclxufTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==