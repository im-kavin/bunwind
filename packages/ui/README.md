# 🧱 `@bunwind/ui`

[![built-with-bun](https://img.shields.io/badge/Built%20With-Bun-%23222?style=flat&logo=bun&logoColor=white)](https://bun.sh)
[![typescript](https://img.shields.io/badge/TypeScript-Strict-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![shadcn-ui](https://img.shields.io/badge/shadcn/ui-Design%20System-black?style=flat)](https://ui.shadcn.com)
[![tailwindcss-v4](https://img.shields.io/badge/Tailwind%20CSS-v4-blue?style=flat&logo=tailwindcss)](https://tailwindcss.com)

---

> This is the `@bunwind/ui` package — a shared UI component library built with **Tailwind CSS v4**, **shadcn/ui**, and **TypeScript**, designed for reuse across all apps in the monorepo (e.g., `@bunwind/web`).
>
> This file documents the initial setup process. It is **Step Two** of the monorepo.
> The next step will cover installing and integrating `shadcn/ui` components within this package.

---

## 🪜 Step 1 — Workspace Structure

You should now have:

```
packages/ui/
├── .gitignore        ← optional
├── bun.lockb
├── index.ts
├── package.json
├── README.md
└── tsconfig.json
```

---

## 🧹 Step 2 — Clean Up Defaults

### ✅ Delete `.gitignore` (optional but recommended)

```bash
rm .gitignore
```

- **Why?** In a monorepo, it’s cleaner to have a single `.gitignore` at the root so all workspace files (like `.env`, `.next`, `dist`, etc.) are excluded consistently.
- We'll centralize this in **Step Three** of the monorepo in `/README.md`.

> If you choose to keep `.gitignore` here, ensure it doesn't conflict or override any root-level rules.

---

### ✅ Decide on `index.ts`

Keep `index.ts` — it will be the public entrypoint for all your exported UI components.

In the future, you will:

```ts
// index.ts
export * from "./components/button"
export * from "./components/form"
// etc.
```

This allows other packages (like `@bunwind/web`) to import shared UI like this:

```ts
import { Button } from "@bunwind/ui"
```

---

### ✅ Update `package.json`

Open `package.json` and modify it to the following structure:

```json
{
  "name": "@bunwind/ui",
  "version": "0.1.0",
  "type": "module",
  "module": "index.ts",
  "private": true,
  "devDependencies": {
    "@types/bun": "latest"
  },
  "peerDependencies": {
    "typescript": "^5"
  }
}
```

- `name: "@bunwind/ui"` → This is critical for **importing components via the alias** like `import { Button } from "@bunwind/ui"`.
- `private: true` → Ensures this package won’t be published unless you explicitly want to.
- `module: "index.ts"` → Used by Bun as the main entrypoint.
- `peerDependencies` on TypeScript ensures compatibility with consumers, especially in workspace environments.

---

## 🛠️ Step 3 — Update `tsconfig.json`

### Replace the file with the following:

```json
{
  "compilerOptions": {
    // Environment setup & latest features
    "lib": ["ESNext"],
    "target": "ESNext",
    "module": "ESNext",
    "moduleDetection": "force",
    "jsx": "react-jsx",
    "allowJs": true,

    // Bundler mode
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "noEmit": true,

    // Best practices
    "strict": true,
    "skipLibCheck": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,

    // Some stricter flags (disabled by default)
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noPropertyAccessFromIndexSignature": false,

    // Shared monorepo aliasing (Next.js / shadcn style)
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["./**/*"]
}
```

### 🔍 Why these changes?

- We're keeping **all of Bun's optimal compiler flags** (as provided by `bun init`).
- We add `baseUrl` and `paths` for `@/*` style imports within the package.
- We explicitly set `include` to `"./**/*"` so TypeScript knows to compile this workspace and doesn’t throw input errors.
- This file is now ready to support shadcn/ui components, Tailwind CSS, and any custom component structure.

---

## 🔗 Next Step — Install shadcn/ui

We’ll now move into setting up `shadcn/ui` in this package.

Follow the official [Manual Installation Guide](https://ui.shadcn.com/docs/installation/manual) to integrate it here.

We’ll configure the Tailwind CSS v4 pipeline, `postcss.config.mjs`, and global styles in the following steps.

---

## 🎨 Step 4 — Add Tailwind CSS v4 (PostCSS Pipeline)

This package is not a Next.js app — it’s a reusable React UI library. That means we’re not using Tailwind CLI or Vite. We will install Tailwind as a PostCSS plugin, which is the **recommended setup for component libraries** and is fully compatible with Bun.

---

### ✅ 1. Install Tailwind CSS with PostCSS

Run this command from inside `packages/ui`:

```bash
bun add tailwindcss @tailwindcss/postcss postcss
```

This installs:

| Package                  | Purpose                                           |
|--------------------------|---------------------------------------------------|
| `tailwindcss`            | The Tailwind CSS framework                        |
| `@tailwindcss/postcss`   | The official PostCSS plugin to use Tailwind v4    |
| `postcss`                | The processor that reads and applies plugins      |

> ❗ Do not use Tailwind CLI — we are using PostCSS, which is more scalable for a library that exports styled components.

---

### ✅ 2. Add a PostCSS config

Create a `postcss.config.mjs` file at the root of this package:

```bash
touch postcss.config.mjs
```

Add the following:

```js
// postcss.config.mjs
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

This activates Tailwind inside PostCSS using the new v4 plugin system.

---

### ✅ 3. Add Your Global Tailwind Entry File

Create a `globals.css` file in the root of the `ui` package:

```bash
touch globals.css
```

Add the following content:

```css
@import "tailwindcss";
```

> 🗂 We are placing this in `packages/ui/globals.css` (not inside `/styles`) to keep the package lightweight and flat. If the project grows, we can revisit structure.

This file is your Tailwind CSS entrypoint — it will compile all Tailwind layers and plugin utilities.

---

### 🧪 4. (Optional for now) Import Tailwind in Dev/Test

When you begin developing or testing components (e.g., in Storybook, or inside a Next.js app), you’ll need to import the `globals.css` to apply base styles.

For now, just keep this file in place — we’ll hook it into usage when we start consuming the library in apps.

---

✅ Tailwind CSS is now fully set up and ready to style your shared UI components.

---

### 🚀 Next: Add shadcn/ui

Now that Tailwind CSS is fully configured via PostCSS, we’ll add [shadcn/ui](https://ui.shadcn.com/docs/installation/manual) to the `@bunwind/ui` package to begin composing reusable, styled UI components using:

- Tailwind CSS v4
- Radix UI primitives
- Utility libraries (`clsx`, `tailwind-merge`, `cva`)
- Theme support via CSS variables

We are **not using the shadcn CLI tool** — instead, we’re installing and configuring it manually for full control and monorepo compatibility. You can still use the CLI to add specific components.

---

## ⚙️ Step 5 — Install shadcn/ui Dependencies

Run the following in the root of the `packages/ui` workspace:

```bash
bun add class-variance-authority clsx tailwind-merge lucide-react tw-animate-css
```

These are required for:

| Package                   | Purpose                                                      |
|---------------------------|--------------------------------------------------------------|
| `class-variance-authority` | Component variants (`cva()`)                                 |
| `clsx`                    | Conditional class string building                             |
| `tailwind-merge`          | Deduplicating and merging Tailwind classes                   |
| `lucide-react`            | Icon set used in shadcn/ui components                        |
| `tw-animate-css`          | Tailwind plugin for animations used in base styles            |

---

## 🛠 Step 6 — Update `globals.css` with shadcn/ui Theme Styles

Update your `globals.css` file (located at `packages/ui/globals.css`) with the following full base style layer, imported plugins, and CSS variables:

> **⚠️ IMPORTANT: YOU MUST ADD `@source` FOR ANY DIRECTORIES CONTAINING STYLED COMPONENTS SO THAT TAILWIND SCANS THEM. THIS IS CRITICAL FOR MONOREPO STRUCTURE! ⚠️**

```css
@import "tailwindcss";
@import "tw-animate-css";
@source "./components";

@custom-variant dark (&:is(.dark *));

:root {
	--background: oklch(1 0 0);
	--foreground: oklch(0.145 0 0);
	--card: oklch(1 0 0);
	--card-foreground: oklch(0.145 0 0);
	--popover: oklch(1 0 0);
	--popover-foreground: oklch(0.145 0 0);
	--primary: oklch(0.205 0 0);
	--primary-foreground: oklch(0.985 0 0);
	--secondary: oklch(0.97 0 0);
	--secondary-foreground: oklch(0.205 0 0);
	--muted: oklch(0.97 0 0);
	--muted-foreground: oklch(0.556 0 0);
	--accent: oklch(0.97 0 0);
	--accent-foreground: oklch(0.205 0 0);
	--destructive: oklch(0.577 0.245 27.325);
	--destructive-foreground: oklch(0.577 0.245 27.325);
	--border: oklch(0.922 0 0);
	--input: oklch(0.922 0 0);
	--ring: oklch(0.708 0 0);
	--chart-1: oklch(0.646 0.222 41.116);
	--chart-2: oklch(0.6 0.118 184.704);
	--chart-3: oklch(0.398 0.07 227.392);
	--chart-4: oklch(0.828 0.189 84.429);
	--chart-5: oklch(0.769 0.188 70.08);
	--radius: 0.625rem;
	--sidebar: oklch(0.985 0 0);
	--sidebar-foreground: oklch(0.145 0 0);
	--sidebar-primary: oklch(0.205 0 0);
	--sidebar-primary-foreground: oklch(0.985 0 0);
	--sidebar-accent: oklch(0.97 0 0);
	--sidebar-accent-foreground: oklch(0.205 0 0);
	--sidebar-border: oklch(0.922 0 0);
	--sidebar-ring: oklch(0.708 0 0);
}

.dark {
	--background: oklch(0.145 0 0);
	--foreground: oklch(0.985 0 0);
	--card: oklch(0.145 0 0);
	--card-foreground: oklch(0.985 0 0);
	--popover: oklch(0.145 0 0);
	--popover-foreground: oklch(0.985 0 0);
	--primary: oklch(0.985 0 0);
	--primary-foreground: oklch(0.205 0 0);
	--secondary: oklch(0.269 0 0);
	--secondary-foreground: oklch(0.985 0 0);
	--muted: oklch(0.269 0 0);
	--muted-foreground: oklch(0.708 0 0);
	--accent: oklch(0.269 0 0);
	--accent-foreground: oklch(0.985 0 0);
	--destructive: oklch(0.396 0.141 25.723);
	--destructive-foreground: oklch(0.637 0.237 25.331);
	--border: oklch(0.269 0 0);
	--input: oklch(0.269 0 0);
	--ring: oklch(0.439 0 0);
	--chart-1: oklch(0.488 0.243 264.376);
	--chart-2: oklch(0.696 0.17 162.48);
	--chart-3: oklch(0.769 0.188 70.08);
	--chart-4: oklch(0.627 0.265 303.9);
	--chart-5: oklch(0.645 0.246 16.439);
	--sidebar: oklch(0.205 0 0);
	--sidebar-foreground: oklch(0.985 0 0);
	--sidebar-primary: oklch(0.488 0.243 264.376);
	--sidebar-primary-foreground: oklch(0.985 0 0);
	--sidebar-accent: oklch(0.269 0 0);
	--sidebar-accent-foreground: oklch(0.985 0 0);
	--sidebar-border: oklch(0.269 0 0);
	--sidebar-ring: oklch(0.439 0 0);
}

@theme inline {
	--color-background: var(--background);
	--color-foreground: var(--foreground);
	--color-card: var(--card);
	--color-card-foreground: var(--card-foreground);
	--color-popover: var(--popover);
	--color-popover-foreground: var(--popover-foreground);
	--color-primary: var(--primary);
	--color-primary-foreground: var(--primary-foreground);
	--color-secondary: var(--secondary);
	--color-secondary-foreground: var(--secondary-foreground);
	--color-muted: var(--muted);
	--color-muted-foreground: var(--muted-foreground);
	--color-accent: var(--accent);
	--color-accent-foreground: var(--accent-foreground);
	--color-destructive: var(--destructive);
	--color-destructive-foreground: var(--destructive-foreground);
	--color-border: var(--border);
	--color-input: var(--input);
	--color-ring: var(--ring);
	--color-chart-1: var(--chart-1);
	--color-chart-2: var(--chart-2);
	--color-chart-3: var(--chart-3);
	--color-chart-4: var(--chart-4);
	--color-chart-5: var(--chart-5);
	--radius-sm: calc(var(--radius) - 4px);
	--radius-md: calc(var(--radius) - 2px);
	--radius-lg: var(--radius);
	--radius-xl: calc(var(--radius) + 4px);
	--color-sidebar: var(--sidebar);
	--color-sidebar-foreground: var(--sidebar-foreground);
	--color-sidebar-primary: var(--sidebar-primary);
	--color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
	--color-sidebar-accent: var(--sidebar-accent);
	--color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
	--color-sidebar-border: var(--sidebar-border);
	--color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
	* {
		@apply border-border outline-ring/50;
	}
	body {
		@apply bg-background text-foreground;
	}
}
```

> ✨ This sets up a themeable design system based on CSS custom properties using Tailwind’s layering system.

---

## 🔧 Step 7 — Add the `cn` Helper Utility

Create a file at `packages/ui/lib/utils.ts`:

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

This helper is used throughout shadcn/ui components for clean, mergeable Tailwind class logic.

---

## 🗂 Step 8 — Create `components.json` Configuration

This file is used by the shadcn/ui generator to know how to scaffold new components. Create `packages/ui/components.json` with the following contents (modified to fit our setup):

```json
{
	"$schema": "https://ui.shadcn.com/schema.json",
	"style": "new-york",
	"rsc": false,
	"tsx": true,
	"tailwind": {
		"config": "",
		"css": "@bunwind/ui/globals.css",
		"baseColor": "neutral",
		"cssVariables": true,
		"prefix": ""
	},
	"aliases": {
		"components": "@bunwind/ui/components",
		"utils": "@bunwind/ui/lib/utils",
		"ui": "@bunwind/ui/components",
		"lib": "@bunwind/ui/lib",
		"hooks": "@bunwind/ui/hooks"
	},
	"iconLibrary": "lucide"
}

```

### ✅ Notes on Customization:

- We changed `"css"` from the default (`src/styles/globals.css`) to `"@bunwind/ui/globals.css"` to match our file location.
- We changed `"ui"` from `"@/components/ui"` to `"@bunwind/ui/components"` because:
  - We're already in the UI package
  - The `/components/ui` nesting is redundant here
  - We used full package references (e.g., `@bunwind/ui/components` instead of `@/components`) to prevent any reference errors when shadcn/ui creates our components and they are used in other packages in our monorepo

---

✅ At this point, `@bunwind/ui` is now fully configured to:

- Use Tailwind CSS v4 via PostCSS
- Style components with CSS variables and shadcn/ui conventions
- Use utility functions (`cn`, `clsx`, `tailwind-merge`)
- Be generated against clean aliases with a correct `components.json`

---

👉 You’re now ready to generate or build your first components using [shadcn/ui](https://ui.shadcn.com/docs/installation/manual) component patterns.

---

---

## 🧩 Step 9 — Add and Export Shared shadcn/ui Components

To finalize the `@bunwind/ui` package, we’ll add a few foundational components using the `shadcn/ui` generator and make them available to any consuming workspace (such as `@bunwind/web`). This validates that our setup supports shared, styled components — ready for consumption in real-world apps.

---

### ✅ 1. Add shadcn/ui Components to the UI Package

Inside `packages/ui`, run the following commands:

```bash
bunx --bun shadcn@latest add button && bunx --bun shadcn@latest add input && bunx --bun shadcn@latest add label
```

These commands will:

- Scaffold `Button.tsx`, `Input.tsx`, and `Label.tsx` inside `packages/ui/components/`
- Respect the aliases defined in your `components.json`
- Automatically use the Tailwind CSS theme, global tokens, and `cn()` utility setup

---

### ✅ 2. Export Components from the Public Entry File

Open `packages/ui/index.ts` and re-export all the components you want the world to consume:

```ts
export * from "./components/button"
export * from "./components/input"
export * from "./components/label"
```

This exposes the components as the public interface of the `@bunwind/ui` package:

```ts
import { Button, Input, Label } from "@bunwind/ui"
```

This only works because you previously defined this in your package configuration:

```json
// packages/ui/package.json
{
  "name": "@bunwind/ui",
  "module": "index.ts",
  "type": "module"
}
```

- The `"name"` field enables clean imports like `@bunwind/ui`
- The `"module"` field sets `index.ts` as the public API of the package

---

### 🎨 Global Styles: How They're Shared

Your Tailwind CSS and design tokens live in:

```
packages/ui/globals.css
```

You do **not** need to export styles via JS. Instead, you'll **import this file directly in consuming apps** like so:

```css
/* packages/web/app/globals.css */
@import "@bunwind/ui/globals.css";
```

✅ Because you are using Bun with npm workspaces, the import will resolve correctly across packages — no symlinks or hacks needed.

This makes it dead simple for your apps to inherit global theming and base styles from the UI package.

---

### ✅ Now You’re Ready to Scaffold the Web App

You’ve now completed everything needed to build a shared UI system in `@bunwind/ui`.

Let’s generate the `@bunwind/web` app using Next.js with full TypeScript, Tailwind, and App Router support:

```bash
cd .. && mkdir web && cd web && bunx create-next-app@latest . --app --ts --tailwind --no-eslint --import-alias "@/*" --use-turbopack
```

> This creates the app directly in the `packages/web` folder and prepares it for local development.
You can select these options:
1. Would you like to use Turbopack for `next dev`? › **Yes**


Next steps inside `@bunwind/web`:
- Import components from `@bunwind/ui`
- Import global CSS from `@bunwind/ui/globals.css`
- Add your own app-specific UI, styles, or routing

---

🎉 You’re now ready to build a real-world demo where `@bunwind/web` cleanly consumes shared design system components from `@bunwind/ui`.

Let’s build the app.
