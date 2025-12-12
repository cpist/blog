import Link from "next/link";
import type { Post } from "@/lib/posts";

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul style={{ display: "grid", gap: 12, padding: 0, listStyle: "none" }}>
      {posts.map((p) => (
        <li key={p.slug} style={{ border: "1px solid #ddd", borderRadius: 10, padding: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <Link href={`/posts/${p.slug}`} style={{ fontWeight: 700 }}>
              {p.frontmatter.title}
            </Link>
            <span style={{ color: "#666" }}>{p.frontmatter.date}</span>
          </div>

          {p.frontmatter.summary && <p style={{ margin: "8px 0 0", color: "#333" }}>{p.frontmatter.summary}</p>}

          {(p.frontmatter.tags?.length ?? 0) > 0 && (
            <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
              {p.frontmatter.tags!.map((t) => (
                <Link
                  key={t}
                  href={`/tags/${encodeURIComponent(t)}`}
                  style={{
                    fontSize: 12,
                    border: "1px solid #ddd",
                    borderRadius: 999,
                    padding: "4px 10px",
                    color: "#333",
                    textDecoration: "none",
                  }}
                >
                  #{t}
                </Link>
              ))}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
