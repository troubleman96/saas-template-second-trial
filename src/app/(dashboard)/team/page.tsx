"use client";

import { useState } from "react";
import { UserPlus, Shield, Trash2 } from "lucide-react";
import { teams, currentUser } from "@/lib/mock-data";

export default function TeamPage() {
  const team = teams[0];
  const [showInvite, setShowInvite] = useState(false);
  const [showRemoveMember, setShowRemoveMember] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-black dark:text-[var(--color-fg)]">Team</h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-[var(--color-fg-dim)]">
            Manage who has access to this workspace
          </p>
        </div>
        <button type="button" className="button" data-highlighted onClick={() => setShowInvite(true)}>
          <UserPlus className="size-4" />
          Invite member
        </button>
      </div>

      <section className="application-settings-section">
        <div className="application-settings-section-header">
          <div>
            <h2>{team.name || "Team members"}</h2>
            <p>People who have access to this workspace.</p>
          </div>
        </div>
        <div className="application-settings-section-body">
          <div className="flex flex-col gap-2">
            {team.members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white p-3 dark:border-white/[0.06] dark:bg-white/[0.02]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-semibold text-neutral-700 dark:bg-white/[0.1] dark:text-[var(--color-fg)]">
                    {member.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-black dark:text-[var(--color-fg)]">
                      {member.name}
                      {member.id === currentUser.id && (
                        <span className="ml-2 text-xs font-normal text-neutral-400 dark:text-[var(--color-fg-faint)]">
                          (you)
                        </span>
                      )}
                    </div>
                    <div className="truncate text-xs text-neutral-500 dark:text-[var(--color-fg-dim)]">
                      {member.email}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <span className="inline-flex items-center gap-1.5 h-6 rounded-full border border-neutral-200 bg-neutral-100 px-2 text-xs font-medium capitalize dark:border-white/[0.12] dark:bg-white/[0.07]">
                    <Shield className="size-3" />
                    {member.role}
                  </span>
                  {member.id !== currentUser.id && (
                    <button
                      type="button"
                      className="icon-button text-[var(--color-error)]"
                      onClick={() => setShowRemoveMember(member.id)}
                      aria-label="Remove member"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showInvite && (
        <div className="modal-overlay">
          <div className="modal-backdrop" onClick={() => setShowInvite(false)} />
          <div className="modal-panel application-settings-form">
            <header className="modal-header">
              <h3>Invite team member</h3>
              <button type="button" className="icon-button" onClick={() => setShowInvite(false)} aria-label="Close">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </header>
            <div className="modal-body space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--coollabs-subtle)]">
                  Email address
                </label>
                <input type="email" className="input" placeholder="colleague@company.com" required />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--coollabs-subtle)]">
                  Role
                </label>
                <select className="select">
                  <option>Member</option>
                  <option>Admin</option>
                  <option>Owner</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="button" onClick={() => setShowInvite(false)}>Cancel</button>
              <button type="button" className="button" data-highlighted onClick={() => setShowInvite(false)}>Send invite</button>
            </div>
          </div>
        </div>
      )}

      {showRemoveMember && (
        <div className="modal-overlay">
          <div className="modal-backdrop" onClick={() => setShowRemoveMember(null)} />
          <div className="modal-panel">
            <header className="modal-header">
              <h3>Remove team member</h3>
              <button type="button" className="icon-button" onClick={() => setShowRemoveMember(null)} aria-label="Close">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </header>
            <div className="modal-body">
              <p className="text-sm text-[var(--color-fg-dim)]">
                Are you sure you want to remove this team member? They will lose access to this workspace.
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="button" onClick={() => setShowRemoveMember(null)}>Cancel</button>
              <button type="button" className="button text-[var(--color-error)]" onClick={() => setShowRemoveMember(null)}>Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
