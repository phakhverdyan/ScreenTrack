@extends('dashboard.layout')

@push('scripts')
    <script>
        $('.delete-company').click(function () {
            var company_id = $(this).data('id');

            modals.confirm_action({
                question: "{{ __('dashboard/companies.you_really_want_to_delete_this_company') }}",

                confirm: function(callback) {
                    request({
                        method: 'GET',
                        url: '/companies/' + company_id + '/delete',
                    }, function(response) {
                        if (response.error) {
                            $.notify(response.error);
                            return;
                        }

                        $.notify("{{ __('dashboard/companies.deleted') }}", 'success');
                        $('.company-item[data-id="' + company_id + '"]').collapse('hide');
                        return callback && callback();
                    });
                },
            });

            return false;
        });
    </script>
@endpush

@section('content')
    <div class="container">
        <div class="row mt-3">
            <div class="col-md-6">
                @if (count($user->companies))
                    <h3 class="[ page-title ]">{{ __('dashboard/companies.my_companies') }} ({{ count($user->companies) }})</h3>
                @endif
            </div>
            <div class="col-md-6">
                <a href="{{ route('dashboard.companies.create') }}" class="btn btn-primary float-right mt-4">
                    {{ __('dashboard/companies.add_company') }}
                </a>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-md-12">
                <table class="table">
                    <tbody>
                        @forelse ($user->companies as $company)
                            <tr class="[ company-item ] collapse + show" data-id="{{ $company->id }}">
                                <td><img height="50px" src="{{ $company->image->urls->tiny }}" alt=""></td>
                                <td>{{ $company->name }}</td>
                                <td>{{ $company->created_at->diffForHumans() }}</td>
                                <td></td>
                                <td>
                                    <a href="/dashboard/companies/{{ $company->id }}/edit">
                                        <img height="30px" src="{{ asset_no_cache('/img/pencil-edit-button.svg') }}">
                                    </a>
                                </td>
                                <td>
                                    <a class="delete-company" data-id="{{ $company->id }}">
                                        <img height="30px" src="{{ asset_no_cache('/img/rubbish-bin.svg') }}">
                                    </a>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td style="text-align: center;">
                                    {{ __('dashboard/companies.you_don_t_have_any_company_yet') }}
                                </td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>
@endsection
