# 0003-mock-data-first

All page data comes from hardcoded JSON/TypeScript files under `lib/mock-data/`. No API routes, no database, no backend coupling. Projects fork the template and replace mock imports with real data fetching (server components, API routes, tRPC, etc.) per their needs.

This decouples UI development from backend choices and makes the template immediately runnable without infrastructure.
