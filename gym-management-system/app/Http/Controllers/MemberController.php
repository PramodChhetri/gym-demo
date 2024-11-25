<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Gym;
use App\Models\Member;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;


class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    use AuthorizesRequests;
    public function index()
    {
        $gym = Auth::user()->gyms;
        return response()->json($gym);
    if ($gym) {
        $members = $gym->members;
        return response()->json(['members' => $members]);
    }

    return response()->json(['error' => 'No gym assigned'], 403);
    
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:members',
            'phone' => 'nullable|string|max:20',
        ]);
//first check auth for admin then user connected gym then login user(gym admin) members list
        $gym = Auth::user()->gym;

        if ($gym) {
            $member = Member::create([
                'gym_id' => $gym->id,
                'created_by' => Auth::id(),
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
            ]);

            return response()->json(['member' => $member, 'message' => 'Member created successfully'], 201);
        }

        return response()->json(['error' => 'No gym assigned'], 403);
    }

    /**
     * Display the specified resource.
     */
    public function show(Member $member)
    {
        $this->authorize('view', $member);
        return response()->json(['member' => $member], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Member $member)
    {
        $this->authorize('update', $member);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:members,email,' . $member->id,
            'phone' => 'nullable|string|max:20',
        ]);

        $member->update($request->all());

        return response()->json(['member' => $member, 'message' => 'Member updated successfully']);
        //member array in json format update it
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Member $member)
    {
        $this->authorize('delete', $member);

        $member->delete();

        return response()->json(['message' => 'Member deleted successfully']);
    }
}
