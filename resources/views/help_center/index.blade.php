@extends('layouts.main_layout')

@push('meta')
    <title>{!! __('meta.help_center.title') !!}</title>
    <meta name="description" content="{!! __('meta.help_center.description') !!}">
    <meta name="keywords" content="{!! __('meta.help_center.keywords') !!}">
@endpush

@push('styles')
    <link rel="stylesheet" href="{{ asset_no_cache('/css/help-center-styles.css') }}">
@endpush

@section('content')
    @include('components.navbar.main')
    <div class="[ help-center ]">

        @include('help_center.partials.search')

        <div class="[ help-center__categories ]">
            <a href="{{ route('help_center.intended_for_articles', [locale(), 'for-freelancers']) }}" style="text-decoration: none">
                <div class="[ help-center__category ] freelancers">
                    <div class="help-center__category-image">
                        <img src="{{ asset_no_cache('img/freelancers.svg') }}" alt="">
                    </div>
                    <div class="[ help-center__category-title ]">
                        <h4>{{ __('help_center.freelancers') }}</h4>
                    </div>
                </div>
            </a>
            <a href="{{ route('help_center.intended_for_articles', [locale(), 'for-employers']) }}" style="text-decoration: none">
                <div class="[ help-center__category ] employers">
                    <div class="[ help-center__category-image ]">
                        <img src="{{ asset_no_cache('img/employers.svg') }}" alt="">
                    </div>
                    <div class="[ help-center__category-title ]">
                        <h4>{{ __('help_center.employers') }}</h4>
                    </div>
                </div>
            </a>
            <a href="{{ route('help_center.intended_for_articles', [locale(), 'for-affiliates']) }}" style="text-decoration: none">
                <div class="[ help-center__category ] affiliates">
                    <div class="[ help-center__category-image ]">
                        <img src="{{ asset_no_cache('img/affiliates.svg') }}" alt="">
                    </div>
                    <div class="[ help-center__category-title ]">
                        <h4>{{ __('help_center.affiliates') }}</h4>
                    </div>
                </div>
            </a>
        </div>
    </div>
@include('components.footer.main')
@endsection
