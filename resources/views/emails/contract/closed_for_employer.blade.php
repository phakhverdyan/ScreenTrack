@extends('emails.main_layout')

@section('content')
	<tr>
		<td style="text-align: center;">
			<strong>Contract where you're employer was closed</strong>
		</td>
	</tr>
	<tr>
		<td style="text-align: center;">
			<strong>Contract information:</strong>
		</td>
	</tr>
	<tr>
		<td style="padding: 0 20px 30px 20px;">
			<p><strong>Contractor:</strong> {{ $employee_full_name }}</p>
			<p><strong>Title:</strong> {{ $contract_title }}</p>
			<p><strong>Rate:</strong> {{ $contract_hourly_rate }} $/h</p>
		</td>
	</tr>
@endsection