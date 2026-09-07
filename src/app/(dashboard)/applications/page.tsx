"use client";

import Link from "next/link";
import {
  AppWindow,
  ExternalLink,
  Plus,
  Trash2,
} from "lucide-react";
import { applications } from "@/lib/mock-data";
import { useState } from "react";

export default function ApplicationsPage() {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-black dark:text-[var(--color-fg)]">Applications</h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-[var(--color-fg-dim)]">
            Manage your deployed applications
          </p>
        </div>
        <Link href="/applications/new" className="button" data-highlighted>
          <Plus className="size-4" />
          New application
        </Link>
      </div>

      {applications.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <AppWindow className="size-5" />
          </div>
          <h2 className="empty-state-title">No applications yet</h2>
          <p className="empty-state-description">
            Deploy your first application to get started.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {applications.map((app) => (
            <div
              key={app.name}
              className="group flex items-center justify-between rounded-lg border border-neutral-200 bg-white p-3 transition-colors hover:border-neutral-300 hover:bg-neutral-50 dark:border-white/[0.06] dark:bg-[var(--coollabs-base)] dark:hover:border-white/[0.12] dark:hover:bg-[var(--color-raised)]"
            >
              <Link
                href={`/applications/${app.id}`}
                className="flex items-center gap-3 min-w-0 flex-1"
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 dark:border-white/[0.08] dark:bg-white/[0.04]">
                  <AppWindow className="size-4 text-[var(--color-fg-faint)]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-black dark:text-[var(--color-fg)] truncate">
                    {app.name}
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-[var(--color-fg-dim)]">
                    {app.description || "No description"}
                  </div>
                </div>
              </Link>

              <div className="flex items-center gap-3 shrink-0 ml-4">
                <span className={`status-badge ${
                  app.status === "running"
                    ? "status-badge-success"
                    : app.status === "stopped"
                    ? "status-badge-neutral"
                    : "status-badge-error"
                }`}>
                  <span className="status-badge-dot" />
                  <span>{app.status}</span>
                </span>
                {app.git_repository && (
                  <a
                    href={app.git_repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-button"
                  >
                    <ExternalLink className="size-4" />
                  </a>
                )}
                <button
                  type="button"
                  className="icon-button text-[var(--color-error)]"
                  onClick={() => setDeleteId(app.id)}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirmation */}
      {deleteId && (
        <div className="modal-overlay">
          <div className="modal-backdrop" onClick={() => setDeleteId(null)} />
          <div className="modal-panel">
            <header className="modal-header">
              <h3>Delete application</h3>
              <button
                type="button"
                className="icon-button shrink-0"
                onClick={() => setDeleteId(null)}
                aria-label="Close"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </header>
            <div className="modal-body">
              <p className="text-sm text-[var(--color-fg-dim)]">
                Are you sure you want to delete this application? This action cannot be undone.
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="button" onClick={() => setDeleteId(null)}>
                Cancel
              </button>
              <button
                type="button"
                className="button text-[var(--color-error)]"
                onClick={() => setDeleteId(null)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
