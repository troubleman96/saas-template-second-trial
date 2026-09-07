"use client";

import { useState } from "react";
import { FolderGit2, Plus, Trash2 } from "lucide-react";
import { projects } from "@/lib/mock-data";

export default function ProjectsPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-black dark:text-[var(--color-fg)]">Projects</h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-[var(--color-fg-dim)]">
            Group your applications and resources into projects
          </p>
        </div>
        <button type="button" className="button" data-highlighted onClick={() => setShowCreate(true)}>
          <Plus className="size-4" />
          New project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <FolderGit2 className="size-5" />
          </div>
          <h2 className="empty-state-title">No projects yet</h2>
          <p className="empty-state-description">
            Create a project to group related applications together.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white p-3 dark:border-white/[0.06] dark:bg-white/[0.02]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 dark:border-white/[0.08] dark:bg-white/[0.04]">
                  <FolderGit2 className="size-4 text-[var(--color-fg-faint)]" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-black dark:text-[var(--color-fg)]">
                    {project.name}
                    <span className="ml-2 text-xs font-normal text-neutral-400 dark:text-[var(--color-fg-faint)]">
                      {project.applications} applications
                    </span>
                  </div>
                  <div className="truncate text-xs text-neutral-500 dark:text-[var(--color-fg-dim)]">
                    {project.description}
                  </div>
                  <div className="mt-1 flex items-center gap-1.5">
                    {project.environments.map((env) => (
                      <span
                        key={env}
                        className="inline-flex h-5 items-center rounded-full border border-neutral-200 bg-neutral-100 px-2 text-[10px] font-medium uppercase tracking-wide dark:border-white/[0.12] dark:bg-white/[0.07]"
                      >
                        {env}
                      </span>
                    ))}
                    <span className="text-xs text-neutral-400 dark:text-[var(--color-fg-faint)]">
                      Updated {project.updatedAt}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-4">
                <button
                  type="button"
                  className="icon-button text-[var(--color-error)]"
                  onClick={() => setDeleteId(project.id)}
                  aria-label="Delete project"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showCreate && (
        <div className="modal-overlay">
          <div className="modal-backdrop" onClick={() => setShowCreate(false)} />
          <div className="modal-panel application-settings-form">
            <header className="modal-header">
              <h3>Create project</h3>
              <button type="button" className="icon-button" onClick={() => setShowCreate(false)} aria-label="Close">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </header>
            <div className="modal-body space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--coollabs-subtle)]">
                  Project name
                </label>
                <input type="text" className="input" placeholder="e.g. Core Platform" required />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--coollabs-subtle)]">
                  Description
                </label>
                <input type="text" className="input" placeholder="What is this project about?" />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="button" onClick={() => setShowCreate(false)}>Cancel</button>
              <button type="button" className="button" data-highlighted onClick={() => setShowCreate(false)}>Create project</button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="modal-overlay">
          <div className="modal-backdrop" onClick={() => setDeleteId(null)} />
          <div className="modal-panel">
            <header className="modal-header">
              <h3>Delete project</h3>
              <button type="button" className="icon-button" onClick={() => setDeleteId(null)} aria-label="Close">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </header>
            <div className="modal-body">
              <p className="text-sm text-[var(--color-fg-dim)]">
                Are you sure you want to delete this project? This action cannot be undone.
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
