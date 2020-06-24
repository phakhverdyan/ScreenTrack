<?php

namespace App\Http\Controllers\Api\Tracking;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Contract;
use App\Models\Project\ProjectTask;
use App\Models\Project\ProjectMember;
use App\Models\Tracking\TrackingDay;
use App\Models\Tracking\TrackingSession;
use App\Models\Tracking\TrackingSegment;

class TrackingSegmentController extends Controller
{
	public function create(Request $request)
	{
		// abort(500);

		validator()->make($request->all(), [
			'tracking_segments' => 'required|array',
			'tracking_segments.*' => 'required|array',
			'tracking_segments.*.count_of_keyboard_clicks' => 'required|integer|min:0|nullable',
			'tracking_segments.*.count_of_mouse_clicks' => 'required|integer|min:0|nullable',
			'tracking_segments.*.created_at' => 'required|date',
			'tracking_segments.*.session' => 'required|array',
			'tracking_segments.*.session.label' => 'required|string',
			'tracking_segments.*.session.task_id' => 'required|integer',
			'tracking_segments.*.session.created_at' => 'required|date',
			'tracking_segments.*.session.app_version' => 'nullable|string',
		])->validate();

		$responses = collect();

		$created_segments = collect();
		$failed_segments = collect();

		foreach ($request->input('tracking_segments', []) as $input_tracking_segment) {
			if (!$project_task = ProjectTask::find($input_tracking_segment['session']['task_id'])) {
				$failed_segments->push([
					'created_at' => $input_tracking_segment['created_at'],

					'session' => [
						'task_id' => $input_tracking_segment['session']['task_id'],
						'label' => $input_tracking_segment['session']['label'],
					],

					'error' => 'TASK_NOT_FOUND',
				]);

				continue;
			}

			if (!auth()->user()->canAccessProjectTask($project_task)) {
				$failed_segments->push([
					'created_at' => $input_tracking_segment['created_at'],

					'session' => [
						'task_id' => $input_tracking_segment['session']['task_id'],
						'label' => $input_tracking_segment['session']['label'],
					],

					'error' => 'NO_ACCESS_TO_TASK',
				]);

				continue;
			}

			$contract_query = Contract::select('contracts.*');
			$contract_query->join('project_members', 'project_members.user_id', '=', 'contracts.employee_user_id');

			$contract_query->join('projects', function ($join) {
				$join->on('projects.id', '=', 'project_members.project_id');
				$join->on('projects.owner_user_id', '=', 'contracts.employer_user_id');
			});

			$contract_query->where('project_members.project_id', $project_task->project_id);
			$contract_query->where('project_members.user_id', auth()->user()->id);
			$contract_query->where('contracts.closed_at', null);
			
			if (!$contract = $contract_query->first()) {
				$failed_segments->push([
					'created_at' => $input_tracking_segment['created_at'],

					'session' => [
						'task_id' => $input_tracking_segment['session']['task_id'],
						'label' => $input_tracking_segment['session']['label'],
					],

					'error' => 'NO_CONTRACT',
				]);

				continue;
			}

			$tracking_segment_created_at = new \DateTime($input_tracking_segment['created_at']);

			if (time() - $tracking_segment_created_at->getTimestamp() > 86400) {
				$failed_segments->push([
					'created_at' => $input_tracking_segment['created_at'],

					'session' => [
						'task_id' => $input_tracking_segment['session']['task_id'],
						'label' => $input_tracking_segment['session']['label'],
					],

					'error' => 'OUT_TO_DATE',
				]);

				continue;
			}

			if ($tracking_segment_created_at->getTimestamp() - time() > 2 * 60 * 60) {
				$failed_segments->push([
					'created_at' => $input_tracking_segment['created_at'],

					'session' => [
						'task_id' => $input_tracking_segment['session']['task_id'],
						'label' => $input_tracking_segment['session']['label'],
					],

					'error' => 'DATE_IN_FUTURE',
				]);

				continue;
			}

			$tracking_segment_query = TrackingSegment::query();
			$tracking_segment_query->join('tracking_sessions', 'tracking_sessions.id', '=', 'tracking_segments.session_id');
			$tracking_segment_query->where('user_id', auth()->user()->id);

			$tracking_segment_query->whereRaw('FLOOR(UNIX_TIMESTAMP(tracking_segments.created_at) / 60) = FLOOR(UNIX_TIMESTAMP(?) / 60)', [
				$tracking_segment_created_at->format(\DateTime::ATOM),
			]);

			if ($tracking_segment_query->exists()) {
				$failed_segments->push([
					'created_at' => $input_tracking_segment['created_at'],

					'session' => [
						'task_id' => $input_tracking_segment['session']['task_id'],
						'label' => $input_tracking_segment['session']['label'],
					],

					'error' => 'TIME_ALREADY_EXISTS',
				]);

				continue;
			}

			DB::beginTransaction();

			try {
				$tracking_session_query = TrackingSession::query();
				$tracking_session_query->where('user_id', auth()->user()->id);
				$tracking_session_query->where('label', $input_tracking_segment['session']['label']);
				
				if (!$tracking_session = $tracking_session_query->first()) {
					$tracking_session = new TrackingSession;
					$tracking_session->user_id = auth()->user()->id;
					$tracking_session->label = $input_tracking_segment['session']['label'];
					$tracking_session->project_id = $project_task->project_id;
					$tracking_session->task_id = $project_task->id;
					$tracking_session->contract_id = $contract->id;
					$tracking_session->created_at = new \DateTime($input_tracking_segment['session']['created_at']);
					$tracking_session->app_version = $input_tracking_segment['session']['app_version'] ?? null;
					$tracking_session->save();
				}

				$tracking_day_query = TrackingDay::query();
				$tracking_day_query->where('project_id', $project_task->project_id);
				$tracking_day_query->where('user_id', auth()->user()->id);
				
				$tracking_day_query->where('created_at', date(
					\DateTime::ATOM,
					floor($tracking_segment_created_at->getTimestamp() / 86400) * 86400
				));

				if (!$tracking_day = $tracking_day_query->first()) {
					$tracking_day = new TrackingDay;
					$tracking_day->project_id = $project_task->project_id;
					$tracking_day->user_id = auth()->user()->id;
					$tracking_day->created_at = $tracking_segment_created_at;
					$tracking_day->save();
				}

				$tracking_segment = new TrackingSegment;
				$tracking_segment->session_id = $tracking_session->id;
				$tracking_segment->day_id = $tracking_day->id;
				$tracking_segment->fill($input_tracking_segment);
				$tracking_segment->created_at = $tracking_segment_created_at;
				$tracking_segment->save();
			} catch (\Exception $exception) {
				DB::rollback();
				throw $exception;
			}

			DB::commit();

			DB::statement(collect([
				'UPDATE project_members',
				'SET last_tracked_at = GREATEST(COALESCE(last_tracked_at, ?), ?)',
				'WHERE project_id = ?',
				'AND user_id = ?',
			])->join(' '), [
				$tracking_segment->created_at->format(\DateTime::ATOM),
				$tracking_segment->created_at->format(\DateTime::ATOM),
				$project_task->project_id,
				auth()->user()->id,
			]);

			$created_segments->push($tracking_segment);
		}

		return response()->resource([
			'created' => $created_segments,
			'failed' => $failed_segments,
		]);
	}
}
