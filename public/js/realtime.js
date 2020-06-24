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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/realtime.js":
/*!**********************************!*\
  !*** ./resources/js/realtime.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

window.realtime = function (url) {
  realtime = io(url);
  realtime.is_authorized = false;
  realtime.authorized_listeners = [];

  realtime.authorized = function (callback) {
    realtime.authorized_listeners.push(callback);
    realtime.is_authorized && callback();
  }; // ---------------------------------------------------------------------- //


  realtime.updateObservableUsers = function () {
    var user_ids = [];
    user_ids = user_ids.concat($('[data-connection-status-for-user-id]').toArray().map(function (element) {
      return parseInt($(element).attr('data-connection-status-for-user-id'));
    }).filter(function (user_id) {
      return parseInt(user_id) === user_id;
    }));
    user_ids = user_ids.filter(function (user_id, user_id_index, user_ids) {
      return user_ids.indexOf(user_id) === user_id_index;
    });
    console.log('[realtime]', 'observable_user_ids', user_ids);
    realtime.emit('observable_user_ids', user_ids);
  }; // ---------------------------------------------------------------------- //


  realtime.on('connect', function () {
    console.log('[realtime]', '[connected]');
    auth.user && realtime.emit('authorize', auth.user.api_token);
    realtime.observable_users_interval = setInterval(function () {
      realtime.updateObservableUsers();
    }, 5000);
  });
  realtime.on('authorize', function () {
    console.log('[realtime]', '[authorized]');
    realtime.is_authorized = true;
    realtime.authorized_listeners.forEach(function (callback) {
      callback();
    });
  }); // ---------------------------------------------------------------------- //

  realtime.on('user_is_online', function (user) {
    console.log('user_is_online', user.id);
    $('[data-connection-status-for-user-id="' + user.id + '"]').addClass('is-online');
  });
  realtime.on('user_is_offline', function (user) {
    console.log('user_is_offline', user.id);
    $('[data-connection-status-for-user-id="' + user.id + '"]').removeClass('is-online');
  }); // ---------------------------------------------------------------------- //

  realtime.on('disconnect', function () {
    console.log('[realtime]', '[disconnect]');
    realtime.is_authorized = false;
    clearInterval(realtime.observable_users_interval);
  });
};

/***/ }),

