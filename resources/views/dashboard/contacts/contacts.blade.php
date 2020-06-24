@extends('dashboard.layout')

@push('styles')
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/css/bootstrap-select.css">
@endpush

@push('scripts')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/js/bootstrap-select.min.js"></script>
    <script>
        $(function() {
            var $contact_items = $('#contact-list-items');
            var contacts_in_list = [];
            init_selects();

            $('.contacts-content').show();

            $('.contacts-content').on('change', '.contact-projects select', function() {
                update_contact('project_ids', $(this).parent().parent().data('id'), $(this).val());
            });

            $('.contacts-content').on('change', '.contact-lists select', function() {
                update_contact('list_ids', $(this).parent().parent().data('id'), $(this).val());
            });

            var timeout = null;
            var xhr = null;

            function update_contact(field, contact_id, values) {
                var data = {
                    contact: {},
                };

                if (values.length > 0) {
                    data.contact[field] = [];

                    values.forEach(function(value, index) {
                        data.contact[field].push(value);
                    });
                } else {
                    data.contact[field] = null;
                }

                timeout && clearTimeout(timeout);
                xhr && xhr.abort();

                timeout = setTimeout(function() {
                    xhr = request({
                        method: 'POST',
                        url: '/contacts/' + contact_id + '/update',
                        data: data,
                    }, function (response) {
                        if (response.error) {
                            $.notify(response.error);
                            return;
                        }

                        $.notify("{{ __('dashboard/contacts.updated') }}", 'success');
                    });
                }, 250);
            }

            $('.contacts-content').on('click', '.delete-contact', function(event) {
                event.preventDefault();
                var contact_id = $(this).data('id');

                modals.confirm_action({
                    question: "{{ __('dashboard/contacts.you_really_want_to_delete_this_contact') }}",

                    confirm: function(callback) {
                        request({
                            method: 'GET',
                            url: '/contacts/' + contact_id + '/delete',
                        }, function(response) {
                            if (response.error) {
                                $.notify(response.error);
                                return;
                            }

                            $.notify("{{ __('dashboard/contacts.deleted') }}", 'success');

                            $('li.contact[data-id="' + contact_id + '"]').hide();
                            return callback && callback();
                        });
                    },
                });
            });

            function init_selects() {
                $('.contact-list-select').selectpicker({ noneSelectedText: "{{ __('dashboard/contacts.select_contact_lists') }}" });
                $('.project-select').selectpicker({ noneSelectedText: "{{ __('dashboard/contacts.select_projects') }}" });
            }

            (function initialize_search_contacts() {
                var $contact_search_form = $('#contact-search-form');
                var timeout = null;
                var xhr = null;

                function search_contacts() {
                    timeout && clearTimeout(timeout);
                    xhr && xhr.abort();

                    timeout = setTimeout(function() {
                        xhr = request({
                            method: 'GET',
                            url: '/contacts',
                            data: $contact_search_form.serialize(),
                        }, function(response) {
                            if (response.error) {
                                $.notify(response.error);
                                return;
                            }

                            $contact_items.html('');

                            if (response.data.length < 1) {
                                $(template('contact-item-not-found')).appendTo($contact_items);
                            } else {
                                response.data.forEach(function(contact) {
                                    $(template('contact-item', {
                                        contact: contact,
                                        user_projects: @json($user_projects),
                                        user_contact_lists: @json($user_contact_lists),
                                    })).appendTo($contact_items);
                                });
                            }

                            init_selects();
                        });
                    }, 250);
                }

                $contact_search_form.find('select[name="project_ids[]"]').change(function () {
                    search_contacts();
                });

                $contact_search_form.find('select[name="list_ids[]"]').change(function () {
                    search_contacts();
                });

                $contact_search_form.find('input[name="query"]').on('input', function() {
                    search_contacts();
                });
            })();

        });
    </script>
@endpush

