<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddEarnedAmountAndMaximumAmountToReferralConnections extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('referral_connections', function (Blueprint $table) {
            $table->float('earned_amount', 12, 4)->unsigned()->after('type');
            $table->float('maximum_amount', 12, 4)->unsigned()->nullable()->after('earned_amount');
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
            $table->dropColumn('earned_amount');
            $table->dropColumn('maximum_amount');
        });
    }
}
