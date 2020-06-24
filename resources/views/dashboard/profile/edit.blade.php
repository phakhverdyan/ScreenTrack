@extends('dashboard.layout')

@push('modals')
    @include('dashboard.profile.modals.edit_photo')
@endpush

@push('styles')
    <link rel="stylesheet" href="{{ asset_no_cache('css/vendor/selectize.bootstrap3.min.css') }}">
    <link rel="stylesheet" href="{{ asset_no_cache('css/vendor/selectize.modified.css') }}">
@endpush

@push('scripts')
    <script src="{{ asset('js/vendor/selectize.min.js') }}"></script>
    <script src="{{ asset('js/vendor/jquery.mask.min.js') }}"></script>
    <script>
        $(function() {
            var $form = $('.edit-profile__form');
            var $form_submit_button = $form.find('button[type="submit"]');
            var $form_locality_select = $form.find('[name="user[locality_key]"]');
            var $form_phone_number_input = $form.find('[data-name="user.phone_number"]');

            $('#edit-photo-modal').on('shown.bs.modal', function(){
                if ($("#user-photo").length) {
                    var url = $("#user-photo").data('original');
                    var crop_data = $("#user-photo").data('cropdata');

                    console.log(crop_data);

                    var points = [];

                    points[0] = crop_data.x;
                    points[1] = crop_data.y;
                    points[2] = crop_data.x + crop_data.width;
                    points[3] = crop_data.y + crop_data.height;

                    var croppie = $('#crop').croppie({
                        url: url,
                        viewport: { width: 200, height: 200, type: 'square' },
                        boundary: { width: 400, height: 400 },
                        points: points,
                    });

                    croppie.croppie('bind');

                    $('#upload-photo').text("{{ __('dashboard/profile.choose_another_photo') }}");

                    $('#save-photo').show();
                }
            });

            $('#load-photo').click(function (event) {
                event.preventDefault();
                $('#edit-photo-modal').modal('show');
            });

            $form.submit(function(event) {
                event.preventDefault();

                if ($form_submit_button.hasClass('is-loading')) {
                    return;
                }

                $form_submit_button.addClass('is-loading disabled');

                if ($form_phone_number_input.prop('disabled')) {
                    $form.find('[name="user[phone_number]"]').val('');
                } else {
                    $form.find('[name="user[phone_number]"]').val($form_phone_number_input.cleanVal());
                }

                request({
                    method: 'POST',
                    url: '/users/me/update',
                    data: $form.serialize(),
                }, function(response) {
                    $form_submit_button.removeClass('is-loading disabled');

                    if (new Validator($form, response).fails()) {
                        return;
                    }

                    if (response.error) {
                        $.notify(response.error);
                        return;
                    }

                    $.notify("{{ __('dashboard/profile.profile_updated') }}", 'success');
                });
            });

            $form_locality_select.removeClass('custom-select').selectize({
                // sortField: 'full_address',
                valueField: 'key',
                labelField: 'full_address',
                searchField: [ 'name', 'short_address', 'full_address' ],
                placeholder: 'Your city',
                // options: [],

                render: {
                    item: function(item, escape) {
                        return (
                            '<div class="selectize-item + is-locality">' +
                                '<img src="/img/countries/flags/' + (item.country_code || '_') + '.png" alt="' + item.country_code + '" style="display: inline-block; vertical-align: middle;">' +
                                ' ' +
                                '<span style="display: inline-block; vertical-align: middle;">' + escape(item.full_address) + '</span>' +
                            '</div>'
                        );
                    },

                    option: function(item, escape) {
                        return (
                            '<div class="selectize-item + is-locality">' +
                                '<img src="/img/countries/flags/' + (item.country_code || '_') + '.png" alt="' + item.country_code + '" style="display: inline-block; vertical-align: middle;">' +
                                ' ' +
                                '<span style="display: inline-block; vertical-align: middle;">' + escape(item.full_address) + '</span>' +
                            '</div>'
                        );
                    },
                },

                load: function(string, callback) {
                    if (string.length == 0) {
                        return callback();
                    }

                    return request({
                        url: '/localities/autocomplete',

                        data: {
                            query: string,
                            locale: locale(),
                            with_country: true,
                        },
                    }, function(response) {
                        if (response.error) {
                            $.notify(response.error, 'error');
                            return callback();
                        }

                        return callback(response.data);
                    });
                },

                onInitialize: function() {
                    this.$control_input.attr('autocomplete', 'st-disabled');

                    if (auth.user.locality) {
                        this.addOption([ auth.user.locality ]);
                        this.setValue([ auth.user.locality.key ]);
                    }
                },

                onChange: function(item_id) {
                    var selectize = this;

                    if (!selectize.options[item_id]) {
                        return;
                    }

                    if (!$form_phone_number_input.prop('disabled')) {
                        $form_phone_number_input.val('');
                    }

                    $form_phone_number_input.mask(selectize.options[item_id].country.phone_number_mask, {
                        translation: {
                            'X': { pattern: /\d/ },
                            '0': null,
                            '9': null,
                        },

                        placeholder: selectize.options[item_id].country.phone_number_mask,
                    });

                    $form_phone_number_input.prop('disabled', false);
                },
            });

            $('#add-website-link').click(function() {
                if ($('.profile-link-item').length > 19) {
                    $(this).hide();
                }

                var new_item_html = $('#new-websites-item').clone().html();
                var next_profile_item_id = parseInt($('.profile-link-item:last').attr('data-id')) + 1;
                var $new_item = $(new_item_html);

                $new_item.addClass('profile-link-item')
                $new_item.data('id', next_profile_item_id);

                var $select = $new_item.find('select');
                $select.attr('name', $select.attr('name').replace('*', next_profile_item_id));
                $select.attr('data-name', $select.attr('data-name').replace('*', next_profile_item_id));

                var $input = $new_item.find('input');
                $input.attr('name', $input.attr('name').replace('*', next_profile_item_id));
                $input.attr('data-name', $input.attr('data-name').replace('*', next_profile_item_id));

                $('#new-websites-item').before($new_item);
            });

            $('.edit-profile__form').on('click', '.delete-website-item', function() {
                $(this).parent().parent().remove();
                $('#add-website-link').show();
            });

            $('#add-spoken-language').click(function() {
                if ($('.spoken-language-item').length > 19) {
                    $(this).hide();
                }

                var new_item_html = $('#new-spoken-language-item').clone().html();
                var $new_item = $(new_item_html);
                $new_item.find('select').removeAttr('disabled')
                $('#new-spoken-language-item').before($new_item);
            });

            $('.edit-profile__form').on('click', '.delete-spoken-language', function() {
                $(this).parent().parent().remove();
                $('#add-spoken-language').show();
            });

            $('button#add-new-specialized-profile').click(function (event) {
                event.preventDefault();

                $form = $('form#specialized-profile');
                $form_submit_button = $(this);
                $form_submit_button.addClass('is-loading disabled');

                request({
                    method: 'POST',
                    url: '/user_specialized_profile/create',
                    data: $form.serialize(),
                }, function(response) {
                    $form_submit_button.removeClass('is-loading disabled');

                    if (new Validator($form, response).fails()) {
                        return;
                    }

                    if (response.error) {
                        $.notify(response.error);
                        return;
                    }

                    $.notify("{{ __('dashboard/profile.specialized_profile_added') }}",'success');

                    window.location.href = '/dashboard/profile/edit';
                });
            });

            $('button.delete-specialized-profile').click(function (event) {
                event.preventDefault();

                var specialized_profile_id = $(this).data('id');

                modals.confirm_action({
                    question: "{{ __('dashboard/profile.you_really_want_to_delete_this_specialized_profile') }}",

                    confirm: function(callback) {
                        request({
                            method: 'GET',
                            url: '/user_specialized_profile/' + specialized_profile_id + '/delete',
                        }, function(response) {

                            if (response.error) {
                                $.notify(response.error);
                                return;
                            }

                            $.notify("{{ __('dashboard/profile.specialized_profile_deleted') }}", 'success');
                            window.location.href = '/dashboard/profile/edit';
                            return callback && callback();
                        });
                    },
                });
            });

            $('button.update-specialized-profile').click(function (event) {
                event.preventDefault();

                $form = $(this).parents('form.specialized-profile');

                $form_submit_button = $(this);
                $form_submit_button.addClass('is-loading disabled');

                var specialized_profile_id = $(this).data('id');

                request({
                    method: 'POST',
                    url: '/user_specialized_profile/' + specialized_profile_id + '/update',
                    data: $form.serialize(),
                }, function(response) {
                    $form_submit_button.removeClass('is-loading disabled');

                    if (new Validator($form, response).fails()) {
                        return;
                    }

                    if (response.error) {
                        $.notify(response.error);
                        return;
                    }

                    $.notify("{{ __('dashboard/profile.specialized_profile_updated') }}", 'success');

                    window.location.href = '/dashboard/profile/edit';
                });
            });

            $('#user__slug-copy-button').click(function(event) {
                event.preventDefault();
                copy_text_to_clipboard(location.origin + '/' + $('#user__slug').val());
                $.notify('Link copied!', 'success');
            });
        });
    </script>
