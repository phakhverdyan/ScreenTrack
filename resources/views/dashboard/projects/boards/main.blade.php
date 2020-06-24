@extends('dashboard.layout', [
	'body' => [
		'class' => 'is-board',
	],
])

@push('styles')
	<link rel="stylesheet" href="{{ asset_no_cache('/css/vendor/jquery-ui.min.css') }}">
@endpush

@push('scripts')
	<script src="{{ asset_no_cache('js/vendor/jquery.mousewheel.min.js') }}"></script>
	<script>
		window.dashboard.selected_board = @json($selected_project_board);
	</script>
	<script src="{{ asset_no_cache('/js/dashboard/board.js') }}"></script>
	<script>
		$(function() {
			$('body').css({
				'overflow': 'hidden',
				'max-height': '100%',
			});
		});

		$(function() {
			window.board = new dashboard.Board({
				object: window.dashboard.selected_board,

				create_column: function(data, callback) {
					return request({
						method: 'POST',
						url: '/project_boards/' + dashboard.selected_board.id + '/lists/create',

						data: {
							project_list: {
								name: data.title,
								position: data.position,
							},
						},
					}, function(response) {
						if (response.error) {
							$.notify(response.error, 'error');
							return callback(null);
						}

						return callback({
							id: response.data.id,
							title: response.data.name,
							position: response.data.position,
							object: response.data,
						});
					});
				},

				update_column: function(column, callback) {
					return request({
						method: 'POST',
						url: '/project_lists/' + column.object.id + '/update',

						data: {
							project_list: {
								name: column.title,
								position: column.position,
							},
						},
					}, function(response) {
						if (response.error) {
							$.notify(response.error, 'error');
							return callback && callback(null);
						}

						return callback && callback();
					});
				},

				archive_column: function(column, callback) {
					return request({
						method: 'GET',
						url: '/project_lists/' + column.object.id + '/archive',
					}, function(response) {
						if (response.error) {
							$.notify(response.error, 'error');
							return callback(false);
						}

						return callback(true);
					});
				},

				create_item: function(data, column, callback) {
					return request({
						method: 'POST',
						url: '/project_lists/' + column.object.id + '/tasks/create',

						data: {
							project_task: {
								title: data.title,
								position: data.position,
							},
						},
					}, function(response) {
						if (response.error) {
							$.notify(response.error, 'error');
							return callback(null);
						}

						return callback({
							id: response.data.id,
							title: response.data.title,
							position: response.data.position,
							object: response.data,
						});
					});
				},

				update_item: function(item, column, callback) {
					return request({
						method: 'POST',
						url: '/project_tasks/' + item.object.id + '/update',

						data: {
							project_task: {
								title: item.title,
								position: item.position,
								list_id: column.object.id,
							},
						},
					}, function(response) {
						if (response.error) {
							$.notify(response.error, 'error');
							return callback && callback(null);
						}

						return callback && callback();
					});
				},
			});

			dashboard.selected_board.lists.forEach(function(current_list) {
				var column = board.createColumn({
					id: current_list.id,
					title: current_list.name,
					position: current_list.position,
					object: current_list,
				});

				current_list.tasks.forEach(function(current_task) {
					column.createItem({
						id: current_task.id,
						title: current_task.title,
						position: current_task.position,
						object: current_task,
					});
				});
			});

			board.ready();
		});

		$(function() {
			var update_board_members_scroller = function() {
				var $scroller_line = $('.board-members__scroller-line');
				var $scroller = $('.board-members__scroller');
				var $scroll_buttons = $('.board-members__scroll-buttons');
				var $scroll_left_button = $('.board-members__scroll-left-button');
				var $scroll_right_button = $('.board-members__scroll-right-button');
				var has_space_to_scroll_left = $scroller_line.scrollLeft() > 0;

				var has_space_to_scroll_right = (
					$scroller_line[0].scrollWidth - ($scroller_line.scrollLeft() + Math.round($scroller_line.outerWidth())) > 0
				);

				$scroller.toggleClass('has-left-shadow', has_space_to_scroll_left);
				$scroller.toggleClass('has-right-shadow', has_space_to_scroll_right);
				$scroll_left_button.prop('disabled', !has_space_to_scroll_left);
				$scroll_right_button.prop('disabled', !has_space_to_scroll_right);
				$scroll_buttons.toggleClass('d-none', !has_space_to_scroll_left && !has_space_to_scroll_right);
			};

			dashboard.selected_board.renderMembers = function() {
				var $selected_board_members = $('.board-members__scroller-line');
				$selected_board_members.html('');

				dashboard.selected_board.members.forEach(function(board_member) {
					var $selected_board_member = $(dashboard.template('board-member', {
						member: board_member,
					}));

					$selected_board_member.appendTo($selected_board_members);

					popovers.project_member_menu({
						trigger: $selected_board_member,

						project_member: Object.assign({}, board_member.project_member, {
							user: board_member.user,
						}),

						project: dashboard.selected_project,
						project_board: dashboard.selected_board,
					});
				});

				update_board_members_scroller();
			};

			dashboard.selected_board.renderMembers();

			$(window).resize(function() {
				update_board_members_scroller();
			});

			$('.board-members__scroller-line').each(function() {
				var $scroller_line = $(this);

				$scroller_line.mousewheel(function(event) {
					$scroller_line.scrollLeft($scroller_line.scrollLeft() - event.deltaY * 40);
				});

				$scroller_line.scroll(function() {
					update_board_members_scroller();
				});

				$('.board-members__scroll-left-button').click(function(event) {
					event.preventDefault();

					$scroller_line.animate({
						scrollLeft: $scroller_line.scrollLeft() - $scroller_line.width() / 2,
					}, 250);
				});

				$('.board-members__scroll-right-button').click(function(event) {
					event.preventDefault();

					$scroller_line.animate({
						scrollLeft: $scroller_line.scrollLeft() + $scroller_line.width() / 2,
					}, 250);
				});
			});

			// $('.board__columns').mousewheel(function(event) {
			// 	$(this).scrollLeft($(this).scrollLeft() - event.deltaY * 40);
			// });

			var go_to_board = function(project_board_id) {
				$('.board-list-item.is-active').removeClass('is-active');
				$('.board-list-item[data-id="' + project_board_id + '"]').addClass('is-active');
				$('.board').addClass('is-loading');

				request({
					url: '/project_boards/' + project_board_id,
				}, function(response) {
					$('.board').removeClass('is-loading');

					if (response.error) {
						$.notify(response.error, 'error');
						return;
					}

					board.clear();
					Object.assign(dashboard.selected_board, response.data);

					dashboard.selected_board.lists.forEach(function(current_list) {
						var column = board.createColumn({
							id: current_list.id,
							title: current_list.name,
							position: current_list.position,
							object: current_list,
						});

						current_list.tasks.forEach(function(current_task) {
							column.createItem({
								id: current_task.id,
								title: current_task.title,
								position: current_task.position,
								object: current_task,
							});
						});
					});

					dashboard.selected_board.renderMembers();

					window.history.replaceState({} , document.title, '' +
						'/dashboard/projects/' + dashboard.selected_project.id + '/boards/' + dashboard.selected_board.id +
					'');
				});
			};

			function initialize_board_list_item($root) {
				var $target = $root.find('.board-list-item__target');
				var $title = $root.find('.board-list-item__title');

				$target.click(function(event) {
					event.preventDefault();

					if ([ 'OWNER', 'ADMINISTRATOR' ].indexOf(dashboard.selected_project.pivot.role) < 0) {
						go_to_board(parseInt($root.attr('data-id')));
						return;
					}

					if ($root.hasClass('ui-sortable-helper')) {
						return;
					}

					if (!$root.hasClass('is-active')) {
						!$target.data('single_click_timeout') && $target.data('single_click_timeout', setTimeout(function() {
							$target.removeData('single_click_timeout');
							go_to_board(parseInt($root.attr('data-id')));
						}, 500));

						return;
					}

					$('.board-list__scroller').enableSelection();
					$title.focus();
					document.execCommand('selectAll', false, null);
				});

				$target.dblclick(function() {
					event.preventDefault();

					if ([ 'OWNER', 'ADMINISTRATOR' ].indexOf(dashboard.selected_project.pivot.role) < 0) {
						return;
					}

					clearTimeout($target.data('single_click_timeout'));
					$target.removeData('single_click_timeout');

					if ($root.hasClass('ui-sortable-helper')) {
						return;
					}

					$title.focus();
					$('.board-list__scroller').enableSelection();
					document.execCommand('selectAll', false, null);
				});

				$title.focus(function() {
					$(this).attr('data-original-value', $(this).text());
				});

				$title.blur(function() {
					$(this).scrollLeft(0);

					if ($(this).text() == $(this).attr('data-original-value')) {
						return;
					}

					$('.board-list__scroller').disableSelection();
					$(this).removeAttr('data-original-value');
					var project_board_id = parseInt($root.attr('data-id'));

					request({
						method: 'POST',
						url: '/project_boards/' + project_board_id + '/update',

						data: {
							project_board: {
								name: $(this).text(),
							},
						},
					}, function(response) {
						if (response.error) {
							$.notify(response.error, 'error');
							return;
						}

						var project_board = dashboard.selected_project.boards.filter(function(current_project_board) {
							return current_project_board.id == project_board_id;
						})[0] || null;

						project_board && Object.assign(project_board, response.data);
					});
				});

				$title.keypress(function(event) {
					if (event.which == 13) {
						event.preventDefault();

						if (!$(this).text()) {
							return;
						}

						$(this).blur();
						return;
					}
				});

				$title.keydown(function(event) {
					if (event.key == 'Escape') {
						event.preventDefault();
						$(this).text($(this).attr('data-original-value'));
						$(this).blur();
						return;
					}
				});

				$title.on('input', function(event) {
					update_board_members_scroller();
				});
			}

			$('.board-list__scroller').disableSelection();

			([ 'OWNER', 'ADMINISTRATOR' ].indexOf(dashboard.selected_project.pivot.role) > -1) && $('.board-list__scroller').sortable({
				items: '.board-list-item',
				axis: 'x',
				cursor: 'pointer',
				revert: 200,
				distance: 5,
				// helper: 'clone',
				appendTo: document.body,
				zIndex: 1050,

				update: function(event, ui) {
					var position = parseFloat(ui.item.attr('data-position'));
					var $previous_item = ui.item.prev('.board-list-item');
					var $next_item = ui.item.next('.board-list-item');

					if ($previous_item[0] && $next_item[0]) {
						position = (parseFloat($next_item.attr('data-position')) + parseFloat($previous_item.attr('data-position'))) / 2;
					} else if ($previous_item[0]) {
						position = (parseFloat($previous_item.attr('data-position')) + 65536) / 2;
					} else if ($next_item[0]) {
						position = parseFloat($next_item.attr('data-position')) / 2;
					}

					ui.item.attr('data-position', position);

					request({
						method: 'POST',
						url: '/project_boards/' + ui.item.attr('data-id') + '/update',

						data: {
							project_board: {
								position: position,
							},
						},
					}, function(response) {
						if (response.error) {
							$.notify(response.error, 'error');
							return;
						}
					});
				},
			});

			var update_board_list_scroller = function() {
				var $scroller_line = $('.board-list__scroller-line');
				var $scroller = $('.board-list__scroller');
				var $scroll_buttons = $('.board-list__scroll-buttons');
				var $scroll_left_button = $('.board-list__scroll-left-button');
				var $scroll_right_button = $('.board-list__scroll-right-button');
				var has_space_to_scroll_left = $scroller_line.scrollLeft() > 0;

				var has_space_to_scroll_right = (
					$scroller_line[0].scrollWidth - ($scroller_line.scrollLeft() + Math.round($scroller_line.outerWidth())) > 0
				);

				$scroller.toggleClass('has-left-shadow', has_space_to_scroll_left);
				$scroller.toggleClass('has-right-shadow', has_space_to_scroll_right);
				$scroll_left_button.prop('disabled', !has_space_to_scroll_left);
				$scroll_right_button.prop('disabled', !has_space_to_scroll_right);
				$scroll_buttons.toggleClass('d-none', !has_space_to_scroll_left && !has_space_to_scroll_right);
			};

			$(window).resize(function() {
				update_board_list_scroller();
			});

			dashboard.selected_project.renderBoards = function() {
				var $board_list_scroller_line = $('.board-list__scroller-line');
				var scroll_left = $board_list_scroller_line.scrollLeft();
				$board_list_scroller_line.html('');

				dashboard.selected_project.boards.forEach(function(board) {
					var $board_item = $(dashboard.template('board-list-item', {
						board: board,
					}));

					initialize_board_list_item($board_item);
					$board_item.appendTo($board_list_scroller_line);
				});

				$board_list_scroller_line.scrollLeft(scroll_left);
				update_board_list_scroller();
			};

			dashboard.selected_project.renderBoards();

			$('.board-list__scroller-line').each(function() {
				var $scroller_line = $(this);

				$scroller_line.mousewheel(function(event) {
					$scroller_line.scrollLeft($scroller_line.scrollLeft() - event.deltaY * 40);
				});

				$scroller_line.scroll(function() {
					update_board_list_scroller();
				});

				$('.board-list__scroll-left-button').click(function(event) {
					event.preventDefault();

					$scroller_line.animate({
						scrollLeft: $scroller_line.scrollLeft() - $scroller_line.width() / 2,
					}, 250);
				});

				$('.board-list__scroll-right-button').click(function(event) {
					event.preventDefault();

					$scroller_line.animate({
						scrollLeft: $scroller_line.scrollLeft() + $scroller_line.width() / 2,
					}, 250);
				});
			});

			$('.board-list__new-item-button').click(function(event) {
				event.preventDefault();
				$(this).addClass('d-none');
				$('.board-list__new-item-form').removeClass('d-none');
				$('.board-list__new-item-form input:first').focus();
				update_board_list_scroller();
			});

			$('.board-list__new-item-form').submit(function(event) {
				event.preventDefault();
				$('.board-list__save-button').addClass('is-loading').prop('disabled', true);
				var $last_item = $('.board-list-item:last');
				var position = ($last_item[0] ? parseFloat($last_item.attr('data-position')) + 65536 : 65535);

				request({
					method: 'POST',
					url: '/projects/' + dashboard.selected_project.id + '/boards/create',

					data: {
						project_board: {
							name: $('.board-list__new-item-form input:first').val(),
							position: position,
						},
					},
				}, function(response) {
					$('.board-list__save-button').removeClass('is-loading').prop('disabled', false);

					if (response.error) {
						$.notify(response.error, 'error');
						return;
					}

					dashboard.selected_project.boards.push(response.data);
					dashboard.selected_project.renderBoards();
					$('.board-list__scroller-line').scrollLeft(9999999999999);
					$('.board-list__close-button').click();
				});
			});

			$('.board-list__close-button').click(function(event) {
				event.preventDefault();
				$('.board-list__new-item-button').removeClass('d-none');
				$('.board-list__new-item-form input:first').val('');
				$('.board-list__new-item-form').addClass('d-none');
				update_board_list_scroller();
			});

			(function() {
				var initial_scroll_left = $('.board-list-item.is-active').position().left - $('.board-list__scroller-line').width();
				$('.board-list__scroller-line').scrollLeft(initial_scroll_left);
			})();

			popovers.project_boards({
				trigger: $('.board-list__list-button'),
				project: dashboard.selected_project,
			});

			popovers.project_board_members({
				trigger: $('.board-members__list-button'),
				project: dashboard.selected_project,
				project_board: dashboard.selected_board,
			});

			popovers.project_board_menu({
				trigger: $('.board-header__menu-button'),
				project: dashboard.selected_project,
				project_board: dashboard.selected_board,
			});

			popovers.manage_project_board_members({
				trigger: $('.board-members__new-item-button'),
				project: dashboard.selected_project,
				project_board: dashboard.selected_board,

				// board_updated: function(options) {
				// 	self.object.members = options.project_task_members;
				// 	// board.object.members = options.project_members; // ?
				// 	self.renderMembers();
				// },
			});
		});
	</script>
