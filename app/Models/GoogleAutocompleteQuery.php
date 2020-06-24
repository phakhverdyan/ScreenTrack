<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\GoogleAutocompleteQuery
 *
 * @property int $id
 * @property string $input
 * @property string|null $types
 * @property string|null $components
 * @property string|null $language
 * @property array $predictions
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\GoogleAutocompleteQuery newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\GoogleAutocompleteQuery newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\GoogleAutocompleteQuery query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\GoogleAutocompleteQuery whereComponents($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\GoogleAutocompleteQuery whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\GoogleAutocompleteQuery whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\GoogleAutocompleteQuery whereInput($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\GoogleAutocompleteQuery whereLanguage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\GoogleAutocompleteQuery wherePredictions($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\GoogleAutocompleteQuery whereTypes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\GoogleAutocompleteQuery whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class GoogleAutocompleteQuery extends Model
{
	public $casts = [
		'predictions' => 'array',
	];

	public function setPredictionsAttribute($value)
	{
		$this->attributes['predictions'] = json_encode($value, JSON_UNESCAPED_UNICODE);
	}

    public static function getOrMake($query)
    {
    	$query['components'] = $query['components'] ?? null;
   		
    	$google_autocomplete_query_query = GoogleAutocompleteQuery::query();
		$google_autocomplete_query_query->where('input', $query['input']);
		$google_autocomplete_query_query->where('types', $query['types']);
		$google_autocomplete_query_query->where('components', $query['components']);
		$google_autocomplete_query_query->where('language', $query['language']);

		if ($google_autocomplete_query = $google_autocomplete_query_query->first()) {
			return $google_autocomplete_query;
		}

    	$client = new \GuzzleHttp\Client;

        $response = $client->get('https://maps.googleapis.com/maps/api/place/autocomplete/json', [
            'query' => [
            	'input'     	=> $query['input'],
	            'types'     	=> $query['types'],
	            'components' 	=> $query['components'],
	            'sensor'    	=> false,
	            'language' 		=> $query['language'],
	            'key'       	=> env('GOOGLE_MAPS_API_KEY', 'AIzaSyD3mcG8oAZzzlCSGZt5B4u5h5LmBX1SgjE'),
	        ],
        ]);

		$response = json_decode($response->getBody());
		$google_autocomplete_query = new GoogleAutocompleteQuery;
		$google_autocomplete_query->input = $query['input'];
		$google_autocomplete_query->types = $query['types'];
		$google_autocomplete_query->components = $query['components'];
		$google_autocomplete_query->language = $query['language'];

		$google_autocomplete_query->predictions = array_map(function ($prediction) {
			return [
				'full_address' => $prediction->description,
				'matched_substring' => $prediction->matched_substrings[0],
				'place_id' => $prediction->place_id,

				'short_address' => implode(', ', array_map(function ($term) {
					return $term->value;
				}, array_slice($prediction->terms, 0, -1))),

				'type' => $prediction->types[0],
			];
		}, $response->predictions ?? []);

		$google_autocomplete_query->save();

		return $google_autocomplete_query;
    }
}
