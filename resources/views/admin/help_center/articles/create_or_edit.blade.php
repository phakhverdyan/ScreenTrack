@extends('admin.layout')
@push('styles')
    <link href="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.12/summernote-bs4.css" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset_no_cache('css/vendor/selectize.bootstrap3.min.css') }}">
@endpush
@push('scripts')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.12/summernote-bs4.js"></script>
    <script src="{{ asset('js/vendor/selectize.min.js') }}"></script>
    <script>
        $(function () {
            $('#text-editor').summernote({
                height: 500,
            });

            $('#article-save').click(function (event) {
                event.preventDefault();

                var $form = $('form#article-form');

                request({
                    method: 'POST',
                    url:  $form.attr('action'),
                    data: $form.serialize(),

                }, function(response) {
                    if (new Validator($form, response).fails()) {
                        return;
                    }

                    if (response.error) {
                        $.notify(response.error);
                        return;
                    }

                    window.location.href = '/nexus/help-center/articles';

                    $.notify('Saved!', 'success');
                });
            });

            $('#input-tags').selectize({
                preload: true,
                delimiter: ',',
                persist: false,
                create: function(input) {
                    return {
                        value: input,
                        text: input
                    }
                },
            });
        });
    </script>
@endpush
@section('content')
    <a href="/nexus/help-center/articles" class="btn btn-secondary">< Back to Articles list</a>
    @empty($article)
        <h1>Create Article</h1>
        <form action="/help_center_articles/create" id="article-form">
    @else
        <h1>Edit Article</h1>
        <form action="/help_center_articles/{{ $article->id }}/update" id="article-form">
    @endempty

        <div class="form-group">
            <label>
                Article title:
            </label>
            <input value="{{ $article->title ?? '' }}" type="text" class="form-control" name="article[title]" data-name="article.title"  placeholder="Type question title">
            <div class="invalid-feedback"></div>
        </div>

        <div class="form-group">
            <label>
                Article intended for:
            </label>
            <select name="article[intended_for]" data-name="article.intended_for" class="form-control">
                @foreach($intended_for_list as $key => $value)
                    <option {{ ($article->intended_for ?? '') == $key ? 'selected' : '' }} value="{{ $key }}">{{ $value['title'] }}</option>
                @endforeach
            </select>
            <div class="invalid-feedback"></div>
        </div>

        <div class="form-group">
            <label>
                Article tags:
            </label>
            <input name="article[tags]" value="{{ optional($article ?? null)->get_tags_string() }}" type="text" id="input-tags" class="form-control">
            <div class="invalid-feedback"></div>
        </div>

        <div class="form-group">
            <label>
                Article Content
            </label>
            <textarea name="article[content]" data-name="article.content"  id="text-editor" class="form-control">
                {!! $article->content ?? '' !!}
            </textarea>
            <div class="invalid-feedback"></div>
        </div>
        <div class="form-group">
            <button id="article-save" class="btn btn-primary btn-lg float-right">Save</button>
        </div>

    </form>
@endsection