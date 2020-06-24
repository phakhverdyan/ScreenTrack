<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use App\Models\Company\Company;
use App\Models\Project\Project;
use App\Models\Project\ProjectMember;
use App\Models\User\User;
use App\Models\Contact\Contact;
use App\Models\Geo\Locality;

class ContactController extends Controller
{
    public function list(Request $request) {
        $user = auth()->user();

        validator()->make($request->all(), [
            'query' => 'nullable|string',
            'project_ids' => 'nullable|array',
            'project_ids.*' => 'required|numeric',
            'list_ids' => 'nullable|array',
            'list_ids.*' => 'required|numeric',
            'limit' => 'nullable|numeric',
        ])->validate();
        
        $contact_query = $user->contacts();

        $contact_query->with([
            'following_user',
            'following_user_projects',
            'lists',
        ]);

        if ($request->input('project_ids')) {
            $contact_query->whereHas('following_user_projects', function ($query) use ($request) {
                $query->whereIn('projects.id', $request->input('project_ids'));
            });
        }

        if ($request->input('list_ids')) {
            $contact_query->whereHas('lists', function ($query) use ($request) {
                $query->whereIn('lists.id', $request->input('list_ids'));
            });
        }

        if ($request->input('query')) {
            $input_query_parts = collect(preg_split('/[-,\s@\.]+/', trim($request->input('query'))));

            $input_query_string = $input_query_parts->filter(function ($input_query_part) {
                return strlen($input_query_part) > 3;
            })->map(function ($input_query_part) {
                return '+' . $input_query_part . '*';
            })->implode(' ');

            $contact_query->whereHas('following_user', function ($query) use ($request, $input_query_string) {
                $query->where(function ($where) use ($request, $input_query_string) {
                    $where->orWhere('email', trim($request->input('query')));

                    $where->orWhereRaw('match(first_name, last_name, professional_title, email, slug, skype) against (? in boolean mode)', [
                        $input_query_string,
                    ]);
                });
            });
        }

        if ($limit = $request->input('limit')) {
            $contact_query->limit($limit);
        }

        $contacts = $contact_query->orderBy('id', 'desc')->get()->each(function ($current_contact) {
             $current_contact->following_user->makeVisible([
                 'email',
             ]);
        });
        
        return response()->resource($contacts);
    }

    public function create(Request $request) {
        $user = auth()->user();

        $validation_rules =  [
            'contact' => 'required|array',

            'contact.email' => [
                'required',
                'email',
                'unique_in_case:user_by_email_joined_contacts_of_user,' . $user->id,
            ],

            'contact.list_ids' => 'nullable|array',

            'contact.list_ids.*' => [
                'required',
                'integer',
                'exists_in_case:contact_list_by_id_of_user,' . $user->id,
            ],

            'contact.project_ids' => 'nullable|array',

            'contact.project_ids.*' => [
                'required',
                'integer',
                'exists_in_case:project_by_id_joined_project_members_where_role_is_owner_or_administrator_of_user,' . $user->id,
            ],
        ];

        validator()->make($request->all(), $validation_rules)->validate();

        if (!$contact_following_user = User::where('email', $request->input('contact.email'))->first()) {
            $contact_following_user = User::create([
                'email' => $request->input('contact.email'),
            ], ['is_invited' => true]);
        }

        $contact_query = Contact::query();
        $contact_query->where('follower_user_id', $user->id);
        $contact_query->where('following_user_id', $contact_following_user->id);

        if (!$contact = $contact_query->first()) {
            $contact = new Contact;
            $contact->follower_user_id = $user->id;
            $contact->following_user_id = $contact_following_user->id;
            $contact->save();
            $contact->setRelation('following_user', $contact_following_user);

            $contact->load([
                'following_user.projects' => function ($query) use ($user) {
                    $query->join('project_members as follower_project_members', function ($join) {
                        $join->on('follower_project_members.project_id', '=', 'projects.id');
                    })->where('follower_project_members.user_id', $user->id);
                },
            ]);

            if ($request->has('contact.list_ids')) {
                $contact->lists()->sync($request->input('contact.list_ids', []));
                $contact->load('lists');
            }

            if ($request->has('contact.project_ids')) {
                $contact_project_ids = collect($request->input('contact.project_ids', []));
                $attaching_contact_project_ids = $contact_project_ids->diff($contact_following_user->projects->pluck('id'));
                $detaching_contact_project_ids = $contact_following_user->projects->pluck('id')->diff($contact_project_ids);
                
                foreach ($attaching_contact_project_ids as $attaching_contact_project_id) {
                    $project_member_query = ProjectMember::query();
                    $project_member_query->where('user_id', $contact->following_user->id);
                    $project_member_query->where('project_id', $attaching_contact_project_id);
                    
                    if (!$project_member = $project_member_query->first()) {
                        $project_member = new ProjectMember;
                        $project_member->user_id = $contact->following_user->id;
                        $project_member->project_id = $attaching_contact_project_id;
                        $project_member->save();
                    }
                }

                $project_member_query = ProjectMember::query();
                $project_member_query->where('user_id', $contact->following_user->id);
                $project_member_query->whereIn('project_id', $detaching_contact_project_ids);
                $project_member_query->delete();

                $contact->following_user->load([
                    'projects' => function ($query) use ($user) {
                        $query->join('project_members as follower_project_members', function ($join) {
                            $join->on('follower_project_members.project_id', '=', 'projects.id');
                        })->where('follower_project_members.user_id', $user->id);
                    },
                ]);
            }
        }

        return response()->resource($contact);
    }

