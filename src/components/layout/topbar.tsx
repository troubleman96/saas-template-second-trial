"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Bell, Search, ChevronDown } from "lucide-react";
import { useSidebar } from "@/lib/sidebar-context";
import { useNotifications } from "@/lib/notification-context";
import { NotificationPanel } from "@/components/notifications/notification-panel";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function TopBar() {
  const { collapsed } = useSidebar();
  const { unreadCount } = useNotifications();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <>
      {/* Desktop top bar */}
      <header className="hidden lg:flex fixed top-0 inset-x-0 z-50 h-12 items-center bg-white/95 dark:bg-[var(--color-panel)]/95 backdrop-blur border-b border-neutral-200 dark:border-white/[0.06]">
        <div
          className={`flex items-center gap-2 h-full shrink-0 border-r border-neutral-200 dark:border-white/[0.06] transition-[width] duration-200 ${
            collapsed ? "w-16 justify-center" : "w-56 px-4"
          }`}
        >
          <Link href="/dashboard" className="flex items-center gap-1.5">
            <span className="text-[15px] font-semibold tracking-tight text-black dark:text-white">
              Dashboard
            </span>
          </Link>
        </div>

        <div className="flex h-full items-center gap-2 flex-1 border-b border-neutral-200 dark:border-white/[0.06] px-4">
          <div className="flex-1" />

          <button
            onClick={() => {
              window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
            }}
            className="flex items-center gap-2 rounded-lg border border-[var(--coollabs-line)] bg-[var(--coollabs-recessed)] px-3 py-1.5 text-sm text-[var(--coollabs-subtle)] hover:border-[var(--coollabs-fill)] transition-colors"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Search...</span>
            <kbd className="hidden md:inline-flex items-center gap-0.5 rounded border border-[var(--coollabs-line)] bg-[var(--coollabs-fill)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--coollabs-subtle)]">
              ⌘K
            </kbd>
          </button>

          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative flex h-8 w-8 items-center justify-center rounded-lg text-[var(--color-nav-muted)] hover:bg-[var(--coollabs-fill)] hover:text-[var(--foreground)] transition-colors"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-error)] text-[10px] font-medium text-white">
                  {unreadCount}
                </span>
              )}
            </button>
            {notifOpen && <NotificationPanel onClose={() => setNotifOpen(false)} />}
          </div>

          <ThemeToggle />

          <Link
            href="/profile"
            className="flex items-center gap-2 rounded-lg px-2 py-1 text-sm text-[var(--color-nav-text)] hover:bg-[var(--coollabs-fill)] hover:text-[var(--foreground)] transition-colors"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-accent)] text-[11px] font-semibold text-white">
              AM
            </div>
            <ChevronDown className="h-3 w-3" />
          </Link>
        </div>
      </header>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 lg:hidden bg-white/95 dark:bg-[var(--color-panel)]/95 backdrop-blur-sm border-b border-neutral-200/60 dark:border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <Link
            href="/dashboard"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100 dark:bg-white/[0.06]"
          >
            <span className="text-xs font-bold">D</span>
          </Link>
          <span className="text-sm font-semibold">Dashboard</span>
        </div>
        <div className="flex items-center gap-1">
          <Link
            href="/notifications"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--color-nav-muted)]"
          >
            <Bell className="h-4 w-4" />
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--color-nav-muted)]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile slide-over sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[999] lg:hidden">
          <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />
          <div className="fixed inset-y-0 right-0 flex h-full w-full max-w-56 flex-col border-l border-neutral-200 dark:border-white/[0.12] bg-white dark:bg-[var(--color-panel)] shadow-xl">
            <div className="flex h-12 items-center justify-between border-b border-neutral-200 dark:border-white/[0.06] px-4">
              <span className="text-sm font-semibold">Menu</span>
              <button onClick={() => setMobileOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {[
                { name: "Dashboard", href: "/dashboard" },
                { name: "Applications", href: "/applications" },
                { name: "Settings", href: "/settings/general" },
                { name: "Profile", href: "/profile" },
                { name: "Alerts", href: "/alerts" },
                { name: "Notifications", href: "/notifications" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-nav-text)] hover:bg-[var(--coollabs-fill)]"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
