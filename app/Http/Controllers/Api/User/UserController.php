<?php

namespace App\Http\Controllers\Api\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Events\User\UserHasBeenInvitedEvent;
use App\Models\Contract;
use App\Models\Geo\Locality;
use App\Models\User\User;
use App\Models\User\UserLink;
use App\Models\User\UserImage;
use App\Models\User\UserCreditCard;
use App\Models\Chat\Chat;
use App\Models\Chat\ChatMessage;
use App\Models\Project\Project;
use App\Models\Project\ProjectTask;
use App\Models\Project\ProjectMember;
use App\Models\Tracking\TrackingSegment;

class UserController extends Controller
{
	public function get(Request $request, $user_id)
	{
		$user = ($user_id == 'me') ? auth()->user() ?: abort(401) : User::findOrFail($user_id);
		
		$user->load([
			'locality',
			'specialized_profiles',
			'image',
		]);

		if (auth()->check() && auth()->user()->id == $user->id) {
			$user->load([
				'projects' => function ($query) use ($request) {
		            $query->select('projects.*');

					$query->selectRaw('(' .
						'SELECT COUNT(*) FROM project_tasks ' .
						'JOIN project_task_members ON project_task_members.task_id = project_tasks.id ' .
						'WHERE project_tasks.project_id = projects.id ' .
						'AND project_task_members.user_id = ?' .
					') AS count_of_trackable_tasks', [auth()->user()->id]);

					$query->selectRaw('(' .
						'SELECT COUNT(*) * 60 FROM tracking_segments ' .
						'JOIN tracking_sessions ON tracking_sessions.id = tracking_segments.session_id ' .
						'WHERE tracking_sessions.project_id = projects.id ' .
						'AND tracking_sessions.user_id = ? ' .
						'AND tracking_segments.created_at >= ? AND tracking_segments.created_at < ?' .
					') AS tracked_today', [
						auth()->user()->id,
						date(\DateTime::ATOM, floor(time() / 86400) * 86400),
						date(\DateTime::ATOM, floor(time() / 86400) * 86400 + 86400),
					]);

					$query->selectRaw('(' .
						'SELECT COUNT(*) * 60 FROM tracking_segments ' .
						'JOIN tracking_sessions ON tracking_sessions.id = tracking_segments.session_id ' .
						'WHERE tracking_sessions.project_id = projects.id ' .
						'AND tracking_sessions.user_id = ? ' .
						'AND tracking_segments.created_at >= ? AND tracking_segments.created_at < ?' .
					') AS tracked_this_week', [
						auth()->user()->id,
						date('Y-m-d', strtotime('-' . (date('w') + 6) % 7 . ' days', time())),
						date('Y-m-d', strtotime('-' . (date('w') + 6) % 7 . ' days', time() + 86400 * 7)),
					]);

					if ($request->has('order_projects_by_last_tracked_at')) {
						$query->orderBy('project_members.last_tracked_at', 'desc');
					} else {
						$query->orderBy('project_members.last_viewed_at', 'desc');
					}
				},
			]);
		}

		// ---------------------------------------------------------------------- //
        
        if (auth()->user()->id !== $user->id) {
            $time_section = 5;
    
            $tracking_segment_query = TrackingSegment::query();
            $tracking_segment_query->with('screenshot');
            $tracking_segment_query->select('tracking_segments.*');
            $tracking_segment_query->selectRaw('COUNT(*) AS count_of_subsegments');
            $tracking_segment_query->selectRaw('SUM(count_of_keyboard_clicks) AS count_of_keyboard_clicks');
            $tracking_segment_query->selectRaw('SUM(count_of_mouse_clicks) AS count_of_mouse_clicks');
            $tracking_segment_query->selectRaw('COUNT(*) / 60 * contracts.hourly_rate AS total_amount');
    
            $tracking_segment_query->selectRaw('FLOOR(UNIX_TIMESTAMP(tracking_segments.created_at) / ? / 60) AS number', [
                $time_section,
            ]);
    
            $tracking_segment_query->selectRaw(collect([
                '(',
                'SELECT MAX(tracking_screenshots.id) FROM tracking_screenshots',
                'WHERE tracking_screenshots.session_id = tracking_segments.session_id',
                'AND',
                'FLOOR(UNIX_TIMESTAMP(tracking_screenshots.created_at) / 60 / ?)',
                '=',
                'FLOOR(UNIX_TIMESTAMP(tracking_segments.created_at) / 60 / ?)',
                ') AS screenshot_id',
            ])->join(' '), [
                $time_section,
                $time_section,
            ]);
    
            $tracking_segment_query->selectRaw('0 AS is_last');
            $tracking_segment_query->join('tracking_sessions', 'tracking_sessions.id', '=', 'tracking_segments.session_id');
            $tracking_segment_query->join('contracts', 'contracts.id', '=', 'tracking_sessions.contract_id');
            $tracking_segment_query->where('contracts.employer_user_id', auth()->user()->id);
            $tracking_segment_query->where('contracts.employee_user_id', $user->id);
    
            $tracking_segment_started_at = floor(time() / 86400) * 86400;
            $tracking_segment_ended_at = $tracking_segment_started_at + 86400;
            
            $tracking_segment_query->where(
                'tracking_segments.created_at',
                '>=',
                date(\DateTime::ATOM, $tracking_segment_started_at)
            );
            
            $tracking_segment_query->where(
                'tracking_segments.created_at',
                '<',
                date(\DateTime::ATOM, $tracking_segment_ended_at)
            );
            
            $tracking_segment_query->groupBy('number');
            $tracking_segment_query->orderBy('tracking_segments.created_at', 'asc');
            $tracking_segments = $tracking_segment_query->get();
    
            if ($tracking_segment_started_at == floor(time() / 86400) * 86400) {
                if ($last_tracking_segment = $tracking_segments->last()) {
                    $last_tracking_segment->is_last = 1;
                }
            }
    
            $user->setRelation('tracking_segments', $tracking_segments);
        }

		// ---------------------------------------------------------------------- //

		$contract_query = Contract::select('contracts.*');

		$contract_query->selectRaw('(' . collect([
			'SELECT COUNT(*)',
			'FROM tracking_segments',
			'JOIN tracking_sessions ON tracking_sessions.id = tracking_segments.session_id',
			'WHERE tracking_sessions.contract_id = contracts.id',
		])->join(' ') . ') AS count_of_segments');
		
		$contract_query->with([
			'employer_user',
			'employer_user.image',
			'employee_user',
			'employee_user.image',
		]);

		$contract_query->where(function ($where) use ($user) {
			$where->orWhere(function ($where) use ($user) {
				$where->where('employer_user_id', $user->id);
				$where->where('employee_user_id', auth()->user()->id);
			});

			$where->orWhere(function ($where) use ($user) {
				$where->where('employer_user_id', auth()->user()->id);
				$where->where('employee_user_id', $user->id);
			});
		});

		$contract_query->orderBy('created_at', 'desc');
		$contracts = $contract_query->get();

		foreach ($contracts as $contract) {
			$contract->makeVisible('hourly_rate');
		}

		$user->setRelation('contracts', $contracts);

		// ---------------------------------------------------------------------- //

		$direct_chat = null;
		$direct_chat_messages_per_page = 20;

		if (auth()->check() && auth()->user()->id != $user->id) {
			$chat_query = Chat::select([
				'chats.*',
				'CM1.last_read_message_id AS last_read_message_id',
			]);

			$chat_query->join('chat_members AS CM0', 'CM0.chat_id', '=', 'chats.id');
			$chat_query->join('chat_members AS CM1', 'CM1.chat_id', '=', 'chats.id');
			$chat_query->where('CM0.user_id', $user->id);
			$chat_query->where('CM1.user_id', auth()->user()->id);
			$chat_query->where('chats.owner_type', null);
			$chat_query->where('chats.type', 'dialog');

			$direct_chat = $chat_query->first();

			if ($direct_chat) {
				$direct_chat_members = $direct_chat->members()->with([
					'user',
					'user.image',
				])->get();

				$direct_chat_messages = collect();
				$direct_chat_message_query = $direct_chat->messages();
				$direct_chat_message_query->where('id', '<', $direct_chat->last_read_message_id);
				$direct_chat_message_query->orderBy('id', 'desc');
				$direct_chat_message_query->take($direct_chat_messages_per_page);
				$direct_chat_messages = $direct_chat_message_query->get();
				$direct_chat_message_query = $direct_chat->messages();
				$direct_chat_message_query->where('id', '>=', $direct_chat->last_read_message_id);
				$direct_chat_message_query->orderBy('id', 'asc');
				$direct_chat_message_query->take(1 + $direct_chat_messages_per_page * 3 - $direct_chat_messages->count());
				$direct_chat_message_query->get();
				$direct_chat_messages = $direct_chat_messages->concat($direct_chat_message_query->get());
				$direct_chat_messages = $direct_chat_messages->sortBy('id')->values();

				foreach ($direct_chat_messages as $direct_chat_message) {
					$direct_chat_message->is_read = ($direct_chat_message->id <= $direct_chat->last_read_message_id);
					$last_read_members = $direct_chat_members->where('last_read_message_id', $direct_chat_message->id);
					$last_read_members = $last_read_members->where('user_id', '!=', auth()->user()->id);
					$last_read_members = $last_read_members->sortBy('last_read_at')->values();
					$direct_chat_message->setRelation('last_read_members', $last_read_members);
				}

				$direct_chat->count_of_messages_before = 0;
				$direct_chat->count_of_messages_after = 0;

				if ($direct_chat_messages->count() > 0) {
					$direct_chat_message_query = $direct_chat->messages()->where('id', '<', $direct_chat_messages->first()->id);
					$direct_chat->count_of_messages_before = $direct_chat_message_query->count();
					$direct_chat_message_query = $direct_chat->messages()->where('id', '>', $direct_chat_messages->last()->id);
					$direct_chat->count_of_messages_after = $direct_chat_message_query->count();
				}

				$direct_chat->setRelation('messages', $direct_chat_messages);
			}
		}

		$user->setRelation('direct_chat', $direct_chat);

		// ---------------------------------------------------------------------- //

		if (auth()->check() && auth()->user()->id == $user->id) {
			$user->makeVisible('api_token');
		}
		
		return response()->resource($user);
	}

