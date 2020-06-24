<?php

namespace App\Models\Contact;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

/**
 * App\Models\Contact\ContactList
 *
 * @property int $id
 * @property int $user_id
 * @property string $title
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Contact\Contact[] $contacts
 * @property-read int|null $contacts_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Contact\ContactList newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Contact\ContactList newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Contact\ContactList query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Contact\ContactList whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Contact\ContactList whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Contact\ContactList whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Contact\ContactList whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Contact\ContactList whereUserId($value)
 * @mixin \Eloquent
 */
class ContactList extends Model
{
    public $fillable = [
		'title',
	];

	public $hidden = [
		'pivot',
		'user_id',
		'created_at',
		'updated_at',
	];

	public function contacts() {
        return $this->belongsToMany(Contact::class, 'contact__contact_list')->withTimestamps();
    }

    public function delete()
    {
        DB::beginTransaction();

        try {
            $this->contacts()->sync([]);
            parent::delete();
        } catch (\Exception $exception) {
            DB::rollback();
            throw $exception;
        }

        DB::commit();
    }
}
