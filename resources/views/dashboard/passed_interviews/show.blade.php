@extends('dashboard.layout')

@section('content')
    <section class="container py-5">
        <div class="row">
            <div class="col-md-12">
                <div class="[ edit-profile ]">
                    <a class="btn btn-primary" href="/dashboard/passed-interviews">< {{ __('dashboard/passed_interviews.back_to_passed_interviews_list') }}</a>
                    <h3 class="[ page-title ]">
                     {{ __('dashboard/passed_interviews.passed_interview_answers') }}
                    </h3>
                    <h5>  {{ $title }} </h5>
                    <hr/>

                    @foreach($questions as $question)
                        <h4>{{$loop->iteration}}. {{ $question['title'] }}</h4>
                        <p>{{ $question['details'] }}</p>
                        <p>{{ __('dashboard/passed_interviews.answer') }}:</p>
                        <p>{{ $answers[$loop->index] }}</p>
                    @endforeach
                <div>
            </div>
        </div>
    </section>
@endsection