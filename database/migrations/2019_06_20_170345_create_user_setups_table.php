<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserSetupsTable extends Migration
{
    public function up()
    {
        Schema::create('user_setups', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('user_id')->unsigned();
            $table->string('current_stage');
            $table->timestamps();
        });

        DB::update('ALTER TABLE user_setups AUTO_INCREMENT = 13879');
    }


    public function down()
    {
        Schema::dropIfExists('user_setups');
    }
}
