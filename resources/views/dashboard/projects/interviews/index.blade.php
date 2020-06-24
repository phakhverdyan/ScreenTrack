@extends('dashboard.layout')

@push('scripts')
    <script>
        var project_id = parseInt('{{ $project_id }}');

        $(function () {
             $('#create-interview').click(function (event) {
                 event.preventDefault();
                 $('#create-interview-modal').modal('show');
             });

            $('.delete-interview').click(function (event) {
                event.preventDefault();
                var interview_id = $(this).data('id');

                modals.confirm_action({
                    question: "{{ __('dashboard/interviews.you_really_want_to_delete_this_interview') }}",

                    confirm: function (callback) {
                        request({
                            method: 'GET',
                            url: '/projects/interviews/' + interview_id + '/delete',
                        }, function (response) {
                            if (response.error) {
                                $.notify(response.error);
                                return;
                            }

                            $.notify("{{ __('dashboard/interviews.deleted') }}", 'success');
                            $('tr.interview-item[data-id="' + interview_id + '"]').hide();
                            return callback && callback();
                        });
                    },
                });
            });
        });
    </script>
@endpush

@section('content')
    <section class="container py-5">
        <div class="row">
            <div class="col-md-12">
                <h3>{{ __('dashboard/interviews.interviews') }}</h3>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-md-12">
                <a id="create-interview" href="/dashboard/projects/{{ $project_id }}/interviews/create" class="btn btn-primary float-right" onclick="event.preventDefault();">{{ __('dashboard/interviews.add_interview') }}</a>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <table class="table">
                    <tbody>
                    @forelse ($interviews as $interview)
                        <tr class="interview-item" data-id="{{ $interview->id }}">
                            <td>{{ $interview->title }}</td>
                            <td>{{ $interview->created_at->diffForHumans() }}</td>
                            <td>
                                <a target="_blank" href="/interview/{{ $interview->hash }}/start" class="btn btn-secondary">{{ __('dashboard/interviews.link') }}</a>
                                <a href="/dashboard/projects/{{ $project_id }}/interviews/{{ $interview->id }}/questions" class="btn btn-primary">{{ __('dashboard/interviews.manage_questions') }}</a></td>
                            <td>
                                <a href="/dashboard/projects/{{ $project_id }}/interviews/{{ $interview->id }}/edit">
                                    <img height="30px" src="{{ asset_no_cache('/img/pencil-edit-button.svg') }}">
                                </a>
                            </td>

                            <td>
                                <a href="#" class="delete-interview" data-id="{{ $interview->id }}">
                                    <img height="30px" src="{{ asset_no_cache('/img/rubbish-bin.svg') }}">
                                </a>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td class="text-center">{{ __('dashboard/interviews.you_don_t_have_any_interview_in_this_project') }}</td>
                        </tr>
                    @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </section>

@include('dashboard.projects.interviews.modals.create_interview')
@endsection
