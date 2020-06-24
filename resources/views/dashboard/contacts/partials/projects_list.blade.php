<select name="{{ $select_name ?? '' }}" class="project-select {{ $select_additional_class ?? null }} form-control" multiple data-live-search="true" style="margin-right: 20px;">
    @foreach ($projects as $project)
    	<option {{ in_array($project->id, ($selected_ids ?? [])) ? 'selected' : '' }} value="{{ $project->id }}">{{ $project->name }}</option>
    @endforeach
</select>