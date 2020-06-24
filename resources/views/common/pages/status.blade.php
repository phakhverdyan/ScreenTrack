@extends('layouts.main_layout')

@push('meta')
    <title>{!! __('meta.status.title') !!}</title>
    <meta name="description" content="{!! __('meta.status.description') !!}">
@endpush

@section('content')
    @include('components.navbar.main')

	<!-- page header -->
    <div class="[ page-header ] text-center">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="[ page-header__page-title ]">
                        <h2>{!! __('pages/status.service_status') !!}</h2>
                        <p>{!! __('pages/status.service_status_text') !!}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- / page header -->

    <!-- Body -->

    <div class="container-fluid">
        <section>
            <div class="container">
                <h2 class="d-flex align-items-center">
                    <img src="{{ asset_no_cache('img/pulse-line.svg') }}" style="width: 40px;">
                    <span class="ml-2">{!! __('pages/status.live_tracker') !!}</span>
                </h2>
                <p>{!! __('pages/status.update_every_minute') !!}</p>
                <div class="status-block">
                    <div class="status-block-item">
                        <span class="status-block-item__title">{!! __('pages/status.live_chat') !!}</span>
                        <span class="status-block-item__status + is-online">{!! __('pages/status.online_status') !!}</span>
                    </div>
                    <div class="status-block-item">
                        <span class="status-block-item__title">{!! __('pages/status.payment_system') !!}</span>
                        <span class="status-block-item__status + is-online">{!! __('pages/status.online_status') !!}</span>
                    </div>
                    <div class="status-block-item">
                        <span class="status-block-item__title">{!! __('pages/status.screenshot_service') !!}</span>
                        <span class="status-block-item__status + is-online">{!! __('pages/status.online_status') !!}</span>
                    </div>
                    <div class="status-block-item">
                        <span class="status-block-item__title">{!! __('pages/status.project_system') !!}</span>
                        <span class="status-block-item__status + is-online">{!! __('pages/status.online_status') !!}</span>
                    </div>
                    <div class="status-block-item">
                        <span class="status-block-item__title">{!! __('pages/status.desktop_tracker_feed') !!}</span>
                        <span class="status-block-item__status + is-online">{!! __('pages/status.online_status') !!}</span>
                    </div>
                    <div class="status-block-item">
                        <span class="status-block-item__title">{!! __('pages/status.email_notification') !!}</span>
                        <span class="status-block-item__status + is-online">{!! __('pages/status.online_status') !!}</span>
                    </div>
                </div>
                <p class="mt-3">
                    {!! __('pages/status.please_report') !!}
                    <a href="mailto:support@screentrack.com">support@screentrack.com</a>
                </p>
            </div>
        </section>

        @include('common.pages.partials.try_now_section')
    </div>
    <!-- Body or container-fluid -->

	@include('components.footer.main')
@endsection
