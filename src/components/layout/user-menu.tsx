"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LogOut } from "lucide-react";

export function useOutside(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose]);
  return ref;
}

export function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`size-4 shrink-0 text-neutral-400 dark:text-[var(--color-fg-faint)] transition-transform ${
        open ? "rotate-180" : ""
      }`}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path d="M8 9l4-4 4 4M8 15l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg
      className="size-3.5 text-[var(--color-coollabs)] dark:text-[var(--color-warning)]"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path d="m2.5 6.25 2.1 2.1 4.9-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const themeOptions = [
  { value: "light", label: "Light" },
  { value: "system", label: "System" },
  { value: "dark", label: "Dark" },
  { value: "custom", label: "Custom" },
];

const widthOptions = [
  { value: "full", label: "Full width" },
  { value: "centered", label: "Centered" },
];

function UserIcon() {
  return (
    <svg className="size-4 opacity-80" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 0c-3.3 0-6 2.2-6 5v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1c0-2.8-2.7-5-6-5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg className="size-4 opacity-80" viewBox="0 0 24 24" fill="none">
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DocsIcon() {
  return (
    <svg className="size-4 opacity-80" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4a1 1 0 0 0-1-1H6.5A2.5 2.5 0 0 0 4 5.5v14Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21s-7.5-4.7-9.75-9A5.25 5.25 0 0 1 12 6.75 5.25 5.25 0 0 1 21.75 12c-2.25 4.3-9.75 9-9.75 9Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="size-4 opacity-80" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TopUserMenu({
  sidebar = false,
  collapsed = false,
}: {
  sidebar?: boolean;
  collapsed?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [appearanceOpen, setAppearanceOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [themeColor, setThemeColor] = useState("#6b16ed");
  const [pageWidth, setPageWidth] = useState("full");
  const ref = useOutside(open, () => {
    setOpen(false);
    setAppearanceOpen(false);
  });

  useEffect(() => {
    requestAnimationFrame(() => {
      setTheme(localStorage.getItem("theme") === "purple" ? "custom" : (localStorage.getItem("theme") || "dark"));
      setPageWidth(localStorage.getItem("pageWidth") || "full");
      setThemeColor(localStorage.getItem("themeColor") || "#6b16ed");
    });
  }, []);

  const applyTheme = (type: string) => {
    setTheme(type);
    localStorage.setItem("theme", type);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = type === "dark" || type === "custom" || (type === "system" && prefersDark);
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.setAttribute("data-theme", type === "custom" ? "custom" : isDark ? "dark" : "light");
    if (type === "custom") {
      document.documentElement.style.setProperty("--color-coollabs", themeColor);
    } else {
      document.documentElement.style.removeProperty("--color-coollabs");
    }
  };

  const setWidth = (width: string) => {
    setPageWidth(width);
    localStorage.setItem("pageWidth", width);
    window.dispatchEvent(new CustomEvent("page-width-changed", { detail: width }));
  };

  const previewThemeColor = (color: string) => {
    setThemeColor(color);
    if (theme !== "custom") {
      setTheme("custom");
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "custom");
    }
    requestAnimationFrame(() => {
      document.documentElement.style.setProperty("--color-coollabs", color);
    });
  };

  const saveThemeColor = (color: string) => {
    previewThemeColor(color);
    localStorage.setItem("themeColor", color);
    localStorage.setItem("theme", "custom");
    setTheme("custom");
  };

  const closePanel = () => {
    setOpen(false);
    setAppearanceOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        title="Emmanuel"
        aria-label="Account menu for Emmanuel"
        className={`flex h-8 items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-100 px-2 shadow-sm transition-colors hover:bg-neutral-200 dark:border-white/[0.08] dark:bg-white/[0.06] dark:hover:bg-white/[0.1] ${
          collapsed && "w-8 justify-center px-0"
        } ${sidebar ? "max-w-36" : ""}`}
      >
        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-[11px] font-semibold text-neutral-700 dark:bg-white/[0.1] dark:text-[var(--color-fg)]">
          E
        </span>
        {sidebar && (
          <span className={`min-w-0 truncate text-xs font-medium ${collapsed && "hidden"}`}>Emmanuel</span>
        )}
        {!collapsed && <ChevronIcon open={open} />}
      </button>

      {open && (
        <div
          className={`top-user-menu-panel listbox-panel z-[90] max-h-none min-w-0 overflow-visible ${
            sidebar
              ? "bottom-full left-0 right-auto top-auto mb-1 origin-bottom-left"
              : "right-0 left-auto top-full mt-1 origin-top-right"
          }`}
        >
          <div className="min-w-0 px-2 py-1.5">
            <div className="truncate text-[13px] font-semibold text-black dark:text-[var(--color-fg)]">
              Emmanuel Lugenge
            </div>
            <div className="truncate text-[11px] text-neutral-500 dark:text-[var(--color-fg-faint)]">
              itslugenge@gmail.com
            </div>
          </div>
          <div className="my-1 h-px bg-neutral-200 dark:bg-white/[0.07]" />

          <Link href="/profile" className="listbox-option w-full" onClick={closePanel}>
            <span className="flex items-center gap-2 min-w-0 flex-1">
              <UserIcon />
              Profile
            </span>
          </Link>

          <button
            type="button"
            className="listbox-option w-full"
            aria-expanded={appearanceOpen}
            onClick={() => setAppearanceOpen(!appearanceOpen)}
          >
            <span className="flex items-center gap-2 min-w-0 flex-1">
              <SettingsIcon />
              Appearance
            </span>
            <ChevronIcon open={appearanceOpen} />
          </button>
          {appearanceOpen && (
            <div className="mx-1 grid gap-0.5 pb-1 pl-6">
              {themeOptions.map((option) =>
                option.value === "custom" ? (
                  <div
                    key={option.value}
                    className="relative flex h-8 w-full items-center justify-between rounded-md px-2 text-left text-xs text-neutral-600 transition-colors hover:bg-neutral-200 hover:text-neutral-950 dark:text-[var(--color-fg-dim)] dark:hover:bg-white/[0.06] dark:hover:text-[var(--color-fg)]"
                  >
                    <span className="flex items-center gap-2">
                      <span className="size-3.5 rounded-full border border-white/20" style={{ background: themeColor }} />
                      Custom
                    </span>
                    {theme === "custom" && <CheckIcon />}
                    <input
                      type="color"
                      value={themeColor}
                      onChange={(e) => previewThemeColor(e.target.value)}
                      onBlur={(e) => saveThemeColor(e.target.value)}
                      aria-label="Custom theme color"
                      className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                    />
                  </div>
                ) : (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => applyTheme(option.value)}
                    className="flex h-8 w-full items-center justify-between rounded-md px-2 text-left text-xs text-neutral-600 transition-colors hover:bg-neutral-200 hover:text-neutral-950 dark:text-[var(--color-fg-dim)] dark:hover:bg-white/[0.06] dark:hover:text-[var(--color-fg)]"
                  >
                    <span>{option.label}</span>
                    {theme === option.value && <CheckIcon />}
                  </button>
                )
              )}
              <div className="my-1 h-px bg-neutral-200 dark:bg-white/[0.07]" />
              <div className="px-2 pt-1 pb-0.5 text-[10px] font-medium tracking-wide text-neutral-400 uppercase dark:text-[var(--color-fg-faint)]">
                Page width
              </div>
              {widthOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setWidth(option.value)}
                  className="flex h-8 w-full items-center justify-between rounded-md px-2 text-left text-xs text-neutral-600 transition-colors hover:bg-neutral-200 hover:text-neutral-950 dark:text-[var(--color-fg-dim)] dark:hover:bg-white/[0.06] dark:hover:text-[var(--color-fg)]"
                >
                  <span>{option.label}</span>
                  {pageWidth === option.value && <CheckIcon />}
                </button>
              ))}
            </div>
          )}

          <div className="my-1 h-px bg-neutral-200 dark:bg-white/[0.07]" />

          <a href="https://coolify.io/docs" target="_blank" rel="noopener noreferrer" className="listbox-option w-full">
            <span className="flex items-center gap-2 min-w-0 flex-1">
              <DocsIcon />
              Documentation
            </span>
          </a>
          <a href="https://coolify.io/sponsorships" target="_blank" rel="noopener noreferrer" className="listbox-option w-full">
            <span className="flex items-center gap-2 min-w-0 flex-1 text-pink-500">
              <HeartIcon />
              Sponsor us
            </span>
          </a>
          <Link href="/" className="listbox-option w-full" onClick={closePanel}>
            <span className="flex items-center gap-2 min-w-0 flex-1">
              <MailIcon />
              Feedback
            </span>
          </Link>

          <div className="my-1 h-px bg-neutral-200 dark:bg-white/[0.07]" />

          <button type="button" className="listbox-option w-full text-left text-[var(--color-error)]" onClick={closePanel}>
            <span className="flex items-center gap-2 min-w-0 flex-1">
              <LogOut className="size-4 opacity-90" />
              Log out
            </span>
          </button>
        </div>
      )}
    </div>
  );
}