@extends('emails.main_layout')

@section('content')
 	<tr>
	 	<td style="text-align: center;">
	 		<strong>You was invited to the project in ScreenTrack</strong>
	 	</td>
 	</tr>
	<tr>
		<td style="padding: 0 20px 30px 20px;">
			<p><strong>Project:</strong> {{ $project->name }}</p>
		</td>
	</tr>
	@if($contract)
		<tr>
			<td style="text-align: center;">
				<strong>Your Contract information:</strong>
			</td>
		</tr>
		<tr>
			<td style="padding: 0 20px 30px 20px;">
				<p><strong>Title:</strong> {{ $contract->title }}</p>
				<p><strong>Rate:</strong> {{ $contract->hourly_rate }} $/h</p>
			</td>
		</tr>
	@endif
	<tr>
		<td style="text-align: center;">
			<strong>Access:</strong>
		</td>
	</tr>
	<tr>
		<td style="padding: 0 20px 30px 20px;">
			<p><strong>Email:</strong> {{ $user->email }}</p>
			<p><strong>Password:</strong> {{ $auto_generated_password }}</p>
			<p><strong>ScreenTrack dashboard link:</strong> <a href="{{ config('app.url').'/dashboard' }}">{{ config('app.url').'/dashboard' }}</a></p>
		</td>
	</tr>
@endsection