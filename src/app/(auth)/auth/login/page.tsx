"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginForm>();
  const onSubmit = handleSubmit(() => {});

  return (
    <>
      <div className="auth-card-heading">
        <h1>Log in to your account</h1>
        <p>Welcome back! Enter your credentials below.</p>
      </div>

      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-[var(--coollabs-subtle)]">Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          className="input"
          required
          {...register("email")}
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-[var(--coollabs-subtle)]">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          className="input"
          required
          {...register("password")}
        />
      </div>
      <div className="flex items-center justify-end">
        <Link href="/auth/forgot-password" className="auth-text-link">
          Forgot password?
        </Link>
      </div>
      <button type="submit" className="button w-full justify-center" data-highlighted>
        Log in
      </button>
    </form>

    <p className="mt-6 text-center text-sm text-[var(--color-fg-dim)]">
        Don&apos;t have an account?{" "}
        <Link href="/auth/register" className="auth-text-link">
          Sign up
        </Link>
      </p>
    </>
  );
}
