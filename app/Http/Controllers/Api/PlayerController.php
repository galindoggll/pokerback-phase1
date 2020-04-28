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
    public function assignAgent(Request $request, $id)
    {
        $player = Player::findOrFail($id);

        $data['agent_id'] = $request['agent_id'];
        $player->update($data);

        return response()->json($player, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ArticleRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(ArticleRequest $request)
    {
        $user = $request->user();

        $article = new Article($request->validated());
        $article->slug = Str::slug($request->get('title'));

        $user->articles()->save($article);

        return response()->json($article, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        if (!$request->user()->is_admin) {
            return Article::mine($request->user()->id)->findOrFail($id);
        }

        return Article::findOrFail($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        $article = Article::findOrFail($id);

        $article->delete();

        return response([], 200);
    }
}
