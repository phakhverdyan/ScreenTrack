@extends('layouts.main_layout')
@push('styles')
    <link rel="stylesheet" href="{{ asset_no_cache('/css/help-center-styles.css') }}">
@endpush

@push('scripts')
<script>
    $(function(){
        var localStorage = window.localStorage;
        var article_id = {{ $article->id }};

        var storage_key_for_votes = 'help_center_articles_voted';
        var storage_key_for_views = 'help_center_articles_viewed';

        count_article_view(article_id);

        if (! is_user_voted_for_this_article(article_id)) {
            $('#vote-block').collapse('show');
        }
        

        $('#vote-yes').click(function (event) {
            event.preventDefault();
            vote('yes')
        });

        $('#vote-no').click(function (event) {
            event.preventDefault();
            vote('no')
        });

        function vote(type) {
            request({
                method: 'POST',
                url: '/help_center_articles/vote_'+type,
                data: {
                    article_id: article_id
                }

            }, function(response) {
                if (response.error) {
                    $.notify(response.error);
                    return;
                }

                $.notify("{{ __('help_center.thank_you_for_your_vote') }}",'success');

                save_vote_for_article(article_id);

                $('#vote-block').collapse('hide');
            });
        }

        function count_article_view(article_id) {
            if (is_user_viewed_this_article(article_id)) {
                return false;
            }

            request({
                method: 'POST',
                url: '/help_center_articles/viewed',
                data: {
                    article_id: article_id
                }

            }, function(response) {
                if (response.error) {
                    return;
                }

                save_viewed_article(article_id);
            });
        }

        function save_vote_for_article(article_id) {
            var voted_list = JSON.parse(localStorage.getItem(storage_key_for_votes) || '[]');

            voted_list.push(article_id);

            localStorage.setItem(storage_key_for_votes, JSON.stringify(voted_list));
        }
        
        function is_user_voted_for_this_article(article_id) {
            var voted_list = localStorage.getItem(storage_key_for_votes) || [];

            return voted_list.includes(article_id)
        }

        function save_viewed_article(article_id) {
            var viewed_list = JSON.parse(localStorage.getItem(storage_key_for_views) || '[]');

            viewed_list.push(article_id);

            localStorage.setItem(storage_key_for_views, JSON.stringify(viewed_list));
        }


        function is_user_viewed_this_article(article_id) {
            var viewed_list = localStorage.getItem(storage_key_for_views) || [];

            return viewed_list.includes(article_id)
        }
    });
</script>
@endpush

@section('content')
    @include('components.navbar.main')

    <div class="[ help-center ]">

        @include('help_center.partials.search')

        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="{{ route('help_center.index', locale()) }}">{{ __('help_center.help_center') }}</a></li>
                <li class="breadcrumb-item"><a href="{{ route('help_center.intended_for_articles', [ locale(),$intended_for['slug'] ]) }}">{{ $intended_for['title'] }}</a></li>
            </ol>
        </nav>

        <div class="row">
            <div class="col-md-9">
                <div class="[ answer ]">
                    <h3 class="[ answer-title ]">
                       {{ $article->title }}
                    </h3>
                    <div class="[ answer-summary ]">
                        {!! $article->content !!}
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                @if (count($related_articles = $article->get_related_articles(5)))
                    <ul class="[ related-questions ]">
                        <h4>{{ __('help_center.related_articles') }}</h4>
                        @foreach($related_articles as $related_article)
                            <li class="[ related-questions__item ]"><a href="/help-center/article/{{ $related_article['slug'] }}">{{ $related_article->title }}</a></li>
                        @endforeach
                    </ul>
                @endif
            </div>
        </div>

        <div class="row text-center collapse" id="vote-block">
            <div class="col-md-12">
                <div class="[ did-answer-question ]">
                    <h4>{{ __('help_center.did_this_answer_your_question') }}<a href="#" id="vote-yes">{{ __('help_center.yes') }}</a> / <a href="#" id="vote-no">{{ __('help_center.no') }}</a></h4>
                </div>
            </div>
        </div>
    </div>
@include('components.footer.main')
@endsection
