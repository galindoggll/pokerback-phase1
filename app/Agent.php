<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Contracts\Pagination\Paginator;

class Agent extends Model
{
    protected $table = 'agent';

    protected $fillable = [
        'id',
        'user_id',
        'rakeback',
    ];

    /**
     * Load all for admin and paginate
     *
     * @return Paginator
     */
    public static function loadAll(): Paginator
    {
        return static::latest()
            ->paginate();
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function player(): HasMany
    {
        return $this->hasMany(Player::class, 'agent_id', 'id');
    }

    public function userPlayer()
    {
        return $this->hasManyThrough(User::class, Player::class, 'agent_id', 'id', 'id', 'user_id');
    }
}
