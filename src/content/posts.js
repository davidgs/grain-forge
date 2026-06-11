import MarkdownIt from "markdown-it";
import markdownItContainer from "markdown-it-container";

const markdownFiles = import.meta.glob("./posts/*/index.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const mediaFiles = import.meta.glob(
  "./posts/*/images/*.{png,jpg,jpeg,webp,gif,avif,svg,mov,mp4,webm,ogg}",
  {
    import: "default",
    eager: true,
  },
);

const mediaLookup = Object.fromEntries(Object.entries(mediaFiles));

const markdown = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
});

function isVideoPath(path) {
  return /\.(mov|mp4|webm|ogg)(?:\?.*)?$/i.test(path || "");
}

function getVideoMimeType(path) {
  const normalizedPath = (path || "").toLowerCase();

  if (normalizedPath.endsWith(".mov")) {
    return "video/quicktime";
  }

  if (normalizedPath.endsWith(".webm")) {
    return "video/webm";
  }

  if (normalizedPath.endsWith(".ogg")) {
    return "video/ogg";
  }

  return "video/mp4";
}

const defaultImageRenderer = markdown.renderer.rules.image;
markdown.renderer.rules.image = (tokens, index, options, env, self) => {
  const token = tokens[index];
  const source = token.attrGet("src") || "";

  if (!isVideoPath(source)) {
    if (defaultImageRenderer) {
      return defaultImageRenderer(tokens, index, options, env, self);
    }

    return self.renderToken(tokens, index, options);
  }

  const escapedSource = markdown.utils.escapeHtml(source);
  const mimeType = getVideoMimeType(source);

  return `<video class=\"post-video\" controls preload=\"metadata\" autoplay muted loop playsinline><source src=\"${escapedSource}\" type=\"${mimeType}\" />Your browser does not support the video tag. <a href=\"${escapedSource}\">Download the video</a>.</video>`;
};

markdown.use(markdownItContainer, "note", {
  render(tokens, index) {
    const token = tokens[index];
    const title = token.info.trim().slice("note".length).trim() || "Note";

    if (token.nesting === 1) {
      return `<div class="post-callout post-callout-note"><p class="post-callout-title">${markdown.utils.escapeHtml(title)}</p>`;
    }

    return "</div>";
  },
});

markdown.use(markdownItContainer, "tip", {
  render(tokens, index) {
    const token = tokens[index];
    const title = token.info.trim().slice("tip".length).trim() || "Tip";

    if (token.nesting === 1) {
      return `<div class="post-callout post-callout-tip"><p class="post-callout-title">${markdown.utils.escapeHtml(title)}</p>`;
    }

    return "</div>";
  },
});

markdown.use(markdownItContainer, "warn", {
  render(tokens, index) {
    const token = tokens[index];
    const title = token.info.trim().slice("warn".length).trim() || "Heads up";

    if (token.nesting === 1) {
      return `<div class="post-callout post-callout-warn"><p class="post-callout-title">${markdown.utils.escapeHtml(title)}</p>`;
    }

    return "</div>";
  },
});

function assertRequiredField(value, fieldName, filePath) {
  if (!value) {
    throw new Error(`Missing required frontmatter field "${fieldName}" in ${filePath}`);
  }
}

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

function parseFrontmatter(source, filePath) {
  const frontmatterMatch = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);

  if (!frontmatterMatch) {
    return {
      data: {},
      content: source,
    };
  }

  const data = {};
  let currentArrayKey = null;

  for (const line of frontmatterMatch[1].split(/\r?\n/)) {
    if (!line.trim()) {
      currentArrayKey = null;
      continue;
    }

    if (/^\s*-\s+/.test(line)) {
      if (!currentArrayKey || !Array.isArray(data[currentArrayKey])) {
        throw new Error(`Unexpected list item in frontmatter for ${filePath}`);
      }

      data[currentArrayKey].push(parseScalar(line.replace(/^\s*-\s+/, "")));
      continue;
    }

    const separatorIndex = line.indexOf(":");

    if (separatorIndex === -1) {
      throw new Error(`Invalid frontmatter line "${line}" in ${filePath}`);
    }

    const key = line.slice(0, separatorIndex).trim();
    const rawValue = line.slice(separatorIndex + 1);
    const value = rawValue.trim();

    if (!value) {
      data[key] = [];
      currentArrayKey = key;
      continue;
    }

    data[key] = parseScalar(value);
    currentArrayKey = null;
  }

  return {
    data,
    content: source.slice(frontmatterMatch[0].length),
  };
}

function normalizeType(type) {
  return type === "blog" ? "blog" : "wip";
}

function normalizeDate(value, filePath) {
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Invalid date "${value}" in ${filePath}`);
  }

  return parsed.toISOString();
}

function getPostDirectory(filePath) {
  return filePath.replace(/\/index\.md$/, "");
}

function resolveLocalAssetPath(value, postDirectory, filePath) {
  if (!value) {
    return value;
  }

  if (
    value.startsWith("/") ||
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("data:") ||
    value.startsWith("#")
  ) {
    return value;
  }

  const normalizedPath = value.startsWith("./") ? value.slice(2) : value;

  if (!normalizedPath.startsWith("images/")) {
    return value;
  }

  const lookupKey = `${postDirectory}/${normalizedPath}`;
  const resolvedPath = mediaLookup[lookupKey];

  if (!resolvedPath) {
    throw new Error(
      `Missing post image "${value}" for ${filePath}. Expected file at ${lookupKey}`,
    );
  }

  return resolvedPath;
}

function rewriteLocalAssetPaths(html, postDirectory, filePath) {
  return html.replace(/(src|href)="([^"]+)"/g, (full, attribute, value) => {
    const resolved = resolveLocalAssetPath(value, postDirectory, filePath);
    return `${attribute}="${resolved}"`;
  });
}

function buildPost([filePath, source]) {
  const { data, content } = parseFrontmatter(source, filePath);
  const postDirectory = getPostDirectory(filePath);
  const renderedHtml = markdown.render(content);

  assertRequiredField(data.title, "title", filePath);
  assertRequiredField(data.slug, "slug", filePath);
  assertRequiredField(data.date, "date", filePath);
  assertRequiredField(data.type, "type", filePath);
  assertRequiredField(data.summary, "summary", filePath);

  return {
    title: data.title,
    slug: data.slug,
    date: normalizeDate(data.date, filePath),
    updatedAt: data.updatedAt ? normalizeDate(data.updatedAt, filePath) : null,
    type: normalizeType(data.type),
    summary: data.summary,
    coverImage: data.coverImage
      ? resolveLocalAssetPath(data.coverImage, postDirectory, filePath)
      : null,
    tags: Array.isArray(data.tags) ? data.tags : [],
    draft: Boolean(data.draft),
    html: rewriteLocalAssetPaths(renderedHtml, postDirectory, filePath),
  };
}

function sortPostsByDate(left, right) {
  return new Date(right.date).getTime() - new Date(left.date).getTime();
}

export const allPosts = Object.entries(markdownFiles)
  .map(buildPost)
  .sort(sortPostsByDate);

export const publishedPosts = allPosts.filter(
  (post) => !post.draft || import.meta.env.DEV,
);

export function getPostBySlug(slug) {
  return publishedPosts.find((post) => post.slug === slug) ?? null;
}