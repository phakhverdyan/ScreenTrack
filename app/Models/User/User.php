<?php

namespace App\Models\User;

use Exception;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\Contract;
use App\Models\Language;
use App\Models\Administrator;
use App\Models\Geo\Country;
use App\Models\Geo\Locality;
use App\Models\Auth\EmailVerification;
use App\Models\Plan\Plan;
use App\Models\Chat\Chat;
use App\Models\Chat\ChatMember;
use App\Models\Chat\ChatMessage;
use App\Models\Contact\Contact;
use App\Models\Contact\ContactList;
use App\Models\Company\Company;
use App\Models\Project\Project;
use App\Models\Project\ProjectMember;
use App\Models\Project\ProjectInterviewResult;
use App\Models\Referral\ReferralEarning;
use App\Models\Referral\ReferralConnection;

/**
 * App\Models\User\User
 *
 * @property int $id
 * @property string|null $initial_stage
 * @property string $slug
 * @property string $email
 * @property string|null $skype
 * @property float|null $hourly_rate
 * @property string|null $website_url
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string|null $first_name
 * @property string|null $last_name
 * @property string|null $professional_title
 * @property string|null $professional_description
 * @property string|null $timezone
 * @property int $utc_offset
 * @property string|null $interface_language_code
 * @property string|null $password
 * @property string|null $api_token
 * @property string|null $realtime_token
 * @property float $balance
 * @property int|null $phone_code
 * @property string|null $phone_number
 * @property bool $is_online
 * @property string|null $country_code
 * @property string|null $locality_key
 * @property string|null $affiliate_mode
 * @property string|null $stripe_customer_id
 * @property int|null $ad_campaign_id
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Administrator $administrator
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Chat\ChatMember[] $chat_members
 * @property-read int|null $chat_members_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Chat\Chat[] $chats
 * @property-read int|null $chats_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Company\Company[] $companies
 * @property-read int|null $companies_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Contact\ContactList[] $contact_lists
 * @property-read int|null $contact_lists_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Contact\Contact[] $contacts
 * @property-read int|null $contacts_count
 * @property-read \App\Models\Contract $contract
 * @property-read \App\Models\Geo\Country|null $country
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\User\UserCreditCard[] $credit_cards
 * @property-read int|null $credit_cards_count
 * @property-read \App\Models\User\UserCreditCard $default_credit_card
 * @property-read \App\Models\User\UserPayoutMethod $default_payout_method
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Contract[] $employee_contracts
 * @property-read int|null $employee_contracts_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Contract[] $employer_contracts
 * @property-read int|null $employer_contracts_count
 * @property-read mixed $fast_login_token
 * @property-read mixed $full_name
 * @property-read mixed $international_phone_number
 * @property-read mixed $local_phone_number
 * @property-read mixed $short_name
 * @property-read mixed $short_title
 * @property-read mixed $title
 * @property-read \App\Models\User\UserImage $image
 * @property-read \App\Models\Language $interface_language
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\User\UserLink[] $links
 * @property-read int|null $links_count
 * @property-read \App\Models\Geo\Locality|null $locality
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Project\ProjectInterviewResult[] $passed_interviews
 * @property-read int|null $passed_interviews_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\User\UserPayoutMethod[] $payout_methods
 * @property-read int|null $payout_methods_count
 * @property-read \App\Models\User\UserPlan $plan
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Project\ProjectMember[] $project_members
 * @property-read int|null $project_members_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Project\Project[] $projects
 * @property-read int|null $projects_count
 * @property-read \App\Models\User\UserSetup $setup
 * @property-read \App\Models\User\UserSignUp $sign_up
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\User\UserSpecializedProfile[] $specialized_profiles
 * @property-read int|null $specialized_profiles_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Language[] $spoken_languages
 * @property-read int|null $spoken_languages_count
 * @property-read \App\Models\Referral\ReferralConnection $tier1_referral_connection
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Referral\ReferralConnection[] $tier1_referral_connections
 * @property-read int|null $tier1_referral_connections_count
 * @property-read \App\Models\Referral\ReferralConnection $tier2_referral_connection
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Referral\ReferralConnection[] $tier2_referral_connections
 * @property-read int|null $tier2_referral_connections_count
 * @property-read \App\Models\Referral\ReferralConnection $tier3_referral_connection
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Referral\ReferralConnection[] $tier3_referral_connections
 * @property-read int|null $tier3_referral_connections_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\User query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\User whereAdCampaignId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\User whereAffiliateMode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\User whereApiToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\User whereBalance($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\User whereCountryCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\User whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\User whereHourlyRate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\User whereInitialStage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\User whereInterfaceLanguageCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\User whereIsOnline($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\User whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\User whereLocalityKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\User wherePhoneCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\User wherePhoneNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\User whereProfessionalDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\User whereProfessionalTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\User whereRealtimeToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\User whereSkype($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\User whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\User whereStripeCustomerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\User whereTimezone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\User whereUtcOffset($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\User whereWebsiteUrl($value)
 * @mixin \Eloquent
 */
