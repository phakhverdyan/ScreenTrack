@push('styles')
    <link rel="stylesheet" href="{{ asset_no_cache('css/vendor/selectize.bootstrap3.min.css') }}">
    <link rel="stylesheet" href="{{ asset_no_cache('css/vendor/selectize.modified.css') }}">
@endpush
@push('scripts')
    <script src="{{ asset('js/vendor/selectize.min.js') }}"></script>
    <script src="{{ asset('js/vendor/jquery.mask.min.js') }}"></script>
    <script>
        var $contacts_select = $('#contacts-select');

        $('#add-member').click(function (event) {
            event.preventDefault();

            var contact_id = $('#contacts-select').val();
            var role = $('#add-member-role select').val();

            var $form = $('form#add-member-form');

            request({
                method: 'POST',
                url:  '/projects/members/create',
                data: {
                    project_member: {
                        project_id: project_id,
                        contact_id: contact_id,
                        role: role,
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

                $.notify("{{ __('dashboard/project_members.added') }}", 'success');

                get_members();

                $("#add-member-modal").modal('hide');
            });
        });

        $contacts_select.removeClass('custom-select').selectize({
            valueField: 'id',
            labelField: 'email',
            searchField: [ 'email'],
            placeholder: "{{ __('dashboard/project_members.you_can_search_needed_contacts') }}",

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

            },
        });
    </script>
@endpush
<!-- Add New List Modal -->
<div class="modal fade" id="add-member-modal" tabindex="-1" role="dialog"
     aria-labelledby="edit-list" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="contact-list-modal-title">{{ __('dashboard/project_members.add_member_to_the_project') }}</h5>
                <button type="button" class="close" data-dismiss="modal"
                        aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="add-member-form">
                    <div class="form-group">
                        <div id="contacts-global-search" class="">
                            <select data-name="project_member.contact_id" class="custom-select selectized" id="contacts-select" name=""></select>
                            <div class="invalid-feedback"></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-12">
                                <label>{{ __('dashboard/project_members.member_role') }}</label>
                                <div id="add-member-role">
                                    @include ('dashboard.projects.members.partials.roles_list')
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-12">
                                <button id="add-member" data-url="/contact_lists/create" class="[ list-group__item-options-list-button ] btn btn-primary float-right">{{ __('dashboard/project_members.add_member') }}</button>
                            </div>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- / Add New List Modal -->
@push('ejs-templates')
    <script type="text/ejs" id="contacts-in-list-not-found-template">
        <li class="[ user ]" style="text-align: center">
           {{ __('dashboard/project_members.you_don_t_have_any_contact_in_this_list_now') }}
        </li>
    </script>

    <script type="text/ejs" id="contacts-in-list-template">
    <p class="[ edit-list__people-found ]">{{ __('dashboard/project_members.contacts_in_list') }}: <span><%= contacts.length %></span></p>
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
