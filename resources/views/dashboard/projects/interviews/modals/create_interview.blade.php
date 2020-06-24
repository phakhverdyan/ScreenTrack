@push('scripts')
    <script>
        $(function () {
            var $form = $('#create-interview-form');
            var $form_submit_button = $('button#create-interview-submit');

            $form_submit_button.click(function(event) {
                event.preventDefault();

                $form_submit_button.addClass('is-loading disabled');
                Validator.clear($form);

                request({
                    method: 'POST',
                    url: '/projects/interviews/create',
                    data: $form.serialize() + '&project_interview[project_id]='+project_id,
                }, function(response) {
                    $form_submit_button.removeClass('is-loading disabled');

                    if (new Validator($form, response).fails()) {
                        return;
                    }

                    if (response.error) {
                        $.notify(response.error, 'error');
                        return;
                    }

                    $.notify("{{ __('dashboard/interviews.interview_created') }}", 'success');

                    $form_submit_button.addClass('is-loading disabled');

                    window.location.href = '/dashboard/projects/'+project_id+'/interviews/';
                });
            });
        });
    </script>
@endpush
<!-- Add New Card Modal -->
<div class="modal fade" id="create-interview-modal" tabindex="-1" role="dialog"
     aria-labelledby="add-new-card" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="add-new-card">{{ __('dashboard/interviews.create_interview') }}</h5>
                <button type="button" class="close" data-dismiss="modal"
                        aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form action="" id="create-interview-form">
                    <div class="form-group">
                        <label for="credit-card">
                           {{ __('dashboard/interviews.interview_title') }}
                        </label>
                        <input type="text" class="form-control" name="project_interview[title]" value="" placeholder="{{ __('dashboard/interviews.type_interview_name') }}">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary"
                        data-dismiss="modal">{{ __('dashboard/interviews.cancel') }}</button>
                <button id="create-interview-submit" type="button" class="btn btn-primary">{{ __('dashboard/interviews.create') }}</button>
            </div>
        </div>
    </div>
</div>
<!-- / Add New Card Modal -->