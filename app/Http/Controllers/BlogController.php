<?php

namespace App\Http\Controllers;

use App\Models\Blog\BlogArticle;

class BlogController extends Controller
{
    public function show_index()
    {
        $articles = BlogArticle::all();

        return view('blog.index', compact('articles'));
    }

    public function show_article($locale, $article_slug)
    {
        $article = BlogArticle::where('slug', $article_slug)->firstOrFail();

        return view('blog.article',compact('article'));
    }
}
