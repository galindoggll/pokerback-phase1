<?php

namespace App\Http\Controllers\Api;

use App\Player;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Http\Requests\ArticleRequest;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

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

    /**
     * Display a listing of the resource.
     *
     * @return LengthAwarePaginator|mixed
     */
    public function index()
    {
        return Player::with('user')->get();
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @param $id
     * @return LengthAwarePaginator|mixed
     */
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

        return response()->json(['success'], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $player = Player::findOrFail($id);

        $data['rakeback_percentage'] = $request['rakeback_percentage'];
        $data['super_agent_percentage'] = $request['super_agent_percentage'];
        $data['agent_perccentage'] = $request['agent_perccentage'];
        $data['player_percentage'] = $request['player_percentage'];
        $player->update($data);

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
}
