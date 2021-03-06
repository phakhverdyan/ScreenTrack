<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddProgressToReferralConnections extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('referral_connections', function (Blueprint $table) {
            $table->float('progress', 5, 4)->unsigned()->after('maximum_amount');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('referral_connections', function (Blueprint $table) {
            $table->dropColumn('progress');
        });
    }
}
