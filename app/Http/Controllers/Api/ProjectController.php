<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequest;
use App\Models\Project;
use App\Models\Team;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user->isExecutive()) {
            $projects = Project::with('teams')->get();
        } else {
            // Get projects assigned to user's teams
            $userTeamIds = $user->teams()->pluck('teams.id');
            $projects = Project::whereHas('teams', function ($q) use ($userTeamIds) {
                $q->whereIn('teams.id', $userTeamIds);
            })->with('teams')->get();

            // Add advisor projects
            $advisorProjects = $user->advisoryProjects()->with('teams')->get();
            $projects = $projects->merge($advisorProjects)->unique('id');
        }

        return response()->json([
            'data' => $projects,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request): JsonResponse
    {
        $this->authorize('create', Project::class);

        $project = Project::create($request->validated());

        return response()->json([
            'message' => 'Project created successfully',
            'data' => $project->load('teams'),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Project $project): JsonResponse
    {
        $this->authorize('view', $project);

        return response()->json([
            'data' => $project->load('teams', 'advisors'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreProjectRequest $request, Project $project): JsonResponse
    {
        $this->authorize('update', $project);

        $project->update($request->validated());

        return response()->json([
            'message' => 'Project updated successfully',
            'data' => $project->load('teams'),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Project $project): JsonResponse
    {
        $this->authorize('delete', $project);

        $project->delete();

        return response()->json([
            'message' => 'Project deleted successfully',
        ]);
    }

    /**
     * Assign teams to a project.
     */
    public function assignTeams(Request $request, Project $project): JsonResponse
    {
        $this->authorize('update', $project);

        $request->validate([
            'team_ids' => ['required', 'array'],
            'team_ids.*' => ['exists:teams,id'],
        ]);

        $project->teams()->sync($request->team_ids);

        return response()->json([
            'message' => 'Teams assigned successfully',
            'data' => $project->load('teams'),
        ]);
    }

    /**
     * Remove a team from a project.
     */
    public function removeTeam(Request $request, Project $project, Team $team): JsonResponse
    {
        $this->authorize('update', $project);

        $project->teams()->detach($team->id);

        return response()->json([
            'message' => 'Team removed from project successfully',
        ]);
    }

    /**
     * Assign advisors to a project.
     */
    public function assignAdvisors(Request $request, Project $project): JsonResponse
    {
        $this->authorize('update', $project);

        $request->validate([
            'user_ids' => ['required', 'array'],
            'user_ids.*' => ['exists:users,id'],
            'team_id' => ['nullable', 'exists:teams,id'],
        ]);

        $advisors = [];
        foreach ($request->user_ids as $userId) {
            $advisors[$userId] = ['team_id' => $request->team_id];
        }

        $project->advisors()->sync($advisors);

        return response()->json([
            'message' => 'Advisors assigned successfully',
            'data' => $project->load('advisors'),
        ]);
    }

    /**
     * Remove an advisor from a project.
     */
    public function removeAdvisor(Request $request, Project $project, $userId): JsonResponse
    {
        $this->authorize('update', $project);

        $project->advisors()->detach($userId);

        return response()->json([
            'message' => 'Advisor removed from project successfully',
        ]);
    }
}
