<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddStripeTokenIdToUserSignUps extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_sign_ups', function (Blueprint $table) {
            $table->string('stripe_token_id')->nullable()->after('company_country_code');
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
            $table->dropColumn('stripe_token_id');
        });
    }
}
