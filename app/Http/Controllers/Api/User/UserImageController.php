<?php

namespace App\Http\Controllers\Api\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\User\UserImage;

class UserImageController extends Controller
{
	public function update(Request $request, $user_id)
	{
		$user = ($user_id == 'me' ? auth()->user() : User::findOrFail($user_id));
		auth()->user()->canEditUserOrForbidden($user);
		$user_image = $user->image()->first();

		$validator = validator()->make($request->all(), [
			'user_image.file' => '' .
				($user_image ? '' : 'required|') .
				'image|mimes:jpeg,png,jpg,gif|dimensions:min_width=200,min_height=200|max:10240' .
			'',

			'user_image.crop_data' => 'array',
			'user_image.crop_data.width' => 'required_with:item_image.crop_data|numeric',
			'user_image.crop_data.height' => 'required_with:item_image.crop_data|numeric',
			'user_image.crop_data.x' => 'required_with:item_image.crop_data|numeric',
			'user_image.crop_data.y' => 'required_with:item_image.crop_data|numeric',
		]);

		if ($validator->fails()) {
			return response([
				'error' => 'Validation',
				'validation_fields' => $validator->errors(),
			], 400);
		}

		DB::beginTransaction();

		try {
			if (!$user_image) {
				$user_image = new UserImage;
				$user_image->user_id = $user->id;
			}

			if ($request->hasFile('user_image.file')) {
				if (!$user_image->exists) {
					$user_image->save();
					$user_image->generateToken();
				}

				$user_image->setFile($request->file('user_image.file'));
			}

			if ($request->has('user_image.crop_data')) {
				$user_image->crop_data = [
					'width' => (int) $request->input('user_image.crop_data.width'),
					'height' => (int) $request->input('user_image.crop_data.height'),
					'x' => (int) $request->input('user_image.crop_data.x'),
					'y' => (int) $request->input('user_image.crop_data.y'),
				];
			}

			if ($request->hasFile('user_image.file') || $request->has('user_image.crop_data')) {
				$user_image->makeThumbnails();
				++$user_image->version;
			}

			$user_image->save();
		} catch (\Exception $exception) {
			DB::rollback();
			throw $exception;
		}

		DB::commit();

		return response()->resource($user_image->makeVisible([
			'crop_data',
		]));
	}
}
