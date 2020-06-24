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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/slideups/user_profile.slideup.js":
/*!*******************************************************!*\
  !*** ./resources/js/slideups/user_profile.slideup.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

slideups.user_profile = function (options) {
  slideups.close();
  options = options || {};
  options.default_tab = options.default_tab || 'profile';
  var slideup = new Slideup({
    content: template('user-profile-slideup', {
      user: null,
      id: 0
    })
  });
  return function (callback) {
    if (options.user) {
      return callback(options.user);
    }

    if (options.user_id) {
      return request({
        url: '/users/' + options.user_id
      }, function (response) {
        if (response.error) {
          $.notify(response.error, 'error');
          return;
        }

        return callback(response.data);
      });
    }

    throw new Error('`user_id` or `user` parameter is required');
  }(function (user) {
    slideup.$element.html($(template('user-profile-slideup', {
      id: slideup.id,
      user: user
    })).html()); // ---------------------------------------------------------------------- //

    var message_panel = new dashboard.messenger.MessagePanel({
      object: user.direct_chat,
      root: slideup.$element.find('.message-panel'),
      create: function create(options, callback) {
        return request({
          method: 'POST',
          url: '/users/' + user.id + '/message',
          data: {
            chat_message: {
              text: options.text,
              label: options.label
            }
          }
        }, callback);
      }
    }); // ---------------------------------------------------------------------- //

    var timeline = dashboard.Timeline({
      root: slideup.$element.find('.timeline'),
      format: 'day',
      segments: user.tracking_segments,
      user_id: user.id
    }); // ---------------------------------------------------------------------- //

    slideup.$element.find('.slideup__open-new-contract-button').click(function (event) {
      event.preventDefault();
      modals.contract({
        employee_user: user,
        contract_created: function contract_created(new_contract) {
          if (user.contracts[0]) {
            user.contracts[0].closed_at = new_contract.created_at;
            user.contracts[0].render();
          }

          user.contracts.splice(0, 0, new_contract);
          initialize_contract(new_contract).prependTo('.user-profile-contracts__body');
          slideup.$element.find('.user-profile-no-contracts').addClass('d-none');
          slideup.$element.find('.user-profile-contracts').removeClass('d-none');
        }
      });
    });

    var initialize_contract = function initialize_contract(contract) {
      var $contract = $(template('slideups-user-profile-slideup-contract-item', {
        contract: contract
      })).data('contract', contract);

      contract.render = function () {
        var $root = $(template('slideups-user-profile-slideup-contract-item', {
          contract: contract
        }));
        $contract.html($root.html()).attr($root.html());
      };

      $contract.on('click', '.user-profile-contract-item__actions .btn.is-change', function (event) {
        event.preventDefault();
        modals.contract({
          contract: contract,
          contract_created: function contract_created(new_contract) {
            if (user.contracts[0]) {
              user.contracts[0].closed_at = new_contract.created_at;
              user.contracts[0].render();
            }

            user.contracts.splice(0, 0, new_contract);
            initialize_contract(new_contract).prependTo('.user-profile-contracts__body');
          }
        });
      });
      $contract.on('click', '.user-profile-contract-item__actions .btn.is-close', function (event) {
        event.preventDefault();
        modals.close_contract({
          contract: contract
        });
      });
      return $contract;
    };

    user.contracts.forEach(function (contract) {
      initialize_contract(contract).appendTo('.user-profile-contracts__body');
    });
    slideup.$element.find('.slideup-profile__affiliate-modes .badge').click(function (event) {
      event.preventDefault();
      var $this = $(this);
      request({
        method: 'POST',
        url: '/users/' + user.id + '/update',
        data: {
          user: {
            affiliate_mode: $this.attr('data-value')
          }
        }
      }, function (response) {
        if (response.error) {
          $.notify(response.error, 'error');
          return;
        }

        slideup.$element.find('.slideup-profile__affiliate-modes .badge').removeClass('badge-warning').addClass('badge-secondary');
        $this.removeClass('badge-secondary').addClass('badge-warning');
        $.notify('Saved!', 'success');
      });
    }); // ---------------------------------------------------------------------- //

    (function () {
      console.log('#user-profile-' + slideup.id + '__' + options.default_tab + '-tab');
      var $tab_link = slideup.$element.find('#user-profile-' + slideup.id + '__' + options.default_tab + '-tab');
      var $tab = slideup.$element.find('#user-profile-' + slideup.id + '__' + options.default_tab);

      if ($tab_link.length > 0) {
        slideup.$element.find('.nav-tabs .nav-link').removeClass('active');
        slideup.$element.find('.tab-content .tab-pane').removeClass('active show');
        $tab_link.addClass('active');
        $tab.addClass('active show');
      }
    })();

    (function (on_shown) {
      if (slideup.is_shown) {
        return on_shown();
      }

      slideup.on_shown = on_shown;
    })(function () {
      message_panel.focus();
    });
  });
};

/***/ }),

