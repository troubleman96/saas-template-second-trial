"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";

type RegisterForm = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export default function RegisterPage() {
  const { register, handleSubmit } = useForm<RegisterForm>();
  const onSubmit = handleSubmit(() => {});

  return (
    <>
      <div className="auth-card-heading">
        <h1>Create your account</h1>
        <p>Start your free trial today.</p>
      </div>

      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-[var(--coollabs-subtle)]">Name</label>
        <input
          type="text"
          placeholder="Emmanuel Lugenge"
          className="input"
          required
          {...register("name")}
        />
      </div>
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
      <div>
        <label className="mb-1.5 block text-sm font-medium text-[var(--coollabs-subtle)]">Confirm password</label>
        <input
          type="password"
          placeholder="••••••••"
          className="input"
          required
          {...register("password_confirmation")}
        />
      </div>
      <button type="submit" className="button w-full justify-center" data-highlighted>
        Create account
      </button>
    </form>

    <p className="mt-6 text-center text-sm text-[var(--color-fg-dim)]">
        Already have an account?{" "}
        <Link href="/auth/login" className="auth-text-link">
          Log in
        </Link>
      </p>
    </>
  );
}
