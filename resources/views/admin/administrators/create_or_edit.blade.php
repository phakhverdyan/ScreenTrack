@extends('admin.layout')
@push('styles')
    <link rel="stylesheet" href="{{ asset_no_cache('css/vendor/selectize.bootstrap3.min.css') }}">
@endpush
@push('scripts')
    <script src="{{ asset('js/vendor/selectize.min.js') }}"></script>
    <script>
        $(function () {
            $('#administrator-save').click(function (event) {
                event.preventDefault();

                var $form = $('form#administrator-form');

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

                    window.location.href = '/nexus/administrators';

                    $.notify('Saved!', 'success');
                });
            });
        });
    </script>
@endpush
@section('content')
    <a href="/nexus/administrators" class="btn btn-secondary">< Back to Administrators list</a>

    @empty($adminstrator)
        <h1>Create Administrator</h1>
        <form action="/administrators/create" id="administrator-form">
    @else
        <h1>Edit Administrator</h1>
        <form action="/administrator/{{ $administrator->id }}/update" id="administrator-form">
    @endempty
        <div class="form-group">
            <input value="" type="text" class="form-control" name="administrator[email]" data-name="administrator.email"  placeholder="Type user email">
            <div class="invalid-feedback"></div>
        </div>
        <div class="form-group">
            <label>
                Role:
            </label>
            <select name="administrator[role]" data-name="administrator.role" class="form-control">
                @foreach($roles_list as $key => $value)
                    <option value="{{ $key }}">{{ $value['title'] }}</option>
                @endforeach
            </select>
            <div class="invalid-feedback"></div>
        </div>

        <div class="form-group">
            <button id="administrator-save" class="btn btn-primary btn-lg float-right">Save</button>
        </div>

    </form>
@endsection