
@push('styles')
    <link rel="stylesheet" type="text/css" href="{{ asset_no_cache('/css/stripe.css') }}">
@endpush
@push('scripts')
<script src="https://js.stripe.com/v3/"></script>
<script>
    window.stripe = Stripe("{{ env('STRIPE_PUBLIC_KEY') }}");
</script>
<script>
   $(function () {
       var $form = $('#card-form');
       var $form_submit_button = $('button#add_card');

       $form_submit_button.click(function(event) {
           event.preventDefault();

           $form_submit_button.addClass('is-loading disabled');
           Validator.clear($form);

           stripe.createToken(card).then(function(result) {
               if (result.error) {
                   $form_submit_button.removeClass('is-loading disabled');
                   $('#card-errors').text(result.error.message);
                   return;
               }

               $('[name="card[stripe_token_id]"]').val(result.token.id);

               request({
                   method: 'POST',
                   url: '/billing/cards/add',
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

                   $.notify('Card added', 'success');

                   $form_submit_button.addClass('is-loading disabled');

                   window.location.href = '/dashboard/billing/';
               });
           });
       });

       (function initialize_stripe_input($form) {
           var elements = stripe.elements();

           var style = {
               base: {
                   color: '#32325d',
                   lineHeight: '18px',
                   fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                   fontSmoothing: 'antialiased',
                   fontSize: '16px',

                   '::placeholder': {
                       color: '#aab7c4'
                   },
               },

               invalid: {
                   color: '#fa755a',
                   iconColor: '#fa755a',
               },
           };

           card = elements.create('card', { style: style });
           card.mount($form.find('.stripe-card-element')[0] || null);

           card.addEventListener('change', function(event) {
               if (event.error) {
                   $form.find('.stripe-card-errors').text(event.error.message).removeClass('d-none');
               } else {
                   $form.find('.stripe-card-errors').text('').addClass('d-none');
               }
           });

           card.addEventListener('ready', function(event) {
               card.focus();
           });
       })($form);
   });
</script>
@endpush
<!-- Add New Card Modal -->
<div class="modal fade" id="add-new-card" tabindex="-1" role="dialog"
     aria-labelledby="add-new-card" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="add-new-card">Add new credit card</h5>
                <button type="button" class="close" data-dismiss="modal"
                        aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form action="" id="card-form">
                    <div class="form-group">
                        <label for="credit-card">
                            Credit card information
                            <small>
                                <img height="20px" src="{{ asset_no_cache('img/shield.svg') }}"> Secured by Stripe
                            </small>
                        </label>
                        <div class="[ stripe-card ] mb-3">
                            <div class="stripe-card-element"></div>
                            <div class="stripe-card-errors d-none" role="alert"></div>
                        </div>
                    </div>
                    <input type="hidden" name="card[stripe_token_id]" value="">
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary"
                        data-dismiss="modal">Cancel</button>
                <button id="add_card" type="button" class="btn btn-primary">Add Card</button>
            </div>
        </div>
    </div>
</div>
<!-- / Add New Card Modal -->