# Design

A Coolify-style admin panel for SaaS projects. Faithful to Coolify's layout, component structure, and Graphite visual system — with its own accent and typography.

## Design Language

**Graphite** — Coolify's visual system: layered neutral surfaces (`oklch`), translucent hairlines, and a single accent color. Depth comes from a surface ladder, never drop shadows.

## Surface Ladder

Each layer is slightly lighter than the one below it in light mode and slightly lighter than the one above in dark mode.

| Token                  | Light                 | Dark                 | Used for                          |
| ---------------------- | --------------------- | -------------------- | --------------------------------- |
| `--color-canvas`       | `oklch(98.75% 0 0)`   | `oklch(10% 0 0)`     | App background                    |
| `--color-elevated`     | `oklch(98% 0 0)`      | `oklch(15% 0 0)`     | Popovers, dropdowns, modals       |
| `--color-base`         | `#ffffff`             | `oklch(17% 0 0)`     | Cards, sidebars                   |
| `--color-fill`         | `oklch(92.2% 0 0)`    | `oklch(26.9% 0 0)`   | Inputs, fills, hover fills        |
| `--color-line`         | `oklch(14.5% 0 0/10%)`| `oklch(32% 0 0)`     | Strong borders                    |
| `--color-hairline`     | `oklch(93.5% 0 0)`    | `oklch(26.9% 0 0)`   | Translucent element borders       |
| `--color-raised`       | `oklch(94% 0 0)`      | `oklch(20% 0 0)`     | Hover / active states             |

## Accent & Theme

- Single accent: **coolLabs purple** `#6b16ed` in light mode, **yellow** `#fcd452` in dark mode (token `--color-coollabs`).
- Theme modes: `light`, `system`, `dark`, `custom`. `custom` overrides `--color-coollabs` with the user-chosen color via an inline `--color-coollabs` on `<html>`.
- Switched from the **Appearance** submenu in the account menu (sidebar footer or mobile top bar).
- Page width: `full` (default) or `centered` (`max-w-[1400px]`), persisted in `localStorage["pageWidth"]` and broadcast via the `page-width-changed` window event.

## Navigation

Sidebar sections replicate Coolify's `navbar.blade.php` exactly and live in `src/components/layout/sidebar.tsx`:

- **Workspace** — Dashboard, Projects, Terminal
- **Infrastructure** — Servers, Sources, Destinations, S3 Storage, Shared Variables
- **Manage** — Team, Notifications, Keys & Tokens, Subscription, Tags, Settings

Behavior:

- Collapsible: `14rem` expanded, `4rem` collapsed; persists in `localStorage["sidebarCollapsed"]`.
- Section headers hide when collapsed; items become icon-only.
- **Account menu** sits at the sidebar's bottom edge (next to the collapse toggle) on desktop — matching Coolify. On mobile it lives in the top bar.
- **Search pill** with a platform-aware shortcut (`⌘K` on macOS, `Ctrl+K` otherwise) opens the command palette.
- Hover states: `rgba(0,0,0,.04)` light / `rgba(255,255,255,.05)` dark. Active item: `rgba(0,0,0,.05)` / `rgba(255,255,255,.06)`.

## Top Bar

- Fixed `h-12` sticky header; brand block width tracks the sidebar.
- Brand: wordmark + version badge when expanded, mark only when collapsed.
- Breadcrumb (matches `top-breadcrumb.blade.php`): **team switcher** dropdown, `/`, then a **page switcher** — the current page label opens a "Pages" dropdown listing every nav destination.
- Desktop header carries **no account menu**; the account menu is in the sidebar footer.

## Core Components

- **Layer Card** — settings/content pattern: elevated shell with a header strip wrapping a nested rounded panel (`--color-base` background, `--color-fill` ring border). All settings sections use it.
- **Resource Status Badges** — Running (green), Stopped (neutral), Deploying (amber), Degraded (amber), Failed (red). Applied via `.status-running`, `.status-stopped`, etc.
- **Banner Alert** — full-width inline warning at the top of a page (trial expiry, maintenance).
- **Notification Center** — bell dropdown with read/unread state, distinct from toast feedback.
- **Toast** — transient popups via `sonner` (`/alerts` page demo).
- **Command Palette** — `cmdk`-based `⌘K` overlay; opened from the sidebar search pill via the `open-command-palette` window event.
- **Auth Shell** — radial gradient backdrop using the accent color, centered card with heading, form, footer link.
- **Terminal Placeholder** — terminal chrome (header, theme selector, fullscreen toggle) with no real SSH/WebSocket connection.

## Layout

- Desktop: fixed top bar (`lg:fixed`) + fixed sidebar below it (`lg:top-12`), main offsets `lg:ml-16` / `lg:ml-56`, content padding `px-5/8/10 py-6`, top padding `lg:pt-[calc(3rem+1.75rem)]`.
- Mobile: sticky top bar with account menu + hamburger; the sidebar opens as a right-hand slide-over drawer with a close affordance.
- Class pattern for settings pages: `mt-8 flex w-full max-w-none flex-col gap-6 lg:mt-3`.

## Conventions

- All pages are client components (`"use client"`).
- React 19 is strict about DOM props: custom variants use **`data-highlighted`** (never `isHighlighted`), and clicks outside are handled with `useRef` + `mousedown` listeners, never a custom `onClickOutside` prop.
- Accent/primary buttons and links: `button[data-highlighted]` / `[data-highlighted]`.
- State setters that read `localStorage` on mount run inside `requestAnimationFrame` to satisfy React 19's `set-state-in-effect` rule.
- Mock data lives in `src/lib/mock-data/index.ts` and is swapped per-project.
- Do not add custom props to native elements; add CSS + a wrapper or `data-*` attribute instead.

## File Map

```
src/components/layout/
  sidebar.tsx        # nav sections, search pill, footer (account menu + toggle)
  topbar.tsx         # brand, team switcher, page switcher breadcrumb, mobile top bar
  user-menu.tsx      # account menu + shared dropdown primitives (useOutside, ChevronIcon)
  command-palette.tsx# ⌘K overlay (cmdk)
src/app/globals.css  # Graphite tokens, menu/listbox/input/status utilities
src/lib/mock-data/   # all mock entities
```