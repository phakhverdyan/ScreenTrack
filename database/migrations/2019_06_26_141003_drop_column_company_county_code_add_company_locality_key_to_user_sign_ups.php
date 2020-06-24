<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DropColumnCompanyCountyCodeAddCompanyLocalityKeyToUserSignUps extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_sign_ups', function (Blueprint $table) {
            $table->dropColumn('company_country_code');
            $table->string('company_locality_key')->nullable()->after('choosen_plan_addon_keys');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_sign_ups', function (Blueprint $table) {
            $table->dropColumn('company_locality_key');
            $table->string('company_country_code', 2)->nullable()->after('choosen_plan_addon_keys');
        });
    }
}
