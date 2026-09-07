"use client";

import { useState } from "react";
import { ChevronDown, Maximize2, Minimize2, Layers } from "lucide-react";

const consoleThemes = [
  { id: "system", label: "System", bg: "#121214" },
  { id: "shadows-midnight", label: "Midnight", bg: "#2a3b4c" },
  { id: "shadows-cosmic-purple", label: "Cosmic Purple", bg: "#5d3e66" },
  { id: "shadows-neon-glow", label: "Neon Glow", bg: "#f300a6" },
  { id: "shadows-golden-hour", label: "Golden Hour", bg: "#d58a42" },
  { id: "shadows-tropical-storm", label: "Tropical Storm", bg: "#00b894" },
];

export function TerminalPlaceholder() {
  const [fullscreen, setFullscreen] = useState(false);
  const [theme, setTheme] = useState(consoleThemes[0]);
  const [themeOpen, setThemeOpen] = useState(false);

  const mockLines = [
    "$ coolify deploy web-app",
    "⏳ Checking git repository...",
    "✅ Repository found on branch main",
    "📦 Building Docker image...",
    "  • Installing dependencies",
    "  • Compiling assets",
    "  • Running tests",
    "✅ Build successful",
    "🚀 Deploying to production...",
    "  • Starting container",
    "  • Health check passed",
    "🎉 Deployment complete in 2m 34s",
    "",
    "$ _",
  ];

  return (
    <div className={`rounded-xl border border-white/[0.08] overflow-hidden ${fullscreen ? "fixed inset-0 z-[9999] rounded-none" : ""}`}
      style={{ background: "linear-gradient(135deg, " + theme.bg + ", rgba(0,0,0,0.4))" }}>
      {/* Terminal header */}
      <div className="flex items-center justify-between px-4 py-2 bg-black/25 backdrop-blur border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span className="h-3 w-3 rounded-full bg-yellow-500" />
            <span className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <span className="ml-2 text-xs font-medium text-white/75">web-app — Session</span>
        </div>
        <div className="flex items-center gap-1 relative">
          <button
            onClick={() => setThemeOpen(!themeOpen)}
            className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-white/75 hover:bg-white/10 transition-colors"
          >
            <Layers className="h-3.5 w-3.5" />
            {theme.label}
            <ChevronDown className="h-3 w-3" />
          </button>
          {themeOpen && (
            <div className="absolute right-0 top-full mt-1 w-44 rounded-lg border border-white/10 bg-black/90 backdrop-blur p-1 z-50">
              {consoleThemes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t);
                    setThemeOpen(false);
                  }}
                  className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs ${t.id === theme.id ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5"}`}
                >
                  <span className="h-3 w-3 rounded-full border border-white/20" style={{ background: t.bg }} />
                  {t.label}
                </button>
              ))}
            </div>
          )}
          <button
            onClick={() => setFullscreen(!fullscreen)}
            className="rounded-md p-1.5 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
          >
            {fullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Terminal body */}
      <div className="p-4 font-mono text-xs leading-relaxed text-white/90">
        {mockLines.map((line, i) => (
          <p key={i} className={line.startsWith("✅") || line.includes("🎉") ? "text-green-400" : line.startsWith("❌") ? "text-red-400" : line.startsWith("⏳") ? "text-yellow-300" : ""}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
