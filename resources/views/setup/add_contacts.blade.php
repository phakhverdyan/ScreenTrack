@extends('layouts.main_layout')

@push('styles')
    <link rel="stylesheet" type="text/css" href="{{ asset_no_cache('/css/setup.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/css/bootstrap-select.css">
@endpush

@push('scripts')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/js/bootstrap-select.min.js"></script>
    <script>
        $(function() {
            $('.contact-list-select').selectpicker({ noneSelectedText: 'Select contact lists' });
            $('.project-select').selectpicker({ noneSelectedText: 'Select projects' });

            $('#add-contact').click(function () {
                var new_contact_html = $('#new-contact-item').clone().html();
                var $new_contact = $(new_contact_html);

                //fix for clone selectpicker
                $new_contact.find('.bootstrap-select').replaceWith(function() { return $('select', this); })
                $new_contact .find('.selectpicker').selectpicker('render');
                //endfix

                $(this).parent().before($new_contact);
                $new_contact.find('input:first').focus();
                return false;
            });

            var $continue_button = $('#continue');
            var $skip_button = $('#skip');
            var $form = $('.add-contact-list__form');

            $continue_button.click(function (event) {
                event.preventDefault();

                if ($continue_button.hasClass('is-loading')) {
                    return;
                }

                $continue_button.addClass('is-loading disabled');

                request({
                    method: 'POST',
                    url: '/setup/add_contacts',
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
                    window.location.href = '/dashboard'
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
                    url: '/setup/add_contacts',
                    data: $form.serialize(),
                }, function(response) {
                    $skip_button.removeClass('is-loading disabled');

                    if (response.error) {
                        $.notify(response.error);
                        return;
                    }

                    $skip_button.addClass('is-loading disabled');
                    window.location.href = '/dashboard';
                });
            });

            $('.add-contact-list__form').find('input, textarea').each(function () {
                if (!$(this).val()) {
                    $(this).focus();
                    return false;
                }
            });
        });
    </script>
@endpush

@section('content')
    @include('components.navbar.setup')
    
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6 offset-md-3 d-flex justify-content-center">
                <div class="[ add-contact-list ]">
                    <h2 class="[ add-contact-list__page-title ] text-center">
                       {{ __('setup/add_contacts.youre_almost_with_us') }} <br> {{ __('setup/add_contacts.lets_add_contact') }}
                    </h2>
                    <p class="text-center pt-2">{{ __('setup/add_contacts.we_will_send_invites_to_your_contact_list_members_right_away') }}</p>
                    <form action="" class="[ add-contact-list__form ]">
                        <div class="form-group">
                            <div class="row">
                                <?php
                                    $has_contact_lists = (boolean) count($contact_lists);
                                    $has_projects = (boolean) count($user_projects);

                                    if ($has_contact_lists && $has_projects) {
                                        $md = 4;
                                    } elseif (! $has_contact_lists && ! $has_projects) {
                                        $md = 12;
                                    } else {
                                        $md = 8;
                                    }
                                ?>
                                <div class="[ col ] col-md-{{$md}}">
                                    <input name="contacts[0][email]" type="text"  class="[ form-control ] form-control" placeholder="{{ __('setup/add_contacts.member_email') }}">
                                </div>
                                @include('setup.partials.contact_lists_and_projects_selects', ['item_number' => 0])
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="[ col ] col-md-{{$md}}">
                                    <input name="contacts[1][email]" type="text" class="[ form-control ] form-control" placeholder="{{ __('setup/add_contacts.member_email') }}">
                                </div>
                                @include('setup.partials.contact_lists_and_projects_selects', ['item_number' => 1])
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="[ col ] col-md-{{$md}}">
                                    <input name="contacts[2][email]" type="text" class="[ form-control ] form-control" placeholder="{{ __('setup/add_contacts.member_email') }}">
                                </div>
                                @include('setup.partials.contact_lists_and_projects_selects', ['item_number' => 2])
                            </div>
                        </div>
                        <div class="form-group mt-4">
                            <a href="#" id="add-contact">+ Add more Users</a>
                        </div>
                        <div class="form-group mt-4">
                            <button id="continue" class="[ form__button-continue ] btn btn-primary" type="submit" class="form-control">{{ __('setup/add_contacts.send_and_finish') }}</button>
                            <button id="skip" class="[ form__button-skip ] btn btn-default" type="button" class="form-control">{{ __('setup/add_contacts.skip_for_now') }}</button>
                        </div>
                    </form>
                    <span class="collapse" id="new-contact-item">
                         <div class="form-group">
                            <div class="row">
                                <div class="[ col ] col-md-{{$md}}">
                                    <input name="contacts[*][email]" type="text" class="[ form-control ] form-control" placeholder="{{ __('setup/add_contacts.member_email') }}">
                                </div>
                                @include('setup.partials.contact_lists_and_projects_selects', ['item_number' => '*'])
                            </div>
                        </div>
                    </span>
                </div>
                <!-- / gs-from -->
            </div>
        </div>
    </div><!-- Body or container-fluid -->
@endsection