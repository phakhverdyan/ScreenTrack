@if (count($contact_lists))
    <div class="[ col ] col-md-4">
        <select name="contacts[{{ $item_number }}][contact_list_ids][]" class="selectpicker people-list-select" multiple data-live-search="true">
            @foreach($contact_lists as $contact_list)
                <option value="{{ $contact_list->id }}">{{ $contact_list->title }}</option>
            @endforeach
        </select>
    </div>
@endif

@if (count($user_projects))
    <div class="[ col ] col-md-4">
        <select name="contacts[{{ $item_number }}][project_ids][]" class="selectpicker project-select" multiple data-live-search="true">
            @foreach($user_projects as $user_project)
                <option value="{{ $user_project->id }}">{{ $user_project->name }}</option>
            @endforeach
        </select>
    </div>
@endif