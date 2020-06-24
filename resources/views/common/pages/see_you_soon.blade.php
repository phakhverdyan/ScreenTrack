@extends('layouts.main_layout')

@push('meta')
    <title>{!! __('meta.see_you_soon.title') !!}</title>
    <meta name="description" content="{!! __('meta.see_you_soon.description') !!}">
@endpush

@section('content')
    @include('components.navbar.main')

	<!-- page header -->
    <div class="[ page-header ] text-center">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="[ page-header__page-title ]">
                        <h2>{{ __('pages/see_you_soon.see_you_soon') }}</h2>
                        <p>{{ __('pages/see_you_soon.we_will_miss_you') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- / page header -->

	@include('components.footer.main')
@endsection
