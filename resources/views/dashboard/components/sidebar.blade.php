@push('scripts')
    <script>
        $(function() {
            new dashboard.messenger.ChatPanel;
        });
    </script>
@endpush

<!-- Sidebar -->
<div class="[ sidebar ]">
    <button class="[ sidebar__minimize-button ] btn btn-default"></button>
    <div class="[ chat-panel ]">
        <ul class="[ nav ] nav-tabs d-none">
            <li class="nav-item">
                <a class="nav-link active" href="#chat-panel__people-tab" data-toggle="tab">
                    People <span class="[ chat-panel__count-of-unread-people-chats ] badge badge-primary d-none">4</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#chat-panel__channels-tab" data-toggle="tab">
                    Channels <span class="[ chat-panel__count-of-unread-channel-chats ] badge badge-primary d-none">4</span>
                </a>
            </li>
        </ul>
        <div class="tab-content">
            <div class="tab-pane + active" id="chat-panel__people-tab">
                <div class="[ chat-list ] is-people">
                    <div class="[ chat-list__filters ] d-none">
                        -- chat filters here --
                    </div>
                    <div class="[ chat-list-search ] p-2 d-none">
                        <input class="[ chat-list-search__input ] form-control" placeholder="Search by name or email">
                    </div>
                    <div class="[ chat-list__items ] d-none">
                        <button class="[ chat-list__load-more-button ] btn btn-secondary d-none">Load more</button>
                    </div>
                    <div class="[ chat-list__no-items ] d-none">
                        <div class="text-center">
                            <img src="{{ asset_no_cache('img/inbox.svg') }}" alt="" style="width: 100px; opacity: 0.2;">
                            <br>
                            <span style="opacity: 0.4;">No messages yet.</span>
                        </div>
                    </div>
                    <div class="[ chat-list__loader ]"></div>
                </div>
            </div>
        </div>
        <form class="[ chat-panel-invite-form ] p-2 + is-minimized">
            <input id="_suburb-03214324234235" type="text" style="display: none;" disabled>
            <div class="form-group mb-0">
                <select class="custom-select + has-dropdown-on-top" id="chat-panel-invite-form__user-select"></select>
                <input type="hidden" name="user[id]" disabled>
                <input type="hidden" name="user[email]" disabled>
            </div>
            <div class="mt-2">
                <div class="form-group mb-2">
                    <textarea name="chat_message[text]" class="form-control" style="max-height: 300px; resize: none;" placeholder="Type your message here">👋 Hey, let's talk on ScreenTrack!</textarea>
                </div>
                <div class="[ chat-panel-invite-form__project-section ] form-group mb-2">
                    <select name="project_member[project_id]" class="custom-select"></select>
                </div>
                <div class="[ chat-panel-invite-form__member-section ] collapse">
                    <div class="form-group mb-2">
                        <select class="form-control" name="project_member[role]">
                            <option value="CONTRACTOR">
                                {{ __('common.project_members.roles.CONTRACTOR.title') }}
                            </option>
                            <option value="MANAGER">
                                {{ __('common.project_members.roles.MANAGER.title') }}
                            </option>
                            <option value="ADMINISTRATOR">
                                {{ __('common.project_members.roles.ADMINISTRATOR.title') }}
                            </option>
                        </select>
                    </div>
                    <div class="[ chat-panel-invite-form__contract-block ]">
                        <div class="[ chat-panel-invite-form__is-time-trackable-block ] form-group mb-2">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="project_member[is_time_trackable]" id="chat-panel-invite-form__is-time-trackable-checkbox" value="1" checked>
                                <label class="form-check-label d-block" for="chat-panel-invite-form__is-time-trackable-checkbox">
                                    Track <b>screenshots</b> & <b>live activity</b>
                                </label>
                            </div>
                        </div>
                        <div class="[ chat-panel-invite-form__with-protection-text ] alert alert-success" role="alert">
                            <b>{{ __('popovers/invite_project_member.you_re_safe') }}</b>
                            {{ __('popovers/invite_project_member.you_will_track_tasks_with_screenshots') }}
                        </div>
                        <div class="[ chat-panel-invite-form__without-protection-text ] alert alert-danger d-none" role="alert">
                            <b>{{ __('popovers/invite_project_member.be_careful') }}</b>
                            {{ __('popovers/invite_project_member.tasks_wont_be_tracked_with_screenshots') }}
                        </div>
                        <div class="[ chat-panel-invite-form__hourly-rate-block ] collapse">
                            <div class="form-group">
                                <div class="form-row">
                                    <div class="col" style="max-width: 115px;">
                                        <label for="chat-panel-invite-form__hourly-rate" class="mb-1">
                                            Hourly Rate
                                        </label>
                                        <div class="form-control-group + has-prefix has-postfix" style="position: relative;">
                                            <span class="form-control-group__prefix">$</span>
                                            <input value="" name="contract[hourly_rate]" data-name="contract.hourly_rate" class="form-control text-right" type="number" step="0.01" min="0" max="999" id="chat-panel-invite-form__hourly-rate">
                                            <span class="form-control-group__postfix">/h</span>
                                        </div>
                                        <div class="invalid-feedback"></div>
                                    </div>
                                    <div class="col">
                                        <label for="chat-panel-invite-form__contract-title" class="mb-1">
                                            Contract Title
                                        </label>
                                        <input class="form-control" name="contract[title]" data-name="contract.title" placeholder="{{ __('popovers/invite_project_member.e_g_junior_designer') }}" id="chat-panel-invite-form__contract-title">
                                        <div class="invalid-feedback"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="[ chat-panel-invite-form__credit-card-block ] form-group collapse">
                                <label for="chat-panel-invite-form__credit-card" class="mb-1">
                                    Payment Protection Method
                                </label>
                                <b style="float: right;">Zero Commision</b>
                                <div class="[ stripe-card ] mb-2">
                                    <div class="stripe-card-element" id="chat-panel-invite-form__credit-card"></div>
                                    <div class="stripe-card-errors d-none" role="alert"></div>
                                </div>
                                <input type="hidden" name="stripe_token_id">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group mb-0 d-flex justify-content-end" style="margin-left: -0.5rem;">
                    <button type="button" class="[ chat-panel-invite-form__close-button ] btn">&times;</button>
                    <button type="submit" class="btn btn-primary flex-grow-1">Invite to Chat</button>
                </div>
            </div>
        </form>
    </div>
</div>
<!--/ Sidebar -->