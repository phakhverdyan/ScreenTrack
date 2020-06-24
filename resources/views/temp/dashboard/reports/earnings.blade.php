@extends('dashboard.layout')
@section('content')
    <div class="container-fluid p-4">
        <div class="d-flex align-items-center">
            <div class="col-md-2">
                <h2>Invoices - Earnings</h2>
            </div>
            <div class="col-md-4">
                <a class="btn btn-primary" href="{{route('dashboard.reports.invoices')}}">Spendings</a>
                <a class="btn btn-primary" href="{{route('dashboard.reports.invoices.earnings')}}">Earnings</a>
            </div>

        </div>
        <small class="text-secondary d-block text-right">Timezone UTC +0</small>
        <form>
            <div class="d-flex align-items-center justify-content-between mt-2 mb-4">
                <div class="d-flex align-items-center">
                    <div class="form-group" >
                        <label for="client_name">Client Name</label>
                        <select name="client_name" class="form-control" id="client_name">
                            @foreach ($arrClients as $key => $clientName)
                                <option value="{{$clientName}}"  {{isset($_GET['client_name']) && $_GET['client_name']==$clientName ? "selected" : ""}}>{{$key}}</option>
                            @endforeach
                        </select>

                    </div>

                    <div class="form-group">
                        <label for="project_filter">Project Name</label>
                        <select name="project" class="form-control">
                            @foreach ($arrProjects as $key => $strProject)
                                <option value="{{$strProject}}" {{isset($_GET['project']) && $_GET['project']==$strProject ? "selected" : ""}}>{{$key}}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="project_status">Status</label>
                        <select name="status" class="form-control">
                            @foreach(array('All', 'progress','review','escrow','paid')  as $key => $status)
                                <option value="{!!$key==0 ? '' : $status!!}" {{ isset($_GET['status']) && $_GET['status']== $status ? "selected" : ""}}>{{ucfirst($status)}}</option>
                            @endforeach
                        </select>
                    </div>
                </div>

                <div class="align-items-lg-end">
                    <div class="form-group">
                        <label for="date_range_filter">Date Range</label>
                        <input class="form-control" type="text" name="date_range" id="date_range_filter" value="{{ $_GET['date_range'] ?? date("m/d/Y",time()-86400 * 10) . " - " . date("m/d/Y",time()) }}">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <input type="submit" value="Apply Filter" class="btn btn-primary">
                <a href="{{route('dashboard.reports.invoices.earnings')}}" class="btn btn-danger">Reset Filter</a>
            </div>
        </form>

        <div class="row">
            <div class="col-1 d-flex align-items-center">
                <strong class="mr-2">
                    Status
                </strong>
                <img src="{{ asset('img/dashboard/sort.svg') }}" width="18" alt="">
            </div>
            <div class="col-2 d-flex align-items-center sort-down">
                <strong class="mr-2">
                    Client
                </strong>
                <img src="{{ asset('img/dashboard/sort.svg') }}" width="18" alt="">
            </div>
            <div class="col-2 d-flex align-items-center sort-down">
                <strong class="mr-2">
                    Project
                </strong>
                <img src="{{ asset('img/dashboard/sort.svg') }}" width="18" alt="">
            </div>
            <div class="col-2 d-flex align-items-center sort-down">
                <strong class="mr-2">
                    Hours
                </strong>
                <img src="{{ asset('img/dashboard/sort.svg') }}" width="18" alt="">
            </div>
            <div class="col-2 d-flex align-items-center">
                <strong class="mr-2">
                    Total
                </strong>
                <img src="{{ asset('img/dashboard/sort.svg') }}" width="18" alt="">
            </div>
            <div class="col-2 d-flex align-items-center">
                <strong class="mr-2">
                    Action
                </strong>
                <img src="{{ asset('img/dashboard/sort.svg') }}" width="18" alt="">
            </div>
        </div>
        {{--        Raw end --}}
        <hr>
        @inject('reportsController', 'App\Http\Controllers\Dashboard\ReportsController')
        @foreach($allRecords as $record)
            <div class="row align-items-center">
                <div class="col-1">
                    @switch( $status = $reportsController::getStatus($record->created_at))
                        @case('progress')
                        <span class="badge badge-primary">{!! ucfirst($status)  !!}</span>
                        @break
                        @case('review')
                        <span class="badge badge-warning">{!! ucfirst($status)  !!}</span>
                        @break
                        @case('escrow')
                        <span class="badge badge-secondary">{!! ucfirst($status)  !!}</span>
                        @break
                        @case('paid')
                        <span class="badge badge-success">{!! ucfirst($status)  !!}</span>
                        @break
                    @endswitch
                </div>
                <div class="col-2">
                    {!! $record->project->owner_user->title !!}
                </div>

                <div class="col-2">
                    {!! $record->project->name !!}
                </div>
                <div class="col-2">
                    {!! time_interval_to_string($record->count_of_segments * 60,
                       ['string_rounding' => 'minutes', 'string_cutting' => 'hours',
                       'format' => ['hours' => '%d:','minutes' => '%02d',],])!!}
                </div>
                <div class="col-2">
                    ${!! number_format(floor($record->total_amount * 100) / 100, 2)  !!}
                </div>
                <div class="col-2 d-flex align-items-center justify-content-between">
                    <button class="btn btn-outline-dark btn-sm">View</button>
                </div>
            </div>
            <hr>
        @endforeach
    </div>
    <!-- Modal -->
    <div class="modal fade" id="decline_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Decline</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Are you sure that you wish to decline this invoice ?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                    <button type="button" class="btn btn-primary">Yes</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="mark_as_paid_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Mark as Paid</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Are you sure that you wish to mark this invoice as paid ?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                    <button type="button" class="btn btn-primary">Yes</button>
                </div>
            </div>
        </div>
    </div>
@endsection
