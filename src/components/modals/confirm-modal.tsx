"use client";

import { useEffect, useRef } from "react";
import { X, AlertTriangle, Info, Trash2 } from "lucide-react";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  variant?: "danger" | "warning" | "info";
}

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  variant = "danger",
}: ConfirmModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [open, onClose]);

  if (!open) return null;

  const icons = {
    danger: Trash2,
    warning: AlertTriangle,
    info: Info,
  };

  const iconColors = {
    danger: "text-red-500 bg-red-500/10",
    warning: "text-yellow-500 bg-yellow-500/10",
    info: "text-blue-500 bg-blue-500/10",
  };

  const buttonColors = {
    danger: "button-danger",
    warning: "button-primary",
    info: "button-primary",
  };

  const Icon = icons[variant];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div
        ref={ref}
        className="relative w-full max-w-md rounded-xl border border-[var(--coollabs-hairline)] bg-[var(--coollabs-elevated)] shadow-[var(--shadow-modal)] p-6"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-lg p-1 text-[var(--coollabs-subtle)] hover:bg-[var(--coollabs-fill)]"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-start gap-4">
          <div className={`flex h-10 w-10 items-center justify-center rounded-full ${iconColors[variant]}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-[var(--coollabs-subtle)]">{message}</p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="button button-secondary">
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`button ${buttonColors[variant]}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

interface InlineConfirmProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function InlineConfirm({ message, onConfirm, onCancel }: InlineConfirmProps) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-[var(--color-error)]/20 bg-[var(--color-error)]/5 px-3 py-2">
      <p className="text-xs text-[var(--color-error)]">{message}</p>
      <button onClick={onCancel} className="button button-ghost h-6 px-2 text-xs">
        Cancel
      </button>
      <button onClick={onConfirm} className="button button-danger h-6 px-2 text-xs">
        Confirm
      </button>
    </div>
  );
}
