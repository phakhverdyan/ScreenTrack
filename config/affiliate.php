<?php

use App\Models\Referral\ReferralConnection;
use App\Models\User\User;

return [
	User::AFFILIATE_MODE_STANDARD => [
		ReferralConnection::TIER_1 => [
			'maximum_amount' => [
				ReferralConnection::INVITED_USER_TYPE_EMPLOYER => (float) '150',
				ReferralConnection::INVITED_USER_TYPE_FREELANCER => (float) '100',
			],

			'part' => extract_fee_from_string('33.3333333333333%'),
		],

		ReferralConnection::TIER_2 => [
			'maximum_amount' => (float) '50',
			'part' => extract_fee_from_string('33.3333333333333%'),
		],
	],

	User::AFFILIATE_MODE_SUPER => [
		ReferralConnection::TIER_1 => [
			'maximum_amount' => [
				ReferralConnection::INVITED_USER_TYPE_EMPLOYER => (float) '300',
				ReferralConnection::INVITED_USER_TYPE_FREELANCER => (float) '200',
			],

			'part' => extract_fee_from_string('33.3333333333333%'),
		],

		ReferralConnection::TIER_2 => [
			'maximum_amount' => (float) '100',
			'part' => extract_fee_from_string('33.3333333333333%'),
		],
	],

	User::AFFILIATE_MODE_SUPERVISOR => [
		ReferralConnection::TIER_1 => [
			'maximum_amount' => [
				ReferralConnection::INVITED_USER_TYPE_EMPLOYER => (float) '300',
				ReferralConnection::INVITED_USER_TYPE_FREELANCER => (float) '200',
			],

			'part' => extract_fee_from_string('33.3333333333333%'),
		],

		ReferralConnection::TIER_2 => [
			'maximum_amount' => (float) '100',
			'part' => extract_fee_from_string('33.3333333333333%'),
		],

		ReferralConnection::TIER_3 => [
			'maximum_amount' => (float) '10',
			'part' => extract_fee_from_string('33.3333333333333%'),
		],
	],
];