"use client";

import Link from "next/link";
import { Plus, ExternalLink, MoreVertical } from "lucide-react";
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

export default function ApplicationsPage() {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Applications</h1>
          <p className="text-sm text-[var(--coollabs-subtle)]">
            Manage your deployed applications.
          </p>
        </div>
        <button className="button button-primary">
          <Plus className="h-4 w-4" />
          New Application
        </button>
      </div>

      <div className="layer-card">
        <div className="layer-card-body p-0">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th className="hidden sm:table-cell">Type</th>
                <th>Status</th>
                <th className="hidden md:table-cell">Server</th>
                <th className="hidden lg:table-cell">Last Deployed</th>
                <th className="w-12"></th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id}>
                  <td>
                    <Link
                      href={`/applications/${app.id}`}
                      className="font-medium hover:text-[var(--color-accent)] transition-colors"
                    >
                      {app.name}
                    </Link>
                    <p className="text-xs text-[var(--coollabs-subtle)] mt-0.5 sm:hidden">
                      {app.type}
                    </p>
                  </td>
                  <td className="hidden sm:table-cell">{app.type}</td>
                  <td>
                    <span className={`status-badge ${statusColors[app.status]}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="hidden md:table-cell">{app.server}</td>
                  <td className="hidden lg:table-cell">{app.lastDeployed}</td>
                  <td>
                    <div className="flex items-center gap-1">
                      {app.url && (
                        <a
                          href={app.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded p-1 text-[var(--coollabs-subtle)] hover:bg-[var(--coollabs-fill)]"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                      <button
                        onClick={() => setDeleteId(app.id)}
                        className="rounded p-1 text-[var(--coollabs-subtle)] hover:bg-[var(--coollabs-fill)]"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmModal
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          toast.success("Application deleted");
          setDeleteId(null);
        }}
        title="Delete Application"
        message="Are you sure you want to delete this application? This action cannot be undone."
        confirmLabel="Delete"
        variant="danger"
      />
    </div>
  );
}
