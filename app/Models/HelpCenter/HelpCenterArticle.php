<?php

namespace App\Models\HelpCenter;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\HelpCenter\HelpCenterArticle
 *
 * @property int $id
 * @property string $slug
 * @property string $title
 * @property string $intended_for
 * @property string $content
 * @property int $likes
 * @property int $dislikes
 * @property int $views
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $created_at_for_humans
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\HelpCenter\HelpCenterArticleTag[] $tags
 * @property-read int|null $tags_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HelpCenter\HelpCenterArticle newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HelpCenter\HelpCenterArticle newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HelpCenter\HelpCenterArticle query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HelpCenter\HelpCenterArticle whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HelpCenter\HelpCenterArticle whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HelpCenter\HelpCenterArticle whereDislikes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HelpCenter\HelpCenterArticle whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HelpCenter\HelpCenterArticle whereIntendedFor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HelpCenter\HelpCenterArticle whereLikes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HelpCenter\HelpCenterArticle whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HelpCenter\HelpCenterArticle whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HelpCenter\HelpCenterArticle whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HelpCenter\HelpCenterArticle whereViews($value)
 * @mixin \Eloquent
 */
class HelpCenterArticle extends Model
{
    const FOR_FREELANCER = 'FOR_FREELANCER';
    const FOR_EMPLOYER = 'FOR_EMPLOYER';
    const FOR_AFFILIATE = 'FOR_AFFILIATE';

    protected $fillable = [
        'slug',
        'title',
        'content',
        'intended_for',
    ];

    protected $appends = ['created_at_for_humans'];

    public static function getIntendedForList() {
        return  [
            self::FOR_FREELANCER => [
                'title' => __('help_center.freelancers'),
                'slug' => 'for-freelancers',
            ],
            self::FOR_EMPLOYER => [
                'title' => __('help_center.employers'),
                'slug' => 'for-employers',
            ],
            self::FOR_AFFILIATE => [
                'title' => __('help_center.affiliates'),
                'slug' => 'for-affiliates',
            ],
        ];
    }

    public function getCreatedAtForHumansAttribute()
    {
        return $this->created_at->diffForHumans();
    }

    public static function getIntendedForKeyBySlug($intended_for_slug) {
        $intended_for_key = null;

        foreach (HelpCenterArticle::getIntendedForList() as $key => $value) {
            if ($value['slug'] == $intended_for_slug) {
                $intended_for_key = $key;
            }
        }

        return $intended_for_key;
    }

    public function tags() {
        return $this->belongsToMany(HelpCenterArticleTag::class,'help_center_article__help_center_article_tag');
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
