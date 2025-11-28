<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTeamRequest;
use App\Models\Team;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $this->authorize('viewAny', Team::class);

        $teams = Team::with(['members', 'projects'])->get();

        return response()->json([
            'data' => $teams,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTeamRequest $request): JsonResponse
    {
        $this->authorize('create', Team::class);

        $team = Team::create($request->validated());

        return response()->json([
            'message' => 'Team created successfully',
            'data' => $team,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Team $team): JsonResponse
    {
        $this->authorize('view', $team);

        return response()->json([
            'data' => $team->load(['members', 'projects']),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreTeamRequest $request, Team $team): JsonResponse
    {
        $this->authorize('update', $team);

        $team->update($request->validated());

        return response()->json([
            'message' => 'Team updated successfully',
            'data' => $team->load(['members', 'projects']),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Team $team): JsonResponse
    {
        $this->authorize('delete', $team);

        $team->delete();

        return response()->json([
            'message' => 'Team deleted successfully',
        ]);
    }

    /**
     * Add a member to a team.
     */
    public function addMember(Request $request, Team $team): JsonResponse
    {
        $this->authorize('update', $team);

        $request->validate([
            'user_id' => ['required', 'exists:users,id'],
            'role' => ['required', 'in:manager,associate'],
        ]);

        // Check if team already has a manager
        if ($request->role === 'manager') {
            $existingManager = $team->members()->wherePivot('role', 'manager')->first();
            if ($existingManager) {
                return response()->json([
                    'message' => 'Team already has a manager. Please remove the existing manager first.',
                ], 422);
            }
        }

        $team->members()->syncWithoutDetaching([
            $request->user_id => ['role' => $request->role],
        ]);

        return response()->json([
            'message' => 'Member added to team successfully',
            'data' => $team->load('members'),
        ]);
    }

    /**
     * Remove a member from a team.
     */
    public function removeMember(Request $request, Team $team, User $user): JsonResponse
    {
        $this->authorize('update', $team);

        $team->members()->detach($user->id);

        return response()->json([
            'message' => 'Member removed from team successfully',
        ]);
    }
}
