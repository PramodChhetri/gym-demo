<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


class AuthController extends Controller
{
    // Register User
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
        ]);

        return response()->json(['message' => 'User registered successfully'], 201);
    }

    // Login User
    /*     public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('auth_token')->planTextToken;


            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'role' => $user->roles->pluck('name')->first(),
            ]);
        }

        return response()->json(['message' => 'Invalid credentials']);
    } */

    public function login(Request $request)
{
    // Validate the input fields
    $credentials = $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    // Attempt to authenticate using the provided credentials
    if (!Auth::attempt($credentials)) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    // Get the authenticated user
    $user = $request->user();

    // Generate a token for the user
    $token = $user->createToken('API Token')->plainTextToken;

    // Retrieve the user's roles using Spatie's roles and permissions
    $roles = $user->getRoleNames(); // Returns a collection of role names

    // Append roles to the response
    return response()->json([
        'token' => $token,
        'user' => $user,
        'roles' => $roles, // Include roles in the response
    ]);
}

    // Logout User
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }

    // public function test(Request $request)
    // {
    //     return response()->json(['message' => 'Test successful'], 200);
    // }

}
