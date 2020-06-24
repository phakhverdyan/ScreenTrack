<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddBoardIdToProjectTaskMembers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('project_task_members', function (Blueprint $table) {
            $table->bigInteger('board_id')->unsigned()->after('project_member_id');
            $table->bigInteger('board_member_id')->unsigned()->after('board_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('project_task_members', function (Blueprint $table) {
            $table->dropColumn('board_id');
            $table->dropColumn('board_member_id');
        });
    }
}
