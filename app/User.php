<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'username',
        'email',
        'phone',
        'password',
        'type',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The relation between user and articles
     * @return Paginator
     */
    public static function loadAllAgents()
    {
        return static::where('type', 1)
            ->paginate();
    }

    public static function loadAgent()
    {
        return static::with('agent')
            ->latest()
            ->paginate();
    }

    public static function loadAllPlayers()
    {
        return static::where('type', 2)
            ->with('player')
            ->paginate();
    }

    public static function loadPlayersNotAssigned()
    {
        return static::latest()
            ->where('type', 2)
            ->paginate();
    }


    public function articles(): HasMany
    {
        return $this->hasMany(Article::class);
    }

    public function superAgent(): HasMany
    {
        return $this->HasMany(SuperAgent::class);
    }

    public function agent(): HasMany
    {
        return $this->HasMany(Agent::class);
    }

    public function player(): HasMany
    {
        return $this->HasMany(Player::class);
    }

    public function userAgent()
    {
        return $this->hasManyThrough(User::class, Player::class, 'agent_id', 'id', 'id', 'id');
    }
}
