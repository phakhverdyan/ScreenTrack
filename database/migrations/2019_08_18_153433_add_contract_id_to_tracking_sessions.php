<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddContractIdToTrackingSessions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tracking_sessions', function (Blueprint $table) {
            $table->bigInteger('contract_id')->unsigned()->after('project_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tracking_sessions', function (Blueprint $table) {
            $table->dropColumn('contract_id');
        });
    }
}
