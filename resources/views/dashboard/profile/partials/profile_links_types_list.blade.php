<select name="user[links][{{ $user_link_index }}][type_key]" data-name="user.links.*.type_key" class="form-control">
    @foreach( \App\Models\User\UserLinkType::all() as $current_user_link_type)
        <option value="{{ $current_user_link_type->key }}" {{ $current_user_link_type->key == $user_link_type_key ? 'selected' : '' }}>
            {{ $current_user_link_type->title }}
        </option>
    @endforeach
</select>
