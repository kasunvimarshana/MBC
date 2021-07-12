<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLiveStreamsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('live_streams', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->string('name')->unique();
            $table->string('title')->nullable();
            $table->string('uri')->nullable();
            // $table->string('type')->nullable(); //enum('COLUMN', ['audio', 'video']);
            // $table->string('format')->nullable(); //enum('COLUMN', ['m3u8', 'youtube']);
            // $table->text('image_uri')->nullable();
            // $table->text('description')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('live_streams');
    }
}
