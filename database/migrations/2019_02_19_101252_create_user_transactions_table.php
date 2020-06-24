<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_transactions', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->index();
            $table->float('amount', 12, 4);
            $table->string('description')->nullable();
            $table->string('action_type')->nullable();
            $table->integer('action_id')->unsigned()->nullable();
            $table->timestamps();
        });

        DB::update('ALTER TABLE user_transactions AUTO_INCREMENT = 13879');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_transactions');
    }
}