	public function change_password(Request $request, $user_id) {
		$user = ($user_id == 'me' ? auth()->user() ?: abort(401) : User::findOrFail($user_id));
		auth()->user()->canEditUserOrForbidden($user);

		validator()->make($request->all(), [
			'user' => 'required|array',
			'user.current_password' => 'required|string|current_password:' . $user->id,
			'user.new_password' => 'required|confirmed|min:6',
		])->validate();

		$user->password = $request->input('user.new_password');
		$user->save();

		return response()->resource($user);
	}

	public function update(Request $request, $user_id) {
		$user = ($user_id == 'me') ? auth()->user() ?: abort(401) : User::findOrFail($user_id);
		auth()->user()->canEditUserOrForbidden($user);
		
		$user->load([
			'links',
			'spoken_languages',
		]);

		Locality::getOrMakeByKey($request->input('user.locality_key'));

		validator()->make($request->all(), [
			'user' => 'required|array',
			'user.slug' => 'nullable|string|unique:users,slug,' . $user->id,
			'user.first_name' => 'nullable|string',
			'user.last_name' => 'nullable|string',
			'user.professional_title' => 'nullable|string',
			'user.professional_description' => 'nullable|string',
			'user.hourly_rate' => 'nullable|numeric',
			'user.email' => 'nullable|email|unique:users,email,' . $user->id,
			'user.skype' => 'nullable|string',
			'user.website_url' => 'nullable|valid_link',
			'user.links' => 'nullable|array|integer_keys',
			'user.links.*' => 'required|array',
			'user.links.*.type_key' => 'nullable|string|exists:user_link_types,key',
			'user.links.*.url' => 'nullable|valid_link',
			'user.spoken_language_codes' => 'nullable|array|integer_keys',
			'user.spoken_language_codes.*' => 'nullable|string|exists:languages,code',
			'user.timezone' => 'nullable|string', // TODO: validate timezone
			'user.language_code' => 'nullable|string|exists:languages,code',
			'user.locality_key' => 'nullable|string|exists:localities,key',
			'user.phone_number' => 'nullable|required_with:user.locality_key|string',

			'user.affiliate_mode' => 'nullable|in:' . implode(',', [
				User::AFFILIATE_MODE_STANDARD,
				User::AFFILIATE_MODE_SUPER,
				User::AFFILIATE_MODE_SUPERVISOR,
			]),
		])->validate();

		$user->fill($request->input('user'));

		if ($request->input('user.affiliate_mode') && auth()->user()->administrator) {
			$user->affiliate_mode = $request->input('user.affiliate_mode');
		}

		$user->save();

		if ($request->has('user.links')) {
			$user_links = collect();

			foreach ($request->input('user.links', []) as $input_user_link_index => $input_user_link) {
				if (empty($input_user_link['type_key']) || empty($input_user_link['url'])) {
					continue;
				}

				$user_link = $user->links->where('type_key', $input_user_link['type_key'])->where('url', $input_user_link['url'])->first();

				if (!$user_link) {
					$user_link = new UserLink;
				}

				$user_link->user_id = $user->id;
				$user_link->index = $input_user_link_index;
				$user_link->type_key = $input_user_link['type_key'];
				$user_link->url = $input_user_link['url'];
				$user_link->save();
				$user_links->push($user_link);
			}

			foreach ($user->links as $previous_user_link) {
				if ($user_links->where('id', $previous_user_link->id)->first()) {
					continue;
				}

				$previous_user_link->delete();
			}

			$user->setRelation('links', $user_links);
		}

		if ($request->has('user.spoken_language_codes')) {
			$user_spoken_language_codes = collect($request->input('user.spoken_language_codes', []));

			$user_spoken_language_codes = $user_spoken_language_codes->filter(function ($user_spoken_language_code) {
				return $user_spoken_language_code;
			})->unique();

			$user->spoken_languages()->sync($user_spoken_language_codes->mapWithKeys(function ($spoken_language_code, $spoken_language_index) {
				return [
					$spoken_language_code => [
						'index' => $spoken_language_index,
					],
				];
			}));

			$user->setRelation('spoken_languages', $user->spoken_languages()->get());
		}

		return response()->resource($user);
	}

