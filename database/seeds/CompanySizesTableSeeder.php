<?php

use Illuminate\Database\Seeder;
use App\Models\Company\CompanySize;

class CompanySizesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $seeding_company_sizes = [
        	[
        		'key' => 'mini',
        		'title' => '1 - 4 employees',
        	], [
        		'key' => 'small',
        		'title' => '5 - 9 employees',
        	], [
        		'key' => 'usual',
        		'title' => '10 - 49 employees',
        	], [
        		'key' => 'big',
        		'title' => '50 - 199 employees',
        	], [
        		'key' => 'large',
        		'title' => '200 - 499 employees',
        	],
        ];

        foreach ($seeding_company_sizes as $seeding_company_size) {
        	if (!$company_size = CompanySize::where('key', $seeding_company_size['key'])->first()) {
        		$company_size = new CompanySize;
        	}

        	$company_size->key = $seeding_company_size['key'];
        	$company_size->title = $seeding_company_size['title'];
        	$company_size->save();
        }

        echo 'The `country_sizes` table were seeded successfully.' . "\n";
    }
}
