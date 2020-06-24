@extends('dashboard.layout')

@section('content')
    <div class="container">
        <div class="[ change-password ]">
            <h3 class="[ page-title ]">{{ __('dashboard/change_password.change_password') }}</h3>
            <form class="[ change-password__form ]">
                <div class="form-group">
                    <label for="name">{{ __('dashboard/change_password.current_password') }}</label>
                    <input class="form-control" type="password" name="user[current_password]" data-name="user.current_password">
                    <div class="invalid-feedback"></div>
                </div>
                <div class="form-group">
                    <label for="name">{{ __('dashboard/change_password.new_password') }}</label> <small class="small text-muted">{{ __('dashboard/change_password.password_need_to_be_at_least_6_characters_long') }}</small>
                    <input class="form-control" type="password" name="user[new_password]" data-name="user.new_password">
                    <div class="invalid-feedback"></div>
                </div>
                <div class="form-group">
                    <label for="name">{{ __('dashboard/change_password.confirm_new_password') }}</label>
                    <input class="form-control" type="password" name="user[new_password_confirmation]" data-name="user.new_password_confirmation">
                    <div class="invalid-feedback"></div>
                </div>
                <div class="form-group">
                    <button id="submit" class="[ update__button ] btn btn-primary form-control" type="submit">{{ __('dashboard/profile.update') }}</button>
                </div>
            </form>
        </div>
    </div>
@endsection

@push('scripts')
    <script>
        $(function() {
            var $form = $('.change-password__form');
            var $form_submit_button = $form.find('button[type="submit"]');

            $form.submit(function(event) {
                event.preventDefault();

                if ($form_submit_button.hasClass('is-loading')) {
                    return;
                }

                $form_submit_button.addClass('is-loading disabled');

                request({
                    method: 'POST',
                    url: '/users/me/change_password',
                    data: $form.serialize(),
                }, function(response) {
                    $form_submit_button.removeClass('is-loading disabled');

                    if (new Validator($form, response).fails()) {
                        return;
                    }

                    if (response.error) {
                        $.notify(response.error);
                        return;
                    }

                    $.notify("{{ __('dashboard/change_password.new_password_saved') }}", 'success');

                    setTimeout(function() {
                        window.location.href = "{{ route('dashboard.index') }}";
                    }, 1000);
                });
            });

            $form.find('input:first').focus();
        });
    </script>
@endpush