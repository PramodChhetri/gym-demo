<?php

namespace App\Http\Controllers;

use App\Models\Gym;
use App\Models\User;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GymController extends Controller
{
    /**
     * Display a listing of the members in the gym.
     */
    

    // public function index(Request $request)
    // {
    //     // Check if the user has the 'manage_gyms' permission
    //     if (!$request->user()->can('manage_gyms')) {
    //         return redirect()->back()->with('error', 'Unauthorized access.');
    //     }

    //     // Get the user's gyms based on their role
    //     if ($request->user()->hasRole('admin')) {
    //         $gyms = Gym::all(); // All gyms
    //     } else {
    //         $gyms = $request->user()->gyms; // Gyms assigned to the user
    //     }

    //     return view('members.index', compact('gyms'));
    // }

        public function index(Request $request) 

        {
            // Ensure the user is authenticated and has the 'gym_admin' role
            $user = $request->user();
            if (!$user || !$user->hasRole('gym_admin')) {
                return redirect()->back()->with('error', 'Unauthorized access.');
            }

            // Get the gym associated with the user
            $gym = $user->gym;

            // If the gym is not found, handle it appropriately
            if (!$gym) {
                return redirect()->back()->with('error', 'No gym associated with your account.');
            }

            
            $members = $gym->members; // Get the gym's members

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

        $gym = $request->user()->gyms()->first();
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
    public function gymMembers(Gym $gym)
        {
            $this->authorize('view', $gym); // Ensure the user is the gym admin
            $members = $gym->members;
            return response()->json($members);


        }

        public function allGyms(Request $request)
            {
                $user = $request->user();
                if (!$user->hasRole('super_admin')) {
                    abort(403, 'Unauthorized');
                }
            
                $gyms = Gym::all();
            
                return response()->json($gyms);
            }
}
