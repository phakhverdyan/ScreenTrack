<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class FixAffiliateModeInUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("ALTER TABLE users MODIFY COLUMN affiliate_mode ENUM('STANDART', 'STANDARD', 'SUPER', 'SUPERVISOR')");
        DB::statement("UPDATE users SET affiliate_mode = ? WHERE affiliate_mode = ?", ['STANDARD', 'STANDART']);
        DB::statement("ALTER TABLE users MODIFY COLUMN affiliate_mode ENUM('STANDARD', 'SUPER', 'SUPERVISOR')");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("ALTER TABLE users MODIFY COLUMN affiliate_mode ENUM('STANDARD', 'STANDART', 'SUPER', 'SUPERVISOR')");
        DB::statement("UPDATE users SET affiliate_mode = ? WHERE affiliate_mode = ?", ['STANDART', 'STANDARD']);
        DB::statement("ALTER TABLE users MODIFY COLUMN affiliate_mode ENUM('STANDART', 'SUPER', 'SUPERVISOR')");
    }
}
