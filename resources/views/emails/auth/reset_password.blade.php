@extends('emails.main_layout')

@section('content')
 	<tr>
	 	<td style="text-align: center;">
	 		<strong>Password Reset</strong>
	 	</td>
 	</tr>
	
 	<tr>
	  	<td style="padding: 0 20px;">
  	 		<p>Greetings from ScreenTrack,</p>
	   		<p>Please, click on this link to change your password:</p>
	   		<p>
	   			<a href="{{ route('password_reset', [
					'reset_password_token' => $password_reset->token,
				]) }}" target="_blank">{{ route('password_reset', [
					'reset_password_token' => $password_reset->token,
				]) }}</a>
			</p>
	  	</td>
 	</tr>
@endsection