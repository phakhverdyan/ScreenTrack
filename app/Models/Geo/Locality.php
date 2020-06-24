<?php

namespace App\Models\Geo;

use Illuminate\Database\Eloquent\Model;
use App\Models\Geo\LocalityTranslation;
use App\Models\Geo\Country;

/**
 * App\Models\Geo\Locality
 *
 * @property int $id
 * @property string $key
 * @property string $name_en
 * @property string $short_address_en
 * @property string $full_address_en
 * @property string|null $administrative_area_level_2_en
 * @property string|null $administrative_area_level_1_en
 * @property string $country_code
 * @property string|null $postal_code
 * @property float|null $latitude
 * @property float|null $longitude
 * @property int|null $utc_offset
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Geo\Country $country
 * @property-read mixed $administrative_area_level1
 * @property-read mixed $administrative_area_level2
 * @property-read mixed $full_address
 * @property-read mixed $name
 * @property-read mixed $short_address
 * @property-read \App\Models\Geo\LocalityTranslation $relevant_translation
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Geo\LocalityTranslation[] $translations
 * @property-read int|null $translations_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Locality newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Locality newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Locality query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Locality whereAdministrativeAreaLevel1En($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Locality whereAdministrativeAreaLevel2En($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Locality whereCountryCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Locality whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Locality whereFullAddressEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Locality whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Locality whereKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Locality whereLatitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Locality whereLongitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Locality whereNameEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Locality wherePostalCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Locality whereShortAddressEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Locality whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Locality whereUtcOffset($value)
 * @mixin \Eloquent
 */
class Locality extends Model
{
	public $appends = [
		'name',
		'short_address',
		'full_address',
		'administrative_area_level_2',
		'administrative_area_level_1',
	];

	public $hidden = [
		'relevant_translation',
		'translations',
		'name_en',
		'short_address_en',
		'full_address_en',
		'administrative_area_level_2_en',
		'administrative_area_level_1_en',
	];

	// ---------------------------------------------------------------------- //
	// 
	// - Attribute Methods
	// 
	// ---------------------------------------------------------------------- //

	public function getNameAttribute()
	{
		return get_localized_attribute($this, 'name');
	}

	public function getShortAddressAttribute()
	{
		return get_localized_attribute($this, 'short_address');
	}

	public function getFullAddressAttribute()
	{
		return get_localized_attribute($this, 'full_address');
	}

	public function getAdministrativeAreaLevel2Attribute()
	{
		return get_localized_attribute($this, 'administrative_area_level_2');
	}

	public function getAdministrativeAreaLevel1Attribute()
	{
		return get_localized_attribute($this, 'administrative_area_level_1');
	}

	// ---------------------------------------------------------------------- //
	// 
	// - Relation Methods
	// 
	// ---------------------------------------------------------------------- //

	public function country()
	{
		return $this->belongsTo(Country::class, 'country_code', 'alpha2_code');
	}

	public function translations()
	{
		return $this->hasMany(LocalityTranslation::class);
	}

	public function relevant_translation()
    {
        return $this->hasOne(LocalityTranslation::class)->where('locale', locale());
    }

	// ---------------------------------------------------------------------- //
	// 
	// - Static Methods
	// 
	// ---------------------------------------------------------------------- //

    public static function getOrMakeByKey($key, $locale = null)
    {
    	if (!$key || !is_string($key)) {
    		return null;
    	}

    	$locale = $locale ?: locale();
    	$locality_query = Locality::query();
    	$locality_query->where('key', $key);
    	
    	$locality_query->with([
    		'translations',
    		'country',
    	]);

    	$locality = $locality_query->first();

    	if ($locality && ($locale == 'en' || $locality->translations->where('locale', $locale)->first())) {
    		return $locality;
    	}

    	if (!$locality) {
    		if (!$english_place = google_autocomplete_get_place_by_id($key, 'en')) {
    			return null;
    		}
    		
    		$locality = new Locality;
    		$locality->key = $english_place->id;
    		$locality->name_en = $english_place->name;
	    	$locality->short_address_en = $english_place->short_address;
	    	$locality->full_address_en = $english_place->full_address;
	    	$locality->administrative_area_level_2_en = $english_place->administrative_area_level_2;
	    	$locality->administrative_area_level_1_en = $english_place->administrative_area_level_1;
		    $locality->country_code = $english_place->country_code;
		    $locality->postal_code = $english_place->postal_code;
		    $locality->latitude = $english_place->latitude;
		    $locality->longitude = $english_place->longitude;
		    $locality->utc_offset = $english_place->utc_offset;
		    $locality->setRelation('translations', collect());

		    try {
		    	$locality->save();
		    } catch (\Illuminate\Database\QueryException $exception) {
		    	if ($exception->errorInfo[1] == 1062) {
		    		$locality = Locality::where('key', $english_place->id)->first();
		    	} else {
		    		throw $exception;
		    	}
		    }

		    $country_query = Country::query();
		    $country_query->where('alpha2_code', $english_place->country_code);
		    $country = $country_query->firstOrFail();
	    	$country->name_en = $english_place->country_name;
	    	$country->short_name_en = $english_place->country_short_name;
	    	$country->save();
	    	$locality->setRelation('country', $country);
    	}

    	if ($locale != 'en' && !$locality->translations->where('locale', $locale)->first()) {
    		$translated_place = google_autocomplete_get_place_by_id($key, $locale);
	    	$locality_translation = new LocalityTranslation;
	    	$locality_translation->locality_id = $locality->id;
	    	$locality_translation->locale = $locale;
	    	$locality_translation->name = $translated_place->name;
	    	$locality_translation->short_address = $translated_place->short_address;
	    	$locality_translation->full_address = $translated_place->full_address;
	    	$locality_translation->administrative_area_level_1 = $translated_place->administrative_area_level_1;
	    	$locality_translation->administrative_area_level_2 = $translated_place->administrative_area_level_2;
	    	$locality_translation->save();
	    	$locality->translations->push($locality_translation);
	    	
	    	$country_translation_query = CountryTranslation::query();
	    	$country_translation_query->where('country_code', $translated_place->country_code);
	    	$country_translation_query->where('locale', $locale);

	    	if (!$country_translation = $country_translation_query->first()) {
	    		$country_translation = new CountryTranslation;
	    		$country_translation->country_code = $translated_place->country_code;
	    		$country_translation->locale = $locale;
	    		$country_translation->name = $translated_place->country_name;
	    		$country_translation->short_name = $translated_place->country_short_name;
	    		$locality->country->setRelation('relevant_translation', $country_translation);
	    	}

	    	$country_translation->save();
    	}

	    return $locality;
    }
}
