@extends('dashboard.layout')
@section('content')
    <div class="container">
        <div class="d-flex pt-3">
            <h3 class="[ page-title ]">{!! __('dashboard/billing.billing') !!}</h3>
            @if (!app()->environment('production'))
                <div class="dropdown ml-3"><button type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn btn-light dropdown-toggle border-0 d-flex align-items-center"><span class="d-inline-flex align-items-center mr-2"><span class="rounded-circle overflow-hidden" style="font-size: 0px;"><img src="/img/avatar.png" width="15" alt=""></span> <span class="ml-2">Team Name</span></span></button>
                    <div aria-labelledby="dropdownMenuButton" class="dropdown-menu border-0 shadow"><a class="dropdown-item d-flex align-items-center"><span class="rounded-circle overflow-hidden" style="font-size: 0px;"><img src="/img/avatar.png" width="15" alt=""></span> <span class="ml-2">Team Name</span></a> <a class="dropdown-item d-flex align-items-center"><span class="rounded-circle overflow-hidden" style="font-size: 0px;"><img src="/img/avatar.png" width="15" alt=""></span> <span class="ml-2">Team Name</span></a> <a class="dropdown-item d-flex align-items-center"><span class="rounded-circle overflow-hidden" style="font-size: 0px;"><img src="/img/avatar.png" width="15" alt=""></span> <span class="ml-2">Team Name</span></a></div>
                </div>
            @endif
        </div>
        <div class="[ billing ]">
            <div class="[ credit-cards-payouts ] row">
                <div class="col-md-6">
                    <div class="[ billing__credit-cards ]">
                        <div class="[ billing__credit-cards__header ]">
                            <h4 class="[ billing__credit-cards__title ]">{!! __('dashboard/billing.credit_cards') !!}</h4>
                            <button class="[ billing__credit-cards__add-new-card ] btn btn-primary" data-toggle="modal" data-target="#add-new-card">{!! __('dashboard/billing.add_card') !!}</button>
                        </div>
                        <ul class="[ billing__credit-cards__list ]">
                            @forelse ($user_cards as $card)
                                <li data-id="{{ $card->id }}" class="[ billing__credit-cards__list-item ] card-item">
                                    <div class="[ billing__credit-cards__list-item__type ]">
                                        <img class="[ billing__credit-cards__item-image ]" src="{{ asset_no_cache('img/dashboard/' . Str::kebab($card->brand) . '.svg') }}" alt="">
                                        <div class="[ billing__credit-cards__item-number ]">**** {{ $card->last4 }}</div>
                                    </div>
                                    @if ($card->is_default)
                                        <p class="[ billing__credit-cards__list-item__primary-card ]">{!! __('dashboard/billing.primary_card') !!}</p>
                                    @else
                                        <button data-id="{{ $card->id }}" class="[ billing__credit-cards__list-item__make-primary-button ] make-primary-card" data-toggle="modal" data-target="#make-primary-credit-card">
                                            {!! __('dashboard/billing.make_primary') !!}
                                        </button>
                                        <button data-id="{{ $card->id }}" class="[ billing__credit-cards__list-item__delete-button ] delete-card" data-toggle="modal" data-target="#delete-card">
                                            <img src="/img/dashboard/delete.svg" alt="">
                                        </button>
                                    @endif
                                </li>
                            @empty
                                <li class="[ billing__credit-cards__list-item ]">
                                    <div class="[ billing__credit-cards__list-item__type ]">
                                        <div class="[ billing__credit-cards__item-number ]">{!! __('dashboard/billing.not_have_cards') !!}</div>
                                    </div>
                                </li>
                            @endforelse
                        </ul>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="[ billing__credit-cards ]">
                        <div class="[ billing__credit-cards__header ]">
                            <h4 class="[ billing__credit-cards__title ]">{!! __('dashboard/billing.payout_methods') !!}</h4>
                            <button class="[ billing__credit-cards__add-new-card ] btn btn-primary" data-toggle="modal" data-target="#add-new-payout-method">
                                {!! __('dashboard/billing.add_payout_method') !!}
                            </button>
                        </div>
                        <ul class="[ billing__credit-cards__list ]">
                            @forelse($user_payout_methods as $payout_method)
                                <li data-id="{{ $payout_method->id }}" class="[ billing__credit-cards__list-item ] payout-method-item">
                                    <div class="[ billing__credit-cards__list-item__type ]">
                                        @if ($payout_method->type == 'PAYPAL')
                                            <img class="[ billing__credit-cards__item-image ]" src="{{ asset_no_cache('img/dashboard/paypal.svg') }}" alt="">
                                        @elseif ($payout_method->type == 'PAYONEER')
                                            <img class="[ billing__credit-cards__item-image ]" src="{{ asset_no_cache('img/dashboard/payoneer.svg') }}" alt="" style="width: 50px;">
                                        @endif
                                        <div class="[ billing__credit-cards__item-number ]">{{ $payout_method->identifier }}</div>
                                    </div>
                                    @if ($payout_method->is_default)
                                        <p class="[ billing__credit-cards__list-item__primary-card ]">{!! __('dashboard/billing.primary_method') !!}</p>
                                    @else
                                        <button data-id="{{ $payout_method->id }}" class="[ billing__credit-cards__list-item__make-primary-button ] make-primary-payout-method" data-toggle="modal" data-target="#make-primary-payout-method">
                                            {!! __('dashboard/billing.make_primary') !!}
                                        </button>
                                        <button data-id="{{ $payout_method->id }}" class="[ billing__credit-cards__list-item__delete-button ] delete-payout-method" data-toggle="modal" data-target="#delete-payout-method">
                                            <img src="/img/dashboard/delete.svg" alt="">
                                        </button>
                                    @endif
                                </li>
                            @empty
                                <li class="[ billing__credit-cards__list-item ]">
                                    <div class="[ billing__credit-cards__list-item__type ]">
                                        <div class="[ billing__credit-cards__item-number ]">
                                            {!! __('dashboard/billing.not_have_methods') !!}
                                        </div>
                                    </div>
                                </li>
                            @endforelse
                        </ul>
                    </div>
                </div>
            </div>
            <div class="[ active-plans ] row d-none">
                <div class="col-md-12">
                    <div class="[ billing__active-plan-addons ]">
                        <div class="[ billing__active-plan-addons__header ]">
                            <h4 class="[ billing__active-plan-addons__title ]">{!! __('dashboard/billing.active_plan_addons') !!}</h4>
                            <form action="">
                                <select class="[ select-list ] custom-select" name="" id="">
                                    <option value="" selected>{!! __('dashboard/billing.select_company') !!}</option>
                                    <option value="">Company Name</option>
                                    <option value="">Company Name</option>
                                </select>
                            </form>
                        </div>
                        <ul class="[ billing__active-plan-addons__list ]">
                            <li class="billing__active-plan-addons__list-item">
                                <h4 class="[ billing__active-plan-addons__item-name ]">Free Plan</h4>
                                <p class="[ billing__active-plan-addons__item-price ]">$0 per month</p>
                            </li>
                            <li class="billing__active-plan-addons__list-item">
                                <h4 class="[ billing__active-plan-addons__item-name ]">Starter Plan</h4>
                                <p class="[ billing__active-plan-addons__item-price ]">$2 per month</p>
                            </li>
                        </ul>
                        <button class="[ billing__active-plan-addons__chose-plan-button ] btn btn-primary">
                            Choose Plan
                        </button>
                    </div>
                </div>
            </div>
            <div class="[ billing-people ] d-none">
                <div class="[ billing-people__header ]">
                    <div class="row">
                        <div class="col-md-4">
                            <h4 class="[ billing-people__header-escrow ]">Escrow <span>$483 USD</span><img src="/img/dashboard/help-icon.svg" alt=""></h4>
                        </div>
                        <div class="col-md-8">
                            <form class="[ billing-people__header-filter ]" action="">
                                <div class="form-group">
                                    <input class="[ person-filter-input ] form-control" type="text" placeholder="Type person">
                                </div>
                                <select class="[ select-list ] custom-select" name="" id="">
                                    <option value="">People List</option>
                                </select>
                                <select class="[ select-project ] custom-select" name="" id="">
                                    <option value="">Project</option>
                                </select>
                                <button class="[ from-date-filter ] btn btn-primary">From Date Filter</button>
                                <button class="[ to-date-filter ] btn btn-primary">To Date Filter</button>
                            </form>
                        </div>
                    </div>
                </div>
                <ul class="[ billing-people__users ]">
                    <li class="[ billing-people__user ]">
                        <p class="[ billing-people__payment-date ]">5th, June, 2019</p>
                        <p class="[ billing-people__payment-id ]">
                            Payment
                            <a href="">934</a>
                        </p>
                        <p class="[ billing-people__payment-user ]">
                            From :
                            <a href="">Mark Bruk</a>
                        </p>
                        <p class="[ billing-people__payment-view-card ]">
                            View
                            <img src="/img/dashboard/mastercard.svg" alt="">
                        </p>
                        <p class="[ billing-people__payment-clear ]">Clears in 3 days</p>
                        <p class="[ billing-people__payment-amount ]">$437 USD</p>
                    </li>
                    <li class="[ billing-people__user ]">
                        <p class="[ billing-people__payment-date ]">5th, June, 2019</p>
                        <p class="[ billing-people__payment-id ]">
                            Payment
                            <a href="">934</a>
                        </p>
                        <p class="[ billing-people__payment-user ]">
                            From :
                            <a href="">Mark Bruk</a>
                        </p>
                        <p class="[ billing-people__payment-view-card ]">
                            View
                            <img src="/img/dashboard/mastercard.svg" alt="">
                        </p>
                        <p class="[ billing-people__payment-clear ]">Clears in 3 days</p>
                        <p class="[ billing-people__payment-amount ]">$437 USD</p>
                    </li>
                </ul>
            </div>
            <div class="[ billing-people ] d-none">
                <div class="[ billing-people__header ]">
                    <div class="row">
                        <div class="col-md-4">
                            <h4 class="[ billing-people__header-payments ]">Payments<img src="/img/dashboard/help-icon.svg" alt=""></h4>
                            <p class="[ billing-people__header-date-range ]">From 5th June 2019 to 21 June 2019
                            </p>
                        </div>
                        <div class="col-md-8">
                            <form class="[ billing-people__header-filter ]" action="">
                                <div class="form-group">
                                    <input class="[ person-filter-input ] form-control" type="text" placeholder="Type person">
                                </div>
                                <select class="[ select-list ] custom-select" name="" id="">
                                    <option value="">People List</option>
                                </select>
                                <select class="[ select-project ] custom-select" name="" id="">
                                    <option value="">Project</option>
                                </select>
                                <button class="[ from-date-filter ] btn btn-primary">From Date Filter</button>
                                <button class="[ to-date-filter ] btn btn-primary">To Date Filter</button>
                            </form>
                        </div>
                    </div>
                </div>
                <ul class="[ billing-people__users ]">
                    <li class="[ billing-people__user ]">
                        <p class="[ billing-people__payment-date ]">5th, June, 2019</p>
                        <p class="[ billing-people__payment-id ]">
                            Payment
                            <a href="">934</a>
                        </p>
                        <p class="[ billing-people__payment-user ]">
                            From :
                            <a href="">Mark Bruk</a>
                        </p>
                        <p class="[ billing-people__payment-view-card ]">
                            View
                            <img src="/img/dashboard/paypal.svg" alt="">
                        </p>
                        <p class="[ billing-people__payment-clear ]">Clears in 3 days</p>
                        <p class="[ billing-people__payment-amount ]">$437 USD</p>
                    </li>
                    <li class="[ billing-people__user ]">
                        <p class="[ billing-people__payment-date ]">5th, June, 2019</p>
                        <p class="[ billing-people__payment-id ]">
                            Payment
                            <a href="">934</a>
                        </p>
                        <p class="[ billing-people__payment-user ]">
                            From :
                            <a href="">Mark Bruk</a>
                        </p>
                        <p class="[ billing-people__payment-view-card ]">
                            View
                            <img src="/img/dashboard/payoneer-logo.svg" alt="">
                        </p>
                        <p class="[ billing-people__payment-clear ]">Clears in 3 days</p>
                        <p class="[ billing-people__payment-amount ]">$437 USD</p>
                    </li>
                </ul>
            </div>
        </div>
        @if (!app()->environment('production'))
            <ul class="nav nav-tabs" id="billingTabs" role="tablist">
                <li class="nav-item d-none">
                    <a class="nav-link" id="transactions-tab" data-toggle="tab" href="#transactions" role="tab" aria-controls="transactions" aria-selected="true">Transactions</a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" id="cards-tab" data-toggle="tab" href="#cards" role="tab" aria-controls="cards" aria-selected="false">Cards</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="billing_payouts-tab" data-toggle="tab" href="#billing_payouts" role="tab" aria-controls="billing_payouts" aria-selected="false">Payouts</a>
                </li>
                <li class="nav-item d-none">
                    <a class="nav-link" id="billing_plan_details-tab" data-toggle="tab" href="#billing_plan_details" role="tab" aria-controls="billing_plan_details" aria-selected="false">Plan Details</a>
                </li>
                <li class="nav-item d-none">
                    <a class="nav-link" id="users_on_plan-tab" data-toggle="tab" href="#users_on_plan" role="tab" aria-controls="users_on_plan" aria-selected="false">Users on Plan</a>
                </li>
            </ul>
            <div class="tab-content" id="billingTabsContent">
                <div class="tab-pane fade d-none" id="transactions" role="tabpanel" aria-labelledby="transactions-tab">
                    <div class="d-flex justify-content-between align-items-center pt-3">
                        <div class="btn-group"><button class="btn btn-primary">0 Recieved</button> <button class="btn btn-outline-primary">1 Sent</button></div>
                        <div class="d-flex align-items-center">
                            <div class="input-group mb-lg-0 mb-2 mr-lg-2 w-100 w-md-auto">
                                <div class="input-group-prepend border-0"><span id="inputGroupPrepend2" class="input-group-text border-0 bg-white"><img src="/img/search_black.svg" alt="" width="15" style="opacity: 0.3;"></span></div> <input type="text" id="validationDefaultUsername" placeholder="Filter" aria-describedby="Filter" required="required" class="form-control border-0">
                            </div> <strong class="ml-2 mr-2 text-nowrap">Filter by</strong>
                            <div class="form-group mb-0"><select class="form-control">
                                    <option>Date Range</option>
                                    <option>Date Range</option>
                                    <option>Date Range</option>
                                    <option>Date Range</option>
                                    <option>Date Range</option>
                                </select></div>
                        </div>
                    </div>
                    <div class="col-12 mt-4 mb-2">
                        <div class="row justify-content-between align-items-center">
                            <div class="col-lg-10 p-0">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="col-1 p-0 text-center"><strong class="text-secondary text-uppercase">id</strong></div>
                                    <div class="col-1 p-0 text-center"><strong class="text-secondary">Paid</strong></div>
                                    <div class="col-3 p-0 text-center"><strong class="text-secondary">Date Paid</strong></div>
                                    <div class="col-3 p-0 text-center"><strong class="text-secondary">Date Booked</strong></div>
                                    <div class="col-2 p-0 text-center"><strong class="text-secondary">Booked Time</strong></div>
                                    <div class="col-2 p-0 text-center"><strong class="text-secondary">From</strong></div>
                                </div>
                            </div>
                            <div class="col-lg-2 p-0">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="col-6 p-0 text-center"><strong class="text-secondary">Status</strong></div>
                                    <div class="col-6 p-0 text-center"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 mt-4 mb-2">
                        <div class="row justify-content-between align-items-center">
                            <div class="col-lg-10 p-0">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="col-1 p-0 text-center"><span class="text-secondary text-uppercase">24439</span></div>
                                    <div class="col-1 p-0 text-center"><span class="d-flex align-items-center justify-content-center"><span class="mr-1">$55</span> <span style="font-size: 0px;"><img src="/img/info.svg" width="13" alt=""></span></span></div>
                                    <div class="col-3 p-0 text-center"><span class="text-secondary">9h11 GMT-4 12 Jan 2014</span></div>
                                    <div class="col-3 p-0 text-center"><span class="text-secondary">9h11 GMT-4 12 Jan 2014</span></div>
                                    <div class="col-2 p-0 text-center"><span class="text-secondary">30 mins</span></div>
                                    <div class="col-2 p-0 text-center"><span class="text-secondary">Mark Bruk</span></div>
                                </div>
                            </div>
                            <div class="col-lg-2 p-0">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="col-6 p-0 text-center"><span class="text-secondary">Paid</span></div>
                                    <div class="col-6 p-0 text-center"><button class="btn btn-secondary btn-block btn-sm">Refund</button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade show active" id="cards" role="tabpanel" aria-labelledby="cards-tab">
                    <div class="col-12 mt-2 mb-4 pt-2">
                        <div class="row justify-content-between align-items-center"><strong>Manage Credit Cards</strong>
    {{--                        <button data-toggle="modal" data-target="#add_card_billing" class="btn btn-primary">Add Card</button>--}}
                            <button class="[ billing__credit-cards__add-new-card ] btn btn-primary" data-toggle="modal" data-target="#add-new-card">{!! __('dashboard/billing.add_card') !!}</button>
                        </div>
                    </div>
                    <div class="col-12 mt-4 mb-2">
                        <div class="row justify-content-between align-items-center">
                            <div class="col-3 pl-0"><strong class="text-secondary">Expires</strong></div>
                            <div class="col-3 text-center"><strong class="text-secondary">Number</strong></div>
                            <div class="col-3"><strong class="text-secondary text-center">Card Type</strong></div>
                            <div class="col-3 pr-0 text-right"></div>
                        </div>
                    </div>
                    <div class="col-12 allcards" >
    {{--                    <div class="row justify-content-between align-items-center mb-2">--}}
    {{--                        <div class="col-3 pl-0">--}}
    {{--                            <div class="col-12">--}}
    {{--                                <div class="row align-items-center"><img src="/img/true.png" width="20" alt=""> <span class="ml-2">Aug 22, 2020 (in 34 days)</span></div>--}}
    {{--                            </div>--}}
    {{--                        </div>--}}
    {{--                        <div class="col-3 text-center"><span>****7432</span></div>--}}
    {{--                        <div class="col-3 text-center">--}}
    {{--                            <div class="col-12">--}}
    {{--                                <div class="row align-items-center"><img src="/img/visa.png" width="20" alt=""> <span class="ml-2">VISA</span></div>--}}
    {{--                            </div>--}}
    {{--                        </div>--}}
    {{--                        <div class="col-3 pr-0 text-right"><button type="button" data-toggle="modal" data-target="#set_as_default" class="btn btn-sm btn-primary mt-2">Set as Default</button> <button type="button" data-toggle="modal" data-target="#remove_card" class="btn btn-sm btn-secondary ml-2 mt-2">Remove</button></div>--}}
    {{--                    </div>--}}
                        @forelse ($user_cards as $card)
                        <div class="row justify-content-between align-items-center onecard" data-id="{!! $card->id !!}">
                            <div class="col-3 pl-0">
                                <div class="col-12">
    
                                    <div class="row align-items-center"><img src="/img/true.png" width="20" alt=""> <span class="ml-2">{!! date('M,Y',strtotime($card->expiration_month.'/1/'.$card->expiration_year)) !!}</span></div>
                                </div>
                            </div>
                            <div class="col-3 text-center"><span>****{!! $card->last4 !!}</span></div>
                            <div class="col-3 text-center">
                                <div class="col-12">
                                    <div class="row align-items-center"><img src="{{ asset_no_cache('img/dashboard/' . Str::kebab($card->brand) . '.svg') }}" width="20" alt="">
                                        <span class="ml-2">{!! $card->brand !!}</span>
                                        @if($card->is_default == 1)
                                            <span data-toggle="tooltip" data-placement="top" title="" data-original-title="Tooltip on top" class="badge badge-sm badge-success ml-2">Currently Default</span>
                                        @endif
                                    </div>
                                </div>
                            </div>
                            <div class="col-3 pr-0 text-right">
                                @if($card->is_default == 0)
                                    <button data-id='{!! $card->id !!}' data-last4="{!! $card->last4 !!}" type="button" data-toggle="modal" data-target="#remove_card" class="btn btn-sm btn-secondary removeCreditCardButton">Remove</button>
                                @endif
                            </div>
                        </div>
                        @empty
                            {!! __('dashboard/billing.not_have_cards') !!}
                        @endforelse
                    </div>
                    <hr> <span>You did not add any credit cards yet.</span>
                    <div id="add_card_billing" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" class="modal fade" style="display: none;">
                        <div role="document" class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 id="exampleModalLabel" class="modal-title">Add new Credit Card</h5> <button type="button" data-dismiss="modal" aria-label="Close" class="close"><span aria-hidden="true">×</span></button>
                                </div>
                                <div class="modal-body">
                                    <div class="col-lg-12 pt-4 mb-3">
                                        <div class="row">
                                            <div class="form-group w-100 mb-0"><input type="text" placeholder="Card number" class="form-control"></div>
                                        </div>
                                    </div>
                                    <div class="col-lg-12 mb-3">
                                        <div class="row">
                                            <div class="form-group w-100 mb-0"><input type="text" placeholder="Name on card" class="form-control"></div>
                                        </div>
                                    </div>
                                    <div class="col-lg-12 mb-3">
                                        <div class="row">
                                            <div class="col-lg-6 pl-0">
                                                <div class="form-group w-100 mb-0"><input type="text" placeholder="MM / YY" class="form-control"></div>
                                            </div>
                                            <div class="col-lg-6 pr-0">
                                                <div class="form-group w-100 mb-0"><input type="text" placeholder="CVC" class="form-control"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer"><button type="button" data-dismiss="modal" class="btn btn-secondary">Add Card</button></div>
                            </div>
                        </div>
                    </div>
                    <div id="set_as_default" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" class="modal fade" style="display: none;" aria-hidden="true">
                        <div role="document" class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 id="exampleModalLabel" class="modal-title">Change Default Card</h5> <button type="button" data-dismiss="modal" aria-label="Close" class="close"><span aria-hidden="true">×</span></button>
                                </div>
                                <div class="modal-body">
                                    <div class="text-center">This will set the card ending with <strong>****4483</strong> as your default payment method.</div>
                                </div>
                                <div class="modal-footer"><button type="button" data-dismiss="modal" class="btn btn-secondary">Close</button> <button type="button" class="btn btn-primary">Make Default</button></div>
                            </div>
                        </div>
                    </div>
                    <div id="remove_card" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" class="modal fade" style="display: none;" aria-hidden="true">
                        <div role="document" class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 id="exampleModalLabel" class="modal-title">Remove Card</h5> <button type="button" data-dismiss="modal" aria-label="Close" class="close"><span aria-hidden="true">×</span></button>
                                </div>
                                <div class="modal-body">
                                    <div class="text-left">Remove the card ending with <strong>****<span class="last4card"></span></strong>?</div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" data-dismiss="modal" class="btn btn-secondary">Close</button>
                                    <button type="button" data-dismiss="modal" class="btn btn-primary removeCreditCardbtn">Remove Card</button></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade pb-3" id="billing_payouts" role="tabpanel" aria-labelledby="billing_payouts-tab">
                    <div class="col-12 mt-2 mb-4 pt-2">
                        <div class="row justify-content-between align-items-center"><strong>Payout methods</strong> <button data-toggle="modal" data-target="#add-new-payout-method" class="[ billing__credit-cards__add-new-card ] btn btn-primary">Add Payout Method</button></div>
                    </div> <span>When you receive a payment for a reservation, we call that payment to you a "payout". Our secure payment system supports several payout methods, which can be set up below. <a href="#">Go to FAQ</a>.</span>
                    <div class="card mt-4">
                        <div class="card-body">
                            <div class="col-lg-12">
                                <div class="row">
                                    <div class="col-1 d-md-block d-none p-0"><img src="/img/idea.svg" width="100%" alt=""></div>
                                    <div class="col-12 col-md-11"><strong class="d-block mb-2">You’ve successfully added a payout method</strong> <span>It’ll take up to 5 business days for us to verify it. Once its status is set to "Ready", we’ll pay you through this payout method.</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    @forelse($user_payout_methods as $payout_method)
                    <div class="col-lg-12">
                        <div class="row justify-content-between align-items-center">
                            <div class="col-1">
                                @if ($payout_method->type == 'PAYPAL')
                                    <img src="{{ asset_no_cache('img/dashboard/paypal.svg') }}" alt="">
                                @elseif ($payout_method->type == 'PAYONEER')
                                    <img src="{{ asset_no_cache('img/dashboard/payoneer.svg') }}" alt="">
                                @endif
                            </div>
                            <div class="col-7">
                                <div class="row mx-0 mb-1 align-items-center">
                                    <span>{!! $payout_method->type !!}</span>
                                   @if( $payout_method->is_default == 1)
                                        <span class="badge badge-primary ml-2">Default</span>
                                    @endif
    
                                    @if(strtotime('now') < strtotime($payout_method->created_at) + 432000 )
                                        <span class="badge badge-warning ml-2">Pending</span>
                                    @endif
                                </div>
                                <strong>{!!  $payout_method->identifier !!}</strong>
                            </div>
                            <div class="col-4 d-flex justify-content-end">
                                <div class="dropdown dropleft">
                                    @if($payout_method->is_default == 0)
    
                                    <button type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn btn-secondary d-flex align-items-center">
                                        <span>...</span>
                                    </button>
    
                                    <div aria-labelledby="dropdownMenuButton" class="dropdown-menu" style="">
                                            <a href="#" data-id="{{ $payout_method->id }}" class="[ dropdown-item ] make-primary-payout-method" data-toggle="modal" data-target="#make-primary-payout-method" >Make Primary</a>
                                            <a href="#" data-id="{{ $payout_method->id }}" class="[ dropdown-item ] delete-payout-method" data-toggle="modal" data-target="#delete-payout-method">Remove</a>
    
                                    </div>
                                    @endif
    
                                </div>
                            </div>
                        </div>
    
    {{--                    <div class="row justify-content-between align-items-center">--}}
    {{--                        <div class="col-1"><img src="/img/paypal.svg" width="100%" alt=""></div>--}}
    {{--                        <div class="col-7">--}}
    {{--                            <div class="row mx-0 mb-1 align-items-center">--}}
    {{--                                <span>{!!$payout_method->type !!}</span>--}}
    {{--                                @if( $payout_method->is_default == 1) <span class="badge badge-primary ml-2">Default</span>--}}
    {{--                                @endif--}}
    {{--                                <span class="badge badge-warning ml-2">Pending</span>--}}
    {{--                            </div>--}}
    {{--                            <strong>{!!  $payout_method->identifier !!}</strong>--}}
    {{--                        </div>--}}
    {{--                        <div class="col-4 d-flex justify-content-end">--}}
    {{--                            <div class="dropdown dropleft"><button type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn btn-secondary d-flex align-items-center"><span>...</span></button>--}}
    {{--                                <div aria-labelledby="dropdownMenuButton" class="dropdown-menu" style=""><a href="#" class="dropdown-item">Action</a> <a href="#" class="dropdown-item">Another action</a> <a href="#" class="dropdown-item">Something else here</a></div>--}}
    {{--                            </div>--}}
    {{--                        </div>--}}
    {{--                    </div>--}}
    
                    </div>
                    @empty
                        <p>No data</p>
                    @endforelse
                    <div id="add_payout" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" class="modal fade">
                        <div role="document" class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 id="exampleModalLabel" class="modal-title">Add Payout Method</h5> <button type="button" data-dismiss="modal" aria-label="Close" class="close"><span aria-hidden="true">×</span></button>
                                </div>
                                <div class="modal-body">
                                    <div data-toggle="buttons" class="btn-group btn-group-toggle col-lg-12 p-0 flex-wrap mb-3"><label class="btn btn-outline-primary text-center rounded-0 p-3 w-25 active"><input checked="checked" type="radio" name="options"> <svg height="29" viewBox="0 0 46 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule: evenodd; clip-rule: evenodd; stroke-linejoin: round; stroke-miterlimit: 1.41421;">
                                            <g>
                                                <path d="M9.035,1.604c-0.165,-0.331 -0.426,-0.604 -0.75,-0.809c-0.338,-0.207 -0.737,-0.352 -1.193,-0.438c-0.464,-0.084 -1,-0.122 -1.621,-0.128l-2.867,0.002c-0.298,0.004 -0.59,0.236 -0.66,0.524l-1.929,8.402c-0.07,0.284 0.117,0.522 0.415,0.522l1.373,0c0.298,0 0.593,-0.231 0.659,-0.522l0.471,-2.04c0.063,-0.284 0.357,-0.521 0.658,-0.521l0.393,0c1.679,-0.002 2.979,-0.345 3.913,-1.032c0.939,-0.688 1.402,-1.597 1.402,-2.723c-0.001,-0.493 -0.082,-0.907 -0.264,-1.237Zm-2.961,2.745c-0.415,0.304 -0.992,0.456 -1.736,0.456l-0.336,0c-0.299,0 -0.482,-0.236 -0.417,-0.524l0.413,-1.784c0.058,-0.286 0.359,-0.523 0.654,-0.521l0.45,-0.003c0.525,0 0.926,0.091 1.194,0.267c0.265,0.174 0.398,0.451 0.396,0.818c0.008,0.558 -0.205,0.987 -0.618,1.291Z" style="fill-rule: nonzero;"></path>
                                                <path d="M15.656,2.805c-0.518,-0.292 -1.336,-0.438 -2.454,-0.438c-0.553,0 -1.104,0.043 -1.661,0.129c-0.411,0.063 -0.451,0.075 -0.704,0.13c-0.522,0.114 -0.604,0.635 -0.604,0.635l-0.168,0.691c-0.095,0.441 0.159,0.424 0.265,0.387c0.228,-0.068 0.355,-0.138 0.821,-0.242c0.445,-0.101 0.914,-0.177 1.286,-0.172c0.549,0 0.969,0.058 1.249,0.176c0.276,0.12 0.414,0.326 0.414,0.624l-0.024,0.194l-0.198,0.122c-0.779,0.049 -1.342,0.121 -2.025,0.22c-0.668,0.093 -1.254,0.256 -1.741,0.479c-0.523,0.23 -0.911,0.539 -1.182,0.932c-0.262,0.395 -0.393,0.874 -0.393,1.436c0,0.529 0.19,0.966 0.559,1.304c0.371,0.332 0.861,0.494 1.447,0.494c0.371,-0.002 0.658,-0.031 0.862,-0.08l0.665,-0.229l0.563,-0.312l0.518,-0.342l0.007,0.01l-0.052,0.22l-0.003,0.009l0,0.002c-0.056,0.268 0.106,0.488 0.367,0.514l0.005,0.006l1.275,0l0.018,-0.008c0.274,-0.032 0.531,-0.252 0.591,-0.514l1.001,-4.333l0.052,-0.353l0.024,-0.331c0.004,-0.614 -0.261,-1.069 -0.78,-1.36Zm-2.214,4.872l-0.214,0.282l-0.54,0.279c-0.254,0.103 -0.495,0.155 -0.718,0.155c-0.338,0 -0.603,-0.049 -0.782,-0.149l-0.265,-0.515c0,-0.279 0.064,-0.5 0.201,-0.67l0.582,-0.396c0.249,-0.084 0.553,-0.155 0.905,-0.204c0.314,-0.039 0.934,-0.11 1.015,-0.112l0.095,0.167c-0.019,0.095 -0.195,0.831 -0.279,1.163Z" style="fill-rule: nonzero;"></path>
                                                <path d="M40.594,2.811c-0.521,-0.292 -1.338,-0.439 -2.453,-0.439c-0.553,0 -1.105,0.043 -1.66,0.132c-0.412,0.06 -0.453,0.073 -0.707,0.127c-0.521,0.113 -0.602,0.636 -0.602,0.636l-0.168,0.69c-0.094,0.441 0.154,0.421 0.27,0.387c0.229,-0.068 0.352,-0.135 0.814,-0.243c0.443,-0.1 0.916,-0.174 1.289,-0.172c0.547,0 0.967,0.059 1.246,0.177c0.278,0.12 0.414,0.328 0.414,0.623l-0.021,0.193l-0.196,0.125c-0.787,0.047 -1.351,0.119 -2.027,0.218c-0.666,0.093 -1.254,0.255 -1.742,0.479c-0.521,0.231 -0.914,0.54 -1.182,0.934c-0.265,0.395 -0.394,0.873 -0.394,1.43c0,0.533 0.188,0.97 0.562,1.306c0.373,0.331 0.858,0.497 1.444,0.497c0.369,-0.004 0.656,-0.028 0.861,-0.081l0.663,-0.226l0.568,-0.312l0.514,-0.346l0.009,0.011l-0.047,0.222l-0.005,0.004l0.002,0.004c-0.062,0.268 0.101,0.49 0.365,0.514l0.002,0.005l1.274,0l0.021,-0.007c0.271,-0.033 0.527,-0.253 0.584,-0.518l1.004,-4.327l0.053,-0.355l0.029,-0.332c0.001,-0.612 -0.261,-1.065 -0.784,-1.356Zm-2.209,4.872l-0.223,0.285l-0.535,0.277c-0.254,0.102 -0.496,0.155 -0.715,0.155c-0.349,0 -0.607,-0.05 -0.781,-0.15l-0.268,-0.513c0,-0.28 0.065,-0.499 0.196,-0.672c0.133,-0.163 0.336,-0.297 0.588,-0.395c0.246,-0.084 0.55,-0.152 0.904,-0.203c0.312,-0.039 0.93,-0.112 1.01,-0.113l0.097,0.167c-0.014,0.095 -0.191,0.828 -0.273,1.162Z" style="fill-rule: nonzero;"></path>
                                                <path d="M33.969,1.635c-0.172,-0.333 -0.43,-0.602 -0.756,-0.812c-0.334,-0.208 -0.73,-0.354 -1.193,-0.438c-0.455,-0.081 -0.998,-0.125 -1.615,-0.126l-2.871,0.002c-0.299,0.005 -0.586,0.237 -0.655,0.522l-1.931,8.406c-0.07,0.285 0.122,0.521 0.414,0.521l1.375,-0.002c0.292,0.002 0.591,-0.232 0.66,-0.52l0.465,-2.041c0.068,-0.284 0.363,-0.523 0.66,-0.521l0.393,0c1.681,0 2.984,-0.346 3.922,-1.031c0.927,-0.693 1.396,-1.6 1.396,-2.727c-0.005,-0.491 -0.09,-0.906 -0.264,-1.233Zm-2.961,2.749c-0.414,0.298 -0.992,0.45 -1.732,0.45l-0.342,0c-0.295,0.003 -0.486,-0.237 -0.42,-0.523l0.416,-1.781c0.061,-0.285 0.359,-0.524 0.656,-0.521l0.445,-0.003c0.528,0.003 0.924,0.09 1.194,0.266c0.269,0.176 0.396,0.452 0.399,0.818c0.003,0.558 -0.204,0.988 -0.616,1.294Z" style="fill-rule: nonzero;"></path>
                                                <path d="M45.742,0.85c0.063,-0.287 -0.117,-0.52 -0.412,-0.516l-1.23,0c-0.252,0 -0.479,0.187 -0.59,0.417l-0.068,0.106l-0.062,0.272l-1.719,7.814l-0.056,0.24l0.002,0.006c-0.057,0.257 0.101,0.451 0.345,0.488l0.021,0.029l1.277,0c0.25,0 0.485,-0.19 0.592,-0.424l0.066,-0.1l1.838,-8.331l-0.004,-0.001Z" style="fill-rule: nonzero;"></path>
                                                <path d="M24.986,2.472c-0.325,0.004 -1.646,0 -1.646,0c-0.296,0 -0.676,0.239 -0.864,0.524c0,0 -1.966,3.374 -2.157,3.713l-0.228,-0.003l-0.612,-3.687c-0.068,-0.29 -0.371,-0.538 -0.748,-0.538l-1.23,0.002c-0.296,0 -0.478,0.236 -0.411,0.524c0,0 0.934,5.315 1.121,6.566c0.087,0.69 -0.011,0.813 -0.011,0.813l-1.216,2.118c-0.18,0.288 -0.083,0.523 0.212,0.523l1.422,-0.002c0.296,0 0.685,-0.233 0.861,-0.522l5.47,-9.252c0,0.001 0.526,-0.79 0.037,-0.779Z" style="fill-rule: nonzero;"></path>
                                            </g>
                                        </svg> <strong class="d-block mt-2">PayPal</strong></label> <label class="btn btn-outline-primary text-center rounded-0 p-3 w-25"><input type="radio" name="options"> <svg height="29" viewBox="0 0 49 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule: evenodd; clip-rule: evenodd; stroke-linejoin: round; stroke-miterlimit: 1.41421;">
                                            <g>
                                                <path d="M12.543,7.913c-0.498,-0.068 -0.993,-0.187 -1.492,-0.215c-0.977,-0.055 -1.919,0.117 -2.741,0.678c-1.31,0.894 -1.85,2.179 -1.787,3.73c0.029,0.738 0.318,1.365 1.022,1.689c0.712,0.326 1.415,0.219 2.029,-0.257c0.296,-0.229 0.529,-0.536 0.824,-0.844c-0.02,0.308 -0.031,0.601 -0.058,0.892c-0.018,0.182 0.044,0.252 0.231,0.245c0.363,-0.012 0.729,-0.012 1.092,0c0.197,0.007 0.242,-0.065 0.255,-0.257c0.04,-0.626 0.07,-1.256 0.172,-1.874c0.191,-1.16 0.427,-2.315 0.648,-3.473c0.033,-0.174 0.006,-0.285 -0.195,-0.314Zm-2.509,3.985c-0.105,0.163 -0.244,0.313 -0.393,0.438c-0.245,0.211 -0.534,0.301 -0.852,0.174c-0.316,-0.127 -0.43,-0.414 -0.449,-0.717c-0.065,-0.978 0.274,-1.803 1.025,-2.435c0.399,-0.336 0.874,-0.445 1.442,-0.287c-0.202,0.973 -0.216,1.973 -0.773,2.827Z"></path>
                                                <path d="M30.404,1.752c-0.807,-1.386 -2.658,-1.031 -2.658,-1.031c-0.147,0.033 -0.297,0.069 -0.446,0.097c-0.9,0.168 -1.748,0.477 -2.56,0.889c-1.765,0.894 -3.345,2.049 -4.765,3.415c-0.944,0.908 -1.861,1.848 -2.745,2.817c-1.552,1.703 -2.881,3.573 -3.943,5.624c-0.547,1.055 -1.035,2.141 -1.26,3.322c-0.042,0.217 0.028,0.467 0.098,0.687c0.03,0.086 0.19,0.153 0.302,0.188c0.03,0.008 0.121,-0.136 0.161,-0.221c0.259,-0.562 0.463,-1.156 0.78,-1.681c0.633,-1.053 1.295,-2.092 2.004,-3.094c1.137,-1.611 2.44,-3.087 3.834,-4.483c1.317,-1.32 2.665,-2.606 4.327,-3.496c0.763,-0.409 1.537,-0.806 2.338,-1.134c1.377,-0.568 2.812,-0.953 4.291,-1.173c0.156,-0.022 0.369,-0.147 0.42,-0.277c0.043,-0.112 -0.178,-0.449 -0.178,-0.449Z"></path>
                                                <path d="M6.741,7.346c-0.113,-0.791 -0.778,-1.462 -1.736,-1.698c-1.097,-0.271 -2.197,-0.159 -3.296,0.007c-0.145,0.022 -0.186,0.119 -0.212,0.259c-0.42,2.221 -0.848,4.44 -1.271,6.66c-0.077,0.401 -0.146,0.806 -0.226,1.248c0.562,0 1.088,0.004 1.613,-0.009c0.042,-0.002 0.104,-0.113 0.116,-0.182c0.17,-0.856 0.338,-1.716 0.494,-2.574c0.03,-0.166 0.083,-0.213 0.259,-0.196c0.746,0.067 1.48,0.016 2.2,-0.224c1.37,-0.451 2.288,-1.713 2.059,-3.291Zm-1.852,1.194c-0.271,0.579 -0.764,0.854 -1.371,0.919c-0.313,0.034 -0.633,0.007 -0.992,0.007c0.163,-0.866 0.306,-1.634 0.457,-2.4c0.012,-0.057 0.083,-0.136 0.135,-0.144c0.427,-0.057 0.856,-0.089 1.272,0.06c0.586,0.206 0.808,0.902 0.499,1.558Z"></path>
                                                <path d="M15.419,5.601c-0.16,-1.36 -0.746,-2.519 -1.678,-3.507c-0.108,-0.116 -0.265,-0.201 -0.415,-0.256c-0.155,-0.056 -0.257,0.032 -0.242,0.209c0.013,0.155 0.027,0.312 0.054,0.466c0.189,1.069 0.372,2.14 0.575,3.208c0.159,0.834 0.333,1.666 0.522,2.494c0.062,0.268 0.17,0.532 0.298,0.777c0.097,0.187 0.237,0.172 0.367,0.001c0.055,-0.071 0.115,-0.144 0.144,-0.226c0.28,-0.767 0.425,-1.559 0.442,-2.377c-0.022,-0.263 -0.036,-0.527 -0.067,-0.789Z"></path>
                                                <path d="M46.163,9.029c0.035,-0.39 0.064,-0.781 0.097,-1.198c-0.482,0 -0.931,-0.006 -1.373,0.008c-0.052,0.002 -0.14,0.111 -0.144,0.174c-0.125,1.549 -0.44,3.068 -0.744,4.589c-0.077,0.394 -0.146,0.789 -0.223,1.223c0.577,0 1.118,0.004 1.661,-0.008c0.041,-0.001 0.101,-0.115 0.115,-0.182c0.17,-0.83 0.301,-1.672 0.502,-2.496c0.289,-1.184 0.777,-1.594 1.933,-1.746c0.051,-0.007 0.127,-0.061 0.137,-0.103c0.109,-0.514 0.207,-1.028 0.316,-1.584c-1.115,-0.116 -1.737,0.526 -2.277,1.323Z"></path>
                                                <path d="M42.643,11.088c0.732,-0.342 1.086,-0.925 1.039,-1.697c-0.049,-0.791 -0.465,-1.353 -1.246,-1.569c-1.276,-0.352 -2.393,-0.011 -3.291,0.944c-0.838,0.889 -1.146,1.977 -1,3.178c0.113,0.941 0.609,1.626 1.552,1.884c1.049,0.286 2.078,0.146 3.073,-0.263c0.068,-0.027 0.146,-0.143 0.144,-0.213c-0.019,-0.356 -0.062,-0.715 -0.101,-1.094c-0.122,0.047 -0.215,0.082 -0.307,0.113c-0.551,0.202 -1.117,0.289 -1.703,0.219c-0.627,-0.076 -1.041,-0.518 -0.983,-1.095c0.174,0 0.338,0.004 0.502,0c0.795,-0.018 1.586,-0.065 2.321,-0.407Zm-1.022,-2.104c0.225,0.062 0.393,0.18 0.426,0.424c0.035,0.262 -0.072,0.47 -0.305,0.569c-0.215,0.096 -0.449,0.166 -0.684,0.197c-0.348,0.047 -0.701,0.051 -1.074,0.075c0.078,-0.821 0.939,-1.456 1.637,-1.265Z"></path>
                                                <path d="M31.558,8.946c-0.072,-0.65 -0.51,-1.117 -1.145,-1.225c-0.769,-0.126 -1.435,0.098 -2.014,0.603c-0.158,0.137 -0.307,0.285 -0.479,0.446c0.024,-0.315 0.049,-0.619 0.073,-0.935c-0.514,0 -0.992,0 -1.489,0c-0.368,1.993 -0.73,3.969 -1.101,5.986c0.573,0 1.09,0.007 1.61,-0.009c0.058,-0.002 0.148,-0.121 0.162,-0.197c0.129,-0.645 0.246,-1.296 0.359,-1.942c0.106,-0.597 0.211,-1.19 0.518,-1.723c0.207,-0.364 0.459,-0.69 0.883,-0.825c0.435,-0.139 0.763,0.071 0.814,0.52c0.016,0.13 0.025,0.266 0.004,0.395c-0.121,0.757 -0.252,1.513 -0.385,2.267c-0.087,0.493 -0.183,0.985 -0.275,1.472c0.047,0.022 0.07,0.04 0.092,0.04c0.504,0.004 1.009,0.014 1.513,0c0.058,-0.002 0.145,-0.117 0.162,-0.19c0.172,-0.849 0.332,-1.697 0.493,-2.549c0.136,-0.703 0.285,-1.407 0.205,-2.134Z"></path>
                                                <path d="M35.103,11.471c0.604,-0.035 1.197,-0.138 1.746,-0.41c0.701,-0.353 1.031,-0.93 0.979,-1.688c-0.056,-0.769 -0.472,-1.324 -1.216,-1.545c-1.113,-0.332 -2.14,-0.099 -3.015,0.646c-1.062,0.904 -1.461,2.101 -1.311,3.465c0.107,0.964 0.635,1.655 1.598,1.903c1.033,0.267 2.049,0.127 3.029,-0.274c0.066,-0.026 0.146,-0.142 0.145,-0.211c-0.02,-0.358 -0.062,-0.716 -0.096,-1.071c-0.043,0 -0.061,-0.004 -0.074,0.001c-0.063,0.021 -0.125,0.046 -0.188,0.068c-0.562,0.216 -1.146,0.312 -1.748,0.237c-0.623,-0.076 -1.035,-0.508 -0.994,-1.117c0.387,0 0.768,0.019 1.145,-0.004Zm0.645,-2.49c0.238,0.058 0.406,0.185 0.445,0.436c0.039,0.245 -0.084,0.455 -0.328,0.582c-0.354,0.187 -1.278,0.298 -1.733,0.203c0.094,-0.777 0.916,-1.391 1.616,-1.221Z"></path>
                                                <path d="M25.107,9.95c-0.047,-0.719 -0.332,-1.326 -0.919,-1.762c-0.617,-0.458 -1.319,-0.552 -2.071,-0.469c-2.512,0.279 -3.538,2.935 -3.004,4.636c0.326,1.036 1.211,1.61 2.765,1.608c1.07,-0.031 2.128,-0.637 2.792,-1.88c0.354,-0.663 0.481,-1.384 0.437,-2.133Zm-2.482,2.242c-0.194,0.247 -0.449,0.416 -0.771,0.445c-0.577,0.054 -1.017,-0.347 -1.064,-0.959c-0.007,-0.09 -0.001,-0.183 -0.001,-0.271c0.019,-0.674 0.183,-1.305 0.59,-1.854c0.182,-0.245 0.409,-0.436 0.712,-0.504c0.623,-0.144 1.133,0.219 1.189,0.893c0.07,0.822 -0.133,1.589 -0.655,2.25Z"></path>
                                            </g>
                                        </svg> <strong class="d-block mt-2">Payoneer</strong></label> <label class="btn btn-outline-primary text-center rounded-0 p-3 w-25"><input type="radio" name="options"> <svg height="29" viewBox="0 0 512 512.00025" xmlns="http://www.w3.org/2000/svg">
                                                <path d="m396.425781 268.34375h59.996094v143.65625h-59.996094zm0 0"></path>
                                                <path d="m282.808594 268.34375h60v143.65625h-60zm0 0"></path>
                                                <path d="m169.191406 268.34375h60v143.65625h-60zm0 0"></path>
                                                <path d="m55.578125 268.34375h59.996094v143.65625h-59.996094zm0 0"></path>
                                                <path d="m476.425781 223.34375v-15h-440.847656v15c0 8.285156 6.714844 15 15 15h410.847656c8.28125 0 15-6.714844 15-15zm0 0"></path>
                                                <path d="m496.992188 442h-481.976563c-8.285156 0-15 6.714844-15 15v40c0 8.285156 6.714844 15 15 15h481.976563c8.285156 0 15-6.714844 15-15v-40c0-8.285156-6.714844-15-15-15zm0 0"></path>
                                                <path d="m15 178.34375h482c6.710938 0 12.605469-4.457031 14.433594-10.914062 1.824218-6.457032-.855469-13.34375-6.570313-16.859376l-241-148.34375c-4.820312-2.96875-10.902343-2.96875-15.726562 0l-241 148.34375c-5.714844 3.519532-8.394531 10.402344-6.566407 16.859376 1.828126 6.457031 7.722657 10.914062 14.429688 10.914062zm230.804688-90.117188h20.394531c8.285156 0 15 6.714844 15 15 0 8.285157-6.714844 15-15 15h-20.394531c-8.285157 0-15-6.714843-15-15 0-8.285156 6.714843-15 15-15zm0 0"></path>
                                            </svg> <strong class="d-block mt-2">Bank</strong></label></div>
                                    <div class="form-group mb-0"><input type="email" name="payout_method" placeholder="Enter your payout email" class="form-control">
                                        <div class="invalid-feedback"></div>
                                    </div>
                                    <hr> <span class="d-block mb-1">
                                    Select bank account type
                                </span>
                                    <div data-toggle="buttons" class="btn-group btn-group-toggle col-lg-12 p-0 flex-wrap mb-3"><label class="btn btn-outline-primary text-center rounded-0 p-3 w-25 active"><input checked="checked" type="radio" name="options"> <strong class="d-block">Personal</strong></label> <label class="btn btn-outline-primary text-center rounded-0 p-3 w-25"><input type="radio" name="options"> <strong class="d-block">Business</strong></label></div>
                                    <div class="row mb-3">
                                        <div class="col-md-6"><span class="d-block mb-1">
                                            Bank country
                                        </span>
                                            <div class="dropdown"><button type="button" id="bank_country" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" class="btn btn-light dropdown-toggle border-0 btn-block d-flex justify-content-between align-items-center"><span class="d-inline-flex align-items-center mr-2"><span style="font-size: 0px;"><img src="/img/RU.png" width="20" alt=""></span> <span class="ml-2">Russian Federation</span></span></button>
                                                <div aria-labelledby="bank_country" class="dropdown-menu border-0 shadow w-100"><a class="dropdown-item d-flex align-items-center"><span style="font-size: 0px;"><img src="/img/RU.png" width="20" alt=""></span> <span class="ml-2">Russian Federation</span></a> <a class="dropdown-item d-flex align-items-center"><span style="font-size: 0px;"><img src="/img/RU.png" width="20" alt=""></span> <span class="ml-2">Russian Federation</span></a> <a class="dropdown-item d-flex align-items-center"><span style="font-size: 0px;"><img src="/img/RU.png" width="20" alt=""></span> <span class="ml-2">Russian Federation</span></a> <a class="dropdown-item d-flex align-items-center"><span style="font-size: 0px;"><img src="/img/RU.png" width="20" alt=""></span> <span class="ml-2">Russian Federation</span></a> <a class="dropdown-item d-flex align-items-center"><span style="font-size: 0px;"><img src="/img/RU.png" width="20" alt=""></span> <span class="ml-2">Russian Federation</span></a></div>
                                            </div>
                                        </div>
                                        <div class="col-md-6"><span class="d-block mb-1">
                                            Bank account currency
                                        </span>
                                            <div class="dropdown"><button type="button" id="bank_curancy" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" class="btn btn-light dropdown-toggle border-0 btn-block d-flex justify-content-between align-items-center"><span class="d-inline-flex align-items-center mr-2"><span class="ml-2">USD</span></span></button>
                                                <div aria-labelledby="bank_curancy" class="dropdown-menu border-0 shadow w-100"><a class="dropdown-item d-flex align-items-center active"><span>USD</span></a> <a class="dropdown-item d-flex align-items-center"><span>RUB</span></a> <a class="dropdown-item d-flex align-items-center"><span>EUR</span></a></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-md-6"><label for="bank_account_name" class="mb-1">Account Name</label>
                                            <div class="form-group mb-0"><input type="text" id="bank_account_name" placeholder="E.g.: John Smith" class="form-control"></div>
                                        </div>
                                        <div class="col-md-6"><label for="bank_account_number" class="mb-1">Account Number</label>
                                            <div class="form-group mb-0"><input type="text" id="bank_account_number" placeholder="E.g.: 40817840054645646546" class="form-control"></div>
                                        </div>
                                    </div>
                                    <div class="row mb-3 align-items-center">
                                        <div class="col-md-6"><label for="bank_name" class="mb-1">Bank Name</label>
                                            <div class="form-group mb-0"><input type="text" id="bank_name" placeholder="Enter Bank Name" class="form-control"></div>
                                        </div>
                                        <div class="col-md-6"><label for="date_of_birth" class="mb-1">Date of birth</label>
                                            <div class="form-group mb-0"><input type="text" id="date_of_birth" placeholder="Need Datepicker" class="form-control"></div>
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-md-6"><label for="routing_number" class="mb-1">ABA/Routing Number</label>
                                            <div class="form-group mb-0"><input type="text" id="routing_number" placeholder="ABA/Routing Number" class="form-control"></div>
                                        </div>
                                        <div class="col-md-6"><label for="branch_number" class="mb-1">Transit/Branch Number</label>
                                            <div class="form-group mb-0"><input type="text" id="branch_number" placeholder="Transit/Branch Number" class="form-control"></div>
                                        </div>
                                    </div> <label for="bank_address" class="mb-1">Bank address</label>
                                    <div class="form-group mb-0"><textarea id="bank_address" rows="3" class="form-control"></textarea></div>
                                </div>
                                <div class="modal-footer justify-content-between align-items-center">
                                    <div class="custom-control custom-checkbox"><input type="checkbox" id="bank_details_confirm" class="custom-control-input"> <label for="bank_details_confirm" class="custom-control-label"><small>I confirm the bank account details</small></label></div>
                                    <div class="d-flex"><button type="button" data-dismiss="modal" class="btn btn-secondary mr-2">Close</button> <button type="button" class="btn btn-primary">Add</button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade d-none" id="billing_plan_details" role="tabpanel" aria-labelledby="billing_plan_details-tab">
                    <div class="col-12 mb-4 pb-3 pt-3 border-bottom">
                        <div class="row justify-content-between align-items-center"><strong>You're on the Free plan.</strong> <button data-toggle="modal" data-target="#upgrade" class="btn btn-primary">Upgrade Plan</button></div>
                    </div>
                    <h5 class="mb-3"><strong>Usage summary</strong></h5>
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <div class="mb-2"><strong>1 user</strong> on your plan</div> <a href="#" class="btn btn-light">See the Users</a>
                        </div>
                        <div class="h2 mb-0"><strong>$0</strong></div>
                    </div>
                </div>
                <div class="tab-pane fade d-none" id="users_on_plan" role="tabpanel" aria-labelledby="users_on_plan-tab">
                    <h5 class="mb-3 pt-3"><strong data-v-470a21f2="">Users on Plan</strong></h5>
                    <p data-v-470a21f2="">You've got 1 user (including you) with access to one or more of your private repositories.</p>
                    <p data-v-470a21f2="">Upgrade to a Standard plan if you want to give access to more than 5 users. See your plan details for more information.</p>
                    <div class="row justify-content-between align-items-center pt-4 pb-2 d-none d-md-flex">
                        <div class="col"><strong data-v-470a21f2="">User</strong></div>
                        <div class="col-6 col-md-4 col-lg-3 text-center"><strong data-v-470a21f2="">Access Type</strong></div>
                        <div class="col-12 col-md-4 col-lg-3 text-center"><strong data-v-470a21f2="">Actions</strong></div>
                    </div>
                    <div class="row justify-content-between align-items-center pt-2">
                        <div class="col">
                            <div class="d-flex align-items-center"><strong class="mr-3 d-md-none">User:</strong>
                                <div class="d-flex align-items-center"><span class="rounded-circle overflow-hidden" style="font-size: 0px;"><img src="/img/avatar.png" width="25" alt=""></span> <span class="ml-2">Team Name</span></div>
                            </div>
                        </div>
                        <div class="col-6 col-md-4 col-lg-3 text-center">
                            <div class="d-inline-flex align-items-center"><strong class="mr-3 d-md-none">Access Type:</strong> <span data-v-470a21f2="">Admin</span></div>
                        </div>
                        <div class="col-12 col-md-4 col-lg-3 text-center p-md-0 p-2"><button class="btn btn-primary btn-block">View Access</button></div>
                    </div>
                </div>
            </div>
            <style>
                .btn-outline-primary svg {
                    fill: #084ce3;
                    transition: all 0.3s ease;
                }
                .btn-outline-primary:hover svg, .btn-outline-primary.hover svg, .btn-outline-primary.active svg, .btn-outline-primary:active svg, .btn-outline-primary.focus svg, .btn-outline-primary:focus svg {
                    fill: #fff;
                }
                .card.no-hover-effect {
                    margin-top: 0 !important;
                    margin-bottom: 0px !important;
                }
            </style>
            <div id="upgrade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" class="modal fade" style="display: none;" aria-hidden="true">
                <div role="document" class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header flex-column align-items-center"><button type="button" data-dismiss="modal" aria-label="Close" class="close"><span aria-hidden="true">×</span></button>
                            <h5 id="exampleModalLabel" class="modal-title d-block">See User Pricing</h5> <span class="d-block text-center"><small>You are enjoying a trial with access to all features</small></span>
                        </div>
                        <div class="modal-body">
                            <div class="card no-hover-effect mb-4">
                                <div class="card-header">
                                    <div class="row align-items-center">
                                        <div class="col-3">
                                            <div class="form-group">
                                                <label for="users_count">How many users?</label>
                                                <input type="text" class="form-control form-control-sm" id="users_count" value="1" onchange="DisplayChange(this.value)">
                                            </div>
                                        </div>
                                        <div class="col">
                                            <input type="range" oninput="DisplayChange(this.value);" class="w-100" value="1" min="1" max="5000" step="1" id="users_range">
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                        <div class="col-3">
                                            <h6 class="mb-3">MONTHLY PRICING SUMMARY</h6>
                                            <div class="d-flex align-items-end mb-2">
                                                <h3 id="final_price" class="mb-0">$5</h3><span id="plan_type">/mo.</span>
                                            </div>
                                            <small class="d-block">Flat rate</small>
                                            <small class="d-block">For 1 - 10 users</small>
                                        </div>
                                        <div class="col">
                                            <div class="custom-control custom-switch pl-0 mb-3">
                                                <label class="mr-5" for="monthly_annual">Monthly</label>
                                                <input type="checkbox" onchange="calculator.switchPlanType()" value="true" class="custom-control-input" id="monthly_annual">
                                                <label class="custom-control-label" for="monthly_annual">Annual</label>
                                            </div>
                                            <div class="card card-body p-3 no-hover-effect" id="calculator_info">
                                                <span class="d-block">Pay a monthly flat rate of $5 for up to 10 users. </span><span class="d-block">Teams of 11+ are $4 per user/month.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" data-dismiss="modal" class="btn btn-secondary">Close</button>
                            <button type="button" data-dismiss="modal" data-toggle="modal" data-target="#upgrade2" class="btn btn-primary">Continue to Pay</button>
                        </div>
                    </div>
                </div>
            </div>
        @endif
        <!-- Modal -->
        <div class="modal fade" style="overflow-y: scroll;" id="upgrade2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header flex-column align-items-center"><button type="button" data-dismiss="modal" aria-label="Close" class="close"><span aria-hidden="true">×</span></button>
                        <h5 id="exampleModalLabel" class="modal-title d-block">Upgrade to Pro</h5> <span class="d-block text-center"><small>You are enjoying a trial with access to all features</small></span>
                    </div>
                    <div class="modal-body">
                        <div class="d-flex mb-4">
                            <div class="custom-control custom-radio mr-5">
                                <input type="radio" id="bill_monthly" name="payment_type" class="custom-control-input">
                                <label class="custom-control-label" for="bill_monthly">Bill monthly <strong>$20/mo</strong></label>
                            </div>
                            <div class="custom-control custom-radio">
                                <input type="radio" id="bill_yearly" name="payment_type" class="custom-control-input">
                                <label class="custom-control-label" for="bill_yearly">Bill yearly <strong>$15/mo</strong></label>
                            </div>
                        </div>
                        <div class="collapse show multi-collapse" id="coupon_code_collapse_button">
                            <button class="btn btn-primary" type="button"  data-toggle="collapse" data-target=".multi-collapse" aria-expanded="false" aria-controls="coupon_code_collapse coupon_code_collapse_button">
                                I have a Coupon Code
                            </button>
                        </div>
                        <div class="collapse pt-3 multi-collapse" id="coupon_code_collapse">
                            <div class="form-group mb-0">
                                <label for="coupon_code">Coupon Code</label>
                                <div class="d-flex">
                                    <div class="col p-0">
                                        <input type="text" class="form-control" id="coupon_code">
                                    </div>
                                    <button class="btn btn-primary ml-2">Apply Coupon</button>
                                    <button class="btn btn-secondary ml-2" type="button" data-toggle="collapse" data-target=".multi-collapse" aria-expanded="false" aria-controls="coupon_code_collapse coupon_code_collapse_button">Cancel</button>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <h4 class="mb-3"><strong>Payment details</strong></h4>
                        <form action="#">
                            <div class="row">
                                <div class="col-8">
                                    <div class="form-group">
                                        <label for="card_number">Card Number</label>
                                        <input type="text" class="form-control" id="card_number">
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="form-group">
                                        <label for="zip_code">Postal/ZIP Code</label>
                                        <input type="text" class="form-control" id="zip_code">
                                    </div>
                                </div>
                                <div class="col-12 mb-2">
                                    <span>Expiration</span>
                                </div>
                                <div class="col-5">
                                    <select class="form-control" id="expiration_month">
                                        <option>Month</option>
                                        <option>Jan</option>
                                        <option>Fev</option>
                                        <option>Mart</option>
                                        <option>Apr</option>
                                        <option>May</option>
                                        <option>Jun</option>
                                        <option>Jul</option>
                                        <option>Avg</option>
                                        <option>Sep</option>
                                        <option>Nov</option>
                                        <option>Dec</option>
                                    </select>
                                </div>
                                <div class="col-5">
                                    <select class="form-control" id="expiration_year">
                                        <option>Year</option>
                                        <option value="">1909</option>
                                        <option value="">1910</option>
                                        <option value="">1911</option>
                                        <option value="">1912</option>
                                        <option value="">1913</option>
                                        <option value="">1914</option>
                                        <option value="">1915</option>
                                        <option value="">1916</option>
                                        <option value="">1917</option>
                                        <option value="">1918</option>
                                        <option value="">1919</option>
                                        <option value="">1920</option>
                                        <option value="">1921</option>
                                        <option value="">1922</option>
                                        <option value="">1923</option>
                                        <option value="">1924</option>
                                        <option value="">1925</option>
                                        <option value="">1926</option>
                                        <option value="">1927</option>
                                        <option value="">1928</option>
                                        <option value="">1929</option>
                                        <option value="">1930</option>
                                        <option value="">1931</option>
                                        <option value="">1932</option>
                                        <option value="">1933</option>
                                        <option value="">1934</option>
                                        <option value="">1935</option>
                                        <option value="">1936</option>
                                        <option value="">1937</option>
                                        <option value="">1938</option>
                                        <option value="">1939</option>
                                        <option value="">1940</option>
                                        <option value="">1941</option>
                                        <option value="">1942</option>
                                        <option value="">1943</option>
                                        <option value="">1944</option>
                                        <option value="">1945</option>
                                        <option value="">1946</option>
                                        <option value="">1947</option>
                                        <option value="">1948</option>
                                        <option value="">1949</option>
                                        <option value="">1950</option>
                                        <option value="">1951</option>
                                        <option value="">1952</option>
                                        <option value="">1953</option>
                                        <option value="">1954</option>
                                        <option value="">1955</option>
                                        <option value="">1956</option>
                                        <option value="">1957</option>
                                        <option value="">1958</option>
                                        <option value="">1959</option>
                                        <option value="">1960</option>
                                        <option value="">1961</option>
                                        <option value="">1962</option>
                                        <option value="">1963</option>
                                        <option value="">1964</option>
                                        <option value="">1965</option>
                                        <option value="">1966</option>
                                        <option value="">1967</option>
                                        <option value="">1968</option>
                                        <option value="">1969</option>
                                        <option value="">1970</option>
                                        <option value="">1971</option>
                                        <option value="">1972</option>
                                        <option value="">1973</option>
                                        <option value="">1974</option>
                                        <option value="">1975</option>
                                        <option value="">1976</option>
                                        <option value="">1977</option>
                                        <option value="">1978</option>
                                        <option value="">1979</option>
                                        <option value="">1980</option>
                                        <option value="">1981</option>
                                        <option value="">1982</option>
                                        <option value="">1983</option>
                                        <option value="">1984</option>
                                        <option value="">1985</option>
                                        <option value="">1986</option>
                                        <option value="">1987</option>
                                        <option value="">1988</option>
                                        <option value="">1989</option>
                                        <option value="">1990</option>
                                        <option value="">1991</option>
                                        <option value="">1992</option>
                                        <option value="">1993</option>
                                        <option value="">1994</option>
                                        <option value="">1995</option>
                                        <option value="">1996</option>
                                        <option value="">1997</option>
                                        <option value="">1998</option>
                                        <option value="">1999</option>
                                        <option value="">2000</option>
                                        <option value="">2001</option>
                                        <option value="">2002</option>
                                        <option value="">2003</option>
                                        <option value="">2004</option>
                                        <option value="">2005</option>
                                        <option value="">2006</option>
                                        <option value="">2007</option>
                                        <option value="">2008</option>
                                        <option value="">2009</option>
                                        <option value="">2010</option>
                                        <option value="">2011</option>
                                        <option value="">2012</option>
                                        <option value="">2013</option>
                                        <option value="">2014</option>
                                        <option value="">2015</option>
                                        <option value="">2016</option>
                                        <option value="">2017</option>
                                        <option value="">2018</option>
                                        <option value="">2019</option>
                                        <option value="">2020</option>
                                    </select>
                                </div>
                                <div class="col-2">
                                    <div class="form-group">
                                        <input type="text" placeholder="CVC" class="form-control" id="cvc">
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div class="d-flex justify-content-between mt-4">
                            <strong>Subtotal</strong>
                            <strong>$240.00</strong>
                        </div>
                        <div class="d-flex justify-content-between text-success">
                            <strong>Yearly plan discount</strong>
                            <strong>-$60.00</strong>
                        </div>
                        <div class="d-flex justify-content-between mt-5">
                            <div class="pr-5">
                                <strong class="d-block mb-2">Total billed today</strong>
                                <p class="mb-2 pr-5">All prices are in USD and all sales are final. You will be charged $180.00 every year while this subsciption is active. Cancel any time</p>
                            </div>
                            <strong>$180.00</strong>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" data-toggle="modal" data-target="#upgrade">Back</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" data-toggle="modal" data-target="#upgrade_success" class="btn btn-primary">Subscribe & Checkout</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="upgrade_success" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Success</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid consequuntur delectus dolorem excepturi explicabo id illum impedit minus nam neque, officiis, pariatur porro quis sint soluta temporibus ullam unde ut.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
                <script>
                    function DisplayChange(newvalue) {
                        calculator.calculate({
                            users_count: newvalue
                        });
                    }
                </script>
            @endsection
            @push('scripts')
                <!--Plugin CSS file with desired skin-->
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ion-rangeslider/2.3.1/css/ion.rangeSlider.min.css" />
                    <!--Plugin JavaScript file-->
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/ion-rangeslider/2.3.1/js/ion.rangeSlider.min.js"></script>
                    <script>
                        $(function() {
                            $('.removeCreditCardButton').click(function(){
                                var card_id = $(this).data('id');
                                var card_last4 = $(this).data('last4');
                                $('.last4card').text(card_last4);
                                $('.removeCreditCardbtn').attr('data-id', card_id);
                            });
                            $('.removeCreditCardbtn').click(function(){
                                var card_id = $(this).data('id');
                                request({
                                    method: 'GET',
                                    url: '/billing/cards/' + card_id + '/delete',
                                }, function(response) {
                                    if (response.error) {
                                        $.notify(response.error);
                                        return;
                                    }

                                    $.notify('Deleted!', 'success');
                                    $('.allcards .onecard[data-id="' + card_id + '"]').remove();

                                });

                            })

                            $('#users_range').ionRangeSlider({
                                grid: true,
                                min: 1,
                                max: 5000,
                                from: 1,
                                to: 1,
                                prefix: ""
                            });
                            window.calculator = {
                                type: 'standard',
                                planType: 'monthly',
                                pricePerUser: 5,
                                users_count: 1,
                                switchPlanType: function switchPlanType(state) {
                                    switch (event.target.checked) {
                                        case true:
                                            this.planType = 'annual';
                                            $('#plan_type').text('/year.');
                                            break;

                                        case false:
                                            this.planType = 'monthly';
                                            $('#plan_type').text('/mo.');
                                            break;

                                        default:
                                            this.planType = 'monthly';
                                            break;
                                    }

                                    ;
                                    console.log(this.planType);
                                    this.calculate({
                                        users_count: this.users_count
                                    });
                                },
                                setRangeValue: function setRangeValue() {
                                    $('#users_range').val(this.users_count);
                                },
                                displayUsersCount: function displayUsersCount() {
                                    $('#users_count').val(this.users_count);
                                },
                                usersCountUpdate: function usersCountUpdate(users_count) {
                                    this.users_count = users_count;
                                },
                                displayPrice: function displayPrice(price) {
                                    $('#final_price').text('$' + price);
                                },
                                calculate: function calculate(_ref) {
                                    var users_count = _ref.users_count;
                                    this.usersCountUpdate(users_count);

                                    switch (this.planType) {
                                        case 'monthly':
                                            if (+users_count <= 10) {
                                                this.pricePerUser = 5;
                                                $('#calculator_info').html('<span class="d-block">Pay a monthly flat rate of $5 for up to 10 users. </span><span class="d-block">Teams of 11+ are $4 per user/month.</span>');
                                            } else if (+users_count <= 100) {
                                                this.pricePerUser = 4;
                                                $('#calculator_info').html('<span class="d-block">Pricing starts at $4 per user for the first 100 users. </span>');
                                            } else if (+users_count <= 1000) {
                                                $('#calculator_info').html('<span class="d-block">Pricing starts at $3 per user for the first 1000 users. </span>');
                                                this.pricePerUser = 3;
                                            } else {
                                                this.pricePerUser = 2;
                                            }

                                            ;
                                            break;

                                        case 'annual':
                                            if (+users_count <= 10) {
                                                this.pricePerUser = 50;
                                            } else if (+users_count <= 100) {
                                                this.pricePerUser = 40;
                                            } else if (+users_count <= 1000) {
                                                this.pricePerUser = 30;
                                            } else {
                                                this.pricePerUser = 20;
                                            }

                                            ;
                                            break;

                                        default:
                                            console.log('default');
                                            break;
                                    }

                                    console.log(this.planType, users_count, this.users_count);
                                    this.setRangeValue(+users_count);
                                    this.displayUsersCount(+users_count);
                                    this.displayPrice(+users_count * this.pricePerUser);
                                }
                            };
                            $('.make-primary-card').click(function() {
                                event.preventDefault();
                                var card_id = $(this).data('id');

                                modals.confirm_action({
                                    question: 'Please confirm that you wish to set this credit card as your primary payment credit card.',

                                    confirm: function(callback) {
                                        request({
                                            method: 'GET',
                                            url: '/billing/cards/' + card_id + '/make_primary',
                                        }, function(response) {
                                            if (response.error) {
                                                $.notify(response.error);
                                                return;
                                            }

                                            $.notify('Updated!', 'success');

                                            window.location.href = '/dashboard/billing';
                                        });
                                    },
                                });
                            });

                            $('.delete-card').click(function() {
                                    event.preventDefault();
                                    var card_id = $(this).data('id');

                                    modals.confirm_action({
                                        question: 'Please confirm that you wish to delete this credit card.',

                                        confirm: function(callback) {
                                            request({
                                                method: 'GET',
                                                url: '/billing/cards/' + card_id + '/delete',
                                            }, function(response) {
                                                if (response.error) {
                                                    $.notify(response.error);
                                                    return;
                                                }

                                                $.notify('Deleted!', 'success');
                                                $('li.card-item[data-id="' + card_id + '"]').hide();
                                                return callback && callback();
                                            });
                                    },
                                });
                            });

                            $('.make-primary-payout-method').click(function() {
                                event.preventDefault();

                                var payout_method_id = $(this).data('id');

                                modals.confirm_action({
                                    question: 'Please confirm that you wish to set this Payout Method as your primary payout method.',

                                    confirm: function(callback) {
                                        request({
                                            method: 'GET',
                                            url: '/payout_methods/' + payout_method_id + '/make_default',
                                        }, function(response) {
                                            if (response.error) {
                                                $.notify(response.error);
                                                return;
                                            }

                                            $.notify('Updated!', 'success');
                                            window.location.href = '/dashboard/billing';
                                        });
                                    },
                                });
                            });

                            $('.delete-payout-method').click(function() {
                                event.preventDefault();

                                var payout_method_id = $(this).data('id');

                                modals.confirm_action({
                                    question: 'Please confirm that you wish to delete this payout method.',

                                    confirm: function(callback) {
                                        request({
                                            method: 'GET',
                                            url: '/payout_methods/' + payout_method_id + '/delete',
                                        }, function(response) {
                                            if (response.error) {
                                                $.notify(response.error);
                                                return;
                                            }

                                            $.notify('Deleted!', 'success');
                                            $('li.payout-method-item[data-id="' + payout_method_id + '"]').hide();
                                            return callback && callback();
                                        });
                                    },
                                });
                            });
                        });
                    </script>
    @endpush
    @include('dashboard.billing.modals.add_new_card_modal')
    @include('dashboard.billing.modals.add_payout_method')
