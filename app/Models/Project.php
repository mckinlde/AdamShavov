<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
    ];

    /**
     * Get all teams working on this project.
     */
    public function teams(): BelongsToMany
    {
        return $this->belongsToMany(Team::class, 'project_teams')
                    ->withTimestamps();
    }

    /**
     * Get all reviews for this project.
     */
    public function reviews(): MorphMany
    {
        return $this->morphMany(Review::class, 'reviewable');
    }

    /**
     * Get all users assigned as advisors to this project.
     */
    public function advisors(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'internal_advisors')
                    ->withPivot('team_id')
                    ->withTimestamps();
    }
}

