<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTipsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('user_tips');

        Schema::create('tips', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('key');
            $table->integer('step');
            $table->string('route')->nullable();
            $table->string('selector');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tips');

        Schema::create('user_tips', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('user_id');
            $table->string('key');

            $table->timestamps();
        });
    }
}
