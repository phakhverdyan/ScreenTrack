@push('scripts')
    <script>
        $(function() {
            $('#navbar-profile-dropdown .dropdown-item.is-spendings .badge').click(function(event) {
                window.location.href = $(this).attr('data-href');
                event.preventDefault();
            });

            $('#navbar-profile-dropdown .dropdown-item.is-earnings .badge').click(function(event) {
                event.preventDefault();
                window.location.href = $(this).attr('data-href');
            });
        });
    </script>
@endpush

<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top justify-content-start [ dashboard_navbar ]">
    <a class="navbar-brand" href="{{ route('dashboard.index') }}">
        <img src="{{ asset_no_cache('img/logo.svg') }}" alt="logo">
    </a>
    <div class="mr-md-3 mr-0 d-flex">
        <select class="[ navbar__project-select ] custom-select + auto-width is-main-project-selector">
            <option value="{{ $selected_project->id ?? '' }}">{{ $selected_project->name ?? '' }}</option>
        </select>
{{--        <div class="input-group">--}}
            <div class="input-group-append" style="font-size: 0; width: 0; padding: 0; opacity: 0;">
                <button type="button" class="[ navbar__create-new-project-button ] btn btn-primary">{{ __('dashboard/navbar.new_project') }}</button>
{{--            </div>--}}
        </div>
    </div>
    <a class="ml-auto d-md-none" href="#" id="profile-settings" data-toggle="collapse" data-target="#main-navbar" aria-controls="main-navbar" aria-expanded="false" aria-label="Toggle navigation">
        <div class="[ navbar-profile__image ]" data-user-id="1" style="background-image: url('{{ auth()->user()->image->urls->tiny }}');"></div>
    </a>
    <div class="collapse navbar-collapse" id="main-navbar">
        <ul class="navbar-nav mr-auto pt-3 pt-md-0">
            {{-- <li class="nav-item + is-project">
                <select class="[ navbar__project-select ] custom-select + auto-width is-main-project-selector">
                    <option value="{{ $selected_project->id ?? '' }}">{{ $selected_project->name ?? '' }}</option>
                </select>
            </li> --}}
            @if ($selected_project)
                @include('dashboard.partials.navbar_project_menu')
                <div class="d-flex align-items-center my-3">
                    @if (auth()->user()->canManageProjectMembers($selected_project))
                        <li class="d-flex">
                            <div class="[ selected-project-members ]">
                                @foreach ($selected_project->members->slice(0, 7)->reverse() as $project_member)
                                    <a href="#" class="[ selected-project-member ]" title="{{ $project_member->user->title }}">
                                        <img src="{{ $project_member->user->image->urls->tiny }}" alt="">
                                        <span class="[ selected-project-member__status ] + {{ $project_member->user->is_online ? 'is-online' : '' }}"></span>
                                    </a>
                                @endforeach
                            </div>
                            <button type="button" class="[ selected-project__show-more-members-button ] {{ $selected_project->members->count() > 7 ? '' : 'd-none' }} btn btn-secondary">+{{ $selected_project->members->count() - 7 }}</button>
                        </li>
                        <li>
                            <button type="button" class="[ selected-project__invite-member-button ] btn btn-primary">
                                <img src="{{ asset_no_cache('img/add-user.white.svg') }}" style="width: 20px; margin-right: 3px;" alt="">
                                {{ __('dashboard/navbar.add_user') }}
                            </button>
                        </li>
                    @endif
                    <li>
                        <button type="button" class="[ selected-project__extra-menu-button ] btn btn-default"></button>
                    </li>
                </div>
            @endif
        </ul>
        {{-- <a href="{{ route('dashboard.referrals') }}" class="btn btn-primary mr-2">Referrals</a> --}}
        @if (!app()->environment('production'))
            <button class="btn btn-danger btn-sm mr-2" data-toggle="modal" data-target="#for_develop1">For dev</button>
        @endif
        @if (!app()->environment('production'))
            <button type="button" class="[ navbar__add-contract-button ] btn btn-success mr-2">
                <img src="{{ asset_no_cache('img/add-contract.white.svg') }}" style="width: 20px; margin-right: 3px;" alt="">
                {{ __('dashboard/navbar.add_contract') }}
            </button>
        @endif
        @if (!app()->environment('production'))
            <button class="[ navbar__tour-button ] btn btn-secondary mr-2" style="line-height: 1;"  data-toggle="modal" data-target="#open_tour">
                <img src="{{ asset_no_cache('img/info.white.svg') }}" style="width: 20px; margin-right: 3px;" alt="">
                Tour
            </button>
        @endif
        <form class="[ navbar-feedback ] mr-2 mb-3 mb-md-0">
            <input class="[ navbar-feedback__input ] form-control" placeholder="{{ __('dashboard/navbar.enter_feedback') }}">
        </form>
        <hr class="d-md-none">
        <!-- User Dropdown -->
        <div class="[ navbar-profile ]">
            <a class="nav-link dropdown-toggle d-md-flex d-none" href="#" id="profile-settings" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{ auth()->user()->first_name ?: auth()->user()->last_name ?: auth()->user()->slug }}
                <div class="[ navbar-profile__image ]" data-user-id="1" style="background-image: url('{{ auth()->user()->image->urls->tiny }}');"></div>
            </a>
            <div class="dropdown-menu" aria-labelledby="profile-settings" id="navbar-profile-dropdown">
                <a class="dropdown-item" href="{{ route('dashboard.companies') }}">
                    <span>{{ __('dashboard/navbar.my_companies') }}</span>
                    <span class="dropdown-item__badges {{ $count_of_companies > 0 ? '' : 'd-none' }}">
                        <span class="badge badge-primary">
                            {{ $count_of_companies }}
                        </span>
                    </span>
                </a>
                <a class="dropdown-item" href="{{ route('dashboard.contracts') }}">
                    <span>{{ __('dashboard/navbar.my_contracts') }}</span>
                    <span class="dropdown-item__badges">
                        <span class="badge badge-primary">
                            {{ $count_of_contracts }}
                        </span>
                    </span>
                </a>
                <hr class="my-1">
                <a class="dropdown-item" href="{{ route('dashboard.profile.edit') }}">{{ __('dashboard/profile.edit_profile') }}</a>
                <a class="dropdown-item" href="{{ route('dashboard.profile.change_password') }}">{{ __('dashboard/navbar.change_password') }}</a>
                <hr class="my-1">
                <a class="dropdown-item" href="{{ route('dashboard.projects') }}">{{ __('dashboard/navbar.projects') }}</a>
                {{-- <a class="dropdown-item" href="{{ route('dashboard.contacts') }}">{{ __('dashboard/navbar.contacts') }}</a> --}}
            @if (count(auth()->user()->passed_interviews))
                    <a class="dropdown-item" href="{{ route('dashboard.passed_interviews') }}">
                        {{ __('dashboard/navbar.passed_interviews') }}
                    </a>
                @endif
                <hr class="my-1">
                @if (!app()->environment('production'))
                    <a class="dropdown-item" href="{{ route('dashboard.reports')  }}"><strong>Reports</strong></a>
                @endif
                {{-- <a class="dropdown-item" href="/dashboard/invoices">{{ __('dashboard/navbar.invoices') }}</a> --}}
                <a class="dropdown-item + is-spendings" href="{{ route('dashboard.spendings') }}">
                    <span class="dropdown-item__text">{{ __('dashboard/navbar.spendings') }}</span>
                    <span class="dropdown-item__badges">
                        <span class="badge badge-primary + is-progress" title="Progress" data-toggle="tooltip" data-href="{{ route('dashboard.spendings.progress') }}">
                            ${{ $spending_amounts->progress }}
                        </span>
                        <span class="badge badge-warning + is-review" title="Review" data-toggle="tooltip" data-href="{{ route('dashboard.spendings.review') }}">
                            ${{ $spending_amounts->review }}
                        </span>
                        <span class="badge badge-secondary + is-escrow" title="Escrow" data-toggle="tooltip" data-href="{{ route('dashboard.spendings.escrow') }}">
                            ${{ $spending_amounts->escrow }}
                        </span>
                    </span>
                </a>
                <a class="dropdown-item + is-earnings" href="{{ route('dashboard.earnings') }}">
                    <span class="dropdown-item__text">{{ __('dashboard/navbar.earnings') }}</span>
                    <span class="dropdown-item__badges">
                        <span class="badge badge-primary + is-progress" title="Progress" data-toggle="tooltip" data-href="{{ route('dashboard.earnings.progress') }}">
                            ${{ $earning_amounts->progress }}
                        </span>
                        <span class="badge badge-warning + is-review" title="Review" data-toggle="tooltip" data-toggle="tooltip" data-href="{{ route('dashboard.earnings.review') }}">
                            ${{ $earning_amounts->review }}
                        </span>
                        <span class="badge badge-secondary + is-escrow" title="Escrow" data-toggle="tooltip" data-toggle="tooltip" data-href="{{ route('dashboard.earnings.escrow') }}">
                            ${{ $earning_amounts->escrow }}
                        </span>
                        <span class="badge badge-success + is-available" title="Available" data-toggle="tooltip" data-toggle="tooltip" data-href="{{ route('dashboard.earnings.available') }}">
                            ${{ $earning_amounts->available }}
                        </span>
                    </span>
                </a>
                @if (!app()->environment('production'))
                    <a class="dropdown-item" href="{{ route('dashboard.reports.invoices')  }}">{{ __('dashboard/navbar.invoices') }}</a>
                @endif
                <a class="dropdown-item" href="{{ route('dashboard.billing') }}">{{ __('dashboard/navbar.billing') }}</a>
                <hr class="my-1">
                <a class="dropdown-item" href="{{ route('dashboard.referrals') }}">
                    {{ __('dashboard/navbar.my_referrals') }}
                    <span class="dropdown-item__badges">
                        <span class="badge badge-success" title="Completed" data-toggle="tooltip">{{ $count_of_referral_connections->completed }}</span>
                        <span class="badge badge-primary" title="Total" data-toggle="tooltip">{{ $count_of_referral_connections->total }}</span>
                    </span>
                </a>
                <hr class="my-1">
                <a class="dropdown-item justify-content-start" href="{{ route('download_app') }}">
                    <img src="{{ asset_no_cache('img/down-arrow-download-button.svg') }}" alt="" style="width: 18px; opacity: 0.5; margin-right: 9px;">
                    {{ __('dashboard/navbar.download_time_tracker_app') }}
                </a>
                <hr class="my-1">
                <a class="dropdown-item" href="{{ route('logout') }}">{{ __('dashboard/navbar.log_out') }}</a>
            </div>
        </div>
        <!-- / User Dropdown -->
    </div>