@endpush

@section('content')
	{{--
		<section class="container py-5">
			<div class="row">
				<div class="col-md-12">
					<h3>{{ __('dashboard/project_tasks.tasks') }}</h3>
				</div>
			</div>
		</section>
	--}}
	<div class="[ board-wrapper ]" style="height: 100%;">
		<div class="[ board ] d-none">
			<div class="[ board-header ]">
				<div class="[ board-members ]">
					<button class="[ board-members__list-button ] btn" title="All Board Members">
						<img src="{{ asset_no_cache('img/user-list.svg') }}" style="width: 20px;" alt="">
					</button>
					<div class="board-members__scroller">
						<div class="board-members__scroller-line"></div>
					</div>
					<div class="[ board-members__scroll-buttons ]">
						<button class="[ board-members__scroll-left-button ] btn" title="Scroll left">&lsaquo;</button>
						<button class="[ board-members__scroll-right-button ] btn" title="Scroll right">&rsaquo;</button>
					</div>
					@if (auth()->user()->canAddMemberToProjectBoard($selected_project_board))
						<button class="[ board-members__new-item-button ] btn">+</button>
					@endif
				</div>
				@if (auth()->user()->canArchiveProjectBoard($selected_project_board))
					<button class="[ board-header__menu-button ] btn"></button>
				@endif
			</div>
			<div class="[ board__columns ]">
				<form class="[ board-column-wrapper ] + is-add-form">
					<div class="[ board__add-column-form ]">
						<textarea class="[ board__add-column-form__input ]" placeholder="{{ __('dashboard/project_tasks.enter_list_name') }}"></textarea>
						<button type="submit" class="[ board__add-column-form__add-button ] btn btn-primary">{{ __('dashboard/project_tasks.add_list') }}</button>
					</div>
				</form>
			</div>
		</div>
		<div class="[ board-list ]">
			<div class="[ board-list__wrapper ]">
				<button class="[ board-list__list-button ] btn" title="All Boards">
					<img src="{{ asset_no_cache('img/boards.svg') }}" style="width: 20px;" alt="">
				</button>
				<div class="[ board-list__scroller ]">
					<div class="[ board-list__scroller-line ]"></div>
				</div>
				<div class="[ board-list__scroll-buttons ]">
					<button class="[ board-list__scroll-left-button ] btn" title="Scroll left">&lsaquo;</button>
					<button class="[ board-list__scroll-right-button ] btn" title="Scroll right">&rsaquo;</button>
				</div>
				@if (auth()->user()->canAddBoardToProject($selected_project))
					<button class="[ board-list__new-item-button ] btn">+</button>
					<form class="[ board-list__new-item-form ] d-none">
						<input type="text" class="form-control" placeholder="{{ __('dashboard/project_boards.enter_board_name') }}">
						<button class="[ board-list__save-button ] btn btn-primary">{{ __('dashboard/project_boards.add_board') }}</button>
						<button type="button" class="[ board-list__close-button ] btn">×</button>
					</form>
				@endif
			</div>
		</div>
	</div>
@endsection

@popover('manage_project_task_members')
@popover('manage_project_board_members')
@popover('project_boards')
@popover('project_board_members')
@popover('project_board_menu')

@ejs_template('dashboard.board_column')
@ejs_template('dashboard.board_item')
@ejs_template('dashboard.board_item_badges')
@ejs_template('dashboard.board_item_member')
@ejs_template('dashboard.board_member')
@ejs_template('dashboard.board_list_item')
