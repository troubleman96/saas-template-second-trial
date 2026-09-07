"use client";

import {
  Archive,
  Plus,
  Trash2,
  Database,
} from "lucide-react";
import { storageProviders } from "@/lib/mock-data";
import { useState } from "react";

export default function StoragesPage() {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-black dark:text-[var(--color-fg)]">S3 Storage</h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-[var(--color-fg-dim)]">
            Connect S3-compatible storage providers for your applications
          </p>
        </div>
        <button type="button" className="button" data-highlighted>
          <Plus className="size-4" />
          Add storage
        </button>
      </div>

      {storageProviders.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <Archive className="size-5" />
          </div>
          <h2 className="empty-state-title">No storage providers connected</h2>
          <p className="empty-state-description">
            Connect an S3-compatible provider like AWS S3, MinIO, or Cloudflare R2.
          </p>
        </div>
      ) : (
        <div className="application-settings-section">
          <div className="application-settings-section-body">
            <div className="flex flex-col gap-2">
              {storageProviders.map((storage) => (
                <div
                  key={storage.id}
                  className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white p-3 dark:border-white/[0.06] dark:bg-white/[0.02]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 dark:border-white/[0.08] dark:bg-white/[0.04]">
                      <Database className="size-4 text-[var(--color-fg-faint)]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-black dark:text-[var(--color-fg)]">
                        {storage.name}
                        <span className="ml-2 text-xs font-normal uppercase tracking-wide text-neutral-400 dark:text-[var(--color-fg-faint)]">
                          {storage.type}
                        </span>
                      </div>
                      <div className="text-xs text-neutral-500 dark:text-[var(--color-fg-dim)]">
                        {storage.bucket} • {storage.region} • {storage.endpoint}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-4">
                    <span className={`status-badge ${
                      storage.status === "connected"
                        ? "status-badge-success"
                        : storage.status === "error"
                        ? "status-badge-error"
                        : "status-badge-neutral"
                    }`}>
                      <span className="status-badge-dot" />
                      <span>{storage.status}</span>
                    </span>
                    <button
                      type="button"
                      className="icon-button text-[var(--color-error)]"
                      onClick={() => setDeleteId(storage.id)}
                      aria-label="Remove storage"
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
              <h3>Remove storage</h3>
              <button type="button" className="icon-button" onClick={() => setDeleteId(null)} aria-label="Close">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </header>
            <div className="modal-body">
              <p className="text-sm text-[var(--color-fg-dim)]">
                Are you sure you want to remove this storage provider? Applications using it will lose access.
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
