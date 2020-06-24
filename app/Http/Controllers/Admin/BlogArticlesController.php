<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog\BlogArticle;


class BlogArticlesController extends Controller
{
    public function index() {
        $articles = BlogArticle::all();

        return view('admin.blog.articles.index',
            compact('articles'));
    }

    public function create() {
        return view('admin.blog.articles.create_or_edit');
    }

    public function edit($article_id) {
        $article = BlogArticle::findOrFail($article_id);

        return view('admin.blog.articles.create_or_edit',
            compact('article'));
    }
}
