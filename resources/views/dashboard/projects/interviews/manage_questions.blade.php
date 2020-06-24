@extends('dashboard.layout')

@push('scripts')
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
    <script>
        $(function () {
            var interview_id = parseInt('{{ $interview->id }}');

            $('#show-add-question-modal').click(function(event) {
                event.preventDefault();

                $('#question-modal').html(template('question', {
                    title: "{{ __('dashboard/interviews.create_question') }}",
                    button: "{{ __('dashboard/interviews.create') }}",
                    url: '/projects/interviews/questions/create',

                    question: {
                        title: '',
                        details: '',
                    },
                }));

                $('#question-modal').modal('show');
            });

            $('.show-edit-question-modal').click(function(event) {
                event.preventDefault();

                var question_id = $(this).data('id');

                $('#question-modal').html(template('question', {
                    title: "{{ __('dashboard/interviews.edit_question') }}",
                    button: "{{ __('dashboard/interviews.save') }}",
                    url: '/projects/interviews/questions/' + question_id + '/update',
                    question: $(this).data('question'),
                }));

                $('#question-modal').modal('show');
            });

            $('.delete-question').click(function(event) {
                event.preventDefault();
                var question_id = $(this).data('id');

                modals.confirm_action({
                    question: "{{ __('dashboard/interviews.you_really_want_to_delete_this_question_from_interview') }}",

                    confirm: function (callback) {
                        request({
                            method: 'GET',
                            url: '/projects/interviews/questions/' + question_id + '/delete',
                        }, function (response) {
                            if (response.error) {
                                $.notify(response.error);
                                return;
                            }

                            $.notify("{{ __('dashboard/interviews.deleted') }}", 'success');
                            $('tr.question-item[data-id="' + question_id + '"]').hide();
                            return callback && callback();
                        });
                    },
                });
            });

            $('#sortable').sortable({
                axis: 'y',

                update: function(event, ui) {
                    var data = $("#sortable").sortable("serialize");
                    console.log(data);

                    request({
                        method: 'POST',
                        url: '/projects/interviews/' + interview_id + '/questions/update_positions',
                        data: data,
                    }, function(response) {
                        if (response.error) {
                            $.notify(response.error);
                            return;
                        }

                        $.notify("{{ __('dashboard.contacts.updated') }}", 'success');
                    });
                }
            });
        });
    </script>
@endpush

@section('content')
    <section class="container py-5">
        <div class="row">
            <div class="col-md-12">
                <div class=""><h4>{{ __('dashboard/interviews.manage_interview_s_questions_for') }} : {{ $interview->title }}</h4></div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <a href="/dashboard/projects/{{ $interview->project->id }}/interviews" class="btn btn-primary float-left my-1">
                    < {{ __('dashboard/interviews.back_to_interviews') }}
                </a>
            </div>

            <div class="col-md-6">
                <button id="show-add-question-modal" class="btn btn-primary float-right my-1">
                    {{ __('dashboard/interviews.add_question') }}
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <table class="table">
                    <tbody id="sortable">
                    @forelse ($interview->questions as $question)
                        <tr id="interview_questions[positions]-{{ $question->id }}" class="question-item" data-id="{{ $question->id }}">
                            <td>
                                <a href="">
                                    <img height="30px" src="{{ asset_no_cache('/img/move-option.svg') }}">
                                </a>
                            </td>
                            <td>{{ $question->title }}</td>
                            <td>
                                <a href="#" data-id="{{ $question->id }}" data-question="{{ $question->toJson() }}" class="show-edit-question-modal">
                                    <img height="30px" src="{{ asset_no_cache('/img/pencil-edit-button.svg') }}">
                                </a>
                            </td>
                            <td>
                                <a href="#" data-id="{{ $question->id }}" class="delete-question">
                                    <img height="30px" src="{{ asset_no_cache('/img/rubbish-bin.svg') }}">
                                </a>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td class="text-center">
                               {{ __('dashboard/interviews.you_don_t_have_any_questions_for_this_interview_yet') }}
                            </td>
                        </tr>
                    @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </section>
    
    @include('dashboard.projects.interviews.modals.create_or_edit_question')
@endsection
