@foreach($languages as $current_language)
    <option {{ $selected_language_code == $current_language->code ? 'selected' : '' }} value="{{ $current_language->code }}">
    	{{ $current_language->name }} ({{ $current_language->native_name }})
    </option>
@endforeach

