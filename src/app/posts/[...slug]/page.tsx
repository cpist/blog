import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { compileMDX } from "next-mdx-remote/rsc";
import Giscus from "@/components/Giscus";

export async function generateStaticParams() {
  // p.slug = "mlir/hello-world" -> ["mlir", "hello-world"]
  return getAllPosts().map((p) => ({ slug: p.slug.split("/") }));
}

export async function generateMetadata(props: { params: Promise<{ slug:string[] }> }) {
  const { slug } = await props.params;
  const joined = slug.join("/");
  const post = getPostBySlug(joined);
  if (!post) return {};
  return {
    title: `${post.frontmatter.title} - CPIST's blog`,
    description: post.frontmatter.summary ?? "",
  };
}

export default async function PostPage(props: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await props.params;
  const joined = slug.join("/");

  const post = getPostBySlug(joined);
  if (!post) return notFound();

  const source = post.content.replace(/(\d+)\)/g, "$1\\)");
  const { content } = await compileMDX({
    source,
    options: {
      parseFrontmatter: false,
    },
  });

  return (
    <article>
      <div style={{ color: "#666", marginBottom: 6 }}>
        <a href={`/${post.category}`} style={{ textDecoration: "none" }}>
          /{post.category}
        </a>
      </div>

      <h2 style={{ marginTop: 0 }}>{post.frontmatter.title}</h2>
      <div style={{ color: "#666", marginBottom: 18 }}>{post.frontmatter.date}</div>
      {post.frontmatter.summary && <p style={{ color: "#333" }}>{post.frontmatter.summary}</p>}
      <hr style={{ border: 0, borderTop: "1px solid #eee", margin: "18px 0" }} />
      <div className="prose">{content}</div>
      <hr style={{ border: 0, borderTop: "1px solid #eee", margin: "36px 0" }} />
      <Giscus />
    </article>
  );
}