@push('ejs-templates')
	<script type="text/ejs" id="{{ str_replace('_', '-', $name) }}-popover-template">
		@include('ejs.popovers.' . str_replace('-', '_', $name) . '_popover')
	</script>
@endpush

{{--
	@push('scripts')
		<script src="{{ asset_no_cache('/js/popovers/' . str_replace('-', '_', $name) . '.popover.js') }}"></script>
	@endpush
--}}