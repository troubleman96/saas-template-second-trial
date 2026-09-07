"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TopUserMenu } from "./user-menu";
import {
  LayoutDashboard,
  FolderGit2,
  Terminal,
  Server,
  Cloud,
  Database,
  Archive,
  Lock,
  Users,
  Bell,
  Key,
  Tag,
  Settings,
  Search,
  CreditCard,
} from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

const sections: NavSection[] = [
  {
    title: "Workspace",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="menu-item-icon" /> },
      { label: "Projects", href: "/projects", icon: <FolderGit2 className="menu-item-icon" /> },
      { label: "Terminal", href: "/terminal", icon: <Terminal className="menu-item-icon" /> },
    ],
  },
  {
    title: "Infrastructure",
    items: [
      { label: "Servers", href: "/servers", icon: <Server className="menu-item-icon" /> },
      { label: "Sources", href: "/sources", icon: <Cloud className="menu-item-icon" /> },
      { label: "Destinations", href: "/destinations", icon: <Database className="menu-item-icon" /> },
      { label: "S3 Storage", href: "/storages", icon: <Archive className="menu-item-icon" /> },
      { label: "Shared Variables", href: "/variables", icon: <Lock className="menu-item-icon" /> },
    ],
  },
  {
    title: "Manage",
    items: [
      { label: "Team", href: "/team", icon: <Users className="menu-item-icon" /> },
      { label: "Notifications", href: "/notifications", icon: <Bell className="menu-item-icon" /> },
      { label: "Keys & Tokens", href: "/security", icon: <Key className="menu-item-icon" /> },
      { label: "Subscription", href: "/subscription", icon: <CreditCard className="menu-item-icon" /> },
      { label: "Tags", href: "/tags", icon: <Tag className="menu-item-icon" /> },
      { label: "Settings", href: "/settings/general", icon: <Settings className="menu-item-icon" /> },
    ],
  },
];

const NAV_PAGES: string[] = [
  "Dashboard",
  "Projects",
  "Terminal",
  "Servers",
  "Sources",
  "Destinations",
  "S3 Storage",
  "Shared Variables",
  "Team",
  "Notifications",
  "Keys & Tokens",
  "Tags",
  "Settings",
];

const modKeyLabel = (() => {
  if (typeof navigator === "undefined") return "Ctrl+";
  return /Mac|iPhone|iPad|iPod/i.test(navigator.platform || "") ||
    /Mac OS X|Macintosh/i.test(navigator.userAgent || "")
    ? "⌘"
    : "Ctrl+";
})();

function SearchItem({ collapsed }: { collapsed: boolean }) {
  return (
    <button
      type="button"
      onClick={() => document.dispatchEvent(new CustomEvent("open-command-palette"))}
      title={`Search (Press / or ${modKeyLabel}K)`}
      className={`menu-item justify-between !bg-neutral-100 dark:!bg-white/[0.04] hover:!bg-neutral-200 dark:hover:!bg-white/[0.07] !text-[var(--color-fg-faint)] ${
        collapsed ? "lg:w-8 lg:justify-center lg:px-0" : ""
      }`}
    >
      <span className="flex items-center gap-2.5 min-w-0">
        <Search className="menu-item-icon" />
        {!collapsed && <span className="menu-item-label">Search</span>}
      </span>
      {!collapsed && (
        <kbd className="px-1.5 py-0.5 text-[11px] font-medium text-[var(--color-fg-faint)] bg-neutral-200 dark:bg-white/[0.06] rounded-md border border-transparent dark:border-white/5">
          {modKeyLabel}K
        </kbd>
      )}
    </button>
  );
}

export function SidebarFooterContent({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  return (
    <>
      <TopUserMenu sidebar collapsed={collapsed} />
      <button
        type="button"
        title="Toggle sidebar"
        aria-label="Toggle sidebar"
        className="menu-item w-8 shrink-0 justify-center px-0"
        onClick={onToggle}
      >
        <svg className="menu-item-icon" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M9 4v16" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </button>
    </>
  );
}

export function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle?: (next: boolean) => void }) {
  const pathname = usePathname();

  const toggle = () => {
    const next = !collapsed;
    localStorage.setItem("sidebarCollapsed", String(next));
    onToggle?.(next);
  };

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard" || pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className={`flex flex-1 flex-col bg-white border-r border-neutral-200 pt-2 dark:border-white/[0.06] dark:bg-[var(--color-panel)] overflow-hidden px-2 lg:px-3`}>
      {/* Search */}
      <div className={`px-1 pb-3 ${collapsed && "lg:flex lg:justify-center"}`}>
        <SearchItem collapsed={collapsed} />
      </div>

      {/* Navigation */}
      <ul className="-mx-1 flex min-h-0 flex-1 flex-col gap-y-0.5 overflow-y-auto px-1 pb-2 scrollbar">
        {sections.map((section) => (
          <li key={section.title}>
            <div className={`nav-section mt-3 first:mt-0 ${collapsed && "lg:hidden"}`}>
              {section.title}
            </div>
            {section.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`menu-item ${collapsed && "lg:justify-center lg:px-0"} ${
                    isActive(item.href) ? "menu-item-active" : ""
                  }`}
                  title={item.label}
                >
                  {item.icon}
                  <span className={`menu-item-label ${collapsed && "lg:hidden"}`}>
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </li>
        ))}
        <li className="flex-1" aria-hidden="true" />
      </ul>

      {/* Sidebar footer */}
      <div
        className={`sticky bottom-0 mt-auto -mx-2 hidden items-center gap-1 bg-white px-2 py-2 dark:bg-[var(--color-panel)] lg:-mx-3 lg:flex lg:px-3 ${
          collapsed ? "flex-col-reverse justify-center" : "justify-between"
        }`}
      >
        <SidebarFooterContent collapsed={collapsed} onToggle={toggle} />
      </div>
    </nav>
  );
}

export { type NavItem, type NavSection, sections, NAV_PAGES };