<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReviewRequest;
use App\Http\Requests\UpdateReviewRequest;
use App\Models\Project;
use App\Models\Review;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $reviews = $this->getVisibleReviews($user)->get();

        // Hide reviewer names for non-executives
        $reviews = $reviews->map(function ($review) use ($user) {
            $review->load('reviewable');
            if (!$user->isExecutive()) {
                $review->makeHidden(['reviewer_id']);
                $review->reviewer = null;
            }
            return $review;
        });

        return response()->json([
            'data' => $reviews,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReviewRequest $request): JsonResponse
    {
        $validated = $request->validated();
        
        // Resolve the reviewable model
        $reviewableType = $validated['reviewable_type'];
        $reviewableId = $validated['reviewable_id'];
        $reviewable = $reviewableType::findOrFail($reviewableId);

        // Check if user can review this
        if (!$this->canReview($request->user(), $reviewable)) {
            return response()->json([
                'message' => 'You are not authorized to review this resource.',
            ], 403);
        }

        $review = Review::create([
            'reviewer_id' => $request->user()->id,
            'reviewable_type' => $reviewableType,
            'reviewable_id' => $reviewableId,
            'content' => $validated['content'],
            'rating' => $validated['rating'] ?? null,
        ]);

        $review->load('reviewer', 'reviewable');

        // Hide reviewer name for non-executives
        if (!$request->user()->isExecutive()) {
            $review->makeHidden(['reviewer_id']);
            $review->reviewer = null;
        }

        return response()->json([
            'message' => 'Review created successfully',
            'data' => $review,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Review $review): JsonResponse
    {
        $user = $request->user();

        // Check if user can view this review
        if (!$this->canViewReview($user, $review)) {
            return response()->json([
                'message' => 'You are not authorized to view this review.',
            ], 403);
        }

        $review->load('reviewable');

        // Hide reviewer name for non-executives
        if (!$user->isExecutive()) {
            $review->makeHidden(['reviewer_id']);
            $review->reviewer = null;
        }

        return response()->json([
            'data' => $review,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReviewRequest $request, Review $review): JsonResponse
    {
        $this->authorize('update', $review);

        $validated = $request->validated();
        $review->update($validated);

        $review->load('reviewer', 'reviewable');

        // Hide reviewer name for non-executives
        if (!$request->user()->isExecutive()) {
            $review->makeHidden(['reviewer_id']);
            $review->reviewer = null;
        }

        return response()->json([
            'message' => 'Review updated successfully',
            'data' => $review,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Review $review): JsonResponse
    {
        $this->authorize('delete', $review);

        $review->delete();

        return response()->json([
            'message' => 'Review deleted successfully',
        ]);
    }

    /**
     * Get reviews visible to the user based on their role.
     */
    private function getVisibleReviews(User $user)
    {
        if ($user->isExecutive()) {
            // Executives see all reviews
            return Review::query();
        }

        $query = Review::query();

        if ($user->isManager()) {
            // Managers see: reviews about themselves, their team members, their team's projects
            $userIds = [$user->id];
            $userIds = array_merge($userIds, $user->teams()->with('members')->get()->flatMap->members->pluck('id')->toArray());
            
            $teamIds = $user->teams()->pluck('teams.id');
            $projectIds = Project::whereHas('teams', function ($q) use ($teamIds) {
                $q->whereIn('teams.id', $teamIds);
            })->pluck('id');

            $query->where(function ($q) use ($userIds, $projectIds) {
                $q->where(function ($q) use ($userIds) {
                    $q->where('reviewable_type', User::class)
                      ->whereIn('reviewable_id', $userIds);
                })->orWhere(function ($q) use ($projectIds) {
                    $q->where('reviewable_type', Project::class)
                      ->whereIn('reviewable_id', $projectIds);
                });
            });
        } elseif ($user->isAssociate()) {
            // Associates see: reviews about themselves, their team's projects
            $teamIds = $user->teams()->pluck('teams.id');
            $projectIds = Project::whereHas('teams', function ($q) use ($teamIds) {
                $q->whereIn('teams.id', $teamIds);
            })->pluck('id');

            $query->where(function ($q) use ($user, $projectIds) {
                $q->where(function ($q) use ($user) {
                    $q->where('reviewable_type', User::class)
                      ->where('reviewable_id', $user->id);
                })->orWhere(function ($q) use ($projectIds) {
                    $q->where('reviewable_type', Project::class)
                      ->whereIn('reviewable_id', $projectIds);
                });
            });
        }

        // Add advisor projects
        $advisorProjectIds = $user->advisoryProjects()->pluck('projects.id');
        if ($advisorProjectIds->isNotEmpty()) {
            $query->orWhere(function ($q) use ($advisorProjectIds) {
                $q->where('reviewable_type', Project::class)
                  ->whereIn('reviewable_id', $advisorProjectIds);
            });
        }

        return $query;
    }

    /**
     * Check if user can review a specific resource.
     */
    private function canReview(User $user, $reviewable): bool
    {
        if ($reviewable instanceof User) {
            // Can review users in their team or themselves
            $userTeamIds = $user->teams()->pluck('teams.id');
            $reviewableTeamIds = $reviewable->teams()->pluck('teams.id');
            
            return $user->id === $reviewable->id 
                || $userTeamIds->intersect($reviewableTeamIds)->isNotEmpty();
        }

        if ($reviewable instanceof Project) {
            // Can review projects assigned to their team or projects they're advising
            $userTeamIds = $user->teams()->pluck('teams.id');
            $projectTeamIds = $reviewable->teams()->pluck('teams.id');
            
            return $userTeamIds->intersect($projectTeamIds)->isNotEmpty()
                || $user->isAdvisorOnProject($reviewable);
        }

        return false;
    }

    /**
     * Check if user can view a specific review.
     */
    private function canViewReview(User $user, Review $review): bool
    {
        if ($user->isExecutive()) {
            return true;
        }

        $reviewable = $review->reviewable;

        if ($reviewable instanceof User) {
            // Can see reviews about themselves or team members (for managers)
            if ($user->id === $reviewable->id) {
                return true;
            }
            if ($user->isManager()) {
                $userTeamIds = $user->teams()->pluck('teams.id');
                $reviewableTeamIds = $reviewable->teams()->pluck('teams.id');
                return $userTeamIds->intersect($reviewableTeamIds)->isNotEmpty();
            }
        }

        if ($reviewable instanceof Project) {
            // Can see reviews about projects assigned to their team or projects they're advising
            $userTeamIds = $user->teams()->pluck('teams.id');
            $projectTeamIds = $reviewable->teams()->pluck('teams.id');
            
            return $userTeamIds->intersect($projectTeamIds)->isNotEmpty()
                || $user->isAdvisorOnProject($reviewable);
        }

        return false;
    }
}
