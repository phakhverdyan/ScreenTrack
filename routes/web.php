<?php

Route::any('/test', function () {
    $project = App\Models\Project\Project::find(13883);
    // auth()->user()->canOpenContractInProject($project);
    // auth()->user()->canCloseProject($project);
    // App\Models\User\User::find(13879)->canOpenContractInProject($project);

	return 'hello!';
});

Route::prefix('/emails')->group(function () {
    Route::get('/user_has_been_registered', function () {
        return view('emails.user.user_has_been_registered');
    });

    Route::get('/user_has_been_invited', function () {
        $contract = App\Models\Contract::first();

        $invited_user = App\Models\User\User::first();
        $invited_user->wasRecentlyCreated = true;

        $inviting_user = App\Models\User\User::skip(1)->first();

        $chat_message = new App\Models\Chat\ChatMessage;
        $chat_message->text = 'Hello! How are you? How are you? How are you? How are you? How are you? How are you? How are you? How are you? How are you? How are you? How are you? How are you? How are you? How are you? How are you? How are you? How are you?';

        return view('emails.user.user_has_been_invited', [
            'invited_user' => $invited_user,
            'invited_user_was_recently_created' => true,
            'inviting_user' => $inviting_user,
            'contract' => $contract,
            'chat_message' => $chat_message,
        ]);
    });

    Route::get('/user_has_been_invited_to_project', function () {
        $contract = App\Models\Contract::first();

        $invited_user = App\Models\User\User::first();
        $invited_user->wasRecentlyCreated = true;

        $inviting_user = App\Models\User\User::skip(1)->first();

        return view('emails.user.user_has_been_invited_to_project', [
            'invited_user' => $invited_user,
            'invited_user_was_recently_created' => true,
            'inviting_user' => $inviting_user,
            'contract' => $contract,
        ]);
    });

    // Route::get('/wistiti2', function () {
    //     return view('temp.emails.wistiti');
    // });

    // Route::get('/wistit3', function () {
    //     return view('temp.emails.wistiti');
    // });
});

// ---------------------------------------------------------------------- //

Route::any('/login_using_api_token', 'AuthController@login_using_api_token');
Route::any('/logout', 'AuthController@logout')->name('logout');

// ---------------------------------------------------------------------- //

Route::prefix('/sign-up')->middleware([
    'fast_login',
    'redirect_to_correct_initial_stage',
    'user_locale_detection',
])->group(function () {
	Route::get('/choose-a-plan', 'SignUpController@choose_a_plan')->name('sign_up.choose_a_plan')->middleware('redirect_if_not_logged_in');
	Route::get('/set-account-details', 'SignUpController@set_account_details')->name('sign_up.set_account_details');
	Route::get('/choose-addons', 'SignUpController@choose_addons')->name('sign_up.choose_addons')->middleware('redirect_if_not_logged_in');
	Route::get('/start-trial', 'SignUpController@start_trial')->name('sign_up.start_trial')->middleware('redirect_if_not_logged_in');

	Route::any('/{any?}', function () {
		abort(404);
	})->where('any', '.*');
});

// ----------------------------------------------------

Route::prefix('/setup')->middleware([
    'fast_login',
    'redirect_if_not_logged_in',
    'redirect_to_correct_initial_stage',
    'user_locale_detection',
])->group(function () {
    Route::get('/create-contact-lists', 'SetupController@create_contact_lists')->name('setup.create_contact_lists');
    Route::get('/create-projects', 'SetupController@create_projects')->name('setup.create_projects');
    Route::get('/add-contacts', 'SetupController@add_contacts')->name('setup.add_contacts');

    Route::any('/{any?}', function () {
		abort(404);
	})->where('any', '.*');
});

// ---------------------------------------------------------------------- //

Route::get('/interview/{interview_hash}/start', 'InterviewController@show_start_interview');
Route::get('/interview/{interview_hash}', 'InterviewController@show_interview');
Route::get('/interview/{interview_hash}/completed', 'InterviewController@show_completed_page');
Route::get('/interview/{interview_hash}/thank-you', 'InterviewController@show_thank_you');

// ---------------------------------------------------------------------- //

