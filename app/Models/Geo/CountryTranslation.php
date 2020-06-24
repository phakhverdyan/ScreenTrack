<?php

namespace App\Models\Geo;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Geo\CountryTranslation
 *
 * @property int $id
 * @property string $country_code
 * @property string $locale
 * @property string $name
 * @property string|null $short_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\CountryTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\CountryTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\CountryTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\CountryTranslation whereCountryCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\CountryTranslation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\CountryTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\CountryTranslation whereLocale($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\CountryTranslation whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\CountryTranslation whereShortName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\CountryTranslation whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class CountryTranslation extends Model
{
    //
}
