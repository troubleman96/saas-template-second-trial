"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCw,
  Trash2,
  ExternalLink,
  GitBranch,
  Server,
  Clock,
} from "lucide-react";
import { applications } from "@/lib/mock-data";
import { useState } from "react";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { toast } from "sonner";

const statusColors = {
  running: "status-running",
  stopped: "status-stopped",
  deploying: "status-deploying",
  degraded: "status-degraded",
  failed: "status-failed",
};

export default function ApplicationDetailPage() {
  const params = useParams();
  const app = applications.find((a) => a.id === params.id);
  const [activeTab, setActiveTab] = useState("general");
  const [showDelete, setShowDelete] = useState(false);

  if (!app) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-lg font-semibold">Application not found</h2>
        <Link href="/applications" className="mt-2 text-sm text-[var(--color-accent)] hover:underline">
          Back to applications
        </Link>
      </div>
    );
  }

  const tabs = [
    { id: "general", label: "General" },
    { id: "logs", label: "Logs" },
    { id: "metrics", label: "Metrics" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/applications"
          className="rounded-lg p-1.5 text-[var(--coollabs-subtle)] hover:bg-[var(--coollabs-fill)]"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">{app.name}</h1>
            <span className={`status-badge ${statusColors[app.status]}`}>{app.status}</span>
          </div>
          <p className="text-sm text-[var(--coollabs-subtle)]">{app.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="button button-secondary">
            <Play className="h-3.5 w-3.5" /> Start
          </button>
          <button className="button button-secondary">
            <Pause className="h-3.5 w-3.5" /> Stop
          </button>
          <button className="button button-secondary">
            <RotateCw className="h-3.5 w-3.5" /> Restart
          </button>
          <button onClick={() => setShowDelete(true)} className="button button-danger">
            <Trash2 className="h-3.5 w-3.5" /> Delete
          </button>
        </div>
      </div>

      <div className="layer-card">
        <div className="layer-card-header">
          <div className="flex items-center gap-6">
            {app.url && (
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-[var(--color-accent)] hover:underline"
              >
                <ExternalLink className="h-3 w-3" /> {app.url}
              </a>
            )}
            <span className="flex items-center gap-1.5 text-xs text-[var(--coollabs-subtle)]">
              <GitBranch className="h-3 w-3" /> {app.branch}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[var(--coollabs-subtle)]">
              <Server className="h-3 w-3" /> {app.server}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[var(--coollabs-subtle)]">
              <Clock className="h-3 w-3" /> {app.lastDeployed}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-1 border-b border-[var(--coollabs-fill)]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab.id
                ? "border-[var(--color-accent)] text-[var(--color-accent)]"
                : "border-transparent text-[var(--coollabs-subtle)] hover:text-[var(--foreground)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="layer-card">
        <div className="layer-card-body">
          {activeTab === "general" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-[var(--coollabs-subtle)]">
                    Type
                  </label>
                  <p className="text-sm">{app.type}</p>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-[var(--coollabs-subtle)]">
                    Branch
                  </label>
                  <p className="text-sm">{app.branch}</p>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-[var(--coollabs-subtle)]">
                    Server
                  </label>
                  <p className="text-sm">{app.server}</p>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-[var(--coollabs-subtle)]">
                    Last Deployed
                  </label>
                  <p className="text-sm">{app.lastDeployed}</p>
                </div>
              </div>
            </div>
          )}
          {activeTab === "logs" && (
            <div className="rounded-lg bg-[var(--color-base)] p-4 font-mono text-xs text-green-400">
              <p>[2024-01-15 10:30:00] Application started</p>
              <p>[2024-01-15 10:30:01] Listening on port 3000</p>
              <p>[2024-01-15 10:30:02] Ready to accept connections</p>
            </div>
          )}
          {activeTab === "metrics" && (
            <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-[var(--coollabs-line)]">
              <p className="text-sm text-[var(--coollabs-subtle)]">Metrics chart placeholder</p>
            </div>
          )}
          {activeTab === "settings" && (
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-[var(--coollabs-subtle)]">
                  Application Name
                </label>
                <input type="text" defaultValue={app.name} className="input max-w-md" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-[var(--coollabs-subtle)]">
                  Description
                </label>
                <textarea defaultValue={app.description} className="input max-w-md" />
              </div>
              <button className="button button-primary">Save Changes</button>
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={() => toast.success("Application deleted")}
        title="Delete Application"
        message={`Are you sure you want to delete "${app.name}"? This will remove all associated data and cannot be undone.`}
        confirmLabel="Delete Application"
        variant="danger"
      />
    </div>
  );
}
