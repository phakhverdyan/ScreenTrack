<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCreatorUserIdFieldForProjectInterviews extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('project_interviews', function (Blueprint $table) {
            $table->bigInteger('creator_user_id')->after('project_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('project_interviews', function (Blueprint $table) {
            $table->dropColumn('creator_user_id');
        });
    }
}
