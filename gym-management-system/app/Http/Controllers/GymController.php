<?php

namespace App\Http\Controllers;

use App\Models\Gym;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GymController extends Controller
{
    /**
     * Display a listing of the members in the gym.
     */
    public function index()
    {
        $gym = Auth::user()->gyms()->first(); // Assuming a user can manage one gym.
        if (!$gym) {
            return redirect()->back()->with('error', 'No gym assigned.');
        }

        $members = $gym->members; // Assuming Gym has a `members` relationship.
        return view('members.index', compact('members'));
    }

    /**
     * Show the form for creating a new member.
     */
    public function create()
    {
        return view('members.create');
    }

    /**
     * Store a newly created member in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:members,email',
            'phone' => 'nullable|string|max:20',
        ]);

        $gym = Auth::user()->gyms()->first();
        if (!$gym) {
            return redirect()->back()->with('error', 'No gym assigned.');
        }

        $gym->members()->create([
            'created_by' => Auth::id(),
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
        ]);

        return redirect()->route('members.index')->with('success', 'Member added successfully.');
    }

    /**
     * Show the form for editing a member.
     */
    public function edit(Member $member)
    {
        $this->authorize('update', $member);
        return view('members.edit', compact('member'));
    }

    /**
     * Update the specified member in storage.
     */
    public function update(Request $request, Member $member)
    {
        $this->authorize('update', $member);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:members,email,' . $member->id,
            'phone' => 'nullable|string|max:20',
        ]);

        $member->update($request->only(['name', 'email', 'phone']));

        return redirect()->route('members.index')->with('success', 'Member updated successfully.');
    }

    /**
     * Remove the specified member from storage.
     */
    public function destroy(Member $member)
    {
        $this->authorize('delete', $member);
        $member->delete();

        return redirect()->route('members.index')->with('success', 'Member deleted successfully.');
    }
}
