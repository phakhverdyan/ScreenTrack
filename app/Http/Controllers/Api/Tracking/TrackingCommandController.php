<?php

namespace App\Http\Controllers\Api\Tracking;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Tracking\TrackingCommand;

class TrackingCommandController extends Controller
{
    public function require(Request $request)
    {
        validator()->make($request->all(), [
            'tracking_command' => 'required|array',
            'tracking_command.user_id' => 'required|string|exists:users,id',
            'tracking_command.request' => 'required|string',
        ])->validate();

        return realtime('tracking_command_required', $request->input('tracking_command'));
    }

    public function create(Request $request)
    {
    	validator()->make($request->all(), [
			'tracking_command' => 'required|array',
			'tracking_command.request' => 'required|string',
			'tracking_command.app_version' => 'nullable|string',
			'tracking_command.response' => 'required|string',
		])->validate();

    	$tracking_command = new TrackingCommand;
        $tracking_command->user_id = auth()->user()->id;
    	$tracking_command->fill($request->input('tracking_command'));
    	$tracking_command->save();

    	return response()->resource($tracking_command);
    }
}
