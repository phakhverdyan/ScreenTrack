<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class BlogArticleBlogArticleTag extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('blog_article__blog_article_tag', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('blog_article_id');
            $table->bigInteger('blog_article_tag_id');
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
        Schema::dropIfExists('blog_article__blog_article_tag');
    }
}
