@extends('admin.layout')

@push('scripts')
    <script>
        $(function() {
            $('.payout-item__button').click(function() {
                var $pending_payout = $(this).parents('.payout-item');
                var payout_id = parseInt($pending_payout.attr('data-id'));
                var payout_state = $(this).attr('data-value');
                var $pending_payout_item_id_input = $pending_payout.find('.payout-item__item-id-input');

                request({
                    url: '/payouts/' + payout_id + '/update',

                    data: {
                        payout: {
                            state: payout_state,
                            item_id: $pending_payout_item_id_input.val(),
                        },
                    },
                }, function(response) {
                    if (response.error) {
                        $.notify(response.error, 'error');
                        return;
                    }

                    $pending_payout.find('.payout-item__button').addClass('d-none');
                    $pending_payout.find('.payout-item__status').text(response.data.state);
                    $pending_payout.find('.payout-item__item-id-input').prop('readonly', true);
                    $.notify(response.data.state + '!', 'success');
                });
            });

            $('.payout-item__identifier-input, .payout-item__original-amount-input').click(function() {
                copy_text_to_clipboard(this.value);
                $.notify('Value copied!', 'success');
            });
        });
    </script>
@endpush

@section('content')
    <h1>Pending Payouts</h1>
    <div>
        <div class="">
            @if ($pending_payouts->count() > 0)
                @foreach ($pending_payouts as $pending_payout)
                    <div data-id="{{ $pending_payout->id }}" class="[ payout-item ] row mb-5 align-items-center">
                        <div class="col-md-1">{{ $pending_payout->id }}</div>
                        <div class="col-md-1">{{ $pending_payout->created_at->format('g:ia \o\n l jS F Y') }}</div>
                        <div class="col-md-3">
                            <div class="d-flex align-items-center">
                                <img src="{{ $pending_payout->user->image->urls->tiny }}" style="width: 30px; margin-right: 5px;">
                                {{ $pending_payout->user->title }}
                                (ID: {{ $pending_payout->user->id }})
                            </div>
                            <div style="font-size: 12px; padding-left: 35px;">{{ $pending_payout->user->email }}</div>
                        </div>
                        <div class="col-md-1 text-center">{{ $pending_payout->type }}</div>
                        <div class="col-md-2">
                            <input type="text" value="{{ $pending_payout->identifier }}" class="[ payout-item__identifier-input ] form-control w-100">
                        </div>
                        <div class="col-md-1">
                            <input type="text" value="{{ $pending_payout->original_amount }}" class="[ payout-item__original-amount-input ] form-control w-100">
                        </div>
                        <div class="col-md-1">
                            <input type="text" value="" class="[ payout-item__item-id-input ] form-control w-100" placeholder="Item ID">
                        </div>
                        <div class="col-md-2 text-right">
                            <a href="#" class="[ payout-item__button ] btn btn-primary {{ $pending_payout->state == 'PENDING' ? '' : 'd-none' }}" data-value="SUCCESS">Success</a>
                            <a href="#" class="[ payout-item__button ] btn btn-primary {{ $pending_payout->state == 'PENDING' ? '' : 'd-none' }}" data-value="FAILED">Failed</a>
                        </div>
                    </div>
                @endforeach

                <div>{{ $pending_payouts->links() }}</div>
            @else
                <div class="text-center">No Pending Payouts</div>
            @endif
        </div>
    </div>
    {{ $pending_payouts->links() }}
@endsection
