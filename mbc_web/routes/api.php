<?php

use Illuminate\Http\Request;
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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::get('/videos/all/json', [App\Http\Controllers\VideoController::class, 'getAllJson'])->name('video.getAllJson');
Route::get('/live-streams/all/json', [App\Http\Controllers\LiveStreamController::class, 'getAllJson'])->name('liveStream.getAllJson');