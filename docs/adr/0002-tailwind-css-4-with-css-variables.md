# 0002-tailwind-css-4-with-css-variables

Tailwind CSS 4 for utility-first styling. Theme tokens expressed as CSS custom properties (oklch for surfaces, hex for accents) in a global stylesheet. Dark mode via `next-themes` toggling a `.dark` class that swaps the variable set.

Chosen over component libraries (shadcn, Mantine) to stay faithful to Coolify's approach: raw Tailwind utilities composed with a thin layer of component CSS. This keeps the template flexible for per-project redesigns.
