"use client";

import { useState } from "react";
import { X, ShieldAlert, ShieldCheck } from "lucide-react";

export default function ProfilePage() {
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailStep, setEmailStep] = useState<"request" | "verify">("request");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [name, setName] = useState("Emmanuel Lugenge");
  const [email] = useState("itslugenge@gmail.com");
  const [hasAvatar] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [show2FASetup, setShow2FASetup] = useState(false);

  return (
    <div className="mt-8 flex w-full max-w-none flex-col gap-6 lg:mt-3">
      {/* ============ PROFILE PICTURE ============ */}
      <section className="application-settings-section">
        <div className="application-settings-section-header">
          <div>
            <h2>Profile picture</h2>
            <p>Upload a JPG, PNG, or WebP image.</p>
          </div>
        </div>
        <div className="application-settings-section-body flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-neutral-200 text-2xl font-semibold text-neutral-700 dark:bg-white/[0.1] dark:text-[var(--color-fg)]">
            {avatarPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatarPreview} alt="Profile picture preview" className="h-full w-full object-cover" />
            ) : (
              <span>E</span>
            )}
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <label className="button cursor-pointer">
                Browse…
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => setAvatarPreview(reader.result as string);
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
              {hasAvatar && (
                <button type="button" className="button text-[var(--color-error)]">
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROFILE DETAILS ============ */}
      <section className="application-settings-section">
        <div className="application-settings-section-header">
          <div>
            <h2>Profile details</h2>
            <p>Your display name and verified sign-in address.</p>
          </div>
        </div>
        <div className="application-settings-section-body grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--coollabs-subtle)]">
              Name
              <span className="ml-0.5 text-[var(--color-accent)]">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--coollabs-subtle)]">Email</label>
            <div className="flex items-end gap-2">
              <input type="email" value={email} readOnly className="input flex-1" />
              <button
                type="button"
                className="button"
                onClick={() => setEmailModalOpen(true)}
              >
                Change
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============ EMAIL CHANGE MODAL ============ */}
      {emailModalOpen && (
        <div className="modal-overlay">
          <div className="modal-backdrop" onClick={() => setEmailModalOpen(false)} />
          <div className="modal-panel application-settings-form">
            <header className="modal-header">
              <div>
                <h3>{emailStep === "verify" ? "Verify new email" : "Change email"}</h3>
                <p className="mt-1 text-xs text-neutral-500 dark:text-[var(--color-fg-dim)]">
                  {emailStep === "verify"
                    ? "A six-digit verification code was sent."
                    : "A six-digit verification code will be sent to the new address."}
                </p>
              </div>
              <button
                type="button"
                className="icon-button shrink-0"
                onClick={() => {
                  setEmailModalOpen(false);
                  setEmailStep("request");
                }}
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
            </header>
            {emailStep === "verify" ? (
              <div className="modal-body space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[var(--coollabs-subtle)]">
                    Verification code
                  </label>
                  <input type="text" inputMode="numeric" maxLength={6} className="input" required />
                </div>
                <p className="text-xs text-neutral-500 dark:text-[var(--color-fg-dim)]">
                  The code expires after 10 minutes.
                </p>
                <div className="flex justify-end gap-2">
                  <button type="button" className="button">
                    Resend code
                  </button>
                  <button
                    type="button"
                    className="button"
                    data-highlighted
                    onClick={() => setEmailStep("request")}
                  >
                    Verify email
                  </button>
                </div>
              </div>
            ) : (
              <div className="modal-body space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[var(--coollabs-subtle)]">
                    New email address
                  </label>
                  <input type="email" className="input" required autoFocus />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="button"
                    data-highlighted
                    onClick={() => setEmailStep("verify")}
                  >
                    Send code
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============ PASSWORD ============ */}
      <section className="application-settings-section">
        <div className="application-settings-section-header">
          <div>
            <h2>Password</h2>
            <p>Changing your password signs out every active session.</p>
          </div>
          <button type="button" className="button">
            Change password
          </button>
        </div>
        <div className="application-settings-section-body grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-[var(--coollabs-subtle)]">
              Current password
            </label>
            <input type="password" className="input" required />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--coollabs-subtle)]">
              New password
            </label>
            <input type="password" className="input" required />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--coollabs-subtle)]">
              Confirm new password
            </label>
            <input type="password" className="input" required />
          </div>
        </div>
      </section>

      {/* ============ TWO-FACTOR AUTHENTICATION ============ */}
      <section className="application-settings-section">
        <div className="application-settings-section-header">
          <div>
            <h2>Two-factor authentication</h2>
            <p>Add a time-based one-time password to protect your account.</p>
          </div>
          {!twoFactorEnabled && !show2FASetup && (
            <button
              type="button"
              className="button"
              onClick={() => setShow2FASetup(true)}
            >
              Configure 2FA
            </button>
          )}
        </div>
        <div className="application-settings-section-body">
          {show2FASetup && !twoFactorEnabled ? (
            <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
              {/* QR code placeholder */}
              <div className="flex aspect-square items-center justify-center rounded-[10px] border border-neutral-200 bg-white p-5 dark:border-white/[0.07]">
                <div className="flex flex-col items-center gap-2 text-[var(--color-fg-faint)]">
                  <ShieldAlert className="size-16" />
                  <span className="text-xs">QR Code</span>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-black dark:text-[var(--color-fg)]">Finish setup</h3>
                  <p className="mt-1 text-sm text-neutral-500 dark:text-[var(--color-fg-dim)]">
                    Scan the QR code, then enter the current code from your authenticator.
                  </p>
                </div>
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <label className="mb-1.5 block text-sm font-medium text-[var(--coollabs-subtle)]">
                      One-time code
                    </label>
                    <input type="text" inputMode="numeric" pattern="[0-9]*" className="input" required />
                  </div>
                  <button
                    type="button"
                    className="button"
                    data-highlighted
                    onClick={() => setTwoFactorEnabled(true)}
                  >
                    Validate 2FA
                  </button>
                </div>
                <div>
                  <button type="button" className="button">
                    Show manual setup
                  </button>
                </div>
              </div>
            </div>
          ) : twoFactorEnabled ? (
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-end gap-2">
                <button type="button" className="button">
                  Regenerate recovery codes
                </button>
                <button
                  type="button"
                  className="button text-[var(--color-error)]"
                  onClick={() => {
                    setTwoFactorEnabled(false);
                    setShow2FASetup(false);
                  }}
                >
                  Disable 2FA
                </button>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-white/[0.07] dark:bg-white/[0.025]">
                <ShieldCheck className="size-5 text-[var(--color-success)]" />
                <span className="text-sm font-medium text-[var(--color-fg)]">
                  Two-factor authentication is enabled
                </span>
              </div>
            </div>
          ) : (
            <div className="empty-state min-h-[11rem]">
              <div className="empty-state-icon">
                <ShieldAlert className="size-5" />
              </div>
              <h2 className="empty-state-title">Two-factor authentication is off</h2>
              <p className="empty-state-description">
                Configure an authenticator app to add another sign-in check.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
