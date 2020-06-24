@extends('layouts.main_layout')

@push('meta')
    <title>{!! __('meta.blog.title') !!}</title>
    <meta name="description" content="{!! __('meta.blog.description') !!}">
    <meta name="keywords" content="{!! __('meta.blog.keywords') !!}">
@endpush

@push('styles')
    <link rel="stylesheet" href="{{ asset_no_cache('css/help-center-styles.css') }}">
@endpush

@section('content')
    @include('components.navbar.main')

    <div class="[ help-center ]">
        <div class="[ help-center__search-form ]">
        </div>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">{{ __('blog.blog') }}</li>
            </ol>
        </nav>

        <div class="[ topics ]">
            <ul class="[ topics__questions ]">
                @forelse($articles as $article)
                    <li class="[ topics__questions-item ]">
                        <a href="{{ route('blog.article', [locale(), $article->slug ]) }}" class="[ topics__questions-item__title ]">
                            {{ $article->title }}
                        </a>
                    <p class="[ topics__questions-item__summary ]">{!! Str::limit(remove_img_tags($article->content) , 800) !!}</p>
                    </li>
                @empty
                    <li class="[ topics__questions-item ]">
                        <div class="text-center">{{ __('blog.we_don_t_have_articles_for_this_section_yet') }}</div>
                    </li>
                @endforelse

            </ul>
        </div>
    </div>

    @include('components.footer.main')
@endsection
