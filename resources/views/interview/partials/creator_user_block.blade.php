<p><img src="{{ $creator_user['photo'] }}" alt="" width="100" height="100" class="rounded-circle"></p>
<p class="mb-3 h4">{{ $creator_user['full_name'] }}</p>
<p class="h5 mb-3"><img src="{{ asset('/img/countries/flags/'. $creator_user['country_code'].'.png') }}" alt="" width="20"> {{ $creator_user['location'] }}</p>
