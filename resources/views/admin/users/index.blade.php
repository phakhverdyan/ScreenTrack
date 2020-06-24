@extends('admin.layout')

@section('content')
	<h1>
		Users ({{ $users->total() }}, <span class="text-success">+{{ $count_of_users_today }}</span>)
	</h1>
	<div>
		<div class="">
			<table class="w-100">
				<thead>
					<th class="p-1">
						<a href="/nexus/users?{{ http_build_query([
							'page' => 1,
						]) }}" class="{{
							request()->input('order') ? 'text-secondary' : ''
						}}">ID</a>
					</th>
					<th class="p-1">Name</th>
					<th class="p-1">Email</th>
					<th class="p-1">
						<a href="/nexus/users?{{ http_build_query([
							'page' => 1,
							'order' => 'total_spent_amount',
						]) }}" class="{{
							request()->input('order') == 'total_spent_amount' ? '' : 'text-secondary'
						}}">Total Spent</a>
					</th>
					<th class="p-1">
						<a href="/nexus/users?{{ http_build_query([
							'page' => 1,
							'order' => 'total_earned_amount',
						]) }}" class="{{
							request()->input('order') == 'total_earned_amount' ? '' : 'text-secondary'
						}}">Total Earned</a>
					</th>
					<th class="p-1">Created At</th>
				</thead>
				<tbody>
					@foreach ($users as $user)
						<tr>
							<td class="p-1">#{{ $user->id }}</td>
							<td class="p-1">
								<div class="d-flex align-items-center">
									<img src="{{ asset_no_cache('img/countries/flags/' . ($user->country_code ?? '_') . '.png') }}" title="{{ $user->locality->full_address ?? 'Unknown Country' }}">
									<span class="ml-1">{{ $user->title }}</span>
									@if ($user->count_of_companies > 0)
										<span class="ml-1 badge badge-info">Companies: {{ $user->count_of_companies }}</span>
									@else
										<span class="ml-1 badge badge-success">Freelancer</span>
									@endif
									@if ($user->ad_campaign_id)
										<span class="ml-1 badge badge-warning">Ad Campaign: {{ $user->ad_campaign_id }}</span>
									@endif
								</div>
								@if ($user->professional_title)
									<span class="d-block text-secondary" style="font-size: 14px;">
										{{ $user->professional_title }}
									</span>
								@endif
								@if ($user->phone_number)
									<a href="tel:{{ $user->international_phone_number }}" class="d-block text-secondary" style="font-size: 14px;">
										Phone: {{ $user->international_phone_number }}
									</a>
								@endif
								@if ($user->skype)
									<a href="skype:{{ $user->skype }}" class="d-block text-secondary" style="font-size: 14px;">
										Skype: {{ $user->skype }}
									</a>
								@endif
								@if ($user->companies->count() > 0)
									@foreach ($user->companies as $company)
										<div class="text-nowrap text-secondary" style="font-size: 14px;" title="This User owns This Company">
											<span>Company #{{ $company->id }}:</span>
											<b>{{ $company->name }}</b>,
											<a href="tel:{{ $company->international_phone_number }}" class="text-secondary">
												Phone: {{ $company->international_phone_number }}
											</a>
										</div>
									@endforeach
								@endif
							</td>
							<td class="p-1">{{ $user->email }}</td>
							<td class="p-1">${{ number_format($user->total_spent_amount, 2) }}</td>
							<td class="p-1">${{ number_format($user->total_earned_amount, 2) }}</td>
							<td class="p-1">{{ $user->created_at->setTimezone('America/New_York')->format('M j, Y \a\t h:i A') }}</td>
						</tr>
						@if ($user->tier1_referral_connection)
							<tr>
								<td></td>
								<td colspan="2">
									<div class="align-self-center d-inline-flex flex-1 mb-0" style="padding-left: 3px; vertical-align: top;">
										<small class="d-flex align-items-center">
											<img src="{{ asset_no_cache('img/up-right-arrow.svg') }}" style="width: 16px; height: 16px; transform: rotateZ(-82deg); margin-top: -7px; margin-right: 5px; margin-left: 5px; opacity: 0.3;">
											<span class="text-secondary">Referred by</span>
											<img src="{{ asset_no_cache('/img/countries/flags/' . ($user->tier1_referral_connection->referrer_user->country_code ?? '_') . '.png') }}" style="width: 16px;" title="{{ $user->tier1_referral_connection->referrer_user->country->name ?? 'Unknown Country' }}" class="mx-2">
											<b>{{ $user->tier1_referral_connection->referrer_user->short_title }}</b>
											<span class="ml-1">(ID: {{ $user->tier1_referral_connection->referrer_user->id }})</span>
											<span class="text-secondary ml-1">
												● {{ $user->tier1_referral_connection->created_at->diffForHumans() }}
											</span>
										</small>
									</div>
									@if ($user->tier2_referral_connection)
										<div class="align-self-center d-inline-flex flex-1 mb-0" style="vertical-align: top;">
											<small class="d-flex align-items-center">
												<img src="{{ asset_no_cache('img/left-long-arrow.svg') }}" style="width: 16px; height: 16px; margin-right: 5px; margin-left: 5px; opacity: 0.3;">
												<span class="text-secondary">Referred by</span>
												<img src="{{ asset_no_cache('/img/countries/flags/' . ($user->tier2_referral_connection->referrer_user->country_code ?? '_') . '.png') }}" style="width: 16px;" title="{{ $user->tier2_referral_connection->referrer_user->country->name ?? 'Unknown Country' }}" class="mx-2">
												<b>{{ $user->tier2_referral_connection->referrer_user->short_title }}</b>
												<span class="ml-1">(ID: {{ $user->tier2_referral_connection->referrer_user->id }})</span>
												<span class="text-secondary ml-1">
													● {{ $user->tier2_referral_connection->created_at->diffForHumans() }}
												</span>
											</small>
										</div>
									@endif
								</td>
								<td colspan="3"></td>
							</tr>
						@endif
					@endforeach
				</tbody>
			</table>
			<div class="mt-3">{{ $users->appends(request()->input())->links() }}</div>
		</div>
	</div>
@endsection
