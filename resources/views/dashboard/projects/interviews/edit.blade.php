@extends('dashboard.layout')
@push('scripts')
<script>
    $(function () {
        var interview_id = {{ $interview->id }};
        var project_id = {{ $interview->project->id }};

        var $form = $('#project-interview-form');
        var $form_submit_button = $('button#save-project-interview');

        $form_submit_button.click(function(event) {
            event.preventDefault();

            $form_submit_button.addClass('is-loading disabled');
            Validator.clear($form);

            request({
                method: 'POST',
                url: '/projects/interviews/'+interview_id+'/update',
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

                $.notify("{{ __('dashboard/interviews.updated') }}", 'success');

                $form_submit_button.addClass('is-loading disabled');

                window.location.href = '/dashboard/projects/'+project_id+'/interviews';
            });
        });
    });
</script>
@endpush
@section('content')
<section class="container py-5">
    <div class="row">
        <div class="col-md-6">
            <a href="/dashboard/projects/{{ $interview->project->id }}/interviews" class="btn btn-primary float-left my-1">< {{__('dashboard/interviews.back_to_interviews')}}</a>
        </div>
        <div class="col-md-6">
        </div>
    </div>
    <form id="project-interview-form" class="">
        <div class="row">
            <div class="col-md-6">
                <h3>{{ __('dashboard/interviews.interview_detail_and_questions') }}</h3>
                <div class="form-group">
                    <input value="{{ $interview->title }}" name="project_interview[title]" data-name="project_interview.title" type="text" class="form-control" placeholder="{{ __('dashboard/interviews.interview_title') }}">
                    <div class="invalid-feedback"></div>
                </div>
            </div>
            <div class="col-md-6">

            </div>
        </div>
        <div class="row">

            <div class="col-md-6">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <input type="text" value="{{ $interview->hourly_rate }}" name="project_interview[hourly_rate]" data-name="project_interview.hourly_rate" class="form-control" placeholder="{{ __('dashboard/interviews.salary_per_hour') }}">
                            <div class="invalid-feedback"></div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <input type="text" value="{{ $interview->notification_email }}" name="project_interview[notification_email]" data-name="project_interview.notification_email" class="form-control" placeholder="{{ __('dashboard/interviews.notification_email_to') }}">
                            <div class="invalid-feedback"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6">

            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <textarea name="project_interview[description]" data-name="project_interview.description" class="form-control" placeholder="{{ __('dashboard/interviews.interview_description') }}">{{ $interview->description }}</textarea>
                    <div class="invalid-feedback"></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <textarea name="project_interview[thank_you_message]" data-name="project_interview.thank_you_message"  class="form-control" placeholder="{{ __('dashboard/interviews.thank_you_message') }}">{{ $interview->thank_you_message }}</textarea>
                    <div class="invalid-feedback"></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6"></div>
            <div class="col-md-6">
                <button id="save-project-interview" class="btn btn-primary float-right">{{ __('dashboard/interviews.save_interview') }}</button>
            </div>
        </div>
    </form>
</section>
@endsection
