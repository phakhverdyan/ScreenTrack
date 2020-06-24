@extends('dashboard.layout')

@section('content')
    <section class="container py-5">
        <div class="row">
            <div class="col-md-12">
                <h3 class="[ page-title ]">{!! __('dashboard/earnings.earnings') !!}</h3>
            </div>
        </div>
        <div class="row">
            <div class="">
            	@include('dashboard.earnings.partials.tabs')
                <div class="tab-content">
                    <div class="tab-pane fade show active">
                        @if ($payouts->count() > 0)
                            <table class="w-100">
                                <thead>
                                    <th class="px-2">{!! __('dashboard/earnings.date') !!}</th>
                                    <th class="px-2">{!! __('dashboard/earnings.amount') !!}</th>
                                    <th class="px-2">{!! __('dashboard/earnings.status') !!}</th>
                                </thead>
                                <tbody>
                                    @foreach ($payouts as $payout)
                                        <tr>
                                            <td class="px-2">{{ $payout->created_at->format('M j, Y') }}</td>
                                            <td class="px-2">${{ number_format($payout->original_amount, 2) }}</td>
                                            <td class="px-2">{{ $payout->state }}</td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        @else
                            <div class="text-center">{!! __('dashboard/earnings.no_payouts_yet') !!}</div>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
