<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserCreditCardsTable1 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_credit_cards', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned()->index();
            $table->string('stripe_id')->nullable();
            $table->string('address_zip')->nullable();
            $table->string('brand')->nullable();
            $table->string('country_code')->nullable();
            $table->integer('expiration_month')->unsigned()->nullable();
            $table->integer('expiration_year')->unsigned()->nullable();
            $table->string('funding')->nullable();
            $table->string('last4')->nullable();
            $table->boolean('is_default');
            $table->timestamps();
        });

        DB::update('ALTER TABLE users AUTO_INCREMENT = 13879');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_credit_cards');
    }
}
