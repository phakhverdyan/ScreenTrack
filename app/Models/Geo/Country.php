<?php

namespace App\Models\Geo;

use Illuminate\Database\Eloquent\Model;
use App\Models\Geo\CountryTranslation;

/**
 * App\Models\Geo\Country
 *
 * @property int $id
 * @property string|null $name_en
 * @property string|null $short_name_en
 * @property string $alpha2_code
 * @property string $alpha3_code
 * @property array $calling_codes
 * @property int|null $phone_code
 * @property string|null $phone_number_mask
 * @property array $top_level_domains
 * @property string|null $capital
 * @property array $alt_spellings
 * @property string|null $region
 * @property string|null $subregion
 * @property int|null $population
 * @property float|null $latitude
 * @property float|null $longitude
 * @property string|null $demonym
 * @property int|null $area
 * @property float|null $gini
 * @property array $timezones
 * @property array $borders
 * @property string|null $native_name
 * @property string|null $numeric_code
 * @property array $currencies
 * @property array $languages
 * @property string|null $cioc
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $name
 * @property-read mixed $short_name
 * @property-read \App\Models\Geo\CountryTranslation $relevant_translation
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Geo\CountryTranslation[] $translations
 * @property-read int|null $translations_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Country newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Country newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Country query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Country whereAlpha2Code($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Country whereAlpha3Code($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Country whereAltSpellings($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Country whereArea($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Country whereBorders($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Country whereCallingCodes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Country whereCapital($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Country whereCioc($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Country whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Country whereCurrencies($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Country whereDemonym($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Country whereGini($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Country whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Country whereLanguages($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Country whereLatitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Country whereLongitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Country whereNameEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Country whereNativeName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Country whereNumericCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Country wherePhoneCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Country wherePhoneNumberMask($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Country wherePopulation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Country whereRegion($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Country whereShortNameEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Country whereSubregion($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Country whereTimezones($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Country whereTopLevelDomains($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\Country whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Country extends Model
{
    public $appends = [
        'name',
    ];

    protected $hidden = [
        'relevant_translation',
        'translations',
        'name_en',
        'short_name_en',
        'native_name',
        'alpha3_code',
        'calling_codes',
        'top_level_domains',
        'capital',
        'alt_spellings',
        'region',
        'subregion',
        'population',
        'latitude',
        'longitude',
        'demonym',
        'area',
        'gini',
        'timezones',
        'borders',
        'numeric_code',
        'currencies',
        'languages',
        'cioc',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'top_level_domains' 	=> 'array',
        'calling_codes' 		=> 'array',
        'alt_spellings' 		=> 'array',
        'timezones' 			=> 'array',
        'borders' 				=> 'array',
        'currencies' 			=> 'array',
        'languages' 			=> 'array',
    ];
    
    protected function asJson($value)
    {
        return json_encode($value, JSON_UNESCAPED_UNICODE);
    }

    // ---------------------------------------------------------------------- //
    // 
    // - Attribute Methods
    // 
    // ---------------------------------------------------------------------- //

    public function getNameAttribute()
    {
        return get_localized_attribute($this, 'name');
    }

    public function getShortNameAttribute()
    {
        return get_localized_attribute($this, 'short_name');
    }

    // ---------------------------------------------------------------------- //
    // 
    // - Relation Methods
    // 
    // ---------------------------------------------------------------------- //

    public function translations()
    {
        return $this->hasMany(CountryTranslation::class, 'country_code', 'alpha2_code');
    }

    public function relevant_translation()
    {
        return $this->hasOne(CountryTranslation::class, 'country_code', 'alpha2_code')->where('locale', locale());
    }
}
