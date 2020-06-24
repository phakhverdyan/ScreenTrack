<?php

namespace App\Http\Controllers\Api\Tracking;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Contract;
use App\Models\Project\ProjectTask;
use App\Models\Tracking\TrackingSession;
use App\Models\Tracking\TrackingScreenshot;

class TrackingScreenshotController extends Controller
{
    public function create(Request $request)
    {
    	validator()->make($request->all(), [
			'tracking_screenshot' => 'required|array',
			'tracking_screenshot.file' => 'required|file|max:10240',
			'tracking_screenshot.created_at' => 'required|date',
			'tracking_screenshot.session' => 'required|array',
			'tracking_screenshot.session.label' => 'required|string',
			'tracking_screenshot.session.task_id' => 'required|integer',
			'tracking_screenshot.session.created_at' => 'required|date',
			'tracking_screenshot.session.app_version' => 'nullable|string',
		])->validate();

		if (!$project_task = ProjectTask::find($request->input('tracking_screenshot.session.task_id'))) {
			return response()->error('TASK_NOT_FOUND');
		}

		if (!auth()->user()->canAccessProjectTask($project_task)) {
			return response()->error('NO_ACCESS_TO_TASK');
		}

		$contract_query = Contract::select('contracts.*');
		$contract_query->join('project_members', 'project_members.user_id', '=', 'contracts.employee_user_id');

		$contract_query->join('projects', function ($join) {
			$join->on('projects.id', '=', 'project_members.project_id');
			$join->on('projects.owner_user_id', '=', 'contracts.employer_user_id');
		});

		$contract_query->where('contracts.employee_user_id', auth()->user()->id);
		$contract_query->where('project_members.project_id', $project_task->project_id);
		$contract_query->where('contracts.closed_at', null);

		if (!$contract = $contract_query->first()) {
			return response()->error('NO_CONTRACT');
		}

		$tracking_screenshot_created_at = new \DateTime($request->input('tracking_screenshot.created_at'));

		if (time() - $tracking_screenshot_created_at->getTimestamp() > 86400) {
			return response()->error('OUT_TO_DATE');
		}

		if ($tracking_screenshot_created_at->getTimestamp() - time() > 2 * 60 * 60) {
			return response()->error('DATE_IN_FUTURE');
		}

		DB::beginTransaction();

		try {
			$tracking_session_query = TrackingSession::query();
			$tracking_session_query->where('user_id', auth()->user()->id);
			$tracking_session_query->where('label', $request->input('tracking_screenshot.session.label'));
			
			if (!$tracking_session = $tracking_session_query->first()) {
				$tracking_session = new TrackingSession;
				$tracking_session->user_id = auth()->user()->id;
				$tracking_session->label = $request->input('tracking_screenshot.session.label');
				$tracking_session->project_id = $project_task->project_id;
				$tracking_session->task_id = $project_task->id;
				$tracking_session->contract_id = $contract->id;
				$tracking_session->created_at = new \DateTime($request->input('tracking_screenshot.session.created_at'));
				$tracking_session->app_version = $request->input('tracking_screenshot.session.app_version');
				$tracking_session->save();
			}
			
			$tracking_screenshot = new TrackingScreenshot;
			$tracking_screenshot->session_id = $tracking_session->id;
			$tracking_screenshot->created_at = $tracking_screenshot_created_at;
			$tracking_screenshot->save();
			$tracking_screenshot->generateToken();
			$tracking_screenshot->setFile($request->file('tracking_screenshot.file'));
			$tracking_screenshot->makeThumbnails();
			$tracking_screenshot->save();
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
			$tracking_screenshot->created_at->format(\DateTime::ATOM),
			$tracking_screenshot->created_at->format(\DateTime::ATOM),
			$project_task->project_id,
			auth()->user()->id,
		]);

		return response()->resource($tracking_screenshot);
    }
}
