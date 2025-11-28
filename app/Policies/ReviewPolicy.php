<?php

namespace App\Policies;

use App\Models\Review;
use App\Models\User;

class ReviewPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        // All authenticated users can view reviews (filtered in controller)
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Review $review): bool
    {
        // Visibility logic handled in controller based on role
        // This is a basic check - detailed filtering in controller
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        // All authenticated users can create reviews
        return true;
    }

    /**
     * Determine whether the user can update the model.
     * Users can only update reviews they created.
     */
    public function update(User $user, Review $review): bool
    {
        return $user->id === $review->reviewer_id;
    }

    /**
     * Determine whether the user can delete the model.
     * Users can delete their own reviews, executives can delete any review.
     */
    public function delete(User $user, Review $review): bool
    {
        // Users can delete their own reviews
        if ($user->id === $review->reviewer_id) {
            return true;
        }

        // Executives can delete any review
        return $user->isExecutive();
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Review $review): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Review $review): bool
    {
        return $this->delete($user, $review);
    }
}
