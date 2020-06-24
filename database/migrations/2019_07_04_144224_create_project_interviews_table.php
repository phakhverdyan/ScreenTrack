<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectInterviewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_interviews', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->string('hash');
            $table->bigInteger('project_id');
            $table->string('title');
            $table->text('description')->nullable();
            $table->double('hourly_rate')->nullable();
            $table->string('notification_email')->nullable();
            $table->text('thank_you_message')->nullable();

            $table->timestamps();
        });

        DB::update('ALTER TABLE project_interviews AUTO_INCREMENT = 13879');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('project_interviews');
    }
}
