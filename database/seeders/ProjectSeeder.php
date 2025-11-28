<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $team1 = Team::where('name', 'Development Team')->first();
        $team2 = Team::where('name', 'Design Team')->first();
        $manager1 = User::where('email', 'manager1@example.com')->first();
        $associate3 = User::where('email', 'associate3@example.com')->first();

        // Create projects
        $project1 = Project::firstOrCreate(
            ['name' => 'Website Redesign'],
            ['description' => 'Complete redesign of the company website']
        );

        $project2 = Project::firstOrCreate(
            ['name' => 'Mobile App'],
            ['description' => 'Development of a new mobile application']
        );

        $project3 = Project::firstOrCreate(
            ['name' => 'API Integration'],
            ['description' => 'Integration with third-party APIs']
        );

        // Assign teams to projects
        if ($team1) {
            $project1->teams()->syncWithoutDetaching([$team1->id]);
            $project2->teams()->syncWithoutDetaching([$team1->id]);
        }

        if ($team2) {
            $project1->teams()->syncWithoutDetaching([$team2->id]);
            $project3->teams()->syncWithoutDetaching([$team2->id]);
        }

        // Assign internal advisors
        if ($manager1 && $project2) {
            $project2->advisors()->syncWithoutDetaching([
                $manager1->id => ['team_id' => $team2?->id],
            ]);
        }

        if ($associate3 && $project1) {
            $project1->advisors()->syncWithoutDetaching([
                $associate3->id => ['team_id' => $team1?->id],
            ]);
        }
    }
}
