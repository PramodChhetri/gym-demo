<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Member;

class MemberPolicy
{
    public function update(User $user, Member $member)
    {
        return $user->gym && $user->gym->id === $member->gym_id;
    }

    public function delete(User $user, Member $member)
    {
        return $user->gym && $user->gym->id === $member->gym_id;
    }
}
