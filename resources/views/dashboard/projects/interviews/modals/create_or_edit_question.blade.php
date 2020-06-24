@push('scripts')
    <script>
        $(function () {
            var interview_id = parseInt('{{ $interview->id }}');
            var project_id = parseInt('{{ $interview->project->id }}');

            $('#question-modal').on('click', 'button#question-submit', function(event) {
                event.preventDefault();
                var $form = $('#create-question-form');
                var $form_submit_button = $('button#question-submit');
                $form_submit_button.addClass('is-loading disabled');
                Validator.clear($form);

                request({
                    method: 'POST',
                    url: $form.attr('action'),
                    data: $form.serialize(),
                }, function(response) {
                    $form_submit_button.removeClass('is-loading disabled');

                    if (new Validator($form, response).fails()) {
                        return;
                    }

                    if (response.error) {
                        $.notify(response.error, 'error');
                        return;
                    }

                    $.notify("{{ __('dashboard/interviews.saved') }}", 'success');
                    $form_submit_button.addClass('is-loading disabled');
                    window.location.href = '/dashboard/projects/' + project_id + '/interviews/' + interview_id + '/questions';
                });
            });
        });
    </script>
@endpush

<!-- Add New Card Modal -->
<div class="modal fade" id="question-modal" tabindex="-1" role="dialog" aria-labelledby="add-new-card" aria-hidden="true"></div>
<!-- / Add New Card Modal -->

@push('ejs-templates')
    <script type="text/ejs" id="question-template">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="add-new-card">
                        <%= title || "{{ __('dashboard/interviews.create_question') }}" %>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" id="question-modal-body">
                    <form action="<%= url %>" id="create-question-form">
                        <input type="hidden" name="interview_question[project_interview_id]" value="{{ $interview->id }}">
                        <div class="form-group">
                            <label>
                                {{ __('dashboard/interviews.question_title') }}
                            </label>
                            <input value="<%= question.title || '' %>" type="text" class="form-control" name="interview_question[title]" data-name="interview_question.title"  placeholder="{{ __('dashboard/interviews.question_title') }}">
                            <div class="invalid-feedback"></div>
                        </div>
                        <div class="form-group">
                            <label>
                                {{ __('dashboard/interviews.question_details') }}
                            </label>
                            <textarea class="form-control" name="interview_question[details]" data-name="interview_question.details" placeholder="{{ __('dashboard/interviews.type_question_details') }}"><%= question.details || '' %></textarea>
                            <div class="invalid-feedback"></div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ __('dashboard/interviews.cancel') }}</button>
                    <button id="question-submit" type="button" class="btn btn-primary"><%= button %></button>
                </div>
            </div>
        </div>
    </script>
@endpush