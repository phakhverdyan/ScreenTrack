<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectInterviewResultsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_interview_results', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->bigInteger('project_interview_id');
            $table->text('result')->nullable();

            $table->timestamps();
        });

        DB::update('ALTER TABLE project_interview_results AUTO_INCREMENT = 13879');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('project_interview_results');
    }
}
