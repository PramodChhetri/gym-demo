'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Auth } from '../../libs/auth';

const GymAdminDashboard: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const role = Auth.getRole();

    if (role !== 'Gym Admin') {
      router.push('/login');
    }
  }, [router]);

  return (
    <div>
      <h1>Gym Admin Dashboard</h1>
      <button onClick={Auth.logout}>Logout</button>
    </div>
  );
};

export default GymAdminDashboard;
