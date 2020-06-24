@extends('dashboard.layout')

@push('scripts')
    <script>
        $('#earnings__get-paid-button').click(function(event) {
            event.preventDefault();
            var available_amount = parseFloat($('#earnings__available-value').attr('data-raw-value'));

            request({
                url: '/payouts/create',

                data: {
                    payout: {
                        original_amount: available_amount,
                    },
                },
            }, function(response) {
                if (response.error) {
                    $.notify(response.error, 'error');
                    return;
                }

                $.notify('You have a new payout!', 'success');
                $('#earnings__available-value').text('0.00');

                setTimeout(function() {
                    window.location.href = "{{ route('dashboard.earnings.paid') }}";
                }, 1000);
            });
        });
    </script>
@endpush

@section('content')
    <section class="container py-5">
        <div class="row">
            <div class="col-md-12">
                <h3 class="[ page-title ]">{!! __('dashboard/earnings.earnings') !!}</h3>
            </div>
        </div>
        <div class="row">
            <div class="">
            	@include('dashboard.earnings.partials.tabs')
                <div class="tab-content">
                    <div class="tab-pane fade show active">
                        <div class="d-inline-flex align-items-center py-3 px-4" style="background-color: rgba(0, 0, 0, 0.05); border-radius: 5px;">
                            <div class="mr-3">
                                $<span id="earnings__available-value" data-raw-value="{{ $earning_amounts->available }}">{{ number_format($earning_amounts->available, 2) }}</span> available
                            </div>
                            <div>
                                <button id="earnings__get-paid-button" class="btn btn-primary" {{ $earning_amounts->available > 0 ? '' : 'disabled' }}>
                                    <img src="{{ asset_no_cache('img/credit-card-0.white.svg') }}" style="width: 20px; margin-top: -4px; margin-right: 4px;" alt="">
                                    {!! __('dashboard/earnings.get_paid') !!}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
