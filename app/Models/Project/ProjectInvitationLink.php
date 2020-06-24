<?php

namespace App\Models\Project;

use Illuminate\Database\Eloquent\Model;
use App\Models\Project\Project;
use Illuminate\Support\Str;

/**
 * App\Models\Project\ProjectInvitationLink
 *
 * @property int $id
 * @property int $project_id
 * @property string $token
 * @property bool $is_disabled
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Project\Project $project
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInvitationLink newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInvitationLink newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInvitationLink query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInvitationLink whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInvitationLink whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInvitationLink whereIsDisabled($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInvitationLink whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInvitationLink whereToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectInvitationLink whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ProjectInvitationLink extends Model
{
	public $attributes = [
		'is_disabled' => false,
	];

	public $casts = [
		'is_disabled' => 'boolean',
	];

	public function generateToken()
	{
		do {
            $this->token = Str::random(60);
        } while (self::where('token', $this->token)->first());

        return $this;
	}

    public function project()
    {
    	return $this->belongsTo(Project::class);
    }
}
