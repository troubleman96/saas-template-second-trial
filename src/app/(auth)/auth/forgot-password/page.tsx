"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";

type ForgotForm = {
  email: string;
};

export default function ForgotPasswordPage() {
  const { register, handleSubmit } = useForm<ForgotForm>();
  const onSubmit = handleSubmit(() => {});

  return (
    <>
      <div className="auth-card-heading">
        <h1>Reset your password</h1>
        <p>Enter your email address and we&apos;ll send you a reset link.</p>
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
      <button type="submit" className="button w-full justify-center" data-highlighted>
        Send reset link
      </button>
    </form>

    <p className="mt-6 text-center text-sm text-[var(--color-fg-dim)]">
        Remember your password?{" "}
        <Link href="/auth/login" className="auth-text-link">
          Log in
        </Link>
      </p>
    </>
  );
}