	// ---------------------------------------------------------------------- //

	public function projects(Request $request, $user_id)
	{
		$user = ($user_id == 'me') ? auth()->user() ?: abort(401) : User::findOrFail($user_id);

		validator()->make($request->all(), [
			'query' => 'string',
		])->validate();

		$user_project_query = $user->projects();

		if ($request->has('is_time_trackable_only')) {
			$user_project_query->join('contracts', function ($join) {
				$join->on('contracts.employer_user_id', '=', 'projects.owner_user_id');
				$join->on('contracts.employee_user_id', '=', 'project_members.user_id');
				$join->where('contracts.closed_at', null);
			});
		}
		
		if ($request->has('query')) {
			$user_project_query->where('projects.name', 'like', '%' . $request->input('query') . '%');
		}

		if ($request->has('is_time_trackable_only')) {
			$user_project_query->orderBy('project_members.last_tracked_at', 'desc');
		}
		
		$user_project_query->orderBy('project_members.last_viewed_at', 'desc');
		$user_projects = $user_project_query->get();

		return response()->resource($user_projects);
	}

	public function chats(Request $request, $user_id)
	{
		$user = ($user_id == 'me') ? auth()->user() ?: abort(401) : User::findOrFail($user_id);
		auth()->user()->canAccessUserOrForbidden($user);
		$chat_query = $user->chats();
		
		$chat_query->with([
			'members',
			'last_message',
		]);

		$chats = $chat_query->get();

		return response()->resource($chats);
	}

