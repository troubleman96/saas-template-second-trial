"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirm: z.string(),
}).refine((data) => data.password === data.confirm, {
  message: "Passwords do not match",
  path: ["confirm"],
});

type RegisterForm = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(schema),
  });

  async function onSubmit() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    toast.success("Account created!");
    router.push("/dashboard");
  }

  return (
    <div>
      <h1 className="mb-1">Create account</h1>
      <p className="mt-1 mb-4 text-sm text-[var(--coollabs-subtle)]">
        Start managing your infrastructure.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 auth-card-body">
        <div>
          <label className="mb-1 block text-xs font-medium">Name</label>
          <input type="text" {...register("name")} className="input" placeholder="Alex Morgan" />
          {errors.name && (
            <p className="mt-1 text-xs text-[var(--color-error)]">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium">Email</label>
          <input type="email" {...register("email")} className="input" placeholder="you@example.com" />
          {errors.email && (
            <p className="mt-1 text-xs text-[var(--color-error)]">{errors.email.message}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-xs font-medium">Password</label>
            <input type="password" {...register("password")} className="input" placeholder="••••••••" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium">Confirm</label>
            <input type="password" {...register("confirm")} className="input" placeholder="••••••••" />
          </div>
        </div>
        {(errors.password || errors.confirm) && (
          <p className="text-xs text-[var(--color-error)]">
            {errors.password?.message || errors.confirm?.message}
          </p>
        )}
        <button type="submit" disabled={loading} className="button button-primary w-full">
          {loading ? "Creating..." : "Create account"}
        </button>
      </form>

      <div className="auth-card-footer">
        <span>Already have an account?</span>
        <Link href="/auth/login" className="font-medium text-[var(--color-accent)] hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}
