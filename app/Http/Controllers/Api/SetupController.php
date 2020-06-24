<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Resources\BaseCollectionResource;
use App\Models\User\User;
use App\Models\Contact\Contact;
use App\Models\Contact\ContactList;
use App\Models\Project\Project;
use App\Models\Project\ProjectMember;
use App\Models\User\UserSetup;

class SetupController extends Controller
{
	public function create_contact_lists(Request $request) {
		$user = auth()->user();

		if (!$user->setup) {
			abort(404);
		}

		if ($user->setup->current_stage != UserSetup::CURRENT_STAGE_CREATE_CONTACT_LISTS) {
			return response()->resource([
				'next_setup_stage' => $user->setup->current_stage,
			]);
		}
		
		validator()->make($request->all(), [
			'contact_lists' => 'required|array',
			'contact_lists.*' => 'required|array',
			'contact_lists.*.title' => 'nullable|string',
			'contact_lists.0.title' => 'required|string',
		])->validate();

		foreach ($request->input('contact_lists') as $input_contact_list) {
			if (empty($input_contact_list['title'])) {
				continue;
			}

			$contact_list = new ContactList;
			$contact_list->user_id = $user->id;
			$contact_list->fill($input_contact_list);
			$contact_list->save();
		}

		$user->setup->current_stage = UserSetup::CURRENT_STAGE_CREATE_PROJECTS;
		$user->setup->save();

		return response()->resource([
			'next_setup_stage' => $user->setup->current_stage,
		]);
	}

	public function create_projects(Request $request) {
		$user = auth()->user();

		if (!$user->setup) {
			abort(404);
		}

		if ($user->setup->current_stage != UserSetup::CURRENT_STAGE_CREATE_PROJECTS) {
			return response()->resource([
				'next_setup_stage' => $user->setup->current_stage,
			]);
		}

		validator()->make($request->all(), [
			'projects' => 'required|array',
			'projects.*' => 'required|array',
			'projects.*.name' => 'nullable|string',
            'projects.0.name' => 'required|string',
		])->validate();

		foreach ($request->input('projects') as $input_project) {
			if (empty($input_project['name'])) {
				continue;
			}

			Project::create($input_project, [
				'owner_user' => $user,
				'related_company' => $user->companies()->first(),
			]);
		}

		$user->setup->current_stage = UserSetup::CURRENT_STAGE_ADD_CONTACTS;
		$user->setup->save();

		return response()->resource([
			'next_setup_stage' => $user->setup->current_stage,
		]);
	}

	public function add_contacts(Request $request) {
		$user = auth()->user();

		if (!$user->setup) {
			abort(404);
		}

		if ($user->setup->current_stage != UserSetup::CURRENT_STAGE_ADD_CONTACTS) {
			return response()->resource([
				'next_setup_stage' => $user->setup->current_stage,
			]);
		}

		validator()->make($request->all(), [
			'contacts' => 'required|array',
			'contacts.*' => 'required|array',
			'contacts.*.email' => 'nullable|email',
			'contacts.*.contact_list_ids' => 'nullable|array',
			
			'contacts.*.contact_list_ids.*' => [
				'integer',

				Rule::exists('contact_lists', 'id')->where(function ($query) use ($user) {
					$query->where('user_id', $user->id);
				}),
			],

			'contacts.*.project_ids' => 'nullable|array',

			'contacts.*.project_ids.*' => [
				'integer',

				Rule::exists('projects', 'id')->where(function ($query) use ($user) {
					$query->where('owner_user_id', $user->id);
				}),
			],
		])->validate();

		foreach ($request->input('contacts') as $input_contact) {
			if (empty($input_contact['email'])) {
				continue;
			}

			if (!$following_user = User::where('email', $input_contact['email'])->first()) {
				$following_user = User::create([
					'email' => $input_contact['email'],
				], ['is_invited' => true]);
			}

			$contact_query = Contact::query();
			$contact_query->where('follower_user_id', $user->id);
			$contact_query->where('following_user_id', $following_user->id);

			if (!$contact = $contact_query->first()) {
				$contact = new Contact;
				$contact->follower_user_id = $user->id;
				$contact->following_user_id = $following_user->id;
				$contact->save();
			}

			if (! empty($input_contact['contact_list_ids'])) {
				$contact->lists()->sync($input_contact['contact_list_ids']);
			}

			if (! empty($input_contact['project_ids'])) {
				foreach ($input_contact['project_ids'] as $project_id) {
					$project = Project::where('id', $project_id)->first();

					if (!$project_member = $project->members()->where('user_id', $following_user->id)->first()) {
						$project_member = new ProjectMember;
						$project_member->project_id = $project->id;
						$project_member->user_id = $following_user->id;
						$project_member->save();
					}
				}
			}
		}

		DB::beginTransaction();

		try {
			$user->setup->delete();
			$user->initial_stage = null;
			$user->save();
		} catch (\Exception $exception) {
			DB::rollback();
		}

		DB::commit();

		return response()->resource([
			'next_setup_stage' => null,
		]);
	}
}
