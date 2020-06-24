<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddIndexToUserSpokenLanguage extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user__spoken_language', function (Blueprint $table) {
            $table->integer('index')->unsigned()->after('language_code');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user__spoken_language', function (Blueprint $table) {
            $table->dropColumn('index');
        });
    }
}
