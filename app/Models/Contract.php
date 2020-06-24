<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\Events\ContractClosedEvent;
use App\Models\Milestone;
use App\Models\User\User;
use App\Models\Tracking\TrackingSegment;
use App\Models\Tracking\TrackingSession;

/**
 * App\Models\Contract
 *
 * @property int $id
 * @property int $employer_user_id
 * @property int $employee_user_id
 * @property string $type
 * @property string $title
 * @property string $payment_type
 * @property float|null $hourly_rate
 * @property \Illuminate\Support\Carbon|null $closed_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User\User $employee_user
 * @property-read \App\Models\User\User $employer_user
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Milestone[] $milestones
 * @property-read int|null $milestones_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Tracking\TrackingSegment[] $segments
 * @property-read int|null $segments_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Contract newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Contract newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Contract query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Contract whereClosedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Contract whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Contract whereEmployeeUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Contract whereEmployerUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Contract whereHourlyRate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Contract whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Contract whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Contract whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Contract whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Contract extends Model
{
    const TYPE_HOURLY = 'HOURLY';
    const TYPE_FIXED_PRICE = 'FIXED_PRICE';

    public static $types = [
        self::TYPE_HOURLY,
        self::TYPE_FIXED_PRICE,
    ];
    
    const PAYMENT_TYPE_DIRECT = 'DIRECT';
    const PAYMENT_TYPE_ESCROW = 'ESCROW';
    
    public static $paymentTypes = [
    	self::PAYMENT_TYPE_DIRECT,
		self::PAYMENT_TYPE_ESCROW,
	];

    public $fillable = [
        'type',
        'title',
        'hourly_rate',
    ];

    public $hidden = [
        'hourly_rate',
    ];

    public $casts = [
        'hourly_rate' => 'float',
        'closed_at' => 'datetime',
    ];

    public function employer_user()
    {
    	return $this->belongsTo(User::class);
    }

    public function employee_user()
    {
    	return $this->belongsTo(User::class);
    }

    public function segments()
    {
        return $this->hasManyThrough(TrackingSegment::class, TrackingSession::class, 'contract_id', 'session_id', 'id', 'id');
    }

    public function milestones()
    {
        return $this->hasMany(Milestone::class);
    }

    // public function delete() {
    //     parent::delete();
    //     // event(new ContractClosedEvent($this));
    // }
}