    public function update(Request $request, $contact_id)
    {
        $contact = Contact::findOrFail($contact_id);
        $user = auth()->user();
        $user->canEditContactOrForbidden($contact);

        $validation_rules =  [
            'contact' => 'required|array',

            'contact.list_ids' => 'nullable|array',

            'contact.list_ids.*' => [
                'required',
                'integer',
                'exists_in_case:contact_list_by_id_of_user,' . $user->id,
            ],

            'contact.project_ids' => 'nullable|array',

            'contact.project_ids.*' => [
                'required',
                'integer',
                'exists_in_case:project_by_id_joined_project_members_where_role_is_owner_or_administrator_of_user,' . $user->id,
            ],
        ];

        validator()->make($request->all(), $validation_rules)->validate();

        $contact->load([
            'lists',
            'following_user',

            'following_user.projects' => function ($query) use ($user) {
                $query->join('project_members as follower_project_members', function ($join) {
                    $join->on('follower_project_members.project_id', '=', 'projects.id');
                })->where('follower_project_members.user_id', $user->id);
            },
        ]);

        if ($request->has('contact.list_ids')) {
            $contact->lists()->sync($request->input('contact.list_ids', []));
            $contact->load('lists');
        }

        if ($request->has('contact.project_ids')) {
            $contact_project_ids = collect($request->input('contact.project_ids', []));
            $attaching_contact_project_ids = $contact_project_ids->diff($contact->following_user->projects->pluck('id'));
            $detaching_contact_project_ids = $contact->following_user->projects->pluck('id')->diff($contact_project_ids);

            foreach ($attaching_contact_project_ids as $attaching_contact_project_id) {
                $project_member_query = ProjectMember::query();
                $project_member_query->where('user_id', $contact->following_user->id);
                $project_member_query->where('project_id', $attaching_contact_project_id);
                
                if (!$project_member = $project_member_query->first()) {
                    $project_member = new ProjectMember;
                    $project_member->user_id = $contact->following_user->id;
                    $project_member->project_id = $attaching_contact_project_id;
                    $project_member->save();
                }
            }

            $project_member_query = ProjectMember::query();
            $project_member_query->where('user_id', $contact->following_user->id);
            $project_member_query->whereIn('project_id', $detaching_contact_project_ids);
            $project_member_query->delete();

            $contact->following_user->load([
                'projects' => function ($query) use ($user) {
                    $query->join('project_members as follower_project_members', function ($join) {
                        $join->on('follower_project_members.project_id', '=', 'projects.id');
                    })->where('follower_project_members.user_id', $user->id);
                },
            ]);
        }

        return response()->resource($contact);
    }

    public function delete($contact_id) {
        $user = auth()->user();
        $contact = Contact::findOrFail($contact_id);
        $user->canDeleteContactOrForbidden($contact);
        $contact->delete();

        return response()->resource();
    }
}