	public function message(Request $request, $user_id)
	{
		$user = ($user_id == 'me') ? auth()->user() ?: abort(401) : User::findOrFail($user_id);

		if (auth()->user()->id == $user->id) {
			return response()->error('You Can\'t Message Yourself');
		}

		validator()->make($request->all(), [
			'chat_message' => 'required|array',
			'chat_message.text' => 'required|string',
		])->validate();

		$chat_message = User::message(auth()->user(), $user, [
			'text' => $request->input('chat_message.text'),
		]);

		return response()->resource($chat_message);
	}

	public function tracking_segments(Request $request, $user_id)
	{
		$user = ($user_id == 'me') ? auth()->user() : User::findOrFail($user_id);

		validator()->make($request->all(), [
			'started_at' => 'nullable|date',
		])->validate();

		$time_section = 5;
		$started_at = strtotime($request->input('started_at'));
		$ended_at = $started_at + 86400;
		$tracking_segment_query = TrackingSegment::query();
		$tracking_segment_query->with('screenshot');
		$tracking_segment_query->select('tracking_segments.*');
		$tracking_segment_query->selectRaw('COUNT(*) AS count_of_subsegments');

		$tracking_segment_query->selectRaw('FLOOR(UNIX_TIMESTAMP(tracking_segments.created_at) / 60 / ?) AS number', [
			$time_section,
		]);

		$tracking_segment_query->selectRaw('SUM(count_of_keyboard_clicks) AS count_of_keyboard_clicks');
		$tracking_segment_query->selectRaw('SUM(count_of_mouse_clicks) AS count_of_mouse_clicks');
		$tracking_segment_query->selectRaw('COUNT(*) / 60 * contracts.hourly_rate AS total_amount');

		$tracking_segment_query->selectRaw('(' . collect([
			'SELECT MAX(tracking_screenshots.id) FROM tracking_screenshots',
			'WHERE tracking_screenshots.session_id = tracking_segments.session_id',
			'AND',
			'FLOOR(UNIX_TIMESTAMP(tracking_screenshots.created_at) / 60 / ?)',
			'=',
			'FLOOR(UNIX_TIMESTAMP(tracking_segments.created_at) / 60 / ?)',
		])->join(' ') . ') AS screenshot_id', [
			$time_section,
			$time_section,
		]);

		$tracking_segment_query->selectRaw('0 AS is_last');
		$tracking_segment_query->join('tracking_sessions', 'tracking_sessions.id', '=', 'tracking_segments.session_id');
		$tracking_segment_query->join('contracts', 'contracts.id', '=', 'tracking_sessions.contract_id');
		$tracking_segment_query->where('contracts.employer_user_id', auth()->user()->id);
		$tracking_segment_query->where('contracts.employee_user_id', $user->id);
		$tracking_segment_query->where('tracking_segments.created_at', '>=', date(\DateTime::ATOM, $started_at));
		$tracking_segment_query->where('tracking_segments.created_at', '<', date(\DateTime::ATOM, $ended_at));
		$tracking_segment_query->groupBy('number');
		$tracking_segment_query->orderBy('tracking_segments.created_at', 'asc');
		$tracking_segments = $tracking_segment_query->get();

		if ($started_at == floor(time() / 86400) * 86400) {
			if ($last_tracking_segment = $tracking_segments->last()) {
				$last_tracking_segment->is_last = 1;
			}
		}
		
		return response()->resource($tracking_segments);
	}

