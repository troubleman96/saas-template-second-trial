"use client";

import { useState } from "react";
import { Check, Info, AlertTriangle, XCircle, BellOff } from "lucide-react";
import { notifications } from "@/lib/mock-data";
import { toast } from "sonner";

const typeConfig = {
  success: { icon: Check, color: "text-green-500 bg-green-500/10" },
  info: { icon: Info, color: "text-blue-500 bg-blue-500/10" },
  warning: { icon: AlertTriangle, color: "text-yellow-500 bg-yellow-500/10" },
  error: { icon: XCircle, color: "text-red-500 bg-red-500/10" },
};

export default function NotificationsPage() {
  const [items, setItems] = useState(notifications);

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="text-sm text-[var(--coollabs-subtle)]">
            History of all system notifications.
          </p>
        </div>
        <button
          onClick={markAllRead}
          className="button button-ghost"
        >
          <Check className="h-4 w-4" />
          Mark all read
        </button>
      </div>

      <div className="layer-card">
        <div className="layer-card-body p-0">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <BellOff className="h-8 w-8 text-[var(--coollabs-subtle)]" />
              <p className="mt-3 text-sm text-[var(--coollabs-subtle)]">No notifications</p>
            </div>
          ) : (
            <div className="divide-y divide-[var(--coollabs-fill)]">
              {items.map((n) => {
                const config = typeConfig[n.type];
                const Icon = config.icon;
                return (
                  <div key={n.id} className={`flex items-start gap-4 px-4 py-4 ${!n.read ? "bg-[var(--coollabs-recessed)]" : ""}`}>
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${config.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className={`text-sm font-medium ${!n.read ? "font-semibold" : ""}`}>
                          {n.title}
                        </p>
                        {!n.read && (
                          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                        )}
                      </div>
                      <p className="text-sm text-[var(--coollabs-subtle)] mt-0.5">{n.message}</p>
                      <p className="text-xs text-[var(--coollabs-faint)] mt-1">{n.timestamp}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