Route::prefix('/dashboard')->middleware([
    'fast_login',
    'redirect_if_not_logged_in:/login',
    'redirect_to_correct_initial_stage',
    'user_locale_detection',
    'dashboard.selected_project_detection',
])->group(function () {
	Route::get('/', 'Dashboard\IndexController@index')->name('dashboard.index');
    Route::get('/overview', 'Dashboard\IndexController@overview')->name('dashboard.overview');

	Route::prefix('/profile')->group(function () {
		Route::get('/edit', 'Dashboard\ProfileController@edit')->name('dashboard.profile.edit');
    	Route::get('/change-password', 'Dashboard\ProfileController@change_password')->name('dashboard.profile.change_password');
    });

    Route::prefix('/companies')->group(function () {
    	Route::get('/', 'Dashboard\CompanyController@index')->name('dashboard.companies');
    	Route::get('/create', 'Dashboard\CompanyController@create')->name('dashboard.companies.create');
    	Route::get('/{company_id}/edit', 'Dashboard\CompanyController@edit')->name('dashboard.company.edit');
    });

    Route::prefix('/projects')->group(function () {
	    Route::get('/', 'Dashboard\Project\ProjectController@index')->name('dashboard.projects');
	    Route::get('/create', 'Dashboard\Project\ProjectController@create')->name('dashboard.projects.create');

	    Route::prefix('/{project_id}')->group(function () {
	        Route::get('/', 'Dashboard\Project\ProjectController@main')->name('dashboard.project');
            Route::get('/reports', 'Dashboard\Project\ProjectController@reports')->name('dashboard.project.reports');
            Route::get('/edit', 'Dashboard\Project\ProjectController@edit')->name('dashboard.project.edit');
	        Route::get('/channels', 'Dashboard\Project\ProjectController@channels')->name('dashboard.project.channels');
	        Route::get('/contracts', 'Dashboard\Project\ProjectController@contracts')->name('dashboard.project.contracts');

	        Route::get('/interviews', 'Dashboard\Project\ProjectInterviewsController@index')->name('dashboard.project.interviews');
	        Route::get('/interviews/{interview_id}/edit', 'Dashboard\Project\ProjectInterviewsController@edit');
	        Route::get('/interviews/{interview_id}/questions', 'Dashboard\Project\ProjectInterviewsController@manage_questions');

            Route::prefix('/boards')->group(function () {
                Route::get('/', 'Dashboard\Project\ProjectBoardController@index')->name('dashboard.project.boards');

                Route::prefix('/{board_id}')->group(function () {
                    Route::get('/', 'Dashboard\Project\ProjectBoardController@main')->name('dashboard.project.board');
                });
            });
	    });
    });

    Route::prefix('/contacts')->group(function () {
        Route::get('/', 'Dashboard\ContactController@list')->name('dashboard.contacts');
    });

    Route::prefix('/contracts')->group(function () {
        Route::get('/', 'Dashboard\ContractController@list')->name('dashboard.contracts');

        Route::prefix('/{contract_id}')->group(function () {
            Route::get('/', 'Dashboard\ContractController@index')->name('dashboard.contract');
        });
    });

    Route::prefix('/contacts-lists')->group(function () {
        Route::get('/', 'Dashboard\ContactController@contacts_lists');
    });

    Route::prefix('/billing')->group(function () {
    	Route::get('/', 'Dashboard\BillingController@index')->name('dashboard.billing');
    });

    Route::prefix('/passed-interviews')->group(function () {
        Route::get('/', 'Dashboard\PassedInterviewController@index')->name('dashboard.passed_interviews');
        Route::get('/{interview_result_id}/show', 'Dashboard\PassedInterviewController@show');
    });

    Route::prefix('/spendings')->group(function () {
        Route::get('/', function () {
            return redirect()->route('dashboard.spendings.progress');
        })->name('dashboard.spendings');

        Route::get('/progress', 'Dashboard\SpendingsController@progress')->name('dashboard.spendings.progress');
        Route::get('/review', 'Dashboard\SpendingsController@review')->name('dashboard.spendings.review');
        Route::get('/escrow', 'Dashboard\SpendingsController@escrow')->name('dashboard.spendings.escrow');
        Route::get('/paid', 'Dashboard\SpendingsController@paid')->name('dashboard.spendings.paid');
    });

    Route::prefix('/earnings')->group(function () {
        Route::get('/', function () {
            return redirect()->route('dashboard.earnings.progress');
        })->name('dashboard.earnings');

        Route::get('/progress', 'Dashboard\EarningsController@progress')->name('dashboard.earnings.progress');
        Route::get('/review', 'Dashboard\EarningsController@review')->name('dashboard.earnings.review');
        Route::get('/escrow', 'Dashboard\EarningsController@escrow')->name('dashboard.earnings.escrow');
        Route::get('/available', 'Dashboard\EarningsController@available')->name('dashboard.earnings.available');
        Route::get('/paid', 'Dashboard\EarningsController@paid')->name('dashboard.earnings.paid');
    });

    Route::prefix('/reports')->group(function () {
        Route::get('/', 'Dashboard\ReportsController@index')->name('dashboard.reports');
        Route::get('/invoices', 'Dashboard\ReportsController@invoices')->name('dashboard.reports.invoices');
        Route::get('/invoices/earnings', 'Dashboard\ReportsController@earnings')->name('dashboard.reports.invoices.earnings');
    //     Route::get('/', function () {
    //         return redirect()->route('dashboard.reports.progress');
    //     });

    //     Route::get('/progress', 'Dashboard\ReportsController@progress')->name('dashboard.reports.progress');
    //     Route::get('/review', 'Dashboard\ReportsController@review')->name('dashboard.reports.review');
    //     Route::get('/escrow', 'Dashboard\ReportsController@esrcow')->name('dashboard.reports.escrow');
    //     Route::get('/available', 'Dashboard\ReportsController@available')->name('dashboard.reports.available');
    //     Route::get('/paid', 'Dashboard\ReportsController@paid')->name('dashboard.reports.paid');
    });

    Route::prefix('/referrals')->group(function () {
        Route::get('/', 'Dashboard\ReferralController@index')->name('dashboard.referrals');
        Route::get('/direct', 'Dashboard\ReferralController@direct')->name('dashboard.referrals.direct');
        Route::get('/indirect', 'Dashboard\ReferralController@indirect')->name('dashboard.referrals.indirect');
        Route::get('/tier-3', 'Dashboard\ReferralController@tier_3')->name('dashboard.referrals.tier_3');
    });

    Route::any('/{any?}', function () {
		abort(404);
	})->where('any', '.*');
});

