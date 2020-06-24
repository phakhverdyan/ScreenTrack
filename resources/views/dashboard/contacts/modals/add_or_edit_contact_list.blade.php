@push('styles')
    <link rel="stylesheet" href="{{ asset_no_cache('css/vendor/selectize.bootstrap3.min.css') }}">
    <link rel="stylesheet" href="{{ asset_no_cache('css/vendor/selectize.modified.css') }}">
@endpush
@push('scripts')
    <script src="{{ asset('js/vendor/selectize.min.js') }}"></script>
    <script src="{{ asset('js/vendor/jquery.mask.min.js') }}"></script>
    <script>
        var contacts_in_list = [];

        var $contacts_select = $('#contacts-select');
        var $contacts_in_list = $('#contacts-in-list');

        $('#save-contact-list').click(function () {
            $form = $('#contact-list-form');

            var contacts_ids = null;

            if (contacts_in_list.length > 0) {
                contacts_ids = contacts_in_list.map(function (item) {
                    return item.id;
                })
            }

            request({
                method: 'POST',
                url:  $("button#save-contact-list").attr('data-url'),
                data: {
                    contact_list: {
                        title: $('input#list_name').val(),
                        contacts_ids: contacts_ids,
                    },
                },
            }, function(response) {
                if (new Validator($form, response).fails()) {
                    return;
                }

                if (response.error) {
                    $.notify(response.error);
                    return;
                }

                get_contact_lists();

                $("#contact-list-modal").modal('hide');


            });
        });

        $('#contact-list-modal').on('click','.delete-contact-from-list', function () {
            var contact_id_for_delete = $(this).data('id');

            contacts_in_list = contacts_in_list.filter(function (item) {
                if (item.id != contact_id_for_delete) {
                    return item;
                }
            });

            render_contacts_in_list();
        });

        function render_contacts_in_list() {
            $contacts_in_list.html('');

            if (contacts_in_list.length < 1) {
                $(template('contacts-in-list-not-found')).appendTo($contacts_in_list);
            } else {
                $(template('contacts-in-list',{ contacts: contacts_in_list})).appendTo($contacts_in_list);
            }
        }

        render_contacts_in_list();

        $contacts_select.removeClass('custom-select').selectize({
            valueField: 'id',
            labelField: 'email',
            searchField: [ 'email'],
            placeholder: "{{ __('dashboard/contacts.you_can_search_needed_contacts') }}",

            render: {
                option: function(item, escape) {
                    return (
                        '<div class="selectize-item">' +
                        '<span data-id="'+item.id+'" class="name" style="display: inline-block; vertical-align: middle;">' + item.email + '</span>' +
                        '</div>'
                    );
                },
            },

            load: function(string, callback) {
                if (string.length == 0) {
                    return callback();
                }

                return request({
                    url: '/contacts',

                    data: {
                        query: string,
                    },
                }, function(response) {
                    if (response.error) {
                        $.notify(response.error, 'error');
                        return callback();
                    }

                   var data_for_select = response.data.map(function(item) {
                       return {
                           id: item.id,
                           email: item.following_user.email
                       }
                   });

                   return callback(data_for_select);
                });
            },

            onInitialize: function() {

            },

            onChange: function(item_id) {
                var item = { id: null, email: null};

                item.id = item_id;
                item.email = $('span[data-id="'+item_id+'"]').text();

                if (item.email !== '') {
                    has_this_contact_list_id = $.grep(contacts_in_list, function( list, index ) {
                        return ( list.id == item.id );
                    });

                    if (has_this_contact_list_id.length < 1) {
                        contacts_in_list.push(item);
                    }
                }

                render_contacts_in_list();

                this.clear();
            },
        });
    </script>
@endpush
<!-- Add New List Modal -->
<div class="modal fade" id="contact-list-modal" tabindex="-1" role="dialog"
     aria-labelledby="edit-list" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="contact-list-modal-title">{{ __('dashboard/contacts.create_new_contact_list') }}</h5>


                <button type="button" class="close" data-dismiss="modal"
                        aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                    <div class="form-group">
                        <form id="contact-list-form">
                             <input id="list_name" data-name="contact_list.title" type="text" class="form-control" value="" placeholder="{{ __('dashboard/contacts.list_name') }}">
                             <div class="invalid-feedback"></div>
                        </form>
                    </div>
                    <hr>
                    <div class="form-group">
                        <div id="contacts-global-search" class="">
                            <select class="custom-select selectized" id="contacts-select" name=""></select>
                        </div>
                    </div>
                <div class="form-group">
                    <div class="row">
                        <div class="col-md-12">
                            <button id="save-contact-list" data-url="/contact_lists/create" class="[ list-group__item-options-list-button ] btn btn-primary float-right" data-toggle="modal" data-target="#edit-list">{{ __('dashboard/contacts.create_contact_list') }}</button>
                        </div>
                    </div>
                </div>
                        <hr>
                <div class="form-group">
                        <div id="contacts-in-list" class="">
                        </div>
                </div>
                    </div>
            </div>
        </div>
    </div>
</div>
<!-- / Add New List Modal -->
@push('ejs-templates')
    <script type="text/ejs" id="contacts-in-list-not-found-template">
        <li class="[ user ]" style="text-align: center">
            {{ __('dashboard/contacts.you_don_t_have_any_contact_in_this_list_now') }}
        </li>
    </script>

    <script type="text/ejs" id="contacts-in-list-template">
    <p class="[ edit-list__people-found ]"> {{ __('dashboard/contacts.contacts_in_list') }}: <span><%= contacts.length %></span></p>
    <ul id="edit-list__people-found">
        <% contacts.forEach(function(contact, index){ %>
           <li class="[ user ] contact-item-in-list-global" data-id="<%= contact.id %>">
            <div class="[ user__item-info ]">
                <div class="[ user__item-image ]"></div>
                <span class="[ user__item-status ] is-offline"></span>
                <div class="[ user__item-name-title ]">
                    <h4><%= contact.email %></h4>
                </div>
            </div>
            <div style="position: absolute; margin-left: 421px; margin-top: 6px;">
                <img data-id="<%= contact.id %>" class="delete-contact-from-list" height="20px" src="/img/delete-icon.svg">
            </div>
        </li>
        <%  }); %>
    </ul>
    </script>
@endpush
