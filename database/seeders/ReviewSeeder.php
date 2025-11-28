<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Review;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $manager1 = User::where('email', 'manager1@example.com')->first();
        $manager2 = User::where('email', 'manager2@example.com')->first();
        $associate1 = User::where('email', 'associate1@example.com')->first();
        $associate2 = User::where('email', 'associate2@example.com')->first();
        $associate3 = User::where('email', 'associate3@example.com')->first();
        $project1 = Project::where('name', 'Website Redesign')->first();
        $project2 = Project::where('name', 'Mobile App')->first();

        // Reviews about users
        if ($manager1 && $associate1) {
            Review::firstOrCreate(
                [
                    'reviewer_id' => $manager1->id,
                    'reviewable_type' => User::class,
                    'reviewable_id' => $associate1->id,
                ],
                [
                    'content' => 'Great work on the recent project. Very proactive and helpful.',
                    'rating' => 5,
                ]
            );
        }

        if ($associate1 && $manager1) {
            Review::firstOrCreate(
                [
                    'reviewer_id' => $associate1->id,
                    'reviewable_type' => User::class,
                    'reviewable_id' => $manager1->id,
                ],
                [
                    'content' => 'Excellent leadership and clear communication.',
                    'rating' => 5,
                ]
            );
        }

        // Reviews about projects
        if ($associate1 && $project1) {
            Review::firstOrCreate(
                [
                    'reviewer_id' => $associate1->id,
                    'reviewable_type' => Project::class,
                    'reviewable_id' => $project1->id,
                ],
                [
                    'content' => 'The project is well-organized and the timeline is realistic.',
                    'rating' => 4,
                ]
            );
        }

        if ($manager1 && $project1) {
            Review::firstOrCreate(
                [
                    'reviewer_id' => $manager1->id,
                    'reviewable_type' => Project::class,
                    'reviewable_id' => $project1->id,
                ],
                [
                    'content' => 'Good progress so far. Team collaboration is excellent.',
                    'rating' => 5,
                ]
            );
        }

        if ($associate3 && $project2) {
            Review::firstOrCreate(
                [
                    'reviewer_id' => $associate3->id,
                    'reviewable_type' => Project::class,
                    'reviewable_id' => $project2->id,
                ],
                [
                    'content' => 'As an advisor, I think the project needs more focus on UX.',
                    'rating' => 3,
                ]
            );
        }
    }
}