// ------------------------------------------------------------------------ //

Route::prefix('/nexus')->middleware([
    'administrator_only',
])->group(function () {
    Route::get('/', function () {
        return redirect('/nexus/help-center/articles');
    });

    Route::prefix('/users')->group(function () {
        Route::get('/', 'Admin\UserController@index');
    });

    Route::prefix('/help-center/articles')->group(function () {
        Route::get('/', 'Admin\HelpCenterArticlesController@index');
        Route::get('/create', 'Admin\HelpCenterArticlesController@create');
        Route::get('/{article_id}/edit', 'Admin\HelpCenterArticlesController@edit');
    });

    Route::prefix('/blog/articles')->group(function () {
        Route::get('/', 'Admin\BlogArticlesController@index');
        Route::get('/create', 'Admin\BlogArticlesController@create');
        Route::get('/{article_id}/edit', 'Admin\BlogArticlesController@edit');
    });

    Route::prefix('/feedback')->group(function () {
        Route::get('/', 'Admin\UsersFeedbackController@index');
        Route::get('/{feedback_id}/show', 'Admin\UsersFeedbackController@show');
    });

    Route::prefix('/administrators')->group(function () {
        Route::get('/', 'Admin\AdministratorsController@index');
        Route::get('/create', 'Admin\AdministratorsController@create');
    });

    Route::prefix('/coupons')->group(function () {
        Route::get('/', 'Admin\CouponsController@index');
        Route::get('/{coupon_id}/edit', 'Admin\CouponsController@edit');
        Route::get('/create', 'Admin\CouponsController@create');
    });

    Route::prefix('/payouts')->group(function () {
        Route::get('/pending', 'Admin\PayoutController@pending');
        // Route::get('/{coupon_id}/edit', 'Admin\CouponsController@edit');
        // Route::get('/create', 'Admin\CouponsController@create');
    });

    Route::prefix('/tracking-commands')->group(function () {
        Route::get('/', 'Admin\TrackingCommandController@index');
    });

    Route::any('/{any?}', function () {
        abort(404);
    })->where('any', '.*');
});

