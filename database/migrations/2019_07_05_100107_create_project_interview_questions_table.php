<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectInterviewQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_interview_questions', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->bigInteger('project_interview_id');
            $table->bigInteger('sort_position')->default(0);
            $table->string('title');
            $table->text('details')->nullable();

            $table->timestamps();
        });

        DB::update('ALTER TABLE project_interview_questions AUTO_INCREMENT = 13879');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('project_interview_questions');
    }
}
