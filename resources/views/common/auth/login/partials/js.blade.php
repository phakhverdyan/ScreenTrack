<script>
    $(function() {
        var $form = $('.login-form__main');
        var $submit_button = $form.find('button[type="submit"]');
        var $wrong_user_credentials_text = $('#wrong');

        $form.submit(function(event) {
            event.preventDefault();

            if ($submit_button.hasClass('is-loading')) {
                return;
            }

            $submit_button.addClass('is-loading disabled');

            request({
                url: '/login',
                data: $form.serialize(),
                method: 'POST',
            }, function(response) {
                $submit_button.removeClass('is-loading disabled');
                if (new Validator($form, response).fails()) {
                    $wrong_user_credentials_text.collapse('hide');
                    return;
                }

                if (response.error == 'Wrong User Credentials') {
                    $wrong_user_credentials_text.collapse('show');
                    return;
                }

                if (response.error) {
                    $.notify(response.error, 'error');
                    return;
                }

                var remember_me = $('#remember_me').is(':checked') ? 1 : 0;
                $submit_button.addClass('is-loading disabled');

                var user_id = response.data.id;

                request({
                    root: '',
                    url: '/login_using_api_token',
                    method: 'POST',

                    data: {
                        user_id: response.data.id,
                        api_token: response.data.api_token,
                        remember_me: remember_me,
                    },
                }, function(response) {
                    $submit_button.removeClass('is-loading disabled');

                    if (response.error) {
                        $.notify(response.error, 'error');
                        return;
                    }

                    $submit_button.addClass('is-loading disabled');

                    if (localStorage.getItem('interviews_results_keys')) {
                        request({
                            url: '/interview_result/link_with_user',
                            method: 'POST',
                            data: {
                                user_id: user_id,
                                interviews_results_keys: JSON.parse(localStorage.getItem('interviews_results_keys') || '[]'),
                            },
                        }, function(response) {

                            if (response.error) {
                                $.notify(response.error, 'error');
                                return;
                            }

                            localStorage.removeItem('interviews_results_keys');

                            window.location.href = '/dashboard/passed-interviews';

                            return;
                        });
                    }

                    window.location.href = response.data.redirect_url;

                    return;
                });
            });
        });

        $form.find('input:first').focus();
    });
</script>