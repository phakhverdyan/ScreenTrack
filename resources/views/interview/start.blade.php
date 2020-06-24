@extends('layouts.interview_layout')

@section('content')
    @include('components.navbar.interview')
    
    <div class="main-wrapper">
        <main class="[ interview-container ]">
            <div class="container">
                <form id="interview-answers">
                    <div class="d-flex flex-column">
                        <div class="my-4 text-center col-6 mx-auto">
                            @isset($company)
                                @include('interview.partials.company_block')
                            @else
                                @include('interview.partials.creator_user_block')
                            @endempty
                                <p>{{ $interview->title }}</p>
                        </div>

                        <p class="text-center">
                            <a id="start_interview" href="/interview/{{ $interview->hash }}" class="btn btn-primary px-5">{{ __('interview.start_interview') }}</a>
                        </p>
                    </div>
                </form>
            </div>
        </main>
    </div>
@endsection