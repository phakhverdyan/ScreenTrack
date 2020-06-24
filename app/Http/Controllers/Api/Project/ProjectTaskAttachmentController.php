<?php

namespace App\Http\Controllers\Api\Project;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Project\ProjectTask;
use App\Models\Project\ProjectTaskAttachment;

class ProjectTaskAttachmentController extends Controller
{
    public function create(Request $request, $project_task_id)
    {
    	$project_task = ProjectTask::findOrFail($project_task_id);
		auth()->user()->canEditProjectTaskOrForbidden($project_task);

        $validator = validator()->make($request->all(), [
            'project_task_attachment' => 'required|array',
            'project_task_attachment.file' => 'required|file|max:10240',
        ])->validate();

        $last_project_task_attachment = $project_task->attachments()->orderBy('position', 'desc')->first();

        DB::beginTransaction();

        try {
	        $project_task_attachment = new ProjectTaskAttachment;
	        $project_task_attachment->project_id = $project_task->project_id;
	        $project_task_attachment->task_id = $project_task->id;

            if ($last_project_task_attachment) {
                $project_task_attachment->position = $last_project_task_attachment->position + 65536;
            } else {
                $project_task_attachment->position = 65535;
            }

	        $project_task_attachment->save();
	        $project_task_attachment->generateToken();
	        $project_task_attachment->setFile($request->file('project_task_attachment.file'));
	        $project_task_attachment->makeThumbnails();

            if ($project_task_attachment->is_image) {
                $cover_project_task_attachment = $project_task->attachments()->where('is_cover', true)->first();

                if (!$cover_project_task_attachment) {
                    // if (!$cover_project_task_attachment->is_cover_set_manually) {
                    //     $cover_project_task_attachment->is_cover = false;
                    //     $cover_project_task_attachment->save();
                    //     $project_task_attachment->is_cover = true;
                    // }
                // } else {
                    $project_task_attachment->is_cover = true;
                }
            }

            $project_task_attachment->save();

	    } catch (\Exception $exception) {
	    	DB::rollback();
	    	throw $exception;
	    }

	    DB::commit();

        return response()->resource($project_task_attachment);
    }

    public function delete()
    {
        return ;
    }

    // public function get(Request $request, $project_task_image_key)
    // {
    //     list($project_task_image_id, $project_task_image_token) = array_merge(explode('.', $project_task_image_key), [null]);
    //     $project_task_image = ProjectTaskImage::where('id', $project_task_image_id)->firstOrFail();

    //     if ($project_task_image->token !== $project_task_image_token) {
    //         abort(403);
    //     }

    //     return response()->resource($item_image->makeVisible([
    //         'crop_data',
    //     ]));
    // }

    // public function update(Request $request, $item_image_id, $item_image_token)
    // {
    //     list($item_image_id, $item_image_token) = array_merge(explode('.', $item_image_key), [null]);
    //     $item_image = ItemImage::where('id', $item_image_id)->firstOrFail();

    //     if ($item_image->token !== $item_image_token) {
    //         abort(403);
    //     }

    //     $validator = \Validator::make($request->all(), [
    //         'item_image.file' => 'image|mimes:jpeg,png,jpg,gif|dimensions:min_width=600,min_height=600|max:10240',
    //         'item_image.crop_data' => 'array',
    //         'item_image.crop_data.width' => 'required_with:item_image.crop_data|numeric',
    //         'item_image.crop_data.height' => 'required_with:item_image.crop_data|numeric',
    //         'item_image.crop_data.x' => 'required_with:item_image.crop_data|numeric',
    //         'item_image.crop_data.y' => 'required_with:item_image.crop_data|numeric',
    //     ]);

    //     if ($validator->fails()) {
    //         return response([
    //             'error' => 'Validation',
    //             'validation_fields' => $validator->errors(),
    //         ], 400);
    //     }

    //     if ($request->hasFile('item_image.file')) {
    //         $item_image->setFile($request->file('item_image.file'));
    //     }

    //     if ($request->has('item_image.crop_data')) {
    //         $item_image->crop_data = [
    //             'width' => (int) $request->input('item_image.crop_data.width'),
    //             'height' => (int) $request->input('item_image.crop_data.height'),
    //             'x' => (int) $request->input('item_image.crop_data.x'),
    //             'y' => (int) $request->input('item_image.crop_data.y'),
    //         ];
    //     }

    //     if ($request->hasFile('item_image.file') || $request->has('item_image.crop_data')) {
    //         $item_image->makeThumbnails();
    //         ++$item_image->version;
    //     }

    //     $item_image->save();

    //     return (new ItemImageResource($item_image->makeVisible([
    //         'crop_data',
    //     ])));
    // }
}
