"use client";

import Link from "next/link";
import {
  AppWindow,
  Server,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { dashboardStats, applications } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Welcome header */}
      <div>
        <h1 className="text-2xl font-bold text-black dark:text-[var(--color-fg)]">
          Hello, Emmanuel!
        </h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-[var(--color-fg-dim)]">
          Here&apos;s what&apos;s happening with your infrastructure today.
        </p>
      </div>

      {/* Quick action stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          href="/applications"
          className="theme-card p-4 flex items-center gap-4"
          type="button"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-white dark:border-white/[0.08] dark:bg-white/[0.04]">
            <AppWindow className="size-5 text-[var(--color-fg-faint)]" />
          </div>
          <div>
            <div className="text-2xl font-bold text-black dark:text-[var(--color-fg)]">
              {dashboardStats.totalApplications}
            </div>
            <div className="text-xs text-neutral-500 dark:text-[var(--color-fg-dim)]">
              Applications
            </div>
          </div>
        </Link>

        <Link
          href="/servers"
          className="theme-card p-4 flex items-center gap-4"
          type="button"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-white dark:border-white/[0.08] dark:bg-white/[0.04]">
            <Server className="size-5 text-[var(--color-fg-faint)]" />
          </div>
          <div>
            <div className="text-2xl font-bold text-black dark:text-[var(--color-fg)]">
              {dashboardStats.totalServers}
            </div>
            <div className="text-xs text-neutral-500 dark:text-[var(--color-fg-dim)]">
              Servers
            </div>
          </div>
        </Link>

        <Link
          href="/applications"
          className="theme-card p-4 flex items-center gap-4"
          type="button"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-white dark:border-white/[0.08] dark:bg-white/[0.04]">
            <CheckCircle className="size-5 text-[var(--color-success)]" />
          </div>
          <div>
            <div className="text-2xl font-bold text-black dark:text-[var(--color-fg)]">
              {dashboardStats.running}
            </div>
            <div className="text-xs text-neutral-500 dark:text-[var(--color-fg-dim)]">
              Running
            </div>
          </div>
        </Link>

        <Link
          href="/applications"
          className="theme-card p-4 flex items-center gap-4"
          type="button"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-white dark:border-white/[0.08] dark:bg-white/[0.04]">
            <XCircle className="size-5 text-[var(--color-error)]" />
          </div>
          <div>
            <div className="text-2xl font-bold text-black dark:text-[var(--color-fg)]">
              {dashboardStats.stopped}
            </div>
            <div className="text-xs text-neutral-500 dark:text-[var(--color-fg-dim)]">
              Stopped / Failed
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Applications */}
      <section className="application-settings-section">
        <div className="application-settings-section-header">
          <div>
            <h2>Recent applications</h2>
            <p>Your recently deployed applications.</p>
          </div>
          <Link href="/applications" className="button" type="button">
            View all
          </Link>
        </div>
        <div className="application-settings-section-body">
          <div className="flex flex-col gap-2">
            {applications.slice(0, 5).map((app) => (
              <div
                key={app.id}
                className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white p-3 dark:border-white/[0.06] dark:bg-[var(--coollabs-base)]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 dark:border-white/[0.08] dark:bg-white/[0.04]">
                    <AppWindow className="size-4 text-[var(--color-fg-faint)]" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-black dark:text-[var(--color-fg)]">
                      {app.name}
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-[var(--color-fg-dim)]">
                      {app.description} &middot; {app.server}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-neutral-400 dark:text-[var(--color-fg-dim)]">
                    {app.lastDeployed}
                  </span>
                  <span
                    className={`status-badge ${
                      app.status === "running"
                        ? "status-badge-success"
                        : app.status === "failed"
                          ? "status-badge-error"
                          : "status-badge-neutral"
                    }`}
                    data-highlighted={app.status === "running" ? "" : undefined}
                  >
                    <span className="status-badge-dot" />
                    <span>{app.status}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Usage */}
      <section className="application-settings-section">
        <div className="application-settings-section-header">
          <div>
            <h2>Resource usage</h2>
            <p>Overview of CPU and memory usage across all servers.</p>
          </div>
        </div>
        <div className="application-settings-section-body">
          <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-neutral-300 dark:border-white/[0.1]">
            <span className="text-sm text-neutral-500 dark:text-[var(--color-fg-dim)]">
              Chart placeholder — integrate your preferred charting library
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
