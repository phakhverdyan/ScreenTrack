<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddStateToTrackingSegments extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tracking_segments', function (Blueprint $table) {
            $table->enum('state', [
                'PAID',
            ])->nullable()->after('count_of_mouse_clicks');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tracking_segments', function (Blueprint $table) {
            $table->dropColumn('state');
        });
    }
}
