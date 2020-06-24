<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpgradeLanguagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('languages')->truncate();

        Schema::table('languages', function (Blueprint $table) {
            $table->string('native_name', 64)->nullable()->after('name');
            $table->string('code', 2)->nullable()->change();

            $table->dropColumn([
                'is_primary',
            ]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('languages')->truncate();

        Schema::table('languages', function (Blueprint $table) {
            $table->string('code', 2)->change();
            $table->tinyInteger('is_primary')->default(0)->after('code');

            $table->dropColumn([
                'native_name',
            ]);
        });
    }
}
