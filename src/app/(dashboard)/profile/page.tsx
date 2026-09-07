"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Save, Lock, Trash2 } from "lucide-react";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { currentUser } from "@/lib/mock-data";

export default function ProfilePage() {
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="text-sm text-[var(--coollabs-subtle)]">
          Manage your personal account settings.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="flex flex-col items-center gap-4 rounded-xl border border-[var(--coollabs-hairline)] bg-[var(--coollabs-elevated)] p-6 xl:sticky xl:top-[calc(3rem+1.75rem)] xl:self-start">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-accent)] text-2xl font-semibold text-white">
            {currentUser.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div className="text-center">
            <p className="font-medium">{name}</p>
            <p className="text-sm text-[var(--coollabs-subtle)]">{email}</p>
          </div>
          <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-500">
            {currentUser.role}
          </span>
        </div>

        <div className="space-y-6 xl:col-span-2">
          <div className="layer-card">
            <div className="layer-card-header">
              <h3>Account</h3>
            </div>
            <div className="layer-card-body space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-[var(--coollabs-subtle)]">
                    Name
                  </label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-[var(--coollabs-subtle)]">
                    Email
                  </label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
                </div>
              </div>
              <button
                onClick={() => toast.success("Profile updated")}
                className="button button-primary"
              >
                <Save className="h-4 w-4" />
                Save Changes
              </button>
            </div>
          </div>

          <div className="layer-card">
            <div className="layer-card-header">
              <h3>Change Password</h3>
            </div>
            <div className="layer-card-body space-y-4">
              <div className="flex items-center gap-2 text-sm text-[var(--coollabs-subtle)]">
                <Lock className="h-4 w-4" />
                Password management requires re-authentication.
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-[var(--coollabs-subtle)]">
                    Current Password
                  </label>
                  <input type="password" className="input" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-[var(--coollabs-subtle)]">
                    New Password
                  </label>
                  <input type="password" className="input" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-[var(--coollabs-subtle)]">
                    Confirm Password
                  </label>
                  <input type="password" className="input" />
                </div>
              </div>
              <button
                onClick={() => toast.success("Password updated")}
                className="button button-secondary"
              >
                Update Password
              </button>
            </div>
          </div>

          <div className="layer-card">
            <div className="layer-card-header">
              <h3 className="text-[var(--color-error)]">Danger Zone</h3>
            </div>
            <div className="layer-card-body space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">Delete Account</p>
                  <p className="text-xs text-[var(--coollabs-subtle)]">
                    Permanently delete your account and all associated data.
                  </p>
                </div>
                <button onClick={() => setShowDelete(true)} className="button button-danger">
                  <Trash2 className="h-4 w-4" />
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={() => toast.error("Account deletion requested")}
        title="Delete Account"
        message="This will permanently delete your account, all teams, applications, and data. This action cannot be undone."
        confirmLabel="Delete Account"
        variant="danger"
      />
    </div>
  );
}
