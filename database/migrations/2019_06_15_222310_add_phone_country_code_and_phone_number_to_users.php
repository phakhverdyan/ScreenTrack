<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPhoneCountryCodeAndPhoneNumberToUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone_country_code', 2)->nullable()->after('account_type');
            $table->integer('phone_code')->unsigned()->nullable()->after('phone_country_code');
            $table->string('phone_number')->nullable()->after('phone_code');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('phone_country_code');
            $table->dropColumn('phone_code');
            $table->dropColumn('phone_number');
        });
    }
}
