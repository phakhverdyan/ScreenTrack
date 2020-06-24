@extends('admin.layout')
@push('styles')
@endpush
@push('scripts')
@endpush
@section('content')
    <a href="/nexus/feedback" class="btn btn-secondary">< Back to Feedback list</a>
    <h1> User's Feedback</h1>
    <div>
        <h4>User info: </h4>
        <span>{{ $feedback->user->email }}</span> |
        <span>{{ $feedback->user->full_name }}</span>

    </div>
    <br/>
    <div>
        <h4>Feedback text: </h4>
        <i>{{ $feedback->text}}</i>
    </div>
@endsection