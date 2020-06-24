<?php

namespace App\Models\HelpCenter;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\HelpCenter\HelpCenterArticleTag
 *
 * @property int $id
 * @property string $title
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HelpCenter\HelpCenterArticleTag newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HelpCenter\HelpCenterArticleTag newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HelpCenter\HelpCenterArticleTag query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HelpCenter\HelpCenterArticleTag whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HelpCenter\HelpCenterArticleTag whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HelpCenter\HelpCenterArticleTag whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HelpCenter\HelpCenterArticleTag whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class HelpCenterArticleTag extends Model
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
