@extends('admin.layout')
@push('scripts')
    <script>
        $(function () {
            $('body').on('click', '.administrator-delete', function (event) {
                event.preventDefault();

                var administrator_id = $(this).data('id');

                modals.confirm_action({
                    question: 'You really want to DELETE this Administrator?',

                    confirm: function (callback) {
                        request({
                            method: 'GET',
                            url: '/administrators/' + administrator_id + '/delete',
                        }, function (response) {
                            if (response.error) {
                                $.notify(response.error);
                                return;
                            }

                            $.notify('Deleted!', 'success');

                            $('div.administrator-item[data-id="' + administrator_id + '"]').hide();
                            return callback && callback();
                        });
                    },
                });
            });
        });
    </script>
@endpush
@section('content')
    <h1>Administrators</h1>
    <div class="row mb-12">
        <div class="col-md-8">
        </div>
        <div class="col-md-4">
            <a href="/nexus/administrators/create" class="btn btn-primary float-right">Add Administrator</a>
        </div>
    </div>
    <br/>
    <div class="mt-10">
        <div id="users-items" class="">
            @forelse($administrators as $administrator)
                <div data-id="{{ $administrator->id }}" class="row mb-2 administrator-item">
                    <div class="col-md-6">
    <b>{{ $roles_list[$administrator->role]['title'] }}</b> | {{ $administrator->user->email }} | {{ $administrator->user->full_name }}
                    </div>
                    <div class="col-md-6 ">
                        <div class="float-right">
                            <a data-id="{{ $administrator->id }}" href="" class="btn btn-primary administrator-delete ml-1">Delete</a>
                        </div>
                    </div>
                </div>
            @empty
                <div class="text-center">We don't have any Administrators yet :(</div>
            @endforelse
        </div>
    </div>
@endsection

@modal('confirm_action');

@push('ejs-templates')
    <script type="text/ejs" id="article-item-not-found-template">
       <div class="text-center">We can't find any article for this request :(</div>
    </script>

    <script type="text/ejs" id="article-item-template">
    <div data-id="<%= article.id %>" class="row mb-5 article-item">
            <div class="col-md-6">
                        <strong><%= intended_for_list[article.intended_for]['title'] %></strong>
                        <span><%= article.title %></span>
            </div>
            <div class="col-md-6">
                <strong><%= article.likes %> |  <%= article.dislikes %></strong>
                    <%= article.views %> views <%= article.created_at_for_humans %>
                    <div class="float-right">
                             <a href="/nexus/help-center/articles/<%= article.id %>/edit" class="btn btn-primary">Edit</a>
                            <a data-id="<%= article.id %>" href="" class="btn btn-primary article-delete ml-1">Delete</a>
                    </div>
            </div>
    </div>
    </script>
@endpush