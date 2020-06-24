<?php

namespace App\Http\Controllers\Api\Company;

use App\Models\Company\CompanyImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class CompanyImageController extends Controller
{
	public function create(Request $request)
	{
		$validator = validator()->make($request->all(), [
			'company_image.file' => 'required|image|mimes:jpeg,png,jpg,gif|dimensions:min_width=200,min_height=200|max:10240',
		]);

		if ($validator->fails()) {
			return response([
				'error' => 'Validation',
				'validation_fields' => $validator->errors(),
			], 400);
		}

		DB::beginTransaction();

		try {
            $company_image = new CompanyImage;
            $company_image->company_id = null;

			if ($request->hasFile('company_image.file')) {
				if (!$company_image->exists) {
                    $company_image->save();
                    $company_image->generateToken();
				}

                $company_image->setFile($request->file('company_image.file'));
                $company_image->makeThumbnails();
                ++$company_image->version;
			}

            $company_image->save();
		} catch (\Exception $exception) {
			DB::rollback();
			throw $exception;
		}

		DB::commit();

		return response()->resource($company_image);
	}

    public function update(Request $request, $image_key)
    {
        list($company_image_id, $company_image_token) = array_merge(explode('.', $image_key), [null]);

        $company_image =  CompanyImage::where('token', $company_image_token)->firstOrFail();

        if ($company_image->company_id) {
            $company = $company_image->company()->first();
            auth()->user()->canEditCompanyOrForbidden($company);
        } else {
           if($company_image->token != $company_image_token) {
               abort(403);
           }
        }

        $validator = validator()->make($request->all(), [
            'company_image.file' => 'image|mimes:jpeg,png,jpg,gif|dimensions:min_width=600,min_height=600|max:10240',
            'company_image.crop_data' => 'array',
            'company_image.crop_data.width' => 'required_with:item_image.crop_data|numeric',
            'company_image.crop_data.height' => 'required_with:item_image.crop_data|numeric',
            'company_image.crop_data.x' => 'required_with:item_image.crop_data|numeric',
            'company_image.crop_data.y' => 'required_with:item_image.crop_data|numeric',
        ]);

        if ($validator->fails()) {
            return response([
                'error' => 'Validation',
                'validation_fields' => $validator->errors(),
            ], 400);
        }

        DB::beginTransaction();

        try {
            if ($request->hasFile('company_image.file')) {
                if (!$company_image->exists) {
                    $company_image->save();
                    $company_image->generateToken();
                }

                $company_image->setFile($request->file('company_image.file'));
            }

            if ($request->has('company_image.crop_data')) {
                $company_image->crop_data = [
                    'width' => (int) $request->input('company_image.crop_data.width'),
                    'height' => (int) $request->input('company_image.crop_data.height'),
                    'x' => (int) $request->input('company_image.crop_data.x'),
                    'y' => (int) $request->input('company_image.crop_data.y'),
                ];
            }

            if ($request->hasFile('company_image.file') || $request->has('company_image.crop_data')) {
                $company_image->makeThumbnails();
                ++$company_image->version;
            }

            $company_image->save();
        } catch (\Exception $exception) {
            DB::rollback();
            throw $exception;
        }

        DB::commit();

        return response()->resource($company_image->makeVisible([
            'crop_data',
        ]));
    }
}