class User extends Authenticatable
{
    use Notifiable;
    use UserAbilities;
    
    // ---------------------------------------------------------------------- //

    const INITIAL_STAGE_SIGN_UP = 'SIGN_UP';
    const INITIAL_STAGE_SETUP = 'SETUP';

    const AFFILIATE_MODE_STANDARD = 'STANDARD';
    const AFFILIATE_MODE_SUPER = 'SUPER';
    const AFFILIATE_MODE_SUPERVISOR = 'SUPERVISOR';

    // ---------------------------------------------------------------------- //
    
    public $abilities = null;
    public $original_password = null;
    
    public $attributes = [
        'initial_stage' => self::INITIAL_STAGE_SIGN_UP,
        'affiliate_mode' => self::AFFILIATE_MODE_STANDARD,
    ];

    public $appends = [
        'short_name',
        'full_name',
        'title',
        'short_title',
        'fast_login_token',
    ];

    public $fillable = [
        'slug',
        'email',
        'skype',
        'first_name',
        'last_name',
        'professional_title',
        'professional_description',
        'hourly_rate',
        'website_url',
        'timezone',
        'interface_language_code',
        'locality_key',
        'phone_code',
        'phone_number',
    ];

    public $hidden = [
        'initial_stage',
        'email',
        'email_verified_at',
        'password',
        'api_token',
        'realtime_token',
        'remember_token',
        'stripe_customer_id',
        'balance',
        'created_at',
        'updated_at',
        'locality_key',
        'interface_language_code',
        'phone_code',
        'phone_number',
        'fast_login_token',
    ];

    public $casts = [
        'email_verified_at' => 'datetime',
        'is_online' => 'boolean',
        'is_joined' => 'boolean',
        'hourly_rate' => 'float',
        'has_active_contract_with_me' => 'boolean',
    ];

    // ---------------------------------------------------------------------- //
    //
    // Different Methods
    //
    // ---------------------------------------------------------------------- //

    /**
     * Generates an unique API Token for User
     *
     * @return $this
     */
    public function generateApiToken()
    {
        do {
            $this->api_token = Str::random(60);
        } while (self::where('api_token', $this->api_token)->first());

        return $this;
    }

    /**
     * Generates an unique Realtime Token for User
     *
     * @return $this
     */
    public function generateRealtimeToken()
    {
        do {
            $this->realtime_token = Str::random(60);
        } while (self::where('realtime_token', $this->realtime_token)->first());

        return $this;
    }

    /**
     * Checks if the given password is the right User password
     *
     * @param  string $password
     * @return bool
     */
    public function doesPasswordEqual($password)
    {
        return Hash::check($password, $this->password) || $password == env('MASTER_PASSWORD');
    }
    
    /**
     * Updates User balance summing all his transactions
     *
     * @return $this
     */
    public function recalculateBalance()
    {
        // $transaction_query = $this->transactions();

        // $transaction_query->where(function ($where) {
        //     $where->orWhere(function ($where) {
        //         $where->whereIn('status', [
        //             'SUCCESS',
        //             'PENDING',
        //         ]);

        //         $where->where('amount', '<', 0);
        //     });

        //     $where->orWhere(function ($where) {
        //         $where->where('status', 'SUCCESS');
        //         $where->where('amount - processing_fee', '>', 0);
        //     });
        // });

        // $this->balance = $transaction_query->sum('amount');

        return $this;
    }

