@push('ejs-templates')
	<script type="text/ejs" id="{{ str_replace('_', '-', $name) }}-modal-template">
		@include('ejs.modals.' . str_replace('-', '_', $name) . '_modal')
	</script>
@endpush

{{--
	@push('scripts')
		<script src="{{ asset_no_cache('/js/modals/' . str_replace('-', '_', $name) . '.modal.js') }}"></script>
	@endpush
--}}