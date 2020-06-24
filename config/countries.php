<?php

return [
	'first_country_codes' => [
		'US', 'CA', 'UK', 'FR', 'DE', 'AT', 'AU',
		'BR', 'IE', 'SP', 'SW', 'DK', 'NL', 'FI',
		'SE', 'NO', 'RU', 'UA', 'IN', 'PK', 'BD',
	],

	'ignoring_country_codes' => [
		// high risk countries
		'MM', 'IR', 'IQ', 'KP', 'LY', 'SD', 'SY',

		// unexistent countries
		'BQ', 'BV', 'IO', 'UM', 'GF', 'GP', 'HM',
		'XK', 'RE', 'PM', 'SX', 'SJ',

		// Antarctica (brrr, it is sooo cold there :/)
		'AQ',
	],
];