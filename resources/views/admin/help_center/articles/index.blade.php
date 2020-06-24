@extends('admin.layout')
@push('scripts')
    <script>
        $(function () {
            $('body').on('click', '.article-delete', function (event) {
                event.preventDefault();

                var article_id = $(this).data('id');

                modals.confirm_action({
                    question: 'You really want to DELETE this Article?',

                    confirm: function (callback) {
                        request({
                            method: 'GET',
                            url: '/help_center_articles/' + article_id + '/delete',
                        }, function (response) {
                            if (response.error) {
                                $.notify(response.error);
                                return;
                            }

                            $.notify('Deleted!', 'success');

                            $('div.article-item[data-id="' + article_id + '"]').hide();
                            return callback && callback();
                        });
                    },
                });
            });

            (function initialize_search_articles() {
                var $articles_search_form = $('#article-search-form');
                var $articles_items = $('#articles-items');

                var timeout = null;
                var xhr = null;

                function search_articles() {
                    timeout && clearTimeout(timeout);
                    xhr && xhr.abort();

                    timeout = setTimeout(function() {
                        xhr = request({
                            method: 'GET',
                            url: '/help_center_articles',
                            data: $articles_search_form.serialize(),
                        }, function(response) {
                            if (response.error) {
                                $.notify(response.error);
                                return;
                            }

                            $articles_items.html('');

                            if (response.data.length < 1) {
                                $(template('article-item-not-found')).appendTo($articles_items);
                            } else {
                                response.data.forEach(function(article) {
                                    $(template('article-item', {
                                        article: article,
                                        intended_for_list: @json($intended_for_list)
                                    })).appendTo($articles_items);
                                });
                            }
                        });
                    }, 250);
                }

                $articles_search_form.find('select[name="intended_for"]').change(function () {
                    search_articles();
                });

                $articles_search_form.find('input[name="search_query"]').on('input', function() {
                    search_articles();
                });
            })();
        });
    </script>
@endpush
@section('content')
    <h1>Help Center Articles</h1>
    <form id="article-search-form">
        <div class="row mb-5">

                <div class="col-md-5">
                    <input name="search_query" type="text" placeholder="Search article" class="form-control mr-2">
                </div>
                <div class="col-md-3">
                    <select name="intended_for" class="form-control">
                        <option value="">All</option>
                        @foreach($intended_for_list as $key => $value)
                            <option value="{{ $key }}">{{ $value['title'] }}</option>
                        @endforeach
                    </select>
                </div>

            <div class="col-md-4">
                <a href="/nexus/help-center/articles/create" class="btn btn-primary float-right">Add Article</a>
            </div>
        </div>
    </form>
    <div>
        <div id="articles-items" class="">
            @forelse($articles as $article)
                <div data-id="{{ $article->id }}" class="row mb-5 article-item">
                    <div class="col-md-6">
                        <strong>{{ $intended_for_list[$article->intended_for]['title'] }}</strong>
                        <span>{{ $article->title }}</span>
                    </div>
                    <div class="col-md-6 ">
                        <strong>{{ $article->likes }} | {{ $article->dislikes }}</strong>
                        {{ $article->views }} views {{ $article->created_at_for_humans }}
                        <div class="float-right">
                            <a href="/nexus/help-center/articles/{{ $article->id }}/edit" class="btn btn-primary">Edit</a>
                            <a data-id="{{ $article->id }}" href="" class="btn btn-primary article-delete ml-1">Delete</a>
                        </div>
                    </div>
                </div>
            @empty
                <div class="text-center">We don't have any Help Center's articles yet :(</div>
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
