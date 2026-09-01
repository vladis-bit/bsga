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
 * (page-specific, authoritative), falling back to that file's modification time.
 * changefreq/priority are intentionally omitted — Google ignores them.
 */

import { readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
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

/** Scan the source for <Route ...> / </Route>, honouring JSX braces inside attributes. */
for (let i = 0; i < appSource.length; i++) {
  if (appSource.startsWith("</Route>", i)) {
    stack.pop();
    i += 7;
    continue;
  }
  if (!appSource.startsWith("<Route", i)) continue;

  let depth = 0;
  let j = i + 6;
  for (; j < appSource.length; j++) {
    const c = appSource[j];
    if (c === "{") depth++;
    else if (c === "}") depth--;
    else if (c === ">" && depth === 0) break;
  }
  const attrs = appSource.slice(i + 6, j);
  const selfClosing = attrs.trimEnd().endsWith("/");
  const pathAttr = attrs.match(/\bpath=["'](.*?)["']/)?.[1];
  const isIndex = /\bindex\b/.test(attrs);
  const element = attrs.match(/element=\{<(\w+)/)?.[1];

  const parent = stack.length ? stack[stack.length - 1] : "";
  let full;
  if (isIndex || pathAttr === undefined) full = parent || "/";
  else if (pathAttr.startsWith("/")) full = pathAttr;
  else full = `${parent.replace(/\/$/, "")}/${pathAttr}`;

  routes.push({ path: full, element });
  if (!selfClosing) stack.push(full);
  i = j;
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
    if (out) return out.slice(0, 10);
  } catch {
    // git history unavailable -> fall back to the file's modification time
  }
  try {
    return statSync(file).mtime.toISOString().slice(0, 10);
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

  entries.push({ path: r.path, lastmod: lastmodOf(r.element) });
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
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  ),
  `</urlset>`,
].join("\n");

writeFileSync(resolve(root, "public/sitemap.xml"), `${xml}\n`);
console.log(`sitemap.xml written (${entries.length} entries)`);
