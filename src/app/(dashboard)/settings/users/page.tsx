"use client";

import { useState } from "react";
import { toast } from "sonner";
import { UserPlus, X, Mail } from "lucide-react";
import { currentUser, teams } from "@/lib/mock-data";
import { InlineConfirm } from "@/components/modals/confirm-modal";

export default function SettingsUsersPage() {
  const team = teams[0];
  const [members, setMembers] = useState(team.members);
  const [confirmRemove, setConfirmRemove] = useState<string | null>(null);

  const roleColors = {
    owner: "bg-purple-500/10 text-purple-500",
    admin: "bg-blue-500/10 text-blue-500",
    member: "bg-green-500/10 text-green-500",
  };

  return (
    <div className="space-y-6">
      <div className="layer-card">
        <div className="layer-card-header">
          <div>
            <h3>Team Members</h3>
            <p className="mt-0.5 text-xs text-[var(--coollabs-subtle)]">
              Manage who has access to {team.name}
            </p>
          </div>
          <button className="button button-primary h-8 text-xs">
            <UserPlus className="h-3.5 w-3.5" />
            Invite Member
          </button>
        </div>
        <div className="layer-card-body p-0">
          <div className="divide-y divide-[var(--coollabs-fill)]">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between gap-4 px-4 py-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-[11px] font-semibold text-white">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 text-sm font-medium truncate">
                      {member.name}
                      {member.id === currentUser.id && (
                        <span className="text-[10px] text-[var(--coollabs-subtle)]">(you)</span>
                      )}
                    </p>
                    <p className="flex items-center gap-1 text-xs text-[var(--coollabs-subtle)]">
                      <Mail className="h-3 w-3" />
                      {member.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${roleColors[member.role]}`}>
                    {member.role}
                  </span>
                  {member.id !== currentUser.id && (
                    <>
                      {confirmRemove === member.id ? (
                        <InlineConfirm
                          message="Remove member?"
                          onCancel={() => setConfirmRemove(null)}
                          onConfirm={() => {
                            setMembers((prev) => prev.filter((m) => m.id !== member.id));
                            setConfirmRemove(null);
                            toast.success(`${member.name} removed`);
                          }}
                        />
                      ) : (
                        <button
                          onClick={() => setConfirmRemove(member.id)}
                          className="rounded p-1 text-[var(--coollabs-subtle)] hover:bg-[var(--coollabs-fill)]"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
