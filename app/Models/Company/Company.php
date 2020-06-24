<?php

namespace App\Models\Company;

use App\Models\Geo\Country;
use App\Models\Geo\Locality;
use App\Models\PeopleList;
use App\Models\Project\Project;
use Illuminate\Database\Eloquent\Model;
use App\Models\User\User;
use App\Models\Company\CompanyPlan;
use App\Models\Plan\Plan;
use Illuminate\Support\Facades\DB;

/**
 * App\Models\Company\Company
 *
 * @property int $id
 * @property int $owner_user_id
 * @property string|null $name
 * @property string|null $description
 * @property int|null $phone_code
 * @property string|null $phone_number
 * @property string|null $size_key
 * @property string|null $country_code
 * @property string|null $locality_key
 * @property string|null $website_url
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Geo\Country|null $country
 * @property-read mixed $international_phone_number
 * @property-read mixed $local_phone_number
 * @property-read \App\Models\Company\CompanyImage $image
 * @property-read \App\Models\Geo\Locality|null $locality
 * @property-read \App\Models\User\User $owner_user
 * @property-read \App\Models\Company\CompanyPlan $plan
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Company\Company newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Company\Company newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Company\Company query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Company\Company whereCountryCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Company\Company whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Company\Company whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Company\Company whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Company\Company whereLocalityKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Company\Company whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Company\Company whereOwnerUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Company\Company wherePhoneCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Company\Company wherePhoneNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Company\Company whereSizeKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Company\Company whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Company\Company whereWebsiteUrl($value)
 * @mixin \Eloquent
 */
class Company extends Model
{
    public $fillable = [
    	'name',
    	'size_key',
        'website_url',
        'description',
        'locality_key',
        'phone_number',
    ];

    public function owner_user()
    {
        return $this->belongsTo(User::class);
    }

    public function locality()
    {
        return $this->belongsTo(Locality::class, 'locality_key', 'key');
    }

    public function country()
    {
        return $this->belongsTo(Country::class, 'country_code', 'alpha2_code');
    }

    public function plan()
    {
    	$company_active_free_plan = Plan::getActiveFree()['Company'];

        return $this->hasOne(CompanyPlan::class)->withDefault(array_merge([
            'plan_key' => $company_active_free_plan->key,
            'plan_addon_keys' => [],
        ], $company_active_free_plan->settings));
    }

    public function image()
    {
        return $this->hasOne(CompanyImage::class)->withDefault([
            'company_id' => $this->id,
        ]);
    }

    public function updatePlan($plan, $plan_addons)
    {
        if ($plan->account_type != 'Company') {
            throw new \Exception('Wrong plan account type');
        }

        if (!$company_plan = $this->plan) {
            $company_plan = new CompanyPlan;
            $company_plan->company_id = $this->id;
        }

        $company_plan->price = $plan->price;
        $company_plan->plan_key = $plan->key;
        $company_plan->plan_addon_keys = [];

        foreach ($plan->settings as $setting_key => $setting_value) {
            $company_plan->{$setting_key} = $setting_value;
        }

        $company_plan->save();

        return $this;
    }

    public function getLocalPhoneNumberAttribute()
    {
        if (!$this->phone_number) {
            return null;
        }

        $string = '';
        $phone_number_mask_integer_char_index = 0;

        foreach (str_split($this->country->phone_number_mask) as $phone_number_mask_char) {
            if ($phone_number_mask_char != 'X') {
                $string .= $phone_number_mask_char;
                continue;
            }

            $string .= $this->phone_number[$phone_number_mask_integer_char_index] ?? 'X';
            ++$phone_number_mask_integer_char_index;
        }

        return $string;
    }

    public function getInternationalPhoneNumberAttribute()
    {
        if (!$this->phone_number) {
            return null;
        }

        $string = '';
        $phone_number_mask_integer_char_index = 0;
        $full_phone_number = $this->phone_code . $this->phone_number;
        $phone_number_mask = '+X-XXX-XXX-XXXX';

        foreach (str_split($phone_number_mask) as $phone_number_mask_char) {
            if ($phone_number_mask_char != 'X') {
                $string .= $phone_number_mask_char;
                continue;
            }

            $string .= $full_phone_number[$phone_number_mask_integer_char_index] ?? 'X';
            ++$phone_number_mask_integer_char_index;
        }

        return $string;
    }

    public function setLocalityKeyAttribute($locality_key)
    {
        if (!$locality_key) {
            $this->attributes['locality_key'] = null;
            $this->attributes['country_code'] = null;
            $this->attributes['phone_code'] = null;
            return;
        }

        $locality = Locality::getOrMakeByKey($locality_key);
        $this->attributes['locality_key'] = $locality->key;
        $this->attributes['country_code'] = $locality->country->alpha2_code;
        $this->attributes['phone_code'] = $locality->country->phone_code;
    }

    public function setPhoneNumberAttribute($phone_number)
    {
        if (!$phone_number) {
            $this->attributes['phone_number'] = null;
            return;
        }

        $this->attributes['phone_number'] = preg_replace('/[^0-9]/', '', (string) $phone_number);
    }

    public function delete() {
        DB::beginTransaction();

        try {
            if ($image = CompanyImage::where('company_id', $this->id)->first()) {
                $image->delete();
            }

            parent::delete();
        } catch(\Exception $exception) {
            DB::rollback();
            throw $exception;
        }

        DB::commit();
    }
}
