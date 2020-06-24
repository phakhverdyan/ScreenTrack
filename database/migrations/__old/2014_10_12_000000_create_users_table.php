<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('rate')->default(0);
            $table->integer('screenshots')->default(12);
            $table->integer('activity')->default(1);
            $table->integer('application')->default(1);
            $table->integer('urls')->default(0);
            $table->integer('add_time')->default(0);
            $table->integer('remove_time')->default(0);
            $table->integer('currency_id');
            $table->integer('time_zone_id');
            $table->integer('language_id');
            $table->integer('billing_id');
            $table->integer('company_id');
            $table->rememberToken();
            $table->timestamps();
            $table->index('id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
