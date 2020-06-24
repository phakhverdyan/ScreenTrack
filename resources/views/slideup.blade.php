@push('ejs-templates')
	<script type="text/ejs" id="{{ str_replace('_', '-', $name) }}-slideup-template">
		@include('ejs.slideups.' . str_replace('-', '_', $name) . '_slideup')
	</script>
@endpush

{{--
	@push('scripts')
		<script src="{{ asset_no_cache('/js/slideups/' . str_replace('-', '_', $name) . '.slideup.js') }}"></script>
	@endpush
--}}