@extends('layouts.main_layout')

@push('meta')
    <title>{!! __('meta.careers.title') !!}</title>
    <meta name="description" content="{!! __('meta.careers.description') !!}">
@endpush

@section('content')
	@include('components.navbar.main')

	<!-- page header -->
	<div class="[ page-header ] text-center">
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<div class="[ page-header__page-title ]">
						<h2>{{ __('pages/careers.keen_on_talent') }}</h2>
						<p>{{ __('pages/careers.you_got_what_it_takes') }}</p>
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
				<h2>{!! __('pages/careers.open_opportunities') !!}</h2>
				<p>{!! __('pages/careers.open_opportunities_text') !!}</p>
				<div class="jobs-block">
					<div class="jobs-block-item">
						<span class="jobs-block-item__title">
							<img src="{{ asset_no_cache('img/suitcase-with-white-details.svg') }}" alt="" class="mr-2">
							<span>{{ __('pages/careers.job_title.sales_engineer') }}</span>
						</span>
						<a href="{{ route('contact_us', locale()) }}" class="jobs-block-item__status">{!! __('pages/careers.contact_us_to_apply') !!}</a>
					</div>
					<div class="jobs-block-item">
						<span class="jobs-block-item__title">
							<img src="{{ asset_no_cache('img/suitcase-with-white-details.svg') }}" alt="" class="mr-2">
							<span>{{ __('pages/careers.job_title.project_manager') }}</span>
						</span>
						<a href="{{ route('contact_us', locale()) }}" class="jobs-block-item__status">{!! __('pages/careers.contact_us_to_apply') !!}</a>
					</div>
					<div class="jobs-block-item">
						<span class="jobs-block-item__title">
							<img src="{{ asset_no_cache('img/suitcase-with-white-details.svg') }}" alt="" class="mr-2">
							<span>{{ __('pages/careers.job_title.back_end_sd') }}</span>
						</span>
						<a href="{{ route('contact_us', locale()) }}" class="jobs-block-item__status">{!! __('pages/careers.contact_us_to_apply') !!}</a>
					</div>
					<div class="jobs-block-item">
						<span class="jobs-block-item__title">
							<img src="{{ asset_no_cache('img/suitcase-with-white-details.svg') }}" alt="" class="mr-2">
							<span>{{ __('pages/careers.job_title.devops_engineer') }}</span>
						</span>
						<a href="{{ route('contact_us', locale()) }}" class="jobs-block-item__status">{!! __('pages/careers.contact_us_to_apply') !!}</a>
					</div>
					<div class="jobs-block-item">
						<span class="jobs-block-item__title">
							<img src="{{ asset_no_cache('img/suitcase-with-white-details.svg') }}" alt="" class="mr-2">
							<span>{{ __('pages/careers.job_title.system_manager') }}</span>
						</span>
						<a href="{{ route('contact_us', locale()) }}" class="jobs-block-item__status">{!! __('pages/careers.contact_us_to_apply') !!}</a>
					</div>
					<div class="jobs-block-item">
						<span class="jobs-block-item__title">
							<img src="{{ asset_no_cache('img/suitcase-with-white-details.svg') }}" alt="" class="mr-2">
							<span>{{ __('pages/careers.job_title.onboardnig_specialist') }}</span>
						</span>
						<a href="{{ route('contact_us', locale()) }}" class="jobs-block-item__status">{!! __('pages/careers.contact_us_to_apply') !!}</a>
					</div>
					<div class="jobs-block-item">
						<span class="jobs-block-item__title">
							<img src="{{ asset_no_cache('img/suitcase-with-white-details.svg') }}" alt="" class="mr-2">
							<span>{{ __('pages/careers.job_title.ux_designer') }}</span>
						</span>
						<a href="{{ route('contact_us', locale()) }}" class="jobs-block-item__status">{!! __('pages/careers.contact_us_to_apply') !!}</a>
					</div>
					<div class="jobs-block-item">
						<span class="jobs-block-item__title">
							<img src="{{ asset_no_cache('img/suitcase-with-white-details.svg') }}" alt="" class="mr-2">
							<span>{{ __('pages/careers.job_title.qa_engineer') }}</span>
						</span>
						<a href="{{ route('contact_us', locale()) }}" class="jobs-block-item__status">{!! __('pages/careers.contact_us_to_apply') !!}</a>
					</div>
				</div>
				<p class="mt-3">
					<img src="{{ asset_no_cache('img/dropbox.svg') }}" style="width: 20px;" class="mr-1">
					<img src="{{ asset_no_cache('img/google-drive.svg') }}" style="width: 20px;" class="mr-1">
					{!! __('pages/careers.links_description') !!}
				</p>
			</div>
		</section>

		@include('common.pages.partials.try_now_section')
	</div>
	<!-- Body or container-fluid -->

	@include('components.footer.main')
@endsection
