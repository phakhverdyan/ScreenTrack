dashboard.Timeline = function(options) {
	self.$root = $(options.root);
	self.segments = options.segments || null;
	self.format = options.format;
	self.selected_date = new Date(Math.floor(Date.now() / 86400 / 1000) * 86400 * 1000);
	self.user_id = options.user_id;

	self.render = function() {
		var $root = $(template('dashboard-timeline', {
			timeline: self,
		}));

		self.$root.html($root.html()).attr('class', $root.attr('class'));
		self.$date_selected_value = self.$root.find('.timeline-date__selected-value');

		self.$body = self.$root.find('.timeline-body');
		self.renderBody();

		self.$root.find('.timeline-date__previous-button').click(function(event) {
			event.preventDefault();
			self.selected_date.setTime(self.selected_date.getTime() - 86400 * 1000);
			self.$date_selected_value.text(moment(self.selected_date).format('ddd, MMM D, YYYY'));
			self.load();
		});

		self.$root.find('.timeline-date__next-button').click(function(event) {
			event.preventDefault();
			self.selected_date.setTime(self.selected_date.getTime() + 86400 * 1000);
			self.$date_selected_value.text(moment(self.selected_date).format('ddd, MMM D, YYYY'));
			self.load();
        });

        self.$root.on('click', '.timeline-section__screenshot', function (event) {
            event.preventDefault();

            let segment_id = parseInt($(this).parents('.timeline-section').attr('data-id'));

            let segment = self.segments.filter(function (current_segment) {
                return current_segment.id === segment_id;
            })[0] || null;

            modals.timeline_segment({
                segments: self.segments,
                current_segment: segment,
            });
        });
    };

	self.renderBody = function() {
		var hours = self.segments.map(function(current_segment) {
			return new Date(Math.floor((new Date(current_segment.created_at)).getTime() / 60 / 60 / 1000) * 60 * 60 * 1000);
		}).filter(function(hour0_date, hour_date_index, hour_dates) {
			return !hour_dates.slice(0, hour_date_index).some(function(hour1_date) {
				return hour0_date.getTime() == hour1_date.getTime();
			});
		}).reverse().map(function(hour_date) {
			var hour_segments = self.segments.filter(function(current_segment) {
				var segment_created_at = new Date(current_segment.created_at);

				if (segment_created_at.getTime() < hour_date.getTime()) {
					return false;
				}

				if (segment_created_at.getTime() >= hour_date.getTime() + 60 * 60 * 1000) {
					return false;
				}

				return true;
			});

			var total_amount = hour_segments.reduce(function(total_amount, current_segment) {
				return total_amount + current_segment.total_amount;
			}, 0.0);

			var total_minutes = hour_segments.reduce(function(total_minutes, current_segment) {
				return total_minutes + current_segment.count_of_subsegments;
			}, 0);

			var sections = [];

			for (var section_index = 0; section_index < 12; ++section_index) {
				sections.push({
					index: section_index,
					date: new Date(hour_date.getTime() + section_index * 5 * 60 * 1000),

					segment: hour_segments.filter(function(current_segment) {
						return Math.floor((new Date(current_segment.created_at)).getUTCMinutes() / 5) == section_index;
					})[0] || null,
				});
			}

			return {
				date: hour_date,
				total_amount: Math.floor(total_amount * 100.0) / 100.0,
				total_minutes: total_minutes,
				sections: sections,
			};
		});

		self.$body.html(template('dashboard-timeline-body', {
			hours: hours,
		}));
	};

	self.load = function() {
		self.$root.addClass('is-loading');

		return request({
			method: 'POST',
			url: '/users/' + self.user_id + '/tracking_segments',

			data: {
				started_at: self.selected_date.toISOString(),
			},
		}, function(response) {
			self.$root.removeClass('is-loading');

			if (response.error) {
				$.notify(response.error, 'error');
				return;
			}

			self.segments = response.data;
			self.renderBody();
		});
	};

	// ---------------------------------------------------------------------- //

	self.render();
};
