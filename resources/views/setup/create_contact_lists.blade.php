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
            var $form = $('.create-team__form');

            $('#add-contact-list').click(function() {
                var new_list_html = $('#new-contact-list-item').clone().html();
                var $new_list = $(new_list_html);
                $(this).parent().before($new_list);
                $new_list.find('input:first').focus();
                return false;
            });

            $continue_button.click(function(event) {
                event.preventDefault();

                if ($continue_button.hasClass('is-loading')) {
                    return;
                }

                $continue_button.addClass('is-loading disabled');

                request({
                    method: 'POST',
                    url: '/setup/create_contact_lists',
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
                    window.location.href = '/setup/create-projects'
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
                    url: '/setup/create_contact_lists',
                    data: $form.serialize(),
                }, function(response) {
                    $skip_button.removeClass('is-loading disabled');

                    if (response.error) {
                        $.notify(response.error);
                        return;
                    }

                    $skip_button.addClass('is-loading disabled');
                    window.location.href = '/setup/create-projects';
                });
            });

            $('.create-team__form').find('input, textarea').eq(0).each(function () {
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
                <div class="[ create-team ]">
                    <h2 class="[ create-team__page-title ] text-center">
                       {{ __('setup/create_contact_lists.lets_add_your_people_lists') }}
                    </h2>
                    <p class="text-center pt-2"> {{ __('setup/create_contact_lists.name_your_people_lists_according_to_their_functions') }}</p>
                    <form class="[ create-team__form ]">
                        <div class="form-group">
                            <input name="contact_lists[][title]" data-name="contact_lists.0.title" type="text" class="form-control" value="{{ __('setup/create_contact_lists.back_end_programmers') }}" placeholder="{{ __('setup/create_contact_lists.lets_write_some_people_list_title') }}">
                            <div class="invalid-feedback"></div>
                        </div>
                        <div class="form-group">
                            <input name="contact_lists[][title]" data-name="contact_lists.1.title" type="text" class="form-control" value="{{ __('setup/create_contact_lists.designers') }}" placeholder="{{ __('setup/create_contact_lists.lets_write_some_people_list_title') }}">
                            <div class="invalid-feedback"></div>
                        </div>
                        <div class="form-group">
                            <input name="contact_lists[][title]" data-name="contact_lists.2.title" type="text" class="form-control" value="{{ __('setup/create_contact_lists.data_entry_agents') }}" placeholder="{{ __('setup/create_contact_lists.lets_write_some_people_list_title') }}">
                            <div class="invalid-feedback"></div>
                        </div>
                        <div class="form-group">
                            <input name="contact_lists[][title]" data-name="contact_lists.3.title" type="text" class="form-control" value=""  placeholder="{{ __('setup/create_contact_lists.lets_write_some_people_list_title') }}">
                            <div class="invalid-feedback"></div>
                        </div>
                        <div class="form-group mt-4">
                            <a id="add-contact-list" href="#" >+ {{ __('setup/create_contact_lists.add_more_contact_lists') }}</a>
                        </div>
                        <div class="form-group mt-4">
                            <button id="continue" class="[ form__button-continue ] btn btn-primary">{{ __('setup/create_contact_lists.continue') }}</button>
                            <button id="skip" class="[ form__button-skip ] btn btn-default">{{ __('setup/create_contact_lists.skip_for_now') }}</button>
                        </div>
                    </form>
                    <span class="collapse" id="new-contact-list-item">
                        <div class="form-group">
                            <input name="contact_lists[][title]" type="text" class="form-control" placeholder="{{ __('setup/create_contact_lists.lets_write_some_people_list_title') }}">
                            <div class="invalid-feedback"></div>
                        </div>
                    </span>
                </div>
            </div>
        </div>
    </div><!-- Body or container-fluid -->
@endsection