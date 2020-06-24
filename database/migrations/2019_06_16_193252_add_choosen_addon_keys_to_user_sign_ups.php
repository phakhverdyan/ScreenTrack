<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddChoosenAddonKeysToUserSignUps extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_sign_ups', function (Blueprint $table) {
            $table->text('choosen_plan_addon_keys')->nullable()->after('company_size_key');
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
            $table->dropColumn('choosen_plan_addon_keys');
        });
    }
}
