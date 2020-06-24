<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReferralConnectionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('referral_connections', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('invited_user_id')->unsigned();
            $table->bigInteger('referrer_user_id')->unsigned();
            
            $table->enum('type', [
                'DIRECT',
                'INDIRECT',
            ]);

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
        Schema::dropIfExists('referral_connections');
    }
}