@endpush

@section('content')
    <div class="container">
        <div class="[ edit-profile ]">
            <h3 class="[ page-title ]">{{ __('dashboard/profile.edit_profile') }}</h3>
            <nav class="" style="font-size: 20px">
                <div class="nav nav-tabs  justify-content-start" id="nav-tab" role="tablist">
                    <a class="nav-item nav-link active" id="nav-main-profile-tab" data-toggle="tab" href="#nav-main-profile" role="tab" aria-controls="nav-main-profile" aria-selected="true">{{ __('dashboard/profile.main_profile') }}</a>
                    @foreach($user->specialized_profiles as $specialized_profile)
                        <a class="nav-item nav-link" id="nav-profile-tab-{{ $specialized_profile->id }}" data-toggle="tab" href="#nav-profile-{{ $specialized_profile->id }}" role="tab" aria-controls="nav-profile-{{ $specialized_profile->id }}" aria-selected="false">
                            {{ $specialized_profile->title }}
                        </a>
                    @endforeach

                    @if (count($user->specialized_profiles) < 2)
                        <a class="nav-item nav-link" id="nav-new-profile-tab" data-toggle="tab" href="#nav-new-profile" role="tab" aria-controls="nav-new-profile" aria-selected="false">+</a>
                    @endif
                </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-main-profile" role="tabpanel" aria-labelledby="nav-main-profile">
                    <form class="[ edit-profile__form ]" autocomplete="off">
                        <div class="form-row">
                            <div class="col-md-12">
                                <label for="user__professional-title">
                                    {{ __('dashboard/profile.title') }}
                                    <span class="small text-muted">
                                        {{ __('dashboard/profile.e_g_full_stack_developer_virtual_assistant') }}
                                    </span>
                                </label>
                                <input class="form-control" type="text" name="user[professional_title]" id="user__professional-title" value="{{ $user->professional_title }}" placeholder="{{ __('dashboard/profile.your_professional_title') }}" data-name="user.professional_title">
                                <div class="invalid-feedback"></div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="col-md-12">
                                <label for="user__professional-title">
                                    {{ __('dashboard/profile.description') }}
                                </label>
                               <textarea  name="user[professional_description]" data-name="user.professional_description"  class="form-control">{{ $user->professional_description }}</textarea>
                            </div>
                        </div>
                        <hr>
                        <div class="form-group">
                            <div class="form-row">
                                <div class="col-md-12">
                                    <label for="user__first-name">{{ __('dashboard/profile.photo') }}</label>
                                    @if ($user->image()->first())
                                        <div>
                                             <img id="user-photo" data-cropdata="{{ json_encode($user->image->crop_data) }}" data-original="{{ $user->image->urls->original }}" src="{{ $user->image->urls->small }}">
                                        </div>
                                        <button type="text" id="load-photo" class="btn btn-primary">{{ __('dashboard/profile.change_photo') }}</button>
                                    @else
                                        <div>{{ __('dashboard/profile.you_don_t_have_photo_yet') }}</div>
                                        <button type="text" id="load-photo" class="btn btn-primary">{{ __('dashboard/profile.load_photo') }}</button>
                                    @endif
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-row">
                                <div class="col-md-6">
                                    <label for="user__first-name">{{ __('dashboard/profile.first_name') }}</label>
                                    <input value="{{ $user->first_name }}" name="user[first_name]" data-name="user.first_name" class="form-control + is-first-capitalized" type="text" id="user__first-name" placeholder="{{ __('dashboard/profile.first_name') }}">
                                    <div class="invalid-feedback"></div>
                                </div>
                                <div class="col-md-6">
                                    <label for="last__last-name">{{ __('dashboard/profile.last_name') }}</label>
                                    <input value="{{ $user->last_name }}" name="user[last_name]" data-name="user.last_name" class="form-control + is-first-capitalized" type="text"  id="user__last-name" placeholder="{{ __('dashboard/profile.last_name') }}">
                                    <div class="invalid-feedback"></div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-row">
                                <div class="col-md-8">
                                    <label for="user__slug">{{ __('dashboard/profile.profile_link') }}</label>
                                    <div style="position: relative;">
                                        <span style="position: absolute; top: 0; left: 0; padding: .375rem .75rem; pointer-events: none; border: 1px solid transparent;">screentrack.com/</span>
                                        <input
                                            value="{{ $user->slug }}"
                                            name="user[slug]"
                                            data-name="user.slug"
                                            class="form-control"
                                            type="text"
                                            id="user__slug"
                                            placeholder="your-username"
                                            style="padding-left: 130px; padding-right: 55px;"
                                        >
                                        <button class="btn btn-primary btn-sm" style="position: absolute; top: 4px; right: 4px; padding: 0 .5rem; height: 30px; line-height: 28px;" id="user__slug-copy-button">Copy</button>
                                    </div>
                                    <div class="invalid-feedback"></div>
                                </div>
                                <div class="col-md-4">
                                    <label for="user__hourly-rate">{{ __('dashboard/profile.hourly_name') }}</label>
                                    <div class="form-control-group + has-prefix has-postfix" style="position: relative;">
                                        <span class="form-control-group__prefix">$</span>
                                        <input
                                            value="{{ $user->hourly_rate ?: '' }}"
                                            name="user[hourly_rate]"
                                            data-name="user.hourly_rate"
                                            class="form-control text-right"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            max="999"
                                            placeholder="0"
                                            id="user__hourly-rate"
                                        >
                                        <span class="form-control-group__postfix">/h</span>
                                    </div>
                                    <div class="invalid-feedback"></div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-row">
                                <div class="col-md-6">
                                    <label for="user__email">{{ __('dashboard/profile.email') }}</label>
                                    <input value="{{ $user->email }}" name="user[email]" data-name="user.email" class="form-control" type="text" id="user__email" placeholder="example@email.com">
                                    <div class="invalid-feedback"></div>
                                </div>
                                <div class="col-md-6">
                                    <label for="user__skype">{{ __('dashboard/profile.skype') }}</label>
                                    <input value="{{ $user->skype }}" name="user[skype]" data-name="user.skype" class="form-control" type="text" id="user__skype" placeholder="{{ __('dashboard/profile.skype') }}">
                                    <div class="invalid-feedback"></div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-row">
                                <div class="col">
                                    <label for="user__locality">{{ __('dashboard/profile.location') }}</label>
                                    <select class="custom-select selectized" id="user__locality" name="user[locality_key]"></select>
                                    <div class="invalid-feedback"></div>
                                </div>
                                <div class="col">
                                    <label for="user__phone-number">{{ __('dashboard/profile.phone_number') }}</label>
                                    <input type="text" class="form-control" placeholder="Phone number" data-name="user.phone_number" value="{{ $user->local_phone_number }}" id="user__phone-number" disabled>
                                    <div class="invalid-feedback"></div>
                                    <input type="hidden" name="user[phone_number]">
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="user__website-url">{{ __('dashboard/profile.your_website') }}</label>
                            <input name="user[website_url]" value="{{ $user->website_url }}" data-name="user.website_url" id="user__website-url" class="form-control" type="text" placeholder="https://your-website-url.example">
                            <div class="invalid-feedback"></div>
                        </div>
                        <div class="form-group">
                            <label>{{ __('dashboard/profile.your_profiles_links') }}</label>
                            @forelse ($user->links as $current_user_link)
                                <div style="margin-top: 6px;" class="form-row profile-link-item" data-id="{{ $loop->index }}">
                                    <div class="col-md-4">
                                        @include('dashboard.profile.partials.profile_links_types_list', [
                                            'user_link_type_key' => $current_user_link->type_key,
                                            'user_link_index' => $loop->index,
                                        ])
                                    </div>
                                    <div class="col-md-8">
                                        <input value="{{ $current_user_link->url }}" name="user[links][{{ $loop->index }}][url]" data-name="user.links.{{ $loop->index }}.url" class="form-control" type="text" placeholder="{{ __('dashboard/profile.link_to_your_profile') }}">
                                        <div class="invalid-feedback"></div>
                                    </div>
                                    @if ($loop->index > 0)
                                        <div  style="position: absolute; margin-left: 507px; margin-top: 8px;">
                                            <img class="delete-website-item" height="20px" src="{{ asset_no_cache('/img/delete-icon.svg') }}">
                                        </div>
                                    @endif
                                </div>
                            @empty
                                <div class="form-row profile-link-item" data-id="1">
                                    <div class="col-md-4">
                                        @include('dashboard.profile.partials.profile_links_types_list', [
                                            'user_link_type_key' => null,
                                            'user_link_index' => 0,
                                        ])
                                    </div>
                                    <div class="col-md-8">
                                        <input value="" name="user[links][0][url]" data-name="user.links.0.url" class="form-control" type="text" placeholder="{{ __('dashboard/profile.link_to_your_profile') }}">
                                        <div class="invalid-feedback"></div>
                                    </div>
                                </div>
                            @endforelse
                            <script id="new-websites-item" type="text/ejs">
                                <div class="form-row profile-link-item" data-id="*" style="margin-top: 6px;">
                                    <div class="col-md-4">
                                        @include('dashboard.profile.partials.profile_links_types_list', [
                                            'user_link_type_key'=> null,
                                            'user_link_index' => '*',
                                        ])
                                    </div>
                                    <div class="col-md-8">
                                        <input value="" name="user[links][*][url]" data-name="user.links.*.url" class="form-control" type="text" placeholder="{{ __('dashboard/profile.link_to_your_profile') }}">
                                        <div class="invalid-feedback"></div>
                                    </div>
                                    <div  style="position: absolute; margin-left: 507px; margin-top: 8px;">
                                        <img class="delete-website-item" height="20px" src="{{ asset_no_cache('/img/delete-icon.svg') }}">
                                    </div>
                                </div>
                            </script>
                        </div>
                        <div class="form-group">
                            <div class="form-row">
                                <div class="col-md-6"></div>
                                <div class="col-md-6">
                                    <button id="add-website-link" class="btn btn-primary form-control" type="button">
                                        {{ __('dashboard/profile.add_one_more_link') }}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="form-group d-none">
                            <label for="user__time-zone">{{ __('dashboard/profile.time_zone') }}</label>
                            <select name="user[timezone]" data-name="user.timezone" class="form-control" id="user__time-zone">
                                <option timezoneid="1" gmtadjustment="GMT-12:00" usedaylighttime="0" value="-12" selected>
                                    (GMT-12:00) International Date Line West
                                </option>
                                <option timezoneid="2" gmtadjustment="GMT-11:00" usedaylighttime="0" value="-11">
                                    (GMT-11:00) Midway Island, Samoa
                                </option>
                                <option timezoneid="3" gmtadjustment="GMT-10:00" usedaylighttime="0" value="-10">
                                    (GMT-10:00) Hawaii
                                </option>
                            </select>
                            <div class="invalid-feedback"></div>
                        </div>
                        <div class="form-group">
                            <label for="select-language">{{ __('dashboard/profile.spoken_languages') }}</label>
                            @forelse ($user->spoken_languages as $current_language)
                                <div class="form-row spoken-language-item" style="margin-top: 5px;">
                                    <div class="col-md-12">
                                        <select name="user[spoken_language_codes][]" data-name="user.spoken_language_codes" class="form-control">
                                            <option></option>
                                            @include('dashboard.profile.partials.languages_list', [
                                                'languages' => $spoken_languages,
                                                'selected_language_code' => $current_language->code,
                                            ])
                                        </select>
                                    </div>
                                    @if ($loop->index > 0)
                                        <div  style="position: absolute; margin-left: 507px; margin-top: 8px;">
                                            <img class="delete-spoken-language" height="20px" src="/img/delete-icon.svg">
                                        </div>
                                    @endif
                                </div>
                            @empty
                                <div class="form-row spoken-language-item">
                                    <div class="col-md-12">
                                        <select name="user[spoken_language_codes][]" data-name="user.spoken_language_codes" class="form-control">
                                            <option></option>
                                            @include('dashboard.profile.partials.languages_list', [
                                                'languages' => $spoken_languages,
                                                'selected_language_code' => null,
                                            ])
                                        </select>
                                    </div>
                                </div>
                            @endforelse
                            <script id="new-spoken-language-item" type="text/ejs">
                                <div class="form-row spoken-language-item" style="margin-top: 5px;">
                                    <div class="col-md-12">
                                        <select disabled="" name="user[spoken_language_codes][]" data-name="user.spoken_language_codes" class="form-control">
                                            <option></option>
                                            @include('dashboard.profile.partials.languages_list', [
                                                'languages' => $spoken_languages,
                                                'selected_language_code' => null,
                                            ])
                                        </select>
                                    </div>
                                    <div style="position: absolute; margin-left: 507px; margin-top: 8px;">
                                        <img class="delete-spoken-language" height="20px" src="/img/delete-icon.svg">
                                    </div>
                                </div>
                            </script>
                        </div>
                        <div class="form-group">
                            <div class="form-row">
                                <div class="col-md-6"></div>
                                <div class="col-md-6">
                                    <button id="add-spoken-language" class="btn btn-primary form-control" type="button">{{ __('dashboard/profile.add_one_more_language') }}</button>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="select-language">{{ __('dashboard/profile.interface_language') }}</label>
                            <select name="user[interface_language_code]" data-name="user.interface_language_code" class="form-control" id="language">
                                @foreach ($available_languages as $current_language)
                                    <option {{ $user->interface_language_code == $current_language->code ? 'selected' : '' }} value="{{ $current_language->code }}">
                                        {{ $current_language->name }} ({{ $current_language->native_name }})
                                    </option>
                                @endforeach
                            </select>
                            <div class="invalid-feedback"></div>
                        </div>
                        <div class="form-group">
                            <button class="[ save__button ] btn btn-primary form-control" type="submit">{{ __('dashboard/profile.save') }}</button>
                        </div>
                    </form>
                </div>

                @foreach ($user->specialized_profiles as $specialized_profile)
                    {{-- SPECIALIZED PROFILE --}}
                    <div class="tab-pane fade" id="nav-profile-{{ $specialized_profile->id }}" role="tabpanel" aria-labelledby="nav-profile-{{ $specialized_profile->id }}">
                        <form class="specialized-profile" autocomplete="off">
                            <input type="hidden" name="user_specialized_profile[user_id]" value="{{ $user->id }}">
                            <div class="form-group">
                                <div class="form-row">
                                    <div class="col-md-12">
                                        <label for="user__professional-title">
                                            {{ __('dashboard/profile.title') }} <span class="small text-muted">{{ __('dashboard/profile.e_g_full_stack_developer_virtual_assistant') }}</span>
                                        </label>
                                        <input value="{{ $specialized_profile->title }}" class="form-control" type="text" name="user_specialized_profile[title]" value="" placeholder="{{ __('dashboard/profile.your_professional_title') }}" data-name="user_specialized_profile.title">
                                        <div class="invalid-feedback"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="form-row">
                                    <div class="col-md-12">
                                        <label>
                                            {{ __('dashboard/profile.description') }}
                                        </label>
                                        <textarea name="user_specialized_profile[description]" class="form-control">{{ $specialized_profile->description }}</textarea>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="form-row">
                                    <div class="col-6">
                                        <button data-id="{{ $specialized_profile->id }}" class="[ save__button ] btn btn-danger form-control delete-specialized-profile" type="button">{{ __('dashboard/profile.delete') }}</button>
                                    </div>
                                    <div class="col-6">
                                        <button data-id="{{ $specialized_profile->id }}" class="[ save__button ] btn btn-primary form-control update-specialized-profile" type="button">{{ __('dashboard/profile.update') }}</button>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                    {{--  SPECIALIZED PROFILE --}}
                @endforeach

                {{-- ADD NEW SPECIALIZED PROFILE --}}
                <div class="tab-pane fade" id="nav-new-profile" role="tabpanel" aria-labelledby="nav-new-profile">
                    <form id="specialized-profile" class="" autocomplete="off">
                        <input type="hidden" name="user_specialized_profile[user_id]" value="{{ $user->id }}">
                        <div class="form-group">
                            <div class="form-row">
                                <div class="col-md-12">
                                    <label>
                                        {{ __('dashboard/profile.your_professional_title') }} <span class="small text-muted">{{ __('dashboard/profile.e_g_full_stack_developer_virtual_assistant') }}</span>
                                    </label>
                                    <input class="form-control" type="text" name="user_specialized_profile[title]" value="" placeholder="{{ __('dashboard/profile.your_professional_title') }}" data-name="user_specialized_profile.title">
                                    <div class="invalid-feedback"></div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-row">
                                <div class="col-md-12">
                                    <label>
                                        {{ __('dashboard/profile.description') }}
                                    </label>
                                    <textarea name="user_specialized_profile[description]" class="form-control"></textarea>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <button id="add-new-specialized-profile" class="[ save__button ] btn btn-primary form-control" type="button">{{ __('dashboard/profile.save') }}</button>
                        </div>
                    </form>
                </div>
                {{-- END ADD NEW SPECIALIZED PROFILE --}}
            </div>
        </div>
    </div>
@endsection
