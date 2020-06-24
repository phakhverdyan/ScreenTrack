<?php

namespace App\Http\Controllers\Api;

use App\Models\Contact\Contact;
use App\Models\Contact\ContactList;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ContactListController extends Controller
{
    public function list(Request $request)
    {
        $user = auth()->user();

        validator()->make($request->all(), [
            'query' => 'nullable|string',
        ])->validate();

        $contact_list_query = $user->contact_lists()->with('contacts','contacts.following_user');

        if ($query = $request->input('query')) {
            $contact_list_query->where('title','like','%'.$query.'%');
        }

        $contact_lists = $contact_list_query->orderBy('id', 'desc')->get()->each(function ($current_contact_list) {
            $current_contact_list->contacts->each(function ($current_contact){
                $current_contact->following_user->makeVisible([
                    'email',
                ]);
            });
        });

        return response()->resource($contact_lists);
    }

    public function get($contact_list_id)
    {
        $contact_list = ContactList::where('id',$contact_list_id)
            ->with('contacts','contacts.following_user')
            ->first();

        $contact_list->contacts->each(function ($current_contact){
            $current_contact->following_user->makeVisible([
                'email',
            ]);
        });

        return response()->resource($contact_list);
    }

    public function create(Request $request)
    {
        $user = auth()->user();

        validator()->make($request->all(), [
            'contact_list' => 'required|array',
            'contact_list.title' => 'required|string',
            'contact_list.contacts_ids' => 'nullable|array',
        ])->validate();

        $contact_list = new ContactList();

        $contact_list->user_id = $user->id;
        $contact_list->title = $request->input('contact_list.title');
        $contact_list->save();

        foreach ($request->input('contact_list.contacts_ids') ?? [] as $contact_id) {
            $contact = Contact::findOrFail($contact_id);
            $user->canAddContactToContactListOrForbidden($contact);

            $contact_list->contacts()->attach($contact);
        }

        return response()->resource($contact_list);
    }

    public function update(Request $request, $contact_list_id)
    {
        $user = auth()->user();

        validator()->make($request->all(), [
            'contact_list' => 'required|array',
            'contact_list.title' => 'required|string',
            'contact_list.contacts_ids' => 'nullable|array',
        ])->validate();

        $contact_list = ContactList::findOrFail($contact_list_id);
        $user->canEditContactListOrForbidden($contact_list);

        $contact_list->title = $request->input('contact_list.title');

        $contact_list->contacts()->sync([]);

        foreach ($request->input('contact_list.contacts_ids') ?? [] as $contact_id) {
            $contact = Contact::findOrFail($contact_id);
            $user->canAddContactToContactListOrNotFound($contact);

            $contact_list->contacts()->attach($contact);
        }

        $contact_list->save();

        return response()->resource($contact_list);

    }

    public function delete($contact_list_id)
    {
        $user = auth()->user();
        $contact_list = ContactList::findOrFail($contact_list_id);

        $user->canDeleteContactListOrForbidden($contact_list);

        $contact_list->delete();

        return response()->resource();
    }
}
