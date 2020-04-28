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
    Route::get('info/{id}', 'UserController@show')->name('articles.index');
    Route::get('agents/', 'UserController@showAllAgents')->name('articles.index');
    Route::get('players/', 'UserController@showAllPlayers')->name('articles.index');
    // register auth routes
    Route::prefix('auth')
        ->group(base_path('routes/api/auth.php'));
    // register users routes
    Route::prefix('users')
        ->group(base_path('routes/api/users.php'));
    // register articles routes
    Route::prefix('articles')
        ->group(base_path('routes/api/articles.php'));
//    Route::prefix('agent')
//        ->group(base_path('routes/api/articles.php'));
});

Route::post('import', 'DetailController@import');
Route::get('details', 'DetailController@index');
Route::get('showDetail/{id}', 'DetailController@show');

Route::get('agent', 'AgentController@index')->name('articles.index');
Route::get('player', 'PlayerController@index')->name('articles.index');

Route::group(['middleware' => 'auth:api'], function() {

});
