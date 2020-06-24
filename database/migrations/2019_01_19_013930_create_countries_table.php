<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCountriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('countries', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('alpha2_code', 2);
            $table->string('alpha3_code', 3);
            $table->string('calling_codes');
            $table->string('top_level_domains');
            $table->string('capital')->nullable();
            $table->string('alt_spellings');
            $table->string('region')->nullable();
            $table->string('subregion')->nullable();
            $table->integer('population')->unsigned()->nullable();
            $table->float('latitude', 10, 6)->nullable();
            $table->float('longitude', 10, 6)->nullable();
            $table->string('demonym')->nullable();
            $table->integer('area')->unsigned()->nullable();
            $table->float('gini', 9, 2)->nullable();
            $table->string('timezones');
            $table->string('borders');
            $table->string('native_name')->nullable();
            $table->string('numeric_code')->nullable();
            $table->string('currencies');
            $table->string('languages');
            $table->string('cioc', 5)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('countries');
    }
}
