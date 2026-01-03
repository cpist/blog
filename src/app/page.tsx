import Link from "next/link";
import PostList from "@/components/PostList";
import { getAllCategories, getAllPosts, getAllTags } from "@/lib/posts";

export const metadata = {
  title: "CPIST's blog",
  description: "Next.js + MDX blog",
};

function prettyCategoryName(category: string) {
  // 폴더명 -> 표시명 (원하면 여기만 커스터마이즈)
  const map: Record<string, string> = {
    "mlir": "MLIR",
    "llvm": "LLVM",
    "paper": "PAPER",
    "personal": "Personal",
    "etc": "ETC",
  };
  return map[category] ?? category;
}

export default function HomePage() {
  const categories = getAllCategories();
  const posts = getAllPosts().slice(0, 10);
  const tags = getAllTags().slice(0, 30);

  return (
    <>
      <h2 style={{ marginTop: 0 }}>Categories</h2>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {categories.map((c) => (
          <Link
            key={c}
            href={`/${encodeURIComponent(c)}/`}
            style={{
              border: "1px solid #ddd",
              borderRadius: 999,
              padding: "6px 12px",
              textDecoration: "none",
            }}
          >
            /{prettyCategoryName(c)}
          </Link>
        ))}
      </div>

      <h2 style={{ marginTop: 28 }}>Latest</h2>
      <PostList posts={posts} />

      <div style={{ marginTop: 18 }}>
        <Link href="/posts/">→ All posts</Link>
      </div>

      <h2 style={{ marginTop: 32 }}>Tags</h2>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {tags.map(({ tag, count }) => (
          <Link
            key={tag}
            href={`/tags/${encodeURIComponent(tag)}/`}
            style={{
              border: "1px solid #ddd",
              borderRadius: 999,
              padding: "6px 12px",
              textDecoration: "none",
            }}
          >
            #{tag} <span style={{ color: "#666" }}>({count})</span>
          </Link>
        ))}
      </div>
    </>
  );
}
