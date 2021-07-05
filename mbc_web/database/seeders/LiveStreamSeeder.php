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
        LiveStream::create([
            'name' => 'MBC_Live_Streaming',
            'title' => null
        ]);

        LiveStream::create([
            'name' => 'Radio_1',
            'title' => null
        ]);

        LiveStream::create([
            'name' => 'Radio_2',
            'title' => null
        ]);
    }
}
