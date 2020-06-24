<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AdditionalFieldsForUsersTable extends Migration
{

    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('language_code',2)->after('last_name')->nullable();
            $table->string('timezone')->after('last_name')->nullable();
            $table->string('title')->after('last_name')->nullable();
        });
    }


    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('language_code');
            $table->dropColumn('timezone');
            $table->dropColumn('title');

        });
    }
}
