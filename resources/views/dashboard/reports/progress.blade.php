@extends('dashboard.layout')

@push('scripts')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.bundle.min.js"></script>
    <script>
        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['12 May', '13 May', '14 May', '15 May', '16 May', '17 May'],
                datasets: [{
                    label: 'Hours',
                    data: [12, 19, 3, 5, 2, 3],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            }
        });

        document.getElementById('projects_chart').addEventListener('click', function() {
            myChart.data.datasets.forEach(function(dataset) {
                dataset.data = [12, 11, 6.9, 5, 6, 8.4];
            });
            window.myChart.update();
            $('.schart_switcher').removeClass('active');
            $(this).addClass('active');
        });
        document.getElementById('members_chart').addEventListener('click', function() {
            myChart.data.datasets.forEach(function(dataset) {
                dataset.data = [16, 6, 9, 8, 6, 7.3];
            });
            window.myChart.update();
            $('.schart_switcher').removeClass('active');
            $(this).addClass('active');
        });
    </script>
{{--    <script>--}}
{{--        $('#reports__get-paid-button').click(function(event) {--}}
{{--            event.preventDefault();--}}

{{--            request({--}}
{{--                url: '/payouts/create',--}}

{{--                data: {--}}
{{--                    payout: {--}}
{{--                        original_amount: parseFloat('{{ $available_amount }}'),--}}
{{--                    },--}}
{{--                },--}}
{{--            }, function(response) {--}}
{{--                if (response.error) {--}}
{{--                    $.notify(response.error, 'error');--}}
{{--                    return;--}}
{{--                }--}}

{{--                alert('SUCCESS!');--}}
{{--            });--}}
{{--        });--}}
{{--    </script>--}}
@endpush

