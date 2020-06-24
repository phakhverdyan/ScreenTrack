<header>
	<!-- navigation -->
	<nav class="navbar navbar-expand-lg navbar-light fixed-top bg-light">
		<div class="container">
			<div class="d-flex flex-column flex-xl-row">
				<!-- logo -->
				<a class="navbar-brand mr-md-1 mr-0" href="{{ route('index', locale()) }}">
					<img src="{{ asset_no_cache('/img/logo.svg') }}">
					<span>
						Screen<b>Track</b>
					</span>
				</a>
				<!-- /logo -->

				<div class="[ navbar-phone ] d-lg-block d-none ml-5">
					<a href="tel:1-844-45-12345" class="[ navbar-phone__link ]">1-844-45-12345</a>
					<span class="navbar-phone__description">{!! __('main_navbar.toll_free') !!}</span>
					<span class="navbar-phone__description">{!! __('main_navbar.work_time') !!}</span>
				</div>
			</div>

			<a class="nav-link d-lg-none px-0" href="{{ route('affiliates', locale()) }}">{{ __('main_navbar.affiliates') }}</a>

			<!-- mobile-nav -->
			<button class="navbar-toggler d-lg-none border-0"  id="menu-humburger" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</button>
			<!-- /mobile-nav -->

			<!-- main-nav -->
			<div class="collapse navbar-collapse justify-content-end" id="collapsibleNavId">
				<ul class="navbar-nav mt-2 mt-lg-0">
					<li class="nav-item {{ request()->route()->getName() == 'index' ? 'active' : '' }}">
						<a class="nav-link" href="{{ route('index', locale()) }}">{{ __('main_navbar.home') }}</a>
					</li>
					<li class="nav-item {{ request()->route()->getName() == 'how_it_works' ? 'active' : '' }} {{ auth()->check() ? 'd-none' : '' }}">
						<a class="nav-link" href="{{ route('how_it_works', locale()) }}">{{ __('main_navbar.how_it_works') }}</a>
					</li>
					<li class="nav-item {{ request()->route()->getName() == 'plans' ? 'active' : '' }} {{ auth()->check() ? 'd-none' : '' }}">
						<a class="nav-link" href="{{ route('plans', locale()) }}">{{ __('main_navbar.plans') }}</a>
					</li>
{{--					<li class="nav-item {{ request()->route()->getName() == 'affiliates' ? 'active' : '' }}">--}}
{{--						<a class="nav-link" href="{{ route('affiliates', locale()) }}">{{ __('main_navbar.affiliates') }}</a>--}}
{{--					</li>--}}
					<li class="nav-item {{ request()->route()->getName() == 'login' ? 'active' : '' }} {{ auth()->check() ? 'd-none' : '' }}">
						<a class="[ navbar__login-link ] nav-link" href="{{ route('login', locale()) }}">{{ __('main_navbar.log_in') }}</a>
					</li>
					<li class="nav-item {{ auth()->check() ? '' : 'd-none' }}">
						<a class="nav-link" href="{{ route('dashboard.index') }}">{{ __('main_navbar.dashboard') }}</a>
					</li>
					<li class="nav-item {{ auth()->check() ? '' : 'd-none' }}">
						<a class="nav-link" href="{{ route('logout') }}">
							<img src="{{ asset_no_cache('img/logout.svg') }}" style="width: 20px; opacity: 0.3;" alt="">
						</a>
					</li>
                    <a href="{{ route('download_app', app()->getLocale()) }}" class="btn btn-success mr-2">Download</a>
					<div class="form-inline mt-2 mb-0 my-lg-0 {{ auth()->check() ? 'd-none' : '' }}">
						<form class="[ registration-form ] form-inline is-short">
							<p class="is-not-available is-hidden">{{ __('main_navbar.this_email_has_already_been_taken') }}</p>
							<p class="is-invalid is-hidden">{{ __('main_navbar.must_be_a_valid_email_address') }}</p>
							<input class="[ registration-form__input ] form-control" type="text" name="user[email]" placeholder="{{ __('main_navbar.enter_your_email') }}">
							<button type="submit" class="[ registration-form__button ] btn btn-primary mt-3 mb-0 my-sm-0 btn-custom">
								{{ __('main_navbar.get_started') }}
								<img src="{{ asset_no_cache('/img/finger.svg') }}" style="width: 25px; margin-top: -5px; transform: scale(-1, 1) rotate(90deg); margin-left: 5px;" alt="">
							</button>
						</form>
					</div>
				</ul>
			</div>
			<!-- /main-nav -->
		</div>
	</nav>
	<!-- /navigation -->
</header>