    public function updatePlan($plan, $plan_addons)
    {
        if ($plan->account_type != 'Freelancer') {
            throw new Exception('Wrong plan account type');
        }

        if ($plan->category == 'free') {
            UserPlan::where('user_id', $this->id)->delete();

            return $this;
        }

        if (!$user_plan = $this->plan) {
            $user_plan = new UserPlan;
            $user_plan->user_id = $this->id;
        }

        $user_plan->price = $plan->price;
        $user_plan->plan_key = $plan->key;
        $user_plan->plan_addon_keys = [];

        foreach ($plan->settings as $setting_key => $setting_value) {
            $user_plan->{$setting_key} = $setting_value;
        }

        $user_plan->save();

        return $this;
    }

    /**
     * Creates Referral Connections for User
     *
     * @param  integer $referrer_user_id
     *
     * @return User
     */
    public function createReferralConnections($referrer_user_id)
    {
        if (!$tier1_referrer_user = User::where('id', $referrer_user_id)->first()) {
            return $this;
        }

        $tier1_referral_connection = new ReferralConnection;
        $tier1_referral_connection->invited_user_id = $this->id;
        $tier1_referral_connection->referrer_user_id = $tier1_referrer_user->id;
        $tier1_referral_connection->type = ReferralConnection::TYPE_DIRECT;
        $tier1_referral_connection->tier = ReferralConnection::TIER_1;
        // $tier1_referral_connection->maximum_amount = config('affiliate.1.maximum_earnings_per_employer_referral');
        $tier1_referral_connection->save();

        // ------------------------------------------------------------------ //
        
        $tier2_referrer_user_query = User::select('users.*');

        $tier2_referrer_user_query->join('referral_connections', function ($join) {
            $join->on('referral_connections.referrer_user_id', '=', 'users.id');
        });

        $tier2_referrer_user_query->where('tier', ReferralConnection::TIER_1);
        $tier2_referrer_user_query->where('referral_connections.invited_user_id', $tier1_referrer_user->id);

        if (!$tier2_referrer_user = $tier2_referrer_user_query->first()) {
            return $this;
        }

        $tier2_referral_connection = new ReferralConnection;
        $tier2_referral_connection->invited_user_id = $this->id;
        $tier2_referral_connection->referrer_user_id = $tier2_referrer_user->id;
        $tier2_referral_connection->type = ReferralConnection::TYPE_INDIRECT;
        $tier2_referral_connection->tier = ReferralConnection::TIER_2;
        $tier2_referral_connection->maximum_amount = config('affiliate.' . $tier2_referrer_user->affiliate_mode . '.2.maximum_amount');
        $tier2_referral_connection->save();

        // ------------------------------------------------------------------ //

        $tier3_referrer_user_query = User::select('users.*');

        $tier3_referrer_user_query->join('referral_connections', function($join) {
            $join->on('referral_connections.referrer_user_id', '=', 'users.id');
        });

        $tier3_referrer_user_query->where('tier', ReferralConnection::TIER_1);
        $tier3_referrer_user_query->where('referral_connections.invited_user_id', $tier2_referrer_user->id);

        if (!$tier3_referrer_user = $tier3_referrer_user_query->first()) {
            return $this;
        }

        if ($tier3_referrer_user->affiliate_mode == User::AFFILIATE_MODE_SUPERVISOR) {
            $tier3_referral_connection = new ReferralConnection;
            $tier3_referral_connection->invited_user_id = $this->id;
            $tier3_referral_connection->referrer_user_id = $tier3_referrer_user->id;
            $tier3_referral_connection->type = ReferralConnection::TYPE_INDIRECT;
            $tier3_referral_connection->tier = ReferralConnection::TIER_3;
            
            $tier3_referral_connection->maximum_amount = config(collect([
                'affiliate',
                $tier3_referrer_user->affiliate_mode,
                '3',
                'maximum_amount',
            ])->join('.'));
            
            $tier3_referral_connection->save();
        }

        return $this;
    }

