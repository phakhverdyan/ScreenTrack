<?php

namespace App\Models\Blog;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Blog\BlogArticleTag
 *
 * @property int $id
 * @property string $title
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Blog\BlogArticleTag newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Blog\BlogArticleTag newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Blog\BlogArticleTag query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Blog\BlogArticleTag whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Blog\BlogArticleTag whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Blog\BlogArticleTag whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Blog\BlogArticleTag whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class BlogArticleTag extends Model
{
    protected $fillable = [
        'title',
    ];

    /*
    * Check if tags exist and create if not exist
    * from string example: "tag,tag2,tag3"
    *
    * Return array of all tags ids, which was found or created
    */
    public static function create_from_string_if_not_exists($tags_string)
    {
        $tags_ids = [];

        $tags_array = explode(',', $tags_string);

        foreach ($tags_array as $tag_title) {
            $tag = self::where('title', $tag_title)->first();

            if (empty($tag)) {
                $tag = self::create(['title'=>$tag_title]);
            }

            $tags_ids[] = $tag->id;
        }

        return $tags_ids;
    }
}
