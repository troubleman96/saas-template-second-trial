"use client";

import { useState } from "react";
import { toast } from "sonner";
import { AlertTriangle, XCircle, Info, AlertOctagon, Check } from "lucide-react";
import { alerts } from "@/lib/mock-data";
import { ConfirmModal } from "@/components/modals/confirm-modal";

const severityConfig = {
  critical: {
    icon: AlertOctagon,
    color: "text-red-500 bg-red-500/10",
    badge: "bg-red-500/15 text-red-500",
  },
  error: {
    icon: XCircle,
    color: "text-red-500 bg-red-500/10",
    badge: "bg-red-500/15 text-red-500",
  },
  warning: {
    icon: AlertTriangle,
    color: "text-yellow-500 bg-yellow-500/10",
    badge: "bg-yellow-500/15 text-yellow-500",
  },
  info: {
    icon: Info,
    color: "text-blue-500 bg-blue-500/10",
    badge: "bg-blue-500/15 text-blue-500",
  },
};

export default function AlertsPage() {
  const [items, setItems] = useState(alerts);
  const [resolveId, setResolveId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Alerts</h1>
        <p className="text-sm text-[var(--coollabs-subtle)]">
          System alerts and warnings requiring attention.
        </p>
      </div>

      <div className="space-y-3">
        {items.map((alert) => {
          const config = severityConfig[alert.severity];
          const Icon = config.icon;
          return (
            <div
              key={alert.id}
              className="layer-card"
            >
              <div className="layer-card-body flex items-start gap-4">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${config.color}`}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold">{alert.title}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${config.badge}`}>
                      {alert.severity}
                    </span>
                    {!alert.acknowledged && (
                      <span className="rounded-full bg-blue-500/15 px-2 py-0.5 text-[10px] font-medium text-blue-500">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-[var(--coollabs-subtle)]">{alert.message}</p>
                  <p className="mt-1 text-xs text-[var(--coollabs-faint)]">{alert.timestamp}</p>
                </div>
                {!alert.acknowledged && (
                  <button
                    onClick={() => setResolveId(alert.id)}
                    className="button button-secondary h-7 text-xs shrink-0"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Acknowledge
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {items.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[var(--coollabs-line)] py-20">
          <Info className="h-8 w-8 text-[var(--coollabs-subtle)]" />
          <p className="mt-3 text-sm text-[var(--coollabs-subtle)]">No alerts</p>
        </div>
      )}

      <ConfirmModal
        open={resolveId !== null}
        onClose={() => setResolveId(null)}
        onConfirm={() => {
          setItems((prev) =>
            prev.map((a) =>
              a.id === resolveId ? { ...a, acknowledged: true } : a
            )
          );
          toast.success("Alert acknowledged");
        }}
        title="Acknowledge Alert"
        message="Mark this alert as acknowledged? It will no longer appear as active."
        confirmLabel="Acknowledge"
        variant="info"
      />
    </div>
  );
}
