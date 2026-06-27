'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import type { AuthFormErrors, AuthTokens } from '@/types';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<AuthFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    if (!username.trim()) {
      setErrors({ username: 'Username is required.' });
      return;
    }
    if (!password) {
      setErrors({ password: 'Password is required.' });
      return;
    }

    setIsSubmitting(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/api/auth/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.status === 401) {
        setErrors({ non_field_errors: 'Invalid username or password.' });
        return;
      }
      if (!res.ok) throw new Error('Login failed');

      const data = (await res.json()) as AuthTokens;
      login({ ...data, username });
      router.push('/notes');
    } catch {
      setErrors({
        non_field_errors: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <h1 className="mb-8 text-2xl font-bold text-white">Log in</h1>
      <form
        onSubmit={(e) => void handleSubmit(e)}
        className="flex flex-col gap-4"
        noValidate
      >
        {errors.non_field_errors && (
          <p className="rounded border border-red-700 bg-red-950 px-4 py-2 text-sm text-red-400">
            {errors.non_field_errors}
          </p>
        )}
        <div className="flex flex-col gap-1">
          <label htmlFor="username" className="text-sm text-gray-400">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="rounded border border-gray-700 bg-gray-900 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="username"
          />
          {errors.username && (
            <p className="text-sm text-red-400">{errors.username}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm text-gray-400">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded border border-gray-700 bg-gray-900 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="current-password"
          />
          {errors.password && (
            <p className="text-sm text-red-400">{errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Logging in…' : 'Log in'}
        </button>
      </form>
      <p className="mt-6 text-sm text-gray-400">
        No account?{' '}
        <Link href="/register" className="text-blue-400 hover:underline">
          Register
        </Link>
      </p>
    </main>
  );
}
