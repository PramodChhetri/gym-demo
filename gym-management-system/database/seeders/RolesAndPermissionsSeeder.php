<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // role
        $superAdmin = Role::create(['name' => 'Super Admin']);
        $gymAdmin = Role::create(['name' => 'Gym Admin']);

        // Permissions
        Permission::create(['name' => 'create gyms']);
        Permission::create(['name' => 'assign gym admin']);
        Permission::create(['name' => 'create super admins']);
        Permission::create(['name' => 'manage members']);

        // Assign permissions to roles
        $superAdmin->givePermissionTo(['create gyms', 'assign gym admin', 'create super admins']);
        $gymAdmin->givePermissionTo(['manage members']);
    }
}
