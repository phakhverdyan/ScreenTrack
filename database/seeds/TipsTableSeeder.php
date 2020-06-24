<?php

use Illuminate\Database\Seeder;
use App\Models\Tip;
use Illuminate\Support\Facades\Storage;

class TipsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $seeding_tips = collect([
            [
                'key' => 'select_project_select',
                'route' => 'dashboard.*',
                'selector' => '.selectize-control.navbar__project-select',
            ], [
                'key' => 'create_new_project_button',
                'route' => 'dashboard.*',
                'selector' => '.navbar__create-new-project-button',
            ], [
                'key' => 'invite_project_member_button',
                'route' => 'dashboard.project.*',
                'selector' => '.selected-project__invite-member-button',
            ], [
                'key' => 'add_contract_button',
                'route' => 'dashboard.project.*',
                'selector' => '.selected-project__add-contract-button',
            ], [
                'key' => 'profile_menu',
                'route' => 'dashboard.project.*',
                'selector' => '.navbar-profile',
            ], [
                'key' => 'project_board_add_task_link',
                'route' => 'dashboard.project.board',
                'selector' => '.board-column__add-item-link:first',
            ], [
                'key' => 'project_board_add_list_button',
                'route' => 'dashboard.project.board',
                'selector' => '.board__add-column-form__add-button',
            ], [
                'key' => 'invite_to_chat_input',
                'route' => 'dashboard.*',
                'selector' => '.chat-panel-invite-form .selectize-control',
            ],
        ]);
        
        foreach ($seeding_tips as $seeding_tip_index => $seeding_tip) {
            if (!$tip = Tip::where('key', $seeding_tip['key'])->first()) {
                $tip = new Tip;
            }

            foreach ($seeding_tip as $key => $value) {
                $tip->{$key} = $value;
            }
            
            $tip->step = $seeding_tip_index;
            $tip->save();
        }
        
        Tip::whereNotIn('key', $seeding_tips->pluck('key'))->delete();
        echo 'The `tips` table were seeded successfully.' . "\n";
    }
}
