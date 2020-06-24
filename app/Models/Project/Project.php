<?php

namespace App\Models\Project;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\Models\Company\Company;
use App\Models\Contact;
use App\Models\Contract;
use App\Models\User\User;
use App\Models\Project\ProjectTask;
use App\Models\Project\ProjectList;
use App\Models\Project\ProjectBoard;
use App\Models\Project\ProjectMember;
use App\Models\Project\ProjectBoardMember;
use App\Models\Project\ProjectInvitationLink;

/**
 * App\Models\Project\Project
 *
 * @property int $id
 * @property int $owner_user_id
 * @property string $name
 * @property string|null $description
 * @property int|null $related_company_id
 * @property string|null $closed_at
 * @property mixed|null $created_at
 * @property mixed|null $updated_at
 * @property-read \App\Models\Project\ProjectInvitationLink $active_invitation_link
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Project\ProjectBoardMember[] $board_members
 * @property-read int|null $board_members_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Project\ProjectBoard[] $boards
 * @property-read int|null $boards_count
 * @property-read \App\Models\Contract $contract
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Project\ProjectInterview[] $interviews
 * @property-read int|null $interviews_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Project\ProjectList[] $lists
 * @property-read int|null $lists_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Project\ProjectMember[] $members
 * @property-read int|null $members_count
 * @property-read \App\Models\User\User $owner_user
 * @property-read \App\Models\Company\Company|null $related_company
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Project\ProjectTask[] $tasks
 * @property-read int|null $tasks_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\Project newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\Project newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\Project query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\Project whereClosedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\Project whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\Project whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\Project whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\Project whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\Project whereOwnerUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\Project whereRelatedCompanyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\Project whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Project extends Model
{
	public $fillable = [
		'name',
        'description',
        'related_company_id',
	];

    public $hidden = [
        'count_of_contracts',
    ];

    public $casts = [
        'created_at' => 'datetime:' . \DateTime::ATOM,
        'updated_at' => 'datetime:' . \DateTime::ATOM,
    ];

    // ---------------------------------------------------------------------- //
    // 
    // Relation Methods
    // 
    // ---------------------------------------------------------------------- //
	
    public function owner_user()
    {
        return $this->belongsTo(User::class);
    }

    public function members()
    {
    	return $this->hasMany(ProjectMember::class);
    }

    public function related_company()
    {
        return $this->belongsTo(Company::class);
    }

    public function boards()
    {
        return $this->hasMany(ProjectBoard::class);
    }

    public function board_members()
    {
        return $this->hasMany(ProjectBoardMember::class);
    }

    public function lists()
    {
        return $this->hasMany(ProjectList::class);
    }

    public function tasks()
    {
        return $this->hasMany(ProjectTask::class);
    }

    public function interviews()
    {
        return $this->hasMany(ProjectInterview::class);
    }

    public function active_invitation_link()
    {
        return $this->hasOne(ProjectInvitationLink::class)->where('is_disabled', false);
    }

    public function contract() // is indirect relation
    {
        return $this->belongsTo(Contract::class);
    }
    
    // ---------------------------------------------------------------------- //
    // 
    // Different Static Methods
    // 
    // ---------------------------------------------------------------------- //

    public static function create(array $data, array $params = [], array $options = [])
    {
        DB::beginTransaction();

        try {
            $project = new Project;
            $project->fill($data);
            $project->owner_user_id = $params['owner_user']->id;
            $project->related_company_id = $params['related_company']->id ?? null;
            $project->save();

            $project_member = new ProjectMember;
            $project_member->project_id = $project->id;
            $project_member->user_id = $project->owner_user_id;
            $project_member->role = ProjectMember::ROLE_OWNER;
            $project_member->save();

            $project_board = new ProjectBoard;
            $project_board->project_id = $project->id;
            $project_board->name = 'General';
            $project_board->position = 65535;
            $project_board->save();
            $project->setRelation('boards', collect([$project_board]));

            $project_board_member = new ProjectBoardMember;
            $project_board_member->project_id = $project->id;
            $project_board_member->project_member_id = $project_member->id;
            $project_board_member->board_id = $project_board->id;
            $project_board_member->user_id = $project->owner_user_id;
            $project_board_member->save();
            $project_board->setRelation('members', collect([$project_board_member]));

            $project_invitation_link = new ProjectInvitationLink;
            $project_invitation_link->project_id = $project->id;
            $project_invitation_link->generateToken();
            $project_invitation_link->save();

            $project_lists = collect();

            foreach (['To Do', 'Doing', 'To Verify', 'Done'] as $project_list_name) {
                $project_list = new ProjectList;
                $project_list->project_id = $project->id;
                $project_list->board_id = $project_board->id;
                $project_list->name = $project_list_name;
                $project_list->save();
                $project_lists->push($project_list);
            }

            $project_task = new ProjectTask;
            $project_task->project_id = $project->id;
            $project_task->board_id = $project_board->id;
            $project_task->list_id = $project_lists[0]->id;
            $project_task->title = 'First Task';
            $project_task->save();

            $project->setRelation('members', collect([$project_member]));
            $project_board->setRelation('lists', $project_lists);
            $project_list->setRelation('tasks', collect([$project_task]));
        } catch (\Exception $exception) {
            DB::rollback();
            throw $exception;
        }
        
        DB::commit();

        return $project;
    }
}