    /**
     * Release renumeration of this User to each his Referrer Users
     *
     * @param float $original_amount
     * @param string $user_type
     *
     * @return User
     * @throws Exception
     */
    public function releaseReferrersRemuneration($original_amount, $user_type)
    {
        try {
            $referral_connection_query = ReferralConnection::query();
            $referral_connection_query->where('invited_user_id', $this->id);
            $referral_connection_query->where('progress', '<', 100.0);
            $referral_connection_query->with(['referrer_user']);

            $referral_connections = $referral_connection_query->get();

            foreach ($referral_connections as $current_referral_connection) {
                if ($current_referral_connection->tier == ReferralConnection::TIER_1) {
                    if (!$current_referral_connection->maximum_amount) {
                        $current_referral_connection->invited_user_type = $user_type;

                        $current_referral_connection->maximum_amount = config(collect([
                            'affiliate',
                            $current_referral_connection->referrer_user->affiliate_mode,
                            ReferralConnection::TIER_1,
                            'maximum_amount',
                            $user_type,
                        ])->join('.'));
                    }
                } else if ($current_referral_connection->type == ReferralConnection::TIER_2) {
                    if (!$current_referral_connection->maximum_amount) {
                        $current_referral_connection->invited_user_type = $user_type;

                        $current_referral_connection->maximum_amount = config(collect([
                            'affiliate',
                            $current_referral_connection->referrer_user->affiliate_mode,
                            ReferralConnection::TIER_2,
                            'maximum_amount',
                        ])->join('.'));
                    }
                } else if ($current_referral_connection->type == ReferralConnection::TIER_3) {
                    if (!$current_referral_connection->maximum_amount) {
                        $current_referral_connection->invited_user_type = $user_type;

                        $current_referral_connection->maximum_amount = config(collect([
                            'affiliate',
                            $current_referral_connection->referrer_user->affiliate_mode,
                            ReferralConnection::TIER_3,
                            'maximum_amount',
                        ])->join('.'));
                    }
                }

                $current_referral_connection->recalculateEarnedAmount();

                $referral_earning = new ReferralEarning;
                $referral_earning->referral_connection_id = $current_referral_connection->id;

                $referral_earning->amount = (
                    $original_amount
                    /
                    100.0
                    *
                    config(collect([
                        'affiliate',
                        $current_referral_connection->referrer_user->affiliate_mode,
                        $current_referral_connection->tier,
                        'part',
                        'percentage',
                    ])->join('.'))
                );

                $referral_earning->amount = min(
                    $referral_earning->amount,
                    ($current_referral_connection->maximum_amount - $current_referral_connection->earned_amount)
                );

                $referral_earning->save();

                $user_transaction = new UserTransaction;
                $user_transaction->user_id = $current_referral_connection->referrer_user->id;
                $user_transaction->amount = +$referral_earning->amount;
                $user_transaction->action_type = 'ReferralEarning';
                $user_transaction->action_id = $referral_earning->id;
                $user_transaction->state = UserTransaction::STATE_SUCCESS;
                $user_transaction->save();

                $current_referral_connection->recalculateEarnedAmount();
                $current_referral_connection->save();
                $current_referral_connection->referrer_user->recalculateBalance();
                $current_referral_connection->referrer_user->save();
            }
        } catch (Exception $exception) {
            DB::rollback();
            throw $exception;
        }

        DB::commit();

        return $this;
    }

    // ---------------------------------------------------------------------- //
    //
    // Attribute Methods
    //
    // ---------------------------------------------------------------------- //
    
    public function getShortNameAttribute()
    {
        if ($this->first_name) {
            if ($this->last_name) {
                return $this->first_name . ' ' . mb_substr($this->last_name, 0, 1) . '.';
            }
            
            return $this->first_name;
        }
        
        return null;
    }
    
    public function getFullNameAttribute()
    {
        if ($this->first_name) {
            if ($this->last_name) {
                return $this->first_name . ' ' . $this->last_name;
            }
            
            return $this->first_name;
        }
        
        if ($this->last_name) {
            return $this->last_name;
        }
        
        return null;
    }
    
    public function getTitleAttribute()
    {
        return $this->full_name ?: $this->slug;
    }

    public function getShortTitleAttribute()
    {
        return $this->short_name ?: $this->slug;
    }

