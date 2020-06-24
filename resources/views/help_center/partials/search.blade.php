@push('scripts')
<script>
    $(function () {
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
                                })).appendTo($articles_items);
                            });
                        }

                        $('input#search-query').dropdown('toggle');
                    });
                }, 500);
            }

            $articles_search_form.find('input[name="search_query"]').on('input', function() {
                if ($(this).val().length < 4) {
                    timeout && clearTimeout(timeout);
                    xhr && xhr.abort();
                    $('input#search-query').dropdown('hide');
                    return;
                }

                search_articles();
            });
        })();
    });
</script>
@endpush

<div class="[ help-center__search-form ]">
    <form id="article-search-form" action="">
        <div class="form-group">
            <input id="search-query" name="search_query" type="text" class="form-control"  aria-haspopup="true" aria-expanded="false"
                   placeholder="{{ __('help_center.what_we_can_help_you_with') }}">

            <ul class="dropdown-menu" id="articles-items" style="width: 70%">
                <a class="dropdown-item" href="#"></a>
            </ul>
        </div>
    </form>
</div>

@push('ejs-templates')
    <script type="text/ejs" id="article-item-not-found-template">
        <span class="dropdown-item">{{ __('help_center.we_cant_find_any_article_for_your_request') }}</span>
    </script>

    <script type="text/ejs" id="article-item-template">
         <a class="dropdown-item" href="/help-center/article/<%= article.slug %>"><%= article.title %></a>
    </script>
@endpush