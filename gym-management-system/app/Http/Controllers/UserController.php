<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function createSuperAdmin(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $superAdmin = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);
        $superAdmin->assignRole('Super Admin');

        return redirect()->back()->with('success', 'Super Admin created successfully.');
    }

    public function assignSuperAdmnRole($userId)
    {
        $user = User::find($userId);
        if ($user) {
            $user->assignRole('Super Admin');
            return redirect()->back()->with('success', 'Super Admin role assigned successfully.');
        } else {
            return redirect()->back()->with('error', 'User not found.');
        }
    }
   
}
