@push('scripts')
    <script>
        $('#create-contact').click(function () {
            var $form = $('form#new-contact');
            var $form_submit_button = $(this);

            if ($form_submit_button.hasClass('is-loading')) {
                return;
            }

            $form_submit_button.addClass('is-loading disabled');

            request({
                method: 'GET',
                url: '/contacts/create',
                data: $form.serialize(),
            }, function(response) {
                $form_submit_button.removeClass('is-loading disabled');

                if (new Validator($form, response).fails()) {
                    return;
                }

                if (response.error) {
                    $.notify(response.error);
                    return;
                }

                $.notify("{{__('dashboard/contacts.saved')}}", 'success');

                setTimeout(function() {
                    window.location.href = '/dashboard/contacts';
                }, 1000);
            });

            return false;
        });
    </script>
@endpush

<!-- Add New Contact -->
<div class="modal fade" id="add-new-contact" tabindex="-1" role="dialog"
     aria-labelledby="add-new-contact" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="add-new-contact">{{ __('dashboard/contacts.add_new_contact') }}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="new-contact" action="">
                    <div class="form-group">
                        <label>{{ __('dashboard/contacts.contact_email') }}</label>
                        <input name="contact[email]" data-name="contact.email" type="text" class="form-control" placeholder="{{ __('dashboard/contacts.type_user_email_address') }}">
                        <div class="invalid-feedback"></div>
                    </div>
                    <div class="form-group">
                        <label>{{ __('dashboard/contacts.add_contact_to_some_project') }}</label>
                        @include('dashboard/contacts.partials.projects_list', [
                            'projects'=> $user_projects,
                            'select_name' => 'contact[project_ids][]',
                        ])
                    </div>
                    <div class="form-group">
                        <label>{{ __('dashboard/contacts.add_contact_to_some_contact_list') }}</label>
                        @include('dashboard.contacts.partials.contact_lists_list', [
                            'contact_lists'=> $user_contact_lists,
                            'select_name' => 'contact[list_ids][]',
                        ])
                    </div>
                    <button id="create-contact" class="[ list__user-add-new-button ] btn btn-primary">{{ __('dashboard/contacts.add_contact') }}</button>
                </form>
            </div>
            <div class="modal-footer"></div>
        </div>
    </div>
</div>
<!-- / Add New Contact -->