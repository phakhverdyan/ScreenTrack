@extends('layouts.interview_layout')

@push('styles')
    <style>
        body p {
            color: black;
        }
    </style>
@endpush

@push('scripts')
    <script>
        $(function() {
            var interview_hash = '{{ $interview->hash }}';

            var $form = $('form#interview-answers');
            var $form_submit_button = $('button#send-answers');

            $form_submit_button.click(function(event) {
                event.preventDefault();

                $form_submit_button.addClass('is-loading disabled');

                Validator.clear($form);

                request({
                    method: 'POST',
                    url: '/interview_result/'+interview_hash+'/answers',
                    data: $form.serialize(),
                }, function(response) {
                    $form_submit_button.removeClass('is-loading disabled');

                    if (new Validator($form, response).fails()) {
                        return;
                    }

                    if (response.error) {
                        $.notify(response.error, 'error');
                        return;
                    }

                    $.notify('Interview completed!', 'success');

                    $form_submit_button.addClass('is-loading disabled');

                    if (response.data.redirect_to_dashboard) {
                        window.location.href = '/dashboard/passed-interviews';
                    } else {
                        var storage_key_for_interview_results = 'interviews_results_keys';

                        var interviews_results_keys = JSON.parse(localStorage.getItem(storage_key_for_interview_results) || '[]');

                        interviews_results_keys.push(response.data.interview_result_key);

                        localStorage.setItem(storage_key_for_interview_results, JSON.stringify(interviews_results_keys));
                        window.location.href = '/login?interview_result_key='+response.data.interview_result_key;
                    }
                });
            });
        });
    </script>
@endpush

@section('content')
    @include('components.navbar.interview')

    <div class="main-wrapper">
        <main class="[ interview-container ]">
            <div class="container">
                <form id="interview-answers">
                    <input type="hidden" name="interview[result_key]" value="{{ $interview_result_key ?? null }}">

                    <div class="d-flex flex-column">
                        <div class="my-4 text-center col-6 mx-auto">
                            @isset($company)
                                @include('interview.partials.company_block')
                            @else
                                @include('interview.partials.creator_user_block')
                            @endempty
                                <p>{{ $interview->title }}</p>
                        </div>

                    @forelse($interview->questions as $question)
                        <div class="mb-3">
                            <p class="h5">{{ $loop->iteration .' - '. $question->title }}</p>
                            <p>{{ $question->details }}</p>
                            <textarea name="interview[answers][]" data-name="interview.answers.{{ $loop->index }}" rows="4" class="form-control"></textarea>
                            <div class="invalid-feedback"></div>
                        </div>
                    @empty
                            <div class="mb-3">
                                <p class="h5 text-center">{{ __('interview.this_interview_doesnt_ready_yet') }}</p>
                            </div>
                    @endforelse

                    @if (count($interview->questions))
                        <p class="text-center"><button id="send-answers" class="btn btn-primary px-5">{{ __('interview.finish') }}</button></p>
                    @endif
                    </div>
                </form>
            </div>
        </main>
    </div>
@endsection