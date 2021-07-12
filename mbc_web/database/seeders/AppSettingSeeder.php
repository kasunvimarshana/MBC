<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AppSetting;

class AppSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        AppSetting::truncate();

        AppSetting::updateOrCreate(
            ['name' => 'permit_countries'],
            ['name' => 'permit_countries', 'display_name' => 'PERMIT COUNTRIES', 'data' => 'MW, ']
        );

        AppSetting::updateOrCreate(
            ['name' => 'deny_contries'],
            ['name' => 'deny_contries', 'display_name' => 'DENY COUNTRIES']
        );

        AppSetting::updateOrCreate(
            ['name' => 'active_permit_countries_rule'],
            ['name' => 'active_permit_countries_rule', 'display_name' => 'ACTIVE RULE', 'data' => 'false']
        );

        AppSetting::updateOrCreate(
            ['name' => 'active_deny_countries_rule'],
            ['name' => 'active_deny_countries_rule', 'display_name' => 'ACTIVE RULE', 'data' => 'false']
        );
    }
}
