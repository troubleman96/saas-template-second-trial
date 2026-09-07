"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";

type Theme = "light" | "dark" | "system";

export default function AppearancePage() {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [pageWidth, setPageWidth] = useState<"full" | "centered">("full");
  const [themeColor, setThemeColor] = useState("#6b16ed");

  const applyTheme = (type: Theme, color: string) => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = type === "dark" || (type === "system" && prefersDark);
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.classList.toggle("light", !isDark);
    document.documentElement.style.setProperty("--theme-base-color", color);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", isDark ? "#101010" : "#ffffff");
  };

  useEffect(() => {
    const stored = (localStorage.getItem("theme") as Theme) || "dark";
    const storedWidth = (localStorage.getItem("pageWidth") as "full" | "centered") || "full";
    const storedColor = localStorage.getItem("themeColor") || "#6b16ed";
    requestAnimationFrame(() => {
      setThemeState(stored);
      setPageWidth(storedWidth);
      setThemeColor(storedColor);
      applyTheme(stored, storedColor);
    });
  }, []);

  const setTheme = (type: Theme) => {
    setThemeState(type);
    localStorage.setItem("theme", type);
    applyTheme(type, themeColor);
  };

  const setWidth = (width: "full" | "centered") => {
    setPageWidth(width);
    localStorage.setItem("pageWidth", width);
  };

  const setCustomColor = (color: string) => {
    setThemeColor(color);
    localStorage.setItem("themeColor", color);
    applyTheme("dark", color);
  };

  const themes: { value: Theme; label: string; description: string; preview: string }[] = [
    {
      value: "light",
      label: "Light",
      description: "Bright surfaces and dark text.",
      preview: "bg-white",
    },
    {
      value: "system",
      label: "System",
      description: "Follow your operating system.",
      preview: "bg-gradient-to-r from-white via-neutral-400 to-[#050505]",
    },
    {
      value: "dark",
      label: "Dark",
      description: "Dark surfaces and soft contrast.",
      preview: "bg-[#181818]",
    },
  ];

  return (
    <div className="mt-8 flex w-full max-w-none flex-col gap-6 lg:mt-3">
      {/* Color theme */}
      <section className="application-settings-section">
        <div className="application-settings-section-header">
          <div>
            <h2>Color theme</h2>
            <p>Choose the color scheme used in this browser.</p>
          </div>
        </div>
        <div className="application-settings-section-body grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {themes.map((option) => (
            <div
              key={option.value}
              role="button"
              tabIndex={0}
              onClick={() => setTheme(option.value)}
              onKeyDown={(e) => e.key === "Enter" && setTheme(option.value)}
              className={`theme-card ${
                theme === option.value ? "theme-card-active" : ""
              }`}
            >
              <div className={`theme-card-preview ${option.preview}`}>
                <div className="flex h-full items-center justify-center">
                  <div className="h-8 w-20 rounded-md border border-black/10 bg-neutral-100/80 shadow-sm dark:border-white/10 dark:bg-black/20" />
                </div>
              </div>
              <div className="theme-card-body">
                <div className="theme-card-label">
                  <span>{option.label}</span>
                  {theme === option.value && (
                    <Check className="size-4 text-[var(--color-accent)]" />
                  )}
                </div>
                <p className="theme-card-description">{option.description}</p>
              </div>
            </div>
          ))}

          {/* Custom */}
          <div
            role="button"
            tabIndex={0}
            className={`theme-card ${theme === "dark" ? "theme-card-active" : ""}`}
          >
            <div
              className="theme-card-preview"
              style={{ background: `color-mix(in oklab, ${themeColor} 28%, #101011)` }}
            >
              <div className="flex h-full items-center justify-center">
                <div className="h-10 w-20 rounded-md border border-white/15 p-1 shadow-sm">
                  <div className="h-full w-full rounded-sm" style={{ background: themeColor }} />
                </div>
              </div>
            </div>
            <div className="theme-card-body">
              <div className="theme-card-label">
                <span className="flex items-center gap-2">
                  <span
                    className="size-3.5 rounded-full border border-white/20"
                    style={{ background: themeColor }}
                  />
                  Custom
                </span>
                {theme === "dark" && (
                  <Check className="size-4 text-[var(--color-accent)]" />
                )}
              </div>
              <p className="theme-card-description">Choose any color for dark surfaces.</p>
            </div>
            <input
              type="color"
              value={themeColor}
              onChange={(e) => setCustomColor(e.target.value)}
              aria-label="Custom theme color"
              className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
            />
          </div>
        </div>
      </section>

      {/* Page width */}
      <section className="application-settings-section">
        <div className="application-settings-section-header">
          <div>
            <h2>Page width</h2>
            <p>Choose how content uses the available browser width.</p>
          </div>
        </div>
        <div className="application-settings-section-body grid gap-3 sm:grid-cols-2">
          {[
            { value: "full" as const, label: "Full width", description: "Use all available space for page content." },
            { value: "centered" as const, label: "Centered", description: "Keep content centered at a comfortable maximum width." },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setWidth(option.value)}
              className={`theme-card ${pageWidth === option.value ? "theme-card-active" : ""}`}
            >
              <div className="flex h-20 items-center border-b border-neutral-200 bg-neutral-50 px-4 dark:border-white/[0.07] dark:bg-black/15">
                <div className="flex h-11 w-full gap-1.5 rounded-md border border-neutral-300 bg-white p-1.5 dark:border-white/15 dark:bg-[#181818]">
                  <div className="w-3 shrink-0 rounded-sm bg-neutral-200 dark:bg-white/10" />
                  <div
                    className={`h-full rounded-sm bg-neutral-200 dark:bg-white/10 ${
                      option.value === "full" ? "w-full" : "mx-auto w-2/3"
                    }`}
                  />
                </div>
              </div>
              <div className="theme-card-body">
                <div className="theme-card-label">
                  <span>{option.label}</span>
                  {pageWidth === option.value && (
                    <Check className="size-4 text-[var(--color-accent)]" />
                  )}
                </div>
                <p className="theme-card-description">{option.description}</p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
