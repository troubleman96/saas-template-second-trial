"use client";

import { useState } from "react";
import { Shield, Key, Smartphone, Trash2, Plus } from "lucide-react";

export default function SettingsSecurityPage() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const sessions = [
    {
      id: "1",
      device: "Chrome on macOS",
      ip: "192.168.1.42",
      location: "San Francisco, US",
      lastActive: "Active now",
      current: true,
    },
    {
      id: "2",
      device: "Safari on iPhone",
      ip: "192.168.1.15",
      location: "San Francisco, US",
      lastActive: "2 hours ago",
      current: false,
    },
    {
      id: "3",
      device: "Firefox on Ubuntu",
      ip: "10.0.0.8",
      location: "London, UK",
      lastActive: "3 days ago",
      current: false,
    },
  ];

  const sshKeys = [
    { id: "1", name: "Deploy Key", fingerprint: "SHA256:AbC123def456", createdAt: "2 months ago" },
    { id: "2", name: "CI Runner", fingerprint: "SHA256:GhI789jkl012", createdAt: "1 month ago" },
  ];

  return (
    <div className="mt-8 flex w-full max-w-none flex-col gap-6 lg:mt-3">
      {/* Password */}
      <section className="application-settings-section">
        <div className="application-settings-section-header">
          <div>
            <h2>Password</h2>
            <p>Change your account password. Choose a strong, unique password.</p>
          </div>
        </div>
        <div className="application-settings-section-body grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--coollabs-subtle)]">
              Current password
            </label>
            <input type="password" className="input" placeholder="Enter current password" />
          </div>
          <div />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--coollabs-subtle)]">
              New password
            </label>
            <input type="password" className="input" placeholder="Enter new password" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--coollabs-subtle)]">
              Confirm new password
            </label>
            <input type="password" className="input" placeholder="Confirm new password" />
          </div>
        </div>
        <div className="application-settings-section-footer">
          <button type="button" className="button" data-highlighted>
            Update password
          </button>
        </div>
      </section>

      {/* Two-Factor Authentication */}
      <section className="application-settings-section">
        <div className="application-settings-section-header">
          <div>
            <h2>Two-factor authentication</h2>
            <p>Add an extra layer of security to your account with 2FA.</p>
          </div>
          <button
            type="button"
            className={twoFactorEnabled ? "button" : "button"}
            data-highlighted={!twoFactorEnabled}
            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
          >
            <Smartphone className="size-4" />
            {twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
          </button>
        </div>
        <div className="application-settings-section-body">
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center gap-1.5 h-6 rounded-full border px-2 text-xs font-medium ${
              twoFactorEnabled
                ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400"
                : "border-neutral-200 bg-neutral-100 text-neutral-600 dark:border-white/[0.12] dark:bg-white/[0.07] dark:text-[var(--color-fg-dim)]"
            }`}>
              <span className={`size-1.5 rounded-full ${twoFactorEnabled ? "bg-emerald-500" : "bg-neutral-400"}`} />
              {twoFactorEnabled ? "Enabled" : "Disabled"}
            </span>
            <span className="text-sm text-[var(--color-fg-dim)]">
              {twoFactorEnabled
                ? "Your account is protected with two-factor authentication."
                : "Your account is not protected with two-factor authentication."}
            </span>
          </div>
        </div>
      </section>

      {/* SSH Keys */}
      <section className="application-settings-section">
        <div className="application-settings-section-header">
          <div>
            <h2>SSH keys</h2>
            <p>Manage SSH keys used for git operations and server access.</p>
          </div>
          <button type="button" className="button" data-highlighted>
            <Plus className="size-4" />
            Add key
          </button>
        </div>
        <div className="application-settings-section-body">
          <div className="flex flex-col gap-2">
            {sshKeys.map((key) => (
              <div
                key={key.id}
                className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white p-3 dark:border-white/[0.06] dark:bg-[var(--coollabs-base)]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-full bg-neutral-100 dark:bg-white/[0.07]">
                    <Key className="size-4 text-neutral-500 dark:text-[var(--color-fg-dim)]" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-black dark:text-[var(--color-fg)]">
                      {key.name}
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-[var(--color-fg-dim)]">
                      {key.fingerprint} &middot; Added {key.createdAt}
                    </div>
                  </div>
                </div>
                <button type="button" className="icon-button text-[var(--color-error)]">
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Sessions */}
      <section className="application-settings-section">
        <div className="application-settings-section-header">
          <div>
            <h2>Active sessions</h2>
            <p>Sessions where you are currently logged in.</p>
          </div>
        </div>
        <div className="application-settings-section-body">
          <div className="flex flex-col gap-2">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white p-3 dark:border-white/[0.06] dark:bg-[var(--coollabs-base)]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-full bg-neutral-100 dark:bg-white/[0.07]">
                    <Shield className="size-4 text-neutral-500 dark:text-[var(--color-fg-dim)]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-black dark:text-[var(--color-fg)]">
                      {session.device}
                      {session.current && (
                        <span className="inline-flex items-center gap-1 h-5 rounded-full border border-emerald-200 bg-emerald-50 px-1.5 text-[10px] font-medium text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400">
                          Current
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-[var(--color-fg-dim)]">
                      {session.ip} &middot; {session.location} &middot; {session.lastActive}
                    </div>
                  </div>
                </div>
                {!session.current && (
                  <button type="button" className="icon-button text-[var(--color-error)]">
                    <Trash2 className="size-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
