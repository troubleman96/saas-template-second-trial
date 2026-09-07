"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  LayoutDashboard,
  AppWindow,
  Settings,
  User,
  Bell,
  AlertTriangle,
  Search,
} from "lucide-react";

const pages = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Applications", href: "/applications", icon: AppWindow },
  { name: "Settings", href: "/settings/general", icon: Settings },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Alerts", href: "/alerts", icon: AlertTriangle },
  { name: "Notifications", href: "/notifications", icon: Bell },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[20vh]">
      <div className="fixed inset-0 bg-black/50" onClick={() => setOpen(false)} />
      <Command className="relative w-full max-w-lg rounded-xl border border-[var(--coollabs-hairline)] bg-[var(--coollabs-elevated)] shadow-[var(--shadow-modal)] overflow-hidden">
        <div className="flex items-center gap-2 border-b border-[var(--coollabs-fill)] px-4">
          <Search className="h-4 w-4 text-[var(--coollabs-subtle)]" />
          <Command.Input
            placeholder="Type a command or search..."
            className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--coollabs-subtle)]"
          />
        </div>
        <Command.List className="max-h-64 overflow-y-auto p-2">
          <Command.Empty className="py-6 text-center text-sm text-[var(--coollabs-subtle)]">
            No results found.
          </Command.Empty>
          <Command.Group heading="Pages" className="[&>[cmdk-group-heading]]:px-2 [&>[cmdk-group-heading]]:py-1.5 [&>[cmdk-group-heading]]:text-xs [&>[cmdk-group-heading]]:font-medium [&>[cmdk-group-heading]]:text-[var(--coollabs-subtle)]">
            {pages.map((page) => {
              const Icon = page.icon;
              return (
                <Command.Item
                  key={page.href}
                  value={page.name}
                  onSelect={() => {
                    router.push(page.href);
                    setOpen(false);
                  }}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm cursor-pointer data-[selected=true]:bg-[var(--coollabs-fill)]"
                >
                  <Icon className="h-4 w-4 text-[var(--coollabs-subtle)]" />
                  {page.name}
                </Command.Item>
              );
            })}
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}
