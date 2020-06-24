<li class="nav-item {{ request()->route()->named('dashboard.project.reports') ? 'active' : '' }} d-none">
    <a class="nav-link" href="{{ route('dashboard.project.reports', $selected_project->id) }}">
        {{ __('dashboard/project_menu.reports_and_screenshots') }} <span class="sr-only">({{ __('dashboard/project_menu.current') }})</span>
    </a>
</li>
<li class="nav-item {{ request()->route()->named('dashboard.project.board') ? 'active' : '' }}">
    <a class="nav-link" href="{{ route('dashboard.project.boards', $selected_project->id) }}">
        {{ __('dashboard/project_menu.boards_and_tasks') }}
    </a>
</li>
<li class="nav-item {{ request()->route()->named('dashboard.project.interviews') ? 'active' : '' }} d-none">
    <a class="nav-link" href="{{ route('dashboard.project.interviews', $selected_project->id) }}">
        {{ __('dashboard/project_menu.interviews') }} <span class="badge badge-primary">{{ $selected_project->count_of_interviews }}</span>
    </a>
</li>
