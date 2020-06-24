@extends('dashboard.layout')

@push('styles')
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/css/bootstrap-select.css">
@endpush

@push('scripts')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/js/bootstrap-select.min.js"></script>
    <script>
        $(function() {

            $('.contacts-content').on('click', '.delete-contact-list', function(event) {

                event.preventDefault();
                var contact_list_id = $(this).data('id');

                modals.confirm_action({
                    question: "{{ __('dashboard/contacts.you_really_want_to_delete_this_contact_list') }}",

                    confirm: function(callback) {
                        request({
                            method: 'GET',
                            url: '/contact_lists/' + contact_list_id + '/delete',
                        }, function(response) {
                            if (response.error) {
                                $.notify(response.error);
                                return;
                            }

                            $.notify("{{ __('dashboard/contacts.deleted') }}", 'success');

                            $('li.contact-list[data-id="' + contact_list_id + '"]').hide();
                            return callback && callback();
                        });
                    },
                });
            });

            $('.contacts-content').on('click', '.edit-contact-list', function(event) {
                $("button#save-contact-list").attr('data-url','/contact_lists/' + $(this).data('id') + '/update');
                $("button#save-contact-list").text("{{ __('dashboard/contacts.save_contact_list') }}");
                $('#contact-list-modal-title').text("{{ __('dashboard/contacts.edit_contact_list') }}");

                Validator.clear($('#contact-list-form'));

                    request({
                    method: 'GET',
                    url: '/contact_lists/' + $(this).data('id'),
                }, function(response) {
                    if (response.error) {
                        $.notify(response.error);
                        return;
                    }

                    $('#list_name').val(response.data.title);

                    contacts_in_list = response.data.contacts.map(function (contact) {
                       return {
                           id: contact.id,
                           email: contact.following_user.email,
                       }
                    });

                    render_contacts_in_list()

                    $('#contact-list-modal').modal('show');
                });
            });

            $('#add-contact-list').click(function () {
                $("button#save-contact-list").attr('data-url',"/contact_lists/create");
                $("button#save-contact-list").text("{{ __('dashboard/contacts.create_contact_list') }}");
                $('#contact-list-modal-title').text("{{ __('dashboard/contacts.create_new_contact_list') }}");

                Validator.clear($('#contact-list-form'));

                contacts_in_list = [];
                $('#list_name').val('');
                $("#contact-list-modal").modal('show');
            });

            (function initialize_search_contact_lists() {

                var timeout = null;
                var xhr = null;

                function search_contact_lists() {
                    timeout && clearTimeout(timeout);
                    xhr && xhr.abort();

                    timeout = setTimeout(function() {
                        xhr = get_contact_lists();
                    }, 250);
                }

                $contact_list_search_form.find('input[name="query"]').on('input', function() {
                    search_contact_lists();
                });
            })();
        });

        var $contact_list_search_form = $('#search-contact-list-form');

        function get_contact_lists() {
            var $contact_lists_items = $('#lists');

            request({
                method: 'GET',
                url: '/contact_lists',
                data: $contact_list_search_form.serialize(),
            }, function(response) {
                if (response.error) {
                    $.notify(response.error);
                    return;
                }

                $contact_lists_items.html('');

                if (response.data.length < 1) {
                    $(template('contact-list-item-not-found')).appendTo($contact_lists_items);
                } else {
                    response.data.forEach(function(contact_list) {
                        $(template('contact-list-item', {
                            list: contact_list,
                        })).appendTo($contact_lists_items);
                    });
                }
            });
        }
    </script>
@endpush

