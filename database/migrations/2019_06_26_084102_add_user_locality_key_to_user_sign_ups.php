<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddUserLocalityKeyToUserSignUps extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_sign_ups', function (Blueprint $table) {
            $table->string('user_locality_key')->nullable()->after('user_last_name');
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
            $table->dropColumn('user_locality_key');
        });
    }
}
