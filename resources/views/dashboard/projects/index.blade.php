@extends('dashboard.layout')

@push('scripts')
    <script>
        $(function() {
            $('.delete-project').click(function () {
                var project_id = $(this).data('id');

                modals.confirm_action({
                    question: "{{ __('dashboard/projects.you_really_want_to_delete_this_project') }}",
                    confirm: function (callback) {
                        request({
                            method: 'GET',
                            url: '/projects/'+project_id+'/delete',
                        }, function(response) {
                            if (response.error) {
                                $.notify(response.error);
                                return;
                            }

                            $.notify("{{ __('dashboard/projects.deleted') }}",'success');

                            window.location.href = '/dashboard/projects/';
                        });

                        return callback && callback();
                    },
                });

                return false;
            });
        });
    </script>
@endpush

@section('content')
    <section class="container py-5">
        <div class="row">
            <div class="col-md-8">
                <h3 class="[ page-title ]">{{ __('dashboard/projects.projects') }}</h3>
                <ul class="nav nav-tabs" style="justify-content: left;">
                    <li class="nav-item">
                        <a href="" data-target="#all-projects-tab" data-toggle="tab" class="nav-link small text-uppercase d-flex align-items-center active">
                            {{ __('dashboard/projects.all') }}
                            <span class="float-right badge badge-pill badge-dark ml-2">{{ count($user->projects) }}</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="" data-target="#own-projects-tab" data-toggle="tab" class="nav-link small text-uppercase d-flex align-items-center">
                            {{ __('dashboard/projects.own') }}
                            <span class="float-right badge badge-pill badge-dark ml-2">{{ count($user->own_projects) }}</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="" data-target="#joint-projects-tab" data-toggle="tab" class="nav-link small text-uppercase d-flex align-items-center">
                            {{ __('dashboard/projects.joined') }}
                            <span class="float-right badge badge-pill badge-dark ml-2">{{ count($user->joined_projects) }}</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="col-md-4 mt-4">
                <a href="{{ route('dashboard.projects.create') }}" class="btn btn-primary float-right">{{ __('dashboard/projects.create_project') }}</a>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="tab-content">
                    <div id="all-projects-tab" class="tab-pane active">
                        <div class="row">
                            <div class="col-md-12">
                                <table class="table">
                                    <tbody>
                                        @forelse ($user->projects as $current_project)
                                            <tr>
                                                <td>
                                                    <a href="/dashboard/projects/{{$current_project->id}}">
                                                        {{ $current_project->name }}
                                                        @if (isset($current_project->related_company->name))
                                                        ({{ $current_project->related_company->name }})
                                                        @endif
                                                    </a>
                                                </td>
                                                <td>{{ $current_project->created_at->diffForHumans() }}</td>
                                                @if ($current_project->owner_user_id == $user->id)
                                                    <td>
                                                        <a href="{{ route('dashboard.project.edit', $current_project->id) }}">
                                                            <img height="30px" src="{{ asset_no_cache('/img/pencil-edit-button.svg') }}">
                                                        </a>
                                                    </td>
                                                    <td>
                                                        <a class="delete-project" data-id="{{ $current_project->id }}">
                                                            <img height="30px" src="{{ asset_no_cache('/img/rubbish-bin.svg') }}">
                                                        </a>
                                                    </td>
                                                @else
                                                    <td>
                                                    </td>
                                                    <td>
                                                    </td>
                                                @endif
                                            </tr>
                                        @empty
                                            <tr>
                                                <td style="text-align: center">{{ __('dashboard/projects.you_don_t_have_any_project_yet') }}</td>
                                            </tr>
                                        @endforelse
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div id="own-projects-tab" class="tab-pane fade show">
                        <div class="row">
                            <div class="col-md-12">
                                <table class="table">
                                    <tbody>
                                        @forelse ($user->own_projects as $current_project)
                                            <tr>
                                                <td>
                                                    <a href="/dashboard/projects/{{$current_project->id}}">
                                                        {{ $current_project->name }}
                                                        @if (isset($current_project->related_company->name))
                                                            ({{ $current_project->related_company->name }})
                                                        @endif
                                                    </a>
                                                </td>
                                                <td>{{ $current_project->created_at->diffForHumans() }}</td>
                                                <td></td>
                                                <td>
                                                    <a href="{{ route('dashboard.project.edit', $current_project->id) }}">
                                                        <img height="30px" src="{{ asset_no_cache('/img/pencil-edit-button.svg') }}">
                                                    </a>
                                                </td>
                                                <td>
                                                    <a class="delete-project" data-id="{{ $current_project->id }}">
                                                        <img height="30px" src="{{ asset_no_cache('/img/rubbish-bin.svg') }}">
                                                    </a>
                                                </td>
                                            </tr>
                                        @empty
                                            <tr>
                                                <td style="text-align: center">
                                                    {{ __('dashboard/projects.you_don_t_have_your_own_projects_yet') }}
                                                </td>
                                            </tr>
                                        @endforelse
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div id="joint-projects-tab" class="tab-pane fade">
                        <div class="row">
                            <div class="col-md-12">
                                <table class="table">
                                    <tbody>
                                        @forelse ($user->joined_projects as $current_project)
                                            <tr>
                                                <td>
                                                    <a href="/dashboard/projects/{{$current_project->id}}">
                                                        {{ $current_project->name }}
                                                        @if (isset($current_project->related_company->name))
                                                            ({{ $current_project->related_company->name }})
                                                        @endif
                                                    </a>
                                                </td>
                                                <td>{{ $current_project->created_at->diffForHumans() }}</td>
                                            </tr>
                                        @empty
                                            <tr>
                                                <td style="text-align: center">{{ __('dashboard/projects.you_didn_t_join_any_projects_yet') }}</td>
                                            </tr>
                                        @endforelse
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
