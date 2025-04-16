# 🌀 bunwind

[![built-with-bun](https://img.shields.io/badge/Built%20With-Bun-%23222?style=flat&logo=bun&logoColor=white)](https://bun.sh)
[![tailwindcss-v4](https://img.shields.io/badge/Tailwind%20CSS-v4-blue?style=flat&logo=tailwindcss)](https://tailwindcss.com)
[![nextjs-app-router](https://img.shields.io/badge/Next.js-App%20Router-black?style=flat&logo=next.js)](https://nextjs.org)
[![workspaces](https://img.shields.io/badge/NPM%20Workspaces-Monorepo-green?style=flat&logo=npm)](https://docs.npmjs.com/cli/v7/using-npm/workspaces)

---

> `bunwind` is a minimal monorepo powered by [Bun](https://bun.sh), [Tailwind CSS v4](https://tailwindcss.com), and [Next.js](https://nextjs.org) using native [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces).
>
> It demonstrates a clean setup for a shared UI package (`@bunwind/ui`) and a frontend app (`@bunwind/web`), with a strong focus on modular design, styling with Tailwind v4, and modern TypeScript tooling.

---

## 📚 Structure

This README is **Step One** in setting up the monorepo root.

- **This file/Step One** `README.md` – Root-level setup and configuration
- **Next/Step Two** `packages/ui/README.md` – UI library setup (`@bunwind/ui`)
- **Final/Step Three** `packages/web/README.md` – Next.js app setup (`@bunwind/web`)

---

# 🧱 Step One: Root Monorepo Setup

## 1. Create the Monorepo Root

```bash
mkdir bunwind && cd bunwind && bun init -y
```

This command initializes a basic Bun project and generates:

```
bunwind/
├── node_modules/
├── .gitignore
├── bun.lock
├── index.ts
├── package.json
├── README.md
├── tsconfig.json
```

---

## 2. Clean the Root

### ✅ Delete unnecessary files:

```bash
rm index.ts
rm tsconfig.json
rm -rf node_modules
```

- `index.ts`: You are not building or running code from the root. Remove it.
- `tsconfig.json`: You are not *technically* building or running code from the root. Remove it.
- `node_modules/`: Bun installs type packages by default here (e.g. `@types/bun`, `typescript`, etc.). These are not used at the root and will be reinstalled properly in each workspace as needed.

---

## 3. Update `package.json`

Open the file and edit it to look **exactly like this**:

```json
{
  "name": "bunwind",
  "private": true,
  "workspaces": ["packages/*"]
}
```

- `private: true`: Prevents accidental publishing of the monorepo root.
- `workspaces`: Tells Bun to treat all subfolders inside `packages/` as isolated workspace packages.
- Remove all other fields. There should be no `main`, `exports`, `module`, `dependencies`, or `devDependencies` here.

This is the minimal and correct monorepo root `package.json`.

---

## 4. ✅ No Additional Dependencies Required

You **do not** need to install any packages at the root level.

Bun and TypeScript both support `baseUrl` and `paths` natively. No runtime or node modules are required at the root unless you later add tooling (like Biome, ESLint, Prettier, etc.). We will configure TypeScript properly inside each workspace where needed — and those packages will install their own `typescript` if required.

---

## ✅ Final Structure

After following all steps, your root directory should look like this:

```
bunwind/
├── .gitignore
├── bun.lock
├── package.json         ✅ Clean and minimal
└── README.md            ✅ This file
```

---

## 🚀 Next Step - Create the Packages Directory

From the root (this) directory run:
```bash
mkdir packages && cd packages && mkdir ui && cd ui && bun init -y
```

We continue with the next step in the packages/ui/README.md file
