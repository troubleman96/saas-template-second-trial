"use client";

import { useState } from "react";
import { Globe, Plus, Trash2, ExternalLink, Copy } from "lucide-react";

export default function SettingsDomainsPage() {
  const [showAddDomain, setShowAddDomain] = useState(false);

  const domains = [
    {
      id: "1",
      name: "example.com",
      ssl: true,
      sslExpiry: "Jan 15, 2026",
      applications: ["web-app", "landing-page"],
      primary: true,
    },
    {
      id: "2",
      name: "api.example.com",
      ssl: true,
      sslExpiry: "Jan 15, 2026",
      applications: ["api-service"],
      primary: false,
    },
    {
      id: "3",
      name: "admin.example.com",
      ssl: false,
      sslExpiry: null,
      applications: ["admin-dashboard"],
      primary: false,
    },
  ];

  return (
    <div className="mt-8 flex w-full max-w-none flex-col gap-6 lg:mt-3">
      {/* Custom Domains */}
      <section className="application-settings-section">
        <div className="application-settings-section-header">
          <div>
            <h2>Custom domains</h2>
            <p>Manage domains pointed to this instance for your applications.</p>
          </div>
          <button
            type="button"
            className="button"
            data-highlighted
            onClick={() => setShowAddDomain(true)}
          >
            <Plus className="size-4" />
            Add domain
          </button>
        </div>
        <div className="application-settings-section-body">
          <div className="flex flex-col gap-2">
            {domains.map((domain) => (
              <div
                key={domain.id}
                className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white p-3 dark:border-white/[0.06] dark:bg-[var(--coollabs-base)]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-full bg-neutral-100 dark:bg-white/[0.07]">
                    <Globe className="size-4 text-neutral-500 dark:text-[var(--color-fg-dim)]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-black dark:text-[var(--color-fg)]">
                      {domain.name}
                      {domain.primary && (
                        <span className="inline-flex items-center h-5 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-1.5 text-[10px] font-medium text-[var(--color-accent)]">
                          Primary
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-[var(--color-fg-dim)]">
                      <span className="inline-flex items-center gap-1">
                        <span className={`size-1.5 rounded-full ${domain.ssl ? "bg-emerald-500" : "bg-amber-500"}`} />
                        {domain.ssl ? `SSL valid until ${domain.sslExpiry}` : "SSL not configured"}
                      </span>
                      <span>&middot;</span>
                      <span>{domain.applications.join(", ")}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button type="button" className="icon-button" aria-label="Open in new tab">
                    <ExternalLink className="size-4" />
                  </button>
                  <button type="button" className="icon-button" aria-label="Copy domain">
                    <Copy className="size-4" />
                  </button>
                  {!domain.primary && (
                    <button type="button" className="icon-button text-[var(--color-error)]" aria-label="Delete domain">
                      <Trash2 className="size-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DNS Records */}
      <section className="application-settings-section">
        <div className="application-settings-section-header">
          <div>
            <h2>DNS records</h2>
            <p>Add these records to your DNS provider to point your domain here.</p>
          </div>
        </div>
        <div className="application-settings-section-body">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-white/[0.06]">
                  <th className="pb-2 pr-4 text-left font-medium text-[var(--coollabs-subtle)]">Type</th>
                  <th className="pb-2 pr-4 text-left font-medium text-[var(--coollabs-subtle)]">Name</th>
                  <th className="pb-2 pr-4 text-left font-medium text-[var(--coollabs-subtle)]">Value</th>
                  <th className="pb-2 text-left font-medium text-[var(--coollabs-subtle)]">TTL</th>
                </tr>
              </thead>
              <tbody className="text-black dark:text-[var(--color-fg)]">
                <tr className="border-b border-neutral-100 dark:border-white/[0.04]">
                  <td className="py-2 pr-4 font-mono text-xs">A</td>
                  <td className="py-2 pr-4 font-mono text-xs">@</td>
                  <td className="py-2 pr-4 font-mono text-xs">192.168.1.10</td>
                  <td className="py-2 font-mono text-xs">3600</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-white/[0.04]">
                  <td className="py-2 pr-4 font-mono text-xs">CNAME</td>
                  <td className="py-2 pr-4 font-mono text-xs">www</td>
                  <td className="py-2 pr-4 font-mono text-xs">example.com</td>
                  <td className="py-2 font-mono text-xs">3600</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-mono text-xs">TXT</td>
                  <td className="py-2 pr-4 font-mono text-xs">_acme-challenge</td>
                  <td className="py-2 pr-4 font-mono text-xs">verification-string-here</td>
                  <td className="py-2 font-mono text-xs">600</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Add domain modal */}
      {showAddDomain && (
        <div className="modal-overlay">
          <div className="modal-backdrop" onClick={() => setShowAddDomain(false)} />
          <div className="modal-panel application-settings-form">
            <header className="modal-header">
              <h3>Add custom domain</h3>
              <button type="button" className="icon-button" onClick={() => setShowAddDomain(false)} aria-label="Close">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </header>
            <div className="modal-body space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--coollabs-subtle)]">
                  Domain name
                </label>
                <input type="text" className="input" placeholder="example.com" required />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--coollabs-subtle)]">
                  Application
                </label>
                <select className="select">
                  <option>Select an application</option>
                  <option>web-app</option>
                  <option>api-service</option>
                  <option>admin-dashboard</option>
                  <option>landing-page</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="button" onClick={() => setShowAddDomain(false)}>Cancel</button>
              <button type="button" className="button" data-highlighted onClick={() => setShowAddDomain(false)}>Add domain</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
