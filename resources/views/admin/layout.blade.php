<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    @stack('styles')
</head>
<body class="[ admin ]">
    <div class="main-wrapper">
        <header class="border-bottom">
            <div class="container">
                <div class="text-right py-2">
                    <a href="/logout" class="btn btn-primary">Log out</a>
                </div>
            </div>
        </header>
        <main>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-2 py-5 border-right">
                        <div>
                            <a href="/nexus/users">Users</a>
                        </div>
                        <hr>
                        <div>
                            <a href="/nexus/help-center/articles">Help Center Articles</a>
                        </div>
                        <div>
                            <a href="/nexus/blog/articles">Blog Articles</a>
                        </div>
                        <hr>
                        <div>
                            <a href="/nexus/feedback">User feedback</a>
                        </div>
                        <hr>
                        <div>
                            <a href="/nexus/administrators">Administrators</a>
                        </div>
                        <hr>
                        <div>
                            <a href="/nexus/coupons">Coupons</a>
                        </div>
                        <hr>
                        <div>
                            <a href="/nexus/payouts/pending">Pending Payouts</a>
                        </div>
                        <hr>
                        <div>
                            <a href="/nexus/tracking-commands">Tracking Commands</a>
                        </div>
                    </div>
                    <div class="col pt-5">
                       @yield('content')
                    </div>
                </div>
            </div>
        </main>
    </div>

    <script>
        window.csrf_token = '{{ csrf_token() }}';
        window.auth = {!! auth()->json() !!};
        window.referrer_user_id = parseInt("{{ $referrer_user_id ?? '0' }}");
    </script>
    <!-- [ VENDOR SCRIPTS ] -->
    <script src="{{ asset_no_cache('/js/vendor/jquery.min.js') }}"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="{{ asset_no_cache('/js/vendor/bootstrap.min.js') }}"></script>
    <script src="{{ asset_no_cache('/js/vendor/aos.js') }}"></script>
    <script src="{{ asset_no_cache('/js/vendor/notify.js') }}"></script>
    <script src="{{ asset_no_cache('/js/vendor/ejs.min.js') }}"></script>
    <!-- [ /VENDOR SCRIPTS ] -->

    <!-- [ OWN SCRIPTS ] -->
    <script src="{{ asset_no_cache('/js/main.js') }}"></script>
    @stack('ejs-templates')
    @stack('scripts')
</body>
</html>