<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddHourRateWebsiteLocationFieldsForUsers extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->integer('hourly_rate')->unsigned()->nullable()->after('skype');
            $table->string('website_url')->after('hourly_rate')->nullable();
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('hourly_rate');
            $table->dropColumn('website_url');
        });
    }
}
