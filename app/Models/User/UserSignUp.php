<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\Events\User\UserHasBeenRegisteredEvent;
use App\Models\Geo\Locality;
use App\Models\Plan\PlanAddon;
use App\Models\Company\Company;
use App\Models\Project\Project;

/**
 * Class UserSignUp
 *
 * @package App\Models\User
 * @property integer $id
 * @property integer $user_id
 * @property string $current_stage
 * @property string $choosen_plan_key
 * @property string $user_first_name
 * @property string $user_last_name
 * @property string $user_original_password
 * @property string $user_locality_key
 * @property string $user_phone_code
 * @property string $user_phone_number
 * @property string $user_professional_title
 * @property string $user_skype
 * @property integer $user_hourly_rate
 * @property string $company_name
 * @property string $company_size_key
 * @property string $choosen_plan_addon_keys
 * @property string $company_locality_key
 * @property string $company_phone_code
 * @property string $company_phone_number
 * @property string $stripe_token_id
 * @property $created_at
 * @property $updated_at
 * @property-read \App\Models\Plan\Plan|null $choosen_plan
 * @property-read \App\Models\User\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSignUp newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSignUp newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSignUp query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSignUp whereChoosenPlanAddonKeys($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSignUp whereChoosenPlanKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSignUp whereCompanyLocalityKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSignUp whereCompanyName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSignUp whereCompanyPhoneCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSignUp whereCompanyPhoneNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSignUp whereCompanySizeKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSignUp whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSignUp whereCurrentStage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSignUp whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSignUp whereStripeTokenId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSignUp whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSignUp whereUserFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSignUp whereUserHourlyRate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSignUp whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSignUp whereUserLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSignUp whereUserLocalityKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSignUp whereUserOriginalPassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSignUp whereUserPhoneCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSignUp whereUserPhoneNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSignUp whereUserProfessionalTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserSignUp whereUserSkype($value)
 * @mixin \Eloquent
 */

class UserSignUp extends Model
{
    const CURRENT_STAGE_CHOOSE_A_PLAN = 'CHOOSE_A_PLAN';
    const CURRENT_STAGE_SET_ACCOUNT_DETAILS = 'SET_ACCOUNT_DETAILS';
    const CURRENT_STAGE_CHOOSE_ADDONS = 'CHOOSE_ADDONS';
    const CURRENT_STAGE_START_TRIAL = 'START_TRIAL';

    public $attributes = [
        'current_stage' => self::CURRENT_STAGE_CHOOSE_A_PLAN,
    ];

    public $fillable = [
        'user_first_name',
        'user_last_name',
        'user_locality_key',
        'user_phone_number',
        'user_professional_title',
        'user_skype',
        'user_hourly_rate',
        'company_name',
        'company_size_key',
        'company_locality_key',
        'company_phone_number',
    ];

    public $casts = [
        'choosen_plan_addon_keys' => 'array',
    ];

    // ---------------------------------------------------------------------- //
    //
    // - Relations
    //
    // ---------------------------------------------------------------------- //

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function choosen_plan()
    {
        return $this->belongsTo('App\Models\Plan\Plan', 'choosen_plan_key', 'key');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('App\Models\User\User');
    }

    // ---------------------------------------------------------------------- //
    //
    // - Attributes
    //
    // ---------------------------------------------------------------------- //

    public function setUserFirstNameAttribute($value)
    {
        $this->attributes['user_first_name'] = ucfirst($value);
    }

    public function setUserLastNameAttribute($value)
    {
        $this->attributes['user_last_name'] = ucfirst($value);
    }

    public function setUserLocalityKeyAttribute($user_locality_key)
    {
        if (!$user_locality_key) {
            $this->attributes['user_locality_key'] = null;
            $this->attributes['user_phone_code'] = null;
            return;
        }

        $user_locality = Locality::getOrMakeByKey($user_locality_key);
        $this->attributes['user_locality_key'] = $user_locality->key;
        $this->attributes['user_phone_code'] = $user_locality->country->phone_code;
    }

    public function setUserPhoneNumberAttribute($user_phone_number)
    {
        $this->attributes['user_phone_number'] = preg_replace('/[^0-9]/', '', (string)$user_phone_number);
    }

