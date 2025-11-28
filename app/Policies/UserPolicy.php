<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    /**
     * Determine whether the user can view any models.
     * Only executives can view all users.
     */
    public function viewAny(User $user): bool
    {
        return $user->isExecutive();
    }

    /**
     * Determine whether the user can view the model.
     * Only executives can view user details.
     */
    public function view(User $user, User $model): bool
    {
        return $user->isExecutive();
    }

    /**
     * Determine whether the user can create models.
     * Only executives can create users.
     */
    public function create(User $user): bool
    {
        return $user->isExecutive();
    }

    /**
     * Determine whether the user can update the model.
     * Only executives can update users.
     */
    public function update(User $user, User $model): bool
    {
        return $user->isExecutive();
    }

    /**
     * Determine whether the user can delete the model.
     * Only executives can delete users.
     */
    public function delete(User $user, User $model): bool
    {
        return $user->isExecutive();
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, User $model): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, User $model): bool
    {
        return $this->delete($user, $model);
    }
}
