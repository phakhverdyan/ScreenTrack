<?php

use Illuminate\Http\Request;

// ---------------------------------------------------------------------- //

Route::any('/test', function (Illuminate\Http\Request $request) {
	\App\Models\Chat\Chat::with([
		'members' => function ($query) {
			$query->limit(10);
		},
	])->get();
	
	return 1;
	dd(auth()->user());
});

// ---------------------------------------------------------------------- //

Route::any('/register', 'Api\AuthController@register');
Route::any('/is_user_registered', 'Api\AuthController@isUserRegistered');
Route::any('/login', 'Api\AuthController@login');
Route::any('/reset_password', 'Api\AuthController@resetPassword');
Route::any('/reset_password/{password_reset_token}', 'Api\AuthController@resetPasswordComplete');

// ---------------------------------------------------------------------- //

Route::prefix('/sign_up')->group(function () {
	Route::any('/choose_a_plan', 'Api\SignUpController@choose_a_plan')->middleware('logged_in_only');
	Route::any('/set_account_details', 'Api\SignUpController@set_account_details');
	Route::any('/choose_addons', 'Api\SignUpController@choose_addons')->middleware('logged_in_only');
	Route::any('/start_trial', 'Api\SignUpController@start_trial')->middleware('logged_in_only');
    Route::any('/after_interview', 'Api\SignUpController@after_interview');
});

// ---------------------------------------------------------------------- //

Route::prefix('/setup')->middleware([
	'logged_in_only',
])->group(function () {
    Route::any('/create_contact_lists', 'Api\SetupController@create_contact_lists');
    Route::any('/create_projects', 'Api\SetupController@create_projects');
    Route::any('/add_contacts', 'Api\SetupController@add_contacts');
});

// ---------------------------------------------------------------------- //

Route::prefix('/users')->group(function () {
    Route::any('/autocomplete', 'Api\User\UserController@autocomplete')->middleware('logged_in_only');
    Route::any('/invite', 'Api\User\UserController@invite')->middleware('logged_in_only');
    
	Route::prefix('/{user_id}')->group(function () {
        Route::get('/', 'Api\User\UserController@get');
		Route::any('/update', 'Api\User\UserController@update')->middleware('logged_in_only');
        Route::any('/change_password', 'Api\User\UserController@change_password')->middleware('logged_in_only');
        Route::any('/image/update', 'Api\User\UserImageController@update')->middleware('logged_in_only');
        Route::get('/projects', 'Api\User\UserController@projects')->middleware('logged_in_only');
        Route::get('/chats', 'Api\User\UserController@chats')->middleware('logged_in_only');
        Route::any('/message', 'Api\User\UserController@message')->middleware('logged_in_only');
        Route::any('/tracking_segments', 'Api\User\UserController@tracking_segments')->middleware('logged_in_only');
        Route::any('/open_contract', 'Api\User\UserController@open_contract')->middleware('logged_in_only');
	});
});

Route::prefix('/user_specialized_profile')->group(function () {
    Route::any('/create', 'Api\User\UserSpecializedProfileController@create')->middleware('logged_in_only');

    Route::prefix('/{specialized_profile_id}')->group(function () {
        Route::any('/update', 'Api\User\UserSpecializedProfileController@update')->middleware('logged_in_only');
        Route::any('/delete', 'Api\User\UserSpecializedProfileController@delete')->middleware('logged_in_only');
    });
});

Route::prefix('/tips')->middleware('logged_in_only')->group(function () {
    Route::any('/skip_all', 'Api\TipController@skip_all');
    
    Route::prefix('/{tip_id}')->group(function () {
        Route::any('/got_it', 'Api\TipController@got_it');
    });
});

// ---------------------------------------------------------------------- //

Route::prefix('/contacts')->group(function () {
    Route::get('/', 'Api\ContactController@list')->middleware('logged_in_only');
    Route::any('/create', 'Api\ContactController@create')->middleware('logged_in_only');

    Route::prefix('/{contact_id}')->group(function () {
        Route::any('/update', 'Api\ContactController@update')->middleware('logged_in_only');
        Route::get('/delete', 'Api\ContactController@delete')->middleware('logged_in_only');
    });
});

Route::prefix('/contact_lists')->group(function () {
    Route::get('/', 'Api\ContactListController@list')->middleware('logged_in_only');
    Route::any('/create', 'Api\ContactListController@create')->middleware('logged_in_only');

    Route::prefix('/{contact_list_id}')->group(function () {
        Route::get('/', 'Api\ContactListController@get')->middleware('logged_in_only');
        Route::any('/update', 'Api\ContactListController@update')->middleware('logged_in_only');
        Route::get('/delete', 'Api\ContactListController@delete')->middleware('logged_in_only');
    });
});

