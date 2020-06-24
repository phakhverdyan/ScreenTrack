@extends('emails.main_layout')

@section('content')
 	<tr>
	 	<td style="text-align: center;">
	 		<strong>User complete Interview</strong>
	 	</td>
 	</tr>
	
 	<tr>
	  	<td style="padding: 0 20px;">
			<p>User: {{ $user->full_name }}</p>
			@foreach($interview_result->questions as $key => $question)
				<p><b>{{ $loop->iteration }}. {{ $question['title'] }}</b></p>
				<p>{{ $question['details'] }}</p>
				<p><b>Answer:</b> {{ $interview_result->answers[$key] }}</p>
				<hr/>
			@endforeach
	  	</td>
 	</tr>
@endsection