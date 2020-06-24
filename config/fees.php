<?php

return [
	'processing' => extract_fee_from_string(env('PROCESSING_FEE', '6%')),
	'stripe' => extract_fee_from_string(env('STRIPE_FEE', '2.9%+0.30')),
];