"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings, Users, Shield, Bell, Globe, Key } from "lucide-react";

const sections = [
  { name: "General", href: "/settings/general", icon: Settings },
  { name: "Users & Teams", href: "/settings/users", icon: Users },
  { name: "Security", href: "/settings/users", icon: Shield },
  { name: "Notifications", href: "/settings/users", icon: Bell },
  { name: "Domains", href: "/settings/users", icon: Globe },
  { name: "API Tokens", href: "/settings/users", icon: Key },
];

export function SettingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-[var(--coollabs-subtle)]">
          Manage your account and workspace settings.
        </p>
      </div>

      <div className="server-settings-workspace flex flex-col gap-6 xl:flex-row">
        <aside className="shrink-0 w-full xl:w-48 xl:sticky xl:top-[calc(3rem+1.75rem)] xl:self-start xl:max-h-[calc(100dvh-5.5rem)] xl:overflow-y-auto xl:overflow-x-hidden xl:overscroll-contain xl:pr-1.5 scrollbar">
          <nav className="space-y-0.5">
            {sections.map((section) => {
              const Icon = section.icon;
              const active = pathname === section.href;
              return (
                <Link
                  key={section.href}
                  href={section.href}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-[var(--coollabs-fill)] text-[var(--foreground)]"
                      : "text-[var(--color-nav-text)] hover:bg-[var(--coollabs-recessed)] hover:text-[var(--foreground)]"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {section.name}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
