@push('scripts')
    <script>
        $(function () {
            var $form = $('#payout-method-form');
            var $form_submit_button = $('button#add_payout_method');

            $form_submit_button.click(function(event) {
                event.preventDefault();
                $form_submit_button.addClass('is-loading disabled');
                Validator.clear($form);

                request({
                    method: 'POST',
                    url: '/payout_methods/create',
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

                    $.notify('Payout method added', 'success');
                    $form_submit_button.addClass('is-loading disabled');
                    window.location.href = '/dashboard/billing';
                });
            });
        });
    </script>
@endpush

<!-- Add New Card Modal -->
<div class="modal fade" id="add-new-payout-method" tabindex="-1" role="dialog" aria-labelledby="add-new-payout-method" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="add-new-payout-method">Add new payout method</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form action="" id="payout-method-form">
                    <div class="form-row">
                        <div class="col-md-6">
                            <div class="[ checkbox-payment ] form-check">
                                <input name="payout_method[type]" value="PAYONEER" checked class="form-check-input" type="radio">
                                <label class="form-check-label">
                                    <img class="[ checkbox-payment__image ]" src="/img/dashboard/payoneer.svg" alt="" style="width: 50px;">
                                </label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="[ checkbox-payment ] radio">
                                <input name="payout_method[type]" value="PAYPAL" type="radio">
                                <img class="[ checkbox-payment__image ]" src="/img/dashboard/paypal.svg" alt="" style="width: 50px;">
                                <p class="[ checkbox-payment__name ]"></p>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" name="payout_method[identifier]" data-name="payout_method.identifier" placeholder="Enter your payout email">
                        <div class="invalid-feedback"></div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button id="add_payout_method" type="button" class="btn btn-primary">Add Payout Method</button>
            </div>
        </div>
    </div>
</div>
<!-- / Add New Card Modal -->