<?php

namespace App\Http\Controllers\Api;

use App\Agent;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Http\Requests\ArticleRequest;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class AgentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return LengthAwarePaginator|mixed
     */
    public function index()
    {
        //dd(Agent::with('user'));
        return response()->json(Agent::with('user'));
    }

    /**
     * Get single published article
     *
     * @param Request $request
     * @return mixed
     */
    public function assignPlayer(Request $request)
    {
        return Article::loadPublished($slug);
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
     * @param ArticleRequest $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(ArticleRequest $request, $id)
    {
        $article = Article::findOrFail($id);

        $data = $request->validated();
        $data['slug'] = Str::slug($data['title']);
        $article->update($data);

        return response()->json($article, 200);
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
