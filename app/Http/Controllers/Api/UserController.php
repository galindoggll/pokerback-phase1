<?php

namespace App\Http\Controllers\Api;

use App\Agent;
use App\Player;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\User;

class UserController extends Controller
{
    public function update(UserRequest $request, $id)
    {
        $user = User::findOrFail($id);

        $user->update($request->validated());

        return response()->json([
            'user' => $user
        ], 201);
    }

    public function assignAgent(Request $request, $id)
    {
        $player = Player::findOrFail($id);
        $player->agent_id = $request['agent_id'];

        $player->save();

        return response()->json($player, 200);
    }

    public function showAllAgents()
    {
        return User::loadAllAgents();
    }

    public function showAllPlayers()
    {
        return User::loadAllPlayers();
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        $info = "";
        if ($user['type'] === 1) {
            $info = Agent::where('user_id', $user['id'])->with('userPlayer')->get();
        }

        if ($user['type'] === 2) {
            $info = Player::where('user_id', $user['id'])->with('agent.user')->get();
        }

        return response()->json(["user" => $user, "info" => $info], 200);
    }
}
