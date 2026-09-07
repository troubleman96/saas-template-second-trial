"use client";

import { Bell, CheckCircle, XCircle, Info } from "lucide-react";
import { notifications } from "@/lib/mock-data";
import { useState } from "react";

export default function NotificationsPage() {
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  const toggleRead = (id: string) => {
    setReadIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const iconMap: Record<string, React.ReactNode> = {
    success: <CheckCircle className="size-4 text-[var(--color-success)]" />,
    error: <XCircle className="size-4 text-[var(--color-error)]" />,
    info: <Info className="size-4 text-[var(--color-coollabs)]" />,
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-black dark:text-[var(--color-fg)]">Notifications</h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-[var(--color-fg-dim)]">
          View all notifications and activity history
        </p>
      </div>

      {notifications.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <Bell className="size-5" />
          </div>
          <h2 className="empty-state-title">No notifications</h2>
          <p className="empty-state-description">You&apos;re all caught up!</p>
        </div>
      ) : (
        <section className="application-settings-section">
          <div className="application-settings-section-header">
            <div>
              <h2>All notifications</h2>
              <p>Recent activity across your workspace.</p>
            </div>
          </div>
          <div className="application-settings-section-body">
            <div className="flex flex-col gap-2">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`flex items-start gap-3 rounded-lg border p-3 transition-colors cursor-pointer ${
                    readIds.has(n.id)
                      ? "border-neutral-200 bg-neutral-50 dark:border-white/[0.06] dark:bg-white/[0.02]"
                      : "border-neutral-200 bg-white dark:border-white/[0.06] dark:bg-[var(--coollabs-base)]"
                  }`}
                  onClick={() => toggleRead(n.id)}
                >
                  <div className="mt-0.5 shrink-0">
                    {iconMap[n.type] || iconMap.info}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-black dark:text-[var(--color-fg)]">
                      {n.title}
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-[var(--color-fg-dim)]">
                      {n.message}
                    </div>
                  </div>
                  <span className="text-[11px] text-neutral-400 dark:text-[var(--color-fg-faint)] shrink-0">
                    {n.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
