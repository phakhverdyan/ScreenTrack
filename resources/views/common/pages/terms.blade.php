@extends('layouts.main_layout')

@push('meta')
    <title>{!! __('meta.terms.title') !!}</title>
    <meta name="description" content="{!! __('meta.terms.description') !!}">
    <meta name="keywords" content="{!! __('meta.terms.keywords') !!}">
@endpush

@section('content')
    @include('components.navbar.main')

    <div class="container-fluid">
        <section>
            <div class="container">
                <h2 class="text-center">{!! __('pages/terms.terms_of_service') !!}</h2>
                <h3>{!! __('pages/terms.terms') !!}</h3>
                <p>
                    {!! __('pages/terms.terms_text', ['url' => url('/')]) !!}
                </p>
                <h3>{!! __('pages/terms.use_license') !!}</h3>
                <p>
                    {!! __('pages/terms.use_license_text') !!}
                </p>
                <h3>{!! __('pages/terms.disclaimer') !!}</h3>
                <p>
                    {!! __('pages/terms.disclaimer_text') !!}
                </p>
                <h3>{!! __('pages/terms.limitations') !!}</h3>
                <p>
                    {!! __('pages/terms.limitations_text') !!}
                </p>
                <h3>{!! __('pages/terms.accuracy_of_materials') !!}</h3>
                <p>
                    {!! __('pages/terms.accuracy_of_materials_text') !!}
                </p>
                <h3>{!! __('pages/terms.links') !!}</h3>
                <p>
                    {!! __('pages/terms.links_text') !!}
                </p>
                <h3>{!! __('pages/terms.modifications') !!}</h3>
                <p>
                    {!! __('pages/terms.modifications_text') !!}
                </p>
                <h3>{!! __('pages/terms.governing_law') !!}</h3>
                <p>
                    {!! __('pages/terms.governing_law_text') !!}
                </p>
                <p>
                    {!! __('pages/terms.contacting_us') !!}
                </p>
                <p>
                    {!! __('pages/terms.contacting_us_text') !!}
                </p>
                <p>
                    {{ url('/') }}
                    4190 Laubia
                    Brossard, Quebec j4y0h3
                    Canada
                    support@screentrack.com
                </p>
            </div>
        </section>

        @include('common.pages.partials.try_now_section')
    </div>

	@include('components.footer.main')
@endsection
