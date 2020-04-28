<?php

use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth:api'], function() {
    Route::get('/', 'AgentController@index')->name('articles.index');
});