<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RenameLastProjectViewedAtToLastWorkedAt extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('project_members', function (Blueprint $table) {
            $table->timestamp('last_tracked_at')->nullable()->after('last_project_viewed_at');
            $table->renameColumn('last_project_viewed_at', 'last_viewed_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('project_members', function (Blueprint $table) {
            $table->dropColumn('last_tracked_at');
            $table->renameColumn('last_viewed_at', 'last_project_viewed_at');
        });
    }
}
