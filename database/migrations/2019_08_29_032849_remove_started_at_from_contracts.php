<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RemoveStartedAtFromContracts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('contracts', function (Blueprint $table) {
            $table->dropColumn('started_at');
            $table->dropColumn('finished_at');
            $table->timestamp('closed_at')->nullable()->after('hourly_rate');
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
            $table->dropColumn('closed_at');
            $table->timestamp('started_at')->nullable()->after('hourly_rate');
            $table->timestamp('finished_at')->nullable()->after('started_at');
        });
    }
}
