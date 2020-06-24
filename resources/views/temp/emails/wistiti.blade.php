@extends('emails.main_layout')

@section('content')
	<tr>
		<td>
			<p>Mark wants to chat with you on ScreenTrack - a free project managment tool for teams.</p>
			<p>Your ScreenTrack login password: <b>123123123</b></p>
		</td>
	</tr>
	<tr>
		<td align="center">
			<div style="padding: 20px 45px; border: 1px solid #eeeeee; background-color: #eeeeee; border-radius: 10px; display: inline-block;">
				<b>Hourly Rate:</b> $20 per Hour
			</div>
		</td>
	</tr>
	<tr>
		<td>
			<p style="font-size: 14px;">Don't worry, there's <b>NO COMMISIONS</b>, all payments are <b>DAILY</b> via Stripe (Paypal & Payoneer)</p>
			<p style="font-size: 14px;"><b>Follow this link to talk with Mark: </b> <a href="#">http://www.screentrack.com/chat-mark/849333</a></p>
		</td>
	</tr>
@endsection