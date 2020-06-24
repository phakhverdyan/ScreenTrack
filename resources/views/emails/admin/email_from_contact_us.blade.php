@extends('emails.main_layout')

@section('content')
	<tr>
		<td style="text-align: center;">
			<strong>Message from Contact Us</strong>
		</td>
	</tr>

	<tr>
		<td style="padding: 0 20px;">
			<div><b>Type: </b> {{ $contact_us_type }} </div>
			<div><b>Email: </b> {{ $contact_us_email }} </div>
			<div><b>Name: </b> {{ $contact_us_name }}</div>
			<div><b>Message Title: </b> {{ $contact_us_message_title }} </div>
			<div><b>Message Text: </b> {{ $contact_us_message_text }} </div>
		</td>
	</tr>
@endsection