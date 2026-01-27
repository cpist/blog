import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { compileMDX } from "next-mdx-remote/rsc";
import Giscus from "@/components/Giscus";

// 수학 공식 렌더링을 위한 플러그인
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// 이 CSS가 없으면 수식이 텍스트처럼 깨져서 나옵니다.
import "katex/dist/katex.min.css";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug.split("/") }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string[] }> }) {
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

  // MDX 컴파일 설정
  const { content } = await compileMDX({
    source: post.content,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        // remarkMath가 먼저 $...$를 수학 노드로 변환하여 Acorn 파서의 간섭을 막습니다.
        remarkPlugins: [remarkMath],
        // rehypeKatex가 변환된 노드를 KaTeX HTML로 바꿉니다.
        rehypePlugins: [rehypeKatex],
      },
    },
    // 필요한 커스텀 컴포넌트가 있다면 여기에 추가
    components: {},
  });

  return (
    <article style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <div style={{ color: "#666", marginBottom: 6 }}>
        <a href={`/${post.category}`} style={{ textDecoration: "none" }}>
          /{post.category}
        </a>
      </div>

      <h2 style={{ marginTop: 0 }}>{post.frontmatter.title}</h2>
      <div style={{ color: "#666", marginBottom: 18 }}>{post.frontmatter.date}</div>
      {post.frontmatter.summary && (
        <p style={{ color: "#333", fontStyle: "italic" }}>{post.frontmatter.summary}</p>
      )}

      <hr style={{ border: 0, borderTop: "1px solid #eee", margin: "18px 0" }} />

      {/* 'prose' 클래스는 Tailwind CSS Typography 플러그인 사용 시 유용합니다 */}
      <div className="prose" style={{ lineHeight: 1.6 }}>
        {content}
      </div>

      <hr style={{ border: 0, borderTop: "1px solid #eee", margin: "36px 0" }} />
      <Giscus />
    </article>
  );
}