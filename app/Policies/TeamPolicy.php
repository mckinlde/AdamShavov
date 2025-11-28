<?php

namespace App\Policies;

use App\Models\Team;
use App\Models\User;

class TeamPolicy
{
    /**
     * Determine whether the user can view any models.
     * Only executives can view all teams.
     */
    public function viewAny(User $user): bool
    {
        return $user->isExecutive();
    }

    /**
     * Determine whether the user can view the model.
     * Only executives can view team details.
     */
    public function view(User $user, Team $team): bool
    {
        return $user->isExecutive();
    }

    /**
     * Determine whether the user can create models.
     * Only executives can create teams.
     */
    public function create(User $user): bool
    {
        return $user->isExecutive();
    }

    /**
     * Determine whether the user can update the model.
     * Only executives can update teams.
     */
    public function update(User $user, Team $team): bool
    {
        return $user->isExecutive();
    }

    /**
     * Determine whether the user can delete the model.
     * Only executives can delete teams.
     */
    public function delete(User $user, Team $team): bool
    {
        return $user->isExecutive();
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Team $team): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Team $team): bool
    {
        return $this->delete($user, $team);
    }
}
