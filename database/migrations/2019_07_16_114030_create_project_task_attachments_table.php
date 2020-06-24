<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectTaskAttachmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_task_attachments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('project_id')->unsigned()->index();
            $table->bigInteger('task_id')->unsigned()->index();
            $table->string('token', 60)->nullable()->unique();
            $table->string('title');
            $table->string('base_name');
            $table->string('mime_type')->nullable();
            $table->integer('size')->unsigned();
            $table->boolean('is_image');
            $table->integer('width')->unsigned()->nullable();
            $table->integer('height')->unsigned()->nullable();
            $table->boolean('is_cover');
            $table->boolean('is_cover_set_manually');
            $table->decimal('position', 65, 30)->unsigned();
            $table->timestamps();
        });

        DB::update('ALTER TABLE project_task_attachments AUTO_INCREMENT = 13879');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('project_task_attachments');
    }
}