@section('content')
    <div class="container">
        <h3 class="[ page-title ]">{{ __('dashboard/contacts.contacts_lists') }}</h3>
        <div class="[ list ] contacts-content">
            <div class="row">
                <ul class="nav navs-tabs">
                    <li class="nav-item">
                        <a class="nav-link" href="/dashboard/contacts">{{ __('dashboard/contacts.contacts') }}</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="/dashboard/contacts-lists">{{ __('dashboard/contacts.contacts_lists') }}</a>
                    </li>
                </ul>
            </div>
            <div class="row">
                <div class="tab-content">
                    <div class="tab-pane show active" id="lists-list-tab" role="tabpanel" aria-labelledby="lists-tab">
                        <div class="row">
                            <div class="col-md-9">
                                <div class="[ list__header ]">
                                    <form class="[ list__form ]" id="search-contact-list-form" action="">
                                        <input name="query" class="form-control" type="text" placeholder="{{ __('dashboard/contacts.find_list_by_name') }}">
                                    </form>
                                </div>
                            </div>
                            <div class="col-md-3">
                                    <div class="form-group">
                                        <button class="[ list__form-add-user ] btn btn-primary" data-toggle="modal" id="add-contact-list">
                                            {{ __('dashboard/contacts.add_contact_list') }}
                                        </button>
                                    </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12">
                                <ul id="lists">
                                    @forelse ($user_contact_lists as $list)
                                    <li class="[ list-group ] contact-list" data-id="{{ $list->id }}">

                                        <div class="[ list-group__item ]">
                                            <div class="[ list-group__item-info ]">
                                                <div class="[ list-group__item-name-title ]">
                                                    <h4> {{ $list->title }} <span>({{ count($list->contacts) }})</span></h4>

                                                    <ul class="[ list-group__members ]">
                                                        @forelse ($list->contacts as $contact)
                                                            <li class="[ list-group__members-item ] contact-list" data-id="{{ $list->id }}">
                                                                <span> {{ $contact->following_user->email }}</span>
                                                            </li>
                                                        @empty
                                                        @endforelse
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="[ list-group__item-options ]">
                                                <button data-id="{{ $list->id }}" class="[ list-group__item-options-list-button ] btn btn-primary edit-contact-list" data-toggle="modal">{{ __('dashboard/contacts.edit') }}</button>
                                                <button data-id="{{ $list->id }}" class="[ list-group__item-options-delete-button ] btn btn-primary delete-contact-list" data-toggle="modal" >{{ __('dashboard/contacts.delete') }}</button>
                                            </div>
                                        </div>
                                    </li>
                                    @empty
                                    <li class="[ user ]" style="text-align: center">
                                        {{ __('dashboard/contacts.you_don_t_have_any_contact_list_yet') }}
                                    </li>
                                    @endforelse
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    @include('dashboard.contacts.modals.add_contact')
    @include('dashboard.contacts.modals.add_or_edit_contact_list')
@endsection

@push('ejs-templates')
    <script type="text/ejs" id="contact-list-item-not-found-template">
    <li class="[ user ]" style="text-align: center">
       {{ __('dashboard/contacts.we_can_t_find_any_contact_list_for_this_request') }}
    </li>
    </script>

    <script type="text/ejs" id="contact-list-item-template">
        <li class="[ list-group ] contact-list" data-id="<%= list.id %>">
            <div class="[ list-group__item ]">
                <div class="[ list-group__item-info ]">
                    <div class="[ list-group__item-name-title ]">
                        <h4> <%= list.title %> <span>(<%= list.contacts.length %>)</span></h4>
                        <ul class="[ list-group__members ]">
                            <% list.contacts.forEach(function(contact) { %>
                                <li class="[ list-group__members-item ] contact-list" data-id="<%= list.id %>">
                                    <span><%= contact.following_user.email %></span>
                                </li>
                            <% }); %>
                        </ul>
                    </div>
                </div>
                <div class="[ list-group__item-options ]">
                    <button data-id="<%= list.id %>" class="[ list-group__item-options-list-button ] btn btn-primary edit-contact-list" data-toggle="modal" data-target="#edit-list">{{  __('dashboard/contacts.edit') }}</button>
                    <button data-id="<%= list.id %>" class="[ list-group__item-options-delete-button ] btn btn-primary delete-contact-list" data-toggle="modal" data-target="#delete-list">{{  __('dashboard/contacts.delete') }}</button>
                </div>
            </div>
        </li>
    </script>
@endpush