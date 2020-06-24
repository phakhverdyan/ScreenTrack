<?php

use Illuminate\Database\Seeder;
use App\Models\Geo\Country;
use App\Models\Geo\CountryTranslation;

class CountriesTableSeeder extends Seeder
{
	public function run()
	{
		try {
			$response_countries = json_decode(File::get(storage_path('app/geo/countries.json')));
		} catch (FileNotFoundException $exception) {
			$client = new GuzzleHttp\Client;
			$response = $client->request('GET', 'https://restcountries.eu/rest/v2/');
			$response_countries = json_decode($response->getBody()->getContents());
			File::put(storage_path('app/geo/countries.json'), json_encode($response_countries, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
		}
		
		$ignoring_country_codes = config('countries.ignoring_country_codes');
		// Country::truncate();
		// CountryTranslation::truncate();

		foreach ($response_countries as $response_country) {
			if (in_array($response_country->alpha2Code, $ignoring_country_codes)) {
				continue;
			}

			if (!$country = Country::where('alpha2_code', $response_country->alpha2Code)->first()) {
				$country = new Country;
			}

			$country->name_en = $response_country->name;
			$country->top_level_domains = $response_country->topLevelDomain;
			$country->alpha2_code = $response_country->alpha2Code;
			$country->alpha3_code = $response_country->alpha3Code;
			
			$country->calling_codes = array_filter($response_country->callingCodes, function ($calling_code) {
				return $calling_code;
			});

			$country->capital = $response_country->capital;
			$country->alt_spellings = $response_country->altSpellings;
			$country->region = $response_country->region;
			$country->subregion = $response_country->subregion;
			$country->population = $response_country->population;
			$country->latitude = $response_country->latlng[0] ?? null;
			$country->longitude = $response_country->latlng[1] ?? null;
			$country->demonym = $response_country->demonym;
			$country->area = $response_country->area;
			$country->gini = $response_country->gini;
			$country->timezones = $response_country->timezones;
			$country->borders = $response_country->borders;
			$country->native_name = $response_country->nativeName;
			$country->numeric_code = $response_country->numericCode;

			$country->currencies = array_map(function ($currency) {
				return $currency->code;
			}, $response_country->currencies);

			$country->languages = array_map(function ($language) {
				return $language->iso639_1;
			}, $response_country->languages);

			$country->cioc = $response_country->cioc;
			$country->save();
		}
		
		// ---------------------------------------------------------------------- //
		
		$countryPhoneNumberDetails = json_decode(File::get(storage_path('app/geo/country-phone-masks.json')), true);

		foreach ($countryPhoneNumberDetails as $country_code => $countryPhoneNumberDetail) {
			Country::where('alpha2_code', $country_code)->update([
				'phone_code' => $countryPhoneNumberDetail['phone_code'],
				'phone_number_mask' => $countryPhoneNumberDetail['phone_number_mask'],
			]);
		}

		echo "The `countries` table were seeded successfully.\n";
	}
}
