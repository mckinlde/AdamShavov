<?php

use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\TeamController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    // Users (executives only)
    Route::apiResource('users', UserController::class);

    // Teams (executives only)
    Route::apiResource('teams', TeamController::class);
    Route::post('teams/{team}/members', [TeamController::class, 'addMember']);
    Route::delete('teams/{team}/members/{user}', [TeamController::class, 'removeMember']);

    // Projects
    Route::apiResource('projects', ProjectController::class);
    Route::post('projects/{project}/teams', [ProjectController::class, 'assignTeams']);
    Route::delete('projects/{project}/teams/{team}', [ProjectController::class, 'removeTeam']);
    Route::post('projects/{project}/advisors', [ProjectController::class, 'assignAdvisors']);
    Route::delete('projects/{project}/advisors/{user}', [ProjectController::class, 'removeAdvisor']);

    // Reviews
    Route::apiResource('reviews', ReviewController::class);
});

