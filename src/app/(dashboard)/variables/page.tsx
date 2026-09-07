"use client";

import {
  Lock,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";
import { sharedVariables } from "@/lib/mock-data";
import { useState } from "react";

export default function VariablesPage() {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-black dark:text-[var(--color-fg)]">Shared Variables</h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-[var(--color-fg-dim)]">
            Environment variables shared across your applications
          </p>
        </div>
        <button type="button" className="button" data-highlighted>
          <Plus className="size-4" />
          Add variable
        </button>
      </div>

      {sharedVariables.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <Lock className="size-5" />
          </div>
          <h2 className="empty-state-title">No shared variables</h2>
          <p className="empty-state-description">
            Create shared environment variables to inject into your applications.
          </p>
        </div>
      ) : (
        <div className="application-settings-section">
          <div className="application-settings-section-body !p-0">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-neutral-200 text-xs uppercase tracking-wide text-neutral-400 dark:border-white/[0.06] dark:text-[var(--color-fg-faint)]">
                  <th className="px-4 py-3 font-medium">Key</th>
                  <th className="px-4 py-3 font-medium">Value</th>
                  <th className="px-4 py-3 font-medium">Scope</th>
                  <th className="px-4 py-3 font-medium">Updated</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sharedVariables.map((variable) => (
                  <tr
                    key={variable.id}
                    className="border-b border-neutral-200 last:border-0 dark:border-white/[0.06]"
                  >
                    <td className="px-4 py-3 font-medium text-black dark:text-[var(--color-fg)]">
                      {variable.key}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-neutral-500 dark:text-[var(--color-fg-dim)]">
                      {variable.value}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-100 px-2 py-0.5 text-xs font-medium dark:border-white/[0.12] dark:bg-white/[0.07]">
                        {variable.scopedTo}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-neutral-500 dark:text-[var(--color-fg-dim)]">
                      {variable.updatedAt}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button type="button" className="icon-button" aria-label="Edit variable">
                          <Pencil className="size-4" />
                        </button>
                        <button
                          type="button"
                          className="icon-button text-[var(--color-error)]"
                          onClick={() => setDeleteId(variable.id)}
                          aria-label="Delete variable"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="modal-overlay">
          <div className="modal-backdrop" onClick={() => setDeleteId(null)} />
          <div className="modal-panel">
            <header className="modal-header">
              <h3>Delete variable</h3>
              <button type="button" className="icon-button" onClick={() => setDeleteId(null)} aria-label="Close">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </header>
            <div className="modal-body">
              <p className="text-sm text-[var(--color-fg-dim)]">
                Are you sure you want to delete this shared variable? Applications using it may break.
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="button" onClick={() => setDeleteId(null)}>Cancel</button>
              <button type="button" className="button text-[var(--color-error)]" onClick={() => setDeleteId(null)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
