@extends('dashboard.layout')

@section('content')
    <section class="container py-5">
        <div class="row">
            <div class="col-md-12">
                <h3 class="[ page-title ]">
                    {!! __('dashboard/referrals.my_referrals', ['count' => $count_of_referral_connections->total ]) !!}
                </h3>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="d-block">
                    @include('dashboard.referrals.partials.header')
                	@include('dashboard.referrals.partials.tabs')
                    <div class="tab-content">
                        <div class="tab-pane fade show active">
                            @if ($referral_connections->count() > 0)
                                @foreach ($referral_connections as $current_referral_connection)
                                    <div data-id="{{ $current_referral_connection->id }}" class="mt-2">
                                        <div class="d-inline-block mr-3 px-0">
                                            <div class="d-flex flex-1 mb-0">
                                                <div class="mr-2">
                                                    <img src="{{ asset_no_cache('img/countries/flags/' . ($current_referral_connection->invited_user->country_code ?? '_') . '.png') }}" style="width: 20px;" title="{{ $current_referral_connection->invited_user->country->name ?? 'Unknown Country' }}">
                                                </div>
                                                <div class="mr-2">
                                                    <strong class="d-inline-block align-middle">{{ $current_referral_connection->invited_user->short_title }}</strong>
                                                </div>
                                                <div class="mr-2">
                                                    <small class="d-inline-block align-middle text-secondary">
                                                        {{ $current_referral_connection->created_at->diffForHumans() }}
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex flex-1">
                                            <div class="progress align-self-center" style="width: 100%;">
                                              <div class="progress-bar bg-warning" role="progressbar" style="width: {{ $current_referral_connection->progress * 100.0 }}%" aria-valuenow="{{ $current_referral_connection->progress * 100.0 }}" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <span class="d-inline-block align-self-center ml-3 px-0 text-right text-nowrap">
                                                @if ($current_referral_connection->maximum_amount)
                                                    ${{
                                                        number_format(floor($current_referral_connection->earned_amount * 100) / 100, 2)
                                                    }}/{{
                                                        number_format($current_referral_connection->maximum_amount, 2)
                                                    }} USD
                                                @else
                                                    <span class="d-inline-block" style="margin-top: -7px; vertical-align: middle;" data-toggle="tooltip" data-placement="right" title="In order to determine if this is a manager ($150 USD commission) or a freelancer ($100 USD commission) we'll first have to see in what direction the first contract will flow. Once the contract has the first payment, we will display the right amount.">
                                                        Waiting for first contract
                                                        <img src="{{ asset_no_cache('img/question-circle.svg') }}" style="width: 20px; margin-top: -1px; opacity: 0.3;">
                                                    </span>
                                                @endif
                                            </span>
                                        </div>
                                    </div>
                                @endforeach
                                <div class="mt-5">
                                    {{ $referral_connections->links() }}
                                </div>
                            @else
                                <div class="text-center">{!! __('dashboard/referrals.no_referrals') !!}</div>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
