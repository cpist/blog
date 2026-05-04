import PostList from "@/components/PostList";
import { getAllTags, getPostsByTag } from "@/lib/posts";

type TagPageProps = { params: Promise<{ tag: string }> };

export async function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag }));
}

export async function generateMetadata({ params }: TagPageProps) {
  const { tag } = await params;
  return { title: `#${tag} - CPIST's blog` };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  return (
    <>
      <h2 style={{ marginTop: 0 }}>#{tag}</h2>
      <PostList posts={posts} />
    </>
  );
}
