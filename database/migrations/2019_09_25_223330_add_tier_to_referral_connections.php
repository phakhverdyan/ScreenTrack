<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTierToReferralConnections extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('referral_connections', function (Blueprint $table) {
            $table->tinyInteger('tier')->unsigned()->after('type');
        });

        DB::statement('UPDATE referral_connections SET tier = 1 WHERE type = ?', ['DIRECT']);
        DB::statement('UPDATE referral_connections SET tier = 2, maximum_amount = 50.0 WHERE type = ?', ['INDIRECT']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('referral_connections', function (Blueprint $table) {
            $table->dropColumn('tier');
        });
    }
}
