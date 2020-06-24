@extends('dashboard.layout')

@push('scripts')
	<script src="{{ asset_no_cache('js/vendor/chart.min.js') }}"></script>
	
	<script>
		var contracts = @json($contracts);
	</script>
	
	<script>
		$(function() {
			contracts.forEach(function(contract) {
				var ctx = $('.contract-item[data-id="' + contract.id + '"] .contract-item__activity')[0].getContext('2d');

				var chart = new Chart(ctx, {
					type: 'bar',

					data: {

						labels: Array(24).fill(0).map(function(hour, hour_index) {
							var hour_24 = (hour_index + 1);
							var hour_12 = hour_24 % 12;

							return (hour_12 < 10 ? '0' + hour_12 : hour_12) + (hour_24 >= 12 && hour_24 < 24 ? 'PM' : 'AM');
						}),

						datasets: [{
							// label: contract.employee_user.title,

							data: Array(24).fill(0).map(function(hour, hour_index) {
								var segment = contract.segments.filter(function(current_segment) {
									return current_segment.hour_index % 24 == hour_index;
								})[0];

								return segment ? segment.count_of_subsegments : 0;
							}),

							// borderColor: [
							// 	'rgba(255, 99, 132, 1)',
							// 	'rgba(54, 162, 235, 1)',
							// 	'rgba(255, 206, 86, 1)',
							// 	'rgba(75, 192, 192, 1)',
							// 	'rgba(153, 102, 255, 1)',
							// 	'rgba(255, 159, 64, 1)'
							// ],

							borderWidth: 1
						}],
					},

					options: {
						tooltips: {
							enabled: true,
						},

						legend: {
							display: false,
						},

						scales: {
							xAxes: [{
								barPercentage: 1.0,

								gridLines: {
					                display: false,
					            },

					            ticks: {
					            	fontSize: 10,
					            	display: false,
					            },
							}],

							yAxes: [{
								gridLines: {
					                display: false,
					            },

								ticks: {
									display: false,
									min: 0,
									max: 60,
								},
							}],
						},
					},
				});
			});
		});
	</script>
@endpush

@section('content')
	<section class="container py-5">
		<div class="row">
			<div class="col-md-12">
				<h3 class="[ page-title ]">Overview</h3>
			</div>
		</div>
		<div class="row">
			<table class="w-100">
				<thead>
					<th>Name</th>
					<th>Logged Time</th>
					<th>Hourly Rate</th>
					<th>Amount</th>
					<th>Activity</th>
				</thead>
				<tbody>
					@foreach ($contracts as $contract)
						<tr class="contract-item" data-id="{{ $contract->id }}">
							<td>{{ $contract->employee_user->title }}</td>
							<td>
								{{ time_interval_to_string($contract->segments->sum('count_of_subsegments') * 60, [
									'string_rounding' => 'minutes',
									'string_cutting' => 'hours',

									'format' => [
										'hours' => '%d:',
										'minutes' => '%02d',
									],
								]) }}
							</td>
							<td>
								${{ $contract->hourly_rate }}/h
							</td>
							<td>
								${{ number_format($contract->count_of_segments / 60 * $contract->hourly_rate, 2) }}
							</td>
							<td style="max-width: 400px;">
								<canvas height="30" class="contract-item__activity"></canvas>
							</td>
						</tr>
					@endforeach
				</tbody>
			</table>
		</div>
	</section>
@endsection