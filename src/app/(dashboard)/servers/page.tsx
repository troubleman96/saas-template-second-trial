"use client";

import {
  Server,
  Plus,
  Cpu,
  MemoryStick,
  HardDrive,
  ExternalLink,
} from "lucide-react";
import { servers } from "@/lib/mock-data";

function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-white/[0.08]">
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  );
}

function usageColor(value: number) {
  if (value >= 85) return "var(--color-error)";
  if (value >= 70) return "var(--color-warning)";
  return "var(--color-success)";
}

export default function ServersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-black dark:text-[var(--color-fg)]">Servers</h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-[var(--color-fg-dim)]">
            Manage your servers and monitor their resources
          </p>
        </div>
        <button type="button" className="button" data-highlighted>
          <Plus className="size-4" />
          Add server
        </button>
      </div>

      {servers.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <Server className="size-5" />
          </div>
          <h2 className="empty-state-title">No servers yet</h2>
          <p className="empty-state-description">
            Add your first server to start deploying applications to it.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {servers.map((server) => (
            <div
              key={server.id}
              className="rounded-lg border border-neutral-200 bg-white p-3 dark:border-white/[0.06] dark:bg-[var(--coollabs-base)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 dark:border-white/[0.08] dark:bg-white/[0.04]">
                    <Server className="size-4 text-[var(--color-fg-faint)]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-black dark:text-[var(--color-fg)]">
                      {server.name}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-[var(--color-fg-dim)]">
                      <span>{server.ip}</span>
                      <span>•</span>
                      <span>{server.os}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <span className={`status-badge ${
                    server.status === "running"
                      ? "status-badge-success"
                      : server.status === "degraded"
                      ? "status-badge-warning"
                      : "status-badge-neutral"
                  }`}>
                    <span className="status-badge-dot" />
                    <span>{server.status}</span>
                  </span>
                  <button type="button" className="icon-button" aria-label="View server">
                    <ExternalLink className="size-4" />
                  </button>
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-3">
                  <Cpu className="size-4 shrink-0 text-[var(--color-fg-faint)]" />
                  <div className="flex-1">
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-neutral-500 dark:text-[var(--color-fg-dim)]">CPU</span>
                      <span className="font-medium text-black dark:text-[var(--color-fg)]">{server.cpu}%</span>
                    </div>
                    <ProgressBar value={server.cpu} color={usageColor(server.cpu)} />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MemoryStick className="size-4 shrink-0 text-[var(--color-fg-faint)]" />
                  <div className="flex-1">
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-neutral-500 dark:text-[var(--color-fg-dim)]">Memory</span>
                      <span className="font-medium text-black dark:text-[var(--color-fg)]">{server.memory}%</span>
                    </div>
                    <ProgressBar value={server.memory} color={usageColor(server.memory)} />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <HardDrive className="size-4 shrink-0 text-[var(--color-fg-faint)]" />
                  <div className="flex-1">
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-neutral-500 dark:text-[var(--color-fg-dim)]">Disk</span>
                      <span className="font-medium text-black dark:text-[var(--color-fg)]">{server.disk}%</span>
                    </div>
                    <ProgressBar value={server.disk} color={usageColor(server.disk)} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
