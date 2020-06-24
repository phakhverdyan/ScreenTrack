<?php

namespace App\Http\Controllers\Api\Geo;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\GoogleAutocompleteQuery;
use App\Models\Geo\Locality;
use App\Models\Geo\Country;
use App\Models\Geo\CountryTranslation;

class LocalityController extends Controller
{
    public function autocomplete(Request $request)
    {
        validator()->make($request->all(), [
            'query' => 'nullable|string',
            'country_code' => 'nullable|string|exists:countries,alpha2_code',
        ])->validate();

        if (!$request->input('query')) {
            return response()->resource([]);
        }

    	$country = null;

    	if ($request->input('country_code')) {
    		$country = Country::where('alpha2_code', $request->input('country_code'))->firstOrFail();
    	}

    	$google_autocomplete_query = GoogleAutocompleteQuery::getOrMake([
        	'input'     	=> $request->input('query'),
            'types'     	=> '(cities)',
            'components' 	=> ($country ? 'country:' . $country->alpha2_code : null),
            'language' 		=> locale(),
        ]);

        $country_short_names = array_values(array_unique(array_map(function ($prediction) {
        	$full_address_parts = explode(',', $prediction['full_address']);

        	return trim($full_address_parts[count($full_address_parts) - 1]);
        }, $google_autocomplete_query->predictions)));

        $country_query = Country::query();

        if (locale() == 'en') {
        	$country_query->selectRaw('countries.*, countries.short_name_en AS short_name');
        	$country_query->whereIn('countries.short_name_en', $country_short_names);
        } else {
        	$country_query->selectRaw('countries.*, country_translations.short_name AS short_name');
        	$country_query->join('country_translations', 'countries.alpha2_code', '=', 'country_translations.country_code');
        	$country_query->where('country_translations.locale', locale());
        	$country_query->whereIn('country_translations.short_name', $country_short_names);
        }

        $countries = $country_query->get();

        $localities = array_map(function ($prediction) use ($countries, $request) {
        	$full_address_parts = explode(',', $prediction['full_address']);
        	$prediction_country_short_name = trim($full_address_parts[count($full_address_parts) - 1]);
        	
        	if ($country = $countries->where('short_name', $prediction_country_short_name)->first()) {
        		$prediction['country_code'] = $country->alpha2_code;

        		if ($request->has('with_country')) {
	        		$prediction['country'] = $country;
	        	}
        	} else {
        		if (!$locality = Locality::getOrMakeByKey($prediction['place_id'])) {
        			return null;
        		}

        		$prediction['country_code'] = $locality->country_code;

        		if ($request->has('with_country')) {
        			$locality->load('country');
	        		$prediction['country'] = $locality->country;
	        	}
        	}

        	$prediction['key'] = $prediction['place_id'];
        	unset($prediction['place_id']);
            
        	return $prediction;
        }, $google_autocomplete_query->predictions);

        $localities = array_filter($localities, function ($locality) {
        	return $locality;
        });

        return response()->resource($localities);
    }
}
