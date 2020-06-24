<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Company\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    public function index() {
        $user = auth()->user();

        $user->load([
            'companies' => function ($query) {
                $query->orderBy('id', 'desc');
            },
        ]);

        return view('dashboard.companies.index', compact([
            'user',
        ]));
    }

    public function create() {
        $company = null;

        return view('dashboard.companies.create_or_edit', compact([
            'company',
        ]));
    }

    public function edit($company_id) {
        $company = Company::with([
            'locality',
            'locality.country',
        ])->where('id', $company_id)->firstOrFail();

        auth()->user()->canEditCompanyOrNotFound($company);

        return view('dashboard.companies.create_or_edit', compact([
            'company',
        ]));
    }
}
