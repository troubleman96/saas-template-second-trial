"use client";

import { useState } from "react";
import { Key, Plus, Trash2, Copy } from "lucide-react";
import { apiTokens } from "@/lib/mock-data";

export default function SettingsTokensPage() {
  const [showCreateToken, setShowCreateToken] = useState(false);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const handleCopy = (token: string) => {
    navigator.clipboard.writeText(token);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  return (
    <div className="mt-8 flex w-full max-w-none flex-col gap-6 lg:mt-3">
      {/* API Tokens */}
      <section className="application-settings-section">
        <div className="application-settings-section-header">
          <div>
            <h2>API tokens</h2>
            <p>Manage API tokens for programmatic access to your account.</p>
          </div>
          <button
            type="button"
            className="button"
            data-highlighted
            onClick={() => setShowCreateToken(true)}
          >
            <Plus className="size-4" />
            Create token
          </button>
        </div>
        <div className="application-settings-section-body">
          {apiTokens.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <Key className="size-6" />
              </div>
              <p className="empty-state-title">No API tokens</p>
              <p className="empty-state-description">
                Create a token to access the API from external tools and scripts.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {apiTokens.map((token) => (
                <div
                  key={token.id}
                  className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white p-3 dark:border-white/[0.06] dark:bg-[var(--coollabs-base)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-neutral-100 dark:bg-white/[0.07]">
                      <Key className="size-4 text-neutral-500 dark:text-[var(--color-fg-dim)]" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-black dark:text-[var(--color-fg)]">
                        {token.name}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-[var(--color-fg-dim)]">
                        <span className="font-mono">{token.token}</span>
                        <button
                          type="button"
                          className="icon-button !size-3.5"
                          onClick={() => handleCopy(token.token)}
                          aria-label="Copy token"
                        >
                          <Copy className="size-3" />
                        </button>
                        {copiedToken === token.token && (
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400">
                            Copied
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 flex items-center gap-2 text-xs text-neutral-500 dark:text-[var(--color-fg-dim)]">
                        <span>Created {token.createdAt}</span>
                        <span>&middot;</span>
                        <span>Last used {token.lastUsed}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {token.permissions.map((perm) => (
                        <span
                          key={perm}
                          className="inline-flex items-center h-5 rounded-full border border-neutral-200 bg-neutral-100 px-1.5 text-[10px] font-medium text-neutral-600 dark:border-white/[0.12] dark:bg-white/[0.07] dark:text-[var(--color-fg-dim)]"
                        >
                          {perm}
                        </span>
                      ))}
                    </div>
                    <button type="button" className="icon-button text-[var(--color-error)]" aria-label="Delete token">
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Token Permissions */}
      <section className="application-settings-section">
        <div className="application-settings-section-header">
          <div>
            <h2>Permission scopes</h2>
            <p>Available scopes when creating API tokens.</p>
          </div>
        </div>
        <div className="application-settings-section-body">
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { scope: "read", label: "Read", description: "View applications, servers, and deployments." },
              { scope: "write", label: "Write", description: "Modify settings, environments, and variables." },
              { scope: "deploy", label: "Deploy", description: "Trigger deployments and manage releases." },
              { scope: "admin", label: "Admin", description: "Full access including user management and billing." },
            ].map((item) => (
              <div
                key={item.scope}
                className="rounded-lg border border-neutral-200 bg-white p-3 dark:border-white/[0.06] dark:bg-[var(--coollabs-base)]"
              >
                <div className="mb-1 text-sm font-medium text-black dark:text-[var(--color-fg)]">
                  {item.label}
                </div>
                <div className="text-xs text-neutral-500 dark:text-[var(--color-fg-dim)]">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Create token modal */}
      {showCreateToken && (
        <div className="modal-overlay">
          <div className="modal-backdrop" onClick={() => setShowCreateToken(false)} />
          <div className="modal-panel application-settings-form">
            <header className="modal-header">
              <h3>Create API token</h3>
              <button type="button" className="icon-button" onClick={() => setShowCreateToken(false)} aria-label="Close">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </header>
            <div className="modal-body space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--coollabs-subtle)]">
                  Token name
                </label>
                <input type="text" className="input" placeholder="e.g. CI Deploy Token" required />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--coollabs-subtle)]">
                  Permissions
                </label>
                <div className="flex flex-col gap-2">
                  {["read", "write", "deploy", "admin"].map((perm) => (
                    <label key={perm} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="size-4 rounded border-neutral-300 text-[var(--color-accent)] focus:ring-[var(--color-accent)] dark:border-white/20"
                      />
                      <span className="text-sm text-black dark:text-[var(--color-fg)]">{perm}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--coollabs-subtle)]">
                  Expiration
                </label>
                <select className="select">
                  <option>Never</option>
                  <option>30 days</option>
                  <option>90 days</option>
                  <option>1 year</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="button" onClick={() => setShowCreateToken(false)}>Cancel</button>
              <button type="button" className="button" data-highlighted onClick={() => setShowCreateToken(false)}>Create token</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
