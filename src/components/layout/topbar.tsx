"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";
import { ChevronIcon, TopUserMenu, useOutside } from "./user-menu";

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
  "/applications": "Applications",
};

const navOccurrences: Record<string, string> = {
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
  "/tags": "Tags",
  "/settings/general": "Settings",
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

const mockTeams = [
  { id: 1, name: "Emmanuel's Team" },
  { id: 2, name: "Acme Cloud" },
  { id: 3, name: "Coolify Labs" },
];

function TeamSwitcher() {
  const [active, setActive] = useState(1);
  const [open, setOpen] = useState(false);
  const ref = useOutside(open, () => setOpen(false));
  const current = mockTeams.find((t) => t.id === active) ?? mockTeams[0];

  return (
    <div className="shrink-0 min-w-0" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        title="Switch team"
        className="group/team flex h-8 items-center gap-1.5 rounded-lg px-2 -ml-1 text-left opacity-70 transition-[background-color,opacity] hover:bg-neutral-100 hover:opacity-100 dark:hover:bg-white/[0.05]"
      >
        <span className="whitespace-nowrap text-[13px] font-semibold text-black dark:text-[var(--color-fg)]">
          {current.name}
        </span>
        <ChevronIcon open={open} />
      </button>
      {open && (
        <div className="top-user-menu-panel listbox-panel left-0 z-[90] max-h-72 min-w-56">
          <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-neutral-400 dark:text-[var(--color-fg-faint)]">
            Teams
          </div>
          {mockTeams.map((team) => (
            <button
              key={team.id}
              type="button"
              onClick={() => {
                setActive(team.id);
                setOpen(false);
              }}
              className={`listbox-option w-full ${
                team.id === active ? "bg-neutral-100 font-medium dark:bg-white/[0.06]" : ""
              }`}
            >
              <span className="min-w-0 flex-1 truncate">{team.name}</span>
            </button>
          ))}
          <div className="mt-1 border-t border-neutral-200 pt-1 dark:border-white/[0.08]">
            <button type="button" className="listbox-option w-full" onClick={() => setOpen(false)}>
              <Plus className="size-3.5 shrink-0" />
              <span className="min-w-0 flex-1 text-left">New team</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function PageBreadcrumb() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useOutside(open, () => setOpen(false));
  const label = getPageLabel(pathname);

  const currentHref =
    navOccurrences[pathname] ??
    Object.keys(navOccurrences).find((k) => navOccurrences[k] === label) ??
    "/dashboard";

  return (
    <>
      <span className="shrink-0 px-0.5 text-neutral-300 dark:text-[var(--color-fg-faint)]">/</span>
      <div className="relative min-w-0 shrink" ref={ref}>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          title="Switch page"
          className="flex h-8 min-w-0 items-center gap-1.5 rounded-md px-2 opacity-70 transition-[background-color,opacity] hover:bg-neutral-100 hover:opacity-100 dark:hover:bg-white/[0.05]"
        >
          <span className="min-w-0 truncate font-semibold text-black dark:text-[var(--color-fg)]">{label}</span>
          <ChevronIcon open={open} />
        </button>
        {open && (
          <div className="top-user-menu-panel listbox-panel left-0 z-[90] max-h-80 min-w-52">
            <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-neutral-400 dark:text-[var(--color-fg-faint)]">
              Pages
            </div>
            {Object.entries(navOccurrences).map(([href, name]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`listbox-option w-full ${
                  href === currentHref
                    ? "bg-neutral-100 font-medium text-black dark:bg-white/[0.07] dark:text-[var(--color-fg)]"
                    : ""
                }`}
              >
                <span className="min-w-0 flex-1 truncate">{name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export function TopBar({ collapsed }: { collapsed: boolean }) {
  return (
    <header className="hidden lg:flex fixed top-0 inset-x-0 z-50 h-12 items-center bg-white/95 dark:bg-[var(--color-panel)]/95 backdrop-blur">
      {/* Brand (width tracks sidebar) */}
      <div
        className={`flex items-center gap-2 h-full shrink-0 border-r border-neutral-200 dark:border-white/[0.06] transition-[width] duration-200 ${
          collapsed ? "w-16 justify-center px-0" : "w-56 px-4"
        }`}
      >
        <div className="flex shrink-0 items-baseline gap-1.5 min-w-0">
          <Link href="/" title="SaaS Template" className="flex items-center hover:opacity-80 transition-opacity">
            {collapsed ? (
              <span className="flex size-5 items-center justify-center rounded-md bg-[var(--color-coollabs)] text-[11px] font-bold text-white dark:text-black">
                S
              </span>
            ) : (
              <span className="text-[15px] font-semibold tracking-tight text-black dark:text-white">SaaS</span>
            )}
          </Link>
          {!collapsed && (
            <span className="text-[10.5px] font-medium text-neutral-400 dark:text-[var(--color-fg-faint)]">v0.1</span>
          )}
        </div>
      </div>

      {/* Breadcrumb + page switcher */}
      <div className="flex h-full items-center gap-0.5 min-w-0 flex-1 border-b border-neutral-200 pl-3 pr-4 dark:border-white/[0.06]">
        <div className="relative flex min-w-0 flex-1 items-center">
          <div className="flex min-w-0 items-center gap-0.5 text-[13px]">
            <TeamSwitcher />
            <PageBreadcrumb />
          </div>
        </div>
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
          href="/"
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