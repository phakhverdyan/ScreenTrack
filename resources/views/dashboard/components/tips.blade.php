@push('scripts')
    <script>
        window.tips = @json($tips)

        function user_tip_confirmed(tip_key) {
            request({
                method: 'POST',
                url: '/user_tips/' + tip_key + '/delete',
            }, function (response) {
                if (response.error) {
                    $.notify(response.error, 'error');
                    return;
                }
            });

            var index = window.tips_keys_list.indexOf(tip_key);

            if (index !== -1) window.tips_keys_list.splice(index, 1);

            if (window.tips_keys_list.length > 0) {
                modals[window.tips_keys_list[0] + '_tip_modal']();
            }
        }
    </script>
@endpush
