'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import type { AuthFormErrors, AuthTokens } from '@/types';

export default function RegisterPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errors, setErrors] = useState<AuthFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate(): AuthFormErrors {
    const errs: AuthFormErrors = {};
    if (!username.trim()) errs.username = 'Username is required.';
    if (!email.trim()) errs.email = 'Email is required.';
    if (password.length < 8)
      errs.password = 'Password must be at least 8 characters.';
    if (password !== passwordConfirm)
      errs.passwordConfirm = 'Passwords do not match.';
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/api/auth/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          email,
          password,
          password_confirm: passwordConfirm,
        }),
      });

      if (res.status === 400) {
        const data = (await res.json()) as Record<string, string[]>;
        const mapped: AuthFormErrors = {};
        if (data.username) mapped.username = data.username[0];
        if (data.email) mapped.email = data.email[0];
        if (data.password) mapped.password = data.password[0];
        if (data.password_confirm)
          mapped.passwordConfirm = data.password_confirm[0];
        setErrors(mapped);
        return;
      }
      if (!res.ok) throw new Error('Registration failed');

      const data = (await res.json()) as AuthTokens;
      login(data);
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
      <h1 className="mb-8 text-2xl font-bold text-white">Create account</h1>
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
          <label htmlFor="email" className="text-sm text-gray-400">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded border border-gray-700 bg-gray-900 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="email"
          />
          {errors.email && (
            <p className="text-sm text-red-400">{errors.email}</p>
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
            autoComplete="new-password"
          />
          {errors.password && (
            <p className="text-sm text-red-400">{errors.password}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="passwordConfirm" className="text-sm text-gray-400">
            Confirm password
          </label>
          <input
            id="passwordConfirm"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="rounded border border-gray-700 bg-gray-900 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="new-password"
          />
          {errors.passwordConfirm && (
            <p className="text-sm text-red-400">{errors.passwordConfirm}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Creating account…' : 'Create account'}
        </button>
      </form>
      <p className="mt-6 text-sm text-gray-400">
        Already have an account?{' '}
        <Link href="/login" className="text-blue-400 hover:underline">
          Log in
        </Link>
      </p>
    </main>
  );
}
