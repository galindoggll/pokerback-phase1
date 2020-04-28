<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlayerTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('player', function (Blueprint $table) {
            $table->increments('id');
            $table->foreignId('user_id');
            $table->foreignId('agent_id');
            $table->string('playing_id');
            $table->string('nickname')->nullable();
            $table->string('memoname')->nullable();
            $table->string('winnings')->nullable();
            $table->string('rake')->nullable();
            $table->integer('rakeback_percentage')->nullable();
            $table->integer('super_agent_percentage')->nullable();
            $table->integer('agent_percentage')->nullable();
            $table->integer('player_percentage')->nullable();
            $table->integer('rakeback')->nullable();
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
        Schema::dropIfExists('player');
    }
}
