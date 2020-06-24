<?php

namespace App\Http\Controllers\Api\Company;

use App\Models\Company\Company;
use App\Models\Company\CompanyImage;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Geo\Locality;

class CompanyController extends Controller
{
    public function create(Request $request) {
        Locality::getOrMakeByKey($request->input('company.locality_key'));

        validator()->make($request->all(), [
            'company' => 'required|array',
            'company.name' => 'required|string',
            'company.image_key' => 'nullable|string',
            'company.website_url' => 'nullable|url',
            'company.locality_key' => 'required|string|exists:localities,key',
            'company.phone_number' => 'nullable|string',
            'company.description' => 'nullable|string',
        ])->validate();

        $company = new Company;
        $company->fill($request->input('company'));
        $company->owner_user_id = auth()->user()->id;
        $company->save();

        if ($request->has('company.image_key')) {
            $image_key = $request->input('company.image_key');
            list($company_image_id, $company_image_token) = array_merge(explode('.', $image_key), [null]);

            $company_image = CompanyImage::where('token', $company_image_token)->first();

            if (! empty($company_image)) {
                $company_image->company_id = $company->id;
                $company_image->save();
            }
        }

        return response()->resource($company);
    }

    public function update(Request $request, $company_id) {
        $company = Company::findOrFail($company_id);
        auth()->user()->canEditCompanyOrForbidden($company);

        Locality::getOrMakeByKey($request->input('company.locality_key'));

        validator()->make($request->all(), [
            'company' => 'required|array',
            'company.name' => 'nullable|string',
            'company.website_url' => 'nullable|url',
            'company.locality_key' => 'nullable|string',
            'company.phone_number' => 'nullable|string',
            'company.description' => 'nullable|string',
        ])->validate();

        $company->fill($request->input('company'));
        $company->save();

        return response()->resource($company);
    }

    public function delete($company_id) {
        $company = Company::findOrFail($company_id);
        auth()->user()->canDeleteCompanyOrForbidden($company);
        $company->delete();

        return response()->resource();
    }
}
