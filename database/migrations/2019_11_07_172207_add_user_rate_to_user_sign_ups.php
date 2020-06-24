<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddUserRateToUserSignUps extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_sign_ups', function (Blueprint $table) {
            $table->float('user_hourly_rate')->unsigned()->nullable()->after('user_skype');
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
            $table->dropColumn('user_hourly_rate');
        });
    }
}
