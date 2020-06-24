@extends('dashboard.layout')

@push('styles')
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/css/bootstrap-select.css">
@endpush

@push('scripts')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/js/bootstrap-select.min.js"></script>
    <script>
        $(function() {
            $('.selectpicker').selectpicker({ noneSelectedText: "{{ __('dashboard/projects.select_related_company') }}" });
            var project = @json($project ?? null);
            var $form = $('.edit-project__form');
            var $form__submit_button = $form.find('button[type="submit"]');

            $form.submit(function(event) {
                event.preventDefault();

                if ($form__submit_button.hasClass('is-loading')) {
                    return;
                }

                $form__submit_button.addClass('is-loading disabled');

                request({
                    method: 'POST',
                    url: '/projects/' + (project ? project.id + '/update' : 'create'),
                    data: $form.serialize(),
                }, function(response) {
                    $form__submit_button.removeClass('is-loading disabled');

                    if (new Validator($form, response).fails()) {
                        return;
                    }

                    if (response.error) {
                        $.notify(response.error);
                        return;
                    }

                    $.notify("{{ __('dashboard/projects.saved') }}", 'success');
                    window.location.href = "{{ route('dashboard.projects') }}";
                });

                return false;
            });

            $form.find('input, textarea').eq(0).each(function() {
                $(this).focus();
                set_input_carret_at_end(this);
            });
        });
    </script>
@endpush

@section('content')
    <div class="[ edit-profile ]">
        <h3 class="[ page-title ]">{{ $project ?  __('dashboard/projects.edit_project')  :  __('dashboard/projects.create_project') }}</h3>
        <form class="[ edit-project__form ]" autocomplete="off">
            <div class="form-group">
                <div class="form-row">
                    <div class="col-md-12">
                        <label for="project__name">{{ __('dashboard/projects.project_name') }}</label>
                        <input value="{{ $project->name ?? null }}" name="project[name]" data-name="project.name" class="form-control" type="text"  placeholder="{{ __('dashboard/projects.project_name') }}" id="project__name">
                        <div class="invalid-feedback"></div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="form-row">
                    <div class="col-md-12">
                        <label for="project__description">{{ __('dashboard/projects.project_description') }}</label>
                        <textarea name="project[description]" data-name="project.description" class="form-control" id="project__description">{{
                            $project->description ?? null
                        }}</textarea>
                        <div class="invalid-feedback"></div>
                    </div>
                </div>
            </div>
            @if (count($user->companies))
                <div class="form-group">
                    <div class="form-row">
                        <div class="col-md-12">
                            <label for="project__related-company">{{ __('dashboard/projects.related_company') }}</label>
                            <select class="selectpicker form-control" data-live-search="true" title="{{ __('dashboard/projects.select_related_company') }}" name="project[related_company_id]" data-name="project.related_company_id">
                                @foreach($user->companies as $current_company)
                                    <option {{ ($project->related_company_id ?? null) == $current_company->id ? 'selected' : '' }} value="{{ $current_company->id }}">{{ $current_company->name }}</option>
                                @endforeach
                            </select>
                            <div class="invalid-feedback"></div>
                        </div>
                    </div>
                </div>
            @endif
            <div class="form-group">
                <button class="[ save__button ] btn btn-primary form-control" type="submit">{{ $project ?  __('dashboard/projects.edit')  :  __('dashboard/projects.save') }}</button>
            </div>
        </form>
    </div>
@endsection
