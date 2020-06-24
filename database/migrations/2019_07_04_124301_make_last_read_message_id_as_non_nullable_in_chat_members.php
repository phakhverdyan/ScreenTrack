<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MakeLastReadMessageIdAsNonNullableInChatMembers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('chat_members', function (Blueprint $table) {
            $table->dropColumn('last_read_message_id');
        });

        Schema::table('chat_members', function (Blueprint $table) {
            $table->bigInteger('last_read_message_id')->unsigned()->after('user_id');
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
            $table->dropColumn('last_read_message_id');
        });
        
        Schema::table('chat_members', function (Blueprint $table) {
            $table->bigInteger('last_read_message_id')->unsigned()->nullable()->after('user_id');
        });
    }
}