</nav>

<!-- Modal -->
<div class="modal fade" id="open_tour" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Tour Overview</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" style="padding: 40px 80px;">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="employeer-tab" data-toggle="tab" href="#employeer" role="tab" aria-controls="employeer" aria-selected="true">Employer</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="freelancer-tab" data-toggle="tab" href="#freelancer" role="tab" aria-controls="freelancer" aria-selected="false">Freelancer</a>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="employeer" role="tabpanel" aria-labelledby="employeer-tab">
                        <div class="accordion pl-5 position-relative" id="accordionExample">
                            <div class="line" style="width: 5px; background: #cac5c5; position:absolute; top: 35px; bottom: 35px; left: 12px;"></div>
                            <div class="card" style="overflow: visible;">
                                <div class="card-header position-relative rounded-top" id="headingOne">
                                    <div class="dot rounded-circle" style="width: 20px; height: 20px; background: #cac5c5; position:absolute; top: calc( 50% - 10px ); left: -43px;"></div>
                                    <h2 class="mb-0">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                Collapsible Group Item #1
                                            </button>
                                            <button class="btn btn-primary">Show me</button>
                                        </div>
                                    </h2>
                                </div>

                                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                    <div class="card-body">
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                    </div>
                                </div>
                            </div>
                            <div class="card" style="overflow: visible;">
                                <div class="card-header position-relative" id="headingTwo">
                                    <div class="dot rounded-circle" style="width: 20px; height: 20px; background: #cac5c5; position:absolute; top: calc( 50% - 10px ); left: -43px;"></div>
                                    <h2 class="mb-0">
                                        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            Collapsible Group Item #2
                                        </button>
                                    </h2>
                                </div>
                                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                    <div class="card-body">
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                    </div>
                                </div>
                            </div>
                            <div class="card" style="overflow: visible;">
                                <div class="card-header" id="headingThree">
                                    <div class="dot rounded-circle" style="width: 20px; height: 20px; background: #cac5c5; position:absolute; top: calc( 50% - 10px ); left: -43px;"></div>
                                    <h2 class="mb-0">
                                        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            Collapsible Group Item #3
                                        </button>
                                    </h2>
                                </div>
                                <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                                    <div class="card-body">
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="freelancer" role="tabpanel" aria-labelledby="freelancer-tab">Freelancer</div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="for_develop1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header border-0">
                <h5 class="modal-title  text-center w-100" id="exampleModalLabel">Lorem ipsum dolor.</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="col-lg-12">
                    <div class="row">
                        <div class="col-lg-4 d-flex flex-column align-items-center justify-content-between">
                        </div>
                        <div class="col-lg-4 d-flex flex-column align-items-center justify-content-between">
                            <div class="circle rounded-circle bg-secondary mb-4" style="width: 40px; height: 40px;"></div>
                            <div class="d-flex flex-column align-items-center">
                                <span>Standard</span>
                                <span class="d-block mt-2"><small>Free</small></span>
                            </div>
                        </div>
                        <div class="col-lg-4 d-flex flex-column align-items-center justify-content-between">
                            <div class="circle rounded-circle bg-secondary mb-4" style="width: 40px; height: 40px;"></div>
                            <div class="d-flex flex-column align-items-center">
                                <small>30 Days Remaining</small>
                                <span>Premium</span>
                                <button class="btn btn-primary btn-sm mt-2" data-dismiss="modal" data-toggle="modal" data-target="#upgrade">Estimate Pricing</button>
                                <span class="d-block mt-2"><small>starting at $8/month</small></span> <span class="text-secondary">Price in USD</span>
                            </div>
                        </div>
                    </div>
                    <div class="row pt-3">
                        <div class="col-4 px-0">
                            <div class="d-flex align-items-center border-bottom py-2 justify-content-center">
                                <img src="/img/true.png" width="20" alt="">
                                <span class="ml-2">Lorem ipsum dolor</span>
                            </div>
                            <div class="d-flex align-items-center border-bottom py-2 justify-content-center">
                                <img src="/img/true.png" width="20" alt="">
                                <span class="ml-2">Lorem ipsum dolor</span>
                            </div>
                            <div class="d-flex align-items-center border-bottom py-2 justify-content-center">
                                <img src="/img/true.png" width="20" alt="">
                                <span class="ml-2">Lorem ipsum dolor</span>
                            </div>
                            <div class="d-flex align-items-center border-bottom py-2 justify-content-center">
                                <img src="/img/true.png" width="20" alt="">
                                <span class="ml-2">Lorem ipsum dolor</span>
                            </div>
                            <div class="d-flex align-items-center border-bottom py-2 justify-content-center">
                                <img src="/img/true.png" width="20" alt="">
                                <span class="ml-2">Lorem ipsum dolor</span>
                            </div>
                        </div>
                        <div class="col-4 px-0">
                            <div class="d-flex align-items-center border-bottom py-2 justify-content-center">
                                <img src="/img/true.png" width="20" alt="">
                                <span class="ml-2">Lorem ipsum dolor</span>
                            </div>
                            <div class="d-flex align-items-center border-bottom py-2 justify-content-center">
                                <img src="/img/true.png" width="20" alt="">
                                <span class="ml-2">Lorem ipsum dolor</span>
                            </div>
                            <div class="d-flex align-items-center border-bottom py-2 justify-content-center">
                                <img src="/img/true.png" width="20" alt="">
                                <span class="ml-2">Lorem ipsum dolor</span>
                            </div>
                            <div class="d-flex align-items-center border-bottom py-2 justify-content-center">
                                <img src="/img/true.png" width="20" alt="">
                                <span class="ml-2">Lorem ipsum dolor</span>
                            </div>
                            <div class="d-flex align-items-center border-bottom py-2 justify-content-center">
                                <img src="/img/true.png" width="20" alt="">
                                <span class="ml-2">Lorem ipsum dolor</span>
                            </div>
                        </div>
                        <div class="col-4 px-0">
                            <div class="d-flex align-items-center border-bottom py-2 justify-content-center">
                                <img src="/img/true.png" width="20" alt="">
                                <span class="ml-2">Lorem ipsum dolor</span>
                            </div>
                            <div class="d-flex align-items-center border-bottom py-2 justify-content-center">
                                <img src="/img/true.png" width="20" alt="">
                                <span class="ml-2">Lorem ipsum dolor</span>
                            </div>
                            <div class="d-flex align-items-center border-bottom py-2 justify-content-center">
                                <img src="/img/true.png" width="20" alt="">
                                <span class="ml-2">Lorem ipsum dolor</span>
                            </div>
                            <div class="d-flex align-items-center border-bottom py-2 justify-content-center">
                                <img src="/img/true.png" width="20" alt="">
                                <span class="ml-2">Lorem ipsum dolor</span>
                            </div>
                            <div class="d-flex align-items-center border-bottom py-2 justify-content-center">
                                <img src="/img/true.png" width="20" alt="">
                                <span class="ml-2">Lorem ipsum dolor</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
