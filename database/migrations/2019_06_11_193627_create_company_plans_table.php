<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCompanyPlansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('company_plans', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('company_id')->unique();
            $table->string('plan_key')->index();
            $table->string('plan_addon_keys')->nullable();
            $table->float('price', 9, 2);
            $table->integer('live_screen_streaming_minutes')->unsigned()->nullable();
            $table->integer('manager_seats_per_project')->unsigned()->nullable();
            $table->integer('screenshots_per_hour')->unsigned()->nullable();
            $table->integer('first_payment_id')->nullable();
            $table->integer('last_payment_id')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();
        });

        DB::update('ALTER TABLE company_plans AUTO_INCREMENT = 13879');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('company_plans');
    }
}
