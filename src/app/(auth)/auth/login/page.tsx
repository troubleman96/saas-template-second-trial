"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginForm = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  });

  async function onSubmit() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    toast.success("Welcome back!");
    router.push("/dashboard");
  }

  return (
    <div>
      <h1 className="mb-1">Sign in to Dashboard</h1>
      <p className="mt-1 mb-4 text-sm text-[var(--coollabs-subtle)]">
        Enter your credentials to access your workspace.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 auth-card-body">
        <div>
          <label className="mb-1 block text-xs font-medium">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="input"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-[var(--color-error)]">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="mb-1 flex items-center justify-between text-xs font-medium">
            Password
            <Link href="/auth/forgot-password" className="text-[var(--color-accent)] hover:underline">
              Forgot?
            </Link>
          </label>
          <input
            type="password"
            {...register("password")}
            className="input"
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="mt-1 text-xs text-[var(--color-error)]">{errors.password.message}</p>
          )}
        </div>
        <button type="submit" disabled={loading} className="button button-primary w-full">
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <div className="auth-card-footer">
        <span>Don&apos;t have an account?</span>
        <Link href="/auth/register" className="font-medium text-[var(--color-accent)] hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}
