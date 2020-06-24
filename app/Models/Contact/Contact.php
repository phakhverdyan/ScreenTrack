<?php

namespace App\Models\Contact;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\DB;
use App\Models\Project\Project;
use App\Models\Project\ProjectMember;
use App\Models\Contact\ContactList;
use App\Models\User\User;

/**
 * App\Models\Contact\Contact
 *
 * @property int $id
 * @property int $follower_user_id
 * @property int $following_user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User\User $follower_user
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Project\Project[] $follower_user_projects
 * @property-read int|null $follower_user_projects_count
 * @property-read \App\Models\User\User $following_user
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Project\Project[] $following_user_projects
 * @property-read int|null $following_user_projects_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Contact\ContactList[] $lists
 * @property-read int|null $lists_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Contact\Contact newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Contact\Contact newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Contact\Contact query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Contact\Contact whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Contact\Contact whereFollowerUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Contact\Contact whereFollowingUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Contact\Contact whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Contact\Contact whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Contact extends Model
{
    public $hidden = [
        // 'follower_user_id',
        // 'following_user_id',
    ];

    public function lists()
    {
    	return $this->belongsToMany(ContactList::class, 'contact__contact_list')->withTimestamps();
    }

    public function follower_user()
    {
        return $this->belongsTo(User::class);
    }

    public function following_user()
    {
        return $this->belongsTo(User::class);
    }

    public function follower_user_projects()
    {
        $relation = $this->belongsToMany(Project::class, 'project_members', 'user_id', 'project_id', 'follower_user_id', 'id');
        $relation->withPivot('role');
        $relation->withTimestamps();

        return $relation;
    }

    public function following_user_projects()
    {
        $relation = $this->belongsToMany(Project::class, 'project_members', 'user_id', 'project_id', 'following_user_id', 'id');
        $relation->withPivot('role');
        $relation->withTimestamps();

        return $relation;
    }

    // public function common_projects()
    // {
    //     $relation = new BelongsToMany(Project::query(), $this, 'project_members', 'user_id', 'project_id', 'following_user_id', 'id');

    //     $relation->join('contacts', function ($join) {
    //         $join->on('contacts.following_user_id', '=', 'project_members.user_id');
    //     });

    //     $relation->join('project_members as follower_project_members', function ($join) {
    //         $join->on('follower_project_members.project_id', '=', 'projects.id');
    //         $join->on('follower_project_members.user_id', '=', 'contacts.follower_user_id');
    //     });

    //     $relation->withPivot('role');
    //     $relation->withTimestamps();

    //     return $relation;
    // }

    // public function attached_projects()
    // {
    //     $relation = $this->belongsToMany(Project::class, 'project_members', 'project_id', 'user_id', 'follower_user_id', 'id');

    //     $relation->whereIn('project_members.role', [
    //         ProjectMember::ROLE_OWNER,
    //         ProjectMember::ROLE_ADMINISTRATOR,
    //     ]);

    //     $relation->withPivot('role');

    //     return $relation;
    // }

    public function delete()
    {
        DB::beginTransaction();

        try {
            $this->lists()->sync([]);
            parent::delete();
        } catch (\Exception $exception) {
            DB::rollback();
            throw $exception;
        }

        DB::commit();
    }
}
