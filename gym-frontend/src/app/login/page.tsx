'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLogin } from '../hooks/useLogin';
import { Auth } from '../libs/auth';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const { mutate: login, isLoading } = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    login(
      { email, password },
      {
        onSuccess: (data) => {
          if (data.role === 'Super Admin') {
            router.push('/dashboard/super-admin');
          } else if (data.role === 'Gym Admin') {
            router.push('/dashboard/gym-admin');
          } else {
            setError('Unauthorized role');
            Auth.logout();
          }
        },
        onError: (err: any) => {
          setError(err.response?.data?.error || 'Login failed');
        },
      }
    );
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
