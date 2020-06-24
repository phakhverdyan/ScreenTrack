<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddFieldsForCompanies extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('companies', function (Blueprint $table) {
            $table->string('website')->after('name')->nullable();
            $table->text('description')->after('website')->nullable();
            $table->integer('phone_code')->after('description')->nullable();
            $table->text('phone_number')->after('phone_code')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('companies', function (Blueprint $table) {
            $table->dropColumn('website');
            $table->dropColumn('description');
            $table->dropColumn('phone_code');
            $table->dropColumn('phone_number');
        });
    }
}
