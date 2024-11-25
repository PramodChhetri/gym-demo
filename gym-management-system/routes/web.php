<?php

use App\Http\Controllers\GymController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::middleware(['role:Super Admin'])->group(function(){
    Route::resource('gyms', GymController::class);
    Route::post('super-admin', [UserController::class, 'createSuperAdmin'])->name('super-admins.store');
});

//gym admin
Route::middleware(['role:Gym Admin'])->group(function(){
    Route::resource('members', MemberController::class);
    });
