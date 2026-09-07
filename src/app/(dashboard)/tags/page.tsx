"use client";

import { useState } from "react";
import { Tag, Plus, Trash2 } from "lucide-react";
import { teamTags } from "@/lib/mock-data";

export default function TagsPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-black dark:text-[var(--color-fg)]">Tags</h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-[var(--color-fg-dim)]">
            Organize your resources with tags
          </p>
        </div>
        <button type="button" className="button" data-highlighted onClick={() => setShowCreate(true)}>
          <Plus className="size-4" />
          Create tag
        </button>
      </div>

      {teamTags.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <Tag className="size-5" />
          </div>
          <h2 className="empty-state-title">No tags yet</h2>
          <p className="empty-state-description">
            Create tags to organize and filter your resources.
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {teamTags.map((tag) => (
            <div
              key={tag.id}
              className="group flex items-center gap-2 rounded-lg border border-neutral-200 bg-white py-2 pl-2.5 pr-2 dark:border-white/[0.06] dark:bg-[var(--coollabs-base)]"
            >
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: tag.color }}
              />
              <span className="text-sm font-medium text-black dark:text-[var(--color-fg)]">
                {tag.name}
              </span>
              <span className="text-xs text-neutral-400 dark:text-[var(--color-fg-faint)]">
                {tag.resources}
              </span>
              <button
                type="button"
                className="icon-button size-6 text-[var(--color-error)] opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() => setDeleteId(tag.id)}
                aria-label="Delete tag"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {showCreate && (
        <div className="modal-overlay">
          <div className="modal-backdrop" onClick={() => setShowCreate(false)} />
          <div className="modal-panel application-settings-form">
            <header className="modal-header">
              <h3>Create tag</h3>
              <button type="button" className="icon-button" onClick={() => setShowCreate(false)} aria-label="Close">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </header>
            <div className="modal-body space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--coollabs-subtle)]">
                  Tag name
                </label>
                <input type="text" className="input" placeholder="e.g. production" required />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--coollabs-subtle)]">
                  Color
                </label>
                <div className="flex items-center gap-3">
                  {["#ef4444", "#eab308", "#22c55e", "#3b82f6", "#6b16ed", "#ec4899"].map((color) => (
                    <button
                      key={color}
                      type="button"
                      className="size-6 rounded-full border-2 border-transparent transition-colors hover:border-neutral-400 dark:hover:border-white/[0.2]"
                      style={{ backgroundColor: color }}
                      aria-label={`Color ${color}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="button" onClick={() => setShowCreate(false)}>Cancel</button>
              <button type="button" className="button" data-highlighted onClick={() => setShowCreate(false)}>Create tag</button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="modal-overlay">
          <div className="modal-backdrop" onClick={() => setDeleteId(null)} />
          <div className="modal-panel">
            <header className="modal-header">
              <h3>Delete tag</h3>
              <button type="button" className="icon-button" onClick={() => setDeleteId(null)} aria-label="Close">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </header>
            <div className="modal-body">
              <p className="text-sm text-[var(--color-fg-dim)]">
                Are you sure you want to delete this tag? It will be removed from all resources.
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
