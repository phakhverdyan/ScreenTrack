@extends('layouts.main_layout')

@push('meta')
    <title>{!! __('meta.make_password_reset.title') !!}</title>
    <meta name="description" content="{!! __('meta.make_password_reset.description') !!}">
    <meta name="keywords" content="{!! __('meta.make_password_reset.keywords') !!}">
@endpush

@push('styles')
    <link rel="stylesheet" type="text/css" href="{{ asset_no_cache('/css/login.css') }}">
@endpush

@push('scripts')
    <script>
        $(function() {
            var $form = $('.forget-password__form');
            var $continue_button = $('#continue');

            $continue_button.click(function(event) {
                event.preventDefault();

                if ($continue_button.hasClass('is-loading')) {
                    return;
                }

                $continue_button.addClass('is-loading disabled');

                request({
                    url: '/reset_password',
                    data: $form.serialize(),
                    method: 'POST',
                }, function(response) {
                    $continue_button.removeClass('is-loading disabled');

                    if (new Validator($form, response).fails()) {
                        return;
                    }

                    if (response.error) {
                        $.notify(response.error, 'error');
                        return;
                    }

                    $continue_button.addClass('is-loading disabled');
                    window.location.href = "{{ route('password_reset_sent') }}";
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
                        <a href="{{ route('index', locale()) }}">
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
                <div class="[ forget-password ]">
                    <h2 class="[ forget-password__form-title ] text-center">
                        {{ __('auth/make_password_reset.reset_your_screen_track_password') }}
                    </h2>
                    <p class="text-center">{{ __('auth/make_password_reset.submit_your_email_address') }}</p>
                    <form action="" class="[ forget-password__form ]">
                        <div class="form-group">
                            <!-- <label for="">Enter your email address</label> -->
                            <input name="user[email]" data-name="user.email" type="text" class="form-control" placeholder="{{ __('auth/make_password_reset.enter_your_email') }}">
                            <div class="invalid-feedback"></div>
                        </div>
                        <div class="form-group mt-4">
                            <button id="continue" class="[ forget-password__form-button ] btn btn-primary">{{ __('auth/make_password_reset.continue') }}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- /Body -->
@endsection
