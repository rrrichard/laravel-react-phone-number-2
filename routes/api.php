<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('cors')->group(function () {
    Route::get('/', \App\Http\Controllers\PostController::class . '@get');
    Route::delete('/{id}', \App\Http\Controllers\PostController::class . '@delete');
    Route::put('/{id}', \App\Http\Controllers\PostController::class . '@put');
    Route::post('/', \App\Http\Controllers\PostController::class . '@post');
});





