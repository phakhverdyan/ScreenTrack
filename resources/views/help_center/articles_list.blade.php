@extends('layouts.main_layout')

@push('meta')
    @if ($intended_for['slug'] == 'for-freelancers')
        <title>{!! __('meta.articles_list.for_freelancers.title') !!}</title>
        <meta name="description" content="{!! __('meta.articles_list.for_freelancers.description') !!}">
        <meta name="keywords" content="{!! __('meta.articles_list.for_freelancers.keywords') !!}">
    @elseif ($intended_for['slug'] == 'for-employers')
        <title>{!! __('meta.articles_list.for_freelancers.title') !!}</title>
        <meta name="description" content="{!! __('meta.articles_list.for_employers.description') !!}">
        <meta name="keywords" content="{!! __('meta.articles_list.for_employers.keywords') !!}">
    @elseif ($intended_for['slug'] == 'for-affiliates')
        <title>{!! __('meta.articles_list.for_freelancers.title') !!}</title>
        <meta name="description" content="{!! __('meta.articles_list.for_affiliates.description') !!}">
        <meta name="keywords" content="{!! __('meta.articles_list.for_affiliates.keywords') !!}">
    @endif
@endpush

@push('styles')
    <link rel="stylesheet" href="{{ asset_no_cache('/css/help-center-styles.css') }}">
@endpush

@section('content')
    @include('components.navbar.main')

    <div class="[ help-center ]">
        @include('help_center.partials.search')

        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="{{ route('help_center.index', locale()) }}">{{ __('help_center.help_center') }}</a></li>
                <li class="breadcrumb-item">{{ $intended_for['title'] }}</li>
            </ol>
        </nav>

        <div class="[ topics ]">
            <ul class="[ topics__questions ]">
                @forelse($articles as $article)
                    <li class="[ topics__questions-item ]">
                        <a href="{{ route('help_center.article', [locale(),$article->slug ]) }}" class="[ topics__questions-item__title ]">
                            {{ $article->title }}
                        </a>
                    <p class="[ topics__questions-item__summary ]">{!! Str::limit(remove_img_tags($article->content) , 800) !!}</p>
                    </li>
                @empty
                    <li class="[ topics__questions-item ]">
                        <div class="text-center">{{ __('help_center.we_don_t_have_articles_for_this_section') }}</div>
                    </li>
                @endforelse

            </ul>
        </div>
    </div>

    @include('components.footer.main')
@endsection
