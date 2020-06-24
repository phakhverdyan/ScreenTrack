<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class FixFeeColumnsInDeposits extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('deposits', function (Blueprint $table) {
            $table->dropColumn('original_amount');
            $table->dropColumn('stripe_fee');
        });

        Schema::table('deposits', function (Blueprint $table) {
            $table->float('original_amount', 10, 2)->unsigned()->after('user_id');
            $table->float('stripe_fee', 10, 2)->unsigned()->after('original_amount');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('deposits', function (Blueprint $table) {
            //
        });
    }
}
