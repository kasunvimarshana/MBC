<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
/*
Route::get('/', function () {
    return view('welcome');
});
*/

//Route::get('/', [App\Http\Controllers\VideoController::class, 'index'])->name('home');
Route::get('/', [App\Http\Controllers\VideoController::class, 'getAllJson'])->name('video.getAllJson');
Route::get('videos/create', [App\Http\Controllers\VideoController::class, 'create'])->name('video.create');
Route::post('videos/store', [App\Http\Controllers\VideoController::class, 'store'])->name('video.store');
Route::get('videos/edit/{video}', [App\Http\Controllers\VideoController::class, 'edit'])->name('video.edit');
Route::post('videos/update/{video}', [App\Http\Controllers\VideoController::class, 'update'])->name('video.update');
Route::get('videos/destroy/{video}', [App\Http\Controllers\VideoController::class, 'destroy'])->name('video.destroy');
Route::get('videos/show/{video}', [App\Http\Controllers\VideoController::class, 'show'])->name('video.show');
Route::get('videos/all/json', [App\Http\Controllers\VideoController::class, 'getAllJson'])->name('video.getAllJson');

Route::get('videos', [App\Http\Controllers\VideoController::class, 'index'])->name('videos');