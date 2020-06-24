<?php

use App\Models\User\UserLinkType;
use Illuminate\Database\Seeder;

class UserLinkTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user_seeding_link_types = [
            'upwork' => 'Upwork',
            'linked_in' => 'LinkedIn',
            'github' => 'Github',
            'behance' => 'Behance',
        ];

        $user_seeding_link_types['other'] = 'Other';

        foreach ($user_seeding_link_types as $user_seeding_link_type_key => $user_seeding_link_type_name) {
            UserLinkType::updateOrCreate([
                'key' => $user_seeding_link_type_key,
                'title' => $user_seeding_link_type_name,
            ]);
        }

        echo 'The `user_link_types` table were seeded successfully.' . "\n";
    }
}
