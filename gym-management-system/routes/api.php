<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GymController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\UserController;

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

Route::middleware(['auth:sanctum'])->group(function()
{
    Route::get('/members', [MemberController::class, 'index']); 
    Route::post('/members', [MemberController::class, 'store']); 
    Route::get('/members/{member}', [MemberController::class, 'show']); 
    Route::put('/members/{member}', [MemberController::class, 'update']); 
    Route::delete('/members/{member}', [MemberController::class, 'destroy']); 
});

Route::middleware(['auth:sanctum'])->group(function(){
    Route::apiResource('gyms', GymController::class);
    Route::post('super-admins', [GymController::class, 'createSuperAdmin']);;
   

});

Route::middleware(['auth:sanctum', 'role:gym_admin'])->group(function () {
    Route::get('/gyms/{gym}/members', [GymController::class, 'gymMembers']);
    Route::post('/gyms/{gym}/members', [GymController::class, 'storeMember']);
    Route::put('/gyms/{gym}/members/{member}', [GymController::class, 'updateMember']);
    Route::delete('/gyms/{gym}/members/{member}', [GymController::class, 'deleteMember']);
    
});

Route::middleware(['auth:sanctum', 'role:super_admin'])->group(function () {
    Route::get('/gyms', [GymController::class, 'allGyms']);
    Route::post('/super-admins', [UserController::class, 'createSuperAdmin']);
    
});

