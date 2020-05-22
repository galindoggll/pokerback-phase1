<?php

namespace App\Http\Controllers\Api;

use App\Agent;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Player;
use App\User;
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

    public function update(UserRequest $request, $id)
    {
        $user = User::findOrFail($id);

        $user->update($request->validated());

        $info = Agent::where('user_id', $user['id'])->with('player.user')->get();

        return response()->json(["user" => $user, "info" => $info], 200);
    }
}
