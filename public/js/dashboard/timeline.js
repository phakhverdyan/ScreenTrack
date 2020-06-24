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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/dashboard/timeline.js":
/*!********************************************!*\
  !*** ./resources/js/dashboard/timeline.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

dashboard.Timeline = function (options) {
  self.$root = $(options.root);
  self.segments = options.segments || null;
  self.format = options.format;
  self.selected_date = new Date(Math.floor(Date.now() / 86400 / 1000) * 86400 * 1000);
  self.user_id = options.user_id;

  self.render = function () {
    var $root = $(template('dashboard-timeline', {
      timeline: self
    }));
    self.$root.html($root.html()).attr('class', $root.attr('class'));
    self.$date_selected_value = self.$root.find('.timeline-date__selected-value');
    self.$body = self.$root.find('.timeline-body');
    self.renderBody();
    self.$root.find('.timeline-date__previous-button').click(function (event) {
      event.preventDefault();
      self.selected_date.setTime(self.selected_date.getTime() - 86400 * 1000);
      self.$date_selected_value.text(moment(self.selected_date).format('ddd, MMM D, YYYY'));
      self.load();
    });
    self.$root.find('.timeline-date__next-button').click(function (event) {
      event.preventDefault();
      self.selected_date.setTime(self.selected_date.getTime() + 86400 * 1000);
      self.$date_selected_value.text(moment(self.selected_date).format('ddd, MMM D, YYYY'));
      self.load();
    });
    self.$root.on('click', '.timeline-section__screenshot', function (event) {
      event.preventDefault();
      var segment_id = parseInt($(this).parents('.timeline-section').attr('data-id'));
      var segment = self.segments.filter(function (current_segment) {
        return current_segment.id === segment_id;
      })[0] || null;
      modals.timeline_segment({
        segments: self.segments,
        current_segment: segment
      });
    });
  };

  self.renderBody = function () {
    var hours = self.segments.map(function (current_segment) {
      return new Date(Math.floor(new Date(current_segment.created_at).getTime() / 60 / 60 / 1000) * 60 * 60 * 1000);
    }).filter(function (hour0_date, hour_date_index, hour_dates) {
      return !hour_dates.slice(0, hour_date_index).some(function (hour1_date) {
        return hour0_date.getTime() == hour1_date.getTime();
      });
    }).reverse().map(function (hour_date) {
      var hour_segments = self.segments.filter(function (current_segment) {
        var segment_created_at = new Date(current_segment.created_at);

        if (segment_created_at.getTime() < hour_date.getTime()) {
          return false;
        }

        if (segment_created_at.getTime() >= hour_date.getTime() + 60 * 60 * 1000) {
          return false;
        }

        return true;
      });
      var total_amount = hour_segments.reduce(function (total_amount, current_segment) {
        return total_amount + current_segment.total_amount;
      }, 0.0);
      var total_minutes = hour_segments.reduce(function (total_minutes, current_segment) {
        return total_minutes + current_segment.count_of_subsegments;
      }, 0);
      var sections = [];

      for (var section_index = 0; section_index < 12; ++section_index) {
        sections.push({
          index: section_index,
          date: new Date(hour_date.getTime() + section_index * 5 * 60 * 1000),
          segment: hour_segments.filter(function (current_segment) {
            return Math.floor(new Date(current_segment.created_at).getUTCMinutes() / 5) == section_index;
          })[0] || null
        });
      }

      return {
        date: hour_date,
        total_amount: Math.floor(total_amount * 100.0) / 100.0,
        total_minutes: total_minutes,
        sections: sections
      };
    });
    self.$body.html(template('dashboard-timeline-body', {
      hours: hours
    }));
  };

  self.load = function () {
    self.$root.addClass('is-loading');
    return request({
      method: 'POST',
      url: '/users/' + self.user_id + '/tracking_segments',
      data: {
        started_at: self.selected_date.toISOString()
      }
    }, function (response) {
      self.$root.removeClass('is-loading');

      if (response.error) {
        $.notify(response.error, 'error');
        return;
      }

      self.segments = response.data;
      self.renderBody();
    });
  }; // ---------------------------------------------------------------------- //


  self.render();
};

/***/ }),

