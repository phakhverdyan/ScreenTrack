<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHelpCenterArticlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('help_center_articles', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->string('slug');
            $table->string('title');
            $table->string('intended_for');
            $table->longText('content');
            $table->integer('likes')->default(0);
            $table->integer('dislikes')->default(0);
            $table->bigInteger('views')->default(0);

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
        Schema::dropIfExists('help_center_articles');
    }
}