/***/ 11:
/*!*************************************************************!*\
  !*** multi ./resources/js/slideups/user_profile.slideup.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\js\slideups\user_profile.slideup.js */"./resources/js/slideups/user_profile.slideup.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL3NsaWRldXBzL3VzZXJfcHJvZmlsZS5zbGlkZXVwLmpzIl0sIm5hbWVzIjpbInNsaWRldXBzIiwidXNlcl9wcm9maWxlIiwib3B0aW9ucyIsImNsb3NlIiwiZGVmYXVsdF90YWIiLCJzbGlkZXVwIiwiU2xpZGV1cCIsImNvbnRlbnQiLCJ0ZW1wbGF0ZSIsInVzZXIiLCJpZCIsImNhbGxiYWNrIiwidXNlcl9pZCIsInJlcXVlc3QiLCJ1cmwiLCJyZXNwb25zZSIsImVycm9yIiwiJCIsIm5vdGlmeSIsImRhdGEiLCJFcnJvciIsIiRlbGVtZW50IiwiaHRtbCIsIm1lc3NhZ2VfcGFuZWwiLCJkYXNoYm9hcmQiLCJtZXNzZW5nZXIiLCJNZXNzYWdlUGFuZWwiLCJvYmplY3QiLCJkaXJlY3RfY2hhdCIsInJvb3QiLCJmaW5kIiwiY3JlYXRlIiwibWV0aG9kIiwiY2hhdF9tZXNzYWdlIiwidGV4dCIsImxhYmVsIiwidGltZWxpbmUiLCJUaW1lbGluZSIsImZvcm1hdCIsInNlZ21lbnRzIiwidHJhY2tpbmdfc2VnbWVudHMiLCJjbGljayIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJtb2RhbHMiLCJjb250cmFjdCIsImVtcGxveWVlX3VzZXIiLCJjb250cmFjdF9jcmVhdGVkIiwibmV3X2NvbnRyYWN0IiwiY29udHJhY3RzIiwiY2xvc2VkX2F0IiwiY3JlYXRlZF9hdCIsInJlbmRlciIsInNwbGljZSIsImluaXRpYWxpemVfY29udHJhY3QiLCJwcmVwZW5kVG8iLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwiJGNvbnRyYWN0IiwiJHJvb3QiLCJhdHRyIiwib24iLCJjbG9zZV9jb250cmFjdCIsImZvckVhY2giLCJhcHBlbmRUbyIsIiR0aGlzIiwiYWZmaWxpYXRlX21vZGUiLCJjb25zb2xlIiwibG9nIiwiJHRhYl9saW5rIiwiJHRhYiIsImxlbmd0aCIsIm9u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QixRQUFSLENBQWlCUyxJQUFqQixDQUFzQix3QkFBdEIsRUFBZ0QyQixXQUFoRCxDQUE0RCxhQUE1RDtBQUNBWSxpQkFBUyxDQUFDYixRQUFWLENBQW1CLFFBQW5CO0FBQ0FjLFlBQUksQ0FBQ2QsUUFBTCxDQUFjLGFBQWQ7QUFDQTtBQUNELEtBWEQ7O0FBYUEsS0FBQyxVQUFTZ0IsUUFBVCxFQUFtQjtBQUNuQixVQUFJbkUsT0FBTyxDQUFDb0UsUUFBWixFQUFzQjtBQUNyQixlQUFPRCxRQUFRLEVBQWY7QUFDQTs7QUFFRG5FLGFBQU8sQ0FBQ21FLFFBQVIsR0FBbUJBLFFBQW5CO0FBQ0EsS0FORCxFQU1HLFlBQVc7QUFDYmpELG1CQUFhLENBQUNtRCxLQUFkO0FBQ0EsS0FSRDtBQVNBLEdBNUtNLENBQVA7QUE2S0EsQ0F6TEQsQyIsImZpbGUiOiIvanMvc2xpZGV1cHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDExKTtcbiIsInNsaWRldXBzLnVzZXJfcHJvZmlsZSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuXHRzbGlkZXVwcy5jbG9zZSgpO1xyXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cdG9wdGlvbnMuZGVmYXVsdF90YWIgPSBvcHRpb25zLmRlZmF1bHRfdGFiIHx8ICdwcm9maWxlJztcclxuXHJcblx0dmFyIHNsaWRldXAgPSBuZXcgU2xpZGV1cCh7XHJcblx0XHRjb250ZW50OiB0ZW1wbGF0ZSgndXNlci1wcm9maWxlLXNsaWRldXAnLCB7XHJcblx0XHRcdHVzZXI6IG51bGwsXHJcblx0XHRcdGlkOiAwLFxyXG5cdFx0fSksXHJcblx0fSk7XHJcblxyXG5cdHJldHVybiAoZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuXHRcdGlmIChvcHRpb25zLnVzZXIpIHtcclxuXHRcdFx0cmV0dXJuIGNhbGxiYWNrKG9wdGlvbnMudXNlcik7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG9wdGlvbnMudXNlcl9pZCkge1xyXG5cdFx0XHRyZXR1cm4gcmVxdWVzdCh7XHJcblx0XHRcdFx0dXJsOiAnL3VzZXJzLycgKyBvcHRpb25zLnVzZXJfaWQsXHJcblx0XHRcdH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcblx0XHRcdFx0aWYgKHJlc3BvbnNlLmVycm9yKSB7XHJcblx0XHRcdFx0XHQkLm5vdGlmeShyZXNwb25zZS5lcnJvciwgJ2Vycm9yJyk7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm4gY2FsbGJhY2socmVzcG9uc2UuZGF0YSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRocm93IG5ldyBFcnJvcignYHVzZXJfaWRgIG9yIGB1c2VyYCBwYXJhbWV0ZXIgaXMgcmVxdWlyZWQnKTtcclxuXHR9KShmdW5jdGlvbih1c2VyKSB7XHJcblx0XHRzbGlkZXVwLiRlbGVtZW50Lmh0bWwoJCh0ZW1wbGF0ZSgndXNlci1wcm9maWxlLXNsaWRldXAnLCB7XHJcblx0XHRcdGlkOiBzbGlkZXVwLmlkLFxyXG5cdFx0XHR1c2VyOiB1c2VyLFxyXG5cdFx0fSkpLmh0bWwoKSk7XHJcblxyXG5cdFx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xyXG5cclxuXHRcdHZhciBtZXNzYWdlX3BhbmVsID0gbmV3IGRhc2hib2FyZC5tZXNzZW5nZXIuTWVzc2FnZVBhbmVsKHtcclxuXHRcdFx0b2JqZWN0OiB1c2VyLmRpcmVjdF9jaGF0LFxyXG5cdFx0XHRyb290OiBzbGlkZXVwLiRlbGVtZW50LmZpbmQoJy5tZXNzYWdlLXBhbmVsJyksXHJcblxyXG5cdFx0XHRjcmVhdGU6IGZ1bmN0aW9uKG9wdGlvbnMsIGNhbGxiYWNrKSB7XHJcblx0XHRcdFx0cmV0dXJuIHJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0bWV0aG9kOiAnUE9TVCcsXHJcblx0XHRcdFx0XHR1cmw6ICcvdXNlcnMvJyArIHVzZXIuaWQgKyAnL21lc3NhZ2UnLFxyXG5cclxuXHRcdFx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHRcdFx0Y2hhdF9tZXNzYWdlOiB7XHJcblx0XHRcdFx0XHRcdFx0dGV4dDogb3B0aW9ucy50ZXh0LFxyXG5cdFx0XHRcdFx0XHRcdGxhYmVsOiBvcHRpb25zLmxhYmVsLFxyXG5cdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHR9LCBjYWxsYmFjayk7XHJcblx0XHRcdH0sXHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXHJcblxyXG5cdFx0dmFyIHRpbWVsaW5lID0gZGFzaGJvYXJkLlRpbWVsaW5lKHtcclxuXHRcdFx0cm9vdDogc2xpZGV1cC4kZWxlbWVudC5maW5kKCcudGltZWxpbmUnKSxcclxuXHRcdFx0Zm9ybWF0OiAnZGF5JyxcclxuXHRcdFx0c2VnbWVudHM6IHVzZXIudHJhY2tpbmdfc2VnbWVudHMsXHJcblx0XHRcdHVzZXJfaWQ6IHVzZXIuaWQsXHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXHJcblxyXG5cdFx0c2xpZGV1cC4kZWxlbWVudC5maW5kKCcuc2xpZGV1cF9fb3Blbi1uZXctY29udHJhY3QtYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdG1vZGFscy5jb250cmFjdCh7XHJcblx0XHRcdFx0ZW1wbG95ZWVfdXNlcjogdXNlcixcclxuXHJcblx0XHRcdFx0Y29udHJhY3RfY3JlYXRlZDogZnVuY3Rpb24obmV3X2NvbnRyYWN0KSB7XHJcblx0XHRcdFx0XHRpZiAodXNlci5jb250cmFjdHNbMF0pIHtcclxuXHRcdFx0XHRcdFx0dXNlci5jb250cmFjdHNbMF0uY2xvc2VkX2F0ID0gbmV3X2NvbnRyYWN0LmNyZWF0ZWRfYXQ7XHJcblx0XHRcdFx0XHRcdHVzZXIuY29udHJhY3RzWzBdLnJlbmRlcigpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHVzZXIuY29udHJhY3RzLnNwbGljZSgwLCAwLCBuZXdfY29udHJhY3QpO1xyXG5cdFx0XHRcdFx0aW5pdGlhbGl6ZV9jb250cmFjdChuZXdfY29udHJhY3QpLnByZXBlbmRUbygnLnVzZXItcHJvZmlsZS1jb250cmFjdHNfX2JvZHknKTtcclxuXHRcdFx0XHRcdHNsaWRldXAuJGVsZW1lbnQuZmluZCgnLnVzZXItcHJvZmlsZS1uby1jb250cmFjdHMnKS5hZGRDbGFzcygnZC1ub25lJyk7XHJcblx0XHRcdFx0XHRzbGlkZXVwLiRlbGVtZW50LmZpbmQoJy51c2VyLXByb2ZpbGUtY29udHJhY3RzJykucmVtb3ZlQ2xhc3MoJ2Qtbm9uZScpO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0dmFyIGluaXRpYWxpemVfY29udHJhY3QgPSBmdW5jdGlvbihjb250cmFjdCkge1xyXG5cdFx0XHR2YXIgJGNvbnRyYWN0ID0gJCh0ZW1wbGF0ZSgnc2xpZGV1cHMtdXNlci1wcm9maWxlLXNsaWRldXAtY29udHJhY3QtaXRlbScsIHtcclxuXHRcdFx0XHRjb250cmFjdDogY29udHJhY3QsXHJcblx0XHRcdH0pKS5kYXRhKCdjb250cmFjdCcsIGNvbnRyYWN0KTtcclxuXHJcblx0XHRcdGNvbnRyYWN0LnJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHZhciAkcm9vdCA9ICQodGVtcGxhdGUoJ3NsaWRldXBzLXVzZXItcHJvZmlsZS1zbGlkZXVwLWNvbnRyYWN0LWl0ZW0nLCB7XHJcblx0XHRcdFx0XHRjb250cmFjdDogY29udHJhY3QsXHJcblx0XHRcdFx0fSkpO1xyXG5cclxuXHRcdFx0XHQkY29udHJhY3QuaHRtbCgkcm9vdC5odG1sKCkpLmF0dHIoJHJvb3QuaHRtbCgpKTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdCRjb250cmFjdC5vbignY2xpY2snLCAnLnVzZXItcHJvZmlsZS1jb250cmFjdC1pdGVtX19hY3Rpb25zIC5idG4uaXMtY2hhbmdlJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0XHRtb2RhbHMuY29udHJhY3Qoe1xyXG5cdFx0XHRcdFx0Y29udHJhY3Q6IGNvbnRyYWN0LFxyXG5cclxuXHRcdFx0XHRcdGNvbnRyYWN0X2NyZWF0ZWQ6IGZ1bmN0aW9uKG5ld19jb250cmFjdCkge1xyXG5cdFx0XHRcdFx0XHRpZiAodXNlci5jb250cmFjdHNbMF0pIHtcclxuXHRcdFx0XHRcdFx0XHR1c2VyLmNvbnRyYWN0c1swXS5jbG9zZWRfYXQgPSBuZXdfY29udHJhY3QuY3JlYXRlZF9hdDtcclxuXHRcdFx0XHRcdFx0XHR1c2VyLmNvbnRyYWN0c1swXS5yZW5kZXIoKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0dXNlci5jb250cmFjdHMuc3BsaWNlKDAsIDAsIG5ld19jb250cmFjdCk7XHJcblx0XHRcdFx0XHRcdGluaXRpYWxpemVfY29udHJhY3QobmV3X2NvbnRyYWN0KS5wcmVwZW5kVG8oJy51c2VyLXByb2ZpbGUtY29udHJhY3RzX19ib2R5Jyk7XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdCRjb250cmFjdC5vbignY2xpY2snLCAnLnVzZXItcHJvZmlsZS1jb250cmFjdC1pdGVtX19hY3Rpb25zIC5idG4uaXMtY2xvc2UnLCBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRcdG1vZGFscy5jbG9zZV9jb250cmFjdCh7XHJcblx0XHRcdFx0XHRjb250cmFjdDogY29udHJhY3QsXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0cmV0dXJuICRjb250cmFjdDtcclxuXHRcdH07XHJcblxyXG5cdFx0dXNlci5jb250cmFjdHMuZm9yRWFjaChmdW5jdGlvbihjb250cmFjdCkge1xyXG5cdFx0XHRpbml0aWFsaXplX2NvbnRyYWN0KGNvbnRyYWN0KS5hcHBlbmRUbygnLnVzZXItcHJvZmlsZS1jb250cmFjdHNfX2JvZHknKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHNsaWRldXAuJGVsZW1lbnQuZmluZCgnLnNsaWRldXAtcHJvZmlsZV9fYWZmaWxpYXRlLW1vZGVzIC5iYWRnZScpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyk7XHJcblxyXG5cdFx0XHRyZXF1ZXN0KHtcclxuXHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcclxuXHRcdFx0XHR1cmw6ICcvdXNlcnMvJyArIHVzZXIuaWQgKyAnL3VwZGF0ZScsXHJcblxyXG5cdFx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHRcdHVzZXI6IHtcclxuXHRcdFx0XHRcdFx0YWZmaWxpYXRlX21vZGU6ICR0aGlzLmF0dHIoJ2RhdGEtdmFsdWUnKSxcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuXHRcdFx0XHRpZiAocmVzcG9uc2UuZXJyb3IpIHtcclxuXHRcdFx0XHRcdCQubm90aWZ5KHJlc3BvbnNlLmVycm9yLCAnZXJyb3InKTtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHNsaWRldXAuJGVsZW1lbnQuZmluZCgnLnNsaWRldXAtcHJvZmlsZV9fYWZmaWxpYXRlLW1vZGVzIC5iYWRnZScpLnJlbW92ZUNsYXNzKCdiYWRnZS13YXJuaW5nJykuYWRkQ2xhc3MoJ2JhZGdlLXNlY29uZGFyeScpO1xyXG5cdFx0XHRcdCR0aGlzLnJlbW92ZUNsYXNzKCdiYWRnZS1zZWNvbmRhcnknKS5hZGRDbGFzcygnYmFkZ2Utd2FybmluZycpO1xyXG5cdFx0XHRcdCQubm90aWZ5KCdTYXZlZCEnLCAnc3VjY2VzcycpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cclxuXHJcblx0XHQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKCcjdXNlci1wcm9maWxlLScgKyBzbGlkZXVwLmlkICsgJ19fJyArIG9wdGlvbnMuZGVmYXVsdF90YWIgKyAnLXRhYicpO1xyXG5cdFx0XHR2YXIgJHRhYl9saW5rID0gc2xpZGV1cC4kZWxlbWVudC5maW5kKCcjdXNlci1wcm9maWxlLScgKyBzbGlkZXVwLmlkICsgJ19fJyArIG9wdGlvbnMuZGVmYXVsdF90YWIgKyAnLXRhYicpO1xyXG5cdFx0XHR2YXIgJHRhYiA9IHNsaWRldXAuJGVsZW1lbnQuZmluZCgnI3VzZXItcHJvZmlsZS0nICsgc2xpZGV1cC5pZCArICdfXycgKyBvcHRpb25zLmRlZmF1bHRfdGFiKTtcclxuXHJcblx0XHRcdGlmICgkdGFiX2xpbmsubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdHNsaWRldXAuJGVsZW1lbnQuZmluZCgnLm5hdi10YWJzIC5uYXYtbGluaycpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0XHRzbGlkZXVwLiRlbGVtZW50LmZpbmQoJy50YWItY29udGVudCAudGFiLXBhbmUnKS5yZW1vdmVDbGFzcygnYWN0aXZlIHNob3cnKTtcclxuXHRcdFx0XHQkdGFiX2xpbmsuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdCR0YWIuYWRkQ2xhc3MoJ2FjdGl2ZSBzaG93Jyk7XHJcblx0XHRcdH1cclxuXHRcdH0pKCk7XHJcblxyXG5cdFx0KGZ1bmN0aW9uKG9uX3Nob3duKSB7XHJcblx0XHRcdGlmIChzbGlkZXVwLmlzX3Nob3duKSB7XHJcblx0XHRcdFx0cmV0dXJuIG9uX3Nob3duKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHNsaWRldXAub25fc2hvd24gPSBvbl9zaG93bjtcclxuXHRcdH0pKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRtZXNzYWdlX3BhbmVsLmZvY3VzKCk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxufTsiXSwic291cmNlUm9vdCI6IiJ9