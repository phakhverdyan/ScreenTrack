<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
 <head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>Demystifying Email Design</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<style type="text/css">
	body {
	    font-family: 'Open Sans', sans-serif;
	    color: #4E5C6E;
	}

	.common__top-logo-box {
	    margin: 0 auto;
	    width: 80px;
	    height: 80px;
	    border-radius: 25px;
	    background-color: #fdbb05;
        box-sizing: border-box;
    	padding-top: 20px;
	}
	hr {
		opacity: 0.2;
	}
</style>
<body>

	<table align="center" width="600" style="border-collapse: collapse; background: #fff; border-radius: 15px;">

		<tr>
		  	<td style="padding: 20px 20px 30px 20px;" align="center">
			  	<div class="common__top-logo-box">
	        		<img src="{{ asset_no_cache('/img/paypage_darkblue.png') }}" width="45" height="45" alt="" title="">
		        </div>
		  	</td>
		</tr>

		<tr>
		 	<td style="text-align: center;">
		 		<strong>
		 			New Payout
		 		</strong>
		 	</td>
		</tr>
		
		<tr>
			<td style="padding: 0 20px 30px 20px;">
				<p>{{ $payout->user->title }}</p>
				<p>Amount: ${{ $payout->original_amount }}</p>
				<p>
					<strong>Influencer Email:</strong>
					{{ $payout->user->email }}
				</p>
				<p>
					<strong>Influencer Locality:</strong>
					{{ $payout->user->locality ? $payout->user->locality->address : 'Undisclosed' }}
				</p>
				<p>
					<a href="{{ url($payout->user->slug) }}" target="_blank">Go to Influencer PayPage</a>
				</p>
			</td>
		</tr>
	</table>
</body>
</html>