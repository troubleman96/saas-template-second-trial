"use client";

import { useState } from "react";
import { AlertTriangle, AlertCircle, Info, CheckCircle } from "lucide-react";
import { alerts } from "@/lib/mock-data";

export default function AlertsPage() {
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set());

  const typeConfig = {
    critical: {
      icon: <AlertCircle className="size-4 shrink-0" />,
      badgeClass: "status-badge-error",
      calloutClass: "callout-danger",
    },
    warning: {
      icon: <AlertTriangle className="size-4 shrink-0" />,
      badgeClass: "status-badge-warning",
      calloutClass: "callout-warning",
    },
    info: {
      icon: <Info className="size-4 shrink-0" />,
      badgeClass: "",
      calloutClass: "callout-info",
    },
  };

  const visibleAlerts = alerts.filter((a) => !dismissedAlerts.has(a.id));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-black dark:text-[var(--color-fg)]">Alerts</h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-[var(--color-fg-dim)]">
          System alerts and notifications
        </p>
      </div>

      {visibleAlerts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <CheckCircle className="size-5 text-[var(--color-success)]" />
          </div>
          <h2 className="empty-state-title">All clear</h2>
          <p className="empty-state-description">No active alerts at this time.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {visibleAlerts.map((alert) => {
            const config = typeConfig[alert.severity as keyof typeof typeConfig] || typeConfig.info;
            return (
              <div key={alert.id} className={`callout ${config.calloutClass}`}>
                <div className="flex items-start gap-2.5">
                  {config.icon}
                  <div className="min-w-0 flex-1">
                    <div className="text-[12px] font-semibold">{alert.title}</div>
                    <div className="mt-0.5 text-[12px] leading-5 opacity-75">{alert.message}</div>
                  </div>
                  <button
                    type="button"
                    className="shrink-0 icon-button !size-6"
                    onClick={() => setDismissedAlerts((prev) => new Set([...prev, alert.id]))}
                    aria-label="Dismiss"
                  >
                    <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
