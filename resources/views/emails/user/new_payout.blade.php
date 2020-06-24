@extends('emails.main_layout')

@section('content')
	<tr>
	 	<td style="text-align: center;">
	 		<strong>New PayPage Payout</strong>
	 	</td>
	</tr>

	<tr>
	  	<td style="padding: 0 20px;">
		   	<p>Greetings from Paypage,</p>
		   	<p>Congratulations! You’ve just received an automatic payout.</p>
	  	</td>
	</tr>
	
	<tr>
	  	<td style="padding: 0 20px 30px 20px; text-align: center;">
  			<p><strong>Paypal </strong> ${{ $payout->original_amount }} USD</p>
	  	</td>
	</tr>
@endsection