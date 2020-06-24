<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MakeRoleEnumInProjectMembers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("ALTER TABLE project_members MODIFY COLUMN role ENUM('OWNER', 'ADMINISTRATOR', 'CONTRACTOR') NOT NULL");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('project_members', function (Blueprint $table) {
            DB::statement("ALTER TABLE project_members MODIFY COLUMN role VARCHAR(191)");
        });
    }
}
