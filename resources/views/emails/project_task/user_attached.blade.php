@extends('emails.main_layout')

@section('content')
 	<tr>
	 	<td style="text-align: center;">
	 		<strong>You was attached to Task</strong>
	 	</td>
 	</tr>
	<tr>
		<td style="padding: 0 20px 30px 20px;">
			<p><strong>Project:</strong> {{ $task->project->name }}</p>
			<p><strong>Task:</strong> {{ $task->title }}</p>
		</td>
	</tr>
@endsection