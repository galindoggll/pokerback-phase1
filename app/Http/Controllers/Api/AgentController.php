<?php

namespace App\Http\Controllers\Api;

use App\Agent;
use App\Http\Controllers\Controller;
use App\Player;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Http\Requests\ArticleRequest;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class AgentController extends Controller
{
    public function showAllPlayers($id)
    {
        $user = Agent::where('user_id', $id)->first();
        if (!$user) {
            return response()->json([
                'message' => 'No Agent Found'
            ], 200);
        }
        $players = Player::with('user')->where('agent_id', $user->id)->get();

        return response()->json([
            'players' => $players
        ], 200);
    }
}
