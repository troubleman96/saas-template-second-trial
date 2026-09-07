"use client";

import { useEffect, useRef } from "react";
import { Check, Info, AlertTriangle, XCircle } from "lucide-react";
import { useNotifications } from "@/lib/notification-context";

const iconMap = {
  success: Check,
  info: Info,
  warning: AlertTriangle,
  error: XCircle,
};

const colorMap = {
  success: "text-green-500",
  info: "text-blue-500",
  warning: "text-yellow-500",
  error: "text-red-500",
};

export function NotificationPanel({ onClose }: { onClose: () => void }) {
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotifications();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-[var(--coollabs-hairline)] bg-[var(--coollabs-elevated)] shadow-[var(--shadow-modal)] z-50"
    >
      <div className="flex items-center justify-between border-b border-[var(--coollabs-fill)] px-4 py-3">
        <h3 className="text-sm font-semibold">Notifications</h3>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-xs text-[var(--color-accent)] hover:underline"
          >
            Mark all read
          </button>
        )}
      </div>
      <div className="max-h-80 overflow-y-auto scrollbar">
        {notifications.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-[var(--coollabs-subtle)]">
            No notifications yet
          </p>
        ) : (
          notifications.map((n) => {
            const Icon = iconMap[n.type];
            return (
              <div
                key={n.id}
                onClick={() => markAsRead(n.id)}
                className={`flex gap-3 px-4 py-3 cursor-pointer hover:bg-[var(--coollabs-fill)] transition-colors ${
                  !n.read ? "bg-[var(--coollabs-recessed)]" : ""
                }`}
              >
                <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${colorMap[n.type]}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{n.title}</p>
                  <p className="text-xs text-[var(--coollabs-subtle)] line-clamp-2">{n.message}</p>
                  <p className="text-[11px] text-[var(--coollabs-subtle)] mt-1">{n.timestamp}</p>
                </div>
                {!n.read && (
                  <div className="h-2 w-2 rounded-full bg-[var(--color-accent)] mt-1.5 shrink-0" />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
