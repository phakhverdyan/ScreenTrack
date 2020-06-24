@extends('admin.layout')
@push('styles')
    <link rel="stylesheet" href="{{ asset_no_cache('css/vendor/selectize.bootstrap3.min.css') }}">
@endpush
@push('scripts')
    <script src="{{ asset('js/vendor/selectize.min.js') }}"></script>
    <script>
        $(function () {
            $('#coupon-save').click(function (event) {
                event.preventDefault();

                var $form = $('form#coupon-form');

                request({
                    method: 'POST',
                    url:  $form.attr('action'),
                    data: $form.serialize(),

                }, function(response) {
                    if (new Validator($form, response).fails()) {
                        return;
                    }

                    if (response.error) {
                        $.notify(response.error);
                        return;
                    }

                    window.location.href = '/nexus/coupons';

                    $.notify('Saved!', 'success');
                });
            });
        });
    </script>
@endpush
@section('content')
    <a href="/nexus/coupons" class="btn btn-secondary">< Back to Coupons list</a>

    @empty($coupon)
        <h1>Create Coupon</h1>
        <form action="/coupons/create" id="coupon-form">
    @else
        <h1>Edit Coupon</h1>
        <form action="/coupons/{{ $coupon->id }}/update" id="coupon-form">
    @endempty
        <div class="form-group col-md-8">
            <label>Discount type:</label>
            <div class="row">
                <div class="col-md-6">
                    <label>Amount</label>
                    <input value="{{ $coupon->amount_discount ?? '' }}" type="text" class="form-control" name="coupon[amount_discount]" data-name="coupon.amount_discount"  placeholder="- X $">
                    <div class="invalid-feedback"></div>
                </div>

                <div class="col-md-6">
                    <label>Percent</label>
                    <input value="{{ $coupon->percent_discount ?? '' }}" type="text" class="form-control" name="coupon[percent_discount]" data-name="coupon.percent_discount"  placeholder="- %">
                    <div class="invalid-feedback"></div>
                </div>
            </div>
        </div>
        <div class="form-group col-md-8">
            <label>Coupon Name</label>
            <input value="{{ $coupon->name ?? '' }}" type="text" class="form-control" name="coupon[name]" data-name="coupon.name"  placeholder="">
            <div class="invalid-feedback"></div>
        </div>

        <div class="form-group col-md-8">
            <label>Expire date:</label>
            <div class="row">
                <div class="col-md-6">
                    <label>From</label>
                    <input value="{{ $coupon->valid_date_from ?? '' }}" type="date" class="form-control" name="coupon[valid_date_from]" data-name="coupon.valid_date_from"  placeholder="">
                    <div class="invalid-feedback"></div>
                </div>

                <div class="col-md-6">
                    <label>To</label>
                    <input value="{{ $coupon->valid_date_to ?? '' }}" type="date" class="form-control" name="coupon[valid_date_to]" data-name="coupon.valid_date_to"  placeholder="">
                    <div class="invalid-feedback"></div>
                </div>
            </div>
        </div>

        <div class="form-group col-md-8">
            <label>Email</label>
            <input value="{{ $coupon->email ?? '' }}" type="text" class="form-control" name="coupon[email]" data-name="coupon.email"  placeholder="">
            <div class="invalid-feedback"></div>
        </div>

        <div class="form-group">
            <button id="coupon-save" class="btn btn-primary btn-lg float-right">Save</button>
        </div>

    </form>
@endsection