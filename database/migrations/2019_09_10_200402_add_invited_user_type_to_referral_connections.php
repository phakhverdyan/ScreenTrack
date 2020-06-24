<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddInvitedUserTypeToReferralConnections extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('referral_connections', function (Blueprint $table) {
            $table->enum('invited_user_type', [
                'EMPLOYER',
                'FREELANCER',
            ])->nullable()->after('invited_user_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('referral_connections', function (Blueprint $table) {
            $table->dropColumn('invited_user_type');
        });
    }
}
