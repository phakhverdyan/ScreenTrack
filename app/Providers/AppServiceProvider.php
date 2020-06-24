<?php

namespace App\Providers;

use Illuminate\Auth\TokenGuard;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Blade;
use Illuminate\Validation\Validator;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Models\Project\Project;
use App\Models\Project\ProjectMember;
use App\Models\User\User;
use App\Models\User\UserPayoutMethod;
use App\Models\Contact\Contact;
use App\Models\Contact\ContactList;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        if ($this->app->environment() !== 'production') {
            $this->app->register(\Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider::class);
        }
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);

        if (preg_match('#^https://#i', config('app.url'))) {
            URL::forceScheme('https');
        }

        $this->custom_responses();
        $this->custom_validation_rules();
    }
    
    /**
	 * Register methods for API responses
     *
     * @return void
	 */
    public function custom_responses()
    {
        Response::macro('error', function ($error = 'Internal Error', $status = 500, $extra = []) {
            $response = [
                'error' => $error,
            ];

            if (is_array($extra)) {
                $response = array_merge_recursive($response, $extra);
            }

            return response($response, $status);
        });

        Response::macro('resource', function ($resource = null, $extra = []) {
            $response = [];

            if ($resource instanceof LengthAwarePaginator) {
                $response['data'] = $resource->getCollection();

                $response['pagination'] = [
                    'current_page'  => $resource->currentPage(),
                    'last_page'     => $resource->lastPage(),
                    'per_page'      => $resource->perPage(),
                    'count'         => $resource->count(),
                    'total'         => $resource->total(),
                ];
            } else {
                $response['data'] = $resource;
            }

            if (is_array($extra)) {
                $response = array_merge_recursive($response, $extra);
            }

            return response($response, 200);
        });
    }

    public function custom_validation_rules()
    {
        validator()->extendImplicit('current_password', function($attribute, $value, $parameters, $validator) {
            if (!$user = User::find($parameters[0])) {
                return false;
            }

            return $user->doesPasswordEqual($value);
        });

        validator()->extend('integer_keys', function($attribute, $value, $parameters, $validator) {
            return is_array($value) && count(array_filter(array_keys($value), 'is_string')) === 0;
        });

        validator()->extend('valid_link', function($attribute, $value, $parameters, $validator) {
            $pattern = '/(?:https?:\/\/)?(?:[a-zA-Z0-9.-]+?\.(?:[a-zA-Z])|\d+\.\d+\.\d+\.\d+)/';
            
            return preg_match($pattern, $value);
        });

        validator()->extend('unique_in_case', function($attribute, $value, $parameters, $validator) {
            if (empty($parameters[0])) {
                return false;
            }

            switch ($parameters[0]) {
                case 'user_by_email_joined_contacts_of_user': {
                    if (empty($parameters[1])) {
                        return false;
                    }

                    $user_query = User::query();
                    $user_query->join('contacts', 'users.id', '=', 'contacts.following_user_id');
                    $user_query->where('users.email', $value);
                    $user_query->where('contacts.follower_user_id', $parameters[1]);

                    return !$user_query->exists();
                }
            }

            return false;
        });

        // validator()->extend('exists_in_case', function($attribute, $value, $parameters, $validator) {
        //     if (empty($parameters[0])) {
        //         return false;
        //     }
        //
        //     switch ($parameters[0]) {
        //         case 'contact_list_by_id_of_user': {
        //             if (empty($parameters[1])) {
        //                 return false;
        //             }
        //
        //             $contact_list_query = ContactList::query();
        //             $contact_list_query->where('id', $value);
        //             $contact_list_query->where('user_id', $parameters[1]);
        //
        //             return $contact_list_query->exists();
        //         }
        //
        //         case 'project_by_id_joined_project_members_where_role_is_owner_or_administrator_of_user': {
        //             if (empty($parameters[1])) {
        //                 return false;
        //             }
        //
        //             $project_query = Project::query();
        //             $project_query->join('project_members', 'projects.id', '=', 'project_members.project_id');
        //             $project_query->where('projects.id', $value);
        //
        //             $project_query->whereIn('project_members.role', [
        //                 ProjectMember::ROLE_OWNER,
        //                 ProjectMember::ROLE_ADMINISTRATOR,
        //             ]);
        //
        //             $project_query->where('project_members.user_id', $parameters[1]);
        //
        //             return $project_query->exists();
        //         }
        //
        //         case 'project_by_id_joined_project_members_where_role_is_owner_of_user': {
        //             if (empty($parameters[1])) {
        //                 return false;
        //             }
        //
        //             $project_query = Project::query();
        //             $project_query->join('project_members', 'projects.id', '=', 'project_members.project_id');
        //             $project_query->where('projects.id', $value);
        //
        //             $project_query->whereIn('project_members.role', [
        //                 ProjectMember::ROLE_OWNER,
        //                 ProjectMember::ROLE_ADMINISTRATOR,
        //             ]);
        //
        //             $project_query->where('project_members.user_id', $parameters[1]);
        //
        //             return $project_query->exists();
        //         }
        //     }
        //
        //     return false;
        // });
    }
}
