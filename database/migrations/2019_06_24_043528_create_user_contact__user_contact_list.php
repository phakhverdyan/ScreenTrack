<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserContactUserContactList extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_contact__user_contact_list', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('user_contact_id')->unsigned();
            $table->bigInteger('user_contact_list_id')->unsigned();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_contact__user_contact_list');
    }
}
