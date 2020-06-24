<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Demystifying Email Design</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<style type="text/css">
  	body {
	    font-family: Helvetica, 'Open Sans', sans-serif;
	    color: #4E5C6E;
  	}

	hr {
		opacity: 0.2;
	}
</style>
<body>
	<table align="center" width="600" style="border-collapse: collapse; background: #fff; border-radius: 15px;">
	 	<tr>
		  	<td style="padding: 20px 20px 30px 20px;" align="center">
			  	<div style="text-align: center; margin-top: 1rem; margin-bottom: 1rem;">
		  			<div style="font-size: 20px;">
		                <img src="{{ asset_no_cache('img/favicon/android-chrome-192x192.png') }}" style="width: 40px; vertical-align: middle;">
		                <span style="vertical-align: middle; margin-left: 3px;">Screen<b>Track</b></span>
		            </div>
		  		</div>
		  	</td>
	 	</tr>
	 	@yield('content')
	 	@if ($layout_user)
		 	<tr>
		 		<td style="padding-top: 80px;">
		 			<div style="float: left; font-size: 15px;">
		 				<span style="display: inline-block; vertical-align: middle;">Here's why</span>
		 				<span style="display: inline-block; vertical-align: middle; font-size: 25px; margin: 0 5px;">thousands</span>
		 				<span style="display: inline-block; vertical-align: middle;">of Freelancers & Teams</span>
		 				<img src="{{ asset_no_cache('img/in-love.png') }}" width="45" height="45" alt="" title="" style="vertical-align: middle;     margin: 0 5px;"> 
		 				<span style="display: inline-block; vertical-align: middle; font-size: 25px;"><b>ScreenTrack</b></span>
		 			</div>
		 			<div style="float: right; padding-top: 20px;">
		 				<img src="{{ asset_no_cache('img/email-arrow-affiliate.png') }}" alt="">
		 			</div>
		 			<div style="clear: both;"></div>
		 		</td>
		 	</tr>
		 	<tr>
		 		<td style="padding-bottom: 50px;">
	 				<div style="float: left; margin-right: 20px; margin-top: 20px;">
	 					<img src="{{ asset_no_cache('img/moneyemail.png') }}" width="45" height="45" alt="" title=""> 
	 				</div>
	 				<div style="float: right;">
	 					<p style="font-size: 15px;">Get <b>$150</b> per employer, <b>$100</b> per freelancer and <b>$50</b> for every user <b>THEY</b> refer.</p>
	 					<p style="font-size: 15px;">
	 						<b>Get your Affiliate link</b>
	 						<a href="{{ route('affiliates', locale()) }}?flt={{ $layout_user->fast_login_token }}">ScreenTrack's Affiliate Program</a>
	 					</p>
	 				</div>
	 				<div style="clear: both;"></div>
		 		</td>
		 	</tr>
		 	<tr>
		 		<td style="text-align: center;">
		 			<p style="margin: 0; font-weight: 500; font-size: 20px;">ScreenTrack supports payments in 200+ countries via</p>
		 			<div style="font-size: 40px;">
		 				<img src="{{ asset_no_cache('img/paypal-logo.png') }}" width="100" alt="" title="" style="opacity: 0.5;">
		 				<img src="{{ asset_no_cache('img/payoneer-logo.png') }}" width="100" alt="" title="" style="opacity: 0.5;">
		 				<img src="{{ asset_no_cache('img/mastercard-logo-2.png') }}" width="100" alt="" title="" style="opacity: 0.5;">
		 				<img src="{{ asset_no_cache('img/visa-pay-logo.png') }}" width="100" alt="" title="" style="opacity: 0.5;">
		 			</div>
		 		</td>
		 	</tr>
		 	<tr>
				<td style="padding-top: 50px;">
					<p>
						<b>Questions?</b> Visit our <a href="{{ route('faq') }}?flt={{ $layout_user->fast_login_token }}">FAQ for freelancers & contractors</a>
					</p>
				</td>
			</tr>
		@endif
		<tr>
			<td style="font-size: 14px;">
				<div>Sincerely,</div>
				<div>The ScreenTrack team</div>
			</td>
		</tr>
		<tr>
			<td>
				<p style="font-size: 14px;">
					© {{ date('Y') }} ScreenTrack, INC.
				</p>
			</td>
		</tr>
		<tr>
			<td>
				<p style="font-size: 12px;">To unsubscribe, please log in to your account and change your notification settings.</p>
			</td>
		</tr>
	 	<tr>
		  	<td style="padding: 20px 20px 30px 20px;" align="center">
			  	<div>
			  		<img src="{{ asset_no_cache('img/favicon/android-chrome-192x192.png') }}" width="45" height="45" alt="" title="">
			  	</div>
		  	</td>
	 	</tr>
	</table>
</body>
</html>