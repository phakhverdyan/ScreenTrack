<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

/**
 * App\Models\User\UserImage
 *
 * @property int $id
 * @property int $user_id
 * @property string|null $token
 * @property int|null $width
 * @property int|null $height
 * @property int $version
 * @property array|null $crop_data
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $key
 * @property-read mixed $urls
 * @property-read \App\Models\User\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserImage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserImage newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserImage query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserImage whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserImage whereCropData($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserImage whereHeight($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserImage whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserImage whereToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserImage whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserImage whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserImage whereVersion($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User\UserImage whereWidth($value)
 * @mixin \Eloquent
 */
class UserImage extends Model
{
    protected static $root_path = 'uploads/user_images';

    protected static $thumbnail_widths = [
        'tiny' => 80,
        'small' => 120,
        'middle' => 200,
    ];

    protected static $thumbnail_aspect_ratio = 1.0;

    protected $attributes = [
        'token' => null,
        'user_id' => 0,
        'width' => 0,
        'height' => 0,
        'version' => 0,
        'crop_data' => '{}',
    ];

    protected $casts = [
        'crop_data' => 'array',
    ];

    protected $hidden = [
        'id',
        'token',
        'user_id',
        'crop_data',
        'created_at',
        'updated_at',
    ];

    protected $appends = [
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
    	if (!$this->key) {
            return asset_no_cache('img/default-user-logo.svg?' . $this->user_id . ($type ? '.' . $type : ''));
        }

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
        $crop_size = min($this->width, $this->height);

        $this->crop_data = [
            'width' => $crop_size,
            'height' => $crop_size,
            'x' => floor(($this->width - $crop_size) / 2),
            'y' => floor(($this->height - $crop_size) / 2),
        ];

        return $this;
    }

    public function makeThumbnails()
    {
        $directory_path = $this->getDirectoryPath();
        $path_to_original = $directory_path . '/' . $this->key . '.jpg';

        foreach (self::$thumbnail_widths as $thumbnail_size_name => $thumbnail_width) {
            $thumbnail_height = $thumbnail_width / self::$thumbnail_aspect_ratio;

            if ($this->width >= $thumbnail_width && $this->height >= $thumbnail_height) {
                $thumbnail_image_file = \Image::make($path_to_original)->encode('jpg');

                $thumbnail_image_file = $thumbnail_image_file->crop(
                    $this->crop_data['width'],
                    $this->crop_data['height'],
                    $this->crop_data['x'],
                    $this->crop_data['y']
                );

                $thumbnail_image_file = $thumbnail_image_file->resize($thumbnail_width, $thumbnail_height);
                $full_path = $directory_path . '/' . $this->key . '.' . $thumbnail_size_name . '.jpg';
                \Storage::disk('public')->put($full_path, $thumbnail_image_file->stream()->__toString());
            }
        }

        return $this;
    }

    // ---------------------------------------------------------------------- //

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
