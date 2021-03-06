@extends('emails.main_layout')

@section('content')
 	<tr>
	 	<td style="text-align: center;">
	 		<strong>Contract where you're employee was closed</strong>
	 	</td>
 	</tr>
	<tr>
		<td style="text-align: center;">
			<strong>Contract information:</strong>
		</td>
	</tr>
	<tr>
		<td style="padding: 0 20px 30px 20px;">
			<p><strong>Your Employer:</strong> {{ $employer_full_name }}</p>
		</td>
	</tr>
	<tr>
		<td style="padding: 0 20px 30px 20px;">
			<p><strong>Your Contract Title:</strong> {{ $contract_title }}</p>
			<p><strong>Your Contract Rate:</strong> {{ $contract_hourly_rate }} $/h</p>
		</td>
	</tr>
@endsection