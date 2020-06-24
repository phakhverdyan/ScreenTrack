<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HelpCenter\HelpCenterArticle;

class HelpCenterArticlesController extends Controller
{
    public function index() {
        $articles = HelpCenterArticle::all();

        $intended_for_list = HelpCenterArticle::getIntendedForList();

        return view('admin.help_center.articles.index',
            compact('articles','intended_for_list'));
    }

    public function create() {
        $intended_for_list = HelpCenterArticle::getIntendedForList();

        return view('admin.help_center.articles.create_or_edit',
            compact('articles','intended_for_list'));
    }

    public function edit($article_id) {
        $article = HelpCenterArticle::findOrFail($article_id);
        $intended_for_list = HelpCenterArticle::getIntendedForList();

        return view('admin.help_center.articles.create_or_edit',
            compact('article','intended_for_list'));
    }
}