// ---------------------------------------------------------------------- //

Route::prefix('/contracts')->group(function () {
    Route::prefix('/{contract_id}')->group(function () {
        Route::get('/close', 'Api\ContractController@close')->middleware('logged_in_only');
        Route::any('/update', 'Api\ContractController@update')->middleware('logged_in_only');
        Route::any('/milestones/create', 'Api\ContractController@create_milestone')->middleware('logged_in_only');
    });
});

Route::prefix('/milestones')->group(function () {
    Route::prefix('/{milestone_id}')->group(function () {
        // Route::get('/close', 'Api\ContractController@close')->middleware('logged_in_only');
        Route::any('/update', 'Api\MilestoneController@update')->middleware('logged_in_only');
        Route::any('/activate', 'Api\MilestoneController@activate')->middleware('logged_in_only');
        Route::any('/release', 'Api\MilestoneController@release')->middleware('logged_in_only');
    });
});

// ---------------------------------------------------------------------- //

Route::prefix('/companies')->group(function () {
    Route::any('/create','Api\Company\CompanyController@create')->middleware('logged_in_only');

    Route::prefix('/{company_id}')->group(function () {
        Route::any('/update', 'Api\Company\CompanyController@update')->middleware('logged_in_only');
        Route::get('/delete', 'Api\Company\CompanyController@delete')->middleware('logged_in_only');
    });
});

Route::any('/company_images/create', 'Api\Company\CompanyImageController@create')->middleware('logged_in_only');
Route::any('/company_images/{image_key}/update', 'Api\Company\CompanyImageController@update')->middleware('logged_in_only');

// ---------------------------------------------------------------------- //

Route::prefix('/projects')->group(function () {
    Route::any('/create', 'Api\Project\ProjectController@create')->middleware('logged_in_only');
    
    Route::prefix('/{project_id}')->group(function () {
        Route::any('/', 'Api\Project\ProjectController@get')->middleware('logged_in_only');
        Route::any('/update', 'Api\Project\ProjectController@update')->middleware('logged_in_only');
        Route::get('/delete', 'Api\Project\ProjectController@delete')->middleware('logged_in_only');
        Route::get('/members', 'Api\Project\ProjectMemberController@list')->middleware('logged_in_only');
        Route::any('/invite_member', 'Api\Project\ProjectController@invite_member')->middleware('logged_in_only');
        Route::any('/leave', 'Api\Project\ProjectController@leave')->middleware('logged_in_only');
        Route::any('/close', 'Api\Project\ProjectController@close')->middleware('logged_in_only');

        Route::prefix('/boards')->group(function () {
            Route::get('/', 'Api\Project\ProjectController@boards')->middleware('logged_in_only');
            Route::any('/create', 'Api\Project\ProjectController@create_board')->middleware('logged_in_only');
        });
    });

    // ------------------------------------------------------------------ //

    // Route::any('/members/create', 'Api\Project\ProjectMemberController@create')->middleware('logged_in_only');

    Route::prefix('/interviews')->group(function () {
        Route::any('/create', 'Api\Project\ProjectInterviewController@create')->middleware('logged_in_only');

        Route::prefix('/{interview_id}')->group(function () {
            Route::any('/update', 'Api\Project\ProjectInterviewController@update')->middleware('logged_in_only');
            Route::get('/delete', 'Api\Project\ProjectInterviewController@delete')->middleware('logged_in_only');

            Route::prefix('/questions')->group(function () {
                Route::any('/update_positions', 'Api\Project\ProjectInterviewQuestionController@update_positions')->middleware([
                    'logged_in_only',
                ]);
            });
        });

        Route::prefix('/questions')->group(function () {
            Route::any('/create', 'Api\Project\ProjectInterviewQuestionController@create')->middleware('logged_in_only');

            Route::prefix('/{question_id}')->group(function () {
                Route::any('/update', 'Api\Project\ProjectInterviewQuestionController@update')->middleware('logged_in_only');
                Route::get('/delete', 'Api\Project\ProjectInterviewQuestionController@delete')->middleware('logged_in_only');
            });
        });
    });
});

Route::prefix('/project_members')->group(function () {
    Route::prefix('/{member_id}')->group(function () {
        Route::any('/update', 'Api\Project\ProjectMemberController@update')->middleware('logged_in_only');
        Route::get('/delete', 'Api\Project\ProjectMemberController@delete')->middleware('logged_in_only');
    });
});

