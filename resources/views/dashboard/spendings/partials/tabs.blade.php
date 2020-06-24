<ul class="[  ] nav nav-tabs">
    <li class="nav-item">
        <a href="{{ route('dashboard.spendings.progress') }}" class="nav-link {{ request()->route()->named('dashboard.spendings.progress') ? 'active' : '' }}">
            {!! __('dashboard/spendings.progress') !!} <span class="badge badge-primary">${{ $spending_amounts->progress }}</span>
        </a>
    </li>
    <li class="nav-item">
        <a href="{{ route('dashboard.spendings.review') }}" class="nav-link {{ request()->route()->named('dashboard.spendings.review') ? 'active' : '' }}">
            {!! __('dashboard/spendings.review') !!} <span class="badge badge-warning">${{ $spending_amounts->review }}</span>
        </a>
    </li>
    <li class="nav-item">
        <a href="{{ route('dashboard.spendings.escrow') }}" class="nav-link {{ request()->route()->named('dashboard.spendings.escrow') ? 'active' : '' }}">
            {!! __('dashboard/spendings.escrow') !!} <span class="badge badge-secondary">${{ $spending_amounts->escrow }}</span>
        </a>
    </li>
    <li class="nav-item">
        <a href="{{ route('dashboard.spendings.paid') }}" class="nav-link {{ request()->route()->named('dashboard.spendings.paid') ? 'active' : '' }}">
            {!! __('dashboard/spendings.paid') !!} <span class="badge badge-success">${{ $spending_amounts->paid }}</span>
        </a>
    </li>
</ul>
