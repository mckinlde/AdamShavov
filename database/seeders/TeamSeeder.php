<?php

namespace Database\Seeders;

use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create teams
        $team1 = Team::firstOrCreate(['name' => 'Development Team']);
        $team2 = Team::firstOrCreate(['name' => 'Design Team']);

        // Get users
        $manager1 = User::where('email', 'manager1@example.com')->first();
        $manager2 = User::where('email', 'manager2@example.com')->first();
        $associate1 = User::where('email', 'associate1@example.com')->first();
        $associate2 = User::where('email', 'associate2@example.com')->first();
        $associate3 = User::where('email', 'associate3@example.com')->first();
        $associate4 = User::where('email', 'associate4@example.com')->first();

        // Assign manager and associates to Team 1
        if ($manager1 && $associate1 && $associate2) {
            $team1->members()->syncWithoutDetaching([
                $manager1->id => ['role' => 'manager'],
                $associate1->id => ['role' => 'associate'],
                $associate2->id => ['role' => 'associate'],
            ]);
        }

        // Assign manager and associates to Team 2
        if ($manager2 && $associate3 && $associate4) {
            $team2->members()->syncWithoutDetaching([
                $manager2->id => ['role' => 'manager'],
                $associate3->id => ['role' => 'associate'],
                $associate4->id => ['role' => 'associate'],
            ]);
        }
    }
}
