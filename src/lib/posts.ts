import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostFrontmatter = {
  title: string;
  date: string; // ISO string
  summary?: string;
  tags?: string[];
  draft?: boolean;
};

export type Post = {
  /** e.g. "mlir/hello-world" */
  slug: string;
  /** e.g. "mlir" */
  category: string;
  frontmatter: PostFrontmatter;
  content: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

type PostEntry = { category: string; filename: string; fullPath: string };

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function readFrontmatter(data: Record<string, unknown>, fullPath: string): PostFrontmatter {
  const { title, date, summary, tags, draft } = data;

  if (typeof title !== "string") {
    throw new Error(`Post frontmatter is missing a string title: ${fullPath}`);
  }

  if (typeof date !== "string") {
    throw new Error(`Post frontmatter is missing a string date: ${fullPath}`);
  }

  if (summary !== undefined && typeof summary !== "string") {
    throw new Error(`Post frontmatter summary must be a string: ${fullPath}`);
  }

  if (tags !== undefined && !isStringArray(tags)) {
    throw new Error(`Post frontmatter tags must be a string array: ${fullPath}`);
  }

  if (draft !== undefined && typeof draft !== "boolean") {
    throw new Error(`Post frontmatter draft must be a boolean: ${fullPath}`);
  }

  return {
    title,
    date,
    summary,
    tags,
    draft,
  };
}

function getCategoryDirs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

function getAllPostEntries(): PostEntry[] {
  const cats = getCategoryDirs();
  const out: PostEntry[] = [];

  for (const category of cats) {
    const dir = path.join(POSTS_DIR, category);
    const files = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".mdx") && !f.toLowerCase().startsWith("readme"));
    for (const filename of files) {
      out.push({ category, filename, fullPath: path.join(dir, filename) });
    }
  }
  return out;
}

export function getAllCategories(): string[] {
  return getCategoryDirs().sort((a, b) => a.localeCompare(b));
}

export function getAllPosts(): Post[] {
  return getAllPostEntries()
    .map(({ category, filename, fullPath }) => {
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(raw);

      const frontmatter = readFrontmatter(data, fullPath);
      const base = filename.replace(/\.mdx$/, "");
      const slug = `${category}/${base}`;

      return { slug, category, frontmatter, content };
    })
    .filter((p) => !p.frontmatter.draft)
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  const parts = slug.split("/");
  if (parts.length !== 2) return null;

  const [category, base] = parts;
  if (!category || !base) return null;

  const fullPath = path.join(POSTS_DIR, category, `${base}.mdx`);
  const relativePath = path.relative(POSTS_DIR, fullPath);
  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) return null;

  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = readFrontmatter(data, fullPath);

  if (frontmatter.draft) return null;
  return { slug, category, frontmatter, content };
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getAllTags(): { tag: string; count: number }[] {
  const map = new Map<string, number>();
  for (const p of getAllPosts()) {
    for (const t of p.frontmatter.tags ?? []) {
      map.set(t, (map.get(t) ?? 0) + 1);
    }
  }
  return [...map.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) => (p.frontmatter.tags ?? []).includes(tag));
}
