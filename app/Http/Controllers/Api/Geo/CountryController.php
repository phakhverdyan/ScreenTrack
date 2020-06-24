<?php

namespace App\Http\Controllers\Api\Geo;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Geo\Country;
use App\Models\Company\CompanySize;
use App\Models\GoogleAutocompleteQuery;

class CountryController extends Controller
{
    public function autocomplete(Request $request)
    {
    	$countries = null;
    	$country_query = Country::query();

    	if (!$request->has('phone_number_mask_not_required')) {
    		$country_query->where('phone_number_mask', '!=', null);
    	}

    	if ($request->has('get_all')) {
    		$first_country_codes = config('countries.first_country_codes');
    		$countries = $country_query->orderBy('id', 'asc')->get();

    		$first_countries = $countries->whereIn('alpha2_code', $first_country_codes)->sortBy(function ($country) use ($first_country_codes) {
				return array_search($country->alpha2_code, $first_country_codes);
			})->values();

			$remaining_countries = $countries->whereNotIn('alpha2_code', $first_country_codes)->values();
    		$countries = $first_countries->concat($remaining_countries)->values();

    		return response()->resource($countries);
    	}

		if (!$request->input('phrase') && is_string($request->input('phrase'))) {
			$phrase_parts = collect(preg_split('/[-,\s]+/', $request->input('phrase')));
			$first_phrase_part = $phrase_parts[0];

			$country_query->where(function ($where) use ($first_phrase_part) {
				$where->orWhere('name', 'like', $first_phrase_part . '%');
				$where->orWhere('native_name', 'like', $first_phrase_part . '%');
			});

			foreach ($phrase_parts->slice(1) as $phrase_part) {
				$country_query->where(function ($where) use ($phrase_part) {
					$where->orWhere('name', 'like', '%' . $phrase_part . '%');
					$where->orWhere('native_name', 'like', '%' . $phrase_part . '%');
				});
			}

			$countries = $country_query->take(25)->get();
		} else {
			$first_country_codes = config('countries.first_country_codes');
			$country_query->whereIn('alpha2_code', $first_country_codes);

			$countries = $country_query->get()->sortBy(function ($country) use ($first_country_codes) {
				return array_search($country->alpha2_code, $first_country_codes);
			})->values();
		}

		return response()->resource($countries);
    }
}
