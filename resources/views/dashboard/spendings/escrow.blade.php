@extends('dashboard.layout')

@section('content')
    <section class="container py-5">
        <div class="row">
            <div class="col-md-12">
                <h3 class="[ page-title ]">{{ __('dashboard/spendings.spendings') }}</h3>
            </div>
        </div>
        <div class="row">
            <div class="">
            	@include('dashboard.spendings.partials.tabs')
                <div class="tab-content">
                    <div class="tab-pane fade show active">
                        @if ($tracking_days->count() > 0 || $milestones->count() > 0)
                            @if ($tracking_days->count() > 0)
                                <table class="w-100">
                                    <thead>
                                        <th class="px-2">{{ __('dashboard/spendings.date') }}</th>
                                        <th class="px-2">{{ __('dashboard/spendings.freelancer') }}</th>
                                        <th class="px-2">{{ __('dashboard/spendings.project') }}</th>
                                        <th class="px-2 text-center">{{ __('dashboard/spendings.hours') }}</th>
                                        <th class="px-2 text-center">{{ __('dashboard/spendings.rate') }}</th>
                                        <th class="px-2 text-center">{{ __('dashboard/spendings.amount') }}</th>
                                        <th class="px-2">{{ __('dashboard/spendings.paid_on') }}</th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colspan="3"></td>
                                            <td class="px-2 text-center text-secondary" style="font-weight: bold;">
                                                {{ time_interval_to_string($tracking_days->sum('count_of_segments') * 60, [
                                                    'string_rounding' => 'minutes',
                                                    'string_cutting' => 'hours',

                                                    'format' => [
                                                        'hours' => '%d:',
                                                        'minutes' => '%02d',
                                                    ],
                                                ]) }}
                                            </td>
                                            <td class="px-2 text-center text-secondary" style="font-weight: bold;">
                                                ${{ number_format((
                                                    $tracking_days->sum('total_amount')
                                                    /
                                                    ($tracking_days->sum('count_of_segments') / 60)
                                                ), 2) }}/h
                                            </td>
                                            <td class="px-2 text-center text-secondary" style="font-weight: bold;">
                                                ${{ number_format(floor($tracking_days->sum('total_amount') * 100) / 100, 2) }}
                                            </td>
                                            <td></td>
                                        </tr>
                                        @foreach ($tracking_days as $tracking_day)
                                            <tr>
                                                <td class="px-2">{{ $tracking_day->created_at->format('M j, Y') }}</td>
                                                <td class="px-2">
                                                    <a href="#" class="d-flex align-items-center" onclick="event.preventDefault(); slideups.user_profile({ user_id: parseInt('{{ $tracking_day->user->id }}'), default_tab: 'timeline' });">
                                                        <img src="{{ $tracking_day->user->image->urls->tiny }}" style="width: 30px; height: 30px; border-radius: 50%;">
                                                        <span class="ml-1">{{ $tracking_day->user->title }}</span>
                                                    </a>
                                                </td>
                                                <td class="px-2">
                                                    <a href="{{ route('dashboard.project.boards', $tracking_day->project->id) }}">
                                                        {{ $tracking_day->project->name }}
                                                    </a>
                                                </td>
                                                <td class="px-2 text-center">
                                                    {{ time_interval_to_string($tracking_day->count_of_segments * 60, [
                                                        'string_rounding' => 'minutes',
                                                        'string_cutting' => 'hours',

                                                        'format' => [
                                                            'hours' => '%d:',
                                                            'minutes' => '%02d',
                                                        ],
                                                    ]) }}
                                                </td>
                                                <td class="px-2 text-center">${{ number_format($tracking_day->average_hourly_rate, 2) }}</td>
                                                <td class="px-2 text-center">${{ number_format(floor($tracking_day->total_amount * 100) / 100, 2) }}</td>
                                                <td class="px-2">
                                                    {{ $tracking_day->created_at->add(11, 'day')->format('M j, Y') }}
                                                    <span class="text-secondary">
                                                        (in {{ ceil(($tracking_day->created_at->add(11, 'days')->getTimestamp() - time()) / 86400) }} days)
                                                    </span>
                                                </td>
                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            @endif

                            @if ($milestones->count() > 0)
                                <table class="w-100">
                                    <thead>
                                        <th class="px-2">{{ __('dashboard/spendings.date') }}</th>
                                        <th class="px-2">{{ __('dashboard/spendings.freelancer') }}</th>
                                        <th class="px-2">{{ __('dashboard/spendings.project') }}</th>
                                        <th class="px-2 text-center">{{ __('dashboard/spendings.amount') }}</th>
                                        <th class="px-2">{{ __('dashboard/spendings.paid_on') }}</th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colspan="3"></td>
                                            <td class="px-2 text-center text-secondary" style="font-weight: bold;">
                                                ${{ number_format(floor($milestones->sum('total_amount') * 100) / 100, 2) }}
                                            </td>
                                            <td></td>
                                        </tr>
                                        @foreach ($milestones as $milestone)
                                            <tr>
                                                <td class="px-2">{{ $milestone->released_at->format('M j, Y') }}</td>
                                                <td class="px-2">
                                                    <a href="#" class="d-flex align-items-center" onclick="event.preventDefault(); slideups.user_profile({ user_id: parseInt('{{ $milestone->contract->employee_user->id }}'), default_tab: 'timeline' });">
                                                        <img src="{{ $milestone->contract->employee_user->image->urls->tiny }}" style="width: 30px; height: 30px; border-radius: 50%;">
                                                        <span class="ml-1">{{ $milestone->contract->employee_user->title }}</span>
                                                    </a>
                                                </td>
                                                <td class="px-2">
                                                    <a href="{{ route('dashboard.project.boards', $milestone->project->id) }}">
                                                        {{ $milestone->project->name }}
                                                    </a>
                                                </td>
                                                <td class="px-2 text-center">${{ number_format(floor($milestone->total_amount * 100) / 100, 2) }}</td>
                                                <td class="px-2">
                                                    {{ $milestone->released_at->add(5, 'day')->format('M j, Y') }}
                                                    <span class="text-secondary">
                                                        (in {{ ceil(($milestone->released_at->add(5, 'days')->getTimestamp() - time()) / 86400) }} days)
                                                    </span>
                                                </td>
                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            @endif
                        @else
                            <div class="text-center">
                                {{ __('dashboard/spendings.no_work_in_escrow') }}
                            </div>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
