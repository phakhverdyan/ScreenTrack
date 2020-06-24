@extends('layouts.main_layout')

@push('meta')
    <title>{!! __('meta.login.title') !!}</title>
    <meta name="description" content="{!! __('meta.login.description') !!}">
    <meta name="keywords" content="{!! __('meta.login.keywords') !!}">
@endpush

@push('styles')
    <link rel="stylesheet" type="text/css" href="{{ asset_no_cache('css/login.css') }}">
@endpush

@push('scripts')
    @include('common.auth.login.partials.js')
@endpush

@section('content')
    @include('components.navbar.main')

    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6 d-flex justify-content-center" style="margin-top: 80px">
                <div class="[ login-form ]">
                    <h2 class="[ login-form__page-title ] text-center">
                        {{ __('auth/login.log_in') }}
                    </h2>
                    <div class="collapse" id="wrong" style="color: red; text-align: center;">
                        {{ __('auth/login.wrong_email_or_password') }}
                    </div>
                    <form action="" class="[ login-form__main ]">
                        <div class="form-group mt-4">
                            <label for="email">{{ __('auth/login.email') }}</label>
                            <input name="user[email]" data-name="user.email" type="text" class="form-control" id="email" aria-describedby="emailHelp" placeholder="{{ __('auth/login.your_email_address') }}">
                            <div class="invalid-feedback"></div>
                        </div>
                        <div class="form-group mt-4">
                            <label for="password">{{ __('auth/login.password') }}</label>
                            <input name="user[password]" data-name="user.password" type="password" class="form-control" id="password" aria-describedby="emailHelp" placeholder="{{ __('auth/login.your_password') }}">
                            <div class="invalid-feedback"></div>
                        </div>
                        <div class="[ login-form__opt ]">
                            <div class="form-check">
                                <input id="remember_me" type="checkbox" class="form-check-input" id="exampleCheck1" checked="checked">
                                <label class="form-check-label" for="exampleCheck1">{{ __('auth/login.remember_me') }}</label>
                            </div>
                            <a href="{{ route('forgot_password', locale()) }}">{{ __('auth/login.forgot_password') }}</a>
                        </div>
                        <div class="form-group mt-4 mb-5">
                            <button class="[ login-form__button ] btn btn-primary" type="submit">{{ __('auth/login.log_in') }}</button>
                        </div>

                        <p class="required-text text-center">
                            {{ __('auth/login.dont_have_an_account') }}
                            <a href="{{ route('pricing', locale()) }}">{{ __('auth/login.sign_up_now') }}</a>
                        </p>
                    </form>
                </div>
            </div>
            <div class="[ login-form__cc ] col-md-6">
                <div class="[ login__image ]">
                    <img src="{{ asset_no_cache('/img/login-img.svg') }}" alt="">
                </div>
            </div>
        </div>
    </div>

    @include('components.footer.main')
@endsection