@section('content')
    <div class="container">
        <h3 class="[ page-title ]">{{ __('dashboard/contacts.contacts') }}</h3>
        <div class="[ list ] contacts-content collapse">
            <div class="row">
                <ul class="nav navs-tabs">
                    <li class="nav-item">
                        <a class="nav-link active" href="/dashboard/contacts">{{ __('dashboard/contacts.contacts') }}</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/dashboard/contacts-lists">{{ __('dashboard/contacts.contacts_lists') }}</a>
                    </li>
                </ul>
            </div>
            <div class="row">
                <div class="tab-content">
                    <!-- People Tab -->
                    <div class="tab-pane show active" id="people-list-tab" role="tabpanel" aria-labelledby="people-tab">
                        <div class="d-flex flex-md-row flex-column-reverse flex">
                            <div class="col-md-9">
                                <div class="[ list__header ]">
                                    <form class="[ list__form ]" id="contact-search-form">
                                        <input name="query" class="form-control" type="text" placeholder="{{ __('dashboard/contacts.find_people_by_name') }}">
                                        @include('dashboard.contacts.partials.projects_list', [
                                            'projects' => $user_projects,
                                            'select_name' => 'project_ids[]',
                                        ])
                                        @include('dashboard.contacts.partials.contact_lists_list', [
                                            'contact_lists'=> $user_contact_lists,
                                            'select_name' => 'list_ids[]',
                                        ])
                                    </form>
                                </div>
                            </div>
                            <div class="col-md-3 mb-md-0 mb-3">
                                <button class="[ list__form-add-user ] btn btn-primary" data-toggle="modal" data-target="#add-new-contact">
                                   {{ __('dashboard/contacts.add_contact') }}
                                </button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <ul id="contact-list-items">
                                    @forelse ($user_contacts as $contact)
                                        <li data-id="{{ $contact->id }}" class="[ user ] contact contact-list-item">
                                            <div class="[ user__item ]">
                                                <div class="[ user__item-info ]">
                                                    <div class="[ user__item-image ]"></div>
                                                    <span class="[ user__item-status ] is-offline"></span>
                                                        <div class="[ user__item-name-title ]">
                                                            <h4>{{ $contact->following_user->email }}</h4>
                                                            <p>{{ $contact->following_user->professional_title ?? '' }}</p>
                                                        </div>
                                                </div>
                                                <div class="[ user__item-options ]" data-id="{{ $contact->id }}" style="width: 100%;">
                                                    @include ('dashboard.contacts.partials.projects_list', [
                                                        'projects'=> $user_projects,
                                                        'selected_ids' => $contact->following_user_projects->pluck('id')->toArray(),
                                                        'select_additional_class' => 'contact-projects'
                                                    ])
                                                    @include('dashboard.contacts.partials.contact_lists_list', [
                                                        'contact_lists'=> $user_contact_lists,
                                                        'selected_ids' => $contact->lists->pluck('id')->toArray(),
                                                        'select_additional_class' => 'contact-lists',
                                                    ])
                                                    <button data-id="{{ $contact->id }}" class="[ user__item-options-delete-button ] btn btn-primary delete-contact">{{ __('dashboard/contacts.delete') }}</button>
                                                </div>
                                            </div>
                                        </li>
                                    @empty
                                        <li class="[ user ]" style="text-align: center">
                                           {{ __('dashboard/contacts.you_don_t_have_any_contacts_yet') }}
                                        </li>
                                    @endforelse
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- / People Tab -->
                </div>
            </div>
        </div>
    </div>
    
    @include('dashboard.contacts.modals.add_contact')
@endsection

@push('ejs-templates')
    <script type="text/ejs" id="contact-item-not-found-template">
    <li class="[ user ]" style="text-align: center">
        {{ __('dashboard/contacts.we_can_t_find_any_contacts_for_this_request') }}
    </li>
    </script>

    <script type="text/ejs" id="contact-item-template">
        <li data-id="<%- contact.id %>" class="[ user ] contact contact-list-item">
            <div class="[ user__item ]">
                <div class="[ user__item-info ]">
                    <div class="[ user__item-image ]"></div>
                    <span class="[ user__item-status ] is-offline"></span>
                    <div class="[ user__item-name-title ]">
                        <h4><%= contact.following_user.email %></h4>
                            <p><%= contact.following_user.professional_title || '' %></p>
                    </div>
                </div>
                <div class="[ user__item-options ]" data-id="<%= contact.id %>" style="width: 100%;">
                   <select name="" class="project-select contact-projects form-control" multiple data-live-search="true" style="margin-right: 20px;">
                        <% user_projects.forEach(function(project){ %>

                        <%
                            var selected = '';

                            var has_this_project_id = $.grep(contact.following_user_projects, function( value, index ) {
                                return ( value.id === project.id ); });

                            if( has_this_project_id.length > 0 ) {
                                selected = 'selected';
                            }
                        %>

                        <option <%= selected %> value="<%= project.id %>"><%= project.name %></option>
                        <% }); %>
                   </select>

                   <select name="" class="project-select contact-lists form-control" multiple data-live-search="true" style="margin-right: 20px;">
                        <% user_contact_lists.forEach(function(contact_list){ %>

                        <%
                            var selected = '';

                            var has_this_contact_list_id = $.grep(contact.lists, function( value, index ) {
                                return ( value.id === contact_list.id ); });

                            if( has_this_contact_list_id.length > 0 ) {
                                selected = 'selected';
                            }
                        %>

                        <option <%= selected %> value="<%= contact_list.id %>"><%= contact_list.title %></option>
                        <% }); %>
                   </select>
                    <button data-id="<%- contact.id %>" class="[ user__item-options-delete-button ] btn btn-primary delete-contact">{{__('dashboard/contacts.delete')}}</button>
                </div>
            </div>
        </li>
    </script>
@endpush