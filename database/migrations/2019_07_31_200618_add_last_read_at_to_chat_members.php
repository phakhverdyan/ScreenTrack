<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddLastReadAtToChatMembers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('chat_members', function (Blueprint $table) {
            $table->timestamp('last_read_at')->nullable()->after('last_read_message_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('chat_members', function (Blueprint $table) {
            $table->dropColumn('last_read_at');
        });
    }
}
