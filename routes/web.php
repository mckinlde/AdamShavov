<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = auth()->user();
        
        $stats = [
            'total_users' => \App\Models\User::count(),
            'total_teams' => \App\Models\Team::count(),
            'total_projects' => \App\Models\Project::count(),
            'total_reviews' => \App\Models\Review::count(),
        ];

        if ($user->isExecutive()) {
            $stats['my_reviews'] = $user->reviews()->count();
        } else {
            $stats['my_reviews'] = $user->reviews()->count();
            $stats['visible_projects'] = \App\Models\Project::whereHas('teams', function ($q) use ($user) {
                $q->whereIn('teams.id', $user->teams()->pluck('teams.id'));
            })->count();
        }

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'user' => [
                'name' => $user->name,
                'role' => $user->role,
            ],
        ]);
    })->name('dashboard');

    // Resource routes
    Route::resource('users', \App\Http\Controllers\UserController::class);
    Route::resource('teams', \App\Http\Controllers\TeamController::class);
    Route::resource('projects', \App\Http\Controllers\ProjectController::class);
    Route::resource('reviews', \App\Http\Controllers\ReviewController::class);
});

require __DIR__.'/settings.php';
