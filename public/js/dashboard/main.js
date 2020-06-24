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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/dashboard/main.js":
/*!****************************************!*\
  !*** ./resources/js/dashboard/main.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

dashboard.template = function (template_name, options) {
  return template('dashboard-' + template_name, options);
}; // ---------------------------------------------------------------------- //


$(function () {
  (function initialize_project_select() {
    var $create_project_button = $('.navbar__create-new-project-button');
    $('.navbar__project-select').removeClass('custom-select').selectize({
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
          return '<div class="selectize-item + is-project">' + '<' + (item.id ? 'span' : 'b') + ' class="selectize-item__name">' + (item.id ? '' : '<img src="/img/christmas-stars.svg" style="width: 20px;" alt=""> ') + escape(item.name) + '</' + (item.id ? 'span' : 'b') + '>' + '</div>';
        },
        option_create: function option_create(data, escape) {
          return '<div class="selectize-item-create create">' + '<img src="/img/christmas-stars.svg" style="width: 20px;" alt=""> ' + __('common.project_selector.create') + ' `<strong>' + escape(data.input) + '</strong>`' + '</div>';
        }
      },
      create: function create(value, callback) {
        var selectize = this;
        setTimeout(function () {
          $create_project_button.popover('show');
          var $popover_tip = $($create_project_button.data('bs.popover').tip);
          $popover_tip.find('input[name="project[name]"]').val(value);
        });
      },
      onInitialize: function onInitialize() {
        var selectize = this;
        selectize.$control_input.attr('autocomplete', 'st-disabled');
        selectize.addOption(auth.user.projects.map(function (project, project_index) {
          return Object.assign({}, project, {
            index: project_index
          });
        }));
        selectize.addOption({
          id: 0,
          name: __('common.project_selector.create_new_project'),
          index: null
        });
        dashboard.selected_project && selectize.addItem(dashboard.selected_project.id);
        selectize.refreshState();
        selectize.on('change', function (project_id) {
          if (!project_id) {
            selectize.addOption({
              id: 0,
              name: __('common.project_selector.create_new_project'),
              index: null
            });
            return;
          }

          project_id = parseInt(project_id);

          if (project_id) {
            window.location.href = '/dashboard/projects/' + project_id;
            return;
          }

          selectize.clear();
          $create_project_button.popover('show');
        });
        selectize.$control_input.on('input', function () {
          selectize.updatePlaceholder();
          selectize.$dropdown.removeClass('is-hidden');

          if ($(this).val()) {
            selectize.removeOption(0);
          } else {
            selectize.addOption({
              id: 0,
              name: __('common.project_selector.create_new_project'),
              last_viewed_at: 'Z'
            });
          }
        });
      },
      onDropdownOpen: function onDropdownOpen($dropdown) {
        console.log('dropdown open', $dropdown.find(''));
      }
    });
  })();

  $('.navbar-feedback__input').on('input', function () {
    if ($(this).data('modal')) {
      return;
    }

    $(this).data('modal', modals.user_feedback());
  });

  (function initialize_sidebar() {
    $('.sidebar__minimize-button').click(function (event) {
      event.preventDefault();
      var $sidebar = $(this).parents('.sidebar');

      if ($sidebar.hasClass('is-minimized')) {
        localStorage.setItem('sidebar_is_minimized', 0);
        $sidebar.removeClass('is-minimized');
      } else {
        localStorage.setItem('sidebar_is_minimized', 1);
        $sidebar.addClass('is-minimized');
      }
    });

    if (localStorage.getItem('sidebar_is_minimized')) {
      $('.sidebar').toggleClass('is-minimized', parseInt(localStorage.getItem('sidebar_is_minimized')) ? true : false);
    } else {
      $('.sidebar').toggleClass('is-minimized', $(window).width() <= 768);
    }

    setTimeout(function () {
      $('.sidebar').addClass('is-animated');
      $('.content').addClass('is-animated');
    }, 250);
  })();

  (function initialize_chat_panel_invite_form() {
    var $root = $('.chat-panel-invite-form');
    var card = null;
    var $user_select = $root.find('#chat-panel-invite-form__user-select');
    var $email_input = $root.find('input[name="user[email]"]');
    var $chat_message_textarea = $root.find('textarea[name="chat_message[text]"]');
    var $project_section = $root.find('.chat-panel-invite-form__project-section');
    var $member_section = $root.find('.chat-panel-invite-form__member-section');
    var $contract_block = $root.find('.chat-panel-invite-form__contract-block');
    var $project_select = $root.find('select[name="project_member[project_id]"]');
    var $project_member_role_select = $root.find('select[name="project_member[role]"]');
    var $project_member_role_administrator_option = $project_member_role_select.find('option[value="ADMINISTRATOR"]');
    var $close_button = $root.find('.chat-panel-invite-form__close-button');
    var $hourly_rate_block = $root.find('.chat-panel-invite-form__hourly-rate-block');
    var $hourly_rate_input = $root.find('[name="contract[hourly_rate]"]');
    var $contract_title_input = $root.find('[name="contract[title]"]');
    var $credit_card_block = $root.find('.chat-panel-invite-form__credit-card-block');
    var $is_time_trackable_block = $root.find('.chat-panel-invite-form__is-time-trackable-block');
    var $is_time_trackable_checkbox = $root.find('#chat-panel-invite-form__is-time-trackable-checkbox');
    var $with_protection_text = $root.find('.chat-panel-invite-form__with-protection-text');
    var $without_protection_text = $root.find('.chat-panel-invite-form__without-protection-text');
    var $submit_button = $root.find('button[type="submit"]');
    var selected_user = null;
    var selected_project = null;
    $user_select.removeClass('custom-select').selectize({
      valueField: 'id',
      searchField: ['email', 'full_name', 'slug'],
      placeholder: __('sidebar.invite_to_chat'),
      render: {
        item: function item(_item2, escape) {
          return '<div class="selectize-item + is-user ' + (_item2.is_selected ? 'is-selected' : '') + '">' + (_item2.image ? '<img class="selectize-item__image" src="' + _item2.image.urls.tiny + '" alt="">' : '') + '<span class="selectize-item__title">' + (_item2.full_name ? escape(_item2.full_name) + ' (' + _item2.slug + ')' : _item2.slug) + '</span>' + '</div>';
        },
        option: function option(item, escape) {
          return '<div class="' + 'selectize-item + is-user ' + (item.id == auth.user.id ? 'has-description is-disabled' : '') + '">' + (item.image ? '<img class="selectize-item__image" src="' + item.image.urls.tiny + '" alt="">' : '') + '<span class="selectize-item__title">' + (item.full_name ? escape(item.full_name) + ' (' + item.slug + ')' : item.slug) + '</span>' + (item.id == auth.user.id ? '<span class="selectize-item__description">(it\'s you)</span>' : '') + '</div>';
        }
      },
      load: function load(query, callback) {
        this.clearOptions();
        return request({
          url: '/users/autocomplete',
          data: {
            with_collaborative_projects: true,
            query: query
          }
        }, function (response) {
          return callback(response.data);
        });
      },
      onChange: function onChange(item_id) {
        var selectize = this;
        var project_selectize = $project_select.data('selectize');

        if (!item_id) {
          selected_user = null;
          $root.find('[name="user[id]"]').prop('disabled', true);
          $root.find('[name="user[email]"]').prop('disabled', true);
          $root.addClass('is-minimized');
          selectize.$wrapper.addClass('has-dropdown-on-top');
          project_selectize.clear();
          project_selectize.clearOptions();
          return;
        }

        selected_user = selectize.options[item_id];

        if (selected_user.id) {
          $root.find('[name="user[id]"]').prop('disabled', false).val(selected_user.id);
          $root.find('[name="user[email]"]').prop('disabled', true);
        } else {
          $root.find('[name="user[id]"]').prop('disabled', true);
          $root.find('[name="user[email]"]').prop('disabled', false).val(selected_user.email);
        }

        $root.removeClass('is-minimized');
        selectize.$wrapper.removeClass('has-dropdown-on-top');
        project_selectize.clear();
        project_selectize.clearOptions();
        project_selectize.addOption(auth.user.projects.filter(function (project) {
          return ['OWNER', 'ADMINISTRATOR'].indexOf(project.pivot.role) > -1;
        }).map(function (project, project_index) {
          return Object.assign({}, project, {
            index: project_index,
            is_aready_joined: selected_user.collaborative_projects.some(function (collaborative_project) {
              return collaborative_project.id == project.id;
            })
          });
        }));
        $('.chat-list-search__input').val() && $('.chat-list-search__input').val('').trigger('input');
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
      },
      onDropdownClose: function onDropdownClose() {
        this.clearOptions();
      }
    });
    $chat_message_textarea.focus(function () {
      $chat_message_textarea.select();
      $chat_message_textarea.mouseup(function () {
        $chat_message_textarea.unbind('mouseup');
        return false;
      });
    });
    $close_button.click(function (event) {
      event.preventDefault();
      $user_select.data('selectize').clear();
      $user_select.data('selectize').clearOptions();
      $user_select.data('selectize').refreshState();
    });
    $project_section.toggleClass('d-none', !auth.user.projects.some(function (project) {
      return ['OWNER', 'ADMINISTRATOR'].indexOf(project.pivot.role) > -1;
    }));
    $project_select.removeClass('custom-select').selectize({
      valueField: 'id',
      labelField: 'name',
      searchField: ['name'],
      placeholder: 'Invite to Project (optional)',
      sortField: [{
        field: 'index',
        direction: 'asc'
      }],
      render: {
        item: function item(_item3, escape) {
          return '<div class="selectize-item + is-project">' + '<span class="selectize-item__name">' + escape(_item3.name) + '</span>' + '</div>';
        },
        option: function option(item, escape) {
          return '<div class="selectize-item + is-project ' + (item.is_aready_joined ? 'is-disabled' : '') + '">' + '<span class="selectize-item__name">' + escape(item.name) + '</span>' + (item.is_aready_joined ? '<span class="selectize-item__description">(already joined)</span>' : '') + '</div>';
        }
      },
      onInitialize: function onInitialize() {
        var selectize = this;
        selectize.$control_input.attr('autocomplete', 'st-disabled');
        selectize.refreshState();
      },
      onChange: function onChange(project_id) {
        var selectize = this;

        if (project_id) {
          selected_project = selectize.options[project_id];
          $project_member_role_administrator_option.val('CONTRACTOR');
          $project_member_role_administrator_option.toggleClass('d-none', selected_project.pivot.role != 'OWNER');
          $contract_block.toggleClass('d-none', selected_project.pivot.role != 'OWNER' || selected_user.has_active_contract_with_me);
          $member_section.collapse('show');
          $is_time_trackable_checkbox.prop('checked', true);
          $is_time_trackable_checkbox.trigger('change');

          if (selected_user.has_active_contract_with_me) {
            $hourly_rate_block.removeClass('show');
          } else {
            $hourly_rate_block.addClass('show');
            $hourly_rate_input.val(selected_user.hourly_rate || '');
            $contract_title_input.val(selected_user.professional_title || '');
          }

          if (auth.user.default_credit_card) {
            $credit_card_block.removeClass('show');
          } else {
            $credit_card_block.addClass('show');
          }

          return;
        }

        selected_project = null;
        $member_section.collapse('hide');
      }
    });
    $member_section.on('shown.bs.collapse', function () {
      $member_section.find('input[type="text"], input[type="number"]').each(function () {
        if (!$(this).val() && $(this).is(':visible')) {
          $(this).focus();
          return false;
        }
      });
    });
    $is_time_trackable_checkbox.on('change', function () {
      if ($is_time_trackable_checkbox.prop('checked')) {
        $with_protection_text.removeClass('d-none');
        $without_protection_text.addClass('d-none');
      } else {
        $with_protection_text.addClass('d-none');
        $without_protection_text.removeClass('d-none');
      }

      if ($is_time_trackable_checkbox.prop('checked') && !selected_user.has_active_contract_with_me) {
        $hourly_rate_block.collapse('show');
        $hourly_rate_input.focus();
      } else {
        $hourly_rate_block.collapse('hide');
      }
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
      card.mount($root.find('.stripe-card-element')[0] || null);
      card.addEventListener('change', function (event) {
        if (event.error) {
          $root.find('.stripe-card-errors').text(event.error.message).removeClass('d-none');
        } else {
          $root.find('.stripe-card-errors').text('').addClass('d-none');
        }
      });
    })();

    $root.submit(function (event) {
      event.preventDefault();

      if ($submit_button.hasClass('is-loading')) {
        return;
      }

      $submit_button.addClass('is-loading disabled');
      return function (callback) {
        if ($contract_block.hasClass('d-none')) {
          return callback();
        }

        if (!$hourly_rate_block.hasClass('show') || !$credit_card_block.hasClass('show')) {
          return callback();
        }

        return stripe.createToken(card).then(function (result) {
          if (result.error) {
            $submit_button.removeClass('is-loading disabled');
            $root.find('.stripe-card-errors').text(result.error.message).removeClass('d-none');
            return;
          }

          $root.find('.stripe-card-errors').addClass('d-none');
          $root.find('[name="stripe_token_id"]').val(result.token.id);
          return callback();
        });
      }(function () {
        return request({
          method: 'POST',
          url: '/users/invite',
          data: $root.serialize()
        }, function (response) {
          $submit_button.removeClass('is-loading disabled');

          if (new Validator($root, response).fails()) {
            return;
          }

          if (response.error) {
            $.notify(response.error, 'error');
            return;
          }

          var project_member = response.data.project_member || null;
          delete response.data.project_member;

          if (project_member) {
            project_member.user = response.data;
          }

          project_member && dashboard.selected_project && function () {
            var project = dashboard.selected_project;
            var existent_project_member = project.members.filter(function (current_project_member) {
              return current_project_member.id == project_member.id;
            })[0] || null;

            if (!existent_project_member) {
              project.members.push(project_member);
            }

            project.renderMembers();
          }();
          $user_select.data('selectize').clear();
          $user_select.data('selectize').clearOptions();
          $user_select.data('selectize').refreshState();
        });
      });
    });
  })();

  popovers.create_new_project({
    trigger: $('.navbar__create-new-project-button')
  });
  popovers.add_contract({
    trigger: $('.navbar__add-contract-button')
  });
  $('body').removeClass('is-loading');
}); // ---------------------------------------------------------------------- //
//
// - selected project
//
// ---------------------------------------------------------------------- //

if (dashboard.selected_project) {
  if (dashboard.selected_project.members) {
    dashboard.selected_project.renderMembers = function () {
      var $selected_project_members = $('.selected-project-members');
      $selected_project_members.html('');
      dashboard.selected_project.members.slice(0, 7).reverse().forEach(function (project_member) {
        var $selected_project_member = $(dashboard.template('selected-project-member', {
          member: project_member
        }));
        $selected_project_member.appendTo($selected_project_members);
        popovers.project_member_menu({
          trigger: $selected_project_member,
          project_member: project_member,
          project: dashboard.selected_project
        });
      });
      var $selected_project_show_more_members_button = $('.selected-project__show-more-members-button');
      $selected_project_show_more_members_button.text('+' + (dashboard.selected_project.members.length - 7));
      $selected_project_show_more_members_button.toggleClass('d-none', dashboard.selected_project.members.length <= 7);
    };

    $(function () {
      dashboard.selected_project.renderMembers();
      popovers.invite_project_member({
        trigger: $('.selected-project__invite-member-button'),
        project: dashboard.selected_project
      });
      popovers.project_members({
        trigger: $('.selected-project__show-more-members-button'),
        project: dashboard.selected_project
      });
    });
  }

  $(function () {
    popovers.extra_project_menu({
      trigger: $('.selected-project__extra-menu-button'),
      project: dashboard.selected_project
    });
  });
} // ---------------------------------------------------------------------- //
//
// - bootstrap tour
//
// ---------------------------------------------------------------------- //


$(function () {
  function initialize_tips() {
    var tips = window.tips.filter(function (tip) {
      return $(tip.selector).length > 0;
    });

    if (tips.length === 0) {
      return;
    }

    var initialize = function initialize(available_tips, remaining_only) {
      var relevant_tips = available_tips.filter(function (tip) {
        if (remaining_only) {
          return !tip.is_viewed;
        }

        return true;
      });

      if (relevant_tips.length === 0) {
        return;
      }

      PageIntro.init({
        container: 'body',
        spacing: 20,
        actions: {
          skip: {
            text: remaining_only ? 'Skip Tour' : 'End Tour',
            "class": 'btn btn-default btn-sm'
          },
          next: {
            text: 'Next',
            "class": 'btn btn-primary'
          },
          finish: {
            text: 'Finish',
            "class": 'btn btn-primary'
          }
        },
        entries: relevant_tips.map(function (tip) {
          return {
            selector: tip.selector,
            text: __('tips.' + tip.key),
            onExit: function onExit() {
              !tip.is_viewed && request({
                url: "/tips/".concat(tip.id, "/got_it")
              }, function (response) {
                if (response.error) {
                  console.error(response.error);
                  return;
                }

                tip.is_viewed = true;
              });
            }
          };
        }),
        onSkip: function onSkip() {
          tips.some(function (tip) {
            return !tip.is_viewed;
          }) && request({
            url: "/tips/skip_all"
          }, function (response) {
            if (response.error) {
              console.error(response.error);
              return;
            }

            tips.forEach(function (tip) {
              tip.is_viewed = true;
            });
          });
        }
      });
      PageIntro.start();
    }; // $('.navbar__tour-button').removeClass('d-none').click(function() {
    //     initialize(tips, false);
    // });


    initialize(tips, true);
  } // setTimeout(initialize_tips, 0);

}); //Spendings javascript

$(function () {
  $('#date_range_filter').daterangepicker();
});

/***/ }),

