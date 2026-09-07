"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Server,
  AppWindow,
  Settings,
  User,
  Bell,
  AlertTriangle,
  Terminal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useSidebar } from "@/lib/sidebar-context";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Applications", href: "/applications", icon: AppWindow },
  { name: "Servers", href: "/dashboard", icon: Server },
  { name: "Terminal", href: "/dashboard", icon: Terminal },
];

const secondary = [
  { name: "Alerts", href: "/alerts", icon: AlertTriangle },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Settings", href: "/settings/general", icon: Settings },
  { name: "Profile", href: "/profile", icon: User },
];

export function Sidebar() {
  const { collapsed, toggle } = useSidebar();
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  }

  return (
    <div
      className={`hidden lg:flex lg:flex-col lg:fixed lg:top-12 lg:bottom-0 lg:left-0 lg:z-40 transition-[width] duration-200 ${
        collapsed ? "lg:w-16" : "lg:w-56"
      }`}
    >
      <div className="flex grow flex-col overflow-visible border-r border-white/[0.06] bg-[var(--background)]">
        <nav className="flex-1 overflow-y-auto scrollbar px-2 py-3">
          <div className="space-y-0.5">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-[var(--color-nav-active)] text-[var(--color-nav-active)]"
                      : "text-[var(--color-nav-text)] hover:bg-[var(--coollabs-fill)] hover:text-[var(--foreground)]"
                  } ${collapsed ? "justify-center px-2" : ""}`}
                  title={collapsed ? item.name : undefined}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              );
            })}
          </div>

          <div className="mt-6">
            {!collapsed && (
              <p className="px-3 mb-2 text-[11px] font-medium uppercase tracking-wider text-[var(--color-nav-muted)]">
                Management
              </p>
            )}
            <div className="space-y-0.5">
              {secondary.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "bg-[var(--color-nav-active)] text-[var(--color-nav-active)]"
                        : "text-[var(--color-nav-text)] hover:bg-[var(--coollabs-fill)] hover:text-[var(--foreground)]"
                    } ${collapsed ? "justify-center px-2" : ""}`}
                    title={collapsed ? item.name : undefined}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {!collapsed && <span>{item.name}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        <div className="border-t border-white/[0.06] p-2">
          <button
            onClick={toggle}
            className="flex w-full items-center justify-center rounded-lg p-2 text-[var(--color-nav-muted)] hover:bg-[var(--coollabs-fill)] hover:text-[var(--foreground)] transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
