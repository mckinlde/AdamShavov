<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create executives
        User::firstOrCreate(
            ['email' => 'executive@example.com'],
            [
                'name' => 'Executive User',
                'password' => Hash::make('password'),
                'role' => 'executive',
                'email_verified_at' => now(),
            ]
        );

        // Create managers
        $managers = [
            ['name' => 'Manager One', 'email' => 'manager1@example.com'],
            ['name' => 'Manager Two', 'email' => 'manager2@example.com'],
        ];

        foreach ($managers as $manager) {
            User::firstOrCreate(
                ['email' => $manager['email']],
                [
                    'name' => $manager['name'],
                    'password' => Hash::make('password'),
                    'role' => 'manager',
                    'email_verified_at' => now(),
                ]
            );
        }

        // Create associates
        $associates = [
            ['name' => 'Associate One', 'email' => 'associate1@example.com'],
            ['name' => 'Associate Two', 'email' => 'associate2@example.com'],
            ['name' => 'Associate Three', 'email' => 'associate3@example.com'],
            ['name' => 'Associate Four', 'email' => 'associate4@example.com'],
        ];

        foreach ($associates as $associate) {
            User::firstOrCreate(
                ['email' => $associate['email']],
                [
                    'name' => $associate['name'],
                    'password' => Hash::make('password'),
                    'role' => 'associate',
                    'email_verified_at' => now(),
                ]
            );
        }
    }
}
