<select name="" data-id="{{ $member->id ?? null }}" class="project-select form-control member-role-select" style="margin-right: 20px;">
    @foreach ($all_roles as $role_key => $role)
		{{ print_r($all_roles) }}
    	<option {{ ($member->role ?? null) == $role_key ? 'selected' : '' }} value="{{ $role_key }}">{{ $role['title'] ?? '' }}</option>
    @endforeach
</select>