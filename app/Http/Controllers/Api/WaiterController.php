<?php

namespace App\Http\Controllers\Api;

use App\Models\Waiter;
use Illuminate\Http\Request;
use App\Http\Resources\BaseResource;
use App\Http\Controllers\Controller;

class WaiterController extends Controller
{
    public function create(Request $request)
    {
        $validator = validator()->make($request->all(), [
            'waiter' => 'required | array',
            'waiter.email' => 'required | email',
        ]);

        if ($validator->fails()) {
            return response([
                'error' => 'Validation',
                'validation_fields' => $validator->errors(),
            ], 400);
        }

        if (!$waiter = Waiter::where('email', $request->input('waiter.email'))->first()) {
            $waiter = new Waiter;
            $waiter->fill($request->input('waiter'));
            $waiter->save();
        }

        return new BaseResource($waiter);
    }
}
