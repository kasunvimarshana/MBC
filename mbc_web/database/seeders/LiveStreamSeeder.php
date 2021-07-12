<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\LiveStream;

class LiveStreamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        LiveStream::truncate();

        LiveStream::updateOrCreate(
            ['name' => 'MBC_Live_Streaming'],
            ['name' => 'MBC_Live_Streaming', 'title' => 'MBC LIVE STREAMING', 'uri' => 'http://41.216.229.205:8080/live/livestream/index.m3u8']
        );

        LiveStream::updateOrCreate(
            ['name' => 'Radio_1'],
            ['name' => 'Radio_1', 'title' => 'RADIO 1', 'uri' => 'http://154.66.125.13:88/broadwavehigh.mp3?src=1']
        );

        LiveStream::updateOrCreate(
            ['name' => 'Radio_2'],
            ['name' => 'Radio_2', 'title' => 'RADIO 2', 'uri' => 'http://154.66.125.13:86/broadwavehigh.mp3?src=1']
        );
    }
}
