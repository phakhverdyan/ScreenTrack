@push('scripts')
    <script>
        $(function() {
            $('.footer-bottom__lang').click(function() {
                $(this).addClass('is-open');
            });

            $('body').on('click', function(event) {
                if ($(event.target).closest('.footer-bottom__lang').length > 0) {
                    return;
                }

                $('.footer-bottom__lang').removeClass('is-open');
            });
        });
    </script>
@endpush

<!-- footer -->
<footer class="[ footer ]">
    <div class="container">
        <div class="row">
            <div class="col-lg-3">
                <div class="[ footer__logo ]">
                    <a href="{{ url('/') }}">
                        <img src="{{ asset_no_cache('/img/logo.svg') }}" alt="logo">
                        <span style="display: inline-block; vertical-align: middle;">
                            Screen<b>Track</b>
                        </span>
                    </a>
                </div>
                <div class="[ footer__about ]">
                    <p>{{ __('main_footer.unlimited_free_screenshot_and_streaming') }}<p>
                </div>
            </div>
            <div class="col-lg-3">
                <ul class="[ footer__nav ]">
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('how_it_works', locale()) }}">{{ __('main_footer.how_it_works') }}</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link {{ auth()->check() ? 'd-none' : '' }}" href="{{ route('pricing', locale()) }}">{{ __('main_footer.pricing') }}</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('faq', locale()) }}">{{ __('main_footer.faqs') }}</a>
                    </li>
                    <li class="nav-item d-none">
                        <a class="nav-link" href="{{ route('help_center.index', locale()) }}">{{ __('main_footer.help_center') }}</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('security', locale()) }}">{{ __('main_footer.security_and_reliability') }}</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('careers', locale()) }}">{{ __('main_footer.careers') }}</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('status', locale()) }}">{{ __('main_footer.status') }}</a>
                    </li>
                </ul>
            </div>
            <div class="col-lg-3">
                <ul class="[ footer__nav ]">
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('download_app_for_windows', locale()) }}">
                            {{ __('main_footer.download_employee_app') }}
                        </a>
                    </li>
                    <li class="nav-item d-none">
                        <a class="nav-link" href="{{ route('blog.index', locale()) }}">
                            {{ __('main_footer.blog') }}
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('contact_us', locale()) }}">
                            {{ __('main_footer.contact_us') }}
                        </a>
                    </li>
                    <li class="nav-item d-flex align-items-center">
                        <a href="{{ route('terms', locale()) }}" class="nav-link pr-1">{{ __('main_footer.terms') }}</a>
                        <span style="color: #a9a9a9; font-size: 14px;">&</span>
                        <a href="{{ route('privacy', locale()) }}" class="nav-link pl-1">{{ __('main_footer.privacy') }}</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('about_us', locale()) }}">
                            {{ __('main_footer.about_us') }}
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('affiliates', locale()) }}">
                            {{ __('main_footer.affiliates') }}
                        </a>
                    </li>
                </ul>
            </div>
            <div class="col-lg-3">
                @if (auth()->check())
                    <a href="{{ route('dashboard.index') }}" class="d-block btn btn-primary">{!! __('main_footer.go_to_dashboard') !!}</a>
                @else
                    <div class="[ footer__subs ]">
                        <h4>{{ __('main_footer.join_get_our_newsletter') }}</h4>
                        <form class="[ registration-form ] form-inline d-inline-flex mt-3 + is-vertical">
                            <p class="is-not-available is-hidden">
                                {{ __('main_footer.this_email_has_already_been_taken') }}
                            </p>
                            <p class="is-invalid is-hidden">
                                {{ __('main_footer.must_be_a_valid_email_address') }}
                            </p>
                            <input class="[ registration-form__input ] form-control" type="text" name="user[email]" placeholder="{{ __('main_footer.enter_your_email') }}">
                            <button type="submit" class="[ registration-form__button ] btn btn-primary my-2 my-sm-0 btn-custom">
                                {{ __('main_footer.get_started') }}
                            </button>
                        </form>
                    </div>
                @endif
            </div>
        </div>

        <div class="[ footer-bottom ]">
            <hr>
            <div class="row">
                <div class="col-lg-6">
                    <p class="copy text-lg-left text-center d-flex flex-md-row flex-column align-items-center">
                        © {{ date('Y') }} ScreenTrack, INC.
                    </p>
                </div>
                <div class="col-lg-4"></div>
                <div class="col-lg-2">
                    <div class="[ footer-bottom__select-language ] d-flex justify-content-lg-end justify-content-center">
                        <div class="[ footer-bottom__lang ]">
                            <p>
                                <img src="{{ asset_no_cache('/img/world-wide-web.svg') }}" alt="" width="20">
                                {!! __('main_footer.change_language') !!}
                            </p>
                            <div class="[ footer-bottom__select-language__body ]">
                                <ul>
                                    @foreach ($footer_languages as $lang)
                                        <li>
                                            <a href="{{ $lang['url'] }}">
                                                <img src="{{ asset_no_cache('/img/countries/flags/' . strtoupper($lang['language']->code) . '.png') }}" alt="">
                                                {{ $lang['language']->native_name }}
                                            </a>
                                        </li>
                                    @endforeach
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row flex-column flex-lg-row align-items-end mt-2">
                <div class="col mt-3">
                    <div class="d-flex justify-content-between flex-lg-row flex-column">
                        <div class="mb-lg-0 mb-3">
                            <div class="company-information-phone">
                                <b>{!! __('main_footer.san_fr_office') !!}</b>
                                @if (false)
                                    <br>
                                    <span style="font-size: 20px;">1-415-658-9907</span>
                                @endif
                            </div>
                            <div class="company-information-address">
                                <p>1 Sansome Street Suite 3500</p>
                                <p>San Francisco, CA 94104, United States</p>
                            </div>
                        </div>
                        <div class="d-flex ml-lg-3 mb-lg-0 mb-3 text-right d-lg-none">
                            <div class="mr-3">
                                <img src="{{ asset_no_cache('img/telephone.svg') }}" style="width: 50px; opacity: 0.3;">
                            </div>
                            <div>
                                {!! __('main_footer.toll_free') !!}
                                <br>
                                {!! __('main_footer.work_time') !!}
                            </div>
                        </div>
                    </div>
                    <div class="company-information-map" style="background-image: url('{{ asset_no_cache('img/company-information/san-francisco-map.png') }}');"></div>
                </div>
                <div class="col mt-3">
                    <div class="d-flex justify-content-between">
                        <div>
                            <div class="company-information-phone">
                                <b>{!! __('main_footer.international_calls') !!}</b>
                                <br>
                                <span style="font-size: 20px;">1-844-45-12345</span>
                            </div>
                            <div class="company-information-address">
                                {!! __('main_footer.address') !!}
                            </div>
                        </div>
                        <div class="ml-3 text-right d-none d-lg-flex">
                            <div class="mr-3">
                                <img src="{{ asset_no_cache('img/telephone.svg') }}" style="width: 50px; opacity: 0.3;">
                            </div>
                            <div>
                                {!! __('main_footer.toll_free') !!}
                                <br>
                                {!! __('main_footer.work_time') !!}
                            </div>
                        </div>
                    </div>
                    <div class="company-information-map" style="background-image: url('{{ asset_no_cache('img/company-information/montreal-map.png') }}');"></div>
                </div>
            </div>
            <div class="row d-none">
                <div class="col-lg-12">
                    <div class="row">
                        <div class="col-12 mb-3 mt-5 text-center [ footer-bottom__lang-title ]">
                            ScreenTrack is International
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6 text-left">
                            <ul class="[ footer__nav ]">
                                <li class="nav-item">
                                    <a class="nav-link" href="/en">
                                        <img src="{{ asset_no_cache('/img/countries/flags/EN.png') }}" alt="" class="mr-1">
                                        ScreenTrack - Track freelancer time and screenshots
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/fr">
                                        <img src="{{ asset_no_cache('/img/countries/flags/FR.png') }}" alt="" class="mr-1">
                                        ScreenTrack - Suivre le temps des pigistes et des captures d'écran
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="col-6 text-left">
                            <ul class="[ footer__nav ]">
                                <li class="nav-item">
                                    <a class="nav-link" href="/ru">
                                        <img src="{{ asset_no_cache('/img/countries/flags/RU.png') }}" alt="" class="mr-1">
                                        ScreenTrack - Учет времени фрилансера и скриншоты
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/es">
                                        <img src="{{ asset_no_cache('/img/countries/flags/ES.png') }}" alt="" class="mr-1">
                                        ScreenTrack - Rastrear el tiempo y capturas de pantalla del profesional
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>
<!-- / footer -->
