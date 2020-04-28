<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Detail extends Model
{
    protected $table = 'detail';

    protected $fillable = [
        'player_id',
        'region',
        'nickname',
        'memoname',
        'winnings',
        'rake',
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

    /**
     * load one detail
     *
     * @param string $playerId
     * @return Detail
     */
    public static function getDetail($id): Detail
    {
        return Detail::findOrFail($id);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
