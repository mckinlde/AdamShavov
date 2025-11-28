<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    /**
     * Get all teams the user belongs to.
     */
    public function teams()
    {
        return $this->belongsToMany(Team::class, 'team_members')
                    ->withPivot('role')
                    ->withTimestamps();
    }

    /**
     * Get teams where the user is a manager.
     */
    public function managedTeams()
    {
        return $this->teams()->wherePivot('role', 'manager');
    }

    /**
     * Get reviews created by this user.
     */
    public function reviews()
    {
        return $this->hasMany(Review::class, 'reviewer_id');
    }

    /**
     * Get reviews about this user.
     */
    public function receivedReviews()
    {
        return $this->morphMany(Review::class, 'reviewable');
    }

    /**
     * Get projects where the user is assigned as an advisor.
     */
    public function advisoryProjects()
    {
        return $this->belongsToMany(Project::class, 'internal_advisors')
                    ->withPivot('team_id')
                    ->withTimestamps();
    }

    /**
     * Check if user is an executive.
     */
    public function isExecutive(): bool
    {
        return $this->role === 'executive';
    }

    /**
     * Check if user is a manager.
     */
    public function isManager(): bool
    {
        return $this->role === 'manager';
    }

    /**
     * Check if user is an associate.
     */
    public function isAssociate(): bool
    {
        return $this->role === 'associate';
    }

    /**
     * Check if user is an advisor on a specific project.
     */
    public function isAdvisorOnProject(Project $project): bool
    {
        return $this->advisoryProjects()->where('projects.id', $project->id)->exists();
    }
}
