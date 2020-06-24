@extends('dashboard.layout')
@push('styles')
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/css/bootstrap-select.css">
@endpush
@push('scripts')
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/js/bootstrap-select.min.js"></script>
<script>
    var project_id = {{ $project_id }};

    var $members_search_form = $('#members-search-form');
    var $members_items = $('#members-items')

    $('#members').on('change', '.member-role-select', function() {
        var new_role = $(this).val();
        var member_id = $(this).data('id');

        request({
            method: 'POST',
            url: '/projects/members/' + member_id + '/update',
            data: {
                project_member:{
                    role: new_role
                }
            }
        }, function (response) {
            if (response.error) {
                $.notify(response.error);
                return;
            }

            $.notify("{{ __('dashboard/project_members.updated') }}", 'success');
        });

    });

    $('#members').on('click', '.delete-member', function(event) {
        event.preventDefault();
        var member_id = $(this).data('id');

        modals.confirm_action({
            question: "{{ __('dashboard/project_members.you_really_want_to_delete_this_member_from_project') }}",

            confirm: function (callback) {
                request({
                    method: 'GET',
                    url: '/projects/members/' + member_id + '/delete',
                }, function (response) {
                    if (response.error) {
                        $.notify(response.error);
                        return;
                    }

                    $.notify("{{ __('dashboard/project_members.deleted') }}", 'success');

                    $('li.member-item[data-id="' + member_id + '"]').hide();
                    return callback && callback();
                });
            },
        });
    });

    $('#show-add-member-modal').click(function () {
        $('#contacts-select')[0].selectize.clear();
        $('#add-member-modal').modal('show');
    });


    (function initialize_search_project_members() {
        var timeout = null;
        var xhr = null;

        function search_project_members() {
            timeout && clearTimeout(timeout);
            xhr && xhr.abort();

            timeout = setTimeout(function() {
                xhr = get_members();
            }, 250);
        }

        $members_search_form.find('input[name="query"]').on('input', function() {
            search_project_members();
        });
    })();

    function get_members() {
        return request({
            method: 'GET',
            url: '/projects/' + project_id + '/members',
            data: $members_search_form.serialize(),
        }, function(response) {
            if (response.error) {
                $.notify(response.error);
                return;
            }

            $members_items.html('');

            if (response.data.length < 1) {
                $(template('member-item-not-found')).appendTo($members_items);
            } else {
                var all_roles = @json($all_roles);

                response.data.forEach(function(member) {
                    $(template('member-item', {
                        member: member,
                        all_roles: all_roles
                    })).appendTo($members_items);
                });
            }
        });
    }
</script>
@endpush
@section('content')
    <section class="container py-5" id="members">
        <div class="row">
            <div class="col-md-12">
                <h3>{{ __('dashboard/project_members.members') }}</h3>
                <div class="[ list ] contacts-content">
                    <div class="row">
                        <div class="tab-content">
                            <!-- People Tab -->
                            <div class="tab-pane show active" id="people-list-tab" role="tabpanel" aria-labelledby="people-tab">
                                <div class="row">
                                    <div class="col-md-9">
                                        <div class="[ list__header ]">
                                            <form class="[ list__form ]" id="members-search-form">
                                                <input name="query" class="form-control" type="text" placeholder="{{ __('dashboard/project_members.find_members') }}">
                                            </form>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <button id="show-add-member-modal" class="[ list__form-add-user ] btn btn-primary" data-toggle="modal">
                                            {{ __('dashboard/project_members.add_member') }}
                                        </button>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <ul id="members-items">
                                            @forelse ($members as $member)
                                                <li data-id="{{ $member->id }}" class="[ user ] contact member-item">
                                                    <div class="[ user__item ]">
                                                        <div class="[ user__item-info ]">
                                                            <div class="[ user__item-image ]"></div>
                                                            <span class="[ user__item-status ] is-offline"></span>
                                                            <div class="[ user__item-name-title ]">
                                                                <h4>{{ $member->user->email }}</h4>
                                                                <p>{{ $member->user->professional_title }}</p>
                                                            </div>
                                                        </div>
                                                        <div class="[ user__item-options ]" data-id="{{ $member->id }}" style="width: 100%;">
                                                            @include ('dashboard.projects.members.partials.roles_list', [
                                                                'member' => $member
                                                            ])
                                                            <button data-id="{{ $member->id }}" class="[ user__item-options-delete-button ] btn btn-primary delete-member">{{ __('dashboard/project_members.delete') }}</button>
                                                        </div>
                                                    </div>
                                                </li>
                                            @empty
                                                <li class="[ user ]" style="text-align: center">
                                                   {{ __('dashboard/project_members.you_don_t_have_any_members_in_this_project') }}
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
        </div>
    </section>
@endsection
@include('dashboard.projects.members.modals.add_member')

@push('ejs-templates')
    <script type="text/ejs" id="member-item-not-found-template">
    <li class="[ user ]" style="text-align: center">
       {{ __('dashboard/project_members.we_can_t_find_any_members_for_this_request') }}
    </li>
    </script>

    <script type="text/ejs" id="member-item-template">
        <li data-id="<%= member.id %>" class="[ user ] contact member-item">
            <div class="[ user__item ]">
                <div class="[ user__item-info ]">
                    <div class="[ user__item-image ]"></div>
                    <span class="[ user__item-status ] is-offline"></span>
                    <div class="[ user__item-name-title ]">
                        <h4><%= member.user.email %></h4>
                            <p><%= member.user.professional_title %></p>
                    </div>
                </div>
                <div class="[ user__item-options ]" data-id="<%= member.id %>" style="width: 100%;">
                   <select data-id="<%= member.id %>" name="" class="project-select contact-projects form-control member-role-select" style="margin-right: 20px;">
                        <% Object.keys(all_roles).forEach( function(role_key){ %>

                        <%
                            var selected = '';
                            if (role_key == member.role ) {
                                selected = 'selected';
                            }
                        %>

                        <option <%= selected %> value="<%= role_key %>"><%= all_roles[role_key].title %></option>
                        <% }); %>
                   </select>
                    <button data-id="<%= member.id %>" class="[ user__item-options-delete-button ] btn btn-primary delete-member">{{ __('dashboard/project_members.delete') }}</button>
                </div>
            </div>
        </li>
    </script>
@endpush
