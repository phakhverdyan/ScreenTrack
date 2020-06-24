$(function () {
	$('body').on('click', '.user-profile-slide-out', function () {
        modals.user_profile({ user_id: $(this).data('user-id') });
    });
});

modals.user_profile = function(options) {
	options = options || {};

	if (!options.user_id && !options.user) {
		throw new Error('`user_id` or `user` option required');
	}

	(function(callback) {
		if (options.user) {
			return callback(options.user);
		}

		return request({
			url: '/users/' + options.user_id,
		}, function(response) {
			if (response.error) {
				$.notify(response.error, 'error');
				return;
			}

			return callback(response.data);
		});
	})(function(user) {
		var modal = new Modal({
			position: 'right',

			content: template('user-profile-modal', {
				user: user,
			}),
		});
	});
};