	public function open_contract(Request $request, $user_id) {
		$user = ($user_id == 'me') ? auth()->user() ?: abort(401) : User::findOrFail($user_id);

		if (auth()->user()->id == $user->id) {
			return response()->error('You Can\'t Open Contract with Yourself');
		}

		$contract_query = Contract::select('contracts.*');

		$contract_query->where(function ($where) use ($user) {
			$where->orWhere(function ($where) use ($user) {
				$where->where('employer_user_id', auth()->user()->id);
				$where->where('employee_user_id', $user->id);
			});

			$where->orWhere(function ($where) use ($user) {
				$where->where('employer_user_id', $user->id);
				$where->where('employee_user_id', auth()->user()->id);
			});
		});

		$contract_query->where('closed_at', null);
		$active_contract = $contract_query->first();

		if ($active_contract && !$request->input('recreate')) {
			return response()->error('Active contract already exists');
		}

		DB::beginTransaction();

        try {
        	if ($active_contract) {
        		$active_contract->closed_at = now();
        		$active_contract->save();
        	}

        	$created_contract = new Contract;
        	$created_contract->employer_user_id = auth()->user()->id;
        	$created_contract->employee_user_id = $user->id;
        	$created_contract->fill($request->input('contract'));
        	$created_contract->save();
        	$created_contract->count_of_segments = 0;
        	$created_contract->makeVisible(['hourly_rate']);
        } catch (\Exception $exception) {
        	DB::rollback();
        	throw $exception;
        }

        DB::commit();

        $created_contract->load([
        	'employer_user',
        	'employer_user.image',
        	'employee_user',
        	'employee_user.image',
        ]);

        return response()->resource($created_contract);
	}

