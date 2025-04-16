/**
 * IMPORTANT: Use full package names for exports in shared packages
 * 
 * While @/ path aliases work within this package (defined in tsconfig.json),
 * they cause resolution errors when imported from other packages.
 * 
 * This is because:
 * 1. Path aliases (@/) are resolved by the local TypeScript/bundler config
 * 2. When a consuming package imports from @bunwind/ui, the bundler looks for
 *    actual file paths relative to the package root, not aliases
 * 3. Using @/ in exports would cause "Module not found" errors
 * 
 * Best practices:
 * - Use full package names (@bunwind/ui/...) for any paths that get exported
 * - @/ aliases can still be used for internal imports not directly exported
 */

export * from "@bunwind/ui/components/button";
export * from "@bunwind/ui/components/input";
export * from "@bunwind/ui/components/label";
export * from "@bunwind/ui/lib/utils";
