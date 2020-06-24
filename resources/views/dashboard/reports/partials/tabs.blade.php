<ul class="[  ] nav nav-tabs">
    <li class="nav-item">
        <a href="{{ route('dashboard.reports.progress') }}" class="nav-link {{ request()->route()->named('dashboard.reports.progress') ? 'active' : '' }}">
            Progress
        </a>
    </li>
    <li class="nav-item">
        <a href="{{ route('dashboard.reports.review') }}" class="nav-link {{ request()->route()->named('dashboard.reports.review') ? 'active' : '' }}">
            Review
        </a>
    </li>
    <li class="nav-item">
        <a href="{{ route('dashboard.reports.escrow') }}" class="nav-link {{ request()->route()->named('dashboard.reports.escrow') ? 'active' : '' }}">
            Escrow
        </a>
    </li>
    <li class="nav-item">
        <a href="{{ route('dashboard.reports.available') }}" class="nav-link {{ request()->route()->named('dashboard.reports.available') ? 'active' : '' }}">
            Available (${{ number_format(floor($available_amount * 100) / 100, 2) }})
        </a>
    </li>
    <li class="nav-item">
        <a href="{{ route('dashboard.reports.paid') }}" class="nav-link {{ request()->route()->named('dashboard.reports.paid') ? 'active' : '' }}">
            Paid
        </a>
    </li>
</ul>