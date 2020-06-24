@extends('layouts.main_layout')

@push('styles')
    <link rel="stylesheet" type="text/css" href="{{ asset_no_cache('/css/setup.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/css/bootstrap-select.css" />
@endpush

@push('scripts')
    <script>
        $(function() {
            var $continue_button = $('#continue');
            var $skip_button = $('#skip');
            var $form = $('.create-project__form');

            $('#add-project').click(function (event) {
                event.preventDefault();
                var new_project_html = $('#new-project-item').clone().html();
                var $new_project = $(new_project_html);
                $(this).parent().before($new_project);
                $new_project.find('input:first').focus();
            });

            $continue_button.click(function (event) {
                event.preventDefault();

                if ($continue_button.hasClass('is-loading')) {
                    return;
                }

                $continue_button.addClass('is-loading disabled');

                request({
                    method: 'POST',
                    url: '/setup/create_projects',
                    data: $form.serialize(),
                }, function(response) {
                    $continue_button.removeClass('is-loading disabled');

                    if (new Validator($form, response).fails()) {
                        return;
                    }

                    if (response.error) {
                        $.notify(response.error);
                        return;
                    }

                    $continue_button.addClass('is-loading disabled');
                    window.location.href = '/setup/add-contacts'
                });
            });

            $skip_button.click(function (event) {
                event.preventDefault();

                if ($skip_button.hasClass('is-loading')) {
                    return;
                }

                $skip_button.addClass('is-loading disabled');

                request({
                    method: 'POST',
                    url: '/setup/create_projects',
                    data: $form.serialize(),
                }, function(response) {
                    $skip_button.removeClass('is-loading disabled');

                    if (response.error) {
                        $.notify(response.error);
                        return;
                    }

                    $skip_button.addClass('is-loading disabled');
                    window.location.href = '/setup/add-contacts';
                });
            });

            $('.create-project__form').find('input, textarea').eq(0).each(function () {
                $(this).focus();
                set_input_carret_at_end(this);
            });
        });
    </script>
@endpush

@section('content')
    @include('components.navbar.setup')

    <!-- Body -->
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6 offset-md-3 d-flex justify-content-center">
                <div class="[ create-project ]">
                    <h2 class="[ create-project__page-title ] text-center">
                        {{ __('setup/create_projects.create_your_projects') }}
                    </h2>
                    <p class="text-center pt-2">{{ __('setup/create_projects.enter_some_of_the_projects_that_you_want_to_use_with_screen_track') }}</p>
                    <form action="" class="[ create-project__form ]">
                        <div class="form-group mt-4">
                            <input name="projects[][name]" data-name="projects.0.name" type="text" class="form-control" value="Project 1" placeholder="{{ __('setup/create_projects.some_project_name') }}">
                            <div class="invalid-feedback"></div>
                        </div>
                        <div class="form-group mt-4">
                            <input name="projects[][name]" data-name="projects.1.name" type="text" class="form-control" value="" placeholder="{{ __('setup/create_projects.some_project_name') }}">
                            <div class="invalid-feedback"></div>
                        </div>
                        <div class="form-group mt-4">
                            <input name="projects[][name]" data-name="projects.2.name" type="text" class="form-control" value="" placeholder="{{ __('setup/create_projects.some_project_name') }}">
                            <div class="invalid-feedback"></div>
                        </div>
                        <div class="form-group mt-4">
                            <a href="#" id="add-project">+ {{ __('setup/create_projects.add_more_projects') }}</a>
                        </div>
                        <div class="form-group mt-4">
                            <button id="continue" class="[ form__button-continue ] btn btn-primary">{{ __('setup/create_projects.continue') }}</button>
                            <button id="skip" class="[ form__button-skip ] btn btn-default">{{ __('setup/create_projects.skip_for_now') }}</button>
                        </div>
                    </form>
                    <span class="collapse" id="new-project-item">
                         <div class="form-group mt-4">
                            <input name="projects[][name]" type="text" class="form-control" placeholder="{{ __('setup/create_projects.some_project_name') }}">
                            <div class="invalid-feedback"></div>
                         </div>
                    </span>
                </div>
            </div>
        </div>
    </div>
    <!-- Body or container-fluid -->
@endsection