/***/ 7:
/*!**************************************************!*\
  !*** multi ./resources/js/dashboard/timeline.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\xamppPHP7.3\htdocs\st\resources\js\dashboard\timeline.js */"./resources/js/dashboard/timeline.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2Rhc2hib2FyZC90aW1lbGluZS5qcyJdLCJuYW1lcyI6WyJkYXNoYm9hcmQiLCJUaW1lbGluZSIsIm9wdGlvbnMiLCJzZWxmIiwiJHJvb3QiLCIkIiwicm9vdCIsInNlZ21lbnRzIiwiZm9ybWF0Iiwic2VsZWN0ZWRfZGF0ZSIsIkRhdGUiLCJNYXRoIiwiZmxvb3IiLCJub3ciLCJ1c2VyX2lkIiwicmVuZGVyIiwidGVtcGxhdGUiLCJ0aW1lbGluZSIsImh0bWwiLCJhdHRyIiwiJGRhdGVfc2VsZWN0ZWRfdmFsdWUiLCJmaW5kIiwiJGJvZHkiLCJyZW5kZXJCb2R5IiwiY2xpY2siLCJldmVudCIsInByZXZlbnREZWZhdWx0Iiwic2V0VGltZSIsImdldFRpbWUiLCJ0ZXh0IiwibW9tZW50IiwibG9hZCIsIm9uIiwic2VnbWVudF9pZCIsInBhcnNlSW50IiwicGFyZW50cyIsInNlZ21lbnQiLCJmaWx0ZXIiLCJjdXJyZW50X3NlZ21lbnQiLCJpZCIsIm1vZGFscyIsInRpbWVsaW5lX3NlZ21lbnQiLCJob3VycyIsIm1hcCIsImNyZWF0ZWRfYXQiLCJob3VyMF9kYXRlIiwiaG91cl9kYXRlX2luZGV4IiwiaG91cl9kYXRlcyIsInNsaWNlIiwic29tZSIsImhvdXIxX2RhdGUiLCJyZXZlcnNlIiwiaG91cl9kYXRlIiwiaG91cl9zZWdtZW50cyIsInNlZ21lbnRfY3JlYXRlZF9hdCIsInRvdGFsX2Ftb3VudCIsInJlZHVjZSIsInRvdGFsX21pbnV0ZXMiLCJjb3VudF9vZl9zdWJzZWdtZW50cyIsInNlY3Rpb25zIiwic2VjdGlvbl9pbmRleCIsInB1c2giLCJpbmRleCIsImRhdGUiLCJnZXRVVENNaW51dGVzIiwiYWRkQ2xhc3MiLCJyZXF1ZXN0IiwibWV0aG9kIiwidXJsIiwiZGF0YSIsInN0YXJ0ZWRfYXQiLCJ0b0lTT1N0cmluZyIsInJlc3BvbnNlIiwicmVt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MEIsV0FBSyxFQUFFQTtBQUQ0QyxLQUE1QixDQUF4QjtBQUdBLEdBdEREOztBQXdEQXZDLE1BQUksQ0FBQzRCLElBQUwsR0FBWSxZQUFXO0FBQ3RCNUIsUUFBSSxDQUFDQyxLQUFMLENBQVc2RCxRQUFYLENBQW9CLFlBQXBCO0FBRUEsV0FBT0MsT0FBTyxDQUFDO0FBQ2RDLFlBQU0sRUFBRSxNQURNO0FBRWRDLFNBQUcsRUFBRSxZQUFZakUsSUFBSSxDQUFDVyxPQUFqQixHQUEyQixvQkFGbEI7QUFJZHVELFVBQUksRUFBRTtBQUNMQyxrQkFBVSxFQUFFbkUsSUFBSSxDQUFDTSxhQUFMLENBQW1COEQsV0FBbkI7QUFEUDtBQUpRLEtBQUQsRUFPWCxVQUFTQyxRQUFULEVBQW1CO0FBQ3JCckUsVUFBSSxDQUFDQyxLQUFMLENBQVdxRSxXQUFYLENBQXVCLFlBQXZCOztBQUVBLFVBQUlELFFBQVEsQ0FBQ0UsS0FBYixFQUFvQjtBQUNuQnJFLFNBQUMsQ0FBQ3NFLE1BQUYsQ0FBU0gsUUFBUSxDQUFDRSxLQUFsQixFQUF5QixPQUF6QjtBQUNBO0FBQ0E7O0FBRUR2RSxVQUFJLENBQUNJLFFBQUwsR0FBZ0JpRSxRQUFRLENBQUNILElBQXpCO0FBQ0FsRSxVQUFJLENBQUNvQixVQUFMO0FBQ0EsS0FqQmEsQ0FBZDtBQWtCQSxHQXJCRCxDQXhHc0MsQ0ErSHRDOzs7QUFFQXBCLE1BQUksQ0FBQ1ksTUFBTDtBQUNBLENBbElELEMiLCJmaWxlIjoiL2pzL2Rhc2hib2FyZC90aW1lbGluZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNyk7XG4iLCJkYXNoYm9hcmQuVGltZWxpbmUgPSBmdW5jdGlvbihvcHRpb25zKSB7XHJcblx0c2VsZi4kcm9vdCA9ICQob3B0aW9ucy5yb290KTtcclxuXHRzZWxmLnNlZ21lbnRzID0gb3B0aW9ucy5zZWdtZW50cyB8fCBudWxsO1xyXG5cdHNlbGYuZm9ybWF0ID0gb3B0aW9ucy5mb3JtYXQ7XHJcblx0c2VsZi5zZWxlY3RlZF9kYXRlID0gbmV3IERhdGUoTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gODY0MDAgLyAxMDAwKSAqIDg2NDAwICogMTAwMCk7XHJcblx0c2VsZi51c2VyX2lkID0gb3B0aW9ucy51c2VyX2lkO1xyXG5cclxuXHRzZWxmLnJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyICRyb290ID0gJCh0ZW1wbGF0ZSgnZGFzaGJvYXJkLXRpbWVsaW5lJywge1xyXG5cdFx0XHR0aW1lbGluZTogc2VsZixcclxuXHRcdH0pKTtcclxuXHJcblx0XHRzZWxmLiRyb290Lmh0bWwoJHJvb3QuaHRtbCgpKS5hdHRyKCdjbGFzcycsICRyb290LmF0dHIoJ2NsYXNzJykpO1xyXG5cdFx0c2VsZi4kZGF0ZV9zZWxlY3RlZF92YWx1ZSA9IHNlbGYuJHJvb3QuZmluZCgnLnRpbWVsaW5lLWRhdGVfX3NlbGVjdGVkLXZhbHVlJyk7XHJcblxyXG5cdFx0c2VsZi4kYm9keSA9IHNlbGYuJHJvb3QuZmluZCgnLnRpbWVsaW5lLWJvZHknKTtcclxuXHRcdHNlbGYucmVuZGVyQm9keSgpO1xyXG5cclxuXHRcdHNlbGYuJHJvb3QuZmluZCgnLnRpbWVsaW5lLWRhdGVfX3ByZXZpb3VzLWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHNlbGYuc2VsZWN0ZWRfZGF0ZS5zZXRUaW1lKHNlbGYuc2VsZWN0ZWRfZGF0ZS5nZXRUaW1lKCkgLSA4NjQwMCAqIDEwMDApO1xyXG5cdFx0XHRzZWxmLiRkYXRlX3NlbGVjdGVkX3ZhbHVlLnRleHQobW9tZW50KHNlbGYuc2VsZWN0ZWRfZGF0ZSkuZm9ybWF0KCdkZGQsIE1NTSBELCBZWVlZJykpO1xyXG5cdFx0XHRzZWxmLmxvYWQoKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHNlbGYuJHJvb3QuZmluZCgnLnRpbWVsaW5lLWRhdGVfX25leHQtYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0c2VsZi5zZWxlY3RlZF9kYXRlLnNldFRpbWUoc2VsZi5zZWxlY3RlZF9kYXRlLmdldFRpbWUoKSArIDg2NDAwICogMTAwMCk7XHJcblx0XHRcdHNlbGYuJGRhdGVfc2VsZWN0ZWRfdmFsdWUudGV4dChtb21lbnQoc2VsZi5zZWxlY3RlZF9kYXRlKS5mb3JtYXQoJ2RkZCwgTU1NIEQsIFlZWVknKSk7XHJcblx0XHRcdHNlbGYubG9hZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBzZWxmLiRyb290Lm9uKCdjbGljaycsICcudGltZWxpbmUtc2VjdGlvbl9fc2NyZWVuc2hvdCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHNlZ21lbnRfaWQgPSBwYXJzZUludCgkKHRoaXMpLnBhcmVudHMoJy50aW1lbGluZS1zZWN0aW9uJykuYXR0cignZGF0YS1pZCcpKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzZWdtZW50ID0gc2VsZi5zZWdtZW50cy5maWx0ZXIoZnVuY3Rpb24gKGN1cnJlbnRfc2VnbWVudCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRfc2VnbWVudC5pZCA9PT0gc2VnbWVudF9pZDtcclxuICAgICAgICAgICAgfSlbMF0gfHwgbnVsbDtcclxuXHJcbiAgICAgICAgICAgIG1vZGFscy50aW1lbGluZV9zZWdtZW50KHtcclxuICAgICAgICAgICAgICAgIHNlZ21lbnRzOiBzZWxmLnNlZ21lbnRzLFxyXG4gICAgICAgICAgICAgICAgY3VycmVudF9zZWdtZW50OiBzZWdtZW50LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG5cdHNlbGYucmVuZGVyQm9keSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIGhvdXJzID0gc2VsZi5zZWdtZW50cy5tYXAoZnVuY3Rpb24oY3VycmVudF9zZWdtZW50KSB7XHJcblx0XHRcdHJldHVybiBuZXcgRGF0ZShNYXRoLmZsb29yKChuZXcgRGF0ZShjdXJyZW50X3NlZ21lbnQuY3JlYXRlZF9hdCkpLmdldFRpbWUoKSAvIDYwIC8gNjAgLyAxMDAwKSAqIDYwICogNjAgKiAxMDAwKTtcclxuXHRcdH0pLmZpbHRlcihmdW5jdGlvbihob3VyMF9kYXRlLCBob3VyX2RhdGVfaW5kZXgsIGhvdXJfZGF0ZXMpIHtcclxuXHRcdFx0cmV0dXJuICFob3VyX2RhdGVzLnNsaWNlKDAsIGhvdXJfZGF0ZV9pbmRleCkuc29tZShmdW5jdGlvbihob3VyMV9kYXRlKSB7XHJcblx0XHRcdFx0cmV0dXJuIGhvdXIwX2RhdGUuZ2V0VGltZSgpID09IGhvdXIxX2RhdGUuZ2V0VGltZSgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pLnJldmVyc2UoKS5tYXAoZnVuY3Rpb24oaG91cl9kYXRlKSB7XHJcblx0XHRcdHZhciBob3VyX3NlZ21lbnRzID0gc2VsZi5zZWdtZW50cy5maWx0ZXIoZnVuY3Rpb24oY3VycmVudF9zZWdtZW50KSB7XHJcblx0XHRcdFx0dmFyIHNlZ21lbnRfY3JlYXRlZF9hdCA9IG5ldyBEYXRlKGN1cnJlbnRfc2VnbWVudC5jcmVhdGVkX2F0KTtcclxuXHJcblx0XHRcdFx0aWYgKHNlZ21lbnRfY3JlYXRlZF9hdC5nZXRUaW1lKCkgPCBob3VyX2RhdGUuZ2V0VGltZSgpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoc2VnbWVudF9jcmVhdGVkX2F0LmdldFRpbWUoKSA+PSBob3VyX2RhdGUuZ2V0VGltZSgpICsgNjAgKiA2MCAqIDEwMDApIHtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHZhciB0b3RhbF9hbW91bnQgPSBob3VyX3NlZ21lbnRzLnJlZHVjZShmdW5jdGlvbih0b3RhbF9hbW91bnQsIGN1cnJlbnRfc2VnbWVudCkge1xyXG5cdFx0XHRcdHJldHVybiB0b3RhbF9hbW91bnQgKyBjdXJyZW50X3NlZ21lbnQudG90YWxfYW1vdW50O1xyXG5cdFx0XHR9LCAwLjApO1xyXG5cclxuXHRcdFx0dmFyIHRvdGFsX21pbnV0ZXMgPSBob3VyX3NlZ21lbnRzLnJlZHVjZShmdW5jdGlvbih0b3RhbF9taW51dGVzLCBjdXJyZW50X3NlZ21lbnQpIHtcclxuXHRcdFx0XHRyZXR1cm4gdG90YWxfbWludXRlcyArIGN1cnJlbnRfc2VnbWVudC5jb3VudF9vZl9zdWJzZWdtZW50cztcclxuXHRcdFx0fSwgMCk7XHJcblxyXG5cdFx0XHR2YXIgc2VjdGlvbnMgPSBbXTtcclxuXHJcblx0XHRcdGZvciAodmFyIHNlY3Rpb25faW5kZXggPSAwOyBzZWN0aW9uX2luZGV4IDwgMTI7ICsrc2VjdGlvbl9pbmRleCkge1xyXG5cdFx0XHRcdHNlY3Rpb25zLnB1c2goe1xyXG5cdFx0XHRcdFx0aW5kZXg6IHNlY3Rpb25faW5kZXgsXHJcblx0XHRcdFx0XHRkYXRlOiBuZXcgRGF0ZShob3VyX2RhdGUuZ2V0VGltZSgpICsgc2VjdGlvbl9pbmRleCAqIDUgKiA2MCAqIDEwMDApLFxyXG5cclxuXHRcdFx0XHRcdHNlZ21lbnQ6IGhvdXJfc2VnbWVudHMuZmlsdGVyKGZ1bmN0aW9uKGN1cnJlbnRfc2VnbWVudCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gTWF0aC5mbG9vcigobmV3IERhdGUoY3VycmVudF9zZWdtZW50LmNyZWF0ZWRfYXQpKS5nZXRVVENNaW51dGVzKCkgLyA1KSA9PSBzZWN0aW9uX2luZGV4O1xyXG5cdFx0XHRcdFx0fSlbMF0gfHwgbnVsbCxcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRkYXRlOiBob3VyX2RhdGUsXHJcblx0XHRcdFx0dG90YWxfYW1vdW50OiBNYXRoLmZsb29yKHRvdGFsX2Ftb3VudCAqIDEwMC4wKSAvIDEwMC4wLFxyXG5cdFx0XHRcdHRvdGFsX21pbnV0ZXM6IHRvdGFsX21pbnV0ZXMsXHJcblx0XHRcdFx0c2VjdGlvbnM6IHNlY3Rpb25zLFxyXG5cdFx0XHR9O1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0c2VsZi4kYm9keS5odG1sKHRlbXBsYXRlKCdkYXNoYm9hcmQtdGltZWxpbmUtYm9keScsIHtcclxuXHRcdFx0aG91cnM6IGhvdXJzLFxyXG5cdFx0fSkpO1xyXG5cdH07XHJcblxyXG5cdHNlbGYubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0c2VsZi4kcm9vdC5hZGRDbGFzcygnaXMtbG9hZGluZycpO1xyXG5cclxuXHRcdHJldHVybiByZXF1ZXN0KHtcclxuXHRcdFx0bWV0aG9kOiAnUE9TVCcsXHJcblx0XHRcdHVybDogJy91c2Vycy8nICsgc2VsZi51c2VyX2lkICsgJy90cmFja2luZ19zZWdtZW50cycsXHJcblxyXG5cdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0c3RhcnRlZF9hdDogc2VsZi5zZWxlY3RlZF9kYXRlLnRvSVNPU3RyaW5nKCksXHJcblx0XHRcdH0sXHJcblx0XHR9LCBmdW5jdGlvbihyZXNwb25zZSkge1xyXG5cdFx0XHRzZWxmLiRyb290LnJlbW92ZUNsYXNzKCdpcy1sb2FkaW5nJyk7XHJcblxyXG5cdFx0XHRpZiAocmVzcG9uc2UuZXJyb3IpIHtcclxuXHRcdFx0XHQkLm5vdGlmeShyZXNwb25zZS5lcnJvciwgJ2Vycm9yJyk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzZWxmLnNlZ21lbnRzID0gcmVzcG9uc2UuZGF0YTtcclxuXHRcdFx0c2VsZi5yZW5kZXJCb2R5KCk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXHJcblxyXG5cdHNlbGYucmVuZGVyKCk7XHJcbn07XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=