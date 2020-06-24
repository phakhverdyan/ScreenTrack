<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

/**
 * App\Models\Language
 *
 * @property int $id
 * @property string|null $code
 * @property string $name
 * @property string|null $native_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Language newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Language newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Language query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Language whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Language whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Language whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Language whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Language whereNativeName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Language whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Language extends Model
{
    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function setNameAttribute($value)
    {
        $this->attributes['name'] = mb_convert_case($value, MB_CASE_TITLE, 'UTF-8');
    }

    public function setNativeNameAttribute($value)
    {
        $this->attributes['native_name'] = mb_convert_case($value, MB_CASE_TITLE, 'UTF-8');
    }

    public function getCurrentUrlWithIt()
    {
    	$redirect_url = request()->getPathInfo() . (request()->getQueryString() ? ('?' . request()->getQueryString()) : '');
        $redirect_url = substr($redirect_url, 3);
        
        return '/' . $this->code . $redirect_url;
    }

    public static function available($except_locale = null)
    {
    	$available_locales = array_filter(config('app.available_locales'), function($available_locale) use ($except_locale) {
    		return $available_locale != $except_locale;
    	});

    	return Language::whereIn('code', $available_locales)->orderBy('name');
    }
}
