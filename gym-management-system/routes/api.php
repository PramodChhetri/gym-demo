<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MemberController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');



Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Route::get('/test', [AuthController::class, 'test']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', function (Request $request) {
        return $request->user();
    });
});

Route::middleware(['auth:sanctum', 'role:Gym Admin'])->group(function()
{
    Route::get('/members', [MemberController::class, 'index']); 
    Route::post('/members', [MemberController::class, 'store']); 
    Route::get('/members/{member}', [MemberController::class, 'show']); 
    Route::put('/members/{member}', [MemberController::class, 'update']); 
    Route::delete('/members/{member}', [MemberController::class, 'destroy']); 
});

Route::middleware(['auth:sanctum', 'role: Super Admin'])->group(function(){
    // Route::get('/super-admin/dashboard', [SuperAdminController::class, 'dashboard']);
});

Route::middleware(['auth:sanctum', 'role:Gym Admin'])->group(function () {
    // Route::get('/gym-admin/dashboard', [GymAdminController::class, 'dashboard']);
});