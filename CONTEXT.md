# Dashboard Template

A Next.js dashboard UI template adapted from Coolify's admin panel. Faithful to Coolify's layout and component structure, with its own color palette and typography. Designed as a forkable starting point for other projects.

## Language

**Dashboard Template**:
A reusable Next.js project providing admin panel UI (sidebar, top bar, pages, components) without business logic. Projects fork it and add their own data layer.
_Avoid_: Boilerplate, starter kit

**Graphite Design Language**:
Coolify's visual system built on layered neutral surfaces (oklch), translucent hairlines, and a single accent color. The surface ladder goes from canvas (darkest) → elevated → recessed → base → fill → line.
_Aavoid_: Material design, flat design

**Surface Ladder**:
The hierarchy of background colors from darkest (canvas) to lightest (fill). Each layer is slightly lighter than the one below, creating depth without drop shadows.
_Avoid_: Color palette, theme colors

**Layer Card**:
A settings/content card pattern with an elevated shell (header strip) and a nested rounded panel (body) with base background + fill ring border. Used for all settings sections.
_Avoid_: Settings card, content block

**Resource**:
Any manageable entity in the dashboard (application, server, database, service). Resources have a list view, detail view, status, and actions.
_Avoid_: Item, entry, record

**Resource Status**:
The health/state of a resource: Running, Stopped, Failed, Degraded, Deploying. Shown as colored status badges.
_Avoid_: Health, state, condition

**Notification Center**:
A bell-icon dropdown in the top bar showing persistent notifications with read/unread state. Separate from toast feedback.
_Aavoid_: Alert panel, message center

**Toast**:
Transient feedback popups (success, error, info) that auto-dismiss. Used for immediate action feedback.
_Avoid_: Snackbar, flash message

**Banner Alert**:
A full-width inline warning/error displayed at the top of a page. Used for system-wide notices (trial expiry, maintenance window).
_Avoid_: Inline alert, top banner

**Command Palette**:
A ⌘K overlay for quick navigation, search, and actions. Built with cmdk.
_Aavoid_: Quick search, spotlight

**Settings Sidebar**:
A sticky vertical navigation on the left side of settings pages. Scrolls independently, highlights the active section.
_Avoid_: Settings nav, sidebar menu

**Collapsible Sidebar**:
The main navigation sidebar that toggles between expanded (14rem) and collapsed (4rem) states. Persists preference in localStorage.
_Aavoid_: Navigation panel, side nav

**Terminal Placeholder**:
A UI shell mimicking a terminal (header, theme selector, fullscreen toggle) without real SSH/WebSocket connection. Shows the visual pattern only.
_Aavoid_: Console, SSH client

**Mock Data**:
Hardcoded JSON data used in place of a real API. Allows UI development without backend coupling. Swapped per-project.
_Aavoid_: Fake data, seed data

**Auth Shell**:
The visual wrapper for authentication pages: radial gradient background, centered card with heading, form body, and footer link.
_Avoid_: Login page, auth page
