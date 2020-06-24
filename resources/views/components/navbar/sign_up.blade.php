<!-- Header -->
<header>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-light fixed-top bg-light">
        <div class="container">
        <!-- container -->
        <!-- <div class="container-fluid"> -->
            <div class="[ get-started ]">
                <div class="row flex-row">
                    <!-- col-md-3 -->
                    <div class="col-md-5">
                        <div class="[ get-started__logo ]">
                            <!-- Logo -->
                            <a href="#">
                                <img src="{{ asset_no_cache('/img/logo.svg') }}"> {{ __('sign_up/navbar.get_started_with_screen_track') }}
                            </a>
                            <!-- Logo -->
                        </div>
                    </div> <!-- col-md-3 -->

                    <div class="col-md-7">
                        <div class="[ get-started__step ]">
                            <!-- main-nav -->
                            <div class="navbar-collapse" id="collapsibleNavId">

                                <ul class="navbar-nav flex-row flex-wrap">
                                    <li class="nav-item {{ $current_page == 'CHOOSE_A_PLAN' ? 'active' : '' }}">
                                        <a class="nav-link" href="{{ in_array($current_page, [
                                            'SET_ACCOUNT_DETAILS',
                                            'CHOOSE_ADDONS',
                                            'START_TRIAL',
                                        ]) ? ($user ? url()->route('sign_up.choose_a_plan') : url()->route('pricing', [locale()])) : '#' }}">
                                            1. Choose a Plan
                                        </a>
                                    </li>
                                    <li class="nav-item {{ $current_page == 'SET_ACCOUNT_DETAILS' ? 'active' : '' }}">
                                        <a class="nav-link" href="{{ in_array($current_page, [
                                            'CHOOSE_ADDONS',
                                            'START_TRIAL',
                                        ]) ? url()->route('sign_up.set_accont_details') : '#' }}">
                                            2. Complete your Account
                                        </a>
                                    </li>
                                    @if (FALSE /* DISABLED 25 Aug 2019 */ /* !$choosen_plan || $choosen_plan->account_type == 'Company' */)
                                        <li class="nav-item {{ $current_page == 'CHOOSE_ADDONS' ? 'active' : '' }} is-for-company-only {{ $choosen_plan ? '' : 'd-none' }}">
                                            <span class="nav-link">3. Add-ons</span>
                                        </li>
                                        <li class="nav-item {{ $current_page == 'START_TRIAL' ? 'active' : '' }} is-for-company-only {{ $choosen_plan ? '' : 'd-none' }}">
                                            <span class="nav-link">4. Start Trial</span>
                                        </li>
                                    @endif
                                </ul>
                            </div>
                            <!-- main-nav -->
                        </div>
                    </div>
                    <!-- <div class="col-md-3" style="height: 1px;">
                        <div class="[ get-started__signin ]">
                            <p>Already using ScreenTrack?<span><a href="#"> Sign in</a></span></p>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
    </nav>
    <!-- Navigation -->
</header>
<!-- /Header -->