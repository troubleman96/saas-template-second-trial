"use client";

import { useState } from "react";
import {
  KeyRound,
  ShieldAlert,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Copy,
} from "lucide-react";
import { sshKeys, apiTokens } from "@/lib/mock-data";

export default function SecurityPage() {
  const [showTokens, setShowTokens] = useState<Record<string, boolean>>({});
  const [deleteId, setDeleteId] = useState<{ type: "key" | "token"; id: string } | null>(null);

  const toggleToken = (id: string) =>
    setShowTokens((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-black dark:text-[var(--color-fg)]">Keys & Tokens</h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-[var(--color-fg-dim)]">
            Manage SSH keys and API tokens for authentication
          </p>
        </div>
      </div>

      {/* SSH Keys */}
      <section className="application-settings-section">
        <div className="application-settings-section-header">
          <div>
            <h2>SSH keys</h2>
            <p>Public keys used to authenticate with your servers.</p>
          </div>
          <button type="button" className="button" data-highlighted>
            <Plus className="size-4" />
            Add SSH key
          </button>
        </div>
        <div className="application-settings-section-body">
          <div className="flex flex-col gap-2">
            {sshKeys.map((key) => (
              <div
                key={key.id}
                className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white p-3 dark:border-white/[0.06] dark:bg-white/[0.02]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 dark:border-white/[0.08] dark:bg-white/[0.04]">
                    <KeyRound className="size-4 text-[var(--color-fg-faint)]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-black dark:text-[var(--color-fg)]">
                      {key.name}
                    </div>
                    <div className="font-mono text-xs text-neutral-500 dark:text-[var(--color-fg-dim)]">
                      {key.fingerprint} • added {key.createdAt}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <button
                    type="button"
                    className="icon-button text-[var(--color-error)]"
                    onClick={() => setDeleteId({ type: "key", id: key.id })}
                    aria-label="Delete SSH key"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Tokens */}
      <section className="application-settings-section">
        <div className="application-settings-section-header">
          <div>
            <h2>API tokens</h2>
            <p>Tokens used to authenticate against the platform API.</p>
          </div>
          <button type="button" className="button" data-highlighted>
            <Plus className="size-4" />
            Create token
          </button>
        </div>
        <div className="application-settings-section-body">
          <div className="flex flex-col gap-2">
            {apiTokens.map((token) => (
              <div
                key={token.id}
                className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white p-3 dark:border-white/[0.06] dark:bg-white/[0.02]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 dark:border-white/[0.08] dark:bg-white/[0.04]">
                    <ShieldAlert className="size-4 text-[var(--color-fg-faint)]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-black dark:text-[var(--color-fg)]">
                        {token.name}
                      </span>
                      {token.permissions.map((permission) => (
                        <span
                          key={permission}
                          className="inline-flex h-5 items-center rounded-full border border-neutral-200 bg-neutral-100 px-2 text-[10px] font-medium uppercase tracking-wide dark:border-white/[0.12] dark:bg-white/[0.07]"
                        >
                          {permission}
                        </span>
                      ))}
                    </div>
                    <div className="mt-0.5 flex items-center gap-2">
                      <span className="font-mono text-xs text-neutral-500 dark:text-[var(--color-fg-dim)]">
                        {showTokens[token.id] ? token.token : token.token.replace(/[^•]/g, "•")}
                      </span>
                      <button
                        type="button"
                        className="icon-button size-6"
                        onClick={() => toggleToken(token.id)}
                        aria-label={showTokens[token.id] ? "Hide token" : "Show token"}
                      >
                        {showTokens[token.id] ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                      </button>
                      <button type="button" className="icon-button size-6" aria-label="Copy token">
                        <Copy className="size-3.5" />
                      </button>
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-[var(--color-fg-dim)]">
                      Created {token.createdAt} • Last used {token.lastUsed}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <button
                    type="button"
                    className="icon-button text-[var(--color-error)]"
                    onClick={() => setDeleteId({ type: "token", id: token.id })}
                    aria-label="Revoke token"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {deleteId && (
        <div className="modal-overlay">
          <div className="modal-backdrop" onClick={() => setDeleteId(null)} />
          <div className="modal-panel">
            <header className="modal-header">
              <h3>{deleteId.type === "key" ? "Delete SSH key" : "Revoke API token"}</h3>
              <button type="button" className="icon-button" onClick={() => setDeleteId(null)} aria-label="Close">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </header>
            <div className="modal-body">
              <p className="text-sm text-[var(--color-fg-dim)]">
                {deleteId.type === "key"
                  ? "Are you sure you want to delete this SSH key? Servers authenticating with it will need a new key."
                  : "Are you sure you want to revoke this API token? Any clients using it will lose access."}
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="button" onClick={() => setDeleteId(null)}>Cancel</button>
              <button type="button" className="button text-[var(--color-error)]" onClick={() => setDeleteId(null)}>
                {deleteId.type === "key" ? "Delete" : "Revoke"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
