<?php

namespace App\Models\Geo;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Geo\LocalityTranslation
 *
 * @property int $id
 * @property int $locality_id
 * @property string $locale
 * @property string $name
 * @property string $short_address
 * @property string $full_address
 * @property string|null $administrative_area_level_2
 * @property string|null $administrative_area_level_1
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\LocalityTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\LocalityTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\LocalityTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\LocalityTranslation whereAdministrativeAreaLevel1($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\LocalityTranslation whereAdministrativeAreaLevel2($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\LocalityTranslation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\LocalityTranslation whereFullAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\LocalityTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\LocalityTranslation whereLocale($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\LocalityTranslation whereLocalityId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\LocalityTranslation whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\LocalityTranslation whereShortAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Geo\LocalityTranslation whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class LocalityTranslation extends Model
{
    //
}
