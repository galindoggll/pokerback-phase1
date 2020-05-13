<?php

namespace App\Http\Controllers\Api;

use App\Agent;
use App\Player;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Imports\PlayerDataImport;
use Maatwebsite\Excel\Facades\Excel;

class PlayerController extends Controller
{
    public function showPlayersNotAssigned()
    {
        $players = Player::query()
            ->where('agent_id', 0)
            ->with('user')
            ->get();
        return response([$players], 200);
    }

    public function show($id, $type)
    {
        if ($type == 2) {
            $player = Player::where('user_id', $id)->with('user')->first();
        }
        if ($type == 0 || $type == 1) {
            $player = Player::with('user')->findOrFail($id);
        }

        return $player;
    }

    public function index()
    {
        return Player::with('user')->get();
    }

    public function assignPlayers(Request $request)
    {
        $ids = $request->all();
        foreach ($ids['players'] as $id => $value) {
            if ($value) {
                $player = Player::findOrFail($id);

                $player->agent_id = $ids['agent'];
                $player->save();
            }
        }

        $info = Agent::where('id', $ids['agent'])->with('player.user')->get();

        $players = Player::query()
            ->where('agent_id', 0)
            ->with('user')
            ->get();

        return response()->json(["info" => $info, "players" => $players], 200);
    }

    public function unassignPlayer(Request $request)
    {
        $id = $request->all();
        $player = Player::findOrFail($id['player']);

        $player->agent_id = 0;
        $player->save();

        $info = Agent::where('id', $id['agent'])->with('player.user')->get();

        $players = Player::query()
            ->where('agent_id', 0)
            ->with('user')
            ->get();

        return response()->json(["info" => $info, "players" => $players], 200);
    }

    public function update(Request $request)
    {
        $requestPlayer = $request->all();

        $player = Player::findOrFail($requestPlayer['player']);
        $player->rakeback_percentage = isset($requestPlayer['rakebackPercentage']) ? $requestPlayer['rakebackPercentage'] : $player->rakeback_percentage;
        $player->super_agent_percentage = isset($requestPlayer['superAgentPercentage']) ? $requestPlayer['superAgentPercentage'] : $player->super_agent_percentage;
        $player->agent_percentage = isset($requestPlayer['agentPercentage']) ? $requestPlayer['agentPercentage'] : $player->agent_percentage;
        $player->player_percentage = isset($requestPlayer['playerPercentage']) ? $requestPlayer['playerPercentage'] : $player->player_percentage;
        $player->save();

        return response()->json($player, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {

    }

    public function import(Request $request)
    {
        Excel::import(new PlayerDataImport, $request->file('file'));
        return User::loadAllPlayers();
    }
}
