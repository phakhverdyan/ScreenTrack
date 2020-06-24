@extends('layouts.base_layout', [
    'body' => [
        'class' => 'interview',
    ],
])

@section('head')
    <!-- Required meta tags -->
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Favicon -->
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset_no_cache('img/favicon/apple-touch-icon.png') }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset_no_cache('img/favicon/favicon-32x32.png') }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ asset_no_cache('img/favicon/favicon-16x16.png') }}">
    <link rel="manifest" href="{{ asset_no_cache('img/favicon/site.webmanifest') }}">
    <link rel="mask-icon" href="{{ asset_no_cache('img/favicon/safari-pinned-tab.svg') }}" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">
    
    <!-- [ GOOGLE FONTS ]-->
    <link href="https://fonts.googleapis.com/css?family=Gudea&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Gudea:400,700&display=swap" rel="stylesheet">
    <!-- [ /GOOGLE FONTS ] -->

    <!-- [ VENDOR STYLES ] -->
    <link rel="stylesheet" href="{{ asset_no_cache('css/vendor/bootstrap.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css">
    <link rel="stylesheet" href="{{ asset_no_cache('css/vendor/aos.css') }}">
    <!-- [ /VENDOR STYLES ] -->

    <!-- [ OWN STYLES ] -->
    <link rel="stylesheet" href="{{ asset_no_cache('css/interview/main.css') }}">
    <!-- [ /OWN STYLES ] -->
@endsection

@section('body')
    @yield('content')

    <script>
        window.csrf_token = '{{ csrf_token() }}';
        window.auth = {!! auth()->json() !!};
        window.referrer_user_id = parseInt("{{ $referrer_user_id ?? '0' }}");
    </script>
    
    <!-- [ VENDOR SCRIPTS ] -->
    <script src="{{ asset_no_cache('/js/vendor/jquery-3.3.1.min.js') }}"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="{{ asset_no_cache('/js/vendor/bootstrap.min.js') }}"></script>
    <script src="{{ asset_no_cache('/js/vendor/aos.js') }}"></script>
    <script src="{{ asset_no_cache('/js/vendor/notify.js') }}"></script>
    <script src="{{ asset_no_cache('/js/vendor/ejs.min.js') }}"></script>
    <!-- [ /VENDOR SCRIPTS ] -->

    <!-- [ OWN SCRIPTS ] -->
    <script src="{{ asset_no_cache('/js/main.js') }}"></script>

    <script>
        AOS.init({
            offset: 100,
            duration: 300,
            easing: 'ease-in',
            delay: 50,
        });
    </script>
    <!-- [ /OWN SCRIPTS ] -->
    
    @if (!auth()->check())
        <script>window.client_ip.update({!! json_encode(ipinfo()) !!});</script>
    @endif
@endsection