// ---------------------------------------------------------------------- //

Route::prefix('/{locale?}')->middleware([
	// 'check_for_maintenance',
    'fast_login',
    'user_locale_detection',
    'route_locale_detection',
    'referrer_user_detection',
    'ad_campaign_detection',
])->group(function () {
	// Route::get('/', 'IndexController@coming_soon')->middleware('redirect_if_logged_in')->name('coming_soon');

	// ------------------------------------------------------------------ //

    Route::any('/login', 'AuthController@login')->middleware('redirect_if_logged_in')->name('login');
    Route::any('/forgot-password', 'AuthController@forgot_password')->name('forgot_password');
    Route::any('/password-reset/{reset_password_token}', 'AuthController@password_reset')->name('password_reset');
    Route::any('/password-reset-sent', 'AuthController@password_reset_sent')->name('password_reset_sent');

	// ------------------------------------------------------------------ //

    Route::any('/', 'IndexController@landing_2')->middleware('redirect_if_logged_in')->name('index');
    Route::any('/landing-1', 'IndexController@landing_1')->middleware('redirect_if_logged_in')->name('landing_1');
    Route::any('/pricing', 'IndexController@pricing')->middleware('redirect_to_correct_initial_stage')->name('pricing');
	Route::any('/plans', 'IndexController@plans')->middleware('redirect_to_correct_initial_stage')->name('plans');
	Route::any('/how-it-works', 'IndexController@how_it_works')->name('how_it_works');
	Route::any('/faq', 'IndexController@faq')->name('faq');
	Route::any('/support', 'IndexController@support')->name('support');
    Route::any('/see-you-soon', 'IndexController@see_you_soon')->middleware('redirect_if_logged_in')->name('see_you_soon');
    Route::any('/contact-us', 'IndexController@contact_us')->middleware('redirect_if_logged_in')->name('contact_us');
    Route::any('/about-us', 'IndexController@about_us')->middleware('redirect_if_logged_in')->name('about_us');
    Route::any('/faq', 'IndexController@faq')->middleware('redirect_if_logged_in')->name('faq');
    Route::any('/security', 'IndexController@security')->middleware('redirect_if_logged_in')->name('security');
    Route::any('/affiliates', 'IndexController@affiliates')->name('affiliates');
    Route::any('/careers', 'IndexController@careers')->name('careers');
    Route::any('/status', 'IndexController@status')->name('status');

    Route::any('/download-app', function ($locale) {
        return redirect()->route('download_app_for_windows', [$locale]);
    })->name('download_app');

    Route::any('/download-app-for-windows', 'IndexController@download_app_for_windows')->name('download_app_for_windows');
    Route::any('/download-app-for-mac-os', 'IndexController@download_app_for_mac_os')->name('download_app_for_mac_os');

    Route::any('/privacy', 'IndexController@privacy')->name('privacy');
    Route::any('/terms', 'IndexController@terms')->name('terms');
    Route::any('/affiliate', 'IndexController@affiliate')->name('affiliate');

    // ------------------------------------------------------------------ //

    Route::prefix('/help-center')->group(function () {
        Route::get('/','HelpCenterController@show_index')->name('help_center.index');
        Route::get('/articles/{intended_for_slug}','HelpCenterController@show_articles_list')->name('help_center.intended_for_articles');
        Route::get('/article/{article_slug}','HelpCenterController@show_article')->name('help_center.article');
    });

    // ------------------------------------------------------------------ //

    Route::prefix('/blog')->group(function () {
        Route::get('/','BlogController@show_index')->name('blog.index');
        Route::get('/article/{article_slug}','BlogController@show_article')->name('blog.article');
    });

	// ------------------------------------------------------------------ //

	// Route::get('/log-in', 'IndexController@log_in');
	// Route::get('/');

    // Route::any('/{user_slug}', 'UserController@profile')->where('user_slug', '');

	// ------------------------------------------------------------------ //

	Route::any('/{argument0?}/{argument1?}', 'IndexController@other')->where('any1', '.*');
});
