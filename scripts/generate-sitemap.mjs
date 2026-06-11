import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const workspaceRoot = resolve(process.cwd());
const distDirectory = resolve(workspaceRoot, "dist");
const postsDirectory = resolve(workspaceRoot, "src/content/posts");

const siteUrl = (process.env.SITE_URL || "https://grainforgestudio.com").replace(/\/+$/, "");

function parseScalar(value) {
  const trimmed = value.trim();

  if (trimmed === "true") {
    return true;
  }

  if (trimmed === "false") {
    return false;
  }

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

function parseFrontmatter(source) {
  const frontmatterMatch = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);

  if (!frontmatterMatch) {
    return {};
  }

  const data = {};
  let currentArrayKey = null;

  for (const line of frontmatterMatch[1].split(/\r?\n/)) {
    if (!line.trim()) {
      currentArrayKey = null;
      continue;
    }

    if (/^\s*-\s+/.test(line)) {
      if (currentArrayKey && Array.isArray(data[currentArrayKey])) {
        data[currentArrayKey].push(parseScalar(line.replace(/^\s*-\s+/, "")));
      }

      continue;
    }

    const separatorIndex = line.indexOf(":");

    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const rawValue = line.slice(separatorIndex + 1).trim();

    if (!rawValue) {
      data[key] = [];
      currentArrayKey = key;
      continue;
    }

    data[key] = parseScalar(rawValue);
    currentArrayKey = null;
  }

  return data;
}

async function getPublishedPosts() {
  const entries = await readdir(postsDirectory, { withFileTypes: true });
  const postDirectories = entries.filter((entry) => entry.isDirectory());
  const posts = [];

  for (const directory of postDirectories) {
    const markdownPath = resolve(postsDirectory, directory.name, "index.md");

    try {
      const markdown = await readFile(markdownPath, "utf8");
      const data = parseFrontmatter(markdown);

      if (!data.slug || data.draft) {
        continue;
      }

      posts.push({
        slug: String(data.slug),
        updatedAt: data.updatedAt || data.date || null,
      });
    } catch {
      // Ignore folders without an index.md file.
    }
  }

  return posts;
}

function toAbsoluteUrl(pathOrHash) {
  return new URL(pathOrHash, `${siteUrl}/`).toString();
}

function toSitemapEntry({ loc, lastmod, changefreq = "weekly", priority = "0.7" }) {
  const lines = [
    "  <url>",
    `    <loc>${loc}</loc>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
  ];

  if (lastmod) {
    const parsed = new Date(lastmod);
    if (!Number.isNaN(parsed.getTime())) {
      lines.push(`    <lastmod>${parsed.toISOString()}</lastmod>`);
    }
  }

  lines.push("  </url>");
  return lines.join("\n");
}

async function generateSitemap() {
  const posts = await getPublishedPosts();

  const staticRoutes = [
    { path: "/", changefreq: "weekly", priority: "1.0" },
    { path: "/#portfolio", changefreq: "weekly", priority: "0.8" },
    { path: "/#commissions", changefreq: "weekly", priority: "0.8" },
    { path: "/#posts", changefreq: "daily", priority: "0.9" },
  ];

  const entries = [
    ...staticRoutes.map((route) =>
      toSitemapEntry({
        loc: toAbsoluteUrl(route.path),
        changefreq: route.changefreq,
        priority: route.priority,
      }),
    ),
    ...posts.map((post) =>
      toSitemapEntry({
        loc: toAbsoluteUrl(`/#posts/${encodeURIComponent(post.slug)}`),
        lastmod: post.updatedAt,
        changefreq: "weekly",
        priority: "0.8",
      }),
    ),
  ];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    "</urlset>",
    "",
  ].join("\n");

  await mkdir(distDirectory, { recursive: true });
  await writeFile(resolve(distDirectory, "sitemap.xml"), xml, "utf8");
}

generateSitemap().catch((error) => {
  console.error("Failed to generate sitemap.xml", error);
  process.exitCode = 1;
});