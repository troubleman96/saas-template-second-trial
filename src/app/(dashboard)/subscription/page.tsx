"use client";

import { CreditCard, Check, Info } from "lucide-react";

const plans = [
  {
    name: "Explorer",
    price: "$0",
    period: "/month",
    description: "For individuals experimenting with Coolify.",
    features: ["1 server", "2 projects", "Community support"],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "/month",
    description: "For developers deploying production workloads.",
    features: ["Unlimited servers", "Unlimited projects", "Priority support"],
    highlighted: true,
  },
  {
    name: "Team",
    price: "$39",
    period: "/month",
    description: "For teams collaborating on shared infrastructure.",
    features: ["Everything in Pro", "Team management", "Audit logs"],
    highlighted: false,
  },
];

export default function SubscriptionPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-black dark:text-[var(--color-fg)]">Subscription</h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-[var(--color-fg-dim)]">
            Manage your plan and billing details
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 dark:border-white/[0.06] dark:bg-[var(--coollabs-base)]">
          <CreditCard className="size-4 text-[var(--color-fg-faint)]" />
          <span className="text-sm font-medium text-black dark:text-[var(--color-fg)]">
            Current plan: Explorer
          </span>
        </div>
      </div>

      <div className="callout callout-info">
        <Info className="mr-1.5 inline size-3.5" />
        Billing is managed through the Coolify platform. This is a placeholder page for the template.
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-xl border p-5 dark:bg-[var(--coollabs-base)] ${
              plan.highlighted
                ? "border-[var(--color-coollabs-300)] shadow-[0_0_0_1px_var(--color-coollabs-200)]"
                : "border-neutral-200 dark:border-white/[0.06]"
            }`}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-black dark:text-[var(--color-fg)]">
                {plan.name}
              </h2>
              {plan.highlighted && (
                <span className="status-badge status-badge-success">
                  <span className="status-badge-dot" />
                  <span>Popular</span>
                </span>
              )}
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl font-bold text-black dark:text-[var(--color-fg)]">
                {plan.price}
              </span>
              <span className="text-sm text-neutral-500 dark:text-[var(--color-fg-dim)]">
                {plan.period}
              </span>
            </div>
            <p className="mt-1 text-xs text-neutral-500 dark:text-[var(--color-fg-dim)]">
              {plan.description}
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-black dark:text-[var(--color-fg)]">
                  <Check className="size-4 text-[var(--color-success)]" />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className={`mt-5 w-full button ${plan.highlighted ? "" : ""}`}
              data-highlighted={plan.highlighted ? true : undefined}
            >
              {plan.highlighted ? "Upgrade to Pro" : plan.name === "Explorer" ? "Current plan" : "Choose plan"}
            </button>
          </div>
        ))}
      </div>

      <section className="application-settings-section">
        <div className="application-settings-section-header">
          <div>
            <h2>Billing details</h2>
            <p>Your payment method and billing information.</p>
          </div>
          <button type="button" className="button">
            Update payment method
          </button>
        </div>
        <div className="application-settings-section-body grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--coollabs-subtle)]">
              Payment method
            </label>
            <input type="text" defaultValue="Visa ending in 4242" readOnly className="input" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--coollabs-subtle)]">
              Billing email
            </label>
            <input type="email" defaultValue="billing@example.com" readOnly className="input" />
          </div>
        </div>
      </section>
    </div>
  );
}