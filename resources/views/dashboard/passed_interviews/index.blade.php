@extends('dashboard.layout')

@push('scripts')
    <script>

    </script>
@endpush

@section('content')
    <div class="container">
        <div class="row mt-3">
            <div class="col-md-6">
                <h3 class="[ page-title ]">{{ __('dashboard/passed_interviews.passed_interviews') }}</h3>
            </div>
            <div class="col-md-6">
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-md-12">
                <table class="table">
                    <tbody>
                        @forelse ($passed_interviews as $passed_interview)
                            <tr class="[ company-item ] collapse + show">
                                <td>{{ $passed_interview->interview_title }}</td>
                                <td>{{ $passed_interview->created_at->diffForHumans() }}</td>
                                <td>
                                    <a class="btn btn-primary" href="/dashboard/passed-interviews/{{ $passed_interview->id }}/show">{{ __('dashboard/passed_interviews.show_answers') }}</a>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td style="text-align: center;">{{ __('dashboard/passed_interviews.you_haven_t_passed_any_interviews_yet') }}</td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>
@endsection
