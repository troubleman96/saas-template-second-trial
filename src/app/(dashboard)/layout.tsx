"use client";

import { useState, useEffect, useCallback } from "react";
import { TopBar, MobileTopBar } from "@/components/layout/topbar";
import { Sidebar } from "@/components/layout/sidebar";
import { CommandPalette } from "@/components/layout/command-palette";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [pageWidth, setPageWidth] = useState("full");

  useEffect(() => {
    const stored = localStorage.getItem("sidebarCollapsed");
    const width = localStorage.getItem("pageWidth");
    const onPageWidth = (e: Event) => setPageWidth((e as CustomEvent<string>).detail);
    window.addEventListener("page-width-changed", onPageWidth);
    requestAnimationFrame(() => {
      if (stored === "true") setCollapsed(true);
      if (width === "centered") setPageWidth("centered");
      setReady(true);
    });
    return () => window.removeEventListener("page-width-changed", onPageWidth);
  }, []);

  const toggleSidebar = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("sidebarCollapsed", String(next));
      return next;
    });
  }, []);

  return (
    <div className="dark:text-[var(--color-fg)] text-black min-h-screen">
      {/* Desktop top bar */}
      <TopBar collapsed={collapsed} />

      {/* Mobile slide-over sidebar */}
      {mobileOpen && (
        <div className="relative z-[1000] lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-black/80" onClick={() => setMobileOpen(false)} />
          <div className="fixed inset-y-0 right-0 flex h-full">
            <div className="relative flex h-full w-full max-w-56 min-w-0 flex-col border-l border-neutral-200 bg-white shadow-xl dark:border-white/[0.12] dark:bg-[var(--color-panel)]">
              <div className="absolute top-0 right-full flex w-16 justify-center pt-5">
                <button
                  type="button"
                  className="-m-2.5 p-2.5"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex h-12 shrink-0 items-center gap-1.5 border-b border-neutral-200 px-4 dark:border-white/[0.06]">
                <span className="text-[15px] font-semibold tracking-tight text-black dark:text-white">
                  SaaS
                </span>
              </div>
              <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto pb-2 scrollbar">
                <Sidebar collapsed={false} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div
        className={`hidden lg:fixed lg:top-12 lg:bottom-0 lg:left-0 lg:z-40 lg:flex lg:flex-col min-w-0 ${
          collapsed ? "lg:w-16" : "lg:w-56"
        } ${ready ? "transition-[width] duration-200" : ""}`}
      >
        <div className="flex grow min-w-0 flex-col overflow-visible">
          <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />
        </div>
      </div>

      {/* Mobile top bar */}
      <MobileTopBar onToggleSidebar={() => setMobileOpen(!mobileOpen)} />

      {/* Main content */}
      <main
        className={`min-h-screen bg-[var(--coollabs-canvas)] dark:bg-[var(--color-panel)] px-5 py-6 sm:px-8 lg:px-10 lg:pt-[calc(3rem+1.75rem)] lg:pb-10 ${
          collapsed ? "lg:ml-16" : "lg:ml-56"
        } ${ready ? "transition-[margin] duration-200" : ""}`}
      >
        <div className={`w-full ${pageWidth === "centered" ? "mx-auto max-w-[1400px]" : "max-w-none"}`}>
          {children}
        </div>
      </main>

      {/* Command palette */}
      <CommandPalette />
    </div>
  );
}