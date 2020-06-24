<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTypeToContracts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('ALTER TABLE contracts CHANGE hourly_rate hourly_rate DOUBLE(9,2) UNSIGNED NULL');

        Schema::table('contracts', function (Blueprint $table) {
            $table->enum('type', [
                'HOURLY',
                'FIXED_PRICE',
            ])->default('HOURLY')->after('employee_user_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('contracts', function (Blueprint $table) {
            $table->dropColumn('type');
        });
    }
}
