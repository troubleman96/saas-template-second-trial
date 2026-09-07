"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
});

type ForgotForm = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotForm>({
    resolver: zodResolver(schema),
  });

  function onSubmit() {
    setSent(true);
    toast.success("Reset instructions sent");
  }

  if (sent) {
    return (
      <div>
        <h1 className="mb-1">Check your email</h1>
        <p className="mt-1 mb-4 text-sm text-[var(--coollabs-subtle)]">
          We&apos;ve sent password reset instructions to your email.
        </p>
        <div className="auth-card-body space-y-4">
          <p className="text-sm text-[var(--coollabs-subtle)]">
            Haven&apos;t received an email? Check your spam folder or try again.
          </p>
          <Link href="/auth/login" className="button button-primary w-full justify-center">
            Back to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-1">Reset password</h1>
      <p className="mt-1 mb-4 text-sm text-[var(--coollabs-subtle)]">
        Enter your email and we&apos;ll send you reset instructions.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 auth-card-body">
        <div>
          <label className="mb-1 block text-xs font-medium">Email</label>
          <input type="email" {...register("email")} className="input" placeholder="you@example.com" />
          {errors.email && (
            <p className="mt-1 text-xs text-[var(--color-error)]">{errors.email.message}</p>
          )}
        </div>
        <button type="submit" className="button button-primary w-full">
          Send reset instructions
        </button>
      </form>

      <div className="auth-card-footer">
        <span>Remembered your password?</span>
        <Link href="/auth/login" className="font-medium text-[var(--color-accent)] hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}
