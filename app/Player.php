<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Player extends Model
{
    protected $table = 'player';

    protected $fillable = [
        'user_id',
        'agent_id',
        'playing_id',
        'rake',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function agent()
    {
        return $this->belongsTo(Agent::class, 'agent_id', 'id');
    }

    public function userPlayer()
    {
        return $this->hasManyThrough(User::class, Player::class, 'agent_id', 'id', 'id', 'user_id');
    }
}
