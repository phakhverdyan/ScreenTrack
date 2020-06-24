<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateFieldsForInterviewResult extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (Schema::hasColumn('project_interview_results', 'result'))
        {
            Schema::table('project_interview_results', function($table) {
                $table->dropColumn(['result']);
            });
        }

        Schema::table('project_interview_results', function (Blueprint $table) {
            $table->string('token')->nullable()->after('id');
            $table->bigInteger('passed_interview_user_id')->nullable()->after('project_interview_id');
            $table->string('interview_title')->after('passed_interview_user_id');
            $table->text('questions')->nullable()->after('passed_interview_user_id');
            $table->text('answers')->nullable()->after('questions');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('project_interview_results', function (Blueprint $table) {
            $table->dropColumn(['token','passed_interview_user_id','questions','answers']);
        });
    }
}
