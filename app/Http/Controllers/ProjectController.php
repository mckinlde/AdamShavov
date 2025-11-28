<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Models\Project;
use App\Models\Team;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        if ($user->isExecutive()) {
            $projects = Project::with('teams')->get();
        } else {
            $userTeamIds = $user->teams()->pluck('teams.id');
            $projects = Project::whereHas('teams', function ($q) use ($userTeamIds) {
                $q->whereIn('teams.id', $userTeamIds);
            })->with('teams')->get();

            $advisorProjects = $user->advisoryProjects()->with('teams')->get();
            $projects = $projects->merge($advisorProjects)->unique('id');
        }

        return Inertia::render('projects/index', [
            'projects' => $projects->map(function ($project) {
                return [
                    'id' => $project->id,
                    'name' => $project->name,
                    'description' => $project->description,
                    'teams' => $project->teams->map(fn($team) => [
                        'id' => $team->id,
                        'name' => $team->name,
                    ]),
                ];
            }),
            'canCreate' => $user->isExecutive(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $this->authorize('create', Project::class);

        return Inertia::render('projects/create', [
            'teams' => Team::all()->map(fn($team) => [
                'id' => $team->id,
                'name' => $team->name,
            ]),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request): RedirectResponse
    {
        $this->authorize('create', Project::class);

        $project = Project::create($request->validated());

        if ($request->has('team_ids')) {
            $project->teams()->sync($request->team_ids);
        }

        return redirect()->route('projects.index')
            ->with('success', 'Project created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Project $project): Response
    {
        $this->authorize('view', $project);

        return Inertia::render('projects/show', [
            'project' => [
                'id' => $project->id,
                'name' => $project->name,
                'description' => $project->description,
                'teams' => $project->teams->map(fn($team) => [
                    'id' => $team->id,
                    'name' => $team->name,
                ]),
                'advisors' => $project->advisors->map(fn($advisor) => [
                    'id' => $advisor->id,
                    'name' => $advisor->name,
                    'email' => $advisor->email,
                ]),
            ],
            'canEdit' => $request->user()->isExecutive(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project): Response
    {
        $this->authorize('update', $project);

        return Inertia::render('projects/edit', [
            'project' => [
                'id' => $project->id,
                'name' => $project->name,
                'description' => $project->description,
                'team_ids' => $project->teams->pluck('id'),
            ],
            'teams' => Team::all()->map(fn($team) => [
                'id' => $team->id,
                'name' => $team->name,
            ]),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreProjectRequest $request, Project $project): RedirectResponse
    {
        $this->authorize('update', $project);

        $project->update($request->validated());

        if ($request->has('team_ids')) {
            $project->teams()->sync($request->team_ids);
        }

        return redirect()->route('projects.index')
            ->with('success', 'Project updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project): RedirectResponse
    {
        $this->authorize('delete', $project);

        $project->delete();

        return redirect()->route('projects.index')
            ->with('success', 'Project deleted successfully.');
    }
}
