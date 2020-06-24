@extends('dashboard.layout')

@push('scripts')
    <script>
        $('#reports__get-paid-button').click(function(event) {
            event.preventDefault();

            request({
                url: '/payouts/create',

                data: {
                    payout: {
                        original_amount: parseFloat('{{ $available_amount }}'),
                    },
                },
            }, function(response) {
                if (response.error) {
                    $.notify(response.error, 'error');
                    return;
                }

                alert('SUCCESS!');
            });
        });
    </script>
@endpush

@section('content')
    <section class="container py-5">
        <div class="row">
            <div class="col-md-12">
                <h3 class="[ page-title ]">Reports</h3>
            </div>
        </div>
        <div class="row">
            <div class="[ reports-overview ]">
            	<ul class="[ reports-overview-tabs ] nav nav-tabs">
                    <li class="nav-item">
                        <a href="#" data-target="#reports__progress-tab" data-toggle="tab" class="nav-link active">
                            Progress
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" data-target="#reports__review-tab" data-toggle="tab" class="nav-link">
                            Review
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" data-target="#reports__escrow-tab" data-toggle="tab" class="nav-link">
                            Escrow
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" data-target="#reports__available-tab" data-toggle="tab" class="nav-link">
                            Available (${{ number_format(floor($available_amount * 100) / 100, 2) }})
                        </a>
                    </li>
                </ul>
                <div class="[ reports-overview-content ] tab-content">
                    <div id="reports__progress-tab" class="tab-pane fade show active">
                        <table class="reports-overview-table">
                            <thead>
                                <th>Project</th>
                                <th class="text-center">
                                    Today
                                    <br>
                                    ({{ __('common.days.' . (date('N') - 1) . '.name') }})
                                </th>
                                <th class="text-center">Rate</th>
                                <th class="text-center">Amount</th>
                            </thead>
                            <tbody>
                                @foreach ($projects as $current_project)
                                    @if ($current_project->contract->finished_at && $current_project->tracking_segments->filter()->count() == 0)
                                        @continue
                                    @endif

                                    <tr>
                                        <td>{{ $current_project->name }}</td>
                                        @if ($current_project->tracking_segments[0])
                                            <td class="text-center">
                                                {{ time_interval_to_string($current_project->tracking_segments[0]->count_of_subsegments * 60, [
                                                    'string_rounding' => 'minutes',
                                                    'string_cutting' => 'hours',

                                                    'format' => [
                                                        'hours' => '%d:',
                                                        'minutes' => '%02d',
                                                    ],
                                                ]) }}
                                            </td>
                                        @else
                                            <td class="text-center">&mdash;</td>
                                        @endif
                                        <td class="text-center">
                                            ${{ number_format($current_project->contract->hourly_rate, 2) }}/h
                                        </td>
                                        <td class="text-center">
                                            ${{ number_format(floor(
                                                $current_project->tracking_segments->slice(0, 1)->sum('earned_amount') * 100
                                            ) / 100, 2) }}
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                            <tfoot>
                                <tf>
                                    <td></td>
                                    <td class="text-center">
                                        @if ($total[0]->count_of_subsegments > 0)
                                            {{ time_interval_to_string($total[0]->count_of_subsegments * 60, [
                                                'string_rounding' => 'minutes',
                                                'string_cutting' => 'hours',

                                                'format' => [
                                                    'hours' => '%d:',
                                                    'minutes' => '%02d',
                                                ],
                                            ]) }}
                                        @else
                                            &mdash;
                                        @endif
                                    </td>
                                    <td class="text-center">
                                        @if ($total->slice(0, 1)->sum('count_of_subsegments') > 0)
                                            ${{ number_format(floor(
                                                $total->sum('earned_amount') / ($total->sum('count_of_subsegments') / 60) * 100
                                            ) / 100, 2) }}/h
                                        @else
                                            &mdash;
                                        @endif
                                    </td>
                                    <td class="text-center">
                                        ${{ number_format(floor($total->slice(0, 1)->sum('earned_amount') * 100) / 100, 2) }}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div id="reports__review-tab" class="tab-pane fade show">
                        <table class="reports-overview-table">
                            <thead>
                                <th>Project</th>
                                @for ($day_index = 1; $day_index <= 5; ++$day_index)
                                    <th class="text-center">
                                        {{ __('common.days.' . (date('N', floor(time() / 86400) * 86400 - $day_index * 86400) - 1) . '.short_name') }}
                                        <br>
                                        {{ date('n/d', floor(time() / 86400) * 86400 + $day_index * 86400) }}
                                    </th>
                                @endfor
                                <th class="text-center">Rate</th>
                                <th class="text-center">Amount</th>
                            </thead>
                            <tbody>
                                @foreach ($projects as $current_project)
                                    @if ($current_project->contract->finished_at && $current_project->tracking_segments->slice(1, 6)->filter()->count() == 0)
                                        @continue
                                    @endif
                                    <tr>
                                        <td>{{ $current_project->name }}</td>
                                        @for ($day_index = 1; $day_index <= 5; ++$day_index)
                                            @if ($current_project->tracking_segments[$day_index])
                                                <td class="text-center">
                                                    {{ time_interval_to_string($current_project->tracking_segments[$day_index]->count_of_subsegments * 60, [
                                                        'string_rounding' => 'minutes',
                                                        'string_cutting' => 'hours',

                                                        'format' => [
                                                            'hours' => '%d:',
                                                            'minutes' => '%02d',
                                                        ],
                                                    ]) }}
                                                </td>
                                            @else
                                                <td class="text-center">&mdash;</td>
                                            @endif
                                        @endfor
                                        <td class="text-center">
                                            ${{ number_format($current_project->contract->hourly_rate, 2) }}/h
                                        </td>
                                        <td class="text-center">
                                            ${{ number_format(
                                                floor(
                                                    $current_project->tracking_segments->slice(1, 5 + 1)->sum('earned_amount') * 100
                                                ) / 100, 2
                                            ) }}
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                            <tfoot>
                                <tf>
                                    <td></td>
                                    @for ($day_index = 1; $day_index <= 5; ++$day_index)
                                        <td class="text-center">
                                            @if ($total[$day_index]->count_of_subsegments)
                                                {{ time_interval_to_string($total[$day_index]->count_of_subsegments * 60, [
                                                    'string_rounding' => 'minutes',
                                                    'string_cutting' => 'hours',

                                                    'format' => [
                                                        'hours' => '%d:',
                                                        'minutes' => '%02d',
                                                    ],
                                                ]) }}
                                            @endif
                                        </td>
                                    @endfor
                                    <td class="text-center">
                                        @if ($total->slice(1, 5 + 1)->sum('count_of_subsegments') > 0)
                                            ${{ number_format($total->slice(1, 5 + 1)->sum('earned_amount') / (
                                                $total->slice(1, 5 + 1)->sum('count_of_subsegments') / 60
                                            ), 2) }}/h
                                        @else
                                            &mdash;
                                        @endif
                                    </td>
                                    <td class="text-center">
                                        ${{ number_format(
                                            floor($total->slice(1, 5 + 1)->sum('earned_amount') * 100) / 100, 2
                                        ) }}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div id="reports__escrow-tab" class="tab-pane fade show">
                        <table class="reports-overview-table">
                            <thead>
                                <th>Project</th>
                                @for ($day_index = 6; $day_index <= 10; ++$day_index)
                                    <th class="text-center">
                                        {{ __('common.days.' . (date('N', floor(time() / 86400) * 86400 - $day_index * 86400) - 1) . '.short_name') }}
                                        <br>
                                        {{ date('n/d', floor(time() / 86400) * 86400 + $day_index * 86400) }}
                                    </th>
                                @endfor
                                <th class="text-center">Rate</th>
                                <th class="text-center">Amount</th>
                            </thead>
                            <tbody>
                                @foreach ($projects as $current_project)
                                    @if ($current_project->contract->finished_at && $current_project->tracking_segments->slice(6, 10 + 1)->filter()->count() == 0)
                                        @continue
                                    @endif
                                    <tr>
                                        <td>{{ $current_project->name }}</td>
                                        @for ($day_index = 6; $day_index <= 10; ++$day_index)
                                            @if ($current_project->tracking_segments[$day_index])
                                                <td class="text-center">
                                                    {{ time_interval_to_string($current_project->tracking_segments[$day_index]->count_of_subsegments * 60, [
                                                        'string_rounding' => 'minutes',
                                                        'string_cutting' => 'hours',

                                                        'format' => [
                                                            'hours' => '%d:',
                                                            'minutes' => '%02d',
                                                        ],
                                                    ]) }}
                                                </td>
                                            @else
                                                <td class="text-center">&mdash;</td>
                                            @endif
                                        @endfor
                                        <td class="text-center">
                                            ${{ number_format($current_project->contract->hourly_rate, 2) }}/h
                                        </td>
                                        <td class="text-center">
                                            ${{ number_format(floor(
                                                $current_project->tracking_segments->slice(6, 10 + 1)->sum('earned_amount') * 100
                                            ) / 100, 2) }}
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                            <tfoot>
                                <tf>
                                    <td></td>
                                    @for ($day_index = 6; $day_index <= 10; ++$day_index)
                                        <td class="text-center">
                                            @if ($total[$day_index]->count_of_subsegments)
                                                {{ time_interval_to_string($total[$day_index]->count_of_subsegments * 60, [
                                                    'string_rounding' => 'minutes',
                                                    'string_cutting' => 'hours',

                                                    'format' => [
                                                        'hours' => '%d:',
                                                        'minutes' => '%02d',
                                                    ],
                                                ]) }}
                                            @endif
                                        </td>
                                    @endfor
                                    <td class="text-center">
                                        @if ($total->slice(6, 10 + 1)->sum('count_of_subsegments') > 0)
                                            ${{ number_format($total->slice(6, 10 + 1)->sum('earned_amount') / ($total->slice(1, 6)->sum('count_of_subsegments') / 60), 2) }}/h
                                        @else
                                            &mdash;
                                        @endif
                                    </td>
                                    <td class="text-center">
                                        ${{ number_format($total->slice(6, 10 + 1)->sum('earned_amount'), 2) }}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div id="reports__available-tab" class="tab-pane fade show">
                        <button id="reports__get-paid-button" type="button" class="btn btn-primary">Get Paid (${{ number_format(floor($available_amount * 100) / 100, 2) }})</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection