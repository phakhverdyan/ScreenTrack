<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RenameUserContactsToContacts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::rename('user_contacts', 'contacts');
        Schema::rename('user_contact_lists', 'contact_lists');
        Schema::rename('user_contact__user_contact_list', 'contact__contact_list');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::rename('contacts', 'user_contacts');
        Schema::rename('contact_lists', 'user_contact_lists');
        Schema::rename('contact__contact_list', 'user_contact__user_contact_list');
    }
}
