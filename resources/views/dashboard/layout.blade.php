@extends('layouts.base_layout', [
    'body' => [
        'class' => 'is-dashboard is-loading',
    ],
])

@section('head')
    <title>ScreenTrack Dashboard</title>

    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- [ FAVICON ] -->
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset_no_cache('img/favicon/apple-touch-icon.png') }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset_no_cache('img/favicon/favicon-32x32.png') }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ asset_no_cache('img/favicon/favicon-16x16.png') }}">
    <link rel="manifest" href="{{ asset_no_cache('img/favicon/site.webmanifest') }}">
    <link rel="mask-icon" href="{{ asset_no_cache('img/favicon/safari-pinned-tab.svg') }}" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">
    <!-- [ /FAVICON ] -->

    <!-- [ GOOGLE FONTS ]-->
    <link href="https://fonts.googleapis.com/css?family=Gudea&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Gudea:400,700&display=swap" rel="stylesheet">
    <!-- [ /GOOGLE FONTS ] -->

    <!-- [ VENDOR STYLES ] -->
    <link rel="stylesheet" href="{{ asset('css/vendor/jquery-ui.min.css') }}">
    <link rel="stylesheet" href="{{ asset('css/vendor/bootstrap.css') }}">
    <link rel="stylesheet" href="{{ asset('css/vendor/selectize.bootstrap3.min.css') }}">
    <link rel="stylesheet" href="{{ asset_no_cache('css/vendor/selectize.modified.css') }}">
    <link rel="stylesheet" href="{{ asset('css/vendor/animate.css') }}">
    <link rel="stylesheet" href="{{ asset_no_cache('css/vendor/animate.modified.css') }}">
    <link rel="stylesheet" href="{{ asset_no_cache('css/vendor/pageintro.css') }}">
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />
    <!-- [ /VENDOR STYLES ] -->

    <!-- [ OWN STYLES ] -->
    <link rel="stylesheet" href="{{ asset_no_cache('css/main.css') }}">
    <link rel="stylesheet" href="{{ asset_no_cache('css/stripe.css') }}">
    <link rel="stylesheet" href="{{ asset_no_cache('css/dashboard/main.old.css') }}">
    <link rel="stylesheet" href="{{ asset_no_cache('css/dashboard/main.css') }}">
    <link rel="stylesheet" href="{{ asset_no_cache('css/dashboard/style.css') }}">
    <!-- [ /OWN STYLES ] -->
@endsection

@section('body')
    <!-- Navigation -->
    @include('dashboard.components.navbar')
    <!-- /Navigation -->

    <!-- Sidebar -->
    @include('dashboard.components.sidebar')
    <!-- /Sidebar -->

    <!-- Content -->
    <div class="[ content ]">
        @yield('content')
    </div>
    <!-- / Content -->

    @include('components.statcounter')
    @include('components.livechat')
    @include('dashboard.components.tips')

    <!-- [ VENDOR SCRIPTS ] -->
    <script src="{{ asset('js/vendor/jquery.min.js') }}"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="{{ asset('js/vendor/bootstrap.min.js') }}"></script>
    <script src="{{ asset_no_cache('js/vendor/pageintro.js') }}"></script>
    <script src="{{ asset_no_cache('js/vendor/jquery-ui.min.js') }}"></script>
    <script src="{{ asset('js/vendor/aos.js') }}"></script>
    <script src="{{ asset('js/vendor/notify.js') }}"></script>
    <script src="{{ asset('js/vendor/ejs.min.js') }}"></script>
    <script src="{{ asset('js/vendor/socket.io.js') }}"></script>
    <script src="{{ asset('js/vendor/selectize.min.js') }}"></script>
    <script src="{{ asset('js/vendor/moment.js') }}"></script>
    <script src="{{ asset('js/vendor/jquery.mask.min.js') }}"></script>
    <script src="https://js.stripe.com/v3/"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>
    <!-- [ /VENDOR SCRIPTS ] -->

    <script>
        window.csrf_token = '{{ csrf_token() }}';
        window.auth = {!! auth()->json() !!};
        window.stripe = Stripe("{{ env('STRIPE_PUBLIC_KEY') }}");
    </script>

    <script>
        window.lang = {!! json_encode(get_client_language_array(), JSON_UNESCAPED_UNICODE) !!};
    </script>

    <!-- [ OWN SCRIPTS ] -->
    <script>window.dashboard = {};</script>

    @if (request()->selected_project)
        <script>
            window.dashboard.selected_project = {!! json_encode(request()->selected_project->toArray(), JSON_UNESCAPED_UNICODE) !!};
        </script>
    @endif

    <script src="{{ asset_no_cache('/js/main.js') }}"></script>
    <script src="{{ asset_no_cache('/js/realtime.js') }}"></script>
    <script>realtime(atob("{{ base64_encode(config('realtime.url')) }}"));</script>
    <script src="{{ asset_no_cache('/js/dashboard/main.js') }}"></script>
    <script src="{{ asset_no_cache('/js/dashboard/messenger.js') }}"></script>
    <script src="{{ asset_no_cache('/js/dashboard/timeline.js') }}"></script>
    <script src="{{ asset_no_cache('/js/modals.js') }}"></script>
    <script src="{{ asset_no_cache('/js/popovers.js') }}"></script>
    <script src="{{ asset_no_cache('/js/slideups.js') }}"></script>
    <!-- [ /OWN SCRIPTS ] -->
@endsection

@modal('introduction')
@modal('confirm_action')
@modal('user_feedback')
@modal('user_profile')
@modal('project_task')
@modal('close_contract')
@modal('contract')
@modal('milestone')
@modal('timeline_segment')

@popover('invite_project_member')
@popover('project_task_menu')
@popover('project_member_menu')
@popover('project_members')
@popover('extra_project_menu')
@popover('create_new_project')
@popover('add_contract')

@slideup('user_profile')

@ejs_template('dashboard.selected_project_member')
@ejs_template('dashboard.chat_item')
@ejs_template('dashboard.message_item')
@ejs_template('dashboard.timeline')
@ejs_template('dashboard.message_panel_attachment_item')
@ejs_template('tour_step')
