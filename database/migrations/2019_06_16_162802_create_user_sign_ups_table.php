<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserSignUpsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_sign_ups', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('user_id')->unique();
            $table->string('current_stage')->nullable();
            $table->string('choosen_plan_key')->nullable();
            $table->string('user_first_name')->nullable();
            $table->string('user_last_name')->nullable();
            $table->string('user_phone_country_code', 2)->nullable();
            $table->string('user_phone_code')->nullable();
            $table->string('user_phone_number')->nullable();
            $table->string('company_name')->nullable();
            $table->string('company_size_key')->nullable();
            $table->timestamps();
        });

        DB::update('ALTER TABLE user_sign_ups AUTO_INCREMENT = 13879');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_sign_ups');
    }
}
