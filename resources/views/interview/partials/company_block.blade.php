<p><img src="{{ $company['logo'] }}" alt="" width="100" height="100" class="rounded-circle"></p>
<p class="mb-3 h4">{{ $company['name'] }}</p>
<p class="h5 mb-3"><img src="{{ asset('/img/countries/flags/'. $company['country_code'].'.png') }}" alt="" width="20"> {{ $company['location'] }}</p>