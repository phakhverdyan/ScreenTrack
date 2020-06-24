<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\User\User;
use App\Models\User\UserSignUp;
use App\Models\User\UserSetup;

class RedirectToCorrectInitialStage
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (!auth()->check()) {
            return $next($request);
        }

        $user = auth()->user();
        
        if ($user->initial_stage == User::INITIAL_STAGE_SIGN_UP) {
            switch ($user->sign_up->current_stage) {
                case UserSignUp::CURRENT_STAGE_CHOOSE_A_PLAN: {
                    if ($request->route()->getName() != 'sign_up.choose_a_plan') {
                        return redirect()->route('sign_up.choose_a_plan');
                    }

                    return $next($request);
                }
                
                case UserSignUp::CURRENT_STAGE_SET_ACCOUNT_DETAILS: {
                    if ($request->route()->getName() != 'sign_up.set_account_details') {
                        return redirect()->route('sign_up.set_account_details');
                    }

                    return $next($request);
                }

                case UserSignUp::CURRENT_STAGE_CHOOSE_ADDONS: {
                    if ($request->route()->getName() != 'sign_up.choose_addons') {
                        return redirect()->route('sign_up.choose_addons');
                    }

                    return $next($request);
                }

                case UserSignUp::CURRENT_STAGE_START_TRIAL: {
                    if ($request->route()->getName() != 'sign_up.start_trial') {
                        return redirect()->route('sign_up.start_trial');
                    }
                    
                    return $next($request);
                }
            }

            abort(404);
        }

        // if ($user->initial_stage == User::INITIAL_STAGE_SETUP) {
        //     switch ($user->setup->current_stage) {
        //         case UserSetup::CURRENT_STAGE_CREATE_CONTACT_LISTS: {
        //             if ($request->route()->getName() != 'setup.create_contact_lists') {
        //                 return redirect()->route('setup.create_contact_lists');
        //             }

        //             return $next($request);
        //         }

        //         case UserSetup::CURRENT_STAGE_CREATE_PROJECTS: {
        //             if ($request->route()->getName() != 'setup.create_projects') {
        //                 return redirect()->route('setup.create_projects');
        //             }

        //             return $next($request);
        //         }

        //         case UserSetup::CURRENT_STAGE_ADD_CONTACTS: {
        //             if ($request->route()->getName() != 'setup.add_contacts') {
        //                 return redirect()->route('setup.add_contacts');
        //             }

        //             return $next($request);
        //         }
        //     }

        //     abort(404);
        // }

        if (in_array(explode('.', $request->route()->getName())[0], ['sign_up', 'setup'])) {
            return redirect()->route('dashboard.index');
        }

        return $next($request);
    }
}
