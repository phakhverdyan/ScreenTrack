<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePayoutsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payouts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('user_id')->unsigned();

            $table->enum('type', [
                'PAYOUNEER',
                'PAYPAL',
            ]);

            $table->string('identifier');
            $table->float('original_amount', 12, 4)->unsigned();
            $table->float('payment_system_fee', 10, 2)->unsigned()->nullable();
            $table->float('final_amount', 12, 4)->unsigned()->nullable();
            $table->string('state');
            $table->text('data')->nullable();
            $table->text('error')->nullable();
            $table->timestamps();
        });

        DB::update('ALTER TABLE payouts AUTO_INCREMENT = 13879');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('payouts');
    }
}
