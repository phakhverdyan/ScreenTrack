<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Tracking\TrackingCommand;

class TrackingCommandController extends Controller
{
    public function index()
    {
    	$tracking_commands = TrackingCommand::orderBy('id', 'desc')->paginate(25);

    	return view('admin.tracking_commands.index', [
    		'tracking_commands' => $tracking_commands,
    	]);
    }
}
