<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// default name space for all routes is 'App\Http\Controllers\Api'
$api_version = config('api.api_version');

Route::group(["prefix" => "{$api_version}"], function() {
    Route::get('info/{id}', 'UserController@show');
    Route::get('players-unassigned/', 'PlayerController@showPlayersNotAssigned');
    Route::post('assign-players/', 'PlayerController@assignPlayers');
    Route::get('agents/', 'UserController@showAllAgents');
    Route::get('players/', 'UserController@showAllPlayers');
    Route::get('player/{id}/{type}', 'PlayerController@show');
    Route::post('update-player/', 'PlayerController@update');
    Route::post('import/', 'PlayerController@import');
    Route::get('agent/players/{id}', 'AgentController@showAllPlayers');
    // register auth routes
    Route::prefix('auth')
        ->group(base_path('routes/api/auth.php'));
    // register users routes
    Route::prefix('users')
        ->group(base_path('routes/api/users.php'));
    // register articles routes
    Route::prefix('articles')
        ->group(base_path('routes/api/articles.php'));
});
Route::get('agent', 'AgentController@index');
Route::get('player', 'PlayerController@index');

Route::group(['middleware' => 'auth:api'], function() {

});
