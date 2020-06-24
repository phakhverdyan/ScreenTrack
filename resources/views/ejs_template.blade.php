@push('ejs-templates')
	<script type="text/ejs" id="{{ preg_replace('/[_.]/', '-', $name) }}-template">
		@include('ejs.' . str_replace('-', '_', $name))
	</script>
@endpush