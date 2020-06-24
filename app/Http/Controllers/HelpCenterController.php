<?php

namespace App\Http\Controllers;

use App\Models\HelpCenter\HelpCenterArticle;

class HelpCenterController extends Controller
{
    public function show_index()
    {
        return view('help_center.index');
    }

    public function show_articles_list($locale, $intended_for_slug)
    {
        if (empty($intended_for_key = HelpCenterArticle::getIntendedForKeyBySlug($intended_for_slug))) {
            abort(404);
        }

        $articles = HelpCenterArticle::where('intended_for', $intended_for_key)->get();

        $intended_for = HelpCenterArticle::getIntendedForList()[$intended_for_key];

        return view('help_center.articles_list', compact('articles','intended_for'));
    }

    public function show_article($article_slug)
    {
        $article = HelpCenterArticle::where('slug', $article_slug)->firstOrFail();

        $intended_for = HelpCenterArticle::getIntendedForList()[$article->intended_for];

        return view('help_center.article',compact('article','intended_for'));
    }
}
