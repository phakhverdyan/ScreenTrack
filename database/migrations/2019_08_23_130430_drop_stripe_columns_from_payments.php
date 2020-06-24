<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DropStripeColumnsFromPayments extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('payments', function (Blueprint $table) {
            $table->dropColumn('stripe_source_id');
            $table->dropColumn('stripe_charge_id');
            $table->dropColumn('stripe_fee');
            $table->dropColumn('return_amount');
            $table->bigInteger('user_id')->unsigned()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('payments', function (Blueprint $table) {
            $table->float('stripe_fee', 3, 2)->after('processing_fee');
            $table->float('return_amount', 12, 4)->after('final_amount');
            $table->string('stripe_source_id')->after('description');
            $table->string('stripe_charge_id')->nullable()->after('stripe_source_id');
        });
    }
}
