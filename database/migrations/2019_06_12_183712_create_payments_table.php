<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('user_id')->unsigned()->index();
            $table->float('original_amount', 10, 2)->unsigned();
            $table->float('processing_fee', 3, 2)->unsigned();
            $table->float('stripe_fee', 3, 2)->unsigned();
            $table->float('final_amount', 12, 4)->unsigned();
            $table->float('return_amount', 12, 4)->unsigned();
            $table->string('objective_type');
            $table->integer('objective_id')->unsigned()->nullable();
            $table->text('description')->nullable();
            $table->string('stripe_source_id');
            $table->string('stripe_charge_id');
            $table->timestamps();
        });

        DB::update('ALTER TABLE payments AUTO_INCREMENT = 13879');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('payments');
    }
}
