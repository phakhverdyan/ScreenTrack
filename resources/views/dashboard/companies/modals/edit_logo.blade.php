@push('styles')
    <link rel="stylesheet" href="{{ asset_no_cache('css/vendor/croppie.css') }}">
@endpush

@push('scripts')
    <script src="{{ asset('js/vendor/croppie.min.js') }}"></script>
    <script>
        $(function () {
            $(function () {
                $form = $('#logo-upload');

                $('#file-upload-input').change(function () {
                    event.preventDefault();

                    var $button =  $('#upload-logo');

                    if ($button.hasClass('is-loading')) {
                        return;
                    }

                    $button.addClass('is-loading disabled');

                    $('#crop').croppie('destroy');

                    var fd = new FormData();
                    var files = $('#file-upload-input')[0].files[0];
                    fd.append('company_image[file]',files);

                    var url = '/company_images/create';
                    if ($("#company-logo").data('loaded') == 1) {
                        var image_key =  $('#company-logo').attr('data-key');
                        url =  '/company_images/'+image_key+'/update';
                    }

                    request({
                        method: 'POST',
                        url: url,
                        data: fd,
                        contentType: false,
                        processData: false,
                    }, function(response) {
                        $('#validation-error').hide();
                        $button.removeClass('is-loading disabled');
                        $button.text("{{ __('dashboard/companies.choose_another_logo') }}");

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

                        $('#company-no-logo').hide();
                        $('#company-logo').attr('src',response.data.urls.small);
                        $('#company-logo').attr('data-key',response.data.key);
                        $('#company-logo-input').val(response.data.key);

                        $('#load-logo').text("{{ __('dashboard/companies.change_logo') }}");
                        $('#save-logo').show();
                    });
                });

                $('#upload-logo').click(function (event) {
                    event.preventDefault();
                    $('#file-upload-input').click();
                });

                $('#save-logo').click(function (event) {
                    event.preventDefault();

                    $button = $(this);

                    $button.addClass('is-loading disabled');

                    var crop = $('#crop').croppie('get');

                    var image_key =  $('#company-logo').attr('data-key');

                    request({
                        method: 'POST',
                        url: '/company_images/'+image_key+'/update',
                        data: {
                            company_image: {
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

                        $button.removeClass('is-loading disabled');

                        $('#company-logo').attr('src',response.data.urls.small);

                        $('#edit-logo-modal').modal('hide');

                    });
                });
            });
        });
    </script>
@endpush

<!-- Add New Card Modal -->
<div class="modal fade" id="edit-logo-modal" tabindex="-1" role="dialog"
     aria-labelledby="add-new-card" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="add-new-card">{{ __('dashboard/companies.upload_logo') }}</h5>
                <button type="button" class="close" data-dismiss="modal"
                        aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form action="" id="logo-upload" enctype="multipart/form-data">
                    <div class="form-group text-center">
                        <label for="credit-card">
                        </label>
                        <div id="crop"></div>
                        <input id="file-upload-input" type="file" style="display: none" name="files[]" multiple="">
                        <div id="validation-error" class="invalid-feedback"></div>
                        <br/>
                       <button id="upload-logo" class="btn btn-primary">{{ __('dashboard/companies.choose_logo_from_pc') }}</button>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary"
                        data-dismiss="modal">{{ __('dashboard/companies.cancel') }}</button>
                <button style="display: none" id="save-logo" type="button" class="btn btn-primary">{{ __('dashboard/companies.ok') }}</button>
            </div>
        </div>
    </div>
</div>
<!-- / Add New Card Modal -->