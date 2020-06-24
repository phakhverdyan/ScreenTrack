<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddProjectIdToProjectTaskMembers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('project_task_members', function (Blueprint $table) {
            $table->bigInteger('project_id')->unsigned()->after('id');
            $table->bigInteger('project_member_id')->unsigned()->after('project_id');
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
            $table->dropColumn('project_id');
            $table->dropColumn('project_member_id');
        });
    }
}
