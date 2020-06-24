@extends('layouts.main_layout')
@push('styles')
    <link rel="stylesheet" type="text/css" href="{{ asset_no_cache('/css/login.css') }}">
@endpush
@section('content')
<body>

<!-- Header -->
<header>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="[ small-logo ]">
                    <a href="/"><img src="{{ asset_no_cache('/img/logo.svg') }}">ScreenTrack</a>
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
                <p class="text-center mb-3"><img src="{{ asset_no_cache('/img/key.svg') }}" alt="key" width="120"> </p>
                <h2 class="[ forget-password__form-title ] text-center">
                    {{ __('auth/password_reset_sent.password_sent') }}
                </h2>
                <p class="text-center"> {{ __('auth/password_reset_sent.please_check_your_email') }}</p>
                <a href="/login" class="[ forget-password__login-btn ] btn btn-block mt-5">{!! __('auth/password_reset_sent.back_to_login') !!}</a>
            </div>
        </div>
    </div>
</div>
</body>
@endsection