/***/ 5:
/*!**********************************************!*\
  !*** multi ./resources/js/dashboard/main.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\js\dashboard\main.js */"./resources/js/dashboard/main.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2Rhc2hib2FyZC9tYWluLmpzIl0sIm5hbWVzIjpbImRhc2hib2FyZCIsInRlbXBsYXRlIiwidGVtcGxhdGVfbmFtZSIsIm9wdGlvbnMiLCIkIiwiaW5pdGlhbGl6ZV9wcm9qZWN0X3NlbGVjdCIsIiRjcmVhdGVfcHJvamVjdF9idXR0b24iLCJyZW1vdmVDbGFzcyIsInNlbGVjdGl6ZSIsInZhbHVlRmllbGQiLCJsYWJlbEZpZWxkIiwic2VhcmNoRmllbGQiLCJwbGFjZWhvbGRlciIsInNvcnRGaWVsZCIsImZpZWxkIiwiZGlyZWN0aW9uIiwicmVuZGVyIiwiaXRlbSIsImVzY2FwZSIsIm5hbWUiLCJvcHRpb24iLCJpZCIsIm9wdGlvbl9jcmVhdGUiLCJkYXRhIiwiX18iLCJpbnB1dCIsImNyZWF0ZSIsInZhbHVlIiwiY2FsbGJhY2siLCJzZXRUaW1lb3V0IiwicG9wb3ZlciIsIiRwb3BvdmVyX3RpcCIsInRpcCIsImZpbmQiLCJ2YWwiLCJvbkluaXRpYWxpemUiLCIkY29udHJvbF9pbnB1dCIsImF0dHIiLCJhZGRPcHRpb24iLCJhdXRoIiwidXNlciIsInByb2plY3RzIiwibWFwIiwicHJvamVjdCIsInByb2plY3RfaW5kZXgiLCJPYmplY3QiLCJhc3NpZ24iLCJpbmRleCIsInNlbGVjdGVkX3Byb2plY3QiLCJhZGRJdGVtIiwicmVmcmVzaFN0YXRlIiwib24iLCJwcm9qZWN0X2lkIiwicGFyc2VJbnQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJjbGVhciIsInVwZGF0ZVBsYWNlaG9sZGVyIiwiJGRyb3Bkb3duIiwicmVtb3ZlT3B0aW9uIiwibGFzdF92aWV3ZWRfYXQiLCJvbkRyb3Bkb3duT3BlbiIsImNvbnNvbGUiLCJsb2ciLCJtb2RhbHMiLCJ1c2VyX2ZlZWRiYWNrIiwiaW5pdGlhbGl6ZV9zaWRlYmFyIiwiY2xpY2siLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiJHNpZGViYXIiLCJwYXJlbnRzIiwiaGFzQ2xhc3MiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiYWRkQ2xhc3MiLCJnZXRJdGVtIiwidG9nZ2xlQ2xhc3MiLCJ3aWR0aCIsImluaXRpYWxpemVfY2hhdF9wYW5lbF9pbnZpdGVfZm9ybSIsIiRyb290IiwiY2FyZCIsIiR1c2VyX3NlbGVjdCIsIiRlbWFpbF9pbnB1dCIsIiRjaGF0X21lc3NhZ2VfdGV4dGFyZWEiLCIkcHJvamVjdF9zZWN0aW9uIiwiJG1lbWJlcl9zZWN0aW9uIiwiJGNvbnRyYWN0X2Jsb2NrIiwiJHByb2plY3Rfc2VsZWN0IiwiJHByb2plY3RfbWVtYmVyX3JvbGVfc2VsZWN0IiwiJHByb2plY3RfbWVtYmVyX3JvbGVfYWRtaW5pc3RyYXRvcl9vcHRpb24iLCIkY2xvc2VfYnV0dG9uIiwiJGhvdXJseV9yYXRlX2Jsb2NrIiwiJGhvdXJseV9yYXRlX2lucHV0IiwiJGNvbnRyYWN0X3RpdGxlX2lucHV0IiwiJGNyZWRpdF9jYXJkX2Jsb2NrIiwiJGlzX3RpbWVfdHJhY2thYmxlX2Jsb2NrIiwiJGlzX3RpbWVfdHJhY2thYmxlX2NoZWNrYm94IiwiJHdpdGhfcHJvdGVjdGlvbl90ZXh0IiwiJHdpdGhvdXRfcHJvdGVjdGlvbl90ZXh0IiwiJHN1Ym1pdF9idXR0b24iLCJzZWxlY3RlZF91c2VyIiwiaXNfc2VsZWN0ZWQiLCJpbWFnZSIsInVybHMiLCJ0aW55IiwiZnVsbF9uYW1lIiwic2x1ZyIsImxvYWQiLCJxdWVyeSIsImNsZWFyT3B0aW9ucyIsInJlcXVlc3QiLCJ1cmwiLCJ3aXRoX2NvbGxhYm9yYXRpdmVfcHJvamVjdHMiLCJyZXNwb25zZSIsIm9uQ2hhbmdlIiwiaXRlbV9pZCIsInByb2plY3Rfc2VsZWN0aXplIiwicHJvcCIsIiR3cmFwcGVyIiwiZW1haWwiLCJmaWx0ZXIiLCJpbmRleE9mIiwicGl2b3QiLCJyb2xlIiwiaXNfYXJlYWR5X2pvaW5lZCIsImNvbGxhYm9yYXRpdmVfcHJvamVjdHMiLCJzb21lIiwiY29sbGFib3JhdGl2ZV9wcm9qZWN0IiwidHJpZ2dlciIsImZvY3VzIiwib3JpZ2luYWxfdmFsdWUiLCJmaXhlZF92YWx1ZSIsInJlcGxhY2UiLCJvbkRyb3Bkb3duQ2xvc2UiLCJzZWxlY3QiLCJtb3VzZXVwIiwidW5iaW5kIiwiaGFzX2FjdGl2ZV9jb250cmFjdF93aXRoX21lIiwiY29sbGFwc2UiLCJob3VybHlfcmF0ZSIsInByb2Zlc3Npb25hbF90aXRsZSIsImRlZmF1bHRfY3JlZGl0X2NhcmQiLCJlYWNoIiwiaXMiLCJpbml0aWFsaXplX3N0cmlwZV9pbnB1dCIsImVsZW1lbnRzIiwic3RyaXBlIiwic3R5bGUiLCJiYXNlIiwiY29sb3IiLCJsaW5lSGVpZ2h0IiwiZm9udEZhbWlseSIsImZvbnRTbW9vdGhpbmciLCJmb250U2l6ZSIsImludmFsaWQiLCJpY29uQ29sb3IiLCJtb3VudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlcnJvciIsInRleHQiLCJtZXNzYWdlIiwic3VibWl0IiwiY3JlYXRlVG9rZW4iLCJ0aGVuIiwicmVzdWx0IiwidG9rZW4iLCJtZXRob2QiLCJzZXJpYWxpemUiLCJWYWxpZGF0b3IiLCJmYWlscyIsIm5vdGlmeSIsInByb2plY3RfbWVtYmVyIiwiZXhpc3RlbnRfcHJvamVjdF9tZW1iZXIiLCJtZW1iZXJzIiwiY3VycmVudF9wcm9qZWN0X21lbWJlciIsInB1c2giLCJyZW5kZXJNZW1iZXJzIiwicG9wb3ZlcnMiLCJjcmVhdGVfbmV3X3Byb2plY3QiLCJhZGRfY29udHJhY3QiLCIkc2VsZWN0ZWRfcHJvamVjdF9tZW1iZXJzIiwiaHRtbCIsInNsaWNlIiwicmV2ZXJzZSIsImZvckVhY2giLCIkc2VsZWN0ZWRfcHJvamVjdF9tZW1iZXIiLCJtZW1iZXIiLCJhcHBlbmRUbyIsInByb2plY3RfbWVtYmVyX21lbnUiLCIkc2VsZWN0ZWRfcHJvamVjdF9zaG93X21vcmVfbWVtYmVyc19idXR0b24iLCJsZW5ndGgiLCJpbnZpdGVfcHJvamVjdF9tZW1iZXIiLCJwcm9qZWN0X21lbWJlcnMiLCJleHRyYV9wcm9qZWN0X21lbnUiLCJpbml0aWFsaXplX3RpcHMiLCJ0aXBzIiwic2VsZWN0b3IiLCJpbml0aWFsaXplIiwiYXZhaWxhYmxlX3RpcHMiLCJyZW1haW5pbmdfb25seSIsInJlbGV2YW50X3RpcHMiLCJpc192aWV3ZWQiLCJQYWdlSW50cm8iLCJpbml0IiwiY29udGFpbmVyIiwic3BhY2luZyIsImFjdGlvbnMiLCJza2lwIiwibmV4dCIsImZpbmlzaCIsImVudHJpZXMiLCJrZXkiLCJvbkV4aXQiLCJvblNraXAiLCJzdGFydCIsImRhdGVyYW5nZXBpY2tlciJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBQSxTQUFTLENBQUNDLFFBQVYsR0FBcUIsVUFBU0MsYUFBVCxFQUF3QkMsT0FBeEIsRUFBaUM7QUFDckQsU0FBT0YsUUFBUSxDQUFDLGVBQWVDLGFBQWhCLEVBQStCQyxPQUEvQixDQUFmO0FBQ0EsQ0FG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YWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA1KTtcbiIsImRhc2hib2FyZC50ZW1wbGF0ZSA9IGZ1bmN0aW9uKHRlbXBsYXRlX25hbWUsIG9wdGlvbnMpIHtcclxuXHRyZXR1cm4gdGVtcGxhdGUoJ2Rhc2hib2FyZC0nICsgdGVtcGxhdGVfbmFtZSwgb3B0aW9ucyk7XHJcbn07XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXHJcblxyXG4kKGZ1bmN0aW9uKCkge1xyXG5cdChmdW5jdGlvbiBpbml0aWFsaXplX3Byb2plY3Rfc2VsZWN0KCkge1xyXG5cdFx0dmFyICRjcmVhdGVfcHJvamVjdF9idXR0b24gPSAkKCcubmF2YmFyX19jcmVhdGUtbmV3LXByb2plY3QtYnV0dG9uJyk7XHJcblxyXG5cdFx0JCgnLm5hdmJhcl9fcHJvamVjdC1zZWxlY3QnKS5yZW1vdmVDbGFzcygnY3VzdG9tLXNlbGVjdCcpLnNlbGVjdGl6ZSh7XHJcblx0XHRcdHZhbHVlRmllbGQ6ICdpZCcsXHJcblx0XHRcdGxhYmVsRmllbGQ6ICduYW1lJyxcclxuXHRcdFx0c2VhcmNoRmllbGQ6IFsgJ25hbWUnIF0sXHJcblx0XHRcdHBsYWNlaG9sZGVyOiAnU2VsZWN0IFByb2plY3QnLFxyXG5cdFx0XHRzb3J0RmllbGQ6IFt7IGZpZWxkOiAnaW5kZXgnLCBkaXJlY3Rpb246ICdhc2MnIH1dLFxyXG5cclxuXHRcdFx0cmVuZGVyOiB7XHJcblx0XHRcdFx0aXRlbTogZnVuY3Rpb24oaXRlbSwgZXNjYXBlKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cInNlbGVjdGl6ZS1pdGVtICsgaXMtcHJvamVjdFwiPicgK1xyXG5cdFx0XHRcdFx0XHRcdCc8c3BhbiBjbGFzcz1cInNlbGVjdGl6ZS1pdGVtX19uYW1lXCI+JyArIGVzY2FwZShpdGVtLm5hbWUpICsgJzwvc3Bhbj4nICtcclxuXHRcdFx0XHRcdFx0JzwvZGl2PidcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0b3B0aW9uOiBmdW5jdGlvbihpdGVtLCBlc2NhcGUpIHtcclxuXHRcdFx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwic2VsZWN0aXplLWl0ZW0gKyBpcy1wcm9qZWN0XCI+JyArXHJcblx0XHRcdFx0XHRcdFx0JzwnICsgKGl0ZW0uaWQgPyAnc3BhbicgOiAnYicpICsgJyBjbGFzcz1cInNlbGVjdGl6ZS1pdGVtX19uYW1lXCI+JyArXHJcblx0XHRcdFx0XHRcdFx0XHQoaXRlbS5pZCA/ICcnIDogJzxpbWcgc3JjPVwiL2ltZy9jaHJpc3RtYXMtc3RhcnMuc3ZnXCIgc3R5bGU9XCJ3aWR0aDogMjBweDtcIiBhbHQ9XCJcIj4gJykgK1xyXG5cdFx0XHRcdFx0XHRcdFx0ZXNjYXBlKGl0ZW0ubmFtZSkgK1xyXG5cdFx0XHRcdFx0XHRcdCc8LycgKyAoaXRlbS5pZCA/ICdzcGFuJyA6ICdiJykgKyAnPicgK1xyXG5cdFx0XHRcdFx0XHQnPC9kaXY+J1xyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHRvcHRpb25fY3JlYXRlOiBmdW5jdGlvbihkYXRhLCBlc2NhcGUpIHtcclxuXHRcdFx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwic2VsZWN0aXplLWl0ZW0tY3JlYXRlIGNyZWF0ZVwiPicgK1xyXG5cdFx0XHRcdFx0XHRcdCc8aW1nIHNyYz1cIi9pbWcvY2hyaXN0bWFzLXN0YXJzLnN2Z1wiIHN0eWxlPVwid2lkdGg6IDIwcHg7XCIgYWx0PVwiXCI+ICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX18oJ2NvbW1vbi5wcm9qZWN0X3NlbGVjdG9yLmNyZWF0ZScpICsgJyBgPHN0cm9uZz4nICsgZXNjYXBlKGRhdGEuaW5wdXQpICsgJzwvc3Ryb25nPmAnICtcclxuXHRcdFx0XHRcdFx0JzwvZGl2PidcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGNyZWF0ZTogZnVuY3Rpb24odmFsdWUsIGNhbGxiYWNrKSB7XHJcblx0XHRcdFx0dmFyIHNlbGVjdGl6ZSA9IHRoaXM7XHJcblxyXG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHQkY3JlYXRlX3Byb2plY3RfYnV0dG9uLnBvcG92ZXIoJ3Nob3cnKTtcclxuXHRcdFx0XHRcdHZhciAkcG9wb3Zlcl90aXAgPSAkKCRjcmVhdGVfcHJvamVjdF9idXR0b24uZGF0YSgnYnMucG9wb3ZlcicpLnRpcCk7XHJcblx0XHRcdFx0XHQkcG9wb3Zlcl90aXAuZmluZCgnaW5wdXRbbmFtZT1cInByb2plY3RbbmFtZV1cIl0nKS52YWwodmFsdWUpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0b25Jbml0aWFsaXplOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR2YXIgc2VsZWN0aXplID0gdGhpcztcclxuXHRcdFx0XHRzZWxlY3RpemUuJGNvbnRyb2xfaW5wdXQuYXR0cignYXV0b2NvbXBsZXRlJywgJ3N0LWRpc2FibGVkJyk7XHJcblxyXG5cdFx0XHRcdHNlbGVjdGl6ZS5hZGRPcHRpb24oYXV0aC51c2VyLnByb2plY3RzLm1hcChmdW5jdGlvbihwcm9qZWN0LCBwcm9qZWN0X2luZGV4KSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgcHJvamVjdCwge1xyXG5cdFx0XHRcdFx0XHRpbmRleDogcHJvamVjdF9pbmRleCxcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0pKTtcclxuXHJcblx0XHRcdFx0c2VsZWN0aXplLmFkZE9wdGlvbih7XHJcblx0XHRcdFx0XHRpZDogMCxcclxuXHRcdFx0XHRcdG5hbWU6IF9fKCdjb21tb24ucHJvamVjdF9zZWxlY3Rvci5jcmVhdGVfbmV3X3Byb2plY3QnKSxcclxuXHRcdFx0XHRcdGluZGV4OiBudWxsLFxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRkYXNoYm9hcmQuc2VsZWN0ZWRfcHJvamVjdCAmJiBzZWxlY3RpemUuYWRkSXRlbShkYXNoYm9hcmQuc2VsZWN0ZWRfcHJvamVjdC5pZCk7XHJcblx0XHRcdFx0c2VsZWN0aXplLnJlZnJlc2hTdGF0ZSgpO1xyXG5cclxuXHRcdFx0XHRzZWxlY3RpemUub24oJ2NoYW5nZScsIGZ1bmN0aW9uKHByb2plY3RfaWQpIHtcclxuXHRcdFx0XHRcdGlmICghcHJvamVjdF9pZCkge1xyXG5cdFx0XHRcdFx0XHRzZWxlY3RpemUuYWRkT3B0aW9uKHtcclxuXHRcdFx0XHRcdFx0XHRpZDogMCxcclxuXHRcdFx0XHRcdFx0XHRuYW1lOiBfXygnY29tbW9uLnByb2plY3Rfc2VsZWN0b3IuY3JlYXRlX25ld19wcm9qZWN0JyksXHJcblx0XHRcdFx0XHRcdFx0aW5kZXg6IG51bGwsXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHByb2plY3RfaWQgPSBwYXJzZUludChwcm9qZWN0X2lkKTtcclxuXHJcblx0XHRcdFx0XHRpZiAocHJvamVjdF9pZCkge1xyXG5cdFx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvZGFzaGJvYXJkL3Byb2plY3RzLycgKyBwcm9qZWN0X2lkO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0c2VsZWN0aXplLmNsZWFyKCk7XHJcblx0XHRcdFx0XHQkY3JlYXRlX3Byb2plY3RfYnV0dG9uLnBvcG92ZXIoJ3Nob3cnKTtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0c2VsZWN0aXplLiRjb250cm9sX2lucHV0Lm9uKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0c2VsZWN0aXplLnVwZGF0ZVBsYWNlaG9sZGVyKCk7XHJcblx0XHRcdFx0XHRzZWxlY3RpemUuJGRyb3Bkb3duLnJlbW92ZUNsYXNzKCdpcy1oaWRkZW4nKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoJCh0aGlzKS52YWwoKSkge1xyXG5cdFx0XHRcdFx0XHRzZWxlY3RpemUucmVtb3ZlT3B0aW9uKDApO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0c2VsZWN0aXplLmFkZE9wdGlvbih7XHJcblx0XHRcdFx0XHRcdFx0aWQ6IDAsXHJcblx0XHRcdFx0XHRcdFx0bmFtZTogX18oJ2NvbW1vbi5wcm9qZWN0X3NlbGVjdG9yLmNyZWF0ZV9uZXdfcHJvamVjdCcpLFxyXG5cdFx0XHRcdFx0XHRcdGxhc3Rfdmlld2VkX2F0OiAnWicsXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0b25Ecm9wZG93bk9wZW46IGZ1bmN0aW9uKCRkcm9wZG93bikge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdkcm9wZG93biBvcGVuJywgJGRyb3Bkb3duLmZpbmQoJycpKTtcclxuXHRcdFx0fSxcclxuXHRcdH0pO1xyXG5cdH0pKCk7XHJcblxyXG5cdCQoJy5uYXZiYXItZmVlZGJhY2tfX2lucHV0Jykub24oJ2lucHV0JywgZnVuY3Rpb24oKSB7XHJcblx0XHRpZiAoJCh0aGlzKS5kYXRhKCdtb2RhbCcpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHQkKHRoaXMpLmRhdGEoJ21vZGFsJywgbW9kYWxzLnVzZXJfZmVlZGJhY2soKSk7XHJcblx0fSk7XHJcblxyXG5cdChmdW5jdGlvbiBpbml0aWFsaXplX3NpZGViYXIoKSB7XHJcblx0XHQkKCcuc2lkZWJhcl9fbWluaW1pemUtYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0dmFyICRzaWRlYmFyID0gJCh0aGlzKS5wYXJlbnRzKCcuc2lkZWJhcicpO1xyXG5cclxuXHRcdFx0aWYgKCRzaWRlYmFyLmhhc0NsYXNzKCdpcy1taW5pbWl6ZWQnKSkge1xyXG5cdFx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzaWRlYmFyX2lzX21pbmltaXplZCcsIDApO1xyXG5cdFx0XHRcdCRzaWRlYmFyLnJlbW92ZUNsYXNzKCdpcy1taW5pbWl6ZWQnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc2lkZWJhcl9pc19taW5pbWl6ZWQnLCAxKTtcclxuXHRcdFx0XHQkc2lkZWJhci5hZGRDbGFzcygnaXMtbWluaW1pemVkJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2lkZWJhcl9pc19taW5pbWl6ZWQnKSkge1xyXG5cdFx0XHQkKCcuc2lkZWJhcicpLnRvZ2dsZUNsYXNzKCdpcy1taW5pbWl6ZWQnLCBwYXJzZUludChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2lkZWJhcl9pc19taW5pbWl6ZWQnKSkgPyB0cnVlIDogZmFsc2UpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JCgnLnNpZGViYXInKS50b2dnbGVDbGFzcygnaXMtbWluaW1pemVkJywgJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY4KTtcclxuXHRcdH1cclxuXHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkKCcuc2lkZWJhcicpLmFkZENsYXNzKCdpcy1hbmltYXRlZCcpO1xyXG5cdFx0XHQkKCcuY29udGVudCcpLmFkZENsYXNzKCdpcy1hbmltYXRlZCcpO1xyXG5cdFx0fSwgMjUwKTtcclxuXHR9KSgpO1xyXG5cclxuXHQoZnVuY3Rpb24gaW5pdGlhbGl6ZV9jaGF0X3BhbmVsX2ludml0ZV9mb3JtKCkge1xyXG5cdFx0dmFyICRyb290ID0gJCgnLmNoYXQtcGFuZWwtaW52aXRlLWZvcm0nKTtcclxuXHRcdHZhciBjYXJkID0gbnVsbDtcclxuXHRcdHZhciAkdXNlcl9zZWxlY3QgPSAkcm9vdC5maW5kKCcjY2hhdC1wYW5lbC1pbnZpdGUtZm9ybV9fdXNlci1zZWxlY3QnKTtcclxuXHRcdHZhciAkZW1haWxfaW5wdXQgPSAkcm9vdC5maW5kKCdpbnB1dFtuYW1lPVwidXNlcltlbWFpbF1cIl0nKTtcclxuXHRcdHZhciAkY2hhdF9tZXNzYWdlX3RleHRhcmVhID0gJHJvb3QuZmluZCgndGV4dGFyZWFbbmFtZT1cImNoYXRfbWVzc2FnZVt0ZXh0XVwiXScpO1xyXG5cdFx0dmFyICRwcm9qZWN0X3NlY3Rpb24gPSAkcm9vdC5maW5kKCcuY2hhdC1wYW5lbC1pbnZpdGUtZm9ybV9fcHJvamVjdC1zZWN0aW9uJyk7XHJcblx0XHR2YXIgJG1lbWJlcl9zZWN0aW9uID0gJHJvb3QuZmluZCgnLmNoYXQtcGFuZWwtaW52aXRlLWZvcm1fX21lbWJlci1zZWN0aW9uJyk7XHJcblx0XHR2YXIgJGNvbnRyYWN0X2Jsb2NrID0gJHJvb3QuZmluZCgnLmNoYXQtcGFuZWwtaW52aXRlLWZvcm1fX2NvbnRyYWN0LWJsb2NrJyk7XHJcblx0XHR2YXIgJHByb2plY3Rfc2VsZWN0ID0gJHJvb3QuZmluZCgnc2VsZWN0W25hbWU9XCJwcm9qZWN0X21lbWJlcltwcm9qZWN0X2lkXVwiXScpO1xyXG5cdFx0dmFyICRwcm9qZWN0X21lbWJlcl9yb2xlX3NlbGVjdCA9ICRyb290LmZpbmQoJ3NlbGVjdFtuYW1lPVwicHJvamVjdF9tZW1iZXJbcm9sZV1cIl0nKTtcclxuXHRcdHZhciAkcHJvamVjdF9tZW1iZXJfcm9sZV9hZG1pbmlzdHJhdG9yX29wdGlvbiA9ICRwcm9qZWN0X21lbWJlcl9yb2xlX3NlbGVjdC5maW5kKCdvcHRpb25bdmFsdWU9XCJBRE1JTklTVFJBVE9SXCJdJyk7XHJcblx0XHR2YXIgJGNsb3NlX2J1dHRvbiA9ICRyb290LmZpbmQoJy5jaGF0LXBhbmVsLWludml0ZS1mb3JtX19jbG9zZS1idXR0b24nKTtcclxuXHRcdHZhciAkaG91cmx5X3JhdGVfYmxvY2sgPSAkcm9vdC5maW5kKCcuY2hhdC1wYW5lbC1pbnZpdGUtZm9ybV9faG91cmx5LXJhdGUtYmxvY2snKTtcclxuXHRcdHZhciAkaG91cmx5X3JhdGVfaW5wdXQgPSAkcm9vdC5maW5kKCdbbmFtZT1cImNvbnRyYWN0W2hvdXJseV9yYXRlXVwiXScpO1xyXG5cdFx0dmFyICRjb250cmFjdF90aXRsZV9pbnB1dCA9ICRyb290LmZpbmQoJ1tuYW1lPVwiY29udHJhY3RbdGl0bGVdXCJdJyk7XHJcblx0XHR2YXIgJGNyZWRpdF9jYXJkX2Jsb2NrID0gJHJvb3QuZmluZCgnLmNoYXQtcGFuZWwtaW52aXRlLWZvcm1fX2NyZWRpdC1jYXJkLWJsb2NrJyk7XHJcblx0XHR2YXIgJGlzX3RpbWVfdHJhY2thYmxlX2Jsb2NrID0gJHJvb3QuZmluZCgnLmNoYXQtcGFuZWwtaW52aXRlLWZvcm1fX2lzLXRpbWUtdHJhY2thYmxlLWJsb2NrJyk7XHJcblx0XHR2YXIgJGlzX3RpbWVfdHJhY2thYmxlX2NoZWNrYm94ID0gJHJvb3QuZmluZCgnI2NoYXQtcGFuZWwtaW52aXRlLWZvcm1fX2lzLXRpbWUtdHJhY2thYmxlLWNoZWNrYm94Jyk7XHJcblx0XHR2YXIgJHdpdGhfcHJvdGVjdGlvbl90ZXh0ID0gJHJvb3QuZmluZCgnLmNoYXQtcGFuZWwtaW52aXRlLWZvcm1fX3dpdGgtcHJvdGVjdGlvbi10ZXh0Jyk7XHJcblx0XHR2YXIgJHdpdGhvdXRfcHJvdGVjdGlvbl90ZXh0ID0gJHJvb3QuZmluZCgnLmNoYXQtcGFuZWwtaW52aXRlLWZvcm1fX3dpdGhvdXQtcHJvdGVjdGlvbi10ZXh0Jyk7XHJcblx0XHR2YXIgJHN1Ym1pdF9idXR0b24gPSAkcm9vdC5maW5kKCdidXR0b25bdHlwZT1cInN1Ym1pdFwiXScpO1xyXG5cdFx0dmFyIHNlbGVjdGVkX3VzZXIgPSBudWxsO1xyXG5cdFx0dmFyIHNlbGVjdGVkX3Byb2plY3QgPSBudWxsO1xyXG5cclxuXHRcdCR1c2VyX3NlbGVjdC5yZW1vdmVDbGFzcygnY3VzdG9tLXNlbGVjdCcpLnNlbGVjdGl6ZSh7XHJcblx0XHRcdHZhbHVlRmllbGQ6ICdpZCcsXHJcblx0XHRcdHNlYXJjaEZpZWxkOiBbICdlbWFpbCcsICdmdWxsX25hbWUnLCAnc2x1ZycgXSxcclxuXHRcdFx0cGxhY2Vob2xkZXI6IF9fKCdzaWRlYmFyLmludml0ZV90b19jaGF0JyksXHJcblxyXG5cdFx0XHRyZW5kZXI6IHtcclxuXHRcdFx0XHRpdGVtOiBmdW5jdGlvbihpdGVtLCBlc2NhcGUpIHtcclxuXHRcdFx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwic2VsZWN0aXplLWl0ZW0gKyBpcy11c2VyICcgKyAoaXRlbS5pc19zZWxlY3RlZCA/ICdpcy1zZWxlY3RlZCcgOiAnJykgKyAnXCI+JyArXHJcblx0XHRcdFx0XHRcdFx0KGl0ZW0uaW1hZ2VcclxuXHRcdFx0XHRcdFx0XHRcdD8gJzxpbWcgY2xhc3M9XCJzZWxlY3RpemUtaXRlbV9faW1hZ2VcIiBzcmM9XCInICsgaXRlbS5pbWFnZS51cmxzLnRpbnkgKyAnXCIgYWx0PVwiXCI+J1xyXG5cdFx0XHRcdFx0XHRcdFx0OiAnJ1xyXG5cdFx0XHRcdFx0XHRcdCkgK1xyXG5cdFx0XHRcdFx0XHRcdCc8c3BhbiBjbGFzcz1cInNlbGVjdGl6ZS1pdGVtX190aXRsZVwiPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0KGl0ZW0uZnVsbF9uYW1lXHJcblx0XHRcdFx0XHRcdFx0XHRcdD8gZXNjYXBlKGl0ZW0uZnVsbF9uYW1lKSArICcgKCcgKyBpdGVtLnNsdWcgKyAnKSdcclxuXHRcdFx0XHRcdFx0XHRcdFx0OiBpdGVtLnNsdWdcclxuXHRcdFx0XHRcdFx0XHRcdCkgK1xyXG5cdFx0XHRcdFx0XHRcdCc8L3NwYW4+JyArXHJcblx0XHRcdFx0XHRcdCc8L2Rpdj4nXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdG9wdGlvbjogZnVuY3Rpb24oaXRlbSwgZXNjYXBlKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cIicgK1xyXG5cdFx0XHRcdFx0XHRcdCdzZWxlY3RpemUtaXRlbSArIGlzLXVzZXIgJyArXHJcblx0XHRcdFx0XHRcdFx0KGl0ZW0uaWQgPT0gYXV0aC51c2VyLmlkID8gJ2hhcy1kZXNjcmlwdGlvbiBpcy1kaXNhYmxlZCcgOiAnJykgK1xyXG5cdFx0XHRcdFx0XHQnXCI+JyArXHJcblx0XHRcdFx0XHRcdFx0KGl0ZW0uaW1hZ2VcclxuXHRcdFx0XHRcdFx0XHRcdD8gJzxpbWcgY2xhc3M9XCJzZWxlY3RpemUtaXRlbV9faW1hZ2VcIiBzcmM9XCInICsgaXRlbS5pbWFnZS51cmxzLnRpbnkgKyAnXCIgYWx0PVwiXCI+J1xyXG5cdFx0XHRcdFx0XHRcdFx0OiAnJ1xyXG5cdFx0XHRcdFx0XHRcdCkgK1xyXG5cdFx0XHRcdFx0XHRcdCc8c3BhbiBjbGFzcz1cInNlbGVjdGl6ZS1pdGVtX190aXRsZVwiPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0KGl0ZW0uZnVsbF9uYW1lXHJcblx0XHRcdFx0XHRcdFx0XHRcdD8gZXNjYXBlKGl0ZW0uZnVsbF9uYW1lKSArICcgKCcgKyBpdGVtLnNsdWcgKyAnKSdcclxuXHRcdFx0XHRcdFx0XHRcdFx0OiBpdGVtLnNsdWdcclxuXHRcdFx0XHRcdFx0XHRcdCkgK1xyXG5cdFx0XHRcdFx0XHRcdCc8L3NwYW4+JyArXHJcblx0XHRcdFx0XHRcdFx0KGl0ZW0uaWQgPT0gYXV0aC51c2VyLmlkID8gJzxzcGFuIGNsYXNzPVwic2VsZWN0aXplLWl0ZW1fX2Rlc2NyaXB0aW9uXCI+KGl0XFwncyB5b3UpPC9zcGFuPicgOiAnJykgK1xyXG5cdFx0XHRcdFx0XHQnPC9kaXY+J1xyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0bG9hZDogZnVuY3Rpb24ocXVlcnksIGNhbGxiYWNrKSB7XHJcblx0XHRcdFx0dGhpcy5jbGVhck9wdGlvbnMoKTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIHJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiAnL3VzZXJzL2F1dG9jb21wbGV0ZScsXHJcblxyXG5cdFx0XHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdFx0XHR3aXRoX2NvbGxhYm9yYXRpdmVfcHJvamVjdHM6IHRydWUsXHJcblx0XHRcdFx0XHRcdHF1ZXJ5OiBxdWVyeSxcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0fSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuXHRcdFx0XHRcdHJldHVybiBjYWxsYmFjayhyZXNwb25zZS5kYXRhKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihpdGVtX2lkKSB7XHJcblx0XHRcdFx0dmFyIHNlbGVjdGl6ZSA9IHRoaXM7XHJcblx0XHRcdFx0dmFyIHByb2plY3Rfc2VsZWN0aXplID0gJHByb2plY3Rfc2VsZWN0LmRhdGEoJ3NlbGVjdGl6ZScpO1xyXG5cclxuXHRcdFx0XHRpZiAoIWl0ZW1faWQpIHtcclxuXHRcdFx0XHRcdHNlbGVjdGVkX3VzZXIgPSBudWxsO1xyXG5cdFx0XHRcdFx0JHJvb3QuZmluZCgnW25hbWU9XCJ1c2VyW2lkXVwiXScpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblx0XHRcdFx0XHQkcm9vdC5maW5kKCdbbmFtZT1cInVzZXJbZW1haWxdXCJdJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuXHRcdFx0XHRcdCRyb290LmFkZENsYXNzKCdpcy1taW5pbWl6ZWQnKTtcclxuXHRcdFx0XHRcdHNlbGVjdGl6ZS4kd3JhcHBlci5hZGRDbGFzcygnaGFzLWRyb3Bkb3duLW9uLXRvcCcpO1xyXG5cdFx0XHRcdFx0cHJvamVjdF9zZWxlY3RpemUuY2xlYXIoKTtcclxuXHRcdFx0XHRcdHByb2plY3Rfc2VsZWN0aXplLmNsZWFyT3B0aW9ucygpO1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0c2VsZWN0ZWRfdXNlciA9IHNlbGVjdGl6ZS5vcHRpb25zW2l0ZW1faWRdO1xyXG5cclxuXHRcdFx0XHRpZiAoc2VsZWN0ZWRfdXNlci5pZCkge1xyXG5cdFx0XHRcdFx0JHJvb3QuZmluZCgnW25hbWU9XCJ1c2VyW2lkXVwiXScpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpLnZhbChzZWxlY3RlZF91c2VyLmlkKTtcclxuXHRcdFx0XHRcdCRyb290LmZpbmQoJ1tuYW1lPVwidXNlcltlbWFpbF1cIl0nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQkcm9vdC5maW5kKCdbbmFtZT1cInVzZXJbaWRdXCJdJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuXHRcdFx0XHRcdCRyb290LmZpbmQoJ1tuYW1lPVwidXNlcltlbWFpbF1cIl0nKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKS52YWwoc2VsZWN0ZWRfdXNlci5lbWFpbCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQkcm9vdC5yZW1vdmVDbGFzcygnaXMtbWluaW1pemVkJyk7XHJcblx0XHRcdFx0c2VsZWN0aXplLiR3cmFwcGVyLnJlbW92ZUNsYXNzKCdoYXMtZHJvcGRvd24tb24tdG9wJyk7XHJcblx0XHRcdFx0cHJvamVjdF9zZWxlY3RpemUuY2xlYXIoKTtcclxuXHRcdFx0XHRwcm9qZWN0X3NlbGVjdGl6ZS5jbGVhck9wdGlvbnMoKTtcclxuXHJcblx0XHRcdFx0cHJvamVjdF9zZWxlY3RpemUuYWRkT3B0aW9uKGF1dGgudXNlci5wcm9qZWN0cy5maWx0ZXIoZnVuY3Rpb24ocHJvamVjdCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIFsgJ09XTkVSJywgJ0FETUlOSVNUUkFUT1InIF0uaW5kZXhPZihwcm9qZWN0LnBpdm90LnJvbGUpID4gLTE7XHJcblx0XHRcdFx0fSkubWFwKGZ1bmN0aW9uKHByb2plY3QsIHByb2plY3RfaW5kZXgpIHtcclxuXHRcdFx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBwcm9qZWN0LCB7XHJcblx0XHRcdFx0XHRcdGluZGV4OiBwcm9qZWN0X2luZGV4LFxyXG5cclxuXHRcdFx0XHRcdFx0aXNfYXJlYWR5X2pvaW5lZDogc2VsZWN0ZWRfdXNlci5jb2xsYWJvcmF0aXZlX3Byb2plY3RzLnNvbWUoZnVuY3Rpb24oY29sbGFib3JhdGl2ZV9wcm9qZWN0KSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGNvbGxhYm9yYXRpdmVfcHJvamVjdC5pZCA9PSBwcm9qZWN0LmlkO1xyXG5cdFx0XHRcdFx0XHR9KSxcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0pKTtcclxuXHJcblx0XHRcdFx0JCgnLmNoYXQtbGlzdC1zZWFyY2hfX2lucHV0JykudmFsKCkgJiYgJCgnLmNoYXQtbGlzdC1zZWFyY2hfX2lucHV0JykudmFsKCcnKS50cmlnZ2VyKCdpbnB1dCcpO1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0b25Jbml0aWFsaXplOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR2YXIgc2VsZWN0aXplID0gdGhpcztcclxuXHRcdFx0XHRzZWxlY3RpemUuJGNvbnRyb2xfaW5wdXQuYXR0cignYXV0b2NvbXBsZXRlJywgJ3N0LWRpc2FibGVkJyk7XHJcblx0XHRcdFx0c2VsZWN0aXplLiRjb250cm9sX2lucHV0LmZvY3VzKCk7XHJcblxyXG5cdFx0XHRcdHNlbGVjdGl6ZS4kY29udHJvbF9pbnB1dC5vbignaW5wdXQnLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdHZhciBvcmlnaW5hbF92YWx1ZSA9ICQodGhpcykudmFsKCk7XHJcblx0XHRcdFx0XHR2YXIgZml4ZWRfdmFsdWUgPSAkKHRoaXMpLnZhbCgpLnJlcGxhY2UoL15tYWlsdG86LywgJycpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChvcmlnaW5hbF92YWx1ZSAhPSBmaXhlZF92YWx1ZSkge1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpLnZhbChmaXhlZF92YWx1ZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRvbkRyb3Bkb3duQ2xvc2U6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHRoaXMuY2xlYXJPcHRpb25zKCk7XHJcblx0XHRcdH0sXHJcblx0XHR9KTtcclxuXHJcblx0XHQkY2hhdF9tZXNzYWdlX3RleHRhcmVhLmZvY3VzKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkY2hhdF9tZXNzYWdlX3RleHRhcmVhLnNlbGVjdCgpO1xyXG5cclxuXHRcdCAgICAkY2hhdF9tZXNzYWdlX3RleHRhcmVhLm1vdXNldXAoZnVuY3Rpb24oKSB7XHJcblx0XHQgICAgICAgICRjaGF0X21lc3NhZ2VfdGV4dGFyZWEudW5iaW5kKCdtb3VzZXVwJyk7XHJcblx0XHQgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHRcdCAgICB9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCRjbG9zZV9idXR0b24uY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0JHVzZXJfc2VsZWN0LmRhdGEoJ3NlbGVjdGl6ZScpLmNsZWFyKCk7XHJcblx0XHRcdCR1c2VyX3NlbGVjdC5kYXRhKCdzZWxlY3RpemUnKS5jbGVhck9wdGlvbnMoKTtcclxuXHRcdFx0JHVzZXJfc2VsZWN0LmRhdGEoJ3NlbGVjdGl6ZScpLnJlZnJlc2hTdGF0ZSgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JHByb2plY3Rfc2VjdGlvbi50b2dnbGVDbGFzcygnZC1ub25lJywgIWF1dGgudXNlci5wcm9qZWN0cy5zb21lKGZ1bmN0aW9uKHByb2plY3QpIHtcclxuXHRcdFx0cmV0dXJuIFsgJ09XTkVSJywgJ0FETUlOSVNUUkFUT1InIF0uaW5kZXhPZihwcm9qZWN0LnBpdm90LnJvbGUpID4gLTE7XHJcblx0XHR9KSk7XHJcblxyXG5cdFx0JHByb2plY3Rfc2VsZWN0LnJlbW92ZUNsYXNzKCdjdXN0b20tc2VsZWN0Jykuc2VsZWN0aXplKHtcclxuXHRcdFx0dmFsdWVGaWVsZDogJ2lkJyxcclxuXHRcdFx0bGFiZWxGaWVsZDogJ25hbWUnLFxyXG5cdFx0XHRzZWFyY2hGaWVsZDogWyAnbmFtZScgXSxcclxuXHRcdFx0cGxhY2Vob2xkZXI6ICdJbnZpdGUgdG8gUHJvamVjdCAob3B0aW9uYWwpJyxcclxuXHRcdFx0c29ydEZpZWxkOiBbeyBmaWVsZDogJ2luZGV4JywgZGlyZWN0aW9uOiAnYXNjJyB9XSxcclxuXHJcblx0XHRcdHJlbmRlcjoge1xyXG5cdFx0XHRcdGl0ZW06IGZ1bmN0aW9uKGl0ZW0sIGVzY2FwZSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJzZWxlY3RpemUtaXRlbSArIGlzLXByb2plY3RcIj4nICtcclxuXHRcdFx0XHRcdFx0XHQnPHNwYW4gY2xhc3M9XCJzZWxlY3RpemUtaXRlbV9fbmFtZVwiPicgKyBlc2NhcGUoaXRlbS5uYW1lKSArICc8L3NwYW4+JyArXHJcblx0XHRcdFx0XHRcdCc8L2Rpdj4nXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdG9wdGlvbjogZnVuY3Rpb24oaXRlbSwgZXNjYXBlKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cInNlbGVjdGl6ZS1pdGVtICsgaXMtcHJvamVjdCAnICsgKGl0ZW0uaXNfYXJlYWR5X2pvaW5lZCA/ICdpcy1kaXNhYmxlZCcgOiAnJykgKyAnXCI+JyArXHJcblx0XHRcdFx0XHRcdFx0JzxzcGFuIGNsYXNzPVwic2VsZWN0aXplLWl0ZW1fX25hbWVcIj4nICsgZXNjYXBlKGl0ZW0ubmFtZSkgKyAnPC9zcGFuPicgK1xyXG5cdFx0XHRcdFx0XHRcdChpdGVtLmlzX2FyZWFkeV9qb2luZWQgPyAnPHNwYW4gY2xhc3M9XCJzZWxlY3RpemUtaXRlbV9fZGVzY3JpcHRpb25cIj4oYWxyZWFkeSBqb2luZWQpPC9zcGFuPicgOiAnJykgK1xyXG5cdFx0XHRcdFx0XHQnPC9kaXY+J1xyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0b25Jbml0aWFsaXplOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR2YXIgc2VsZWN0aXplID0gdGhpcztcclxuXHRcdFx0XHRzZWxlY3RpemUuJGNvbnRyb2xfaW5wdXQuYXR0cignYXV0b2NvbXBsZXRlJywgJ3N0LWRpc2FibGVkJyk7XHJcblx0XHRcdFx0c2VsZWN0aXplLnJlZnJlc2hTdGF0ZSgpO1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKHByb2plY3RfaWQpIHtcclxuXHRcdFx0XHR2YXIgc2VsZWN0aXplID0gdGhpcztcclxuXHJcblx0XHRcdFx0aWYgKHByb2plY3RfaWQpIHtcclxuXHRcdFx0XHRcdHNlbGVjdGVkX3Byb2plY3QgPSBzZWxlY3RpemUub3B0aW9uc1twcm9qZWN0X2lkXTtcclxuXHRcdFx0XHRcdCRwcm9qZWN0X21lbWJlcl9yb2xlX2FkbWluaXN0cmF0b3Jfb3B0aW9uLnZhbCgnQ09OVFJBQ1RPUicpO1xyXG5cdFx0XHRcdFx0JHByb2plY3RfbWVtYmVyX3JvbGVfYWRtaW5pc3RyYXRvcl9vcHRpb24udG9nZ2xlQ2xhc3MoJ2Qtbm9uZScsIHNlbGVjdGVkX3Byb2plY3QucGl2b3Qucm9sZSAhPSAnT1dORVInKTtcclxuXHRcdFx0XHRcdCRjb250cmFjdF9ibG9jay50b2dnbGVDbGFzcygnZC1ub25lJywgc2VsZWN0ZWRfcHJvamVjdC5waXZvdC5yb2xlICE9ICdPV05FUicgfHwgc2VsZWN0ZWRfdXNlci5oYXNfYWN0aXZlX2NvbnRyYWN0X3dpdGhfbWUpO1xyXG5cdFx0XHRcdFx0JG1lbWJlcl9zZWN0aW9uLmNvbGxhcHNlKCdzaG93Jyk7XHJcblx0XHRcdFx0XHQkaXNfdGltZV90cmFja2FibGVfY2hlY2tib3gucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG5cdFx0XHRcdFx0JGlzX3RpbWVfdHJhY2thYmxlX2NoZWNrYm94LnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChzZWxlY3RlZF91c2VyLmhhc19hY3RpdmVfY29udHJhY3Rfd2l0aF9tZSkge1xyXG5cdFx0XHRcdFx0XHQkaG91cmx5X3JhdGVfYmxvY2sucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdCRob3VybHlfcmF0ZV9ibG9jay5hZGRDbGFzcygnc2hvdycpO1xyXG5cdFx0XHRcdFx0XHQkaG91cmx5X3JhdGVfaW5wdXQudmFsKHNlbGVjdGVkX3VzZXIuaG91cmx5X3JhdGUgfHwgJycpO1xyXG5cdFx0XHRcdFx0XHQkY29udHJhY3RfdGl0bGVfaW5wdXQudmFsKHNlbGVjdGVkX3VzZXIucHJvZmVzc2lvbmFsX3RpdGxlIHx8ICcnKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZiAoYXV0aC51c2VyLmRlZmF1bHRfY3JlZGl0X2NhcmQpIHtcclxuXHRcdFx0XHRcdFx0JGNyZWRpdF9jYXJkX2Jsb2NrLnJlbW92ZUNsYXNzKCdzaG93Jyk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHQkY3JlZGl0X2NhcmRfYmxvY2suYWRkQ2xhc3MoJ3Nob3cnKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRzZWxlY3RlZF9wcm9qZWN0ID0gbnVsbDtcclxuXHRcdFx0XHQkbWVtYmVyX3NlY3Rpb24uY29sbGFwc2UoJ2hpZGUnKTtcclxuXHRcdFx0fSxcclxuXHRcdH0pO1xyXG5cclxuXHRcdCRtZW1iZXJfc2VjdGlvbi5vbignc2hvd24uYnMuY29sbGFwc2UnLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0JG1lbWJlcl9zZWN0aW9uLmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdLCBpbnB1dFt0eXBlPVwibnVtYmVyXCJdJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRpZiAoISQodGhpcykudmFsKCkgJiYgJCh0aGlzKS5pcygnOnZpc2libGUnKSkge1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5mb2N1cygpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkaXNfdGltZV90cmFja2FibGVfY2hlY2tib3gub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZiAoJGlzX3RpbWVfdHJhY2thYmxlX2NoZWNrYm94LnByb3AoJ2NoZWNrZWQnKSkge1xyXG5cdFx0XHRcdCR3aXRoX3Byb3RlY3Rpb25fdGV4dC5yZW1vdmVDbGFzcygnZC1ub25lJyk7XHJcblx0XHRcdFx0JHdpdGhvdXRfcHJvdGVjdGlvbl90ZXh0LmFkZENsYXNzKCdkLW5vbmUnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkd2l0aF9wcm90ZWN0aW9uX3RleHQuYWRkQ2xhc3MoJ2Qtbm9uZScpO1xyXG5cdFx0XHRcdCR3aXRob3V0X3Byb3RlY3Rpb25fdGV4dC5yZW1vdmVDbGFzcygnZC1ub25lJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICgkaXNfdGltZV90cmFja2FibGVfY2hlY2tib3gucHJvcCgnY2hlY2tlZCcpICYmICFzZWxlY3RlZF91c2VyLmhhc19hY3RpdmVfY29udHJhY3Rfd2l0aF9tZSkge1xyXG5cdFx0XHRcdCRob3VybHlfcmF0ZV9ibG9jay5jb2xsYXBzZSgnc2hvdycpO1xyXG5cdFx0XHRcdCRob3VybHlfcmF0ZV9pbnB1dC5mb2N1cygpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCRob3VybHlfcmF0ZV9ibG9jay5jb2xsYXBzZSgnaGlkZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQoZnVuY3Rpb24gaW5pdGlhbGl6ZV9zdHJpcGVfaW5wdXQoKSB7XHJcbiAgICAgICAgICAgIHZhciBlbGVtZW50cyA9IHN0cmlwZS5lbGVtZW50cygpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHN0eWxlID0ge1xyXG4gICAgICAgICAgICAgICAgYmFzZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnIzMyMzI1ZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbGluZUhlaWdodDogJzE4cHgnLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdcIkhlbHZldGljYSBOZXVlXCIsIEhlbHZldGljYSwgc2Fucy1zZXJpZicsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9udFNtb290aGluZzogJ2FudGlhbGlhc2VkJyxcclxuICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogJzE2cHgnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnOjpwbGFjZWhvbGRlcic6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjYWFiN2M0J1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIGludmFsaWQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyNmYTc1NWEnLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb25Db2xvcjogJyNmYTc1NWEnLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNhcmQgPSBlbGVtZW50cy5jcmVhdGUoJ2NhcmQnLCB7IHN0eWxlOiBzdHlsZSB9KTtcclxuICAgICAgICAgICAgY2FyZC5tb3VudCgkcm9vdC5maW5kKCcuc3RyaXBlLWNhcmQtZWxlbWVudCcpWzBdIHx8IG51bGwpO1xyXG5cclxuICAgICAgICAgICAgY2FyZC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHJvb3QuZmluZCgnLnN0cmlwZS1jYXJkLWVycm9ycycpLnRleHQoZXZlbnQuZXJyb3IubWVzc2FnZSkucmVtb3ZlQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkcm9vdC5maW5kKCcuc3RyaXBlLWNhcmQtZXJyb3JzJykudGV4dCgnJykuYWRkQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KSgpO1xyXG5cclxuICAgICAgICAkcm9vdC5zdWJtaXQoZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdGlmICgkc3VibWl0X2J1dHRvbi5oYXNDbGFzcygnaXMtbG9hZGluZycpKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQkc3VibWl0X2J1dHRvbi5hZGRDbGFzcygnaXMtbG9hZGluZyBkaXNhYmxlZCcpO1xyXG5cclxuXHRcdFx0cmV0dXJuIChmdW5jdGlvbihjYWxsYmFjaykge1xyXG5cdFx0XHRcdGlmICgkY29udHJhY3RfYmxvY2suaGFzQ2xhc3MoJ2Qtbm9uZScpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gY2FsbGJhY2soKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmICghJGhvdXJseV9yYXRlX2Jsb2NrLmhhc0NsYXNzKCdzaG93JykgfHwgISRjcmVkaXRfY2FyZF9ibG9jay5oYXNDbGFzcygnc2hvdycpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gY2FsbGJhY2soKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiBzdHJpcGUuY3JlYXRlVG9rZW4oY2FyZCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuXHRcdFx0XHRcdGlmIChyZXN1bHQuZXJyb3IpIHtcclxuXHRcdFx0XHRcdFx0JHN1Ym1pdF9idXR0b24ucmVtb3ZlQ2xhc3MoJ2lzLWxvYWRpbmcgZGlzYWJsZWQnKTtcclxuXHRcdFx0XHRcdFx0JHJvb3QuZmluZCgnLnN0cmlwZS1jYXJkLWVycm9ycycpLnRleHQocmVzdWx0LmVycm9yLm1lc3NhZ2UpLnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdCRyb290LmZpbmQoJy5zdHJpcGUtY2FyZC1lcnJvcnMnKS5hZGRDbGFzcygnZC1ub25lJyk7XHJcblx0XHRcdFx0XHQkcm9vdC5maW5kKCdbbmFtZT1cInN0cmlwZV90b2tlbl9pZFwiXScpLnZhbChyZXN1bHQudG9rZW4uaWQpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGNhbGxiYWNrKCk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiByZXF1ZXN0KHtcclxuXHRcdFx0XHRcdG1ldGhvZDogJ1BPU1QnLFxyXG5cdFx0XHRcdFx0dXJsOiAnL3VzZXJzL2ludml0ZScsXHJcblx0XHRcdFx0XHRkYXRhOiAkcm9vdC5zZXJpYWxpemUoKSxcclxuXHRcdFx0XHR9LCBmdW5jdGlvbihyZXNwb25zZSkge1xyXG5cdFx0XHRcdFx0JHN1Ym1pdF9idXR0b24ucmVtb3ZlQ2xhc3MoJ2lzLWxvYWRpbmcgZGlzYWJsZWQnKTtcclxuXHJcblx0XHRcdFx0XHRpZiAobmV3IFZhbGlkYXRvcigkcm9vdCwgcmVzcG9uc2UpLmZhaWxzKCkpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmIChyZXNwb25zZS5lcnJvcikge1xyXG5cdFx0XHRcdFx0XHQkLm5vdGlmeShyZXNwb25zZS5lcnJvciwgJ2Vycm9yJyk7XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR2YXIgcHJvamVjdF9tZW1iZXIgPSByZXNwb25zZS5kYXRhLnByb2plY3RfbWVtYmVyIHx8IG51bGw7XHJcblx0XHRcdFx0XHRkZWxldGUgcmVzcG9uc2UuZGF0YS5wcm9qZWN0X21lbWJlcjtcclxuXHJcblx0XHRcdFx0XHRpZiAocHJvamVjdF9tZW1iZXIpIHtcclxuXHRcdFx0XHRcdFx0cHJvamVjdF9tZW1iZXIudXNlciA9IHJlc3BvbnNlLmRhdGE7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0cHJvamVjdF9tZW1iZXIgJiYgZGFzaGJvYXJkLnNlbGVjdGVkX3Byb2plY3QgJiYgKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHR2YXIgcHJvamVjdCA9IGRhc2hib2FyZC5zZWxlY3RlZF9wcm9qZWN0O1xyXG5cclxuXHRcdFx0XHRcdFx0dmFyIGV4aXN0ZW50X3Byb2plY3RfbWVtYmVyID0gcHJvamVjdC5tZW1iZXJzLmZpbHRlcihmdW5jdGlvbihjdXJyZW50X3Byb2plY3RfbWVtYmVyKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGN1cnJlbnRfcHJvamVjdF9tZW1iZXIuaWQgPT0gcHJvamVjdF9tZW1iZXIuaWQ7XHJcblx0XHRcdFx0XHRcdH0pWzBdIHx8IG51bGw7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoIWV4aXN0ZW50X3Byb2plY3RfbWVtYmVyKSB7XHJcblx0XHRcdFx0XHRcdFx0cHJvamVjdC5tZW1iZXJzLnB1c2gocHJvamVjdF9tZW1iZXIpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRwcm9qZWN0LnJlbmRlck1lbWJlcnMoKTtcclxuXHRcdFx0XHRcdH0pKCk7XHJcblxyXG5cdFx0XHRcdFx0JHVzZXJfc2VsZWN0LmRhdGEoJ3NlbGVjdGl6ZScpLmNsZWFyKCk7XHJcblx0XHRcdFx0XHQkdXNlcl9zZWxlY3QuZGF0YSgnc2VsZWN0aXplJykuY2xlYXJPcHRpb25zKCk7XHJcblx0XHRcdFx0XHQkdXNlcl9zZWxlY3QuZGF0YSgnc2VsZWN0aXplJykucmVmcmVzaFN0YXRlKCk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fSkoKTtcclxuXHJcblx0cG9wb3ZlcnMuY3JlYXRlX25ld19wcm9qZWN0KHtcclxuXHRcdHRyaWdnZXI6ICQoJy5uYXZiYXJfX2NyZWF0ZS1uZXctcHJvamVjdC1idXR0b24nKSxcclxuXHR9KTtcclxuXHJcblx0cG9wb3ZlcnMuYWRkX2NvbnRyYWN0KHtcclxuICAgICAgICB0cmlnZ2VyOiAkKCcubmF2YmFyX19hZGQtY29udHJhY3QtYnV0dG9uJyksXHJcbiAgICB9KTtcclxuXHJcblx0JCgnYm9keScpLnJlbW92ZUNsYXNzKCdpcy1sb2FkaW5nJyk7XHJcbn0pO1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xyXG4vL1xyXG4vLyAtIHNlbGVjdGVkIHByb2plY3RcclxuLy9cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xyXG5cclxuaWYgKGRhc2hib2FyZC5zZWxlY3RlZF9wcm9qZWN0KSB7XHJcblx0aWYgKGRhc2hib2FyZC5zZWxlY3RlZF9wcm9qZWN0Lm1lbWJlcnMpIHtcclxuXHRcdGRhc2hib2FyZC5zZWxlY3RlZF9wcm9qZWN0LnJlbmRlck1lbWJlcnMgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyICRzZWxlY3RlZF9wcm9qZWN0X21lbWJlcnMgPSAkKCcuc2VsZWN0ZWQtcHJvamVjdC1tZW1iZXJzJyk7XHJcblx0XHRcdCRzZWxlY3RlZF9wcm9qZWN0X21lbWJlcnMuaHRtbCgnJyk7XHJcblxyXG5cdFx0XHRkYXNoYm9hcmQuc2VsZWN0ZWRfcHJvamVjdC5tZW1iZXJzLnNsaWNlKDAsIDcpLnJldmVyc2UoKS5mb3JFYWNoKGZ1bmN0aW9uKHByb2plY3RfbWVtYmVyKSB7XHJcblx0XHRcdFx0dmFyICRzZWxlY3RlZF9wcm9qZWN0X21lbWJlciA9ICQoZGFzaGJvYXJkLnRlbXBsYXRlKCdzZWxlY3RlZC1wcm9qZWN0LW1lbWJlcicsIHtcclxuXHRcdFx0XHRcdG1lbWJlcjogcHJvamVjdF9tZW1iZXIsXHJcblx0XHRcdFx0fSkpO1xyXG5cclxuXHRcdFx0XHQkc2VsZWN0ZWRfcHJvamVjdF9tZW1iZXIuYXBwZW5kVG8oJHNlbGVjdGVkX3Byb2plY3RfbWVtYmVycyk7XHJcblxyXG5cdFx0XHRcdHBvcG92ZXJzLnByb2plY3RfbWVtYmVyX21lbnUoe1xyXG5cdFx0XHRcdFx0dHJpZ2dlcjogJHNlbGVjdGVkX3Byb2plY3RfbWVtYmVyLFxyXG5cdFx0XHRcdFx0cHJvamVjdF9tZW1iZXI6IHByb2plY3RfbWVtYmVyLFxyXG5cdFx0XHRcdFx0cHJvamVjdDogZGFzaGJvYXJkLnNlbGVjdGVkX3Byb2plY3QsXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0dmFyICRzZWxlY3RlZF9wcm9qZWN0X3Nob3dfbW9yZV9tZW1iZXJzX2J1dHRvbiA9ICQoJy5zZWxlY3RlZC1wcm9qZWN0X19zaG93LW1vcmUtbWVtYmVycy1idXR0b24nKTtcclxuXHRcdFx0JHNlbGVjdGVkX3Byb2plY3Rfc2hvd19tb3JlX21lbWJlcnNfYnV0dG9uLnRleHQoJysnICsgKGRhc2hib2FyZC5zZWxlY3RlZF9wcm9qZWN0Lm1lbWJlcnMubGVuZ3RoIC0gNykpO1xyXG5cdFx0XHQkc2VsZWN0ZWRfcHJvamVjdF9zaG93X21vcmVfbWVtYmVyc19idXR0b24udG9nZ2xlQ2xhc3MoJ2Qtbm9uZScsIGRhc2hib2FyZC5zZWxlY3RlZF9wcm9qZWN0Lm1lbWJlcnMubGVuZ3RoIDw9IDcpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQkKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRkYXNoYm9hcmQuc2VsZWN0ZWRfcHJvamVjdC5yZW5kZXJNZW1iZXJzKCk7XHJcblxyXG5cdFx0XHRwb3BvdmVycy5pbnZpdGVfcHJvamVjdF9tZW1iZXIoe1xyXG5cdFx0XHRcdHRyaWdnZXI6ICQoJy5zZWxlY3RlZC1wcm9qZWN0X19pbnZpdGUtbWVtYmVyLWJ1dHRvbicpLFxyXG5cdFx0XHRcdHByb2plY3Q6IGRhc2hib2FyZC5zZWxlY3RlZF9wcm9qZWN0LFxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHBvcG92ZXJzLnByb2plY3RfbWVtYmVycyh7XHJcblx0XHRcdFx0dHJpZ2dlcjogJCgnLnNlbGVjdGVkLXByb2plY3RfX3Nob3ctbW9yZS1tZW1iZXJzLWJ1dHRvbicpLFxyXG5cdFx0XHRcdHByb2plY3Q6IGRhc2hib2FyZC5zZWxlY3RlZF9wcm9qZWN0LFxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0JChmdW5jdGlvbigpIHtcclxuXHRcdHBvcG92ZXJzLmV4dHJhX3Byb2plY3RfbWVudSh7XHJcblx0XHRcdHRyaWdnZXI6ICQoJy5zZWxlY3RlZC1wcm9qZWN0X19leHRyYS1tZW51LWJ1dHRvbicpLFxyXG5cdFx0XHRwcm9qZWN0OiBkYXNoYm9hcmQuc2VsZWN0ZWRfcHJvamVjdCxcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXHJcbi8vXHJcbi8vIC0gYm9vdHN0cmFwIHRvdXJcclxuLy9cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xyXG5cclxuJChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBpbml0aWFsaXplX3RpcHMoKSB7XHJcbiAgICAgICAgbGV0IHRpcHMgPSB3aW5kb3cudGlwcy5maWx0ZXIoKHRpcCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gJCh0aXAuc2VsZWN0b3IpLmxlbmd0aCA+IDA7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICh0aXBzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaW5pdGlhbGl6ZSA9IChhdmFpbGFibGVfdGlwcywgcmVtYWluaW5nX29ubHkpID0+IHtcclxuICAgICAgICAgICAgbGV0IHJlbGV2YW50X3RpcHMgPSBhdmFpbGFibGVfdGlwcy5maWx0ZXIoKHRpcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlbWFpbmluZ19vbmx5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICF0aXAuaXNfdmlld2VkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZWxldmFudF90aXBzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBQYWdlSW50cm8uaW5pdCh7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXI6ICdib2R5JyxcclxuICAgICAgICAgICAgICAgIHNwYWNpbmc6IDIwLFxyXG5cclxuICAgICAgICAgICAgICAgIGFjdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICBza2lwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IChyZW1haW5pbmdfb25seSA/ICdTa2lwIFRvdXInIDogJ0VuZCBUb3VyJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnYnRuIGJ0bi1kZWZhdWx0IGJ0bi1zbScsXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgbmV4dDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnTmV4dCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnYnRuIGJ0bi1wcmltYXJ5JyxcclxuICAgICAgICAgICAgICAgICAgICB9LCBmaW5pc2g6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0ZpbmlzaCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnYnRuIGJ0bi1wcmltYXJ5JyxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBlbnRyaWVzOiByZWxldmFudF90aXBzLm1hcCgodGlwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6IHRpcC5zZWxlY3RvcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogX18oJ3RpcHMuJyArIHRpcC5rZXkpLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25FeGl0OiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAhdGlwLmlzX3ZpZXdlZCAmJiByZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IGAvdGlwcy8ke3RpcC5pZH0vZ290X2l0YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IocmVzcG9uc2UuZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXAuaXNfdmlld2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgICAgICAgICBvblNraXA6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aXBzLnNvbWUoKHRpcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gIXRpcC5pc192aWV3ZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkgJiYgcmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogYC90aXBzL3NraXBfYWxsYCxcclxuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IocmVzcG9uc2UuZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXBzLmZvckVhY2goKHRpcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGlwLmlzX3ZpZXdlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBQYWdlSW50cm8uc3RhcnQoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyAkKCcubmF2YmFyX190b3VyLWJ1dHRvbicpLnJlbW92ZUNsYXNzKCdkLW5vbmUnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyAgICAgaW5pdGlhbGl6ZSh0aXBzLCBmYWxzZSk7XHJcbiAgICAgICAgLy8gfSk7XHJcblxyXG4gICAgICAgIGluaXRpYWxpemUodGlwcywgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2V0VGltZW91dChpbml0aWFsaXplX3RpcHMsIDApO1xyXG59KTtcclxuXHJcbi8vU3BlbmRpbmdzIGphdmFzY3JpcHRcclxuJChmdW5jdGlvbigpe1xyXG4gICAgJCgnI2RhdGVfcmFuZ2VfZmlsdGVyJykuZGF0ZXJhbmdlcGlja2VyKCk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9