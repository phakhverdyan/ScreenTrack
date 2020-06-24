<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RenameColumnsInContactContactList extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('contact__contact_list', function (Blueprint $table) {
            $table->renameColumn('user_contact_id', 'contact_id');
            $table->renameColumn('user_contact_list_id', 'contact_list_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('contact__contact_list', function (Blueprint $table) {
            $table->renameColumn('contact_id', 'user_contact_id');
            $table->renameColumn('contact_list_id', 'user_contact_list_id');
        });
    }
}
