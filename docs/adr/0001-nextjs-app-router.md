# 0001-nextjs-app-router

Next.js App Router with React Server Components as the default rendering strategy. Client components only where interactivity requires hydration (sidebar toggle, command palette, forms, toasts).

Server components reduce bundle size and align with Coolify's server-first approach (Livewire). Client boundary is drawn at `"use client"` per-component, not per-page.
