# 🌐 @bunwind/web

[![nextjs](https://img.shields.io/badge/Built%20With-Next.js-black?style=flat&logo=next.js)](https://nextjs.org)
[![typescript](https://img.shields.io/badge/TypeScript-Strict-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![tailwindcss-v4](https://img.shields.io/badge/Tailwind%20CSS-v4-blue?style=flat&logo=tailwindcss)](https://tailwindcss.com)
[![workspaces](https://img.shields.io/badge/NPM%20Workspaces-Monorepo-green?style=flat&logo=npm)](https://docs.npmjs.com/cli/v7/using-npm/workspaces)

---

> This is the `@bunwind/web` package — a Next.js App Router project that consumes shared UI components, styles, and theming from `@bunwind/ui`, and can define its own as needed.  
>  
> This is **Step Three** of the `bunwind` monorepo setup.

---

## 🧱 Initial Next.js App Structure

After running:

```bash
bunx create-next-app@latest . \
  --app \
  --ts \
  --tailwind \
  --no-eslint \
  --import-alias "@/*"
```

Your workspace should look like this:

```
packages/web/
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
├── .gitignore
├── next-env.d.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

---

## 🧹 Step 1 — Clean Up the App Structure

### ✅ 1. Delete contents of the `public/` folder

```bash
rm -rf public/*
```

**Why?**  
The `public/` directory is for static assets like images or OG tags. We’re not using them yet, so clear it out to avoid clutter.

---

### ✅ 2. Delete `.gitignore` in this workspace

```bash
rm .gitignore
```

**Why?**  
In a monorepo, the `.gitignore` should live **only at the root** to manage all ignore rules in one central place. We’ll handle this globally in the root repo.

---

## 🛠️ Step 2 — Update Project Metadata

Open `packages/web/package.json` and update the name:

```json
{
  "name": "@bunwind/web",
  ...
}
```

Then add a dependency to your shared UI library:

```json
{
  "dependencies": {
    "@bunwind/ui": "workspace:*"
  }
}
```

**Why?**  
This allows you to:

- Import shared components like:
  ```tsx
  import { Button } from "@bunwind/ui"
  ```
- Import shared styles:
  ```css
  @import "@bunwind/ui/globals.css";
  ```

Monorepo linking will automatically resolve these using Bun’s workspace protocol.

---

## 🎨 Step 3 — Use Shared Styles from `@bunwind/ui`

Replace the contents of `app/globals.css` with:

```css
@import "@bunwind/ui/globals.css";
```

**Why?**  
You're inheriting the global Tailwind setup, design tokens, and base styles from `@bunwind/ui`. This keeps your app styling consistent and DRY.

---

## 🎁 Step 4 — Add Local shadcn/ui Support to `@bunwind/web`

Even though you’re consuming shared UI from `@bunwind/ui`, you might want to define app-specific components using the same design system and tooling. To support that:

### ✅ 1. Initialize shadcn/ui in this workspace:

```bash
bunx --bun shadcn@latest init
```

This will:
- Detect your Tailwind setup (already done)
- Add a `components.json` file scoped to this app
- Allow you to generate components locally, scoped to this workspace

> **Note:** You do **not** need to modify Tailwind or globals again. `@bunwind/web` inherits everything via the shared `globals.css`.

---

### ✅ 2. Add a few local shadcn/ui components

Run these to generate local app-specific components (different from shared ones):

```bash
bunx --bun shadcn@latest add alert && bunx --bun shadcn@latest add sonner && bunx --bun shadcn@latest add dialog
```

These will be added to:

```
packages/web/components/ui
```

You'll now be able to build both shared and scoped components using the exact same conventions.

---

✅ At this point:

- You’ve fully configured `@bunwind/web` to consume `@bunwind/ui`
- You’re importing global styles from the UI layer
- You can build new components in `web/` using shadcn/ui
- You’ve cleaned the structure and are using correct workspace linking

---

🎉 You're now ready to build the actual frontend using both shared and app-scoped components. Let’s start designing!