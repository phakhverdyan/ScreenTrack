@extends('admin.layout')

@section('content')
    <h1>User's Feedback</h1>
    <div>
        <div id="feedback-items" class="">
            @forelse($feedback_list as $feedback)
                <div data-id="{{ $feedback->id }}" class="row mb-5 feedback-item">
                    <div class="col-md-4">
                        <span>{{ $feedback->user->email }}</span> |
                        <span>{{ $feedback->user->full_name }}</span>

                    </div>
                    <div class="col-md-4">
                        <i>{{ Str::limit($feedback->text,150) }}</i>
                    </div>
                    <div class="col-md-2">
                        <span>{{ $feedback->created_at->diffForHumans() }}</span>
                    </div>
                    <div class="col-md-2">
                        <div class="float-right">
                            <a href="/nexus/feedback/{{ $feedback->id }}/show" class="btn btn-primary">Show full text</a>
                        </div>
                    </div>
                </div>
            @empty
                <div class="text-center">We don't have any User's feedback yet :(</div>
            @endforelse
        </div>
    </div>
    {{ $feedback_list->links() }}
@endsection
