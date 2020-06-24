@extends('emails.main_layout')

@section('content')
	<tr>
	  	<td>
			<p>Welcome to ScreenTrack! - <b>a free time tracker</b> with screenshots.</p>
		</td>
	</tr>
	<tr>
		<td>
			<p>You can use this email: <b>{{ $registered_user->email ?? 'test@test.com' }}</b></p>
			<p>Here’s your account password: <b>{{ $registered_user_original_password ?? '12345' }}</b></p>
		</td>
	</tr>
	<tr>
		<td>
			<p>
				<img src="{{ asset_no_cache('img/finger-right.png') }}" alt="" width="20px" style="vertical-align: top; margin-top: -2px;">
				<b>1 - Download the Time-Tracker App:</b>
				<a href="{{ route('download_app') }}?flt={{ $registered_user->fast_login_token }}">{{ route('download_app') }}</a>
			</p>
			<p>
				<img src="{{ asset_no_cache('img/finger-right.png') }}" alt="" width="20px" style="vertical-align: top; margin-top: -2px;">
				<b>2 - Go to Dashboard:</b>
				<a href="{{ route('dashboard.index') }}?flt={{ $registered_user->fast_login_token }}">{{ route('dashboard.index') }}</a>
			</p>
		</td>
	</tr>
	<tr>
		<td>
			<p>This is what you get with a <b>free</b> ScreenTrack account:</p>
		</td>
	</tr>
	@if (isset($registered_user) && $registered_user->plan->plan->account_type == 'Company')
		<tr>
			<td>
				<p>
					<img src="{{ asset_no_cache('img/check-mark-icon.png') }}" alt="" width="20px" style="vertical-align: top; margin-top: -1px;">
					12 Screenshots per hour
				</p>
				<p>
					<img src="{{ asset_no_cache('img/check-mark-icon.png') }}" alt="" width="20px" style="vertical-align: top; margin-top: -1px;">
					0% Commission
				</p>
				<p>
					<img src="{{ asset_no_cache('img/check-mark-icon.png') }}" alt="" width="20px" style="vertical-align: top; margin-top: -1px;">
					Unlimited Screenshots
				</p>
				<p>
					<img src="{{ asset_no_cache('img/check-mark-icon.png') }}" alt="" width="20px" style="vertical-align: top; margin-top: -1px;">
					Unlimited Freelancer Key/Mouse Activity Tracking
				</p>
				<p>
					<img src="{{ asset_no_cache('img/check-mark-icon.png') }}" alt="" width="20px" style="vertical-align: top; margin-top: -1px;">
					Unlimited Messaging
				</p>
				<p>
					<img src="{{ asset_no_cache('img/check-mark-icon.png') }}" alt="" width="20px" style="vertical-align: top; margin-top: -1px;">
					Unlimited Projects
				</p>
				<p>
					<img src="{{ asset_no_cache('img/check-mark-icon.png') }}" alt="" width="20px" style="vertical-align: top; margin-top: -1px;">
					Unlimited Project Managers
				</p>
				<p>
					<img src="{{ asset_no_cache('img/check-mark-icon.png') }}" alt="" width="20px" style="vertical-align: top; margin-top: -1px;">
					Unlimited Payable Tasks
				</p>
				<p>
					<img src="{{ asset_no_cache('img/check-mark-icon.png') }}" alt="" width="20px" style="vertical-align: top; margin-top: -1px;">
					Premium Payment Protection
				</p>
				<p>
					<img src="{{ asset_no_cache('img/check-mark-icon.png') }}" alt="" width="20px" style="vertical-align: top; margin-top: -1px;">
					Paypal & Payoneer Payouts
				</p>
			</td>
		</tr>
	@else
		<tr>
			<td>
				<p>
					<img src="{{ asset_no_cache('img/check-mark-icon.png') }}" alt="" width="20px" style="vertical-align: top; margin-top: -1px;">
					0% Commission
				</p>
				<p>
					<img src="{{ asset_no_cache('img/check-mark-icon.png') }}" alt="" width="20px" style="vertical-align: top; margin-top: -1px;">
					Unlimited Screenshots
				</p>
				<p>
					<img src="{{ asset_no_cache('img/check-mark-icon.png') }}" alt="" width="20px" style="vertical-align: top; margin-top: -1px;">
					Unlimited Messaging
				</p>
				<p>
					<img src="{{ asset_no_cache('img/check-mark-icon.png') }}" alt="" width="20px" style="vertical-align: top; margin-top: -1px;">
					Unlimited Projects
				</p>
				<p>
					<img src="{{ asset_no_cache('img/check-mark-icon.png') }}" alt="" width="20px" style="vertical-align: top; margin-top: -1px;">
					Unlimited Project Managers
				</p>
				<p>
					<img src="{{ asset_no_cache('img/check-mark-icon.png') }}" alt="" width="20px" style="vertical-align: top; margin-top: -1px;">
					Unlimited Payable Tasks
				</p>
				<p>
					<img src="{{ asset_no_cache('img/check-mark-icon.png') }}" alt="" width="20px" style="vertical-align: top; margin-top: -1px;">
					Premium Payment Protection
				</p>
				<p>
					<img src="{{ asset_no_cache('img/check-mark-icon.png') }}" alt="" width="20px" style="vertical-align: top; margin-top: -1px;">
					Paypal & Payoneer Payouts
				</p>
			</td>
		</tr>
	@endif
@endsection