	public function invite(Request $request)
	{
		$project = null;
		$project_member = null;

		if (is_string($request->input('project_member.project_id'))) {
			$project = Project::find($request->input('project_member.project_id'));
		}

		$validation_rules = [
            'user' => 'array',
            'user.id' => 'required_without:user.email|nullable|integer|exists:users,id',
            'user.email' => 'required_without:user.id|nullable|email',
            'chat_message' => 'required|array',
			'chat_message.text' => 'required|string',
        ];

        if ($project) {
        	$validation_rules['project_member'] = 'required|array';

        	$validation_rules['project_member.role'] = [
                'required',
                'string',
                
                'in:' . collect([
                    ProjectMember::ROLE_CONTRACTOR,
                    ProjectMember::ROLE_MANAGER,
                ])->concat(auth()->user()->id == $project->owner_user_id ? [
                    ProjectMember::ROLE_ADMINISTRATOR,
                ] : [])->join(','),
            ];
        	
        	if (auth()->user()->canOpenContractInProject($project)) {
	            $validation_rules['project_member.is_time_trackable'] = 'integer|nullable';
	        }
        }

        $being_invited_user = null;

        if ($request->input('user.email') && is_string($request->input('user.email'))) {
            $being_invited_user = User::where('email', $request->input('user.email'))->first();
        } else if ($request->input('user.id') && is_string($request->input('user.id'))) {
            $being_invited_user = User::find($request->input('user.id'));
        }

        if ($being_invited_user && auth()->user()->id == $being_invited_user->id) {
			return response()->error('You Can\'t Invite Yourself');
        }

        $contract = null;

        if ($project) {
	        if ($being_invited_user) {
	            $contract_query = $being_invited_user->employee_contracts();
	            $contract_query->where('employer_user_id', $project->owner_user_id);
	            $contract_query->where('closed_at', null);
	            $contract = $contract_query->first();
	        }

	        if ($request->input('project_member.is_time_trackable') && auth()->user()->canOpenContractInProject($project)) {
	            if (!$contract) {
	                $validation_rules['contract'] = 'required|array';
	                
	                $validation_rules['contract.hourly_rate'] = array_merge([
	                	auth()->user()->administrator ? 'nullable' : 'required',
	                	'numeric',
	                	auth()->user()->administrator ? 'min:0' : 'min:2',
	                	'max:999',
	                ]);

	                $validation_rules['contract.title'] = 'required|string';
	            }

	            if (!auth()->user()->default_credit_card) {
	                $validation_rules['stripe_token_id'] = 'required|string';
	            }
	        }
	    }

        validator()->make($request->all(), $validation_rules)->validate();

        // ---------------------------------------------------------------------- //

        DB::beginTransaction();

        try {
        	if ($request->input('user.email')) {
                if (!$being_invited_user) {
                    $being_invited_user = User::create([
                        'email' => $request->input('user.email'),
                        'referrer_user_id' => auth()->user()->id,
                    ]);
                }
            }

            $being_invited_user->load('image');

            if ($project) {
	            if ($request->input('project_member.is_time_trackable') && auth()->user()->canOpenContractInProject($project)) {
					if (!$contract) {
						$contract = new Contract;
						$contract->employer_user_id = auth()->user()->id;
						$contract->employee_user_id = $being_invited_user->id;
						$contract->hourly_rate = (float) $request->input('contract.hourly_rate', 0.0);
						$contract->title = $request->input('contract.title');
						$contract->save();
					}
				}

				if (!$project_member = $project->members()->where('user_id', $being_invited_user->id)->first()) {
					$project_member = new ProjectMember;
					$project_member->project_id = $project->id;
					$project_member->user_id = $being_invited_user->id;

					if ($request->input('project_member.is_time_trackable') && auth()->user()->canOpenContractInProject($project)) {
						$project_member->is_time_trackable = true;
					}

					$project_member->save();
				}

				$being_invited_user->setRelation('project_member', $project_member);

				if ($request->input('stripe_token_id')) {
					$user_stripe_customer = \Stripe\Customer::retrieve(auth()->user()->stripe_customer_id);

					$user_stripe_credit_card = $user_stripe_customer->sources->create([
						'source' => $request->input('stripe_token_id'),
					]);

					$user_credit_card = new UserCreditCard;
					$user_credit_card->user_id = auth()->user()->id;
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
			}
        } catch (\Exception $exception) {
            DB::rollback();
            throw $exception;
        }
        
        DB::commit();

        $chat_message = User::message(auth()->user(), $being_invited_user, [
			'text' => $request->input('chat_message.text'),
		]);

		event(new UserHasBeenInvitedEvent([
            'invited_user' => $being_invited_user,
        	'inviting_user' => auth()->user(),
            'project' => $project,
            'project_member' => $project_member,
            'contract' => $contract,
            'chat_message' => $chat_message,
        ]));

        return response()->resource($being_invited_user);
	}

	// ---------------------------------------------------------------------- //

	public function autocomplete(Request $request)
	{
		validator()->make($request->all(), [
			'inviting_project_id' => 'nullable|integer',
		])->validate();

		if ($request->input('inviting_project_id')) {
			$inviting_project_id = (int) $request->input('inviting_project_id');
			$inviting_project = Project::findOrFail($inviting_project_id);
			auth()->user()->canAddMemberToProjectOrForbidden($inviting_project);

			$input_query = trim($request->input('query'));
			
			$user_query = User::selectRaw(implode(', ', [
				'users.*',
				'project_members.id IS NOT NULL AS is_joined_project',
				'contracts.id AS contract_id',
			]));

			$user_query->with([
				'image',
				'contract',
			]);

			$user_query->leftJoin('project_members', function ($join) use ($inviting_project) {
				$join->on('project_members.user_id', '=', 'users.id');
				$join->where('project_members.project_id', $inviting_project->id);
			});
			
			$user_query->leftJoin('contracts', function ($join) use ($inviting_project) {
				$join->on('contracts.employee_user_id', '=', 'users.id');
				$join->where('contracts.employer_user_id', $inviting_project->owner_user_id);
				// $join->where('contracts.started_at', '!=', null);
				$join->where('contracts.closed_at', null);
			});
			
			if (preg_match('/^[\.0-9a-z-_]+@[\.0-9a-z-_]+[.][0-9a-z-_]{2,}$/i', $input_query)) {
				$user_query->where('email', $input_query);
				$user = $user_query->first();

				if (!$user) {
					$user = new User;
					$user->email = $input_query;
					$user->id = $user->email;
					$user->slug = $user->email;
					$user->is_joined_project = false;
					$user->is_under_contract = false;
					$user->setRelation('image', new UserImage);
				}

				$user->makeVisible('email');
				$user->contract && $user->contract->makeVisible('hourly_rate');
				$users = collect([$user]);
			} else {
				if ($input_query) {
					$input_query_parts = collect(preg_split('/[-,\s@\.]+/', trim($request->input('query'))));

					foreach ($input_query_parts as $input_query_part) {
						$user_query->where(function ($where) use ($input_query_part) {
							$where->orWhere('first_name', 'like', '%'. $input_query_part .'%');
							$where->orWhere('last_name', 'like', '%'. $input_query_part .'%');
							$where->orWhere('slug', 'like', '%'. $input_query_part .'%');
						});
					}
				}
				
				$user_query->take(10);
				$users = $user_query->get();

				foreach ($users as $user) {
					$user->contract && $user->contract->makeVisible('hourly_rate');
				}
			}

			return response()->resource($users);
		}

		// with_collaborative_projects

		$input_query = trim($request->input('query'));
		
		$user_query = User::selectRaw(implode(', ', [
			'users.*',
			// 'project_members.id IS NOT NULL AS is_joined_project',
			'contracts.id IS NOT NULL AS has_active_contract_with_me',
		]));

		$user_query->with('image');

		// $user_query->leftJoin('project_members', function ($join) use ($inviting_project) {
		// 	$join->on('project_members.user_id', '=', 'users.id');
		// 	$join->where('project_members.project_id', $inviting_project->id);
		// });

		$user_query->leftJoin('contracts', function ($join) {
			$join->on('contracts.employee_user_id', '=', 'users.id');
			$join->where('contracts.employer_user_id', auth()->user()->id);
			$join->where('contracts.closed_at', null);
		});
		
		if (preg_match('/^[\.0-9a-z-_]+@[\.0-9a-z-_]+[.][0-9a-z-_]{2,}$/i', $input_query)) {
			$user_query->where('email', $input_query);
			$user = $user_query->first();

			if (!$user) {
				$user = new User;
				$user->email = $input_query;
				$user->id = $user->email;
				$user->slug = $user->email;
				$user->has_active_contract_with_me = false;
				$user->setRelation('image', new UserImage);
				$user->setRelation('collaborative_projects', collect());
			}

			$user->makeVisible('email');
			$users = collect([$user]);
		} else {
			if ($input_query) {
				$input_query_parts = collect(preg_split('/[-,\s@\.]+/', $input_query));

				foreach ($input_query_parts as $input_query_part) {
					$user_query->where(function ($where) use ($input_query_part) {
						$where->orWhere('first_name', 'like', '%'. $input_query_part .'%');
						$where->orWhere('last_name', 'like', '%'. $input_query_part .'%');
						$where->orWhere('slug', 'like', '%'. $input_query_part .'%');
					});
				}
			}
			
			$user_query->take(10);
			$users = $user_query->get();
		}

		$project_member_query = ProjectMember::select('project_members.*');
		
		$project_member_query->with([
			'project',
		]);

		$project_member_query->join('project_members AS MPM', 'MPM.project_id', '=', 'project_members.project_id');
		$project_member_query->where('MPM.user_id', auth()->user()->id);
		$project_member_query->whereIn('project_members.user_id', $users->pluck('id')->toArray());
		$collaborative_project_members = $project_member_query->get();

		$collaborative_projects = $collaborative_project_members->map(function ($project_member) {
			$project = $project_member->project;
			$project_member->unsetRelation('project');
			$project->setRelation('pivot', $project_member);

			return $project;
		});

		foreach ($users as $user) {
			$user->setRelation('collaborative_projects', $collaborative_projects->filter(function ($project) use ($user) {
				return $project->pivot->user_id == $user->id;
			})->values());
		}

		return response()->resource($users);
	}
}
