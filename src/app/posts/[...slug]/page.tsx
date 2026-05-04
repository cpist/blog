import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { compileMDX } from "next-mdx-remote/rsc";
import Giscus from "@/components/Giscus";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

type PostPageProps = { params: Promise<{ slug: string[] }> };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug.split("/") }));
}

export async function generateMetadata(props: PostPageProps) {
  const { slug } = await props.params;
  const joined = slug.join("/");
  const post = getPostBySlug(joined);
  if (!post) return {};
  return {
    title: `${post.frontmatter.title} - CPIST's blog`,
    description: post.frontmatter.summary ?? "",
  };
}

export default async function PostPage(props: PostPageProps) {
  const { slug } = await props.params;
  const joined = slug.join("/");

  const post = getPostBySlug(joined);
  if (!post) return notFound();

  const { content } = await compileMDX({
    source: post.content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
      },
    },
  });

  return (
    <article style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <div style={{ color: "#666", marginBottom: 6 }}>
        <Link href={`/${encodeURIComponent(post.category)}`} style={{ textDecoration: "none" }}>
          /{post.category}
        </Link>
      </div>

      <h2 style={{ marginTop: 0 }}>{post.frontmatter.title}</h2>
      <div style={{ color: "#666", marginBottom: 18 }}>{post.frontmatter.date}</div>
      {post.frontmatter.summary && (
        <p style={{ color: "#333", fontStyle: "italic" }}>{post.frontmatter.summary}</p>
      )}

      <hr style={{ border: 0, borderTop: "1px solid #eee", margin: "18px 0" }} />

      <div className="prose" style={{ lineHeight: 1.6 }}>
        {content}
      </div>

      <hr style={{ border: 0, borderTop: "1px solid #eee", margin: "36px 0" }} />
      <Giscus />
    </article>
  );
}
