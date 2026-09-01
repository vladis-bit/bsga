/**
 * Generates public/sitemap.xml from the route definitions in src/App.tsx.
 *
 * Single source of truth: routes are parsed straight out of <Route path="..."
 * element={<Component />} /> declarations — there is no second list of URLs here.
 *
 * Excluded automatically:
 *  - the catch-all route ("*")
 *  - admin routes and their children
 *  - booking / reservation routes (/rezervacia/*) and auth-only routes
 *  - any route whose page component renders <SEO ... noindex />
 *
 * <lastmod> comes from the last git commit date of the route's page component
 * (page-specific, authoritative). If git history is unavailable the field is
 * omitted rather than faked with the build date.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BASE_URL = "https://bsga.sk";

const appSource = readFileSync(resolve(root, "src/App.tsx"), "utf8");

/** component name -> source file path (from `import X from "./pages/X"` and lazy imports) */
const componentFiles = new Map();
const importRe =
  /(?:const\s+(\w+)\s*=\s*lazy\(\s*\(\)\s*=>\s*import\(\s*["'](.+?)["']\s*\)\s*\)|import\s+(\w+)\s+from\s+["'](\.\/.+?)["'])/g;
for (const m of appSource.matchAll(importRe)) {
  const name = m[1] ?? m[3];
  const spec = m[2] ?? m[4];
  if (!name || !spec.startsWith("./")) continue;
  for (const ext of [".tsx", ".ts"]) {
    const file = resolve(root, "src", spec.slice(2) + ext);
    if (existsSync(file)) {
      componentFiles.set(name, file);
      break;
    }
  }
}

/** Parse <Route ...> declarations, tracking nesting so children inherit the parent path. */
const routes = [];
const stack = [];
const routeRe = /<Route\b([^>]*?)(\/?)>|<\/Route>/g;
for (const m of appSource.matchAll(routeRe)) {
  if (m[0] === "</Route>") {
    stack.pop();
    continue;
  }
  const attrs = m[1];
  const selfClosing = m[2] === "/";
  const pathAttr = attrs.match(/path=["'](.*?)["']/)?.[1];
  const isIndex = /\bindex\b/.test(attrs);
  const element = attrs.match(/element=\{<(\w+)/)?.[1];

  const parent = stack.length ? stack[stack.length - 1] : "";
  let full;
  if (isIndex || pathAttr === undefined) full = parent || "/";
  else if (pathAttr.startsWith("/")) full = pathAttr;
  else full = `${parent.replace(/\/$/, "")}/${pathAttr}`;

  routes.push({ path: full, element });
  if (!selfClosing) stack.push(full);
}

const EXCLUDED_PREFIXES = ["/admin", "/rezervacia", "/reset-password"];

const isNoindexPage = (component) => {
  const file = componentFiles.get(component);
  if (!file) return true; // unknown component -> stay out of the sitemap
  const src = readFileSync(file, "utf8");
  return /\bnoindex\b/.test(src);
};

const lastmodOf = (component) => {
  const file = componentFiles.get(component);
  if (!file) return undefined;
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", file], {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return out ? out.slice(0, 10) : undefined;
  } catch {
    return undefined;
  }
};

const seen = new Set();
const entries = [];
for (const r of routes) {
  if (!r.path || r.path === "*" || r.path.includes(":") || r.path.includes("*")) continue;
  if (EXCLUDED_PREFIXES.some((p) => r.path === p || r.path.startsWith(`${p}/`))) continue;
  if (!r.element || isNoindexPage(r.element)) continue;
  if (seen.has(r.path)) continue;
  seen.add(r.path);

  const depth = r.path === "/" ? 0 : r.path.split("/").filter(Boolean).length;
  entries.push({
    path: r.path,
    lastmod: lastmodOf(r.element),
    changefreq: depth === 0 ? "weekly" : depth === 1 ? "monthly" : "yearly",
    priority: depth === 0 ? "1.0" : depth === 1 ? "0.8" : "0.6",
  });
}

entries.sort((a, b) => (a.path === "/" ? -1 : b.path === "/" ? 1 : a.path.localeCompare(b.path)));

const xml = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
  ...entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path === "/" ? "/" : e.path}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      `    <changefreq>${e.changefreq}</changefreq>`,
      `    <priority>${e.priority}</priority>`,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  ),
  `</urlset>`,
].join("\n");

writeFileSync(resolve(root, "public/sitemap.xml"), `${xml}\n`);
console.log(`sitemap.xml written (${entries.length} entries)`);
