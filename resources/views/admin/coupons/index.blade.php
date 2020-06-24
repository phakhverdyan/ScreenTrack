@extends('admin.layout')
@push('scripts')
    <script>
        $(function () {
            $('body').on('click', '.coupon-delete', function (event) {
                event.preventDefault();

                var item_id = $(this).data('id');

                modals.confirm_action({
                    question: 'You really want to DELETE this Coupon?',

                    confirm: function (callback) {
                        request({
                            method: 'GET',
                            url: '/coupons/' + item_id + '/delete',
                        }, function (response) {
                            if (response.error) {
                                $.notify(response.error);
                                return;
                            }

                            $.notify('Deleted!', 'success');

                            $('.item[data-id="' + item_id + '"]').hide();
                            return callback && callback();
                        });
                    },
                });
            });
        });
    </script>
@endpush
@section('content')
    <h1>Coupons</h1>
    <div class="row mb-12">
        <div class="col-md-8">
        </div>
        <div class="col-md-4">
            <a href="/nexus/coupons/create" class="btn btn-primary float-right">Add Coupon</a>
        </div>
    </div>
    <br/>
    <div class="mt-10">

            <ul class="nav nav-tabs" style="justify-content: left;">
                <li class="nav-item">
                    <a href="" data-target="#all-tab" data-toggle="tab" class="nav-link small text-uppercase active">
                        For all users
                        <span class="float-right badge badge-pill badge-dark"></span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="" data-target="#email-tab" data-toggle="tab" class="nav-link small text-uppercase">
                        For specific email
                        <span class="float-right badge badge-pill badge-dark"></span>
                    </a>
                </li>
            </ul>
            <div class="tab-content">
                <div id="all-tab" class="tab-pane active">
                    <div class="row mt-3">
                        <div class="col-md-12">
                        @forelse($coupons_for_all as $coupon)
                            <div data-id="{{ $coupon->id }}" class="row mb-2 item">
                                <div class="col-md-8">
                                    <b>{{ $coupon->name }}</b>
                                    @if ($coupon->percent_discount > 0)
                                        | {{ $coupon->percent_discount }} %
                                    @endif
                                    @if($coupon->amount_discount > 0)
                                        | {{ $coupon->amount_discount }} $
                                    @endif
                                    @if($coupon->valid_date_from)
                                        | Valid from: {{ $coupon->valid_date_from }}
                                    @endif
                                    @if($coupon->valid_date_to)
                                        | Valid to: {{ $coupon->valid_date_to }}
                                    @endif
                                </div>
                                <div class="col-md-4 ">
                                    <div class="float-right">
                                        <a href="/nexus/coupons/{{ $coupon->id }}/edit" class="btn btn-primary ml-1">Edit</a>
                                        <a data-id="{{ $coupon->id }}" href="" class="btn btn-primary coupon-delete ml-1">Delete</a>
                                    </div>
                                </div>
                            </div>
                        @empty
                            <div class="text-center">We don't have any Coupons for All, yet :(</div>
                        @endforelse
                    </div>
                    </div>
                </div>
                <div id="email-tab" class="tab-pane fade show">
                    <div class="row mt-3">
                        <div class="col-md-12">
                    @forelse($coupons_for_specific_emails as $coupon)
                        <div data-id="{{ $coupon->id }}" class="row mb-2 item">
                            <div class="col-md-8">
                                <b>{{ $coupon->name }}</b>
                                | {{ $coupon->email }}
                                @if ($coupon->percent_discount > 0)
                                    | {{ $coupon->percent_discount }} %
                                @endif
                                @if($coupon->amount_discount > 0)
                                    | {{ $coupon->amount_discount }} $
                                @endif
                                @if($coupon->valid_date_from)
                                    | Valid from: {{ $coupon->valid_date_from }}
                                @endif
                                @if($coupon->valid_date_to)
                                    | Valid to: {{ $coupon->valid_date_to }}
                                @endif
                            </div>
                            <div class="col-md-4 ">
                                <div class="float-right">
                                    <a href="/nexus/coupons/{{ $coupon->id }}/edit" class="btn btn-primary ml-1">Edit</a>
                                    <a data-id="{{ $coupon->id }}" href="" class="btn btn-primary coupon-delete ml-1">Delete</a>
                                </div>
                            </div>
                        </div>
                    @empty
                        <div class="text-center">We don't have any Coupons for specific email, yet :(</div>
                    @endforelse
                        </div>
                    </div>
                </div>
            </div>
    </div>
@endsection

@modal('confirm_action');

@push('ejs-templates')
    <script type="text/ejs" id="article-item-not-found-template">
       <div class="text-center">We can't find any article for this request :(</div>
    </script>

    <script type="text/ejs" id="article-item-template">
    <div data-id="<%= article.id %>" class="row mb-5 article-item">
            <div class="col-md-6">
                        <strong><%= intended_for_list[article.intended_for]['title'] %></strong>
                        <span><%= article.title %></span>
            </div>
            <div class="col-md-6">
                <strong><%= article.likes %> |  <%= article.dislikes %></strong>
                    <%= article.views %> views <%= article.created_at_for_humans %>
                    <div class="float-right">
                             <a href="/nexus/help-center/articles/<%= article.id %>/edit" class="btn btn-primary">Edit</a>
                            <a data-id="<%= article.id %>" href="" class="btn btn-primary article-delete ml-1">Delete</a>
                    </div>
            </div>
    </div>
    </script>
@endpush