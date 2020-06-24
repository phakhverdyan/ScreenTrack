<ul class="[  ] nav nav-tabs">
    <li class="nav-item">
        <a href="{{ route('dashboard.earnings.progress') }}" class="nav-link {{ request()->route()->named('dashboard.earnings.progress') ? 'active' : '' }}">
            {!! __('dashboard/earnings.progress') !!} <span class="badge badge-primary">${{ $earning_amounts->progress }}</span>
        </a>
    </li>
    <li class="nav-item">
        <a href="{{ route('dashboard.earnings.review') }}" class="nav-link {{ request()->route()->named('dashboard.earnings.review') ? 'active' : '' }}">
            {!! __('dashboard/earnings.review') !!} <span class="badge badge-warning">${{ $earning_amounts->review }}</span>
        </a>
    </li>
    <li class="nav-item">
        <a href="{{ route('dashboard.earnings.escrow') }}" class="nav-link {{ request()->route()->named('dashboard.earnings.escrow') ? 'active' : '' }}">
            {!! __('dashboard/earnings.escrow') !!} <span class="badge badge-secondary">${{ $earning_amounts->escrow }}</span>
        </a>
    </li>
    <li class="nav-item">
        <a href="{{ route('dashboard.earnings.available') }}" class="nav-link {{ request()->route()->named('dashboard.earnings.available') ? 'active' : '' }}">
            {!! __('dashboard/earnings.available') !!} <span class="badge badge-success">${{ $earning_amounts->available }}</span>
        </a>
    </li>
    <li class="nav-item">
        <a href="{{ route('dashboard.earnings.paid') }}" class="nav-link {{ request()->route()->named('dashboard.earnings.paid') ? 'active' : '' }}">
            {!! __('dashboard/earnings.paid') !!}
        </a>
    </li>
</ul>
