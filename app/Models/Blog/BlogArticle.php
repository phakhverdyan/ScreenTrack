<?php

namespace App\Models\Blog;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Blog\BlogArticle
 *
 * @property int $id
 * @property string $slug
 * @property string $title
 * @property string $content
 * @property int $likes
 * @property int $dislikes
 * @property int $views
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $created_at_for_humans
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Blog\BlogArticleTag[] $tags
 * @property-read int|null $tags_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Blog\BlogArticle newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Blog\BlogArticle newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Blog\BlogArticle query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Blog\BlogArticle whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Blog\BlogArticle whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Blog\BlogArticle whereDislikes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Blog\BlogArticle whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Blog\BlogArticle whereLikes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Blog\BlogArticle whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Blog\BlogArticle whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Blog\BlogArticle whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Blog\BlogArticle whereViews($value)
 * @mixin \Eloquent
 */
class BlogArticle extends Model
{
    private $tags_model = BlogArticleTag::class;

    protected $fillable = [
        'slug',
        'title',
        'content',
        'intended_for',
    ];

    public function getCreatedAtForHumansAttribute()
    {
        return $this->created_at->diffForHumans();
    }

    public function tags() {
        return $this->belongsToMany(BlogArticleTag::class,'blog_article__blog_article_tag');
    }

    public function get_tags_string() {
        return implode(',', $this->tags->pluck('title')->toArray());
    }

    public function get_related_articles($count)
    {
        $this_article_tags_ids = $this->tags->pluck('id')->toArray();

        $articles = self::whereHas('tags', function ($query) use ($this_article_tags_ids){
            $query->whereIn( $this->tags()->getRelated()->getTable() . '.id', $this_article_tags_ids);
        })->where('id','!=', $this->id)->get();

        // move to top articles which has more same tags with current article
        $articles = $articles->sort(function ($a, $b) use ($this_article_tags_ids){
            $a_tags_ids = $a->tags->pluck('id')->toArray();
            $b_tags_ids = $b->tags->pluck('id')->toArray();

            $a_diff_count = count(array_diff($this_article_tags_ids, $a_tags_ids));
            $b_diff_count = count(array_diff($this_article_tags_ids, $b_tags_ids));

            return $a_diff_count <=> $b_diff_count;
        });

        return $articles->take($count);
    }
}
