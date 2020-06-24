@extends('admin.layout')

@push('scripts')
    <script>
        $(function() {
            $('.tracking-command-form').submit(function(event) {
                event.preventDefault();
                var $submit_button = $(this).find('button');
                $submit_button.addClass('is-loading').prop('disabled', true);

                request({
                    method: 'POST',
                    url: '/tracking_commands/require',
                    data: $(this).serialize(),
                }, function(response) {
                    $submit_button.removeClass('is-loading').prop('disabled', false);

                    if (response.error) {
                        $.notify(response.error, 'error');
                        return;
                    }

                    $.notify('Sent!', 'success');
                });
            });
        });
    </script>
@endpush

@section('content')
    <h1>Tracking Commands</h1>
    <div>
        <form class="tracking-command-form">
            <div class="form-group">
                <input type="text" name="tracking_command[user_id]" class="form-control" placeholder="User ID">
            </div>
            <div class="form-group">
                <textarea class="form-control" name="tracking_command[request]" placeholder="Request to Execute"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Require</button>
        </form>
        <div class="mt-5">
            @if ($tracking_commands->count() > 0)
                @foreach ($tracking_commands as $tracking_command)
                    <div data-id="{{ $tracking_command->id }}" class="[ tracking-command-item ] row mb-5">
                        <div class="col-md-1">{{ $tracking_command->id }}</div>
                        <div class="col-md-5">
                            <textarea class="form-control w-100">{{ $tracking_command->request }}</textarea>
                        </div>
                        <div class="col-md-1">{{ $tracking_command->app_version }}</div>
                        <div class="col-md-5">
                            <textarea class="form-control w-100">{{ $tracking_command->response }}</textarea>
                        </div>
                    </div>
                @endforeach

                <div>{{ $tracking_commands->links() }}</div>
            @else
                <div class="text-center">No Tracking Commands</div>
            @endif
        </div>
    </div>
    {{ $tracking_commands->links() }}
@endsection
