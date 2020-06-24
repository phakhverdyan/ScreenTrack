window.realtime = function(url) {
	realtime = io(url);

	realtime.is_authorized = false;
	realtime.authorized_listeners = [];

	realtime.authorized = function(callback) {
		realtime.authorized_listeners.push(callback);
		realtime.is_authorized && callback();
	};

	// ---------------------------------------------------------------------- //

	realtime.updateObservableUsers = function() {
		var user_ids = [];

		user_ids = user_ids.concat($('[data-connection-status-for-user-id]').toArray().map(function(element) {
			return parseInt($(element).attr('data-connection-status-for-user-id'));
		}).filter(function(user_id) {
			return parseInt(user_id) === user_id;
		}));

		user_ids = user_ids.filter(function(user_id, user_id_index, user_ids) {
			return user_ids.indexOf(user_id) === user_id_index;
		});

		console.log('[realtime]', 'observable_user_ids', user_ids);
		realtime.emit('observable_user_ids', user_ids);
	};

	// ---------------------------------------------------------------------- //

	realtime.on('connect', function() {
		console.log('[realtime]', '[connected]');
		auth.user && realtime.emit('authorize', auth.user.api_token);

		realtime.observable_users_interval = setInterval(function() {
			realtime.updateObservableUsers();
		}, 5000);
	});

	realtime.on('authorize', function() {
		console.log('[realtime]', '[authorized]');
		realtime.is_authorized = true;
		
		realtime.authorized_listeners.forEach(function(callback) {
			callback();
		});
	});

	// ---------------------------------------------------------------------- //

	realtime.on('user_is_online', function(user) {
		console.log('user_is_online', user.id);
		$('[data-connection-status-for-user-id="' + user.id + '"]').addClass('is-online');
	});

	realtime.on('user_is_offline', function(user) {
		console.log('user_is_offline', user.id);
		$('[data-connection-status-for-user-id="' + user.id + '"]').removeClass('is-online');
	});

	// ---------------------------------------------------------------------- //

	realtime.on('disconnect', function() {
		console.log('[realtime]', '[disconnect]');
		realtime.is_authorized = false;
		clearInterval(realtime.observable_users_interval);
	});
};