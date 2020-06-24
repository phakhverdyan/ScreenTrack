@extends('emails.main_layout')

@section('content')
	<tr>
		<td>
			<p>{{ $inviting_user->first_name ?: $inviting_user->slug }} wants to chat with you on <b>ScreenTrack</b> - a free project managment tool for teams.</p>
			<div style="text-align: center;">
				<div style="display: inline-block; vertical-align: top; padding: 20px;">
					<span style="font-size: 70px; display: inline-block; height: 36px; overflow: hidden;">&ldquo;</span>
					<b>{{ $chat_message->text }}</b>
					<span style="font-size: 70px; margin-top: -15px; display: inline-block; height: 36px; overflow: hidden; vertical-align: middle;">&rdquo;</span>
				</div>
			</div>
			@if (isset($invited_user) && $invited_user && $invited_user_was_recently_created)
				<p>Your login email: <b>{{ $invited_user->email ?? 'test@gmail.com' }}</b></p>
				<p>Your password: <b>{{ $invited_user_original_password ?? '-----' }}</b></p>
			@endif
		</td>
	</tr>
	@if (isset($project) && $project)
		<tr>
			<td>
				<p>You've also been invited to the Project: <b>{{ $project->name ?? 'Test Project' }}</b></p>
				<p>Your role: {{ $project_member->role ?? 'CONTRACTOR' }}</p>
			</td>
		</tr>
	@endif
	@if (isset($contract) && $contract)
		<tr>
			<td style="padding: 20px 20px; text-align: center;">
				<div style="display: inline-block; vertical-align: top; padding: 20px; border-radius: 5px; border: 1px solid #7c7c7c; background-color: #f6f6f6;">
					<img src="{{ asset_no_cache('img/cash.png') }}" width="40px" style="vertical-align: middle; margin-right: 5px;">
					<b style="display: inline-block; vertical-align: middle;">Hourly Rate:</b>
					<b style="display: inline-block; vertical-align: middle; font-size: 22px;">${{ number_format($contract->hourly_rate ?? 20.3, 2) }} USD</b>
				</div>
			</td>
		</tr>
	@endif
	<tr>
		<td>
			<p>
				<img src="{{ asset_no_cache('img/check-mark-icon.png') }}" alt="" width="20px" style="vertical-align: top; margin-top: -2px;">
				Don't worry, there's <b>NO COMMISSIONS</b>
			</p>
			<p>
				<img src="{{ asset_no_cache('img/check-mark-icon.png') }}" alt="" width="20px" style="vertical-align: top; margin-top: -2px;">
				All payments are <b>DAILY</b> via <b>MasterCard</b> & <b>VISA</b> (<b>Paypal & Payoneer</b>).
			</p>
			<p>
				<img src="{{ asset_no_cache('img/finger-right.png') }}" alt="" width="20px" style="vertical-align: top; margin-top: -2px;">
				<b>1 - Download the Time-Tracker App:</b>
				<a href="{{ route('download_app') }}?flt={{ $invited_user->fast_login_token }}">{{ route('download_app') }}</a>
			</p>
			<p>
				<img src="{{ asset_no_cache('img/finger-right.png') }}" alt="" width="20px" style="vertical-align: top; margin-top: -2px;">
				<b>2 - Follow this link to talk with {{ $inviting_user->first_name ?: $inviting_user->slug }}:</b>
				<a href="{{ route('dashboard.index') }}?flt={{ $invited_user->fast_login_token }}">{{ route('dashboard.index') }}</a>
			</p>
		</td>
	</tr>
@endsection