@section('content')
    <div class="container-fluid p-4">
        <h3>Reports</h3>
        <small class="text-secondary d-block text-right">Timezone UTC +0</small>
        <div class="d-flex align-items-center justify-content-between mt-2 mb-4">
            <div class="d-flex align-items-center">
                <div class="dropdown mr-2">
                    <button class="btn btn-light d-flex align-items-center" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img src="{{ asset('img/dashboard/project.svg') }}" width="20" alt="">
                        <span class="ml-2">All Projects</span>
                        <span class="ml-2 badge badge-dark">2</span>
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                </div>
                <div class="dropdown">
                    <button class="btn btn-light d-flex align-items-center" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img src="{{ asset('img/dashboard/user.svg') }}" width="20" alt="">
                        <span class="ml-2">All Members</span>
                        <span class="ml-2 badge badge-dark">1</span>
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                </div>
            </div>
            <div class="dropdown dropleft">
                <button class="btn btn-light d-flex align-items-center" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img src="{{ asset('img/dashboard/calendar.svg') }}" width="20" alt="">
                    <span class="ml-2">Feb 10-20</span>
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                </div>
            </div>
        </div>
        <h4 class="mb-4 d-flex">
            <span>8 invoices for $3,000</span>
            <span class="text-secondary ml-2">
                - 111:30 Hours
            </span>
        </h4>
        <div class="d-flex mb-2">
            <button class="btn btn-outline-primary schart_switcher active mr-2" id="projects_chart">Projects</button>
            <button class="btn btn-outline-primary schart_switcher" id="members_chart">Members</button>

        </div>
        <div class="mb-4" style="height: 300px;">
            <canvas id="myChart"></canvas>
        </div>

        <ul class="nav nav-tabs justify-content-start" id="myTab" role="tablist">
            <li class="nav-item">
                <a class="nav-link" id="work_summary-tab" data-toggle="tab" href="#work_summary" role="tab" aria-controls="work_summary" aria-selected="false">Work Summary</a>
            </li>
            <li class="nav-item">
                <a class="nav-link active" id="timesheet-tab" data-toggle="tab" href="#timesheet" role="tab" aria-controls="timesheet" aria-selected="true">Timesheet</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="activity_log-tab" data-toggle="tab" href="#activity_log" role="tab" aria-controls="activity_log" aria-selected="false">Activity Log</a>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade" id="work_summary" role="tabpanel" aria-labelledby="work_summary-tab">Work Summary</div>
            <div class="tab-pane fade show active" id="timesheet" role="tabpanel" aria-labelledby="timesheet-tab">
                <hr>
                <div class="row">
                    <div class="col-3 d-flex align-items-center">
                        <strong class="mr-2">
                            Activity
                        </strong>
                        <img src="{{ asset('img/dashboard/sort.svg') }}" width="18" alt="">
                    </div>
                    <div class="col d-flex">
                        <div class="col-2">May 12</div>
                        <div class="col-2">May 13</div>
                        <div class="col-2">May 14</div>
                        <div class="col-2">May 15</div>
                        <div class="col-2">May 16</div>
                        <div class="col-2">May 17</div>
                    </div>
                    <div class="col-1 d-flex align-items-center">
                        <strong class="mr-2">
                            Total
                        </strong>
                        <img src="{{ asset('img/dashboard/sort.svg') }}" width="18" alt="">
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-3">
                        Activity Name 1
                    </div>
                    <div class="col d-flex">
                        <div class="col-2">3:00</div>
                        <div class="col-2">3:00</div>
                        <div class="col-2">3:00</div>
                        <div class="col-2">3:00</div>
                        <div class="col-2">3:00</div>
                        <div class="col-2">3:00</div>
                    </div>
                    <div class="col-1">
                        <strong>10</strong>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-3">
                        Activity Name 1
                    </div>
                    <div class="col d-flex">
                        <div class="col-2">3:00</div>
                        <div class="col-2">3:00</div>
                        <div class="col-2">3:00</div>
                        <div class="col-2">3:00</div>
                        <div class="col-2">3:00</div>
                        <div class="col-2">3:00</div>
                    </div>
                    <div class="col-1">
                        <strong>10</strong>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-3">
                        Activity Name 1
                    </div>
                    <div class="col d-flex">
                        <div class="col-2">3:00</div>
                        <div class="col-2">3:00</div>
                        <div class="col-2">3:00</div>
                        <div class="col-2">3:00</div>
                        <div class="col-2">3:00</div>
                        <div class="col-2">3:00</div>
                    </div>
                    <div class="col-1">
                        <strong>10</strong>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-3">
                        Activity Name 1
                    </div>
                    <div class="col d-flex">
                        <div class="col-2">3:00</div>
                        <div class="col-2">3:00</div>
                        <div class="col-2">3:00</div>
                        <div class="col-2">3:00</div>
                        <div class="col-2">3:00</div>
                        <div class="col-2">3:00</div>
                    </div>
                    <div class="col-1">
                        <strong>10</strong>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-3">
                        Activity Name 1
                    </div>
                    <div class="col d-flex">
                        <div class="col-2">3:00</div>
                        <div class="col-2">3:00</div>
                        <div class="col-2">3:00</div>
                        <div class="col-2">3:00</div>
                        <div class="col-2">3:00</div>
                        <div class="col-2">3:00</div>
                    </div>
                    <div class="col-1">
                        <strong>10</strong>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-3">
                        Activity Name 1
                    </div>
                    <div class="col d-flex">
                        <div class="col-2">3:00</div>
                        <div class="col-2">3:00</div>
                        <div class="col-2">3:00</div>
                        <div class="col-2">3:00</div>
                        <div class="col-2">3:00</div>
                        <div class="col-2">3:00</div>
                    </div>
                    <div class="col-1">
                        <strong>10</strong>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-3">
                        <strong>
                            Total
                        </strong>
                    </div>
                    <div class="col d-flex">
                        <div class="col-2"><strong>3:00</strong></div>
                        <div class="col-2"><strong>3:00</strong></div>
                        <div class="col-2"><strong>3:00</strong></div>
                        <div class="col-2"><strong>3:00</strong></div>
                        <div class="col-2"><strong>3:00</strong></div>
                        <div class="col-2"><strong>3:00</strong></div>
                    </div>
                    <div class="col-1">
                        <strong>10</strong>
                    </div>
                </div>
                <hr>
            </div>
            <div class="tab-pane fade" id="activity_log" role="tabpanel" aria-labelledby="activity_log-tab">Activity Log</div>
        </div>
    </div>
{{--    <section class="container py-5">--}}
{{--        <div class="row">--}}
{{--            <div class="col-md-12">--}}
{{--                <h3 class="[ page-title ]">Reports</h3>--}}
{{--            </div>--}}
{{--        </div>--}}
{{--        <div class="row">--}}
{{--            <div class="[  ]">--}}
{{--            	@include('dashboard.reports.partials.tabs')--}}
{{--                <div class="[  ] tab-content">--}}
{{--                    <div class="tab-pane fade show active">--}}
{{--                        Hi!--}}
{{--                    </div>--}}
{{--                </div>--}}
{{--            </div>--}}
{{--        </div>--}}
{{--    </section>--}}
@endsection
