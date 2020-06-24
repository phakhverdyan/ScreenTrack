<!doctype html>
<html lang="en">
<head>
    <title>ScreenTrack</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Favicon -->
    <link rel="apple-touch-icon" sizes="180x180" href="coming-soon/img/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="coming-soon/img/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="coming-soon/img/favicon/favicon-16x16.png">
    <link rel="manifest" href="coming-soon/img/favicon/site.webmanifest">
    <link rel="mask-icon" href="coming-soon/img/favicon/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="/css/vendor/bootstrap.min.css">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Gudea:400,700&display=swap" rel="stylesheet">

    <!-- CSS -->
    <link rel="stylesheet" href="coming-soon/css/style.css">
</head>
<body>

    <div class="[ coming-soon ]">
        <div class="row">
            <div class="col-md-6">
                <div class="[ coming-soon__logo ]">
                    <a href="{{ route('coming_soon', locale()) }}">
                        <img src="coming-soon/img/logo.svg"> Screen<b>Track</b>
                    </a>
                </div>
                <div class="[ coming-soon__hero-text ]">
                    <div class="[ coming-soon__title ]">
                        <p>COMING SOON</p>
                        <h2>Free Screenshot & Live Video Tracking<br>for Teams & Freelancers</h2>
                    </div>
                    <form class="[ coming-soon__form ] collapse show" onsubmit="event.preventDefault();">
                        <h4 class="[ coming-soon__form-title ]">Enter your Email</h4>
                        <div class="form-group">
                            <div class="form-row">
                                <div class="col-md-8">
                                    <input name="waiter[email]" class="[ coming-soon__input ] form-control" value="" data-name="waiter.email">
                                    <div class="invalid-feedback"></div>
                                </div>
                                <div class="col-md-4">
                                    <button type="submit" class="[ coming-soon__button ] btn btn-primary">Request Invite</button>
                                </div>
                            </div>
                        </div>
                    </form>
                        <br/>
                        <br/>
                        <div class="[ coming-soon__check ] collapse" id="coming-soon__success-text">
                            <span><img src="coming-soon/img/check-mark-icon.svg" alt="">&nbsp;<b>Thanks!</b> You've joined the waiting list.</span>
                        </div>
                        <div class="[ coming-soon__check ] collapse" id="coming-soon__error-text">
                            <span style="color: red"> Something went wrong please try later</span>
                        </div>
                </div>
                <div class="[ coming-soon__copy ]">
                    <p>ScreenTrack, Inc. &#169; <span class="copy-year">2019</span><span class="copy-place"> QC, CA<span class="copy-country-image"><img src="coming-soon/img/flags/canada.svg" alt=""></span></span><span>RN
                        1174604729</span></p>
                </div>
            </div>
            <div class="col-md-6">
                <div class="[ coming-soon__image ]">
                    <img src="coming-soon/img/coming-soon-img.svg" alt="">
                </div>
            </div>
        </div>
    </div>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="{{ asset('js/vendor/bootstrap.min.js') }}"></script>
    <script src="{{ asset_no_cache('/js/main.js') }}"></script>
    
    <!-- Default Statcounter code for ScreenTrack CS http://screentrack.com -->
    <script type="text/javascript">
        var sc_project = 12027149;
        var sc_invisible = 1;
        var sc_security = "46358122";
    </script>
    <script type="text/javascript" src="https://www.statcounter.com/counter/counter.js" async></script>
    <noscript>
        <div class="statcounter">
            <a title="web statistics" href="https://statcounter.com/" target="_blank">
                <img class="statcounter" src="https://c.statcounter.com/12027149/0/46358122/1/" alt="web statistics">
            </a>
        </div>
    </noscript>
    <!-- End of Statcounter Code -->

    <script>
        $(function() {
            $('.coming-soon__form').submit(function(event) {
                event.preventDefault();
                var $form = $(this);

                request({
                    method: 'POST',
                    url: '/waiters/create',
                    data: $form.serialize(),
                }, function(response) {
                    if (new Validator($form, response).fails()) {
                        return;
                    }

                    if (response.error) {
                        console.error(response.error);
                        $('#coming-soon__error-text').collapse('show');
                        return;
                    }

                    $('#coming-soon__success-text').collapse('show');
                    $('.coming-soon__form').collapse('hide');
                    // do something after creation
                });
            });
        });
    </script>
</body>
</html>