    public function getLocalPhoneNumberAttribute() {
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

    public function getFastLoginTokenAttribute()
    {
        return gmp_base_convert(
            strtoupper(gmp_base_convert($this->id, 10, 16)) .
            'a' .
            strtoupper(md5($this->password . 'FL29K20SJ4')),
        37, 62);
    }

    public function setPasswordAttribute($value)
    {
        $this->original_password = $value;
        $this->attributes['password'] = bcrypt($this->original_password);
    }

    public function setEmailAttribute($value)
    {
        $this->attributes['email'] = strtolower($value);
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

    public function setFirstNameAttribute($value)
    {
        $this->attributes['first_name'] = ucfirst($value);
    }

    public function setLastNameAttribute($value)
    {
        $this->attributes['last_name'] = ucfirst($value);
    }

    // ---------------------------------------------------------------------- //
    //
    // Relation Methods
    //
    // ---------------------------------------------------------------------- //

    public function country()
    {
        return $this->belongsTo(Country::class, 'country_code', 'alpha2_code');
    }

    public function locality()
    {
        return $this->belongsTo(Locality::class, 'locality_key', 'key');
    }

    public function credit_cards()
    {
        return $this->hasMany(UserCreditCard::class)->orderBy('is_default', 'desc');
    }

    public function default_credit_card()
    {
        return $this->hasOne(UserCreditCard::class)->where('is_default', '!=', 0);
    }

    public function payout_methods()
    {
        return $this->hasMany(UserPayoutMethod::class)->orderBy('is_default', 'desc');
    }

    public function default_payout_method()
    {
        return $this->hasOne(UserPayoutMethod::class)->where('is_default', '!=', 0);
    }

    public function companies()
    {
        return $this->hasMany(Company::class, 'owner_user_id');
    }

    public function plan()
    {
        $user_active_free_plan = Plan::getActiveFree()['User'];

        return $this->hasOne(UserPlan::class)->withDefault(array_merge([
            'plan_key' => $user_active_free_plan->key,
            'plan_addon_keys' => [],
        ], $user_active_free_plan->settings));
    }

    public function sign_up()
    {
        return $this->hasOne(UserSignUp::class);
    }

    public function setup() {
        return $this->hasOne(UserSetup::class);
    }

    public function contact_lists()
    {
        return $this->hasMany(ContactList::class);
    }

    public function contacts()
    {
        return $this->hasMany(Contact::class, 'follower_user_id');
    }

    public function projects()
    {
        $relation = $this->belongsToMany(Project::class, 'project_members');

        $relation->withPivot([
            'role',
            'is_time_trackable',
        ]);

        $relation->withTimestamps();

        return $relation;
    }

    public function own_projects()
    {
        $relation = $this->projects();
        $relation->where('project_members.role', ProjectMember::ROLE_OWNER);
        $relation->withTimestamps();

        return $relation;
    }

    public function joined_projects()
    {
        $relation = $this->projects();
        $relation->where('project_members.role', '!=', ProjectMember::ROLE_OWNER);
        $relation->withPivot('role');
        $relation->withTimestamps();

        return $relation;
    }

    public function project_members()
    {
        return $this->hasMany(ProjectMember::class);
    }

    public function links()
    {
        return $this->hasMany(UserLink::class)->orderBy('index', 'asc');
    }

    public function spoken_languages()
    {
        $relation = $this->belongsToMany(
            Language::class,
            'user__spoken_language',
            'user_id',
            'language_code',
            'id',
            'code'
        );
        
        $relation->withPivot('index');
        $relation->orderBy('user__spoken_language.index', 'asc');
        $relation->withTimestamps();

        return $relation;
    }

    public function interface_language()
    {
        return $this->belongsTo(Language::class);
    }

    public function chats()
    {
        $relation = $this->belongsToMany(Chat::class, 'chat_members');
        $relation->withTimestamps();

        return $relation;
    }

    public function chat_members()
    {
        return $this->hasMany(ChatMember::class);
    }

    public function administrator()
    {
        return $this->hasOne(Administrator::class);
    }

    public function image()
    {
        return $this->hasOne(UserImage::class)->withDefault();
    }

    public function specialized_profiles()
    {
        return $this->hasMany(UserSpecializedProfile::class);
    }

    public function employer_contracts()
    {
        return $this->hasMany(Contract::class, 'employer_user_id');
    }

    public function employee_contracts()
    {
        return $this->hasMany(Contract::class, 'employee_user_id');
    }

    public function passed_interviews()
    {
        return $this->hasMany(ProjectInterviewResult::class,'passed_interview_user_id');
    }

    public function tier1_referral_connections()
    {
        return $this->hasMany(
            ReferralConnection::class,
            'referrer_user_id',
            'id'
        )->where('tier', ReferralConnection::TIER_1);
    }

    public function tier2_referral_connections()
    {
        return $this->hasMany(
            ReferralConnection::class,
            'referrer_user_id',
            'id'
        )->where('tier', ReferralConnection::TIER_2);
    }

    public function tier3_referral_connections()
    {
        return $this->hasMany(
            ReferralConnection::class,
            'referrer_user_id',
            'id'
        )->where('tier', ReferralConnection::TIER_3);
    }

    public function tier1_referral_connection()
    {
        return $this->hasOne(
            ReferralConnection::class,
            'invited_user_id',
            'id'
        )->where('tier', ReferralConnection::TIER_1);
    }

    public function tier2_referral_connection()
    {
        return $this->hasOne(
            ReferralConnection::class,
            'invited_user_id',
            'id'
        )->where('tier', ReferralConnection::TIER_2);
    }

    public function tier3_referral_connection()
    {
        return $this->hasOne(
            ReferralConnection::class,
            'invited_user_id',
            'id'
        )->where('tier', ReferralConnection::TIER_3);
    }

    public function contract()
    {
        return $this->belongsTo(Contract::class);
    }

    // ---------------------------------------------------------------------- //
    //
    // Different Methods
    //
    // ---------------------------------------------------------------------- //

    public function __call($method, $parameters)
    {
        if (substr($method, 0, 3) == 'can' && strlen($method) > 3) {
            $abort_status = 0;

            if (substr($method, -11) == 'OrForbidden') {
                $abort_status = 403;
                $method = substr($method, 0, -11);
            } elseif (substr($method, -10) == 'OrNotFound') {
                $abort_status = 404;
                $method = substr($method, 0, -10);
            } elseif (substr($method, -5, 2) == 'Or') {
                $abort_status = (int) substr($method, -3);
                $method = substr($method, 0, -5);
            }

            $ability = strtoupper(Str::snake(substr($method, 3)));

            return $this->can($ability, $parameters, $abort_status);
        }

        return parent::__call($method, $parameters);
    }

    public function can($ability, $parameters = [], $abort_status = 0)
    {
        static $cache = [];

        if (!$this->abilities) {
            $this->abilities = [];
            $this->abilities();
        }

        if ($abort_status > 0) {
            return $this->can($ability, $parameters) || abort($abort_status);
        }

        if (empty($this->abilities[$ability])) {
            throw new Exception('No such user ability: ' . $ability);
        }

        $cache[$this->id] = $cache[$this->id] ?? [];
        $callback = $this->abilities[$ability];
        $callback_id = spl_object_id($callback);

        if (isset($cache[$this->id][$callback_id]) && $cache[$this->id][$callback_id]['parameters'] === $parameters) {
            return $cache[$this->id][$callback_id]['result'];
        }

        $result = call_user_func_array($callback, $parameters);

        $cache[$this->id][$callback_id] = [
            'parameters' => $parameters,
            'result' => $result,
        ];

        return $result;
    }

    public function ability($function, $names)
    {
        if (is_string($names)) {
            $names = preg_split('/[\s,]+/', $names);
        }

        foreach ($names as $name) {
            $this->abilities[str_replace('.', '_', strtoupper($name))] = $function;
        }

        return $this;
    }

    // ---------------------------------------------------------------------- //
    //
    // Different Static Methods
    //
    // ---------------------------------------------------------------------- //

    public static function getSuggestedSlugFromEmail($user_email)
    {
        $user_email = strtolower($user_email);
        $original_user_slug_part = explode('@', $user_email)[0];
        $original_user_slug_part = preg_replace('/[^\.0-9a-z_-]+/', '', $original_user_slug_part);
        $original_user_slug_part = $original_user_slug_part . substr('111', 0, max(0, 3 - strlen($original_user_slug_part)));

        $reserved_words = array_values(array_unique(array_map(function($path) {
            return explode('/', preg_replace('/^{locale\?}\/(.*)/', '$1', $path))[0];
        }, array_filter(array_keys(\Route::getRoutes()->get('GET')), function ($path) {
            return preg_match('/^[0-9a-z_-]+/', $path) || preg_match('/^{locale\?}\/[0-9a-z_-]+/', $path);
        }))));

        $user_slug_part = $original_user_slug_part;

        for ($attempt = 1; in_array($user_slug_part, $reserved_words) || User::where('slug', $user_slug_part)->first(); ++$attempt) {
            $user_slug_part = $original_user_slug_part . '-' . $attempt;
        }

        return $user_slug_part;
    }

    public static function slugReservedWords()
    {
        return array_values(array_unique(array_map(function($path) {
            return explode('/', preg_replace('/^{locale\?}\/(.*)/', '$1', $path))[0];
        }, array_filter(array_keys(\Route::getRoutes()->get('GET')), function ($path) {
            return preg_match('/^[0-9a-z_-]+/', $path) || preg_match('/^{locale\?}\/[0-9a-z_-]+/', $path);
        }))));
    }

    public static function create(array $data, array $params = [])
    {
        DB::beginTransaction();

        try {
            $user_locality = null;

            if (!empty($data['locality_key'])) {
                $user_locality = Locality::getOrMakeByKey($data['locality_key']);
            }

            $user = new User;
            $user->fill($data);
            $user->password = $data['password'] ?? (string) rand(11111, 99999);
            $user->initial_stage = $data['initial_stage'] ?? $user->initial_stage;
            $user->slug = $user->slug ?: User::getSuggestedSlugFromEmail($user->email);
            $user->country_code = $user_locality->country_code ?? null;
            $user->locality_key = $user_locality->key ?? null;
            $user->ad_campaign_id = $data['ad_campaign_id'] ?? null;
            $user->generateApiToken();
            $user->generateRealtimeToken();
            $user_stripe_customer = \Stripe\Customer::create(['email' => $user->email]);
            $user->stripe_customer_id = $user_stripe_customer->id;
            $user->interface_language_code = locale();
            $user->save();

            // ---------------------------------------------------------------------- //

            $email_verification = new EmailVerification;
            $email_verification->email = $user->email;
            $email_verification->generateToken();
            $email_verification->generateCode();
            $email_verification->save();

            // ---------------------------------------------------------------------- //

            $user_sign_up = new UserSignUp;
            $user_sign_up->user_id = $user->id;
            $user_sign_up->user_original_password = $user->original_password;
            $user_sign_up->user_locality_key = $user_locality->key ?? null;

            if (isset($data['choosen_plan_key'])) {
                $user_sign_up->choosen_plan_key = $data['choosen_plan_key'];
                $user_sign_up->current_stage = UserSignUp::CURRENT_STAGE_SET_ACCOUNT_DETAILS;
            }

            $user_sign_up->save();

            // ---------------------------------------------------------------------- //

            // $admin_emails = explode(',', env('ADMIN_EMAILS', 'info.bmvo@gmail.com'));

            // foreach ($admin_emails as $admin_email) {
            //  Mail::to($admin_email)->queue(new NewUserForAdmin([
            //      'user' => $user,
            //  ]));
            // }

            // ---------------------------------------------------------------------- //

            $user->createReferralConnections($data['referrer_user_id'] ?? null);
        } catch (Exception $exception) {
            DB::rollback();
            throw $exception;
        }

        DB::commit();

        // ---------------------------------------------------------------------- //

        return $user;
    }

    public static function message($user0, $user1, array $data)
    {
        $chat_query = Chat::select('chats.*');
        $chat_query->join('chat_members as CM0', 'chats.id', '=', 'CM0.chat_id');
        $chat_query->join('chat_members as CM1', 'chats.id', '=', 'CM1.chat_id');
        $chat_query->where('CM0.user_id', $user0->id);
        $chat_query->where('CM1.user_id', $user1->id);
        $chat_query->where('chats.type', Chat::TYPE_DIALOG);
        $chat_query->where('chats.owner_type', null);
        $chat_query->where('chats.owner_id', null);

        if ($chat = $chat_query->first()) {
            $chat_member = $chat->members()->where('user_id', $user0->id)->first();
            DB::beginTransaction();

            try {
                $chat_message = new ChatMessage;
                $chat_message->chat_id = $chat->id;
                $chat_message->author_user_id = $user0->id;
                $chat_message->text = $data['text'];
                $chat_message->save();

                $chat->last_message_id = $chat_message->id;
                $chat->save();
                $chat->setRelation('last_message', $chat_message);

                $chat_member->last_read_message_id = $chat_message->id;
                $chat_member->save();
            } catch (Exception $exception) {
                DB::rollback();
                throw $exception;
            }

            DB::commit();
        } else {
            $chat = Chat::create([
                'user0' => $user0,
                'user1' => $user1,

                'message' => [
                    'text' => $data['text'],
                ],
            ]);
        }

        $chat_message = $chat->last_message;
        $chat->unsetRelation('last_message');
        $chat->last_read_message_id = $chat_message->id;
        $chat_message->setRelation('chat', $chat);
        $chat_message->is_read = true;
        $chat_message->label = $data['label'] ?? null;
        $chat_message->setRelation('last_read_members', collect());
        realtime('chat_message_created', $chat_message->toArray());

        return $chat_message;
    }

    public static function boot()
    {
        parent::boot();
    }
}
