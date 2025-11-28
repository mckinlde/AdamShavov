<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Team extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    /**
     * Get all members of the team.
     */
    public function members(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'team_members')
                    ->withPivot('role')
                    ->withTimestamps();
    }

    /**
     * Get the manager of the team.
     */
    public function manager(): ?User
    {
        return $this->members()->wherePivot('role', 'manager')->first();
    }

    /**
     * Get all associates in the team.
     */
    public function associates(): BelongsToMany
    {
        return $this->members()->wherePivot('role', 'associate');
    }

    /**
     * Get all projects assigned to this team.
     */
    public function projects(): BelongsToMany
    {
        return $this->belongsToMany(Project::class, 'project_teams')
                    ->withTimestamps();
    }
}

