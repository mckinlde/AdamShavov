<?php

namespace App\Policies;

use App\Models\Project;
use App\Models\User;

class ProjectPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        // All authenticated users can view projects (filtered in controller)
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Project $project): bool
    {
        // Executives can see all projects
        if ($user->isExecutive()) {
            return true;
        }

        // Check if user's team is assigned to this project
        $userTeamIds = $user->teams()->pluck('teams.id');
        if ($project->teams()->whereIn('teams.id', $userTeamIds)->exists()) {
            return true;
        }

        // Check if user is an advisor on this project
        if ($user->isAdvisorOnProject($project)) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can create models.
     * Only executives can create projects.
     */
    public function create(User $user): bool
    {
        return $user->isExecutive();
    }

    /**
     * Determine whether the user can update the model.
     * Only executives can update projects.
     */
    public function update(User $user, Project $project): bool
    {
        return $user->isExecutive();
    }

    /**
     * Determine whether the user can delete the model.
     * Only executives can delete projects.
     */
    public function delete(User $user, Project $project): bool
    {
        return $user->isExecutive();
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Project $project): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Project $project): bool
    {
        return $this->delete($user, $project);
    }
}
