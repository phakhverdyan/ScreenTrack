<select name="{{ $select_name ?? '' }}" data-name="" class="form-control {{ $select_additional_class ?? null }} contact-list-select" id="" multiple data-live-search="true"  style="margin-right: 20px;">
    @foreach($contact_lists as $contact_list)
        <option {{ in_array($contact_list->id, ($selected_ids ?? [])) ? 'selected' : '' }}  value="{{ $contact_list->id }}">{{ $contact_list->title }}</option>
    @endforeach
</select>