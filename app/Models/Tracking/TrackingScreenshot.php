<?php

namespace App\Models\Tracking;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

/**
 * App\Models\Tracking\TrackingScreenshot
 *
 * @property int $id
 * @property int $session_id
 * @property string|null $token
 * @property int $width
 * @property int $height
 * @property mixed|null $created_at
 * @property-read mixed $key
 * @property-read mixed $urls
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingScreenshot newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingScreenshot newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingScreenshot query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingScreenshot whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingScreenshot whereHeight($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingScreenshot whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingScreenshot whereSessionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingScreenshot whereToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Tracking\TrackingScreenshot whereWidth($value)
 * @mixin \Eloquent
 */
class TrackingScreenshot extends Model
{
    public $timestamps = false;

    public static $root_path = 'uploads/tracking_screenshots';

    public static $thumbnail_widths = [
        'small' => 300,
        'middle' => 500,
    ];

    public $attributes = [
        'token' => null,
        'session_id' => 0,
        'width' => 0,
        'height' => 0,
    ];

    public $casts = [
        'created_at' => 'datetime:' . \DateTime::ATOM,
    ];

    public $hidden = [
        'token',
        'session_id',
    ];

    public $appends = [
        'key',
        'urls',
    ];

    // ---------------------------------------------------------------------- //

    public function getKeyAttribute()
    {
        if (!$this->id) {
            return null;
        }

        return $this->id . '.' . $this->token;
    }

    public function getUrlsAttribute()
    {
        return (object) collect(['original'])->concat(array_keys(self::$thumbnail_widths))->mapWithKeys(function ($size) {
            return [$size => $this->getUrl($size)];
        })->toArray();
    }

    // ---------------------------------------------------------------------- //

    public function getUrl($type = 'original')
    {
        return asset_no_cache($this->getDirectoryPath() . '/' . $this->key . ($type == 'original' ? '' : '.' . $type) . '.jpg?' . $this->version);
    }

    public function generateToken()
    {
        $this->token = Str::random(60);

        return $this;
    }

    public function getDirectoryPath()
    {
        return implode('/', [
            self::$root_path,
            sprintf('%02d', floor(($this->id - 1) / 100 / 100 / 100 / 100)),
            sprintf('%02d', floor(($this->id - 1) / 100 / 100 / 100)),
            sprintf('%02d', floor(($this->id - 1) / 100 / 100)),
            sprintf('%02d', floor(($this->id - 1) / 100)),
        ]);
    }

    public function setFile($file)
    {
        $directory_path = $this->getDirectoryPath();
        \File::makeDirectory($directory_path, 0775, true, true);
        $image_file = \Image::make($file)->encode('jpg');
        $this->width = $image_file->width();
        $this->height = $image_file->height();
        $full_path = $directory_path . '/' . $this->key . '.jpg';
        \Storage::disk('public')->put($full_path, $image_file->stream()->__toString());

        return $this;
    }

    public function makeThumbnails()
    {
        $directory_path = $this->getDirectoryPath();
        $path_to_original = $directory_path . '/' . $this->key . '.jpg';

        foreach (self::$thumbnail_widths as $thumbnail_size_name => $thumbnail_width) {
            if ($this->width >= $thumbnail_width) {
                $thumbnail_image_file = \Image::make($path_to_original)->encode('jpg');
                
                $thumbnail_image_file = $thumbnail_image_file->resize($thumbnail_width, null, function ($constraint) {
                    $constraint->aspectRatio();
                });

                $full_path = $directory_path . '/' . $this->key . '.' . $thumbnail_size_name . '.jpg';
                \Storage::disk('public')->put($full_path, $thumbnail_image_file->stream()->__toString());
            }
        }

        return $this;
    }
}
