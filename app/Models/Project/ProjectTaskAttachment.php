<?php

namespace App\Models\Project;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use App\Models\Project\ProjectTask;
use Illuminate\Support\Str;

/**
 * App\Models\Project\ProjectTaskAttachment
 *
 * @property int $id
 * @property int $project_id
 * @property int $task_id
 * @property string|null $token
 * @property string $title
 * @property string $base_name
 * @property string|null $mime_type
 * @property int $size
 * @property bool $is_image
 * @property int|null $width
 * @property int|null $height
 * @property int $is_cover
 * @property int $is_cover_set_manually
 * @property float $position
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $extension
 * @property-read mixed $file_name
 * @property-read mixed $key
 * @property-read mixed $thumbnails
 * @property-read mixed $url
 * @property-read \App\Models\Project\ProjectTask $project_task
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTaskAttachment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTaskAttachment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTaskAttachment query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTaskAttachment whereBaseName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTaskAttachment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTaskAttachment whereHeight($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTaskAttachment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTaskAttachment whereIsCover($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTaskAttachment whereIsCoverSetManually($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTaskAttachment whereIsImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTaskAttachment whereMimeType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTaskAttachment wherePosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTaskAttachment whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTaskAttachment whereSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTaskAttachment whereTaskId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTaskAttachment whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTaskAttachment whereToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTaskAttachment whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project\ProjectTaskAttachment whereWidth($value)
 * @mixin \Eloquent
 */
class ProjectTaskAttachment extends Model
{
    public static $root_path = 'uploads/project_task_attachments';

    public static $thumbnail_widths = [
        'middle' => 300,
        'large' => 600,
    ];

    public $attributes = [
        'token' => null,
        'is_image' => false,
        'width' => null,
        'height' => null,
        'is_cover' => false,
        'is_cover_set_manually' => false,
    ];

    public $fillable = [
        'position',
    ];

    public $casts = [
        'position' => 'float',
        'is_image' => 'boolean',
    ];

    public $hidden = [
        'id',
        'token',
        'project_id',
        'task_id',
        'created_at',
        'updated_at',
    ];

    public $appends = [
        'key',
        'url',
        'extension',
        'thumbnails',
    ];

    // ---------------------------------------------------------------------- //
    
    public function getKeyAttribute()
    {
        if (!$this->id) {
            return null;
        }

        return $this->id . '.' . $this->token;
    }

    public function getUrlAttribute()
    {
        return asset_no_cache($this->getDirectoryPath() . '/' . $this->base_name);
    }

    public function getThumbnailsAttribute()
    {
        if (!$this->is_image) {
            return null;
        }

    	return collect(self::$thumbnail_widths)->mapWithKeys(function ($thumbnail_width, $thumbnail_width_key) {
    		return [
                $thumbnail_width_key => [
                    'url' => $this->getThumbnailUrl($thumbnail_width, $thumbnail_width_key),
                    'width' => $this->getThumbnailWidth($thumbnail_width, $thumbnail_width_key),
                    'height' => $this->getThumbnailHeight($thumbnail_width, $thumbnail_width_key),
                ],
            ];
    	})->toArray();
    }

    public function getExtensionAttribute()
    {
        return pathinfo($this->base_name, PATHINFO_EXTENSION);
    }

    public function getFileNameAttribute()
    {
        return pathinfo($this->base_name, PATHINFO_FILENAME);
    }

    // ---------------------------------------------------------------------- //

    public function getThumbnailUrl($thumbnail_width, $thumbnail_width_key)
    {
        if ($thumbnail_width >= $this->width && $thumbnail_width >= $this->height) {
            return $this->url;
        }

        return asset_no_cache($this->getDirectoryPath() . '/' . $this->file_name . '.' . $thumbnail_width_key . '.' . $this->extension);
    }

    public function getThumbnailWidth($thumbnail_width, $thumbnail_width_key)
    {
        if ($thumbnail_width >= $this->width) {
            return $this->width;
        }

        return $thumbnail_width;
    }

    public function getThumbnailHeight($thumbnail_width, $thumbnail_width_key)
    {
        if ($thumbnail_width >= $this->width) {
            return $this->height;
        }

        return round($thumbnail_width / $this->width * $this->height);
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
            $this->key,
        ]);
    }

    public function setFile($file)
    {
        $directory_path = $this->getDirectoryPath();
        \File::makeDirectory($directory_path, 0775, true, true);

        $this->base_name = $file->getClientOriginalName();
        $this->title = $this->base_name;
        $this->mime_type = $file->getClientMimeType();
        $this->size = $file->getClientSize();

        try {
            $image_file = \Image::make($file);
            $this->is_image = true;
            $this->width = $image_file->width();
            $this->height = $image_file->height();
        } catch (\Intervention\Image\Exception\NotReadableException $exception) {}
        
        $file->move($directory_path, $this->base_name);

        return $this;
    }

    public function deleteFile()
    {
        Storage::disk('public')->delete($this->getDirectoryPath() . '/' . $this->base_name);

        return $this;
    }

    public function deleteDirectory()
    {
        Storage::disk('public')->deleteDirectory($this->getDirectoryPath());
        
        return $this;
    }

    public function makeThumbnails()
    {
        if (!$this->is_image) {
            return;
        }

        $directory_path = $this->getDirectoryPath();
        $path_to_original = $directory_path . '/' . $this->base_name;

        foreach (self::$thumbnail_widths as $thumbnail_width_key => $thumbnail_width) {
            if ($thumbnail_width >= $this->width) {
                continue;
            }

            $thumbnail_image_file = \Image::make($path_to_original);// ->encode('jpg');
            
            $thumbnail_image_file = $thumbnail_image_file->resize($thumbnail_width, null, function ($constraint) {
                $constraint->aspectRatio();
            });

            $full_path = $directory_path . '/' . $this->file_name . '.' . $thumbnail_width_key . '.' . $this->extension;
            Storage::disk('public')->put($full_path, $thumbnail_image_file->stream()->__toString());
        }

        return $this;
    }

    public function deleteThumbnails()
    {
        if (!$this->is_image) {
            return;
        }

        $directory_path = $this->getDirectoryPath();
        $path_to_original = $directory_path . '/' . $this->base_name;

        foreach (self::$thumbnail_widths as $thumbnail_width_key => $thumbnail_width) {
            if ($thumbnail_width >= $this->width) {
                continue;
            }

            $full_path = $directory_path . '/' . $this->file_name . '.' . $thumbnail_width_key . '.jpg';
            Storage::disk('public')->delete($full_path);
        }

        return $this;
    }

    // ---------------------------------------------------------------------- //

    public function project_task()
    {
        return $this->belongsTo(ProjectTask::class);
    }

    // ---------------------------------------------------------------------- //

    public function delete()
    {
        parent::delete();
        $this->deleteFile();
        $this->deleteThumbnails();
        $this->deleteDirectory();
        
        return $this;
    }
}
