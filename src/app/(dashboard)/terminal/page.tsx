"use client";

import { TerminalPlaceholder } from "@/components/terminal/terminal-placeholder";

export default function TerminalPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-black dark:text-[var(--color-fg)]">Terminal</h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-[var(--color-fg-dim)]">
          Run commands and deploy resources directly from the browser.
        </p>
      </div>

      <section className="application-settings-section">
        <div className="application-settings-section-header">
          <div>
            <h2>Web terminal</h2>
            <p>A mock terminal interface — wire it to your WebSocket or SSH session.</p>
          </div>
        </div>
        <div className="application-settings-section-body">
          <TerminalPlaceholder />
        </div>
      </section>
    </div>
  );
}