Route::prefix('/project_boards')->group(function () {
    Route::prefix('/{project_board_id}')->group(function () {
        Route::any('/', 'Api\Project\ProjectBoardController@get')->middleware('logged_in_only');
        Route::any('/update', 'Api\Project\ProjectBoardController@update')->middleware('logged_in_only');
        Route::any('/archive', 'Api\Project\ProjectBoardController@archive')->middleware('logged_in_only');

        Route::prefix('/member_users')->group(function () {
            Route::prefix('/{project_task_member_user_id}')->group(function () {
                Route::any('/add', 'Api\Project\ProjectBoardController@add_member_user')->middleware('logged_in_only');
                Route::any('/remove', 'Api\Project\ProjectBoardController@remove_member_user')->middleware('logged_in_only');
            });
        });

        Route::prefix('/lists')->group(function () {
            Route::get('/', 'Api\Project\ProjectBoardController@lists')->middleware('logged_in_only');
            Route::any('/create', 'Api\Project\ProjectBoardController@create_list')->middleware('logged_in_only');
        });
    });
});

Route::prefix('/project_lists')->group(function () {
    Route::prefix('/{project_list_id}')->group(function () {
        Route::any('/update', 'Api\Project\ProjectListController@update')->middleware('logged_in_only');
        Route::any('/archive', 'Api\Project\ProjectListController@archive')->middleware('logged_in_only');

        Route::prefix('/tasks')->group(function () {
            Route::get('/', 'Api\Project\ProjectListController@tasks')->middleware('logged_in_only');
            Route::any('/create', 'Api\Project\ProjectListController@create_task')->middleware('logged_in_only');
        });
    });
});

Route::prefix('/project_tasks')->group(function () {
    Route::prefix('/{project_task_id}')->group(function () {
        Route::any('/update', 'Api\Project\ProjectTaskController@update')->middleware('logged_in_only');
        Route::any('/delete', 'Api\Project\ProjectTaskController@delete')->middleware('logged_in_only');
        Route::any('/archive', 'Api\Project\ProjectTaskController@archive')->middleware('logged_in_only');
        
        Route::prefix('/member_users')->group(function () {
            // Route::any('/invite', 'Api\Project\ProjectTaskController@invite_member_user')->middleware('logged_in_only');

            Route::prefix('/{project_task_member_user_id}')->group(function () {
                Route::any('/add', 'Api\Project\ProjectTaskController@add_member_user')->middleware('logged_in_only');
                Route::any('/remove', 'Api\Project\ProjectTaskController@remove_member_user')->middleware('logged_in_only');
            });
        });

        Route::any('/attachments/create', 'Api\Project\ProjectTaskAttachmentController@create')->middleware('logged_in_only');
    });
});

// ---------------------------------------------------------------------- //

Route::prefix('/tracking_segments')->group(function () {
    Route::any('/create', 'Api\Tracking\TrackingSegmentController@create')->middleware('logged_in_only');
});

Route::prefix('/tracking_screenshots')->group(function () {
    Route::any('/create', 'Api\Tracking\TrackingScreenshotController@create')->middleware('logged_in_only');
});

Route::prefix('/tracking_commands')->group(function () {
    Route::any('/require', 'Api\Tracking\TrackingCommandController@require')->middleware('logged_in_only');
    Route::any('/create', 'Api\Tracking\TrackingCommandController@create')->middleware('logged_in_only');
});

// ---------------------------------------------------------------------- //

Route::prefix('/billing')->group(function () {
    Route::prefix('/cards')->group(function () {
        Route::any('/add', 'Api\CardController@add')->middleware('logged_in_only');

        Route::prefix('/{card_id}')->group(function () {
            Route::get('/delete', 'Api\CardController@delete')->middleware('logged_in_only');
            Route::get('/make_primary', 'Api\CardController@make_primary')->middleware('logged_in_only');
        });
    });
});

// ---------------------------------------------------------------------- //

Route::prefix('/payout_methods')->group(function () {
    Route::any('/create', 'Api\PayoutMethodsController@create')->middleware('logged_in_only');

    Route::prefix('/{payout_method_id}')->group(function () {
        Route::get('/make_default', 'Api\PayoutMethodsController@make_default')->middleware('logged_in_only');
        Route::get('/delete', 'Api\PayoutMethodsController@delete')->middleware('logged_in_only');
    });
});

