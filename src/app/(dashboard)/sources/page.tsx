"use client";

import {
  GitFork,
  GitBranch,
  Code,
  Plus,
  Trash2,
} from "lucide-react";
import { sources } from "@/lib/mock-data";
import { useState } from "react";

function SourceIcon({ type }: { type: string }) {
  switch (type) {
    case "github":
      return <GitFork className="size-4 text-[var(--color-fg-faint)]" />;
    case "gitlab":
      return <GitBranch className="size-4 text-[var(--color-fg-faint)]" />;
    default:
      return <Code className="size-4 text-[var(--color-fg-faint)]" />;
  }
}

export default function SourcesPage() {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-black dark:text-[var(--color-fg)]">Sources</h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-[var(--color-fg-dim)]">
            Connect your Git repositories to deploy applications
          </p>
        </div>
        <button type="button" className="button" data-highlighted>
          <Plus className="size-4" />
          Add source
        </button>
      </div>

      {sources.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <GitFork className="size-5" />
          </div>
          <h2 className="empty-state-title">No sources connected</h2>
          <p className="empty-state-description">
            Connect a Git provider like GitHub or GitLab to pull your repositories.
          </p>
        </div>
      ) : (
        <div className="application-settings-section">
          <div className="application-settings-section-body">
            <div className="flex flex-col gap-2">
              {sources.map((source) => (
                <div
                  key={source.id}
                  className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white p-3 dark:border-white/[0.06] dark:bg-white/[0.02]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 dark:border-white/[0.08] dark:bg-white/[0.04]">
                      <SourceIcon type={source.type} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-black dark:text-[var(--color-fg)]">
                        {source.name}
                      </div>
                      <div className="text-xs text-neutral-500 dark:text-[var(--color-fg-dim)]">
                        {source.organization} • {source.repositories} repositories • synced {source.lastSync}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-4">
                    <span className={`status-badge ${
                      source.status === "connected"
                        ? "status-badge-success"
                        : source.status === "error"
                        ? "status-badge-error"
                        : "status-badge-neutral"
                    }`}>
                      <span className="status-badge-dot" />
                      <span>{source.status}</span>
                    </span>
                    <button
                      type="button"
                      className="icon-button text-[var(--color-error)]"
                      onClick={() => setDeleteId(source.id)}
                      aria-label="Remove source"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="modal-overlay">
          <div className="modal-backdrop" onClick={() => setDeleteId(null)} />
          <div className="modal-panel">
            <header className="modal-header">
              <h3>Remove source</h3>
              <button type="button" className="icon-button" onClick={() => setDeleteId(null)} aria-label="Close">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </header>
            <div className="modal-body">
              <p className="text-sm text-[var(--color-fg-dim)]">
                Are you sure you want to remove this source? Applications connected to it will no longer receive deployments.
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="button" onClick={() => setDeleteId(null)}>Cancel</button>
              <button type="button" className="button text-[var(--color-error)]" onClick={() => setDeleteId(null)}>Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
