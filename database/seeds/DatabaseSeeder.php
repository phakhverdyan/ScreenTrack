<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(PlansTableSeeder::class);
        $this->call(PlanAddonsTableSeeder::class);
        $this->call(CountriesTableSeeder::class);
        $this->call(CompanySizesTableSeeder::class);
        $this->call(LanguagesTableSeeder::class);
        $this->call(UserLinkTypesTableSeeder::class);
        $this->call(TipsTableSeeder::class);
    }
}
