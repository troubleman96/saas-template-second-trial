"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Play,
  Square,
  RotateCcw,
  Trash2,
  Settings,
  FileText,
  BarChart3,
  ExternalLink,
} from "lucide-react";
import { applications } from "@/lib/mock-data";
import { useState } from "react";

type Tab = "general" | "logs" | "metrics" | "settings";

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "general", label: "General", icon: <Settings className="size-4" /> },
  { id: "logs", label: "Logs", icon: <FileText className="size-4" /> },
  { id: "metrics", label: "Metrics", icon: <BarChart3 className="size-4" /> },
  { id: "settings", label: "Settings", icon: <Settings className="size-4" /> },
];

export default function ApplicationDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const app = applications.find((a) => a.id === id) || applications[0];
  const [activeTab, setActiveTab] = useState<Tab>("general");
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      {/* Back + heading */}
      <div>
        <Link
          href="/applications"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--color-fg-dim)] hover:text-[var(--color-fg)] mb-3"
        >
          <ArrowLeft className="size-4" />
          Applications
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 dark:border-white/[0.08] dark:bg-white/[0.04]">
              <svg className="size-5 text-[var(--color-fg-faint)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-black dark:text-[var(--color-fg)]">
                {app.name}
              </h1>
              <p className="text-sm text-neutral-500 dark:text-[var(--color-fg-dim)]">
                {app.description || "No description"}
              </p>
            </div>
          </div>
          <span className={`status-badge ${
            app.status === "running"
              ? "status-badge-success"
              : app.status === "stopped"
              ? "status-badge-neutral"
              : "status-badge-error"
          }`}>
            <span className="status-badge-dot" />
            <span>{app.status}</span>
          </span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" className="button">
          <Play className="size-4" />
          Start
        </button>
        <button type="button" className="button">
          <Square className="size-4" />
          Stop
        </button>
        <button type="button" className="button">
          <RotateCcw className="size-4" />
          Restart
        </button>
        <div className="flex-1" />
        <button
          type="button"
          className="button text-[var(--color-error)]"
          onClick={() => setShowDelete(true)}
        >
          <Trash2 className="size-4" />
          Delete
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-0.5 border-b border-neutral-200 dark:border-white/[0.06]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 h-8 px-2.5 rounded-t-md text-[13px] font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-[var(--coollabs-base)] text-[var(--color-accent)] border border-neutral-200 dark:border-white/[0.06] border-b-transparent -mb-px"
                : "text-neutral-500 dark:text-[var(--color-fg-dim)] hover:bg-neutral-100 dark:hover:bg-white/[0.05] hover:text-black dark:hover:text-[var(--color-fg)]"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>
        {activeTab === "general" && (
          <div className="application-settings-section">
            <div className="application-settings-section-header">
              <div>
                <h2>General information</h2>
                <p>Basic details about this application.</p>
              </div>
            </div>
            <div className="application-settings-section-body grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--coollabs-subtle)]">Name</label>
                <input type="text" defaultValue={app.name} className="input" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--coollabs-subtle)]">Description</label>
                <input type="text" defaultValue={app.description || ""} className="input" />
              </div>
              {app.git_repository && (
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-[var(--coollabs-subtle)]">Git repository</label>
                  <div className="flex items-center gap-2">
                    <input type="text" value={app.git_repository} readOnly className="input flex-1" />
                    <a href={app.git_repository} target="_blank" rel="noopener noreferrer" className="icon-button">
                      <ExternalLink className="size-4" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "logs" && (
          <div className="application-settings-section">
            <div className="application-settings-section-body">
              <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-neutral-300 dark:border-white/[0.1]">
                <span className="text-sm text-neutral-500 dark:text-[var(--color-fg-dim)]">
                  Logs will appear here when the application is running.
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "metrics" && (
          <div className="application-settings-section">
            <div className="application-settings-section-body">
              <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-neutral-300 dark:border-white/[0.1]">
                <span className="text-sm text-neutral-500 dark:text-[var(--color-fg-dim)]">
                  Chart placeholder — CPU and memory metrics will appear here.
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="application-settings-section">
            <div className="application-settings-section-header">
              <div>
                <h2>Danger zone</h2>
                <p>Irreversible actions for this application.</p>
              </div>
            </div>
            <div className="application-settings-section-body">
              <button type="button" className="button text-[var(--color-error)]">
                <Trash2 className="size-4" />
                Delete application
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete modal */}
      {showDelete && (
        <div className="modal-overlay">
          <div className="modal-backdrop" onClick={() => setShowDelete(false)} />
          <div className="modal-panel">
            <header className="modal-header">
              <h3>Delete application</h3>
              <button type="button" className="icon-button" onClick={() => setShowDelete(false)} aria-label="Close">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </header>
            <div className="modal-body">
              <p className="text-sm text-[var(--color-fg-dim)]">
                Are you sure you want to delete <strong>{app.name}</strong>? This action cannot be undone.
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="button" onClick={() => setShowDelete(false)}>Cancel</button>
              <button type="button" className="button text-[var(--color-error)]" onClick={() => setShowDelete(false)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
