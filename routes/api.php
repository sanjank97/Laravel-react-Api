<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RecordController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|use App\Http\Controllers\ProductController;
|
*/

Route::middleware('auth:sanctum')->group(function() {
    Route::post('logout', [LoginController::class,'logout']);
});



Route::resource('records',RecordController::class);

Route::post('userlogin', [LoginController::class,'userlogin']);
Route::post('register', [RegisterController::class,'register']);

