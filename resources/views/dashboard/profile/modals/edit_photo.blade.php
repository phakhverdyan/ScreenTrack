@push('styles')
    <link rel="stylesheet" href="{{ asset_no_cache('css/vendor/croppie.css') }}">
@endpush
@push('scripts')
    <script src="{{ asset('js/vendor/croppie.min.js') }}"></script>
    <script>
        $(function () {
            $form = $('#photo-upload');

            $('#file-upload-input').change(function () {
                event.preventDefault();

                var $button =  $('#upload-photo');

                if ($button.hasClass('is-loading')) {
                    return;
                }

                $button.addClass('is-loading disabled');

                $('#crop').croppie('destroy');

                var fd = new FormData();
                var files = $('#file-upload-input')[0].files[0];
                fd.append('user_image[file]',files);

                request({
                    method: 'POST',
                    url: '/users/me/image/update',
                    data: fd,
                    contentType: false,
                    processData: false,
                }, function(response) {
                    $('#validation-error').hide();
                    $button.removeClass('is-loading disabled');
                    $button.text("{{ __('dashboard/profile.choose_another_photo') }}");

                    if (response.error) {
                        if (response.error == 'Validation') {
                            for(var key in response.validation_fields){
                                $('#validation-error').text(response.validation_fields[key][0]).show();
                            }
                            return;
                        }

                        $.notify(response.error, 'error');
                        return;
                    }

                    $('#crop').croppie('destroy');
                    $('#crop').croppie({
                        url: response.data.urls.original,
                        viewport: { width: 200, height: 200, type: 'square' },
                        boundary: { width: 400, height: 400 },

                    });

                    $.notify("{{ __('dashboard/profile.photo_uploaded') }}", 'success');

                    $('#save-photo').show();
                });
            });

            $('#upload-photo').click(function (event) {
                event.preventDefault();
                $('#file-upload-input').click();
            });

            $('#save-photo').click(function (event) {
                event.preventDefault();

                $(this).addClass('is-loading disabled');

                var crop = $('#crop').croppie('get');

                request({
                    method: 'POST',
                    url: '/users/me/image/update',
                    data: {
                        user_image: {
                            crop_data: {
                                x: crop.points[0],
                                y: crop.points[1],
                                width: crop.points[2] - crop.points[0],
                                height: crop.points[3] - crop.points[1],
                            }
                        }
                    },
                }, function(response) {

                    if (response.error) {
                        $.notify(response.error, 'error');
                        return;
                    }

                    $.notify("{{ __('dashboard/profile.photo_saved') }}", 'success');

                    window.location.href = "/dashboard/profile/edit";

                });
            });
        });
    </script>
@endpush
<!-- Add New Card Modal -->
<div class="modal fade" id="edit-photo-modal" tabindex="-1" role="dialog"
     aria-labelledby="add-new-card" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="add-new-card">{{ __('dashboard/profile.upload_photo') }}</h5>
                <button type="button" class="close" data-dismiss="modal"
                        aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form action="" id="photo-upload" enctype="multipart/form-data">
                    <div class="form-group text-center">
                        <label for="credit-card">
                        </label>
                        <div id="crop"></div>
                        <input id="file-upload-input" type="file" style="display: none" name="files[]" multiple="">
                        <div id="validation-error" class="invalid-feedback"></div>
                        <br/>
                       <button id="upload-photo" class="btn btn-primary">{{ __('dashboard/profile.choose_photo_from_p_c') }}</button>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary"
                        data-dismiss="modal">{{ __('dashboard/profile.cancel') }}</button>
                <button style="display: none" id="save-photo" type="button" class="btn btn-primary">{{ __('dashboard/profile.save') }}</button>
            </div>
        </div>
    </div>
</div>
<!-- / Add New Card Modal -->