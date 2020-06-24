<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class HelpCenterArticleHelpCenterArticleTag extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('help_center_article__help_center_article_tag', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('help_center_article_id');
            $table->bigInteger('help_center_article_tag_id');
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
        Schema::dropIfExists('help_center_article__help_center_article_tag');
    }
}