    public function setCompanyLocalityKeyAttribute($company_locality_key)
    {
        if (!$company_locality_key) {
            $this->attributes['company_locality_key'] = null;
            $this->attributes['company_phone_code'] = null;
            return;
        }

        $company_locality = Locality::getOrMakeByKey($company_locality_key);
        $this->attributes['company_locality_key'] = $company_locality->key;
        $this->attributes['company_phone_code'] = $company_locality->country->phone_code;
    }

    public function setCompanyPhoneNumberAttribute($company_phone_number)
    {
        $this->attributes['company_phone_number'] = preg_replace('/[^0-9]/', '', (string)$company_phone_number);
    }

    // ---------------------------------------------------------------------- //
    //
    // - Methods
    //
    // ---------------------------------------------------------------------- //

    public function setupAndDelete()
    {
        $choosen_plan = $this->choosen_plan;
        $user = $this->user;
        $choosen_plan_addons = PlanAddon::whereIn('key', $this->choosen_plan_addon_keys ?? [])->get();
        $company_locality = null;

        if ($choosen_plan->account_type == 'Company') {
            $company_locality = Locality::getOrMakeByKey($this->company_locality_key);
        }

        DB::beginTransaction();

        try {
            $user->original_password = $this->user_original_password;
            $user->first_name = $this->user_first_name;
            $user->last_name = $this->user_last_name;
            $user->locality_key = $this->user_locality_key;
            $user->phone_code = $this->user_phone_code;
            $user->phone_number = $this->user_phone_number;
            $user->professional_title = $this->user_professional_title;
            $user->skype = $this->user_skype;
            $user->hourly_rate = $this->user_hourly_rate;
            $user->save();

            if ($choosen_plan->account_type == 'User') {
                if ($choosen_plan->category != 'free' || $choosen_plan_addons->count() > 0) {
                    $user->updatePlan($choosen_plan, $choosen_plan_addons);
                }
            }

            // ---------------------------------------------------------------------- //

            if ($choosen_plan->account_type == 'Company') {
                if ($this->stripe_token_id) {
                    $user_stripe_customer = \Stripe\Customer::retrieve($user->stripe_customer_id);

                    $user_stripe_credit_card = $user_stripe_customer->sources->create([
                        'source' => $this->stripe_token_id,
                    ]);

                    $user_credit_card = new UserCreditCard;
                    $user_credit_card->user_id = $user->id;
                    $user_credit_card->stripe_id = $user_stripe_credit_card->id;
                    $user_credit_card->address_zip = $user_stripe_credit_card->address_zip;
                    $user_credit_card->brand = $user_stripe_credit_card->brand;
                    $user_credit_card->country_code = $user_stripe_credit_card->country;
                    $user_credit_card->expiration_month = $user_stripe_credit_card->exp_month;
                    $user_credit_card->expiration_year = $user_stripe_credit_card->exp_year;
                    $user_credit_card->funding = $user_stripe_credit_card->funding;
                    $user_credit_card->last4 = $user_stripe_credit_card->last4;
                    $user_credit_card->is_default = true;
                    $user_credit_card->save();
                }

                $company = new Company;
                $company->owner_user_id = $user->id;
                $company->name = $this->company_name;
                $company->size_key = $this->company_size_key;
                $company->country_code = $company_locality->country_code;
                $company->locality_key = $company_locality->key;
                $company->phone_code = $this->company_phone_code;
                $company->phone_number = $this->company_phone_number;
                $company->save();

                if ($choosen_plan->category != 'free' || $choosen_plan_addons->count() > 0) {
                    $company->updatePlan($choosen_plan, $choosen_plan_addons);
                }
            }

            $user->initial_stage = null;
            // $user->initial_stage = User::INITIAL_STAGE_SETUP;
            $user->save();

            // ---------------------------------------------------------------------- //

            Project::create([
                'name' => 'Project 1',
            ], [
                'owner_user' => $user,
            ]);

            // ---------------------------------------------------------------------- //

            // $user_setup = new UserSetup;
            // $user_setup->user_id = $user->id;
            // $user_setup->save();

            $this->delete();

            // ---------------------------------------------------------------------- //

            event(new UserHasBeenRegisteredEvent([
                'registered_user' => $user,
            ]));
        } catch (\Exception $exception) {
            DB::rollback();
            throw $exception;
        }

        DB::commit();

        return $this;
    }
}
