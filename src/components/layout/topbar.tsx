"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, LogOut, User } from "lucide-react";

const pageLabels: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/projects": "Projects",
  "/terminal": "Terminal",
  "/servers": "Servers",
  "/sources": "Sources",
  "/destinations": "Destinations",
  "/storages": "S3 Storage",
  "/variables": "Shared Variables",
  "/team": "Team",
  "/notifications": "Notifications",
  "/security": "Keys & Tokens",
  "/subscription": "Subscription",
  "/tags": "Tags",
  "/settings/general": "Settings",
  "/settings/users": "Settings",
  "/settings/security": "Settings",
  "/settings/notifications": "Settings",
  "/settings/appearance": "Settings",
  "/settings/domains": "Settings",
  "/settings/tokens": "Settings",
  "/profile": "Profile",
  "/alerts": "Alerts",
};

function getPageLabel(pathname: string): string {
  if (pageLabels[pathname]) return pageLabels[pathname];
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0) {
    const base = "/" + segments[0];
    if (pageLabels[base]) return pageLabels[base];
    return segments[0].charAt(0).toUpperCase() + segments[0].slice(1);
  }
  return "Dashboard";
}

export function TopUserMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className="relative min-w-0" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        title="Account"
        className="flex h-8 items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-100 px-2 shadow-sm transition-colors hover:bg-neutral-200 dark:border-white/[0.08] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]"
      >
        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-[11px] font-semibold text-neutral-700 dark:bg-white/[0.1] dark:text-[var(--color-fg)]">
          E
        </span>
        <span className="min-w-0 truncate text-xs font-medium hidden sm:inline">Emmanuel</span>
        <ChevronDown
          className={`size-3.5 shrink-0 text-neutral-400 dark:text-[var(--color-fg-faint)] transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="top-user-menu-panel absolute bottom-full left-0 right-auto top-auto mb-1 origin-bottom-left z-[90]">
          <div className="min-w-0 px-2 py-1.5">
            <div className="truncate text-[13px] font-semibold text-black dark:text-[var(--color-fg)]">
              Emmanuel Lugenge
            </div>
            <div className="truncate text-[11px] text-neutral-500 dark:text-[var(--color-fg-faint)]">
              itslugenge@gmail.com
            </div>
          </div>
          <div className="my-1 h-px bg-neutral-200 dark:bg-white/[0.07]" />

          <Link href="/profile" className="listbox-option" onClick={() => setOpen(false)}>
            <User className="size-4 opacity-80" />
            Profile
          </Link>

          <div className="my-1 h-px bg-neutral-200 dark:bg-white/[0.07]" />

          <button
            type="button"
            className="listbox-option w-full text-left text-[var(--color-error)]"
            onClick={() => setOpen(false)}
          >
            <LogOut className="size-4 opacity-90" />
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

export function TopBar({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();
  const pageLabel = getPageLabel(pathname);

  return (
    <header
      className={`hidden lg:flex fixed top-0 inset-x-0 z-50 h-12 items-center bg-white/95 dark:bg-[var(--color-panel)]/95 backdrop-blur transition-[width] duration-200 ${
        collapsed ? "w-16" : "w-56"
      }`}
    >
      {/* Brand area */}
      <div
        className={`flex items-center gap-2 h-full shrink-0 border-r border-neutral-200 dark:border-white/[0.06] transition-[width] duration-200 ${
          collapsed ? "w-16 justify-center px-0" : "w-56 px-4"
        }`}
      >
        <Link href="/dashboard" title="SaaS Template" className="flex items-center hover:opacity-80 transition-opacity">
          <span className="text-[15px] font-semibold tracking-tight text-black dark:text-white">
            SaaS
          </span>
        </Link>
      </div>

      {/* Breadcrumb + user */}
      <div className="flex h-full items-center gap-0.5 min-w-0 flex-1 border-b border-neutral-200 pl-3 pr-4 dark:border-white/[0.06]">
        <div className="relative flex min-w-0 flex-1 items-center">
          <span className="text-sm text-[var(--color-fg-dim)]">{pageLabel}</span>
        </div>
        <TopUserMenu />
      </div>
    </header>
  );
}

export function MobileTopBar({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
  const pathname = usePathname();
  const pageLabel = getPageLabel(pathname);

  return (
    <div className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 gap-x-4 sm:px-6 lg:hidden bg-white/95 dark:bg-[var(--color-panel)]/95 backdrop-blur-sm border-b border-neutral-200/60 dark:border-white/[0.06]">
      <div className="flex min-w-0 flex-1 items-center gap-2.5">
        <Link
          href="/dashboard"
          className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 transition-opacity hover:opacity-80 dark:bg-white/[0.06]"
        >
          <span className="text-xs font-semibold text-black dark:text-white">S</span>
        </Link>
        <span className="min-w-0 text-sm font-medium text-[var(--color-fg)]">{pageLabel}</span>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <TopUserMenu />
        <button
          type="button"
          onClick={onToggleSidebar}
          className="-m-1 p-2 text-neutral-500 dark:text-[var(--color-fg-dim)]"
        >
          <span className="sr-only">Open sidebar</span>
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}