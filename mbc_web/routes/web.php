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
Route::group(['middleware' => ['authMiddleware']], function(){
    Route::get('/videos/create', [App\Http\Controllers\VideoController::class, 'create'])->name('video.create');
    Route::post('/videos/store', [App\Http\Controllers\VideoController::class, 'store'])->name('video.store');
    Route::get('/videos/edit/{video}', [App\Http\Controllers\VideoController::class, 'edit'])->name('video.edit');
    Route::post('/videos/update/{video}', [App\Http\Controllers\VideoController::class, 'update'])->name('video.update');
    Route::get('/videos/destroy/{video}', [App\Http\Controllers\VideoController::class, 'destroy'])->name('video.destroy');
    Route::get('/videos/show/{video}', [App\Http\Controllers\VideoController::class, 'show'])->name('video.show');
    Route::get('/videos', [App\Http\Controllers\VideoController::class, 'index'])->name('videos');

    Route::get('/live-streams/create', [App\Http\Controllers\LiveStreamController::class, 'create'])->name('liveStream.create');
    Route::post('/live-streams/store', [App\Http\Controllers\LiveStreamController::class, 'createOrUpdate'])->name('liveStream.store');

    Route::get('/app-settings/create', [App\Http\Controllers\AppSettingController::class, 'create'])->name('appSetting.create');
    Route::post('/app-settings/store', [App\Http\Controllers\AppSettingController::class, 'createOrUpdate'])->name('appSetting.store');

    Route::get('/logout', [App\Http\Controllers\AuthController::class, 'logout'])->name('login.logout');
});

Route::get('/login', [App\Http\Controllers\AuthController::class, 'create'])->name('login.create');
Route::post('/login', [App\Http\Controllers\AuthController::class, 'login'])->name('login.login');

// Route::get('/', function(){
//     return view('video.home');
// })->name('home');

Route::group(['middleware' => ['permitCountries']], function(){
    Route::get('/', [App\Http\Controllers\HomeController::class, 'home_permit'])->name('home');
});

Route::get('/deny', [App\Http\Controllers\HomeController::class, 'home_deny'])->name('home.deny');

// Route::group(['middleware' => ['authMiddleware']], function(){
//     Route::get('/app/setup', function(){
//         // Artisan::call('storage:link');
//         // echo "storage:link <br />";
//         // Artisan::call('migrate:fresh --seed');
//         // echo "migrate:fresh --seed <br />";
//         // Artisan::call('migrate --seed');
//         // echo "migrate --seed <br />";
//         // Artisan::call('db:seed');
//         // echo "db:seed <br />";
//         echo "Setup!!! <br />";
//     });
// });