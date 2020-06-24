<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\HelpCenter\HelpCenterArticleTag;
use App\Models\HelpCenter\HelpCenterArticle;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class HelpCenterArticlesController extends Controller
{
    private $dir_for_images = "/uploads/help_center_articles_images/";

    public function list(Request $request)
    {
        validator()->make($request->all(), [
            'search_query' => 'nullable|string',
            'intended_for' => 'nullable|string'
        ])->validate();

        $query = HelpCenterArticle::select();

        if (!empty($search_query = $request->input('search_query'))) {
            $query->where('title','LIKE','%'.$search_query.'%')
                ->orWhere('content','LIKE','%'.$search_query.'%');
        }

        if (!empty($intended_for = $request->input('intended_for'))) {
            $query->where('intended_for', $intended_for);
        }

        $articles = $query->get();

        return response()->resource($articles);
    }

    public function create(Request $request)
    {
        validator()->make($request->all(), [
            'article.title' => 'required|string|unique:help_center_articles,title',
            'article.intended_for' => 'required|string',
            'article.tags' => 'nullable|string',
            'article.content' => 'required|string',
        ])->validate();

        $data = $request->input('article');
        $data['slug'] = Str::slug($data['title']);
        $data['content'] = '';

        $article = HelpCenterArticle::create($data);

        $article->content = upload_inner_images($request->input('article.content'),
            $this->dir_for_images. $article->id);

        $article->save();

        $tags_ids = HelpCenterArticleTag::create_from_string_if_not_exists($request->input('article.tags'));

        $article->tags()->sync($tags_ids);

        return response()->resource($article);
    }

    public function update(Request $request, $article_id)
    {
        validator()->make($request->all(), [
            'article.title' => 'required|string|unique:help_center_articles,title,'.$article_id,
            'article.intended_for' => 'required|string',
            'article.tags' => 'nullable|string',
            'article.content' => 'required|string',
        ])->validate();

        $article = HelpCenterArticle::findOrFail($article_id);

        $data = $request->input('article');
        $data['slug'] = Str::slug($data['title']);

        $data['content'] = upload_inner_images($request->input('article.content'),
            $this->dir_for_images . $article_id);

        $article->fill($data);

        $article->save();

        $tags_ids = HelpCenterArticleTag::create_from_string_if_not_exists($request->input('article.tags'));
        $article->tags()->sync($tags_ids);

        return response()->resource($article);
    }

    public function delete($article_id)
    {
        $article = HelpCenterArticle::findOrFail($article_id);

        $article->delete();

        Storage::disk('public')->deleteDirectory($this->dir_for_images . $article->id);

        return response()->resource();
    }

    public function visitor_vote_yes(Request $request)
    {
        validator()->make($request->all(), [
            'article_id' => 'required|numeric',
        ])->validate();

        $article = HelpCenterArticle::findOrFail($request->input('article_id'));

        $article->increment('likes');

        return response()->resource($article);
    }

    public function visitor_vote_no(Request $request)
    {
        validator()->make($request->all(), [
            'article_id' => 'required|numeric',
        ])->validate();

        $article = HelpCenterArticle::findOrFail($request->input('article_id'));

        $article->increment('dislikes');

        return response()->resource($article);
    }

    public function visitor_viewed(Request $request)
    {
        validator()->make($request->all(), [
            'article_id' => 'required|numeric',
        ])->validate();

        $article = HelpCenterArticle::findOrFail($request->input('article_id'));

        $article->increment('views');

        return response()->resource($article);
    }
}
