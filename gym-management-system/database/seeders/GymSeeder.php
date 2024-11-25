<?php

namespace Database\Seeders;

use App\Models\Gym;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Types\Relations\Role;

class GymSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
          // Create roles
        $superAdminRole = Role::create(['name' => 'super_admin']);
        $gymAdminRole = Role::create(['name' => 'gym_admin']);
        $memberRole = Role::create(['name' => 'member']);

        // Create a super admin
        $superAdmin = User::factory()->create([
            'name' => 'Super Admin',
            'email' => 'superadmin@example.com',
            'password' => bcrypt('password'),
        ]);
        $superAdmin->assignRole($superAdminRole);

        // Create a gym admin
        $gymAdmin = User::factory()->create([
            'name' => 'Gym Admin',
            'email' => 'gymadmin@example.com',
            'password' => bcrypt('password'),
        ]);
        $gymAdmin->assignRole($gymAdminRole);

        // Create a gym
        $gym = Gym::create([
            'name' => 'My Gym',
            'admin_id' => $gymAdmin->id,
        ]);

        // Create a member
        $member = User::factory()->create([
            'name' => 'Gym Member',
            'email' => 'member@example.com',
            'password' => bcrypt('password'),
        ]);
        $member->assignRole($memberRole);

        // Associate the member with the gym
        $gym->members()->create([
            'user_id' => $member->id,
            'created_by' => $gymAdmin->id,
        ]);
    }
}

