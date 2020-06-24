@extends('layouts.main_layout')

@push('styles')
    <link rel="stylesheet" type="text/css" href="{{ asset_no_cache('/css/login.css') }}">
@endpush

@push('scripts')
    <script>
        $(function() {
            var $form = $('.password-reset__form');
            var $reset_button = $('#reset');

            $reset_button.click(function(event) {
                event.preventDefault();

                if ($reset_button.hasClass('is-loading')) {
                    return;
                }

                $reset_button.addClass('is-loading disabled');

                request({
                    url: '/reset_password/{{ $password_reset->token }}',
                    data: $form.serialize(),
                    method: 'POST',
                },function(response) {
                    $reset_button.removeClass('is-loading disabled');

                    if (new Validator($form, response).fails()) {
                        return;
                    }

                    if (response.error) {
                        $.notify(response.error, 'error');
                        return;
                    }

                    $reset_button.addClass('is-loading disabled');
                    window.location.href = "{{ route('login', locale()) }}";
                });
            });

            $form.find('input:first').focus();
        });
    </script>
@endpush

@section('content')
    <!-- Header -->
    <header>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="[ small-logo ]">
                        <a href="/">
                            <img src="{{ asset_no_cache('/img/logo.svg') }}"> Screen<b>Track</b>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <!-- / Header -->

    <!-- Body -->
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6 offset-md-3 d-flex justify-content-center">
                <div class="[ password-reset ]">
                    <h2 class="[ password-reset__form-title ] text-center">
                        {{ __('auth/password_reset.enter_your_new_password') }}
                    </h2>
                    <p class="text-center"></p>
                    <form action="" class="[ password-reset__form ]">
                        <div class="form-group">
                            <!-- <label for="">New Password</label> -->
                            <input type="password" name="user[password]" class="form-control" data-name="user.password" placeholder=" {{ __('auth/password_reset.new_password') }}">
                            <div class="invalid-feedback"></div>
                        </div>
                        <div class="form-group">
                            <!-- <label for="">Repeat New Password</label> -->
                            <input type="password" name="user[password_confirmation]" class="form-control"  data-name="user.password_confirmation" placeholder=" {{ __('auth/password_reset.repeat_new_password') }}">
                            <div class="invalid-feedback"></div>
                        </div>
                        <div class="form-group mt-4">
                            <button id="reset" class="[ password-reset__form-button ] btn btn-primary"> {{ __('auth/password_reset.save') }}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- /Body -->
@endsection