Route::prefix('/payouts')->group(function () {
    Route::any('/create', 'Api\Money\PayoutController@create')->middleware('logged_in_only');

    Route::prefix('/{payout_id}')->group(function () {
        Route::any('/update', 'Api\Money\PayoutController@update')->middleware('logged_in_only');
    });
});

// ---------------------------------------------------------------------- //

Route::prefix('/chats')->group(function () {
	Route::prefix('/{chat_id}')->group(function () {
		Route::get('/', 'Api\Chat\ChatController@get')->middleware('logged_in_only');

		Route::prefix('/messages')->group(function () {
			Route::get('/', 'Api\Chat\ChatController@messages');
			Route::any('/create', 'Api\Chat\ChatController@create_message');
		});
	});
});

Route::prefix('/chat_messages')->group(function () {
	Route::prefix('/{message_id}')->group(function () {
		Route::get('/', 'Api\Chat\ChatMessageController@get');
	});
});

Route::prefix('/chat_message_attachments')->group(function () {
    Route::any('/create', 'Api\Chat\ChatMessageAttachmentController@create')->middleware('logged_in_only');
});

// ---------------------------------------------------------------------- //

Route::prefix('/countries')->group(function () {
	Route::any('/autocomplete', 'Api\Geo\CountryController@autocomplete');
});

Route::prefix('/localities')->group(function () {
	Route::any('/autocomplete', 'Api\Geo\LocalityController@autocomplete');
});

// ---------------------------------------------------------------------- //


Route::prefix('/waiters')->group(function () {
	Route::any('/create', 'Api\WaiterController@create');
});
// ---------------------------------------------------------------------- //

Route::prefix('/interview_result')->group(function () {
    Route::any('/link_with_user', 'Api\Project\ProjectInterviewResultController@link_with_user');
    Route::any('{interview_hash}/answers', 'Api\Project\ProjectInterviewResultController@answers');
});

// ---------------------------------------------------------------------- //

// TODO: Check Auth for admins
Route::prefix('/help_center_articles')->group(function () {
    // without Auth
    Route::get('/', 'Api\Admin\HelpCenterArticlesController@list');
    Route::post('/vote_yes', 'Api\Admin\HelpCenterArticlesController@visitor_vote_yes');
    Route::post('/vote_no', 'Api\Admin\HelpCenterArticlesController@visitor_vote_no');
    Route::post('/viewed', 'Api\Admin\HelpCenterArticlesController@visitor_viewed');
    //end without auth

    Route::any('/create', 'Api\Admin\HelpCenterArticlesController@create');

    Route::prefix('/{article_id}')->group(function () {
        Route::any('/update', 'Api\Admin\HelpCenterArticlesController@update');
        Route::get('/delete', 'Api\Admin\HelpCenterArticlesController@delete');
    });
});
// ---------------------------------------------------------------------- //

Route::any('/contact_us/send_message', 'Api\ContactUsController@send_message');

// ---------------------------------------------------------------------- //
Route::prefix('/blog_articles')->group(function () {
    // without Auth
    Route::get('/', 'Api\Admin\BlogArticlesController@list');
    Route::post('/vote_yes', 'Api\Admin\BlogArticlesController@visitor_vote_yes');
    Route::post('/vote_no', 'Api\Admin\BlogArticlesController@visitor_vote_no');
    Route::post('/viewed', 'Api\Admin\BlogArticlesController@visitor_viewed');
    //end without auth

    Route::any('/create', 'Api\Admin\BlogArticlesController@create');
    Route::prefix('/{article_id}')->group(function () {
        Route::any('/update', 'Api\Admin\BlogArticlesController@update');
        Route::get('/delete', 'Api\Admin\BlogArticlesController@delete');
    });
});

// ---------------------------------------------------------------------- //

Route::prefix('/administrators')->group(function () {
    Route::any('/create', 'Api\Admin\AdministratorsController@create');

    Route::prefix('/{administrator_id}')->group(function () {
        Route::any('/update', 'Api\Admin\AdministratorsController@update');
        Route::get('/delete', 'Api\Admin\AdministratorsController@delete');
    });
});

// ---------------------------------------------------------------------- //

Route::prefix('/coupons')->group(function () {
    Route::any('/create', 'Api\Admin\CouponsController@create');

    Route::prefix('/{coupon_id}')->group(function () {
        Route::any('/update', 'Api\Admin\CouponsController@update');
        Route::get('/delete', 'Api\Admin\CouponsController@delete');
    });
});

// ---------------------------------------------------------------------- //

Route::prefix('/user_feedback')->group(function () {
    Route::any('/create', 'Api\User\UserFeedbackController@create');
});
