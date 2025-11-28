<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReviewRequest;
use App\Http\Requests\UpdateReviewRequest;
use App\Models\Project;
use App\Models\Review;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        $reviews = $this->getVisibleReviews($user)->get();

        $reviews = $reviews->map(function ($review) use ($user) {
            $review->load('reviewable');
            $data = [
                'id' => $review->id,
                'content' => $review->content,
                'rating' => $review->rating,
                'created_at' => $review->created_at,
                'reviewable_type' => class_basename($review->reviewable_type),
                'reviewable' => [
                    'id' => $review->reviewable->id,
                    'name' => $review->reviewable instanceof User 
                        ? $review->reviewable->name 
                        : $review->reviewable->name,
                ],
                'can_edit' => $user->id === $review->reviewer_id,
            ];

            if ($user->isExecutive()) {
                $data['reviewer'] = [
                    'id' => $review->reviewer->id,
                    'name' => $review->reviewer->name,
                ];
            }

            return $data;
        });

        return Inertia::render('reviews/index', [
            'reviews' => $reviews,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): Response
    {
        $user = $request->user();

        // Get users and projects the user can review
        $reviewableUsers = collect();
        $reviewableProjects = collect();

        if ($user->isManager()) {
            $userTeamIds = $user->teams()->pluck('teams.id');
            $teamMembers = User::whereHas('teams', function ($q) use ($userTeamIds) {
                $q->whereIn('teams.id', $userTeamIds);
            })->get();
            $reviewableUsers = $teamMembers->merge([$user]);
        } elseif ($user->isAssociate()) {
            $reviewableUsers = collect([$user]);
        }

        $userTeamIds = $user->teams()->pluck('teams.id');
        $reviewableProjects = Project::whereHas('teams', function ($q) use ($userTeamIds) {
            $q->whereIn('teams.id', $userTeamIds);
        })->get();

        $advisorProjects = $user->advisoryProjects()->get();
        $reviewableProjects = $reviewableProjects->merge($advisorProjects)->unique('id');

        return Inertia::render('reviews/create', [
            'users' => $reviewableUsers->map(fn($u) => [
                'id' => $u->id,
                'name' => $u->name,
                'email' => $u->email,
            ]),
            'projects' => $reviewableProjects->map(fn($p) => [
                'id' => $p->id,
                'name' => $p->name,
            ]),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReviewRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        
        $reviewableType = $validated['reviewable_type'];
        $reviewableId = $validated['reviewable_id'];
        $reviewable = $reviewableType::findOrFail($reviewableId);

        if (!$this->canReview($request->user(), $reviewable)) {
            return redirect()->back()
                ->with('error', 'You are not authorized to review this resource.');
        }

        Review::create([
            'reviewer_id' => $request->user()->id,
            'reviewable_type' => $reviewableType,
            'reviewable_id' => $reviewableId,
            'content' => $validated['content'],
            'rating' => $validated['rating'] ?? null,
        ]);

        return redirect()->route('reviews.index')
            ->with('success', 'Review created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Review $review): Response
    {
        $user = $request->user();

        if (!$this->canViewReview($user, $review)) {
            abort(403);
        }

        $review->load('reviewable');

        $data = [
            'id' => $review->id,
            'content' => $review->content,
            'rating' => $review->rating,
            'created_at' => $review->created_at,
            'reviewable_type' => class_basename($review->reviewable_type),
            'reviewable' => [
                'id' => $review->reviewable->id,
                'name' => $review->reviewable instanceof User 
                    ? $review->reviewable->name 
                    : $review->reviewable->name,
            ],
        ];

        if ($user->isExecutive()) {
            $data['reviewer'] = [
                'id' => $review->reviewer->id,
                'name' => $review->reviewer->name,
            ];
        }

        return Inertia::render('reviews/show', [
            'review' => $data,
            'canEdit' => $user->id === $review->reviewer_id,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Review $review): Response
    {
        $this->authorize('update', $review);

        return Inertia::render('reviews/edit', [
            'review' => [
                'id' => $review->id,
                'content' => $review->content,
                'rating' => $review->rating,
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReviewRequest $request, Review $review): RedirectResponse
    {
        $this->authorize('update', $review);

        $review->update($request->validated());

        return redirect()->route('reviews.index')
            ->with('success', 'Review updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Review $review): RedirectResponse
    {
        $this->authorize('delete', $review);

        $review->delete();

        return redirect()->route('reviews.index')
            ->with('success', 'Review deleted successfully.');
    }

    private function getVisibleReviews(User $user)
    {
        if ($user->isExecutive()) {
            return Review::query();
        }

        $query = Review::query();

        if ($user->isManager()) {
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

        $advisorProjectIds = $user->advisoryProjects()->pluck('projects.id');
        if ($advisorProjectIds->isNotEmpty()) {
            $query->orWhere(function ($q) use ($advisorProjectIds) {
                $q->where('reviewable_type', Project::class)
                  ->whereIn('reviewable_id', $advisorProjectIds);
            });
        }

        return $query;
    }

    private function canReview(User $user, $reviewable): bool
    {
        if ($reviewable instanceof User) {
            $userTeamIds = $user->teams()->pluck('teams.id');
            $reviewableTeamIds = $reviewable->teams()->pluck('teams.id');
            
            return $user->id === $reviewable->id 
                || $userTeamIds->intersect($reviewableTeamIds)->isNotEmpty();
        }

        if ($reviewable instanceof Project) {
            $userTeamIds = $user->teams()->pluck('teams.id');
            $projectTeamIds = $reviewable->teams()->pluck('teams.id');
            
            return $userTeamIds->intersect($projectTeamIds)->isNotEmpty()
                || $user->isAdvisorOnProject($reviewable);
        }

        return false;
    }

    private function canViewReview(User $user, Review $review): bool
    {
        if ($user->isExecutive()) {
            return true;
        }

        $reviewable = $review->reviewable;

        if ($reviewable instanceof User) {
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
            $userTeamIds = $user->teams()->pluck('teams.id');
            $projectTeamIds = $reviewable->teams()->pluck('teams.id');
            
            return $userTeamIds->intersect($projectTeamIds)->isNotEmpty()
                || $user->isAdvisorOnProject($reviewable);
        }

        return false;
    }
}
