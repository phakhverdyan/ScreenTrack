modals.timeline_segment = function (options) {
    options = options || {};
    let segments = options.segments;
    let current_segment = options.current_segment;

    var modal = new Modal({
        content: template('timeline-segment-modal', {
            segment: current_segment,
        }),
    });

    let $prev_button = modal.$element.find('.modal__prev-button');
    let $next_button = modal.$element.find('.modal__next-button');
    let $header = modal.$element.find('.modal-header');
    let $image_container = modal.$element.find('.modal__screenshot');
    let $image = modal.$element.find('.modal__screenshot img');
    let $current_screenshot = modal.$element.find('.modal__current-screenshot');
    let $no_screenshot = modal.$element.find('.modal__no-screenshot');

    $next_button.on('click', function () {
        current_segment = segments[segments.indexOf(current_segment) + 1];
        update_content(current_segment);
    });

    $prev_button.on('click', function () {
        current_segment = segments[segments.indexOf(current_segment) - 1];
        update_content(current_segment);
    });

    let update_content = function (segment) {
        let current_segment_index = segments.indexOf(segment);

        $prev_button.prop('disabled', current_segment_index === 0);
        $next_button.prop('disabled', current_segment_index === segments.length - 1);

        $header.text([
            moment(segment.created_at).format('ddd, MMM D, YYYY'),
            'at',
            moment(segment.created_at).format('h:mm A')
        ].join(' '));

        $current_screenshot.text((current_segment_index + 1) + ' / ' + segments.length);

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