/***/ 1:
/*!****************************************!*\
  !*** multi ./resources/js/realtime.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\js\realtime.js */"./resources/js/realtime.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL3JlYWx0aW1lLmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsInJlYWx0aW1lIiwidXJsIiwiaW8iLCJpc19hdXRob3JpemVkIiwiYXV0aG9yaXplZF9saXN0ZW5lcnMiLCJhdXRob3JpemVkIiwiY2FsbGJhY2siLCJwdXNoIiwidXBkYXRlT2JzZXJ2YWJsZVVzZXJzIiwidXNlcl9pZHMiLCJjb25jYXQiLCIkIiwidG9BcnJheSIsIm1hcCIsImVsZW1lbnQiLCJwYXJzZUludCIsImF0dHIiLCJmaWx0ZXIiLCJ1c2VyX2lkIiwidXNlcl9pZF9pbmRleCIsImluZGV4T2YiLCJjb25zb2xlIiwibG9nIiwiZW1pdCIsIm9uIiwiYXV0aCIsInVzZXIiLCJhcGlfdG9rZW4iLCJvYnNlcnZhYmxlX3VzZXJzX2ludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJmb3JFYWNoIiwiaWQiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwiY2xlYXJJbnRlcnZhbCJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBQSxNQUFNLENBQUNDLFFBQVAsR0FBa0IsVUFBU0MsR0FBVCxFQUFjO0FBQy9CRCxVQUFRLEdBQUdFLEVBQUUsQ0FBQ0QsR0FBRCxDQUFiO0FBRUFELFVBQVEsQ0FBQ0csYUFBVCxHQUF5QixLQUF6QjtBQUNBSCxVQUFRLENBQUNJLG9CQUFULEdBQWdDLEVBQWhDOztBQUVBSixVQUFRLENBQUNLLFVBQVQsR0FBc0IsVUFBU0MsUUFBVCxFQUFtQjtBQUN4Q04sWUFBUSxDQUFDSSxvQkFBVCxDQUE4QkcsSUFBOUIsQ0FBbUNELFFBQW5DO0FBQ0FOLFlBQVEsQ0FBQ0csYUFBVCxJQUEwQkcsUUFBUSxFQUFsQztBQUNBLEdBSEQsQ0FOK0IsQ0FXL0I7OztBQUVBTixVQUFRLENBQUNRLHFCQUFULEdBQWlDLFlBQVc7QUFDM0MsUUFBSUMsUUFBUSxHQUFHLEVBQWY7QUFFQUEsWUFBUSxHQUFHQSxRQUFRLENBQUNDLE1BQVQsQ0FBZ0JDLENBQUMsQ0FBQyxzQ0FBRCxDQUFELENBQTBDQyxPQUExQyxHQUFvREMsR0FBcEQsQ0FBd0QsVUFBU0MsT0FBVCxFQUFrQjtBQUNwRyxhQUFPQyxRQUFRLENBQUNKLENBQUMsQ0FBQ0csT0FBRCxDQUFELENBQVdFLElBQVgsQ0FBZ0Isb0NBQWhCLENBQUQsQ0FBZjtBQUNBLEtBRjBCLEVBRXhCQyxNQUZ3QixDQUVqQixVQUFTQyxPQUFULEVBQWtCO0FBQzNCLGFBQU9ILFFBQVEsQ0FBQ0csT0FBRCxDQUFSLEtBQXNCQSxPQUE3QjtBQUNBLEtBSjBCLENBQWhCLENBQVg7QUFNQVQsWUFBUSxHQUFHQSxRQUFRLENBQUNRLE1BQVQsQ0FBZ0IsVUFBU0MsT0FBVCxFQUFrQkMsYUFBbEIsRUFBaUNWLFFBQWpDLEVBQTJDO0FBQ3JFLGFBQU9BLFFBQVEsQ0FBQ1csT0FBVCxDQUFpQkYsT0FBakIsTUFBOEJDLGFBQXJDO0FBQ0EsS0FGVSxDQUFYO0FBSUFFLFdBQU8sQ0FBQ0MsR0FBUixDQUFZLFlBQVosRUFBMEIscUJBQTFCLEVBQWlEYixRQUFqRDtBQUNBVCxZQUFRLENBQUN1QixJQUFULENBQWMscUJBQWQsRUFBcUNkLFFBQXJDO0FBQ0EsR0FmRCxDQWIrQixDQThCL0I7OztBQUVBVCxVQUFRLENBQUN3QixFQUFULENBQVksU0FBWixFQUF1QixZQUFXO0FBQ2pDSCxXQUFPLENBQUNDLEdBQVIsQ0FBWSxZQUFaLEVBQTBCLGFBQTFCO0FBQ0FHLFFBQUksQ0FBQ0MsSUFBTCxJQUFhMUIsUUFBUSxDQUFDdUIsSUFBVCxDQUFjLFdBQWQsRUFBMkJFLElBQUksQ0FBQ0MsSUFBTCxDQUFVQyxTQUFyQyxDQUFiO0FBRUEzQixZQUFRLENBQUM0Qix5QkFBVCxHQUFxQ0MsV0FBVyxDQUFDLFlBQVc7QUFDM0Q3QixjQUFRLENBQUNRLHFCQUFUO0FBQ0EsS0FGK0MsRUFFN0MsSUFGNkMsQ0FBaEQ7QUFHQSxHQVBEO0FBU0FSLFVBQVEsQ0FBQ3dCLEVBQVQsQ0FBWSxXQUFaLEVBQXlCLFlBQVc7QUFDbkNILFdBQU8sQ0FBQ0MsR0FBUixDQUFZLFlBQVosRUFBMEIsY0FBMUI7QUFDQXRCLFlBQVEsQ0FBQ0csYUFBVCxHQUF5QixJQUF6QjtBQUVBSCxZQUFRLENBQUNJLG9CQUFULENBQThCMEIsT0FBOUIsQ0FBc0MsVUFBU3hCLFFBQVQsRUFBbUI7QUFDeERBLGNBQVE7QUFDUixLQUZEO0FBR0EsR0FQRCxFQXpDK0IsQ0FrRC9COztBQUVBTixVQUFRLENBQUN3QixFQUFULENBQVksZ0JBQVosRUFBOEIsVUFBU0UsSUFBVCxFQUFlO0FBQzVDTCxXQUFPLENBQUNDLEdBQVIsQ0FBWSxnQkFBWixFQUE4QkksSUFBSSxDQUFDSyxFQUFuQztBQUNBcEIsS0FBQyxDQUFDLDBDQUEwQ2UsSUFBSSxDQUFDSyxFQUEvQyxHQUFvRCxJQUFyRCxDQUFELENBQTREQyxRQUE1RCxDQUFxRSxXQUFyRTtBQUNBLEdBSEQ7QUFLQWhDLFVBQVEsQ0FBQ3dCLEVBQVQsQ0FBWSxpQkFBWixFQUErQixVQUFTRSxJQUFULEVBQWU7QUFDN0NMLFdBQU8sQ0FBQ0MsR0FBUixDQUFZLGlCQUFaLEVBQStCSSxJQUFJLENBQUNLLEVBQXBDO0FBQ0FwQixLQUFDLENBQUMsMENBQTBDZSxJQUFJLENBQUNLLEVBQS9DLEdBQW9ELElBQXJELENBQUQsQ0FBNERFLFdBQTVELENBQXdFLFdBQXhFO0FBQ0EsR0FIRCxFQXpEK0IsQ0E4RC9COztBQUVBakMsVUFBUSxDQUFDd0IsRUFBVCxDQUFZLFlBQVosRUFBMEIsWUFBVztBQUNwQ0gsV0FBTyxDQUFDQyxHQUFSLENBQVksWUFBWixFQUEwQixjQUExQjtBQUNBdEIsWUFBUSxDQUFDRyxhQUFULEdBQXlCLEtBQXpCO0FBQ0ErQixpQkFBYSxDQUFDbEMsUUFBUSxDQUFDNEIseUJBQVYsQ0FBYjtBQUNBLEdBSkQ7QUFLQSxDQXJFRCxDIiwiZmlsZSI6Ii9qcy9yZWFsdGltZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG4iLCJ3aW5kb3cucmVhbHRpbWUgPSBmdW5jdGlvbih1cmwpIHtcclxuXHRyZWFsdGltZSA9IGlvKHVybCk7XHJcblxyXG5cdHJlYWx0aW1lLmlzX2F1dGhvcml6ZWQgPSBmYWxzZTtcclxuXHRyZWFsdGltZS5hdXRob3JpemVkX2xpc3RlbmVycyA9IFtdO1xyXG5cclxuXHRyZWFsdGltZS5hdXRob3JpemVkID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuXHRcdHJlYWx0aW1lLmF1dGhvcml6ZWRfbGlzdGVuZXJzLnB1c2goY2FsbGJhY2spO1xyXG5cdFx0cmVhbHRpbWUuaXNfYXV0aG9yaXplZCAmJiBjYWxsYmFjaygpO1xyXG5cdH07XHJcblxyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cclxuXHJcblx0cmVhbHRpbWUudXBkYXRlT2JzZXJ2YWJsZVVzZXJzID0gZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgdXNlcl9pZHMgPSBbXTtcclxuXHJcblx0XHR1c2VyX2lkcyA9IHVzZXJfaWRzLmNvbmNhdCgkKCdbZGF0YS1jb25uZWN0aW9uLXN0YXR1cy1mb3ItdXNlci1pZF0nKS50b0FycmF5KCkubWFwKGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuXHRcdFx0cmV0dXJuIHBhcnNlSW50KCQoZWxlbWVudCkuYXR0cignZGF0YS1jb25uZWN0aW9uLXN0YXR1cy1mb3ItdXNlci1pZCcpKTtcclxuXHRcdH0pLmZpbHRlcihmdW5jdGlvbih1c2VyX2lkKSB7XHJcblx0XHRcdHJldHVybiBwYXJzZUludCh1c2VyX2lkKSA9PT0gdXNlcl9pZDtcclxuXHRcdH0pKTtcclxuXHJcblx0XHR1c2VyX2lkcyA9IHVzZXJfaWRzLmZpbHRlcihmdW5jdGlvbih1c2VyX2lkLCB1c2VyX2lkX2luZGV4LCB1c2VyX2lkcykge1xyXG5cdFx0XHRyZXR1cm4gdXNlcl9pZHMuaW5kZXhPZih1c2VyX2lkKSA9PT0gdXNlcl9pZF9pbmRleDtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGNvbnNvbGUubG9nKCdbcmVhbHRpbWVdJywgJ29ic2VydmFibGVfdXNlcl9pZHMnLCB1c2VyX2lkcyk7XHJcblx0XHRyZWFsdGltZS5lbWl0KCdvYnNlcnZhYmxlX3VzZXJfaWRzJywgdXNlcl9pZHMpO1xyXG5cdH07XHJcblxyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cclxuXHJcblx0cmVhbHRpbWUub24oJ2Nvbm5lY3QnLCBmdW5jdGlvbigpIHtcclxuXHRcdGNvbnNvbGUubG9nKCdbcmVhbHRpbWVdJywgJ1tjb25uZWN0ZWRdJyk7XHJcblx0XHRhdXRoLnVzZXIgJiYgcmVhbHRpbWUuZW1pdCgnYXV0aG9yaXplJywgYXV0aC51c2VyLmFwaV90b2tlbik7XHJcblxyXG5cdFx0cmVhbHRpbWUub2JzZXJ2YWJsZV91c2Vyc19pbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZWFsdGltZS51cGRhdGVPYnNlcnZhYmxlVXNlcnMoKTtcclxuXHRcdH0sIDUwMDApO1xyXG5cdH0pO1xyXG5cclxuXHRyZWFsdGltZS5vbignYXV0aG9yaXplJywgZnVuY3Rpb24oKSB7XHJcblx0XHRjb25zb2xlLmxvZygnW3JlYWx0aW1lXScsICdbYXV0aG9yaXplZF0nKTtcclxuXHRcdHJlYWx0aW1lLmlzX2F1dGhvcml6ZWQgPSB0cnVlO1xyXG5cdFx0XHJcblx0XHRyZWFsdGltZS5hdXRob3JpemVkX2xpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcblx0XHRcdGNhbGxiYWNrKCk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xyXG5cclxuXHRyZWFsdGltZS5vbigndXNlcl9pc19vbmxpbmUnLCBmdW5jdGlvbih1c2VyKSB7XHJcblx0XHRjb25zb2xlLmxvZygndXNlcl9pc19vbmxpbmUnLCB1c2VyLmlkKTtcclxuXHRcdCQoJ1tkYXRhLWNvbm5lY3Rpb24tc3RhdHVzLWZvci11c2VyLWlkPVwiJyArIHVzZXIuaWQgKyAnXCJdJykuYWRkQ2xhc3MoJ2lzLW9ubGluZScpO1xyXG5cdH0pO1xyXG5cclxuXHRyZWFsdGltZS5vbigndXNlcl9pc19vZmZsaW5lJywgZnVuY3Rpb24odXNlcikge1xyXG5cdFx0Y29uc29sZS5sb2coJ3VzZXJfaXNfb2ZmbGluZScsIHVzZXIuaWQpO1xyXG5cdFx0JCgnW2RhdGEtY29ubmVjdGlvbi1zdGF0dXMtZm9yLXVzZXItaWQ9XCInICsgdXNlci5pZCArICdcIl0nKS5yZW1vdmVDbGFzcygnaXMtb25saW5lJyk7XHJcblx0fSk7XHJcblxyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cclxuXHJcblx0cmVhbHRpbWUub24oJ2Rpc2Nvbm5lY3QnLCBmdW5jdGlvbigpIHtcclxuXHRcdGNvbnNvbGUubG9nKCdbcmVhbHRpbWVdJywgJ1tkaXNjb25uZWN0XScpO1xyXG5cdFx0cmVhbHRpbWUuaXNfYXV0aG9yaXplZCA9IGZhbHNlO1xyXG5cdFx0Y2xlYXJJbnRlcnZhbChyZWFsdGltZS5vYnNlcnZhYmxlX3VzZXJzX2ludGVydmFsKTtcclxuXHR9KTtcclxufTsiXSwic291cmNlUm9vdCI6IiJ9