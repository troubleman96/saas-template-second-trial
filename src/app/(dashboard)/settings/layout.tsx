"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Settings,
  Users,
  Shield,
  Bell,
  Globe,
  Key,
  Palette,
} from "lucide-react";

type SettingsItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  sectionStart?: boolean;
};

const settingsItems: SettingsItem[] = [
  { label: "General", href: "/settings/general", icon: <Settings className="menu-item-icon" /> },
  { label: "Users & Teams", href: "/settings/users", icon: <Users className="menu-item-icon" /> },
  { label: "Security", href: "/settings/security", icon: <Shield className="menu-item-icon" /> },
  { label: "Notifications", href: "/settings/notifications", icon: <Bell className="menu-item-icon" /> },
  { label: "Appearance", href: "/settings/appearance", icon: <Palette className="menu-item-icon" /> },
  { label: "Domains", href: "/settings/domains", icon: <Globe className="menu-item-icon" /> },
  { label: "API Tokens", href: "/settings/tokens", icon: <Key className="menu-item-icon" /> },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <section className="application-settings-workspace w-full max-w-none">
      <header className="settings-mobile-header xl:hidden">
        <h1 className="settings-mobile-title">Settings</h1>
        <p className="settings-mobile-description">Manage your account and application preferences.</p>
      </header>

      <div className="grid min-w-0 gap-8 xl:grid-cols-[210px_minmax(0,1fr)] xl:gap-8">
        <aside className="application-settings-navigation min-w-0 xl:self-start">
          <nav
            aria-label="Settings"
            className="grid grid-cols-2 gap-0.5 border-y border-neutral-200 py-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-1 xl:border-y-0 xl:py-0 dark:border-white/[0.06]"
          >
            <div className="nav-section hidden xl:block">Settings</div>
            {settingsItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`menu-item ${pathname === item.href ? "menu-item-active" : ""}`}
              >
                {item.icon}
                <span className="menu-item-label">{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        <div className="min-w-0">
          {children}
        </div>
      </div>
    </section>
  );
}
